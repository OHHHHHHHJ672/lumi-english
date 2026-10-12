const assert = require('assert');
const LumiModel = require('../app/src/main/assets/model.js');

function stateAt(minutes = 10) {
  const s = LumiModel.fresh(0);
  s.dailyMinutes = minutes;
  return LumiModel.normalize(s, 0);
}

function test(name, fn) {
  try {
    fn();
    process.stdout.write(`ok - ${name}\n`);
  } catch (error) {
    process.stderr.write(`not ok - ${name}\n${error.stack}\n`);
    process.exitCode = 1;
  }
}

test('goalXp is based on daily minutes with a minimum of 10', () => {
  assert.strictEqual(LumiModel.goalXp({ dailyMinutes: 5 }), 15);
  assert.strictEqual(LumiModel.goalXp({ dailyMinutes: 30 }), 90);
  assert.strictEqual(LumiModel.goalXp({ dailyMinutes: 0 }), 10);
});

test('version 2 and 3 archives migrate to version 5 without losing progress', () => {
  const migrated = LumiModel.normalize({
    version: 2,
    completed: ['u1l2'],
    mistakes: ['u1l2q3'],
    daily: { date: '1970-01-01', xp: 5, lessons: 1, claimed: false },
    dailyMinutes: 20,
    session: { lessonId: 'u1l2', qids: ['u1l2q3'], index: 0 },
  }, 0);
  assert.strictEqual(migrated.version, 5);
  assert.deepStrictEqual(migrated.completed, ['a1-u1-l1']);
  assert.deepStrictEqual(migrated.mistakes, ['a1-u1-l1-q3']);
  assert.ok(migrated.legacyIds.includes('u1l2'));
  assert.ok(migrated.legacyIds.includes('u1l2q3'));
  assert.strictEqual(migrated.dailyMinutes, 20);
  assert.ok(migrated.session);
  assert.strictEqual(migrated.session.lessonId, 'a1-u1-l1');
  assert.deepStrictEqual(migrated.session.qids, ['a1-u1-l1-q3']);

  const v3 = LumiModel.normalize({
    version: 3,
    muted: true,
    effects: false,
    currentLevel: 'b1',
    session: { lessonId: 'b1-u2-l3', qids: ['b1-u2-l3-q1'], index: 0 },
  }, 0);
  assert.strictEqual(v3.version, 5);
  assert.strictEqual(v3.muted, true);
  assert.strictEqual(v3.effects, false);
  assert.strictEqual(v3.currentLevel, 'b1');
  assert.strictEqual(v3.session.lessonId, 'b1-u2-l1');
  assert.deepStrictEqual(v3.session.qids, ['b1-u2-l1-q1']);
  assert.ok(v3.legacyIds.includes('b1-u2-l3'));
});

test('current beta lesson ids keep their full 72-unit range during normalization', () => {
  const migrated = LumiModel.normalize({
    version: 4,
    completed: ['a1-u36-l1', 'a2-u36-l1'],
    mistakes: ['b1-u36-l1-q6'],
  }, 0);
  assert.deepStrictEqual(migrated.completed, ['a1-u36-l1', 'a2-u36-l1']);
  assert.deepStrictEqual(migrated.mistakes, ['b1-u36-l1-q6']);
});

test('expanded lesson ids preserve the new tenth question during normalization', () => {
  const migrated = LumiModel.normalize({
    version: 4,
    completed: ['b2-u72-l1'],
    mistakes: ['b2-u72-l1-q10']
  }, 1000);
  assert.ok(migrated.completed.includes('b2-u72-l1'));
  assert.deepStrictEqual(migrated.mistakes, ['b2-u72-l1-q10']);
});

test('an advanced starting level keeps its lower-level route skipped after migration', () => {
  const migrated = LumiModel.normalize({
    version: 4,
    currentLevel: 'b1',
    completed: ['a1-u1-l1', 'a1-u8-l1', 'a2-u1-l1'],
  }, 0);
  assert.ok(migrated.completed.includes('a1-u36-l1'));
  assert.ok(migrated.completed.includes('a2-u36-l1'));
});

