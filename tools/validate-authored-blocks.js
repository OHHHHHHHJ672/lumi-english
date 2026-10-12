const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'course-data', 'blocks');
const files = fs.existsSync(root) ? fs.readdirSync(root).filter((name) => name.endsWith('.json')) : [];
const expectedKinds = ['word', 'choice', 'listen', 'order', 'fill', 'match', 'word', 'choice', 'listen', 'fill'];
const seenSentences = new Set();
const errors = [];
const statusCounts = {};
for (const file of files) {
  const full = path.join(root, file);
  let block;
  try { block = JSON.parse(fs.readFileSync(full, 'utf8')); } catch (error) { errors.push(`${file}: invalid JSON (${error.message})`); continue; }
  statusCounts[block.sourceStatus || 'unknown'] = (statusCounts[block.sourceStatus || 'unknown'] || 0) + 1;
  if (block.sourceStatus !== 'hand-authored') continue;
  if (!block.id || !/^(a1|a2|b1|b2)-u\d+-l1$/.test(block.id)) errors.push(`${file}: invalid stable lesson id`);
  if (!Array.isArray(block.questions) || block.questions.length !== 10) errors.push(`${file}: expected exactly 10 questions`);
  if (!block.dialogue || !Array.isArray(block.dialogue.turns) || block.dialogue.turns.length < 3) errors.push(`${file}: dialogue needs at least three turns`);
  if (block.dialogue && (!Array.isArray(block.dialogue.characters) || block.dialogue.characters.length < 2)) errors.push(`${file}: dialogue needs two characters`);
  for (const [index, question] of (block.questions || []).entries()) {
    if (!question.id || !question.kind) errors.push(`${file}#${index + 1}: missing id or kind`);
    if (question.kind !== expectedKinds[index]) errors.push(`${file}#${index + 1}: expected ${expectedKinds[index]}, got ${question.kind}`);
    if (['choice', 'listen', 'order', 'fill'].includes(question.kind) && (!question.audio || !question.translation)) errors.push(`${file}#${index + 1}: sentence question needs audio and translation`);
    if (question.kind !== 'word' && question.kind !== 'match') {
      const key = String(question.audio || question.prompt).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      if (seenSentences.has(key)) errors.push(`${file}#${index + 1}: duplicate English sentence`);
      seenSentences.add(key);
      if (/(this lesson|the word|本课|这个单词是什么意思)/i.test(`${question.prompt || ''} ${question.instruction || ''}`)) errors.push(`${file}#${index + 1}: meta wording is forbidden`);
    }
    if (question.kind === 'match' && (!Array.isArray(question.pairs) || question.pairs.length < 6)) errors.push(`${file}#${index + 1}: match needs at least six pairs`);
  }
  const sentenceQuestions = (block.questions || []).filter((question) => ['choice', 'listen', 'order', 'fill'].includes(question.kind));
  if (sentenceQuestions.length < 6) errors.push(`${file}: at least six sentence questions are required for grammar review`);
  if (block.sourceStatus === 'hand-authored' && block.grammarFocus === 'present-simple' && sentenceQuestions.filter((question) => /\b(i|you|we|they|he|she|it|the|my|our|everyone)\s+\w+/i.test(`${question.audio || ''}`)).length < 5) errors.push(`${file}: present-simple coverage is too low`);
}
console.log(JSON.stringify({ files: files.length, statusCounts, errors: errors.length, examples: errors.slice(0, 20) }, null, 2));
if (errors.length) process.exitCode = 1;
