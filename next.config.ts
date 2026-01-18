import type { NextConfig } from "next";

// Default API URL for build time (sẽ được override khi run container)
const DEFAULT_API_URL = 'http://localhost:8080/api/v1';

// Get API URL with fallback
const apiUrlFromEnv = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

// Validate API URL format if provided
if (apiUrlFromEnv) {
  try {
    const apiUrl = new URL(apiUrlFromEnv);
    if (!apiUrl.pathname.includes('/api/v1')) {
      console.warn(
        '⚠️  WARNING: NEXT_PUBLIC_API_URL should end with /api/v1\n' +
        `Current value: ${apiUrlFromEnv}\n`
      );
    }
  } catch (error) {
    console.error(
      `\n\n❌ Invalid NEXT_PUBLIC_API_URL: ${apiUrlFromEnv}\n` +
      'Must be a valid URL (e.g., http://localhost:8080/api/v1)\n\n'
    );
    // Warning only, don't throw error to allow build
  }
}

// Log the API URL being used
console.log(`📡 Building with API URL: ${apiUrlFromEnv}`);

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vitc.edu.vn',
        pathname: '/image_slide/**',
      },
      {
        protocol: 'https',
        hostname: 'vitc.edu.vn',
        pathname: '/Frond_end/images/**',
      },
      {
        protocol: 'https',
        hostname: 'visc.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'http',
        hostname: 'trungtamkynangmem.vnua.edu.vn',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'file.vnua.edu.vn',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  
  // API Rewrites - Proxy to backend to avoid CORS
  async rewrites() {
    const apiBaseUrl = apiUrlFromEnv;
    return [
      {
        source: '/backend-api/:path*',
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
  
  // Security headers
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    
    // Extract only the origin (protocol + hostname + port) without path
    let apiOrigin: string;
    try {
      const url = new URL(apiUrlFromEnv);
      apiOrigin = url.origin; // This gets http://localhost:8080 without /api/v1
    } catch (e) {
      console.warn(`Failed to parse API URL: ${apiUrlFromEnv}`);
      apiOrigin = 'http://localhost:8080'; // Fallback
    }
    
    // In development, allow localhost connections
    const connectSrc = isDev 
      ? `'self' ${apiOrigin} https://vitc.edu.vn https://www.google-analytics.com https://*.sentry.io https://*.facebook.com https://*.facebook.net`
      : `'self' https://vitc.edu.vn https://www.google-analytics.com https://*.sentry.io https://*.facebook.com https://*.facebook.net`;
    
    return [
      {
        source: '/:path*',
        headers: [
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://*.facebook.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: http:",
              "font-src 'self' data:",
              `connect-src ${connectSrc}`,
              "frame-src 'self' https://www.youtube.com https://www.facebook.com https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          // Strict Transport Security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // X-Frame-Options
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // X-Content-Type-Options
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // X-DNS-Prefetch-Control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // X-XSS-Protection (legacy, but still useful for older browsers)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
