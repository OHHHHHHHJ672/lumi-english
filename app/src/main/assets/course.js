/* Beta course: 288 authored lessons. No level is cloned from another level. */
const seeds = [];
function lesson(level,title,subtitle,words,choice,listen,order,fill,pairs,distractors,grammarTags){seeds.push({level,title,subtitle,words,choice,listen,order,fill,pairs,distractors,grammarTags});}

// A1: survival English
lesson('a1','日程与习惯','说清楚一天如何开始',[['routine','日常安排'],['alarm','闹钟'],['quiet','安静的']],['I check my schedule before breakfast.','我在早餐前查看日程。'],['The alarm rings at half past six.','闹钟六点半响了。'],['I usually walk to work.','我通常步行去上班。'],['Please set an _____ for seven o’clock.','alarm','请把闹钟设在七点。'],[['routine','日常安排'],['weekday','工作日'],['relax','放松']],['周末计划','晚餐菜单','车站方向','房间钥匙']);
lesson('a1','课堂时光','在教室里听懂简单指令',[['notebook','笔记本'],['borrow','借用'],['repeat','重复']],['Could you repeat the last sentence?','你能重复上一句话吗？'],['Please open your notebook to page ten.','请把笔记本翻到第十页。'],['The answer is on the board.','答案在黑板上。'],['May I _____ your pencil for a moment?','borrow','我可以借用一下你的铅笔吗？'],[['notebook','笔记本'],['classmate','同学'],['question','问题']],['机场柜台','天气预报','水果篮子','电影票']);
lesson('a1','我的房间','描述熟悉的空间和物品',[['shelf','架子'],['carpet','地毯'],['drawer','抽屉']],['The blue lamp is beside the sofa.','蓝色的灯在沙发旁边。'],['There are two towels in the drawer.','抽屉里有两条毛巾。'],['My keys are under the small table.','我的钥匙在小桌子下面。'],['The books are on the top _____.','shelf','书在最上面的架子上。'],[['shelf','架子'],['corner','角落'],['blanket','毯子']],['课程安排','公交时刻','工作会议','购物折扣']);
lesson('a1','厨房菜单','买菜、点餐和表达口味',[['ingredient','食材'],['spicy','辣的'],['recipe','食谱']],['I would like the vegetable soup, please.','我想要一份蔬菜汤。'],['This sauce is too spicy for me.','这份酱料对我来说太辣了。'],['We need fresh tomatoes for the recipe.','我们需要新鲜番茄来做这道菜。'],['Could you pass me the olive _____, please?','oil','请把橄榄油递给我，好吗？'],[['ingredient','食材'],['menu','菜单'],['order','点单']],['行李标签','房间号码','会议议程','银行账户']);
lesson('a1','城市方向','在城市里问路和辨认地点',[['crosswalk','人行横道'],['corner','拐角'],['opposite','在对面']],['Is the pharmacy across from the library?','药店在图书馆对面吗？'],['Turn right after the second traffic light.','过第二个红绿灯后右转。'],['The bus stop is around the corner.','公交车站就在拐角处。'],['Please wait at the pedestrian _____.','crosswalk','请在人行横道处等候。'],[['crosswalk','人行横道'],['intersection','十字路口'],['nearby','附近']],['早餐时间','电子邮件','衣服尺码','护照号码']);
lesson('a1','家人和朋友','谈论关系、性格和周末',[['neighbor','邻居'],['generous','慷慨的'],['invite','邀请']],['My neighbor often shares vegetables from her garden.','我的邻居经常分享她花园里的蔬菜。'],['We invited our cousins for dinner.','我们邀请了表兄弟姐妹来吃晚饭。'],['My brother is learning to cook.','我哥哥正在学做饭。'],['Everyone says that Maya is very _____.','generous','大家都说玛雅非常慷慨。'],[['neighbor','邻居'],['cousin','表兄弟姐妹'],['friendly','友好的']],['地铁线路','考试成绩','咖啡口味','天气警报']);
lesson('a1','天气变化','描述天气并准备出门',[['forecast','天气预报'],['cloudy','多云的'],['umbrella','雨伞']],['The forecast says it will be sunny this afternoon.','天气预报说今天下午会放晴。'],['Take an umbrella because rain is expected.','预计会下雨，所以带把雨伞。'],['The wind is getting stronger outside.','外面的风越来越大。'],['It is _____ today, so bring a jacket.','cloudy','今天多云，所以带件夹克。'],[['forecast','天气预报'],['storm','暴风雨'],['temperature','温度']],['房租合同','机场登机口','晚餐预约','图书馆卡']);
lesson('a1','第一次旅行','处理机场、酒店和行李',[['luggage','行李'],['boarding','登机'],['destination','目的地']],['Where can I collect my luggage?','我在哪里可以取行李？'],['Your boarding gate has changed to twelve.','您的登机口改为十二号。'],['We booked a room near the station.','我们预订了车站附近的一间房。'],['Our final _____ is Lisbon.','destination','我们的最终目的地是里斯本。'],[['luggage','行李'],['passport','护照'],['arrival','抵达']],['课堂作业','超市收据','天气温度','厨房食材']);

// A2: daily communication and practical scenarios
lesson('a2','办公室日程','安排任务、时间和简单协作',[['deadline','截止日期'],['shift','班次'],['colleague','同事']],['I need to finish this report before the deadline.','我需要在截止日期前完成这份报告。'],['My colleague is covering the morning shift.','我的同事负责早班。'],['We moved the meeting to Thursday afternoon.','我们把会议改到周四下午。'],['Could you check the project _____ before lunch?','deadline','你能在午餐前查看项目截止日期吗？'],[['deadline','截止日期'],['colleague','同事'],['schedule','日程表']],['游泳课程','药品剂量','火车站台','旅行纪念品']);
lesson('a2','看医生','描述症状并理解建议',[['appointment','预约'],['symptom','症状'],['prescription','处方']],['I have had a sore throat since Monday.','我从周一开始喉咙痛。'],['The doctor recommends drinking more water.','医生建议多喝水。'],['Please take these tablets after meals.','请在饭后服用这些药片。'],['I need to make a doctor’s _____.','appointment','我需要预约看医生。'],[['appointment','预约'],['symptom','症状'],['recover','恢复']],['项目预算','购物退货','火车延误','邻居聚会']);
lesson('a2','购物退换','比较商品并解决售后问题',[['receipt','收据'],['refund','退款'],['discount','折扣']],['This jacket is on sale, but the sleeves are too long.','这件夹克在打折，但袖子太长。'],['Please keep the receipt if you want a refund.','如果想退款，请保留收据。'],['Could I exchange this shirt for a smaller size?','我可以把这件衬衫换成小一码吗？'],['The store offered a ten percent _____.','discount','商店提供了百分之十的折扣。'],[['receipt','收据'],['refund','退款'],['exchange','更换']],['医院预约','会议纪要','行李重量','公园入口']);
lesson('a2','社交安排','邀请朋友、改约和表达意愿',[['available','有空的'],['cancel','取消'],['suggestion','建议']],['Are you available to join us for dinner on Friday?','你周五有空和我们一起吃晚饭吗？'],['I am sorry, but I have to cancel our plan.','抱歉，我不得不取消我们的计划。'],['How about meeting at the new café?','在新咖啡馆见面怎么样？'],['Thanks for the helpful _____.','suggestion','谢谢你有用的建议。'],[['available','有空的'],['invite','邀请'],['confirm','确认']],['工资单','机场安检','天气预报','药物说明']);
lesson('a2','租房生活','描述房屋问题并联系房东',[['landlord','房东'],['leak','漏水'],['rent','租金']],['The kitchen tap has been leaking since yesterday.','厨房水龙头从昨天起一直漏水。'],['Our landlord promised to send a plumber.','我们的房东答应派水管工来。'],['The rent includes water and internet.','租金包含水费和网络。'],['There is a small _____ under the sink.','leak','水槽下面有一处小漏水。'],[['landlord','房东'],['repair','维修'],['rent','租金']],['公交路线','电子设备','生日邀请','餐厅菜单']);
lesson('a2','旅途变更','处理延误、改签和行程变化',[['delay','延误'],['platform','站台'],['luggage','行李']],['The train was delayed because of heavy rain.','火车因为大雨而延误了。'],['Please wait on platform four for the next service.','请在四号站台等待下一班车。'],['We changed our booking to a later flight.','我们把预订改成了晚一点的航班。'],['The airline offered a meal during the _____.','delay','航空公司在延误期间提供了餐食。'],[['delay','延误'],['platform','站台'],['transfer','换乘']],['洗衣步骤','租房合同','课程成绩','咖啡配料']);
lesson('a2','数字习惯','讨论手机、网络和个人设置',[['password','密码'],['notification','通知'],['download','下载']],['I changed my password after receiving a strange message.','收到奇怪消息后我改了密码。'],['Turn off notifications while you are studying.','学习时请关闭通知。'],['The app lets users download lessons for offline use.','这个应用允许用户下载课程供离线使用。'],['Please _____ the update from the official website.','download','请从官方网站下载更新。'],[['password','密码'],['notification','通知'],['offline','离线']],['酒店房型','运动训练','城市地图','考试日期']);
lesson('a2','回顾经历','讲述过去的活动和收获',[['experience','经历'],['museum','博物馆'],['recommend','推荐']],['We visited a small museum during our weekend trip.','我们周末旅行时参观了一家小博物馆。'],['I highly recommend the walking tour.','我非常推荐徒步游览。'],['She learned a lot from the volunteer experience.','她从志愿者经历中学到了很多。'],['The guide _____ a quiet restaurant near the river.','recommended','导游推荐了河边一家安静的餐厅。'],[['experience','经历'],['recommend','推荐'],['memorable','难忘的']],['手机密码','租金收据','工作班次','药品处方']);

// B1: independent communication
lesson('b1','远程协作','清楚地表达项目进展和阻碍',[['coordinate','协调'],['milestone','里程碑'],['clarify','澄清']],['We need to coordinate the launch across three regional teams.','我们需要协调三个地区团队的发布工作。'],['The latest milestone was completed ahead of schedule.','最近的里程碑提前完成了。'],['Could you clarify which figures belong in the summary?','你能澄清哪些数字应该放在摘要里吗？'],['The team will review the final _____.','draft','团队明天会审阅最终草稿。'],[['coordinate','协调'],['milestone','里程碑'],['draft','草稿']],['签证要求','文化礼仪','健身计划','新闻标题']);
lesson('b1','可持续旅行','比较交通方式并说明影响',[['carbon','碳排放'],['railway','铁路'],['sustainable','可持续的']],['Taking the railway produces fewer emissions than flying.','乘坐铁路比乘飞机产生的排放更少。'],['The company promotes sustainable tourism in coastal towns.','这家公司在沿海城镇推广可持续旅游。'],['We chose a slower route to reduce our carbon footprint.','我们选择较慢的路线来减少碳足迹。'],['Public transport is a more _____ option for this journey.','sustainable','公共交通是这次旅程更可持续的选择。'],[['carbon','碳排放'],['railway','铁路'],['footprint','足迹']],['项目草稿','密码设置','广告预算','合同条款']);
lesson('b1','学习目标','讨论方法、反馈和长期计划',[['strategy','策略'],['feedback','反馈'],['progress','进步']],['A clear study strategy helped me prepare for the interview.','清晰的学习策略帮助我准备了面试。'],['The tutor gave practical feedback on my presentation.','导师对我的演讲给出了实用反馈。'],['Small improvements become visible after consistent practice.','持续练习后，小的进步会变得明显。'],['We should track our ____ rather than compare ourselves.','progress','我们应该追踪自己的进步，而不是互相比较。'],[['strategy','策略'],['feedback','反馈'],['consistent','持续的']],['机场行李','租房维修','环保交通','媒体报道']);
lesson('b1','理性消费','权衡预算、风险和选择',[['budget','预算'],['installment','分期付款'],['priority','优先事项']],['We postponed the purchase because it was outside our budget.','我们推迟了购买，因为它超出了预算。'],['The monthly installment includes a small service fee.','每月分期付款包括一笔小额服务费。'],['Safety should remain our first priority.','安全应该始终是我们的第一优先事项。'],['We need to set a realistic _____ for the renovation.','budget','我们需要为装修设定一个现实的预算。'],[['budget','预算'],['installment','分期付款'],['priority','优先事项']],['课程反馈','碳足迹','领导风格','隐私设置']);
lesson('b1','文化礼仪','在不同文化中保持尊重',[['custom','习俗'],['gesture','手势'],['respectful','尊重的']],['It is respectful to learn the local customs before visiting.','出访前了解当地习俗是一种尊重。'],['A small gesture can prevent an awkward misunderstanding.','一个小小的举动可以避免尴尬的误解。'],['We asked our host which topics were considered sensitive.','我们询问主人哪些话题被认为比较敏感。'],['Try to use a _____ tone when discussing traditions.','respectful','谈论传统时尽量使用尊重的语气。'],[['custom','习俗'],['gesture','手势'],['sensitive','敏感的']],['预算计划','数据备份','会议议程','研究假设']);
lesson('b1','媒体素养','区分事实、观点和可信来源',[['source','来源'],['claim','说法'],['bias','偏见']],['Always check the source before sharing a surprising claim.','分享令人惊讶的说法前要先核查来源。'],['The article presents evidence from several independent studies.','这篇文章呈现了几项独立研究的证据。'],['A headline can influence how readers interpret the story.','标题会影响读者如何理解报道。'],['The report may contain a regional _____.','bias','这份报道可能带有地域偏见。'],[['source','来源'],['claim','说法'],['evidence','证据']],['文化习俗','租约条款','产品保修','旅行延误']);
lesson('b1','解决问题','说明原因、方案和下一步',[['obstacle','障碍'],['alternative','替代方案'],['resolve','解决']],['We found an alternative after the original supplier withdrew.','原供应商退出后，我们找到了替代方案。'],['The manager asked us to resolve the issue before Friday.','经理要求我们在周五前解决这个问题。'],['Identifying the cause is the first step toward a solution.','找出原因是解决问题的第一步。'],['A technical _____ prevented the payment from going through.','obstacle','一个技术障碍阻止了付款完成。'],[['obstacle','障碍'],['alternative','替代方案'],['resolve','解决']],['媒体来源','文化手势','人工智能模型','职业转型']);
lesson('b1','边界与关系','表达需求并处理分歧',[['boundary','界限'],['misunderstanding','误解'],['negotiate','协商']],['We need to negotiate a fair division of household tasks.','我们需要协商公平分配家务。'],['A calm conversation cleared up the misunderstanding.','一次冷静的谈话消除了误解。'],['Setting a boundary does not mean ending the relationship.','设定界限并不意味着结束这段关系。'],['They agreed to _____ the schedule rather than argue.','negotiate','他们同意协商日程，而不是争吵。'],[['boundary','界限'],['misunderstanding','误解'],['compromise','妥协']],['新闻证据','项目障碍','数据加密','市场需求']);

// B2: complex professional and abstract topics
lesson('b2','谈判策略','提出条件、让步并确认共识',[['concession','让步'],['leverage','优势'],['counteroffer','还价']],['The supplier made a reasonable counteroffer after reviewing our terms.','供应商审阅条款后提出了合理的还价。'],['We can offer a small concession if the contract is extended.','如果延长合同，我们可以做出小幅让步。'],['Both sides used reliable data as leverage during the negotiation.','谈判中双方都把可靠数据作为优势。'],['The revised proposal includes a significant _____ in delivery time.','reduction','修改后的提案大幅缩短了交付时间。'],[['concession','让步'],['counteroffer','还价'],['leverage','优势']],['算法偏见','城市规划','研究证据','职业培训']);
lesson('b2','项目风险','预测影响并制定应对方案',[['contingency','应急方案'],['mitigate','缓解'],['dependency','依赖关系']],['The team identified a dependency that could delay the rollout.','团队发现一项可能延迟上线的依赖关系。'],['A contingency plan will mitigate the impact of a supplier failure.','应急方案将缓解供应商故障的影响。'],['We should quantify the risk before allocating additional resources.','在分配更多资源前，我们应量化风险。'],['The audit revealed a critical security _____.','vulnerability','审计发现了一个关键安全漏洞。'],[['contingency','应急方案'],['dependency','依赖关系'],['vulnerability','漏洞']],['谈判让步','城市人口','领导授权','学术引用']);
lesson('b2','城市政策','分析公共选择的长期后果',[['infrastructure','基础设施'],['equity','公平性'],['congestion','拥堵']],['Investing in public infrastructure can improve access to opportunity.','投资公共基础设施可以改善人们获得机会的途径。'],['The policy aims to reduce congestion without displacing residents.','这项政策旨在减少拥堵，同时避免迫使居民搬迁。'],['Officials must balance economic growth with environmental equity.','官员必须平衡经济增长与环境公平。'],['The proposal requires substantial public _____.','consultation','该提案需要广泛的公众咨询。'],[['infrastructure','基础设施'],['equity','公平性'],['congestion','拥堵']],['风险漏洞','数据加密','远程协作','研究方法']);
lesson('b2','数据隐私','讨论同意、保护和监管',[['consent','同意'],['anonymize','匿名化'],['regulation','监管']],['Users should give informed consent before their data is shared.','用户应在数据共享前给予知情同意。'],['The platform anonymizes location data before analysis.','该平台在分析前会将位置数据匿名化。'],['Strict regulation can increase trust in digital services.','严格监管可以提高人们对数字服务的信任。'],['The company must explain how long it will retain personal _____.','information','公司必须解释会保留个人信息多久。'],[['consent','同意'],['anonymize','匿名化'],['regulation','监管']],['交通拥堵','供应商故障','谈判条款','管理授权']);
lesson('b2','领导与授权','建立责任、反馈和决策机制',[['delegate','授权'],['accountability','问责'],['morale','士气']],['Effective leaders delegate clearly while retaining accountability.','高效的领导者会清晰授权，同时承担问责。'],['Transparent feedback improved morale across the department.','透明的反馈提升了整个部门的士气。'],['The director encouraged independent decisions within agreed limits.','主管鼓励在约定范围内独立决策。'],['Managers should _____ tasks according to each person’s strengths.','delegate','管理者应根据每个人的优势分配任务。'],[['delegate','授权'],['accountability','问责'],['morale','士气']],['公众咨询','个人信息','研究引用','市场波动']);
lesson('b2','人工智能伦理','权衡创新、公平和责任',[['algorithm','算法'],['transparency','透明度'],['discrimination','歧视']],['An algorithm may reproduce discrimination hidden in historical data.','算法可能复制历史数据中隐藏的歧视。'],['Independent audits can improve transparency in automated decisions.','独立审计可以提高自动化决策的透明度。'],['Innovation should be accompanied by clear accountability mechanisms.','创新应当配有清晰的问责机制。'],['The review found a _____ pattern in the training data.','biased','审查发现训练数据中存在有偏见的模式。'],[['algorithm','算法'],['transparency','透明度'],['discrimination','歧视']],['团队士气','基础设施','应急方案','合同让步']);
lesson('b2','研究论证','评估证据、局限和替代解释',[['hypothesis','假设'],['methodology','方法论'],['correlation','相关性']],['The findings support the hypothesis but do not prove causation.','研究结果支持这一假设，但不能证明因果关系。'],['The methodology combines interviews with long-term observation.','该方法结合了访谈与长期观察。'],['A strong argument acknowledges evidence that points in another direction.','有力的论证会承认指向另一方向的证据。'],['The study observed a correlation between sleep and memory _____.','retention','研究观察到睡眠与记忆保持之间的相关性。'],[['hypothesis','假设'],['methodology','方法论'],['correlation','相关性']],['算法偏见','领导问责','城市拥堵','供应链风险']);
lesson('b2','职业转型','表达动机、技能和长期规划',[['transition','转型'],['transferable','可迁移的'],['portfolio','作品集']],['The transition required me to demonstrate transferable skills.','这次转型要求我展示可迁移的技能。'],['She built a portfolio to support her application for the fellowship.','她建立作品集来支持奖学金申请。'],['A realistic plan makes a major career change less overwhelming.','现实的计划能让重大的职业转变不那么令人难以承受。'],['Mentoring helped him identify his strongest _____ skills.','transferable','导师帮助他找出最强的可迁移技能。'],[['transition','转型'],['transferable','可迁移的'],['portfolio','作品集']],['研究假设','政策公平','数据同意','谈判优势']);

