terraform {
  backend "s3" {
    bucket       = "machi-portfolio-tfstate-1017"
    key          = "portfolio/terraform.tfstate"
    region       = "ap-northeast-1"
    use_lockfile = true
  }
}