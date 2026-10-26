package io.github.kmachida12345

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.server.application.Application
import io.ktor.server.application.ApplicationStopped
import org.flywaydb.core.Flyway
import org.jetbrains.exposed.v1.jdbc.Database


suspend fun Application.configureDatabases() {
    val config = environment.config

    val password = resolveSecret(
        plain = config.propertyOrNull("database.password")?.getString(),
        ssmParameterName = config.propertyOrNull("database.passwordSsmParameter")?.getString(),
    )


    val dataSource = HikariDataSource(HikariConfig().apply {
        jdbcUrl = config.property("database.url").getString()
        username = config.property("database.user").getString()
        this.password = password
        maximumPoolSize = config.property("database.maxPoolSize").getString().toInt()
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
