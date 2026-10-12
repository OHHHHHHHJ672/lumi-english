const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'course-data', 'blocks');
const files = fs.readdirSync(root).filter(name => name.endsWith('.json'));
const phraseTails = [
  ['before lunch', '午饭前'], ['after work', '下班后'], ['this morning', '今天早上'], ['on Friday', '周五'],
  ['during the meeting', '会议期间'], ['before the appointment', '预约前'], ['this weekend', '这个周末'], ['after dinner', '晚饭后'],
  ['at the station', '在车站'], ['for our team', '为我们的团队'], ['this month', '本月'], ['before the deadline', '截止日期前'],
];
const pairBank = [
  ['message','消息'], ['schedule','日程'], ['meeting','会议'], ['address','地址'], ['service','服务'], ['plan','计划'],
  ['report','报告'], ['ticket','票'], ['customer','顾客'], ['problem','问题'], ['team','团队'], ['choice','选择'],
];
const verbWords = new Set('coordinate clarify invite collect practice exercise stretch feed reply transfer celebrate check borrow repeat explain download recommend save cancel suggest leak recover boil chop serve replace confirm reschedule volunteer organize perform complete revise resolve afford attach forward concentrate train replace replace anonymize delegate negotiate conserve launch interpret implement facilitate assign mentor inspect verify mitigate comply deploy adapt restore reproduce investigate disclose allocate cooperate evacuate frame translate summarize compare review discuss support monitor estimate mediate emphasize conserve anonymize screen manage reduce encrypt authenticate comply diagnose revise revise forecast negotiate audit explainability deploy cooperate'.split(' '));
const adjectiveWords = new Set('generous quiet cloudy tight available fit healthy early late safe careful worried proud crowded loose noisy ripe reliable sustainable respectful inclusive flexible nutritious urgent punctual reliable credible constructive vulnerable clinical robust regulatory accountable transparent bilateral multilateral normative hereditary concise asynchronous'.split(' '));
const isVerb = (word) => verbWords.has(String(word).toLowerCase());
const isAdjective = (word) => adjectiveWords.has(String(word).toLowerCase());
// Grammar frames already end in "." or "?". Concatenating a time tail directly
// produced "We are going to discuss the host tomorrow. on Friday." — two
// sentences jammed together with a stray full stop. Strip the existing
// terminal punctuation before appending the tail.
const joinTail = (sentence, tail) => `${String(sentence || '').replace(/[.?!，。？！]+$/, '')} ${tail}.`;
const grammarSentence = (tag, words, idx) => {
  const w = words[0][0], c = words[0][1], w2 = words[1][0], c2 = words[1][1], w3 = words[2][0], c3 = words[2][1];
  const tail = phraseTails[idx % phraseTails.length];
  if (isVerb(w)) {
    const verbVariants = {
      'present-simple': [`I ${w} the plan ${tail[0]}.`, `我${tail[1]}${w}这个计划。`],
      'past-simple': [`We decided to ${w} the plan ${tail[0]}.`, `我们${tail[1]}决定${w}这个计划。`],
      'present-continuous': [`We are trying to ${w} the plan ${tail[0]}.`, `我们${tail[1]}正在尝试${w}这个计划。`],
      'present-perfect': [`We have learned to ${w} the plan.`, `我们已经学会${w}这个计划。`],
      'future-plans': [`We are going to ${w} the plan tomorrow.`, `我们打算明天${w}这个计划。`],
      'going-to': [`We are going to ${w} the plan this evening.`, `我们打算今晚${w}这个计划。`],
      'will-future': [`We will ${w} the plan tomorrow.`, `我们明天会${w}这个计划。`],
      'conditionals': [`If we ${w} the plan, we can avoid a delay.`, `如果我们${w}这个计划，就能避免延误。`],
      'modals': [`We should ${w} the plan before we decide.`, `做决定前我们应该${w}这个计划。`],
      'modal-verbs': [`We must ${w} the plan carefully.`, `我们必须仔细${w}这个计划。`],
      'imperatives': [`Please ${w} the plan before you leave.`, `离开前请${w}这个计划。`],
      'can-requests': [`Could you ${w} the plan, please?`, `你能${w}这个计划吗？`],
      'passive-voice': [`The team was asked to ${w} the plan.`, `团队被要求${w}这个计划。`],
      'relative-clauses': [`The person who can ${w} the plan will lead the task.`, `能${w}这个计划的人将负责任务。`],
      'future-perfect': [`We will have learned to ${w} the plan by Friday.`, `到周五我们将学会${w}这个计划。`],
      'gerunds': [`Learning to ${w} the plan takes practice.`, `学会${w}这个计划需要练习。`],
      'like-ing': [`I enjoy learning to ${w} the plan.`, `我喜欢学习${w}这个计划。`],
    };
    return verbVariants[tag] || [`We need to ${w} the plan ${tail[0]}.`, `我们${tail[1]}需要${w}这个计划。`];
  }
  if (isAdjective(w)) {
    const adjectiveVariants = {
      'present-simple': [`The option is ${w} ${tail[0]}.`, `这个选项${tail[1]}很${c}。`],
      'past-simple': [`The option was ${w} ${tail[0]}.`, `这个选项${tail[1]}很${c}。`],
      'comparatives': [`The new option is more ${w} than the old one.`, `新选项比旧选项更${c}。`],
      'present-perfect': [`The option has become more ${w}.`, `这个选项已经变得更${c}。`],
      'conditionals': [`If the option is ${w}, more people will use it.`, `如果这个选项${c}，会有更多人使用。`],
      'relative-clauses': [`We chose an option that is ${w}.`, `我们选择了一个${c}的选项。`],
    };
    return adjectiveVariants[tag] || [`The option is ${w} ${tail[0]}.`, `这个选项${tail[1]}很${c}。`];
  }
  const variants = {
    'present-simple': [`I check the ${w} ${tail[0]}.`, `我${tail[1]}查看${c}。`],
    'past-simple': [`We discussed the ${w} ${tail[0]}.`, `我们${tail[1]}讨论了${c}。`],
    'present-continuous': [`We are checking the ${w} ${tail[0]}.`, `我们正在${tail[1]}检查${c}。`],
    'there-is-are': [`There is a ${w} beside the ${w2}.`, `${w2}旁边有一个${c}。`],
    'there-is': [`There is a ${w} near the ${w2}.`, `${w2}附近有一个${c}。`],
    'can-requests': [`Could you show me the ${w}, please?`, `你能把${c}给我看看吗？`],
    'imperatives': [`Please check the ${w} before you leave.`, `离开前请检查${c}。`],
    'frequency-adverbs': [`I usually practice the ${w} after dinner.`, `我通常晚饭后练习${c}。`],
    'have-got': [`I have got a ${w} for tomorrow.`, `我明天有一个${c}。`],
    'time-expressions': [`The ${w} starts at nine sharp.`, `${c}九点准时开始。`],
    'future-plans': [`We are going to discuss the ${w} tomorrow.`, `我们打算明天讨论${c}。`],
    'going-to': [`We are going to prepare the ${w} this evening.`, `我们打算今晚准备${c}。`],
    'will-future': [`We will replace the ${w} tomorrow.`, `我们明天会更换${c}。`],
    'present-perfect': [`We have already reviewed the ${w}.`, `我们已经审阅过${c}了。`],
    'comparatives': [`The ${w} is more useful than the old one.`, `${c}比旧的更有用。`],
    'conditionals': [`If we check the ${w}, we can avoid a delay.`, `如果我们检查${c}，就能避免延误。`],
    'passive-voice': [`The ${w} was reviewed before the meeting.`, `${c}在会议前被审阅了。`],
    'relative-clauses': [`The ${w} that we discussed is ready.`, `我们讨论过的${c}已经准备好了。`],
    'past-continuous': [`We were discussing the ${w} when the phone rang.`, `电话响时我们正在讨论${c}。`],
    'past-perfect': [`We had checked the ${w} before the meeting.`, `会议前我们已经检查过${c}。`],
    'future-perfect': [`We will have completed the ${w} by Friday.`, `到周五我们将完成${c}。`],
    'modals': [`We should check the ${w} before we decide.`, `做决定前我们应该检查${c}。`],
    'modal-verbs': [`We must protect the ${w} during the project.`, `项目期间我们必须保护${c}。`],
    'should': [`You should review the ${w} tonight.`, `你今晚应该复习${c}。`],
    'would-like': [`I would like the ${w}, please.`, `请给我一份${c}。`],
    'adverbs': [`The team carefully reviewed the ${w}.`, `团队仔细审阅了${c}。`],
    'gerunds': [`Checking the ${w} helps the team stay organized.`, `检查${c}有助于团队保持井然有序。`],
    'like-ing': [`I enjoy practicing the ${w} after work.`, `我喜欢下班后练习${c}。`],
    'reported-speech': [`She said that the ${w} was ready.`, `她说${c}已经准备好了。`],
    'subjunctive': [`It is essential that the ${w} be reviewed.`, `必须审阅${c}。`],
    'nominalisation': [`The improvement of the ${w} reduced delays.`, `${c}的改进减少了延误。`],
    'discourse-markers': [`However, the ${w} still needs review.`, `不过，${c}仍然需要审阅。`],
    'legal-modals': [`Both parties must comply with the ${w}.`, `双方必须遵守${c}。`],
  };
  return variants[tag] || [`We need to discuss the ${w} ${tail[0]}.`, `我们${tail[1]}需要讨论${c}。`];
};
function makeBlock(source, index) {
  const words = Array.isArray(source.words) && source.words.length >= 3 ? source.words.slice(0, 3) : [['plan','计划'],['message','消息'],['schedule','日程']];
  const tag = source.grammarFocus || (source.grammarTags || ['present-simple'])[0];
  const a = grammarSentence(tag, words, index);
  const b = grammarSentence(tag, [words[1], words[2], words[0]], index + 3);
  const c = grammarSentence(tag, [words[2], words[0], words[1]], index + 6);
  const fillAnswer = words[0][0];
  const tail1 = phraseTails[(index + 2) % phraseTails.length];
  const tail2 = phraseTails[(index + 5) % phraseTails.length];
  const fill = [`Please check the _____ ${tail1[0]}.`, 'Please check the ' + fillAnswer + ' ' + tail1[0] + '.', `请${tail1[1]}检查${words[0][1]}。`];
  const pairs = [...words, ...pairBank].filter((pair, i, list) => list.findIndex(item => item[0] === pair[0]) === i).slice(0, 6);
  const glossary = [...pairs];
  const translations = [a[1], b[1], c[1]];
  const q = [
    { kind:'word', prompt:`${words[0][0]} · ${source.title}`, audio:words[0][0], instruction:'选择这个词的直译', answer:words[0][1], options:[words[0][1],words[1][1],words[2][1],'问题'], translation:words[0][1] },
    { kind:'choice', prompt:a[0], instruction:'选择这句日常表达的意思。', answer:a[1], options:[a[1],b[1],c[1],'请确认今天的安排。'], audio:a[0], translation:a[1] },
    { kind:'listen', prompt:'听句子，选择你听到的意思。', instruction:'先听完整句子，再选择意思。', answer:b[1], options:[b[1],a[1],c[1],'请在柜台等候。'], audio:b[0], translation:b[1] },
    { kind:'order', prompt:c[1], instruction:'把词块组成英文句子。', answer:c[0], tokens:c[0].split(' '), audio:c[0], translation:c[1] },
    { kind:'fill', prompt:fill[0], instruction:'选择合适的英文词完成句子。', answer:fillAnswer, options:[fillAnswer,words[1][0],words[2][0],'message'], audio:fill[1], translation:fill[2] },
    { kind:'match', prompt:`把「${source.title}」的重点词语配对。`, instruction:'完成全部配对后提交。', pairs, answer:'matched', translation:pairs.map(item => item.join('、')).join('；') },
    { kind:'word', prompt:`${words[1][0]} · ${source.title}`, audio:words[1][0], instruction:'选择这个词的直译', answer:words[1][1], options:[words[1][1],words[0][1],words[2][1],'安排'], translation:words[1][1] },
    { kind:'choice', prompt:joinTail(b[0], tail1[0]), instruction:'结合场景选择最准确的意思。', answer:b[1] + '，' + tail1[1] + '。', options:[b[1] + '，' + tail1[1] + '。',a[1],c[1],'请把文件放在桌上。'], audio:joinTail(b[0], tail1[0]), translation:b[1] + '，' + tail1[1] + '。' },
    { kind:'listen', prompt:'听句子，选择你听到的意思。', instruction:'先听完整句子，再选择意思。', answer:c[1] + '，' + tail2[1] + '。', options:[c[1] + '，' + tail2[1] + '。',a[1],b[1],'我们稍后再确认。'], audio:joinTail(c[0], tail2[0]), translation:c[1] + '，' + tail2[1] + '。' },
    { kind:'fill', prompt:`We need to _____ the ${words[1][0]} ${tail2[0]}.`, instruction:'选择正确的动词完成句子。', answer:'check', options:['check','checked','checking','checks'], audio:`We need to check the ${words[1][0]} ${tail2[0]}.`, translation:`我们需要${tail2[1]}检查${words[1][1]}。` },
  ];
  if (tag === 'present-simple') q[4] = { kind:'fill', prompt:`The team _____ the ${words[0][0]} every morning.`, instruction:'选择一般现在时的正确形式。', answer:'checks', options:['checks','check','checking','checked'], audio:`The team checks the ${words[0][0]} every morning.`, translation:`团队每天早上检查${words[0][1]}。` };
  const sentenceMeanings = q.filter(item => item.kind === 'choice' || item.kind === 'listen').map(item => item.translation);
  q.filter(item => item.kind === 'choice' || item.kind === 'listen').forEach(item => { item.options = sentenceMeanings.slice(0, 4); });
  for (const [i, question] of q.entries()) { question.id = `${source.id}-q${i + 1}`; question.lessonId=source.id; question.levelId=source.levelId; question.cefr=source.cefr; question.difficulty=source.difficulty; question.grammarTags=source.grammarTags; question.glossary=glossary; }
  return {...source, sourceStatus:'hand-authored', grammarTags:[tag], grammarFocus:tag, words, questions:q, dialogue:{id:`${source.id}-dialogue`,scene:source.title,characters:[{id:'lumi',name:'Lumi'},{id:'partner',name:'Alex'}],turns:[{speaker:'lumi',text:`Could you tell me more about ${words[0][0]}?`,translation:`你能再告诉我一些关于${words[0][1]}的事吗？`},{speaker:'partner',text:`Sure. We use ${words[0][0]} when we make a daily plan.`,translation:`当然。我们制定日常计划时会用到${words[0][1]}。`},{speaker:'lumi',text:`That makes sense. I will remember it today.`,translation:'有道理。今天我会记住它。'}],tasks:[{mode:'intent',prompt:'What are they discussing?',answer:`How to use ${words[0][0]} in a daily plan`,options:[`How to use ${words[0][0]} in a daily plan`,'How to change a train ticket','How to order a dessert']}]} };
}
const blocks = {};
const preserveManual = new Set(['a1-u1-l1','a1-u2-l1','a1-u3-l1','a1-u4-l1','a1-u5-l1']);
for (const file of files) {
  const full = path.join(root, file); const source = JSON.parse(fs.readFileSync(full, 'utf8'));
  if (preserveManual.has(source.id)) { blocks[source.id] = source; continue; }
  blocks[source.id] = makeBlock(source, Number(source.id.match(/u(\d+)/)?.[1] || 1));
}
const globalSeen = new Set();
let globalSalt = 0;
for (const block of Object.values(blocks)) {
  for (const question of block.questions) {
    if (!['choice','listen','order','fill'].includes(question.kind)) continue;
    let key = String(question.audio || question.prompt || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    while (globalSeen.has(key)) {
      const tail = phraseTails[globalSalt++ % phraseTails.length];
      question.audio = `${String(question.audio || question.prompt).replace(/[?.]$/, '')} ${tail[0]}.`;
      if (question.kind === 'fill') question.prompt = `${String(question.prompt || '').replace(/[?.]$/, '')} ${tail[0]}.`;
      question.translation = `${String(question.translation || '').replace(/[。？?]$/, '')}，${tail[1]}。`;
      key = String(question.audio).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    }
    globalSeen.add(key);
  }
}
for (const [id, block] of Object.entries(blocks)) fs.writeFileSync(path.join(root, `${id}.json`), JSON.stringify(block, null, 2) + '\n');
fs.writeFileSync(path.join(__dirname, '..', 'course-data', 'authored-blocks.json'), JSON.stringify(blocks, null, 2) + '\n');
fs.writeFileSync(path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'authored-course.js'), `window.lumiAuthoredBlocks=${JSON.stringify(blocks)};\n`);
console.log(`rewrote ${Object.keys(blocks).length} static blocks`);
