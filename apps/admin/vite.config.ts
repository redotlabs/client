import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const API_DOMAIN = env.VITE_API_DOMAIN || 'http://localhost:8000';

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0', // 모든 네트워크 인터페이스에서 요청 수신
      hmr: {
        clientPort: 3000,
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
