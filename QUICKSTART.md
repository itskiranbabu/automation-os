# 🚀 AutomationOS Quick Start Guide

Get AutomationOS up and running in under 10 minutes!

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 20+** ([Download](https://nodejs.org/))
- ✅ **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop))
- ✅ **Git** ([Download](https://git-scm.com/))
- ✅ **Supabase Account** ([Sign up](https://supabase.com/)) - Free tier works!
- ✅ **Gemini API Key** ([Get one](https://makersuite.google.com/app/apikey)) - Free tier available

## 🎯 Step 1: Clone the Repository

```bash
git clone https://github.com/itskiranbabu/automation-os.git
cd automation-os
```

## 📦 Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~2-3 minutes).

## 🔧 Step 3: Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local
```

Now edit `.env.local` with your credentials:

### Required Variables

```env
# Supabase (Get from https://app.supabase.com/project/_/settings/api)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres

# Gemini AI (Get from https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key

# Encryption (Generate with: openssl rand -hex 32)
ENCRYPTION_KEY=your_32_byte_hex_key

# Redis (Local development)
REDIS_URL=redis://localhost:6379

# Temporal (Local development)
TEMPORAL_ADDRESS=localhost:7233
```

### Optional Variables (for connectors)

```env
# Google OAuth (for Gmail, Sheets, etc.)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Slack
SLACK_CLIENT_ID=your_slack_client_id
SLACK_CLIENT_SECRET=your_slack_client_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

## 🐳 Step 4: Start Infrastructure

Start PostgreSQL, Redis, and Temporal using Docker:

```bash
docker-compose up -d
```

This starts:
- **PostgreSQL** on port 5432
- **Redis** on port 6379
- **Temporal** on port 7233
- **Temporal UI** on port 8080

Verify everything is running:

```bash
docker-compose ps
```

You should see all services as "Up".

## 🗄️ Step 5: Set Up Database

### Create Tables

Run the database migrations:

```bash
npm run migrate
```

This creates all necessary tables in your Supabase database.

### Seed Templates

Load the workflow templates:

```bash
npm run seed
```

This adds 7 pre-built workflow templates to get you started.

## 🚀 Step 6: Start the Application

### Terminal 1: Start Next.js Dev Server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

### Terminal 2: Start Temporal Worker

Open a new terminal and run:

```bash
npm run worker
```

This starts the workflow execution engine.

## 🎉 Step 7: Access the Application

Open your browser and navigate to:

**http://localhost:3000**

You should see the AutomationOS landing page!

## 🔐 Step 8: Create Your Account

1. Click **"Sign Up"**
2. Enter your email and password
3. Check your email for verification link
4. Click the link to verify your account
5. Log in to AutomationOS

## 🎨 Step 9: Create Your First Workflow

### Option A: Use a Template (Easiest)

1. Click **"Templates"** in the sidebar
2. Browse available templates
3. Click on **"Shopify Order Confirmation"**
4. Click **"Use Template"**
5. Connect required apps (Shopify, WhatsApp, Google Sheets)
6. Click **"Activate"**

### Option B: Use AI Prompt (Coolest)

1. Click **"New Workflow"**
2. Type in plain English:
   ```
   When I get a new Gmail email from support@company.com,
   create a Slack message in #support channel
   ```
3. Click **"Generate Workflow"**
4. Review the generated workflow
5. Click **"Activate"**

### Option C: Visual Editor (Most Powerful)

1. Click **"New Workflow"** → **"Start from Scratch"**
2. Drag nodes from the palette:
   - Add a **Trigger** (e.g., Gmail New Email)
   - Add an **Action** (e.g., Slack Send Message)
   - Connect them
3. Configure each node
4. Click **"Test Run"**
5. Click **"Save & Activate"**

## 🔌 Step 10: Connect Your Apps

To use workflows, you need to connect your apps:

1. Go to **"Connections"**
2. Click **"Add Connection"**
3. Select an app (e.g., Gmail)
4. Click **"Connect"**
5. Authorize the app
6. Done! ✅

### Popular Connections

- **Gmail**: Email automation
- **Slack**: Team notifications
- **Google Sheets**: Data logging
- **Shopify**: E-commerce workflows
- **Stripe**: Payment automation

## 📊 Step 11: Monitor Your Workflows

### View Runs

1. Go to **"Runs"** in the sidebar
2. See all workflow executions
3. Click on a run to see details
4. View step-by-step execution logs

### Analytics

1. Go to **"Analytics"**
2. See success rates
3. View execution times
4. Identify errors

## 🛠️ Troubleshooting

### Port Already in Use

If you see "Port 3000 is already in use":

```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Docker Issues

If Docker services won't start:

```bash
# Stop all containers
docker-compose down

# Remove volumes
docker-compose down -v

# Start fresh
docker-compose up -d
```

### Database Connection Error

If you can't connect to Supabase:

1. Check your `DATABASE_URL` in `.env.local`
2. Verify your Supabase project is active
3. Check firewall settings
4. Try using the connection pooler URL

### Temporal Worker Not Starting

If the worker fails to start:

```bash
# Check Temporal is running
docker-compose ps temporal

# Restart Temporal
docker-compose restart temporal

# Check logs
docker-compose logs temporal
```

## 🎓 Next Steps

### Learn More

- 📖 [Full Documentation](./docs/getting-started.md)
- 🎨 [Visual Editor Guide](./docs/visual-editor.md)
- 🔌 [Building Connectors](./docs/connector-sdk.md)
- 🤝 [Contributing Guide](./CONTRIBUTING.md)

### Build Your First Real Workflow

Try these common use cases:

1. **E-commerce**: Order confirmation emails
2. **Marketing**: Social media cross-posting
3. **Sales**: Lead enrichment and notifications
4. **Operations**: Daily reports via email

### Join the Community

- 💬 [Discord Community](https://discord.gg/automationos)
- 🐦 [Twitter](https://twitter.com/automationos)
- 📧 [Email Support](mailto:support@automationos.dev)

## 🆘 Need Help?

- **GitHub Issues**: [Report bugs](https://github.com/itskiranbabu/automation-os/issues)
- **Discussions**: [Ask questions](https://github.com/itskiranbabu/automation-os/discussions)
- **Discord**: [Join our community](https://discord.gg/automationos)
- **Email**: support@automationos.dev

## 🎉 You're All Set!

Congratulations! You now have AutomationOS running locally. Start building amazing automations! 🚀

---

**Estimated Setup Time**: 10-15 minutes  
**Difficulty**: Beginner-friendly  
**Support**: Available 24/7 on Discord