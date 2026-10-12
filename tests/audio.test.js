const assert=require('assert');
function load(env={}){global.window=env.window||{};global.Audio=env.Audio||function(){this.play=()=>Promise.resolve();this.pause=()=>{};};global.document=undefined;delete require.cache[require.resolve('../app/src/main/assets/audio.js')];return require('../app/src/main/assets/audio.js');}
(async()=>{
 let calls=[]; const w={}; const api=load({window:{LumiAndroid:{speakUtterance:(text,rate,speaker,id)=>calls.push({text,rate,speaker,id}),stopSpeech:()=>calls.push({stop:true})}}}); w.audio=api;
 let lines=[]; const p=api.playTurns([{text:'one',speaker:'a'},{text:'two',speaker:'b'}],{onLine:i=>lines.push(i)}); assert.equal(calls.length,1); api.nativeEvent(calls[0].id,'start'); api.nativeEvent('stale','end'); assert.equal(calls.length,1); api.nativeEvent(calls[0].id,'end'); assert.equal(calls.length,2); api.nativeEvent(calls[1].id,'end'); assert.deepEqual(lines,[0,1]); assert.equal((await p).status,'completed');
 const c=api.playTurns([{text:'cancel'}]); api.stop(); assert.equal((await c).status,'cancelled');
 api.setPreferences({speech:false}); assert.equal((await api.speak('muted')).status,'muted'); api.setPreferences({speech:true,sound:false}); assert.equal(api.sfx('correct'),null);

  // Voice slots. A solo sentence has no character to voice, so it stays on
  // primary; the two roles in a scene must get distinct, stable slots.
  // Sequence so far: turns 'a'/'b' above, then the bare 'cancel' queue.
  assert.deepEqual(calls.filter(x => x && x.speaker).map(x => x.speaker), ['primary','secondary','primary']);
  calls.length = 0; api.speak('solo'); assert.equal(calls[0].speaker,'primary'); api.stop();

  const scene = require('../app/src/main/assets/dialogue-data.js').stories
    .find(s => Array.isArray(s.turns) && s.turns.length >= 2);
  assert.ok(scene, 'expected at least one authored dialogue');
  const roles = [...new Set(scene.turns.map(t => t.speaker))];
  assert.equal(roles.length, 2, 'expected two roles, got ' + roles.join(', '));
  calls.length = 0;
  const sceneQueue = api.playTurns(scene.turns.map(t => ({ text:t.text, speaker:t.speaker })));
  for (let i = 0; i < scene.turns.length; i++) { assert.equal(calls[i].text, scene.turns[i].text); api.nativeEvent(calls[i].id,'end'); }
  assert.equal((await sceneQueue).status,'completed');
  assert.notEqual(calls[0].speaker, calls[1].speaker, 'the two roles must not share a voice');
  calls.forEach((x,i) => assert.equal(x.speaker, i % 2 ? calls[1].speaker : calls[0].speaker, 'turn ' + i + ' slipped off its slot'));

  console.log('audio tests passed');
})().catch(e=>{console.error(e);process.exit(1)});
