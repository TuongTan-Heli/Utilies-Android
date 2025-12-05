package com.utilies

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.widget.RemoteViews
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import okhttp3.OkHttpClient
import okhttp3.Request
import android.util.Log
import android.content.Intent
import android.app.PendingIntent
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import android.content.SharedPreferences


class WidgetRefreshWorker(appContext: Context, params: WorkerParameters) :
    CoroutineWorker(appContext, params) {
    companion object {
            private const val PREFS_NAME = "SecureStore"
            private const val SESSION_TOKEN = "SESSION_TOKEN"
            private const val API_KEY = "API_KEY"
    }
    override suspend fun doWork(): Result {
        try {

            val mgr = AppWidgetManager.getInstance(applicationContext)
            val ids = mgr.getAppWidgetIds(ComponentName(applicationContext, MyWidgetProvider::class.java))

            val prefs = getEncryptedPrefs(applicationContext)
            val sessionToken = prefs.getString(SESSION_TOKEN, null)
            val apiKey = prefs.getString(API_KEY, null)


            for (id in ids) {
                val views = RemoteViews(applicationContext.packageName, R.layout.widget_layout)
                views.setTextViewText(R.id.widgetTitle, sessionToken)
                views.setTextViewText(R.id.widgetSubtitle, apiKey)


                // Reattach the refresh PendingIntent (keeps behavior after update)
                val refreshIntent = Intent(applicationContext, MyWidgetProvider::class.java).apply {
                action = MyWidgetProvider.ACTION_REFRESH
                }
                val refreshPendingIntent = PendingIntent.getBroadcast(
                    applicationContext,
                    id,
                    refreshIntent,
                    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                )
                views.setOnClickPendingIntent(R.id.refresh_btn, refreshPendingIntent)

                mgr.updateAppWidget(id, views)
            }

            return Result.success()
        } catch (e: Exception) {
            e.printStackTrace()
            return Result.retry()
        }
    }

    private fun getEncryptedPrefs(context: Context) =
        EncryptedSharedPreferences.create(
            context,
            PREFS_NAME,
            MasterKey.Builder(context)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build(),
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
}
