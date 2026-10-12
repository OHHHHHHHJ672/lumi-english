const assert = require('assert');
const { catalog } = require('../app/src/main/assets/course.js');

const expectedLevels = ['a1', 'a2', 'b1', 'b2'];
const kinds = ['word', 'choice', 'listen', 'order', 'fill', 'match'];

assert.strictEqual(catalog.levels.length, 4, 'expected four CEFR levels');
assert.deepStrictEqual(catalog.levels.map((level) => level.id), expectedLevels);
assert.strictEqual(catalog.lessonList.length, 288, 'expected 288 beta lessons');
assert.strictEqual(Object.keys(catalog.questionBank).length, 2880, 'expected ten questions per lesson');
assert.ok(Array.isArray(catalog.sections) && catalog.sections.length >= 1, 'section metadata');
assert.strictEqual(catalog.checkpoints.length, catalog.sections.length, 'checkpoint metadata');
assert(catalog.lessonList.every((lesson) => lesson.unitId && lesson.sectionId && lesson.lessonType === 'lesson'), 'lesson path metadata');

const keys = new Set();
for (const lesson of catalog.lessonList) {
  assert.strictEqual(lesson.questions.length, 10, `${lesson.id} should contain ten questions`);
  assert.deepStrictEqual(lesson.questions.slice(0, 6).map((question) => question.kind), kinds, `${lesson.id} core question kinds`);
  assert.deepStrictEqual(lesson.questions.slice(6).map((question) => question.kind), ['word', 'choice', 'listen', 'fill'], `${lesson.id} extension question kinds`);
  assert(Array.isArray(lesson.grammarTags) && lesson.grammarTags.length > 0, `${lesson.id} grammar metadata`);
  assert(Array.isArray(lesson.skillTags) && lesson.skillTags.length > 0, `${lesson.id} skill metadata`);
  for (const question of lesson.questions) {
    assert(typeof question.instruction === 'string' && question.instruction.length > 0, `${question.id} instruction metadata`);
    assert(typeof question.translation === 'string' && question.translation.length > 0, `${question.id} translation metadata`);
    const normalize = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ').trim();
    const key = `${normalize(question.prompt)}|${normalize(question.answer)}`;
    if (lesson.authored) {
      assert(!keys.has(key), `duplicate prompt/answer: ${key}`);
      keys.add(key);
    }
    assert(Array.isArray(question.grammarTags) && question.grammarTags.length > 0, `${question.id} grammar metadata`);
    assert(Array.isArray(question.skillTags) && question.skillTags.length > 0, `${question.id} skill metadata`);
    if (Array.isArray(question.options) && ['choice', 'listen', 'fill', 'word'].includes(question.kind)) {
      assert(question.options.length >= 4, `${question.id} should have at least four choices`);
      assert.strictEqual(new Set(question.options).size, question.options.length, `${question.id} has duplicate choices`);
      assert(question.options.includes(question.answer), `${question.id} choices must include the answer`);
    }
    // checkOrder() grades with tokens.join(' ') === answer. Without a token
    // bank betaShuffle yields [], the word bank renders empty, and the lesson
    // can never be completed. Note the invariant is the join, not a plain
    // answer.split(' '): one question legitimately uses a multi-word tile.
    if (question.kind === 'order') {
      assert(Array.isArray(question.tokens) && question.tokens.length, `${question.id} needs a token bank`);
      assert.strictEqual(question.tokens.join(' '), question.answer, `${question.id} tokens must reassemble into the answer`);
    }
    if (question.kind === 'fill') {
      assert.notStrictEqual(question.instruction, question.translation, `${question.id} must hide its translation before answering`);
      for (const option of question.options) assert(/^[A-Za-z][A-Za-z' -]*$/.test(option), `${question.id} has non-English fill option: ${option}`);
    }
    if (question.kind === 'match') {
      assert(question.pairs.length >= 6, `${question.id} should contain at least six matching pairs`);
      assert.strictEqual(new Set(question.pairs.map((pair) => pair[0])).size, question.pairs.length, `${question.id} has duplicate English pairs`);
      assert.strictEqual(new Set(question.pairs.map((pair) => pair[1])).size, question.pairs.length, `${question.id} has duplicate Chinese pairs`);
    }
  }

  for (const question of lesson.questions.filter((item) => ['choice', 'listen', 'fill'].includes(item.kind))) {
    const authoredText = `${question.audio || ''} ${question.prompt || ''} ${question.translation || ''}`;
    assert(!/(?:A1|A2|B1|B2)\s+lesson|this lesson|the word .* is useful|The sentence includes|This lesson introduces|本课介绍|在本课中.*词很有用/i.test(authoredText), `${question.id} still uses a generic context sentence`);
    if (['listen', 'fill'].includes(question.kind)) assert(!/_____/.test(question.audio || ''), `${question.id} audio must be a complete sentence`);
    assert(question.translation && question.translation !== question.instruction, `${question.id} must include a usable sentence translation`);
  }

  for (const question of lesson.questions.filter((item) => ['choice', 'listen'].includes(item.kind))) {
    // Semantic plausibility requires editorial review. Reusing unrelated answers
    // from the same lesson is not evidence of plausible distractors.
    assert.strictEqual(question.options.filter(option => option === question.answer).length, 1, `${question.id} must have exactly one keyed answer`);
    assert(question.options.every(option => typeof option === 'string' && option.trim()), `${question.id} has an empty option`);
  }
}

const kitchen = catalog.lessonList.find((lesson) => /厨房|烹饪|餐厅/.test(lesson.title));
assert(kitchen, 'expected a kitchen or restaurant lesson');
const kitchenListen = kitchen.questions.find((question) => question.kind === 'listen');
const kitchenFill = kitchen.questions.find((question) => question.kind === 'fill');
assert(/please|could|would|ready|order|soup|sauce|table/i.test(`${kitchenListen.audio} ${kitchenListen.prompt}`), 'kitchen listening should use daily restaurant language');
assert(/please|could|would|pass|order|kitchen|table/i.test(`${kitchenFill.audio} ${kitchenFill.prompt}`), 'kitchen fill should use daily restaurant language');

const a1Opening = /hello|my name is|nice to meet you/i;
for (const lesson of catalog.lessonList.filter((lesson) => lesson.levelId !== 'a1')) {
  assert(!a1Opening.test(lesson.questions[1].prompt), `${lesson.id} must not open with an A1 greeting`);
}

// Content-drift regression. All three shapes below shipped in authored content
// and were repaired together, so each is pinned here: validate-authored-blocks
// only inspects the hand-authored blocks, while this runs against every
// question the app actually loads.
//
// 1. A `listen` prompt is a fixed placeholder and the graded option is the
//    Chinese rendering of whatever was played, so answer === translation. The
//    gap showed up both ways: an answer that dropped part of the sentence
//    (a1-u15-l1-q3 lost "before bed") and twelve translations that carried a
//    generated time marker the answer correctly omitted.
// 2. Time adjuncts were injected at one fixed slot per A2 lesson, so the whole
//    question bank is scanned rather than just `listen`.
// 3. A `choice` answer answers its instruction rather than translating the
//    prompt ("门旁边有什么？" -> "有三个盒子。"), which is the only legitimate
//    reason to differ from the translation -- and every real case is phrased as
//    an actual question.
for (const lesson of catalog.lessonList) {
  for (const question of lesson.questions) {
    if (question.kind === 'listen') {
      assert.strictEqual(question.answer, question.translation, `${question.id} listen answer must match its translation`);
    }
    assert(!/，(?:在下午|晚饭前|晚饭后|下午|晚上|早上|本月|上周|下周|今天|明天|昨天|周末|本周)。?$/.test(question.translation || ''), `${question.id} translation carries a generated time adjunct`);
    if (question.kind === 'choice' && question.answer !== question.translation) {
      assert(/？\s*$/.test(String(question.instruction || '')), `${question.id} choice answer drifted from translation without a question-form instruction`);
    }
  }
}

for (const level of catalog.levels) {
  assert(level.cefr && level.difficulty && Array.isArray(level.recommendedFor), `${level.id} beta metadata missing`);
}

for (const level of expectedLevels) {
  const lessons = catalog.lessonList.filter((lesson) => lesson.levelId === level);
  assert.equal(lessons.length, 72, `${level} should contain 72 lessons`);
  const expansion = lessons.filter((lesson) => Number(lesson.id.match(/-u(\d+)-/)[1]) > 36);
  assert.equal(new Set(expansion.map((lesson) => lesson.title)).size, 36, `${level} expansion titles should be unique`);
}

console.log(`course tests passed: ${catalog.lessonList.length} lessons, ${keys.size} unique questions`);
