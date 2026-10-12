/**
 * Strip machine-injected time adjuncts from the A2 content block.
 *
 * Eleven choice prompts and twelve listening audios were generated with a
 * trailing time adjunct ("during the afternoon" / "before dinner") that the
 * authored answer deliberately omits, while `translation` inconsistently kept
 * it. That left the learner picking an option that dropped part of the
 * sentence, and on a wrong answer the feedback printed nonsense Chinese such
 * as "我们的学期六月结束，在下午。".
 *
 * The adjunct is not confined to one slot: it also appears at q2 in b1-u9 and b2-u41, and it occurs where it is entirely correct (a1-u70-l1-q5 is an ordinary A1 cloze whose translation carries it too). So the trigger is a translation carrying the adjunct while the answer does not -- never the mere presence of the phrase.
 *
 * Fix: drop the adjunct from prompt/audio so the English matches the authored
 * answer, then pin `translation` to `answer`. Questions whose `instruction` is
 * a specific comprehension question ("门旁边有什么？") legitimately carry a
 * different answer and translation, so they are left alone -- they are only
 * touched here if their translation ends in a junk adjunct, which none do.
 *
 * Dry run by default; pass --write to persist.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BLOCKS = path.join(ROOT, 'course-data', 'blocks');
const WRITE = process.argv.includes('--write');

const EN_ADJUNCT = ['during the afternoon', 'before dinner'];
// Comma-appended time word at the end of a Chinese string. The generator wrote
// these in three spellings (在下午 / 晚饭前 / 晚饭后 / 本月), so the pattern is
// matched as a class rather than by the two spellings first observed.
const JUNK_CN = /，(?:在下午|晚饭前|晚饭后|下午|晚上|早上|本月|上周|下周|今天|明天|昨天|周末|本周)。?$/;
const stripChineseJunk = (value) => String(value).replace(/，(?:在下午|晚饭前|晚饭后|下午|晚上|早上|本月|上周|下周|今天|明天|昨天|周末|本周)。?$/, '');

/**
 * One-off: a1-u15-l1-q3 has the mirror-image defect. Its audio and translation
 * are both correct and both keep "before bed"; it is the answer (and its slot
 * in options) that was truncated.
 *
 * Evidence for treating the answer as the broken side rather than the audio:
 * all 23 well-formed listen questions whose audio carries a time marker keep
 * that marker in the answer ("We have a science test tomorrow." -> "我们明天有
 * 科学考试。"), and the sibling question in this very lesson has
 * answer === translation exactly. The instruction here is also 先听完整句子，
 * "listen to the whole sentence first" -- an answer that drops a clause
 * contradicts it.
 */
/**
 * A second shape: the adjunct is present but answer and translation already
 * agree, because the translator simply followed it. Nothing looks broken to the
 * learner, so the trigger above never fires -- yet the sentence itself is
 * nonsense: a B2 lesson on macro liquidity must not claim "This route is
 * shorter than the other one before dinner", and a2-u1's English says "during
 * the afternoon" while its Chinese reads "下午的截止日期", which are two
 * different claims. Dropping the adjunct and the matching time phrase keeps
 * prompt, audio, answer and translation aligned.
 *
 * a1-u70-l1-q5 is deliberately absent: there the cloze, the audio and the
 * translation all need "before dinner" and the sentence makes sense with it.
 */
function stripAdjunct([was, now]) {
  return (q) => {
    if (q.answer !== was || q.translation !== was) return false;
    q.prompt = stripEnglish(q.prompt);
    q.audio = stripEnglish(q.audio);
    q.answer = now;
    q.translation = now;
    if (Array.isArray(q.options)) {
      const at = q.options.indexOf(was);
      if (at >= 0) q.options[at] = now;
    }
    return true;
  };
}

const MANUAL_FIXES = {
  'a1-u15-l1-q3': (q) => {
    const full = q.translation;
    if (!full || !Array.isArray(q.options)) return false;
    const short = q.answer;
    if (q.options.includes(full)) return false;
    const at = q.options.indexOf(short);
    if (at < 0) return false;
    q.options[at] = full;
    q.answer = full;
    return true;
  },
  'a2-u1-l1-q8': stripAdjunct(['团队在下午的截止日期前完成了报告。', '团队在截止日期前完成了报告。']),
};

const out = [];
const p = (...a) => out.push(a.join(' '));

function stripEnglish(text) {
  if (typeof text !== 'string') return text;
  let next = text;
  for (const adj of EN_ADJUNCT) {
    // "…during the afternoon." -> "…." (keep the sentence period)
    next = next.replace(new RegExp(`\\s+${adj}(\\.)$`, 'i'), '$1');
    // "…during the afternoon" -> "…"
    next = next.replace(new RegExp(`\\s+${adj}$`, 'i'), '');
  }
  return next.trim();
}

const files = fs.readdirSync(BLOCKS).filter((f) => f.endsWith('.json')).sort();
let touched = 0;
let blockHits = 0;
const failures = [];
const warnings = [];

