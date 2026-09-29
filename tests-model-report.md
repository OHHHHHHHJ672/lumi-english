# Model tests

Command:

```text
node tests/model.test.js
```

Result: 6 tests passed.

Covered behavior:

- Daily XP target uses `dailyMinutes * 3` with a minimum of 10.
- Version 2 and version 3 archive migration to version 4, including settings and an unfinished session.
- Wrong answers append the question to the current session queue and a lesson only passes after the retry is correct.
- Retrying a question does not award XP twice.
- New lesson mistakes consume hearts; review mistakes do not.
- Every five consecutive correct answers increments Combo.

The repository-wide course check was also run with `node tests/course.test.js`. It currently fails because the course file still contains the previous 144 lessons while that check expects the beta course size; that file is being updated separately.
