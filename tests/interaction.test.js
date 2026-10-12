const test = require('node:test');
const assert = require('node:assert/strict');
const {
  feedbackDetails,
  renderGlossaryText,
  questionPromptHtml,
  shouldAutoPlayQuestion,
  hintOptions,
  allPairsMatched,
  reviewIconSvg,
  translateWord,
  slowSpeechRate,
  renderDialogueBubbles,
  dialogueQuestionPrompt,
} = require('../app/src/main/assets/interaction.js');

test('对话题渲染角色气泡并隐藏整段中文翻译', () => {
  const html = renderDialogueBubbles({
    characters: [{ id: 'maya', name: 'Maya', role: 'customer' }, { id: 'leo', name: 'Leo', role: 'server' }],
    turns: [
      { speaker: 'maya', text: 'Could I see the menu?', translation: '我可以看看菜单吗？' },
      { speaker: 'leo', text: 'Of course. Here you are.', translation: '当然，给你。' },
    ],
  }, { revealIndex: -1 });
  assert.match(html, /dialogue-bubble/);
  assert.match(html, /Maya/);
  assert.match(html, /Leo/);
  assert.doesNotMatch(html, /我可以看看菜单吗/);
});

test('对话题提示包含场景和作答指令，不提前暴露答案', () => {
  const html = dialogueQuestionPrompt({
    scene: '餐厅点单',
    prompt: '选择最自然的下一句',
    instruction: '听懂角色关系后作答',
  });
  assert.match(html, /餐厅点单/);
  assert.match(html, /选择最自然的下一句/);
});

test('反馈使用当前词义题答案，不串到后续题', () => {
  const word = { kind: 'word', answer: '日常安排', translation: '日常安排' };
  const laterOrder = { kind: 'order', answer: 'I usually walk to work.', translation: '我通常步行去上班。' };
  assert.equal(feedbackDetails(word, false).answer, '日常安排');
  assert.notEqual(feedbackDetails(word, false).answer, laterOrder.answer);
  assert.equal(feedbackDetails(word, false).translation, '日常安排');
});

test('反馈使用当前拼句题答案和释义', () => {
  const order = { kind: 'order', answer: 'I usually walk to work.', translation: '我通常步行去上班。' };
  assert.deepEqual(feedbackDetails(order, false), {
    answer: 'I usually walk to work.',
    translation: '我通常步行去上班。',
  });
});

test('正确反馈不重复显示释义', () => {
  const question = { kind: 'word', answer: '日常安排', translation: '日常安排' };
  assert.deepEqual(feedbackDetails(question, true), { answer: '日常安排', translation: '' });
});

test('错误反馈保留解析数据，由界面负责隐藏重复释义', () => {
  const question = { kind: 'choice', answer: '我们需要协调三个地区团队的发布工作。', translation: '我们需要协调三个地区团队的发布工作。' };
  assert.deepEqual(feedbackDetails(question, false), {
    answer: '我们需要协调三个地区团队的发布工作。',
    translation: '我们需要协调三个地区团队的发布工作。',
  });
});

test('英文句子只把词义做成点击提示，不直接渲染整句翻译', () => {
  const html = renderGlossaryText('We need to coordinate the launch.', [['coordinate', '协调']]);
  assert.match(html, /glossary-word/);
  assert.match(html, /coordinate/);
  assert.match(html, /协调/);
  assert.doesNotMatch(html, /We need to coordinate the launch\. =/);
});

test('英文提示中的每个单词都可点击，即使词库没有该词的释义', () => {
  const html = renderGlossaryText('The forecast says it will be sunny this afternoon.', [['forecast', '天气预报']]);
  const words = ['The', 'forecast', 'says', 'it', 'will', 'be', 'sunny', 'this', 'afternoon'];
  for (const word of words) assert.match(html, new RegExp(`class="glossary-word"[^>]*>${word}</`));
});

test('未知词也返回直译词义，不再显示结合上下文', () => {
  assert.equal(translateWord('says', []), '说');
  assert.equal(translateWord('forecast', [['forecast', '天气预报']]), '天气预报');
  assert.equal(translateWord('table', []), '桌子');
  assert.notEqual(translateWord('says', []), '结合上下文理解这个词');
});

test('选词填空答对后反馈栏显示中文释义', () => {
  const question = { kind: 'fill', answer: 'sweep', translation: '请扫一下厨房地板。' };
  assert.equal(feedbackDetails(question, true).translation, '请扫一下厨房地板。');
});

test('慢速播放使用明显更低的系统 TTS 速率', () => {
  assert.equal(slowSpeechRate(), 0.5);
});

test('题目前只渲染英文提示和可点击词义，不渲染完整中文翻译', () => {
  const html = questionPromptHtml({
    kind: 'choice',
    prompt: 'We need to coordinate the launch.',
    instruction: '选择这句话最自然的中文意思',
    translation: '我们需要协调发布工作。',
    glossary: [['coordinate', '协调']],
  });
  assert.match(html, /选择这句话最自然的中文意思/);
  assert.match(html, /glossary-word/);
  assert.doesNotMatch(html, /我们需要协调发布工作/);
});

test('词义题的英文文本会转义，避免特殊字符破坏按钮属性', () => {
  const html = questionPromptHtml({
    kind: 'word',
    audio: "<script>alert('x')</script>",
    translation: '脚本',
  });
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});

test('词义渲染会转义文本，避免题库内容注入 HTML', () => {
  const html = renderGlossaryText('<script>alert(1)</script> plan', [['plan', '计划']]);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /glossary-word/);
});

test('听力题只在进入新题且未静音时自动播放一次', () => {
  const listen = { kind: 'listen', id: 'q1' };
  assert.equal(shouldAutoPlayQuestion({ autoPlayedQuestionId: null }, listen, false), true);
  assert.equal(shouldAutoPlayQuestion({ autoPlayedQuestionId: 'q1' }, listen, false), false);
  assert.equal(shouldAutoPlayQuestion({ autoPlayedQuestionId: null }, listen, true), false);
  assert.equal(shouldAutoPlayQuestion({ autoPlayedQuestionId: null }, { kind: 'choice', id: 'q2' }, false), false);
});

test('积分提示只隐藏一个错误选项，绝不隐藏正确答案', () => {
  const result = hintOptions(['正确答案', '干扰一', '干扰二', '干扰三'], '正确答案');
  assert.equal(result.hidden, '干扰三');
  assert.deepEqual(result.options, ['正确答案', '干扰一', '干扰二']);
  assert.ok(result.options.includes('正确答案'));
});

test('配对必须完成全部映射后才能提交', () => {
  assert.equal(allPairsMatched({ 0: 2, 1: 0 }, 3), false);
  assert.equal(allPairsMatched({ 0: 2, 1: 0, 2: 1 }, 3), true);
});

test('复习页使用内置 SVG 图标，避免系统 emoji 缺字显示方框', () => {
  const html = reviewIconSvg();
  assert.match(html, /<svg/);
  assert.doesNotMatch(html, /🧭/);
});
