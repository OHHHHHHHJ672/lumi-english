/**
 * Give the eight A2 lessons whose q9 (listen) and q10 (fill) drilled the very
 * same English sentence a distinct q9 sentence of their own.
 *
 * The shared sentence was previously hidden from the duplicate-sentence check
 * only because a generated time adjunct ("before dinner") had been appended to
 * q9's audio. Stripping that junk in fix-time-adjuncts.js exposed the real gap:
 * these lessons were authored with nine distinct sentences, not ten, while the
 * other 280 lessons keep q9 and q10 apart (several using deliberate near
 * synonyms, e.g. a2-u12's "bill" vs "expense").
 *
 * Relaxing the uniqueness rule instead would have been the smaller diff, but it
 * would trade a real content gap for a weakened guard.
 *
 * Each replacement matches its lesson's grammarFocus and vocabulary, and keeps
 * the existing option pool (the other sentences of the lesson) intact -- only
 * the keyed answer moves to options[0].
 *
 * Dry run by default; pass --write to persist.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BLOCKS = path.join(ROOT, 'course-data', 'blocks');
const WRITE = process.argv.includes('--write');

const REPLACEMENTS = {
  // office schedule / past-simple
  'a2-u1-l1': ['I sent a message to the whole team.', '我给整个团队发了消息。'],
  // seeing a doctor / present-perfect
  'a2-u2-l1': ['The doctor has given me a new prescription.', '医生给我开了新的处方。'],
  // social plans / future ("be going to")
  'a2-u4-l1': ['We are going to meet outside the library.', '我们打算在图书馆外碰面。'],
  // renting / present-perfect
  'a2-u5-l1': ['I have told the landlord about the leak.', '我已经把漏水的事告诉了房东。'],
  // digital habits / imperatives
  'a2-u7-l1': ['Do not download files from unknown sites.', '不要从陌生网站下载文件。'],
  // study plan / present-continuous
  'a2-u9-l1': ['The students are studying in the library now.', '学生们现在正在图书馆学习。'],
  // work email / present-perfect
  'a2-u10-l1': ['I have not read the message from the manager.', '我还没有看经理发来的消息。'],
  // community service / past-simple
  'a2-u11-l1': ['The volunteers planted trees near the river.', '志愿者们在河边种了树。'],
};

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const out = [];
const p = (...a) => out.push(a.join(' '));

// Index every sentence in the course so a replacement cannot silently collide
// with anything already taught.
const files = fs.readdirSync(BLOCKS).filter((f) => f.endsWith('.json')).sort();
const blocks = new Map();
const seen = new Map();
for (const file of files) {
  const block = JSON.parse(fs.readFileSync(path.join(BLOCKS, file), 'utf8'));
  blocks.set(block.id, { file, block });
  for (const q of block.questions || []) {
    const key = norm(q.audio || q.prompt);
    if (!key) continue;
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key).push(`${block.id}/${q.id}`);
  }
}

let changed = 0;
const errors = [];

for (const [blockId, [en, cn]] of Object.entries(REPLACEMENTS)) {
  const entry = blocks.get(blockId);
  if (!entry) { errors.push(`${blockId}: block not found`); continue; }
  const { file, block } = entry;
  const q9 = (block.questions || []).find((q) => /-q9$/.test(q.id));
  const q10 = (block.questions || []).find((q) => /-q10$/.test(q.id));
  if (!q9 || !q10) { errors.push(`${blockId}: q9 or q10 missing`); continue; }

  const key = norm(en);
  const clash = (seen.get(key) || []).filter((who) => !who.startsWith(`${blockId}/`));
  if (clash.length) { errors.push(`${blockId}: new sentence already used by ${clash.join(', ')}`); continue; }
  if (key === norm(q10.audio)) { errors.push(`${blockId}: new sentence still equals q10`); continue; }
  if (String(q9.answer) !== String(q9.translation)) { errors.push(`${blockId}: q9 answer/translation already disagree`); continue; }
  if (!Array.isArray(q9.options) || q9.options[0] !== q9.answer) {
    errors.push(`${blockId}: expected the keyed answer at options[0]`); continue;
  }

  const before = { audio: q9.audio, answer: q9.answer, translation: q9.translation };
  if (before.audio === en && before.answer === cn && before.translation === cn
    && Array.isArray(q9.options) && q9.options[0] === cn) {
    p(`  ${blockId}  already applied`);
    continue;
  }

  q9.audio = en;
  q9.answer = cn;
  q9.translation = cn;
  q9.options = [cn, ...q9.options.slice(1)];

  if (new Set(q9.options).size !== q9.options.length) { errors.push(`${blockId}: options would not be unique`); continue; }
  changed += 1;

  p(`  ${blockId}  grammarFocus=${block.grammarFocus || '(none)'}`);
  p(`     q9 audio      : ${JSON.stringify(before.audio)} -> ${JSON.stringify(q9.audio)}`);
  p(`     q9 answer/tr  : ${JSON.stringify(before.answer)} -> ${JSON.stringify(q9.answer)}`);
  p(`     q9 options[0] : ${JSON.stringify(q9.options[0])}`);
  p(`     q10 audio     : ${JSON.stringify(q10.audio)}  (kept)`);
  p(`     unique in course: yes`);

  if (WRITE) fs.writeFileSync(path.join(BLOCKS, file), JSON.stringify(block, null, 2) + '\n', 'utf8');
}

p('');
if (errors.length) {
  p('ERRORS:');
  errors.forEach((e) => p('  ' + e));
}
p(WRITE ? 'WRITTEN' : 'DRY RUN (pass --write to persist)');
p(`lessons changed: ${changed}, errors: ${errors.length}`);

fs.writeFileSync(path.join(ROOT, '.diag.txt'), out.join('\n'), 'utf8');
console.log(out.join('\n'));
if (errors.length) process.exitCode = 1;
