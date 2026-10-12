/* Lumi Beta interaction controller. One controller owns lesson rendering and input. */
function betaFeedbackDetails(q, correct) {
  const question = q || {};
  if (question.kind === 'dialogue') {
    const target = Number.isInteger(question.targetIndex) ? question.turns && question.turns[question.targetIndex] : null;
    return { answer: question.answer || '请查看对话提示', translation: target && target.translation ? target.translation : (question.translation || '') };
  }
  const answer = question.kind === 'match'
    ? (question.translation || '所有词语都已配对')
    : (question.answer || question.audio || '请查看题目解析');
  return {
    answer,
    // Fill questions keep their Chinese sentence after a correct answer so the
    // learner can connect the completed English sentence with its meaning.
    // Other question types retain the previous behaviour and only show the
    // translation when the learner needs an explanation.
    translation: question.translation && (!correct || question.kind === 'fill') ? question.translation : '',
  };
}

function escapeGlossaryHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeInlineArgument(value) {
  const escaped = String(value == null ? '' : value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
  return escapeGlossaryHtml(escaped);
}

const commonTranslations = {
  the: '这/该', a: '一个', an: '一个', says: '说', it: '它', will: '将', be: '是', this: '这', that: '那',
  in: '在', on: '在……上', to: '到/向', of: '的', for: '为了', and: '和', or: '或者', but: '但是',
  is: '是', are: '是', was: '是（过去）', were: '是（过去）', can: '能够', could: '可以', should: '应该',
  please: '请', when: '当……时', you: '你', your: '你的', we: '我们', they: '他们', he: '他', she: '她',
  from: '从', with: '和/用', before: '之前', after: '之后', here: '这里', there: '那里',
  lesson: '课程', word: '单词', sentence: '句子', includes: '包含', useful: '有用的', remember: '记住',
  review: '复习', practice: '练习', today: '今天', tomorrow: '明天', morning: '早上', afternoon: '下午',
  sunny: '晴朗的', matters: '重要', complete: '完成', phrase: '短语', introduces: '介绍',
  i: '我', my: '我的', our: '我们的', me: '我', has: '有', have: '有', every: '每个', carefully: '仔细地',
  explain: '解释', how: '如何', final: '最终的', team: '团队', check: '检查', new: '新的', meeting: '会议',
  proposal: '提案', requires: '需要', week: '星期/周', changed: '改变了', updated: '更新了', independent: '独立的',
  last: '上一个/最后的', need: '需要', keep: '保持', leave: '离开', ready: '准备好的', near: '附近',
  reviewed: '审阅了', shared: '分享了', measured: '衡量了', partner: '合作伙伴', evaluated: '评估了',
  monitored: '监测了', argues: '认为/论证', customer: '顾客', small: '小的', door: '门', may: '可能',
  use: '使用', helped: '帮助了', policy: '政策', too: '太/也', needs: '需要', because: '因为', clear: '清楚的',
  main: '主要的', reduce: '减少', online: '在线的', service: '服务', study: '学习', company: '公司', each: '每个',
  where: '哪里', part: '部分', plan: '计划', report: '报告', area: '区域', item: '项目/物品', time: '时间',
  put: '放', table: '桌子', dish: '菜肴', pass: '递给', would: '会/愿意', like: '喜欢/想要',
  some: '一些', order: '订单', tell: '告诉', included: '包含', booking: '预订', show: '展示',
  finish: '完成', task: '任务', send: '发送', together: '一起', often: '经常', doctor: '医生',
  about: '关于', nurse: '护士', checked: '检查了', improve: '改善', pay: '支付', card: '卡片',
  return: '退回', purchase: '购买', get: '得到', include: '包括', reservation: '预订', soup: '汤',
  sauce: '酱料', kitchen: '厨房', restaurant: '餐厅', menu: '菜单', food: '食物', water: '水',
  coffee: '咖啡', next: '下一个', find: '找到', passport: '护照', different: '不同的', evening: '晚上',
  lunch: '午餐', by: '通过', first: '第一', schedule: '日程', breakfast: '早餐', rings: '响起',
  half: '一半', six: '六', seven: '七', usually: '通常', walk: '走路', work: '工作', open: '打开',
  page: '页', answer: '答案', board: '黑板', blue: '蓝色的', lamp: '灯', beside: '在旁边',
  sofa: '沙发', two: '两个', towels: '毛巾', drawer: '抽屉', keys: '钥匙', under: '在……下面',
  fresh: '新鲜的', tomatoes: '番茄', recipe: '食谱', spicy: '辣的', pharmacy: '药店', library: '图书馆',
  across: '在对面', traffic: '交通', light: '灯', right: '右边', second: '第二', bus: '公交车',
  stop: '车站', around: '在周围', corner: '拐角', invited: '邀请了', cousins: '表兄弟姐妹',
  dinner: '晚餐', brother: '哥哥/弟弟', learning: '学习', cook: '做饭',
};

function translateWord(word, glossary) {
  const normalized = String(word == null ? '' : word).toLocaleLowerCase();
  const localEntries = (Array.isArray(glossary) ? glossary : [])
    .map((entry) => Array.isArray(entry) ? entry : [entry && entry.word, entry && entry.translation]);
  // The question glossary contains the lesson's target vocabulary. When a
  // sentence uses a word from another lesson, reuse that authored translation
  // as a direct dictionary lookup instead of showing a context hint.
  const catalogEntries = [];
  try {
    if (typeof catalog !== 'undefined' && catalog.questionBank) {
      Object.values(catalog.questionBank).forEach((question) => {
        (question.glossary || []).forEach((entry) => catalogEntries.push(entry));
      });
    }
  } catch (_) { /* Node tests and early page boot have no catalog yet. */ }
  const entries = [...localEntries, ...catalogEntries]
    .map((entry) => Array.isArray(entry) ? entry : [entry && entry.word, entry && entry.translation]);
  const entry = entries.find((item) => String(item[0] || '').toLocaleLowerCase() === normalized && item[1]);
  return entry ? String(entry[1]) : (commonTranslations[normalized] || '词义暂未收录');
}

function slowSpeechRate() { return 0.5; }

function renderGlossaryText(text, glossary) {
  const rawText = String(text == null ? '' : text);
  const protectedTags = [];
  const protectedText = rawText.replace(/<[^>]*>/g, (tag) => {
    const index = protectedTags.push(tag) - 1;
    return `\uE000${index}\uE001`;
  });
  const entries = (Array.isArray(glossary) ? glossary : [])
    .map((entry) => Array.isArray(entry) ? entry : [entry && entry.word, entry && entry.translation])
    .filter((entry) => entry[0] && entry[1])
    .map(([word, translation]) => ({ word: String(word), translation: String(translation) }))
    .sort((a, b) => b.word.length - a.word.length);
  const lookup = new Map(entries.map((entry) => [entry.word.toLocaleLowerCase(), entry]));
  return protectedText.split(/([A-Za-z]+(?:['’\-][A-Za-z]+)?|[^A-Za-z]+)/g).filter(Boolean).map((part) => {
    const protectedMatch = part.match(/^\uE000(\d+)\uE001$/);
    if (protectedMatch) return escapeGlossaryHtml(protectedTags[Number(protectedMatch[1])]);
    const isWord = /^[A-Za-z]+(?:['’\-][A-Za-z]+)?$/.test(part);
    if (!isWord) return escapeGlossaryHtml(part);
    // Every visible English word is interactive. Authored glossary entries
    // show their translation; an uncatalogued function/content word still gets
    // a safe contextual hint instead of silently becoming unclickable text.
    const entry = lookup.get(part.toLocaleLowerCase());
    const sourceWord = entry ? entry.word : part;
    const sourceTranslation = entry ? entry.translation : translateWord(part, []);
    const word = escapeGlossaryHtml(sourceWord);
    const translation = escapeGlossaryHtml(sourceTranslation);
    const jsWord = String(sourceWord).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const jsTranslation = String(sourceTranslation).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `<button type="button" class="glossary-word" aria-label="${word}：${translation}" onclick="showWordHint('${escapeGlossaryHtml(jsWord)}','${escapeGlossaryHtml(jsTranslation)}')">${word}</button>`;
  }).join('');
}

function allPairsMatched(mapping, count) {
  const values = Array.isArray(mapping) ? mapping : Object.keys(mapping || {}).map((key) => mapping[key]);
  return Number.isInteger(count) && count > 0 && values.length === count && new Set(values).size === count && values.every((value) => Number.isInteger(value));
}

function reviewIconSvg() {
  return '<svg class="review-illustration" viewBox="0 0 96 96" role="img" aria-label="复习小屋图标" fill="none"><path d="M16 44 48 18l32 26v31a7 7 0 0 1-7 7H23a7 7 0 0 1-7-7V44Z" fill="#fff" stroke="#fff" stroke-width="5" stroke-linejoin="round"/><path d="M28 81V55h40v26" stroke="#ff6d61" stroke-width="7" stroke-linejoin="round"/><path d="M36 81V64h24v17" stroke="#ffb06d" stroke-width="6"/><path d="m48 18 7 8" stroke="#52d7b4" stroke-width="5" stroke-linecap="round"/></svg>';
}

function questionPromptHtml(question) {
  const q = question || {};
  if (q.kind === 'dialogue') return dialogueQuestionPrompt(q);
  const instruction = q.instruction || '';
  const prompt = q.kind === 'word'
    ? `<button class="word-hint" onclick="showWordHint('${escapeInlineArgument(q.audio || q.prompt || '')}','${escapeInlineArgument(q.translation || '')}')">${escapeGlossaryHtml(q.audio || q.prompt || '')}</button>`
    : renderGlossaryText(q.prompt || '', q.glossary);
  const scene = q.scene ? `<div class="scene-context"><span class="scene-orbit">✦</span><span>${escapeGlossaryHtml(q.scene)}</span></div>` : '';
  return `${scene}<p class="prompt-instruction">${escapeGlossaryHtml(instruction)}</p><h2>${prompt}</h2>`;
}

// Render an authored conversation without leaking the Chinese translation.
// Word-level buttons retain the same direct dictionary lookup as ordinary
// sentence prompts. The revealIndex option is only used after submission to
// reveal the checked turn's translation in the feedback flow.
function renderDialogueBubbles(dialogue, options) {
  const source = dialogue || {};
  const turns = Array.isArray(source.turns) ? source.turns : [];
  const characters = Array.isArray(source.characters) ? source.characters : [];
  const byId = new Map(characters.map((character) => [String(character.id), character]));
  const revealIndex = options && Number.isInteger(options.revealIndex) ? options.revealIndex : -1;
  const hideIndex = options && Number.isInteger(options.hideIndex) ? options.hideIndex : -1;
  return `<div class="dialogue-bubbles" id="dialogue-bubbles" role="list">${turns.map((turn, index) => {
    const character = byId.get(String(turn.speaker)) || {};
    const name = character.name || turn.speaker || 'Lumi';
    const role = character.role || 'partner';
    const hiddenAnswer = hideIndex === index && revealIndex !== index;
    const translation = revealIndex >= 0 && (revealIndex === index || revealIndex === turns.length) ? `<span class="dialogue-translation">${escapeGlossaryHtml(turn.translation || '')}</span>` : '';
    const text = hiddenAnswer ? '<span class="dialogue-hidden-answer">……</span>' : renderGlossaryText(turn.text || '', source.glossary);
    return `<article class="dialogue-bubble dialogue-${escapeGlossaryHtml(role)}" data-turn-index="${index}" role="listitem"><div class="dialogue-speaker">${escapeGlossaryHtml(name)}</div><div class="dialogue-text">${text}${translation}</div></article>`;
  }).join('')}</div>`;
}

function dialogueQuestionPrompt(question) {
  const q = question || {};
  const scene = q.scene ? `<div class="scene-context"><span class="scene-orbit">✦</span><span>${escapeGlossaryHtml(q.scene)}</span></div>` : '';
  const instruction = `<p class="prompt-instruction">${escapeGlossaryHtml(q.instruction || '')}</p>`;
  const prompt = q.prompt ? `<h2 class="dialogue-prompt">${escapeGlossaryHtml(q.prompt)}</h2>` : '';
  const hideIndex = (q.mode === 'reply' || q.mode === 'gap') && Number.isInteger(q.targetIndex) ? q.targetIndex : -1;
  return `${scene}${instruction}${renderDialogueBubbles(q, { revealIndex: -1, hideIndex })}${prompt}`;
}

function shouldAutoPlayQuestion(session, question, muted) {
  return Boolean(!muted && question && (question.kind === 'listen' || question.kind === 'dialogue') && session && session.autoPlayedQuestionId !== question.id);
}

function hintOptions(options, answer) {
  const list = Array.isArray(options) ? [...options] : [];
  const wrong = list.filter((option) => option !== answer);
  const hidden = wrong.length ? wrong[wrong.length - 1] : null;
  return { hidden, options: hidden === null ? list : list.filter((option) => option !== hidden) };
}

(function () {
  // Keep this file loadable in Node so the feedback formatter can be regression-tested.
  if (typeof document === 'undefined') return;
  const betaBaseRender = render;
  const betaBaseRenderHome = renderHome;
  const betaBaseRenderPractice = renderPractice;
  const betaBaseProfile = renderProfile;
  const betaBaseStartLesson = startLesson;
  const levelRank = (id) => ({ a1: 1, a2: 2, b1: 3, b2: 4, 'b2+': 5, c1: 6 }[id] || 1);
  const targetRank = () => levelRank(state.targetLevel || 'b1');
  const currentRank = () => levelRank(state.currentLevel || 'a1');
  const betaNextLesson = () => {
    const allowed = catalog.lessonList.filter((l) => levelRank(l.levelId) >= currentRank() && levelRank(l.levelId) <= targetRank());
    return allowed.find((l) => !state.completed.includes(l.id)) || allowed[allowed.length - 1] || catalog.lessonList[0];
  };
  const betaUnlocked = (id) => {
    const lesson = lessonById(id);
    if (!lesson || levelRank(lesson.levelId) > targetRank()) return false;
    if (state.completed.includes(id) || (state.skippedLessons || []).includes(id)) return true;
    if (levelRank(lesson.levelId) < currentRank()) return true;
    const index = catalog.lessonList.findIndex((l) => l.id === id);
    if (index === 0) return true;
    const previous = catalog.lessonList[index - 1];
    return state.completed.includes(previous.id) || (state.skippedLessons || []).includes(previous.id) || (previous.sectionId && LumiModel.checkpointPassed && LumiModel.checkpointPassed(state, `${previous.sectionId}-checkpoint`));
  };
  nextLesson = betaNextLesson;
  isUnlocked = betaUnlocked;
  const betaEscape = (value) => escapeInlineArgument(value);
  const betaText = (value) => escapeGlossaryHtml(value);
  const betaShuffle = (items) => {
    const copy = [...(items || [])];
    for (let i = copy.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
    return copy;
  };
  shuffle = betaShuffle;
  const betaCurrent = () => {
    const session = state && state.session;
    const id = session && session.qids && session.qids[session.index];
    // Resolve the question again from its id. A stale object from a previous render
    // must never leak its answer into the feedback bar for the current question.
    return (id && catalog.questionBank[id]) || (session ? currentQ() : null);
  };
  const attachLessonDialogues = (lessonId) => {
    try {
      if (typeof LumiDialogues === 'undefined' || !LumiDialogues || typeof LumiDialogues.questionsFor !== 'function') return;
      const lesson = lessonById(lessonId);
      if (!lesson || lesson.__lumiDialoguesAttached) return;
      const additions = LumiDialogues.questionsFor(lesson) || [];
      lesson.questions = Array.isArray(lesson.questions) ? lesson.questions : [];
      additions.forEach((question) => {
        if (!question || !question.id || catalog.questionBank[question.id]) return;
        lesson.questions.push(question);
        catalog.questionBank[question.id] = question;
      });
      lesson.__lumiDialoguesAttached = true;
    } catch (_) { /* authored dialogue is optional during early boot */ }
  };
  const attachAllLessonDialogues = () => {
    if (catalog && Array.isArray(catalog.lessonList)) catalog.lessonList.forEach((lesson) => attachLessonDialogues(lesson.id));
  };
  const betaView = () => { state.session.view = state.session.view || {}; return state.session.view; };
  const normalizeInput = (value) => String(value || '').toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const inputExpected = (q, mode) => mode === 'dictation' ? (q.audio || '') : (q.audio || '');
  const inputPrompt = (q, mode) => mode === 'dictation' ? '听音频，输入你听到的英文句子' : `把这句话翻译成英文：${q.translation || q.promptCn || ''}`;
  const betaGoal = () => typeof LumiModel.goalXp === 'function' ? LumiModel.goalXp(state) : dailyGoalXp();
  const syncAudioPreferences = () => { if (window.LumiAudio && typeof window.LumiAudio.setPreferences === 'function') window.LumiAudio.setPreferences({ speech: !state.muted, sound: state.sound !== false }); };

  updateTop = function () { const streak = $('top-streak'); const points = $('top-points'); const xp = $('top-xp'); if (streak) streak.textContent = state.streak || 0; if (points) points.textContent = state.points ?? state.coins ?? 0; if (xp) xp.textContent = state.xp || 0; };
  go = function (screen) {
    if (state.screen === 'lesson' && state.session && !state.session.finished && screen !== 'lesson') { openModal('暂时离开？', '本关进度会保留在本机，回来可以继续，不会丢失积分和学习记录。', '保存并离开', '继续学习', () => { state.screen = screen; save(); document.body.classList.remove('playing'); render(); }); return; }
    state.screen = screen; save(); render(); window.scrollTo(0, 0);
  };
  startLesson = function (id, review) {
    const startBetaLesson = (lessonId, isReview) => {
      state = LumiModel.normalize(state);
      attachLessonDialogues(lessonId);
      betaBaseStartLesson(lessonId, !!isReview);
      if (state.session && Array.isArray(state.session.qids)) {
        state.session.qids = betaShuffle(state.session.qids);
        state.session.index = 0;
        state.session.view = {};
        state.session.autoPlayedQuestionId = null;
        state.session.autoPlayScheduledQuestionId = null;
        save();
        // The legacy starter renders once before returning. Re-render after
        // shuffling so the visible prompt and the id used for grading stay in
        // the same order.
        render();
      }
    };
    if (state.session && !state.session.finished) { if (state.session.lessonId === id) { state.screen = 'lesson'; render(); return; } openModal('开启新的关卡？', '上一关的进度会保留在本机。', '开启新关', '继续上一关', () => { state.session = null; startBetaLesson(id, review); }); return; }
    startBetaLesson(id, review); window.scrollTo(0, 0);
  };
  const betaKindLabel = (q) => ({ listen: '◖ 听一听', order: '✦ 拼句', match: '▦ 配对', fill: '⌁ 填空', word: '● 词义', choice: '● 句子', dialogue: '☼ 对话' }[q.kind] || '● 练一练');
  const betaQuestionType = (q) => q.kind === 'dialogue' ? ({ intent: '意图判断', reply: '接话挑战', gap: '听懂空缺', sequence: '对话排序' }[q.mode] || '对话练习') : ({ listen: '听力挑战', order: '拼出句子', match: '词语配对', fill: '词语填空', word: '词义侦探', choice: '认识句子' }[q.kind] || '综合练习');
  const dialogueTurns = (q) => Array.isArray(q && q.turns) ? q.turns.map((turn) => ({ text: turn.text, speaker: turn.speaker })) : [];
  function betaAnswerHtml(q) {
    const view = betaView();
    if (state.session.inputMode) return `<div class="input-practice-card"><input id="free-answer" class="free-answer" autocomplete="off" autocapitalize="none" placeholder="${state.session.inputMode === 'dictation' ? '输入听到的英文' : '输入英文翻译'}" onkeydown="if(event.key==='Enter')checkFreeAnswer()"><button class="secondary-btn check-answer" onclick="checkFreeAnswer()">检查答案</button></div>`;
    if (q.kind === 'order') { view.tokens = view.tokens || betaShuffle(q.tokens); const chosen = state.session.order || []; return `<div class="token-answer" id="token-answer">${chosen.length ? chosen.map((x) => `<button class="token" onclick="removeToken(${x.i})">${betaText(x.token)}</button>`).join('') : '<span class="summary">点击下方单词组成句子</span>'}</div><div class="token-bank" id="token-bank">${view.tokens.map((t, i) => `<button class="token ${chosen.some((x) => x.i === i) ? 'used' : ''}" id="token-${i}" data-token="${betaEscape(t)}" onclick="pickToken(${i})">${betaText(t)}</button>`).join('')}</div><button class="secondary-btn check-answer" onclick="checkOrder()">检查答案</button>`; }
    if (q.kind === 'match') { view.matched = view.matched || []; view.right = view.right || betaShuffle(q.pairs.map((p, i) => i)); const pairButton = (side, i, text) => `<button class="pair ${view.matched.includes(i) ? 'matched' : ''}" ${view.matched.includes(i) ? 'disabled' : ''} id="pair-${side}-${i}" onclick="pickPair('${side}',${i})">${betaText(text)}${view.matched.includes(i) ? ' ✓' : ''}</button>`; return `<div class="pair-grid"><div class="pair-col">${q.pairs.map((p, i) => pairButton('left', i, p[0])).join('')}</div><div class="pair-col">${view.right.map((i) => pairButton('right', i, q.pairs[i][1])).join('')}</div></div><p class="match-hint">配对全部完成后提交，点错只会提示。</p>`; }
    if (q.kind === 'dialogue') {
      view.options = view.options || betaShuffle(q.options || []);
      if (q.mode === 'sequence') {
        view.sequence = Array.isArray(view.sequence) ? view.sequence : [];
        return `<div class="dialogue-answer"><p class="answer-label">按对话发生顺序点击句子</p><div class="answer-grid dialogue-sequence">${view.options.map((o, i) => { const original = (q.options || []).indexOf(o); const index = original < 0 ? i : original; const selectedAt = view.sequence.indexOf(index); return `<button class="answer-btn ${selectedAt >= 0 ? 'selected' : ''}" data-option="${betaEscape(o)}" onclick="pickDialogueTurn(${index})"><span class="answer-number">${selectedAt >= 0 ? selectedAt + 1 : String.fromCharCode(65 + i)}</span>${betaText(o)}</button>`; }).join('')}</div><button id="check-choice" class="secondary-btn check-answer" ${view.sequence.length === (q.turns || []).length ? '' : 'disabled'} onclick="checkDialogueSequence()">检查答案</button></div>`;
      }
      const options = view.options;
      const selected = state.session.choice;
      const label = q.mode === 'sequence' ? '选择下一步顺序' : '选择最自然的回答';
      return `<div class="dialogue-answer"><p class="answer-label">${label}</p><div class="answer-grid">${options.map((o, i) => `<button class="answer-btn ${selected === o ? 'selected' : ''}" data-option="${betaEscape(o)}" onclick="chooseAnswer(this,'${betaEscape(o)}')"><span class="answer-number">${String.fromCharCode(65 + i)}</span>${betaText(o)}</button>`).join('')}</div><button id="check-choice" class="secondary-btn check-answer" ${selected ? '' : 'disabled'} onclick="checkSelectedAnswer()">检查答案</button></div>`;
    }
    view.options = view.options || betaShuffle(q.options || []);
    const visibleOptions = view.hintHidden ? view.options.filter((option) => option !== view.hintHidden) : view.options;
    const hint = view.hintUsed ? '<span class="hint-used">已使用提示</span>' : '<button type="button" class="hint-btn" onclick="usePointHint()">💡 提示 · 3 积分</button>';
    return `${hint}<div class="answer-grid">${visibleOptions.map((o, i) => `<button class="answer-btn ${state.session.choice === o ? 'selected' : ''}" data-option="${betaEscape(o)}" onclick="chooseAnswer(this,'${betaEscape(o)}')"><span class="answer-number">${String.fromCharCode(65 + i)}</span>${betaText(o)}</button>`).join('')}</div><button id="check-choice" class="secondary-btn check-answer" ${state.session.choice ? '' : 'disabled'} onclick="checkSelectedAnswer()">检查答案</button>`;
  }
  answerHtml = betaAnswerHtml;
  const dialogueSpeechText = (q) => {
    if (!q) return '';
    if (q.audio) return q.audio;
    const turns = Array.isArray(q.turns) ? q.turns : [];
    const hidden = new Set((q.mode === 'reply' || q.mode === 'gap') && Number.isInteger(q.targetIndex) ? [q.targetIndex] : []);
    return turns.filter((_, index) => !hidden.has(index)).map((turn) => turn && turn.text).filter(Boolean).join(' ');
  };
  const speakWithLumiAudio = (text, rate) => {
    if (state.muted) return;
    if (window.LumiAudio && typeof window.LumiAudio.speak === 'function') { window.LumiAudio.speak(text, rate); return; }
    if (window.LumiAndroid && LumiAndroid.speakAtRate) { LumiAndroid.speakAtRate(text, rate); return; }
    if (window.speechSynthesis) { const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'en-US'; utterance.rate = rate; speechSynthesis.cancel(); speechSynthesis.speak(utterance); }
  };

  renderLesson = function () {
    if (!state.session) { state.screen = 'home'; document.body.classList.remove('playing'); return renderHome(); }
    activeLesson = lessonById(state.session.lessonId); activeReview = !!state.session.review; const q = betaCurrent(); if (!q) { state.session = null; state.screen = 'home'; return renderHome(); }
    // Pin the question rendered into the DOM. This prevents a queue mutation or
    // stale inline handler from displaying feedback for a different question.
    state.session.renderedQuestionId = q.id;
    const s = state.session; const progress = Math.round((s.index / Math.max(1, s.qids.length)) * 100); const combo = Number(s.combo || state.combo || 0); const promptHtml = questionPromptHtml(q);
    document.body.classList.add('playing');
    const activePromptHtml = s.inputMode ? `<p class="prompt-instruction">${betaText(inputPrompt(q, s.inputMode))}</p><h2>${s.inputMode === 'dictation' ? (typeof LumiIcon !== 'undefined' ? LumiIcon.html('headphones', 20) + ' ' : '🔊 ') + '听写挑战' : (typeof LumiIcon !== 'undefined' ? LumiIcon.html('pencil', 20) + ' ' : '✍️ ') + '英文输出'}</h2>` : promptHtml;
    const dialogueText = dialogueSpeechText(q);
    $('main').innerHTML = `<div class="lesson-shell screen-enter"><div class="lesson-top"><button class="icon-btn" aria-label="退出关卡" onclick="go('home')">×</button><div class="lesson-progress"><div style="width:${Math.max(7, progress)}%"></div></div><div class="lesson-stats"><span class="points-count">✦ ${state.points || 0}</span><span class="combo-count ${combo >= 2 ? 'combo-live' : ''}">Combo ${combo}</span></div></div><div class="lesson-mascot" id="lesson-mascot">${(typeof LumiMascot !== 'undefined') ? LumiMascot.html(s.lastCorrect === true ? 'happy' : s.lastCorrect === false ? 'sad' : 'thinking', 56) : mascotSvg()}</div><div class="question-card ${q.kind === 'listen' || q.kind === 'dialogue' ? 'listening' : ''}"><span class="q-count">${s.index + 1} / ${s.qids.length}</span><div class="question-tag">${betaKindLabel(q)} · ${betaQuestionType(q)}</div>${q.kind === 'listen' || q.kind === 'dialogue' || s.inputMode === 'dictation' ? `<button class="listen-orb" onclick="${q.kind === 'dialogue' ? 'speakDialogue()' : `speak('${betaEscape(q.audio || dialogueText)}')`}" aria-label="播放听力">${(typeof LumiIcon !== 'undefined') ? LumiIcon.html('volume', 32) : '🔊'}</button>` : ''}${activePromptHtml}${(q.audio || q.kind === 'dialogue') && q.kind !== 'listen' && !s.inputMode ? `<div class="audio-row"><button class="audio-btn" onclick="${q.kind === 'dialogue' ? 'speakDialogue()' : `speak('${betaEscape(q.audio || dialogueText)}')`}">${(typeof LumiIcon !== 'undefined') ? LumiIcon.html('volume', 14) + ' ' : '🔊 '}${q.kind === 'dialogue' ? '重播对话' : '播放英语'}</button><button class="audio-btn slow" onclick="${q.kind === 'dialogue' ? 'speakDialogue(true)' : `speakSlow('${betaEscape(q.audio || dialogueText)}')`}">${(typeof LumiIcon !== 'undefined') ? LumiIcon.html('turtle', 14) + ' ' : '🐢 '}慢速</button></div>` : ''}</div><div id="answer-area">${betaAnswerHtml(q)}</div><div class="lesson-footer"><div id="feedback" class="feedback" role="status"><div id="feedback-icon" class="feedback-mark">✓</div><div class="feedback-body"><strong id="feedback-title">回答正确！</strong><small id="feedback-copy">继续保持</small><span id="feedback-answer"></span></div></div><button id="continue" class="continue-btn" style="display:none" onclick="nextQuestion()">${s.index === s.qids.length - 1 ? '查看结果' : '继续'}</button></div></div>`;
    if ((shouldAutoPlayQuestion(s, q, state.muted) || (s.inputMode === 'dictation' && !state.muted && s.autoPlayedQuestionId !== q.id)) && s.autoPlayScheduledQuestionId !== q.id) {
      s.autoPlayScheduledQuestionId = q.id;
      save();
      window.setTimeout(() => {
        if (state.session && state.session.renderedQuestionId === q.id && !state.muted) {
          s.autoPlayedQuestionId = q.id;
          s.autoPlayScheduledQuestionId = null;
          save();
          if (q.kind === 'dialogue') speakDialogue(); else speak(q.audio || dialogueSpeechText(q));
        } else if (state.session && s.autoPlayScheduledQuestionId === q.id) {
          s.autoPlayScheduledQuestionId = null;
          save();
        }
      }, 140);
    }
    if (s.checked) betaPaintFeedback(!!s.lastCorrect, q);
  };
  function betaPaintFeedback(correct, q) {
    const feedback = $('feedback'); if (!feedback) return;
    if (q && q.kind === 'dialogue') {
      const bubbles = document.querySelector('#dialogue-bubbles');
      if (bubbles) bubbles.outerHTML = renderDialogueBubbles(q, { revealIndex: Number.isInteger(q.targetIndex) ? q.targetIndex : q.turns.length });
    }
    const details = state.session && state.session.inputMode ? { answer: q.audio || q.answer, translation: q.translation || '' } : betaFeedbackDetails(q, correct);
    feedback.className = `feedback show ${correct ? 'good' : 'bad'}`;
    $('feedback-icon').textContent = correct ? '✓' : '×';
    const streakNow = Number(state.comboStreak || 0);
    $('feedback-title').textContent = correct ? (streakNow >= 5 ? `连击 x${streakNow}！太棒了` : '回答正确！') : '不对，看看正确答案';
    // Reward copy must match what LumiModel.answer actually granted. A repeat
    // of an already-earned question awards 0 XP, and a due review awards 3 (6
    // when boosted). Hardcoding "+5 XP" here made the app look like it lied.
    const earnedXp = Math.max(0, Number(state.session && state.session.lastXp) || 0);
    const xpLabel = earnedXp > 0 ? `+${earnedXp} XP` : '已掌握，无新增 XP';
    if (correct && q.kind === 'fill' && details.translation) {
      $('feedback-copy').textContent = `${xpLabel} · 释义：${details.translation}`;
      $('feedback-answer').textContent = '';
    } else {
      $('feedback-copy').textContent = correct ? `${xpLabel}${q.audio ? ` · ${q.audio}` : ''}` : `正确答案：${details.answer}`;
      $('feedback-answer').textContent = details.translation && details.translation !== details.answer ? `释义：${details.translation}` : '';
    }
    const continueButton = $('continue');
    if (continueButton) {
      const session = state.session;
      continueButton.textContent = session && session.index >= session.qids.length - 1 ? '查看结果' : '继续';
      continueButton.style.display = 'block';
    }
    document.querySelectorAll('#answer-area button').forEach((button) => { button.disabled = true; });
    document.querySelectorAll('.answer-btn').forEach((button) => { if (button.dataset.option === q.answer) button.classList.add('correct'); if (button.dataset.option === state.session.choice && !correct) button.classList.add('wrong'); });
    const shell = document.querySelector('.lesson-shell');
    if (shell) { shell.classList.remove('answer-good', 'answer-bad'); shell.classList.add(correct ? 'answer-good' : 'answer-bad'); }
    // Full-screen flash
    const flash = document.createElement('div');
    flash.className = `flash-overlay ${correct ? 'correct' : 'wrong'}`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 550);
    // Vibration on wrong
    if (!correct && navigator.vibrate) { try { navigator.vibrate(150); } catch (_) {} }
    // XP float
    if (correct && earnedXp > 0) {
      const xpEl = document.createElement('div');
      xpEl.className = 'xp-float';
      xpEl.textContent = `+${earnedXp} XP`;
      const fbRect = feedback.getBoundingClientRect();
      xpEl.style.left = (fbRect.left + fbRect.width * 0.7) + 'px';
      xpEl.style.top = (fbRect.top + 10) + 'px';
      document.body.appendChild(xpEl);
      setTimeout(() => xpEl.remove(), 1100);
    }
    // Combo burst for streak >= 3
    if (correct && streakNow >= 3) {
      const comboEl = document.createElement('div');
      comboEl.className = 'combo-burst';
      comboEl.textContent = `Combo x${streakNow}!`;
      comboEl.style.left = '50%';
      comboEl.style.top = '35%';
      comboEl.style.transform = 'translateX(-50%)';
      document.body.appendChild(comboEl);
      setTimeout(() => comboEl.remove(), 700);
    }
    // Mascot reaction
    if (typeof LumiMascot !== 'undefined') {
      LumiMascot.setExpression('#lesson-mascot .lumi-mascot', correct ? (streakNow >= 5 ? 'cheer' : 'happy') : 'sad');
      const mascotEl = document.querySelector('.lesson-mascot');
      if (mascotEl) { mascotEl.classList.remove('mascot-happy', 'mascot-oops'); void mascotEl.offsetWidth; mascotEl.classList.add(correct ? 'mascot-happy' : 'mascot-oops'); }
    } else {
      const mascot = document.querySelector('.lesson-mascot'); if (mascot) mascot.className = `lesson-mascot mascot-${correct ? 'happy' : 'oops'}`;
    }
  }
  function betaTone(correct) {
    if (state.muted || state.sound === false) return;
    try {
      if (window.LumiAudio && typeof window.LumiAudio.sfx === 'function') {
        const streak = Number(state.comboStreak || 0);
        if (correct && streak > 0 && streak % 5 === 0) { window.LumiAudio.sfx('streak'); }
        else if (correct && streak >= 3) { window.LumiAudio.sfx('combo'); }
        else { window.LumiAudio.sfx(correct ? 'correct' : 'wrong'); }
        return;
      }
      if (window.LumiAndroid && typeof LumiAndroid.playFeedback === 'function') { LumiAndroid.playFeedback(correct ? 'correct' : 'wrong'); return; }
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return;
      const ctx = new AudioCtor(); const oscillator = ctx.createOscillator(); const gain = ctx.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = correct ? 660 : 220;
      gain.gain.setValueAtTime(.0001, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.08, ctx.currentTime + .015); gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + (correct ? .16 : .22));
      oscillator.connect(gain); gain.connect(ctx.destination); oscillator.start(); oscillator.stop(ctx.currentTime + (correct ? .18 : .24));
    } catch (_) { /* audio is an enhancement; never block answering */ }
  }
  let autoAdvanceTimer = null;
  function clearAutoAdvance() { if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; } }
  window.clearAutoAdvance = clearAutoAdvance;
  function betaSubmit(correct, q) {
    const s = state.session; if (!s || s.checked) return;
    const activeId = String(s.renderedQuestionId || s.qids[s.index] || '');
    const question = (activeId && catalog.questionBank[activeId]) || q || betaCurrent();
    if (!question) return;
    const answered = LumiModel.answer(state, question.id, !!correct, Date.now()); if (answered === false) return;
    s.lastCorrect = !!correct; const streak = Number(state.comboStreak || 0); s.combo = streak ? Math.floor(streak / 5) : (correct ? Number(s.combo || 0) + 1 : 0); state.combo = s.combo;
    // LumiModel.answer appends a failed id once. Keep this guard for migrated sessions.
    if (!correct && !s.qids.slice(s.index + 1).includes(question.id)) s.qids.push(question.id);
    save();
    updateTop();
    const pointsCount = document.querySelector('.points-count');
    if (pointsCount) pointsCount.textContent = `✦ ${state.points || 0}`;
    betaPaintFeedback(!!correct, question); betaTone(!!correct); if (correct && state.effects) { buzz(); if (s.combo > 0) burst(); }
    // Auto-advance after 1.5s on correct answer
    clearAutoAdvance();
    if (correct) {
      autoAdvanceTimer = setTimeout(() => {
        autoAdvanceTimer = null;
        if (state.session && state.session.checked) nextQuestion();
      }, 1500);
    }
  }
  submit = betaSubmit;
  checkFreeAnswer = function () {
    const s = state.session; const q = betaCurrent(); const input = $('free-answer');
    if (!s || s.checked || !q || !input) return;
    const expected = inputExpected(q, s.inputMode); const value = normalizeInput(input.value);
    if (!value) return toast('先输入答案再检查');
    s.choice = input.value; const result = typeof LumiPractice !== 'undefined' ? LumiPractice.grade(input.value, expected) : { correct: value === normalizeInput(expected) }; betaSubmit(result.correct, q);
  };
  chooseAnswer = function (element, value) {
    const s = state.session;
    if (!s || s.checked) return;
    s.choice = value;
    document.querySelectorAll('#answer-area .answer-btn').forEach((button) => button.classList.toggle('selected', button === element || button.dataset.option === value));
    const check = $('check-choice');
    if (check) check.disabled = false;
    save();
  };
  checkSelectedAnswer = function () {
    const s = state.session; const q = betaCurrent();
    if (!s || s.checked || !q || !s.choice) return toast('先选择一个答案');
    betaSubmit(s.choice === q.answer, q);
  };
  pickDialogueTurn = function (index) {
    const s = state.session; const q = betaCurrent(); if (!s || s.checked || !q || q.kind !== 'dialogue' || q.mode !== 'sequence') return;
    const view = betaView(); view.sequence = Array.isArray(view.sequence) ? view.sequence : [];
    const at = view.sequence.indexOf(index); if (at >= 0) view.sequence.splice(at, 1); else view.sequence.push(index);
    save(); renderLesson();
  };
  checkDialogueSequence = function () {
    const s = state.session; const q = betaCurrent(); const view = betaView(); if (!s || s.checked || !q || q.kind !== 'dialogue' || q.mode !== 'sequence') return;
    if (!Array.isArray(view.sequence) || view.sequence.length !== (q.turns || []).length) return toast('请先排完所有句子');
    betaSubmit(view.sequence.join('|') === q.answer, q);
  };
  usePointHint = function () {
    const s = state.session; const q = betaCurrent(); if (!s || !q || s.checked || !Array.isArray(q.options)) return;
    const view = betaView(); if (view.hintUsed) return toast('这道题的提示已经使用过了');
    const result = hintOptions(view.options || q.options, q.answer);
    if (result.hidden === null) return toast('这道题没有可隐藏的干扰项');
    if (!LumiModel.spendPoints(state, 3)) return toast('还需要 3 积分才能使用提示');
    view.options = result.options.concat(result.hidden === null ? [] : [result.hidden]);
    view.hintHidden = result.hidden;
    view.hintUsed = true;
    save(); renderLesson(); toast('已隐藏一个干扰项');
  };
  pickToken = function (index) { const s = state.session; if (!s || s.checked) return; const button = $(`token-${index}`); if (!button || button.classList.contains('used')) return; s.order = s.order || []; s.order.push({ i: index, token: button.dataset.token }); button.classList.add('used'); $('token-answer').innerHTML = s.order.map((x) => `<button class="token" onclick="removeToken(${x.i})">${x.token}</button>`).join(''); save(); };
  removeToken = function (index) { const s = state.session; if (!s || s.checked) return; const at = (s.order || []).findIndex((x) => x.i === index); if (at < 0) return; s.order.splice(at, 1); $(`token-${index}`).classList.remove('used'); $('token-answer').innerHTML = s.order.length ? s.order.map((x) => `<button class="token" onclick="removeToken(${x.i})">${x.token}</button>`).join('') : '<span class="summary">点击下方单词组成句子</span>'; save(); };
  checkOrder = function () { const s = state.session; if (!s || s.checked) return; const q = betaCurrent(); if (!(s.order || []).length) return toast('先把单词排好，再检查答案'); betaSubmit(s.order.map((x) => x.token).join(' ') === q.answer, q); };
  pickPair = function (side, index) { const s = state.session; if (!s || s.checked) return; const view = betaView(); if ((view.matched || []).includes(index)) return; matchPick[side] = index; document.querySelectorAll('.pair').forEach((b) => b.classList.remove('picked')); $(`pair-${side}-${index}`).classList.add('picked'); if (matchPick.left === null || matchPick.right === null) return; const left = $(`pair-left-${matchPick.left}`); const right = $(`pair-right-${matchPick.right}`); const question = betaCurrent(); if (matchPick.left === matchPick.right) { view.matched = view.matched || []; view.matched.push(index); left.classList.remove('picked'); right.classList.remove('picked'); left.classList.add('matched'); right.classList.add('matched'); left.disabled = true; right.disabled = true; betaTone(true); if (question && allPairsMatched(view.matched, question.pairs.length)) betaSubmit(true, question); } else { view.hadMistake = true; left.classList.add('miss'); right.classList.add('miss'); toast('还不是一对，再试一次'); setTimeout(() => { left.classList.remove('picked', 'miss'); right.classList.remove('picked', 'miss'); }, 420); } matchPick = { left: null, right: null }; save(); };
  nextQuestion = function () { clearAutoAdvance(); const s = state.session; if (!s || !s.checked) return; if (s.index >= s.qids.length - 1) { if (s.inputMode) state.practiceSeen = [...new Set([...(state.practiceSeen || []), ...s.qids])].slice(-24); const reward = LumiModel.finish(state); save(); renderResult(reward); return; } s.index += 1; s.checked = false; s.lastCorrect = null; s.choice = null; s.renderedQuestionId = null; s.autoPlayedQuestionId = null; s.autoPlayScheduledQuestionId = null; s.order = []; s.view = {}; matchPick = { left: null, right: null }; save(); renderLesson(); window.scrollTo(0, 0); };
  startInputPractice = function (mode) {
    const ids = typeof LumiPractice !== 'undefined' ? LumiPractice.select(state, catalog, mode) : catalog.lessonList.flatMap(lesson => lesson.questions).filter(q => q.audio).slice(0, 6).map(q => q.id);
    if (!ids.length || !LumiModel.start(state, `practice-${mode}-${Date.now()}`, ids, true)) return toast('暂时没有可练习的内容');
    state.session.inputMode = mode; state.session.view = {}; state.screen = 'lesson'; activeLesson = { id: state.session.lessonId, title: mode === 'dictation' ? '听写训练' : '英文输出训练' }; activeReview = true; document.body.classList.add('playing'); save(); render();
  };

  renderHome = function () { document.body.classList.remove('playing'); betaBaseRenderHome(); const hero = document.querySelector('.hero'); if (!hero) return; const level = (typeof levelInfo !== 'undefined' && levelInfo[state.targetLevel]) || { desc: '循序渐进地提升英语能力' }; const plan = document.createElement('div'); plan.className = 'plan-strip'; plan.innerHTML = `<span class="plan-icon">${(typeof LumiIcon !== 'undefined') ? LumiIcon.html(state.goal === 'travel' ? 'airplane' : state.goal === 'work' ? 'briefcase' : state.goal === 'all' ? 'globe' : 'sun', 20) : '★'}</span><div><strong>${(typeof goalNames !== 'undefined' && goalNames[state.goal]) || '综合提升'} · 目标 ${(state.targetLevel || 'b1').toUpperCase()}</strong><small>每天 ${state.dailyMinutes || 10} 分钟 · ${level.desc}</small></div><button onclick="openPlanSettings()">调整</button>`; hero.after(plan); document.querySelectorAll('.route-node-row[data-level]').forEach((unit) => { if (levelRank(unit.dataset.level) > targetRank()) unit.classList.add('future-level'); }); const goal = betaGoal(); const current = state.daily.xp || 0; const heading = document.querySelector('.section-head + .goal-card'); if (heading) { const label = heading.querySelector('strong'); if (label) label.textContent = current >= goal ? '目标完成，奖励已准备好！' : `今日目标 · ${goal} XP`; const fill = heading.querySelector('.progress-fill'); if (fill) fill.style.width = `${Math.min(100, current / goal * 100)}%`; const button = heading.querySelector('.goal-xp'); if (button) button.textContent = state.daily.claimed ? '已领取' : current >= goal ? '+15 ✦' : `+${goal - current}`; } document.querySelectorAll('.route-node').forEach((button, index) => { const lesson = catalog.lessonList[index]; if (!lesson) return; button.title = lesson.title; button.setAttribute('aria-label', `${index + 1}. ${lesson.title}`); if (!betaUnlocked(lesson.id) && !state.completed.includes(lesson.id)) button.onclick = () => toast(`完成前一关，就能解锁「${lesson.title}」`); }); if (state.session && !state.session.finished) { const resume = document.createElement('button'); resume.className = 'secondary-btn resume-lesson'; resume.textContent = '继续未完成的关卡 →'; resume.onclick = () => { state.screen = 'lesson'; render(); }; hero.after(resume); } };
  renderResult = function (reward) {
    const r = reward || {}; const passed = Boolean(r && r.passed);
    document.body.classList.remove('playing');
    const mascotResult = (typeof LumiMascot !== 'undefined') ? LumiMascot.html(passed ? 'celebrate' : 'sleepy', 96) : '';
    const acc = r.accuracy || 0, xp = r.xp || 0, pts = r.points || r.coins || 0;
    const achievementHtml = r.perfect ? '<div class="achievement">零失误完美通关 · +15 积分</div>' : r.firstPass ? '<div class="achievement">首次通关 · +10 积分</div>' : '';
    $('main').innerHTML = `<div class="screen-enter"><div class="result-card ${passed ? 'result-success celebrate' : 'result-retry'}"><div class="result-mascot-center">${mascotResult}</div><h1>${passed ? '关卡完成！' : '继续加油！'}</h1><p>${passed ? '这一关已经掌握，下一颗星星正在等你。' : '错题已回到本关队列，重新答对后就能完成。'}</p><div class="result-stats"><div class="result-stat"><strong class="count-num" data-target="${acc}" data-suffix="%">0%</strong><small>正确率</small></div><div class="result-stat"><strong class="count-num" data-target="${xp}" data-prefix="+">+0</strong><small>XP</small></div><div class="result-stat"><strong class="count-num" data-target="${pts}" data-prefix="+">+0</strong><small>Lumi 积分</small></div></div>${achievementHtml}<button class="continue-btn" style="margin-top:19px" onclick="go('home')">回到学习地图</button><button class="secondary-btn" onclick="go('practice')">去复习小屋</button></div></div>`;
    state.session = null; activeLesson = null; activeReview = false; save();
    if (passed) {
      // Double confetti burst
      burst(); setTimeout(() => burst(), 250);
      if (window.LumiAudio && typeof window.LumiAudio.sfx === 'function') { window.LumiAudio.sfx('levelup'); }
      // Count-up animation for stats
      setTimeout(() => {
        document.querySelectorAll('.count-num').forEach(el => {
          const target = parseInt(el.dataset.target, 10) || 0;
          const prefix = el.dataset.prefix || '';
          const suffix = el.dataset.suffix || '';
          const duration = 800; const start = performance.now();
          function tick(now) {
            const elapsed = now - start; const progress = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = Math.round(target * eased);
            el.textContent = prefix + val + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else { el.classList.add('count-up'); setTimeout(() => el.classList.remove('count-up'), 300); }
          }
          requestAnimationFrame(tick);
        });
      }, 400);
    } else {
      // Still show actual numbers on fail
      document.querySelectorAll('.count-num').forEach(el => {
        const target = parseInt(el.dataset.target, 10) || 0;
        el.textContent = (el.dataset.prefix || '') + target + (el.dataset.suffix || '');
      });
    }
  };
  openSpeechSettings = function () { if (window.LumiAndroid && typeof LumiAndroid.openSpeechSettings === 'function') LumiAndroid.openSpeechSettings(); else toast('请在系统设置中启用英语文字转语音。'); };
  renderProfile = function () { betaBaseProfile(); const heading = document.querySelector('.profile-head h2'); if (heading) heading.textContent = `Lv. ${Math.floor((state.xp || 0) / 100) + 1} 英语探险家`; const settings = document.querySelector('.settings-list'); if (settings && !settings.querySelector('.speech-settings')) { const button = document.createElement('button'); button.className = 'setting speech-settings'; button.innerHTML = '<div class="setting-copy"><div class="setting-icon">' + ((typeof LumiIcon !== 'undefined') ? LumiIcon.html('volume', 18) : '🔊') + '</div><div><strong>系统语音设置</strong><small>检查英语语音包和默认 TTS 引擎</small></div></div><span>›</span>'; button.onclick = openSpeechSettings; settings.insertBefore(button, settings.children[1] || null); } const legacy = document.querySelector('.point-shop-card'); if (!legacy) { const card = document.createElement('section'); card.className = 'point-shop-card'; card.innerHTML = `<div class="point-shop-head"><strong>✦ Lumi 积分 · ${state.points || 0}</strong><span>学习就能赚</span></div><p>答对新题 +2，完成关卡 +10，完美通关再 +15，每日目标 +15。</p><small>积分可以兑换提示、主题外观和宝箱，不限制学习次数。</small>`; const profile = document.querySelector('.profile-card'); if (profile) profile.after(card); } };
  const betaReadyHome = renderHome;
  renderHome = function () {
    betaReadyHome(); const hero = document.querySelector('.hero'); if (!hero) return;
    const items = LumiModel.tasks ? LumiModel.tasks(state) : [];
    const taskBox = document.createElement('section'); taskBox.className = 'daily-tasks';
    taskBox.innerHTML = `<div class="section-head"><h2>今日三项挑战</h2><span>完成可得积分</span></div>${items.map(item => `<button class="task-row ${item.claimed ? 'task-done' : ''}" onclick="claimTask('${item.id}')"><span class="task-icon">${item.claimed ? (typeof LumiIcon !== 'undefined' ? LumiIcon.html('check', 16) : '✓') : (typeof LumiIcon !== 'undefined' ? LumiIcon.html(item.id === 'new-lessons' ? 'map' : item.id === 'answer-questions' ? 'lightning' : 'brain', 16) : '⚡')}</span><span class="task-copy"><strong>${item.title}</strong><small>${Math.min(item.progress, item.target)} / ${item.target} · +${item.reward} 积分</small></span><span class="task-action">${item.claimed ? '已领' : item.progress >= item.target ? '领取' : '进行中'}</span></button>`).join('')}`;
    hero.after(taskBox);
  };
  renderPractice = function () {
    betaBaseRenderPractice(); const main = $('main'); if (!main) return;
    const due = LumiModel.dueReviews ? LumiModel.dueReviews(state, Date.now(), 99).length : state.mistakes.length;
    const section = document.createElement('section'); section.className = 'practice-tools';
    section.innerHTML = `<div class="section-head"><h2>主动输出</h2><span>${due} 个内容待复习</span></div><div class="practice-grid"><button class="practice-tool" onclick="startInputPractice('translate')"><strong>${(typeof LumiIcon !== 'undefined' ? LumiIcon.html('pencil', 18) + ' ' : '')}看中文打英文</strong><small>训练真正的输出能力</small></button><button class="practice-tool" onclick="startInputPractice('dictation')"><strong>${(typeof LumiIcon !== 'undefined' ? LumiIcon.html('headphones', 18) + ' ' : '')}听写挑战</strong><small>听懂后准确写出来</small></button></div>`;
    main.appendChild(section);
  };
  const betaReadyProfile = renderProfile;
  renderProfile = function () {
    betaReadyProfile(); const profile = document.querySelector('.profile-card'); if (!profile) return;
    const shop = document.createElement('section'); shop.className = 'collection-card'; const items = LumiModel.shopItems ? LumiModel.shopItems() : []; const achievements = LumiModel.achievements ? LumiModel.achievements() : [];
    shop.innerHTML = `<div class="section-head"><h2>积分商店</h2><span>${state.points || 0} ✦</span></div><div class="shop-grid">${items.map(item => { const owned = state.inventory.includes(item.id); return `<button class="shop-item ${owned ? 'owned' : ''}" onclick="${owned ? `useShopItem('${item.id}')` : `buyShopItem('${item.id}')`}"><b class="shop-icon">${(typeof LumiIcon !== 'undefined') ? LumiIcon.html(item.icon, 24) : item.icon}</b><strong>${item.title}</strong><small>${owned ? (item.id === 'review-boost' && state.reviewBoostRemaining ? '进行中 · '+state.reviewBoostRemaining+' 题' : '点击使用') : item.cost + ' 积分'}</small></button>`; }).join('')}</div><div class="section-head" style="margin-top:20px"><h2>成就徽章</h2><span>${state.achievements.length} / ${achievements.length}</span></div><div class="achievement-grid">${achievements.map(item => `<div class="achievement-badge ${state.achievements.includes(item.id) ? 'unlocked' : ''}"><b class="achievement-icon">${(typeof LumiIcon !== 'undefined') ? LumiIcon.html(item.icon, 22) : item.icon}</b><span>${item.title}</span><small>+${item.reward} 积分</small></div>`).join('')}</div>`;
    profile.after(shop);
  };
  claimTask = function (id) { if (LumiModel.claimTask && LumiModel.claimTask(state, id)) { save(); burst(); toast('挑战完成：积分已到账'); render(); } else toast('完成进度后即可领取这项奖励'); };
  buyShopItem = function (id) { if (LumiModel.buyItem && LumiModel.buyItem(state, id)) { save(); burst(); toast('已兑换，收藏加入你的背包'); render(); } else toast('积分不足或已经拥有这个物品'); };
  useShopItem = function (id) { if (LumiModel.useItem && LumiModel.useItem(state, id)) { save(); toast(id === 'review-boost' ? '复习加成已开启，接下来 10 道复习题获得更多 XP' : '外观已切换'); render(); } else toast('这个物品当前无法使用'); };
  claimDaily = function () { const goal = betaGoal(); if (LumiModel.claim(state)) { save(); burst(); toast('今日目标达成：+15 Lumi 积分'); render(); } else toast(state.daily.claimed ? '今天的奖励已经领取' : `完成 ${goal} XP 后可领取 15 Lumi 积分`); };
  speak = function (text) { speakWithLumiAudio(text, .9); };
  speakSlow = function (text) { speakWithLumiAudio(text, slowSpeechRate()); };
  speakDialogue = function (slow) {
    const q = betaCurrent(); if (!q || q.kind !== 'dialogue' || state.muted) return;
    const hidden = (q.mode === 'reply' || q.mode === 'gap') && Number.isInteger(q.targetIndex) ? q.targetIndex : -1;
    const turns = dialogueTurns(q).filter((_, index) => index !== hidden); const rate = slow ? slowSpeechRate() : .9;
    if (window.LumiAudio && typeof window.LumiAudio.playTurns === 'function') window.LumiAudio.playTurns(turns, { rate });
    else speakWithLumiAudio(dialogueSpeechText(q), rate);
  };

  let placementIndex = 0; let placementScore = 0; let onboardingStep = 0;
  let onboardingData = { goal: 'everyday', background: 'unknown', targetLevel: 'b1', dailyMinutes: 10, reminderTime: '19:30', widgetStyle: 'sunrise' };
  const goalNames = { everyday: '日常沟通', travel: '出国旅行', work: '工作交流', all: '综合提升' };
  const levelInfo = { a1: { name: 'A1 基础生存', desc: '能问候、介绍自己、点餐和问路。' }, a2: { name: 'A2 日常交流', desc: '能描述生活、讲述经历和计划未来。' }, b1: { name: 'B1 独立沟通', desc: '能在旅行、生活和工作中表达主要意思。' }, b2: { name: 'B2 工作与旅行', desc: '能处理复杂场景、表达观点和理解自然对话。' } };
  const basicPlacementQuestions = [
    { en: 'Hello, my name is Mia.', answer: '你好，我叫米娅。', options: ['你好，我叫米娅。', '我喜欢米娅。', '米娅在哪里？'] },
    { en: 'I went to the park yesterday.', answer: '过去发生的事', options: ['过去发生的事', '正在发生的事', '明天要发生的事'] },
    { en: 'Could you send me the updated plan?', answer: '请求对方发送更新后的计划', options: ['请求对方发送更新后的计划', '询问对方是否喜欢计划', '告诉对方计划已经取消'] },
    { en: 'Although it was raining, we continued the trip.', answer: '尽管下雨，我们仍然继续旅行', options: ['尽管下雨，我们仍然继续旅行', '因为下雨，所以我们取消旅行', '旅行让天气变得晴朗'] },
    { en: 'The proposal needs to be reviewed before Friday.', answer: '提案需要在周五前被审核', options: ['提案需要在周五前被审核', '提案周五已经通过审核', '周五需要写一份新提案'] },
    { en: 'Had I known about the delay, I would have adjusted the schedule.', answer: '如果我早知道延误，我会调整日程', options: ['如果我早知道延误，我会调整日程', '我已经按照日程完成了工作', '延误让日程提前结束'] }
  ];
  const advancedPlacementQuestions = [
    { en: 'The committee postponed the decision until further evidence could be reviewed.', answer: '委员会推迟了决定，直到可以审查更多证据', options: ['委员会推迟了决定，直到可以审查更多证据', '委员会立即批准了这项提案', '证据导致会议提前结束'] },
    { en: 'Had the figures been verified earlier, the report would have avoided a major revision.', answer: '如果数据早点核实，报告本可避免大幅修改', options: ['如果数据早点核实，报告本可避免大幅修改', '报告已经完成且无需修改', '数据核实导致报告延期'] },
    { en: 'The policy is intended to reduce emissions without placing additional costs on households.', answer: '这项政策旨在减少排放，同时不增加家庭成本', options: ['这项政策旨在减少排放，同时不增加家庭成本', '这项政策会提高所有家庭的成本', '这项政策只针对工业排放'] },
    { en: 'Despite the initial setback, the team managed to deliver the prototype ahead of schedule.', answer: '尽管最初遇到挫折，团队仍提前交付了原型', options: ['尽管最初遇到挫折，团队仍提前交付了原型', '团队因挫折取消了原型', '原型比计划晚了很久'] },
    { en: 'Her findings challenge the assumption that productivity always increases with longer working hours.', answer: '她的研究结果质疑了工作时间越长生产力就越高这一假设', options: ['她的研究结果质疑了工作时间越长生产力就越高这一假设', '她证明了加班一定提高生产力', '她没有研究生产力问题'] },
    { en: 'The contract will remain valid provided that both parties comply with the revised terms.', answer: '只要双方遵守修订后的条款，合同就继续有效', options: ['只要双方遵守修订后的条款，合同就继续有效', '合同会因条款修订而自动失效', '只有一方需要遵守合同'] }
  ];
  const placementQuestions = () => ['cet4', 'cet6'].includes(onboardingData.background) ? advancedPlacementQuestions : basicPlacementQuestions;
  // The declared background is a useful lower bound when a user skips the
  // placement test (or performs poorly on a test that is too narrow for them).
  // This prevents a CET/college learner from being sent back to A1 greetings.
  const backgroundStartLevel = {
    zero: 'a1',
    middle: 'a1',
    high: 'a2',
    college: 'b1',
    cet4: 'b1',
    cet6: 'b2',
    unknown: 'a1'
  };
  const levelForBackground = () => backgroundStartLevel[onboardingData.background] || 'a1';
  const levelForPlacementScore = () => placementScore >= 5 ? 'b2' : placementScore >= 4 ? 'b1' : placementScore >= 2 ? 'a2' : 'a1';
  const maxLevel = (first, second) => levelRank(first) >= levelRank(second) ? first : second;
  const resetPlacement = () => { placementIndex = 0; placementScore = 0; };
  function renderOnboarding() {
    document.body.classList.remove('playing'); const root = $('main');
    if (onboardingStep === 0) { root.innerHTML = `<div class="onboarding"><div class="onboarding-orbit"><div class="onboarding-mascot">${(typeof LumiMascot !== 'undefined') ? LumiMascot.html('happy', 142) : mascotSvg()}</div></div><div class="eyebrow">WELCOME TO LUMI ENGLISH</div><h1>把英语学习<br>变成一张冒险地图。</h1><p>告诉 Lumi 你的目标和节奏，它会从适合你的难度开始。</p><button class="continue-btn" onclick="beginOnboarding()">开始规划我的路线</button></div>`; return; }
    if (onboardingStep === 1) { const goalIcons = { everyday: 'sun', travel: 'airplane', work: 'briefcase', all: 'globe' }; root.innerHTML = `<div class="onboarding"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i></div><div class="eyebrow">STEP 1 · 你的目的地</div><h1>你最想在哪里<br>用上英语？</h1><div class="choice-grid">${[['everyday', '日常沟通'], ['travel', '出国旅行'], ['work', '工作交流'], ['all', '综合提升']].map((x) => `<button class="choice-card ${onboardingData.goal === x[0] ? 'selected' : ''}" data-onboarding-key="goal" data-onboarding-value="${x[0]}" onclick="pickOnboarding('goal','${x[0]}')"><span class="choice-icon">${(typeof LumiIcon !== 'undefined') ? LumiIcon.html(goalIcons[x[0]] || 'spark', 28) : ''}</span><strong>${x[1]}</strong><small>为你安排真实场景</small></button>`).join('')}</div><button class="continue-btn" onclick="nextOnboarding()">下一步</button></div>`; return; }
    if (onboardingStep === 2) { const backgrounds = [['zero','零基础'],['middle','初中英语'],['high','高中英语'],['college','大学英语'],['cet4','大学英语四级'],['cet6','大学英语六级'],['unknown','不确定']]; root.innerHTML = `<div class="onboarding"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i></div><div class="eyebrow">STEP 2 · 你的英语背景</div><h1>你现在大概处于<br>什么水平？</h1><div class="choice-grid">${backgrounds.map(([id,label]) => `<button class="choice-card ${onboardingData.background === id ? 'selected' : ''}" data-onboarding-key="background" data-onboarding-value="${id}" onclick="pickOnboarding('background','${id}')"><strong>${label}</strong><small>用于安排起始测试</small></button>`).join('')}</div><button class="continue-btn" onclick="nextOnboarding()">下一步</button></div>`; return; }
    if (onboardingStep === 3) { root.innerHTML = `<div class="onboarding"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i></div><div class="eyebrow">STEP 3 · 你的目标等级</div><h1>你想达到哪一个<br>英语等级？</h1><p>先选一个目标，接着用小测试确定真正起点。</p><div class="level-choice-grid">${Object.entries(levelInfo).map(([id, info]) => `<button class="level-choice ${onboardingData.targetLevel === id ? 'selected' : ''}" data-onboarding-key="targetLevel" data-onboarding-value="${id}" onclick="pickOnboarding('targetLevel','${id}')"><span class="cefr-badge">${id.toUpperCase()}</span><div><strong>${info.name.replace(/^A1 |^A2 |^B1 |^B2 /, '')}</strong><small>${info.desc}</small></div><b>›</b></button>`).join('')}</div><button class="continue-btn" onclick="nextOnboarding()">下一步</button></div>`; return; }
    if (onboardingStep === 4) { root.innerHTML = `<div class="onboarding"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot"></i></div><div class="eyebrow">STEP 4 · 每日节奏</div><h1>每天准备投入<br>多少时间？</h1><div class="minutes-grid">${[5, 10, 15, 20, 30].map((m) => `<button class="minute-card ${onboardingData.dailyMinutes === m ? 'selected' : ''}" data-onboarding-key="dailyMinutes" data-onboarding-value="${m}" onclick="pickOnboarding('dailyMinutes',${m})"><strong>${m}</strong><small>分钟</small><span>${Math.max(1, Math.round(m / 5))} 关左右</span></button>`).join('')}</div><button class="continue-btn" onclick="nextOnboarding()">下一步</button></div>`; return; }
    if (onboardingStep === 5) { root.innerHTML = `<div class="onboarding"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i></div><div class="eyebrow">STEP 5 · 让 Lumi 陪着你</div><h1>选一个提醒时间，<br>再开始小测试。</h1><label class="time-label">每日提醒时间<input class="time-input" id="onboarding-time" type="time" value="${onboardingData.reminderTime}" onchange="onboardingData.reminderTime=this.value"></label><button class="continue-btn" onclick="nextOnboarding()">开始等级测试</button><button class="link-btn" onclick="finishOnboarding(true)">稍后再测，直接开始</button></div>`; return; }
    const questions = placementQuestions(); const q = questions[placementIndex]; const options = betaShuffle(q.options); root.innerHTML = `<div class="onboarding"><div class="eyebrow">LEVEL CHECK · ${placementIndex + 1} / ${questions.length}</div><h1>读一读，选出<br>最合适的意思。</h1><div class="placement-question"><strong>${q.en}</strong><small>请选择句子的意思</small><button class="audio-btn" onclick="speak('${betaEscape(q.en)}')">${(typeof LumiIcon !== 'undefined') ? LumiIcon.html('volume', 14) + ' ' : '🔊 '}播放英语</button></div><div class="answer-grid">${options.map((option, i) => `<button class="answer-btn" onclick="answerPlacement('${betaEscape(option)}')"><span class="answer-number">${String.fromCharCode(65 + i)}</span>${option}</button>`).join('')}</div><button class="link-btn" onclick="finishOnboarding(true)">跳过测试</button></div>`;
  }
  beginOnboarding = function () { resetPlacement(); onboardingStep = 1; renderOnboarding(); };
  pickOnboarding = function (key, value) {
    onboardingData[key] = value;
    const buttons = document.querySelectorAll(`[data-onboarding-key="${key}"]`);
    if (!buttons.length) return renderOnboarding();
    buttons.forEach((button) => button.classList.toggle('selected', String(button.dataset.onboardingValue) === String(value)));
  };
  nextOnboarding = function () { if (onboardingStep === 1 && !onboardingData.goal) return toast('先选择一个学习目的'); if (onboardingStep === 2 && !onboardingData.background) return toast('先选择你的英语背景'); if (onboardingStep === 3 && !onboardingData.targetLevel) return toast('先选择目标等级'); if (onboardingStep === 4 && !onboardingData.dailyMinutes) return toast('选择每天的学习时间'); if (onboardingStep === 5) resetPlacement(); onboardingStep += 1; renderOnboarding(); };
  answerPlacement = function (value) { const questions = placementQuestions(); const question = questions[placementIndex]; if (value === question.answer) placementScore += 1; placementIndex += 1; if (placementIndex >= questions.length) finishOnboarding(false); else renderOnboarding(); };
  finishOnboarding = function (skipped) { const scoredLevel = levelForPlacementScore(); const recommended = skipped ? levelForBackground() : maxLevel(scoredLevel, levelForBackground()); const current = levelRank(recommended) > levelRank(onboardingData.targetLevel) ? onboardingData.targetLevel : recommended; state.onboarded = true; state.goal = onboardingData.goal; state.background = onboardingData.background; state.targetLevel = onboardingData.targetLevel; state.currentLevel = current; state.dailyMinutes = onboardingData.dailyMinutes; state.reminderTime = onboardingData.reminderTime; state.widgetStyle = onboardingData.widgetStyle; state.placementScore = skipped ? null : placementScore; state.version = 5; const mastered = catalog.lessonList.filter((lesson) => levelRank(lesson.levelId) < levelRank(current)).map((lesson) => lesson.id); state.completed = [...new Set([...(state.completed || []), ...mastered])]; resetPlacement(); save(); state.screen = 'home'; toast(skipped ? `路线已准备好，将从 ${current.toUpperCase()} 难度开始。` : `测试完成，推荐从 ${current.toUpperCase()} 开始。`); render(); };
  openPlanSettings = function () { resetPlacement(); onboardingStep = 5; onboardingData = { goal: state.goal || 'everyday', background: state.background || 'unknown', targetLevel: state.targetLevel || 'b1', dailyMinutes: state.dailyMinutes || 10, reminderTime: state.reminderTime || '19:30', widgetStyle: state.widgetStyle || 'sunrise' }; state.onboarded = false; render(); };
  const previousRender = render;
  render = function () { syncAudioPreferences(); if (!state.onboarded) { renderOnboarding(); return; } previousRender(); };
  attachAllLessonDialogues();
  window.LumiInteractionController = { renderLesson, renderHome, renderPractice, renderProfile, startLesson, isUnlocked };
  render();
})();

if (typeof module !== 'undefined') module.exports = {
  feedbackDetails: betaFeedbackDetails,
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
};
