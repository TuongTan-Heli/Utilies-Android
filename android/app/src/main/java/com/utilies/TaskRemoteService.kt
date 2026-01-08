package com.utilies

import android.appwidget.AppWidgetManager
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import android.widget.RemoteViewsService

class TaskRemoteService : RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent): RemoteViewsFactory {
        val appWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, 0)
        return TaskRemoteViewsFactory(this.applicationContext, appWidgetId)
    }

    class TaskRemoteViewsFactory(private val context: Context, private val appWidgetId: Int) :
        RemoteViewsService.RemoteViewsFactory {

        private var dataList = mutableListOf<DataItem>() // DataItem is your model

        override fun onCreate() {}

        override fun onDataSetChanged() {
            val tab = WidgetState.getTab(context, appWidgetId)
//            dataList = TaskRepository.getItemsForTab(context, tab) // your local DB/API

            dataList = TaskRepository.WidgetCache.get(tab) // just read cached data
        }

        override fun onDestroy() {
            dataList.clear()
        }

        override fun getCount() = dataList.size

        override fun getViewAt(position: Int): RemoteViews {
            val item = dataList[position]
            val tab = WidgetState.getTab(context, appWidgetId)
            return when (tab) {
                WidgetTab.TASK -> RemoteViews(
                    context.packageName,
                    R.layout.widget_task_item
                ).apply {
                    setTextViewText(R.id.title, item.title)
                    val iconRes = if (item.done == true) {
                        R.drawable.round_check_circle_24
                    } else {
                        R.drawable.baseline_radio_button_unchecked_24
                    }
                    setImageViewResource(R.id.btn_done, iconRes)

                    val fillIn = Intent().apply {
                        putExtra("ITEM_ID", item.id)
                        putExtra("TAB", tab.name)
                    }
                    setOnClickFillInIntent(R.id.btn_done, fillIn)
                }

                WidgetTab.TOBUY -> RemoteViews(
                    context.packageName,
                    R.layout.widget_tobuy_item
                ).apply {
                    setTextViewText(R.id.title, item.title)
                    setTextViewText(R.id.price, "$${item.price}")
                    val iconRes = if (item.done == true) {
                        R.drawable.round_check_circle_24
                    } else {
                       R.drawable.baseline_radio_button_unchecked_24
                    }

                    setImageViewResource(R.id.btn_done, iconRes)
                    val fillIn = Intent().apply {
                        putExtra("ITEM_ID", item.id)
                        putExtra("TAB", tab.name)
                    }
                    setOnClickFillInIntent(R.id.btn_done, fillIn)
                }

                WidgetTab.EXPENSE -> RemoteViews(
                    context.packageName,
                    R.layout.widget_expense_item
                ).apply {
                    setTextViewText(R.id.price, "$${item.price}")
                    setTextViewText(R.id.type, item.type)
                    setTextViewText(R.id.date, item.date)
                }
            }
        }

        override fun getLoadingView(): RemoteViews? = null
        override fun getViewTypeCount() = 3
        override fun getItemId(position: Int): Long {
            return dataList[position].id.hashCode().toLong()
        }

        override fun hasStableIds() = true
    }
}
