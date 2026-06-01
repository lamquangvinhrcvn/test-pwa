## 1. Fields Top — pages/fields/index.vue

- [x] 1.1 Tạo `pages/fields/index.vue`: set `layout: 'default'`, dùng `<AppHeader>` với `#title` "Fields"
- [x] 1.2 Khai báo mock data 3 field (A, B, C) với polygon tọa độ, area, pipeCount, label
- [x] 1.3 Tạo `components/fields/FieldMap.vue`: SVG full-width, `preserveAspectRatio="none"`, `h-[220px]`, vẽ field rect (`fill-primary-200 stroke-primary-300`), pipe dots (`fill-blue-400`), label text A/B/C (`text-neutral-900`) với `pointer-events: none`
- [x] 1.4 Tạo `components/fields/FieldListRow.vue`: card style `bg-white border border-neutral-200 rounded-2xl p-4`, hiển thị tên field (`text-neutral-900 text-base font-medium`) + sub info ha·pipes (`text-neutral-500 text-xs`) + chevron `›` (`text-neutral-300`), KHÔNG có cm
- [x] 1.5 Render danh sách FieldListRow trong container `flex flex-col gap-3`, emit `@click` → navigate đến `/fields/{id}`
- [x] 1.6 Thêm FAB: `<UButton icon="i-lucide-plus" color="primary">` với class `fixed bottom-24 right-5 rounded-full shadow-lg z-40 size-14`, navigate đến `/fields/new`

## 2. Field Detail — pages/fields/[id].vue

- [x] 2.1 Tạo `pages/fields/[id].vue`: set `layout: 'default'`, lấy `route.params.id`, tìm field từ mock data
- [x] 2.2 Dùng `<AppHeader>` với `#back` (UButton icon chevron-left → `navigateTo('/fields')`) + `#title` = `field.name` động
- [x] 2.3 Tạo `components/fields/FieldDetailMap.vue`: SVG full-width, `preserveAspectRatio="none"`, `h-[200px]`, chỉ vẽ polygon của field đang xem + các pipe dots bên trong
- [x] 2.4 Tạo `components/fields/FieldInfoRow.vue`: 2 cột label/value — trái: "Field Name" / tên field, phải: "Area" / `X.XX ha`. Label `text-neutral-500 text-xs`, value `text-neutral-900 text-base font-semibold`
- [x] 2.5 Tạo `components/fields/PipeListRow.vue`: hiển thị tên pipe (`text-neutral-900 text-base font-medium`) + sub "Last: Xcm · timeago" (`text-neutral-500 text-xs`) + chevron `›` (`text-neutral-300`), các row cách nhau bằng `<USeparator>`
- [x] 2.6 Render danh sách pipes với header "Pipes" + count + `<USeparator>` giữa các PipeListRow
- [x] 2.7 Thêm nút `<UButton variant="outline" color="primary" block>` "+ Add Pipe" → `navigateTo('/pipes/new?fieldId=' + field.id)`
- [x] 2.8 Xử lý field không tồn tại: hiển thị "Field not found"

## 3. New Field — pages/fields/new.vue

- [x] 3.1 Tạo `utils/geometry.ts`: export `polygonArea(pts: Point[]): number` dùng Shoelace formula, export `pixelToHa(pxArea: number): number` với hằng số `PX2_PER_HA = 0.01`
- [x] 3.2 Tạo `components/map/DrawableMap.vue`: SVG full-width `preserveAspectRatio="none"` `h-[300px]` background `fill-primary-100`
- [x] 3.3 DrawableMap: xử lý `@click` trên SVG → thêm điểm (push vào `points` ref), vẽ `<circle>` handles (fill-white stroke-primary-300) tại mỗi điểm
- [x] 3.4 DrawableMap: khi `points.length >= 3`, vẽ `<polygon>` preview (`fill-primary-200/50 stroke-primary-300`) nối các điểm
- [x] 3.5 DrawableMap: implement drag handles bằng `@touchstart`/`@touchmove`/`@touchend` và `@mousedown`/`@mousemove`/`@mouseup` trên SVG
- [x] 3.6 DrawableMap: nút "Reset" (`<UButton variant="ghost" color="info" size="sm">`) để xóa tất cả điểm
- [x] 3.7 Tạo `pages/fields/new.vue`: set `layout: 'default'`, dùng `<AppHeader>` với `#back` + `#title` "New Field" + `#action` Save text button
- [x] 3.8 New Field: dùng DrawableMap, UInput Field Name (required, placeholder), UInput Field Note (optional, placeholder)
- [x] 3.9 New Field: hiển thị Area auto-calculated read-only, format `X.XX ha`, cập nhật real-time từ `computed` dùng `polygonArea` + `pixelToHa`
- [x] 3.10 New Field: `<UButton color="primary" variant="solid" size="lg" block>` "Save Field", disabled nếu `!fieldName \|\| points.length < 3`, khi save → `navigateTo('/fields')`
- [x] 3.11 New Field: header Save action đồng bộ disabled state với Save button bên dưới

## 4. Verify

- [x] 4.1 Không hardcode hex color trong bất kỳ file nào thuộc change này
- [x] 4.2 Layout và style nhất quán với màn hình home (card style, spacing, typography)
