const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'course-data', 'blocks');
const blocks = {};
for (const file of fs.readdirSync(root).filter(name => name.endsWith('.json'))) blocks[JSON.parse(fs.readFileSync(path.join(root, file), 'utf8')).id] = JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
fs.writeFileSync(path.join(__dirname, '..', 'course-data', 'authored-blocks.json'), JSON.stringify(blocks, null, 2) + '\n');
fs.writeFileSync(path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'authored-course.js'), `window.lumiAuthoredBlocks=${JSON.stringify(blocks)};\n`);
console.log(`bundled ${Object.keys(blocks).length} blocks`);
