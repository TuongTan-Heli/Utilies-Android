package com.utilies

import android.content.Context
import android.util.Log
import android.widget.Toast
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

object ApiClient {

    fun post(
        context: Context,
        endpoint: String,
        apiKey: String,
        body: JSONObject
    ): JSONObject? {

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

            // ❌ HTTP-level error (4xx / 5xx)
            val stream = if (code in 200..299) {
                conn.inputStream
            } else {
                conn.errorStream
            }

            val response = stream.bufferedReader().use { it.readText() }
            val json = JSONObject(response)

            // ❌ Backend-level error
            val status = json.optString("status")
            val message = json.optString("message", "Server error")

            if (code !in 200..299 || status != "Success") {
                Toast.makeText(
                    context,
                    message,
                    Toast.LENGTH_SHORT
                ).show()
                return null
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