// Expanded content pack. Each row is authored for one concrete situation rather
// than cloned from another CEFR level. Keeping the rows as data makes later
// content reviews and imports predictable.
const expandedGrammar = {
  a1: [
    ['present-simple','adjectives'], ['can-requests','countable-nouns'], ['present-continuous','imperatives'], ['frequency-adverbs','gerunds'],
    ['present-simple','health-advice'], ['have-got','appointments'], ['imperatives','household-vocabulary'], ['can-requests','phone-language'],
    ['there-is-are','present-continuous'], ['time-expressions','imperatives'], ['can-requests','money-vocabulary'], ['present-simple','recycling-vocabulary']
  ],
  a2: [
    ['present-continuous','study-plans'], ['present-perfect','email-language'], ['present-simple','social-responsibility'], ['going-to','money-vocabulary'],
    ['imperatives','sequencing-words'], ['present-continuous','health-advice'], ['will-future','relative-clauses'], ['present-continuous','cultural-events'],
    ['past-simple','future-plans'], ['present-simple','time-expressions'], ['past-simple','reported-information'], ['modal-verbs','meeting-language']
  ],
  b1: [
    ['present-perfect','presentation-language'], ['past-simple','relative-clauses'], ['future-forms','project-language'], ['comparatives','feedback-language'],
    ['passive-voice','academic-writing'], ['past-simple','conflict-resolution'], ['modals','remote-work-language'], ['present-perfect','public-statements'],
    ['modal-verbs','environmental-policy'], ['present-perfect','business-language'], ['quantifiers','data-language'], ['modals','cross-cultural-communication']
  ],
  b2: [
    ['passive-voice','cause-and-effect'], ['conditionals','climate-policy'], ['passive-voice','cybersecurity'], ['legal-modals','contract-language'],
    ['passive-voice','academic-research'], ['relative-clauses','urban-policy'], ['modal-verbs','supply-chain-language'], ['present-perfect','public-health'],
    ['nominalisation','media-analysis'], ['passive-voice','academic-publishing'], ['subjunctive','bioethics'], ['reported-speech','international-relations']
  ]
};
function addExpandedLessons(level, rows) {
  rows.forEach((row, index) => lesson(level, ...row, expandedGrammar[level][index]));
}

addExpandedLessons('a1', [
  ['服装尺码','比较衣物并说明是否合身',[['size','尺码'],['fit','合身'],['tight','紧的']],['Does this jacket fit you?','这件夹克合身吗？'],['The medium shirt is on sale today.','今天中码衬衫在打折。'],['Can I try these shoes on?','我可以试试这双鞋吗？'],['This sweater is too _____ for me.','tight','这件毛衣对我来说太紧了。'],[['size','尺码'],['fit','合身'],['cheap','便宜的']],['公交路线','生日蜡烛','图书馆时间','家庭作业']],
  ['公交出行','买票、问线路和换乘',[['route','路线'],['fare','车费'],['transfer','换乘']],['Which bus goes to the museum?','哪路公交车去博物馆？'],['The last train leaves at ten.','末班火车十点发车。'],['Where can I buy a ticket?','我在哪里可以买票？'],['The bus _____ is next to the bank.','stop','公交车站在银行旁边。'],[['route','路线'],['fare','车费'],['stop','车站']],['晚餐菜单','课程成绩','天气预报','酒店房间']],
  ['生日聚会','邀请朋友并描述庆祝活动',[['celebrate','庆祝'],['candle','蜡烛'],['invitation','邀请函']],['We are having a small party tonight.','我们今晚要办一个小聚会。'],['Please bring a birthday card.','请带一张生日卡片。'],['Would you like some cake?','你想吃点蛋糕吗？'],['She sent an _____ to her friends.','invitation','她给朋友们发了一份邀请函。'],[['celebrate','庆祝'],['candle','蜡烛'],['card','卡片']],['公交路线','房租金额','考试日期','厨房食材']],
  ['兴趣爱好','谈论休闲活动和练习习惯',[['hobby','爱好'],['collect','收集'],['practice','练习']],['I practice the piano after work.','我下班后练钢琴。'],['He collects old postcards.','他收集旧明信片。'],['What do you do for fun?','你平时做什么消遣？'],['Reading is my favorite _____.','hobby','阅读是我最喜欢的爱好。'],[['hobby','爱好'],['collect','收集'],['practice','练习']],['机场登机口','药品说明','工作会议','房间钥匙']],
  ['健身习惯','表达运动频率和健康建议',[['exercise','锻炼'],['stretch','拉伸'],['healthy','健康的']],['I go swimming twice a week.','我每周游泳两次。'],['Remember to stretch before running.','记得跑步前拉伸。'],['A short walk can improve your mood.','短暂散步可以改善心情。'],['Water is important for a _____ body.','healthy','水对健康的身体很重要。'],[['exercise','锻炼'],['stretch','拉伸'],['mood','心情']],['火车换乘','生日邀请','租房合同','天气变化']],
  ['看牙预约','描述牙痛并安排检查',[['dentist','牙医'],['toothache','牙痛'],['checkup','检查']],['I need to make an appointment with the dentist.','我需要预约看牙医。'],['The checkup will only take twenty minutes.','检查只需要二十分钟。'],['Does this tooth hurt?','这颗牙疼吗？'],['She has a bad _____ after eating sweets.','toothache','她吃甜食后牙很痛。'],[['dentist','牙医'],['checkup','检查'],['toothache','牙痛']],['运动计划','银行账户','衣物尺码','公交车费']],
  ['家务分工','说明家务安排和请求',[['laundry','洗衣服'],['dishes','餐具'],['sweep','扫地']],['I do the laundry on Saturday morning.','我周六早上洗衣服。'],['Please wash the dishes after dinner.','晚饭后请洗碗。'],['Can you sweep the floor?','你能扫地吗？'],['Please _____ the kitchen floor.','sweep','请扫一下厨房地板。'],[['laundry','洗衣服'],['dishes','餐具'],['sweep','扫地']],['课程安排','机场广播','城市地图','购物折扣']],
  ['手机联系','打电话、回复和留言',[['contact','联系'],['reply','回复'],['missed','未接的']],['I will call you back after class.','下课后我会给你回电话。'],['I left a message on your phone.','我在你的手机上留了言。'],['Could you send me the address?','你能把地址发给我吗？'],['I saw your _____ call this morning.','missed','我今天早上看到了你的未接来电。'],[['contact','联系'],['reply','回复'],['message','留言']],['晚餐预约','房间清洁','公交时刻','考试成绩']],
  ['公园活动','描述户外活动和地点',[['picnic','野餐'],['bench','长椅'],['bicycle','自行车']],['Let us meet beside the fountain.','我们在喷泉旁见面吧。'],['The children are playing on the grass.','孩子们正在草地上玩。'],['We brought sandwiches for a picnic.','我们带了三明治去野餐。'],['She rides her _____ to the park.','bicycle','她骑自行车去公园。'],[['picnic','野餐'],['bench','长椅'],['grass','草地']],['医院预约','工作班次','护照号码','购物收据']],
  ['时间安排','表达准时、早到和迟到',[['early','早的'],['late','迟的'],['sharp','整点的']],['The meeting starts at nine sharp.','会议九点整开始。'],['I arrived early for the interview.','我提前到了面试地点。'],['Do not be late for the train.','别赶不上火车。'],['Please arrive _____ for the appointment.','early','请提前到预约地点。'],[['early','早的'],['late','迟的'],['sharp','整点的']],['天气温度','车站方向','食物口味','作业答案']],
  ['银行基础','办理账户、现金和收据',[['account','账户'],['cash','现金'],['receipt','收据']],['I would like to open a bank account.','我想开一个银行账户。'],['The machine is out of cash.','机器没现金了。'],['Can I pay by card?','我可以刷卡吗？'],['Keep the _____ for your records.','receipt','请保留收据以便记录。'],[['account','账户'],['cash','现金'],['receipt','收据']],['行李重量','公交路线','课堂笔记','天气预报']],
  ['家居清洁','谈论清洁、垃圾和回收',[['clean','清洁的'],['dirty','脏的'],['bin','垃圾桶']],['The kitchen needs a quick clean.','厨房需要快速打扫一下。'],['Please put the bottles in the recycling bin.','请把瓶子放进回收箱。'],['This towel is still wet.','这条毛巾还是湿的。'],['The windows are _____ after the storm.','dirty','暴风雨后窗户很脏。'],[['clean','清洁的'],['dirty','脏的'],['recycle','回收']],['火车站台','生日蛋糕','工作日程','药品剂量']]
]);

addExpandedLessons('a2', [
  ['学习计划','安排复习、考试和专注时间',[['revise','复习'],['concentrate','集中注意力'],['semester','学期']],['I am preparing for my final exam.','我正在准备期末考试。'],['The library stays open until midnight.','图书馆一直开放到午夜。'],['Could you explain this grammar point?','你能解释这个语法点吗？'],['I need a quiet place to _____.','concentrate','我需要一个安静的地方来集中注意力。'],[['revise','复习'],['concentrate','集中注意力'],['semester','学期']],['机场行李','餐厅菜单','租金收据','天气警报']],
  ['工作邮件','写邮件、附件和转发',[['subject','主题'],['attach','附上'],['forward','转发']],['I have attached the updated document.','我附上了更新后的文件。'],['Please include the invoice in your reply.','请在回复中附上发票。'],['Could you forward this message to Tina?','你能把这条消息转发给蒂娜吗？'],['Write a clear _____ line.','subject','写一个清楚的主题行。'],[['subject','主题'],['attach','附上'],['forward','转发']],['运动计划','酒店预订','课程成绩','药品处方']],
  ['社区服务','谈论志愿服务和公益机构',[['volunteer','志愿者'],['donation','捐款'],['shelter','收容所']],['Our group volunteers at the food bank.','我们小组在食物银行做志愿者。'],['The shelter needs warm blankets.','收容所需要保暖毯子。'],['Would you like to make a donation?','你愿意捐款吗？'],['She works as a _____ on weekends.','volunteer','她周末做志愿者。'],[['volunteer','志愿者'],['donation','捐款'],['shelter','收容所']],['会议议程','火车延误','购物退换','天气预报']],
  ['理财储蓄','讨论储蓄、支出和消费能力',[['save','储蓄'],['expense','支出'],['afford','负担得起']],['We are saving for a new apartment.','我们正在为新公寓存钱。'],['Rent is our largest monthly expense.','房租是我们每月最大的支出。'],['Can we afford this course?','我们负担得起这门课程吗？'],['I track every _____ in a notebook.','expense','我在笔记本里记录每一笔支出。'],[['save','储蓄'],['expense','支出'],['afford','负担得起']],['社区活动','行李标签','城市地图','餐厅预约']],
  ['烹饪步骤','按顺序描述准备食物',[['boil','煮沸'],['chop','切碎'],['serve','上菜']],['Chop the onions before heating the pan.','加热锅之前把洋葱切碎。'],['The soup should simmer for ten minutes.','汤应该炖十分钟。'],['Serve the rice while it is hot.','趁米饭热的时候上桌。'],['Please _____ the vegetables into small pieces.','chop','请把蔬菜切成小块。'],[['boil','煮沸'],['chop','切碎'],['serve','上菜']],['学习资料','公交车票','银行账户','生日礼物']],
  ['运动计划','讨论训练、教练和伤病',[['training','训练'],['coach','教练'],['injury','伤病']],['The coach changed our training plan.','教练改变了我们的训练计划。'],['He stopped running because of an injury.','他因为受伤停止跑步。'],['I am getting stronger every week.','我每周都变得更强壮。'],['Rest can prevent a serious _____.','injury','休息可以预防严重伤病。'],[['training','训练'],['coach','教练'],['injury','伤病']],['电子邮件主题','房屋漏水','车站站台','天气预报']],
  ['维修预约','联系技术人员和保修服务',[['technician','技术员'],['replace','更换'],['warranty','保修']],['A technician will visit us tomorrow.','技术员明天会来。'],['The warranty covers parts and labor.','保修包括零件和人工。'],['Could you replace the broken screen?','你能更换坏掉的屏幕吗？'],['The shop will _____ the damaged part.','replace','商店会更换损坏的部件。'],[['technician','技术员'],['replace','更换'],['warranty','保修']],['课程表','银行转账','行李延误','天气变化']],
  ['文化活动','介绍展览、门票和表演',[['exhibition','展览'],['ticket','门票'],['perform','表演']],['The museum is hosting a photography exhibition.','博物馆正在举办摄影展。'],['Tickets are available online.','门票可以在线购买。'],['The local band will perform tonight.','本地乐队今晚会表演。'],['The dancers will _____ on the main stage.','perform','舞者将在主舞台表演。'],[['exhibition','展览'],['ticket','门票'],['perform','表演']],['租房合同','学习方法','项目预算','医院预约']],
  ['出行规划','阅读行程并确认旅行安排',[['booking','预订'],['itinerary','行程'],['confirm','确认']],['I checked the itinerary before booking.','预订前我查看了行程。'],['Please confirm your seat by Friday.','请在周五前确认座位。'],['We packed light for the weekend.','我们为周末轻装出行。'],['Our _____ includes three different cities.','itinerary','我们的行程包括三个不同的城市。'],[['booking','预订'],['itinerary','行程'],['confirm','确认']],['药品说明','会议纪要','购物折扣','厨房配料']],
  ['睡眠健康','描述睡眠、压力和休息',[['routine','作息'],['stress','压力'],['rest','休息']],['A regular sleep routine improves my mood.','规律作息能改善我的心情。'],['Too much stress can affect your health.','压力过大会影响健康。'],['Try to rest before the long journey.','长途旅行前尽量休息。'],['A short break helps reduce _____.','stress','短暂休息有助于减轻压力。'],[['routine','作息'],['stress','压力'],['rest','休息']],['车票价格','学校学期','展览门票','房东电话']],
  ['新闻阅读','阅读标题、文章和来源',[['headline','标题'],['article','文章'],['source','来源']],['I read the article before sharing it.','我分享前读了这篇文章。'],['The headline does not tell the whole story.','标题没有讲完整个故事。'],['Check the source before trusting the claim.','相信说法前先核查来源。'],['This _____ published the interview yesterday.','source','这个来源昨天发布了采访。'],[['headline','标题'],['article','文章'],['source','来源']],['行李重量','课程成绩','晚餐预约','天气温度']],
  ['团队会议','准备议程、决定和行动',[['agenda','议程'],['decision','决定'],['action','行动']],['The agenda includes three items.','议程包括三项内容。'],['We reached a decision after a long discussion.','长时间讨论后我们做出了决定。'],['Who will take the next action?','谁来采取下一步行动？'],['Please add this topic to the _____.','agenda','请把这个话题加进议程。'],[['agenda','议程'],['decision','决定'],['action','行动']],['旅行路线','购物收据','健康建议','生日邀请']]
]);

addExpandedLessons('b1', [
  ['演讲表达','准备演讲、重点和幻灯片',[['audience','听众'],['emphasize','强调'],['slides','幻灯片']],['The speaker emphasized the main finding.','演讲者强调了主要发现。'],['The audience asked several practical questions.','听众提出了几个实际问题。'],['Could you move to the next slide?','你能翻到下一张幻灯片吗？'],['Use a chart to engage the _____.','audience','用图表吸引听众。'],[['audience','听众'],['emphasize','强调'],['slides','幻灯片']],['城市规划','银行账户','旅行行程','厨房食材']],
  ['求职面试','说明职位、资格和推荐人',[['qualification','资格'],['position','职位'],['reference','推荐人']],['She applied for a position in marketing.','她申请了市场营销职位。'],['Please bring two professional references.','请带两位职业推荐人的信息。'],['What qualification is required for this role?','这个职位需要什么资格？'],['He has the right _____ for the job.','qualification','他具备这份工作所需的资格。'],[['qualification','资格'],['position','职位'],['reference','推荐人']],['媒体报道','合同条款','学习策略','环境排放']],
  ['项目时间','估算工作、延迟和优先级',[['estimate','估算'],['delay','延迟'],['priority','优先事项']],['We need to estimate the remaining work.','我们需要估算剩余工作。'],['A supplier delay changed our schedule.','供应商延迟改变了我们的日程。'],['Which task should be our first priority?','哪项任务应该是首要事项？'],['The launch may _____ by a week.','delay','发布可能会延迟一周。'],[['estimate','估算'],['delay','延迟'],['priority','优先事项']],['文化习俗','家庭分工','研究假设','酒店预订']],
  ['反馈改进','理解建设性反馈和薄弱点',[['constructive','建设性的'],['strength','优势'],['weakness','弱点']],['The mentor gave constructive feedback.','导师给出了建设性反馈。'],['She identified a weakness in the draft.','她找出了草稿中的一个弱点。'],['Your strongest skill is clear communication.','你最强的技能是清晰沟通。'],['The review highlights one major _____.','weakness','评审指出了一个主要弱点。'],[['constructive','建设性的'],['strength','优势'],['weakness','弱点']],['机场登机','租房维修','媒体来源','课程成绩']],
  ['学术学习','引用来源并安全改写',[['citation','引用'],['source','来源'],['paraphrase','改写']],['Every borrowed idea needs a citation.','每个借用的观点都需要引用。'],['The lecturer explained how to paraphrase safely.','讲师解释了如何安全地改写。'],['Use a reliable source for this claim.','为这个说法使用可靠来源。'],['Add a _____ at the end of the paragraph.','citation','在段落末尾加一个引用。'],[['citation','引用'],['source','来源'],['paraphrase','改写']],['项目延迟','城市拥堵','团队士气','供应商合同']],
  ['团队冲突','处理紧张关系并达成共识',[['mediate','调解'],['tension','紧张'],['consensus','共识']],['A neutral manager helped mediate the dispute.','一位中立经理帮助调解争端。'],['Tension increased when the deadline changed.','截止日期改变后紧张气氛加剧了。'],['We reached consensus after revising the plan.','修改计划后我们达成了共识。'],['They need to reach _____ before the meeting ends.','consensus','他们需要在会议结束前达成共识。'],[['mediate','调解'],['tension','紧张'],['consensus','共识']],['研究引用','工作效率','旅行保险','产品价格']],
  ['远程工作','描述灵活工作和效率',[['bandwidth','带宽'],['flexible','灵活的'],['productivity','生产力']],['Flexible hours improved her productivity.','灵活的工作时间提高了她的生产力。'],['The video call used too much bandwidth.','视频通话占用了太多带宽。'],['Please mute your microphone when listening.','听别人说话时请关闭麦克风。'],['A quiet room can increase _____.','productivity','安静的房间可以提高生产力。'],[['bandwidth','带宽'],['flexible','灵活的'],['productivity','生产力']],['学期考试','城市交通','酒店行程','医疗预约']],
  ['公众沟通','发布声明并澄清误会',[['statement','声明'],['clarify','澄清'],['rumor','传闻']],['The company released a statement.','公司发布了一份声明。'],['The spokesperson clarified the rumor.','发言人澄清了传闻。'],['We should respond with facts.','我们应该用事实回应。'],['The spokesperson tried to _____ the confusion.','clarify','发言人试图澄清混乱。'],[['statement','声明'],['clarify','澄清'],['rumor','传闻']],['项目里程碑','学校课程','银行收据','旅行路线']],
  ['环境行动','讨论节水、排放和可重复使用品',[['conserve','节约'],['emission','排放'],['reusable','可重复使用的']],['Reusable containers reduce waste.','可重复使用的容器能减少浪费。'],['The campaign encourages people to conserve water.','这项活动鼓励人们节约用水。'],['The factory must reduce its emissions.','工厂必须减少排放。'],['This policy aims to cut carbon _____.','emission','这项政策旨在减少碳排放。'],[['conserve','节约'],['emission','排放'],['reusable','可重复使用的']],['合同条款','新闻标题','学习反馈','机场行李']],
  ['创业基础','讨论产品、收入和竞争者',[['revenue','收入'],['launch','发布'],['competitor','竞争者']],['The startup launched a new service.','这家初创公司发布了新服务。'],['Revenue grew during the second quarter.','第二季度收入增长了。'],['We need to understand our competitors.','我们需要了解竞争者。'],['We studied each _____ before entering the market.','competitor','进入市场前我们研究了每个竞争者。'],[['revenue','收入'],['launch','发布'],['competitor','竞争者']],['文化差异','研究方法','家庭预算','城市政策']],
  ['数据分析','描述样本、平均值和趋势',[['sample','样本'],['average','平均值'],['trend','趋势']],['The sample was too small to support the conclusion.','样本太小，无法支持结论。'],['The graph shows a rising trend.','图表显示上升趋势。'],['Calculate the average before comparing groups.','比较组别前先计算平均值。'],['The results reveal a clear _____.','trend','结果显示了明显趋势。'],[['sample','样本'],['average','平均值'],['trend','趋势']],['合同让步','媒体传闻','旅行延误','团队反馈']],
  ['跨文化沟通','理解语气、习俗和手势',[['nuance','细微差别'],['custom','习俗'],['interpret','解释']],['The phrase has a different nuance in context.','这句话在语境中有不同的细微差别。'],['We should respect local customs.','我们应该尊重当地习俗。'],['Do not interpret silence too quickly.','不要过快解读沉默。'],['It is easy to _____ a gesture incorrectly.','interpret','手势很容易被错误解读。'],[['nuance','细微差别'],['custom','习俗'],['interpret','解释']],['项目预算','学术引文','数据隐私','公共交通']]
]);

