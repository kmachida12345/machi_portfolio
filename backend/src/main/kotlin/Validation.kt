package io.github.kmachida12345

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.plugins.requestvalidation.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*

private val emailRegex = Regex("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")

fun Application.configureValidation() {
    install(RequestValidation) {
        validate<ContactRequest> { request ->
            val errors = buildList {
                if (request.name.isBlank() || request.name.length > 100) add("お名前は 1〜100 文字で入力してください")
                // 長さを先に判定する。正規表現は長い入力でバックトラックが O(N^2) になるため、254 文字を超える入力は渡さない
                if (request.email.length > 254 || !emailRegex.matches(request.email)) add("メールアドレスの形式が正しくありません")
                if (request.message.isBlank() || request.message.length > 5000) add("内容は 1〜5000 文字で入力してください")
                if (request.turnstileToken.isBlank() || request.turnstileToken.length > 2048) add("ボット確認のトークンが不正です")
            }
            if (errors.isEmpty()) ValidationResult.Valid else ValidationResult.Invalid(errors)
        }
    }

    install(StatusPages) {
        exception<RequestValidationException> { call, cause ->
            call.respond(HttpStatusCode.BadRequest, ErrorResponse(cause.reasons))
        }
        exception<BadRequestException> { call, _ ->
            call.respond(HttpStatusCode.BadRequest, ErrorResponse(listOf("リクエストの形式が正しくありません")))
        }
    }
}