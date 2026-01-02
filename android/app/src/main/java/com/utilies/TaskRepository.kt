package com.utilies

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.util.Log
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

    fun getItemsForTab(context: Context, tab: WidgetTab): MutableList<DataItem> {
        val cached = WidgetCache.get(tab)
        if (cached.isNotEmpty()) {
            Log.d("TaskWidget", "Returning cached items for $tab")
            return cached
        }

        // Otherwise, fetch fresh data from API
        val tabItems = refresh(context)
        val freshData = tabItems[tab] ?: mutableListOf()
        WidgetCache.set(tab, freshData)
        return freshData
//        return when (tab) {
//            WidgetTab.TASK -> mutableListOf(
//                DataItem(id = "1a", title = "Buy groceries"),
//                DataItem(id = "2a", title = "Call John"),
//                DataItem(id = "3a", title = "Send report"),
//                DataItem(id = "4a", title = "Buy groceries"),
//                DataItem(id = "5a", title = "Call John"),
//                DataItem(id = "6a", title = "Send report")
//            )
//
//            WidgetTab.TOBUY -> mutableListOf(
//                DataItem(id = "10", title = "New shoes", price = 120.0),
//                DataItem(id = "11", title = "Headphones", price = 85.5),
//                DataItem(id = "12", title = "Coffee beans", price = 20.0),
//                DataItem(id = "13", title = "New shoes", price = 120.0),
//                DataItem(id = "14", title = "Headphones", price = 85.5),
//                DataItem(id = "15", title = "Coffee beans", price = 20.0)
//            )
////
//            WidgetTab.EXPENSE -> mutableListOf(
////                DataItem(id = "20", price = 50.0, type = "Groceries", date = "31 Dec 2025"),
////                DataItem(id = "21", price = 120.0, type = "Electronics", date = "30 Dec 2025"),
////                DataItem(id = "22", price = 15.0, type = "Transport", date = "29 Dec 2025"),
////                DataItem(id = "23", price = 50.0, type = "Groceries", date = "31 Dec 2025"),
////                DataItem(id = "24", price = 120.0, type = "Electronics", date = "30 Dec 2025"),
////                DataItem(id = "25", price = 15.0, type = "Transport", date = "29 Dec 2025")
//            )
//        }

    }


    fun refresh(context: Context): Map<WidgetTab, MutableList<DataItem>> {
        //<editor-fold desc="Fetch data">

        val prefs = getEncryptedPrefs(context)
        val apiKey = prefs.getString(API_KEY, "")
        val session = prefs.getString(SESSION_TOKEN, "")
        Log.d("TaskWidget", "Refresh widget, api key: $apiKey, session token: $session")
        if (apiKey.isNullOrEmpty() || session.isNullOrEmpty()) {
            Log.e("TaskWidget", "❌ Missing credentials")
            return emptyMap()
        }

        val body = JSONObject().apply {
            put("session", session)
        }

        val res = ApiClient.post(
            endpoint = "/widget-refresh",
            apiKey = apiKey,
            body = body
        ) ?: return emptyMap()

//        Log.d("TaskWidget", "API response: $res")

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
        // TODO optimistic update + background sync
        val prefs = getEncryptedPrefs(context)
        val apiKey = prefs.getString(API_KEY, "")
        val session = prefs.getString(SESSION_TOKEN, "")
        Log.d(
            "TaskWidget",
            "Mark task $taskId done ,  api key:  $apiKey, session token: $session\""
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
            refresh(applicationContext)

            // Notify widgets on main thread
            val mgr = AppWidgetManager.getInstance(applicationContext)
            val ids = mgr.getAppWidgetIds(ComponentName(applicationContext, MyWidgetProvider::class.java))
            android.os.Handler(android.os.Looper.getMainLooper()).post {
                mgr.notifyAppWidgetViewDataChanged(ids, R.id.taskList)
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
