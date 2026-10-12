# Lumi English Beta 学习循环验证报告

日期：2026-09-29

## 本轮覆盖

- 取消学习入口的能量限制；答错不会扣除学习资源，也不会阻止继续上课。
- Lumi 积分：新题首次答对 +2，首次完成关卡 +10，完美通关 +15，每日目标 +15；题目提示消耗 3 点。
- 题目页隐藏完整翻译；英文句子中的已知词可以单独点击查看释义，完整译文只在提交反馈后出现。
- 听力题进入新题后自动播放一次，保留手动播放和慢速播放。
- 配对题题库最少 6 对，并校验英文和中文两侧不重复；点错只闪红，不计为整题错误。
- CET4/CET6 用户从高级分级题和 B1/B2 路线开始，不回到 A1 问候语。

## 自动化验证

```text
node --test tests/*.test.js
12 tests passed

node tools/validate-course.js
levels: 4, lessons: 144, questions: 864

node --check app/src/main/assets/app.js
node --check app/src/main/assets/interaction.js
node --check app/src/main/assets/model.js
node --check app/src/main/assets/course.js
passed
```

## Android 打包

使用本机 Android API 35、Build Tools 35.0.0 和 Java 17 构建成功；APK 已通过 v2/v3 签名校验。构建脚本兼容当前 PowerShell 的原生命令错误处理和随机数 API。

交付文件：`Lumi-English-Beta-1.1.apk`

## 页面冒烟

通过本地 HTTP 页面检查了 onboarding、CET4 用户路线、B1 起始关卡、错误反馈、积分提示入口、听力题入口和 6 对配对题。页面顶部显示连续天数、Lumi 积分和累计 XP，未显示能量或宝石语义。

## Beta 还未达到正式版的部分

- 当前题库仍为 144 关 / 864 题，正式版需要继续扩充为多月可学习的数千词汇、语法和输入型题目。
- 跟读评分、键盘打字/听写、间隔重复算法、成就/联赛和云同步还未接入。
- 系统 TTS 已可用，正式版仍需在不同 Android 设备上验证英语语音包、后台恢复和低端机性能。
