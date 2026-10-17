provider "aws" {
  region = "ap-northeast-1"

  default_tags {
    tags = {
      project   = "machi-portfolio"
      ManagedBy = "terraform"
    }
  }
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project   = "machi-portfolio"
      ManagedBy = "terraform"
    }
  }
}