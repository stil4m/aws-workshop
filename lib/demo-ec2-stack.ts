import cdk = require("@aws-cdk/core");
import * as ec2 from "@aws-cdk/aws-ec2";

export class DemoEc2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /** VPC **/
    const vpc = new ec2.Vpc(this, "DemoVpc");

    const instanceType = ec2.InstanceType.of(
      ec2.InstanceClass.T2,
      ec2.InstanceSize.MICRO
    );

    const userData = ec2.UserData.forLinux({ shebang: "#!/bin/bash -x" });
    userData.addCommands(
      "exec > /var/log/user-data.log 2>&1",
      "yum update -y",
      "yum install -y java-11-amazon-corretto.x86_64",
      "wget https://github.com/stil4m/aws-workshop/raw/master/artifacts/ec2-part-1/demo-app-java11-spring_2_2_2.jar -O app.jar",
      "/usr/bin/java -jar app.jar &"
    );

    const instance = new ec2.Instance(this, "DemoAppInstance", {
      vpc: vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC
      },
      instanceType: instanceType,
      machineImage: new ec2.LookupMachineImage({
        name: "amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2",
        owners: ["amazon"]
      }),
      userData: userData,
      keyName: "tutor-keypair"
    });

    const appSecurityGroup = new ec2.SecurityGroup(
      this,
      "DemoAppInstanceSecurityGroup",
      {
        vpc,
        description: "Allow ssh access to ec2 instances",
        allowAllOutbound: false
      }
    );

    appSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(8080),
      "allow access to port 8080"
    );

    appSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      "allow ssh access from the world"
    );

    instance.addSecurityGroup(appSecurityGroup);
  }
}