for (const file of files) {
  const full = path.join(BLOCKS, file);
  const raw = fs.readFileSync(full, 'utf8');
  const block = JSON.parse(raw);
  const questions = block.questions || [];
  let changed = 0;

  for (const q of questions) {
    const before = {
      prompt: q.prompt, audio: q.audio, translation: q.translation,
      answer: q.answer, options: q.options && q.options.join('\u0000'),
    };
    let dirty = false;

    // The trigger is the translation itself. Scanning prompt/audio instead
    // would also catch legitimate content: a1-u70-l1-q5 is an ordinary A1
    // cloze ("We _____ the floor before dinner.") whose translation carries the
    // adjunct too, and a2-u1-l1-q8 has the time reference baked into its
    // authored answer. Stripping those would break a question that was fine.
    const junked = typeof q.translation === 'string' && JUNK_CN.test(q.translation);
    if (junked && typeof q.answer === 'string') {
      if (q.answer === q.translation && JUNK_CN.test(q.answer)) {
        // Both halves carry the same generated suffix, so there is no correct
        // side to pin to. Drop it from each instead, and re-key the option pool
        // -- the only place the answer has to stay reachable for grading.
        //
        // Some option sets used the suffix to make two copies of one sentence
        // look distinct ("…讨论交通堵塞。" beside "…讨论交通堵塞。，晚饭后。"),
        // so stripping would collapse them into a duplicate and leave the
        // question with two identical choices. Those are not something a suffix
        // removal can fix -- they need a real distractor -- so the question is
        // left untouched and reported instead.
        const clean = stripChineseJunk(q.translation);
        const at = Array.isArray(q.options) ? q.options.indexOf(before.answer) : -1;
        const collapsed = at >= 0 && q.options.some((option, index) => index !== at && option === clean);
        if (collapsed) {
          // A pre-existing content gap, not a migration error: these lessons
          // are still marked pending-manual-rewrite and are not loaded at
          // runtime (course.js only trusts sourceStatus === 'hand-authored').
          // Authoring nineteen replacement distractors here would be writing
          // content that the pending rewrite is going to replace anyway, so
          // they are listed rather than patched.
          warnings.push(`${q.id}: suffix is masking a duplicated option, needs a real distractor (left untouched)`);
        } else {
          q.answer = clean;
          q.translation = clean;
          if (at >= 0) q.options[at] = clean;
          dirty = true;
        }
      } else {
        q.translation = q.answer;
        if (typeof q.prompt === 'string') q.prompt = stripEnglish(q.prompt);
        if (typeof q.audio === 'string') q.audio = stripEnglish(q.audio);
        dirty = true;
      }
    }

    const manual = MANUAL_FIXES[q.id];
    if (manual && manual(q)) dirty = true;

    if (dirty) {
      changed += 1;
      touched += 1;
      // validate-authored-blocks only inspects hand-authored blocks, so the
      // grading invariants have to be re-checked here for pending content --
      // otherwise a strip could silently un-key the answer and nothing would
      // say so until the block is promoted.
      if (Array.isArray(q.options)) {
        if (['choice', 'listen', 'fill', 'word'].includes(q.kind) && !q.options.includes(q.answer)) {
          failures.push(`${q.id}: answer is no longer one of the options`);
        }
        if (new Set(q.options).size !== q.options.length) {
          failures.push(`${q.id}: options are no longer unique`);
        }
      }
      p(`  ${q.id.padEnd(14)} [${q.kind}]`);
      if (before.prompt !== q.prompt) p(`     prompt     : ${JSON.stringify(before.prompt)} -> ${JSON.stringify(q.prompt)}`);
      if (before.audio !== q.audio) p(`     audio      : ${JSON.stringify(before.audio)} -> ${JSON.stringify(q.audio)}`);
      if (before.translation !== q.translation) p(`     translation: ${JSON.stringify(before.translation)} -> ${JSON.stringify(q.translation)}`);
      if (before.answer !== q.answer) p(`     answer     : ${JSON.stringify(before.answer)} -> ${JSON.stringify(q.answer)}`);
      const optNow = q.options && q.options.join('\u0000');
      if (before.options !== optNow) p(`     options    : ${JSON.stringify(before.options && before.options.split('\u0000'))} -> ${JSON.stringify(q.options)}`);
    }
  }

  if (changed) {
    blockHits += 1;
    p(`--- ${file}: ${changed} question(s) changed ---`);
    if (WRITE) fs.writeFileSync(full, JSON.stringify(block, null, 2) + '\n', 'utf8');
  }
}

p('');
p(WRITE ? 'WRITTEN' : 'DRY RUN (pass --write to persist)');
p(`blocks touched: ${blockHits}, questions touched: ${touched}`);
if (warnings.length) {
  p('');
  p(`LEFT UNTOUCHED (${warnings.length}, needs authored content):`);
  warnings.forEach((w) => p('  ' + w));
}
if (failures.length) {
  p('');
  p('FAILURES:');
  failures.forEach((f) => p('  ' + f));
}
fs.writeFileSync(path.join(ROOT, '.diag.txt'), out.join('\n'), 'utf8');
console.log(out.join('\n'));
if (failures.length) process.exitCode = 1;
