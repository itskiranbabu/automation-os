# AutomationOS Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
1. Supabase account ([Sign up](https://supabase.com))
2. Gemini API key ([Get one](https://makersuite.google.com/app/apikey))
3. Vercel account ([Sign up](https://vercel.com))

### Step 1: Fork/Clone Repository
```bash
git clone https://github.com/itskiranbabu/automation-os.git
cd automation-os
```

### Step 2: Set Up Supabase

1. Create a new Supabase project
2. Go to Project Settings → API
3. Copy your project URL and keys
4. Go to SQL Editor and run the migration:
   - Copy contents from `supabase/migrations/001_initial_schema.sql`
   - Paste and execute in SQL Editor

### Step 3: Configure Environment Variables

Create `.env.local` file:

```env
# Next.js
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Encryption (generate with: openssl rand -hex 32)
ENCRYPTION_KEY=your_32_byte_hex_key

# Redis (optional for local dev)
REDIS_URL=redis://localhost:6379

# Temporal (optional for local dev)
TEMPORAL_ADDRESS=localhost:7233
```

### Step 4: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your GitHub repository
3. Add environment variables from `.env.local`
4. Click "Deploy"

#### Option B: Deploy via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add GEMINI_API_KEY
vercel env add ENCRYPTION_KEY

# Deploy to production
vercel --prod
```

### Step 5: Seed Database

After deployment, seed the database with templates:

```bash
# Install dependencies locally
npm install

# Run seed script
npm run seed
```

### Step 6: Configure OAuth (Optional)

For Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
4. Add to Supabase: Authentication → Providers → Google
5. Add environment variables:
   ```env
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

## 🐳 Docker Deployment

### Build and Run
```bash
# Build image
docker build -t automation-os .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  automation-os
```

### Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔧 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 3. Start Infrastructure
```bash
docker-compose up -d
```

### 4. Run Migrations
```bash
npm run migrate
```

### 5. Seed Database
```bash
npm run seed
```

### 6. Start Development Server
```bash
# Terminal 1: Next.js dev server
npm run dev

# Terminal 2: Temporal worker (optional)
npm run worker
```

Visit `http://localhost:3000`

## 🔐 Security Checklist

- [ ] Change default encryption key
- [ ] Enable RLS policies in Supabase
- [ ] Set up proper CORS policies
- [ ] Configure rate limiting
- [ ] Enable Sentry error tracking
- [ ] Set up SSL/TLS certificates
- [ ] Configure CSP headers
- [ ] Enable 2FA for admin accounts

## 📊 Monitoring

### Vercel Analytics
- Automatically enabled for all deployments
- View at: `https://vercel.com/[your-team]/[project]/analytics`

### Supabase Monitoring
- Database performance: Supabase Dashboard → Database
- Auth metrics: Supabase Dashboard → Authentication
- API usage: Supabase Dashboard → API

### Custom Monitoring
Add Sentry for error tracking:
```env
SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_auth_token
```

## 🚨 Troubleshooting

### Build Fails
- Check Node version: `node -v` (should be 20.x)
- Clear cache: `rm -rf .next node_modules && npm install`
- Check environment variables are set

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check Supabase project is active
- Ensure IP is whitelisted (if using IP restrictions)

### Authentication Not Working
- Verify Supabase URL and keys
- Check redirect URLs are configured
- Ensure email confirmation is set up

### Deployment Issues
- Check Vercel logs: `vercel logs`
- Verify all environment variables are set
- Check build output for errors

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com)

## 🆘 Support

- GitHub Issues: [Create an issue](https://github.com/itskiranbabu/automation-os/issues)
- Documentation: [Read the docs](https://github.com/itskiranbabu/automation-os/blob/main/README.md)
- Community: [Join discussions](https://github.com/itskiranbabu/automation-os/discussions)
