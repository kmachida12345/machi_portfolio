package io.github.kmachida12345

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    val workRepository = WorkRepository()
    routing {
        get("/") {
            call.respondText("Hello, World!")
        }
        get("/api/works") {
            call.respond(workRepository.findAll())
        }
    }
}