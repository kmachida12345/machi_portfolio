resource "aws_ecr_repository" "api" {
  provider             = aws.ap_southeast_1
  name                 = "machi-portfolio-api"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

# 古いイメージを自動で削除して、保管料金を抑える
resource "aws_ecr_lifecycle_policy" "api" {
  provider   = aws.ap_southeast_1
  repository = aws_ecr_repository.api.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep only the latest 5 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 5
      }
      action = { type = "expire" }
    }]
  })
}