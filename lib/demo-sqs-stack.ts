import cdk = require("@aws-cdk/core");
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";
import * as logs from "@aws-cdk/aws-logs";
import * as sqs from "@aws-cdk/aws-sqs";
import * as iam from "@aws-cdk/aws-iam";

export class DemoSqsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "MyQueue", {
      retentionPeriod: cdk.Duration.hours(1)
    });

    const lambdaExecutionRole = new iam.Role(this, `LambdaExecutionRole`, {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com")
    });
    lambdaExecutionRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole"
      )
    );
    lambdaExecutionRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["sqs:*"],
        resources: [`*`]
      })
    );

    const workerFn = new lambda.Function(this, "WorkerFunction", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../artifacts/sqs/worker")
      ),
      logRetention: logs.RetentionDays.ONE_DAY,
      role: lambdaExecutionRole,
      environment: {
        QUEUE_URL: queue.queueUrl
      },
      timeout: cdk.Duration.minutes(1)
    });

    const batchFn = new lambda.Function(this, "BatchFunction", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../artifacts/sqs/batch")
      ),
      logRetention: logs.RetentionDays.ONE_DAY,
      role: lambdaExecutionRole,
      environment: {
        QUEUE_URL: queue.queueUrl
      },
      timeout: cdk.Duration.minutes(1)
    });
  }
}
