package io.github.kmachida12345

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello, World!")
        }
        get("/api/works") {
            val works = listOf(
                Work(
                    title = "machi_portfolio",
                    description = "このサイト。Next.js / Kotlin / AWS で構築中",
                    tech = listOf("Next.js", "Kotlin", "Ktor", "AWS"),
                    url = "https://github.com/kmachida12345/machi_portfolio",
                ),
            )
            call.respond(works)
        }
    }
    
}