addExpandedLessons('b2', [
  ['宏观经济','分析通胀、衰退和货币政策',[['inflation','通货膨胀'],['recession','经济衰退'],['monetary','货币的']],['Inflation reduced household purchasing power.','通货膨胀降低了家庭购买力。'],['The country entered a mild recession.','这个国家进入了温和衰退。'],['Monetary policy affects borrowing costs.','货币政策影响借贷成本。'],['The report examines the causes of _____.','inflation','报告分析通货膨胀的原因。'],[['inflation','通货膨胀'],['recession','经济衰退'],['monetary','货币的']],['算法透明','旅行路线','团队反馈','医疗预约']],
  ['气候适应','讨论韧性、适应和脆弱群体',[['resilience','韧性'],['adaptation','适应'],['vulnerable','脆弱的']],['Cities need adaptation plans for extreme heat.','城市需要极端高温适应计划。'],['Coastal communities are vulnerable to rising seas.','沿海社区容易受到海平面上升影响。'],['Resilience requires long-term investment.','韧性建设需要长期投资。'],['The program supports climate _____.','adaptation','这个项目支持气候适应。'],[['resilience','韧性'],['adaptation','适应'],['vulnerable','脆弱的']],['合同责任','学术引用','媒体叙事','供应链库存']],
  ['网络安全','保护账户、加密信息和验证身份',[['encrypt','加密'],['breach','漏洞事件'],['authenticate','验证身份']],['The service encrypts sensitive records.','这项服务会加密敏感记录。'],['A data breach exposed thousands of accounts.','一次数据泄露暴露了数千个账户。'],['Users must authenticate before access.','用户必须验证身份后才能访问。'],['Two-factor login helps prevent account _____.','breach','双重登录有助于防止账户泄露。'],[['encrypt','加密'],['breach','漏洞事件'],['authenticate','验证身份']],['城市密度','气候风险','合同条款','研究样本']],
  ['法律合同','理解管辖权、责任和合规',[['jurisdiction','管辖权'],['liable','负有责任的'],['comply','遵守']],['The contract specifies the governing jurisdiction.','合同规定了适用的管辖权。'],['The supplier may be liable for the damage.','供应商可能要对损失负责。'],['Both parties must comply with the agreement.','双方都必须遵守协议。'],['The company failed to _____ with the regulation.','comply','公司未能遵守规定。'],[['jurisdiction','管辖权'],['liable','负有责任的'],['comply','遵守']],['公众咨询','算法模型','气候变化','学术期刊']],
  ['医学研究','理解临床试验、安慰剂和诊断',[['clinical','临床的'],['placebo','安慰剂'],['diagnosis','诊断']],['The clinical trial included a control group.','临床试验包含一个对照组。'],['A placebo can affect how participants report symptoms.','安慰剂可能影响参与者报告症状的方式。'],['The doctor revised the diagnosis.','医生修订了诊断。'],['The scan helped confirm the _____.','diagnosis','扫描帮助确认了诊断。'],[['clinical','临床的'],['placebo','安慰剂'],['diagnosis','诊断']],['谈判让步','城市规划','数据加密','政策公平']],
  ['城市设计','讨论步行空间、密度和分区',[['pedestrian','行人的'],['density','密度'],['zoning','分区规划']],['The plan prioritizes pedestrian access.','这项计划优先考虑行人通行。'],['Higher density can reduce urban sprawl.','更高密度可以减少城市蔓延。'],['Zoning rules shape how land is used.','分区规则决定土地如何使用。'],['The new _____ allows mixed-use buildings.','zoning','新的分区规划允许混合用途建筑。'],[['pedestrian','行人的'],['density','密度'],['zoning','分区规划']],['网络漏洞','研究结论','合同责任','媒体偏见']],
  ['供应链','分析采购、物流和短缺',[['procurement','采购'],['logistics','物流'],['shortage','短缺']],['Procurement teams compared several suppliers.','采购团队比较了几家供应商。'],['A logistics problem delayed the shipment.','物流问题延误了货物。'],['The shortage pushed prices higher.','短缺推高了价格。'],['Better _____ can reduce delivery errors.','logistics','更好的物流可以减少交付错误。'],[['procurement','采购'],['logistics','物流'],['shortage','短缺']],['气候适应','隐私同意','学术方法','领导问责']],
  ['公共卫生','分析疫情、疫苗和预防',[['outbreak','疫情暴发'],['vaccination','疫苗接种'],['prevention','预防']],['Early prevention limited the outbreak.','早期预防限制了疫情暴发。'],['Vaccination rates increased after the campaign.','活动后疫苗接种率提高了。'],['Public health depends on clear information.','公共卫生依赖清晰的信息。'],['The report tracks the disease _____.','outbreak','报告追踪疾病暴发。'],[['outbreak','疫情暴发'],['vaccination','疫苗接种'],['prevention','预防']],['供应商合同','城市拥堵','研究假设','算法透明']],
  ['媒体叙事','分析叙事、框架和编辑议程',[['narrative','叙事'],['framing','框架'],['agenda','议程']],['The article uses a national security narrative.','文章采用国家安全叙事。'],['Framing can influence how readers judge an event.','框架会影响读者判断事件的方式。'],['Every outlet has an editorial agenda.','每家媒体都有编辑议程。'],['The headline changes the _____ of the story.','framing','标题改变了故事的框架。'],[['narrative','叙事'],['framing','框架'],['agenda','议程']],['临床诊断','供应链短缺','城市分区','合同管辖权']],
  ['学术发表','讨论手稿、修改和同行评审',[['peer-review','同行评审'],['revise','修改'],['manuscript','手稿']],['The manuscript was returned for revision.','手稿被退回修改。'],['The journal uses double-blind peer review.','这本期刊采用双盲同行评审。'],['Authors must respond to the reviewers.','作者必须回应评审者。'],['She submitted a revised _____.','manuscript','她提交了修改后的手稿。'],[['peer-review','同行评审'],['revise','修改'],['manuscript','手稿']],['公共卫生','气候韧性','媒体框架','法律责任']],
  ['生物伦理','讨论基因组、同意和疗法',[['genome','基因组'],['consent','同意'],['therapy','疗法']],['Researchers discussed consent before editing the genome.','研究者在编辑基因组前讨论了同意。'],['The therapy is still under investigation.','这种疗法仍在研究中。'],['Ethics committees review high-risk studies.','伦理委员会审查高风险研究。'],['The treatment may change a patient’s _____.','genome','治疗可能改变患者的基因组。'],[['genome','基因组'],['consent','同意'],['therapy','疗法']],['城市密度','数据加密','合同管辖权','媒体叙事']],
  ['地缘政治','理解外交、制裁和主权',[['diplomacy','外交'],['sanction','制裁'],['sovereignty','主权']],['Diplomacy helped prevent a wider conflict.','外交帮助避免了更大范围的冲突。'],['The government imposed sanctions after the invasion.','入侵后政府实施了制裁。'],['Sovereignty remains a central legal principle.','主权仍是核心法律原则。'],['The talks focused on national _____.','sovereignty','会谈聚焦于国家主权。'],[['diplomacy','外交'],['sanction','制裁'],['sovereignty','主权']],['临床试验','供应链物流','算法偏见','城市规划']]
]);

const furtherGrammar = {
  a1: [['classroom-language','imperatives'],['shopping-language','there-is-are'],['hotel-language','can-requests'],['weather-language','might-future'],['pets','frequency-adverbs'],['school-subjects','present-simple'],['safety-language','imperatives'],['feelings','past-simple']],
  a2: [['banking','quantifiers'],['film-review','past-simple'],['navigation','comparatives'],['work-schedules','time-expressions'],['celebrations','past-simple'],['health-advice','gerunds'],['household-finance','comparatives'],['appointments','future-plans']],
  b1: [['project-metrics','comparatives'],['business-negotiation','conditionals'],['user-research','reported-speech'],['workplace-culture','passive-voice'],['presentation-questions','modals'],['digital-literacy','imperatives'],['policy-debate','modals'],['nonprofit-projects','future-forms']],
  b2: [['energy-policy','passive-voice'],['labour-economics','comparatives'],['algorithmic-accountability','passive-voice'],['water-policy','modals'],['migration-policy','reported-speech'],['ethical-reasoning','modals'],['risk-modelling','conditionals'],['scientific-uncertainty','modals']]
};
function addFurtherLessons(level, rows) {
  rows.forEach((row, index) => lesson(level, ...row, furtherGrammar[level][index]));
}

addFurtherLessons('a1', [
  ['课堂用品','在课堂上请求和描述学习用品',[['ruler','尺子'],['eraser','橡皮'],['marker','马克笔']],['The teacher wrote a word on the board.','老师在黑板上写了一个词。'],['Please hand me the blue ruler.','请把蓝色尺子递给我。'],['I forgot my homework today.','我今天忘记带作业了。'],['Use an _____ to remove the pencil mark.','eraser','用橡皮擦掉铅笔印。'],[['ruler','尺子'],['eraser','橡皮'],['marker','马克笔']],['酒店房间','公交车费','天气预报','生日礼物']],
  ['杂货购物','在超市寻找商品并比较价格',[['basket','篮子'],['aisle','过道'],['price','价格']],['Where can I find the rice?','我在哪里能找到米？'],['The apples are cheaper this week.','苹果这周更便宜。'],['Do we need any milk?','我们需要牛奶吗？'],['The bread is in the next _____.','aisle','面包在下一个过道。'],[['basket','篮子'],['aisle','过道'],['price','价格']],['课程作业','机场登机口','银行账户','晚餐预约']],
  ['酒店入住','办理入住并询问酒店设施',[['lobby','大厅'],['keycard','房卡'],['elevator','电梯']],['We have a reservation under Chen.','我们有陈先生名下的预订。'],['Breakfast is served on the first floor.','早餐在一楼供应。'],['Could I have another towel?','可以再给我一条毛巾吗？'],['Please return the _____ at checkout.','keycard','退房时请归还房卡。'],[['lobby','大厅'],['keycard','房卡'],['elevator','电梯']],['公交路线','课堂笔记','药品剂量','周末计划']],
  ['周末天气','根据天气安排周末活动',[['sunny','晴朗的'],['windy','有风的'],['jacket','夹克']],['It might rain this afternoon.','今天下午可能下雨。'],['The beach is very windy today.','今天海边风很大。'],['Let us stay inside tonight.','今晚我们待在室内吧。'],['Take a _____ because it is cold.','jacket','天气冷，带一件夹克。'],[['sunny','晴朗的'],['windy','有风的'],['jacket','夹克']],['公交站台','房租收据','厨房食材','课堂考试']],
  ['宠物照顾','谈论喂养、遛宠物和看兽医',[['feed','喂养'],['leash','牵引绳'],['vet','兽医']],['Our dog needs a walk.','我们的狗需要散步。'],['The cat is sleeping by the window.','猫正在窗边睡觉。'],['Please feed the rabbit at six.','请六点喂兔子。'],['We take our puppy to the _____.','vet','我们带小狗去看兽医。'],[['feed','喂养'],['leash','牵引绳'],['vet','兽医']],['机场行李','家庭预算','天气温度','公交车票']],
  ['学校科目','谈论课程、考试和作业',[['science','科学'],['history','历史'],['homework','作业']],['Math is my favorite subject.','数学是我最喜欢的科目。'],['We have a science test tomorrow.','我们明天有科学考试。'],['I finished my homework early.','我提前完成了作业。'],['She is reading a book about _____.','history','她正在读一本关于历史的书。'],[['science','科学'],['history','历史'],['homework','作业']],['酒店设施','购物价格','晚餐口味','旅行目的地']],
  ['社区安全','表达安全、锁门和注意事项',[['safe','安全的'],['careful','小心的'],['lock','锁上']],['Please lock the door before leaving.','离开前请锁门。'],['The street is quiet at night.','这条街晚上很安静。'],['Be careful near the traffic.','在车流附近要小心。'],['This neighborhood feels very _____.','safe','这个社区让人感觉很安全。'],[['safe','安全的'],['careful','小心的'],['lock','锁上']],['课程安排','机场广播','购物折扣','健康建议']],
  ['简单感受','表达兴奋、担心和自豪',[['excited','兴奋的'],['worried','担心的'],['proud','自豪的']],['I am excited about the trip.','我对这次旅行感到兴奋。'],['He felt worried before the exam.','考试前他感到担心。'],['You should be proud of yourself.','你应该为自己感到自豪。'],['She was _____ when she won.','proud','她获胜时感到很自豪。'],[['excited','兴奋的'],['worried','担心的'],['proud','自豪的']],['房间钥匙','城市地图','火车延误','生日邀请']]
]);

addFurtherLessons('a2', [
  ['银行转账','描述余额、转账和费用',[['transfer','转账'],['balance','余额'],['fee','费用']],['I checked my balance online.','我在线查看了余额。'],['The bank charges a small transfer fee.','银行收取少量转账费。'],['Could you send the money today?','你今天能把钱转过来吗？'],['There is no extra _____ for this service.','fee','这项服务没有额外费用。'],[['transfer','转账'],['balance','余额'],['fee','费用']],['电影情节','学校学期','公交路线','医院预约']],
  ['电影评论','描述情节、演员和观后感',[['plot','情节'],['actor','演员'],['review','评论']],['The film has a surprising plot.','这部电影有令人意外的情节。'],['The lead actor won an award.','主演获得了奖项。'],['I would recommend this movie.','我会推荐这部电影。'],['I read a positive _____ before watching it.','review','观看前我读了一篇好评。'],[['plot','情节'],['actor','演员'],['review','评论']],['工作邮件','租房合同','天气预报','学习策略']],
  ['出行应用','使用地图、附近地点和路线',[['map','地图'],['nearby','附近的'],['route','路线']],['The app shows nearby restaurants.','应用显示附近的餐厅。'],['The map is not loading properly.','地图没有正常加载。'],['Which route is faster?','哪条路线更快？'],['Use the _____ to find the station.','map','用地图找车站。'],[['map','地图'],['nearby','附近的'],['route','路线']],['购物收据','机场登机口','团队反馈','生日礼物']],
  ['工作班次','讨论排班、加班和休息',[['roster','值班表'],['overtime','加班'],['break','休息']],['My shift begins at noon.','我的班次中午开始。'],['Staff must record all overtime.','员工必须记录所有加班。'],['When is your lunch break?','你的午休是什么时候？'],['Check the weekly _____ online.','roster','在线查看每周值班表。'],[['roster','值班表'],['overtime','加班'],['break','休息']],['旅行行程','医疗预约','课程成绩','银行账户']],
  ['节日筹备','准备装饰、宾客和传统活动',[['decorate','装饰'],['guest','宾客'],['tradition','传统']],['We decorated the hall with flowers.','我们用鲜花装饰大厅。'],['Every guest received a small gift.','每位宾客都收到了一份小礼物。'],['Which tradition does your family follow?','你的家人遵循什么传统？'],['We invited twenty _____.','guest','我们邀请了二十位宾客。'],[['decorate','装饰'],['guest','宾客'],['tradition','传统']],['项目预算','公交车费','药品剂量','新闻标题']],
  ['健康饮食','谈论分量、营养和饮食习惯',[['portion','分量'],['nutritious','有营养的'],['avoid','避免']],['A balanced portion can be satisfying.','均衡的分量可以让人满足。'],['The doctor advised him to avoid sugary drinks.','医生建议他避免含糖饮料。'],['Fresh vegetables are nutritious.','新鲜蔬菜很有营养。'],['Try to _____ eating too quickly.','avoid','尽量避免吃得太快。'],[['portion','分量'],['nutritious','有营养的'],['avoid','避免']],['酒店预订','工作班次','城市地图','课堂考试']],
  ['家庭预算','讨论水电费和家庭开支',[['utility','公共事业费'],['household','家庭的'],['plan','计划']],['We planned our household budget together.','我们一起制定了家庭预算。'],['The utility bill arrived yesterday.','水电费账单昨天到了。'],['Let us compare our monthly costs.','我们比较一下每月开支吧。'],['Electricity is a regular household _____.','expense','电费是家庭固定支出。'],[['utility','公共事业费'],['household','家庭的'],['plan','计划']],['旅行目的地','电影评论','学校科目','医院处方']],
  ['预约改期','改期、确认并表达可用时间',[['reschedule','改期'],['available','有空的'],['confirm','确认']],['Could we reschedule the appointment?','我们可以改期吗？'],['She is available on Thursday morning.','她周四上午有空。'],['Please confirm the new time.','请确认新的时间。'],['I need to _____ my dentist visit.','reschedule','我需要改期看牙。'],[['reschedule','改期'],['available','有空的'],['confirm','确认']],['银行余额','会议议程','公交路线','购物折扣']]
]);

