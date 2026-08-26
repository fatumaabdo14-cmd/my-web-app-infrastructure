#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { AlbStack } from '../lib/alb-stack';
import { Ec2Stack } from '../lib/ec2-stack';
import { RdsStack } from '../lib/rds-stack';

const app = new cdk.App();

const vpcStack = new VpcStack(app, 'VpcStack', {
  env: { region: 'us-east-1' },
});

const albStack = new AlbStack(app, 'AlbStack', {
  vpc: vpcStack.vpc,
  env: { region: 'us-east-1' },
});

const ec2Stack = new Ec2Stack(app, 'Ec2Stack', {
  vpc: vpcStack.vpc,
  env: { region: 'us-east-1' },
});
albStack.listener.addTargetGroups('EC2Targets', {
  targetGroups: [ec2Stack.targetGroup],
});

const rdsStack = new RdsStack(app, 'RdsStack', {
  vpc: vpcStack.vpc,
  ec2SecurityGroup: ec2Stack.ec2SecurityGroup,
  env: { region: 'us-east-1' },
});

app.synth();