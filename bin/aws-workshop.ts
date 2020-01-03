#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { DemoS3Stack } from "../lib/demo-s3-stack";

const app = new cdk.App();
new DemoS3Stack(app, "DemoS3Stack");
new DemoS3Stack(app, "DemoS3Stack2");
