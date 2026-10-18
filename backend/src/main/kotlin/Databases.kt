package io.github.kmachida12345

import aws.sdk.kotlin.services.ssm.SsmClient
import aws.sdk.kotlin.services.ssm.getParameter
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.server.application.Application
import io.ktor.server.application.ApplicationStopped
import kotlinx.coroutines.runBlocking
import org.flywaydb.core.Flyway
import org.jetbrains.exposed.v1.jdbc.Database


suspend fun Application.configureDatabases() {
    val config = environment.config

    val password = resolveDbPassword(
        plain = config.propertyOrNull("database.password")?.getString(),
        ssmParameterName = config.propertyOrNull("database.passwordSsmParameter")?.getString(),
    )


    val dataSource = HikariDataSource(HikariConfig().apply {
        jdbcUrl = config.property("database.url").getString()
        username = config.property("database.user").getString()
        this.password = password
        maximumPoolSize = 5
    })

    val migrateOnStart = config.property("database.migrateOnStart").getString().toBoolean()
    if (migrateOnStart) {
        Flyway.configure()
            .dataSource(dataSource)
            .load()
            .migrate()
    }

    Database.connect(dataSource)

    monitor.subscribe(ApplicationStopped) {
        dataSource.close()
    }
}

private suspend fun resolveDbPassword(
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
    return plain ?: error("Set POSTGRES_PASSWORD or DB_PASSWORD_SSM_PARAMETER")
}