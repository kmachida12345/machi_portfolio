package io.github.kmachida12345

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.core.greaterEq
import org.jetbrains.exposed.v1.javatime.timestampWithTimeZone
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.suspendTransaction
import java.sql.Connection
import java.time.OffsetDateTime

// 日次上限チェック専用のアドバイザリロックのキー（"contact" の ASCII）。他のロックと重ならない固定値
private const val CONTACT_LIMIT_LOCK_KEY = 0x636F6E74616374L

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
    suspend fun saveIfUnderLimit(request: ContactRequest, since: OffsetDateTime, limit: Int): Boolean =
        suspendTransaction(transactionIsolation = Connection.TRANSACTION_READ_COMMITTED) {
            exec("SELECT pg_advisory_xact_lock($CONTACT_LIMIT_LOCK_KEY)")
            val count = ContactMessagesTable.selectAll()
                .where { ContactMessagesTable.createdAt greaterEq since }
                .count()
            if (count >= limit) return@suspendTransaction false
            ContactMessagesTable.insert {
                it[kind] = request.kind.name.lowercase()
                it[name] = request.name.trim()
                it[email] = request.email.trim()
                it[message] = request.message.trim()
            }
            true
        }
    suspend fun countSince(since: OffsetDateTime): Long = suspendTransaction {
        ContactMessagesTable.selectAll()
            .where { ContactMessagesTable.createdAt greaterEq since }
            .count()
    }
}