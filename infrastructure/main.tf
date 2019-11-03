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

locals {
  alternate_domain_names = ["andrewjtorr.es"]
  application_name       = "andrewjtorr.es"
  domain_name            = "*.andrewjtorr.es"
}

provider "aws" {
  version = ">=2.33"
  region  = "us-east-1"
}

/* =========================================================================
   API Gateway
   ========================================================================= */

resource "aws_api_gateway_rest_api" "application_rest_api" {
  name        = local.application_name
  description = "Rest API for the personal website of Andrew Torres"
}

resource "aws_api_gateway_deployment" "application_deployment" {
  depends_on  = ["aws_api_gateway_integration.root_integration", "aws_api_gateway_integration.proxy_integration"]
  rest_api_id = "${aws_api_gateway_rest_api.application_rest_api.id}"
}

/*
  Root Resource
  -------------------------------------------------------------------------- */

resource "aws_api_gateway_integration" "root_integration" {
  rest_api_id             = "${aws_api_gateway_rest_api.application_rest_api.id}"
  resource_id             = "${aws_api_gateway_method.root_method.resource_id}"
  http_method             = "${aws_api_gateway_method.root_method.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.application_function.invoke_arn}"
}

resource "aws_api_gateway_method" "root_method" {
  rest_api_id   = "${aws_api_gateway_rest_api.application_rest_api.id}"
  resource_id   = "${aws_api_gateway_rest_api.application_rest_api.root_resource_id}"
  http_method   = "ANY"
  authorization = "NONE"
}

/*
  Proxy Resource
  -------------------------------------------------------------------------- */

resource "aws_api_gateway_integration" "proxy_integration" {
  rest_api_id             = "${aws_api_gateway_rest_api.application_rest_api.id}"
  resource_id             = "${aws_api_gateway_method.proxy_method.resource_id}"
  http_method             = "${aws_api_gateway_method.proxy_method.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.application_function.invoke_arn}"
}

resource "aws_api_gateway_method" "proxy_method" {
  rest_api_id   = "${aws_api_gateway_rest_api.application_rest_api.id}"
  resource_id   = "${aws_api_gateway_resource.proxy_resource.id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_resource" "proxy_resource" {
  rest_api_id = "${aws_api_gateway_rest_api.application_rest_api.id}"
  parent_id   = "${aws_api_gateway_rest_api.application_rest_api.root_resource_id}"
  path_part   = "{proxy+}"
}

/* =========================================================================
   Certificate Manager
   ========================================================================= */

resource "aws_acm_certificate" "certificate" {
  domain_name               = local.domain_name
  subject_alternative_names = local.alternate_domain_names
  validation_method         = "DNS"

  options {
    certificate_transparency_logging_preference = "ENABLED"
  }

  tags = {
    Name        = "Personal Domain Certificate"
    Application = local.application_name
  }
}

/* =========================================================================
   CloudFront
   ========================================================================= */

resource "aws_cloudfront_distribution" "application_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Content delivery network for the personal website of Andrew Torres"
  default_root_object = "index.html"
  aliases             = local.alternate_domain_names
  price_class         = "PriceClass_All"

  origin {
    domain_name = "${aws_s3_bucket.application_bucket.bucket_domain_name}"
    origin_id   = "${aws_s3_bucket.application_bucket.id}"

    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.application_origin_access_identity.cloudfront_access_identity_path}"
    }
  }

  logging_config {
    bucket = "${aws_s3_bucket.log_bucket.bucket_domain_name}"
    prefix = "access-logs/"
  }

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "${aws_s3_bucket.application_bucket.id}"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    viewer_protocol_policy = "allow-all"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  ordered_cache_behavior {
    path_pattern           = "*"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "${aws_s3_bucket.application_bucket.id}"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  custom_error_response {
    error_code         = 404
    response_code      = 404
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = "${aws_acm_certificate.certificate.arn}"
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method       = "sni-only"
  }

  tags = {
    Name        = "Personal Application Distribution"
    Application = local.application_name
  }
}

