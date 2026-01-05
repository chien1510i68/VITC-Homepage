# Package Installation Instructions

## Required Dependencies

The following packages need to be installed for all features to work properly:

### Production Dependencies

```bash
npm install zod
```

### Optional Dependencies (for full feature set)

#### Web Vitals Monitoring

```bash
npm install web-vitals
```

**Used in:** `lib/web-vitals.ts`  
**Purpose:** Track Core Web Vitals (LCP, FID, CLS, etc.)

#### Error Tracking

```bash
npm install @sentry/nextjs
```

**Used in:** `lib/sentry.ts`  
**Purpose:** Error tracking and performance monitoring

### Development Dependencies

```bash
npm install --save-dev @types/node
```

## Installation Commands

### Install all at once (recommended)

```bash
# Production dependencies
npm install zod

# Optional but recommended
npm install web-vitals @sentry/nextjs

# Dev dependencies
npm install --save-dev @types/node
```

### Verify Installation

After installation, run:

```bash
npm list zod web-vitals @sentry/nextjs
```

## Configuration After Installation

### 1. Sentry (if installed)

Create `sentry.client.config.ts` and `sentry.server.config.ts` in the root:

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  enabled: process.env.NEXT_PUBLIC_ENABLE_SENTRY === 'true',
  tracesSampleRate: 1.0,
});
```

### 2. Environment Variables

Update `.env.local`:

```env
# Analytics
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Error Tracking
NEXT_PUBLIC_ENABLE_SENTRY=true
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id

# Web Vitals
NEXT_PUBLIC_ENABLE_WEB_VITALS=true
```

## Feature Status Without Optional Packages

| Feature | Without Package | Status |
|---------|----------------|--------|
| Input Validation | Works | ✅ (uses Zod - required) |
| Rate Limiting | Works | ✅ (in-memory) |
| Analytics | Partial | ⚠️ (console logs only) |
| Web Vitals | Disabled | ❌ (needs web-vitals package) |
| Error Tracking | Disabled | ❌ (needs @sentry/nextjs) |
| Accessibility | Works | ✅ (no dependencies) |
| i18n | Works | ✅ (built-in Intl API) |
| Design System | Works | ✅ (no dependencies) |

## Notes

- All core features work without optional packages
- Optional packages enable production-grade monitoring and analytics
- Install optional packages before deploying to production
- Run `npm audit` after installing packages

Last updated: 2024-01-01
