import type { NextConfig } from 'next';
import {
  API_DOMAIN,
  IS_MULTI_ZONE,
} from './src/shared/constants/env-variables';

const nextConfig: NextConfig = {
  /* config options here */
  // transpilePackages: ['@repo/ui', '@repo/api-instance'],
  allowedDevOrigins: ['*.lvh.me'],
  basePath: IS_MULTI_ZONE ? '/cms' : '',
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
