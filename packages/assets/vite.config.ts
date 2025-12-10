import react from '@vitejs/plugin-react';
import { defineConfig, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()] as PluginOption[],
});
