package io.github.kmachida12345

import io.ktor.http.HttpHeaders
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun Application.configureCors() {
    val origins = environment.config.property("cors.allowedOrigins").getString()
        .split(",")
        .map { it.trim() }

    install(CORS) {
        origins.forEach { origin ->
            val (scheme, host) = origin.split("://")
            allowHost(host, schemes = listOf(scheme))
        }
        allowHeader(HttpHeaders.ContentType)
        allowHeader("x-amz-content-sha256")
    }
}