addFurtherLessons('b1', [
  ['项目指标','比较指标、目标和结果',[['metric','指标'],['target','目标'],['outcome','结果']],['The team exceeded its quarterly target.','团队超过了季度目标。'],['We measured the outcome after six weeks.','六周后我们测量了结果。'],['Which metric matters most here?','这里哪项指标最重要？'],['The report compares each _____.','metric','报告比较了每项指标。'],[['metric','指标'],['target','目标'],['outcome','结果']],['研究引用','团队士气','旅行保险','城市政策']],
  ['商务谈判','提出方案、协商和合同条款',[['proposal','提案'],['negotiate','协商'],['term','条款']],['They revised the proposal overnight.','他们连夜修改了提案。'],['Both sides negotiated a longer contract term.','双方协商了更长的合同期限。'],['Let us discuss the payment terms.','我们讨论付款条款吧。'],['The final _____ was signed yesterday.','proposal','最终提案昨天签署了。'],[['proposal','提案'],['negotiate','协商'],['term','条款']],['面试资格','媒体框架','环境排放','数据样本']],
  ['用户研究','通过调查获得洞察',[['survey','调查'],['respondent','受访者'],['insight','洞察']],['The survey collected useful insights.','调查收集了有用的洞察。'],['Each respondent answered ten questions.','每位受访者回答了十个问题。'],['We should test this assumption.','我们应该测试这个假设。'],['The interviews produced a valuable _____.','insight','访谈产生了有价值的洞察。'],[['survey','调查'],['respondent','受访者'],['insight','洞察']],['项目延迟','合同责任','学习反馈','旅行行程']],
  ['工作文化','讨论包容、反馈和归属感',[['inclusive','包容的'],['feedback','反馈'],['belonging','归属感']],['An inclusive workplace welcomes different perspectives.','包容的工作场所欢迎不同观点。'],['Regular feedback improved team trust.','定期反馈提升了团队信任。'],['Everyone deserves a sense of belonging.','每个人都应有归属感。'],['The policy promotes _____ hiring.','inclusive','这项政策促进包容性招聘。'],[['inclusive','包容的'],['feedback','反馈'],['belonging','归属感']],['银行转账','研究方法','城市拥堵','会议议程']],
  ['演讲问答','回应澄清、追问和挑战',[['clarify','澄清'],['follow-up','追问'],['challenge','挑战']],['The researcher clarified her main claim.','研究者澄清了她的主要观点。'],['A follow-up question revealed a weakness.','一个追问揭示了一个弱点。'],['How would you answer that challenge?','你会如何回答那个挑战？'],['The audience asked me to _____ the result.','clarify','听众要求我澄清结果。'],[['clarify','澄清'],['follow-up','追问'],['challenge','挑战']],['产品收入','文化习俗','租房维修','天气预报']],
  ['数字素养','验证信息、来源和隐私设置',[['privacy','隐私'],['credible','可信的'],['verify','核实']],['Readers should verify online information.','读者应该核实网上信息。'],['The article cites a credible source.','这篇文章引用了可信来源。'],['Check your privacy settings regularly.','定期检查你的隐私设置。'],['Always _____ a surprising statistic.','verify','总要核实令人惊讶的统计数字。'],[['privacy','隐私'],['credible','可信的'],['verify','核实']],['项目里程碑','旅行保险','工作班次','学术引文']],
  ['政策辩论','讨论证据、权衡和执行',[['evidence','证据'],['trade-off','权衡'],['implement','执行']],['The proposal involves a difficult trade-off.','这项提案涉及艰难的权衡。'],['Officials will implement the policy next year.','官员明年将执行这项政策。'],['What evidence supports this claim?','什么证据支持这个说法？'],['The committee must _____ the plan carefully.','implement','委员会必须谨慎执行计划。'],[['evidence','证据'],['trade-off','权衡'],['implement','执行']],['数据隐私','团队冲突','医疗诊断','供应链风险']],
  ['公益项目','说明资助、影响和合作伙伴',[['grant','资助'],['impact','影响'],['partner','合作伙伴']],['The project received a small grant.','这个项目获得了一笔小额资助。'],['Partners measured the program’s impact.','合作伙伴测量了项目的影响。'],['We need a reliable local partner.','我们需要可靠的本地合作伙伴。'],['The grant will fund a high-impact _____.','project','这笔资助将支持高影响力项目。'],[['grant','资助'],['impact','影响'],['partner','合作伙伴']],['合同条款','新闻来源','学习策略','城市交通']]
]);

addFurtherLessons('b2', [
  ['能源转型','分析可再生能源、电网和脱碳',[['renewable','可再生的'],['grid','电网'],['decarbonize','脱碳']],['Renewable power is expanding rapidly.','可再生能源正在快速发展。'],['The national grid needs major upgrades.','国家电网需要重大升级。'],['Companies must decarbonize heavy industry.','企业必须让重工业脱碳。'],['The plan invests in _____ energy.','renewable','这项计划投资可再生能源。'],[['renewable','可再生的'],['grid','电网'],['decarbonize','脱碳']],['合同管辖权','媒体叙事','医学诊断','城市密度']],
  ['劳动经济','讨论工资、不平等和生产率',[['wage','工资'],['inequality','不平等'],['productivity','生产率']],['Higher wages can reduce inequality.','更高工资可以减少不平等。'],['Productivity rose after the training program.','培训项目后生产率提高了。'],['The report examines changes in real wages.','报告分析实际工资的变化。'],['The policy targets income _____.','inequality','这项政策针对收入不平等。'],[['wage','工资'],['inequality','不平等'],['productivity','生产率']],['气候风险','隐私同意','供应链物流','学术引用']],
  ['算法问责','评估审计、可解释性和监督',[['audit','审计'],['explainability','可解释性'],['oversight','监督']],['Independent audits can reveal hidden bias.','独立审计可以揭示隐藏偏见。'],['Explainability is essential in high-stakes decisions.','高风险决策需要可解释性。'],['Oversight should continue after deployment.','部署后仍应继续监督。'],['The system requires human _____.','oversight','这个系统需要人工监督。'],[['audit','审计'],['explainability','可解释性'],['oversight','监督']],['城市规划','公共卫生','法律合同','能源政策']],
  ['水资源','分析短缺、含水层和分配',[['scarcity','短缺'],['aquifer','含水层'],['allocation','分配']],['Water scarcity threatens agricultural communities.','水资源短缺威胁农业社区。'],['The aquifer has declined for three consecutive years.','含水层连续三年下降。'],['Fair allocation requires reliable data.','公平分配需要可靠数据。'],['The city must manage groundwater _____.','allocation','城市必须管理地下水分配。'],[['scarcity','短缺'],['aquifer','含水层'],['allocation','分配']],['临床试验','媒体框架','合同责任','城市拥堵']],
  ['移民政策','讨论庇护、融合和流离失所',[['asylum','庇护'],['integration','融合'],['displacement','流离失所']],['Integration programs support new arrivals.','融合项目支持新到者。'],['The report documents forced displacement.','报告记录了被迫流离失所。'],['Applicants may request asylum at the border.','申请人可以在边境申请庇护。'],['The crisis created large-scale _____.','displacement','危机造成了大规模流离失所。'],[['asylum','庇护'],['integration','融合'],['displacement','流离失所']],['供应链短缺','算法透明','研究方法','城市分区']],
  ['哲学伦理','讨论自主、尊严和道德困境',[['autonomy','自主权'],['dignity','尊严'],['dilemma','困境']],['The case raises a difficult ethical dilemma.','这个案例提出了艰难的伦理困境。'],['Respect for autonomy guides the decision.','对自主权的尊重指导这项决定。'],['Every patient deserves dignity.','每位患者都应有尊严。'],['The committee debated the moral _____.','dilemma','委员会讨论了道德困境。'],[['autonomy','自主权'],['dignity','尊严'],['dilemma','困境']],['合同条款','气候适应','媒体叙事','供应商风险']],
  ['风险建模','比较情景、可能性和暴露度',[['scenario','情景'],['likelihood','可能性'],['exposure','暴露度']],['The model compares several scenarios.','模型比较了几种情景。'],['Analysts estimated the likelihood of failure.','分析师估计了失败的可能性。'],['Exposure increased after the controls were removed.','控制措施取消后暴露度提高了。'],['The assessment measures financial _____.','exposure','评估衡量金融暴露度。'],[['scenario','情景'],['likelihood','可能性'],['exposure','暴露度']],['公共卫生','法律管辖权','能源转型','媒体偏见']],
  ['科学不确定','理解不确定性、复现和稳健方法',[['uncertainty','不确定性'],['replicate','复现'],['robust','稳健的']],['The conclusion should reflect scientific uncertainty.','结论应反映科学不确定性。'],['Other teams could not replicate the result.','其他团队无法复现这个结果。'],['A robust method reduces measurement error.','稳健的方法能减少测量误差。'],['The finding needs independent _____.','replication','这个发现需要独立复现。'],[['uncertainty','不确定性'],['replicate','复现'],['robust','稳健的']],['研究手稿','城市人口','供应链物流','合同责任']]
]);

const finalGrammar = {
  a1: [['postal-services','imperatives'],['library-language','can-requests'],['travel-timetables','future-forms'],['laundry','imperatives'],['future-plans','time-expressions'],['school-food','countable-nouns'],['colours-shapes','adjectives'],['health-symptoms','should-advice']],
  a2: [['travel-insurance','past-simple'],['housing','past-simple'],['customer-service','can-requests'],['online-learning','deadlines'],['photography','can-requests'],['public-events','past-simple'],['work-deadlines','modal-verbs'],['volunteering','past-simple']],
  b1: [['leadership','modals'],['data-visualisation','present-simple'],['quality-control','passive-voice'],['career-goals','infinitives'],['meeting-facilitation','modals'],['budget-forecasting','future-forms'],['community-surveys','reported-speech'],['translation','context-clauses']],
  b2: [['ai-governance','passive-voice'],['fiscal-policy','conditionals'],['biodiversity','passive-voice'],['constitutional-law','reported-speech'],['epidemiology','modals'],['behavioural-economics','conditionals'],['philosophy-of-language','ambiguity'],['space-policy','future-forms']]
};
function addFinalLessons(level, rows) {
  rows.forEach((row, index) => lesson(level, ...row, finalGrammar[level][index]));
}

addFinalLessons('a1', [
  ['邮局寄件','寄信、贴邮票并填写地址',[['envelope','信封'],['stamp','邮票'],['address','地址']],['I need to send this letter.','我需要寄这封信。'],['The post office closes at five.','邮局五点关门。'],['Could you write the address here?','你能把地址写在这里吗？'],['Put a _____ on the envelope.','stamp','在信封上贴一张邮票。'],[['envelope','信封'],['stamp','邮票'],['address','地址']],['酒店房卡','课堂作业','公交车费','晚餐菜单']],
  ['图书馆','借书、保持安静并按时归还',[['borrow','借用'],['quiet','安静的'],['return','归还']],['Can I borrow this book?','我可以借这本书吗？'],['Please keep your voice quiet.','请保持安静。'],['The books are due next Monday.','这些书下周一到期。'],['Please _____ the book on time.','return','请按时归还书。'],[['borrow','借用'],['quiet','安静的'],['return','归还']],['车站月台','天气温度','生日邀请','厨房食材']],
  ['火车站','询问月台、出发和到达',[['platform','月台'],['departure','出发'],['arrive','到达']],['Which platform does the train leave from?','火车从哪个月台出发？'],['The departure time has changed.','出发时间变了。'],['We arrived at the station early.','我们提前到了车站。'],['The train will _____ at noon.','arrive','火车中午到达。'],[['platform','月台'],['departure','出发'],['arrive','到达']],['酒店大厅','学校课程','公交路线','旅行行李']],
  ['洗衣房','使用洗衣机、洗涤剂和烘干功能',[['washing-machine','洗衣机'],['detergent','洗涤剂'],['dry','烘干']],['The washing machine is full.','洗衣机满了。'],['Use a little detergent.','用一点洗涤剂。'],['Hang the clothes outside to dry.','把衣服挂在外面晾干。'],['These clothes are ready to _____.','dry','这些衣服可以烘干了。'],[['washing-machine','洗衣机'],['detergent','洗涤剂'],['dry','烘干']],['银行账户','晚餐预约','机场登机','房间钥匙']],
  ['简单计划','表达很快、稍后和制定计划',[['plan','计划'],['soon','很快'],['later','稍后']],['I will call you later.','我稍后给你打电话。'],['We are leaving soon.','我们很快要出发了。'],['Let us make a plan.','我们制定一个计划吧。'],['See you _____ after lunch.','later','午饭后见。'],[['plan','计划'],['soon','很快'],['later','稍后']],['公交车费','天气预报','课程作业','生日蛋糕']],
  ['学校午餐','谈论菜单、蔬菜和午餐',[['lunch','午餐'],['menu','菜单'],['vegetable','蔬菜']],['The school menu changes every day.','学校菜单每天变化。'],['Would you like some vegetables?','你想吃点蔬菜吗？'],['I packed lunch this morning.','我今天早上带了午餐。'],['Soup is on the _____ today.','menu','今天菜单上有汤。'],[['lunch','午餐'],['menu','菜单'],['vegetable','蔬菜']],['火车月台','家居清洁','手机联系','银行收据']],
  ['颜色形状','描述形状、颜色和物品',[['round','圆的'],['bright','明亮的'],['blue','蓝色的']],['The round box is on the table.','圆盒子在桌上。'],['She chose a bright yellow bag.','她选了一个亮黄色的包。'],['My favorite color is blue.','我最喜欢的颜色是蓝色。'],['The small ball is perfectly _____.','round','小球是完美的圆形。'],[['round','圆的'],['bright','明亮的'],['blue','蓝色的']],['公交路线','医院预约','工作会议','天气警报']],
  ['常见症状','描述咳嗽、发烧和喉咙痛',[['cough','咳嗽'],['fever','发烧'],['sore','疼痛的']],['I have a sore throat.','我喉咙痛。'],['The child has a slight fever.','孩子有点发烧。'],['You should rest and drink water.','你应该休息并喝水。'],['He has a bad _____.','cough','他咳嗽得很厉害。'],[['cough','咳嗽'],['fever','发烧'],['sore','疼痛的']],['旅行目的地','课堂笔记','房租合同','生日聚会']]
]);

addFinalLessons('a2', [
  ['旅行保险','处理保险、索赔和遗失行李',[['insurance','保险'],['claim','索赔'],['lost','遗失的']],['Travel insurance covered the cancelled flight.','旅行保险赔付了取消的航班。'],['Keep the receipt for your claim.','保留收据用于索赔。'],['My luggage was lost yesterday.','我的行李昨天丢失了。'],['We bought travel _____ before leaving.','insurance','出发前我们买了旅行保险。'],[['insurance','保险'],['claim','索赔'],['lost','遗失的']],['工作邮件','社区服务','课程成绩','城市地图']],
  ['看房','看公寓并讨论租客责任',[['apartment','公寓'],['viewing','看房'],['tenant','租客']],['We arranged an apartment viewing.','我们安排了看公寓。'],['The tenant pays rent on the first.','租客在一号交房租。'],['Is the kitchen included in the rent?','厨房包含在租金里吗？'],['The _____ signed a one-year lease.','tenant','租客签了一年租约。'],[['apartment','公寓'],['viewing','看房'],['tenant','租客']],['医院症状','公交路线','电影情节','学习计划']],
  ['客服沟通','提出投诉并解决售后问题',[['complaint','投诉'],['agent','客服人员'],['resolve','解决']],['The customer service agent was helpful.','客服人员很有帮助。'],['We filed a complaint online.','我们在线提交了投诉。'],['Could you resolve this issue today?','你今天能解决这个问题吗？'],['The _____ offered a replacement.','agent','客服人员提供了替换品。'],[['complaint','投诉'],['agent','客服人员'],['resolve','解决']],['银行转账','工作班次','酒店预订','天气预报']],
  ['在线学习','完成模块、小测和截止日期',[['module','模块'],['quiz','小测'],['deadline','截止日期']],['This online module takes two hours.','这个在线模块需要两小时。'],['The quiz opens after the lesson.','课程后会开放小测。'],['I submitted the assignment before the deadline.','我在截止日期前交了作业。'],['The final _____ is next Friday.','deadline','最终截止日期是下周五。'],[['module','模块'],['quiz','小测'],['deadline','截止日期']],['旅行保险','购物退换','社区活动','房屋维修']],
  ['摄影兴趣','描述肖像、焦点和阴影',[['portrait','肖像'],['focus','焦点'],['shadow','阴影']],['The portrait was taken in natural light.','这幅肖像是在自然光下拍的。'],['Adjust the focus before pressing the button.','按按钮前调整焦点。'],['The shadow makes the image dramatic.','阴影让画面更有戏剧性。'],['The camera cannot _____ in the dark.','focus','相机在黑暗中无法对焦。'],[['portrait','肖像'],['focus','焦点'],['shadow','阴影']],['工作邮件','家庭预算','公共交通','药品说明']],
  ['公共活动','参加节日、面对人群和入口',[['festival','节日'],['crowd','人群'],['entrance','入口']],['The festival attracts visitors from nearby towns.','这个节日吸引附近城镇的游客。'],['A large crowd gathered at the entrance.','入口聚集了很多人。'],['We bought tickets in advance.','我们提前买了票。'],['The main _____ opens at six.','entrance','主入口六点开放。'],[['festival','节日'],['crowd','人群'],['entrance','入口']],['团队会议','城市地图','租房合同','健康建议']],
  ['工作截止','处理完成、修改和紧急任务',[['complete','完成'],['revise','修改'],['urgent','紧急的']],['I need to complete the report today.','我今天需要完成报告。'],['The manager marked the request as urgent.','经理把请求标为紧急。'],['Could you revise this paragraph?','你能修改这段吗？'],['The task is _____ because the client is waiting.','urgent','客户在等，所以任务很紧急。'],[['complete','完成'],['revise','修改'],['urgent','紧急的']],['旅行行程','银行余额','电影评论','社区服务']],
  ['周末志愿','参加公益、组织活动和服务社区',[['organize','组织'],['charity','慈善机构'],['community','社区']],['Our group organizes meals for the community.','我们小组为社区组织餐食。'],['The charity needs more volunteers.','慈善机构需要更多志愿者。'],['We cleaned the park on Saturday.','我们周六清理了公园。'],['The event raised money for a local _____.','charity','活动为当地慈善机构筹款。'],[['organize','组织'],['charity','慈善机构'],['community','社区']],['工作邮件','出行规划','医疗预约','购物折扣']]
]);

