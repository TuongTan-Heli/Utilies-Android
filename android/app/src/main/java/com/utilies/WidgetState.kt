package com.utilies

import android.content.Context
import android.content.SharedPreferences
import androidx.core.content.edit

object WidgetState {

    private const val PREF = "widget_state"
    private fun prefs(context: Context): SharedPreferences =
        context.getSharedPreferences(PREF, Context.MODE_PRIVATE)

    fun saveTab(context: Context, widgetId: Int, tab: WidgetTab) {
        prefs(context).edit { putString("tab_$widgetId", tab.name) }
    }

    fun getTab(context: Context, widgetId: Int): WidgetTab {
        val name = prefs(context).getString("tab_$widgetId", WidgetTab.TASK.name) ?: WidgetTab.TASK.name
        return WidgetTab.valueOf(name)
    }
}
