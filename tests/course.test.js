const assert = require('assert');
const { catalog } = require('../app/src/main/assets/course.js');

const expectedLevels = ['a1', 'a2', 'b1', 'b2'];
const kinds = ['word', 'choice', 'listen', 'order', 'fill', 'match'];

assert.strictEqual(catalog.levels.length, 4, 'expected four CEFR levels');
assert.deepStrictEqual(catalog.levels.map((level) => level.id), expectedLevels);
assert.strictEqual(catalog.lessonList.length, 32, 'expected 32 beta lessons');
assert.strictEqual(Object.keys(catalog.questionBank).length, 192, 'expected six questions per lesson');

const keys = new Set();
for (const lesson of catalog.lessonList) {
  assert.strictEqual(lesson.questions.length, 6, `${lesson.id} should contain six questions`);
  assert.deepStrictEqual(lesson.questions.map((question) => question.kind), kinds, `${lesson.id} question kinds`);
  for (const question of lesson.questions) {
    const normalize = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ').trim();
    const key = `${normalize(question.prompt)}|${normalize(question.answer)}`;
    assert(!keys.has(key), `duplicate prompt/answer: ${key}`);
    keys.add(key);
  }
}

const a1Opening = /hello|my name is|nice to meet you/i;
for (const lesson of catalog.lessonList.filter((lesson) => lesson.levelId !== 'a1')) {
  assert(!a1Opening.test(lesson.questions[1].prompt), `${lesson.id} must not open with an A1 greeting`);
}

for (const level of catalog.levels) {
  assert(level.cefr && level.difficulty && Array.isArray(level.recommendedFor), `${level.id} beta metadata missing`);
}

console.log(`course tests passed: ${catalog.lessonList.length} lessons, ${keys.size} unique questions`);
