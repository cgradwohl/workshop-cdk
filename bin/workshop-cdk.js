#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { WorkshopCdkStack } = require('../lib/workshop-cdk-stack');

const app = new cdk.App();
new WorkshopCdkStack(app, 'WorkshopCdkStack');
