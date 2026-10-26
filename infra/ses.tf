# 送信元のドメイン
resource "aws_sesv2_email_identity" "domain" {
  provider       = aws.ap_southeast_1
  email_identity = local.domain_name
}

# DKIM の公開鍵を DNS に置く
resource "aws_route53_record" "ses_dkim" {
  count   = 3
  zone_id = aws_route53_zone.main.zone_id
  name    = "${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}._domainkey.${local.domain_name}"
  type    = "CNAME"
  ttl     = 600
  records = ["${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}.dkim.amazonses.com"]
}

# DMARC：DKIM などの確認に失敗したメールの扱いを、受け取る側に伝える
resource "aws_route53_record" "dmarc" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "_dmarc.${local.domain_name}"
  type    = "TXT"
  ttl     = 600
  records = ["v=DMARC1; p=none;"]
}

# 送り先
resource "aws_sesv2_email_identity" "notify_to" {
  provider       = aws.ap_southeast_1
  email_identity = var.alert_email
}