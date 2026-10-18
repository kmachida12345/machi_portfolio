variable "db_url" {
  description = "JDBC URL of the Neon pooled endpoint"
  type        = string
}

variable "db_user" {
  description = "Database user name"
  type        = string
}

variable "alert_email" {
  description = "Email address for CloudWatch alarm notifications"
  type        = string
}