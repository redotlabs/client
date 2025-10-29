import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'components/index': 'src/components/index.ts',
    'components/ui/index': 'src/components/ui/index.ts',
    'components/ui-primitive/index': 'src/components/ui-primitive/index.ts',
    'components/node/index': 'src/components/node/index.ts',
    'components/icons/index': 'src/components/icons/index.ts',
    'lib/index': 'src/lib/index.ts',
    'hooks/index': 'src/hooks/index.ts',
    styles: 'src/styles.ts',
  },
  format: ['esm', 'cjs'],
  dts: {
    compilerOptions: {
      skipLibCheck: true,
    },
  },
  splitting: false,
  clean: true,
  outDir: 'dist',
  target: 'es2020',
  external: ['react', 'react-dom'],
  loader: {
    '.scss': 'copy',
  },
});
