package io.github.kmachida12345

import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.contentType
import io.ktor.server.testing.testApplication
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import kotlinx.serialization.json.Json
import java.time.OffsetDateTime
import java.time.ZoneOffset
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlin.time.Duration.Companion.seconds
import kotlin.time.measureTime

class ContactTest {
    @Test
    fun `正しいリクエストは201`() = testApplication {
        configure()

        val response = client.post("/api/contact") {
            contentType(ContentType.Application.Json)
            setBody(
                Json.encodeToString(
                    ContactRequest(
                        kind = ContactKind.MUSIC,
                        name = "テスト",
                        email = "test@example.com",
                        message = "レッスンについて教えてください",
                        turnstileToken = "XXXX.DUMMY.TOKEN.XXXX",
                    )
                )
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
                Json.encodeToString(
                    ContactRequest(
                        kind = ContactKind.MUSIC,
                        name = "テスト",
                        email = "not-an-email",
                        message = "レッスンについて教えてください",
                        turnstileToken = "XXXX.DUMMY.TOKEN.XXXX",
                    )
                )
            )
        }

        assertEquals(HttpStatusCode.BadRequest, response.status)
    }

    @Test
    fun `長すぎるメールアドレスは正規表現に渡さずすぐに400`() = testApplication {
        configure()
        startApplication()

        // 正規表現のバックトラックが O(N^2) になる形の入力。長さを先に判定していれば一瞬で 400 になる
        val longEmail = "a@" + ".".repeat(100_000) + " "

        val elapsed = measureTime {
            val response = client.post("/api/contact") {
                contentType(ContentType.Application.Json)
                setBody(
                    Json.encodeToString(
                        ContactRequest(
                            kind = ContactKind.MUSIC,
                            name = "テスト",
                            email = longEmail,
                            message = "レッスンについて教えてください",
                            turnstileToken = "XXXX.DUMMY.TOKEN.XXXX",
                        )
                    )
                )
            }
            assertEquals(HttpStatusCode.BadRequest, response.status)
        }

        assertTrue(elapsed < 5.seconds, "長いメールアドレスの検証に時間がかかりすぎています: $elapsed")
    }

    @Test
    fun `残り1件のときに同時に保存しても上限を超えない`() = testApplication {
        configure()
        startApplication()

        val repository = ContactRepository()
        val since = OffsetDateTime.now(ZoneOffset.UTC).minusDays(1)
        val limit = (repository.countSince(since) + 1).toInt()
        val request = ContactRequest(
            kind = ContactKind.MUSIC,
            name = "テスト",
            email = "test@example.com",
            message = "レッスンについて教えてください",
            turnstileToken = "XXXX.DUMMY.TOKEN.XXXX",
        )

        val results = coroutineScope {
            List(5) { async(Dispatchers.IO) { repository.saveIfUnderLimit(request, since, limit) } }.awaitAll()
        }

        assertEquals(1, results.count { it })
        assertEquals(limit.toLong(), repository.countSince(since))
    }

}