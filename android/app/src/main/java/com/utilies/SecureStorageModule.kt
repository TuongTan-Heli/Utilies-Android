package com.utilies

import android.content.Context
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.facebook.react.bridge.*

class SecureStorageModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val masterKey: MasterKey by lazy {
        MasterKey.Builder(reactContext)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()
    }

    private val prefs by lazy {
        EncryptedSharedPreferences.create(
            reactContext,
            "SecureStore",
            masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
    }

    override fun getName(): String = "SecureStorage"

    @ReactMethod
    fun setItem(key: String, value: String, promise: Promise) {
        prefs.edit().putString(key, value).apply()
        promise.resolve(true)
    }

    @ReactMethod
    fun getItem(key: String, promise: Promise) {
        val value = prefs.getString(key, null)
        promise.resolve(value)
    }

    @ReactMethod
    fun removeItem(key: String, promise: Promise) {
        prefs.edit().remove(key).apply()
        promise.resolve(true)
    }
}
