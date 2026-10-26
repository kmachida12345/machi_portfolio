package io.github.kmachida12345

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.HttpTimeout
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.forms.submitForm
import io.ktor.http.parameters
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.slf4j.LoggerFactory

@Serializable
private data class SiteverifyMetadata(
    @SerialName("result_with_testing_key") val resultWithTestingKey: Boolean = false,
)

@Serializable
private data class SiteverifyResponse(
    val success: Boolean,
    @SerialName("error-codes") val errorCodes: List<String> = emptyList(),
    val metadata: SiteverifyMetadata? = null,
)

class TurnstileVerifier(private val secret: String, private val allowTestingKey: Boolean) {
    private val logger = LoggerFactory.getLogger(TurnstileVerifier::class.java)

    private val client = HttpClient(CIO) {
        install(ContentNegotiation) { json(Json { ignoreUnknownKeys = true }) }
        install(HttpTimeout) { requestTimeoutMillis = 5_000 }
    }

    suspend fun verify(token: String): Boolean =
        try {
            val result = client.submitForm(
                url = "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                formParameters = parameters {
                    append("secret", secret)
                    append("response", token)
                },
            ).body<SiteverifyResponse>()
            if (result.metadata?.resultWithTestingKey == true && !allowTestingKey) {
                logger.error("Turnstile testing key is used in an environment that does not allow it")
                return false
            }
            if (!result.success) logger.info("Turnstile rejected: ${result.errorCodes}")
            result.success
        } catch (e: Exception) {
            logger.error("Turnstile verification failed", e)
            false
        }
}