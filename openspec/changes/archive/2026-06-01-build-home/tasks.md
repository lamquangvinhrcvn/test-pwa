## 1. Home Page

- [x] 1.1 Tạo `pages/home.vue`: set `layout: 'default'`, dùng `<AppHeader>` với `#title` "Home" + `#action` Today badge pill (white bg, primary text, "3 items")
- [x] 1.2 Khai báo mock data `fields` array (4 fields A/B/C/D) với `id`, `name`, `pipes`, `area`, `latestLevel`, `polygon` (Point[] cho map)

## 2. Map Canvas

- [x] 2.1 Tạo `components/map/MapCanvas.vue`: SVG `viewBox="0 0 300 200"`, background `fill-primary-100`
- [x] 2.2 Vẽ field rectangles: `<rect>` với `fill-primary-200 stroke-primary-300 stroke-[1.5] rx-2`, `@click` emit `field-tap` với field id
- [x] 2.3 Vẽ pipe dots: `<circle r="5" fill-blue-400>` tại vị trí pipe của mỗi field

## 3. FieldPipeRow Component

- [x] 3.1 Tạo `components/fields/FieldPipeRow.vue`: row với tên field (`text-neutral-900`), sub info pipes·ha (`text-neutral-500 text-xs`), level cm (`text-blue-500 text-lg font-bold`), chevron `>` (`text-neutral-300`)
- [x] 3.2 Row có `@click` emit để parent xử lý navigation

## 4. Home Page Assembly

- [x] 4.1 Thêm section header "Fields & Pipes" (`text-neutral-900 font-semibold`) + "See all" link (`text-neutral-500`) → `navigateTo('/fields')`
- [x] 4.2 Render danh sách `FieldPipeRow` với `USeparator` giữa các row
- [x] 4.3 Tap row → `navigateTo('/fields/' + field.id)`, tap map field → `navigateTo('/fields/' + field.id)`