test('migration preserves an old zero-heart balance and its original timestamp', () => {
  const migrated = LumiModel.normalize({
    version: 3,
    energy: 0,
    energyAt: 1000,
    daily: { date: '1970-01-01' },
    session: { lessonId: 'u8l4', qids: ['u8l4q9'] },
  }, 1000);
  assert.strictEqual(migrated.hearts, 0);
  assert.strictEqual(migrated.energy, 0);
  assert.strictEqual(migrated.heartsAt, 1000);
  assert.strictEqual(migrated.energyAt, 1000);
  assert.deepStrictEqual(migrated.daily, { date: '1970-01-01', xp: 0, lessons: 0, claimed: false, tasks: { newLessons: 0, questions: 0, reviews: 0 }, taskClaims: [], questionIds: [], reviewIds: [] });
  assert.strictEqual(migrated.session.lessonId, 'a1-u8-l1');
  assert.deepStrictEqual(migrated.session.qids, ['a1-u8-l1-q6']);
});

test('wrong answers are appended to the queue and lesson only passes after retry', () => {
  const s = stateAt();
  assert.strictEqual(LumiModel.start(s, 'lesson-1', ['q1', 'q2']), true);
  assert.strictEqual(LumiModel.answer(s, 'q1', false), true);
  assert.deepStrictEqual(s.session.qids, ['q1', 'q2', 'q1']);
  s.session.index = 1;
  s.session.checked = false;
  assert.strictEqual(LumiModel.answer(s, 'q2', true), true);
  s.session.index = 2;
  s.session.checked = false;
  assert.strictEqual(LumiModel.answer(s, 'q1', true), true);
  const reward = LumiModel.finish(s, 0);
  assert.strictEqual(reward.passed, true);
  assert.strictEqual(reward.firstPass, true);
  assert.strictEqual(reward.mistakeCount, 1);
});

test('retrying a wrong question does not award XP twice', () => {
  const s = stateAt();
  LumiModel.start(s, 'lesson-1', ['q1']);
  LumiModel.answer(s, 'q1', false);
  s.session.index = 1;
  s.session.checked = false;
  LumiModel.answer(s, 'q1', true);
  assert.strictEqual(s.xp, 5);
  assert.strictEqual(s.daily.xp, 5);
});

test('a question that already earned XP does not award XP in a later session', () => {
  const s = stateAt();
  LumiModel.start(s, 'lesson-1', ['q1'], false, 0);
  LumiModel.answer(s, 'q1', true, 0);
  LumiModel.finish(s, 0);
  LumiModel.start(s, 'lesson-2', ['q1'], false, 0);
  LumiModel.answer(s, 'q1', true, 0);
  assert.deepStrictEqual(s.earnedQuestionIds, ['q1']);
  assert.strictEqual(s.xp, 5);
  assert.strictEqual(s.daily.xp, 5);
});

test('lessons never spend hearts on mistakes and can start at zero', () => {
  const s = stateAt();
  s.hearts = 0;
  s.energy = 0;
  LumiModel.start(s, 'lesson-1', ['q1']);
  assert.ok(s.session);
  LumiModel.answer(s, 'q1', false);
  assert.strictEqual(s.hearts, 0);
  s.session.index = 1;
  s.session.checked = false;
  LumiModel.answer(s, 'q1', true);
  LumiModel.finish(s, 0);
  assert.strictEqual(s.energy, 0);
});

test('new lesson sessions track the question that has received automatic audio', () => {
  const s = stateAt();
  LumiModel.start(s, 'lesson-1', ['q1']);
  assert.strictEqual(s.session.autoPlayedQuestionId, null);
  assert.strictEqual(s.session.autoPlayScheduledQuestionId, null);
});

