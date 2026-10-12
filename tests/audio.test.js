const assert=require('assert');
function load(env={}){global.window=env.window||{};global.Audio=env.Audio||function(){this.play=()=>Promise.resolve();this.pause=()=>{};};global.document=undefined;delete require.cache[require.resolve('../app/src/main/assets/audio.js')];return require('../app/src/main/assets/audio.js');}
(async()=>{
 let calls=[]; const w={}; const api=load({window:{LumiAndroid:{speakUtterance:(text,rate,speaker,id)=>calls.push({text,rate,speaker,id}),stopSpeech:()=>calls.push({stop:true})}}}); w.audio=api;
 let lines=[]; const p=api.playTurns([{text:'one',speaker:'a'},{text:'two',speaker:'b'}],{onLine:i=>lines.push(i)}); assert.equal(calls.length,1); api.nativeEvent(calls[0].id,'start'); api.nativeEvent('stale','end'); assert.equal(calls.length,1); api.nativeEvent(calls[0].id,'end'); assert.equal(calls.length,2); api.nativeEvent(calls[1].id,'end'); assert.deepEqual(lines,[0,1]); assert.equal((await p).status,'completed');
 const c=api.playTurns([{text:'cancel'}]); api.stop(); assert.equal((await c).status,'cancelled');
 api.setPreferences({speech:false}); assert.equal((await api.speak('muted')).status,'muted'); api.setPreferences({speech:true,sound:false}); assert.equal(api.sfx('correct'),null);
 console.log('audio tests passed');
})().catch(e=>{console.error(e);process.exit(1)});
