import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    !process.env.VITEST ? remix({ appDirectory: 'app' }) : react(),
    tsconfigPaths(),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src', 'app'],
      exclude: ['src/types'],
      extension: ['ts', 'tsx', 'js'],
    },
    env: loadEnv('test', process.cwd(), ''),
  },
});
