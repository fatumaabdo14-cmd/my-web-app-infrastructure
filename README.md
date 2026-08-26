# Multi-Tier AWS Infrastructure with CDK

A production-ready web application infrastructure deployed on AWS using CDK and TypeScript.

## 🎉 Status: DEPLOYED AND WORKING ✅

**ALB DNS:** `AlbSta-ALBAE-2J3XZqR6ZOyo-462081872.us-east-1.elb.amazonaws.com`

Visit to see the load balancer working! Refresh the page to see Server 1 and Server 2 alternate.

## Architecture
![Architecture Diagram](./architecture.png)
## What's Deployed

- **VPC** with public/private/isolated subnets across 2 AZs
- **ALB** distributing traffic to 2 EC2 instances
- **2 x EC2** instances (T3.MICRO) running Apache web servers
- **RDS MySQL 8.0** database in isolated subnet with multi-AZ enabled

## Technologies

- AWS CDK + TypeScript
- CloudFormation
- VPC, EC2, ALB, RDS, Security Groups

## Key Learnings

✅ AWS networking & high availability
✅ Load balancing & traffic distribution  
✅ Database isolation & security
✅ Infrastructure as Code with CDK
✅ Multi-AZ resilience

## Deploy

```bash
npm install
npm run build
cdk deploy --all
```

## Clean Up

```bash
cdk destroy --all
```
