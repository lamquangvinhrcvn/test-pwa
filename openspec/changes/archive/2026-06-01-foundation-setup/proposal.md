## Why

Dựng nền tảng kỹ thuật cho toàn bộ ứng dụng PWA — theme, type system, layout, và navigation components. Đây là bước bắt buộc trước khi làm bất kỳ màn hình cụ thể nào, đảm bảo toàn app dùng chung một bộ design tokens, type definitions, và cấu trúc layout nhất quán.

## What Changes

- **Thiết lập Tailwind v4 theme** với `@theme` block trong `main.css`: primary color (xanh lá cây) và neutral color palette
- **Cấu hình Nuxt** với module `@nuxt/ui` v3, CSS global, và ui theme tokens
- **Định nghĩa type system** cốt lõi: `Field`, `Pipe`, `Reading`, `Point`, `SurveyItem`
- **Tạo AppHeader component**: header xanh (`bg-primary-500`), 3 named slots (`title`, `back`, `action`)
- **Tạo BottomNav component**: 4 tab (Home / Fields / Monitor / Logbook) dùng `UButton` ghost, active state primary
- **Tạo 2 layouts**: `default.vue` (có BottomNav) và `auth.vue` (không nav)

## Capabilities

### New Capabilities
- `design-tokens`: Design tokens và theme system (màu primary, neutral) dùng Tailwind v4 `@theme`
- `type-system`: Các TypeScript interfaces cốt lõi: Field, Pipe, Reading, Point, SurveyItem
- `app-shell`: App header, bottom navigation, và layout system (default + auth)

### Modified Capabilities
<!-- Không có capability nào bị thay đổi vì đây là khởi tạo ban đầu -->

## Impact

- `app/assets/css/main.css` — file mới, định nghĩa `@theme`
- `nuxt.config.ts` — thêm module `@nuxt/ui`, css path, ui config
- `types/index.ts` — file mới, toàn bộ type system
- `components/AppHeader.vue` — component mới
- `components/BottomNav.vue` — component mới
- `layouts/default.vue` — layout mới
- `layouts/auth.vue` — layout mới
