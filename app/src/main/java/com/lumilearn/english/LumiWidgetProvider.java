package com.lumilearn.english;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

/** Compact home-screen progress card. Android launchers refresh it on state changes. */
public class LumiWidgetProvider extends AppWidgetProvider {
    public static void updateAll(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        ComponentName name = new ComponentName(context, LumiWidgetProvider.class);
        int[] ids = manager.getAppWidgetIds(name);
        for (int id : ids) update(context, manager, id);
    }

    private static void update(Context context, AppWidgetManager manager, int id) {
        SharedPreferences p = context.getSharedPreferences("lumi_widget", Context.MODE_PRIVATE);
        int xp = Math.max(0, p.getInt("dailyXp", 0));
        int goal = Math.max(5, p.getInt("dailyGoal", 30));
        int streak = Math.max(0, p.getInt("streak", 0));
        String style = p.getString("style", "sunrise");
        String mascot = "sunrise".equals(style) ? "🌅" : "forest".equals(style) ? "🌿" : "🚀";
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_lumi);
        views.setTextViewText(R.id.widget_mascot, mascot);
        views.setTextViewText(R.id.widget_subtitle, "今日学习 " + Math.min(xp, goal) + " / " + goal + " XP");
        views.setTextViewText(R.id.widget_streak, "🔥 " + streak);
        views.setProgressBar(R.id.widget_progress, goal, Math.min(xp, goal), false);
        views.setTextViewText(R.id.widget_hint, xp >= goal ? "今日目标完成，继续保持 →" : "点击继续今天的冒险 →");
        Intent launch = new Intent(context, MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        views.setOnClickPendingIntent(R.id.widget_hint, PendingIntent.getActivity(context, 40, launch, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE));
        views.setOnClickPendingIntent(R.id.widget_mascot, PendingIntent.getActivity(context, 41, launch, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE));
        manager.updateAppWidget(id, views);
    }

    @Override public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
        for (int id : ids) update(context, manager, id);
    }
}
