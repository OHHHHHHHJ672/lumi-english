# Lumi English Beta

Lumi English 是一个原创的离线英语学习游戏 Android MVP，面向中文用户。它用路线图、关卡、XP、能量、连续学习和奖励动效，把英语练习做成每天可以完成的一小段冒险。

## Beta 内容

- 4 个 CEFR 阶段：A1 基础生存、A2 日常交流、B1 独立沟通、B2 工作与旅行
- 80 个独立关卡、480 道练习（四个 CEFR 等级各 20 关）；覆盖日常、学习、工作、研究、科技、公共议题等场景
- 单词释义、中文翻译、听力选择、拼句、填空、词语配对
- 启动规划：学习目的、英语背景、目标等级、分级测试、每日学习分钟数、提醒时间、桌面伙伴样式
- 每日 XP 目标会随学习时间变化；支持连续天数、能量、宝石、错题复习和本地词典
- 答错题目会回到当前关卡队列；课程完成后才算通关，重复练习不会重复发放题目 XP
- 题型顺序在每次开课时随机；课程和题目带有 CEFR、语法和技能标签
- Android 系统 TextToSpeech 英语朗读，普通/慢速按钮和音效动效
- 本地桌面小组件：显示今日 XP、目标进度和连续学习天数；支持本地每日通知提醒
- 不需要账号、不接云端、不上传学习记录

## 安装

在 Android 手机上允许安装来自此来源的应用，然后打开 Beta APK。首次启动会引导你选择英语背景、目标和学习节奏，并从适合的题目开始测试。

如果朗读没有声音：进入应用「我的 → 检查英语语音」或「系统语音设置」，选择系统文字转语音引擎并安装英语语音包。部分手机的英语语音包需要联网下载。

桌面小组件添加方式：长按手机桌面 → 小组件 → Lumi English → 拖到桌面。打开应用并完成一关后，小组件会自动同步今日进度。

## 源码结构

- `app/src/main/assets/course.js`：四个 CEFR 阶段的 80 个 Beta 关卡和题目数据
- `app/src/main/assets/model.js`：本地进度、能量、连续天数和奖励规则
- `app/src/main/assets/app.js`：路线图、关卡和基础界面
- `app/src/main/assets/interaction.js`：交互、复习、词典、动效和启动规划
- `app/src/main/java/.../MainActivity.java`：Android WebView 容器、系统 TTS 和提醒桥接
- `app/src/main/java/.../LumiWidgetProvider.java`：桌面小组件

Android Studio 可以直接打开本目录的 Gradle 工程。若构建环境没有 Android Studio，也可以使用 `build-apk.ps1`；脚本使用 Android API 35 和 Java 17，并输出 `build/Lumi-English-1.1.apk`。

此版本的内容、角色和视觉均为独立设计，没有使用第三方学习软件的商标、素材或题库。
