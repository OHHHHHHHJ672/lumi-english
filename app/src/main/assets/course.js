/* Original A1 practice content. Every lesson contains six exercises.
   Rows: title, English/Chinese pairs (3), vocabulary pairs (3), cloze target. */
const courseUnits = [
 ['初见海岸','从一句问候，开启新旅程','mint','🌅',[
  ['你好，世界',['Hello, I am Alex.','你好，我是亚历克斯。'],['Good morning.','早上好。'],['Nice to meet you.','很高兴认识你。'],[['hello','你好'],['morning','早晨'],['name','名字']],'morning'],
  ['你的名字',['My name is Mia.','我的名字是米娅。'],['What is your name?','你叫什么名字？'],['You can call me Leo.','你可以叫我利奥。'],[['my','我的'],['your','你的'],['call','称呼']],'name'],
  ['礼貌小魔法',['Thank you for your help.','谢谢你的帮助。'],['You are welcome.','不客气。'],['Please sit down.','请坐下。'],[['please','请'],['help','帮助'],['sorry','抱歉']],'welcome'],
  ['今天怎么样',['How are you today?','你今天怎么样？'],['I am very happy.','我很开心。'],['I am fine, thank you.','我很好，谢谢你。'],[['happy','开心的'],['tired','疲倦的'],['fine','不错的']],'happy'],
  ['你来自哪里',['I am from China.','我来自中国。'],['Where are you from?','你来自哪里？'],['She is from Canada.','她来自加拿大。'],[['from','来自'],['country','国家'],['city','城市']],'from'],
  ['下次再见',['See you tomorrow.','明天见。'],['Have a nice day.','祝你度过愉快的一天。'],['It is time to go.','该走了。'],[['tomorrow','明天'],['today','今天'],['goodbye','再见']],'nice']
 ]],
 ['日常花园','把生活里的小事说出来','purple','🌿',[
  ['美好的早晨',['I wake up at seven.','我七点醒来。'],['I eat breakfast at home.','我在家吃早餐。'],['I drink some water.','我喝一些水。'],[['breakfast','早餐'],['water','水'],['early','早的']],'breakfast'],
  ['走进教室',['This is my teacher.','这是我的老师。'],['I go to school by bus.','我坐公交车去学校。'],['Open your book, please.','请打开你的书。'],[['teacher','老师'],['school','学校'],['book','书']],'school'],
  ['我的房间',['This is my bedroom.','这是我的卧室。'],['The window is open.','窗户开着。'],['The book is on the desk.','书在书桌上。'],[['window','窗户'],['desk','书桌'],['bed','床']],'window'],
  ['忙碌的一天',['I start work at nine.','我九点开始工作。'],['I take a break at noon.','我中午休息一下。'],['I go home at six.','我六点回家。'],[['work','工作'],['noon','中午'],['home','家']],'break'],
  ['喜欢什么',['I like listening to music.','我喜欢听音乐。'],['Do you like tea?','你喜欢茶吗？'],['I do not like rain.','我不喜欢下雨。'],[['music','音乐'],['tea','茶'],['rain','雨']],'tea'],
  ['愉快的周末',['I visit my family on Sunday.','我周日探望家人。'],['We go to the park.','我们去公园。'],['Let us watch a movie.','我们看一部电影吧。'],[['weekend','周末'],['park','公园'],['movie','电影']],'park']
 ]],
 ['美食小镇','点一杯咖啡，尝一点新鲜','coral','☕',[
  ['一杯咖啡',['Can I have a coffee?','我可以要一杯咖啡吗？'],['I would like some water.','我想要一些水。'],['Two cups of tea, please.','请给我两杯茶。'],[['coffee','咖啡'],['cup','杯子'],['milk','牛奶']],'water'],
  ['看看菜单',['May I see the menu?','我可以看看菜单吗？'],['The soup is hot.','汤是热的。'],['I want some chicken.','我想要一些鸡肉。'],[['menu','菜单'],['soup','汤'],['chicken','鸡肉']],'soup'],
  ['水果市场',['These apples are sweet.','这些苹果很甜。'],['I need three bananas.','我需要三根香蕉。'],['Do you have any oranges?','你们有橙子吗？'],[['apple','苹果'],['banana','香蕉'],['orange','橙子']],'bananas'],
  ['好吃的味道',['This cake is delicious.','这个蛋糕很好吃。'],['The lemon is sour.','柠檬是酸的。'],['I like sweet food.','我喜欢甜的食物。'],[['sweet','甜的'],['sour','酸的'],['salt','盐']],'lemon'],
  ['一起做饭',['Let us make a sandwich.','我们做一个三明治吧。'],['Cut the bread, please.','请切一下面包。'],['We need two eggs.','我们需要两个鸡蛋。'],[['bread','面包'],['egg','鸡蛋'],['rice','米饭']],'bread'],
  ['结账啦',['Can I have the bill?','请给我账单好吗？'],['Can I pay by card?','我可以刷卡付款吗？'],['The meal was great.','这顿饭很棒。'],[['bill','账单'],['card','卡'],['cash','现金']],'card']
 ]],
 ['城市漫游','出发去探索一座新城市','purple','🏙️',[
  ['问问路',['Where is the station?','车站在哪里？'],['Turn left at the corner.','在拐角处左转。'],['Go straight ahead.','向前直走。'],[['left','左边'],['right','右边'],['station','车站']],'left'],
  ['在什么地方',['The bank is near the school.','银行在学校附近。'],['The cafe is next to the park.','咖啡馆在公园旁边。'],['The shop is on your right.','商店在你的右边。'],[['near','附近'],['bank','银行'],['shop','商店']],'park'],
  ['搭乘公交',['Which bus goes to the museum?','哪路公交车去博物馆？'],['The next bus arrives at ten.','下一班公交车十点到达。'],['I need a ticket, please.','请给我一张票。'],[['bus','公交车'],['ticket','票'],['museum','博物馆']],'bus'],
  ['买件新衣服',['How much is this shirt?','这件衬衫多少钱？'],['Do you have a smaller size?','有小一点的尺码吗？'],['I like the blue jacket.','我喜欢蓝色的夹克。'],[['shirt','衬衫'],['jacket','夹克'],['size','尺码']],'size'],
  ['数字与价格',['It costs twenty dollars.','它要二十美元。'],['I want two tickets.','我想要两张票。'],['That is too expensive.','那个太贵了。'],[['twenty','二十'],['cheap','便宜的'],['expensive','昂贵的']],'two'],
  ['找个好去处',['Is there a library nearby?','附近有图书馆吗？'],['The library closes at five.','图书馆五点关门。'],['Let us meet at the cinema.','我们在电影院见吧。'],[['library','图书馆'],['cinema','电影院'],['nearby','在附近']],'five']
 ]],
 ['朋友山谷','聊聊家人、爱好和心情','mint','🎈',[
  ['我的家人',['This is my mother.','这是我的妈妈。'],['My brother is a student.','我的哥哥是学生。'],['We live in a small house.','我们住在一所小房子里。'],[['mother','妈妈'],['father','爸爸'],['brother','兄弟']],'student'],
  ['介绍朋友',['She is my best friend.','她是我最好的朋友。'],['He is very kind.','他很友善。'],['We study English together.','我们一起学英语。'],[['friend','朋友'],['kind','友善的'],['together','一起']],'kind'],
  ['运动时间',['I play football after school.','我放学后踢足球。'],['Can you swim?','你会游泳吗？'],['Let us ride our bikes.','我们骑自行车吧。'],[['swim','游泳'],['football','足球'],['bike','自行车']],'swim'],
  ['兴趣俱乐部',['I enjoy reading books.','我喜欢读书。'],['She plays the piano.','她弹钢琴。'],['I take photos on weekends.','我在周末拍照。'],[['read','阅读'],['piano','钢琴'],['photo','照片']],'piano'],
  ['今天的天气',['It is sunny today.','今天是晴天。'],['Take your umbrella.','带上你的伞。'],['It is cold in winter.','冬天很冷。'],[['sunny','晴朗的'],['cold','寒冷的'],['umbrella','伞']],'umbrella'],
  ['邀请你来玩',['Would you like to join us?','你愿意加入我们吗？'],['Let us meet at three.','我们三点见吧。'],['Sorry, I am busy today.','抱歉，我今天很忙。'],[['join','加入'],['busy','忙碌的'],['party','聚会']],'three']
 ]],
 ['旅行星港','带上英语，去更远的地方','coral','✈️',[
  ['在机场',['Where is the check-in desk?','值机柜台在哪里？'],['Here is my passport.','这是我的护照。'],['My flight leaves at eight.','我的航班八点起飞。'],[['airport','机场'],['passport','护照'],['flight','航班']],'passport'],
  ['入住旅馆',['I have a reservation.','我有预订。'],['Our room is on the second floor.','我们的房间在二楼。'],['Can I have the key?','可以给我钥匙吗？'],[['hotel','旅馆'],['room','房间'],['key','钥匙']],'second'],
  ['计划明天',['We will visit the beach tomorrow.','我们明天会去海滩。'],['I want to see the mountains.','我想看看群山。'],['Let us leave early.','我们早点出发吧。'],[['beach','海滩'],['mountain','山'],['map','地图']],'mountains'],
  ['寻求帮助',['Could you help me, please?','请问你能帮助我吗？'],['I cannot find my bag.','我找不到我的包。'],['Please speak more slowly.','请说慢一点。'],[['help','帮助'],['slowly','缓慢地'],['bag','包']],'bag'],
  ['旅途小故事',['We went to the museum yesterday.','我们昨天去了博物馆。'],['I bought a small gift.','我买了一件小礼物。'],['The trip was wonderful.','这次旅行很精彩。'],[['yesterday','昨天'],['gift','礼物'],['trip','旅行']],'gift'],
  ['下一段冒险',['I am ready for a new adventure.','我准备好开始一段新的冒险。'],['Practice makes progress.','练习带来进步。'],['Keep learning every day.','坚持每天学习。'],[['learn','学习'],['practice','练习'],['adventure','冒险']],'progress']
 ]]
];

