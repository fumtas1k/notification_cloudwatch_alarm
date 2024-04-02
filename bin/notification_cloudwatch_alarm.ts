#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib"
import { LambdaStack } from "../lib/lambda/index";

const app = new App();
new LambdaStack(app, 'LambdaStack', {
});
