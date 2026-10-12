// Extract all unique English audio strings from the course for TTS pre-generation.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const assetsDir = path.join(__dirname, '..', 'app', 'src', 'main', 'assets');
const courseSrc = fs.readFileSync(path.join(assetsDir, 'course.js'), 'utf8');

const sandboxRequire = (p) => {
  if (p.includes('course-pack-2')) return require(path.join(assetsDir, 'course-pack-2.js'));
  return require(p);
};
const sandbox = { module: { exports: {} }, exports: {}, console, require: sandboxRequire, setTimeout, clearTimeout };
vm.createContext(sandbox);
vm.runInContext(courseSrc, sandbox);

const modExp = sandbox.module.exports;
const catalog = modExp.catalog || modExp;
if (!catalog || !catalog.questionBank) {
  console.error('Could not find catalog.questionBank. Export keys:', Object.keys(modExp));
  process.exit(1);
}

const sentences = new Map();
let totalQuestions = 0, withAudio = 0;

for (const [id, q] of Object.entries(catalog.questionBank)) {
  totalQuestions++;
  const text = (q.audio || '').trim();
  if (!text || /[\u4e00-\u9fff]/.test(text)) continue;
  withAudio++;
  const hash = crypto.createHash('md5').update(text.toLowerCase()).digest('hex').slice(0, 10);
  if (!sentences.has(hash)) sentences.set(hash, { id: hash, text });
}

const result = Array.from(sentences.values());
fs.writeFileSync(path.join(__dirname, 'tts-sentences.json'), JSON.stringify(result, null, 2), 'utf8');
console.log(`Total questions: ${totalQuestions}`);
console.log(`Questions with English audio: ${withAudio}`);
console.log(`Unique sentences: ${result.length}`);
console.log(`Sample:`, result.slice(0, 3).map(s => s.text));
