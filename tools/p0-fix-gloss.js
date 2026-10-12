// One-off content migration (idempotent): course-data/blocks/
//
// 36 hand-authored B1/B2 lessons shipped three related defects:
//
//   1. `choice` questions whose `translation` was still English. Prompt and
//      answer were then the same sentence, so the stem displayed the answer.
//   2. `order` questions whose `prompt` was the English sentence to be built,
//      so the tiles could simply be copied off the screen.
//   3. `listen` questions whose `audio` was taken from a dialogue line while
//      `answer` held the gloss of a different sentence. The learner heard one
//      sentence and was scored on the meaning of another.
//
// Sources of truth, in order:
//   * TRANSLATIONS  - the English -> Chinese gloss of every core sentence.
//   * dialogue.turns[].translation - the gloss of a dialogue line. This is what
//     ties a listen question back to the sentence actually played.
//   * listen options - the only option lists the first pass never rewrote, so
//     they still carry the lesson's original distractors.
//
// Listen questions that already answer in English are left alone: they are a
// coherent "choose the sentence you heard" task, and their options were built
// for it.
//
// Run: node tools/p0-fix-gloss.js
// Then: node tools/rebuild-authored-bundle.js && node tools/validate-authored-blocks.js
const fs = require('fs');
const path = require('path');

const BLOCKS = path.join(__dirname, '..', 'course-data', 'blocks');
const hasCn = (v) => /[一-鿿]/.test(String(v || ''));

