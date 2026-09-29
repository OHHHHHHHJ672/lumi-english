# Beta Fix Report

本轮修复覆盖 Beta 发布前的存档、课程和 onboarding 阻断项。

## 已修复

- v2/v3 旧 lesson/question ID 会映射到当前存在的 Beta ID；无法精确对应时保留 `legacyIds`，并迁移 `completed`、`mistakes`、`session.lessonId`、`session.qids`。
- 旧存档的 `hearts`/`energy` 和时间戳按原始值恢复，`energy: 0` 不再被默认五颗心覆盖。
- 不完整的 daily/session 字段会在 normalize 时补齐。
- 增加全局 `earnedQuestionIds`，跨 session 重做题目不会重复获得 XP。
- fill 题选项全部从英文词形生成，课程和题目现在包含 `grammarTags`、`skillTags`。
- onboarding 增加英语背景选择；四级/六级从高级 placement 题开始，目标等级和当前等级分开保存，完成时写入存档版本 4。
- currentLevel 会影响路线：低于当前等级的关卡视为已掌握，超过 targetLevel 的关卡锁定。
- 每次新课建立 session 后随机题型/题目顺序，结算页区分 `perfect` 和 `firstPass`。
- README 更新为 80 关 / 480 题 Beta 事实。

## 验证结果

```text
node --test tests/model.test.js tests/course.test.js
2 test files passed; 14 assertions/scenarios passed

node tools/validate-course.js
levels: 4, lessons: 80, questions: 480

node --check app/src/main/assets/*.js
passed
```

本 Beta 仍是内容扩展的首个切片，后续需要继续补充独立课程内容和更多输入型题目。
