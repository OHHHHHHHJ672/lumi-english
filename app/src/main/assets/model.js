const LumiModel = (() => {
 const CAP=20, INTERVAL=30*60*1000;
 function day(ms=Date.now()){const d=new Date(ms);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
 function goalXp(s){return Math.max(10,Math.round((s.dailyMinutes||10)*3));}
 function fresh(now=Date.now()){return {version:3,onboarded:false,goal:null,currentLevel:'a1',targetLevel:'b1',dailyMinutes:10,reminderTime:'19:30',widgetStyle:'sunrise',placementScore:null,widgetAdded:false,xp:0,coins:0,energy:20,energyAt:now,streak:0,lastStudy:null,completed:[],mistakes:[],answered:0,correct:0,daily:{date:day(now),xp:0,lessons:0,claimed:false},muted:false,effects:true,session:null};}
 function normalize(raw,now=Date.now()){
  const s=raw&&(raw.version===2||raw.version===3)?{...fresh(now),...raw}:fresh(now);
  if(raw&&raw.version===2){
   s.version=3;
   s.onboarded=true;
   s.completed=(s.completed||[]).map(id=>String(id).replace(/^u(\d+)l(\d+)$/,'a1-u$1-l$2'));
   s.mistakes=(s.mistakes||[]).map(id=>String(id).replace(/^u(\d+)l(\d+)q(\d+)$/,'a1-u$1-l$2-q$3'));
  }
  if(!s.goal)s.goal='everyday';
  if(!s.targetLevel||!['a1','a2','b1','b2'].includes(s.targetLevel))s.targetLevel='b1';
  if(!s.currentLevel||!['a1','a2','b1','b2'].includes(s.currentLevel))s.currentLevel='a1';
  if(!Number.isFinite(s.dailyMinutes)||![5,10,15,20,30].includes(s.dailyMinutes))s.dailyMinutes=10;
  if(typeof s.reminderTime!=='string'||!/^[0-2]\d:[0-5]\d$/.test(s.reminderTime))s.reminderTime='19:30';
  if(!['sunrise','forest','rocket'].includes(s.widgetStyle))s.widgetStyle='sunrise';
  for(const k of ['xp','coins','answered','correct','streak']) if(!Number.isFinite(s[k])||s[k]<0)s[k]=0;
  s.energy=Math.min(CAP,Math.max(0,Number(s.energy)||0));
  if(!Number.isFinite(s.energyAt)||s.energyAt>now)s.energyAt=now;
  const ticks=Math.floor((now-s.energyAt)/INTERVAL);
  if(ticks>0){s.energy=Math.min(CAP,s.energy+ticks);s.energyAt+=ticks*INTERVAL;}
  if(s.energy===CAP)s.energyAt=now;
  if(!s.daily||s.daily.date!==day(now))s.daily={date:day(now),xp:0,lessons:0,claimed:false};
  const yesterday=new Date(now);yesterday.setDate(yesterday.getDate()-1);
  if(s.lastStudy!==day(now)&&s.lastStudy!==day(yesterday.getTime()))s.streak=0;
  return s;
 }
 function study(s,now){const today=day(now),yesterday=new Date(now);yesterday.setDate(yesterday.getDate()-1);if(s.lastStudy!==today){s.streak=s.lastStudy===day(yesterday.getTime())?s.streak+1:1;s.lastStudy=today;}}
 function start(s,id,qids,review=false,now=Date.now()){
  if(!review&&s.energy<1)return false;
  if(!review){if(s.energy===CAP)s.energyAt=now;s.energy--;}
  s.session={lessonId:id,qids,index:0,right:0,xp:0,review,checked:false,lastCorrect:null,choice:null,order:[],finished:false,reward:null};return true;
 }
 function answer(s,qid,correct){const v=s.session;if(!v||v.finished||v.checked||v.qids[v.index]!==qid)return false;v.checked=true;v.lastCorrect=correct;s.answered++;if(correct){s.correct++;v.right++;v.xp+=5;s.xp+=5;s.daily.xp+=5;s.mistakes=s.mistakes.filter(x=>x!==qid);}else if(!s.mistakes.includes(qid))s.mistakes.push(qid);return true;}
 function finish(s,now=Date.now()){
  const v=s.session;if(!v)return null;if(v.finished)return v.reward;
  if(v.index!==v.qids.length-1||!v.checked)return null;
  const passed=v.right/v.qids.length>=2/3,first=passed&&!v.review&&!s.completed.includes(v.lessonId);
  const coins=first?10:0;if(first)s.completed.push(v.lessonId);
  s.coins+=coins;s.daily.lessons++;study(s,now);
  if(v.review&&passed)s.energy=Math.min(CAP,s.energy+1);
  v.finished=true;v.reward={passed,first,coins,xp:v.xp,accuracy:Math.round(v.right/v.qids.length*100),energy:v.review&&passed?1:0};return v.reward;
 }
 function claim(s){if(s.daily.xp<goalXp(s)||s.daily.claimed)return false;s.daily.claimed=true;s.coins+=15;return true;}
 function refill(s,now=Date.now()){if(s.coins<20||s.energy===CAP)return false;s.coins-=20;s.energy=Math.min(CAP,s.energy+5);s.energyAt=now;return true;}
 return {day,goalXp,fresh,normalize,start,answer,finish,claim,refill,CAP,INTERVAL};
})();
if(typeof module!=='undefined')module.exports=LumiModel;
