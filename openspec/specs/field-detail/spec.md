# Field Detail

## Purpose

Màn hình chi tiết 1 field — hiển thị map riêng, field info, danh sách pipes, và nút Add Pipe. Truy cập qua route `/fields/[id]`.

## Requirements

### Requirement: Field Detail page với AppHeader có back và title động
Page `app/pages/fields/[id].vue` SHALL sử dụng `layout: 'default'` và render `<AppHeader>` với `#back` slot (chevron-left, navigate về `/fields`), `#title` là tên field động (lấy từ mock data theo `route.params.id`). Không có `#action`.

#### Scenario: Header hiển thị tên field
- **WHEN** user navigate đến `/fields/A`
- **THEN** AppHeader hiển thị nút back `<` và title "Field A"

#### Scenario: Back button quay lại
- **WHEN** user tap nút back `<`
- **THEN** app navigate về `/fields`

### Requirement: FieldDetailMap chỉ hiển thị field đang xem
Hệ thống SHALL có component `FieldDetailMap.vue` (ở root `components/`) dùng `<svg>` full-width, `preserveAspectRatio="none"`, cao `h-[200px]`, chỉ vẽ polygon của field đang xem và các pipe dots bên trong field đó. KHÔNG hiển thị field khác.

#### Scenario: Map chỉ hiển thị 1 field
- **WHEN** user xem `/fields/A`
- **THEN** FieldDetailMap chỉ hiển thị rectangle của Field A và các pipe dots bên trong

### Requirement: FieldInfoRow card component
Hệ thống SHALL có component `FieldInfoRow.vue` (ở root `components/`) dạng card `bg-white border border-neutral-200 rounded-2xl p-4` với 2 cột: bên trái label "Field Name" + giá trị tên field, bên phải label "Area" + giá trị diện tích (e.g. "0.84 ha"). Label dùng `text-neutral-500 text-xs`, value dùng `text-neutral-900 text-base font-semibold`.

#### Scenario: FieldInfoRow hiển thị đúng
- **WHEN** render FieldInfoRow với `{ name: 'Field A', area: 0.84 }`
- **THEN** hiển thị label "Field Name" + "Field A" ở trái, label "Area" + "0.84 ha" ở phải

### Requirement: PipeListRow card component
Hệ thống SHALL có component `PipeListRow.vue` (ở root `components/`) hiển thị dạng card (`bg-white border border-neutral-200 rounded-2xl p-4`): tên pipe (`text-neutral-900 text-base font-medium`), sub info "Last: Xcm · timeago" (`text-neutral-500 text-xs`), và chevron `›` (`text-neutral-300`). Các row cách nhau bằng `flex flex-col gap-3`, KHÔNG dùng `USeparator`.

#### Scenario: PipeListRow hiển thị reading gần nhất
- **WHEN** render PipeListRow với `{ id: 'A-1', name: 'Pipe A-1', lastLevel: 12, lastDate: 'today' }`
- **THEN** hiển thị "Pipe A-1", "Last: 12cm · today", và chevron `›`

#### Scenario: Các pipe là card riêng biệt
- **WHEN** render danh sách 2 pipes
- **THEN** mỗi pipe là 1 card bo tròn, cách nhau `gap-3`

### Requirement: Section Pipes với header và nút Add Pipe màu xanh đậm
Field Detail page SHALL có section header "Pipes" (`text-neutral-900 text-sm font-semibold`) bên trái và pipe count (`text-neutral-500 text-sm`) bên phải. Phía dưới danh sách pipes là `<UButton>` full-width, `bg-primary-500 hover:bg-primary-600 text-white`, `rounded-xl`, với text "+ Add Pipe", navigate đến `/pipes/new?fieldId=<id>`.

#### Scenario: Add Pipe button
- **WHEN** user xem `/fields/A`
- **THEN** hiển thị nút "+ Add Pipe" nền xanh đậm, tap sẽ navigate đến `/pipes/new?fieldId=A`

### Requirement: Mock data field detail với pipes
Field Detail page SHALL tìm field từ mock data theo `route.params.id`, hiển thị field info, pipes, và nếu field không tồn tại thì hiển thị fallback.

#### Scenario: Field có pipes
- **WHEN** user xem `/fields/A`
- **THEN** Field A có 2 pipes hiển thị trong danh sách

#### Scenario: Field không tồn tại
- **WHEN** user navigate đến `/fields/X` (không có trong mock data)
- **THEN** hiển thị thông báo "Field not found"

### Requirement: Không hardcode hex color
Toàn bộ Field Detail SHALL dùng Tailwind utility class hoặc Nuxt UI color prop — không hardcode mã hex.

#### Scenario: Kiểm tra code không có hex
- **WHEN** kiểm tra source code Field Detail
- **THEN** không có bất kỳ mã hex nào
