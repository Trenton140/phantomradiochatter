import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), imagetools()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
