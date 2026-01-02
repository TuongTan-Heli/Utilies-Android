package com.utilies

import android.content.Intent
import android.os.Bundle
import android.util.Log
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

class QuickAddActivity : ReactActivity() {

    override fun getMainComponentName() = "Utilies"

    // Cold start: pass initial launch options to RN
    override fun createReactActivityDelegate() =
        object : ReactActivityDelegate(this, mainComponentName) {
            override fun getLaunchOptions(): Bundle {
                return Bundle().apply {
                    putString("entry", "quick_add")
                    putString("type", intent.getStringExtra("type"))
                }
            }
        }

    // Warm start: update intent for every widget tap
    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
    }

    // Warm start: emit event to RN every time activity resumes
    override fun onResume() {
        super.onResume()
        sendToJS(intent.getStringExtra("type"))
    }

    private fun sendToJS(type: String?) {
        val reactInstanceManager =
            (application as ReactApplication)
                .reactNativeHost
                .reactInstanceManager

        val reactContext = reactInstanceManager.currentReactContext ?: return

        val params = Arguments.createMap().apply {
            putString("entry", "quick_add")
            putString("type", type)
        }

        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("WIDGET_QUICK_ADD", params)
    }
}
