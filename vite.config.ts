import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '韓国語単語帳',
        short_name: '한국어',
        description: '韓国語単語を毎日学習',
        theme_color: '#4f46e5',
        background_color: '#f9fafb',
        display: 'standalone',
        start_url: '/HArray/',
        scope: '/HArray/',
        icons: [
          {
            src: '/HArray/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: '/HArray/index.html',
      },
    }),
  ],
  base: '/HArray/',
  server: {
    host: true,
    port: 5173,
  },
})
