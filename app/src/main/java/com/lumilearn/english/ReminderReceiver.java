package com.lumilearn.english;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

/** Daily reminder. It stays local and never sends learning data anywhere. */
public class ReminderReceiver extends BroadcastReceiver {
    private static final String CHANNEL = "lumi-study-reminder";
    @Override public void onReceive(Context context, Intent intent) {
        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null) return;
        if (Build.VERSION.SDK_INT >= 26) manager.createNotificationChannel(new NotificationChannel(CHANNEL, "学习提醒", NotificationManager.IMPORTANCE_DEFAULT));
        Intent open = new Intent(context, MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pending = PendingIntent.getActivity(context, 55, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        android.content.SharedPreferences p = context.getSharedPreferences("lumi_widget", Context.MODE_PRIVATE);
        int xp = p.getInt("dailyXp", 0), goal = p.getInt("dailyGoal", 30);
        String body = xp >= goal ? "今日目标已完成，来看看地图吧。" : "今天还差 " + Math.max(0, goal - xp) + " XP，花几分钟继续冒险。";
        android.app.Notification.Builder builder = Build.VERSION.SDK_INT >= 26 ? new android.app.Notification.Builder(context, CHANNEL) : new android.app.Notification.Builder(context);
        builder.setSmallIcon(android.R.drawable.ic_dialog_info).setContentTitle("Lumi English 学习提醒").setContentText(body).setContentIntent(pending).setAutoCancel(true);
        manager.notify(55, builder.build());
    }
}
