output "frontend_bucket_name" {
  value = aws_s3_bucket.frontend.bucket
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.frontend.domain_name
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.frontend.id
}

output "api_repository_url" {
  value = aws_ecr_repository.api.repository_url
}

output "github_deploy_role_arn" {
  value = aws_iam_role.github_deploy.arn
}

output "github_frontend_deploy_role_arn" {
  value = aws_iam_role.github_frontend_deploy.arn
}

output "ecr_repository_name" {
  value = aws_ecr_repository.api.name
}

output "lambda_function_name" {
  value = aws_lambda_function.api.function_name
}

output "route53_zone_name_servers" {
  value = aws_route53_zone.main.name_servers
}