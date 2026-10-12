const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('../app/src/main/assets/model.js');
const DAY = 86400000;
const now = new Date(2026, 9, 4, 12).getTime();
function answer(s, correct = true, at = now, review = false) {
  M.start(s, 'a1-u1-l1', ['a1-u1-l1-q1'], review, at);
  M.answer(s, 'a1-u1-l1-q1', correct, at);
}
test('early repeats never advance the SRS interval', () => {
  const s = M.fresh(now); answer(s); const due = s.srs['a1-u1-l1-q1'].due;
  answer(s, true, now + 1000); assert.equal(s.srs['a1-u1-l1-q1'].reps, 1);
  assert.equal(s.srs['a1-u1-l1-q1'].due, due);
  answer(s, true, due, true); assert.equal(s.srs['a1-u1-l1-q1'].reps, 2);
});
test('due review earns XP once and counts only a successful distinct recall', () => {
  const s = M.fresh(now); answer(s); answer(s, true, now + DAY, true);
  assert.equal(s.daily.xp, 3); assert.equal(s.daily.tasks.reviews, 1);
  answer(s, true, now + DAY + 1, true); assert.equal(s.daily.xp, 3);
  assert.equal(s.daily.tasks.reviews, 1);
});
test('task progress cannot be farmed with wrong or repeated answers', () => {
  const s = M.fresh(now); answer(s, false); answer(s, false);
  assert.equal(s.daily.tasks.questions, 0); answer(s); answer(s);
  assert.equal(s.daily.tasks.questions, 1);
});
test('one shield covers exactly one missed calendar day and is consumed once', () => {
  let s = M.fresh(now); s.points = 500; s.streak = 4;
  s.lastStudy = M.day(now - 2 * DAY); M.buyItem(s, 'streak-shield');
  s = M.normalize(s, now); assert.equal(s.streak, 4); assert.equal(s.streakShields, 0);
  s = M.normalize(s, now); assert.equal(s.streak, 4);
  answer(s); M.finish(s, now); assert.equal(s.streak, 5);
  s = M.normalize(s, now + 3 * DAY); assert.equal(s.streak, 0);
});
test('boost can be used once, cosmetics toggle, and purchases never lock learning', () => {
  const s = M.fresh(now); s.points = 500;
  assert.ok(M.buyItem(s, 'review-boost')); assert.ok(M.useItem(s, 'review-boost'));
  assert.equal(M.useItem(s, 'review-boost'), false);
  assert.ok(M.buyItem(s, 'map-night')); assert.equal(s.equippedTheme, 'night');
  assert.ok(M.useItem(s, 'map-night')); assert.equal(s.equippedTheme, 'sunrise');
  answer(s); answer(s, true, now + DAY, true); assert.equal(s.session.lastXp, 6);
  assert.equal(s.reviewBoostRemaining, 9);
});
test('v4 migration seeds only known earned questions and preserves balances', () => {
  const s = M.normalize({version:4, points:100, currentLevel:'b1', earnedQuestionIds:['b1-u1-l1-q1']}, now);
  assert.equal(s.points, 100); assert.deepEqual(M.dueReviews(s, now), ['b1-u1-l1-q1']);
  assert.equal(Object.keys(s.srs).length, 1);
});
