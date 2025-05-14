import { defineConfig } from 'vitest/config';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    ...configDefaults,
    environment: 'jsdom',
  },

  server: {
    port: 3001,
    host: '127.0.0.1',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
      },
      
    },
  },
});
