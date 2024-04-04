import { Stack } from "aws-cdk-lib";
import { Topic } from "aws-cdk-lib/aws-sns";
import { EmailSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";
import { SnsStackProps } from "./props";

export class SnsStack extends Stack {
  constructor(scope: Construct, id: string, props: SnsStackProps) {
    super(scope, id, props);

    const topic = new Topic(this, props.prefix + "CloudWatchAlarmTopic");
    topic.addSubscription(new EmailSubscription(props.email));
  }
}
