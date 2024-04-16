import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { VitePWA } from 'vite-plugin-pwa';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, '/src') }],
  },
  plugins: [
    reactRefresh(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: false
      },
      devOptions: {
        enabled: true,
      },
      includeAssets: ['/assets/**/*', '/favicon/**/*', '/manifest.json', '/robots.txt', '/fonts/**/*'],
      manifest: {
        name: 'Code Buddy - Your coding partner',
        short_name: 'CodeBuddy',
        description:
          'This Web Application aims to provide a plateform for the users using which they can code online, share the code with friends have a look over varoius coding contest.',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/favicon/favicon-196x196.png',
            sizes: '196x196',
            type: 'image/png',
          },
          {
            src: '/favicon/apple-touch-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/favicon/mstile-310x310.png',
            sizes: '558x558',
            type: 'image/png',
          },
          {
            src: '/favicon/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
