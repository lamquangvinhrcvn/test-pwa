// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxt/ui',
    '@vite-pwa/nuxt',
  ],

  // Cần thiết để Vite HMR hoạt động qua Docker
  vite: {
    server: {
      watch: { usePolling: true },
      hmr: { host: 'localhost', port: 24678 },
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'My Nuxt PWA',
      short_name: 'NuxtPWA',
      description: 'Nuxt 4 PWA',
      theme_color: '#18181b',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        { src: '/pwa-icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: false,   // Đặt true khi muốn test SW trong dev
      type: 'module',
    },
  },
})
