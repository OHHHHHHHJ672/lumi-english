/*
 * P0 content fixes (validate-course.js exit=0 blockers):
 *
 * 1. 24 hand-authored `choice` questions (b1-u25..u36, b2-u7..u18) carry a
 *    Chinese prompt/answer while their `audio` holds an unrelated English
 *    sentence. The lesson already contains the correct English for that
 *    Chinese at q9.options[1] (paired with q9.options[2] === q8.answer), so we
 *    retarget prompt/audio to it instead of authoring new sentences.
 *
 * 2. Three hand-authored `word` prompts ("venue" / "webinar" / "estimate")
 *    collide with the generated expansion lessons, which also emit the bare
 *    word. The rest of the hand-authored word prompts use
 *    "<word> · <lesson title>"; applying that suffix makes the keys unique.
 */
const fs = require('fs');
const path = require('path');

const blocksDir = path.join(__dirname, '..', 'course-data', 'blocks');
const hasCn = (value) => /[\u4e00-\u9fff]/.test(String(value || ''));
const badPrompt = /(?:A1|A2|B1|B2)\s+lesson|this lesson|the word .* is useful|The sentence includes|This lesson introduces|本课介绍/i;

const assert = (cond, message) => { if (!cond) throw new Error(message); };

const lessons = [];
for (let u = 25; u <= 36; u += 1) lessons.push('b1-u' + u + '-l1');
for (let u = 7; u <= 18; u += 1) lessons.push('b2-u' + u + '-l1');

let changed = 0;

// --- 1. retarget the 24 broken choice questions -----------------------------
for (const id of lessons) {
  const file = path.join(blocksDir, id + '.json');
  const block = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert(block.sourceStatus === 'hand-authored', id + ' is not hand-authored');

  const q8 = block.questions.find((q) => q.id.endsWith('-q8'));
  const q9 = block.questions.find((q) => q.id.endsWith('-q9'));
  const q5 = block.questions.find((q) => q.id.endsWith('-q5'));
  assert(q8 && q9 && q5, id + ' missing questions');

  const cn = q8.answer;
  assert(hasCn(q8.prompt), id + '-q8 prompt is not Chinese; skipping');

  // q9.options[1] is the English of q8.answer, q9.options[2] repeats the Chinese.
  const en = q9.options[1];
  assert(q9.options[2] === cn, id + ' q9.options[2] !== q8.answer, cannot derive English');
  assert(!hasCn(en) && !en.includes('_____'), id + ' derived English is unusable: ' + en);
  assert(!badPrompt.test(en), id + ' derived English looks generic: ' + en);

  const distractor = q5.translation;
  assert(hasCn(distractor), id + ' q5.translation is not Chinese');
  assert(distractor !== cn, id + ' distractor equals the answer');
  assert(!q8.options.includes(distractor), id + ' distractor already in options');

  const options = [cn, distractor, q8.options[2], q8.options[3]];
  assert(options.every((o) => hasCn(o)), id + ' options must all be Chinese');
  assert(new Set(options).size === 4, id + ' options are not unique: ' + JSON.stringify(options));
  assert(options.filter((o) => o === cn).length === 1, id + ' answer must appear exactly once');
  assert(q8.translation === cn, id + ' translation no longer matches the answer');

  q8.prompt = en;
  q8.audio = en;
  q8.options = options;

  fs.writeFileSync(file, JSON.stringify(block, null, 2) + '\n');
  changed += 1;
  console.log('q8 fixed ' + id + ' -> ' + en);
}

// --- 2. de-duplicate hand-authored word prompts ------------------------------
const dupFixes = [
  { id: 'a2-u34-l1', qid: 'a2-u34-l1-q1' },
  { id: 'a2-u32-l1', qid: 'a2-u32-l1-q1' },
  { id: 'a2-u35-l1', qid: 'a2-u35-l1-q7' },
];
for (const fix of dupFixes) {
  const file = path.join(blocksDir, fix.id + '.json');
  const block = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert(block.sourceStatus === 'hand-authored', fix.id + ' is not hand-authored');
  const question = block.questions.find((q) => q.id === fix.qid);
  assert(question, fix.qid + ' missing');
  if (question.prompt.includes(' · ')) {
    console.log('dup skip ' + fix.qid + ' (already themed)');
    continue;
  }
  assert(!hasCn(question.prompt), fix.qid + ' prompt already carries Chinese: ' + question.prompt);
  question.prompt = question.prompt + ' · ' + block.title;
  fs.writeFileSync(file, JSON.stringify(block, null, 2) + '\n');
  changed += 1;
  console.log('dup fixed ' + fix.qid + ' -> ' + question.prompt);
}

console.log('blocks changed: ' + changed);
