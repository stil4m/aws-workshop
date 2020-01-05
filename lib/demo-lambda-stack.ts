import cdk = require("@aws-cdk/core");
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";
import * as logs from "@aws-cdk/aws-logs";

export class DemoLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, "DemoFunction", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../artifacts/lambda")),
      logRetention: logs.RetentionDays.ONE_DAY
    });
  }
}
