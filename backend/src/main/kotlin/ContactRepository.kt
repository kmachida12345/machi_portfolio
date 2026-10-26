package io.github.kmachida12345

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.core.greaterEq
import org.jetbrains.exposed.v1.javatime.timestampWithTimeZone
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.suspendTransaction
import java.time.OffsetDateTime

object ContactMessagesTable : Table("contact_messages") {
    val id = long("id").autoIncrement()
    val kind = text("kind")
    val name = text("name")
    val email = text("email")
    val message = text("message")
    val createdAt = timestampWithTimeZone("created_at")

    override val primaryKey = PrimaryKey(id)
}

class ContactRepository {
    suspend fun save(request: ContactRequest) {
        suspendTransaction {
            ContactMessagesTable.insert {
                it[kind] = request.kind.name.lowercase()
                it[name] = request.name.trim()
                it[email] = request.email.trim()
                it[message] = request.message.trim()
            }
        }
    }
    suspend fun countSince(since: OffsetDateTime): Long = suspendTransaction {
        ContactMessagesTable.selectAll()
            .where { ContactMessagesTable.createdAt greaterEq since }
            .count()
    }
}