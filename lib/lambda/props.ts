import { StackProps } from "aws-cdk-lib";

export interface LambdaStackProps extends StackProps {
  prefix: string;
  functionName: string;
}
