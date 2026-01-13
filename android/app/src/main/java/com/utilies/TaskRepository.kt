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
    fun refresh(context: Context): Map<WidgetTab, MutableList<DataItem>> {
        val res = ApiClient.post(
            context,
            "/widget-refresh",
            JSONObject()
        ) ?: return emptyMap()

        val dataArray = res.optJSONArray("data") ?: JSONArray()
        val tabItemsList = WidgetMapper.fromApi(dataArray)

        val map = mutableMapOf<WidgetTab, MutableList<DataItem>>()
        for ((tab, items) in tabItemsList) {
            map[tab] = items
            WidgetCache.set(tab, items)
        }

        return map
    }


    fun markDone(context: Context, taskId: String) {
        ApiClient.post(
            context,
            "/mark-done/$taskId",
            JSONObject()
        )
    }

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
