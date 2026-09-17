import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiTarget = env.VITE_API_BASE_URL || 'http://127.0.0.1:3001';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: false,
      proxy: {
        '/api-proxy': {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-proxy/, ''),
        },
        '/auth': {
          target: apiTarget,
          changeOrigin: true,
        },
        '/users': {
          target: apiTarget,
          changeOrigin: true,
        },
        '/tours': {
          target: apiTarget,
          changeOrigin: true,
        },
        '/sections': {
          target: apiTarget,
          changeOrigin: true,
        },
        '/uploads': {
          target: apiTarget,
          changeOrigin: true,
        },
        '/files': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