addFinalLessons('b1', [
  ['领导授权','讨论分工、导师和责任感',[['assign','分配'],['mentor','导师'],['ownership','责任感']],['Good leaders assign tasks clearly.','优秀领导者会清晰分配任务。'],['The mentor helped her take ownership.','导师帮助她承担责任。'],['Who will lead the next phase?','谁来领导下一阶段？'],['Managers should _____ routine work.','assign','管理者应该分配日常工作。'],[['assign','分配'],['mentor','导师'],['ownership','责任感']],['数据隐私','项目风险','面试资格','媒体来源']],
  ['数据可视化','阅读仪表盘、图表和洞察',[['dashboard','仪表盘'],['chart','图表'],['insight','洞察']],['The dashboard displays weekly sales.','仪表盘显示每周销售额。'],['The chart reveals a seasonal pattern.','图表揭示季节性规律。'],['A clear graph can support the argument.','清晰的图表可以支持论点。'],['The analysis produced a useful _____.','insight','分析产生了有用的洞察。'],[['dashboard','仪表盘'],['chart','图表'],['insight','洞察']],['文化礼仪','合同条款','公共卫生','旅行行程']],
  ['质量控制','检查缺陷、标准和设备',[['defect','缺陷'],['inspect','检查'],['standard','标准']],['The inspector found a small defect.','检查员发现了一个小缺陷。'],['Every batch must meet the same standard.','每批产品必须符合相同标准。'],['We inspect the equipment every month.','我们每月检查设备。'],['The factory will _____ each item.','inspect','工厂会检查每件物品。'],[['defect','缺陷'],['inspect','检查'],['standard','标准']],['研究方法','工作文化','供应链短缺','城市规划']],
  ['职业目标','表达抱负、技能和导师帮助',[['ambition','抱负'],['skill','技能'],['mentor','导师']],['Her ambition is to lead a research team.','她的抱负是领导研究团队。'],['A mentor helped him identify a new skill.','导师帮助他发现了新技能。'],['I want to develop stronger writing skills.','我想培养更强的写作技能。'],['The course supports my career _____.','ambition','这门课程支持我的职业抱负。'],[['ambition','抱负'],['skill','技能'],['mentor','导师']],['项目指标','公共活动','工作班次','电影评论']],
  ['会议引导','主持讨论、议程和行动点',[['facilitate','促进'],['agenda','议程'],['action','行动']],['She facilitated a difficult meeting.','她主持了一场困难的会议。'],['The agenda left time for questions.','议程留出了提问时间。'],['Let us record the action points.','我们记录行动点吧。'],['A good chair can _____ discussion.','facilitate','好的主持人可以促进讨论。'],[['facilitate','促进'],['agenda','议程'],['action','行动']],['数据分析','团队冲突','能源政策','学习计划']],
  ['预算预测','分析预测、收入和成本',[['forecast','预测'],['revenue','收入'],['cost','成本']],['The forecast assumes steady growth.','预测假设稳定增长。'],['Revenue rose while costs remained stable.','收入上升，而成本保持稳定。'],['We need to review next year’s budget.','我们需要审查明年的预算。'],['The finance team updated its sales _____.','forecast','财务团队更新了销售预测。'],[['forecast','预测'],['revenue','收入'],['cost','成本']],['用户研究','环境行动','项目时间','银行转账']],
  ['社区调查','收集居民意见和关注点',[['resident','居民'],['respond','回应'],['concern','关注点']],['Residents raised concerns about traffic.','居民提出了对交通的担忧。'],['Most respondents supported the proposal.','大多数受访者支持提案。'],['The survey captured local opinions.','调查收集了当地意见。'],['The council listened to every _____.','resident','委员会听取了每位居民的意见。'],[['resident','居民'],['respond','回应'],['concern','关注点']],['政策辩论','城市设计','工作文化','研究假设']],
  ['翻译细微差别','理解直译、语境和对应表达',[['literal','字面上的'],['context','语境'],['equivalent','对应的']],['A literal translation can sound unnatural.','字面翻译听起来可能不自然。'],['Context determines the meaning of the phrase.','语境决定短语的含义。'],['Find an equivalent expression in English.','找一个对应的英文表达。'],['The translator checked the _____ carefully.','context','译者仔细检查了语境。'],[['literal','字面上的'],['context','语境'],['equivalent','对应的']],['公共卫生','合同责任','媒体叙事','旅行保险']]
]);

addFinalLessons('b2', [
  ['人工智能治理','讨论治理、部署和监管',[['governance','治理'],['deploy','部署'],['regulatory','监管的']],['AI governance requires clear accountability.','人工智能治理需要明确问责。'],['The system was deployed after a safety review.','系统通过安全审查后才部署。'],['Regulatory standards are still evolving.','监管标准仍在发展。'],['The company delayed the _____ of the model.','deployment','公司推迟了模型部署。'],[['governance','治理'],['deploy','部署'],['regulatory','监管的']],['网络安全','城市政策','学术发表','公共卫生']],
  ['财政政策','分析财政、补贴和赤字',[['fiscal','财政的'],['subsidy','补贴'],['deficit','赤字']],['Fiscal policy can stimulate demand.','财政政策可以刺激需求。'],['The subsidy supports low-income households.','补贴支持低收入家庭。'],['The government reduced its budget deficit.','政府减少了预算赤字。'],['A targeted _____ can change consumer behavior.','subsidy','有针对性的补贴可以改变消费行为。'],[['fiscal','财政的'],['subsidy','补贴'],['deficit','赤字']],['能源转型','移民政策','合同条款','医学研究']],
  ['生物多样性','讨论栖息地、保护和濒危物种',[['biodiversity','生物多样性'],['habitat','栖息地'],['conservation','保护']],['Biodiversity declines when habitats disappear.','栖息地消失时生物多样性会下降。'],['Conservation protects endangered species.','保护行动维护濒危物种。'],['The project restored a wetland habitat.','这个项目修复了湿地栖息地。'],['The reserve supports wildlife _____.','conservation','保护区支持野生动物保护。'],[['biodiversity','生物多样性'],['habitat','栖息地'],['conservation','保护']],['水资源','气候适应','城市设计','科学方法']],
  ['宪法法律','讨论修正案、法院和公民权利',[['amendment','修正案'],['court','法院'],['civil','公民的']],['The court reviewed the constitutional amendment.','法院审查了宪法修正案。'],['Civil rights apply to every citizen.','公民权利适用于每位公民。'],['The ruling changed how the law is interpreted.','裁决改变了法律解释方式。'],['The case raised a serious _____ question.','constitutional','这个案件提出了严重的宪法问题。'],[['amendment','修正案'],['court','法院'],['civil','公民的']],['地缘政治','数据隐私','公共卫生','研究论证']],
  ['流行病学','分析流行率、传播和干预',[['prevalence','流行率'],['transmission','传播'],['intervention','干预']],['The study estimated disease prevalence.','研究估算了疾病流行率。'],['Masks reduced transmission in crowded spaces.','口罩降低了拥挤空间中的传播。'],['Early intervention can save lives.','早期干预可以挽救生命。'],['The model predicts future _____.','transmission','模型预测未来传播。'],[['prevalence','流行率'],['transmission','传播'],['intervention','干预']],['医学诊断','气候风险','供应链物流','媒体框架']],
  ['行为经济','讨论激励、偏见和决策',[['incentive','激励'],['bias','偏见'],['decision','决策']],['An incentive can change consumer behavior.','激励可以改变消费者行为。'],['The experiment revealed a strong bias.','实验揭示了强烈偏见。'],['People do not always make rational decisions.','人们并不总是做出理性决策。'],['The policy addresses a common cognitive _____.','bias','这项政策处理常见的认知偏见。'],[['incentive','激励'],['bias','偏见'],['decision','决策']],['财政政策','算法问责','城市规划','学术引用']],
  ['语言哲学','分析意义、指称和歧义',[['meaning','意义'],['reference','指称'],['ambiguity','歧义']],['Meaning depends partly on social context.','意义部分取决于社会语境。'],['The term has more than one possible reference.','这个术语有不止一个可能指称。'],['Ambiguity can create legal disputes.','歧义可能造成法律争议。'],['The sentence contains structural _____.','ambiguity','这个句子包含结构歧义。'],[['meaning','意义'],['reference','指称'],['ambiguity','歧义']],['合同责任','媒体叙事','翻译方法','科学研究']],
  ['太空政策','讨论轨道、任务和国际合作',[['orbit','轨道'],['mission','任务'],['cooperate','合作']],['The mission will study the lunar surface.','这项任务将研究月球表面。'],['Several countries agreed to cooperate in orbit.','几个国家同意在轨道上合作。'],['Space policy affects scientific research.','太空政策影响科学研究。'],['The satellite entered a stable _____.','orbit','卫星进入稳定轨道。'],[['orbit','轨道'],['mission','任务'],['cooperate','合作']],['能源电网','移民融合','城市密度','网络安全']]
]);

// The second authored pack is loaded both by Node tests and by the WebView.
// Existing lesson IDs remain untouched; these seeds become units 37–72.
const coursePack2 = typeof module !== 'undefined' && module.exports
  ? require('./course-pack-2.js')
  : (typeof window !== 'undefined' && Array.isArray(window.lumiCoursePack2) ? window.lumiCoursePack2 : []);
seeds.push(...coursePack2);
const authoredBlocks = typeof module !== 'undefined' && module.exports
  ? require('../../../../course-data/authored-blocks.json')
  : (typeof window !== 'undefined' ? (window.lumiAuthoredBlocks || {}) : {});

const levels = [
  {id:'a1',cefr:'A1',title:'启航基础',subtitle:'基础生存英语 · 从真实日常开始',color:'mint',art:'🌅',difficulty:1,questionCount:10,recommendedFor:['零基础','初中英语']},
  {id:'a2',cefr:'A2',title:'日常交流',subtitle:'描述生活 · 讲述经历 · 处理实际问题',color:'purple',art:'🌿',difficulty:2,questionCount:10,recommendedFor:['初中英语','高中英语']},
  {id:'b1',cefr:'B1',title:'独立沟通',subtitle:'旅行、学习和工作中的自然表达',color:'coral',art:'🧭',difficulty:3,questionCount:10,recommendedFor:['高中英语','大学英语']},
  {id:'b2',cefr:'B2',title:'复杂表达',subtitle:'处理抽象话题 · 工作协作 · 表达观点',color:'purple',art:'✈️',difficulty:4,questionCount:10,recommendedFor:['大学英语四级','大学英语六级','雅思托福']}
];
// Keep answer choices deterministic and unique.  Some authored seeds reuse a
// word in the vocabulary and pair lists, so de-duplicate before taking the
// three distractors.  The correct answer always remains the first choice.
const optionSet = (correct, extras = []) => {
  const seen = new Set();
  const choices = [];
  for (const item of [correct, ...extras]) {
    if (item == null || seen.has(item)) continue;
    seen.add(item);
    choices.push(item);
    if (choices.length === 4) break;
  }
  return choices;
};
// Sentence choices should stay in the same situation and grammatical frame.
// Using nearby authored translations keeps the options plausible instead of
// exposing the answer through an unrelated topic label.
const sentenceOptionSet = (correct, seed, extras = []) => optionSet(correct, [
  ...(Array.isArray(seed.sentencePool) ? seed.sentencePool : []),
  seed.choice && seed.choice[1],
  seed.listen && seed.listen[1],
  seed.order && seed.order[1],
  ...extras,
]);
const fillFallbacks = ['schedule', 'meeting', 'station', 'weather', 'water', 'ticket', 'recipe', 'office', 'message', 'travel'];
const pairFallbacks = {
  a1: [['phone','手机'],['table','桌子'],['ticket','票'],['room','房间'],['school','学校'],['water','水'],['food','食物'],['friend','朋友'],['door','门'],['street','街道']],
  a2: [['appointment','预约'],['receipt','收据'],['schedule','日程'],['customer','顾客'],['address','地址'],['service','服务'],['message','消息'],['change','变化'],['payment','付款'],['plan','计划']],
  b1: [['proposal','提案'],['evidence','证据'],['deadline','截止日期'],['feedback','反馈'],['source','来源'],['priority','优先事项'],['outcome','结果'],['challenge','挑战'],['benefit','益处'],['approach','方法']],
  b2: [['accountability','问责'],['regulation','监管'],['hypothesis','假设'],['framework','框架'],['allocation','分配'],['vulnerability','漏洞'],['inequality','不平等'],['interpretation','解释'],['intervention','干预'],['sustainability','可持续性']],
};
// Global Chinese-meaning distractor bank for word questions.
// Replaces the old authored Chinese-phrase distractors (e.g. '周末计划')
// which were semantically unrelated and trivially eliminable. Each entry
// is a common word meaning that could plausibly be confused with the target.
const wordMeaningBank = [
  '时间','地点','人物','事情','问题','答案','方法','原因','结果','过程',
  '开始','结束','继续','停止','改变','保持','增加','减少','提高','降低',
  '重要','困难','容易','简单','复杂','清楚','模糊','正确','错误','真实',
  '美丽','丑陋','高大','矮小','宽阔','狭窄','温暖','寒冷','干燥','潮湿',
  '快乐','悲伤','愤怒','害怕','惊讶','平静','紧张','放松','疲惫','精力充沛',
  '工作','学习','生活','旅行','运动','音乐','电影','书籍','游戏','食物',
  '家庭','朋友','同事','邻居','老师','学生','医生','病人','顾客','服务员',
  '早晨','中午','下午','晚上','夜晚','今天','明天','昨天','周末','工作日',
  '春天','夏天','秋天','冬天','晴天','雨天','雪天','阴天','刮风','打雷',
  '城市','乡村','学校','医院','商店','餐厅','公园','车站','机场','酒店',
  '房间','厨房','卧室','浴室','客厅','花园','阳台','车库','地下室','阁楼',
  '桌子','椅子','床','沙发','书架','柜子','灯','窗户','门','镜子',
  '手机','电脑','电视','相机','耳机','键盘','鼠标','屏幕','充电器','数据线',
  '衣服','鞋子','帽子','手套','围巾','包包','雨伞','眼镜','手表','戒指',
  '苹果','香蕉','橙子','葡萄','西瓜','草莓','面包','米饭','面条','鸡蛋',
  '牛奶','咖啡','茶','水','果汁','啤酒','葡萄酒','汤','沙拉','甜点',
  '汽车','公交车','火车','地铁','飞机','自行车','摩托车','出租车','轮船','火箭',
  '红色','蓝色','绿色','黄色','紫色','橙色','粉色','黑色','白色','灰色',
  '大的','小的','长的','短的','高的','低的','厚的','薄的','重的','轻的',
  '快的','慢的','早的','晚的','新的','旧的','好的','坏的','干净的','脏的',
  '安静的','吵闹的','明亮的','黑暗的','安全的','危险的','有趣的','无聊的','有用的','无用的',
  '相信','怀疑','希望','担心','同意','反对','决定','犹豫','记得','忘记',
  '喜欢','讨厌','想要','需要','能够','应该','必须','可以','愿意','拒绝',
  '说话','倾听','阅读','写作','思考','理解','解释','描述','讨论','争论',
  '走路','跑步','跳跃','游泳','攀爬','跌倒','站立','坐下','转身','移动',
  '打开','关闭','拿起','放下','推','拉','扔','接','寻找','找到',
  '购买','出售','支付','收到','赠送','接受','拒绝','借用','归还','分享',
  '帮助','支持','鼓励','安慰','保护','攻击','伤害','治疗','康复','预防',
  '计划','准备','安排','组织','管理','执行','完成','失败','成功','尝试',
  '研究','实验','分析','比较','总结','证明','发现','发明','创造','设计',
];
let _wmbShuffled = null;
function wordMeaningDistractors(exclude, count) {
  if (!_wmbShuffled) _wmbShuffled = [...wordMeaningBank].sort(() => Math.random() - 0.5);
  const excluded = new Set(Array.isArray(exclude) ? exclude : [exclude]);
  const result = [];
  for (const item of _wmbShuffled) {
    if (excluded.has(item)) continue;
    result.push(item);
    if (result.length >= count) break;
  }
  return result;
}
const grammarByLevel = {
  a1: ['present-simple', 'basic-prepositions'],
  a2: ['past-simple', 'future-plans'],
  b1: ['present-perfect', 'conditionals'],
  b2: ['passive-voice', 'complex-clauses']
};
const skillByKind = {
  word: ['vocabulary', 'reading'], choice: ['reading', 'meaning'], listen: ['listening', 'meaning'],
  order: ['grammar', 'writing'], fill: ['grammar', 'vocabulary'], match: ['vocabulary', 'recall']
};

