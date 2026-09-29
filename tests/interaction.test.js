const test = require('node:test');
const assert = require('node:assert/strict');
const { feedbackDetails } = require('../app/src/main/assets/interaction.js');

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
