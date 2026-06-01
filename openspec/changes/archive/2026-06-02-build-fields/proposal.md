## Why

Sau màn hình Home (đã build), cần build 3 màn hình Fields để hoàn thiện flow quản lý field: danh sách fields (`/fields`), chi tiết field (`/fields/[id]`), và tạo field mới (`/fields/new`). Đây là change thứ 4 trong lộ trình build, mở rộng navigation từ Home sang Fields tab.

## What Changes

- **Tạo `pages/fields/index.vue`** — Fields Top: MapCanvas với label A/B/C, danh sách FieldListRow (tên + ha·pipes + chevron, KHÔNG có cm), FAB `+` → `/fields/new`
- **Tạo `pages/fields/[id].vue`** — Field Detail: AppHeader có back + title động, map riêng của field, Field info row (name | area), PipeListRow "Last: Xcm · timeago", UButton outline "Add Pipe" → `/pipes/new?fieldId=`
- **Tạo `pages/fields/new.vue`** — New Field: DrawableMap (tap thêm điểm, kéo góc, vẽ polygon), utils/geometry.ts (shoelace tính diện tích), UInput Field Name + Field Note, Area auto-calc (read-only), UButton "Save Field" + header Save action
- **Tạo `components/fields/FieldListRow.vue`** — row danh sách field (tên + sub info ha·pipes + chevron, không cm)
- **Tạo `components/fields/PipeListRow.vue`** — row pipe trong field detail (tên + "Last: Xcm · timeago" + chevron)
- **Tạo `components/fields/FieldInfoRow.vue`** — 2 cột label/value: Field Name | Area
- **Tạo `components/fields/FieldMap.vue`** — map nhỏ cho Fields Top (có label text)
- **Tạo `components/fields/FieldDetailMap.vue`** — map riêng cho Field Detail
- **Tạo `components/map/DrawableMap.vue`** — SVG map tương tác: tap thêm điểm, kéo góc, vẽ polygon
- **Tạo `utils/geometry.ts`** — Shoelace formula tính diện tích polygon → hectares
- **Mock data** — 3 field (A, B, C) với pipes cho field detail

## Capabilities

### New Capabilities
- `fields-top`: Màn hình danh sách tất cả fields với map có label, FAB thêm mới
- `field-detail`: Màn hình chi tiết field với map riêng, danh sách pipes, nút Add Pipe
- `new-field`: Màn hình tạo field mới với map vẽ tương tác, form nhập tên/note, auto-calc diện tích

### Modified Capabilities
<!-- Không có capability hiện có nào bị thay đổi -->

## Impact

- `app/pages/fields/index.vue` — file mới
- `app/pages/fields/[id].vue` — file mới
- `app/pages/fields/new.vue` — file mới
- `app/components/fields/FieldListRow.vue` — file mới
- `app/components/fields/PipeListRow.vue` — file mới
- `app/components/fields/FieldInfoRow.vue` — file mới
- `app/components/fields/FieldMap.vue` — file mới
- `app/components/fields/FieldDetailMap.vue` — file mới
- `app/components/map/DrawableMap.vue` — file mới
- `app/utils/geometry.ts` — file mới
- Dùng `AppHeader.vue`, `BottomNav.vue` (đã có)
- Dùng `USeparator`, `UButton`, `UInput` từ Nuxt UI
- Dùng color tokens primary, neutral, blue từ design-tokens
