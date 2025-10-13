import type { NextConfig } from 'next';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:3000';

const nextConfig: NextConfig = {
  /* config options here */
  // transpilePackages: ['@repo/ui', '@repo/api-instance'],
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${API_BASE_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
