import cdk = require("@aws-cdk/core");
import * as iam from "@aws-cdk/aws-iam";

export interface UsersStackProps extends cdk.StackProps {
  usernames: string[];
  initialPassword: string;
}
export class UsersStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: UsersStackProps) {
    super(scope, id, props);

    const group = new iam.Group(this, "Developers", {
      groupName: "demo-developers"
    });
    group.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("policy/AdministratorAccess")
    );

    props.usernames.forEach(username => {
      const user = new iam.User(this, `MyUser_${username}`, {
        password: cdk.SecretValue.plainText(props.initialPassword)
      });
      group.addUser(user);
    });
  }
}
