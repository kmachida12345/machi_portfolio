resource "aws_pricingplanmanager_subscription" "frontend" {
  provider    = aws.us_east_1
  plan_family = "CloudFront"
  plan_tier   = "FREE"

  resource_arns = [
    aws_cloudfront_distribution.frontend.arn,
    aws_wafv2_web_acl.frontend.arn,
  ]
}