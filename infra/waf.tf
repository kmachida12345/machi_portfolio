resource "aws_wafv2_web_acl" "frontend" {
  provider = aws.us_east_1
  name     = "machi-portfolio-frontend"
  scope    = "CLOUDFRONT"

  default_action {
    allow {}
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "machi-portfolio-frontend"
    sampled_requests_enabled   = true
  }
}