resource "aws_cloudfront_origin_access_identity" "application_origin_access_identity" {}

/* =========================================================================
   Identity and Access Management (IAM)
   ========================================================================= */

/*
  Lambda Execution Role for Service Principals
  -------------------------------------------------------------------------- */

data "aws_iam_policy_document" "lambda_execution_policy_document" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["edgelambda.amazonaws.com", "lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_execution_role" {
  name               = "LambdaExecutionRoleForServicePrincipals"
  assume_role_policy = "${data.aws_iam_policy_document.lambda_execution_policy_document.json}"
}

/*
  Continuous Integration User
  -------------------------------------------------------------------------- */

data "aws_iam_policy_document" "continuous_integration_user_policy_document" {
  statement {
    effect    = "Allow"
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.application_bucket.arn}/*"]
  }
}

resource "aws_iam_access_key" "continuous_integration_access_key" {
  user    = "${aws_iam_user.continuous_integration_user.name}"
  pgp_key = "keybase:ajtorres9"
  status  = "Active"
}

resource "aws_iam_user" "continuous_integration_user" {
  name = "${local.application_name}-ci"

  tags = {
    Name        = "Personal Continuous Integration User"
    Application = local.application_name
  }
}

resource "aws_iam_user_policy" "continuous_integration_user_policy" {
  name   = "PersonalApplicationBucketWriteOnlyAccess"
  user   = "${aws_iam_user.continuous_integration_user.name}"
  policy = "${data.aws_iam_policy_document.continuous_integration_user_policy_document.json}"
}

/* =========================================================================
   Lambda
   ========================================================================= */

resource "aws_lambda_function" "application_function" {
  s3_bucket     = "${aws_s3_bucket.application_bucket.id}"
  s3_key        = "${local.application_name}.zip"
  function_name = replace(local.application_name, ".", "_")
  handler       = "handler.default"
  role          = "${aws_iam_role.lambda_execution_role.arn}"
  description   = "Serverless backend for the personal website of Andrew Torres"
  memory_size   = 512
  runtime       = "nodejs10.x"

  tags = {
    Name        = "Personal Application Function"
    Application = local.application_name
  }
}

/* =========================================================================
   Simple Storage Service (S3)
   ========================================================================= */

/*
  Application Bucket
  -------------------------------------------------------------------------- */

data "aws_iam_policy_document" "application_bucket_policy_document" {
  statement {
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.application_bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.application_origin_access_identity.iam_arn}"]
    }
  }

  statement {
    effect    = "Allow"
    actions   = ["s3:ListBucket"]
    resources = ["${aws_s3_bucket.application_bucket.arn}"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.application_origin_access_identity.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket" "application_bucket" {
  bucket = local.application_name
  acl    = "private"

  logging {
    target_bucket = "${aws_s3_bucket.log_bucket.id}"
    target_prefix = "access-logs/"
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = {
    Name        = "Personal Application Bucket"
    Application = local.application_name
  }
}

resource "aws_s3_bucket_policy" "application_bucket_policy" {
  bucket = "${aws_s3_bucket.application_bucket.id}"
  policy = "${data.aws_iam_policy_document.application_bucket_policy_document.json}"
}

resource "aws_s3_bucket_public_access_block" "application_bucket_public_access_block" {
  bucket                  = "${aws_s3_bucket.application_bucket.id}"
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

/*
  Log Bucket
  -------------------------------------------------------------------------- */

resource "aws_s3_bucket" "log_bucket" {
  bucket = "${local.application_name}-log"
  acl    = "log-delivery-write"

  lifecycle_rule {
    id      = "log-rotation"
    enabled = true

    expiration {
      days = 90
    }

    noncurrent_version_expiration {
      days = 1
    }

    tags = {
      Rule      = "Log Rotation"
      Autoclean = "True"
    }
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = {
    Name        = "Personal Log Bucket"
    Application = local.application_name
  }
}

resource "aws_s3_bucket_public_access_block" "log_bucket_public_access_block" {
  bucket                  = "${aws_s3_bucket.log_bucket.id}"
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
