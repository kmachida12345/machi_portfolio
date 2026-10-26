package io.github.kmachida12345

import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.request.receive
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    val workRepository = WorkRepository()
    val contactRepository = ContactRepository()
    val notifier = ContactNotifier(
        from = environment.config.propertyOrNull("contact.mailFrom")?.getString(),
        to = environment.config.propertyOrNull("contact.mailTo")?.getString(),
    )

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
            try {
                notifier.notify(request)
            } catch (e: Exception) {
                // 保存はできているので、メールの失敗で 500 にはしない。ログに残して後で確認する
                call.application.log.error("Failed to send contact notification", e)
            }

            call.respond(HttpStatusCode.Created, mapOf("status" to "ok"))
        }
    }
}