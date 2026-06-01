---
name: vite-pwa-nuxt
description: Sử dụng skill này khi làm việc với Progressive Web App trong Nuxt 4 qua module `@vite-pwa/nuxt`. Kích hoạt khi user đề cập đến PWA Nuxt, service worker Nuxt, install prompt Nuxt, manifest.webmanifest, workbox với Nuxt, offline caching Nuxt, NuxtPwaAssets, $pwa composable, registerType autoUpdate/prompt, hoặc khi file `nuxt.config.ts` có module `@vite-pwa/nuxt`. KHÔNG kích hoạt cho PWA của framework khác (Vite thuần, Next.js, SvelteKit) hay PWA Nuxt 2 (nuxt-pwa cũ).
---

# @vite-pwa/nuxt — PWA cho Nuxt 4

Module chính thức để biến Nuxt 4 app thành Progressive Web App. Chạy trên `vite-plugin-pwa` v1.x.

## Cài đặt

```bash
pnpm dlx nuxi@latest module add @vite-pwa/nuxt
```

Lệnh trên tự động:
- Cài `@vite-pwa/nuxt` vào `package.json`
- Thêm `'@vite-pwa/nuxt'` vào `modules` trong `nuxt.config.ts`

## Cấu trúc cấu hình tối thiểu

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vite-pwa/nuxt'],

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'App Name',
      short_name: 'App',
      theme_color: '#18181b',
      icons: [
        { src: '/pwa-icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
      navigateFallback: '/',
    },
    client: { installPrompt: true },
    devOptions: { enabled: false, type: 'module' },
  },
})
```

## Các quyết định cần làm khi cấu hình

### 1. `registerType` — Chiến lược update

| Giá trị | Hành vi | Khi nào dùng |
|---|---|---|
| `'autoUpdate'` | SW tự tải bản mới, reload trang khi sẵn sàng | Default. Phù hợp đa số app |
| `'prompt'` | Hỏi user trước khi update (qua `$pwa.needRefresh`) | Khi user đang nhập form/làm việc dở, không nên reload đột ngột |
| `'autoUpdate'` + `client.periodicSyncForUpdates` | Tự kiểm tra update theo interval | Long-lived sessions |

### 2. `workbox.globPatterns` — Cái gì được precache

```typescript
workbox: {
  globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
  globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
  maximumFileSizeToCacheInBytes: 3_000_000,  // 3MB, mặc định 2MB thường không đủ
}
```

⚠️ Nếu có asset > 2MB (font lớn, image), phải bump `maximumFileSizeToCacheInBytes` hoặc asset đó sẽ bị bỏ qua âm thầm.

### 3. `workbox.runtimeCaching` — Cache cho API/external resources

Precache chỉ áp dụng cho static assets từ build. API responses, fonts từ CDN cần runtime cache:

```typescript
workbox: {
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.example\.com\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 10,
        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'google-fonts-stylesheets' },
    },
  ],
}
```

Các strategy phổ biến: `CacheFirst` (asset không đổi), `NetworkFirst` (API), `StaleWhileRevalidate` (hiển thị cache cũ + refresh background), `NetworkOnly`, `CacheOnly`.

### 4. `manifest` — Web App Manifest

Field bắt buộc tối thiểu cho cài đặt PWA:
- `name`, `short_name` (≤ 12 chars khuyến nghị)
- `icons` (192×192 và 512×512, PNG)
- `start_url` (mặc định `/`)
- `display` (`'standalone'` hoặc `'fullscreen'`)
- `theme_color` (màu thanh trên cùng)

Icon `purpose: 'any maskable'` quan trọng cho Android — không có nó, icon sẽ bị crop xấu trên một số launcher.

### 5. `devOptions` — Test PWA trong dev

```typescript
devOptions: {
  enabled: true,        // Bật SW trong `nuxt dev`
  type: 'module',       // Module SW (cho phép ES imports)
  navigateFallback: '/', // SPA fallback
}
```

⚠️ Mặc định `enabled: false`. Chỉ bật khi cần debug SW vì sẽ làm chậm dev server và đôi khi conflict với HMR.

## App component — Đăng ký manifest

```vue
<!-- app/app.vue -->
<template>
  <NuxtPwaAssets />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

`<NuxtPwaAssets />` tự inject `<link rel="manifest">`, theme color, apple touch icons, v.v. vào `<head>`. Đây là **API mới của v1.x**, thay thế cho `<VitePwaManifest />` cũ.

## `$pwa` runtime — Install & Update UI

`$pwa` là composable injection có sẵn khi `client.installPrompt: true` hoặc `registerType: 'prompt'`:

