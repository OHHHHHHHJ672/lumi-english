# Lumi English 轻量源码包说明

这个压缩包保留了当前 WebView 应用源码、课程题块、测试、工具和 UI 实施方案，排除了 TTS MP3、OGG 音效、旧 APK、构建缓存、签名文件和 Android SDK。

`authored-course.js` 已保留，用于让 WebView 在没有音频资源时仍能加载课程。缺少 TTS 文件时，应用会回退到 Android 系统 TTS。

重新构建 APK 时，请先配置 Android SDK API 35、build-tools 35.0.0 和 JDK 17，然后运行：

```powershell
./build-apk.ps1 -AndroidSdk <Android SDK 路径> -JavaDir <JDK 17 路径>
```

如果需要重新生成课程聚合文件，可以运行 `node tools/rebuild-authored-bundle.js`。
