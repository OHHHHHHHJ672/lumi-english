# Audio assets

The six short interface effects in `app/src/main/assets/audio/` come from
[Kenney Interface Sounds](https://kenney.nl/assets/interface-sounds), downloaded
from the official asset ZIP on 2026-10-06. The package `License.txt` identifies
the files as **Creative Commons Zero (CC0 1.0)**, so they are usable in this
educational app and may be redistributed. Attribution is optional; this
project keeps the source URL and package name for provenance.

| App name | Source file | Use |
| --- | --- | --- |
| click | click_001.ogg | button feedback |
| correct | confirmation_001.ogg | correct answer |
| wrong | error_001.ogg | incorrect answer |
| combo | confirmation_004.ogg | combo streak |
| complete | confirmation_003.ogg | lesson complete |
| reward | bong_001.ogg | points/reward |

`audio.js` maps these names through `window.LumiAudio.sfx(name)`. Speech is
generated at runtime by Android's offline en-US TextToSpeech engine (or the
browser Web Speech fallback); no prerecorded speech is bundled.
