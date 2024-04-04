import { Stack } from "aws-cdk-lib";
import * as sns from "aws-cdk-lib/aws-sns";
import { Construct } from "constructs";
import { SnsStackProps } from "./props";

export class SnsStack extends Stack {
  constructor(scope: Construct, id: string, props: SnsStackProps) {
    super(scope, id, props);

    const topic = new sns.Topic(this, "CloudWatchAlarmTopic");
  }
}
