#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { DemoS3Stack } from "../lib/demo-s3-stack";
import { DemoEc2Stack } from "../lib/demo-ec2-stack";
import { DemoFargateStack } from "../lib/demo-fargate-stack";
import { DemoLambdaStack } from "../lib/demo-lambda-stack";
import { DemoApigatewayStack } from "../lib/demo-apigateway-stack";
import { DemoSqsStack } from "../lib/demo-sqs-stack";
import { UsersStack } from "../lib/users-stack";
import * as fs from "fs";
import * as path from "path";

if (!process.env.AWS_ACCOUNT_ID) {
  throw new Error("AWS_ACCCOUNT_ID not set");
}

const env: cdk.StackProps = {
  env: { region: "eu-west-1", account: process.env.AWS_ACCOUNT_ID }
};
const app = new cdk.App();
new DemoS3Stack(app, "DemoS3Stack", env);
new DemoEc2Stack(app, "DemoEc2Stack", env);
new DemoFargateStack(app, "DemoFargateStack", env);
new DemoLambdaStack(app, "DemoLambdaStack", env);
new DemoApigatewayStack(app, "DemoApigatewayStack", env);
new DemoSqsStack(app, "DemoSqsStack", env);

const userConfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../users-config.json"), "UTF-8")
);

new UsersStack(app, "UsersStack", {
  usernames: userConfig.usernames,
  initialPassword: userConfig.initialPassword,
  ...env
});
