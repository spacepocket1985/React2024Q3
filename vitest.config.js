import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    watch: false,
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      extension: ['ts', 'tsx', 'js'],
      include: ['src'],
      exclude: ['src/types' ],
      all: true,
  },
  },
});