const TRANSLATIONS = {
  'A breach exposed old customer addresses.': '一次安全漏洞暴露了老客户的地址。',
  'A career transition takes time and honest planning.': '职业转型需要时间和诚实的规划。',
  'A clear citation protects the writer from plagiarism.': '清楚的引用能保护作者免受抄袭指控。',
  'A credible source explains how data was collected.': '可信的来源会说明数据是如何收集的。',
  'A literal translation can sound strange without context.': '没有语境时，字面翻译可能听起来很奇怪。',
  'A mentor can help a new manager build confidence.': '导师可以帮助新任经理建立信心。',
  'A quiet schedule may improve productivity.': '安静的日程安排可能提升工作效率。',
  'A recession can make employers delay hiring.': '经济衰退会让雇主推迟招聘。',
  'A speaker may need to explain a cultural nuance.': '说话者可能需要解释一个文化上的细微差别。',
  'A useful follow-up can reveal an assumption.': '一个有用的追问可以暴露出隐藏的假设。',
  'An inclusive meeting gives quiet colleagues room to speak.': '包容的会议会给安静的同事留出发言空间。',
  'Better logistics reduced delivery time by two days.': '更好的物流把配送时间缩短了两天。',
  'Both sides agreed on a clearer payment schedule.': '双方就更清晰的付款时间表达成了一致。',
  'Both teams reached consensus after the second meeting.': '两个团队在第二次会议后达成了共识。',
  'Climate adaptation includes shade and reliable water.': '气候适应包括遮阴设施和可靠的水源。',
  'Each respondent could skip a sensitive question.': '每位受访者都可以跳过敏感问题。',
  'Every policy has a trade-off between speed and cost.': '每项政策都要在速度和成本之间权衡。',
  'Factories should report every major emission.': '工厂应当申报每一次重大排放。',
  'He has developed a useful skill through volunteer work.': '他通过志愿工作培养出一项有用的技能。',
  'Her ambition is to lead a research team one day.': '她的志向是有一天带领一支研究团队。',
  'Her transferable skill is careful project coordination.': '她可迁移的技能是细致的项目协调能力。',
  'Higher density can support frequent public transport.': '更高的密度可以支撑高频次的公共交通。',
  'I paraphrased the idea without changing its meaning.': '我改写了这个观点，但没有改变它的意思。',
  'Inflation has reduced the value of the same salary.': '通货膨胀降低了同样一笔工资的实际价值。',
  'Its framing leaves out the wider context.': '它的框架忽略了更广泛的背景。',
  'Its revenue has grown since the first partnership.': '自从第一次合作以来，它的收入一直在增长。',
  'Only a few responses mention the broken screen.': '只有少数回应提到了损坏的屏幕。',
  'Only half of the households responded online.': '只有一半的家庭在线回应了。',
  'Our methodology controls for age and working hours.': '我们的方法论控制了年龄和工作时长这两个变量。',
  'Our target is to answer ninety percent of requests today.': '我们的目标是当天回应百分之九十的请求。',
  'Our team can work flexibly when the meeting is recorded.': '会议有录制时，我们的团队可以灵活安排工作。',
  'Regular feedback has strengthened her sense of belonging.': '持续的反馈增强了她的归属感。',
  'She listened to each side before suggesting a compromise.': '她先听取了双方的意见，然后提出折中方案。',
  'Tension grew when the deadline changed.': '截止日期一改，紧张气氛就加剧了。',
  'The article builds a narrative around one dramatic event.': '这篇文章围绕一个戏剧性事件构建叙事。',
  'The average has risen slightly since May.': '从五月以来，平均值略有上升。',
  'The café must offer a reusable cup option.': '这家咖啡馆必须提供可重复使用的杯子选项。',
  'The clinic reported an outbreak near the school.': '诊所报告学校附近出现了一次疫情暴发。',
  'The clinical trial recruited adults with the same symptom.': '这项临床试验招募了有相同症状的成年人。',
  'The committee reviewed evidence from two pilot cities.': '委员会审阅了来自两个试点城市的证据。',
  'The company has published a short statement.': '公司已经发布了一份简短的声明。',
  'The contract names the court’s jurisdiction.': '合同写明了管辖法院。',
  'The control group received a placebo.': '对照组接受了安慰剂。',
  'The dashboard shows a sharp rise in weekend visits.': '仪表盘显示周末访问量急剧上升。',
  'The dashboard tracks one metric for response time.': '仪表盘追踪响应时间这一项指标。',
  'The director clarified what the rumor got wrong.': '主管澄清了传闻中说错的地方。',
  'The editor asked the authors to revise one section.': '编辑要求作者修改其中一节。',
  'The facilitator opened the meeting by reviewing the agenda.': '主持人以回顾议程开始了会议。',
  'The forecast predicts a small rise in revenue.': '预测显示收入会小幅上升。',
  'The founder changed the price after user interviews.': '创始人在用户访谈之后调整了价格。',
  'The hypothesis predicts that sleep affects memory.': '这个假设预测睡眠会影响记忆。',
  'The inspector found a small defect in the seal.': '检查员在密封处发现了一个小缺陷。',
  'The interviews gave us one useful insight.': '这些访谈给了我们一个有用的发现。',
  'The lead assigned each task after hearing the team’s strengths.': '负责人在了解团队成员的优势后分配了每项任务。',
  'The manager asked for feedback after the team change.': '团队调整之后，经理征求了反馈意见。',
  'The manager mediated the disagreement yesterday.': '经理昨天调解了这场分歧。',
  'The manuscript is ready for peer-review.': '手稿已经可以送同行评审了。',
  'The new crossing gives pedestrians more time.': '这处新的过街设施给了行人更多通行时间。',
  'The nonprofit received a grant for youth training.': '这家非营利机构获得了用于青年培训的拨款。',
  'The outcome was better than the pilot suggested.': '最终结果比试点所显示的要好。',
  'The procurement team chose a local supplier.': '采购团队选择了一家本地供应商。',
  'The proposal includes support for the first year.': '这份提案包含了第一年的支持服务。',
  'The report measures the project’s impact on attendance.': '报告衡量了该项目对出勤率的影响。',
  'The same phrase might sound warmer in another language.': '同一句话用另一种语言说，可能听起来更亲切。',
  'The sample includes responses from four neighborhoods.': '样本包含了来自四个社区的回应。',
  'The service encrypts messages before storing them.': '该服务在存储消息之前会先对其加密。',
  'The source was cited in the first paragraph.': '来源在第一段中被引用了。',
  'The startup has launched a test version.': '这家初创公司已经发布了测试版本。',
  'The statement avoids blaming one person.': '这份声明避免把责任归到某一个人身上。',
  'The supplier has accepted our revised proposal.': '供应商已经接受了我们修改后的提案。',
  'The supplier may be liable for damaged equipment.': '供应商可能要为损坏的设备承担责任。',
  'The survey asked each resident about evening noise.': '这项调查询问了每位居民对夜间噪音的看法。',
  'The survey reached commuters at three stations.': '这项调查在三个车站接触到了通勤者。',
  'The town is building resilience before the next storm.': '这个小镇正在下一场风暴到来前增强应对能力。',
  'The translator checked for an equivalent in Chinese.': '译者核对了中文里是否有对应的表达。',
  'The tutor checked the citation carefully.': '导师仔细检查了引用。',
  'This chart compares cost with customer satisfaction.': '这张图表比较了成本与客户满意度。',
  'Vaccination remains an important prevention measure.': '疫苗接种仍是一项重要的预防措施。',
  'We can ask about the local custom politely.': '我们可以礼貌地询问当地的习俗。',
  'We can conserve water by fixing the leaking tap.': '修好漏水的水龙头就能节约用水。',
  'We could move the workshop to an asynchronous format.': '我们可以把工作坊改成异步形式。',
  'We have answered the public’s main question.': '我们已经回应了公众最关心的问题。',
  'We have spotted a trend in weekend use.': '我们在周末使用量上发现了一个趋势。',
  'We have studied one serious competitor.': '我们已经研究了一家强劲的竞争对手。',
  'We inspect every batch against the same standard.': '我们按同一标准检查每一批产品。',
  'We need one clear action after each decision.': '每个决定之后都需要一个明确的行动。',
  'We need to negotiate the delivery term carefully.': '我们需要仔细谈判交付条款。',
  'We should compare the metric with last month’s baseline.': '我们应该把这个指标与上个月的基线作比较。',
  'We should invite remote staff into the same conversation.': '我们应该把远程同事也纳入同一场讨论。',
  'We should not treat one respondent as the whole audience.': '我们不该把一位受访者当成全部受众。',
  'We should separate one-time cost from monthly cost.': '我们应该把一次性成本与月度成本分开。',
  'You may lower emissions by sharing a ride.': '拼车可以降低排放。',
  'You should check the bandwidth before sharing video.': '分享视频前应该先检查带宽。',
  'You should not interpret silence as agreement.': '你不该把沉默理解为同意。',
  'You should verify the sender before opening the link.': '打开链接前应该先核实发件人。',
  'Your question helps me clarify the chart.': '你的问题帮助我澄清了这张图表。',
  'The original source explains the method.': '最初的来源解释了这个方法。',
  'The project lead recorded the agreed decision.': '项目负责人记录了商定的决定。',
  'Managers must respect different home routines.': '管理者必须尊重不同的家庭作息。',
  'A reporter asked for the original figures.': '一位记者索要了原始数据。',
  'The school could collect rainwater for the garden.': '学校可以收集雨水来浇灌花园。',
  'The team planned a small launch event.': '团队策划了一场小型发布会。',
  'Most participants chose the shorter route.': '大多数参与者选择了较短的路线。',
  'Visitors should watch the host before copying a gesture.': '访客应当先观察主人，再模仿某个手势。',
  'The team changed the target after the survey.': '调查之后，团队调整了目标。',
  'She asked whether the term could be extended.': '她询问期限是否可以延长。',
  'The research team grouped answers by age.': '研究团队按年龄对回答进行了分组。',
  'A shared ritual can build belonging without forcing friendship.': '共同的仪式可以在不强求友谊的情况下建立归属感。',
  'She welcomed the challenge instead of avoiding it.': '她迎接这个挑战，而不是回避它。',
  'We can protect privacy by removing names.': '我们可以通过删除姓名来保护隐私。',
  'The city plans to implement a safer crossing.': '这座城市计划增设一处更安全的过街设施。',
  'We have invited a local partner to share the workshop.': '我们邀请了一位本地合作伙伴共同举办工作坊。',
  'She has taken ownership of the client update.': '她主动接手了这次客户更新。',
  'The analyst found an insight in the monthly data.': '分析师在月度数据中发现了一个洞见。',
  'The team stopped the line before the defect spread.': '团队在缺陷扩散前停下了生产线。',
  'A mentor helped me choose a realistic next step.': '一位导师帮我选出了切实可行的下一步。',
  'She invited quieter members into the discussion.': '她邀请比较安静的成员加入讨论。',
  'The finance team revised the forecast after prices changed.': '价格变动后，财务团队修订了预测。',
  'The report groups every concern by street.': '这份报告按街道对每一项投诉进行了归类。',
  'We used the surrounding context to choose the tone.': '我们利用上下文来选择语气。',
  'Vulnerable residents need a clear evacuation route.': '弱势居民需要一条清晰的疏散路线。',
  'Users must authenticate before changing a password.': '用户必须先验证身份再修改密码。',
  'Both parties must comply with the safety clause.': '双方都必须遵守安全条款。',
  'The test does not replace a doctor’s diagnosis.': '这项检测不能替代医生的诊断。',
  'Zoning rules separate homes from heavy industry.': '分区规则把住宅与重工业分开。',
  'A shortage of parts stopped production.': '零件短缺导致生产停摆。',
  'The notice explains when to stay home.': '这份通知说明了什么时候应当留在家中。',
  'The editor’s agenda is not always visible.': '编辑的意图并不总是显而易见。',
  'A clear abstract helps readers understand the study.': '清楚的摘要能帮助读者理解这项研究。',
  'The correlation is not proof of a direct cause.': '相关性并不能证明直接的因果关系。',
  'He updated his portfolio with two recent projects.': '他用两个近期项目更新了自己的作品集。',
  'Monetary policy affects borrowing costs.': '货币政策会影响借贷成本。',
};

