import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  outDir: 'dist',
  target: 'es2020',
});
