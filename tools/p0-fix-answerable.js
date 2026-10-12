#!/usr/bin/env node
/*
 * p0-fix-answerable.js -- make every banked question actually answerable.
 *
 * Two blocking defects shipped in the hand-authored blocks:
 *
 *   1. 58 `order` questions carry no `tokens` at all. betaShuffle(undefined)
 *      yields [] so the word bank renders empty and checkOrder() can never
 *      succeed. The learner is hard-stopped at a1-u15, ~5% into the course.
 *
 *   2. 48 `word` questions put the ENGLISH headword in `answer` while `options`
 *      are four Chinese glosses. The keyed answer is therefore not a member of
 *      the option set, so every pick is graded wrong and the lesson can never
 *      be finished. The other 528 `word` questions use the Chinese gloss as
 *      `answer` (always identical to `translation` and sitting at options[0]).
 *
 * Fix 1 only FILLS missing tokens and never overwrites existing ones, because
 * one question (b1-u1-l1-q4) legitimately uses a multi-word tile,
 * ["Have","you","confirmed","the handoff date","yet?"], which answer.split(' ')
 * would shatter. The invariant grading actually relies on is
 * tokens.join(' ') === answer, not equality with split(' ').
 *
 * Fix 2 only rewrites `answer` to `translation` when translation is already a
 * member of options, so it cannot invent a correct option that is not shown.
 *
 * Idempotent: re-running reports 0 changes.
 *
 *   node tools/p0-fix-answerable.js            # dry run, prints the plan
 *   node tools/p0-fix-answerable.js --write    # apply to course-data/blocks
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOCKS = path.join(ROOT, 'course-data', 'blocks');
const WRITE = process.argv.includes('--write');

const blocks = fs.readdirSync(BLOCKS).filter((f) => f.endsWith('.json')).sort();
let filledTokens = 0;
let fixedWordAnswers = 0;
let touchedFiles = 0;
const notes = [];

for (const file of blocks) {
  const full = path.join(BLOCKS, file);
  const raw = fs.readFileSync(full, 'utf8');
  const block = JSON.parse(raw);
  // Preserve each file's existing formatting: some blocks are pretty-printed,
  // others are single-line, and rewriting them all the same way would bury the
  // real change in a wall of whitespace.
  const indent = /\r?\n/.test(raw) ? 2 : 0;
  let dirty = false;

  const lessons = Array.isArray(block.lessons) ? block.lessons : [block];
  for (const lesson of lessons) {
    for (const q of (lesson.questions || [])) {
      // Fix 1 -- synthesise a token bank for order questions that have none.
      if (q.kind === 'order' && (!Array.isArray(q.tokens) || q.tokens.length === 0)) {
        if (typeof q.answer !== 'string' || !q.answer.trim()) {
          notes.push(`SKIP ${q.id}: order question without a usable answer`);
          continue;
        }
        const tokens = q.answer.split(' ');
        if (tokens.join(' ') !== q.answer) {
          notes.push(`SKIP ${q.id}: tokens would not reassemble into the answer`);
          continue;
        }
        q.tokens = tokens;
        filledTokens += 1;
        dirty = true;
      }

      // Fix 2 -- `word` answers must be one of the displayed glosses.
      if (q.kind === 'word' && Array.isArray(q.options) && !q.options.includes(q.answer)) {
        if (!q.options.includes(q.translation)) {
          notes.push(`SKIP ${q.id}: translation ${JSON.stringify(q.translation)} is not an option`);
          continue;
        }
        if (q.options.filter((o) => o === q.translation).length !== 1) {
          notes.push(`SKIP ${q.id}: translation appears more than once in options`);
          continue;
        }
        q.answer = q.translation;
        fixedWordAnswers += 1;
        dirty = true;
      }
    }
  }

  if (dirty) {
    touchedFiles += 1;
    if (WRITE) {
      const body = JSON.stringify(block, null, indent);
      fs.writeFileSync(full, raw.endsWith('\n') || raw.endsWith('\r\n') ? body + '\n' : body, 'utf8');
    }
  }
}

console.log(WRITE ? 'APPLIED' : 'DRY RUN (no files written; pass --write to apply)');
console.log(`  blocks scanned      : ${blocks.length}`);
console.log(`  blocks modified     : ${touchedFiles}`);
console.log(`  order tokens filled : ${filledTokens}`);
console.log(`  word answers fixed  : ${fixedWordAnswers}`);
if (notes.length) {
  console.log('  skipped:');
  notes.forEach((n) => console.log(`    ${n}`));
}
