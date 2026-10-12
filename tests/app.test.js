const test = require('node:test');
const assert = require('node:assert/strict');

const APP = '../app/src/main/assets/app.js';

// app.js calls render() and registers a document listener at load time, so it
// needs a stub DOM. A controller with empty methods keeps render() on its
// shared preamble -- updateTop() and the nav loop -- which is exactly where the
// day roll-over belongs; driving a real screen would drag the whole layout in.
function loadApp(seed) {
  const persisted = [];
  global.window = {
    LumiInteractionController: { renderLesson() {}, renderPractice() {}, renderProfile() {}, renderHome() {} },
  };
  global.localStorage = {
    getItem: () => JSON.stringify(seed),
    setItem: (key, value) => persisted.push({ key, value }),
    removeItem: () => {},
  };
  global.document = {
    getElementById: () => null,
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {},
    removeEventListener: () => {},
    createElement: () => ({}),
  };
  global.LumiModel = require('../app/src/main/assets/model.js');
  const resolved = require.resolve(APP);
  delete require.cache[resolved];
  return { app: require(resolved), persisted };
}

// A day that already finished: the goal was met, claimed, and the task
// rewards were collected. normalize() keeps it because it is still "today"
// at load time -- the rollover this test is about has not happened yet.
function finishedYesterday() {
  return {
    version: 5,
    onboarded: true,
    screen: 'home',
    daily: {
      date: null, // filled in below from the model's own day format
      xp: 999,
      lessons: 3,
      claimed: true,
      tasks: { newLessons: 1, questions: 2, reviews: 3 },
      taskClaims: ['new-lessons'],
    },
  };
}

const DAY_MS = 24 * 60 * 60 * 1000;

test('渲染时把每日进度翻到当天，否则首页会拿昨天的状态', () => {
  const realNow = Date.now;
  const LumiModel = require('../app/src/main/assets/model.js');

  const seed = finishedYesterday();
  seed.daily.date = LumiModel.day(realNow());
  const { app, persisted } = loadApp(seed);

  // Still today after loading: normalize() has already seen the matching date.
  assert.equal(app.state.daily.xp, 999, '同一日内不应被清零');
  assert.equal(app.state.daily.claimed, true, '已领取状态应保留');
  assert.equal(persisted.length, 0, '加载本身不写盘');

  // Cross midnight with the app left open -- the cold-start path is already
  // covered by normalize(), this is the case it misses.
  Date.now = () => realNow() + DAY_MS;
  try {
    app.render();
  } finally {
    Date.now = realNow;
  }

  const tomorrow = LumiModel.day(realNow() + DAY_MS);
  assert.equal(app.state.daily.date, tomorrow, '每日进度必须翻到新的一天');
  assert.equal(app.state.daily.xp, 0, '新的一天从 0 XP 开始');
  assert.equal(app.state.daily.lessons, 0, '新的一天从 0 关开始');
  assert.equal(app.state.daily.claimed, false, '新一天的奖励应重新可领');
  assert.deepEqual(app.state.daily.tasks, { newLessons: 0, questions: 0, reviews: 0 }, '任务进度归零');

  // renderHome computes claimable exactly this way, and claim() refuses unless
  // today's XP clears the goal -- which is why a stale `claimed: true` or a
  // stale 999 XP made the button lie about what a tap would do.
  const claimable = app.state.daily.xp >= 30 && !app.state.daily.claimed;
  assert.equal(claimable, false, '归零后首页不该再显示可领取');

  assert.equal(persisted.length, 1, '翻天必须落盘一次');
  const saved = JSON.parse(persisted[persisted.length - 1].value);
  assert.equal(saved.daily.xp, 0, '落盘的是归零后的状态');
});

test('同一日内反复渲染不重复写盘', () => {
  const realNow = Date.now;
  const LumiModel = require('../app/src/main/assets/model.js');

  const seed = finishedYesterday();
  seed.daily.date = LumiModel.day(realNow());
  const { app, persisted } = loadApp(seed);

  app.render();
  app.render();
  app.render();
  assert.equal(persisted.length, 0, '日期没变就不该写盘');

  // And exactly one write once it does change, not one per later render.
  Date.now = () => realNow() + DAY_MS;
  try {
    app.render();
    app.render();
  } finally {
    Date.now = realNow;
  }
  assert.equal(persisted.length, 1, '翻天只写一次，之后保持静默');
});
