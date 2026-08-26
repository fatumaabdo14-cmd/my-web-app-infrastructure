
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
- Auto-generated admin password stored in AWS Secrets Manager

## Technologies Used

- **AWS CDK** - Infrastructure as Code
- **TypeScript** - Type-safe infrastructure definitions
- **CloudFormation** - Infrastructure orchestration
- **AWS Services**: VPC, EC2, ALB, RDS, Security Groups

## Project Structure
my-web-app-infrastructure/
├── bin/
│ └── app.ts # Main orchestrator (creates all stacks)
├── lib/
│ ├── vpc-stack.ts # VPC, subnets, gateways
│ ├── alb-stack.ts # Load balancer configuration
│ ├── ec2-stack.ts # Web servers
│ └── rds-stack.ts # Database
├── package.json
├── tsconfig.json
└── README.md

## How to Deploy

### Prerequisites
- AWS Account with credentials configured
- Node.js 20+ installed
- AWS CDK CLI installed

```bash
npm install -g aws-cdk
```

### Deploy

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run build

# Preview changes
cdk diff

# Deploy to AWS
cdk deploy --all --require-approval never
```

The deployment takes approximately **15-20 minutes** for the full stack.

## How to Test

Once deployed, open the ALB DNS name in your browser. You should see:
- "Server 1" or "Server 2" (load balancer distributing traffic)
- Refresh the page to see it alternate between the two servers

## Architecture Benefits

- **High Availability**: If one EC2 instance fails, traffic routes to the other
- **Scalability**: Easy to add more EC2 instances behind the ALB
- **Security**: Database is completely isolated from the internet
- **Disaster Recovery**: Multi-AZ setup protects against AZ failures
- **Cost Optimized**: Using T3.MICRO instances and single NAT gateway

## Clean Up

To avoid AWS charges, destroy all resources:

```bash
cdk destroy --all
```

Confirm when prompted. This will delete:
- VPC and all subnets
- Load Balancer
- EC2 instances
- RDS database

⚠️ **Warning**: This will delete all data. Make sure you want to proceed.

## Learning Outcomes

Through building this infrastructure, I learned:

✅ AWS networking concepts (VPC, subnets, routing, gateways)
✅ High availability and disaster recovery patterns
✅ Security best practices (public/private separation)
✅ Infrastructure as Code with AWS CDK
✅ Load balancing and traffic distribution
✅ Database security and isolation
✅ CloudFormation under the hood
✅ Debugging real infrastructure issues

## Key CDK Concepts Applied

- **Stack composition** - Creating reusable, interdependent stacks
- **Props interfaces** - Passing configuration between stacks
- **Security groups** - Network access control
- **CloudFormation outputs** - Exporting resource information
- **Removal policies** - Clean infrastructure teardown

## Next Steps

- Add HTTPS/SSL certificate to ALB
- Implement auto-scaling for EC2 instances
- Add CloudWatch monitoring and alarms
- Implement CI/CD pipeline for application deployment
- Add Lambda functions for serverless components

## Author

**Fatuma** - Cloud Engineering Student  
Building infrastructure on AWS | Learning DevOps | Documentation enthusiast

## Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [AWS VPC Guide](https://docs.aws.amazon.com/vpc/)
- [AWS RDS Documentation](https://docs.aws.amazon.com/rds/)