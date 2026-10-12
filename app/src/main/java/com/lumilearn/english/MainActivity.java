package com.lumilearn.english;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.Manifest;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.content.Intent;
import android.content.ActivityNotFoundException;
import android.speech.tts.TextToSpeech;
import android.speech.tts.Voice;
import android.speech.tts.UtteranceProgressListener;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import android.os.Build;
import java.util.Calendar;
import java.util.Locale;
import java.io.ByteArrayInputStream;

/** Offline Android host; JavaScript bridge is restricted to bundled assets. */
public class MainActivity extends Activity {
    private TextToSpeech tts;
    private WebView web;
    private boolean ready, initialized;
    private boolean ttsSpeaking;
    private Voice voicePrimary, voiceSecondary;
    private final java.util.ArrayDeque<PendingSpeech> pendingSpeech = new java.util.ArrayDeque<>();
    private static final class PendingSpeech { final String text, speaker, id; final float rate; PendingSpeech(String t,float r,String s,String i){text=t;rate=r;speaker=s;id=i;} }
    @Override public void onCreate(Bundle saved) {
        super.onCreate(saved);
        getWindow().setStatusBarColor(0xFFFFF9F0);
        getWindow().setNavigationBarColor(0xFFFFF9F0);
        web = new WebView(this);
        web.setBackgroundColor(0xFFFFF9F0);
        web.setOnApplyWindowInsetsListener((view, insets) -> {
            view.setPadding(insets.getSystemWindowInsetLeft(), insets.getSystemWindowInsetTop(), insets.getSystemWindowInsetRight(), insets.getSystemWindowInsetBottom());
            return insets;
        });
        web.getSettings().setJavaScriptEnabled(true);
        web.getSettings().setDomStorageEnabled(true);
        web.getSettings().setAllowFileAccess(true);
        web.getSettings().setAllowContentAccess(false);
        web.getSettings().setAllowFileAccessFromFileURLs(false);
        web.getSettings().setAllowUniversalAccessFromFileURLs(false);
        web.getSettings().setDefaultTextEncodingName("utf-8");
        web.getSettings().setMediaPlaybackRequiresUserGesture(false);
        web.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) { return true; }
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                if (!request.getUrl().toString().startsWith("file:///android_asset/")) return new WebResourceResponse("text/plain", "utf-8", new ByteArrayInputStream(new byte[0]));
                return null;
            }
        });
        web.addJavascriptInterface(new SpeechBridge(), "LumiAndroid");
        setContentView(web);
        web.loadUrl("file:///android_asset/index.html");
        initTts();
    }
    private void initTts() {
        tts = new TextToSpeech(this, status -> {
            initialized = true;
            if (status != TextToSpeech.SUCCESS || tts == null) { ready = false; return; }
            int result = tts.setLanguage(Locale.US);
            ready = result >= TextToSpeech.LANG_AVAILABLE;
            if (ready && tts.getVoices() != null) {
                for (Voice voice : tts.getVoices()) {
                    if (voice.getLocale().equals(Locale.US) && !voice.isNetworkConnectionRequired() && (voice.getFeatures() == null || !voice.getFeatures().contains(TextToSpeech.Engine.KEY_FEATURE_NOT_INSTALLED))) {
                        if (voicePrimary == null) voicePrimary = voice; else if (voiceSecondary == null && !voice.equals(voicePrimary)) voiceSecondary = voice;
                    }
                }
                if (voicePrimary != null) tts.setVoice(voicePrimary);
            }
            if (tts != null) tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                @Override public void onStart(String id) { ttsSpeaking = true; emitSpeech(id, "start", null); }
                @Override public void onDone(String id) { ttsSpeaking = false; emitSpeech(id, "end", null); }
                @Override public void onError(String id) { ttsSpeaking = false; emitSpeech(id, "error", "TTS error"); }
            });
            if (ready) { while (!pendingSpeech.isEmpty()) speakNow(pendingSpeech.remove()); }
        });
    }
    private void emitSpeech(String id, String event, String message) {
        if (web == null || id == null) return;
        String js = "window.LumiAudio&&window.LumiAudio.nativeEvent(" + org.json.JSONObject.quote(id) + "," + org.json.JSONObject.quote(event) + "," + org.json.JSONObject.quote(message == null ? "" : message) + ")";
        runOnUiThread(() -> web.evaluateJavascript(js, null));
    }
    private void speakNow(PendingSpeech p) {
        if (!ready || tts == null) { pendingSpeech.add(p); return; }
        if (voiceSecondary != null && "secondary".equals(p.speaker)) tts.setVoice(voiceSecondary); else if (voicePrimary != null) tts.setVoice(voicePrimary);
        tts.setSpeechRate(Math.max(.5f, Math.min(1.2f, p.rate)));
        int mode = ttsSpeaking ? TextToSpeech.QUEUE_ADD : TextToSpeech.QUEUE_FLUSH;
        if (tts.speak(p.text, mode, null, p.id) == TextToSpeech.ERROR) emitSpeech(p.id, "error", "TTS unavailable");
    }
    private void message(String text) { Toast.makeText(this, text, Toast.LENGTH_LONG).show(); }
    private final class SpeechBridge {
        @JavascriptInterface public void speak(String text) { speakAtRate(text, .9f); }
        @JavascriptInterface public void speakAtRate(String text, float rate) {
            runOnUiThread(() -> {
                if (!initialized) { pendingSpeech.add(new PendingSpeech(text, rate, "default", "legacy-" + System.nanoTime())); return; }
                if (!ready || tts == null) { message("暂无可用英语语音，请在「我的 → 系统语音设置」启用英语语音包"); return; }
                if (text == null || text.length() > 1000) return;
                speakNow(new PendingSpeech(text, rate, "default", "legacy-" + System.nanoTime()));
            });
        }
        @JavascriptInterface public void speakUtterance(String text, float rate, String speaker, String id) {
            runOnUiThread(() -> {
                if (text == null || text.length() > 1000 || id == null) return;
                PendingSpeech p = new PendingSpeech(text, rate, speaker, id);
                if (!initialized) pendingSpeech.add(p); else if (!ready) emitSpeech(id, "error", "暂无可用英语语音"); else speakNow(p);
            });
        }
        @JavascriptInterface public void stopSpeech() { runOnUiThread(() -> { pendingSpeech.clear(); ttsSpeaking = false; if (tts != null) tts.stop(); }); }
        @JavascriptInterface public void buzz() {
            runOnUiThread(() -> {
                Vibrator vibrator = (Vibrator) getSystemService(VIBRATOR_SERVICE);
                if (vibrator != null && vibrator.hasVibrator()) vibrator.vibrate(VibrationEffect.createOneShot(18, VibrationEffect.DEFAULT_AMPLITUDE));
            });
        }
        @JavascriptInterface public void openSpeechSettings() {
            runOnUiThread(() -> {
                try { startActivity(new Intent("com.android.settings.TTS_SETTINGS")); }
                catch (ActivityNotFoundException e) { message("请手动打开系统设置，搜索「文字转语音」"); }
            });
        }
        @JavascriptInterface public void syncWidget(int dailyXp, int dailyGoal, int streak, String style) {
            SharedPreferences p = getSharedPreferences("lumi_widget", MODE_PRIVATE);
            p.edit().putInt("dailyXp", Math.max(0, dailyXp)).putInt("dailyGoal", Math.max(5, dailyGoal)).putInt("streak", Math.max(0, streak)).putString("style", style == null ? "sunrise" : style).apply();
            LumiWidgetProvider.updateAll(MainActivity.this);
        }
        @JavascriptInterface public void scheduleReminder(String time) {
            if (time == null || !time.matches("[0-2][0-9]:[0-5][0-9]")) return;
            try {
                String[] parts = time.split(":");
                Calendar next = Calendar.getInstance();
                next.set(Calendar.HOUR_OF_DAY, Integer.parseInt(parts[0]));
                next.set(Calendar.MINUTE, Integer.parseInt(parts[1]));
                next.set(Calendar.SECOND, 0); next.set(Calendar.MILLISECOND, 0);
                if (next.getTimeInMillis() <= System.currentTimeMillis()) next.add(Calendar.DATE, 1);
                Intent intent = new Intent(MainActivity.this, ReminderReceiver.class);
                PendingIntent pending = PendingIntent.getBroadcast(MainActivity.this, 55, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
                AlarmManager alarm = (AlarmManager) getSystemService(ALARM_SERVICE);
                if (alarm != null) alarm.setInexactRepeating(AlarmManager.RTC_WAKEUP, next.getTimeInMillis(), AlarmManager.INTERVAL_DAY, pending);
            } catch (Exception ignored) { }
        }
        @JavascriptInterface public void requestNotifications() {
            if (Build.VERSION.SDK_INT >= 33) requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 73);
        }
        @JavascriptInterface public void exitApp() { runOnUiThread(() -> finish()); }
    }
    @Override public void onBackPressed() {
    web.evaluateJavascript("(function(){ try { return window.onAndroidBack ? !!window.onAndroidBack() : false; } catch (e) { return false; } })()", handled -> {
      if (!"true".equals(handled)) super.onBackPressed();
    });
  }
    @Override protected void onStop() { if (tts != null) tts.stop(); ttsSpeaking = false; super.onStop(); }
    @Override protected void onRestart() { super.onRestart(); if (tts != null) tts.shutdown(); ready = false; initialized = false; initTts(); }
    @Override protected void onDestroy() { if (tts != null) { tts.stop(); tts.shutdown(); } if (web != null) { web.removeJavascriptInterface("LumiAndroid"); web.destroy(); } super.onDestroy(); }
}
