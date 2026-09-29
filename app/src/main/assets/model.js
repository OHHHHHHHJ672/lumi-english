const LumiModel = (() => {
  const CAP = 5;
  const INTERVAL = 30 * 60 * 1000;
  const LEVELS = ['a1', 'a2', 'b1', 'b2'];

  function day(ms = Date.now()) {
    const d = new Date(ms);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function goalXp(state) {
    const minutes = Number(state && state.dailyMinutes);
    return Math.max(10, (Number.isFinite(minutes) ? minutes : 10) * 3);
  }

  function fresh(now = Date.now()) {
    return {
      version: 4, onboarded: false, goal: null, currentLevel: 'a1', targetLevel: 'b1',
      dailyMinutes: 10, reminderTime: '19:30', widgetStyle: 'sunrise', placementScore: null,
      widgetAdded: false, xp: 0, coins: 0, hearts: CAP, energy: CAP, heartsAt: now, energyAt: now,
      streak: 0, lastStudy: null, completed: [], mistakes: [], answered: 0, correct: 0,
      combo: 0, comboStreak: 0,
      earnedQuestionIds: [], legacyIds: [],
      daily: { date: day(now), xp: 0, lessons: 0, claimed: false },
      muted: false, effects: true, session: null,
    };
  }

  function migrateId(id, question = false, legacyIds = []) {
    const value = String(id || '');
    const old = question ? value.match(/^u(\d+)l(\d+)q(\d+)$/) : value.match(/^u(\d+)l(\d+)$/);
    const current = question
      ? value.match(/^(a1|a2|b1|b2)-u(\d+)-l(\d+)-q(\d+)$/)
      : value.match(/^(a1|a2|b1|b2)-u(\d+)-l(\d+)$/);
    if (!old && !current) return value;
    const level = old ? 'a1' : current[1];
    const unit = Math.min(8, Math.max(1, Number(old ? old[1] : current[2])));
    const lessonNumber = Number(old ? old[2] : current[3]);
    const lessonId = `${level}-u${unit}-l1`;
    let result = lessonId;
    if (question) {
      const questionNumber = Math.min(6, Math.max(1, Number(old ? old[3] : current[4])));
      result = `${lessonId}-q${questionNumber}`;
    }
    if (result !== value && value && !legacyIds.includes(value)) legacyIds.push(value);
    // Beta has one authored lesson per unit. Keep the old identifier visible for
    // diagnostics while pointing progress at a lesson/question that exists.
    if (lessonNumber !== 1 && value && !legacyIds.includes(value)) legacyIds.push(value);
    return result;
  }

  function normalize(raw, now = Date.now()) {
    const source = raw && Number(raw.version) >= 2 ? raw : null;
    const s = { ...fresh(now), ...(source || {}) };
    const legacyIds = Array.isArray(source && source.legacyIds) ? [...source.legacyIds] : [];
    if (source && Number(source.version) < 4) s.onboarded = source.onboarded === undefined ? true : source.onboarded;
    s.completed = (Array.isArray(s.completed) ? s.completed : []).map(id => migrateId(id, false, legacyIds));
    s.mistakes = (Array.isArray(s.mistakes) ? s.mistakes : []).map(id => migrateId(id, true, legacyIds));
    if (s.earnedQuestionIds) s.earnedQuestionIds = s.earnedQuestionIds.map(id => migrateId(id, true, legacyIds));
    if (s.session) {
      s.session.lessonId = migrateId(s.session.lessonId, false, legacyIds);
      s.session.qids = (Array.isArray(s.session.qids) ? s.session.qids : []).map(id => migrateId(id, true, legacyIds));
    }
    s.legacyIds = legacyIds;
    s.version = 4;
    if (!s.goal) s.goal = 'everyday';
    if (!LEVELS.includes(s.targetLevel)) s.targetLevel = 'b1';
    if (!LEVELS.includes(s.currentLevel)) s.currentLevel = 'a1';
    if (!Number.isFinite(s.dailyMinutes) || ![5, 10, 15, 20, 30].includes(s.dailyMinutes)) s.dailyMinutes = 10;
    if (typeof s.reminderTime !== 'string' || !/^[0-2]\d:[0-5]\d$/.test(s.reminderTime)) s.reminderTime = '19:30';
    if (!['sunrise', 'forest', 'rocket'].includes(s.widgetStyle)) s.widgetStyle = 'sunrise';
    for (const key of ['xp', 'coins', 'answered', 'correct', 'streak', 'combo', 'comboStreak']) {
      if (!Number.isFinite(s[key]) || s[key] < 0) s[key] = 0;
    }
    s.completed = Array.isArray(s.completed) ? [...new Set(s.completed)] : [];
    s.mistakes = Array.isArray(s.mistakes) ? [...new Set(s.mistakes)] : [];
    s.earnedQuestionIds = Array.isArray(s.earnedQuestionIds) ? [...new Set(s.earnedQuestionIds)] : [];
    const hasRawHearts = !!source && Object.prototype.hasOwnProperty.call(source, 'hearts');
    const hasRawEnergy = !!source && Object.prototype.hasOwnProperty.call(source, 'energy');
    const oldEnergy = hasRawHearts ? Number(source.hearts) : hasRawEnergy ? Number(source.energy) : Number(s.hearts);
    s.hearts = Math.min(CAP, Math.max(0, Number.isFinite(oldEnergy) ? oldEnergy : CAP));
    s.energy = s.hearts;
    const rawAt = source && Object.prototype.hasOwnProperty.call(source, 'heartsAt') ? source.heartsAt : source && source.energyAt;
    const at = Number.isFinite(Number(rawAt)) ? Number(rawAt) : now;
    s.heartsAt = at;
    s.energyAt = s.heartsAt;
    const ticks = Math.floor((now - s.heartsAt) / INTERVAL);
    if (ticks > 0) {
      s.hearts = Math.min(CAP, s.hearts + ticks);
      s.heartsAt += ticks * INTERVAL;
    }
    if (s.hearts === CAP) s.heartsAt = now;
    s.energy = s.hearts;
    if (!s.daily || s.daily.date !== day(now)) s.daily = { date: day(now), xp: 0, lessons: 0, claimed: false };
    else {
      s.daily = { date: day(now), xp: 0, lessons: 0, claimed: false, ...s.daily };
      if (!Number.isFinite(s.daily.xp) || s.daily.xp < 0) s.daily.xp = 0;
      if (!Number.isFinite(s.daily.lessons) || s.daily.lessons < 0) s.daily.lessons = 0;
      s.daily.claimed = Boolean(s.daily.claimed);
    }
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (s.lastStudy !== day(now) && s.lastStudy !== day(yesterday.getTime())) s.streak = 0;
    if (s.session) {
      s.session.qids = Array.isArray(s.session.qids) ? s.session.qids : [];
      s.session.lessonId = s.session.lessonId || null;
      s.session.index = Number.isFinite(s.session.index) ? s.session.index : 0;
      s.session.failedQids = Array.isArray(s.session.failedQids) ? s.session.failedQids : [];
      s.session.awardedQids = Array.isArray(s.session.awardedQids) ? s.session.awardedQids : [];
      s.session.attempts = Number.isFinite(s.session.attempts) ? s.session.attempts : 0;
      s.session.correctAttempts = Number.isFinite(s.session.correctAttempts) ? s.session.correctAttempts : 0;
      s.session.combo = Number.isFinite(s.session.combo) ? s.session.combo : 0;
    }
    return s;
  }

  function study(s, now) {
    const today = day(now);
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (s.lastStudy !== today) {
      s.streak = s.lastStudy === day(yesterday.getTime()) ? s.streak + 1 : 1;
      s.lastStudy = today;
    }
  }

  function syncHearts(s, now = Date.now()) {
    s.hearts = Math.min(CAP, Math.max(0, Number(s.hearts) || 0));
    s.energy = s.hearts;
    if (!Number.isFinite(s.heartsAt)) s.heartsAt = now;
    s.energyAt = s.heartsAt;
  }

  function start(s, id, qids, review = false, now = Date.now()) {
    syncHearts(s, now);
    if (!review && s.hearts < 1) return false;
    const ids = Array.isArray(qids) ? qids.filter(Boolean).map(String) : [];
    if (!ids.length) return false;
    s.session = {
      lessonId: id, qids: ids, index: 0, right: 0, xp: 0, review,
      checked: false, lastCorrect: null, choice: null, order: [], finished: false, reward: null,
      failedQids: [], awardedQids: [], attempts: 0, correctAttempts: 0, mistakeCount: 0,
      combo: 0,
    };
    return true;
  }

  function answer(s, qid, correct) {
    const v = s.session;
    if (!v || v.finished || v.checked || String(v.qids[v.index]) !== String(qid)) return false;
    const id = String(qid);
    const ok = Boolean(correct);
    v.checked = true;
    v.lastCorrect = ok;
    v.attempts += 1;
    s.answered += 1;
    if (ok) {
      s.correct += 1;
      v.right += 1;
      v.correctAttempts += 1;
      if (!v.awardedQids.includes(id)) {
        v.awardedQids.push(id);
        const alreadyEarned = s.earnedQuestionIds.includes(id);
        if (!alreadyEarned) {
          s.earnedQuestionIds.push(id);
          v.xp += 5;
          s.xp += 5;
          s.daily.xp += 5;
        }
      }
      v.failedQids = v.failedQids.filter(item => item !== id);
      s.mistakes = s.mistakes.filter(item => item !== id);
      v.combo += 1;
      s.comboStreak = (s.comboStreak || 0) + 1;
      s.combo = Math.floor(s.comboStreak / 5);
    } else {
      v.mistakeCount += 1;
      if (!v.failedQids.includes(id)) v.failedQids.push(id);
      v.qids.push(id);
      if (!s.mistakes.includes(id)) s.mistakes.push(id);
      s.comboStreak = 0;
      v.combo = 0;
      if (!v.review) {
        s.hearts = Math.max(0, (Number(s.hearts) || 0) - 1);
        s.heartsAt = Date.now();
        syncHearts(s);
      }
    }
    return true;
  }

  function finish(s, now = Date.now()) {
    const v = s.session;
    if (!v) return null;
    if (v.finished) return v.reward;
    if (v.index !== v.qids.length - 1 || !v.checked) return null;
    const passed = v.failedQids.length === 0;
    const firstPass = passed && !v.review && !s.completed.includes(v.lessonId);
    const coins = firstPass ? 10 : 0;
    if (firstPass) s.completed.push(v.lessonId);
    s.coins += coins;
    s.daily.lessons += 1;
    study(s, now);
    if (v.review && passed) {
      s.hearts = Math.min(CAP, s.hearts + 1);
      syncHearts(s, now);
    }
    const accuracy = v.attempts ? Math.round(v.correctAttempts / v.attempts * 100) : 0;
    v.finished = true;
    v.reward = {
      passed, firstPass, first: firstPass, perfect: passed && v.mistakeCount === 0, mistakeCount: v.mistakeCount,
      coins, xp: v.xp, accuracy, combo: v.combo, energy: v.review && passed ? 1 : 0,
      hearts: s.hearts,
    };
    return v.reward;
  }

  function claim(s) {
    if (s.daily.xp < goalXp(s) || s.daily.claimed) return false;
    s.daily.claimed = true;
    s.coins += 15;
    return true;
  }

  function refill(s, now = Date.now()) {
    syncHearts(s, now);
    if (s.coins < 20 || s.hearts === CAP) return false;
    s.coins -= 20;
    s.hearts = Math.min(CAP, s.hearts + 5);
    s.heartsAt = now;
    syncHearts(s, now);
    return true;
  }

  return { day, goalXp, fresh, normalize, start, answer, finish, claim, refill, CAP, INTERVAL };
})();

if (typeof module !== 'undefined') module.exports = LumiModel;
