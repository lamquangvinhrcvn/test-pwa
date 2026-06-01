## ADDED Requirements

### Requirement: Home page dùng default layout
Page `app/pages/home.vue` SHALL sử dụng `layout: 'default'` (có BottomNav) và render `<AppHeader>` với title "Home".

#### Scenario: Truy cập /home
- **WHEN** user navigate đến `/home`
- **THEN** trang home hiển thị với AppHeader xanh, map canvas, danh sách fields, và BottomNav

### Requirement: AppHeader với Today badge
Home page SHALL dùng `<AppHeader>` với slot `#title` = "Home" và slot `#action` = Today badge (static text "3 items" pill).

#### Scenario: Header hiển thị Today badge
- **WHEN** user xem trang home
- **THEN** header hiển thị "Home" ở giữa và badge "3 items" ở góc phải

### Requirement: SVG MapCanvas
Hệ thống SHALL có component `MapCanvas.vue` dùng `<svg>` với viewBox, vẽ các field rectangle (`fill-primary-200 stroke-primary-300`), pipe dots (`fill-blue-400`), và `@click` field → emit `field-tap`.

#### Scenario: Map hiển thị 4 field rectangles
- **WHEN** user xem trang home
- **THEN** map hiển thị 4 hình chữ nhật xanh lá nhạt với viền xanh lá đậm đại diện cho Field A, B, C, D

#### Scenario: Map hiển thị pipe dots
- **WHEN** user xem map
- **THEN** mỗi field rectangle có 1 chấm xanh dương fill-blue-400 đại diện cho pipe

#### Scenario: Tap vào field trên map
- **WHEN** user click vào field rectangle trên map
- **THEN** component emit event `field-tap` với field id

### Requirement: FieldPipeRow component
Hệ thống SHALL có component `FieldPipeRow.vue` hiển thị: tên field (text-neutral-900), sub info pipes·ha (text-neutral-500 text-xs), level cm (text-blue-500 text-lg font-bold), và chevron `>` (text-neutral-300).

#### Scenario: Row hiển thị đầy đủ thông tin
- **WHEN** render FieldPipeRow với `{ name: 'Field A', pipes: 1, area: 0.8, latestLevel: 12 }`
- **THEN** hiển thị "Field A", "1 pipe · 0.8 ha", "12 cm", và chevron `>`

### Requirement: Section "Fields & Pipes" với "See all"
Home page SHALL có section header "Fields & Pipes" (text-neutral-900 font-semibold) bên trái và link "See all" (text-neutral-500) bên phải, navigate đến `/fields`.

#### Scenario: Click See all
- **WHEN** user click "See all"
- **THEN** app navigate đến `/fields`

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