test('first mastery and lesson completion award Lumi points once', () => {
  const s = stateAt();
  LumiModel.start(s, 'lesson-1', ['q1']);
  LumiModel.answer(s, 'q1', true);
  assert.strictEqual(s.points, 2);
  assert.strictEqual(s.coins, 2);
  const reward = LumiModel.finish(s, 0);
  assert.strictEqual(reward.points, 25);
  assert.strictEqual(s.points, 47);
  assert.strictEqual(s.coins, 47);
  LumiModel.start(s, 'lesson-2', ['q1']);
  LumiModel.answer(s, 'q1', true);
  assert.strictEqual(s.points, 47);
});

test('answers schedule an SRS review and expose due cards', () => {
  const s = stateAt();
  LumiModel.start(s, 'lesson-1', ['q1']);
  LumiModel.answer(s, 'q1', true, 0);
  assert.equal(s.srs.q1.reps, 1);
  assert.ok(s.srs.q1.due > 0);
  assert.deepStrictEqual(LumiModel.dueReviews(s, s.srs.q1.due, 5), ['q1']);
});

test('daily tasks and shop rewards are claimable without restricting lessons', () => {
  const s = stateAt();
  s.daily.tasks.questions = 20;
  const questionTask = LumiModel.tasks(s).find(task => task.id === 'answer-questions');
  assert.equal(questionTask.progress, 20);
  assert.equal(LumiModel.claimTask(s, 'answer-questions'), true);
  assert.equal(s.points, 15);
  assert.equal(LumiModel.claimTask(s, 'answer-questions'), false);
  s.points = 200; s.coins = 200;
  assert.equal(LumiModel.buyItem(s, 'mascot-spark'), true);
  assert.ok(s.inventory.includes('mascot-spark'));
  assert.equal(LumiModel.start(s, 'lesson-open', ['q2']), true);
});

test('review completion does not claim a first-pass perfect reward', () => {
  const s = stateAt();
  LumiModel.start(s, 'lesson-review', ['q1'], true);
  LumiModel.answer(s, 'q1', true);
  const reward = LumiModel.finish(s, 0);
  assert.strictEqual(reward.firstPass, false);
  assert.strictEqual(reward.perfect, false);
  assert.strictEqual(reward.points, 0);
});

test('points can be spent without touching study access', () => {
  const s = stateAt();
  s.points = 10;
  s.coins = 10;
  assert.strictEqual(LumiModel.spendPoints(s, 3), true);
  assert.strictEqual(s.points, 7);
  assert.strictEqual(s.coins, 7);
  assert.strictEqual(LumiModel.spendPoints(s, 8), false);
  assert.strictEqual(s.points, 7);
});

test('every fifth consecutive correct answer increments combo', () => {
  const s = stateAt();
  LumiModel.start(s, 'lesson-1', ['q1', 'q2', 'q3', 'q4', 'q5']);
  for (let i = 0; i < 5; i += 1) {
    LumiModel.answer(s, `q${i + 1}`, true);
    if (i < 4) {
      s.session.index += 1;
      s.session.checked = false;
    }
  }
  assert.strictEqual(s.combo, 1);
  assert.strictEqual(s.session.combo, 5);
});

test('checkpoint results and skipped lessons are persisted without gating study', () => {
  const state = LumiModel.fresh(0);
  assert.strictEqual(LumiModel.checkpointPassed(state, 'a1-section1-checkpoint'), false);
  assert.strictEqual(LumiModel.recordCheckpoint(state, 'a1-section1-checkpoint', 90, true, 1000), true);
  assert.strictEqual(LumiModel.checkpointPassed(state, 'a1-section1-checkpoint'), true);
  LumiModel.skipLessons(state, ['a1-u2-l1', 'a1-u3-l1']);
  assert.deepStrictEqual(state.skippedLessons, ['a1-u2-l1', 'a1-u3-l1']);
  assert(state.completed.includes('a1-u2-l1'));
});
