package io.github.kmachida12345

import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.request.receive
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    val workRepository = WorkRepository()
    val contactRepository = ContactRepository()
    routing {
        get("/") {
            call.respondText("Hello, World!")
        }
        get("/api/works") {
            call.respond(workRepository.findAll())
        }
        get("/health") {
            call.respondText("OK")
        }
        post("/api/contact") {
            val request = call.receive<ContactRequest>()
            contactRepository.save(request)
            call.respond(HttpStatusCode.Created, mapOf("status" to "ok"))
        }
    }
}