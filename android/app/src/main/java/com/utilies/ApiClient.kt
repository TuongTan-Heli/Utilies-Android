package com.utilies

import android.content.Context
import android.util.Log
import android.widget.Toast
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

object ApiClient {
    private const val SESSION_TOKEN = "SESSION_TOKEN"
    private const val API_KEY = "API_KEY"

    fun post(
        context: Context,
        endpoint: String,
        body: JSONObject
    ): JSONObject? {

        val apiKey = SecureStorageHelper.get(context, API_KEY)
        val session = SecureStorageHelper.get(context, SESSION_TOKEN)

        if (apiKey.isNullOrEmpty() || session.isNullOrEmpty()) {
            Toast.makeText(context, "Missing credentials", Toast.LENGTH_SHORT).show()
            return null
        }

        body.put("session", session)

        val url = URL("${BuildConfig.API_URL}$endpoint")
        val conn = url.openConnection() as HttpURLConnection

        return try {
            conn.requestMethod = "POST"
            conn.doOutput = true

            conn.setRequestProperty("Content-Type", "application/json")
            conn.setRequestProperty("x-api-key", apiKey)

            conn.outputStream.use {
                it.write(body.toString().toByteArray())
            }

            val code = conn.responseCode
            val stream = if (code in 200..299) conn.inputStream else conn.errorStream
            val response = stream.bufferedReader().use { it.readText() }
            val json = JSONObject(response)


            val status = json.optString("status")
            val message = json.optString("message", "Server error")

            if (code !in 200..299 || status != "Success") {
                Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
                return null
            }

            // 🔁 auto-refresh API key if backend rotated it
            json.optJSONObject("apiKey")
                ?.optString("Key")
                ?.takeIf { it.isNotBlank() }
                ?.let {
                    SecureStorageHelper.set(context, SecureStorageHelper.API_KEY, it)
                    Log.d("ApiClient", "API key refreshed")
                }

            json

        } catch (e: Exception) {
            Log.e("TaskWidget", "API error", e)
            null
        } finally {
            conn.disconnect()
        }
    }
}