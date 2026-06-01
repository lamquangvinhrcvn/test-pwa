# Home Screen

## Purpose

Màn hình chính sau khi đăng nhập — hiển thị bản đồ tổng quan các field (MapCanvas) và danh sách Fields & Pipes bên dưới. Dùng layout `default` có BottomNav.

## Requirements

### Requirement: Home page dùng default layout
Page `app/pages/home.vue` SHALL sử dụng `layout: 'default'` (có BottomNav) và render `<AppHeader>` với title "Home".

#### Scenario: Truy cập /home
- **WHEN** user navigate đến `/home`
- **THEN** trang home hiển thị với AppHeader xanh, map canvas full-width, danh sách fields, và BottomNav

### Requirement: MapCanvas full-width với Today badge overlay
Home page SHALL dùng `<AppHeader>` với slot `#title` = "Home". Today badge ("3 items") được hiển thị bên trong MapCanvas qua slot `#overlay`, không nằm trong AppHeader.

#### Scenario: MapCanvas hiển thị Today badge
- **WHEN** user xem trang home
- **THEN** badge "Today 3 items" hiển thị ở góc trên bên trái của MapCanvas, nằm trên nền map

### Requirement: SVG MapCanvas responsive full-width
Hệ thống SHALL có component `MapCanvas.vue` dùng `<svg>` full-width (`w-full`, `preserveAspectRatio="none"`), sát mép header (`mt-0`), cao `350px`, vẽ các field rectangle (`fill-primary-200 stroke-primary-300`), pipe dots (`fill-blue-400`), và `@click` field → emit `field-tap`.

#### Scenario: Map hiển thị 4 field rectangles
- **WHEN** user xem trang home
- **THEN** map hiển thị 4 hình chữ nhật xanh lá nhạt với viền xanh lá đậm đại diện cho Field A, B, C, D

#### Scenario: Map hiển thị pipe dots
- **WHEN** user xem map
- **THEN** mỗi field rectangle có 1 chấm xanh dương fill-blue-400 đại diện cho pipe

#### Scenario: Tap vào field trên map
- **WHEN** user click vào field rectangle trên map
- **THEN** component emit event `field-tap` với field id

### Requirement: FieldPipeRow card component
Hệ thống SHALL có component `FieldPipeRow.vue` hiển thị dạng card (`bg-white border border-neutral-200 rounded-2xl p-4`): tên field (text-neutral-900), sub info pipes·ha (text-neutral-500 text-xs), level cm (text-blue-500 text-lg font-bold), và chevron `›` (text-neutral-300).

#### Scenario: Row hiển thị đầy đủ thông tin
- **WHEN** render FieldPipeRow với `{ name: 'Field A', pipes: 1, area: 0.8, latestLevel: 12 }`
- **THEN** hiển thị "Field A", "1 pipe · 0.8 ha", "12 cm", và chevron `›`

### Requirement: Section "Fields & Pipes" với "See all" có chevron
Home page SHALL có section header "Fields & Pipes" (text-neutral-900 font-semibold) bên trái và link "See all ›" (text-neutral-500) bên phải, navigate đến `/fields`.

#### Scenario: Click See all
- **WHEN** user click "See all"
- **THEN** app navigate đến `/fields`

### Requirement: Danh sách FieldPipeRow dạng card với gap
Các FieldPipeRow SHALL được render trong container `flex flex-col gap-3`, mỗi row là 1 card riêng biệt, KHÔNG dùng `USeparator`.

#### Scenario: Cards có khoảng cách
- **WHEN** user xem danh sách fields
- **THEN** mỗi field là 1 card bo tròn, cách nhau `gap-3` (12px)

### Requirement: Tap row → field detail
Khi user tap vào một FieldPipeRow, app SHALL navigate đến `/fields/{id}`.

#### Scenario: Tap row Field A
- **WHEN** user tap row Field A
- **THEN** app navigate đến `/fields/A`

### Requirement: Mock data 4 fields
Home page SHALL có mock data 4 field (A, B, C, D) với pipes, area, latestLevel, và polygon tọa độ cho map.

#### Scenario: Mock data hiển thị
- **WHEN** user mở trang home
- **THEN** danh sách hiển thị 4 field với dữ liệu mẫu

### Requirement: Không hardcode hex color
Toàn bộ home screen SHALL dùng Tailwind utility class hoặc Nuxt UI color prop — không hardcode mã hex.

#### Scenario: Kiểm tra code không có hex
- **WHEN** kiểm tra source code home screen
- **THEN** không có chuỗi `#2D5A27`, `#C8D9C0`, `#9DB894`, hay bất kỳ mã hex nào
