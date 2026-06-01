## Context

Dự án UG AWD Monitor App dùng Nuxt 4 + Nuxt UI v3 (Tailwind v4) + PWA. Hiện tại `nuxt.config.ts` đã có module `@nuxt/ui` và `@vite-pwa/nuxt`, `app/assets/css/main.css` đã có `@import "tailwindcss"` và `@import "@nuxt/ui"`, nhưng thiếu:

- Định nghĩa `@theme` màu primary/neutral trong CSS
- Cấu hình `ui.primary` / `ui.neutral` trong `nuxt.config.ts`
- Type system (`types/index.ts`)
- Header, BottomNav, và layout components

Đây là change nền tảng đầu tiên — tất cả các change sau (auth, home, fields, monitor, logbook, offline) đều phụ thuộc vào nó.

## Goals / Non-Goals

**Goals:**
- Thiết lập design tokens (primary green, neutral gray) theo chuẩn Tailwind v4 `@theme`
- Cấu hình Nuxt UI để nhận diện `primary` và `neutral` từ tokens
- Định nghĩa toàn bộ TypeScript interfaces cho data model
- Tạo AppHeader, BottomNav, và 2 layouts (default + auth) dùng chung toàn app

**Non-Goals:**
- Không làm bất kỳ màn hình cụ thể nào (login, home, fields, monitor, logbook)
- Không cài thêm package mới (các module đã có sẵn)
- Không thay đổi cấu hình PWA hiện tại

## Decisions

### Decision 1: Tailwind v4 `@theme` thay vì CSS variables rời

**Chọn:** Khai báo toàn bộ màu trong block `@theme {}` của `main.css`.

**Lý do:** Nuxt UI v3 tự động đọc `@theme` để sinh ra các class `bg-primary-*`, `text-primary-*`, và nhận diện `color="primary"` prop. Cách này tích hợp sâu với Tailwind v4, không cần file config riêng.

**Đã cân nhắc:** Dùng `:root {}` CSS variables — không được vì Nuxt UI v3 không pick up CSS variables ngoài `@theme`.

### Decision 2: Dùng Nuxt UI `UButton` variant `ghost` cho BottomNav

**Chọn:** `<UButton variant="ghost" :color="active ? 'primary' : 'neutral'" />`.

**Lý do:** Phù hợp với convention trong `design/00_design-tokens.md`. Ghost variant tạo text-button không viền, phù hợp cho navigation tabs. Dùng prop `color` thay vì hardcode class.

**Đã cân nhắc:** HTML `<button>` thuần với Tailwind class — không dùng vì convention yêu cầu ưu tiên Nuxt UI components.

### Decision 3: Layout `auth.vue` chỉ có `<slot />`, không nav

**Chọn:** `auth.vue` là minimal layout — chỉ `<NuxtLayout><slot /></NuxtLayout>` wrapper, không header, không nav.

**Lý do:** Màn hình login (pages/index.vue) sẽ dùng layout này. Không cần navigation khi chưa đăng nhập.

### Decision 4: AppHeader dùng named slots

**Chọn:** 3 slots: `#title` (default nội dung), `#back` (nút back trái), `#action` (nút action phải).

**Lý do:** Mỗi màn hình có nhu cầu header khác nhau — có màn cần nút back, có màn cần nút save, có màn chỉ cần title. Named slots cho phép page tự quyết định slot nào cần fill.

## Risks / Trade-offs

- **AppHeader quá flexible** → các page có thể dùng không nhất quán. Mitigation: Đã có convention rõ trong ARCHITECTURE.md — tất cả page dùng AppHeader, không tự viết header.
- **BottomNav không có sẵn trong Nuxt UI** → cần custom component. Mitigation: Đã có code pattern trong `00_design-tokens.md` để tham khảo.
- **Type system chưa được test với data thật** → có thể cần điều chỉnh khi làm màn hình cụ thể. Mitigation: Đây là change nền tảng, các change sau sẽ validate.
