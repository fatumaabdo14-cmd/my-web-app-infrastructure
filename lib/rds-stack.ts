import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';

interface RdsStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
  ec2SecurityGroup: ec2.SecurityGroup;
}

export class RdsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: RdsStackProps) {
    super(scope, id, props);

    const sg = new ec2.SecurityGroup(this, 'RdsSecurityGroup', {
      vpc: props.vpc,
      allowAllOutbound: true,
    });

    sg.addIngressRule(
      ec2.Peer.securityGroupId(props.ec2SecurityGroup.securityGroupId),
      ec2.Port.tcp(3306),
      'MySQL from EC2'
    );

    new rds.DatabaseInstance(this, 'AppDB', {
      engine: rds.DatabaseInstanceEngine.mysql({
  version: rds.MysqlEngineVersion.VER_8_4_10, // or newer, check what your CDK version exposes
}),
      credentials: rds.Credentials.fromUsername('admin'),
      vpc: props.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      allocatedStorage: 20,
      storageEncrypted: true,
      multiAz: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      securityGroups: [sg],
    });
  }
}