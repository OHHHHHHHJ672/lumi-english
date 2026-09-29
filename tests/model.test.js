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

test('version 2 and 3 archives migrate to version 4 without losing progress', () => {
  const migrated = LumiModel.normalize({
    version: 2,
    completed: ['u1l2'],
    mistakes: ['u1l2q3'],
    daily: { date: '1970-01-01', xp: 5, lessons: 1, claimed: false },
    dailyMinutes: 20,
    session: { lessonId: 'a1-u1-l2', qids: ['a1-u1-l2-q3'], index: 0 },
  }, 0);
  assert.strictEqual(migrated.version, 4);
  assert.deepStrictEqual(migrated.completed, ['a1-u1-l2']);
  assert.deepStrictEqual(migrated.mistakes, ['a1-u1-l2-q3']);
  assert.strictEqual(migrated.dailyMinutes, 20);
  assert.ok(migrated.session);
  assert.strictEqual(migrated.session.lessonId, 'a1-u1-l2');

  const v3 = LumiModel.normalize({
    version: 3,
    muted: true,
    effects: false,
    currentLevel: 'b1',
    session: { lessonId: 'b1-u2-l3', qids: ['b1-u2-l3-q1'], index: 0 },
  }, 0);
  assert.strictEqual(v3.version, 4);
  assert.strictEqual(v3.muted, true);
  assert.strictEqual(v3.effects, false);
  assert.strictEqual(v3.currentLevel, 'b1');
  assert.strictEqual(v3.session.lessonId, 'b1-u2-l3');
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

test('new lessons spend hearts on mistakes while review lessons do not', () => {
  const s = stateAt();
  assert.strictEqual(s.hearts, 5);
  LumiModel.start(s, 'lesson-1', ['q1']);
  LumiModel.answer(s, 'q1', false);
  assert.strictEqual(s.hearts, 4);
  s.session.index = 1;
  s.session.checked = false;
  LumiModel.answer(s, 'q1', true);
  LumiModel.finish(s, 0);
  s.mistakes = ['q2'];
  LumiModel.start(s, 'review', ['q2'], true);
  LumiModel.answer(s, 'q2', false);
  assert.strictEqual(s.hearts, 4);
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