const curriculum = courseUnits.map((unit, ui) => ({
 id:`unit${ui+1}`, title:unit[0], subtitle:unit[1], color:unit[2], art:unit[3],
 lessons:unit[4].map((row, li) => {
  const [title,a,b,c,words,blank]=row;
  const alternatives=unit[4].filter((_,i)=>i!==li).map(x=>x[1]);
  const otherWords=unit[4].flatMap(x=>x[4]).filter(x=>x[1]!==words[0][1]);
  const distractors=[...new Set(otherWords.map(x=>x[1]))].slice(0,3);
  const id=`u${ui+1}l${li+1}`;
  const questions=[
   {kind:'word',prompt:words[0][0],promptCn:'选择这个单词的中文意思',answer:words[0][1],options:[words[0][1],...distractors],audio:words[0][0],translation:words[0][1]},
   {kind:'choice',prompt:a[0],promptCn:'选择这句话的中文意思',answer:a[1],options:[a[1],...alternatives.slice(0,3).map(x=>x[1])],audio:a[0],translation:a[1]},
   {kind:'listen',prompt:'听到的是什么？',promptCn:'听英语，选择对应的中文意思',answer:b[1],options:[b[1],...alternatives.slice(0,3).map(x=>x[1])],audio:b[0],translation:b[1]},
   {kind:'order',prompt:c[1],promptCn:'用下方词块拼出英文句子',answer:c[0],tokens:c[0].split(' '),audio:c[0],translation:c[1]},
   {kind:'fill',prompt:b[0].replace(new RegExp('\\b'+blank+'\\b','i'),'_____'),promptCn:b[1],answer:blank,options:[blank,...words.map(x=>x[0]).filter(x=>x.toLowerCase()!==blank.toLowerCase()).slice(0,3)],audio:b[0],translation:b[1]},
   {kind:'match',prompt:'找到它们的另一半',promptCn:'先点英文，再点对应的中文',pairs:words,answer:'matched',translation:words.map(x=>x.join(' · ')).join(' / ')}
  ].map((q,qi)=>({...q,id:`${id}q${qi}`,lessonId:id}));
  return {id,title,words,questions};
 })
}));
const lessonList=curriculum.flatMap(u=>u.lessons);
const questionBank=Object.fromEntries(lessonList.flatMap(l=>l.questions).map(q=>[q.id,q]));

