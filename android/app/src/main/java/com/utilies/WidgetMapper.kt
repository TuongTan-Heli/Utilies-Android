package com.utilies

import android.util.Log
import org.json.JSONArray

object WidgetMapper {
    fun fromApi(dataArray: JSONArray): List<Pair<WidgetTab, MutableList<DataItem>>> {
        val result = mutableListOf<Pair<WidgetTab, MutableList<DataItem>>>()

        // Prepare a map to collect items per tab
        val tabMap = mutableMapOf<WidgetTab, MutableList<DataItem>>().apply {
            WidgetTab.values().forEach { put(it, mutableListOf()) }
        }

        for (i in 0 until dataArray.length()) {
            val o = dataArray.getJSONObject(i)

            val typeStr = o.getString("Type")
            val tab = when (typeStr) {
                "To do" -> WidgetTab.TASK
                "To buy" -> WidgetTab.TOBUY
                "Expense" -> WidgetTab.EXPENSE
                else -> throw IllegalArgumentException("Unknown type $typeStr")
            }

            // Parse 'done' as boolean from object
            val done = o.optJSONObject("Done")?.has("_seconds") == true

            val item = when (tab) {
                WidgetTab.TASK -> DataItem(
                    id = o.getString("id"),
                    title = o.getString("Name"),
                    done = done
                )
                WidgetTab.TOBUY -> DataItem(
                    id = o.getString("id"),
                    title = o.getString("Name"),
                    price = o.optDouble("Price", 0.0),
                    done = done
                )
                WidgetTab.EXPENSE -> DataItem(
                    id = o.getString("id"),
                    price = o.optDouble("Price", 0.0),
                    type = o.optString("Type"),
                    date = o.optString("Date")
                )
            }

            // Add item to the corresponding tab list
            tabMap[tab]?.add(item)
        }

        // Convert map to list of pairs
        tabMap.forEach { (tab, items) ->
            result += tab to items
        }

        return result
    }


}
