import { API_DOMAIN, CMS_DOMAIN } from '@/shared/constants/env-variables';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['*.lvh.me'],
  reactCompiler: true,
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
