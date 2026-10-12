# Daylight scene learning implementation plan

User approved the audit and requested a light theme, improved interactions, dialogue and better sound. Continue implementation without an additional approval gate.

## Constraints
- Preserve installed progress and question IDs; no hearts, subscriptions or learning limits.
- Warm white, teal and apricot scene adventure UI; readable text, single primary action.
- System TTS only for speech; short licensed local UI sounds, independent sound and speech toggles.
- Conversation roles must match their lines. Translations hidden until word tap or submitted feedback.
- Keep current 288 lessons; add authored dialogue to matching chapters without clones or time-tail deduplication.

## Tasks
- [ ] Audio: audio.js owns cancellable browser/native TTS queues, per-line callbacks, normal/slow, stop/pause/resume and SFX. MainActivity provides utterance callbacks and voice selection with single-voice fallback. Find CC0 short UI audio; record sources and licenses; test cancellation and progression.
- [ ] Content: dialogue-data.js provides original level/topic mapped conversations, 3–6 turns and four interaction modes. Audit answer uniqueness, role consistency, translations and scene coverage. Preserve existing IDs and attach new stable question IDs.
- [ ] UI: replace starport.css with daylight.css; compact home, current chapter pagination, consistent controls, scene illustrations and bubble layouts. Dedicated footer hosts check/continue with measured safe padding. No full-screen replay on selection, word hint or audio state update.
- [ ] Integration: interaction.js connects dialogue modes to lesson queue/review/rewards and audio lifecycle. Speech text must exclude hidden/answer turns. Check all blanks/order on explicit submit. Profile exposes independent settings.
- [ ] Validation: run Node tests/content audit, mobile browser flows for all four modes, small-screen/reduced-motion checks and console inspection. Build and verify signed 1.4 APK; document limitations and results.

Baseline is an existing dirty beta checkout. Backed up app/tests/tools before edits. Do not revert unrelated work or commit prior user changes.
