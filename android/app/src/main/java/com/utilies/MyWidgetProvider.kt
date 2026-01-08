package com.utilies

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Log
import android.view.View
import android.widget.RemoteViews
import androidx.core.net.toUri
import androidx.work.ExistingWorkPolicy
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.workDataOf

class MyWidgetProvider : AppWidgetProvider() {

    companion object {
        const val ACTION_REFRESH = "ACTION_REFRESH"
        const val ACTION_MARK_DONE = "ACTION_MARK_DONE"
        const val ACTION_SWITCH_TAB = "ACTION_SWITCH_TAB"
        const val ACTION_QUICK_ADD = "ACTION_QUICK_ADD"
        const val KEY_ACTION = "ACTION"
        const val KEY_TASK_ID = "TASK_ID"
    }

    override fun onEnabled(context: Context?) {
        super.onEnabled(context)

        context?.let {
            // Enqueue a refresh work without a specific widget ID
            WorkManager.getInstance(it)
                .enqueueUniqueWork(
                    "widget_refresh",
                    ExistingWorkPolicy.REPLACE,
                    OneTimeWorkRequestBuilder<TaskRepository.WidgetSyncWorker>()
                        .setInputData(
                            workDataOf("ACTION" to MyWidgetProvider.ACTION_REFRESH)
                        )
                        .build()
                )
        }
    }

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        appWidgetIds.forEach { appWidgetId ->
            val views = RemoteViews(context.packageName, R.layout.utilies_widget)
            //<editor-fold desc="Check first run to refresh">
//            val isFirstRun = WidgetSettings.isFirstRun(context, appWidgetId)

            val alpha = WidgetSettings.getAlpha(context, appWidgetId)
            val dark = WidgetSettings.getDarkMode(context, appWidgetId)
            val color = (alpha shl 24) or if (dark) 0x000000 else 0xFFFFFF
            views.setInt(R.id.widget_root, "setBackgroundColor", color)
            val hideToBuy = WidgetSettings.getHideToBuy(context, appWidgetId)
            views.setViewVisibility(R.id.tabToBuy, if (hideToBuy) View.GONE else View.VISIBLE)

//            if (isFirstRun) {

//                WidgetSettings.setFirstRun(context, appWidgetId, false)
//            }
            //</editor-fold>

            //<editor-fold desc="Refresh intent">
            val refreshIntent = Intent(context, MyWidgetProvider::class.java)
                .setAction(ACTION_REFRESH)

            val refreshPI = PendingIntent.getBroadcast(
                context, 1, refreshIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )

            views.setOnClickPendingIntent(R.id.btn_refresh, refreshPI)
            //</editor-fold>

            //<editor-fold desc="Quick add intent">
            val currentTab = WidgetState.getTab(context, appWidgetId).name
            val addIntent = Intent(context, QuickAddActivity::class.java)
                .setAction(ACTION_QUICK_ADD)
                .apply {
                    putExtra("screen", "QuickAddScreen")
                    putExtra("type", currentTab.lowercase())
                }

            val addPI = PendingIntent.getActivity(
                context,
                currentTab.hashCode(),
                addIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.btn_add, addPI)
            //</editor-fold>

            //<editor-fold desc="Tab change intent">
            views.setOnClickPendingIntent(
                R.id.tabToDo,
                tabPendingIntent(context, appWidgetId, WidgetTab.TASK, 10)
            )

            views.setOnClickPendingIntent(
                R.id.tabExpense,
                tabPendingIntent(context, appWidgetId, WidgetTab.EXPENSE, 11)
            )

            views.setOnClickPendingIntent(
                R.id.tabToBuy,
                tabPendingIntent(context, appWidgetId, WidgetTab.TOBUY, 12)
            )
            //</editor-fold>

            //<editor-fold desc="List adapter">
            val svcIntent = Intent(context, TaskRemoteService::class.java)
            svcIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
            svcIntent.data = "widget://tasklist/$appWidgetId".toUri()
            views.setRemoteAdapter(R.id.taskList, svcIntent)
            //</editor-fold>

            //<editor-fold desc="Mark done intent">
            val markDoneTemplate = Intent(context, MyWidgetProvider::class.java).apply {
                action = ACTION_MARK_DONE
                data = "widget://mark_done/$appWidgetId".toUri()
            }

            val markDonePI = PendingIntent.getBroadcast(
                context,
                appWidgetId,
                markDoneTemplate,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE
            )

            views.setPendingIntentTemplate(R.id.taskList, markDonePI)
            //</editor-fold>

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        when (intent.action) {

            ACTION_SWITCH_TAB -> {
                val widgetId = intent.getIntExtra(
                    AppWidgetManager.EXTRA_APPWIDGET_ID,
                    AppWidgetManager.INVALID_APPWIDGET_ID
                )

                val newTab =
                    WidgetTab.valueOf(intent.getStringExtra("TAB")!!)

                WidgetState.saveTab(context, widgetId, newTab)
                onUpdate(context, AppWidgetManager.getInstance(context), intArrayOf(widgetId))
                notify(context)
            }

            ACTION_REFRESH -> {
                val work = OneTimeWorkRequestBuilder<TaskRepository.WidgetSyncWorker>()
                    .setInputData(
                        workDataOf(KEY_ACTION to ACTION_REFRESH)
                    )
                    .build()

                WorkManager.getInstance(context)
                    .enqueueUniqueWork(
                        "widget_sync",
                        ExistingWorkPolicy.REPLACE,
                        work
                    )
                val mgr = AppWidgetManager.getInstance(context)
                val ids = mgr.getAppWidgetIds(ComponentName(context, MyWidgetProvider::class.java))
                mgr.notifyAppWidgetViewDataChanged(ids, R.id.taskList)
            }

            ACTION_MARK_DONE -> {
                val itemId = intent.getStringExtra("ITEM_ID") ?: run {
                    Log.e("TaskWidget", "❌ MARK DONE received NULL ITEM_ID")
                    return
                }

                val work = OneTimeWorkRequestBuilder<TaskRepository.WidgetSyncWorker>()
                    .setInputData(
                        workDataOf(
                            KEY_ACTION to ACTION_MARK_DONE,
                            KEY_TASK_ID to itemId
                        )
                    )
                    .build()

                WorkManager.getInstance(context)
                    .enqueue(work)

                notify(context)
                val mgr = AppWidgetManager.getInstance(context)
                val ids = mgr.getAppWidgetIds(ComponentName(context, MyWidgetProvider::class.java))
                mgr.notifyAppWidgetViewDataChanged(ids, R.id.taskList)
            }

        }
    }

    private fun notify(context: Context) {
        val mgr = AppWidgetManager.getInstance(context)
        val ids = mgr.getAppWidgetIds(
            ComponentName(context, MyWidgetProvider::class.java)
        )
        mgr.notifyAppWidgetViewDataChanged(ids, R.id.taskList)
    }

    fun tabPendingIntent(
        context: Context,
        widgetId: Int,
        tab: WidgetTab,
        requestCode: Int
    ): PendingIntent {
        val intent = Intent(context, MyWidgetProvider::class.java)
            .setAction(ACTION_SWITCH_TAB)
            .putExtra("TAB", tab.name)
            .putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, widgetId)

        return PendingIntent.getBroadcast(
            context,
            requestCode,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
    }

}

