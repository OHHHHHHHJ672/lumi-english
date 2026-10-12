/* Lumi Sound Synth: Web Audio API synthesized sound effects + ambient BGM.
   No audio files needed. Falls back gracefully when Web Audio is unavailable.
   Exposes global LumiSynth with play(type) and startBgm()/stopBgm(). */
(function (root, factory) {
  const api = factory(root || (typeof window !== 'undefined' ? window : globalThis));
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.LumiSynth = api;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null), function () {
  let ctx = null;
  let masterGain = null;
  let bgmNodes = null;
  let bgmPlaying = false;
  let muted = false;

  function ensureCtx() {
    if (ctx) return ctx;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.35;
      masterGain.connect(ctx.destination);
    } catch (e) { ctx = null; }
    return ctx;
  }

  function now() { return ctx ? ctx.currentTime : 0; }

  function tone(freq, start, dur, type, vol, attack, release) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, start);
    const a = attack || 0.01;
    const r = release || 0.1;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(vol || 0.3, start + a);
    gain.gain.setValueAtTime(vol || 0.3, start + dur - r);
    gain.gain.linearRampToValueAtTime(0, start + dur);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(start);
    osc.stop(start + dur + 0.05);
  }

  function noise(start, dur, vol, filterFreq) {
    if (!ctx) return;
    const bufferSize = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq || 1000;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol || 0.2, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    src.start(start);
    src.stop(start + dur);
  }

  const SOUNDS = {
    click: function () {
      const t = now();
      tone(880, t, 0.06, 'square', 0.15, 0.005, 0.04);
    },
    correct: function () {
      const t = now();
      // C major arpeggio: C5-E5-G5-C6
      tone(523.25, t, 0.12, 'sine', 0.25, 0.01, 0.08);
      tone(659.25, t + 0.08, 0.12, 'sine', 0.25, 0.01, 0.08);
      tone(783.99, t + 0.16, 0.15, 'sine', 0.25, 0.01, 0.1);
      tone(1046.50, t + 0.24, 0.2, 'triangle', 0.2, 0.01, 0.12);
      // sparkle
      tone(2093, t + 0.2, 0.15, 'sine', 0.08, 0.005, 0.1);
    },
    wrong: function () {
      const t = now();
      // descending minor: A4-F4
      tone(440, t, 0.15, 'sawtooth', 0.18, 0.01, 0.1);
      tone(349.23, t + 0.1, 0.25, 'sawtooth', 0.18, 0.01, 0.15);
      noise(t, 0.15, 0.08, 400);
    },
    combo: function () {
      const t = now();
      // rapid drum + rising pitch
      for (let i = 0; i < 4; i++) {
        noise(t + i * 0.06, 0.05, 0.15, 800 + i * 200);
        tone(300 + i * 150, t + i * 0.06, 0.08, 'square', 0.12, 0.005, 0.05);
      }
      tone(1200, t + 0.24, 0.15, 'triangle', 0.18, 0.01, 0.1);
    },
    complete: function () {
      const t = now();
      // fanfare: C-E-G-C-E-G
      const notes = [523.25, 659.25, 783.99, 1046.50, 659.25, 783.99];
      notes.forEach((f, i) => {
        tone(f, t + i * 0.1, 0.18, 'triangle', 0.22, 0.01, 0.1);
      });
      tone(1568, t + 0.5, 0.35, 'sine', 0.15, 0.02, 0.2);
      noise(t + 0.5, 0.3, 0.06, 3000);
    },
    reward: function () {
      const t = now();
      // coin sparkle: high ping + descending
      tone(1318.51, t, 0.08, 'square', 0.15, 0.005, 0.05);
      tone(1760, t + 0.06, 0.12, 'sine', 0.12, 0.005, 0.08);
      tone(987.77, t + 0.14, 0.15, 'triangle', 0.1, 0.01, 0.1);
    },
    levelup: function () {
      const t = now();
      // triumphant: C-G-C-E-G-C
      tone(523.25, t, 0.15, 'triangle', 0.25, 0.01, 0.1);
      tone(783.99, t + 0.12, 0.15, 'triangle', 0.25, 0.01, 0.1);
      tone(1046.50, t + 0.24, 0.2, 'triangle', 0.25, 0.01, 0.12);
      tone(1318.51, t + 0.36, 0.25, 'sine', 0.2, 0.01, 0.15);
      noise(t + 0.3, 0.25, 0.05, 4000);
    },
    streak: function () {
      const t = now();
      tone(660, t, 0.08, 'square', 0.12, 0.005, 0.05);
      tone(880, t + 0.07, 0.1, 'square', 0.12, 0.005, 0.06);
      tone(1100, t + 0.14, 0.12, 'triangle', 0.14, 0.01, 0.08);
    },
    unlock: function () {
      const t = now();
      tone(392, t, 0.1, 'sine', 0.2, 0.01, 0.06);
      tone(523.25, t + 0.08, 0.1, 'sine', 0.2, 0.01, 0.06);
      tone(659.25, t + 0.16, 0.15, 'sine', 0.2, 0.01, 0.08);
      tone(783.99, t + 0.24, 0.2, 'triangle', 0.18, 0.01, 0.12);
    },
  };

  function play(type) {
    if (muted) return;
    const c = ensureCtx();
    if (!c) return false;
    if (c.state === 'suspended') c.resume();
    const fn = SOUNDS[type];
    if (fn) { fn(); return true; }
    return false;
  }

  function setMuted(m) { muted = !!m; if (muted && bgmPlaying) stopBgm(); }

  // ===== Ambient BGM: gentle C major pad with slow arpeggio =====
  function startBgm() {
    if (muted || bgmPlaying) return;
    const c = ensureCtx();
    if (!c) return;
    if (c.state === 'suspended') c.resume();

    const bgmGain = c.createGain();
    bgmGain.gain.value = 0;
    bgmGain.gain.linearRampToValueAtTime(0.08, c.currentTime + 2);
    bgmGain.connect(masterGain);

    // Pad: two detuned oscillators on C3 and G3
    const padOsc1 = c.createOscillator();
    const padOsc2 = c.createOscillator();
    const padGain = c.createGain();
    padOsc1.type = 'sine';
    padOsc2.type = 'sine';
    padOsc1.frequency.value = 130.81; // C3
    padOsc2.frequency.value = 196.00; // G3
    padGain.gain.value = 0.5;
    padOsc1.connect(padGain);
    padOsc2.connect(padGain);
    padGain.connect(bgmGain);
    padOsc1.start();
    padOsc2.start();

    // Slow LFO on pad gain for breathing effect
    const lfo = c.createOscillator();
    const lfoGain = c.createGain();
    lfo.frequency.value = 0.15;
    lfoGain.gain.value = 0.15;
    lfo.connect(lfoGain);
    lfoGain.connect(padGain.gain);
    lfo.start();

    // Arpeggio: C major pentatonic, very slow and soft
    const arpNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33];
    let arpStep = 0;
    const arpInterval = setInterval(() => {
      if (!bgmPlaying || muted) return;
      const t = c.currentTime;
      const f = arpNotes[arpStep % arpNotes.length];
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = 'triangle';
      osc.frequency.value = f;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.04, t + 0.3);
      g.gain.linearRampToValueAtTime(0, t + 1.5);
      osc.connect(g);
      g.connect(bgmGain);
      osc.start(t);
      osc.stop(t + 1.6);
      arpStep++;
    }, 1200);

    bgmNodes = { padOsc1, padOsc2, lfo, bgmGain, arpInterval };
    bgmPlaying = true;
  }

  function stopBgm() {
    if (!bgmPlaying || !bgmNodes || !ctx) return;
    const t = ctx.currentTime;
    try {
      bgmNodes.bgmGain.gain.cancelScheduledValues(t);
      bgmNodes.bgmGain.gain.linearRampToValueAtTime(0, t + 0.5);
      setTimeout(() => {
        try { bgmNodes.padOsc1.stop(); bgmNodes.padOsc2.stop(); bgmNodes.lfo.stop(); } catch (e) {}
      }, 600);
      clearInterval(bgmNodes.arpInterval);
    } catch (e) {}
    bgmPlaying = false;
    bgmNodes = null;
  }

  function isBgmPlaying() { return bgmPlaying; }

  return { play, setMuted, startBgm, stopBgm, isBgmPlaying, ensureCtx };
});
