/*
 * Second pass on the 24 broken `choice` questions.
 *
 * validate-authored-blocks.js keys every non-word question by its `audio` and
 * requires that key to be globally unique, so reusing the lesson's existing
 * English (q9.options[1], which is q4's sentence) collides. Each of these
 * questions already carries its own unique English sentence in `audio` and is
 * only missing the Chinese that goes with it, so restore that sentence as the
 * prompt and supply its translation.
 */
const fs = require('fs');
const path = require('path');

const blocksDir = path.join(__dirname, '..', 'course-data', 'blocks');
const hasCn = (value) => /[\u4e00-\u9fff]/.test(String(value || ''));
const assert = (cond, message) => { if (!cond) throw new Error(message); };

// lesson id -> [unique English sentence for the question, its Chinese]
const fixes = {
  'b1-u25-l1': ['The follow-up makes the conclusion more honest.', '这次追问让结论更诚实。'],
  'b1-u26-l1': ['I will report it and change my password.', '我会举报它并修改密码。'],
  'b1-u27-l1': ['I will add the bus data to the recommendation.', '我会把公交数据加入建议中。'],
  'b1-u28-l1': ['That protects the project’s impact while we seek funding.', '这能在我们寻求资金的同时保护项目的影响。'],
  'b1-u29-l1': ['That support will help me decide confidently.', '这种支持会帮助我自信地做决定。'],
  'b1-u30-l1': ['That makes the visual easier to discuss.', '这让图表更容易讨论。'],
  'b1-u31-l1': ['I will compare the result with the written standard.', '我会把结果与书面标准进行比较。'],
  'b1-u32-l1': ['I will ask for a meeting and bring my career plan.', '我会要求一次会面并带上我的职业规划。'],
  'b1-u33-l1': ['Then we can end with owners and dates.', '这样我们就能在明确负责人和日期后结束。'],
  'b1-u34-l1': ['I will explain that trade-off in the finance note.', '我会在财务说明中解释那个取舍。'],
  'b1-u35-l1': ['That may reveal concerns the online form missed.', '这可能会揭示在线表格遗漏的顾虑。'],
  'b1-u36-l1': ['I will revise the greeting and keep the request clear.', '我会修改问候语并保持请求清晰。'],
  'b2-u7-l1': ['Agreed. I will add the limitation to the conclusion.', '同意。我会把这一局限写进结论。'],
  'b2-u8-l1': ['That gives me evidence before I make a risky move.', '这在我做出有风险的决定前给了我证据。'],
  'b2-u9-l1': ['I will review the budget before renewing the lease.', '我会在续租前审阅预算。'],
  'b2-u10-l1': ['That makes the route safer for the whole group.', '这让整条路线对全组人更安全。'],
  'b2-u11-l1': ['I will report the message and reset my password.', '我会举报这条消息并重置密码。'],
  'b2-u12-l1': ['Then we know where to file a claim if the delay continues.', '这样我们就知道如果延误持续该向哪里提出索赔。'],
  'b2-u13-l1': ['That distinction helps. When should I contact you again?', '这个区分很有帮助。我应该什么时候再联系你？'],
  'b2-u14-l1': ['That would solve the urgent problem first.', '这会先解决最紧迫的问题。'],
  'b2-u15-l1': ['That could protect the next order from the same shortage.', '这可能保护下一批订单免受同样的短缺影响。'],
  'b2-u16-l1': ['That information will help families make a calm plan.', '这些信息会帮助家庭制定冷静的计划。'],
  'b2-u17-l1': ['We should add the agreement before publishing.', '我们应该在发布前补上这份协议。'],
  'b2-u18-l1': ['Good. The response letter should follow the reviewer’s order.', '好的。回复信应该按照审稿人的顺序来写。'],
};

for (const [id, [en, cn]] of Object.entries(fixes)) {
  const file = path.join(blocksDir, id + '.json');
  const block = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert(block.sourceStatus === 'hand-authored', id + ' is not hand-authored');

  const q8 = block.questions.find((q) => q.id.endsWith('-q8'));
  assert(q8 && q8.kind === 'choice', id + '-q8 is not a choice question');

  const existing = block.questions.find((q) => q.id.endsWith('-q4'));
  assert(String(existing.answer || existing.audio).toLowerCase() !== en.toLowerCase(),
    id + ' q8 English collides with q4');

  // Two Chinese distractors that already belong to this lesson, plus the
  // Chinese that used to sit in the prompt slot (its English is q4's sentence).
  const distractorA = q8.options[1];
  const distractorB = q8.options[2];
  const distractorC = q8.answer;
  assert([distractorA, distractorB, distractorC].every((o) => hasCn(o)),
    id + ' distractors must be Chinese');
  assert(distractorC !== cn, id + ' legacy Chinese already equals the new answer');

  const options = [cn, distractorA, distractorB, distractorC];
  assert(new Set(options).size === 4, id + ' options are not unique: ' + JSON.stringify(options));
  assert(options.filter((o) => o === cn).length === 1, id + ' answer must appear exactly once');

  q8.prompt = en;
  q8.audio = en;
  q8.answer = cn;
  q8.translation = cn;
  q8.options = options;

  fs.writeFileSync(file, JSON.stringify(block, null, 2) + '\n');
  console.log('q8 rebuilt ' + id + ' -> ' + en + ' / ' + cn);
}

console.log('blocks changed: ' + Object.keys(fixes).length);
