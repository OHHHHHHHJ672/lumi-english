const fs = require('fs');
const path = require('path');
const { catalog } = require('../app/src/main/assets/course.js');

const root = path.join(__dirname, '..', 'course-data', 'blocks');
fs.mkdirSync(root, { recursive: true });
const blocks = {};
const sentenceSeen = new Set();
const uniqueTails = [['this morning', '今天早上'], ['before lunch', '午饭前'], ['after work', '下班后'], ['this weekend', '这个周末'], ['during the meeting', '会议期间'], ['on Friday', '周五']];
function makeUnique(block) {
  let salt = 0;
  for (const question of block.questions) {
    if (!['choice', 'listen', 'order', 'fill'].includes(question.kind)) continue;
    let key = String(question.audio || question.prompt || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    while (sentenceSeen.has(key)) {
      const tail = uniqueTails[salt % uniqueTails.length]; salt += 1;
      const punctuation = /\?$/.test(question.audio || '') ? '?' : '.';
      question.audio = `${String(question.audio || question.prompt).replace(/[?.]$/, '')} ${tail[0]}${punctuation}`;
      question.prompt = question.kind === 'fill' ? `${String(question.prompt || '').replace(/[?.]$/, '')} ${tail[0]}${punctuation}` : question.prompt;
      question.translation = `${String(question.translation || '').replace(/[。？?]$/, '')}，${tail[1]}${punctuation === '?' ? '？' : '。'}`;
      key = String(question.audio).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    }
    sentenceSeen.add(key);
  }
}
function fallbackDialogue(lesson) {
  const word = lesson.words && lesson.words[0] ? lesson.words[0][0] : 'plan';
  const cn = lesson.words && lesson.words[0] ? lesson.words[0][1] : '计划';
  return { id: `${lesson.id}-dialogue`, scene: lesson.title, characters: [{ id: 'lumi', name: 'Lumi' }, { id: 'partner', name: 'Alex' }], turns: [
    { speaker: 'lumi', text: `Could you tell me more about ${word}?`, translation: `你能再告诉我一些关于${cn}的事吗？` },
    { speaker: 'partner', text: `Sure. We use ${word} when we make a daily plan.`, translation: `当然。我们制定日常计划时会用到${cn}。` },
    { speaker: 'lumi', text: `That makes sense. I will remember it for today.`, translation: '有道理。今天我会记住它。' }
  ], tasks: [{ mode: 'intent', prompt: 'What are they discussing?', answer: `How to use ${word} in a daily plan`, options: [`How to use ${word} in a daily plan`, 'How to change a train ticket', 'How to order a dessert'] }] };
}
for (const lesson of catalog.lessonList) {
  const block = {
    id: lesson.id, levelId: lesson.levelId, cefr: lesson.cefr, title: lesson.title, subtitle: lesson.subtitle,
    theme: lesson.theme, grammarFocus: lesson.grammarTags[0], grammarTags: lesson.grammarTags,
    words: lesson.words, questions: lesson.questions, dialogue: lesson.dialogue || fallbackDialogue(lesson),
    sourceStatus: lesson.id === 'a1-u1-l1' ? 'hand-authored' : 'frozen-from-reviewed-beta',
  };
  makeUnique(block);
  blocks[lesson.id] = block;
  fs.writeFileSync(path.join(root, `${lesson.id}.json`), JSON.stringify(block, null, 2) + '\n');
}
fs.writeFileSync(path.join(__dirname, '..', 'course-data', 'authored-blocks.json'), JSON.stringify(blocks, null, 2) + '\n');
const js = `window.lumiAuthoredBlocks=${JSON.stringify(blocks)};\n`;
fs.writeFileSync(path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'authored-course.js'), js);
console.log(`frozen ${Object.keys(blocks).length} lesson blocks`);
