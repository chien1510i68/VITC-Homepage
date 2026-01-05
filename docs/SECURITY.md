# Security Guidelines

## Overview

This document outlines security best practices and implementations for the VITC Homepage project.

## Security Headers

Security headers are configured in [next.config.ts](../next.config.ts):

### Content Security Policy (CSP)

```typescript
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
```

**What it protects:**
- XSS attacks by controlling script sources
- Data injection attacks
- Clickjacking via `frame-ancestors 'none'`

### HSTS (HTTP Strict Transport Security)

```typescript
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**What it protects:**
- Forces HTTPS connections for 1 year
- Prevents SSL stripping attacks
- Includes all subdomains

### X-Frame-Options

```typescript
X-Frame-Options: DENY
```

**What it protects:**
- Prevents clickjacking attacks
- Stops site from being embedded in iframes

### Other Security Headers

```typescript
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## Rate Limiting

Rate limiting is implemented in [lib/rate-limit.ts](../lib/rate-limit.ts):

### Configuration

```typescript
// Form submissions - 5 requests per 15 minutes
formSubmission: {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
}

// API endpoints - 100 requests per 15 minutes
api: {
  maxRequests: 100,
  windowMs: 15 * 60 * 1000,
}

// Authentication - 5 requests per hour
auth: {
  maxRequests: 5,
  windowMs: 60 * 60 * 1000,
}
```

### Usage in API Routes

```typescript
import { withRateLimit, rateLimitConfigs } from '@/lib/rate-limit';

export const POST = withRateLimit(
  async (request) => {
    // Your handler code
    return NextResponse.json({ success: true });
  },
  rateLimitConfigs.formSubmission
);
```

**What it protects:**
- Brute force attacks
- DDoS attacks
- Spam submissions
- Resource exhaustion

## Input Validation

All user inputs are validated using Zod schemas in [lib/validation.ts](../lib/validation.ts):

### Contact Form Example

```typescript
export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex).optional(),
  message: z.string().min(10).max(1000),
});
```

### Using Validation

```typescript
import { validateData, contactFormSchema } from '@/lib/validation';

const result = validateData(contactFormSchema, formData);

if (!result.success) {
  return NextResponse.json(
    { errors: result.errors },
    { status: 400 }
  );
}

// Use result.data (type-safe and validated)
```

**What it protects:**
- SQL injection
- XSS attacks
- Buffer overflow
- Invalid data processing

## XSS Prevention

### HTML Sanitization

```typescript
import { sanitizeHTML, sanitizeInput } from '@/lib/validation';

// Sanitize user input before rendering
const safeContent = sanitizeHTML(userInput);

// Sanitize form inputs
const safeInput = sanitizeInput(formData.message);
```

### React Best Practices

- Never use `dangerouslySetInnerHTML` without sanitization
- Use React's built-in XSS protection (automatic escaping)
- Validate and sanitize all user inputs

## Authentication & Authorization

### Environment Variables

Sensitive data is stored in environment variables:

```env
# Never commit these to version control
NEXT_PUBLIC_API_URL=https://api.vitc.edu.vn
API_SECRET_KEY=your-secret-key
DATABASE_URL=your-database-url
```

### Validation

Environment variables are validated using Zod in [lib/env.ts](../lib/env.ts):

```typescript
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});
```

## CORS Configuration

CORS is configured in API routes when needed:

```typescript
export async function GET(request: Request) {
  const origin = request.headers.get('origin');
  
  // Only allow specific origins
  const allowedOrigins = ['https://vitc.edu.vn'];
  
  if (!origin || !allowedOrigins.includes(origin)) {
    return new Response('Forbidden', { status: 403 });
  }
  
  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

## Error Handling

### Secure Error Messages

Never expose sensitive information in error messages:

```typescript
// ❌ Bad - exposes database structure
catch (error) {
  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  );
}

// ✅ Good - generic message, log details server-side
catch (error) {
  console.error('Database error:', error);
  return NextResponse.json(
    { error: 'An error occurred. Please try again later.' },
    { status: 500 }
  );
}
```

### Error Tracking

Errors are tracked securely with Sentry (see [lib/sentry.ts](../lib/sentry.ts)):

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  // Your code
} catch (error) {
  Sentry.captureException(error);
  // Return generic error to user
}
```

## Data Protection

### Personal Data Handling

- Never log sensitive user data (passwords, CCCD, etc.)
- Use HTTPS for all data transmission
- Implement proper data retention policies
- Follow GDPR/PDPA guidelines

### Database Security

- Use parameterized queries to prevent SQL injection
- Encrypt sensitive data at rest
- Use connection pooling securely
- Implement proper access controls

## Security Checklist

### Before Deployment

- [ ] All environment variables configured correctly
- [ ] CSP headers properly set for production domains
- [ ] Rate limiting enabled on all API routes
- [ ] Input validation on all forms and API endpoints
- [ ] Error messages don't expose sensitive information
- [ ] HTTPS enforced with HSTS
- [ ] Sentry or error tracking configured
- [ ] Security headers verified (use securityheaders.com)
- [ ] Dependencies updated (run `npm audit`)
- [ ] No hardcoded secrets in code

### Regular Maintenance

- [ ] Review and rotate API keys quarterly
- [ ] Update dependencies monthly
- [ ] Review Sentry errors weekly
- [ ] Audit rate limit logs for suspicious activity
- [ ] Review CSP violations (if logged)
- [ ] Update security headers as needed

## Reporting Security Issues

If you discover a security vulnerability:

1. **Do NOT** create a public GitHub issue
2. Email security@vitc.edu.vn with details
3. Include steps to reproduce if possible
4. Allow 48 hours for initial response

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Security Headers](https://securityheaders.com/)

## Updates

This document should be reviewed and updated:
- When adding new features
- After security audits
- When security best practices change
- Quarterly as part of maintenance

Last updated: 2024-01-01
