# Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- AWS Account with SES configured

## Installation Steps

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install all project dependencies
npm run install:all
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb task_manager

# Run migrations
cd backend
npm run migrate
```

### 3. Environment Configuration

Copy the environment template and configure your settings:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your configuration:

```env
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# AWS SES
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
FROM_EMAIL=noreply@yourcompany.com
```

### 4. AWS SES Configuration

1. Log into AWS Console
2. Navigate to Simple Email Service (SES)
3. Verify your sender email address
4. If in sandbox mode, verify recipient email addresses
5. Create IAM user with SES permissions:
   - `ses:SendEmail`
   - `ses:SendRawEmail`

### 5. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:backend  # Backend only (port 5000)
npm run dev:frontend # Frontend only (port 3000)
```

## Default Login

After running migrations, you can login with:
- Email: `admin@example.com`
- Password: `password123`

## Production Deployment

### Backend Deployment

1. Set `NODE_ENV=production`
2. Use a production PostgreSQL database
3. Configure proper JWT secret
4. Set up reverse proxy (nginx)
5. Use PM2 or similar for process management

### Frontend Deployment

```bash
cd frontend
npm run build
```

Serve the `build` folder with a web server like nginx.

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists

### Email Not Sending
- Verify AWS SES configuration
- Check if sender email is verified
- Ensure IAM permissions are correct
- Check AWS region settings

### CORS Issues
- Verify frontend proxy configuration
- Check backend CORS settings
- Ensure ports match configuration