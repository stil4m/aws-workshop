import cdk = require("@aws-cdk/core");
import * as ecsPatterns from "@aws-cdk/aws-ecs-patterns";
import * as ecs from "@aws-cdk/aws-ecs";
import * as logs from "@aws-cdk/aws-logs";

export class DemoFargateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const logGroup = new logs.LogGroup(this, "LogGroup", {
      retention: logs.RetentionDays.ONE_DAY,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const logDriver = ecs.LogDrivers.awsLogs({
      streamPrefix: "LoadBalancedService",
      logGroup
    });

    new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      "LoadBalancedService",
      {
        memoryLimitMiB: 1024,
        cpu: 512,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
          enableLogging: true,
          logDriver: logDriver
        }
      }
    );
  }
}
