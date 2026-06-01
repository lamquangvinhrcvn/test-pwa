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
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Faeger-UG',
      short_name: 'Faeger-UG',
      description: 'Faeger-UG Progressive Web App',
      theme_color: '#18181b',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        { src: '/pwa-icons/pwa-64x64.png', sizes: '64x64', type: 'image/png' },
        { src: '/pwa-icons/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-icons/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: '/pwa-icons/maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
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
      enabled: true,    // Bật SW trong dev để test install prompt
      type: 'module',
    },
  },
})
