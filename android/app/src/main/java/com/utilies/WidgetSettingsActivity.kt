package com.utilies

import android.appwidget.AppWidgetManager
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.RemoteViews
import android.widget.SeekBar
import android.widget.Switch
import androidx.appcompat.app.AppCompatActivity

class WidgetSettingsActivity : AppCompatActivity() {

    private var appWidgetId = AppWidgetManager.INVALID_APPWIDGET_ID
    private lateinit var bgPreview: View
    private lateinit var seekBar: SeekBar
    private lateinit var switchTheme: Switch

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_widget_settings)

        // Get the widget ID
        appWidgetId = intent.extras?.getInt(
            AppWidgetManager.EXTRA_APPWIDGET_ID,
            AppWidgetManager.INVALID_APPWIDGET_ID
        ) ?: AppWidgetManager.INVALID_APPWIDGET_ID
        if (appWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID) finish()

        bgPreview = findViewById(R.id.bgPreview)
        seekBar = findViewById(R.id.alphaSeekBar)
        switchTheme = findViewById(R.id.switchTheme)
        val btnSave: Button = findViewById(R.id.btnSave)
        val btnCancel: Button = findViewById(R.id.btnCancel)

        // Load saved settings
        val savedAlpha = WidgetSettings.getAlpha(this, appWidgetId)
        seekBar.progress = savedAlpha

        val savedTheme = WidgetSettings.getDarkMode(this, appWidgetId)
        switchTheme.isChecked = savedTheme

        // Update preview initially
        updatePreview()

        // SeekBar listener
        seekBar.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
                updatePreview()
            }
            override fun onStartTrackingTouch(seekBar: SeekBar?) {}
            override fun onStopTrackingTouch(seekBar: SeekBar?) {}
        })

        // Switch listener
        switchTheme.setOnCheckedChangeListener { _, _ ->
            updatePreview()
        }

        // Save
        btnSave.setOnClickListener {
            WidgetSettings.setAlpha(this, seekBar.progress, appWidgetId)
            WidgetSettings.setDarkMode(this, switchTheme.isChecked, appWidgetId)
            updateWidget()
            val result = Intent().apply {
                putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
            }
            setResult(RESULT_OK, result)
            finish()
        }

        // Cancel
        btnCancel.setOnClickListener {
            setResult(RESULT_CANCELED)
            finish()
        }
    }

    private fun updatePreview() {
        val alpha = seekBar.progress
        val dark = switchTheme.isChecked
        val color = (alpha shl 24) or if (dark) 0x000000 else 0xFFFFFF
        bgPreview.setBackgroundColor(color)
    }

    private fun updateWidget() {
        val mgr = AppWidgetManager.getInstance(this)
        val views = RemoteViews(packageName, R.layout.utilies_widget)
        val alpha = seekBar.progress
        val dark = switchTheme.isChecked
        val color = (alpha shl 24) or if (dark) 0x000000 else 0xFFFFFF
        views.setInt(R.id.widget_root, "setBackgroundColor", color)
        mgr.updateAppWidget(appWidgetId, views)

    }
}



