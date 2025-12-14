import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()] as PluginOption[],
  resolve: {
    preserveSymlinks: true,
    dedupe: ['react', 'react-dom'],
    alias: {
      '@repo/builder/editor': path.resolve(
        __dirname,
        '../editor/src/index.ts'
      ),
      '@repo/builder/renderer': path.resolve(
        __dirname,
        '../renderer/src/index.ts'
      ),
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    open: true,
  },
});