// Compound vocabulary that lost its space or hyphen when the pack was built.
const WORD_FIXES = {
  'trafficjam': 'traffic jam',
  'fabricsoftener': 'fabric softener',
  'factcheck': 'fact-check',
  'plainlanguage': 'plain language',
  'carbonpricing': 'carbon pricing',
  'dueprocess': 'due process',
  'fiscalspace': 'fiscal space',
  'buyin': 'buy-in',
  'informedconsent': 'informed consent',
  'feedbackloop': 'feedback loop',
  'tippingpoint': 'tipping point',
};

// Three choices shipped without a correct option: in two of them the first
// distractor was a mis-worded copy of the answer, and in the third the gloss of
// "before the deadline during the afternoon" had been attached as a trailing
// clause, which Chinese does not take.
const QUESTION_FIXES = {
  'a1-u45-l1-q2': { answer: '请把收件人的地址写在标签上。' },
  'b1-u27-l1-q8': { answer: '我会把公交数据加入建议中。' },
  'a2-u1-l1-q8': { answer: '团队在下午的截止日期前完成了报告。' },
};

// Generic distractors shipped with the pack. None of them is a lesson gloss, so
// they can be recognised by shape and reused instead of invented.
const IS_DISTRACTOR = (value) => /(这句话|说话人)/.test(String(value));

