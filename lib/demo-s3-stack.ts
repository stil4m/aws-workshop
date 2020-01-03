import cdk = require("@aws-cdk/core");
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";

export class DemoS3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const publicBucket = new s3.Bucket(this, "PublicBucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true
    });

    const privateBucket = new s3.Bucket(this, "PrivateBucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: false
    });

    new s3deploy.BucketDeployment(this, "PublicDeployment", {
      sources: [s3deploy.Source.asset("artifacts/s3/public.zip")],
      destinationBucket: publicBucket
    });

    new s3deploy.BucketDeployment(this, "PrivateDeployment", {
      sources: [s3deploy.Source.asset("artifacts/s3/private.zip")],
      destinationBucket: privateBucket
    });
  }
}
