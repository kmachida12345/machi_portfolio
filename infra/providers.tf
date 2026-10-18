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

provider "aws" {
  alias  = "ap_southeast_1"
  region = "ap-southeast-1"

  default_tags {
    tags = {
      Project   = "machi-portfolio"
      ManagedBy = "terraform"
    }
  }
}