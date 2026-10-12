// One-off content migration (idempotent): course-data/blocks/
//
// 1. 19 fill questions whose blank was followed by a verb or adjective used as
//    a noun ("The team has _____ the clarify before the meeting."). The object
//    and the Chinese gloss are rewritten together; the answer and its options
//    are untouched.
// 2. 24 hand-authored listen questions (a2-u1..a2-u12, q3 and q9) that shipped
//    the English sentence in `prompt`. questionPromptHtml renders `prompt`
//    inside <h2>, so the learner could read the answer instead of listening.
//
// Run: node tools/p0-fix-fills2.js
// Then: node tools/rebuild-authored-bundle.js && node tools/validate-authored-blocks.js
const fs = require('fs');
const path = require('path');

const BLOCKS = path.join(__dirname, '..', 'course-data', 'blocks');

// qid -> [oldObject, newObject, newTranslation]
const FILL_FIXES = {
  'b1-u15-l1-q5': ['flexible', 'summary', '团队在会议前已经审阅了摘要。'],
  'b1-u16-l1-q5': ['clarify', 'statement', '团队在会议前已经审阅了声明。'],
  'b1-u17-l1-q10': ['reusable', 'emissions', '我们应该在周五前澄清排放。'],
  'b1-u20-l1-q10': ['interpret', 'nuance', '我们应该在周五前澄清细微差别。'],
  'b1-u22-l1-q5': ['negotiate', 'proposal', '团队在会议前已经审阅了提案。'],
  'b1-u24-l1-q10': ['belonging', 'sense of belonging', '我们应该在周五前澄清归属感。'],
  'b1-u26-l1-q5': ['credible', 'privacy policy', '团队在会议前已经审阅了隐私政策。'],
  'b1-u26-l1-q10': ['verify', 'verification results', '我们应该在周五前审阅验证结果。'],
  'b1-u27-l1-q10': ['implement', 'implementation plan', '我们应该在周五前审阅实施计划。'],
  'b1-u31-l1-q5': ['inspect', 'defects', '团队在会议前已经审阅了缺陷。'],
  'b1-u35-l1-q5': ['respond', 'response', '团队在会议前已经审阅了回应。'],
  'b1-u36-l1-q10': ['equivalent', 'equivalent wording', '我们应该在周五前审阅对应的措辞。'],
  'b2-u8-l1-q5': ['transferable', 'transition plan', '团队必须在周五前审阅过渡计划。'],
  'b2-u9-l1-q10': ['monetary', 'monetary policy', '我们应该仔细审阅货币政策。'],
  'b2-u10-l1-q10': ['vulnerable', 'vulnerable groups', '我们应该仔细审阅弱势群体。'],
  'b2-u11-l1-q10': ['authenticate', 'authentication log', '我们应该仔细审阅身份验证日志。'],
  'b2-u12-l1-q5': ['liable', 'liability report', '团队必须在周五前审阅责任报告。'],
  'b2-u12-l1-q10': ['comply', 'compliance records', '我们应该仔细审阅合规记录。'],
  'b2-u18-l1-q5': ['revise', 'revised draft', '团队必须在周五前审阅修订稿。'],
};

const LISTEN_PROMPT = '听句子，选择意思。';
const isChinese = (value) => /[一-鿿]/.test(String(value || ''));

const lessonIds = [...new Set([
  ...Object.keys(FILL_FIXES).map((id) => id.replace(/-q\d+$/, '')),
  ...Array.from({ length: 12 }, (_, i) => `a2-u${i + 1}-l1`),
])];

let fillsChanged = 0;
let listensChanged = 0;

for (const lessonId of lessonIds) {
  const file = path.join(BLOCKS, `${lessonId}.json`);
  if (!fs.existsSync(file)) {
    console.error(`  MISSING block: ${lessonId}`);
    process.exitCode = 1;
    continue;
  }
  const block = JSON.parse(fs.readFileSync(file, 'utf8'));
  let touched = false;

  for (const question of block.questions || []) {
    const fix = FILL_FIXES[question.id];
    if (fix) {
      const [oldObject, newObject, newTranslation] = fix;
      if (String(question.prompt).includes(`the ${newObject}`)) continue; // already migrated
      if (!question.prompt || !question.prompt.includes(`the ${oldObject}`)) {
        console.error(`  ${question.id}: expected "the ${oldObject}" in ${JSON.stringify(question.prompt)}`);
        process.exitCode = 1;
        continue;
      }
      question.prompt = question.prompt.replace(`the ${oldObject}`, `the ${newObject}`);
      question.audio = String(question.audio || '').replace(`the ${oldObject}`, `the ${newObject}`);
      question.translation = newTranslation;
      fillsChanged += 1;
      touched = true;
    }

    if (question.kind === 'listen' && !isChinese(question.prompt)) {
      question.prompt = LISTEN_PROMPT;
      listensChanged += 1;
      touched = true;
    }
  }

  if (touched) fs.writeFileSync(file, `${JSON.stringify(block, null, 2)}\n`, 'utf8');
}

console.log(`fill questions rewritten : ${fillsChanged}`);
console.log(`listen prompts rewritten  : ${listensChanged}`);
