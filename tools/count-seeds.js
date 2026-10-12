const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assetsDir = path.join(__dirname, '..', 'app', 'src', 'main', 'assets');
const courseSrc = fs.readFileSync(path.join(assetsDir, 'course.js'), 'utf8');
const sandboxRequire = (p) => {
  if (p.includes('course-pack-2')) return require(path.join(assetsDir, 'course-pack-2.js'));
  return require(p);
};
const sandbox = { module: { exports: {} }, exports: {}, console, require: sandboxRequire, setTimeout, clearTimeout };
vm.createContext(sandbox);
vm.runInContext(courseSrc, sandbox);
const mod = sandbox.module.exports;
// Count seeds per level by inspecting lessonList
const perLevel = {};
mod.catalog.lessonList.forEach(l => { perLevel[l.levelId] = (perLevel[l.levelId]||0)+1; });
console.log('Lessons per level:', JSON.stringify(perLevel), 'total', mod.catalog.lessonList.length);
// Pack2 count
const pack2 = require(path.join(assetsDir, 'course-pack-2.js'));
console.log('course-pack-2 exports:', pack2.length);
const p2level = {};
pack2.forEach(p => p2level[p.level]=(p2level[p.level]||0)+1);
console.log('pack2 per level:', JSON.stringify(p2level));
