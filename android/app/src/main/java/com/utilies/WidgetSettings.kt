import android.content.Context

object WidgetSettings {

    private const val PREFS_NAME = "WidgetPrefs"
    private const val FIRST_RUN = "first_run_"
    private const val PREFS = "widget_settings"

    fun getAlpha(context: Context, widgetId: Int): Int {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        return prefs.getInt("alpha_$widgetId", 255) // default opaque
    }

    fun setAlpha(context: Context, alpha: Int, widgetId: Int) {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        prefs.edit().putInt("alpha_$widgetId", alpha).apply()
    }

    fun getDarkMode(context: Context, widgetId: Int): Boolean {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        return prefs.getBoolean("dark_$widgetId", false) // default light
    }

    fun setDarkMode(context: Context, dark: Boolean, widgetId: Int) {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        prefs.edit().putBoolean("dark_$widgetId", dark).apply()
    }

//    fun isFirstRun(context: Context, widgetId: Int): Boolean {
//        val prefs = context.getSharedPreferences(PREFS, 0)
//        return prefs.getBoolean(FIRST_RUN + widgetId, true)
//    }
//
//    fun setFirstRun(context: Context, widgetId: Int, firstRun: Boolean) {
//        val prefs = context.getSharedPreferences(PREFS, 0)
//        prefs.edit().putBoolean(FIRST_RUN + widgetId, firstRun).apply()
//    }

    fun setHideToBuy(context: Context, hide: Boolean, appWidgetId: Int) {
        val prefs = context.getSharedPreferences("widget_settings", Context.MODE_PRIVATE)
        prefs.edit().putBoolean("hideToBuy_$appWidgetId", hide).apply()
    }

    fun getHideToBuy(context: Context, appWidgetId: Int): Boolean {
        val prefs = context.getSharedPreferences("widget_settings", Context.MODE_PRIVATE)
        return prefs.getBoolean("hideToBuy_$appWidgetId", false)
    }

}
