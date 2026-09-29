const assert = require('assert');
const { catalog } = require('../app/src/main/assets/course.js');

const expectedLevels = ['a1', 'a2', 'b1', 'b2'];
const kinds = ['word', 'choice', 'listen', 'order', 'fill', 'match'];

assert.strictEqual(catalog.levels.length, 4, 'expected four CEFR levels');
assert.deepStrictEqual(catalog.levels.map((level) => level.id), expectedLevels);
assert.strictEqual(catalog.lessonList.length, 80, 'expected 80 beta lessons');
assert.strictEqual(Object.keys(catalog.questionBank).length, 480, 'expected six questions per lesson');

const keys = new Set();
for (const lesson of catalog.lessonList) {
  assert.strictEqual(lesson.questions.length, 6, `${lesson.id} should contain six questions`);
  assert.deepStrictEqual(lesson.questions.map((question) => question.kind), kinds, `${lesson.id} question kinds`);
  assert(Array.isArray(lesson.grammarTags) && lesson.grammarTags.length > 0, `${lesson.id} grammar metadata`);
  assert(Array.isArray(lesson.skillTags) && lesson.skillTags.length > 0, `${lesson.id} skill metadata`);
  for (const question of lesson.questions) {
    const normalize = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ').trim();
    const key = `${normalize(question.prompt)}|${normalize(question.answer)}`;
    assert(!keys.has(key), `duplicate prompt/answer: ${key}`);
    keys.add(key);
    assert(Array.isArray(question.grammarTags) && question.grammarTags.length > 0, `${question.id} grammar metadata`);
    assert(Array.isArray(question.skillTags) && question.skillTags.length > 0, `${question.id} skill metadata`);
    if (Array.isArray(question.options)) {
      assert(question.options.length >= 4, `${question.id} should have at least four choices`);
      assert.strictEqual(new Set(question.options).size, question.options.length, `${question.id} has duplicate choices`);
      assert(question.options.includes(question.answer), `${question.id} choices must include the answer`);
    }
    if (question.kind === 'fill') {
      for (const option of question.options) assert(/^[A-Za-z][A-Za-z' -]*$/.test(option), `${question.id} has non-English fill option: ${option}`);
    }
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
