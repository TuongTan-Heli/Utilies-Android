package com.utilies

data class DataItem(
    val id: String,
    val title: String? = null,
    val price: Double? = null,
    val type: String? = null,
    val date: String? = null,
    val done: Boolean? = false
)