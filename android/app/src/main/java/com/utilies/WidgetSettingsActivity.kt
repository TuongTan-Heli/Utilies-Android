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
    private lateinit var hideToBuySwitch: Switch

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
        hideToBuySwitch = findViewById(R.id.hideToBuy)

        // Load saved setting
        val hideToBuy = WidgetSettings.getHideToBuy(this, appWidgetId)
        hideToBuySwitch.isChecked = hideToBuy

        // Save when user clicks Save button
        btnSave.setOnClickListener {
            updateWidget()
            val result = Intent().apply {
                putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
            }
            setResult(RESULT_OK, result)
            finish()
        }
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
        // Save current settings
        WidgetSettings.setAlpha(this, seekBar.progress, appWidgetId)
        WidgetSettings.setDarkMode(this, switchTheme.isChecked, appWidgetId)
        WidgetSettings.setHideToBuy(this, hideToBuySwitch.isChecked, appWidgetId)

        // Trigger widget update
        val intent = Intent(this, MyWidgetProvider::class.java).apply {
            action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
            putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, intArrayOf(appWidgetId))
        }
        sendBroadcast(intent)
    }

}



