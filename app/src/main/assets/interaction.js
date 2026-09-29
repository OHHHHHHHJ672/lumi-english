/* Stateful interaction helpers; these replace the initial rendering callbacks. */
const baseRenderLesson=renderLesson;
const baseRenderProfile=renderProfile;
renderLesson=function(){
 if(!state.session){state.screen='home';document.body.classList.remove('playing');renderHome();return;}
 activeLesson=lessonById(state.session.lessonId);activeReview=state.session.review;
 document.body.classList.add('playing');
 baseRenderLesson();
 const s=state.session,q=currentQ();
 if(s.checked)paintFeedback(s.lastCorrect,q);
 save();
};
const baseRenderHome=renderHome;
renderHome=function(){
 document.body.classList.remove('playing');baseRenderHome();
 if(state.daily.claimed){const b=document.querySelector('.goal-xp');if(b)b.textContent='已领取';}
 if(state.session&&!state.session.finished){const resume=document.createElement('button');resume.className='secondary-btn';resume.textContent='继续未完成的关卡 →';resume.onclick=()=>{state.screen='lesson';render();};document.querySelector('.hero').after(resume);}
 document.querySelectorAll('.lesson-node').forEach((b,i)=>{const l=catalog.lessonList[i];b.title=l.title;b.setAttribute('aria-label',`${i+1}. ${l.title}${isUnlocked(l.id)?'':'（未解锁）'}`);if(!isUnlocked(l.id)&&!state.completed.includes(l.id)){b.onclick=()=>toast('完成前一关，就能解锁「'+l.title+'」');}});
};
go=function(screen){
 if(state.screen==='lesson'&&state.session&&!state.session.finished&&screen!=='lesson'){
  openModal('暂时离开？','本关进度会保留。你可以从首页继续，不会重复扣除能量。','保存并离开','继续学习',()=>{state.screen=screen;save();document.body.classList.remove('playing');render();});return;
 }
 state.screen=screen;save();document.body.classList.toggle('playing',screen==='lesson');render();window.scrollTo(0,0);
};
const baseStartLesson=startLesson;
startLesson=function(id,review=false){
 if(state.session&&!state.session.finished){if(state.session.lessonId===id){state.screen='lesson';render();return;}openModal('开启新的关卡？','上一关的未完成进度会被替换，已获得的 XP 会保留。','开启新关','继续上一关',()=>{state.session=null;startLesson(id,review);});return;}
 state=LumiModel.normalize(state);baseStartLesson(id,review);window.scrollTo(0,0);
};
answerHtml=function(q){
 const s=state.session;s.view=s.view||{};const v=s.view;
 if(q.kind==='order'){
  v.tokens=v.tokens||shuffle(q.tokens);const chosen=s.order||[];
  return `<div class="token-answer" id="token-answer">${chosen.length?chosen.map(x=>`<button class="token" onclick="removeToken(${x.i})">${x.token}</button>`).join(''):'<span class="summary">点击下方单词组成句子</span>'}</div><div class="token-bank" id="token-bank">${v.tokens.map((t,i)=>`<button class="token ${chosen.some(x=>x.i===i)?'used':''}" id="token-${i}" data-token="${t}" onclick="pickToken(${i})">${t}</button>`).join('')}</div><button class="secondary-btn" onclick="checkOrder()">检查答案</button>`;
 }
 if(q.kind==='match'){
  v.matched=v.matched||[];v.right=v.right||shuffle(q.pairs.map((p,i)=>i));
  return `<div class="pair-grid"><div class="pair-col">${q.pairs.map((p,i)=>pairButton('left',i,p[0],v)).join('')}</div><div class="pair-col">${v.right.map(i=>pairButton('right',i,q.pairs[i][1],v)).join('')}</div></div>`;
 }
 v.options=v.options||shuffle(q.options);
 return `<div class="answer-grid">${v.options.map((o,i)=>`<button class="answer-btn" data-option="${o}" onclick="chooseAnswer(this,'${safe(o)}')"><span class="answer-number">${String.fromCharCode(65+i)}</span>${o}</button>`).join('')}</div>`;
};
function pairButton(side,i,text,v){const done=v.matched.includes(i);return `<button class="pair ${done?'matched':''}" ${done?'disabled':''} id="pair-${side}-${i}" onclick="pickPair('${side}',${i})">${text}${done?' ✓':''}</button>`;}
const basePick=pickToken,baseRemove=removeToken;
pickToken=function(i){basePick(i);save();};removeToken=function(i){baseRemove(i);save();};
pickPair=function(side,i){
 const s=state.session;if(s.checked||s.view.matched.includes(i))return;
 matchPick[side]=i;
 document.querySelectorAll('.pair').forEach(b=>b.classList.remove('picked'));
 for(const key of ['left','right'])if(matchPick[key]!==null)$(`pair-${key}-${matchPick[key]}`).classList.add('picked');
 if(matchPick.left===null||matchPick.right===null)return;
 const left=$(`pair-left-${matchPick.left}`),right=$(`pair-right-${matchPick.right}`);
 if(matchPick.left===matchPick.right){s.view.matched.push(i);for(const b of [left,right]){b.classList.remove('picked');b.classList.add('matched');b.disabled=true;}tone(true);}
 else{s.view.hadMistake=true;left.classList.add('miss');right.classList.add('miss');toast('还不是一对，换个词试试');setTimeout(()=>{left.classList.remove('miss','picked');right.classList.remove('miss','picked');},350);}
 matchPick={left:null,right:null};save();
 if(s.view.matched.length===currentQ().pairs.length)submit(!s.view.hadMistake,currentQ());
};
chooseAnswer=function(el,value){if(state.session.checked)return;state.session.choice=value;submit(value===currentQ().answer,currentQ());};
submit=function(correct,q){if(!LumiModel.answer(state,q.id,correct))return;save();paintFeedback(correct,q);if(correct&&state.effects)buzz();tone(correct);};
function paintFeedback(correct,q){
 const f=$('feedback');f.className='feedback show'+(correct?'':' bad');$('feedback-icon').textContent=correct?'✓':'!';$('feedback-title').textContent=correct?'答对啦！':q.kind==='match'?'配对完成，再巩固一次':'把这题记下来';
 const answer=q.kind==='match'?q.translation:q.kind==='listen'?q.audio+' · '+q.translation:q.answer;
 $('feedback-copy').textContent=correct?'+5 XP'+(q.audio?' · '+q.audio:''):'正确答案：'+answer;
 $('continue').style.display='block';document.querySelectorAll('#answer-area .secondary-btn').forEach(b=>b.style.display='none');
 document.querySelectorAll('.answer-btn').forEach(b=>{if(b.dataset.option===q.answer)b.classList.add('correct');else if(b.dataset.option===state.session.choice)b.classList.add('wrong');});
 document.querySelectorAll('#answer-area button').forEach(b=>b.disabled=true);
 if(q.audio&&!document.getElementById('post-translation')){const p=document.createElement('div');p.id='post-translation';p.className='summary';p.style.marginTop='13px';p.textContent=q.translation;document.querySelector('.question-card').appendChild(p);}
}
nextQuestion=function(){const s=state.session;if(!s||!s.checked)return;if(s.index===s.qids.length-1){const r=LumiModel.finish(state);save();renderResult(r);state.screen='home';save();return;}s.index++;s.checked=false;s.lastCorrect=null;s.choice=null;s.order=[];s.view={};matchPick={left:null,right:null};save();renderLesson();window.scrollTo(0,0);};
const baseResult=renderResult;
renderResult=function(r){const total=state.session&&state.session.qids?state.session.qids.length:(activeLesson&&activeLesson.questions?activeLesson.questions.length:6);baseResult(r);if(r&&!r.passed){document.querySelector('.result-card p').textContent='答对至少 '+Math.ceil(total*2/3)+' / '+total+' 题即可通关。本次错题已加入复习小屋，已获得的 XP 会保留。';}if(r&&r.passed)burst();};
renderPractice=function(){
 const mistakes=state.mistakes.map(id=>catalog.questionBank[id]).filter(Boolean);
 $('main').innerHTML=`<div class="screen-enter"><div class="section-head" style="margin-top:18px"><h2>复习小屋</h2><span>记忆也需要一点阳光</span></div><section class="hero" style="min-height:175px;background:linear-gradient(135deg,#ff8e74,#ffb783)"><div class="hero-copy"><div class="eyebrow">PRACTICE MAKES PROGRESS</div><h1>把记忆<br>再点亮一次。</h1><p>${mistakes.length?'有 '+mistakes.length+' 道错题，等你回来征服。':'今天也可以从一次轻松复习开始。'}</p></div><div class="mascot" style="font-size:68px;display:grid;place-items:center">🧭</div></section><button class="setting" style="width:100%" onclick="startReview()"><div class="setting-copy"><div class="setting-icon">🧠</div><div><strong>错题挑战 <span class="tag-pill">${mistakes.length} 题</span></strong><small>复习不耗能量，正确率达标恢复 1 点</small></div></div><span>→</span></button><div class="settings-list"><button class="setting" onclick="quickPractice('listen')"><div class="setting-copy"><div class="setting-icon">🔊</div><div><strong>听力热身</strong><small>从已经解锁的内容中选 6 题</small></div></div><span>→</span></button><button class="setting" onclick="quickPractice('order')"><div class="setting-copy"><div class="setting-icon">✍️</div><div><strong>拼句练习</strong><small>让常用表达更熟悉</small></div></div><span>→</span></button></div><div class="section-head" style="margin-top:26px"><h2>随身词典</h2><span>${vocabulary().length} 个词</span></div><input class="search-box" id="vocab-search" placeholder="搜索英文或中文" aria-label="搜索单词" oninput="renderWords(this.value)"><div class="vocab-list" id="vocab-list"></div><div class="footer-note">课程词汇 · 中文释义 · 英语朗读</div></div>`;
 renderWords('');
};
function vocabulary(){return Array.from(new Map(catalog.lessonList.flatMap(l=>l.words).map(w=>[w[0],w])).values());}
function renderWords(query){const list=vocabulary().filter(w=>w.join(' ').toLowerCase().includes(query.toLowerCase().trim()));$('vocab-list').innerHTML=list.map(w=>`<div class="vocab-item"><div><strong>${w[0]}</strong><small>${w[1]}</small></div><button class="mini-audio" aria-label="朗读 ${w[0]}" onclick="speak('${safe(w[0])}')">🔊</button></div>`).join('')||'<div class="empty-state">没有找到这个词，试试其他关键词。</div>';}
function beginPractice(ids,label){
 if(state.session&&!state.session.finished){toast('先完成或继续当前关卡，再开启复习');return;}
 LumiModel.start(state,catalog.questionBank[ids[0]].lessonId,ids,true);state.session.label=label;activeLesson=lessonById(state.session.lessonId);activeReview=true;state.screen='lesson';matchPick={left:null,right:null};save();render();window.scrollTo(0,0);
}
startReview=function(){const ids=state.mistakes.filter(x=>catalog.questionBank[x]).slice(0,6);if(!ids.length)return toast('还没有错题，可以试试听力热身');beginPractice(ids,'错题挑战');};
function quickPractice(kind){const pool=catalog.lessonList.filter(l=>isUnlocked(l.id)||state.completed.includes(l.id)).flatMap(l=>l.questions).filter(q=>q.kind===kind);beginPractice(shuffle(pool).slice(0,6).map(q=>q.id),kind==='listen'?'听力热身':'拼句练习');}
renderProfile=function(){baseRenderProfile();const heading=document.querySelector('.profile-head h2');heading.textContent='Lv. '+(Math.floor(state.xp/100)+1)+' 英语探险家';const row=document.createElement('button');row.className='setting';row.innerHTML='<div class="setting-copy"><div class="setting-icon">🎧</div><div><strong>检查英语语音</strong><small>试听或打开系统语音设置</small></div></div><span>→</span>';row.onclick=()=>openModal('英语朗读','点击试听检查当前语音。若没有声音，请先安装或启用手机的英语语音包；部分语音包需要联网下载。','试听英语','返回',()=>speak('Hello! Welcome to Lumi English.'));document.querySelector('.settings-list').prepend(row);const plan=document.createElement('button');plan.className='setting';plan.innerHTML='<div class="setting-copy"><div class="setting-icon">🗺️</div><div><strong>学习目标与每日计划</strong><small>'+((goalNames[state.goal]||'综合提升')+' · 目标 '+String(state.targetLevel||'b1').toUpperCase()+' · 每天 '+(state.dailyMinutes||10)+' 分钟')+'</small></div></div><span>→</span>';plan.onclick=()=>openPlanSettings();document.querySelector('.settings-list').appendChild(plan);const setup=document.createElement('button');setup.className='setting';setup.innerHTML='<div class="setting-copy"><div class="setting-icon">⚙</div><div><strong>系统语音设置</strong><small>选择引擎与英语语音包</small></div></div><span>→</span>';setup.onclick=()=>{if(window.LumiAndroid&&LumiAndroid.openSpeechSettings)LumiAndroid.openSpeechSettings();else toast('在安卓 APK 中可直接打开系统语音设置');};document.querySelector('.settings-list').appendChild(setup);};
claimDaily=function(){if(LumiModel.claim(state)){save();burst();toast('今日目标达成：+15 宝石');render();}else toast(state.daily.claimed?'今天的奖励已经领取':'完成 '+dailyGoalXp()+' XP 后可领取 15 宝石');};
shuffle=function(a){const copy=[...a];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;};
speak=function(text){playSpeech(text,.9);};speakSlow=function(text){playSpeech(text,.65);};
function playSpeech(text,rate){
 if(state.muted){toast('英语发音已关闭，可以在「我的」中开启');return;}
 if(window.LumiAndroid){LumiAndroid.speakAtRate(text,rate);return;}
 if(window.speechSynthesis){const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=rate;u.onerror=()=>toast('当前设备没有可用英语语音，请检查系统语音设置');speechSynthesis.cancel();speechSynthesis.speak(u);}else toast('当前设备不支持英语朗读');
}
let audioContext;
function tone(correct){if(!state.effects)return;try{audioContext=audioContext||new(window.AudioContext||window.webkitAudioContext)();audioContext.resume();const t=audioContext.currentTime;[correct?523:220,correct?659:180].forEach((frequency,i)=>{const o=audioContext.createOscillator(),g=audioContext.createGain();o.frequency.value=frequency;o.type='sine';g.gain.setValueAtTime(.0001,t+i*.09);g.gain.exponentialRampToValueAtTime(.08,t+i*.09+.015);g.gain.exponentialRampToValueAtTime(.0001,t+i*.09+.15);o.connect(g);g.connect(audioContext.destination);o.start(t+i*.09);o.stop(t+i*.09+.16);});}catch(e){}}
window.onAndroidBack=function(){const modal=document.querySelector('.modal-backdrop');if(modal){modal.remove();return;}if(state.screen==='lesson'){go('home');return;}if(state.screen!=='home'){go('home');return;}if(window.LumiAndroid)LumiAndroid.exitApp();};
function refreshTime(){state=LumiModel.normalize(state);save();if(state.screen!=='lesson')render();}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshTime();});setInterval(refreshTime,60000);
// Local state can survive process recreation, including partially answered lessons.
if(state.session&&state.session.qids.every(id=>catalog.questionBank[id])){activeLesson=lessonById(state.session.lessonId);activeReview=state.session.review;if(state.session.finished){state.session=null;state.screen='home';}}
else {state.session=null;state.screen='home';}
document.querySelectorAll('.stats .stat-pill').forEach((p,i)=>{p.style.cursor='pointer';p.onclick=()=>toast(i===0?'每天完成学习，延续你的连续天数':i===1?'每 30 分钟恢复 1 能量，最多 20 点':'首通奖励 10 宝石，每日目标奖励 15 宝石');});
render();

