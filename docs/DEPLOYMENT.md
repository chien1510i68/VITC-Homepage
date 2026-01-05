# Deployment Guide

Complete guide for deploying the VITC Homepage to production.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Build Process](#build-process)
- [Deployment Platforms](#deployment-platforms)
- [Post-Deployment](#post-deployment)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

## ✅ Prerequisites

Before deploying, ensure you have:

- [ ] All code committed to version control
- [ ] Environment variables documented
- [ ] Production API endpoint available
- [ ] Domain name configured (if applicable)
- [ ] SSL certificate ready (handled by hosting platform)

## 🔧 Environment Setup

### 1. Production Environment Variables

Create a production `.env.production` or set variables in your hosting platform:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.vitc.edu.vn/api
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_USE_MOCK_FALLBACK=false

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://vitc.edu.vn
NEXT_PUBLIC_SITE_NAME=VITC - Trung tâm Tin học
NEXT_PUBLIC_SITE_DESCRIPTION=Trung tâm đào tạo Tin học hàng đầu Việt Nam
NEXT_PUBLIC_CONTACT_EMAIL=contact@vitc.edu.vn
NEXT_PUBLIC_CONTACT_PHONE=024-1234-5678

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SENTRY=true
NEXT_PUBLIC_USE_MOCK_DATA=false

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Build Configuration
NODE_ENV=production
GENERATE_SOURCEMAP=false
```

### 2. Validate Environment

```bash
# Test build locally with production env
NODE_ENV=production npm run build
npm run start

# Check for errors and warnings
```

## 🏗️ Build Process

### Local Production Build

```bash
# Install dependencies
npm ci

# Run type checking
npm run type-check

# Run linting
npm run lint

# Create production build
npm run build

# Test production build locally
npm run start
```

### Build Optimization

The Next.js build process automatically:

- ✅ Minifies JavaScript and CSS
- ✅ Optimizes images
- ✅ Generates static pages
- ✅ Creates API routes
- ✅ Bundles and tree-shakes code

## 🚀 Deployment Platforms

### Vercel (Recommended)

Vercel is the easiest option for Next.js applications.

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Deploy

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### 4. Configure via Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Import your Git repository
3. Configure environment variables
4. Set custom domain
5. Enable automatic deployments

**Environment Variables in Vercel:**
- Settings → Environment Variables
- Add all variables from `.env.example`
- Separate values for Production/Preview/Development

**Custom Domain:**
- Settings → Domains
- Add your domain
- Configure DNS records as instructed

### Netlify

#### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### 2. Login

```bash
netlify login
```

#### 3. Deploy

```bash
# Build the site
npm run build

# Deploy
netlify deploy --prod
```

#### 4. netlify.toml Configuration

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Docker

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

#### Build and Run

```bash
# Build image
docker build -t vitc-homepage .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://api.vitc.edu.vn/api \
  vitc-homepage
```

#### Docker Compose

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_BASE_URL=https://api.vitc.edu.vn/api
    restart: unless-stopped
```

### Traditional VPS/Server

#### 1. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2
```

#### 2. Deploy Application

```bash
# Clone repository
git clone https://github.com/your-org/vitc-homepage.git
cd vitc-homepage

# Install dependencies
npm ci

# Build
npm run build

# Start with PM2
pm2 start npm --name "vitc-homepage" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### 3. Nginx Configuration

```nginx
server {
    listen 80;
    server_name vitc.edu.vn www.vitc.edu.vn;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 4. SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d vitc.edu.vn -d www.vitc.edu.vn

# Auto-renew
sudo certbot renew --dry-run
```

## ✅ Post-Deployment

### 1. Verification Checklist

- [ ] Site loads correctly
- [ ] All pages are accessible
- [ ] Navigation works
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] API calls succeed
- [ ] Mobile responsive
- [ ] SSL certificate valid

### 2. Performance Check

Use [PageSpeed Insights](https://pagespeed.web.dev/):

```bash
# Target metrics
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100
```

### 3. SEO Verification

- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Meta tags present on all pages
- [ ] Open Graph images working
- [ ] Structured data valid

Test with:
- [Google Search Console](https://search.google.com/search-console)
- [Schema Markup Validator](https://validator.schema.org/)

## 📊 Monitoring

### Analytics Setup

#### Google Analytics

1. Create GA4 property
2. Add Measurement ID to environment variables
3. Verify tracking in GA dashboard

#### Vercel Analytics

Automatically enabled on Vercel - no setup needed.

### Error Tracking

#### Sentry Setup

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Uptime Monitoring

Use services like:
- [UptimeRobot](https://uptimerobot.com/)
- [Pingdom](https://www.pingdom.com/)
- [StatusCake](https://www.statuscake.com/)

## 🐛 Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

```bash
# Verify variables are set
echo $NEXT_PUBLIC_API_BASE_URL

# Restart server after changes
pm2 restart vitc-homepage
```

### 404 Errors

Check:
- File-based routing is correct
- `not-found.tsx` exists
- Rewrites in `next.config.ts` if needed

### Performance Issues

```bash
# Analyze bundle size
npm run build -- --analyze

# Check for large dependencies
npm install -g webpack-bundle-analyzer
```

### SSL Issues

```bash
# Check certificate
openssl s_client -connect vitc.edu.vn:443

# Renew Let's Encrypt
sudo certbot renew
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_BASE_URL: ${{ secrets.API_BASE_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## 📋 Maintenance

### Regular Tasks

- **Weekly**: Check error logs
- **Monthly**: Review analytics
- **Monthly**: Update dependencies
- **Quarterly**: Security audit
- **Yearly**: SSL renewal (if not automatic)

### Updates

```bash
# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Update Next.js
npm install next@latest react@latest react-dom@latest
```

---

For more information, see [DEVELOPMENT.md](./DEVELOPMENT.md).
