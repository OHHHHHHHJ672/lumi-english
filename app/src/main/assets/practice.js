/* Output practice uses existing authored sentences; these are not new question counts. */
const LumiPractice = (() => {
  function normalize(value) {
    return String(value || '').toLowerCase().replace(/[’‘]/g, "'")
      .replace(/\bcan't\b/g, 'cannot').replace(/\bcan not\b/g, 'cannot').replace(/\bwon't\b/g, 'will not')
      .replace(/\b([a-z]+)n't\b/g, '$1 not').replace(/\bi'm\b/g, 'i am')
      .replace(/\b([a-z]+)'re\b/g, '$1 are').replace(/\b([a-z]+)'ve\b/g, '$1 have')
      .replace(/\b([a-z]+)'ll\b/g, '$1 will')
      .replace(/[.,!?;:"“”'()\-]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function distance(a, b) {
    let row = Array.from({length:b.length+1},(_,i)=>i);
    for(let i=1;i<=a.length;i++) { const next=[i]; for(let j=1;j<=b.length;j++) next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1)); row=next; }
    return row[b.length];
  }
  function grade(value, expected, alternatives = []) {
    const input=normalize(value), reference=normalize(expected);
    const correct=[expected,...alternatives].some(item=>normalize(item)===input) && !!input;
    const a=input.split(' '), b=reference.split(' ');
    const changes=a.map((word,i)=>[word,b[i]]).filter(([x,y])=>x!==y);
    const typo=!correct && a.length===b.length && changes.length===1 && changes[0][0].length>=4 && changes[0][1].length>=4 && distance(...changes[0])<=2;
    return {correct,typo};
  }
  function select(state, catalog, mode, now=Date.now()) {
    const bank=catalog.questionBank, seen=state.practiceSeen || [];
    const source=catalog.lessonList.filter(l=>l.levelId===state.currentLevel).flatMap(l=>l.questions)
      .filter(q=>/q[234]$/.test(q.id) && q.audio && q.translation);
    const due=id=>state.srs && state.srs[id] && state.srs[id].due<=now;
    const learned=id=>(state.earnedQuestionIds || []).includes(id);
    source.sort((a,b)=>Number(due(b.id))-Number(due(a.id)) || Number(seen.includes(a.id))-Number(seen.includes(b.id)) || Number(learned(b.id))-Number(learned(a.id)));
    const sentences=new Set();
    return source.filter(q=>{const key=normalize(q.audio); if(sentences.has(key))return false;sentences.add(key);return true;}).slice(0,6).map(q=>q.id).filter(id=>bank[id]);
  }
  return {normalize,grade,select};
})();
if (typeof module !== 'undefined') module.exports = LumiPractice;
