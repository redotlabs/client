import {
  AUTH_API_DOMAIN,
  BLOG_API_DOMAIN,
} from '@/shared/constants/env-variables';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/auth/:path*',
        destination: `${AUTH_API_DOMAIN}/api/v1/auth/:path*`,
      },
      {
        source: '/api/v1/:path*',
        destination: `${BLOG_API_DOMAIN}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
