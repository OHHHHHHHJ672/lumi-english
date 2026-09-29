# Lumi learning loop redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove energy gating, add a non-blocking Lumi point economy, hide answer translations until feedback, autoplay listening prompts once, and expand every matching exercise to at least six pairs.

**Architecture:** Keep the current offline WebView and localStorage architecture. Extend `LumiModel` with a `points` balance while synchronizing legacy `coins`; make `interaction.js` the single owner of lesson rendering so instructions and translations have separate display paths; generate six-pair matching sets in `course.js` from authored pairs plus level-specific fallback vocabulary. Use question IDs to guard one-time autoplay and store the guard in the lesson session.

**Tech Stack:** Plain JavaScript, static HTML/CSS assets, Android WebView system TTS, Node’s built-in test runner.

## Global Constraints

- No paid membership, energy wall, or requirement to restore energy before studying.
- Wrong answers do not subtract a resource and do not block starting another lesson.
- Translations stay hidden before submission; only task instructions remain visible.
- Listening questions autoplay once per question, while manual replay and slow replay remain available.
- Every matching question renders at least six unique English/Chinese pairs.
- Existing localStorage progress and legacy `coins`/`energy` fields must migrate without loss.

---

### Task 1: Replace energy gating with a points economy

**Files:**
- Modify: `app/src/main/assets/model.js`
- Modify: `tests/model.test.js`

**Interfaces:**
- Produces `LumiModel.points(state, amount)` for awarding spendable points and `LumiModel.spendPoints(state, amount)` for future hint/shop actions.
- Keeps `state.coins` synchronized as a legacy alias of `state.points`.
- Keeps legacy `hearts`/`energy` fields readable for migration diagnostics, but `start()` and `answer()` never gate or decrement study access.

- [ ] **Step 1: Write failing model tests** for a zero-heart state starting a lesson, a wrong answer leaving hearts unchanged, points awarded once for first mastery, daily completion points, and point spending.
- [ ] **Step 2: Run `node --test tests/model.test.js`** and confirm the new assertions fail against the current energy-gated model.
- [ ] **Step 3: Implement the model changes**: add `points` to fresh state; normalize old `coins` into `points`; remove the `hearts < 1` early return and heart decrement; award +2 points on first question mastery, +10 on first lesson completion, +15 for a perfect lesson, and +15 for claiming the daily goal; expose `points` and `spendPoints`.
- [ ] **Step 4: Run the model tests again** and confirm all pass, including existing migration tests.
- [ ] **Step 5: Commit** with `git add app/src/main/assets/model.js tests/model.test.js && git commit -m "replace energy gating with lumi points"`.

### Task 2: Hide translations and add click-to-translate glossary words

**Files:**
- Modify: `app/src/main/assets/course.js`
- Modify: `app/src/main/assets/interaction.js`
- Modify: `tests/course.test.js`
- Modify: `tests/interaction.test.js`

**Interfaces:**
- Every generated question has `instruction`, `translation`, and `glossary` fields.
- `interaction.js` consumes `question.glossary` through `renderGlossaryText(text, glossary)` and renders each known English word as a `showWordHint()` button.
- `question.instruction` is the only Chinese text shown before submission; `question.translation` is used by feedback only.

- [ ] **Step 1: Add failing tests** asserting a fill question’s visible instruction is not its full Chinese translation, and that glossary rendering wraps a known word without rendering the sentence translation.
- [ ] **Step 2: Run `node --test tests/course.test.js tests/interaction.test.js`** and confirm the new assertions fail.
- [ ] **Step 3: Update `course.js` generation** so fill questions use a neutral instruction, all question records expose `instruction` separately, and glossary entries are built from the lesson’s authored vocabulary and pair words.
- [ ] **Step 4: Update `interaction.js` rendering** to show `q.instruction`, render glossary buttons in English prompts, and keep translations inside `betaPaintFeedback()` after answer submission. Escape glossary text before building HTML.
- [ ] **Step 5: Run course and interaction tests** and confirm duplicate-question and feedback regressions remain covered.
- [ ] **Step 6: Commit** with `git add app/src/main/assets/course.js app/src/main/assets/interaction.js tests/course.test.js tests/interaction.test.js && git commit -m "hide lesson translations behind feedback"`.

### Task 3: Autoplay listening questions once per question

**Files:**
- Modify: `app/src/main/assets/interaction.js`
- Modify: `tests/interaction.test.js`

