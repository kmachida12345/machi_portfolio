package io.github.kmachida12345

import kotlinx.serialization.Serializable

@Serializable
data class Work(
    val title: String,
    val description: String,
    val tech: List<String>,
    val url: String? = null,
)