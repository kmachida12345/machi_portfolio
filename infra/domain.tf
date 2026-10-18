locals {
  domain_name = "kmachida.com"
}

resource "aws_route53_zone" "main" {
  name = local.domain_name
}