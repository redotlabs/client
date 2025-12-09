import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const API_DOMAIN = env.VITE_API_DOMAIN || 'http://localhost:8000';

  return {
    base: '/builder/',
    plugins: [react(), tailwindcss(), tsconfigPaths()] as PluginOption[],
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@repo/builder/editor': path.resolve(
          __dirname,
          '../../packages/builder/editor/src/index.ts'
        ),
        '@repo/builder/renderer': path.resolve(
          __dirname,
          '../../packages/builder/renderer/src/index.ts'
        ),
        '@repo/hooks': path.resolve(
          __dirname,
          '../../packages/hooks/src/index.ts'
        ),
      },
    },
    server: {
      allowedHosts: ['localhost', '127.0.0.1'],
      port: 3002,
      host: '0.0.0.0', // 모든 네트워크 인터페이스에서 요청 수신
      hmr: {
        clientPort: 3002,
      },
      proxy: {
        '/api': {
          target: API_DOMAIN,
          changeOrigin: true,
        },
      },
    },
  };
});
