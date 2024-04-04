import { StackProps } from "aws-cdk-lib";
import { Topic } from "aws-cdk-lib/aws-sns";

export interface LambdaStackProps extends StackProps {
  prefix: string;
  functionName: string;
  topic: Topic;
}
