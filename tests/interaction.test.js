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
  pendingSectionCheckpoints,
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

test('区域挑战在该区课程全部完成后发放，且不重复发放', () => {
  // pendingSectionCheckpoints resolves the checkpoint against LumiModel, which
  // browser builds provide as a global; Node tests have to wire it up.
  global.LumiModel = require('../app/src/main/assets/model.js');
  const { catalog } = require('../app/src/main/assets/course.js');
  const checkpoint = catalog.checkpoints[0];
  const sectionLessons = catalog.lessonList.filter((lesson) => lesson.sectionId === checkpoint.sectionId);
  assert.equal(sectionLessons.length, 12, '一个区应包含 12 关');
  assert.equal(checkpoint.id, checkpoint.sectionId + '-checkpoint', '解锁逻辑依赖这一命名约定');

  const state = global.LumiModel.fresh();
  assert.deepEqual(pendingSectionCheckpoints(state, catalog), [], '没有任何进度时不应发奖');

  state.completed = sectionLessons.slice(0, 11).map((lesson) => lesson.id);
  assert.deepEqual(pendingSectionCheckpoints(state, catalog), [], '还差一关时不发奖');

  state.completed = sectionLessons.map((lesson) => lesson.id);
  const pending = pendingSectionCheckpoints(state, catalog);
  assert.deepEqual(pending.map((cp) => cp.id), [checkpoint.id], '整区完成时应精确发一个');

  const before = state.points || 0;
  pending.forEach((cp) => global.LumiModel.recordCheckpoint(state, cp.id, 100, true));
  assert.equal(global.LumiModel.checkpointPassed(state, checkpoint.id), true, '记录后应可被解锁逻辑读到');
  assert.equal(state.points, before + 20, '每个区域挑战奖励 20 积分');
  assert.deepEqual(pendingSectionCheckpoints(state, catalog), [], '已发放的不应再次进入待发列表');

  state.completed = catalog.lessonList.map((lesson) => lesson.id);
  // 第一区在上面已经发放过了，所以剩下的正好是 23 个。
  assert.equal(pendingSectionCheckpoints(state, catalog).length, 23, '其余 23 个区挑战应待发');
});

// 两条解码链
// ----------
// 浏览器先把属性值做 HTML 解实体，之后才分叉：
//   data-*        -> 直接进 element.dataset，不再有 JS 解析这一步；
//   onclick="...'...'" -> 先解实体，再由 JS 引擎在两层单引号之间解析。
// 所以同一条字符串不能共用一个转义器：data-* 只需要 &#39;，onclick 还需要
// 反斜杠把引号吃掉。给 data-* 用 inline 转义器，dataset 里就会留下反斜杠，
// 判分时 dataset.token 拼回的句子再也等不于 q.answer。
const htmlDecode = (value) => String(value == null ? '' : value)
  .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
  .replace(/&quot;/g, '"')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&');

const ESCAPES = require('../app/src/main/assets/interaction.js');
const COURSE = require('../app/src/main/assets/course.js').catalog;
const ROUND_TRIP_SAMPLES = ["doctor's", "hadn't fixed the fault", "won't be made", "the teachers' room", 'say "hi" & leave', 'back\\slash'];

test('data-* 属性解实体后必须逐字节还原', () => {
  for (const value of ROUND_TRIP_SAMPLES) {
    assert.equal(htmlDecode(ESCAPES.escapeAttrValue(value)), value, `${JSON.stringify(value)} 必须能从 dataset 还原`);
  }
});

test('onclick 处理器解实体再过 JS 解析后必须逐字节还原', () => {
  for (const value of ROUND_TRIP_SAMPLES) {
    const decoded = htmlDecode(ESCAPES.escapeInlineArgument(value));
    // 这正是 onclick="fn('…')" 的求值：单引号在被转义的值外面。
    assert.equal(new Function(`const fn = (v) => v; return fn('${decoded}');`)(), value, `${JSON.stringify(value)} 必须能被内联处理器原样传出`);
  }
});

test('含撇号的选项与词块走 data-* 后仍能通过判分', () => {
  const questions = Object.values(COURSE.questionBank);
  const affected = questions.filter((question) =>
    (Array.isArray(question.options) && question.options.some((option) => String(option).includes("'")))
    || (Array.isArray(question.tokens) && question.tokens.some((token) => String(token).includes("'"))));

  // 课程目前带三道；数量掉到 0 时这条断言就不再有证明力，所以连下限一起写死。
  assert.equal(affected.length, 3, `应有 3 道含撇号的题，实际 ${affected.length}`);

  for (const question of affected) {
    for (const value of [...(question.options || []), ...(question.tokens || [])]) {
      if (!String(value).includes("'")) continue;
      assert.equal(htmlDecode(ESCAPES.escapeAttrValue(String(value))), String(value), `${question.id}: data-* 必须还原`);
      assert.notEqual(htmlDecode(ESCAPES.escapeInlineArgument(String(value))), String(value), `${question.id}: 内联转义器会污染 data-*，不可复用`);
    }

    // checkOrder 把 dataset.token 用空格拼回去和 q.answer 比，
    // checkSelectedAnswer 把 dataset.option 和 q.answer 比。
    // 这两处等式才是判分真正的不变量。
    if (question.kind === 'order' && Array.isArray(question.tokens)) {
      const rebuilt = question.tokens.map((token) => htmlDecode(ESCAPES.escapeAttrValue(token))).join(' ');
      assert.equal(rebuilt, question.answer, `${question.id}: 词块还原后必须等于标准答案`);
    }
    if (Array.isArray(question.options)) {
      const correct = question.options.find((option) => option === question.answer);
      assert.ok(correct, `${question.id}: 标准答案必须在选项里`);
      assert.equal(htmlDecode(ESCAPES.escapeAttrValue(correct)), correct, `${question.id}: 正确项的高亮匹配必须成立`);
    }
  }
});
