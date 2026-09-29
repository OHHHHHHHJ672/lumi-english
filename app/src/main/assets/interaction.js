/* Lumi Beta interaction controller. One controller owns lesson rendering and input. */
function betaFeedbackDetails(q, correct) {
  const question = q || {};
  const answer = question.kind === 'match'
    ? (question.translation || '所有词语都已配对')
    : (question.answer || question.audio || '请查看题目解析');
  return {
    answer,
    translation: question.translation && !correct ? question.translation : '',
  };
}

(function () {
  // Keep this file loadable in Node so the feedback formatter can be regression-tested.
  if (typeof document === 'undefined') return;
  const betaBaseRender = render;
  const betaBaseRenderHome = renderHome;
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
    if (levelRank(lesson.levelId) < currentRank()) return true;
    const index = catalog.lessonList.findIndex((l) => l.id === id);
    return index === 0 || state.completed.includes(catalog.lessonList[index - 1].id);
  };
  nextLesson = betaNextLesson;
  isUnlocked = betaUnlocked;
  const betaEscape = (value) => String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
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
  const betaView = () => { state.session.view = state.session.view || {}; return state.session.view; };
  const betaHearts = () => Number.isFinite(state.hearts) ? state.hearts : state.energy;
  const betaGoal = () => typeof LumiModel.goalXp === 'function' ? LumiModel.goalXp(state) : dailyGoalXp();

  updateTop = function () { $('top-streak').textContent = state.streak || 0; $('top-energy').textContent = betaHearts(); $('top-energy').parentElement.querySelector('span').textContent = '♥'; $('top-gems').textContent = state.coins || 0; };
  go = function (screen) {
    if (state.screen === 'lesson' && state.session && !state.session.finished && screen !== 'lesson') { openModal('暂时离开？', '本关进度会保留在本机，回来可以继续，不会重复扣除心。', '保存并离开', '继续学习', () => { state.screen = screen; save(); document.body.classList.remove('playing'); render(); }); return; }
    state.screen = screen; save(); render(); window.scrollTo(0, 0);
  };
  startLesson = function (id, review) {
    const startBetaLesson = (lessonId, isReview) => {
      state = LumiModel.normalize(state);
      betaBaseStartLesson(lessonId, !!isReview);
      if (state.session && Array.isArray(state.session.qids)) {
        state.session.qids = betaShuffle(state.session.qids);
        state.session.index = 0;
        state.session.view = {};
        save();
      }
    };
    if (state.session && !state.session.finished) { if (state.session.lessonId === id) { state.screen = 'lesson'; render(); return; } openModal('开启新的关卡？', '上一关的进度会保留在本机。', '开启新关', '继续上一关', () => { state.session = null; startBetaLesson(id, review); }); return; }
    startBetaLesson(id, review); window.scrollTo(0, 0);
  };
  const betaKindLabel = (q) => ({ listen: '◖ 听一听', order: '✦ 拼一拼', match: '▦ 配一配', fill: '⌁ 填一填', word: '● 词义侦探', choice: '● 认识句子' }[q.kind] || '● 练一练');
  const betaQuestionType = (q) => ({ listen: '听力挑战', order: '拼出句子', match: '词语配对', fill: '词语填空', word: '词义侦探', choice: '认识句子' }[q.kind] || '综合练习');
  function betaAnswerHtml(q) {
    const view = betaView();
    if (q.kind === 'order') { view.tokens = view.tokens || betaShuffle(q.tokens); const chosen = state.session.order || []; return `<div class="token-answer" id="token-answer">${chosen.length ? chosen.map((x) => `<button class="token" onclick="removeToken(${x.i})">${x.token}</button>`).join('') : '<span class="summary">点击下方单词组成句子</span>'}</div><div class="token-bank" id="token-bank">${view.tokens.map((t, i) => `<button class="token ${chosen.some((x) => x.i === i) ? 'used' : ''}" id="token-${i}" data-token="${betaEscape(t)}" onclick="pickToken(${i})">${t}</button>`).join('')}</div><button class="secondary-btn check-answer" onclick="checkOrder()">检查答案</button>`; }
    if (q.kind === 'match') { view.matched = view.matched || []; view.right = view.right || betaShuffle(q.pairs.map((p, i) => i)); const pairButton = (side, i, text) => `<button class="pair ${view.matched.includes(i) ? 'matched' : ''}" ${view.matched.includes(i) ? 'disabled' : ''} id="pair-${side}-${i}" onclick="pickPair('${side}',${i})">${text}${view.matched.includes(i) ? ' ✓' : ''}</button>`; return `<div class="pair-grid"><div class="pair-col">${q.pairs.map((p, i) => pairButton('left', i, p[0])).join('')}</div><div class="pair-col">${view.right.map((i) => pairButton('right', i, q.pairs[i][1])).join('')}</div></div><p class="match-hint">配对全部完成后提交，点错只会提示。</p>`; }
    view.options = view.options || betaShuffle(q.options || []); return `<div class="answer-grid">${view.options.map((o, i) => `<button class="answer-btn" data-option="${betaEscape(o)}" onclick="chooseAnswer(this,'${betaEscape(o)}')"><span class="answer-number">${String.fromCharCode(65 + i)}</span>${o}</button>`).join('')}</div>`;
  }
  answerHtml = betaAnswerHtml;

  renderLesson = function () {
    if (!state.session) { state.screen = 'home'; document.body.classList.remove('playing'); return renderHome(); }
    activeLesson = lessonById(state.session.lessonId); activeReview = !!state.session.review; const q = betaCurrent(); if (!q) { state.session = null; state.screen = 'home'; return renderHome(); }
    // Pin the question rendered into the DOM. This prevents a queue mutation or
    // stale inline handler from displaying feedback for a different question.
    state.session.renderedQuestionId = q.id;
    const s = state.session; const progress = Math.round((s.index / Math.max(1, s.qids.length)) * 100); const combo = Number(s.combo || state.combo || 0); const prompt = q.kind === 'word' ? `<button class="word-hint" onclick="showWordHint('${betaEscape(q.audio)}','${betaEscape(q.translation)}')">${betaEscape(q.audio)}</button>` : (q.prompt || '');
    document.body.classList.add('playing');
    $('main').innerHTML = `<div class="lesson-shell screen-enter"><div class="lesson-top"><button class="icon-btn" aria-label="退出关卡" onclick="go('home')">×</button><div class="lesson-progress"><div style="width:${Math.max(7, progress)}%"></div></div><div class="lesson-stats"><span class="heart-count">♥ ${betaHearts()}</span><span class="combo-count ${combo >= 2 ? 'combo-live' : ''}">Combo ${combo}</span></div></div><div class="lesson-mascot mascot-${s.lastCorrect === true ? 'happy' : s.lastCorrect === false ? 'oops' : 'ready'}">${mascotSvg()}</div><div class="question-card ${q.kind === 'listen' ? 'listening' : ''}"><span class="q-count">${s.index + 1} / ${s.qids.length}</span><div class="question-tag">${betaKindLabel(q)} · ${betaQuestionType(q)}</div>${q.kind === 'listen' ? `<button class="listen-orb" onclick="speak('${betaEscape(q.audio)}')" aria-label="播放听力">🔊</button>` : ''}<h2>${prompt}</h2><p>${q.promptCn || q.translation || ''}</p>${q.audio && q.kind !== 'listen' ? `<div class="audio-row"><button class="audio-btn" onclick="speak('${betaEscape(q.audio)}')">🔊 播放英语</button><button class="audio-btn slow" onclick="speakSlow('${betaEscape(q.audio)}')">🐢 慢速</button></div>` : ''}</div><div id="answer-area">${betaAnswerHtml(q)}</div><div class="lesson-footer"><div id="feedback" class="feedback" role="status"><div id="feedback-icon" class="feedback-mark">✓</div><div class="feedback-body"><strong id="feedback-title">回答正确！</strong><small id="feedback-copy">继续保持</small><span id="feedback-answer"></span></div></div><button id="continue" class="continue-btn" style="display:none" onclick="nextQuestion()">${s.index === s.qids.length - 1 ? '查看结果' : '继续'}</button></div></div>`;
    // Bind directly as well as keeping inline handlers for Android WebView builds.
    // This keeps answer taps reliable when a WebView isolates inline globals.
    document.querySelectorAll('#answer-area .answer-btn').forEach((button) => {
      button.addEventListener('click', () => chooseAnswer(button, button.dataset.option));
    });
    if (s.checked) betaPaintFeedback(!!s.lastCorrect, q);
  };
  function betaPaintFeedback(correct, q) {
    const feedback = $('feedback'); if (!feedback) return;
    const details = betaFeedbackDetails(q, correct);
    feedback.className = `feedback show ${correct ? 'good' : 'bad'}`;
    $('feedback-icon').textContent = correct ? '✓' : '×';
    $('feedback-title').textContent = correct ? (Number(state.comboStreak || 0) >= 5 ? `连击 x${state.comboStreak}！` : '回答正确！') : '再看一眼这条规律';
    $('feedback-copy').textContent = correct ? `+5 XP${q.audio ? ` · ${q.audio}` : ''}` : `正确答案：${details.answer}`;
    $('feedback-answer').textContent = details.translation ? `释义：${details.translation}` : '';
    const continueButton = $('continue');
    if (continueButton) {
      // A wrong answer is appended to the queue, including when it was the
      // original last question. The label must reflect that retry instead of
      // misleadingly saying that the lesson is ready to finish.
      const session = state.session;
      continueButton.textContent = session && session.index >= session.qids.length - 1 ? '查看结果' : '继续';
      continueButton.style.display = 'block';
    }
    document.querySelectorAll('#answer-area button').forEach((button) => { button.disabled = true; });
    document.querySelectorAll('.answer-btn').forEach((button) => { if (button.dataset.option === q.answer) button.classList.add('correct'); if (button.dataset.option === state.session.choice && !correct) button.classList.add('wrong'); });
    const shell = document.querySelector('.lesson-shell'); if (shell) shell.classList.toggle('answer-good', correct);
    const mascot = document.querySelector('.lesson-mascot'); if (mascot) mascot.className = `lesson-mascot mascot-${correct ? 'happy' : 'oops'}`;
  }
  function betaTone(correct) {
    if (state.muted) return;
    try {
      if (window.LumiAndroid && typeof LumiAndroid.playFeedback === 'function') { LumiAndroid.playFeedback(correct ? 'correct' : 'wrong'); return; }
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return;
      const ctx = new AudioCtor(); const oscillator = ctx.createOscillator(); const gain = ctx.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = correct ? 660 : 220;
      gain.gain.setValueAtTime(.0001, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.08, ctx.currentTime + .015); gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + (correct ? .16 : .22));
      oscillator.connect(gain); gain.connect(ctx.destination); oscillator.start(); oscillator.stop(ctx.currentTime + (correct ? .18 : .24));
    } catch (_) { /* audio is an enhancement; never block answering */ }
  }
  function betaSubmit(correct, q) {
    const s = state.session; if (!s || s.checked) return;
    const activeId = String(s.renderedQuestionId || s.qids[s.index] || '');
    const question = (activeId && catalog.questionBank[activeId]) || q || betaCurrent();
    if (!question) return;
    const answered = LumiModel.answer(state, question.id, !!correct); if (answered === false) return;
    s.lastCorrect = !!correct; const streak = Number(state.comboStreak || 0); s.combo = streak ? Math.floor(streak / 5) : (correct ? Number(s.combo || 0) + 1 : 0); state.combo = s.combo;
    // LumiModel.answer appends a failed id once. Keep this guard for migrated sessions.
    if (!correct && !s.qids.slice(s.index + 1).includes(question.id)) s.qids.push(question.id);
    save();
    updateTop();
    const heartCount = document.querySelector('.heart-count');
    if (heartCount) heartCount.textContent = `♥ ${betaHearts()}`;
    betaPaintFeedback(!!correct, question); betaTone(!!correct); if (correct && state.effects) { buzz(); if (s.combo > 0) burst(); }
  }
  submit = betaSubmit;
  chooseAnswer = function (element, value) { if (!state.session || state.session.checked) return; const id = state.session.renderedQuestionId || state.session.qids[state.session.index]; const q = (id && catalog.questionBank[id]) || betaCurrent(); if (!q) return; state.session.choice = value; betaSubmit(value === q.answer, q); };
  pickToken = function (index) { const s = state.session; if (!s || s.checked) return; const button = $(`token-${index}`); if (!button || button.classList.contains('used')) return; s.order = s.order || []; s.order.push({ i: index, token: button.dataset.token }); button.classList.add('used'); $('token-answer').innerHTML = s.order.map((x) => `<button class="token" onclick="removeToken(${x.i})">${x.token}</button>`).join(''); save(); };
  removeToken = function (index) { const s = state.session; if (!s || s.checked) return; const at = (s.order || []).findIndex((x) => x.i === index); if (at < 0) return; s.order.splice(at, 1); $(`token-${index}`).classList.remove('used'); $('token-answer').innerHTML = s.order.length ? s.order.map((x) => `<button class="token" onclick="removeToken(${x.i})">${x.token}</button>`).join('') : '<span class="summary">点击下方单词组成句子</span>'; save(); };
  checkOrder = function () { const s = state.session; if (!s || s.checked) return; const q = betaCurrent(); if (!(s.order || []).length) return toast('先把单词排好，再检查答案'); betaSubmit(s.order.map((x) => x.token).join(' ') === q.answer, q); };
  pickPair = function (side, index) { const s = state.session; if (!s || s.checked) return; const view = betaView(); if ((view.matched || []).includes(index)) return; matchPick[side] = index; document.querySelectorAll('.pair').forEach((b) => b.classList.remove('picked')); $(`pair-${side}-${index}`).classList.add('picked'); if (matchPick.left === null || matchPick.right === null) return; const left = $(`pair-left-${matchPick.left}`); const right = $(`pair-right-${matchPick.right}`); const question = betaCurrent(); if (matchPick.left === matchPick.right) { view.matched = view.matched || []; view.matched.push(index); left.classList.remove('picked'); right.classList.remove('picked'); left.classList.add('matched'); right.classList.add('matched'); left.disabled = true; right.disabled = true; betaTone(true); if (question && view.matched.length === question.pairs.length) betaSubmit(true, question); } else { view.hadMistake = true; left.classList.add('miss'); right.classList.add('miss'); toast('还不是一对，再试一次'); setTimeout(() => { left.classList.remove('picked', 'miss'); right.classList.remove('picked', 'miss'); }, 420); } matchPick = { left: null, right: null }; save(); };
  nextQuestion = function () { const s = state.session; if (!s || !s.checked) return; if (s.index >= s.qids.length - 1) { const reward = LumiModel.finish(state); save(); renderResult(reward); return; } s.index += 1; s.checked = false; s.lastCorrect = null; s.choice = null; s.renderedQuestionId = null; s.order = []; s.view = {}; matchPick = { left: null, right: null }; save(); renderLesson(); window.scrollTo(0, 0); };

  renderHome = function () { document.body.classList.remove('playing'); betaBaseRenderHome(); const hero = document.querySelector('.hero'); if (!hero) return; const level = (typeof levelInfo !== 'undefined' && levelInfo[state.targetLevel]) || { desc: '循序渐进地提升英语能力' }; const plan = document.createElement('div'); plan.className = 'plan-strip'; plan.innerHTML = `<span class="plan-icon">${state.goal === 'travel' ? '✈️' : state.goal === 'work' ? '💼' : state.goal === 'all' ? '🌍' : '☀️'}</span><div><strong>${(typeof goalNames !== 'undefined' && goalNames[state.goal]) || '综合提升'} · 目标 ${(state.targetLevel || 'b1').toUpperCase()}</strong><small>每天 ${state.dailyMinutes || 10} 分钟 · ${level.desc}</small></div><button onclick="openPlanSettings()">调整</button>`; hero.after(plan); document.querySelectorAll('.unit-card[data-level]').forEach((unit) => { if (levelRank(unit.dataset.level) > targetRank()) unit.classList.add('future-level'); }); const goal = betaGoal(); const current = state.daily.xp || 0; const heading = document.querySelector('.section-head + .goal-card'); if (heading) { const label = heading.querySelector('strong'); if (label) label.textContent = current >= goal ? '目标完成，奖励已准备好！' : `今日目标 · ${goal} XP`; const fill = heading.querySelector('.progress-fill'); if (fill) fill.style.width = `${Math.min(100, current / goal * 100)}%`; const button = heading.querySelector('.goal-xp'); if (button) button.textContent = state.daily.claimed ? '已领取' : current >= goal ? '+15 ✦' : `+${goal - current}`; } document.querySelectorAll('.lesson-node').forEach((button, index) => { const lesson = catalog.lessonList[index]; if (!lesson) return; button.title = lesson.title; button.setAttribute('aria-label', `${index + 1}. ${lesson.title}`); if (!betaUnlocked(lesson.id) && !state.completed.includes(lesson.id)) button.onclick = () => toast(`完成前一关，就能解锁「${lesson.title}」`); }); if (state.session && !state.session.finished) { const resume = document.createElement('button'); resume.className = 'secondary-btn resume-lesson'; resume.textContent = '继续未完成的关卡 →'; resume.onclick = () => { state.screen = 'lesson'; render(); }; hero.after(resume); } };
  renderResult = function (reward) { const r = reward || {}; const passed = r.passed !== false; document.body.classList.remove('playing'); $('main').innerHTML = `<div class="screen-enter"><div class="result-card ${passed ? 'result-success' : 'result-retry'}"><div class="result-burst">${passed ? '🌟' : '🌱'}</div><h1>${passed ? '关卡完成！' : '继续加油！'}</h1><p>${passed ? '这一关已经掌握，下一颗星星正在等你。' : '错题已回到本关队列，重新答对后就能完成。'}</p><div class="result-stats"><div class="result-stat"><strong>${r.accuracy || 0}%</strong><small>正确率</small></div><div class="result-stat"><strong>+${r.xp || 0}</strong><small>XP</small></div><div class="result-stat"><strong>+${r.coins || 0}</strong><small>宝石</small></div></div>${r.perfect ? '<div class="achievement">🎁 零失误完美通关</div>' : r.firstPass ? '<div class="achievement">✨ 首次通关</div>' : ''}<button class="continue-btn" style="margin-top:19px" onclick="go('home')">回到学习地图</button><button class="secondary-btn" onclick="go('practice')">去复习小屋</button></div></div>`; state.session = null; activeLesson = null; activeReview = false; save(); if (passed) { burst(); const card = document.querySelector('.result-card'); if (card) card.classList.add('celebrate'); } };
  renderProfile = function () { betaBaseProfile(); const heading = document.querySelector('.profile-head h2'); if (heading) heading.textContent = `Lv. ${Math.floor((state.xp || 0) / 100) + 1} 英语探险家`; };
  claimDaily = function () { const goal = betaGoal(); if (LumiModel.claim(state)) { save(); burst(); toast('今日目标达成：+15 宝石'); render(); } else toast(state.daily.claimed ? '今天的奖励已经领取' : `完成 ${goal} XP 后可领取 15 宝石`); };
  speak = function (text) { if (state.muted) return; if (window.LumiAndroid && LumiAndroid.speakAtRate) LumiAndroid.speakAtRate(text, .9); else if (window.speechSynthesis) { const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'en-US'; utterance.rate = .9; speechSynthesis.cancel(); speechSynthesis.speak(utterance); } };
  speakSlow = function (text) { if (state.muted) return; if (window.LumiAndroid && LumiAndroid.speakAtRate) LumiAndroid.speakAtRate(text, .65); else if (window.speechSynthesis) { const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'en-US'; utterance.rate = .65; speechSynthesis.cancel(); speechSynthesis.speak(utterance); } };

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
    if (onboardingStep === 0) { root.innerHTML = `<div class="onboarding screen-enter"><div class="onboarding-orbit"><div class="onboarding-mascot">${mascotSvg()}</div></div><div class="eyebrow">WELCOME TO LUMI ENGLISH</div><h1>把英语学习<br>变成一张冒险地图。</h1><p>告诉 Lumi 你的目标和节奏，它会从适合你的难度开始。</p><button class="continue-btn" onclick="beginOnboarding()">开始规划我的路线</button></div>`; return; }
    if (onboardingStep === 1) { root.innerHTML = `<div class="onboarding screen-enter"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i></div><div class="eyebrow">STEP 1 · 你的目的地</div><h1>你最想在哪里<br>用上英语？</h1><div class="choice-grid">${[['everyday', '☀️', '日常沟通'], ['travel', '✈️', '出国旅行'], ['work', '💼', '工作交流'], ['all', '🌍', '综合提升']].map((x) => `<button class="choice-card ${onboardingData.goal === x[0] ? 'selected' : ''}" onclick="pickOnboarding('goal','${x[0]}')"><span>${x[1]}</span><strong>${x[2]}</strong><small>为你安排真实场景</small></button>`).join('')}</div><button class="continue-btn" onclick="nextOnboarding()">下一步</button></div>`; return; }
    if (onboardingStep === 2) { const backgrounds = [['zero','零基础'],['middle','初中英语'],['high','高中英语'],['college','大学英语'],['cet4','大学英语四级'],['cet6','大学英语六级'],['unknown','不确定']]; root.innerHTML = `<div class="onboarding screen-enter"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i></div><div class="eyebrow">STEP 2 · 你的英语背景</div><h1>你现在大概处于<br>什么水平？</h1><div class="choice-grid">${backgrounds.map(([id,label]) => `<button class="choice-card ${onboardingData.background === id ? 'selected' : ''}" onclick="pickOnboarding('background','${id}')"><strong>${label}</strong><small>用于安排起始测试</small></button>`).join('')}</div><button class="continue-btn" onclick="nextOnboarding()">下一步</button></div>`; return; }
    if (onboardingStep === 3) { root.innerHTML = `<div class="onboarding screen-enter"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i></div><div class="eyebrow">STEP 3 · 你的目标等级</div><h1>你想达到哪一个<br>英语等级？</h1><p>先选一个目标，接着用小测试确定真正起点。</p><div class="level-choice-grid">${Object.entries(levelInfo).map(([id, info]) => `<button class="level-choice ${onboardingData.targetLevel === id ? 'selected' : ''}" onclick="pickOnboarding('targetLevel','${id}')"><span class="cefr-badge">${id.toUpperCase()}</span><div><strong>${info.name.replace(/^A1 |^A2 |^B1 |^B2 /, '')}</strong><small>${info.desc}</small></div><b>›</b></button>`).join('')}</div><button class="continue-btn" onclick="nextOnboarding()">下一步</button></div>`; return; }
    if (onboardingStep === 4) { root.innerHTML = `<div class="onboarding screen-enter"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot"></i></div><div class="eyebrow">STEP 4 · 每日节奏</div><h1>每天准备投入<br>多少时间？</h1><div class="minutes-grid">${[5, 10, 15, 20, 30].map((m) => `<button class="minute-card ${onboardingData.dailyMinutes === m ? 'selected' : ''}" onclick="pickOnboarding('dailyMinutes',${m})"><strong>${m}</strong><small>分钟</small><span>${Math.max(1, Math.round(m / 5))} 关左右</span></button>`).join('')}</div><button class="continue-btn" onclick="nextOnboarding()">下一步</button></div>`; return; }
    if (onboardingStep === 5) { root.innerHTML = `<div class="onboarding screen-enter"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i></div><div class="eyebrow">STEP 5 · 让 Lumi 陪着你</div><h1>选一个提醒时间，<br>再开始小测试。</h1><label class="time-label">每日提醒时间<input class="time-input" id="onboarding-time" type="time" value="${onboardingData.reminderTime}" onchange="onboardingData.reminderTime=this.value"></label><button class="continue-btn" onclick="nextOnboarding()">开始等级测试</button><button class="link-btn" onclick="finishOnboarding(true)">稍后再测，直接开始</button></div>`; return; }
    const questions = placementQuestions(); const q = questions[placementIndex]; const options = betaShuffle(q.options); root.innerHTML = `<div class="onboarding screen-enter"><div class="eyebrow">LEVEL CHECK · ${placementIndex + 1} / ${questions.length}</div><h1>读一读，选出<br>最合适的意思。</h1><div class="placement-question"><strong>${q.en}</strong><small>请选择句子的意思</small><button class="audio-btn" onclick="speak('${betaEscape(q.en)}')">🔊 播放英语</button></div><div class="answer-grid">${options.map((option, i) => `<button class="answer-btn" onclick="answerPlacement('${betaEscape(option)}')"><span class="answer-number">${String.fromCharCode(65 + i)}</span>${option}</button>`).join('')}</div><button class="link-btn" onclick="finishOnboarding(true)">跳过测试</button></div>`;
  }
  beginOnboarding = function () { resetPlacement(); onboardingStep = 1; renderOnboarding(); };
  pickOnboarding = function (key, value) { onboardingData[key] = value; renderOnboarding(); };
  nextOnboarding = function () { if (onboardingStep === 1 && !onboardingData.goal) return toast('先选择一个学习目的'); if (onboardingStep === 2 && !onboardingData.background) return toast('先选择你的英语背景'); if (onboardingStep === 3 && !onboardingData.targetLevel) return toast('先选择目标等级'); if (onboardingStep === 4 && !onboardingData.dailyMinutes) return toast('选择每天的学习时间'); if (onboardingStep === 5) resetPlacement(); onboardingStep += 1; renderOnboarding(); };
  answerPlacement = function (value) { const questions = placementQuestions(); const question = questions[placementIndex]; if (value === question.answer) placementScore += 1; placementIndex += 1; if (placementIndex >= questions.length) finishOnboarding(false); else renderOnboarding(); };
  finishOnboarding = function (skipped) { const scoredLevel = levelForPlacementScore(); const recommended = skipped ? levelForBackground() : maxLevel(scoredLevel, levelForBackground()); const current = levelRank(recommended) > levelRank(onboardingData.targetLevel) ? onboardingData.targetLevel : recommended; state.onboarded = true; state.goal = onboardingData.goal; state.background = onboardingData.background; state.targetLevel = onboardingData.targetLevel; state.currentLevel = current; state.dailyMinutes = onboardingData.dailyMinutes; state.reminderTime = onboardingData.reminderTime; state.widgetStyle = onboardingData.widgetStyle; state.placementScore = skipped ? null : placementScore; state.version = 4; const mastered = catalog.lessonList.filter((lesson) => levelRank(lesson.levelId) < levelRank(current)).map((lesson) => lesson.id); state.completed = [...new Set([...(state.completed || []), ...mastered])]; resetPlacement(); save(); state.screen = 'home'; toast(skipped ? `路线已准备好，将从 ${current.toUpperCase()} 难度开始。` : `测试完成，推荐从 ${current.toUpperCase()} 开始。`); render(); };
  openPlanSettings = function () { resetPlacement(); onboardingStep = 5; onboardingData = { goal: state.goal || 'everyday', background: state.background || 'unknown', targetLevel: state.targetLevel || 'b1', dailyMinutes: state.dailyMinutes || 10, reminderTime: state.reminderTime || '19:30', widgetStyle: state.widgetStyle || 'sunrise' }; state.onboarded = false; render(); };
  const previousRender = render;
  render = function () { if (!state.onboarded) { renderOnboarding(); return; } previousRender(); };
  render();
})();

if (typeof module !== 'undefined') module.exports = { feedbackDetails: betaFeedbackDetails };
