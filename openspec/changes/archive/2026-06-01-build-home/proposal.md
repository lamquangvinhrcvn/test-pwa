## Why

Màn hình Home là màn hình chính sau khi đăng nhập — hiển thị bản đồ tổng quan các field và danh sách Fields & Pipes. Đây là change thứ 3 trong lộ trình build (sau foundation và login), là màn hình đầu tiên dùng layout `default` có BottomNav.

## What Changes

- **Tạo `pages/home.vue`** — dùng `layout: 'default'`, `<AppHeader>` với title "Home", map canvas + danh sách fields
- **Tạo `components/map/MapCanvas.vue`** — SVG map với viewBox, field rectangles (`fill-primary-200 stroke-primary-300`), pipe dots (`fill-blue-400`), `@click` field → emit `field-tap`
- **Tạo `components/fields/FieldPipeRow.vue`** — row hiển thị: tên field + sub info (pipes·ha) + level cm (`text-blue-500`) + chevron
- **Section "Fields & Pipes"** + link "See all" → `/fields`
- **Mock data** — 4 fields (A, B, C, D) với dữ liệu mẫu
- **Navigation** — tap row → `navigateTo('/fields/'+id)`, tap "See all" → `/fields`

## Capabilities

### New Capabilities
- `home-screen`: Màn hình chính với SVG map canvas và danh sách Fields & Pipes

### Modified Capabilities
<!-- Không có capability hiện có nào bị thay đổi -->

## Impact

- `app/pages/home.vue` — file mới
- `app/components/map/MapCanvas.vue` — file mới
- `app/components/fields/FieldPipeRow.vue` — file mới
- Dùng `AppHeader.vue`, `BottomNav.vue` (đã có từ foundation)
- Dùng `USeparator` từ Nuxt UI
- Dùng color tokens primary, neutral, blue từ design-tokens
