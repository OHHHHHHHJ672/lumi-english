# Lumi English Beta UI smoke report

Date: 2026-09-29

## Scope

Checked the static WebView frontend in `app/src/main/assets`. The controller in `interaction.js` is now a single lesson interaction layer; the Android shell and course/model files remain separate.

## Checks

- `node --check app/src/main/assets/app.js` passed.
- `node --check app/src/main/assets/interaction.js` passed.
- `node --check app/src/main/assets/model.js` passed.
- Fixed-target string scan found no remaining `30 XP` or `完成 30 XP` UI text.
- Verified by source inspection that placement answers are shuffled and scored by answer value.
- Verified by source inspection that an incorrect answer is appended to the current session queue when the model has not already appended it.
- Verified by source inspection that matching submits only after every pair is matched; a wrong click only flashes and resets the selection.
- Verified by source inspection that the feedback bar is fixed to the bottom safe area and contains the answer and Chinese explanation fields.

## Browser note

The Codex in-app browser did not allow a local `file://` tab in this worker session, so an interactive screenshot smoke test could not be completed here. The static checks above pass and the page can be opened from the Android WebView or a local HTTP server for device QA.

## Manual acceptance checklist

- Complete onboarding and confirm the six placement questions change option order.
- Select an incorrect lesson answer, press Continue, and confirm the same question returns at the end of the queue.
- In a matching question, make one wrong pair and confirm the question remains active; complete all pairs to reveal feedback.
- Verify 5/10/15/20/30 minute plans show the same dynamic goal in the home card, claim message, widget sync, and header.
- Verify bottom feedback and Continue remain above the Android navigation safe area on a narrow device.
