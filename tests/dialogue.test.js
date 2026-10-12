const test = require('node:test');
const assert = require('node:assert/strict');
const { catalog } = require('../app/src/main/assets/course.js');
const LumiDialogues = require('../app/src/main/assets/dialogue-data.js');

test('dialogue catalog has 32 authored stories, eight per CEFR level', () => {
  assert.equal(LumiDialogues.stories.length, 32);
  assert.deepEqual(
    Object.fromEntries(['a1', 'a2', 'b1', 'b2'].map(level => [level, LumiDialogues.stories.filter(s => s.levelId === level).length])),
    { a1: 8, a2: 8, b1: 8, b2: 8 }
  );
  const lessonIds = new Set(catalog.lessonList.map(lesson => lesson.id));
  const storyIds = new Set();
  for (const story of LumiDialogues.stories) {
    assert(!storyIds.has(story.id), `duplicate story ${story.id}`);
    storyIds.add(story.id);
    assert(lessonIds.has(story.lessonId), `${story.id} maps to a real lesson`);
    assert.match(story.levelId, /^(a1|a2|b1|b2)$/);
    assert.ok(story.title && story.scene && story.setting);
    assert.ok(['cafe', 'restaurant', 'hotel', 'travel', 'shop', 'home', 'work', 'clinic'].includes(story.setting));
    assert.ok(story.characters.length >= 2);
    const characterIds = new Set(story.characters.map(character => character.id));
    assert.ok(story.turns.length >= 3 && story.turns.length <= 6);
    for (const turn of story.turns) {
      assert(characterIds.has(turn.speaker), `${story.id} turn speaker exists`);
      assert.ok(turn.id && turn.text && turn.translation);
    }
    assert.ok(story.glossary.length >= 2);
    assert.ok(story.tasks.length >= 1 && story.tasks.length <= 2);
  }
});

test('questionsFor emits all four dialogue modes with valid answers', () => {
  const questions = LumiDialogues.stories.flatMap(story => LumiDialogues.questionsFor(story.lessonId));
  assert.equal(questions.length, 64);
  assert.deepEqual(new Set(questions.map(question => question.mode)), new Set(['intent', 'reply', 'gap', 'sequence']));
  const questionIds = new Set();
  for (const question of questions) {
    assert.equal(question.kind, 'dialogue');
    assert(!questionIds.has(question.id), `duplicate question ${question.id}`);
    questionIds.add(question.id);
    assert.ok(question.storyId && question.lessonId && question.prompt && question.instruction);
    assert.ok(Array.isArray(question.turns) && question.turns.length >= (question.mode === 'reply' ? 1 : 3));
    assert.ok(Array.isArray(question.characters) && question.characters.length >= 2);
    assert.ok(Array.isArray(question.glossary));
    if (question.mode === 'intent') {
      assert.ok(question.options.length >= 3);
      assert.ok(question.options.includes(question.answer));
      assert.equal(question.targetIndex, undefined);
    } else if (question.mode === 'reply' || question.mode === 'gap') {
      assert(Number.isInteger(question.targetIndex));
      const sourceStory = LumiDialogues.stories.find(story => story.id === question.storyId);
      assert(question.targetIndex >= 0 && question.targetIndex < sourceStory.turns.length);
      assert.ok(question.options.length >= 3);
      assert.ok(question.options.includes(question.answer));
      assert.equal(question.answer, sourceStory.turns[question.targetIndex].text);
      if (question.mode === 'reply') assert.equal(question.turns.length, question.targetIndex);
    } else {
      const expected = question.turns.map((_, index) => String(index)).join('|');
      assert.equal(question.answer, expected);
      assert.equal(question.options.length, question.turns.length);
    }
  }
});

test('dialogues avoid cloned turn text and preserve lesson metadata', () => {
  const turnTexts = new Set();
  for (const story of LumiDialogues.stories) {
    for (const turn of story.turns) {
      const key = turn.text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      assert(!turnTexts.has(key), `reused dialogue line: ${turn.text}`);
      turnTexts.add(key);
    }
    const lesson = catalog.lessonList.find(item => item.id === story.lessonId);
    assert.equal(story.levelId, lesson.levelId);
    assert.equal(LumiDialogues.questionsFor(lesson).every(question => question.storyId === story.id), true);
  }
});

test('every lesson receives a dialogue practice path, authored or fallback', () => {
  const covered = new Set(catalog.lessonList.filter(lesson => LumiDialogues.questionsFor(lesson).length > 0).map(lesson => lesson.id));
  assert.equal(covered.size, catalog.lessonList.length);
  assert.equal(catalog.lessonList.filter(lesson => LumiDialogues.questionsFor(lesson).some(question => question.kind === 'dialogue')).length, catalog.lessonList.length);
});

console.log('dialogue tests loaded');
