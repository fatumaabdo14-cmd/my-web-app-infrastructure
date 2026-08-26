# Multi-Tier AWS Infrastructure with CDK

A production-ready, highly available web application infrastructure deployed on AWS using AWS CDK and TypeScript.

## 🎉 Status: DEPLOYED AND WORKING

Your infrastructure is live!
- **ALB DNS:** `AlbSta-ALBAE-2J3XZqR6ZOyo-462081872.us-east-1.elb.amazonaws.com`
- Visit the URL to see the load balancer working (refresh to see Server 1/2 alternate)

## Architecture
Internet Users
↓
ALB (Load Balancer) - Public Subnet
↓
EC2 Servers (2) - Private Subnets (2 AZs)
↓
RDS Database - Isolated Subnet
## What's Deployed

### 🌐 VpcStack
- VPC with CIDR `10.0.0.0/16`
- **Public Subnets** (2 AZs) - For the Application Load Balancer
- **Private Subnets** (2 AZs) - For EC2 web servers
- **Isolated Subnets** (2 AZs) - For RDS database
- Internet Gateway for public internet access
- NAT Gateway for private subnet internet access

### 📦 AlbStack
- Application Load Balancer (ALB) in public subnets
- HTTP listener on port 80
- Security group allowing traffic from the internet
- DNS endpoint for accessing your application

### 🖥️ Ec2Stack
- 2 x T3.MICRO EC2 instances running Amazon Linux 2
- Distributed across 2 Availability Zones
- Auto-installed Apache web server
- Connected to ALB via target groups
- Security group restricting access to ALB only

### 🗄️ RdsStack
- MySQL 8.0 database instance
- T3.MICRO instance type
- 20GB initial storage, scalable to 30GB
- Multi-AZ for high availability
- Encrypted storage for security
- Private isolated subnet (no internet access)
- Auto-generated admin password

## Technologies Used

- **AWS CDK** - Infrastructure as Code
- **TypeScript** - Type-safe infrastructure definitions
- **CloudFormation** - Infrastructure orchestration
- **AWS Services**: VPC, EC2, ALB, RDS, Security Groups

## Project Structure

my-web-app-infrastructure/
├── bin/
│ └── app.ts # Main orchestrator
├── lib/
│ ├── vpc-stack.ts # VPC configuration
│ ├── alb-stack.ts # Load balancer
│ ├── ec2-stack.ts # Web servers
│ └── rds-stack.ts # Database
├── package.json
├── tsconfig.json
└── README.md


## How to Deploy

### Prerequisites
- AWS Account with credentials configured
- Node.js 20+ installed
- AWS CDK CLI: `npm install -g aws-cdk`

### Deploy

```bash
npm install
npm run build
cdk deploy --all --require-approval never
```

Deployment takes ~15-20 minutes.

## Testing

Open the ALB DNS in your browser and refresh to see load balancing between Server 1 and Server 2.

## Clean Up

```bash
cdk destroy --all
```

## Learning Outcomes

✅ AWS networking (VPC, subnets, routing)
✅ High availability & disaster recovery
✅ Security best practices
✅ Infrastructure as Code with CDK
✅ Load balancing
✅ Database isolation
