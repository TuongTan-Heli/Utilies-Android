package com.utilies

import android.util.Log
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

object ApiClient {

    fun post(
        endpoint: String,
        apiKey: String,
        body: JSONObject
    ): JSONObject? {

        val url = URL("${BuildConfig.API_URL}$endpoint")
//        val url = URL("http://localhost:5001/utilies-508e7/us-central1/app$endpoint")
        val conn = url.openConnection() as HttpURLConnection

        return try {
            conn.requestMethod = "POST"
            conn.doOutput = true

            conn.setRequestProperty("Content-Type", "application/json")
            conn.setRequestProperty("x-api-key", apiKey)

            conn.outputStream.use {
                it.write(body.toString().toByteArray())
            }

            val response = conn.inputStream.bufferedReader().readText()
            JSONObject(response)

        } catch (e: Exception) {
            Log.e("TaskWidget", "API error", e)
            null
        } finally {
            conn.disconnect()
        }
    }
}
