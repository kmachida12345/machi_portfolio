resource "aws_sns_topic" "alerts_apse1" {
  provider = aws.ap_southeast_1
  name     = "machi-portfolio-alerts"
}

resource "aws_sns_topic_subscription" "alerts_apse1_email" {
  provider  = aws.ap_southeast_1
  topic_arn = aws_sns_topic.alerts_apse1.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

resource "aws_sns_topic" "alerts_use1" {
  provider = aws.us_east_1
  name     = "machi-portfolio-alerts"
}

resource "aws_sns_topic_subscription" "alerts_use1_email" {
  provider  = aws.us_east_1
  topic_arn = aws_sns_topic.alerts_use1.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

resource "aws_cloudwatch_metric_alarm" "api_errors" {
  provider            = aws.ap_southeast_1
  alarm_name          = "machi-portfolio-api-errors"
  alarm_description   = "Lambda function errors (crash or timeout)"
  namespace           = "AWS/Lambda"
  metric_name         = "Errors"
  dimensions          = { FunctionName = aws_lambda_function.api.function_name }
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 1
  comparison_operator = "GreaterThanOrEqualToThreshold"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.alerts_apse1.arn]
  ok_actions          = [aws_sns_topic.alerts_apse1.arn]
}

resource "aws_cloudwatch_metric_alarm" "api_5xx" {
  provider            = aws.ap_southeast_1
  alarm_name          = "machi-portfolio-api-5xx"
  alarm_description   = "API returned HTTP 5xx responses"
  namespace           = "AWS/Lambda"
  metric_name         = "Url5xxCount"
  dimensions          = { FunctionName = aws_lambda_function.api.function_name }
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 1
  comparison_operator = "GreaterThanOrEqualToThreshold"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.alerts_apse1.arn]
  ok_actions          = [aws_sns_topic.alerts_apse1.arn]
}

resource "aws_cloudwatch_metric_alarm" "cloudfront_5xx_rate" {
  provider          = aws.us_east_1
  alarm_name        = "machi-portfolio-cloudfront-5xx-rate"
  alarm_description = "CloudFront 5xx error rate is above 5%"
  namespace         = "AWS/CloudFront"
  metric_name       = "5xxErrorRate"
  dimensions = {
    DistributionId = aws_cloudfront_distribution.frontend.id
    Region         = "Global"
  }
  statistic           = "Average"
  period              = 300
  evaluation_periods  = 2
  threshold           = 5
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.alerts_use1.arn]
  ok_actions          = [aws_sns_topic.alerts_use1.arn]
}