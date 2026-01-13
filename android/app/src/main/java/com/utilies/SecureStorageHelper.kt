package com.utilies

import android.content.Context
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey

object SecureStorageHelper {

    private const val PREF_NAME = "SecureStore"

    const val API_KEY = "API_KEY"
    const val SESSION_TOKEN = "SESSION_TOKEN"

    private fun prefs(context: Context) =
        EncryptedSharedPreferences.create(
            context,
            PREF_NAME,
            MasterKey.Builder(context)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build(),
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )

    fun get(context: Context, key: String): String? =
        prefs(context).getString(key, null)

    fun set(context: Context, key: String, value: String) {
        prefs(context).edit().putString(key, value).apply()
    }

    fun remove(context: Context, key: String) {
        prefs(context).edit().remove(key).apply()
    }
}
