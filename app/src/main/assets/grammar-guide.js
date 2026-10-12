/* Lumi Grammar Guide: concise explanations for key grammar points.
   Keyed by grammar tags used in the course. Each entry has a title,
   one-line rule, and 2 example sentences with Chinese. */
(function (root, factory) {
  const api = factory(root || (typeof window !== 'undefined' ? window : globalThis));
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.LumiGrammar = api;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null), function () {
  const GUIDE = {
    'present-simple': {
      level: 'A1', title: '一般现在时',
      rule: '表示习惯、事实和经常性动作。第三人称单数动词加 -s/-es。',
      examples: [['I walk to work every day.', '我每天走路去上班。'], ['She works in a hospital.', '她在医院工作。']]
    },
    'present-continuous': {
      level: 'A1', title: '现在进行时',
      rule: '表示此刻正在发生的动作。结构：am/is/are + 动词-ing。',
      examples: [['I am reading a book now.', '我现在正在看书。'], ['They are having dinner.', '他们正在吃晚饭。']]
    },
    'past-simple': {
      level: 'A2', title: '一般过去时',
      rule: '表示过去发生的动作。规则动词加 -ed，不规则动词需记忆。',
      examples: [['I visited the museum yesterday.', '我昨天参观了博物馆。'], ['She went to Paris last year.', '她去年去了巴黎。']]
    },
    'present-perfect': {
      level: 'A2', title: '现在完成时',
      rule: '表示过去发生且与现在有关的动作。结构：have/has + 过去分词。',
      examples: [['I have finished my homework.', '我已经完成了作业。'], ['She has lived here for five years.', '她在这里住了五年了。']]
    },
    'future-plans': {
      level: 'A2', title: '将来时：be going to',
      rule: '表示已经计划好的将来动作。结构：am/is/are going to + 动词原形。',
      examples: [['We are going to travel next month.', '我们下个月要去旅行。'], ['She is going to study medicine.', '她打算学医。']]
    },
    'will-future': {
      level: 'A2', title: '将来时：will',
      rule: '表示临时决定、预测或承诺。结构：will + 动词原形。',
      examples: [['I will help you with the report.', '我会帮你写报告。'], ['It will rain tomorrow.', '明天会下雨。']]
    },
    'modal-verbs': {
      level: 'A2', title: '情态动词',
      rule: 'can/could 表能力，should 表建议，must 表必须，may 表可能。后接动词原形。',
      examples: [['You should drink more water.', '你应该多喝水。'], ['She can speak three languages.', '她会说三种语言。']]
    },
    'comparatives': {
      level: 'B1', title: '比较级',
      rule: '两者比较用比较级。短形容词加 -er，长形容词前加 more。',
      examples: [['This book is more interesting than that one.', '这本书比那本更有趣。'], ['She is taller than her brother.', '她比她哥哥高。']]
    },
    'relative-clauses': {
      level: 'B1', title: '定语从句',
      rule: '用 who/which/that 引导从句修饰名词。who 指人，which 指物。',
      examples: [['The man who is talking is my teacher.', '正在说话的那个人是我的老师。'], ['This is the book which I recommended.', '这就是我推荐的那本书。']]
    },
    'passive-voice': {
      level: 'B1', title: '被动语态',
      rule: '强调动作承受者。结构：be + 过去分词。常用于正式和学术语境。',
      examples: [['The report was written by the team.', '这份报告是团队写的。'], ['English is spoken worldwide.', '英语在全世界被使用。']]
    },
    'conditionals': {
      level: 'B1', title: '条件句',
      rule: 'If 引导条件。第一条件句：if + 现在时, will + 动词；第二条件句：if + 过去时, would + 动词。',
      examples: [['If it rains, we will stay home.', '如果下雨，我们就待在家里。'], ['If I had more time, I would travel.', '如果我有更多时间，我会去旅行。']]
    },
    'gerunds': {
      level: 'A1', title: '动名词',
      rule: '动词加 -ing 作名词用。常放在 enjoy, finish, suggest 等动词后。',
      examples: [['I enjoy reading books.', '我喜欢看书。'], ['She finished writing the email.', '她写完了邮件。']]
    },
    'imperatives': {
      level: 'A1', title: '祈使句',
      rule: '用动词原形发出指令或请求。否定形式在句首加 Don\'t。',
      examples: [['Open your notebook, please.', '请打开你的笔记本。'], ['Don\'t be late for the meeting.', '开会别迟到。']]
    },
    'frequency-adverbs': {
      level: 'A1', title: '频率副词',
      rule: 'always, usually, often, sometimes, never 表示动作频率。放在 be 动词后、实义动词前。',
      examples: [['She usually walks to work.', '她通常走路去上班。'], ['I never drink coffee at night.', '我晚上从不喝咖啡。']]
    },
    'countable-nouns': {
      level: 'A1', title: '可数与不可数名词',
      rule: '可数名词有复数，用 many/few；不可数名词无复数，用 much/little。都可以用 some/any。',
      examples: [['I have many books.', '我有很多书。'], ['There is much water in the bottle.', '瓶子里有很多水。']]
    },
    'adjectives': {
      level: 'A1', title: '形容词',
      rule: '描述名词。放在名词前或 be 动词后。',
      examples: [['This is a quiet room.', '这是一个安静的房间。'], ['The room is quiet.', '房间很安静。']]
    },
    'there-is-are': {
      level: 'A1', title: 'There be 句型',
      rule: '表示"某处有某物"。单数用 there is，复数用 there are。',
      examples: [['There is a book on the table.', '桌子上有一本书。'], ['There are two towels in the drawer.', '抽屉里有两条毛巾。']]
    },
    'can-requests': {
      level: 'A1', title: 'Can 表示请求',
      rule: 'Can/Could you...? 表示礼貌请求。Could 比 Can 更委婉。',
      examples: [['Can you repeat that, please?', '你能重复一下吗？'], ['Could I borrow your pen?', '我可以借你的笔吗？']]
    },
    'have-got': {
      level: 'A1', title: 'Have got 表示拥有',
      rule: 'have got = have，表示"有"。疑问句把 have 提前。',
      examples: [['I have got a new phone.', '我有一部新手机。'], ['Have you got a minute?', '你有时间吗？']]
    },
    'time-expressions': {
      level: 'A1', title: '时间表达',
      rule: '整点用 o\'clock，半点用 half past，一刻钟用 a quarter past/to。',
      examples: [['The meeting starts at nine o\'clock.', '会议九点开始。'], ['It is half past six.', '现在六点半。']]
    },
    'going-to': {
      level: 'A2', title: 'be going to 表将来',
      rule: '表示计划或预测。结构：am/is/are + going to + 动词原形。',
      examples: [['We are going to start a new project.', '我们要启动一个新项目。'], ['It is going to rain.', '要下雨了。']]
    },
    'sequencing-words': {
      level: 'A2', title: '顺序词',
      rule: 'first, then, next, after that, finally 表示动作先后顺序。',
      examples: [['First, chop the onions. Then, heat the pan.', '首先切洋葱，然后热锅。'], ['Finally, serve the rice while hot.', '最后，趁热上米饭。']]
    },
    'reported-speech': {
      level: 'B2', title: '间接引语',
      rule: '转述他人话语时，时态通常后退一步：现在时→过去时，过去时→过去完成时。',
      examples: [['She said, "I am tired." → She said she was tired.', '她说："我累了。" → 她说她累了。'], ['He said, "I will come." → He said he would come.', '他说："我会来。" → 他说他会来。']]
    },
    'nominalisation': {
      level: 'B2', title: '名词化',
      rule: '将动词或形容词转化为名词，使表达更正式简洁。如 develop → development, important → importance。',
      examples: [['We need to develop the product. → The development of the product is necessary.', '我们需要开发产品。→ 产品的开发是必要的。'], ['This issue is important. → The importance of this issue is clear.', '这个问题很重要。→ 这个问题的重要性显而易见。']]
    },
    'subjunctive': {
      level: 'B2', title: '虚拟语气',
      rule: '表示假设、愿望或建议。If I were..., I suggest that he (should) go...',
      examples: [['If I were you, I would accept the offer.', '如果我是你，我会接受这个提议。'], ['It is essential that she be present.', '她必须出席。']]
    },
    'legal-modals': {
      level: 'B2', title: '法律情态动词',
      rule: 'shall 表义务，may 表许可，must 表强制，用于合同和法律文本。',
      examples: [['The supplier shall deliver the goods by Friday.', '供应商应在周五前交货。'], ['Either party may terminate the contract.', '任何一方均可终止合同。']]
    },
  };

  const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2'];

  function forLevel(level) {
    const upper = String(level || '').toUpperCase();
    return Object.entries(GUIDE).filter(([, g]) => g.level === upper).map(([tag, g]) => ({ tag, ...g }));
  }

  function forTags(tags) {
    if (!Array.isArray(tags)) return [];
    return tags.map(tag => GUIDE[tag]).filter(Boolean).map((g, i) => ({ tag: tags[i], ...g }));
  }

  function all() {
    return Object.entries(GUIDE).map(([tag, g]) => ({ tag, ...g }));
  }

  function byTag(tag) { return GUIDE[tag] || null; }

  return { GUIDE, forLevel, forTags, all, byTag, LEVEL_ORDER };
});
