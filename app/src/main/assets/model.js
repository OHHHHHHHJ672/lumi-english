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

  const TASKS = [
    { id: 'new-lessons', title: '完成 2 个新关卡', target: 2, reward: 20 },
    { id: 'answer-questions', title: '答对 20 道不同题', target: 20, reward: 15 },
    { id: 'review-words', title: '正确复习 10 道不同题', target: 10, reward: 20 },
  ];
  const SHOP = [
    { id: 'mascot-spark', title: 'Lumi 星光表情', icon: 'sparkles', cost: 80, type: 'cosmetic' },
    { id: 'map-night', title: '夜空路线主题', icon: 'moon', cost: 160, type: 'cosmetic' },
    { id: 'streak-shield', title: '连胜保护', icon: 'shield', cost: 240, type: 'streak' },
    { id: 'review-boost', title: '复习加成卡', icon: 'brain', cost: 120, type: 'boost' },
  ];
  const ACHIEVEMENTS = [
    { id: 'first-lesson', title: '第一颗星', icon: 'star', test: s => (s.lessonWins || 0) >= 1, reward: 20 },
    { id: 'seven-streak', title: '七日火苗', icon: 'fire', test: s => s.streak >= 7, reward: 50 },
    { id: 'hundred-answers', title: '百题探险家', icon: 'compass', test: s => s.answered >= 100, reward: 60 },
    { id: 'review-master', title: '复习达人', icon: 'brain', test: s => Number(s.reviewedCount || 0) >= 50, reward: 50 },
    { id: 'points-500', title: '积分收藏家', icon: 'gem', test: s => s.points >= 500, reward: 80 },
  ];

  function fresh(now = Date.now()) {
    return {
      version: 5, onboarded: false, goal: null, currentLevel: 'a1', targetLevel: 'b1',
      dailyMinutes: 10, reminderTime: '19:30', widgetStyle: 'sunrise', placementScore: null,
      widgetAdded: false, xp: 0, points: 0, coins: 0, hearts: CAP, energy: CAP, heartsAt: now, energyAt: now,
      streak: 0, lastStudy: null, completed: [], mistakes: [], answered: 0, correct: 0,
      combo: 0, comboStreak: 0,
      earnedQuestionIds: [], legacyIds: [],
      daily: { date: day(now), xp: 0, lessons: 0, claimed: false, tasks: { newLessons: 0, questions: 0, reviews: 0 }, taskClaims: [] },
      srs: {}, reviewedCount: 0, achievements: [], inventory: [], equippedTheme: 'sunrise', streakShields: 0, lessonWins: 0, reviewBoostRemaining: 0, equippedMascot: false,
      checkpointResults: {}, skippedLessons: [],
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
    const unit = Math.min(current ? 72 : 8, Math.max(1, Number(old ? old[1] : current[2])));
    const lessonNumber = Number(old ? old[2] : current[3]);
    const lessonId = `${level}-u${unit}-l1`;
    let result = lessonId;
    if (question) {
      const questionNumber = Math.min(old ? 6 : 10, Math.max(1, Number(old ? old[3] : current[4])));
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
    if (source && Number(source.version) < 5) s.onboarded = source.onboarded === undefined ? true : source.onboarded;
    s.completed = (Array.isArray(s.completed) ? s.completed : []).map(id => migrateId(id, false, legacyIds));
    s.mistakes = (Array.isArray(s.mistakes) ? s.mistakes : []).map(id => migrateId(id, true, legacyIds));
    if (Array.isArray(s.earnedQuestionIds)) s.earnedQuestionIds = s.earnedQuestionIds.map(id => migrateId(id, true, legacyIds));
    if (s.session) {
      s.session.lessonId = migrateId(s.session.lessonId, false, legacyIds);
      s.session.qids = (Array.isArray(s.session.qids) ? s.session.qids : []).map(id => migrateId(id, true, legacyIds));
    }
    s.legacyIds = legacyIds;
    s.version = 5;
    if (!s.goal) s.goal = 'everyday';
    if (!LEVELS.includes(s.targetLevel)) s.targetLevel = 'b1';
    if (!LEVELS.includes(s.currentLevel)) s.currentLevel = 'a1';
    const currentIndex = LEVELS.indexOf(s.currentLevel);
    if (currentIndex > 0) {
      for (let levelIndex = 0; levelIndex < currentIndex; levelIndex += 1) {
        for (let unit = 1; unit <= 72; unit += 1) s.completed.push(`${LEVELS[levelIndex]}-u${unit}-l1`);
      }
      s.completed = [...new Set(s.completed)];
    }
    if (!Number.isFinite(s.dailyMinutes) || ![5, 10, 15, 20, 30].includes(s.dailyMinutes)) s.dailyMinutes = 10;
    if (typeof s.reminderTime !== 'string' || !/^[0-2]\d:[0-5]\d$/.test(s.reminderTime)) s.reminderTime = '19:30';
    if (!['sunrise', 'forest', 'rocket'].includes(s.widgetStyle)) s.widgetStyle = 'sunrise';
    for (const key of ['xp', 'answered', 'correct', 'streak', 'combo', 'comboStreak']) {
      if (!Number.isFinite(s[key]) || s[key] < 0) s[key] = 0;
    }
    const rawPoints = source && Object.prototype.hasOwnProperty.call(source, 'points')
      ? Number(source.points)
      : Number(source && source.coins);
    s.points = Number.isFinite(rawPoints) && rawPoints >= 0 ? rawPoints : 0;
    s.coins = s.points;
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
    refreshDaily(s, now);
    s.srs = s.srs && typeof s.srs === 'object' && !Array.isArray(s.srs) ? s.srs : {};
    // Previous versions know which questions were earned, but not when they were recalled.
    if (source && Number(source.version) < 5) {
      for (const id of [...s.earnedQuestionIds, ...s.mistakes]) {
        if (!s.srs[id]) s.srs[id] = { reps: 0, interval: 0, ease: 2.5, due: now, lapses: 0 };
      }
    }
    s.achievements = Array.isArray(s.achievements) ? [...new Set(s.achievements)] : [];
    s.inventory = Array.isArray(s.inventory) ? [...new Set(s.inventory)] : [];
    s.checkpointResults = s.checkpointResults && typeof s.checkpointResults === 'object' && !Array.isArray(s.checkpointResults) ? s.checkpointResults : {};
    s.skippedLessons = Array.isArray(s.skippedLessons) ? [...new Set(s.skippedLessons.map(String))] : [];
    for (const key of ['reviewedCount', 'streakShields', 'reviewBoostRemaining', 'lessonWins']) s[key] = Math.max(0, Number(s[key]) || 0);
    refreshStreak(s, now);
    if (s.session) {
      s.session.qids = Array.isArray(s.session.qids) ? s.session.qids : [];
      s.session.lessonId = s.session.lessonId || null;
      s.session.index = Number.isFinite(s.session.index) ? s.session.index : 0;
      s.session.failedQids = Array.isArray(s.session.failedQids) ? s.session.failedQids : [];
      s.session.awardedQids = Array.isArray(s.session.awardedQids) ? s.session.awardedQids : [];
      s.session.attempts = Number.isFinite(s.session.attempts) ? s.session.attempts : 0;
      s.session.correctAttempts = Number.isFinite(s.session.correctAttempts) ? s.session.correctAttempts : 0;
      s.session.combo = Number.isFinite(s.session.combo) ? s.session.combo : 0;
      if (!Object.prototype.hasOwnProperty.call(s.session, 'autoPlayedQuestionId')) s.session.autoPlayedQuestionId = null;
      if (!Object.prototype.hasOwnProperty.call(s.session, 'autoPlayScheduledQuestionId')) s.session.autoPlayScheduledQuestionId = null;
    }
    return s;
  }

  function refreshDaily(s, now = Date.now()) {
    if (!s.daily || !s.daily.date || (s.daily.date !== day(now) && day(now) > s.daily.date)) s.daily = { date: day(now), xp: 0, lessons: 0, claimed: false };
    s.daily.tasks = { newLessons: 0, questions: 0, reviews: 0, ...(s.daily.tasks || {}) };
    for (const key of ['newLessons', 'questions', 'reviews']) s.daily.tasks[key] = Math.max(0, Number(s.daily.tasks[key]) || 0);
    for (const key of ['taskClaims', 'questionIds', 'reviewIds']) s.daily[key] = Array.isArray(s.daily[key]) ? s.daily[key] : [];
    s.daily.xp = Math.max(0, Number(s.daily.xp) || 0);
    s.daily.lessons = Math.max(0, Number(s.daily.lessons) || 0);
    s.daily.claimed = Boolean(s.daily.claimed);
  }
  function dateOffset(now, offset) { const d = new Date(now); d.setDate(d.getDate() + offset); return day(d.getTime()); }
  function refreshStreak(s, now) {
    if (!s.lastStudy || s.streak <= 0) { s.streak = 0; return; }
    const last = [s.lastStudy, s.protectedDate || ''].sort().pop();
    if (last >= dateOffset(now, -1)) return;
    if (last === dateOffset(now, -2) && s.streakShields > 0) {
      s.streakShields -= 1; s.protectedDate = dateOffset(now, -1);
      s.inventory = s.inventory.filter(id => id !== 'streak-shield');
    } else s.streak = 0;
  }
  function study(s, now) {
    refreshStreak(s, now);
    if (s.lastStudy !== day(now)) { s.streak += 1; s.lastStudy = day(now); }
  }

  function syncHearts(s, now = Date.now()) {
    s.hearts = Math.min(CAP, Math.max(0, Number(s.hearts) || 0));
    s.energy = s.hearts;
    if (!Number.isFinite(s.heartsAt)) s.heartsAt = now;
    s.energyAt = s.heartsAt;
  }

  function start(s, id, qids, review = false, now = Date.now()) {
    syncHearts(s, now);
    refreshDaily(s, now);
    const ids = Array.isArray(qids) ? qids.filter(Boolean).map(String) : [];
    if (!ids.length) return false;
    s.session = {
      lessonId: id, qids: ids, index: 0, right: 0, xp: 0, review,
      checked: false, lastCorrect: null, choice: null, order: [], finished: false, reward: null,
      failedQids: [], awardedQids: [], attempts: 0, correctAttempts: 0, mistakeCount: 0,
      combo: 0, autoPlayedQuestionId: null, autoPlayScheduledQuestionId: null,
    };
    return true;
  }

  function answer(s, qid, correct, now = Date.now()) {
    const v = s.session;
    if (!v || v.finished || v.checked || String(v.qids[v.index]) !== String(qid)) return false;
    const id = String(qid);
    const ok = Boolean(correct);
    v.checked = true;
    v.lastCorrect = ok;
    v.attempts += 1;
    s.answered += 1;
    refreshDaily(s, now);
    const oldCard = s.srs[id];
    const dueRecall = oldCard && oldCard.due <= now && s.earnedQuestionIds.includes(id);
    recordReview(s, id, ok, now);
    v.lastXp = 0; v.lastPoints = 0;
    if (ok && !s.daily.questionIds.includes(id)) { s.daily.questionIds.push(id); s.daily.tasks.questions += 1; }
    if (ok && v.review && !s.daily.reviewIds.includes(id)) {
      s.daily.reviewIds.push(id); s.daily.tasks.reviews += 1; s.reviewedCount += 1;
    }
    if (ok && v.review && dueRecall && oldCard.lastRewardDay !== day(now)) {
      const boosted = s.reviewBoostRemaining > 0;
      v.lastXp = boosted ? 6 : 3; v.lastPoints = 1;
      v.xp += v.lastXp; s.xp += v.lastXp; s.daily.xp += v.lastXp; awardPoints(s, 1);
      s.srs[id].lastRewardDay = day(now);
      if (boosted) s.reviewBoostRemaining -= 1;
    }
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
          awardPoints(s, 2); v.lastXp = 5; v.lastPoints = 2;
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
    }
    // A correct answer counts as studying for the day even if the learner
    // leaves before finishing the lesson. Streak must not depend on a full
    // lesson completion, otherwise "already learned today" and the streak
    // indicator contradict each other. study() is idempotent within a day.
    if (ok) study(s, now);
    return true;
  }

  function finish(s, now = Date.now()) {
    const v = s.session;
    if (!v) return null;
    if (v.finished) return v.reward;
    if (v.index !== v.qids.length - 1 || !v.checked || v.failedQids.length) return null;
    refreshDaily(s, now);
    const passed = v.failedQids.length === 0;
    const firstPass = passed && !v.review && !s.completed.includes(v.lessonId);
    const completionPoints = firstPass ? 10 : 0;
    const perfectPoints = firstPass && passed && v.mistakeCount === 0 ? 15 : 0;
    const pointsAwarded = completionPoints + perfectPoints;
    if (firstPass) { s.completed.push(v.lessonId); s.daily.tasks.newLessons += 1; s.lessonWins += 1; }
    awardPoints(s, pointsAwarded);
    s.daily.lessons += 1;
    study(s, now);
    const newAchievements = evaluateAchievements(s);
    const accuracy = v.attempts ? Math.round(v.correctAttempts / v.attempts * 100) : 0;
    v.finished = true;
    v.reward = {
      passed, firstPass, first: firstPass, perfect: firstPass && passed && v.mistakeCount === 0, mistakeCount: v.mistakeCount,
      coins: pointsAwarded, points: pointsAwarded, xp: v.xp, accuracy, combo: v.combo, energy: 0,
      hearts: s.hearts, newAchievements,
    };
    return v.reward;
  }

  function awardPoints(s, amount) {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) return Number(s.points) || 0;
    s.points = Math.max(0, Number(s.points) || 0) + value;
    s.coins = s.points;
    return s.points;
  }

  function spendPoints(s, amount) {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0 || (Number(s.points) || 0) < value) return false;
    s.points -= value;
    s.coins = s.points;
    return true;
  }

  function recordCheckpoint(s, id, score, pass = true, now = Date.now()) {
    const key = String(id || '');
    if (!key) return false;
    const value = Math.max(0, Math.min(100, Number(score) || 0));
    s.checkpointResults = s.checkpointResults || {};
    s.checkpointResults[key] = { score: value, passed: Boolean(pass), completedAt: now };
    if (pass) awardPoints(s, 20);
    return Boolean(pass);
  }
  function checkpointPassed(s, id) { return Boolean(s && s.checkpointResults && s.checkpointResults[String(id)] && s.checkpointResults[String(id)].passed); }
  function skipLessons(s, ids) {
    const list = Array.isArray(ids) ? ids.map(String).filter(Boolean) : [];
    s.skippedLessons = [...new Set([...(s.skippedLessons || []), ...list])];
    s.completed = [...new Set([...(s.completed || []), ...list])];
    return s.skippedLessons.length;
  }

  function claim(s, now = Date.now()) {
    refreshDaily(s, now);
    if (s.daily.xp < goalXp(s) || s.daily.claimed) return false;
    s.daily.claimed = true;
    awardPoints(s, 15);
    return true;
  }

  function recordReview(s, qid, correct, now = Date.now()) {
    const id = String(qid); const previous = s.srs[id] || { reps: 0, interval: 0, ease: 2.5, due: now, lapses: 0 };
    const card = { ...previous, lastReviewed: now };
    if (correct && previous.reps > 0 && previous.due > now) { s.srs[id] = card; return card; }
    if (correct) {
      card.reps += 1; card.interval = card.reps <= 1 ? 1 : card.reps === 2 ? 3 : card.reps === 3 ? 7 : Math.min(60, Math.round(card.interval * card.ease || 14));
      card.ease = Math.min(3.2, Math.max(1.3, card.ease + 0.05)); card.due = now + card.interval * 86400000;
    } else { card.lapses += 1; card.reps = 0; card.interval = 0; card.ease = Math.max(1.3, card.ease - 0.2); card.due = now + 10 * 60000; }
    s.srs[id] = card; return card;
  }
  function dueReviews(s, now = Date.now(), limit = 20) {
    return Object.entries(s.srs || {}).filter(([, card]) => Number(card.due) <= now).sort((a, b) => Number(a[1].due) - Number(b[1].due)).slice(0, limit).map(([id]) => id);
  }
  function tasks(s) {
    const t = s.daily.tasks || { newLessons: 0, questions: 0, reviews: 0 };
    return TASKS.map(item => ({ ...item, progress: item.id === 'new-lessons' ? t.newLessons : item.id === 'answer-questions' ? t.questions : t.reviews, claimed: (s.daily.taskClaims || []).includes(item.id) }));
  }
  function claimTask(s, id) {
    const task = TASKS.find(item => item.id === id); const item = tasks(s).find(entry => entry.id === id);
    if (!task || !item || item.claimed || item.progress < item.target) return false;
    s.daily.taskClaims.push(id); awardPoints(s, task.reward); evaluateAchievements(s); return true;
  }
  function evaluateAchievements(s) {
    const unlocked = [];
    for (const item of ACHIEVEMENTS) if (!s.achievements.includes(item.id) && item.test(s)) { s.achievements.push(item.id); awardPoints(s, item.reward); unlocked.push({title:item.title,reward:item.reward}); }
    return unlocked;
  }
  function shopItems() { return SHOP.map(item => ({ ...item })); }
  function buyItem(s, id) {
    const item = SHOP.find(entry => entry.id === id);
    if (!item || s.inventory.includes(id) || (id === 'review-boost' && s.reviewBoostRemaining > 0) || !spendPoints(s, item.cost)) return false;
    s.inventory.push(id);
    if (id === 'streak-shield') s.streakShields += 1;
    if (id === 'map-night') s.equippedTheme = 'night';
    if (id === 'mascot-spark') s.equippedMascot = true;
    return true;
  }
  function useItem(s, id) {
    if (!s.inventory.includes(id)) return false;
    if (id === 'review-boost') {
      if (s.reviewBoostRemaining > 0) return false;
      s.inventory = s.inventory.filter(item => item !== id); s.reviewBoostRemaining = 10;
    } else if (id === 'map-night') s.equippedTheme = s.equippedTheme === 'night' ? 'sunrise' : 'night';
    else if (id === 'mascot-spark') s.equippedMascot = !s.equippedMascot;
    // 连胜保护是被动道具：buyItem() 购买时就已 armed，refreshStreak() 在漏学
    // 当天自动抵扣，本来就没有"使用"这个动作。原先它落到 else return false，
    // 商店里 240 积分买的道具点下去会弹「这个物品当前无法使用」，看起来是坏的。
    else if (id === 'streak-shield') { /* already armed */ }
    else return false;
    return true;
  }


  return { day, goalXp, fresh, normalize, start, answer, finish, claim, points: awardPoints, spendPoints, refreshDaily, useItem, recordReview, dueReviews, tasks, claimTask, shopItems, buyItem, recordCheckpoint, checkpointPassed, skipLessons, achievements: () => ACHIEVEMENTS.map(item => ({ id: item.id, title: item.title, icon: item.icon, reward: item.reward })), CAP, INTERVAL };
})();

if (typeof module !== 'undefined') module.exports = LumiModel;
