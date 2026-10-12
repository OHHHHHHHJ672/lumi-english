const assert = require('assert');
const { catalog } = require('../app/src/main/assets/course.js');

const kinds = new Set(['word', 'choice', 'listen', 'order', 'fill', 'match']);
const normalize = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ').trim();
const errors = [];
const keys = new Set();

if (catalog.levels.length !== 4) errors.push(`levels=${catalog.levels.length}, expected 4`);
if (catalog.lessonList.length !== 288) errors.push(`lessons=${catalog.lessonList.length}, expected 288`);
if (Object.keys(catalog.questionBank).length !== 2880) errors.push(`questions=${Object.keys(catalog.questionBank).length}, expected 2880`);

for (const level of catalog.levels) {
  const count = catalog.lessonList.filter((lesson) => lesson.levelId === level.id).length;
  if (count !== 72) errors.push(`${level.id} has ${count} lessons, expected 72`);
  for (const field of ['cefr', 'difficulty', 'recommendedFor']) {
    if (level[field] === undefined || level[field] === null) errors.push(`${level.id} missing ${field}`);
  }
}

for (const lesson of catalog.lessonList) {
  if (lesson.questions.length !== 10) errors.push(`${lesson.id} has ${lesson.questions.length} questions, expected 10`);
  if (!Array.isArray(lesson.grammarTags) || !lesson.grammarTags.length) errors.push(`${lesson.id} missing grammarTags`);
  if (!Array.isArray(lesson.skillTags) || !lesson.skillTags.length) errors.push(`${lesson.id} missing skillTags`);
  const lessonKinds = new Set(lesson.questions.map((question) => question.kind));
  for (const kind of kinds) if (!lessonKinds.has(kind)) errors.push(`${lesson.id} missing ${kind}`);
  for (const question of lesson.questions) {
    if (!Array.isArray(question.grammarTags) || !question.grammarTags.length) errors.push(`${question.id} missing grammarTags`);
    if (!Array.isArray(question.skillTags) || !question.skillTags.length) errors.push(`${question.id} missing skillTags`);
    if (question.kind === 'fill') {
      for (const option of question.options || []) if (!/^[A-Za-z][A-Za-z' -]*$/.test(option)) errors.push(`${question.id} has non-English fill option ${option}`);
    }
    if (['choice', 'fill'].includes(question.kind) && /[\u4e00-\u9fff]/.test(question.prompt || '')) {
      errors.push(`${question.id} exposes Chinese text inside an English prompt`);
    }
    if (['order', 'fill'].includes(question.kind) && /[\u4e00-\u9fff]/.test(question.answer || '')) {
      errors.push(`${question.id} has a non-English answer`);
    }
    const key = `${normalize(question.prompt)}|${normalize(question.answer)}`;
    if (keys.has(key)) errors.push(`duplicate prompt/answer ${key}`);
    keys.add(key);
  }
}

const forbiddenHigher = /hello|my name is|nice to meet you/i;
for (const lesson of catalog.lessonList.filter((lesson) => lesson.levelId !== 'a1')) {
  if (forbiddenHigher.test(lesson.questions[1].prompt)) errors.push(`${lesson.id} starts with an A1 greeting`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(JSON.stringify({ levels: catalog.levels.length, lessons: catalog.lessonList.length, questions: keys.size }, null, 2));
