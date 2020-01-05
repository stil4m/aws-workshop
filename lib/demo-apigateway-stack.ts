import cdk = require("@aws-cdk/core");
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";
import * as ag from "@aws-cdk/aws-apigateway";
import * as logs from "@aws-cdk/aws-logs";

export class DemoApigatewayStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new lambda.Function(this, "HttpFunction", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../artifacts/apigateway/lambda")
      ),
      logRetention: logs.RetentionDays.ONE_DAY
    });

    const restApi = new ag.RestApi(this, "DemoRestApi", {});
    restApi.root
      .addResource("hello")
      .addMethod("GET", new ag.LambdaIntegration(fn), {
        operationName: "hello-get"
      });
  }
}
