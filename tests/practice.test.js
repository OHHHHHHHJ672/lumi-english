const test = require('node:test');
const assert = require('node:assert/strict');
const P = require('../app/src/main/assets/practice.js');
const {catalog} = require('../app/src/main/assets/course.js');
const M = require('../app/src/main/assets/model.js');
test('output practice follows current level, uses complete authored sentences and rotates', () => {
  const s=M.fresh(); s.currentLevel='b1';
  const ids=P.select(s,catalog,'translate');
  assert.equal(ids.length,6);
  assert.ok(ids.every(id=>id.startsWith('b1-')));
  assert.ok(ids.every(id=>/q[234]$/.test(id)));
  s.practiceSeen=ids;
  assert.ok(P.select(s,catalog,'translate').every(id=>!ids.includes(id)));
});
test('grader ignores punctuation and case, expands contractions but preserves grammar', () => {
  assert.equal(P.grade("I DON'T know.", 'I do not know').correct,true);
  assert.equal(P.grade('I went to school', 'I go to school').correct,false);
  assert.equal(P.grade('I can swim', 'I cannot swim').correct,false);
  assert.equal(P.grade('昨日', 'I go to school').correct,false);
  const typo=P.grade('We review the porposal.', 'We review the proposal.');
  assert.equal(typo.correct,false); assert.equal(typo.typo,true);
});
