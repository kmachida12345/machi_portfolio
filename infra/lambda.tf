data "aws_caller_identity" "current" {}

locals {
  api_function_name         = "machi-portfolio-api"
  db_password_parameter     = "/machi-portfolio/db-password"
  db_password_parameter_arn = "arn:aws:ssm:ap-southeast-1:${data.aws_caller_identity.current.account_id}:parameter${local.db_password_parameter}"
}

resource "aws_cloudwatch_log_group" "api" {
  provider          = aws.ap_southeast_1
  name              = "/aws/lambda/${local.api_function_name}"
  retention_in_days = 14
}

data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "api_lambda" {
  name               = "machi-portfolio-api-lambda"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_iam_role_policy_attachment" "api_lambda_logs" {
  role       = aws_iam_role.api_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_iam_policy_document" "api_lambda_ssm" {
  statement {
    actions   = ["ssm:GetParameter"]
    resources = [local.db_password_parameter_arn]
  }
}

resource "aws_iam_role_policy" "api_lambda_ssm" {
  name   = "read-db-password"
  role   = aws_iam_role.api_lambda.id
  policy = data.aws_iam_policy_document.api_lambda_ssm.json
}

resource "aws_lambda_function" "api" {
  provider      = aws.ap_southeast_1
  function_name = local.api_function_name
  role          = aws_iam_role.api_lambda.arn
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.api.repository_url}:latest"
  architectures = ["arm64"]
  memory_size   = 1024
  timeout       = 15

  environment {
    variables = {
      DB_URL                    = var.db_url
      DB_USER                   = var.db_user
      DB_PASSWORD_SSM_PARAMETER = local.db_password_parameter
      DB_MAX_POOL_SIZE          = "1"
      DB_MIGRATE_ON_START       = "false"
    }
  }

  depends_on = [aws_cloudwatch_log_group.api]

  lifecycle {
    ignore_changes = [image_uri]
  }
}