```vue
<script setup lang="ts">
const { $pwa } = useNuxtApp()
</script>

<template>
  <!-- Nút cài app -->
  <button
    v-if="$pwa?.showInstallPrompt && !$pwa?.isPWAInstalled"
    @click="$pwa?.install()"
  >
    Cài đặt App
  </button>

  <!-- Banner update -->
  <div v-if="$pwa?.needRefresh">
    Có phiên bản mới
    <button @click="$pwa?.updateServiceWorker()">Cập nhật</button>
    <button @click="$pwa?.cancelPrompt()">Đóng</button>
  </div>

  <!-- Trạng thái offline ready -->
  <div v-if="$pwa?.offlineReady">App sẵn sàng dùng offline ✓</div>
</template>
```

### Bảng các property của `$pwa`

| Property | Loại | Mô tả |
|---|---|---|
| `isPWAInstalled` | `boolean` | App đã được cài qua manifest |
| `showInstallPrompt` | `boolean` | Browser đã fire `beforeinstallprompt`, có thể cài |
| `cancelInstall` | `boolean` | User đã từ chối install prompt |
| `needRefresh` | `boolean` | Có SW mới đang chờ activate |
| `offlineReady` | `boolean` | Lần đầu cache xong, app dùng được offline |
| `install()` | `() => Promise<void>` | Trigger native install dialog |
| `updateServiceWorker(reload?)` | `(reload?: boolean) => Promise<void>` | Activate SW mới (default reload page) |
| `cancelPrompt()` | `() => Promise<void>` | Dismiss update banner |
| `getSWRegistration()` | `() => ServiceWorkerRegistration` | Lấy registration để custom logic |

## Tạo icon PWA

Chuẩn bị 1 file SVG gốc tại `public/pwa-icons/icon.svg` (vector, ≥ 512×512), rồi:

```bash
pnpm dlx @vite-pwa/assets-generator --preset minimal public/pwa-icons/icon.svg
```

Preset `minimal` sinh ra: favicon, apple-touch-icon, 192/512 maskable. Preset `minimal-2023` thêm các size mới hơn.

Có thể override config qua `pwa-assets.config.ts`:

```typescript
// pwa-assets.config.ts
import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset: minimal2023Preset,
  images: ['public/pwa-icons/icon.svg'],
})
```

## TypeScript

Khai báo types trong `tsconfig.json` (Nuxt tự thêm khi `pnpm prepare`):

```json
{
  "compilerOptions": {
    "types": ["@vite-pwa/nuxt"]
  }
}
```

Type của `$pwa`: `PwaInjection` từ `@vite-pwa/nuxt`.

## Build & Test

```bash
# Build production
pnpm build

# Preview (SW chỉ chạy đầy đủ ở mode này, không phải dev)
pnpm preview --host 0.0.0.0

# Verify trong Chrome DevTools
# → Application → Manifest (check manifest hợp lệ)
# → Application → Service Workers (check SW active)
# → Lighthouse → Run PWA audit (target ≥ 90)
```

## Common pitfalls

### SW không update sau khi deploy
- `cleanupOutdatedCaches: true` trong workbox config (xoá cache cũ)
- Versioning: thêm hash vào `manifest.id` nếu thay đổi scope

### HMR bị conflict với SW trong dev
- Tắt `devOptions.enabled` khi không debug PWA
- Hoặc set `vite.server.hmr.port` khác port mặc định

### Icon không hiển thị khi cài
- Kiểm tra path icon trong `manifest.icons` phải tuyệt đối (`/pwa-icons/...`)
- Đảm bảo file thực sự tồn tại trong `public/`
- Có ít nhất 1 icon `purpose: 'any maskable'` cho Android

### `globPatterns` không match assets
- Default chỉ match assets được Nuxt build ra `.output/public`
- File từ `public/` cần thêm vào `includeAssets`:
  ```typescript
  pwa: {
    includeAssets: ['favicon.ico', 'robots.txt', 'pwa-icons/*.png'],
  }
  ```

### Cache quá lớn khiến install fail
- Kiểm tra tổng size precache sau build (log của vite-plugin-pwa)
- Loại bỏ asset không cần thiết khỏi `globPatterns`
- Chuyển sang `runtimeCaching` cho asset lớn

### Service Worker không chạy local
- SW yêu cầu **HTTPS** hoặc **localhost**
- Nếu test qua IP LAN (e.g., `192.168.x.x`), phải dùng HTTPS hoặc tunnel (ngrok, cloudflared)

## Tài liệu chính thức

- https://vite-pwa-org.netlify.app/frameworks/nuxt
- https://vite-pwa-org.netlify.app/workbox/
- https://developer.mozilla.org/en-US/docs/Web/Manifest
