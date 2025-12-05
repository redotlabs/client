import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  clean: true,
  outDir: 'dist',
  target: 'es2020',
  external: ['react', 'react-dom'],
});