// ---- v2 onboarding, level roadmap and personal plan ----
let onboardingStep=0;
let onboardingData={goal:'everyday',targetLevel:'b1',dailyMinutes:10,reminderTime:'19:30',widgetStyle:'sunrise'};
let placementIndex=0,placementScore=0;
const placementQuestions=[
 {en:'Hello, my name is Mia.',zh:'你好，我叫米娅。',answer:'你好，我叫米娅。',options:['你好，我叫米娅。','我喜欢米娅。','米娅在哪里？']},
 {en:'I went to the park yesterday.',zh:'我昨天去了公园。',answer:'过去发生的事',options:['过去发生的事','正在发生的事','明天要发生的事']},
 {en:'Could you send me the updated plan?',zh:'你能把更新后的计划发给我吗？',answer:'请求对方发送更新后的计划',options:['请求对方发送更新后的计划','询问对方是否喜欢计划','告诉对方计划已经取消']},
 {en:'Although it was raining, we continued the trip.',zh:'虽然下着雨，我们还是继续了旅行。',answer:'尽管下雨，我们仍然继续旅行',options:['尽管下雨，我们仍然继续旅行','因为下雨，所以我们取消旅行','旅行让天气变得晴朗']},
 {en:'The proposal needs to be reviewed before Friday.',zh:'提案需要在周五前审核。',answer:'提案需要在周五前被审核',options:['提案需要在周五前被审核','提案周五已经通过审核','周五需要写一份新提案']}
];
const goalNames={everyday:'日常沟通',travel:'出国旅行',work:'工作交流',all:'综合提升'};
const levelInfo={a1:{name:'A1 基础生存',desc:'能问候、介绍自己、点餐和问路。'},a2:{name:'A2 日常交流',desc:'能描述生活、讲述经历和计划未来。'},b1:{name:'B1 独立沟通',desc:'能在旅行、生活和工作中表达主要意思。'},b2:{name:'B2 工作与旅行',desc:'能处理复杂场景、表达观点和理解自然对话。'}};
function levelRank(id){return ({a1:1,a2:2,b1:3,b2:4}[id]||1);}
function targetRank(){return levelRank(state.targetLevel||'b1');}
function nextLesson(){const allowed=catalog.lessonList.filter(l=>levelRank(l.levelId)<=targetRank());return allowed.find(l=>!state.completed.includes(l.id))||allowed[allowed.length-1]||catalog.lessonList[0];}
function isUnlocked(id){const l=catalog.lessonList.find(x=>x.id===id);if(!l||levelRank(l.levelId)>targetRank())return false;const i=catalog.lessonList.findIndex(x=>x.id===id);return i===0||state.completed.includes(catalog.lessonList[i-1].id);}
function renderOnboarding(){
 document.body.classList.remove('playing');
 const root=$('main');
 if(onboardingStep===0){root.innerHTML=`<div class="onboarding screen-enter"><div class="onboarding-orbit"><div class="onboarding-mascot">${mascotSvg()}</div></div><div class="eyebrow">WELCOME TO LUMI ENGLISH</div><h1>把英语学习<br>变成一张冒险地图。</h1><p>先告诉 Lumi 你的目标和节奏，它会为你规划一条循序渐进的英语路线。</p><button class="continue-btn" onclick="beginOnboarding()">开始规划我的路线</button><div class="onboarding-note">离线学习 · 系统英语朗读 · 本地保存进度</div></div>`;return;}
 if(onboardingStep===1){root.innerHTML=`<div class="onboarding screen-enter"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i></div><div class="eyebrow">STEP 1 · 你的目的地</div><h1>你最想在哪里<br>用上英语？</h1><p>选择后，我们会优先安排相关场景。</p><div class="choice-grid goal-grid">${[['everyday','☀️','日常沟通','吃饭、购物、朋友聊天'],['travel','✈️','出国旅行','机场、酒店、问路和景点'],['work','💼','工作交流','会议、邮件、电话和项目'],['all','🌍','综合提升','均衡覆盖各种真实场景']].map(x=>`<button class="choice-card ${onboardingData.goal===x[0]?'selected':''}" onclick="pickOnboarding('goal','${x[0]}')"><span>${x[1]}</span><strong>${x[2]}</strong><small>${x[3]}</small></button>`).join('')}</div><button class="continue-btn" onclick="nextOnboarding()">下一步</button></div>`;return;}
 if(onboardingStep===2){root.innerHTML=`<div class="onboarding screen-enter"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot"></i><i class="onboarding-dot"></i></div><div class="eyebrow">STEP 2 · 你的终点</div><h1>你想达到哪一个<br>英语等级？</h1><p>等级越高，句子越长，提示越少，场景越真实。</p><div class="level-choice-grid">${Object.entries(levelInfo).map(([id,x])=>`<button class="level-choice ${onboardingData.targetLevel===id?'selected':''}" onclick="pickOnboarding('targetLevel','${id}')"><span class="cefr-badge">${id.toUpperCase()}</span><div><strong>${x.name.replace(/^A1 |^A2 |^B1 |^B2 /,'')}</strong><small>${x.desc}</small></div><b>›</b></button>`).join('')}</div><button class="continue-btn" onclick="nextOnboarding()">下一步</button></div>`;return;}
 if(onboardingStep===3){root.innerHTML=`<div class="onboarding screen-enter"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot"></i></div><div class="eyebrow">STEP 3 · 每日节奏</div><h1>每天准备投入<br>多少时间？</h1><p>我们会把每日目标换算成适合你的关卡数。</p><div class="minutes-grid">${[5,10,15,20,30].map(m=>`<button class="minute-card ${onboardingData.dailyMinutes===m?'selected':''}" onclick="pickOnboarding('dailyMinutes',${m})"><strong>${m}</strong><small>分钟</small><span>${Math.max(1,Math.round(m/5))} 关左右</span></button>`).join('')}</div><button class="continue-btn" onclick="nextOnboarding()">下一步</button></div>`;return;}
 if(onboardingStep===4){root.innerHTML=`<div class="onboarding screen-enter"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i></div><div class="eyebrow">STEP 4 · 让 Lumi 陪着你</div><h1>选一个提醒时间，<br>再挑一个桌面伙伴。</h1><p>桌面小组件会显示今日进度和连续学习天数。添加方式：长按手机桌面 → 小组件 → Lumi English。</p><label class="time-label">每日提醒时间<input class="time-input" id="onboarding-time" type="time" value="${onboardingData.reminderTime}" onchange="onboardingData.reminderTime=this.value"></label><div class="widget-choice-grid">${[['sunrise','🌅','晨光 Lumi'],['forest','🌿','森林 Lumi'],['rocket','🚀','火箭 Lumi']].map(x=>`<button class="widget-card ${onboardingData.widgetStyle===x[0]?'selected':''}" onclick="pickOnboarding('widgetStyle','${x[0]}')"><span>${x[1]}</span><small>${x[2]}</small></button>`).join('')}</div><button class="continue-btn" onclick="nextOnboarding()">做一个小测试</button><button class="link-btn" onclick="finishOnboarding(true)">稍后再测，直接开始</button></div>`;return;}
 const q=placementQuestions[placementIndex];root.innerHTML=`<div class="onboarding screen-enter"><div class="onboarding-progress"><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i><i class="onboarding-dot active"></i></div><div class="eyebrow">LEVEL CHECK · ${placementIndex+1} / ${placementQuestions.length}</div><h1>读一读，选出<br>最合适的意思。</h1><div class="placement-question"><strong>${q.en}</strong><small>${q.zh}</small><button class="audio-btn" onclick="speak('${safe(q.en)}')">🔊 播放英语</button></div><div class="answer-grid">${q.options.map((o,i)=>`<button class="answer-btn" onclick="answerPlacement(${i},'${safe(o)}')"><span class="answer-number">${String.fromCharCode(65+i)}</span>${o}</button>`).join('')}</div><button class="link-btn" onclick="finishOnboarding(true)">跳过测试</button></div>`;
}
function beginOnboarding(){onboardingStep=1;renderOnboarding();}
function pickOnboarding(key,value){onboardingData[key]=value;renderOnboarding();}
function nextOnboarding(){if(onboardingStep===1&&!onboardingData.goal)return toast('先选择一个学习目的');if(onboardingStep===2&&!onboardingData.targetLevel)return toast('先选择目标等级');if(onboardingStep===3&&!onboardingData.dailyMinutes)return toast('选择每天的学习时间');onboardingStep++;renderOnboarding();}
function answerPlacement(i,value){if(i===0)placementScore++;placementIndex++;if(placementIndex>=placementQuestions.length){finishOnboarding(false);return;}renderOnboarding();}
function finishOnboarding(skipped){
 const recommended=placementScore>=4?'b2':placementScore>=3?'b1':placementScore>=2?'a2':'a1';
 state.onboarded=true;state.goal=onboardingData.goal;state.targetLevel=onboardingData.targetLevel;state.currentLevel=recommended;state.dailyMinutes=onboardingData.dailyMinutes;state.reminderTime=onboardingData.reminderTime;state.widgetStyle=onboardingData.widgetStyle;state.placementScore=skipped?null:placementScore;state.version=3;save();
 if(window.LumiAndroid&&LumiAndroid.scheduleReminder)LumiAndroid.scheduleReminder(state.reminderTime);
 if(window.LumiAndroid&&LumiAndroid.requestNotifications)LumiAndroid.requestNotifications();
 if(window.LumiAndroid&&LumiAndroid.syncWidget)LumiAndroid.syncWidget(0,dailyGoalXp(),0,state.widgetStyle);
 toast(skipped?'路线已准备好，随时可以开始。':'测试完成，已为你找到合适的起点。');state.screen='home';render();
}
const baseRenderAllV2=render;
render=function(){if(!state.onboarded){renderOnboarding();return;}baseRenderAllV2();};
const homeAfterPlan=renderHome;
renderHome=function(){homeAfterPlan();const hero=document.querySelector('.hero');if(!hero)return;const level=levelInfo[state.targetLevel]||levelInfo.b1;const plan=document.createElement('div');plan.className='plan-strip';plan.innerHTML=`<span class="plan-icon">${state.goal==='travel'?'✈️':state.goal==='work'?'💼':state.goal==='all'?'🌍':'☀️'}</span><div><strong>${goalNames[state.goal]||'综合提升'} · 目标 ${state.targetLevel.toUpperCase()}</strong><small>每天 ${state.dailyMinutes} 分钟 · ${level.desc}</small></div><button onclick="openPlanSettings()">调整</button>`;hero.after(plan);document.querySelectorAll('.unit-card[data-level]').forEach(el=>{if(levelRank(el.dataset.level)>targetRank())el.classList.add('future-level');});const goal=document.querySelector('.section-head + .goal-card');if(goal){const xp=document.querySelector('.goal-xp');if(xp)xp.textContent=state.daily.claimed?'已领取':'+'+Math.max(0,dailyGoalXp()-(state.daily.xp||0));const label=goal.querySelector('strong');if(label)label.textContent=(state.daily.xp||0)>=dailyGoalXp()?'目标完成，奖励已准备好！':'今日目标 · '+dailyGoalXp()+' XP';const target=goal.querySelector('.progress-fill');if(target)target.style.width=Math.min(100,(state.daily.xp||0)/dailyGoalXp()*100)+'%';const meta=document.querySelector('.section-head + .goal-card .goal-copy small');if(meta)meta.textContent='按你的 '+state.dailyMinutes+' 分钟计划推荐';}}
function openPlanSettings(){onboardingStep=4;onboardingData={goal:state.goal||'everyday',targetLevel:state.targetLevel||'b1',dailyMinutes:state.dailyMinutes||10,reminderTime:state.reminderTime||'19:30',widgetStyle:state.widgetStyle||'sunrise'};state.onboarded=false;render();}
render();

