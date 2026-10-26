package io.github.kmachida12345

import aws.sdk.kotlin.services.sesv2.SesV2Client
import aws.sdk.kotlin.services.sesv2.sendEmail
import org.slf4j.LoggerFactory

class ContactNotifier(private val from: String?, private val to: String?) {
    private val logger = LoggerFactory.getLogger(ContactNotifier::class.java)

    suspend fun notify(request: ContactRequest) {
        if (from == null || to == null) {
            logger.info("Mail settings are not configured. Skip sending a notification.")
            return
        }
        SesV2Client.fromEnvironment().use { ses ->
            ses.sendEmail {
                fromEmailAddress = from
                destination { toAddresses = listOf(to) }
                replyToAddresses = listOf(request.email)
                content {
                    simple {
                        subject {
                            data = "[kmachida.com] お問い合わせ（${request.kind.name.lowercase()}）"
                            charset = "UTF-8"
                        }
                        body {
                            text {
                                data = """
                                    |お名前: ${request.name}
                                    |メール: ${request.email}
                                    |
                                    |${request.message}
                                """.trimMargin()
                                charset = "UTF-8"
                            }
                        }
                    }
                }
            }
        }
    }
}