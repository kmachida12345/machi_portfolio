package io.github.kmachida12345

import aws.sdk.kotlin.services.ssm.SsmClient
import aws.sdk.kotlin.services.ssm.getParameter

suspend fun resolveSecret(
    plain: String?,
    ssmParameterName: String?
): String {
    if (ssmParameterName != null) {
        return SsmClient.fromEnvironment().use { ssm ->
            ssm.getParameter {
                name = ssmParameterName
                withDecryption = true
            }.parameter?.value
        } ?: error("SSM parameter $ssmParameterName has no value")
    }
    return plain ?: error("Secret is not configured (set the env var or the SSM parameter name)")
}