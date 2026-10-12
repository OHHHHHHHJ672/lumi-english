/* Second authored course pack: 144 new lessons (36 per CEFR level).
 * Rows are deliberately data-first so the pack can later move to JSON without
 * changing the lesson builder. Each row contains three new target words.
 */
(function (root) {
  const parse = (row) => {
    const [title, subtitle, grammar, vocabulary] = row.split('|');
    const words = vocabulary.split(';').map((item) => item.split('='));
    return { title, subtitle, grammarTags: grammar.split(','), words };
  };
  const rows = {
    a1: [
      '晨间清单|说清早晨要做的事|present-simple|sunrise=日出;checklist=清单;hurry=匆忙',
      '教室工具|理解课堂里的简单请求|can-requests|chalk=粉笔;locker=储物柜;explain=解释',
      '邻里消息|描述住处周围的声音和位置|there-is|mailbox=邮箱;hallway=走廊;noisy=吵闹的',
      '衣服试穿|买衣服时描述材质和松紧|adjectives|zipper=拉链;cotton=棉布;loose=宽松的',
      '面包店|买点心并说明数量|countable-nouns|pastry=点心;oven=烤箱;slice=一片',
      '菜市场|询问价格和新鲜程度|how-much|vendor=摊主;weighing=称重;ripe=成熟的',
      '公交出行|在拥挤的车上遵守规则|imperatives|onboard=上车;seatbelt=安全带;crowded=拥挤的',
      '火车站|看懂车次和车厢信息|present-continuous|timetable=时刻表;carriage=车厢;conductor=列车员',
      '邮寄包裹|填写寄件人的信息|imperatives|courier=快递员;postcode=邮政编码;sender=寄件人',
      '公园散步|描述公园里的路线和人|there-is|fountain=喷泉;pathway=小路;jogger=慢跑者',
      '咖啡小憩|在柜台礼貌地点单|polite-requests|napkin=餐巾;counter=柜台;refill=续杯',
      '酒店入住|询问房间是否有空|be-questions|reception=前台;checkout=退房;vacancy=空房',
      '小诊所|描述轻微不适和药膏|have-got|bandage=绷带;dizzy=头晕的;ointment=药膏',
      '手机留言|说明电话和语音留言|present-simple|ringtone=铃声;charger=充电器;voicemail=语音留言',
      '生日准备|准备礼物和惊喜|present-continuous|balloon=气球;wrapping=包装;surprise=惊喜',
      '工作日|谈论通勤和工时记录|time-expressions|commute=通勤;timesheet=工时表;weekday=工作日',
      '我的爱好|介绍画画和拼图|like-ing|sketch=素描;knitting=编织;puzzle=拼图',
      '球场规则|听懂比赛中的简单指令|imperatives|goalkeeper=守门员;whistle=哨子;scoreboard=记分牌',
      '海边一天|描述海岸和沙堡|present-simple|shoreline=海岸线;sandcastle=沙堡;seashell=贝壳',
      '天气声音|描述小雨和雷声|present-continuous|drizzle=毛毛雨;thunder=雷声;breeze=微风',
      '修理家门|请别人帮忙修理|can-requests|toolbox=工具箱;hammer=锤子;tighten=拧紧',
      '厨房用品|认识锅具并说明用途|present-simple|saucepan=炖锅;whisk=打蛋器;apron=围裙',
      '卧室整理|描述床和衣柜的位置|there-is|mattress=床垫;wardrobe=衣柜;bedside=床边',
      '浴室清洁|描述水龙头和淋浴|imperatives|faucet=水龙头;showerhead=淋浴喷头;tile=瓷砖',
      '图书馆借阅|询问书籍和目录|can-requests|librarian=图书管理员;catalog=目录;bookmark=书签',
      '旅行照片|谈论照片和纪念品|past-simple|snapshot=快照;scenery=风景;souvenir=纪念品',
      '街角问路|描述小巷和地标|prepositions|roundabout=环岛;alley=小巷;landmark=地标',
      '商店排队|在收银台完成购买|present-simple|barcode=条形码;cashier=收银员;queue=队伍',
      '照顾宠物|谈论小猫和项圈|have-got|kitten=小猫;collar=项圈;kennel=狗舍',
      '节日灯会|描述烟花和服装|present-simple|fireworks=烟花;costume=服装;lantern=灯笼',
      '学校项目|准备海报和手工材料|imperatives|poster=海报;glue=胶水;scissors=剪刀',
      '家庭晚餐|谈论剩菜和甜点|countable-nouns|dining=用餐;leftovers=剩菜;dessert=甜点',
      '安全提醒|在公共场所看懂警告|imperatives|flashlight=手电筒;slippery=滑的;warning=警告',
      '打扫房间|说明清洁工具和动作|present-simple|vacuum=吸尘器;sponge=海绵;polish=擦亮',
      '周末露营|谈论帐篷和篝火|going-to|campsite=营地;hammock=吊床;campfire=篝火',
      '小小花园|描述种子和花朵|present-continuous|seedling=幼苗;shovel=铲子;blossom=花朵'
    ],
    a2: [
      '工资单|读懂工资和扣款|past-simple|paycheck=工资支票;deduction=扣款;allowance=津贴',
      '办公室邮件|写清主题和收件人|past-simple|subjectline=主题行;recipient=收件人;inbox=收件箱',
      '预约确认|改时间并确认咨询|future-plans|slot=时段;confirmation=确认;consultation=咨询',
      '银行业务|存款和取款的步骤|past-simple|deposit=存款;withdrawal=取款;ledger=账本',
      '租约检查|理解租房检查和维修|modals|leasehold=租赁权;inspection=检查;maintenance=维护',
      '转机旅行|处理候机和海关|future-plans|layover=中转停留;terminal=航站楼;customs=海关',
      '客户热线|提出替换和保障要求|polite-requests|hotline=热线;replacement=替换品;guarantee=保证',
      '课程注册|比较课程费用和报名|comparatives|syllabus=教学大纲;tuition=学费;enrollment=注册',
      '慢火烹饪|描述调味和腌制|sequencing|simmer=炖煮;seasoning=调味料;marinate=腌制',
      '健康检查|描述过敏和恢复|present-perfect|allergy=过敏;dosage=剂量;recovery=恢复',
      '运动训练|谈论耐力和热身|should|stamina=耐力;posture=姿势;warmup=热身',
      '电脑设置|使用快捷键和存储空间|can-requests|browser=浏览器;shortcut=快捷键;storage=存储空间',
      '社交聚会|邀请主人并准时到达|future-plans|gathering=聚会;host=主人;punctual=准时的',
      '垃圾分类|解释包装和填埋场|should|recycling=回收;landfill=填埋场;packaging=包装',
      '个人理财|比较储蓄和养老金|comparatives|savings=储蓄;interest=利息;pension=养老金',
      '新闻节目|听懂记者和订阅|past-simple|broadcast=广播;reporter=记者;subscribe=订阅',
      '城市绕行|解释绕路和交通堵塞|past-continuous|detour=绕路;trafficjam=交通堵塞;cyclist=骑车人',
      '家用电器|说明微波炉和冰柜|comparatives|microwave=微波炉;freezer=冰柜;appliance=电器',
      '衣物护理|处理污渍和熨烫|imperatives|fabricsoftener=柔顺剂;stain=污渍;iron=熨斗',
      '餐厅预订|选择前菜和菜系|would-like|reservation=预订;appetizer=前菜;cuisine=菜系',
      '城市文化|参观遗产和画廊|past-simple|heritage=遗产;sculpture=雕塑;gallery=画廊',
      '团队协作|表达主动性和可靠性|adverbs|collaboration=协作;initiative=主动性;reliable=可靠的',
      '网络钓鱼|识别用户名和骗局|should|username=用户名;phishing=网络钓鱼;scam=骗局',
      '高效复习|用卡片和提纲记忆|gerunds|flashcard=闪卡;outline=提纲;memorize=记忆',
      '沟通语气|表达道歉和误读|past-perfect|apology=道歉;tone=语气;misread=误读',
      '社区服务|联系电工和五金店|future-plans|electrician=电工;hardware=五金用品;delivery=配送',
      '行程变更|处理超售和代金券|conditionals|overbooked=超售的;voucher=代金券;alternative=替代方案',
      '职业机会|讨论晋升和实习|comparatives|promotion=晋升;salary=薪资;internship=实习',
      '活动报名|预订场地和听众席位|future-plans|venue=场地;registration=报名;speaker=演讲者',
      '基础实验|观察混合物和反应|past-simple|mixture=混合物;observe=观察;reaction=反应',
      '地铁换乘|找到入口和出口|prepositions|subway=地铁;entrance=入口;exit=出口',
      '家庭账单|读懂发票和电表|present-perfect|invoice=发票;meter=电表;provider=供应商',
      '创意爱好|介绍陶艺和摄影|like-ing|pottery=陶艺;gardening=园艺;photography=摄影',
      '公共窗口|准备文件和签名|imperatives|document=文件;signature=签名;counter=办事窗口',
      '购物评价|比较质量和评分|comparatives|rating=评分;quality=质量;purchase=购买',
      '在线课堂|参加网络研讨会和录播|present-perfect|webinar=网络研讨会;recording=录播;enroll=报名学习'
    ],
    b1: [
      '项目启动|界定范围、交付物和时间线|future-perfect|scope=范围;deliverable=交付物;timeline=时间线',
      '谈判桌面|提出让步并达成和解|conditionals|bargaining=讨价还价;clause=条款;settlement=和解',
      '研究设计|控制变量并检验有效性|passive-voice|variable=变量;dataset=数据集;validity=有效性',
      '人才招聘|筛选候选人并安排入职|relative-clauses|candidate=候选人;shortlist=候选名单;onboarding=入职培训',
      '演示叙事|组织视觉材料和要点|discourse-markers|storyline=叙事线;visual=视觉材料;takeaway=核心要点',
      '出差简报|处理时区和每日津贴|future-plans|perdiem=每日津贴;timezone=时区;briefing=简报',
      '季度财务|说明利润、负债和季度|comparatives|margin=利润率;liability=负债;quarterly=季度的',
      '市场分层|分析品牌和客户群|passive-voice|campaign=活动;brand=品牌;segment=细分群体',
      '数据异常|比较基准并发现异常|present-perfect|benchmark=基准;variance=方差;anomaly=异常',
      '有效反馈|用具体方法指导改进|modals|coaching=辅导;specificity=具体性;improvement=改进',
      '时间缓冲|管理积压和委派|gerunds|backlog=积压任务;delegation=委派;buffer=缓冲时间',
      '团队摩擦|调解分歧并重建关系|conditionals|friction=摩擦;reconcile=调和;mediation=调解',
      '跨文化沟通|适应礼仪并识别刻板印象|relative-clauses|etiquette=礼仪;stereotype=刻板印象;adapt=适应',
      '媒体核查|识别错误信息和社论|passive-voice|misinformation=错误信息;editorial=社论;factcheck=事实核查',
      '公开演讲|控制语速、语调和排练|adverbs|pace=语速;intonation=语调;rehearsal=排练',
      '循环经济|讨论生命周期和废物|passive-voice|circularity=循环性;lifecycle=生命周期;waste=废物',
      '软件发布|管理代码仓库和回滚|present-perfect|repository=代码仓库;versioning=版本管理;rollback=回滚',
      '产品原型|测试易用性和迭代|gerunds|prototype=原型;usability=易用性;iteration=迭代',
      '政策执行|协调利益相关方和授权|passive-voice|stakeholder=利益相关方;mandate=授权;compliance=合规',
      '法律先例|阅读法条和证词|relative-clauses|precedent=先例;statute=法令;testimony=证词',
      '公共筛查|解释免疫和健康指南|modals|screening=筛查;immunity=免疫力;guideline=指南',
      '步行城市|讨论交通、住房和可步行性|comparatives|transit=公共交通;housing=住房;walkability=步行友好度',
      '教育评估|讨论课程、评估和读写|passive-voice|curriculum=课程;assessment=评估;literacy=读写能力',
      '远程协作|安排异步工作和人体工学|gerunds|asynchronous=异步的;workspace=工作空间;ergonomics=人体工学',
      '领导愿景|建立授权和方向一致|conditionals|vision=愿景;empowerment=授权;alignment=一致性',
      '供应库存|跟踪供应商和货运|present-perfect|inventory=库存;supplier=供应商;shipment=货运',
      '流域修复|应对干旱并恢复生态|conditionals|watershed=流域;drought=干旱;restoration=修复',
      '职业网络|讨论专业化和认证|future-perfect|specialization=专业化;networking=建立人脉;certification=认证',
      '价格变化|解释货币和通货紧缩|comparatives|currency=货币;deflation=通货紧缩;forecasting=预测',
      '研究伦理|说明公平和信息披露|passive-voice|ethics=伦理;fairness=公平;disclosure=披露',
      '调查报道|核实线索并寻找独家新闻|past-perfect|correspondent=通讯员;investigate=调查;scoop=独家新闻',
      '会议主持|促进协调并整理记录|gerunds|facilitation=促进;coordination=协调;minutes=会议记录',
      '科学沟通|用可视化和类比解释|relative-clauses|visualization=可视化;plainlanguage=通俗语言;analogy=类比',
      '风险触发|准备后备方案和缓解动作|conditionals|mitigation=缓解;trigger=触发条件;fallback=后备方案',
      '公民倡议|发起请愿和公共倡导|modals|petition=请愿;advocacy=倡导;municipal=市政的',
      '专业备忘|写出理由和简洁结论|discourse-markers|memo=备忘录;rationale=理由;concise=简洁的'
    ],
    b2: [
      'AI问责|讨论可审计性和可追溯性|passive-voice|auditability=可审计性;traceability=可追溯性;safeguard=保障措施',
      '气候定价|比较净零路径和减排|conditionals|carbonpricing=碳定价;netzero=净零;mitigation=减缓',
      '基因测序|理解生物标志物和遗传|passive-voice|sequencing=测序;biomarker=生物标志物;hereditary=遗传的',
      '程序正义|分析法理和补救|relative-clauses|dueprocess=正当程序;jurisprudence=法理学;remedy=补救措施',
      '宏观流动性|解释紧缩和再分配|comparatives|liquidity=流动性;austerity=紧缩;redistribution=再分配',
      '数字凭证|比较生物识别和凭证|passive-voice|biometric=生物识别的;credential=凭证;encryption=加密',
      '劳动市场|讨论工会、就业不稳定和生计|conditionals|unionization=工会化;precarity=不稳定性;livelihood=生计',
      '多边外交|分析联盟和停火|discourse-markers|multilateral=多边的;alliance=联盟;ceasefire=停火',
      '公共支出|阅读支出、招标和收入|passive-voice|expenditure=支出;tender=招标;fiscalspace=财政空间',
      '因果推断|区分因果性和可证伪性|passive-voice|causality=因果性;falsifiability=可证伪性;counterfactual=反事实',
      '概率风险|分析概率、敏感性和阈值|conditionals|probability=概率;sensitivity=敏感性;threshold=阈值',
      '网络防御|应对勒索软件和入侵|passive-voice|ransomware=勒索软件;firewall=防火墙;intrusion=入侵',
      '隐私工程|理解差分、元数据和最小化|gerunds|differential=差分的;metadata=元数据;minimization=最小化',
      '合同救济|比较赔偿、仲裁和可执行性|relative-clauses|indemnity=赔偿保证;arbitration=仲裁;enforceability=可执行性',
      '流行病学|安排监测和分诊|passive-voice|epidemiology=流行病学;surveillance=监测;triage=分诊',
      '生态廊道|讨论入侵物种和生态系统|conditionals|ecosystem=生态系统;invasive=入侵的;corridor=廊道',
      '储能系统|解释间歇性和容量|passive-voice|storage=储能;intermittency=间歇性;capacity=容量',
      '迁移经验|讨论侨民、汇款和无国籍|relative-clauses|diaspora=侨民;remittance=汇款;statelessness=无国籍状态',
      '城市热岛|规划降温、渗透和疏散|conditionals|cooling=降温;permeability=渗透性;evacuation=疏散',
      '模型红队|测试沙箱和防护栏|passive-voice|redteam=红队测试;sandboxing=沙箱隔离;guardrail=防护栏',
      '舆论极化|分析符号、框架和极化|discourse-markers|semiotics=符号学;framing=框架;polarization=极化',
      '语言语用|区分语用、句法和语义|relative-clauses|pragmatics=语用学;syntax=句法;semantics=语义学',
      '认知教学|讨论元认知和脚手架|gerunds|metacognition=元认知;scaffolding=脚手架教学;pedagogy=教育学',
      '组织重组|应对阻力并建立认同|conditionals|restructuring=重组;resistance=阻力;buyin=认同支持',
      '金融对冲|分析波动、衍生品和对冲|passive-voice|volatility=波动性;derivative=衍生品;hedging=对冲',
      '国际贸易|比较关税、配额和禁运|comparatives|tariff=关税;quota=配额;embargo=禁运',
      '双边谈判|准备条约和特使会谈|future-perfect|bilateral=双边的;treaty=条约;envoy=特使',
      '社会保障|讨论福利、包容和匮乏|conditionals|welfare=福利;inclusion=包容;deprivation=匮乏',
      '临床伦理|解释安慰剂、试验和知情同意|passive-voice|medical=临床的;trial=试验;informedconsent=知情同意',
      '气候反馈|分析反照率、反馈环和临界点|conditionals|albedo=反照率;feedbackloop=反馈环;tippingpoint=临界点',
      '太空遥测|理解轨迹、载荷和遥测|passive-voice|trajectory=轨迹;payload=载荷;telemetry=遥测',
      '设计启发|讨论线框、启发法和可供性|gerunds|heuristic=启发法;wireframe=线框;affordance=可供性',
      '语料计算|处理语料、分词和嵌入|passive-voice|corpus=语料库;tokenization=分词;embedding=嵌入',
      '知识哲学|讨论认识论、能动性和规范|relative-clauses|epistemology=认识论;agency=能动性;normative=规范性的',
      '公共行政|分析官僚体系和裁量|conditionals|bureaucracy=官僚体系;implementation=执行;discretion=裁量权',
      '论文综合|组织综合、连贯和文献|discourse-markers|synthesis=综合;coherence=连贯性;literature=文献'
    ]
  };
  const sentenceTemplates = {
    a1: [
      (w, c) => [`I keep the ${w[0]} ready every morning.`, `我每天早晨都会准备好${c[0]}。`],
      (w, c) => [`Please check the ${w[1]} before you leave.`, `离开前请检查${c[1]}。`],
      (w, c) => [`The ${w[2]} is near the door.`, `${c[2]}在门边。`]
    ],
    a2: [
      (w, c) => [`I updated the ${w[0]} after the meeting.`, `我在会议后更新了${c[0]}。`],
      (w, c) => [`Could you explain the ${w[1]} to the new customer?`, `你能向新顾客解释${c[1]}吗？`],
      (w, c) => [`The ${w[2]} has changed since last week.`, `自上周以来，${c[2]}发生了变化。`]
    ],
    b1: [
      (w, c) => [`The team has reviewed the ${w[0]} carefully.`, `团队已经仔细审阅了${c[0]}。`],
      (w, c) => [`We should clarify how the ${w[1]} will be measured.`, `我们应该澄清如何衡量${c[1]}。`],
      (w, c) => [`The final ${w[2]} will be shared with every partner.`, `最终的${c[2]}将与每位合作方分享。`]
    ],
    b2: [
      (w, c) => [`The committee has evaluated the ${w[0]} carefully.`, `委员会已经仔细评估了${c[0]}。`],
      (w, c) => [`Any proposal should explain how the ${w[1]} could be monitored.`, `任何提案都应解释如何监测${c[1]}。`],
      (w, c) => [`The report argues that the ${w[2]} requires independent oversight.`, `报告认为${c[2]}需要独立监督。`]
    ]
  };
  // Generate sentences that sound like something a learner would actually
  // say in the lesson's situation. These templates are also used by the
  // listening and fill questions, so the target vocabulary is practised in a
  // meaningful request, instruction, or everyday exchange.
  const dailyTemplates = (title, words, chinese, index) => {
    const topic = String(title || '');
    const w = words;
    const c = chinese;
    if (/厨房|烹饪|餐厅|咖啡|食材|面包|菜市场|晚餐|午餐/.test(topic)) {
      const kitchen = [
        [`Could I have the ${w[0]}, please?`, `请给我${c[0]}，好吗？`],
        [`Could you put the ${w[1]} on the table, please?`, `请把${c[1]}放到桌上，好吗？`],
        [`Please use the ${w[2]} for this dish.`, `请用${c[2]}做这道菜。`],
      ];
      const fills = [
        [`Could you pass me the _____, please?`, w[0], `请把${c[0]}递给我，好吗？`],
        [`Would you like some _____ with your order?`, w[1], `你的点单要加一些${c[1]}吗？`],
        [`Please put the _____ on the table.`, w[2], `请把${c[2]}放到桌上。`],
      ];
      return { listen: kitchen[index % kitchen.length], fill: fills[index % fills.length] };
    }
    if (/旅行|车站|酒店|机场|公交|地铁|行程|出行/.test(topic)) {
      const listen = [
        [`Could you tell me where the ${w[0]} is?`, `你能告诉我${c[0]}在哪里吗？`],
        [`Is the ${w[1]} included in the booking?`, `预订里包含${c[1]}吗？`],
        [`Please show me the ${w[2]} before we leave.`, `出发前请给我看看${c[2]}。`],
      ];
      const fill = [
        [`Where can I find the _____?`, w[0], `我在哪里可以找到${c[0]}？`],
        [`Could you check the _____ for me?`, w[1], `你能帮我检查一下${c[1]}吗？`],
        [`Please keep the _____ with your passport.`, w[2], `请把${c[2]}和护照放在一起。`],
      ];
      return { listen: listen[index % listen.length], fill: fill[index % fill.length] };
    }
    if (/办公室|工作|会议|团队|项目|邮件|工资|职业/.test(topic)) {
      const listen = [
        [`Could you send me the ${w[0]} before the meeting?`, `你能在会议前把${c[0]}发给我吗？`],
        [`Let's review the ${w[1]} together this afternoon.`, `我们今天下午一起看看${c[1]}吧。`],
        [`I need the ${w[2]} before I finish this task.`, `我完成这个任务前需要${c[2]}。`],
      ];
      const fill = [
        [`Could you send the _____ before lunch?`, w[0], `你能在午饭前发出${c[0]}吗？`],
        [`Let's discuss the _____ in the meeting.`, w[1], `我们在会议上讨论一下${c[1]}吧。`],
        [`I will update the _____ this evening.`, w[2], `我今晚会更新${c[2]}。`],
      ];
      return { listen: listen[index % listen.length], fill: fill[index % fill.length] };
    }
    if (/医生|健康|诊所|药|运动|症状/.test(topic)) {
      const listen = [
        [`I need help with my ${w[0]}.`, `我需要处理我的${c[0]}。`],
        [`How often should I use the ${w[1]}?`, `${c[1]}应该多久使用一次？`],
        [`Please tell the doctor about the ${w[2]}.`, `请告诉医生有关${c[2]}的情况。`],
      ];
      const fill = [
        [`Please take the _____ after lunch.`, w[0], `请在午饭后服用或使用${c[0]}。`],
        [`The nurse checked my _____.`, w[1], `护士检查了我的${c[1]}。`],
        [`I want to improve my _____.`, w[2], `我想改善我的${c[2]}。`],
      ];
      return { listen: listen[index % listen.length], fill: fill[index % fill.length] };
    }
    if (/购物|商店|退换|银行|市场|收银/.test(topic)) {
      const listen = [
        [`Do you have a different ${w[0]}?`, `你们有不同的${c[0]}吗？`],
        [`Could I pay for the ${w[1]} by card?`, `我可以用卡支付${c[1]}吗？`],
        [`I would like to return this ${w[2]}.`, `我想退回这个${c[2]}。`],
      ];
      const fill = [
        [`Could I get a _____, please?`, w[0], `请给我一个或一份${c[0]}，好吗？`],
        [`Can I pay for the _____ here?`, w[1], `我可以在这里支付${c[1]}吗？`],
        [`I need a _____ for this purchase.`, w[2], `这次购买我需要一份${c[2]}。`],
      ];
      return { listen: listen[index % listen.length], fill: fill[index % fill.length] };
    }
    const listen = [
      [`Could you explain the ${w[0]} to me?`, `你能给我解释一下${c[0]}吗？`],
      [`Please check the ${w[1]} before you leave.`, `离开前请检查${c[1]}。`],
      [`I need the ${w[2]} today.`, `我今天需要${c[2]}。`],
    ];
    const fill = [
      [`Could you explain the _____ to me?`, w[0], `你能给我解释一下${c[0]}吗？`],
      [`Please check the _____ before you leave.`, w[1], `离开前请检查${c[1]}。`],
      [`I need the _____ today.`, w[2], `我今天需要${c[2]}。`],
    ];
    return { listen: listen[index % listen.length], fill: fill[index % fill.length] };
  };
  const build = (level, row, index) => {
    const parsed = parse(row);
    const title = `进阶${parsed.title}`;
    const words = parsed.words;
    const english = words.map((item) => item[0]);
    const chinese = words.map((item) => item[1]);
    const templates = sentenceTemplates[level];
    const choice = templates[index % templates.length](english, chinese);
    const daily = dailyTemplates(title, english, chinese, index);
    const listen = daily.listen;
    const order = templates[(index + 2) % templates.length](english, chinese);
    return {
      level,
      title,
      subtitle: parsed.subtitle,
      words,
      choice,
      listen,
      order,
      fill: daily.fill,
      pairs: words,
      distractors: ['日程安排', '工作记录', '实际选择', '相关说明'],
      grammarTags: parsed.grammarTags,
      generatedPack: true
    };
  };
  const pack = Object.entries(rows).flatMap(([level, list]) => list.map((row, index) => build(level, row, index)));
  if (typeof module !== 'undefined' && module.exports) module.exports = pack;
  if (root) root.lumiCoursePack2 = pack;
})(typeof window !== 'undefined' ? window : null);
