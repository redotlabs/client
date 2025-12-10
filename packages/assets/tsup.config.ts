import { defineConfig } from 'tsup';
import svgr from 'esbuild-plugin-svgr';

export default defineConfig({
  entry: ['src', '!src/**/*.svg', '!src/vite-env.d.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  clean: true,
  outDir: 'dist',
  target: 'es2020',
  esbuildPlugins: [svgr({ exportType: 'default' })],
});
