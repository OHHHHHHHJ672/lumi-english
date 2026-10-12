# Daylight dialogue content

`app/src/main/assets/dialogue-data.js` is a small UMD module. In a browser it
publishes `window.LumiDialogues`; CommonJS tests can use
`require('./app/src/main/assets/dialogue-data.js')`.

The catalog contains 32 authored stories, eight for each level. Every story is
attached to an existing lesson ID, has two named speakers with role-appropriate
lines, three turns, a Chinese translation per turn, a short glossary, and one
or two stable task IDs. The selected lessons are:

| Level | Lesson IDs |
| --- | --- |
| A1 | `a1-u4-l1`, `a1-u47-l1`, `a1-u23-l1`, `a1-u8-l1`, `a1-u9-l1`, `a1-u14-l1`, `a1-u6-l1`, `a1-u52-l1` |
| A2 | `a2-u56-l1`, `a2-u13-l1`, `a2-u41-l1`, `a2-u6-l1`, `a2-u3-l1`, `a2-u4-l1`, `a2-u1-l1`, `a2-u2-l1` |
| B1 | `b1-u2-l1`, `b1-u9-l1`, `b1-u42-l1`, `b1-u4-l1`, `b1-u8-l1`, `b1-u22-l1`, `b1-u5-l1`, `b1-u12-l1` |
| B2 | `b2-u1-l1`, `b2-u10-l1`, `b2-u12-l1`, `b2-u26-l1`, `b2-u15-l1`, `b2-u8-l1`, `b2-u22-l1`, `b2-u13-l1` |

The eight scene settings are used throughout: `restaurant`, `cafe`, `hotel`,
`travel`, `shop`, `home`, `work`, and `clinic`.

## API

`LumiDialogues.stories` is the source catalog. A story has this shape:

```js
{
  id, lessonId, levelId, scene, setting, title,
  characters: [{id, name, role}],
  turns: [{id: 't0', speaker, text, translation}],
  glossary: [['word or phrase', '中文']],
  tasks: [{id, mode, targetIndex?, prompt?, instruction?, answer?, options?}]
}
```

Call `LumiDialogues.questionsFor(lesson)` with either a lesson object or a
lesson ID. It returns normalized queue items with `kind: 'dialogue'`, the
story metadata, `characters`, `turns`, `targetIndex` for reply/gap tasks,
`answer`, `options`, `translation`, `explanation`, `glossary`, and `audio: ''`.
The four modes are:

- **intent**: all turns remain visible; the learner answers a Chinese detail or
  inference question with related English options.
- **reply**: `turns` contains only the prefix before the missing next line;
  `targetIndex` points to that line in the source story and `answer` is its
  English text.
- **gap**: all source turns remain in order, with the target turn's speech and
  translation blanked; `targetIndex` identifies the blank.
- **sequence**: the complete exchange is presented as movable lines;
  `answer` is the canonical index order (`0|1|2`, etc.) and `options` contains
  the line texts.

The content is intentionally limited to matching chapters while the remaining
288-lesson curriculum stays unchanged. Run `node --test tests/dialogue.test.js`
to check IDs, level coverage, role references, task answers, and duplicate line
guards.
