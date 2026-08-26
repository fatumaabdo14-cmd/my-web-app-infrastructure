import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';
import { Construct } from 'constructs';

interface Ec2StackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class Ec2Stack extends cdk.Stack {
  public readonly targetGroup: elbv2.ApplicationTargetGroup;
  public readonly ec2SecurityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props: Ec2StackProps) {
    super(scope, id, props);

    const ec2SecurityGroup = new ec2.SecurityGroup(this, 'Ec2SecurityGroup', {
      vpc: props.vpc,
      description: 'Security group for EC2 instances',
      allowAllOutbound: true,
    });

    this.ec2SecurityGroup = ec2SecurityGroup;

    this.targetGroup = new elbv2.ApplicationTargetGroup(this, 'TargetGroup', {
      vpc: props.vpc,
      port: 80,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targetType: elbv2.TargetType.INSTANCE,
    });

    const instance1 = new ec2.Instance(this, 'WebServer1', {
      vpc: props.vpc,
      vpcSubnets: { subnets: [props.vpc.privateSubnets[0]] },
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      securityGroup: ec2SecurityGroup,
    });

    instance1.addUserData('#!/bin/bash', 'yum install -y httpd', 'systemctl start httpd', 'systemctl enable httpd', 'echo "<h1>Server 1</h1>" > /var/www/html/index.html');

    const instance2 = new ec2.Instance(this, 'WebServer2', {
      vpc: props.vpc,
      vpcSubnets: { subnets: [props.vpc.privateSubnets[1]] },
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      securityGroup: ec2SecurityGroup,
    });

    instance2.addUserData('#!/bin/bash', 'yum install -y httpd', 'systemctl start httpd', 'systemctl enable httpd', 'echo "<h1>Server 2</h1>" > /var/www/html/index.html');

    this.targetGroup.addTarget(new targets.InstanceTarget(instance1));
    this.targetGroup.addTarget(new targets.InstanceTarget(instance2));
  }
}