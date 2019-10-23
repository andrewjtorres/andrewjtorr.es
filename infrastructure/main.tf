terraform {
  required_version = ">=0.12"

  required_providers {
    aws = ">=2.33"
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "ajtorres9"

    workspaces {
      name = "andrewjtorr-es"
    }
  }
}

provider "aws" {
  version = ">=2.33"
  region  = "us-east-1"
}
