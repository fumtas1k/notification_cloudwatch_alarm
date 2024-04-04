#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib"
import { LambdaStack } from "../lib/lambda/index";
import { SnsStack } from "../lib/sns";

const app = new App();
const prefix = "Nca";
const email = "xxxx@example.com";
const functionName = "notificationCloudWatchAlarm";

const snsStack = new SnsStack(app, "SnsStack", { prefix, email });
new LambdaStack(app, 'LambdaStack', { prefix, functionName });
