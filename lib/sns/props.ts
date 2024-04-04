import { StackProps } from "aws-cdk-lib";

export interface SnsStackProps extends StackProps {
  prefix: string;
}
