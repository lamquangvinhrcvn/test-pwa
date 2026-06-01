## 1. Design Tokens & Nuxt Config

- [x] 1.1 Cập nhật `app/assets/css/main.css`: thêm `@theme` block với primary color palette (50–950, `#2d5a27` làm 500), neutral color palette (50–950), giữ nguyên `@import "tailwindcss"` và `@import "@nuxt/ui"`
- [x] 1.2 Cập nhật `nuxt.config.ts`: thêm `ui: { primary: 'primary', neutral: 'neutral' }` vào config (module `@nuxt/ui` và `css: ['~/assets/css/main.css']` đã có sẵn)

## 2. Type System

- [x] 2.1 Tạo `types/index.ts`: định nghĩa các interface `Point`, `Field`, `Pipe`, `Reading`, `SurveyItem` theo đúng data model trong ARCHITECTURE.md

## 3. App Shell Components

- [x] 3.1 Tạo `components/AppHeader.vue`: header xanh `bg-primary-500`, 3 named slots `#title`, `#back`, `#action`; slot `#back` dùng `UButton` icon `i-lucide-chevron-left` variant ghost color white, slot `#action` linh hoạt cho page tự điền
- [x] 3.2 Tạo `components/BottomNav.vue`: nav fixed bottom, 4 tab Home/Fields/Monitor/Logbook dùng `UButton` variant ghost, icon `i-lucide-home` / `i-lucide-layout-grid` / `i-lucide-gauge` / `i-lucide-book-open`, active tab màu `primary`, inactive màu `neutral`, điều hướng bằng `NuxtLink` hoặc `navigateTo`

## 4. Layouts

- [x] 4.1 Tạo `layouts/default.vue`: `<slot />` cho page content + `<BottomNav />`; thêm padding-bottom để content không bị nav che
- [x] 4.2 Tạo `layouts/auth.vue`: chỉ `<slot />`, không header, không nav
