package io.github.kmachida12345

import org.jetbrains.exposed.v1.core.ResultRow
import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.suspendTransaction

object WorksTable : Table("works") {
    val id = long("id").autoIncrement()
    val title = text("title")
    val description = text("description")
    val tech = array<String>("tech")
    val url = text("url").nullable()

    override val primaryKey = PrimaryKey(id)
}

class WorkRepository {
    suspend fun findAll(): List<Work> = suspendTransaction {
        WorksTable.selectAll()
            .orderBy(WorksTable.id)
            .map { it.toWork() }
    }

    private fun ResultRow.toWork() = Work(
        title = this[WorksTable.title],
        description = this[WorksTable.description],
        tech = this[WorksTable.tech],
        url = this[WorksTable.url],
    )
}