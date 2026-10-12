# Lumi Content and UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every weak sentence-based exercise with natural, scenario-based English and redesign the mobile WebView into a distinctive Lumi Starport learning experience.

**Architecture:** Keep the offline WebView and localStorage model, but make lesson content data-first and make one controller own screen rendering. Each lesson continues to expose ten questions, while six sentence questions are generated from a scenario contract containing intent, target words, English, Chinese, audio, and distractor metadata. The UI uses a small tokenized CSS system, SVG icons, CSS motion, and a constellation route without adding a framework or network dependency.

**Tech Stack:** Static HTML, vanilla JavaScript, CSS, Android WebView, system TTS, Node.js tests.

## Global Constraints

- Preserve 288 lessons and 2880 total questions unless a validation report explicitly records a deliberate content-count change.
- Preserve offline operation and system TTS; do not add recorded audio or a membership/energy gate.
- Sentence questions must not contain lesson labels, vocabulary explanations, placeholder audio, or generic “this lesson” wording.
- Every English sentence must have a complete Chinese translation and a complete audio string after the blank is filled.
- Every choice question must have four scenario-compatible options and exactly one correct answer.
- Do not expose the full Chinese translation before the learner answers; word taps may show direct word meanings.
- Run the full Node test suite, course validator, JavaScript syntax checks, and APK build before completion.

---

### Task 1: Build the content audit and scenario contract

**Files:**
- Create: `tools/audit-content.js`
- Modify: `tests/course.test.js`
- Modify: `tools/validate-course.js`

**Interfaces:**
- Produces `auditContent(catalog)` returning counts and flagged question IDs.
- Produces `scenarioFor(seed, lessonIndex)` data with `choiceA`, `listenA`, `fillA`, `choiceB`, `listenB`, and `fillB` fields.

- [ ] Add audit rules for meta phrases, generic templates, incomplete audio, Chinese mismatch markers, duplicate normalized English/Chinese pairs, and implausible blank placement.
- [ ] Run the audit against the current catalog and record the baseline counts in test output.
- [ ] Add regression assertions that no generated sentence contains `A1 lesson`, `this lesson`, `the word ... is useful`, `The sentence includes`, or `complete the phrase`.
- [ ] Add assertions that fill audio never contains `_____` and that every sentence question has a non-empty English and Chinese pair.

### Task 2: Replace sentence content with themed daily dialogues

**Files:**
- Modify: `app/src/main/assets/course.js`
- Modify: `app/src/main/assets/course-pack-2.js`
- Modify: `tests/course.test.js`

**Interfaces:**
- `scenarioFor(seed, index)` returns two choice lines, two listening lines, and two fill lines. A line is `[english, chinese]`; a fill line is `[promptWithBlank, answer, chinese]`.
- `makeLesson` consumes the scenario contract for question kinds `choice`, `listen`, and `fill`.

- [ ] Add scenario families for food, travel, home, health, shopping, school, social, work, technology, media, science, policy, nature, and hobbies.
- [ ] Use title and vocabulary roles to choose natural frames for nouns, verbs, and adjectives; avoid inserting an adjective into a noun-only frame.
- [ ] Rewrite both sentence variants per lesson so six sentence questions per lesson are contextual, distinct, and level-appropriate.
- [ ] Replace generic distractors with three translations from the same scene and grammatical frame, plus one nearby alternative when needed.
- [ ] Fix fill audio construction so blanks at the end of a sentence are replaced as well as blanks followed by a space.
- [ ] Preserve the existing word, order, and match question contracts while giving them the same lesson scenario metadata.
- [ ] Run the course audit and inspect flagged examples from every CEFR level and every scenario family.

### Task 3: Make the lesson interaction consistently scenario-first

**Files:**
- Modify: `app/src/main/assets/interaction.js`
- Modify: `app/src/main/assets/app.js`
- Modify: `app/src/main/assets/polish.css`
- Modify: `tests/interaction.test.js`

**Interfaces:**
- One lesson controller owns `renderLesson`, `chooseAnswer`, `checkOrder`, `checkFreeAnswer`, `pickPair`, and `nextQuestion`.
- `questionPromptHtml` renders scene context and clickable word meanings without rendering the complete Chinese translation.

- [ ] Remove duplicate render wrapping and route every screen transition through one render owner to eliminate flashes.
- [ ] Add scene label, speaker label, and optional reply context to sentence questions.
- [ ] Use one consistent flow: choose or complete → 检查 → fixed feedback tray → 继续.
- [ ] Keep automatic first playback for listening and dictation questions; replay and slow playback remain available.
- [ ] Keep correct fill feedback showing the Chinese translation and keep wrong feedback showing the correct sentence.
- [ ] Add regression tests for the unified check state, no early translation leak, auto-play-once, and complete fill audio.

### Task 4: Redesign the Starport visual system and route

**Files:**
- Modify: `app/src/main/assets/index.html`
- Modify: `app/src/main/assets/polish.css`
- Modify: `app/src/main/assets/app.js`
- Modify: `app/src/main/assets/interaction.js`

**Interfaces:**
- Introduce CSS tokens for the Starport palette, spacing, radii, type scale, elevation, and motion.
- Add reusable SVG icon helpers for navigation, node types, audio, feedback, and rewards.

- [ ] Replace the pastel card stack with a dark navy Starport shell, electric cyan route accents, warm orange reward accents, and high-contrast surfaces.
- [ ] Render the home route as a constellation map with chapter clusters, active node, review node, chest node, and unit-test node.
- [ ] Render the lesson as a dialogue cockpit with a scene header, waveform TTS control, progress/combo rail, answer area, and fixed feedback tray.
- [ ] Render result rewards as a staged XP/points/mastery reveal with a clear next-node action.
- [ ] Replace core emoji navigation with inline SVG icons while keeping decorative emoji optional.
- [ ] Add reduced-motion behavior, visible focus states, touch targets at least 44px, and readable contrast.

### Task 5: Verify and package the beta

**Files:**
- Modify: `README.md`
- Modify: `tests/course.test.js`
- Modify: `tests/interaction.test.js`

- [ ] Run `node --test tests/*.test.js`.
- [ ] Run `node tools/audit-content.js` and `node tools/validate-course.js`.
- [ ] Run `node --check` on every changed JavaScript asset.
- [ ] Run `git diff --check`.
- [ ] Build with `build-apk.ps1` and verify APK v2/v3 signatures.
- [ ] Record the final lesson/question counts, audit result, and APK path in `README.md`.