// Sentence exercises are built from everyday situations rather than lesson
// descriptions. Each frame returns one complete English line and its Chinese
// meaning. The vocabulary word is always used in a grammatical slot that
// matches its role, so generated items remain useful outside the app.
const verbVocabulary = new Set([
  'answer','arrive','borrow','book','check','chop','collect','confirm','coordinate','cook','cross','deliver','download','dry','emphasize','enroll','explain','find','finish','hurry','invite','inspect','investigate','keep','learn','leave','listen','marinate','memorize','measure','observe','open','organize','polish','practice','recommend','reduce','refill','relax','remove','repeat','repair','respond','return','review','save','serve','share','show','simmer','sketch','speak','subscribe','tighten','transfer','use','walk','weigh','withdraw','work','write','adapt','align','analyze','argue','assess','audit','bargain','clarify','comply','delegate','disclose','facilitate','forecast','hedge','implement','improve','mitigate','negotiate','reconcile','restore','scrutinize','settle','synthesize','track','verify','visualize','propose','deploy','monitor','screen','triage','allocate','arbitrate','conserve','cooperate','evacuate','frame','interpret','minimize','restructure','surveil','tokenize','bake','boil','celebrate','commute','cut','garden','host','knit','paint','queue','register','reserve','sign','sweep','teach','tighten','train','upload','wrap','zoom'
]);
const adjectiveVocabulary = new Set([
  'available','blue','bright','cloudy','clear','crowded','dirty','dizzy','flexible','friendly','fresh','generous','helpful','independent','loose','loud','memorable','nearby','noisy','opposite','punctual','quiet','reliable','ripe','round','safe','sensitive','slippery','small','spicy','stable','sustainable','tight','urgent','warm','windy','wrong','lost','medical','regulatory','literal','robust','invasive','bilateral','multilateral','normative','hereditary','differential','constitutional','fiscal','social','civil','quarterly','specific','concise','asynchronous','overbooked','revised','informed','structural','public','digital','monthly','seasonal','local','final','early','late','ready'
]);
const abstractAdjectives = new Set([
  'regulatory','literal','robust','invasive','bilateral','multilateral','normative','hereditary','differential','constitutional','fiscal','social','civil','quarterly','specific','concise','asynchronous','overbooked','revised','informed','structural','public','digital','monthly','seasonal','local','final','independent','reliable','sustainable','urgent','flexible','stable','medical'
]);
const personNouns = new Set([
  'colleague','neighbor','landlord','tenant','customer','agent','coach','teacher','classmate','librarian','doctor','nurse','dentist','vendor','cashier','courier','sender','conductor','guide','mentor','manager','resident','supplier','candidate','stakeholder','partner','leader','host','friend','cousin','volunteer','electrician','receptionist','official','researcher','inspector','director','chair','chairperson','advisor','doctor'
]);
const timeNouns = new Set(['shift','deadline','appointment','schedule','timetable','departure','arrival','checkout','reservation','meeting','timesheet','roster','slot','confirmation','consultation']);
const intransitiveVerbs = new Set([
  'arrive','commute','cross','hurry','listen','relax','return','walk','work','leave','speak','practice','learn','travel','celebrate','queue','register','train','zoom','cooperate','evacuate','improve','recover','respond','withdraw','adapt','align','argue','comply','negotiate','reconcile','settle','simmer','marinate','boil','bake','cook','dry','tighten','subscribe','enroll','enlist'
]);
function vocabularyRole(word) {
  const value = String(word || '').toLowerCase();
  if (verbVocabulary.has(value)) return 'verb';
  if (adjectiveVocabulary.has(value)) return 'adjective';
  return 'noun';
}
function adjectiveChinese(value) { return String(value || '').replace(/的$/, ''); }
function interpolateFrame(template, word, chinese) {
  return [template[0].replace(/\{\{w\}\}/g, word), template[1].replace(/\{\{c\}\}/g, chinese)];
}
const dialogueFrames = {
  morning: {
    noun: [
      ['Did you see the {{w}} this morning?', '你今天早上看到{{c}}了吗？'],
      ['Have you finished the {{w}} yet?', '你已经完成{{c}}了吗？'],
      ['Where did I put the {{w}}?', '我把{{c}}放在哪里了？'],
      ['I need the {{w}} before I leave.', '我离开前需要{{c}}。'],
    ],
    verb: [
      ['Do we need to {{w}} now?', '我们现在需要{{c}}吗？'],
      ['I will {{w}} after breakfast.', '我吃完早餐后会{{c}}。'],
      ['Could you remind me to {{w}}?', '你能提醒我{{c}}吗？'],
      ['Please help me {{w}} before work.', '上班前请帮我{{c}}。'],
    ],
    adjective: [
      ['Does the morning feel {{w}} today?', '今天早晨感觉{{c}}吗？'],
      ['The street is still {{w}}.', '街道仍然很{{c}}。'],
      ['Is the weather {{w}} enough for a walk?', '天气够{{c}}，适合散步吗？'],
      ['I hope the day stays {{w}}.', '我希望今天一直保持{{c}}。'],
    ],
  },
  hotel: {
    noun: [
      ['Could I check the {{w}} before I go upstairs?', '我上楼前可以确认一下{{c}}吗？'],
      ['What time is the {{w}}?', '{{c}}是几点？'],
      ['Does the hotel have a {{w}}?', '酒店有{{c}}吗？'],
      ['Could you send the {{w}} to my room?', '你能把{{c}}送到我的房间吗？'],
    ],
    verb: [
      ['Could you {{w}} my room for tomorrow?', '你能为我{{c}}明天的房间吗？'],
      ['When should I {{w}} at the front desk?', '我应该什么时候在前台{{c}}？'],
      ['Can I {{w}} before breakfast?', '我可以在早餐前{{c}}吗？'],
      ['Please tell me how to {{w}} online.', '请告诉我怎样在线{{c}}。'],
    ],
    adjective: [
      ['Is the room {{w}} enough for two people?', '房间对两个人来说够{{c}}吗？'],
      ['The lobby is very {{w}} tonight.', '大厅今晚非常{{c}}。'],
      ['Could I have a more {{w}} room?', '我可以要一个更{{c}}的房间吗？'],
      ['The bed feels {{w}} and clean.', '床感觉很{{c}}，也很干净。'],
    ],
  },
  weather: {
    noun: [
      ['Did you hear the {{w}} last night?', '你昨晚听到{{c}}了吗？'],
      ['The forecast mentioned {{w}} this morning.', '天气预报今天早上提到了{{c}}。'],
      ['Can you see the {{w}} from the window?', '你能从窗户看到{{c}}吗？'],
      ['We brought a coat because of the {{w}}.', '我们因为{{c}}带了外套。'],
    ],
    verb: [
      ['Will it {{w}} again tonight?', '今晚还会{{c}}吗？'],
      ['The gardener will {{w}} before noon.', '园丁会在中午前{{c}}。'],
      ['Could you help me {{w}} these plants?', '你能帮我{{c}}这些植物吗？'],
      ['We should {{w}} before the rain starts.', '下雨前我们应该{{c}}。'],
    ],
    adjective: [
      ['It is very {{w}} outside today.', '今天外面非常{{c}}。'],
      ['The beach looks {{w}} this morning.', '海滩今天早上看起来很{{c}}。'],
      ['Is it too {{w}} for a picnic?', '天气是不是太{{c}}，不适合野餐？'],
      ['The air feels {{w}} after the rain.', '下雨后空气感觉很{{c}}。'],
    ],
  },
  food: {
    noun: [
      ['Could you check the {{w}} before we start cooking?', '开始做饭前请检查一下{{c}}，好吗？'],
      ['Do we have enough {{w}} for dinner?', '晚饭的{{c}}够用吗？'],
      ['Where did you put the {{w}}?', '你把{{c}}放在哪里了？'],
      ['Could I order the {{w}}, please?', '我可以点{{c}}吗？'],
    ],
    verb: [
      ['Could you show me how to {{w}} this?', '你能告诉我怎么{{c}}这个吗？'],
      ['Please {{w}} the vegetables before dinner.', '晚饭前请{{c}}蔬菜。'],
      ['When should we {{w}} the dish?', '我们应该什么时候{{c}}这道菜？'],
      ['I can {{w}} the food while you set the table.', '你摆桌子时我可以{{c}}食物。'],
    ],
    adjective: [
      ['Is the soup too {{w}}?', '汤是不是太{{c}}？'],
      ['The sauce is not {{w}} enough for me.', '这个酱料对我来说不够{{c}}。'],
      ['Could we make the dish less {{w}}?', '我们能让这道菜不要那么{{c}}吗？'],
      ['This looks {{w}} and fresh.', '这个看起来很{{c}}，也很新鲜。'],
    ],
  },
  travel: {
    noun: [
      ['Where can I find the {{w}}?', '我在哪里可以找到{{c}}？'],
      ['Could you show me the {{w}} on this map?', '你能在地图上给我指出{{c}}吗？'],
      ['Is the {{w}} included in the booking?', '预订里包含{{c}}吗？'],
      ['I need the {{w}} before we leave.', '我们出发前需要{{c}}。'],
    ],
    verb: [
      ['Could you help me {{w}} this booking?', '你能帮我{{c}}这个预订吗？'],
      ['What should I do before I {{w}}?', '我在{{c}}之前应该做什么？'],
      ['Can we {{w}} after the next stop?', '我们可以在下一站之后{{c}}吗？'],
      ['Please remind me to {{w}} on time.', '请提醒我按时{{c}}。'],
    ],
    adjective: [
      ['Is the route {{w}} enough for children?', '这条路线对孩子来说够{{c}}吗？'],
      ['The station is very {{w}} today.', '车站今天非常{{c}}。'],
      ['Could we choose a less {{w}} flight?', '我们能选一个不那么{{c}}的航班吗？'],
      ['The hotel room is {{w}} and clean.', '酒店房间很{{c}}，也很干净。'],
    ],
  },
  work: {
    noun: [
      ['Could you send me the {{w}} before the meeting?', '你能在会议前把{{c}}发给我吗？'],
      ['Let us review the {{w}} together this afternoon.', '我们今天下午一起看看{{c}}吧。'],
      ['Where should I save the {{w}}?', '我应该把{{c}}保存在哪里？'],
      ['We need the {{w}} before we make a decision.', '我们做决定前需要{{c}}。'],
    ],
    verb: [
      ['Could you {{w}} this before lunch?', '你能在午饭前{{c}}这个吗？'],
      ['I will {{w}} after the call.', '通话后我会{{c}}。'],
      ['How should we {{w}} this problem?', '我们应该怎样{{c}}这个问题？'],
      ['Let us {{w}} before the meeting.', '我们开会前{{c}}吧。'],
    ],
    adjective: [
      ['Does this plan sound {{w}} enough for the client?', '这个计划对客户来说听起来够{{c}}吗？'],
      ['We need a more {{w}} solution.', '我们需要一个更{{c}}的方案。'],
      ['The schedule is {{w}} this week.', '这周的日程很{{c}}。'],
      ['Could you make the message less {{w}}?', '你能让这条消息不要那么{{c}}吗？'],
    ],
  },
  health: {
    noun: [
      ['I need help with my {{w}}.', '我需要处理我的{{c}}。'],
      ['I want to ask the doctor about my {{w}}.', '我想问医生我的{{c}}。'],
      ['The nurse wrote down my {{w}}.', '护士记下了我的{{c}}。'],
      ['How long should I watch this {{w}}?', '我应该观察这个{{c}}多久？'],
    ],
    verb: [
      ['Should I {{w}} after lunch?', '我应该在午饭后{{c}}吗？'],
      ['The doctor showed me how to {{w}} safely.', '医生教我如何安全地{{c}}。'],
      ['I will {{w}} more slowly this week.', '这周我会更慢地{{c}}。'],
      ['When can I {{w}} again?', '我什么时候可以再次{{c}}？'],
    ],
    adjective: [
      ['I feel {{w}} today.', '我今天感觉{{c}}。'],
      ['Is the pain still {{w}}?', '疼痛还{{c}}吗？'],
      ['The doctor said the result looks {{w}}.', '医生说结果看起来{{c}}。'],
      ['Please tell me if the medicine feels too {{w}}.', '如果药物感觉太{{c}}，请告诉我。'],
    ],
  },
  shopping: {
    noun: [
      ['Do you have the {{w}} in stock?', '你们有现货的{{c}}吗？'],
      ['Could I see the {{w}} in another color?', '我可以看看另一种颜色的{{c}}吗？'],
      ['I need a receipt for this {{w}}.', '我需要这件{{c}}的收据。'],
      ['Can I pay for the {{w}} by card?', '我可以用卡支付{{c}}吗？'],
    ],
    verb: [
      ['Could you {{w}} this item for me?', '你能帮我{{c}}这件商品吗？'],
      ['I would like to {{w}} this order.', '我想{{c}}这个订单。'],
      ['Can I {{w}} it if the size is wrong?', '如果尺码不对，我可以{{c}}它吗？'],
      ['Please let me know how to {{w}} it.', '请告诉我怎样{{c}}它。'],
    ],
    adjective: [
      ['Is this shirt {{w}} enough for winter?', '这件衬衫冬天穿够{{c}}吗？'],
      ['The box is too {{w}} to carry.', '这个盒子太{{c}}，拿不动。'],
      ['I am looking for something more {{w}}.', '我在找更{{c}}的东西。'],
      ['Does this color look {{w}} on me?', '这个颜色穿在我身上看起来{{c}}吗？'],
    ],
  },
  home: {
    noun: [
      ['Could you put the {{w}} by the door?', '请把{{c}}放在门边，好吗？'],
      ['Where did you leave the {{w}}?', '你把{{c}}放在哪里了？'],
      ['We need a new {{w}} for the room.', '我们需要给房间买一个新的{{c}}。'],
      ['The {{w}} is ready to use.', '{{c}}已经可以使用了。'],
    ],
    verb: [
      ['Can you {{w}} the room before dinner?', '你能在晚饭前{{c}}房间吗？'],
      ['I will {{w}} this after the children leave.', '孩子们离开后我会{{c}}这个。'],
      ['Please remember to {{w}} it tonight.', '请记得今晚{{c}}它。'],
      ['How often do we need to {{w}} this?', '我们需要多久{{c}}一次这个？'],
    ],
    adjective: [
      ['The room feels too {{w}} today.', '这个房间今天感觉太{{c}}。'],
      ['Is the floor {{w}} enough to walk on?', '这个地板走起来够{{c}}吗？'],
      ['The new chair is really {{w}}.', '这把新椅子真的很{{c}}。'],
      ['Could we make the room less {{w}}?', '我们能让房间不要那么{{c}}吗？'],
    ],
  },
  school: {
    noun: [
      ['Could I borrow the {{w}}, please?', '我可以借用{{c}}吗？'],
      ['Where should I put the {{w}}?', '我应该把{{c}}放在哪里？'],
      ['The teacher asked us to bring the {{w}}.', '老师让我们带上{{c}}。'],
      ['Do you have an extra {{w}}?', '你还有多余的{{c}}吗？'],
    ],
    verb: [
      ['Could you {{w}} that sentence again?', '你能再{{c}}一遍那句话吗？'],
      ['We will {{w}} this exercise together.', '我们一起{{c}}这道练习。'],
      ['Please {{w}} the answer in your notebook.', '请在笔记本里{{c}}答案。'],
      ['I need more time to {{w}} this.', '我需要更多时间来{{c}}这个。'],
    ],
    adjective: [
      ['Is this example {{w}} enough?', '这个例子够{{c}}吗？'],
      ['The classroom is too {{w}} to study.', '教室太{{c}}，不适合学习。'],
      ['That was a very {{w}} explanation.', '那是一个非常{{c}}的解释。'],
      ['Could you make the instructions less {{w}}?', '你能让说明不要那么{{c}}吗？'],
    ],
  },
  social: {
    noun: [
      ['Are you bringing the {{w}} tonight?', '你今晚会带{{c}}吗？'],
      ['Could you tell me about the {{w}}?', '你能告诉我关于{{c}}的事吗？'],
      ['We need the {{w}} before our guests arrive.', '客人到达前我们需要{{c}}。'],
      ['Who is in charge of the {{w}}?', '谁负责{{c}}？'],
    ],
    verb: [
      ['Would you like to {{w}} with us?', '你想和我们一起{{c}}吗？'],
      ['Can we {{w}} after dinner?', '我们晚饭后可以{{c}}吗？'],
      ['I promised to {{w}} this weekend.', '我答应这个周末{{c}}。'],
      ['Please call me before you {{w}}.', '你{{c}}之前请给我打电话。'],
    ],
    adjective: [
      ['That sounds really {{w}}.', '听起来真的很{{c}}。'],
      ['Was the party {{w}} for everyone?', '聚会对大家来说{{c}}吗？'],
      ['I hope the timing is {{w}} for you.', '我希望这个时间对你来说{{c}}。'],
      ['The host was very {{w}}.', '主人非常{{c}}。'],
    ],
  },
  technology: {
    noun: [
      ['Where can I find the {{w}} setting?', '我在哪里可以找到{{c}}设置？'],
      ['The app needs access to the {{w}}.', '这个应用需要访问{{c}}。'],
      ['Could you check the {{w}} for me?', '你能帮我检查一下{{c}}吗？'],
      ['I saved the file in the {{w}} folder.', '我把文件保存在{{c}}文件夹里。'],
    ],
    verb: [
      ['Could you {{w}} the file again?', '你能再次{{c}}这个文件吗？'],
      ['I will {{w}} the update tonight.', '我今晚会{{c}}这个更新。'],
      ['Please show me how to {{w}} it.', '请告诉我怎样{{c}}它。'],
      ['Can the app {{w}} this automatically?', '这个应用可以自动{{c}}这个吗？'],
    ],
    adjective: [
      ['Is the connection {{w}} enough for a call?', '这个连接打电话够{{c}}吗？'],
      ['The new interface looks {{w}}.', '新的界面看起来很{{c}}。'],
      ['We need a more {{w}} setting.', '我们需要一个更{{c}}的设置。'],
      ['The file is too {{w}} to send.', '这个文件太{{c}}，发不出去。'],
    ],
  },
  professional: {
    noun: [
      ['Could you explain how the {{w}} affects this decision?', '你能解释一下{{c}}如何影响这个决定吗？'],
      ['We need evidence before we discuss the {{w}}.', '我们讨论{{c}}之前需要证据。'],
      ['The report gives a clear example of {{w}}.', '报告清楚地展示了{{c}}的例子。'],
      ['Who is responsible for reviewing the {{w}}?', '谁负责审查{{c}}？'],
    ],
    verb: [
      ['How should we {{w}} this problem?', '我们应该怎样{{c}}这个问题？'],
      ['The team agreed to {{w}} the proposal.', '团队同意{{c}}这个提案。'],
      ['Could you {{w}} the result before Friday?', '你能在周五前{{c}}这个结果吗？'],
      ['We need to {{w}} before the policy changes.', '政策变化前我们需要{{c}}。'],
    ],
    adjective: [
      ['Is this approach {{w}} enough for the project?', '这个方法对项目来说够{{c}}吗？'],
      ['The evidence is still too {{w}} to support that claim.', '证据仍然太{{c}}，无法支持那个说法。'],
      ['We need a more {{w}} explanation.', '我们需要一个更{{c}}的解释。'],
      ['The final result looks {{w}} so far.', '目前最终结果看起来很{{c}}。'],
    ],
  },
};
const safeNounFrames = {
  morning: [
    ['Did you see the {{w}} this morning?', '你今天早上看到{{c}}了吗？'],
    ['Have you finished the {{w}} yet?', '你已经完成{{c}}了吗？'],
    ['Where did I put the {{w}}?', '我把{{c}}放在哪里了？'],
    ['I need the {{w}} before I leave.', '我离开前需要{{c}}。'],
  ],
  hotel: [
    ['Where is the {{w}}?', '{{c}}在哪里？'],
    ['Could you check my {{w}}, please?', '请帮我检查一下我的{{c}}，好吗？'],
    ['What time is the {{w}}?', '{{c}}是几点？'],
    ['Do I need the {{w}} at the front desk?', '我在前台需要{{c}}吗？'],
  ],
  food: [
    ['Could you check the {{w}} before we start?', '开始前请检查一下{{c}}，好吗？'],
    ['Where did you put the {{w}}?', '你把{{c}}放在哪里了？'],
    ['Do we need the {{w}} for dinner?', '晚饭需要{{c}}吗？'],
    ['Could I order the {{w}}, please?', '我可以点{{c}}吗？'],
  ],
  health: [
    ['Could you explain the {{w}} to me?', '你能给我解释一下{{c}}吗？'],
    ['Should I mention the {{w}} to the doctor?', '我应该把{{c}}告诉医生吗？'],
    ['How long will the {{w}} last?', '{{c}}会持续多久？'],
    ['I need help with my {{w}}.', '我需要处理我的{{c}}。'],
  ],
  shopping: [
    ['Could I see the {{w}}, please?', '我可以看看{{c}}吗？'],
    ['Do you have the {{w}} in stock?', '你们有现货的{{c}}吗？'],
    ['Can I return the {{w}}?', '我可以退{{c}}吗？'],
    ['How much is the {{w}}?', '{{c}}多少钱？'],
  ],
  work: [
    ['Could you send me the {{w}} before the meeting?', '你能在会议前把{{c}}发给我吗？'],
    ['Where should I save the {{w}}?', '我应该把{{c}}保存在哪里？'],
    ['Could you check the {{w}} before we decide?', '决定前你能检查一下{{c}}吗？'],
    ['Who is reviewing the {{w}}?', '谁在审查{{c}}？'],
  ],
  technology: [
    ['Where can I find the {{w}} setting?', '我在哪里可以找到{{c}}设置？'],
    ['Can the app access the {{w}}?', '这个应用可以访问{{c}}吗？'],
    ['Could you check the {{w}} for me?', '你能帮我检查一下{{c}}吗？'],
    ['I need the {{w}} to finish this task.', '我需要{{c}}来完成这个任务。'],
  ],
  school: [
    ['Could I borrow the {{w}}, please?', '我可以借用{{c}}吗？'],
    ['Where is the {{w}}?', '{{c}}在哪里？'],
    ['Please bring the {{w}} to class.', '请把{{c}}带到课堂上。'],
    ['I forgot my {{w}} at home.', '我把我的{{c}}忘在家里了。'],
  ],
  social: [
    ['Are you bringing the {{w}} tonight?', '你今晚会带{{c}}吗？'],
    ['Who is handling the {{w}}?', '谁负责{{c}}？'],
    ['Do we need the {{w}} for the party?', '聚会需要{{c}}吗？'],
    ['Could you tell me about the {{w}}?', '你能告诉我关于{{c}}的事吗？'],
  ],
  professional: [
    ['Could you explain the {{w}} in this report?', '你能解释一下报告中的{{c}}吗？'],
    ['How does the {{w}} affect this decision?', '{{c}}如何影响这个决定？'],
    ['Who is responsible for reviewing the {{w}}?', '谁负责审查{{c}}？'],
    ['We need evidence before discussing the {{w}}.', '讨论{{c}}之前我们需要证据。'],
  ],
  travel: [
    ['Where can I find the {{w}}?', '我在哪里可以找到{{c}}？'],
    ['Do I need the {{w}} for this trip?', '这次旅行需要{{c}}吗？'],
    ['Could you show me the {{w}}?', '你能给我看看{{c}}吗？'],
    ['Is the {{w}} ready?', '{{c}}准备好了吗？'],
  ],
  weather: [
    ['Did you hear the {{w}} last night?', '你昨晚听到{{c}}了吗？'],
    ['Can you see the {{w}} from the window?', '你能从窗户看到{{c}}吗？'],
    ['We brought a coat because of the {{w}}.', '我们因为{{c}}带了外套。'],
    ['The forecast mentioned {{w}} this morning.', '天气预报今天早上提到了{{c}}。'],
  ],
};
const specialWordFrames = {
  routine: [['What is your morning {{w}}?', '你的早晨{{c}}是什么？'], ['I follow the same {{w}} on weekdays.', '我工作日遵循同样的{{c}}。'], ['My {{w}} changes when I travel.', '我旅行时{{c}}会改变。'], ['Could we compare our morning {{w}}?', '我们可以比较一下各自的早晨{{c}}吗？']],
  sentence: [['Could you repeat that {{w}}, please?', '你能重复一下那句话吗？'], ['I wrote the last {{w}} in my notes.', '我把上一句话写在笔记里了。'], ['That {{w}} was hard to hear.', '那句话很难听清。'], ['Please read the {{w}} one more time.', '请再读一遍那句话。']],
  borrow: [['Could I {{w}} your pen for a minute?', '我可以借用你的笔一分钟吗？'], ['May I {{w}} your charger until lunch?', '我可以借用你的充电器到午餐时间吗？'], ['I need to {{w}} a book from the library.', '我需要从图书馆借一本书。'], ['Who can I {{w}} a bike from?', '我可以向谁借自行车？']],
  carbon: [['How much {{w}} does this trip produce?', '这次旅行会产生多少碳排放？'], ['We are tracking the {{w}} from our flights.', '我们正在记录航班产生的碳排放。'], ['Taking the train can reduce our {{w}}.', '坐火车可以减少我们的碳排放。'], ['The report compares the {{w}} of each route.', '报告比较了每条路线的碳排放。']],
  leverage: [['What {{w}} do we have in this negotiation?', '我们在这次谈判中有什么筹码？'], ['The team used its {{w}} to secure a better deal.', '团队利用自己的筹码争取到了更好的交易。'], ['We need more {{w}} before making an offer.', '提出报价前我们需要更多筹码。'], ['Her experience gives her strong {{w}}.', '她的经验给了她很强的谈判筹码。']],
  contingency: [['Do we have a {{w}} if the server fails?', '如果服务器出故障，我们有应急计划吗？'], ['Please review the {{w}} before the launch.', '请在上线前检查应急计划。'], ['The {{w}} covers a delay in delivery.', '应急计划涵盖了交付延迟。'], ['We should update our {{w}} every quarter.', '我们应该每季度更新应急计划。']],
  vulnerability: [['The security team found a {{w}} in the app.', '安全团队发现应用中存在一个漏洞。'], ['We patched the {{w}} before releasing the update.', '我们在发布更新前修复了漏洞。'], ['Please report any {{w}} you notice.', '请报告你发现的任何漏洞。'], ['This scan helps us detect a {{w}} early.', '这次扫描帮助我们及早发现漏洞。']],
  milestone: [['We reached an important {{w}} this week.', '我们本周达成了一个重要里程碑。'], ['The next {{w}} is the pilot launch.', '下一个里程碑是试点上线。'], ['Who owns the next project {{w}}?', '谁负责下一个项目里程碑？'], ['The team celebrated the {{w}} together.', '团队一起庆祝了这个里程碑。']],
  ingredient: [
    ['Do we have the {{w}} we need for dinner?', '晚饭需要的{{c}}都有吗？'],
    ['Could you check the {{w}} before we start cooking?', '开始做饭前请检查一下{{c}}，好吗？'],
    ['Where did you put the {{w}}?', '你把{{c}}放在哪里了？'],
    ['This recipe needs one more {{w}}.', '这份食谱还需要一种{{c}}。'],
  ],
  recipe: [
    ['Could you pass me the {{w}}, please?', '请把{{c}}递给我，好吗？'],
    ['Could you check the {{w}} for this dish?', '你能检查一下这道菜的{{c}}吗？'],
    ['Could you send me a simple {{w}}?', '你能把一份简单的{{c}}发给我吗？'],
    ['Could we follow the {{w}} step by step?', '我们可以一步一步照着{{c}}做吗？'],
  ],
  pastry: [
    ['Could I have a {{w}}, please?', '请给我一份{{c}}，好吗？'],
    ['Which {{w}} is fresh today?', '今天哪种{{c}}是新鲜的？'],
    ['I will bring a {{w}} for the meeting.', '我会带一份{{c}}去开会。'],
    ['The {{w}} goes well with coffee.', '{{c}}和咖啡很搭。'],
  ],
  seasoning: [
    ['Could you add a little {{w}} to the soup?', '你能在汤里加一点{{c}}吗？'],
    ['The recipe needs more {{w}}.', '这份食谱还需要更多{{c}}。'],
    ['Please pass me the {{w}}.', '请把{{c}}递给我。'],
    ['Taste the soup before adding {{w}}.', '加{{c}}前先尝尝汤。'],
  ],
  simmer: [
    ['Let the soup {{w}} for ten minutes.', '让汤{{c}}十分钟。'],
    ['The recipe says to {{w}} the sauce.', '食谱说要让酱汁{{c}}。'],
    ['How long should we {{w}} it?', '我们应该让它{{c}}多久？'],
    ['Please {{w}} the soup on low heat.', '请用小火让汤{{c}}。'],
  ],
  marinate: [
    ['How long should we {{w}} the chicken?', '我们应该把鸡肉{{c}}多久？'],
    ['Please {{w}} the vegetables overnight.', '请把蔬菜{{c}}一晚。'],
    ['I will {{w}} the tofu before dinner.', '晚饭前我会把豆腐{{c}}。'],
    ['The chef showed us how to {{w}} the meat.', '厨师教我们怎样把肉{{c}}。'],
  ],
  sunrise: [
    ['What time did the {{w}} appear this morning?', '今天早上{{c}}是几点出现的？'],
    ['The {{w}} was beautiful today.', '今天的{{c}}很美。'],
    ['We stopped to watch the {{w}}.', '我们停下来观看{{c}}。'],
    ['Could you take a photo of the {{w}}?', '你能拍一张{{c}}的照片吗？'],
  ],
  hurry: [
    ['Do we need to {{w}} now?', '我们现在需要快点吗？'],
    ['Please do not {{w}}; we still have time.', '请不要急，我们还有时间。'],
    ['Why are you in such a hurry?', '你为什么这么匆忙？'],
    ['We should {{w}} or we will miss the bus.', '我们应该快点，否则会错过公交车。'],
  ],
  oven: [
    ['Could you check the {{w}} before we bake?', '烘烤前请检查一下{{c}}，好吗？'],
    ['The {{w}} is still hot.', '{{c}}还很热。'],
    ['Please turn off the {{w}} after dinner.', '晚饭后请关掉{{c}}。'],
    ['Is the {{w}} ready for the bread?', '{{c}}可以烤面包了吗？'],
  ],
  slice: [
    ['Could I have a {{w}} of cake, please?', '请给我一{{c}}蛋糕，好吗？'],
    ['Please put one {{w}} on each plate.', '请在每个盘子上放一{{c}}。'],
    ['How thick should each {{w}} be?', '每一{{c}}应该切多厚？'],
    ['I will cut another {{w}} for you.', '我再给你切一{{c}}。'],
  ],
  counter: [
    ['Please order your drink at the {{w}}.', '请在{{c}}点饮料。'],
    ['I will wait by the {{w}}.', '我会在{{c}}旁边等。'],
    ['The cups are next to the {{w}}.', '杯子在{{c}}旁边。'],
    ['Could you wipe the {{w}}?', '你能擦一下{{c}}吗？'],
  ],
  refill: [
    ['Could I have a {{w}}, please?', '请给我续一杯，好吗？'],
    ['Would you like a {{w}} for your coffee?', '你的咖啡需要续杯吗？'],
    ['The waiter offered us a {{w}}.', '服务员问我们要不要续杯。'],
    ['Please ask for a {{w}} when your cup is empty.', '杯子空了以后请要求续杯。'],
  ],
  reception: [
    ['Where is the {{w}} desk?', '{{c}}在哪里？'],
    ['Could you call the {{w}} for me?', '你能帮我联系{{c}}吗？'],
    ['I left my key at the {{w}}.', '我把房卡落在{{c}}了。'],
    ['The {{w}} is open all night.', '{{c}}整晚都有人。'],
  ],
  checkout: [
    ['What time is {{w}}?', '{{c}}是几点？'],
    ['Can I request a late {{w}}?', '我可以申请晚一点{{c}}吗？'],
    ['We need to finish {{w}} before noon.', '我们需要在中午前完成{{c}}。'],
    ['The hotel reminded us about {{w}}.', '酒店提醒了我们{{c}}的时间。'],
  ],
  vacancy: [
    ['Do you have a {{w}} tonight?', '你们今晚有{{c}}吗？'],
    ['Could you check for a {{w}}?', '你能帮我查一下有没有{{c}}吗？'],
    ['The receptionist said there was no {{w}}.', '前台说没有{{c}}。'],
    ['We found a {{w}} near the station.', '我们在车站附近找到了一间{{c}}。'],
  ],
  reservation: [
    ['Could you confirm my {{w}}?', '你能确认一下我的{{c}}吗？'],
    ['I made a {{w}} for two people.', '我预订了一个两人位。'],
    ['What name is the {{w}} under?', '这个{{c}}登记的是谁的名字？'],
    ['We need to change the time of our {{w}}.', '我们需要更改{{c}}的时间。'],
  ],
  appetizer: [
    ['Could we order an {{w}} to share?', '我们可以点一份{{c}}一起吃吗？'],
    ['Which {{w}} do you recommend?', '你推荐哪种{{c}}？'],
    ['The {{w}} arrived before the main course.', '{{c}}在主菜前上来了。'],
    ['Would you like an {{w}}?', '你想要一份{{c}}吗？'],
  ],
  cuisine: [
    ['What kind of {{w}} would you like?', '你想吃哪种{{c}}？'],
    ['This restaurant serves local {{w}}.', '这家餐厅提供当地{{c}}。'],
    ['I would like to try the regional {{w}}.', '我想试试当地的{{c}}。'],
    ['Which {{w}} is popular here?', '这里哪种{{c}}最受欢迎？'],
  ],
  dosage: [
    ['How often should I take this {{w}}?', '这个{{c}}应该多久服用一次？'],
    ['The label explains the correct {{w}}.', '标签说明了正确的{{c}}。'],
    ['Please do not change the {{w}} yourself.', '请不要自行改变{{c}}。'],
    ['I asked the doctor about my {{w}}.', '我问了医生关于{{c}}的问题。'],
  ],
  recovery: [
    ['How is your {{w}} going?', '你的{{c}}进展怎么样？'],
    ['Rest is important during {{w}}.', '{{c}}期间休息很重要。'],
    ['The doctor said my {{w}} would take time.', '医生说我的{{c}}需要时间。'],
    ['I am feeling stronger during my {{w}}.', '我的{{c}}期间我感觉更有力气了。'],
  ],
  allergy: [
    ['Please tell the chef about my {{w}}.', '请告诉厨师我的{{c}}。'],
    ['The form asks whether I have an {{w}}.', '表格询问我是否有{{c}}。'],
    ['This dish is safe for people with an {{w}}.', '这道菜适合有{{c}}的人。'],
    ['I carry medicine for my {{w}}.', '我带着治疗{{c}}的药。'],
  ],
  phishing: [
    ['Could you check this email for {{w}}?', '你能检查一下这封邮件有没有{{c}}吗？'],
    ['The training explains how to spot {{w}}.', '培训说明了如何识别{{c}}。'],
    ['Never share your password because of {{w}}.', '不要因为{{c}}泄露密码。'],
    ['The message looked like {{w}}.', '这条消息看起来像{{c}}。'],
  ],
  scam: [
    ['Does this message look like a {{w}}?', '这条消息看起来像骗局吗？'],
    ['Please report the {{w}} to customer service.', '请把这个{{c}}报告给客服。'],
    ['My friend warned me about a {{w}}.', '朋友提醒我要小心一个{{c}}。'],
    ['We checked the offer and found a {{w}}.', '我们检查了这个报价，发现这是一个{{c}}。'],
  ],
  username: [
    ['What is your {{w}} for this account?', '这个账户的{{c}}是什么？'],
    ['Please enter your {{w}} to continue.', '请输入你的{{c}}以继续。'],
    ['I forgot my {{w}} again.', '我又忘记我的{{c}}了。'],
    ['The app asked me to create a {{w}}.', '应用让我创建一个{{c}}。'],
  ],
};
function scenarioFamily(seed) {
  const topic = `${seed.title || ''} ${seed.subtitle || ''}`;
  if (/晨间|早晨|起床|日出|天气声音|日程与习惯|闹钟|清单/.test(topic)) return 'morning';
  if (/酒店|入住|退房|房卡|客房/.test(topic)) return 'hotel';
  if (/天气|海边|花园|露营|天气声音|花朵|种子/.test(topic)) return 'weather';
  if (/厨房|烹饪|餐厅|咖啡|食材|面包|菜市场|晚餐|午餐/.test(topic)) return 'food';
  if (/旅行|车站|酒店|机场|公交|地铁|行程|出行|邮寄|公园|海边|露营/.test(topic)) return 'travel';
  if (/办公室|工作|会议|团队|项目|邮件|工资|职业|招聘|财务|市场|招聘|报告|谈判|招聘|库存|供应|网络|软件|数据|产品|客户|项目|组织/.test(topic)) return 'work';
  if (/医生|健康|诊所|药|运动|症状|筛查|流行病|临床|医疗/.test(topic)) return 'health';
  if (/购物|商店|退换|银行|市场|收银|价格|消费|金融|保险|税|账单/.test(topic)) return 'shopping';
  if (/学校|课堂|图书馆|课程|学习|教育|考试|研究|实验|论文|语料|哲学/.test(topic)) return 'school';
  if (/手机|电脑|数字|在线|网络|数据|凭证|隐私|防御|AI|人工智能|模型|系统|遥测/.test(topic)) return 'technology';
  if (/家|房|房间|卧室|浴室|清洁|园|宠物|安全|邻里/.test(topic)) return 'home';
  if (/朋友|社交|聚会|生日|家庭|节日|文化|礼仪|社区|公民|社会|迁移/.test(topic)) return 'social';
  if (/环境|气候|生态|流域|能源|太空|生物|自然/.test(topic)) return 'professional';
  return seed.level === 'a1' || seed.level === 'a2' ? 'social' : 'professional';
}
function scenarioLine(family, word, chinese, variant) {
  const usageChinese = {
    hurry: '快点', slice: String(chinese || '').replace(/^一/, ''),
    refill: '续杯', simmer: '炖煮', marinate: '腌制', explain: '解释',
    recommend: '推荐', borrow: '借用', repeat: '重复', check: '检查',
  }[word] || chinese;
  if (specialWordFrames[word]) return interpolateFrame(specialWordFrames[word][variant % specialWordFrames[word].length], word, usageChinese);
  const role = vocabularyRole(word);
  // A generated sentence must remain usable even when the target word is an
  // abstract noun or a verb with no obvious object. These compact frames are
  // deliberately neutral; the authored seed sentence is preferred below when
  // one is available, and these are used for natural paraphrases and pack 2.
  const neutralFrames = {
    noun: [
      ['Could you tell me more about {{w}}?', '你能再告诉我一些关于{{c}}的事吗？'],
      ['Where can I find {{w}}?', '我在哪里可以找到{{c}}？'],
      ['I saw {{w}} in the message.', '我在消息里看到了{{c}}。'],
      ['We need to discuss {{w}} today.', '我们今天需要讨论{{c}}。'],
    ],
    verb: intransitiveVerbs.has(String(word || '').toLowerCase()) ? [
      ['When will you {{w}}?', '你什么时候会{{c}}？'],
      ['I usually {{w}} before work.', '我通常在上班前{{c}}。'],
      ['Please {{w}} carefully.', '请仔细地{{c}}。'],
      ['We can {{w}} after lunch.', '我们可以午饭后{{c}}。'],
    ] : [
      ['Could you {{w}} this before lunch?', '你能在午饭前{{c}}这个吗？'],
      ['I will {{w}} it after the meeting.', '我会在会议后{{c}}它。'],
      ['Please {{w}} the file today.', '请今天{{c}}这个文件。'],
      ['We need to {{w}} this together.', '我们需要一起{{c}}这个。'],
    ],
    adjective: abstractAdjectives.has(String(word || '').toLowerCase()) ? [
      ['The report describes this as {{w}}.', '报告将其描述为{{c}}。'],
      ['The policy is considered {{w}}.', '这项政策被认为是{{c}}的。'],
      ['This approach seems {{w}}.', '这种方法看起来很{{c}}。'],
      ['The final result is still {{w}}.', '最终结果仍然是{{c}}的。'],
    ] : [
      ['The room feels {{w}} today.', '今天这个房间感觉很{{c}}。'],
      ['This option seems {{w}}.', '这个选项看起来很{{c}}。'],
      ['The result looks {{w}}.', '结果看起来很{{c}}。'],
      ['Is the setting too {{w}}?', '这个设置是不是太{{c}}了？'],
    ],
  };
  const semanticFrames = personNouns.has(String(word || '').toLowerCase()) ? [
    ['Could I speak to the {{w}}?', '我可以和{{c}}谈谈吗？'],
    ['Who is the {{w}} for this task?', '谁是这件事的{{c}}？'],
    ['I need to contact the {{w}}.', '我需要联系{{c}}。'],
    ['The {{w}} is waiting outside.', '{{c}}正在外面等候。'],
  ] : timeNouns.has(String(word || '').toLowerCase()) ? [
    ['What time is the {{w}}?', '{{c}}是几点？'],
    ['Has the {{w}} changed?', '{{c}}有变化吗？'],
    ['I wrote the {{w}} in my calendar.', '我把{{c}}写进日历了。'],
    ['Could you confirm the {{w}}?', '你能确认一下{{c}}吗？'],
  ] : null;
  const familyFrames = semanticFrames || (role === 'noun' && safeNounFrames[family]
    ? safeNounFrames[family]
    : (dialogueFrames[family] || dialogueFrames.professional)[role]);
  // Social titles often contain objects that are not naturally "brought to a
  // party" (crosswalk, routine, size). Use the neutral conversation frames
  // for that family; the other scene frames are deliberately contextual.
  const frames = family !== 'social' && familyFrames && familyFrames.length ? familyFrames : neutralFrames[role];
  const frame = frames[variant % frames.length];
  const visibleChinese = role === 'adjective' ? adjectiveChinese(usageChinese) : usageChinese;
  return interpolateFrame(frame, word, visibleChinese);
}
function scenarioFor(seed, index) {
  const words = (seed.words || []).slice(0, 3);
  while (words.length < 3) words.push(words[words.length - 1] || ['thing', '东西']);
  const family = scenarioFamily(seed);
  const lines = words.map((pair, wordIndex) => scenarioLine(family, pair[0], pair[1], index + wordIndex));
  const second = words.map((pair, wordIndex) => scenarioLine(family, pair[0], pair[1], index + wordIndex + 2));
  const authoredPair = (value) => Array.isArray(value) && value.length >= 2 && String(value[0] || '').trim() && String(value[1] || '').trim() ? [String(value[0]), String(value[1])] : null;
  const authoredFill = !seed.generatedPack && Array.isArray(seed.fill) && seed.fill.length >= 3 && String(seed.fill[0] || '').includes('_____') ? [String(seed.fill[0]), String(seed.fill[1] || ''), String(seed.fill[2] || '')] : null;
  const authoredChoice = !seed.generatedPack && authoredPair(seed.choice);
  const authoredListen = !seed.generatedPack && authoredPair(seed.listen);
  const authoredOrder = !seed.generatedPack && authoredPair(seed.order);
  const fillLine = (line, answer) => [line[0].replace(answer, '_____'), answer, line[1]];
  return {
    family,
    scene: seed.title,
    // Keep the carefully authored sentence wherever the seed provides one.
    // Generated paraphrases fill the additional practice slots so the same
    // target language is met in more than one everyday context.
    choiceA: authoredChoice || lines[0],
    listenA: authoredListen || lines[1],
    fillA: authoredFill || fillLine(lines[2], words[2][0]),
    choiceB: second[0],
    listenB: second[1],
    fillB: fillLine(second[2], words[2][0]),
    order: authoredOrder || scenarioLine(family, words[0][0], words[0][1], index + 3),
    sentencePool: [authoredChoice, authoredListen, authoredOrder, ...(authoredFill ? [[authoredFill[0], authoredFill[2]]] : []), ...lines, ...second]
      .filter(Boolean).map((line) => line[1]),
  };
}
const usedSentenceKeys = new Set();
// Uniqueness candidates, deliberately disjoint from the suffixes used by
// repairGrammarCoverage: a grammar frame is shared by up to 25 lessons
// (conditionals), so its key space must be the union of both pools. The earlier
// 8-entry pool was exhausted once stripping was introduced, which surfaced as
// duplicate questions.
const uniquenessTails = [
  ['tomorrow morning', '明天早上'], ['this evening', '今晚'], ['after dinner', '晚饭后'], ['before the meeting', '会议前'],
  ['after the meeting', '会议后'], ['on Monday', '周一'], ['on Tuesday', '周二'], ['on Wednesday', '周三'],
  ['on Thursday', '周四'], ['on Saturday', '周六'], ['on Sunday', '周日'], ['next week', '下周'],
  ['next month', '下个月'], ['last night', '昨晚'], ['in the morning', '早上'], ['in the afternoon', '下午'],
  ['in the evening', '傍晚'], ['before dinner', '晚饭前'], ['before work', '上班前'], ['before class', '上课前'],
  ['after class', '下课后'], ['at the weekend', '周末'], ['this weekend', '这个周末'], ['before the deadline', '截止日期前'],
  ['during lunch', '午餐期间'], ['all week', '整周'], ['this year', '今年'], ['next year', '明年'],
  ['at eight', '八点'], ['at nine', '九点'], ['this term', '本学期'], ['on a weekday', '工作日'],
];
const escapePattern = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function appendEnglishTail(text, tail, punctuation) {
  const value = String(text || '').replace(/[?.！。]$/, '');
  return `${value} ${tail}${punctuation}`;
}
function prependChineseTail(text, tail) {
  return `${tail}${String(text || '').replace(/^[，,]/, '')}`;
}
// Exact inverses of the two helpers above, used only to remove the suffix that
// repairGrammarCoverage itself appended. A generic "strip whatever looks like a
// trailing time phrase" pass is not safe here: English puts the time at the end
// while Chinese keeps it before the verb, so stripping both sides would drop the
// English phrase and leave the Chinese one, desynchronising the pair.
function dropEnglishTail(text, tail) {
  const value = String(text || '');
  const punctuation = /[.!?]$/.test(value) ? value.slice(-1) : '';
  const stripped = value.replace(new RegExp(`\\s+${escapePattern(tail)}\\s*[.!?]?$`), '');
  return stripped ? `${stripped}${punctuation}` : stripped;
}
function dropChineseTail(text, tail) {
  const value = String(text || '');
  return value.startsWith(tail) ? value.slice(tail.length) : value;
}
function ensureUniqueSentence(question, salt) {
  if (!question || question.kind === 'word' || question.kind === 'match') return;
  const repairTail = question.__repairTail || null;
  if (repairTail) delete question.__repairTail;

  const keyOf = (audio, translation) => `${String(audio).toLowerCase()}|${String(translation)}`;
  const originalAudio = String(question.audio || question.prompt || '');
  const originalPrompt = String(question.prompt || '');
  const originalTranslation = String(question.translation || '');

  // A grammar-repaired sentence already carries one time phrase. A retry must
  // fall back to the version without it instead of appending on top, otherwise
  // the retries stack: "... delivered this morning this week this weekend".
  // Both halves of the pair are dropped together so English and Chinese stay in
  // step, and every later attempt derives from these pristine values rather
  // than from the previously retried sentence.
  let audio = originalAudio;
  let prompt = originalPrompt;
  let translation = originalTranslation;
  let key = keyOf(audio, translation);

  if (repairTail && usedSentenceKeys.has(key)) {
    audio = dropEnglishTail(originalAudio, repairTail[0]);
    translation = dropChineseTail(originalTranslation, repairTail[1]);
    prompt = question.kind === 'choice' ? audio : dropChineseTail(originalPrompt, repairTail[1]);
    question.audio = audio;
    question.prompt = prompt;
    question.translation = translation;
    if (question.kind === 'choice' || question.kind === 'listen') question.answer = translation;
    key = keyOf(audio, translation);
  }

  let attempt = 0;
  while (usedSentenceKeys.has(key) && attempt < uniquenessTails.length) {
    const [enTail, cnTail] = uniquenessTails[(salt + attempt) % uniquenessTails.length];
    const punctuation = /\?$/.test(audio) ? '?' : '.';
    const oldAnswer = question.answer;
    const nextAudio = appendEnglishTail(audio, enTail, punctuation);
    const nextTranslation = prependChineseTail(translation, cnTail);
    question.audio = nextAudio;
    question.translation = nextTranslation;
    if (question.kind === 'choice' || question.kind === 'listen') {
      question.answer = nextTranslation;
      question.options = (question.options || []).map((option) => option === oldAnswer ? nextTranslation : option);
      // A choice prompt is the English sentence itself (see makeLesson), so it
      // must track the audio. Leaving it untouched made the stem show one
      // sentence while the feedback and speech played another.
      if (question.kind === 'choice') question.prompt = nextAudio;
    } else if (question.kind === 'order') {
      question.answer = nextAudio;
      question.tokens = nextAudio.split(' ');
      question.prompt = nextTranslation;
    } else if (question.kind === 'fill') {
      question.prompt = appendEnglishTail(prompt, enTail, punctuation);
    }
    key = keyOf(question.audio, question.translation);
    attempt += 1;
  }
  usedSentenceKeys.add(key);
}
function expandPairs(seed, index) {
  const pairs = [];
  const english = new Set();
  const chinese = new Set();
  const add = (pair) => {
    if (!Array.isArray(pair) || pair.length < 2) return;
    const en = String(pair[0] || '').trim();
    const cn = String(pair[1] || '').trim();
    if (!en || !cn || english.has(en) || chinese.has(cn)) return;
    english.add(en); chinese.add(cn); pairs.push([en, cn]);
  };
  [...(seed.pairs || []), ...(seed.words || [])].forEach(add);
  const bank = pairFallbacks[seed.level] || [];
  for (let offset = 0; pairs.length < 6 && offset < bank.length * 2; offset += 1) add(bank[(index + offset) % bank.length]);
  return pairs;
}
const grammarRepairFrames = {
  'present-continuous': ['I am waiting for the bus right now.', '我现在正在等公交车。'], 'past-continuous': ['I was cooking when you called.', '你打电话时我正在做饭。'],
  // Frames stay time-free: repairGrammarCoverage appends exactly one time phrase,
  // so a frame that already carried one ("... this morning") produced sentences
  // such as "The package was delivered this morning this week this weekend."
  'going-to': ['We are going to meet.', '我们打算见面。'], 'present-perfect': ['I have sent the email already.', '我已经发过邮件了。'],
  'past-perfect': ['She had left before I arrived.', '我到达之前她已经离开了。'], 'passive-voice': ['The package was delivered.', '包裹被送到了。'],
  conditionals: ['If it rains, we will take the bus.', '如果下雨，我们就坐公交车。'], comparatives: ['This route is shorter than the other one.', '这条路线比另一条短。'],
  'there-is-are': ['There is a pharmacy near the station.', '车站附近有一家药店。'], 'there-is': ['There is a quiet café around the corner.', '拐角处有一家安静的咖啡店。'],
  'frequency-adverbs': ['I usually check my calendar.', '我通常查看日历。'], 'have-got': ['I have got an appointment at three.', '我三点有一个预约。'], 'past-simple': ['I checked the message.', '我查看了消息。'], 'relative-clauses': ['I met a manager who supports flexible work.', '我遇到了一位支持灵活工作的经理。'],
  imperatives: ['Please turn off the oven before you leave.', '离开前请关掉烤箱。'],
};
function grammarRealized(tag, text) {
  const value = String(text || '').toLowerCase();
  const checks = {'present-continuous': /\b(am|is|are)\s+\w+ing\b/, 'past-continuous': /\b(was|were)\s+\w+ing\b/, 'going-to': /\b(am|is|are)\s+going\s+to\b/, 'present-perfect': /\b(have|has)\s+(?:already\s+|just\s+|never\s+|ever\s+)?\w+(ed|en|wn|gone|been)\b/, 'past-perfect': /\bhad\s+\w+(ed|en|wn|gone|been)\b/, 'passive-voice': /\b(am|is|are|was|were|be|been)\s+\w+(ed|en)\b/, 'past-simple': /\b\w+(ed)\b|\b(went|came|saw|sent|wrote|made|left|found|took)\b/, 'relative-clauses': /\b(who|which|that|whose|where|when)\b/, conditionals: /\bif\b/, comparatives: /\b\w+er\s+than\b|\bmore\s+\w+\s+than\b/, 'there-is-are': /\bthere\s+(is|are|was|were)\b/, 'there-is': /\bthere\s+(is|are)\b/, 'frequency-adverbs': /\b(always|usually|often|sometimes|never|rarely)\b/, 'have-got': /\b(have|has)\s+got\b/, imperatives: /^(please\s+)?(do not|don't|turn|open|close|take|bring|wait|stop|check|keep|put|give|pass|help|try|use)\b/};
  return !checks[tag] || checks[tag].test(value);
}
function repairGrammarCoverage(questions, grammarTags, lessonIndex) {
  // Every suffix is a plain time phrase. English places it at the end of the
  // sentence, Chinese places it before the verb, so the Chinese side is
  // prefixed rather than glued on with a space (the old concatenation emitted
  // strings like "我今天早上查看了消息 本周。").
  const suffixes = [
    ['this morning', '今天早上'], ['before lunch', '午饭前'], ['during the meeting', '会议期间'], ['after work', '下班后'],
    ['on Friday', '周五'], ['this week', '本周'], ['next Monday', '下周一'], ['at noon', '中午'],
  ];
  const targets = questions.filter((question) => question.kind === 'choice' || question.kind === 'listen');
  let targetIndex = 0;
  for (const tag of grammarTags || []) {
    const frame = grammarRepairFrames[tag];
    const target = targets[targetIndex++ % Math.max(1, targets.length)];
    if (!frame || !target || grammarRealized(tag, target.audio)) continue;
    const suffix = suffixes[(lessonIndex + targetIndex) % suffixes.length];
    const punctuation = frame[0].endsWith('?') ? '?' : '.';
    target.audio = `${frame[0].replace(/[?.]$/, '')} ${suffix[0]}${punctuation}`;
    target.translation = `${suffix[1]}${frame[1].replace(/[。？?]$/, '')}${frame[1].endsWith('？') ? '？' : '。'}`;
    target.answer = target.translation;
    // Only a choice question uses the sentence as its stem. Overwriting a listen
    // question's prompt printed the answer on screen and made the exercise a
    // reading task, so it keeps its instruction text.
    if (target.kind === 'choice') target.prompt = target.audio;
    // Non-enumerable so it never reaches the catalog; ensureUniqueSentence
    // consumes and deletes it.
    Object.defineProperty(target, '__repairTail', {
      value: suffix, enumerable: false, configurable: true, writable: true,
    });
  }
}
function makeLesson(seed,index){
  const spec=levels.find((level)=>level.id===seed.level), id=`${seed.level}-u${index+1}-l1`;
  const grammarTags = seed.grammarTags || grammarByLevel[seed.level] || ['general-english'];
  const pairs = expandPairs(seed, index);
  const glossary = [...new Map([...seed.words, ...pairs].map((pair) => [pair[0], pair[1]])).entries()];
  const scenario = scenarioFor(seed, index);
  const fillWords = [...new Set([...seed.words.map((word) => word[0]), ...pairs.map((pair) => pair[0]), ...fillFallbacks])]
    .filter((word) => /^[A-Za-z][A-Za-z' -]*$/.test(word));
  const fillOptions = optionSet(scenario.fillA[1], fillWords);
  const secondWord = seed.words[1] || seed.words[0];
  const thirdWord = seed.words[2] || seed.words[0];
  const extraFillOptions = optionSet(scenario.fillB[1], [...fillWords, secondWord[0], thirdWord[0]]);
  const questions=[
    {kind:'word',prompt:seed.words[0][0],instruction:'选择这个词最合适的中文意思',answer:seed.words[0][1],options:optionSet(seed.words[0][1],[seed.words[1][1],seed.words[2][1],...wordMeaningDistractors([seed.words[0][1],seed.words[1][1],seed.words[2][1]],3)]),audio:seed.words[0][0],translation:seed.words[0][1],glossary},
    {kind:'choice',prompt:scenario.choiceA[0],instruction:'选择这句话在日常对话中的意思',answer:scenario.choiceA[1],options:sentenceOptionSet(scenario.choiceA[1],scenario,seed.distractors),audio:scenario.choiceA[0],translation:scenario.choiceA[1],glossary,scene:scenario.scene},
    {kind:'listen',prompt:`${scenario.scene} · 听一听这句日常对话，选择正确意思`,instruction:'音频会自动播放一次，也可以重复播放',answer:scenario.listenA[1],options:sentenceOptionSet(scenario.listenA[1],scenario,seed.distractors),audio:scenario.listenA[0],translation:scenario.listenA[1],glossary,scene:scenario.scene},
    {kind:'order',prompt:scenario.order[1],instruction:'用词块拼出这句日常表达',answer:scenario.order[0],tokens:scenario.order[0].split(' '),audio:scenario.order[0],translation:scenario.order[1],glossary,scene:scenario.scene},
    {kind:'fill',prompt:scenario.fillA[0],instruction:'选择英文词块完成对话',answer:scenario.fillA[1],options:fillOptions,audio:scenario.fillA[0].replace(/_____/g,scenario.fillA[1]),translation:scenario.fillA[2],glossary,scene:scenario.scene},
    {kind:'match',prompt:`配对「${seed.title}」场景里的重点词语`,instruction:'先点英文，再点对应的中文',pairs,answer:'matched',translation:pairs.map((pair)=>pair.join(' · ')).join(' / '),glossary,scene:scenario.scene},
    {kind:'word',prompt:`${secondWord[0]} · ${seed.title}`,instruction:'选择这个词最合适的中文意思',answer:secondWord[1],options:optionSet(secondWord[1],[seed.words[0][1],thirdWord[1],...wordMeaningDistractors([secondWord[1],seed.words[0][1],thirdWord[1]],3)]),audio:secondWord[0],translation:secondWord[1],glossary},
    {kind:'choice',prompt:scenario.choiceB[0],instruction:'选择这句话在日常对话中的意思',answer:scenario.choiceB[1],options:sentenceOptionSet(scenario.choiceB[1],scenario,seed.distractors),audio:scenario.choiceB[0],translation:scenario.choiceB[1],glossary,scene:scenario.scene},
    {kind:'listen',prompt:`${scenario.scene} · 再听一遍这段日常对话，选择正确意思`,instruction:'音频会自动播放，也可以点击按钮重听',answer:scenario.listenB[1],options:sentenceOptionSet(scenario.listenB[1],scenario,seed.distractors),audio:scenario.listenB[0],translation:scenario.listenB[1],glossary,scene:scenario.scene},
    {kind:'fill',prompt:scenario.fillB[0],instruction:'选择英文词块完成对话',answer:scenario.fillB[1],options:extraFillOptions,audio:scenario.fillB[0].replace(/_____/g,scenario.fillB[1]),translation:scenario.fillB[2],glossary,scene:scenario.scene}
  ].map((question,questionIndex)=>({...question,promptCn:question.instruction,id:`${id}-q${questionIndex+1}`,lessonId:id,levelId:seed.level,cefr:spec.cefr,difficulty:spec.difficulty,grammarTags:[...grammarTags],skillTags:[...(skillByKind[question.kind] || ['general'])]}));
  repairGrammarCoverage(questions, grammarTags, index);
  questions.forEach((question, questionIndex) => ensureUniqueSentence(question, index * 10 + questionIndex));
  const lessonTranslations = questions.filter((question) => question.kind === 'choice' || question.kind === 'listen').map((question) => question.translation);
  questions.filter((question) => question.kind === 'choice' || question.kind === 'listen').forEach((question) => {
    question.options = optionSet(question.translation, lessonTranslations.filter((translation) => translation !== question.translation));
  });
  seed.sentencePool = scenario.sentencePool;
  const unitNumber = index + 1;
  const sectionNumber = Math.floor(index / 12) + 1;
  const authored = authoredBlocks[id];
  if (authored && authored.sourceStatus === 'hand-authored' && Array.isArray(authored.questions) && authored.questions.length === 10) {
    const authoredQuestions = authored.questions.map((question, questionIndex) => ({...question, id:`${id}-q${questionIndex + 1}`, lessonId:id, levelId:seed.level, cefr:spec.cefr, difficulty:spec.difficulty, grammarTags:[...(authored.grammarTags || grammarTags)], skillTags:[...(skillByKind[question.kind] || ['general'])]}));
    return {id,levelId:seed.level,unitId:`${seed.level}-unit${unitNumber}`,sectionId:`${seed.level}-section${sectionNumber}`,unitNumber,sectionNumber,lessonNumber:1,lessonType:'lesson',cefr:spec.cefr,difficulty:spec.difficulty,title:authored.title || seed.title,subtitle:authored.subtitle || seed.subtitle,theme:authored.theme || seed.title,grammarTags:[...(authored.grammarTags || grammarTags)],skillTags:['vocabulary','grammar','listening','reading'],words:authored.words || seed.words,pairs:(authored.questions.find(question => question.kind === 'match') || {}).pairs || pairs,questions:authoredQuestions,dialogue:authored.dialogue || null,authored:authored.sourceStatus === 'hand-authored'};
  }
  return {id,levelId:seed.level,unitId:`${seed.level}-unit${unitNumber}`,sectionId:`${seed.level}-section${sectionNumber}`,unitNumber,sectionNumber,lessonNumber:1,lessonType:'lesson',cefr:spec.cefr,difficulty:spec.difficulty,title:seed.title,subtitle:seed.subtitle,theme:seed.title,grammarTags:[...grammarTags],skillTags:['vocabulary','grammar','listening','reading'],words:seed.words,pairs,questions};
}
const levelCurriculum=levels.map((spec)=>({
  ...spec,
  units:seeds.filter((seed)=>seed.level===spec.id).map((seed,index)=>{const lesson=makeLesson(seed,index);const unitNumber=index+1;const sectionNumber=Math.floor(index/12)+1;return {id:`${spec.id}-unit${unitNumber}`,unitId:`${spec.id}-unit${unitNumber}`,sectionId:`${spec.id}-section${sectionNumber}`,unitNumber,sectionNumber,levelId:spec.id,cefr:spec.cefr,difficulty:spec.difficulty,title:`${spec.cefr} · ${seed.title}`,subtitle:seed.subtitle,color:spec.color,art:spec.art,lessons:[lesson],checkpoint:{id:`${spec.id}-section${sectionNumber}-checkpoint`,sectionId:`${spec.id}-section${sectionNumber}`,requiredUnitIds:[]}};})
}));
const curriculum=levelCurriculum.flatMap((level)=>level.units);
const lessonList=curriculum.flatMap((unit)=>unit.lessons);
const sections=levelCurriculum.flatMap((level)=>{const groups=[];level.units.forEach(unit=>{let section=groups.find(item=>item.id===unit.sectionId);if(!section){section={id:unit.sectionId,levelId:level.id,sectionNumber:unit.sectionNumber,title:`${level.cefr} · 第 ${unit.sectionNumber} 区`,units:[],checkpoint:null};groups.push(section);}section.units.push(unit);});groups.forEach(section=>{section.checkpoint={id:`${section.id}-checkpoint`,sectionId:section.id,requiredUnitIds:section.units.map(unit=>unit.id),type:'checkpoint'};section.units.forEach(unit=>{unit.checkpoint=section.checkpoint;});});return groups;});
const checkpoints=sections.map(section=>section.checkpoint);
const questionBank=Object.fromEntries(lessonList.flatMap((lesson)=>lesson.questions).map((question)=>[question.id,question]));
const lumiCatalog={curriculum,lessonList,questionBank,levels,levelCurriculum,sections,checkpoints};
if(typeof window!=='undefined')window.lumiCatalog=lumiCatalog;
if(typeof module!=='undefined')module.exports={curriculum,lessonList,questionBank,catalog:lumiCatalog,levels,levelCurriculum,sections,checkpoints,scenarioFor};
