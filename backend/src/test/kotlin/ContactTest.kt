package io.github.kmachida12345

import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.contentType
import io.ktor.server.testing.testApplication
import kotlin.test.Test
import kotlin.test.assertEquals

class ContactTest {
    @Test
    fun `正しいリクエストは201`() = testApplication {
        configure()

        val response = client.post("/api/contact") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                    {"kind":"music","name":"テスト","email":"test@example.com","message":"レッスンについて教えてください,"turnstileToken":"XXXX.DUMMY.TOKEN.XXXX""}
            """.trimIndent()
            )
        }

        assertEquals(HttpStatusCode.Created, response.status)
    }

    @Test
    fun `メールアドレスが不正なら400`() = testApplication {
        configure()

        val response = client.post("/api/contact") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                    {"kind":"music","name":"テスト","email":"not-an-email","message":"レッスンについて教えてください","turnstileToken":"XXXX.DUMMY.TOKEN.XXXX"}
            """.trimIndent()
            )
        }

        assertEquals(HttpStatusCode.BadRequest, response.status)
    }

}