const files = fs.readdirSync(BLOCKS).filter((f) => f.endsWith('.json'));
let wordsFixed = 0;
let choiceFixed = 0;
let orderFixed = 0;
let listenFixed = 0;
const missing = new Set();

for (const file of files) {
  const full = path.join(BLOCKS, file);
  const block = JSON.parse(fs.readFileSync(full, 'utf8'));
  const questions = block.questions || [];
  let touched = false;

  for (const pair of block.words || []) {
    const replacement = WORD_FIXES[pair[0]];
    if (replacement) { pair[0] = replacement; wordsFixed += 1; touched = true; }
  }

  // Dialogue lines with their own gloss: the only reliable reading of a listen
  // question whose audio came from the dialogue.
  const turns = new Map(
    (((block.dialogue && block.dialogue.turns) || []).map((turn) => [String(turn.text), String(turn.translation || '')])),
  );

  // The lesson's core sentence pool, and every Chinese sentence the lesson can
  // legitimately offer as an answer or a distractor.
  const poolEn = new Set();
  const distractors = [];
  for (const q of questions) {
    for (const value of [q.prompt, q.audio, ...(q.options || [])]) {
      if (value === undefined || value === null || value === '') continue;
      if (hasCn(value)) continue;
      poolEn.add(String(value));
    }
    for (const option of q.options || []) {
      if (hasCn(option) && IS_DISTRACTOR(option) && !distractors.includes(String(option))) {
        distractors.push(String(option));
      }
    }
  }

  const gloss = (english) => TRANSLATIONS[String(english)] || turns.get(String(english)) || null;
  const poolCn = [...new Set([...poolEn].map(gloss).filter(Boolean))];
  for (const q of questions) {
    for (const value of [q.answer, ...(q.options || [])]) {
      if (!hasCn(value) || IS_DISTRACTOR(value)) continue;
      if (!poolCn.includes(String(value))) poolCn.push(String(value));
    }
  }

  // One English sentence may now have two Chinese renderings in the same
  // lesson: the wording the pack already shipped, and the one added here. Keep
  // the wording that was not introduced by this migration.
  const added = new Set(Object.values(TRANSLATIONS));
  const collapse = new Map();
  for (let i = 0; i < poolCn.length; i += 1) {
    for (let j = i + 1; j < poolCn.length; j += 1) {
      const [a, b] = [poolCn[i], poolCn[j]];
      let shared = 0;
      while (shared < a.length && shared < b.length && a[shared] === b[shared]) shared += 1;
      if (shared < 8) continue;
      const preferA = added.has(b) ? true : added.has(a) ? false : a.length < b.length;
      collapse.set(preferA ? b : a, preferA ? a : b);
    }
  }
  const prefer = (value) => collapse.get(String(value)) || String(value);
  if (process.env.DEBUG === block.id) {
    console.error(`[debug ${block.id}] poolEn=${poolEn.size} poolCn=${poolCn.length}`);
    poolCn.forEach((v) => console.error(`   ${collapse.has(v) ? '-> ' + collapse.get(v) : '    '} ${v}`));
  }
  const pool = [...new Set(poolCn.map(prefer))];

  // Three Chinese meanings plus one clearly wrong line, all distinct.
  const optionsFor = (answer, excluded) => {
    const chosen = [answer];
    for (const candidate of pool) {
      if (chosen.length >= 3) break;
      if (excluded && excluded.has(candidate)) continue;
      if (!chosen.includes(candidate)) chosen.push(candidate);
    }
    const decoy = distractors.find((d) => !chosen.includes(d));
    if (decoy) chosen.push(decoy);
    return chosen;
  };

  for (const q of questions) {
    // Existing options keep their wording unless the lesson now holds two
    // renderings of the same sentence; then the older one wins.
    if (Array.isArray(q.options)) {
      const normalized = [...new Set(q.options.map((o) => (hasCn(o) ? prefer(o) : o)))];
      if (normalized.length === q.options.length && normalized.some((o, i) => o !== q.options[i])) {
        q.options = normalized;
        touched = true;
      }
    }

    const fix = QUESTION_FIXES[q.id];
    if (fix && Array.isArray(q.options)) {
      q.answer = fix.answer;
      q.translation = fix.answer;
      if (!q.options.includes(fix.answer)) q.options[0] = fix.answer;
      touched = true;
    }

    if (q.kind === 'choice') {
      const correct = TRANSLATIONS[q.prompt] ? prefer(TRANSLATIONS[q.prompt]) : null;
      if (!correct) {
        if (!hasCn(q.translation)) missing.add(String(q.prompt));
        continue;
      }
      const real = (q.options || []).filter((o) => hasCn(o) && !IS_DISTRACTOR(o));
      if (q.answer === correct && real.length >= 3 && real.includes(correct)) continue;
      q.answer = correct;
      q.translation = correct;
      if (pool.filter((cn) => cn !== correct).length >= 2) q.options = optionsFor(correct, null);
      choiceFixed += 1;
      touched = true;
    } else if (q.kind === 'order') {
      // The hand-authored packs split the full stop off as its own tile, so
      // tokens.join(' ') ended with a space the answer never had and the
      // question could not be answered correctly.
      if (Array.isArray(q.tokens) && q.tokens.join(' ') !== String(q.answer)) {
        q.tokens = String(q.answer).split(' ');
        orderFixed += 1;
        touched = true;
      }
      const correct = TRANSLATIONS[q.audio];
      if (!correct) {
        if (!hasCn(q.prompt)) missing.add(String(q.audio));
        continue;
      }
      if (q.prompt === correct) continue;
      q.prompt = correct;
      q.translation = correct;
      orderFixed += 1;
      touched = true;
    } else if (q.kind === 'listen') {
      if (hasCn(q.answer)) {
        // The played line must be the one the answer translates.
        const correct = turns.get(String(q.audio)) || TRANSLATIONS[String(q.audio)];
        const meaning = correct ? prefer(correct) : null;
        if (!meaning || q.answer === meaning) continue;
        if (pool.filter((cn) => cn !== meaning).length < 2) continue;
        q.answer = meaning;
        q.translation = meaning;
        q.options = optionsFor(meaning, null);
        listenFixed += 1;
        touched = true;
      } else {
        // The stem promised a meaning while the options offered English, so no
        // Chinese explanation was ever shown. Twelve of these also played a
        // generated filler line ("The team discussed the verify after lunch.")
        // instead of the sentence the answer named, so ear and score disagreed.
        const heard = String(q.answer);
        const raw = TRANSLATIONS[heard];
        const meaning = raw ? prefer(raw) : null;
        if (!meaning || pool.filter((cn) => cn !== meaning).length < 2) continue;
        q.audio = heard;
        q.answer = meaning;
        q.translation = meaning;
        q.options = optionsFor(meaning, null);
        listenFixed += 1;
        touched = true;
      }
    }
  }

  if (touched) fs.writeFileSync(full, `${JSON.stringify(block, null, 2)}\n`, 'utf8');
}

console.log(`glossary terms rebuilt : ${wordsFixed}`);
console.log(`choice questions fixed : ${choiceFixed}`);
console.log(`order questions fixed  : ${orderFixed}`);
console.log(`listen questions fixed : ${listenFixed}`);
if (missing.size) {
  console.log(`\nMISSING translations (${missing.size}):`);
  [...missing].sort().forEach((s) => console.log('   ' + s));
  process.exitCode = 1;
}
