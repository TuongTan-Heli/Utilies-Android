package com.utilies

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import android.util.Log
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import android.content.SharedPreferences

class MyWidgetProvider : AppWidgetProvider() {

    companion object {
        const val ACTION_REFRESH = "com.utilies.ACTION_REFRESH"
    }

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, ids: IntArray) {

        for (id in ids) {
            val views = RemoteViews(context.packageName, R.layout.widget_layout)

            val refreshIntent = Intent(context, MyWidgetProvider::class.java).apply {
                action = ACTION_REFRESH
                putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, id)
            }
            val pending = PendingIntent.getBroadcast(
                context,
                id,
                refreshIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.refresh_btn, pending)


            appWidgetManager.updateAppWidget(id, views)
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        if (intent.action == ACTION_REFRESH) {
            val work = OneTimeWorkRequestBuilder<WidgetRefreshWorker>().build()
            WorkManager.getInstance(context).enqueue(work)
        }
    }
}

