# Lumi Curriculum Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the Beta course from 144 lessons/864 questions to at least 288 lessons and roughly 2,800 unique questions while preserving level placement, hidden translations, automatic listening playback, points, and non-blocking practice.

**Architecture:** Keep the existing static WebView architecture and authored seed format. Add a second, clearly separated curriculum pack with level-specific themes and unique vocabulary/sentences, then generate ten questions per lesson from explicit seed fields. Extend validation so lesson/question counts, duplicate prompt-answer pairs, CEFR opening difficulty, and six-pair matching remain enforced.

**Tech Stack:** Plain JavaScript/CommonJS course data, Node.js test runner, PowerShell Android build script, Android WebView assets.

## Global Constraints

- No energy wall, subscription gate, or limit on study attempts.
- Translations remain hidden until the learner taps a word or submits an answer.
- Listening questions autoplay once on entry and remain replayable through system TTS.
- Matching questions contain at least six pairs and a single mistake does not fail the whole question.
- A1/A2/B1/B2 content must match the level and higher-level routes must not begin with basic greetings.
- New question prompt-answer keys must be globally unique.

### Task 1: Add the second authored curriculum pack

**Files:**
- Create: `app/src/main/assets/course-pack-2.js`
- Modify: `app/src/main/assets/course.js`

- [x] Add 36 new lesson seeds for each CEFR level with distinct themes, target vocabulary, grammar focus, and example sentences.
- [x] Export the pack and append it to the existing `seeds` list without changing existing lesson IDs.
- [x] Keep all new B1/B2 opening prompts above A1 greeting difficulty.

### Task 2: Generate ten varied questions per lesson

**Files:**
- Modify: `app/src/main/assets/course.js`

- [x] Extend `makeLesson` with four additional questions sourced from the seed's second and third vocabulary/example entries.
- [x] Ensure every generated option set has four unique choices and every match question has at least six unique English/Chinese pairs.
- [x] Update level metadata from six to ten questions per lesson.

### Task 3: Strengthen curriculum validation and regression tests

**Files:**
- Modify: `tools/validate-course.js`
- Modify: `tests/course.test.js`

- [x] Change expected totals to 288 lessons and 2,880 questions.
- [x] Assert ten questions per lesson, global prompt-answer uniqueness, level-specific vocabulary, and no mechanically identical question blocks across adjacent lessons.
- [x] Run the course and model test suites and fix any migration or UI assumptions exposed by the count change.

### Task 4: Build and verify the Beta APK

**Files:**
- Modify: `README.md`
- Modify: `tests-learning-loop-report.md`

- [x] Run Node syntax checks, course validation, all tests, and `git diff --check`.
- [x] Build `Lumi-English-Beta-1.2.apk`, verify its APK signature, and record the final lesson/question counts and artifact path.
- [x] Smoke-test the local WebView page, enter a ten-question lesson, and verify hidden translations and feedback; listening autoplay remains covered by the interaction regression tests.
