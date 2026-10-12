/* Lumi audio: deterministic sentence queue, native TTS bridge and gentle UI SFX. */
(function (root, factory) {
  const api = factory(root || (typeof window !== 'undefined' ? window : globalThis));
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.LumiAudio = api;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null), function (win) {
  let token = 0;
  let paused = false;
  let active = null;
  let pausedQueue = null;
  let speechEnabled = true;
  let soundEnabled = true;
  const sounds = {
    click: 'audio/click.ogg', correct: 'audio/correct.ogg', wrong: 'audio/wrong.ogg',
    combo: 'audio/combo.ogg', complete: 'audio/complete.ogg', reward: 'audio/reward.ogg'
  };
  const audioCache = {};
  let nextId = 1;

  function native() { return win && win.LumiAndroid; }
  function browserSpeech() { return win && win.speechSynthesis && win.SpeechSynthesisUtterance; }
  function browserVoices() {
    if (!browserSpeech() || !win.speechSynthesis.getVoices) return [];
    return win.speechSynthesis.getVoices().filter(v => /^en-US$/i.test(v.lang) || /^en[-_]US/i.test(v.lang));
  }
  function settle(item, result) {
    if (!item || item.settled) return;
    item.settled = true; item.resolve(result);
  }
  function finishCurrent(result) {
    const item = active;
    if (!item) return;
    active = null;
    if (result.status === 'completed' && item.queue && item.queue.index < item.queue.turns.length - 1 && item.queue.token === token && !paused) {
      item.queue.index += 1; speakNext(item.queue);
    } else if (result.status === 'completed' && item.queue && paused && item.queue.index < item.queue.turns.length - 1) { pausedQueue = item.queue; }
    else if (item.queue && item.queue.index >= item.queue.turns.length - 1 && result.status === 'completed') { item.queue.resolve({status:'completed'}); if (item.queue.onEnd) item.queue.onEnd(); }
    else if (item.queue) { item.queue.resolve(result); if (result.status === 'error' && item.queue.onError) item.queue.onError(result.error || 'speech error'); }
  }
  function speakNext(queue) {
    if (queue.token !== token || paused) return;
    const turn = queue.turns[queue.index] || {};
    const text = String(turn.text == null ? '' : turn.text).trim();
    if (!text) { queue.index += 1; if (queue.index < queue.turns.length) return speakNext(queue); queue.resolve({status:'completed'}); if (queue.onEnd) queue.onEnd(); return; }
    if (!speechEnabled) { queue.resolve({status:'muted'}); return; }
    const id = 'lumi-' + (nextId++);
    const item = { id, queue, settled: false };
    active = item;
    if (queue.onLine) queue.onLine(queue.index);
    const rate = Math.max(.5, Math.min(1.2, Number(queue.rate) || .9));
    speakViaTts(text, rate, id, item);
  }
  function speakViaTts(text, rate, id, item) {
    const n = native();
    if (n && typeof n.speakUtterance === 'function') {
      try { n.speakUtterance(text, rate, 'default', id); } catch (e) { finishCurrent({status:'error', error:String(e.message || e)}); }
      return;
    }
    if (browserSpeech()) {
      const u = new win.SpeechSynthesisUtterance(text); u.lang = 'en-US'; u.rate = rate;
      const voices = browserVoices(); if (voices.length) u.voice = voices[0];
      u.onend = () => { if (active && active.id === id) finishCurrent({status:'completed'}); };
      u.onerror = e => { if (active && active.id === id) finishCurrent({status:'error', error:e && e.error || 'speech error'}); };
      try { win.speechSynthesis.speak(u); } catch (e) { finishCurrent({status:'error', error:String(e.message || e)}); }
      return;
    }
    finishCurrent({status:'error', error:'Speech unavailable'});
  }
  function playTurns(turns, options) {
    options = options || {};
    const list = Array.isArray(turns) ? turns.slice() : [];
    const queue = { turns:list, index:0, rate:options.rate == null ? .9 : options.rate, onLine:options.onLine, onEnd:options.onEnd, onError:options.onError, token:++token, resolve:null };
    const promise = new Promise(resolve => { queue.resolve = resolve; });
    if (!list.length) { queue.resolve({status:'completed'}); if (queue.onEnd) queue.onEnd(); return promise; }
    if (paused) return promise;
    speakNext(queue);
    return promise;
  }
  function speak(text, rate) { return playTurns([{text:String(text == null ? '' : text), speaker:'default'}], {rate:rate == null ? .9 : rate}); }
  function stop() {
    token += 1; paused = false; pausedQueue = null;
    const n = native(); if (n && typeof n.stopSpeech === 'function') { try { n.stopSpeech(); } catch (_) {} }
    if (browserSpeech()) { try { win.speechSynthesis.cancel(); } catch (_) {} }
    if (active) finishCurrent({status:'cancelled'});
    active = null;
  }
  function pause() {
    if (paused) return;
    paused = true;
    if (browserSpeech() && win.speechSynthesis.pause) { win.speechSynthesis.pause(); return; }
    if (active && native() && typeof native().stopSpeech === 'function') { pausedQueue = active.queue; try { native().stopSpeech(); } catch (_) {} active = null; }
  }
  function resume() {
    paused = false;
    if (browserSpeech() && win.speechSynthesis.resume) { win.speechSynthesis.resume(); return; }
    if (pausedQueue) { const q = pausedQueue; pausedQueue = null; speakNext(q); }
  }
  function sfx(name) {
    if (!soundEnabled) return null;
    // Prefer Web Audio synth (richer, no file dependency)
    if (win && win.LumiSynth && typeof win.LumiSynth.play === 'function') {
      const ok = win.LumiSynth.play(name);
      if (ok) return { synth: true };
    }
    // Fallback to OGG files
    if (!win || typeof win.Audio !== 'function') return null;
    const src = sounds[name] || sounds.click;
    try {
      const a = audioCache[src] || (audioCache[src] = new win.Audio(src));
      a.currentTime = 0; const p = a.play(); if (p && p.catch) p.catch(() => {}); return a;
    } catch (_) { return null; }
  }
  function startBgm() { if (win && win.LumiSynth) win.LumiSynth.startBgm(); }
  function stopBgm() { if (win && win.LumiSynth) win.LumiSynth.stopBgm(); }
  function isBgmOn() { return win && win.LumiSynth ? win.LumiSynth.isBgmPlaying() : false; }
  function setPreferences(p) { p = p || {}; if (typeof p.speech === 'boolean') speechEnabled = p.speech; if (typeof p.sound === 'boolean') soundEnabled = p.sound; if (!speechEnabled) stop(); }
  function nativeEvent(id, event, message) {
    if (!active || active.id !== id || active.queue.token !== token) return;
    if (event === 'end') finishCurrent({status:'completed'});
    else if (event === 'error') finishCurrent({status:'error', error:message || 'speech error'});
  }
  const api = { speak, playTurns, stop, pause, resume, sfx, setPreferences, isPaused:() => paused, nativeEvent, startBgm, stopBgm, isBgmOn };
  if (win && win.document && win.document.addEventListener) {
    win.document.addEventListener('visibilitychange', () => { if (win.document.hidden) stop(); });
  }
  return api;
});
