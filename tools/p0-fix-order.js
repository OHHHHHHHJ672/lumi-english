/* Repair order questions whose answer was authored in Chinese.
   checkOrder() grades by `tokens.join(' ') === question.answer`, and tokens are
   English, so a Chinese answer key made the question impossible to pass. The
   English answer is already present as `audio` (and as the joined tokens). */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'course-data', 'blocks');
const hasCn = (v) => /[一-鿿]/.test(String(v || ''));

let fixed = 0;
const log = [];
for (const file of fs.readdirSync(root).filter((n) => n.endsWith('.json'))) {
  const full = path.join(root, file);
  const block = JSON.parse(fs.readFileSync(full, 'utf8'));
  let dirty = false;
  for (const q of block.questions || []) {
    if (q.kind !== 'order' || !hasCn(q.answer)) continue;
    const joined = Array.isArray(q.tokens) ? q.tokens.join(' ') : '';
    const english = !hasCn(joined) ? joined : String(q.audio || '');
    if (!english || hasCn(english)) {
      log.push(` ${q.id} !! no English answer available; skipped`);
      continue;
    }
    q.answer = english;
    dirty = true;
    fixed += 1;
    log.push(` ${q.id} answer -> "${english}"`);
  }
  if (dirty) fs.writeFileSync(full, JSON.stringify(block, null, 2) + '\n');
}
console.log('order answers repaired:', fixed);
console.log(log.join('\n'));
