package io.github.kmachida12345

import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.request.receive
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.time.OffsetDateTime
import java.time.ZoneOffset

suspend fun Application.configureRouting() {
    val workRepository = WorkRepository()
    val contactRepository = ContactRepository()
    val notifier = ContactNotifier(
        from = environment.config.propertyOrNull("contact.mailFrom")?.getString(),
        to = environment.config.propertyOrNull("contact.mailTo")?.getString(),
    )
    val turnstile = TurnstileVerifier(
        resolveSecret(
            plain = environment.config.propertyOrNull("turnstile.secret")?.getString(),
            ssmParameterName = environment.config.propertyOrNull("turnstile.secretSsmParameter")?.getString(),
        ),
        allowTestingKey = environment.config.propertyOrNull("turnstile.allowTestingKey")?.getString().toBoolean()
    )
    val dailyLimit = environment.config.property("contact.dailyLimit").getString().toInt()

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

            val since = OffsetDateTime.now(ZoneOffset.UTC).minusDays(1)
            // 上限超過なら Turnstile を呼ぶ前に早めに断る（最終的な判定は保存時に行う）
            if (contactRepository.countSince(since) >= dailyLimit) {
                call.respondDailyLimitReached()
                return@post
            }

            if (!turnstile.verify(request.turnstileToken)) {
                call.respond(
                    HttpStatusCode.BadRequest,
                    ErrorResponse(listOf("ボット確認に失敗しました。ページを再読み込みして、もう一度お試しください")),
                )
                return@post
            }
            // 事前チェックの後に同時リクエストが保存している可能性があるので、保存と同じトランザクションで上限を再確認する
            if (!contactRepository.saveIfUnderLimit(request, since, dailyLimit)) {
                call.respondDailyLimitReached()
                return@post
            }
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

// ログの文言は CloudWatch のメトリクスフィルタ（infra/monitoring.tf）が拾っているので変えない
private suspend fun ApplicationCall.respondDailyLimitReached() {
    application.log.warn("Daily contact limit reached")
    respond(
        HttpStatusCode.TooManyRequests,
        ErrorResponse(listOf("お問い合わせが集中しています。時間をおいて再度お試しいただくか、SNS からご連絡ください")),
    )
}