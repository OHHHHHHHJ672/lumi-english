/* Lumi Mascot: a cute ginger cat with 7 expressions.
   Expressions: idle, happy, sad, thinking, celebrate, cheer, sleepy.
   API: LumiMascot.html(expression, size), LumiMascot.setExpression(target, expression). */
(function (root, factory) {
  const api = factory(root || (typeof window !== 'undefined' ? window : globalThis));
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.LumiMascot = api;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null), function () {
  const EXPRESSIONS = ['idle', 'happy', 'sad', 'thinking', 'celebrate', 'cheer', 'sleepy'];

  // Cat color palette
  const FUR = '#ffb870';        // ginger orange
  const FUR_DARK = '#f59e4f';   // darker ginger for ears/stripes
  const INNER_EAR = '#ffb3b3';  // pink inner ear
  const NOSE = '#ff8fa3';       // pink nose
  const BLUSH = 'rgba(255,143,163,.35)';
  const IRIS = '#5b8dd9';       // blue eyes
  const PUPIL = '#2d3748';
  const MOUTH = '#c97b5a';      // warm brown mouth

  function catSvg(expr) {
    const e = EXPRESSIONS.includes(expr) ? expr : 'idle';
    return `<svg class="cat-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="catFaceGrad" cx="45%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#ffcc8a"/>
      <stop offset="100%" stop-color="${FUR}"/>
    </radialGradient>
  </defs>

  <!-- Ears -->
  <g class="cat-ears">
    <path d="M16 30 Q14 12 28 8 Q36 18 40 30 Z" fill="${FUR_DARK}"/>
    <path d="M20 26 Q20 15 28 13 Q33 20 35 27 Z" fill="${INNER_EAR}"/>
    <path d="M84 30 Q86 12 72 8 Q64 18 60 30 Z" fill="${FUR_DARK}"/>
    <path d="M80 26 Q80 15 72 13 Q67 20 65 27 Z" fill="${INNER_EAR}"/>
  </g>

  <!-- Face -->
  <ellipse cx="50" cy="54" rx="36" ry="34" fill="url(#catFaceGrad)"/>

  <!-- Ginger stripes on forehead -->
  <path d="M44 24 Q45 30 43 33" stroke="${FUR_DARK}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".5"/>
  <path d="M50 22 Q50 29 50 32" stroke="${FUR_DARK}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".5"/>
  <path d="M56 24 Q55 30 57 33" stroke="${FUR_DARK}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".5"/>

  <!-- Blush -->
  <ellipse cx="26" cy="60" rx="6" ry="4" fill="${BLUSH}"/>
  <ellipse cx="74" cy="60" rx="6" ry="4" fill="${BLUSH}"/>

  <!-- Whiskers -->
  <g stroke="${MOUTH}" stroke-width="1.2" stroke-linecap="round" opacity=".6" fill="none">
    <path d="M18 56 L8 53"/>
    <path d="M18 60 L7 60"/>
    <path d="M18 64 L9 67"/>
    <path d="M82 56 L92 53"/>
    <path d="M82 60 L93 60"/>
    <path d="M82 64 L91 67"/>
  </g>

  <!-- ===== EYES (expression-specific) ===== -->
  <!-- Normal round eyes (idle, thinking uses these with modification) -->
  <g class="cat-eyes cat-eyes-normal" data-show="idle">
    <ellipse cx="37" cy="48" rx="7.5" ry="8.5" fill="white"/>
    <ellipse cx="37" cy="49" rx="5.5" ry="6.5" fill="${IRIS}"/>
    <ellipse cx="37" cy="49" rx="3" ry="5" fill="${PUPIL}"/>
    <circle cx="35" cy="46" r="1.8" fill="white"/>
    <circle cx="39" cy="51" r=".8" fill="white" opacity=".7"/>

    <ellipse cx="63" cy="48" rx="7.5" ry="8.5" fill="white"/>
    <ellipse cx="63" cy="49" rx="5.5" ry="6.5" fill="${IRIS}"/>
    <ellipse cx="63" cy="49" rx="3" ry="5" fill="${PUPIL}"/>
    <circle cx="61" cy="46" r="1.8" fill="white"/>
    <circle cx="65" cy="51" r=".8" fill="white" opacity=".7"/>
  </g>

  <!-- Happy curved eyes (^ ^) -->
  <g class="cat-eyes cat-eyes-happy" data-show="happy" fill="none" stroke="${PUPIL}" stroke-width="2.5" stroke-linecap="round">
    <path d="M30 50 Q37 42 44 50"/>
    <path d="M56 50 Q63 42 70 50"/>
  </g>

  <!-- Sad eyes with tear -->
  <g class="cat-eyes cat-eyes-sad" data-show="sad">
    <ellipse cx="37" cy="50" rx="7" ry="7.5" fill="white"/>
    <ellipse cx="37" cy="51" rx="4.5" ry="5.5" fill="${IRIS}"/>
    <ellipse cx="37" cy="52" rx="2.5" ry="4" fill="${PUPIL}"/>
    <circle cx="35" cy="48" r="1.5" fill="white"/>
    <!-- sad eyebrows -->
    <path d="M30 40 L42 43" stroke="${FUR_DARK}" stroke-width="2" stroke-linecap="round" fill="none"/>

    <ellipse cx="63" cy="50" rx="7" ry="7.5" fill="white"/>
    <ellipse cx="63" cy="51" rx="4.5" ry="5.5" fill="${IRIS}"/>
    <ellipse cx="63" cy="52" rx="2.5" ry="4" fill="${PUPIL}"/>
    <circle cx="61" cy="48" r="1.5" fill="white"/>
    <path d="M70 40 L58 43" stroke="${FUR_DARK}" stroke-width="2" stroke-linecap="round" fill="none"/>

    <!-- Tear -->
    <path class="cat-tear" d="M44 52 Q43 60 45 64 Q47 60 46 52 Z" fill="#7ec8e3" opacity=".85"/>
  </g>

  <!-- Thinking eyes (looking up, one slightly narrowed) -->
  <g class="cat-eyes cat-eyes-thinking" data-show="thinking">
    <ellipse cx="37" cy="48" rx="7.5" ry="8.5" fill="white"/>
    <ellipse cx="37" cy="46" rx="5" ry="5.5" fill="${IRIS}"/>
    <ellipse cx="37" cy="45" rx="2.8" ry="4" fill="${PUPIL}"/>
    <circle cx="35" cy="43" r="1.6" fill="white"/>

    <ellipse cx="63" cy="48" rx="7.5" ry="8.5" fill="white"/>
    <ellipse cx="63" cy="46" rx="5" ry="5.5" fill="${IRIS}"/>
    <ellipse cx="63" cy="45" rx="2.8" ry="4" fill="${PUPIL}"/>
    <circle cx="61" cy="43" r="1.6" fill="white"/>
    <!-- raised eyebrow -->
    <path d="M57 37 L68 35" stroke="${FUR_DARK}" stroke-width="2" stroke-linecap="round" fill="none"/>
  </g>

  <!-- Celebrate/cheer eyes (star shaped) -->
  <g class="cat-eyes cat-eyes-star" data-show="celebrate cheer" fill="#ffd36e" stroke="${FUR_DARK}" stroke-width="1">
    <path d="M37 40 L39 47 L46 47 L40.5 51 L42.5 58 L37 54 L31.5 58 L33.5 51 L28 47 L35 47 Z"/>
    <path d="M63 40 L65 47 L72 47 L66.5 51 L68.5 58 L63 54 L57.5 58 L59.5 51 L54 47 L61 47 Z"/>
  </g>

  <!-- Sleepy half-closed eyes -->
  <g class="cat-eyes cat-eyes-sleepy" data-show="sleepy">
    <path d="M29 50 Q37 46 45 50 Q37 54 29 50 Z" fill="${PUPIL}"/>
    <path d="M55 50 Q63 46 71 50 Q63 54 55 50 Z" fill="${PUPIL}"/>
    <path d="M29 48 Q37 44 45 48" stroke="${FUR_DARK}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M55 48 Q63 44 71 48" stroke="${FUR_DARK}" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- ===== NOSE ===== -->
  <path d="M47 58 Q50 55 53 58 Q50 62 47 58 Z" fill="${NOSE}"/>

  <!-- ===== MOUTHS (expression-specific) ===== -->
  <!-- Normal small cat mouth -->
  <g class="cat-mouth cat-mouth-normal" data-show="idle thinking" fill="none" stroke="${MOUTH}" stroke-width="1.8" stroke-linecap="round">
    <path d="M50 61 L50 64"/>
    <path d="M50 64 Q46 67 43 65"/>
    <path d="M50 64 Q54 67 57 65"/>
  </g>

  <!-- Happy open smile -->
  <g class="cat-mouth cat-mouth-happy" data-show="happy">
    <path d="M42 64 Q50 74 58 64 Q50 68 42 64 Z" fill="#d4684a"/>
    <path d="M44 65 Q50 71 56 65" stroke="#ff9980" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Sad frown -->
  <g class="cat-mouth cat-mouth-sad" data-show="sad" fill="none" stroke="${MOUTH}" stroke-width="2" stroke-linecap="round">
    <path d="M44 70 Q50 65 56 70"/>
  </g>

  <!-- Big cheer open mouth -->
  <g class="cat-mouth cat-mouth-cheer" data-show="celebrate cheer">
    <ellipse cx="50" cy="68" rx="8" ry="7" fill="#d4684a"/>
    <ellipse cx="50" cy="71" rx="5" ry="3.5" fill="#ff9980"/>
  </g>

  <!-- Sleepy small mouth -->
  <g class="cat-mouth cat-mouth-sleepy" data-show="sleepy" fill="none" stroke="${MOUTH}" stroke-width="1.8" stroke-linecap="round">
    <path d="M46 66 Q50 69 54 66"/>
  </g>

  <!-- ===== Extras ===== -->
  <!-- Zzz for sleepy -->
  <g class="cat-zzz" data-show="sleepy" fill="#a0aec0" font-weight="800" font-family="sans-serif">
    <text x="78" y="28" font-size="10">z</text>
    <text x="84" y="20" font-size="13">Z</text>
    <text x="90" y="12" font-size="16">Z</text>
  </g>

  <!-- Sparkles for celebrate -->
  <g class="cat-sparkles" data-show="celebrate cheer" fill="#ffd36e">
    <path d="M14 20 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/>
    <path d="M86 18 l1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 3 -1 Z"/>
    <circle cx="20" cy="40" r="1.5" fill="#ff8e74"/>
    <circle cx="82" cy="38" r="1.5" fill="#ff8e74"/>
  </g>

  <!-- Thought bubble dot for thinking -->
  <g class="cat-think-dot" data-show="thinking" fill="white" stroke="#cbd5e0" stroke-width="1">
    <circle cx="82" cy="30" r="4"/>
    <circle cx="88" cy="22" r="2.5"/>
    <circle cx="92" cy="15" r="1.5"/>
  </g>

  <!-- Tiny paws (visible at bottom) -->
  <g class="cat-paws">
    <ellipse cx="36" cy="86" rx="8" ry="5" fill="${FUR_DARK}"/>
    <ellipse cx="64" cy="86" rx="8" ry="5" fill="${FUR_DARK}"/>
    <path d="M33 85 L33 88 M36 84 L36 88 M39 85 L39 88" stroke="${MOUTH}" stroke-width=".8" opacity=".5"/>
    <path d="M61 85 L61 88 M64 84 L64 88 M67 85 L67 88" stroke="${MOUTH}" stroke-width=".8" opacity=".5"/>
  </g>
</svg>`;
  }

  function html(expression, size) {
    const px = size ? ` style="width:${size}px;height:${size}px"` : '';
    return `<div class="lumi-mascot lumi-cat" data-expression="${expression}"${px}>${catSvg(expression)}</div>`;
  }

  function setExpression(target, expression) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    el.dataset.expression = expression;
    // Toggle visibility of expression parts
    el.querySelectorAll('[data-show]').forEach(part => {
      const shows = (part.dataset.show || '').split(/\s+/);
      part.style.display = shows.includes(expression) ? '' : 'none';
    });
  }

  return { html, setExpression, EXPRESSIONS };
});
