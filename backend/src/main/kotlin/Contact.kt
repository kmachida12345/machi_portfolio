package io.github.kmachida12345

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
enum class ContactKind {
    @SerialName("music") MUSIC,
    @SerialName("engineer") ENGINEER,
    @SerialName("other") OTHER,
}

@Serializable
data class ContactRequest(
    val kind: ContactKind,
    val name: String,
    val email: String,
    val message: String,
)

@Serializable
data class ErrorResponse(val errors: List<String>)