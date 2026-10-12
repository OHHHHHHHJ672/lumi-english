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
    // A `listen` prompt is a fixed placeholder ("听句子，选择意思。") and the graded
    // option is the Chinese rendering of whatever was played, so answer and
    // translation are the same string. Enforcing it caught two shapes of drift:
    // an answer that dropped part of the sentence (a1-u15-l1-q3, "before bed")
    // and twelve translations that carried a generated time marker the answer
    // correctly omitted.
    if (question.kind === 'listen' && question.answer !== question.translation) {
      errors.push(`${file}#${index + 1}: listen answer and translation disagree: ${JSON.stringify(question.answer)} vs ${JSON.stringify(question.translation)}`);
    }
    // Generator artifacts: a time word was appended after a comma, in several
    // spellings (在下午 / 晚饭前 / 晚饭后 / 本月). It usually landed in the
    // translation while the authored answer stayed clean, so the learner picked
    // an option that dropped part of the sentence and the wrong-answer feedback
    // printed it. Rule exists so a regenerated or promoted block cannot
    // reintroduce the shape; the pattern is matched as a class because only
    // naming the two spellings first seen left the rest unguarded.
    if (typeof question.translation === 'string' && /，(?:在下午|晚饭前|晚饭后|下午|晚上|早上|本月|上周|下周|今天|明天|昨天|周末|本周)。?$/.test(question.translation)) {
      errors.push(`${file}#${index + 1}: translation carries a generated time adjunct`);
    }
    // A `choice` answer answers its instruction rather than translating the
    // prompt ("门旁边有什么？" -> "有三个盒子。"), which is the only legitimate
    // reason for it to differ from the translation. Every real case is phrased
    // as an actual question; anything else is unconstrained drift.
    if (question.kind === 'choice'
      && question.answer !== question.translation
      && !/？\s*$/.test(String(question.instruction || ''))) {
      errors.push(`${file}#${index + 1}: choice answer differs from translation but instruction is not a question: ${JSON.stringify(question.instruction)}`);
    }
    // A `word` question renders its options as the tappable answer buttons and
    // grades with state.choice === q.answer, so the keyed answer must be one of
    // them. Shipping the English headword instead makes every pick wrong.
    if (question.kind === 'word') {
      if (!Array.isArray(question.options) || !question.options.length) errors.push(`${file}#${index + 1}: word needs options`);
      else if (!question.options.includes(question.answer)) errors.push(`${file}#${index + 1}: word answer ${JSON.stringify(question.answer)} is not among its options`);
    }
    // An `order` question is graded by tokens.join(' ') === q.answer. With no
    // token bank betaShuffle yields [], the word bank renders empty and
    // checkOrder() can never succeed, which strands the whole lesson.
    // Note the invariant is the join, not answer.split(' '): b1-u1-l1-q4
    // legitimately uses the multi-word tile "the handoff date".
    if (question.kind === 'order') {
      if (!Array.isArray(question.tokens) || !question.tokens.length) errors.push(`${file}#${index + 1}: order needs a token bank`);
      else if (question.tokens.join(' ') !== question.answer) errors.push(`${file}#${index + 1}: order tokens do not reassemble into the answer`);
    }
  }
  const sentenceQuestions = (block.questions || []).filter((question) => ['choice', 'listen', 'order', 'fill'].includes(question.kind));
  if (sentenceQuestions.length < 6) errors.push(`${file}: at least six sentence questions are required for grammar review`);
  if (block.sourceStatus === 'hand-authored' && block.grammarFocus === 'present-simple' && sentenceQuestions.filter((question) => /\b(i|you|we|they|he|she|it|the|my|our|everyone)\s+\w+/i.test(`${question.audio || ''}`)).length < 5) errors.push(`${file}: present-simple coverage is too low`);
}
console.log(JSON.stringify({ files: files.length, statusCounts, errors: errors.length, examples: errors.slice(0, 20) }, null, 2));
if (errors.length) process.exitCode = 1;