**Interfaces:**
- `state.session.autoPlayedQuestionId` records the question ID that has already triggered automatic TTS.
- `autoplayListeningQuestion(question)` schedules one `speak(question.audio)` call only when the question is a listening question, audio is available, and the question ID differs from the stored guard.

- [ ] **Step 1: Add a small pure guard test** for the autoplay decision function: new listening ID returns true, the same ID returns false, and non-listening questions return false.
- [ ] **Step 2: Run the focused interaction test** and confirm it fails because no autoplay guard exists.
- [ ] **Step 3: Implement the guard and call it after lesson DOM rendering**; keep the manual play and slow-play buttons; do not mark muted questions as played until audio is actually allowed.
- [ ] **Step 4: Run all interaction and model tests** and inspect the browser console for runtime errors.
- [ ] **Step 5: Commit** with `git add app/src/main/assets/interaction.js tests/interaction.test.js && git commit -m "autoplay listening questions once"`.

### Task 4: Expand matching exercises to six pairs

**Files:**
- Modify: `app/src/main/assets/course.js`
- Modify: `tests/course.test.js`
- Modify: `tools/validate-course.js`

**Interfaces:**
- `question.pairs` always contains at least six unique English keys and six Chinese values.
- `expandPairs(seed, index)` preserves authored pairs first, then adds unique level-appropriate fallback vocabulary until six pairs exist.

- [ ] **Step 1: Add failing validation** requiring every match question to contain at least six pairs and no duplicate English or Chinese entries.
- [ ] **Step 2: Run `node --test tests/course.test.js && node tools/validate-course.js`** and confirm the current three-pair data fails.
- [ ] **Step 3: Implement deterministic level-specific fallback banks** and use them only to fill missing pairs; preserve all authored pairs and keep the final prompt/answer globally unique.
- [ ] **Step 4: Run course validation and inspect pair counts** with a Node script; expect 144 of 144 matching questions to have six pairs.
- [ ] **Step 5: Commit** with `git add app/src/main/assets/course.js tests/course.test.js tools/validate-course.js && git commit -m "expand matching exercises to six pairs"`.

### Task 5: Update visible point labels and remove energy language

**Files:**
- Modify: `app/src/main/assets/index.html`
- Modify: `app/src/main/assets/app.js`
- Modify: `app/src/main/assets/interaction.js`
- Modify: `app/src/main/assets/polish.css`

**Interfaces:**
- Header displays streak, `Lumi 积分`, and progress without a heart/energy counter.
- Lesson header shows combo and a points hint affordance instead of hearts.
- Profile explains point sources and uses without offering energy refills.

- [ ] **Step 1: Add a UI smoke assertion** that rendered home/lesson markup contains `积分` and no `能量补给`/`兑换能量` copy.
- [ ] **Step 2: Run the UI-focused test or static grep** and confirm it fails against the current labels.
- [ ] **Step 3: Update IDs and renderers** to use `top-points`, synchronized `state.points`, point-based result copy, and a profile points rules card; remove `refillFromProfile()` and energy modal paths.
- [ ] **Step 4: Run all Node tests, syntax checks, and browser smoke checks**: route count, start with zero legacy hearts, a listening question’s play button, and a six-pair matching question.
- [ ] **Step 5: Update README and reports** with the no-energy rule and point economy, then run `git diff --check`.
- [ ] **Step 6: Commit** with `git add app/src/main/assets/index.html app/src/main/assets/app.js app/src/main/assets/interaction.js app/src/main/assets/polish.css README.md tests && git commit -m "finish non-blocking beta learning loop"`.

### Task 6: Final verification and release notes

**Files:**
- Modify: `README.md`
- Create: `tests-learning-loop-report.md`

- [ ] **Step 1: Run `node --test tests/*.test.js`.**
- [ ] **Step 2: Run `node tools/validate-course.js`.**
- [ ] **Step 3: Run `node --check` for `app.js`, `interaction.js`, `model.js`, and `course.js`.**
- [ ] **Step 4: Run `git diff --check` and a clean-tree check.**
- [ ] **Step 5: Record the final lesson/question/pair counts and the browser smoke results in `tests-learning-loop-report.md`.**
- [ ] **Step 6: Commit the final report** with `git add tests-learning-loop-report.md README.md && git commit -m "document beta learning loop"`.
