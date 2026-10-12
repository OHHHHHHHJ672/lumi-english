const fs = require('fs');
const path = require('path');
const { catalog } = require('../app/src/main/assets/course.js');

const out = catalog.lessonList.map((lesson) => ({
  id: lesson.id,
  level: lesson.levelId,
  cefr: lesson.cefr,
  unitId: lesson.unitId,
  sectionId: lesson.sectionId,
  title: lesson.title,
  subtitle: lesson.subtitle,
  difficulty: lesson.difficulty,
  grammarFocus: lesson.grammarTags[0],
  grammarTags: lesson.grammarTags,
  vocabulary: lesson.words.map(([word, translation]) => ({ word, translation })),
  scene: lesson.theme,
  dialogueRequired: true,
  questionSlots: ['word', 'choice', 'listen', 'order', 'fill', 'match', 'word', 'choice', 'listen', 'fill'],
  status: (() => { const blockPath = path.join(__dirname, '..', 'course-data', 'blocks', `${lesson.id}.json`); if (!fs.existsSync(blockPath)) return 'planned'; const block = JSON.parse(fs.readFileSync(blockPath, 'utf8')); return block.sourceStatus === 'hand-authored' ? 'authored-integrated' : 'frozen-reviewed-pending-manual-polish'; })(),
}));
const target = path.join(__dirname, '..', 'docs', 'content-board.json');
fs.writeFileSync(target, JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), lessons: out }, null, 2) + '\n');
console.log(`wrote ${out.length} lesson rows to ${target}`);
