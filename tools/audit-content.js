/* Content quality audit for the authored and generated Lumi course. */
const { catalog } = require('../app/src/main/assets/course.js');

const questions = Object.values(catalog.questionBank);
const sentenceKinds = new Set(['choice', 'listen', 'fill']);
const textOf = (q) => [q.prompt, q.instruction, q.audio, q.translation].filter(Boolean).join(' ');
const flagged = (rule, predicate) => questions.filter(predicate).map((q) => ({ id: q.id, kind: q.kind, lessonId: q.lessonId, prompt: q.prompt, audio: q.audio, translation: q.translation, rule }));

const findings = [
  ...flagged('lesson-meta', (q) => /(?:A1|A2|B1|B2)\s+lesson|this lesson|the word .* is useful|本课介绍|在本课中.*词很有用|课程中这个词/i.test(textOf(q))),
  ...flagged('generic-template', (q) => /The sentence includes|complete the phrase|Could you explain the (?:quiet|repeat|opposite)|Please check the (?:quiet|repeat|opposite)/i.test(textOf(q))),
  ...flagged('incomplete-audio', (q) => sentenceKinds.has(q.kind) && /_____/.test(String(q.audio || ''))),
  ...flagged('missing-translation', (q) => sentenceKinds.has(q.kind) && (!q.audio || !q.translation)),
  ...flagged('meta-prompt', (q) => sentenceKinds.has(q.kind) && /(?:选择这个词|词是什么意思|lesson \d+)/i.test(String(q.prompt || ''))),
  ...flagged('unnatural-collocation', (q) => /(?:borrow (?:that|the) sentence|is the carbon ready|reviewing the leverage|reviewing the contingency|put the routine)/i.test(textOf(q))),
];

const duplicateMap = new Map();
for (const q of questions.filter((item) => item.kind !== 'word' && item.kind !== 'match')) {
  const normalize = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ').trim();
  const key = `${normalize(q.audio || q.prompt)}|${normalize(q.translation)}`;
  if (!key.startsWith('|')) {
    if (!duplicateMap.has(key)) duplicateMap.set(key, []);
    duplicateMap.get(key).push(q.id);
  }
}
for (const [key, ids] of duplicateMap) {
  if (ids.length > 1) findings.push({ rule: 'duplicate-sentence', ids, key });
}

const byRule = Object.fromEntries([...new Set(findings.map((item) => item.rule))].map((rule) => [rule, findings.filter((item) => item.rule === rule).length]));
const result = {
  levels: catalog.levels.length,
  lessons: catalog.lessonList.length,
  questions: questions.length,
  sentenceQuestions: questions.filter((q) => sentenceKinds.has(q.kind)).length,
  byKind: questions.reduce((out, q) => { out[q.kind] = (out[q.kind] || 0) + 1; return out; }, {}),
  findings: findings.length,
  byRule,
  examples: findings.slice(0, 20),
};
console.log(JSON.stringify(result, null, 2));
if (findings.length) process.exitCode = 1;
