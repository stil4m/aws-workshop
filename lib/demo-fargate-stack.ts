import cdk = require("@aws-cdk/core");
import * as ecsPatterns from "@aws-cdk/aws-ecs-patterns";
import * as ecs from "@aws-cdk/aws-ecs";

export class DemoFargateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      "LoadBalancedService",
      {
        memoryLimitMiB: 1024,
        cpu: 512,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample")
        }
      }
    );
  }
}
