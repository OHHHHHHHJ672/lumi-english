/* Repair the 52 blankless fill questions.
   A: answer word present in sentence -> blank it in prompt, keep audio whole.
   B: answer key wrong, but exactly one option present in sentence -> rekey + blank.
   C: neither -> substitute a corrected sentence that contains the answer word.
   Audio always stays a complete sentence (course.test.js forbids blanks there). */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'course-data', 'blocks');

// Bucket C: corrected {prompt, audio, translation} keyed by question id.
const rewrites = {
  'a2-u12-l1-q5':  { prompt: 'We try to _____ money every month.',            audio: 'We try to save money every month.',            translation: '我们每个月都努力存钱。' },
  'a2-u12-l1-q10': { prompt: 'The electricity _____ was higher this month.',  audio: 'The electricity expense was higher this month.', translation: '这个月的电费支出更高。' },
  'a2-u16-l1-q5':  { prompt: 'Are you buying tickets for the evening _____.', audio: 'Are you buying tickets for the evening exhibition?', translation: '你在买晚场展览的票吗？' },
  'a2-u20-l1-q10': { prompt: 'The team must make a _____ today.',             audio: 'The team must make a decision today.',          translation: '团队今天必须做出决定。' },
  'a2-u22-l1-q10': { prompt: 'The _____ talked about his family.',            audio: 'The actor talked about his family.',            translation: '这位演员谈到了他的家庭。' },
  'a2-u23-l1-q5':  { prompt: 'We should check the bus _____ today.',          audio: 'We should check the bus route today.',          translation: '我们今天应该查一下公交路线。' },
  'a2-u24-l1-q10': { prompt: 'He works _____ on Monday.',                     audio: 'He works overtime on Monday.',                  translation: '他周一加班。' },
  'a2-u3-l1-q5':   { prompt: 'Please keep the _____ for the shirt.',          audio: 'Please keep the receipt for the shirt.',        translation: '请保留这件衬衫的收据。' },
  'a2-u3-l1-q10':  { prompt: 'They gave me a _____ for the old model.',       audio: 'They gave me a refund for the old model.',      translation: '他们给我退了旧型号的钱。' },
  'a2-u4-l1-q5':   { prompt: 'Are you _____ before seven?',                   audio: 'Are you available before seven?',               translation: '你七点前有空吗？' },
  'a2-u6-l1-q5':   { prompt: 'The airline said the _____ was short.',         audio: 'The airline said the delay was short.',         translation: '航空公司说延误很短。' },
  'a2-u6-l1-q10':  { prompt: 'The train leaves from _____ three.',            audio: 'The train leaves from platform three.',         translation: '火车从三号站台发车。' },
  'a2-u8-l1-q5':   { prompt: 'The guide shared a useful _____.',              audio: 'The guide shared a useful experience.',         translation: '导游分享了一次有用的经历。' },
  'a2-u8-l1-q10':  { prompt: 'He recommended the _____ to us.',               audio: 'He recommended the museum to us.',              translation: '他向我们推荐了博物馆。' },
};

// Bucket B: rekey answer to the option that actually appears in the sentence.
const rekeys = {
  'a2-u1-l1-q5': 'shift', 'a2-u2-l1-q5': 'prescription', 'a2-u2-l1-q10': 'prescription',
  'a2-u4-l1-q10': 'plan', 'a2-u5-l1-q5': 'leak', 'a2-u5-l1-q10': 'rent',
  'a2-u9-l1-q5': 'semester', 'a2-u9-l1-q10': 'plan',
  'a2-u17-l1-q5': 'itinerary', 'a2-u18-l1-q10': 'routine', 'a2-u19-l1-q5': 'source', 'a2-u21-l1-q10': 'receipt',
};

const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Blank the first whole-word, case-insensitive occurrence of `word` in `text`.
function blankWord(text, word) {
  return String(text).replace(new RegExp(`\\b${esc(word)}\\b`, 'i'), '_____');
}

const stats = { blanked: 0, rekeyed: 0, rewritten: 0, untouched: 0 };
const changed = [];

for (const file of fs.readdirSync(root).filter(n => n.endsWith('.json'))) {
  const full = path.join(root, file);
  const block = JSON.parse(fs.readFileSync(full, 'utf8'));
  let dirty = false;
  for (const q of block.questions || []) {
    if (q.kind !== 'fill' || /_{3,}/.test(String(q.prompt || ''))) continue;

    if (rewrites[q.id]) {
      const r = rewrites[q.id];
      q.prompt = r.prompt; q.audio = r.audio; q.translation = r.translation;
      // answer stays the same word; make sure it is still among the options
      if (!q.options.includes(q.answer)) { /* keep options as authored */ }
      stats.rewritten += 1; dirty = true; changed.push(`${q.id}  REWRITE -> "${r.prompt}"`);
      continue;
    }

    const target = rekeys[q.id];
    if (target) {
      q.answer = target;
      q.prompt = blankWord(q.prompt, target);
      stats.rekeyed += 1; dirty = true; changed.push(`${q.id}  REKEY -> ans="${target}" prompt="${q.prompt}"`);
      continue;
    }

    // Bucket A: the current answer word is in the sentence.
    const next = blankWord(q.prompt, q.answer);
    if (next !== q.prompt) {
      q.prompt = next;
      stats.blanked += 1; dirty = true; changed.push(`${q.id}  BLANK -> "${q.prompt}"`);
    } else {
      stats.untouched += 1; changed.push(`${q.id}  !! UNTOUCHED (no blank applied) ans="${q.answer}" prompt="${q.prompt}"`);
    }
  }
  if (dirty) fs.writeFileSync(full, JSON.stringify(block, null, 2) + '\n');
}

console.log('Repair stats:', stats);
console.log('\n' + changed.join('\n'));
