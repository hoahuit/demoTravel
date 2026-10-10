import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const rawTarget = env.VITE_API_BASE_URL || 'https://www.4uretreats.com.vn/api-proxy/';
  const apiTarget = rawTarget.replace(/\/explorer\/?#?\/?$/i, '').replace(/\/+$/, '');

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
