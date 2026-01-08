package com.utilies

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.util.Log
import android.widget.Toast
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import org.json.JSONArray
import org.json.JSONObject


object TaskRepository {
    private const val PREFS_NAME = "SecureStore"
    private const val SESSION_TOKEN = "SESSION_TOKEN"
    private const val API_KEY = "API_KEY"

//    fun getItemsForTab(context: Context, tab: WidgetTab): MutableList<DataItem> {
//        val cached = WidgetCache.get(tab)
//        if (cached.isNotEmpty()) {
//            Log.d("TaskWidget", "Returning cached items for $tab")
//            return cached
//        }
//
//        // Otherwise, fetch fresh data from API
//        val tabItems = refresh(context)
//        val freshData = tabItems[tab] ?: mutableListOf()
//        WidgetCache.set(tab, freshData)
//        return freshData
//
//    }


    fun refresh(context: Context): Map<WidgetTab, MutableList<DataItem>> {
        //<editor-fold desc="Fetch data">

        val prefs = getEncryptedPrefs(context)
        val apiKey = prefs.getString(API_KEY, "")
        val session = prefs.getString(SESSION_TOKEN, "")
        Log.d("TaskWidget", "Refresh widget, api key: $apiKey, session token: $session")
        if (apiKey.isNullOrEmpty() || session.isNullOrEmpty()) {
            Toast.makeText(context, "Missing credentials", Toast.LENGTH_SHORT).show()
            return emptyMap()
        }

        val body = JSONObject().apply {
            put("session", session)
        }

        val res = ApiClient.post(
            context,
            endpoint = "/widget-refresh",
            apiKey = apiKey,
            body = body
        ) ?: return emptyMap()

        val dataArray = res.optJSONArray("data") ?: JSONArray()
        val tabItemsList =
            WidgetMapper.fromApi(dataArray) // returns List<Pair<WidgetTab, MutableList<DataItem>>>

        val map = mutableMapOf<WidgetTab, MutableList<DataItem>>()
        for ((tab, items) in tabItemsList) {
            map[tab] = items
            WidgetCache.set(tab, items) // cache globally
            Log.d("TaskWidget", "Loaded ${items.size} items for $tab")
        }
        //</editor-fold>
        return map
    }


    fun markDone(context: Context, taskId: String) {
        val prefs = getEncryptedPrefs(context)
        val apiKey = prefs.getString(API_KEY, "")
        val session = prefs.getString(SESSION_TOKEN, "")
        Log.d("TaskWidget", "mark task $taskId done")

        if (apiKey.isNullOrEmpty() || session.isNullOrEmpty()) {
            Toast.makeText(context, "Missing credentials", Toast.LENGTH_SHORT).show()
            return
        }

        val body = JSONObject().apply {
            put("session", session)
        }

        val res = ApiClient.post(
            context,
            endpoint = "/mark-done/$taskId",
            apiKey = apiKey,
            body = body
        )


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

    class WidgetSyncWorker(
        context: Context,
        params: WorkerParameters
    ) : CoroutineWorker(context, params) {

        override suspend fun doWork(): Result {
            when (inputData.getString("ACTION")) {

                MyWidgetProvider.ACTION_REFRESH -> refresh(applicationContext)

                MyWidgetProvider.ACTION_MARK_DONE -> {
                    val taskId = inputData.getString("TASK_ID") ?: return Result.failure()
                    markDone(applicationContext, taskId)
                    refresh(applicationContext)
                }
            }

            return Result.success()
        }
    }

    object WidgetCache {
        private val cache = mutableMapOf<WidgetTab, MutableList<DataItem>>()

        fun get(tab: WidgetTab): MutableList<DataItem> {
            return cache[tab] ?: mutableListOf()
        }

        fun set(tab: WidgetTab, items: List<DataItem>) {
            cache[tab] = items.toMutableList()
        }

        fun clear(tab: WidgetTab? = null) {
            if (tab != null) {
                cache.remove(tab)
            } else {
                cache.clear()
            }
        }
    }


}
