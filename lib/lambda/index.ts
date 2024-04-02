import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Function, Runtime, AssetCode } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFn = new Function(this, "notification-lambda", {
      functionName: "notificationCloudWatchAlarm",
      handler: "handler.lambda_handler",
      runtime: Runtime.PYTHON_3_10,
      code: new AssetCode("./lib/lambda/src"),
      memorySize: 512,
      timeout: Duration.seconds(10),
    });
  }
}
