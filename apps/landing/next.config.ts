import { API_DOMAIN } from '@/shared/constants/env-variables';
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
        source: '/api/v1/:path*',
        destination: `${API_DOMAIN}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
