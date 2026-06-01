# Fields Top

## Purpose

Danh sách tất cả field — màn hình tab thứ 2 trong BottomNav. Hiển thị map có label A/B/C và danh sách field dạng card.

## Requirements

### Requirement: Fields Top page dùng default layout
Page `app/pages/fields/index.vue` SHALL sử dụng `layout: 'default'` (có BottomNav) và render `<AppHeader>` với title "Fields", không có back button.

#### Scenario: Truy cập /fields
- **WHEN** user navigate đến `/fields`
- **THEN** trang hiển thị AppHeader xanh với title "Fields", FieldMap, danh sách field, FAB, và BottomNav với tab Fields active

### Requirement: FieldMap với label text
Hệ thống SHALL có component `FieldMap.vue` (ở root `components/`) dùng `<svg>` full-width, `preserveAspectRatio="none"`, cao `h-[220px]`, vẽ field rectangles (`fill-primary-200 stroke-primary-300`), pipe dots (`fill-blue-400`), và label text A/B/C (`fill-neutral-900`) ở góc trên-trái mỗi rectangle.

#### Scenario: Map hiển thị label field
- **WHEN** user xem Fields Top
- **THEN** mỗi field rectangle hiển thị label text (A, B, C) ở góc trên-trái với `pointer-events: none` để không block click

#### Scenario: Tap field rect trên FieldMap
- **WHEN** user click vào field rectangle trên FieldMap
- **THEN** component emit event `field-tap` với field id

### Requirement: FieldListRow card component (không có cm)
Hệ thống SHALL có component `FieldListRow.vue` (ở root `components/`) hiển thị dạng card (`bg-white border border-neutral-200 rounded-2xl p-4`): tên field (`text-neutral-900 text-base font-medium`), sub info ha·pipes (`text-neutral-500 text-xs`), và chevron `›` (`text-neutral-300`). KHÔNG hiển thị water level cm.

#### Scenario: Row hiển thị đúng thông tin
- **WHEN** render FieldListRow với `{ name: 'Field A', area: 0.8, pipeCount: 2 }`
- **THEN** hiển thị "Field A", "0.8 ha · 2 pipes", và chevron `›`, không có giá trị cm

### Requirement: Danh sách fields dạng card với gap
Các FieldListRow SHALL được render trong container `flex flex-col gap-3`, mỗi row là 1 card riêng biệt, KHÔNG dùng `USeparator`.

#### Scenario: Cards có khoảng cách
- **WHEN** user xem danh sách fields
- **THEN** mỗi field là 1 card bo tròn `rounded-2xl`, cách nhau `gap-3` (12px)

### Requirement: FAB màu xanh lá đậm thêm field mới
Fields Top page SHALL có FAB (Floating Action Button) dùng `<UButton icon="i-lucide-plus">` với class `fixed bottom-24 right-5 rounded-full shadow-lg z-40 size-14 flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white`, navigate đến `/fields/new` khi click.

#### Scenario: Tap FAB
- **WHEN** user tap FAB `+`
- **THEN** app navigate đến `/fields/new`

### Requirement: Navigation từ Fields Top
Tap vào FieldListRow hoặc field rect trên map SHALL navigate đến `/fields/{id}`.

#### Scenario: Tap row Field A
- **WHEN** user tap row Field A
- **THEN** app navigate đến `/fields/A`

### Requirement: Mock data 3 fields cho Fields Top
Fields Top page SHALL có mock data 3 field (A, B, C) với polygon, area, pipeCount, và label.

#### Scenario: Mock data hiển thị
- **WHEN** user mở trang /fields
- **THEN** FieldMap hiển thị 3 field, danh sách hiển thị 3 FieldListRow với dữ liệu mẫu

### Requirement: Không hardcode hex color
Toàn bộ Fields Top SHALL dùng Tailwind utility class hoặc Nuxt UI color prop — không hardcode mã hex.

#### Scenario: Kiểm tra code không có hex
- **WHEN** kiểm tra source code Fields Top
- **THEN** không có chuỗi `#2D5A27`, `#C8D9C0`, `#9DB894`, hay bất kỳ mã hex nào
