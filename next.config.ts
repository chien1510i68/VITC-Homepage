import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'trungtamkynangmem.vnua.edu.vn',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
