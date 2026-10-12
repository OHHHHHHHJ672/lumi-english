// Full grammar audit: inspect every generated question's real English grammar,
// compare against declared grammarTags, and report dialogue coverage.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const assetsDir = path.join(__dirname, '..', 'app', 'src', 'main', 'assets');

function loadCourse() {
  const courseSrc = fs.readFileSync(path.join(assetsDir, 'course.js'), 'utf8');
  const sandboxRequire = (p) => {
    if (p.includes('course-pack-2')) return require(path.join(assetsDir, 'course-pack-2.js'));
    if (p.includes('course-data/blocks/a1-u1-l1')) return require(path.join(__dirname, '..', 'course-data', 'blocks', 'a1-u1-l1.json'));
    if (p.includes('course-data/authored-blocks')) return require(path.join(__dirname, '..', 'course-data', 'authored-blocks.json'));
    return require(p);
  };
  const sandbox = { module: { exports: {} }, exports: {}, console, require: sandboxRequire, setTimeout, clearTimeout };
  vm.createContext(sandbox);
  vm.runInContext(courseSrc, sandbox);
  return sandbox.module.exports;
}
function loadDialogues() {
  const src = fs.readFileSync(path.join(assetsDir, 'dialogue-data.js'), 'utf8');
  const sandbox = { module: { exports: {} }, exports: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return sandbox.module.exports;
}

// Common irregular past forms and past participles
const IRREG_PAST = new Set(('went,came,saw,said,gave,took,made,knew,thought,felt,found,told,left,got,began,ran,brought,wrote,kept,began,heard,met,read,spent,sent,sold,taught,thought,wore,won,wrote,ate,fell,flew,grew,held,kept,lay,led,lit,lost,meant,paid,rode,rang,rose,sang,sank,sat,slept,spoke,stood,swam,swung,tore,woke,wound,wrung,bent,bet,bound,bit,blew,bore,chose,crept,drew,drove,dwelt,fed,felt,fought,found,fled,forbade,forecast,forgave,froze,ground,hung,hid,hurt,knelt,knit,leaned,leapt,learned,left,lent,let,lighted,mowed,overcame,pled,proofed,quit,rid,ridded,robbed,sought,shined,shod,shot,shouted,showed,shrank,shredded,shut,sank,slid,slit,sneaked,sowed,sped,spelled,spilled,spun,spit,split,spread,sprang,sprung,stole,stuck,stung,stank,stunk,strung,strove,struck,strode,stubbed,stung,sank,swept,swelled,swept,swung,thrust,trod,upset,waked,wept,wound,withheld,withstood,wove,wed,wept,writhed,wrote').split(','));
const IRREG_PP = new Set(('been,begun,bound,bit,bitten,blown,born,borne,bent,bet,bid,bidden,bound,bred,brought,bought,broadcast,built,burnt,burned,burst,cast,caught,chosen,come,cost,crept,cut,dealt,done,drawn,dreamed,dreamt,dressed,driven,drunk,dwelt,eaten,fed,felt,fought,found,fled,flown,fallen,forbidden,forecast,foreseen,forgiven,forgotten,frozen,given,gone,ground,grown,hung,heard,held,hidden,hurt,kept,knelt,known,laid,led,leaned,leapt,learned,left,lent,let,lighted,lost,made,meant,met,mistaken,mown,overcome,overdone,overtaken,payed,paid,proofed,proven,put,quit,read,rid,ridden,rung,risen,run,said,sought,sold,sent,set,sewn,shaken,shaved,shined,shod,shot,shown,shrunk,shut,sung,sunk,sat,slept,slid,slit,sown,spoken,sped,spelled,spilt,spun,spit,split,spread,sprung,stood,stolen,stuck,stung,stunk,strung,struck,striven,sworn,swept,swollen,swum,swung,taken,taught,torn,told,thought,thrived,thrown,thrust,trodden,understood,upset,woken,worn,woven,wept,wound,written,wrung,withheld,withstood').split(','));

function detectGrammar(text) {
  const t = ' ' + String(text).toLowerCase().replace(/[.,?!;:()"’']/g, m => ' ' + m + ' ') + ' ';
  const tCompact = String(text).toLowerCase();
  const f = {};
  const words = tCompact.replace(/[.,?!;:()"’']/g, ' ').split(/\s+/).filter(Boolean);

  // Present continuous: am/is/are + Ving
  f.presentContinuous = /\b(am|is|are)\s+[a-z]+ing\b/.test(t);
  // Present simple: common non-auxiliary present forms in an authored sentence.
  f.presentSimple = /\b(i|you|we|they)\s+[a-z]+\b/.test(t) || /\b(he|she|it)\s+[a-z]+s\b/.test(t);
  // Past continuous: was/were + Ving
  f.pastContinuous = /\b(was|were)\s+[a-z]+ing\b/.test(t);
  // Future
  f.futureWill = /\bwill\s+[a-z]+\b/.test(t) || /\bwon't\s+[a-z]+\b/.test(t);
  f.futureGoingTo = /\b(am|is|are)\s+going\s+to\b/.test(t);
  // Present perfect: have/has + past participle
  f.presentPerfect = /\b(have|has|'ve|'s)\s+[a-z]+\b/.test(t) && (function(){
    const m = t.match(/\b(have|has)\s+(?:already\s+|just\s+|never\s+|ever\s+)?([a-z]+)\b/);
    if (!m) return false;
    const v = m[2];
    return IRREG_PP.has(v) || /ed$|en$|ne$|wn$|ung$|ang$|ought$|aught$/.test(v);
  })();
  // Past perfect: had + past participle
  f.pastPerfect = (function(){
    const m = t.match(/\bhad\s+([a-z]+)\b/);
    if (!m) return false;
    const v = m[1];
    return IRREG_PP.has(v) || /ed$|en$|ne$|wn$|ung$|ang$|ought$/.test(v);
  })();
  // Passive: be forms + past participle
  f.passive = (function(){
    const m = t.match(/\b(am|is|are|was|were|be|been|being)\s+([a-z]+)\b/g);
    if (!m) return false;
    return m.some(phrase => {
      const v = phrase.split(/\s+/)[1];
      return IRREG_PP.has(v) || /ed$|en$|ne$|wn$|ung$|ang$|ought$/.test(v);
    });
  })();
  // Past simple: irregular past verb or regular -ed (excluding passive/perfect contexts loosely)
  f.pastSimple = (function(){
    if (/[\b](was|were)\b/.test(t)) return true;
    return words.some((w, i) => {
      const prev = words[i-1] || '';
      if (IRREG_PAST.has(w) && !['have','has','had','is','are','was','were','be','been'].includes(prev)) return true;
      if (/ed$/.test(w) && w.length > 3 && !['have','has','had','is','are','was','were','be','been'].includes(prev)) return true;
      return false;
    });
  })();
  // Conditionals
  f.conditional = /\bif\b/.test(t) || /\bwould\s+[a-z]+\b/.test(t) || /\bcould\s+have\b/.test(t);
  // Modals
  f.modal = /\b(can|could|should|must|might|may|shall|need to|have to)\b/.test(t);
  // Comparatives
  f.comparative = /\b[a-z]+er\s+than\b/.test(t) || /\bmore\s+[a-z]+\s+than\b/.test(t) || /\bas\s+[a-z]+\s+as\b/.test(t);
  // Relative clauses
  f.relativeClause = /\b(who|which|that|where|whose|whom)\b/.test(t);
  // There is/are
  f.thereIsAre = /\bthere\s+(is|are|was|were)\b/.test(t);
  // Frequency adverbs
  f.frequencyAdverb = /\b(always|usually|often|sometimes|never|rarely|seldom|hardly)\b/.test(t);
  // Have got
  f.haveGot = /\bhave\s+got\b|\bhas\s+got\b/.test(t);
  // Imperative: starts with base verb (do not / please + verb)
  f.imperative = /^(please\s+)?(do not|don't|let us|let's|turn|open|close|take|bring|wait|stop|remember|check|keep|chop|serve|sweep|wash|put|give|pass|help|try|make|use|move|add|leave|call|tell|show|find|follow|drink|eat|sit|come|go)\b/.test(tCompact.trim());
  return f;
}

const mod = loadCourse();
const catalog = mod.catalog || mod;
const dialogues = loadDialogues();

const allQ = Object.values(catalog.questionBank);
const byLevel = { a1: [], a2: [], b1: [], b2: [] };
allQ.forEach(q => { if (byLevel[q.levelId]) byLevel[q.levelId].push(q); });

const FEATURES = ['presentSimple','presentContinuous','pastContinuous','futureWill','futureGoingTo','presentPerfect','pastPerfect','passive','pastSimple','conditional','modal','comparative','relativeClause','thereIsAre','frequencyAdverb','haveGot','imperative'];

console.log('================ TOTAL ================');
console.log('Questions in bank:', allQ.length);
const kindCount = {};
allQ.forEach(q => kindCount[q.kind] = (kindCount[q.kind]||0)+1);
console.log('By kind:', JSON.stringify(kindCount));
const dialogueQ = allQ.filter(q => q.kind === 'dialogue');
console.log('Dialogue questions:', dialogueQ.length);
console.log('Dialogue stories authored:', dialogues.stories.length);
const authoredDialogueQ = catalog.lessonList.flatMap(lesson => typeof dialogues.questionsFor === 'function' ? dialogues.questionsFor(lesson) : []);
const lessonsWithDialogue = new Set([...dialogueQ, ...authoredDialogueQ].map(q => q.lessonId));
console.log('Dialogue questions available after runtime injection:', authoredDialogueQ.length + dialogueQ.length);
console.log('Lessons that contain dialogue:', lessonsWithDialogue.size, '/', catalog.lessonList.length);

console.log('\n========= GRAMMAR FEATURES BY LEVEL (questions with English sentence) =========');
for (const lvl of ['a1','a2','b1','b2']) {
  const qs = byLevel[lvl].filter(q => q.audio && !/[\u4e00-\u9fff]/.test(q.audio));
  const counts = Object.fromEntries(FEATURES.map(f => [f, 0]));
  qs.forEach(q => {
    const f = detectGrammar(q.audio);
    FEATURES.forEach(feat => { if (f[feat]) counts[feat]++; });
  });
  console.log(`\n--- ${lvl.toUpperCase()} (${qs.length} sentence questions) ---`);
  FEATURES.forEach(feat => {
    const pct = qs.length ? Math.round(counts[feat]/qs.length*100) : 0;
    console.log(`  ${feat.padEnd(18)} ${String(counts[feat]).padStart(4)}  ${String(pct).padStart(3)}%`);
  });
}

console.log('\n========= DECLARED grammarTags vs ACTUAL sentence grammar =========');
// For each lesson, gather declared tags, and whether any sentence realizes the "headline" tenses
const tagToFeature = {
  'present-simple': 'presentSimple', 'present-continuous': 'presentContinuous', 'past-simple': 'pastSimple',
  'present-perfect': 'presentPerfect', 'past-perfect': 'pastPerfect', 'passive-voice': 'passive',
  'conditionals': 'conditional', 'future': 'futureWill', 'will-future': 'futureWill', 'going-to': 'futureGoingTo',
  'modal': 'modal', 'modal-verbs': 'modal', 'comparatives': 'comparative', 'relative-clauses': 'relativeClause',
  'there-is': 'thereIsAre', 'there-is-are': 'thereIsAre', 'frequency-adverbs': 'frequencyAdverb', 'have-got': 'haveGot', 'imperatives': 'imperative',
};
let mismatchLessons = 0;
const mismatchExamples = [];
catalog.lessonList.forEach(lesson => {
  const declared = lesson.grammarTags || [];
  const sentenceQs = lesson.questions.filter(q => q.audio && !/[\u4e00-\u9fff]/.test(q.audio));
  const realized = new Set();
  sentenceQs.forEach(q => {
    const f = detectGrammar(q.audio);
    FEATURES.forEach(feat => { if (f[feat]) realized.add(feat); });
  });
  const missing = [];
  declared.forEach(tag => {
    const feat = tagToFeature[tag];
    if (feat && !realized.has(feat)) missing.push(tag);
  });
  if (missing.length) {
    mismatchLessons++;
    if (mismatchExamples.length < 12) mismatchExamples.push({ lesson: lesson.id, title: lesson.title, declared, missing, sample: sentenceQs.slice(0,2).map(q => q.audio) });
  }
});
console.log('Lessons declaring a tense that NO sentence realizes:', mismatchLessons, '/', catalog.lessonList.length);
mismatchExamples.forEach(e => console.log(`  ${e.lesson} [${e.title}] declared=[${e.declared}] missing=[${e.missing}]`));

console.log('\n========= SAMPLE SENTENCES PER LEVEL =========');
for (const lvl of ['a1','a2','b1','b2']) {
  const qs = byLevel[lvl].filter(q => (q.kind==='choice'||q.kind==='listen') && q.audio);
  console.log(`\n--- ${lvl.toUpperCase()} ---`);
  qs.slice(0, 8).forEach(q => console.log('  ', q.audio));
}
