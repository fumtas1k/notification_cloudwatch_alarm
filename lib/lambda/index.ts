import { Duration, Stack } from "aws-cdk-lib";
import { AssetCode, Function, LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { LambdaStackProps } from "./props";

export class LambdaStack extends Stack {
  ARN = "arn:aws:lambda:ap-northeast-1:133490724326:layer:AWS-Parameters-and-Secrets-Lambda-Extension:11";

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const lambdaLayer = LayerVersion.fromLayerVersionArn(this, props.prefix + "LambdaLayer", this.ARN);

    const lambdaFn = new Function(this, props.prefix + "NotificationLambda", {
      functionName: props.functionName,
      handler: "handler.lambda_handler",
      runtime: Runtime.PYTHON_3_10,
      code: new AssetCode("./lib/lambda/src"),
      memorySize: 512,
      timeout: Duration.seconds(10),
      layers: [lambdaLayer]
    });
  }
}