// The original A1 set is reused as a carefully checked seed. Higher levels add
// more questions, remove scaffolding and require longer sessions. Keeping the
// catalog data driven lets future releases add content without changing the app.
const levelSpecs = [
 {id:'a1',cefr:'A1',title:'启航基础',subtitle:'基础生存英语 · 从零开始建立信心',color:'mint',art:'🌅',difficulty:1,questionCount:6,hideTranslation:false},
 {id:'a2',cefr:'A2',title:'日常交流',subtitle:'描述生活 · 讲述经历 · 计划未来',color:'purple',art:'🌿',difficulty:2,questionCount:7,hideTranslation:false},
 {id:'b1',cefr:'B1',title:'独立沟通',subtitle:'旅行、生活和工作中的自然表达',color:'coral',art:'🧭',difficulty:3,questionCount:8,hideTranslation:true},
 {id:'b2',cefr:'B2',title:'工作与旅行',subtitle:'复杂场景 · 观点表达 · 真实对话',color:'purple',art:'✈️',difficulty:4,questionCount:9,hideTranslation:true}
];
// Extra challenge cards make the later stages feel different from the A1 seed.
// They deliberately stay short and offline-friendly, while reducing translation
// support and introducing tense, conditionals, and workplace/travel language.
const challengeSeeds = {
 a2:[
  {kind:'choice',prompt:'I was tired, so I went to bed early.',promptCn:'选择这句话的中文意思',answer:'我很累，所以我早早睡了。',options:['我很累，所以我早早睡了。','我每天早上起床。','我想买一张床。','我昨天去上班。'],audio:'I was tired, so I went to bed early.',translation:'我很累，所以我早早睡了。'},
  {kind:'fill',prompt:'She has _____ her homework already.',promptCn:'选择正确的过去分词',answer:'finished',options:['finished','finish','finishing','finishes'],audio:'She has finished her homework already.',translation:'她已经完成作业了。'},
  {kind:'order',prompt:'We are going to meet after work.',promptCn:'用词块拼出英文句子',answer:'We are going to meet after work.',tokens:['after','meet','We','work.','are','going','to'],audio:'We are going to meet after work.',translation:'我们下班后要见面。'}
 ],
 b1:[
  {kind:'choice',prompt:'If it rains, we will take the train.',promptCn:'选择最自然的中文意思',answer:'如果下雨，我们就坐火车。',options:['如果下雨，我们就坐火车。','因为下雨，我们昨天走路。','火车在雨里停着。','我们不喜欢旅行。'],audio:'If it rains, we will take the train.',translation:'如果下雨，我们就坐火车。'},
  {kind:'fill',prompt:'I have been _____ English for two years.',promptCn:'选择正确的动词形式',answer:'studying',options:['studying','study','studied','studies'],audio:'I have been studying English for two years.',translation:'我学英语已经两年了。'},
  {kind:'order',prompt:'Could you tell me where the meeting room is?',promptCn:'用词块拼出英文句子',answer:'Could you tell me where the meeting room is?',tokens:['where','Could','room','the','tell','is?','meeting','you'],audio:'Could you tell me where the meeting room is?',translation:'你能告诉我会议室在哪里吗？'}
 ],
 b2:[
  {kind:'choice',prompt:'The report needs to be revised before the client sees it.',promptCn:'选择这句话的中文意思',answer:'报告需要在客户看到之前修改。',options:['报告需要在客户看到之前修改。','客户已经看完了报告。','报告是给新员工看的。','我们明天要取消会议。'],audio:'The report needs to be revised before the client sees it.',translation:'报告需要在客户看到之前修改。'},
  {kind:'fill',prompt:'Despite _____ late, she joined the call.',promptCn:'选择正确的动词形式',answer:'arriving',options:['arriving','arrive','arrived','arrives'],audio:'Despite arriving late, she joined the call.',translation:'尽管到得很晚，她还是参加了电话会议。'},
  {kind:'order',prompt:'I would appreciate it if you could confirm the booking.',promptCn:'用词块拼出正式表达',answer:'I would appreciate it if you could confirm the booking.',tokens:['the','would','if','booking.','I','could','appreciate','confirm','it','you'],audio:'I would appreciate it if you could confirm the booking.',translation:'如果你能确认预订，我将不胜感激。'}
 ]
};
function cloneLevel(spec){
 return {
  id:spec.id, levelId:spec.id, cefr:spec.cefr, title:`${spec.cefr} · ${spec.title}`, subtitle:spec.subtitle,
  color:spec.color, art:spec.art, difficulty:spec.difficulty,
  units:curriculum.map((baseUnit,ui)=>({
   id:`${spec.id}-unit${ui+1}`,levelId:spec.id,cefr:spec.cefr,difficulty:spec.difficulty,
   title:`${spec.cefr} · ${baseUnit.title}`,subtitle:spec.subtitle,color:spec.color,art:spec.art,
   lessons:baseUnit.lessons.map((baseLesson,li)=>{
    const lessonId=`${spec.id}-u${ui+1}-l${li+1}`;
    const questions=[];
    for(let qi=0;qi<spec.questionCount;qi++){
     const seed=challengeSeeds[spec.id]&&challengeSeeds[spec.id][qi-baseLesson.questions.length];
     const base=seed||baseLesson.questions[qi%baseLesson.questions.length];
     const q=JSON.parse(JSON.stringify(base));
     q.id=`${lessonId}-q${qi+1}`;q.lessonId=lessonId;q.levelId=spec.id;q.cefr=spec.cefr;q.difficulty=spec.difficulty;
     q.hideTranslation=spec.hideTranslation&&(qi%2===0);
     q.promptCn=spec.difficulty>=3&&q.hideTranslation?'Read the sentence and choose the most natural meaning.':q.promptCn;
     if(qi>=baseLesson.questions.length&&!seed){
      q.challenge=true;
      if(q.kind==='choice'||q.kind==='listen'||q.kind==='fill')q.promptCn=spec.difficulty>=3?'Use the context to choose the best answer.':'注意句型和时态，再选择答案。';
     }
     questions.push(q);
    }
    return {id:lessonId,levelId:spec.id,cefr:spec.cefr,difficulty:spec.difficulty,title:baseLesson.title,words:baseLesson.words,questions};
   })
  }))
 };
}
const levelCurriculum=levelSpecs.map(cloneLevel);
const catalogUnits=levelCurriculum.flatMap(l=>l.units);
const catalogLessons=catalogUnits.flatMap(u=>u.lessons);
const catalogQuestionBank=Object.fromEntries(catalogLessons.flatMap(l=>l.questions).map(q=>[q.id,q]));
const lumiCatalog={curriculum:catalogUnits,lessonList:catalogLessons,questionBank:catalogQuestionBank,levels:levelSpecs,levelCurriculum};
if(typeof window!=='undefined')window.lumiCatalog=lumiCatalog;
if(typeof module!=='undefined') module.exports={curriculum,lessonList,questionBank,catalog:lumiCatalog};
