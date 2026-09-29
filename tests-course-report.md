# Lumi English Beta 课程报告

## 本次范围

- A1、A2、B1、B2 各 36 个独立关卡，共 144 关。
- 每关 6 道题，题型固定覆盖 `word`、`choice`、`listen`、`order`、`fill`、`match`。
- 共 864 道题，所有题目由独立主题种子生成，没有 `cloneLevel` 或跨等级复制。
- 每个等级包含 `cefr`、`difficulty`、`recommendedFor` 元数据。
- A2/B1/B2 使用工作、健康、旅行、媒体、项目、数据隐私、研究和职业等场景，未使用 A1 首课的问候语开篇。
- 每个等级 24 个不重复目标词（按词形统计），题目规范化 `prompt + answer` 全部唯一。

## 验证命令

```text
node tests/course.test.js
```

结果：`course tests passed: 144 lessons, 864 unique questions`

```text
node tools/validate-course.js
```

结果：

```json
{
  "levels": 4,
  "lessons": 144,
  "questions": 864
}
```

当前课程导出仍保持 `window.lumiCatalog` 的 `curriculum`、`lessonList`、`questionBank`、`levels`、`levelCurriculum` 结构，现有 WebView UI 可以按原字段读取。
