# New Field

## Purpose

Màn hình tạo field mới — vẽ polygon trên bản đồ SVG tương tác, nhập tên/note, diện tích tự động tính bằng Shoelace formula.

## Requirements

### Requirement: New Field page với AppHeader có back, title, và Save action
Page `app/pages/fields/new.vue` SHALL sử dụng `layout: 'default'` và render `<AppHeader>` với `#back` slot, `#title` = "New Field", `#action` = "Save" text button (`<UButton variant="ghost" class="text-white font-semibold">`). Save button disabled nếu chưa đủ điều kiện (`!canSave`).

#### Scenario: Header New Field
- **WHEN** user navigate đến `/fields/new`
- **THEN** AppHeader hiển thị "< New Field" bên trái và "Save" bên phải

### Requirement: DrawableMap tương tác vẽ polygon
Hệ thống SHALL có component `DrawableMap.vue` (ở root `components/`) dùng `<svg>` full-width, `preserveAspectRatio="none"`, cao `h-[300px]` với background `fill-primary-100`. User tap để thêm điểm, khi có ≥3 điểm thì vẽ `<polygon>` preview (`fill-primary-200/50 stroke-primary-300 stroke-dasharray="6,3"`). Mỗi điểm có circle handle (`fill-white stroke-primary-300 r="7"`), draggable bằng touch/mouse. Có nút "Reset" để xóa tất cả điểm.

#### Scenario: Tap thêm điểm
- **WHEN** user tap vào vị trí trống trên DrawableMap
- **THEN** 1 circle handle xuất hiện tại vị trí tap

#### Scenario: Vẽ polygon khi có đủ điểm
- **WHEN** user đã tap ≥3 điểm
- **THEN** DrawableMap vẽ polygon preview nối các điểm theo thứ tự tap

#### Scenario: Kéo handle chỉnh sửa
- **WHEN** user drag 1 circle handle đến vị trí mới
- **THEN** polygon cập nhật theo vị trí mới của handle

#### Scenario: Reset xóa tất cả điểm
- **WHEN** user tap nút "Reset"
- **THEN** tất cả điểm và polygon preview bị xóa

### Requirement: geometry.ts tính diện tích bằng Shoelace formula
Hệ thống SHALL có utility `utils/geometry.ts` export hàm `polygonArea(pts: Point[]): number` dùng Shoelace formula tính diện tích polygon (đơn vị px²), và hàm `pixelToHa(pxArea: number): number` chuyển đổi pixel² sang hectares qua hằng số `PX2_PER_HA = 0.01`.

#### Scenario: Tính diện tích hình chữ nhật
- **WHEN** gọi `polygonArea([{x:0,y:0},{x:10,y:0},{x:10,y:20},{x:0,y:20}])`
- **THEN** kết quả là `200` (px²)

#### Scenario: Chuyển đổi sang hectares
- **WHEN** gọi `pixelToHa(200)`
- **THEN** kết quả là `2` (ha, với `PX2_PER_HA = 0.01`)

### Requirement: Form Field Name và Field Note responsive
New Field page SHALL có `<UInput>` cho Field Name (required, placeholder "e.g. Field D") và Field Note (optional, placeholder "Optional note..."), dùng `color="primary" size="xl" class="w-full" :ui="{ input: 'h-16' }"`.

#### Scenario: Nhập tên field
- **WHEN** user nhập text vào Field Name input
- **THEN** giá trị `fieldName` ref được cập nhật

### Requirement: Area auto-calculated read-only
New Field page SHALL hiển thị diện tích tự động tính từ DrawableMap polygon qua `computed`, format `X.XX ha`, trong 1 read-only display với label "Area (auto-calculated)", background `bg-neutral-50 border border-neutral-200 rounded-lg`.

#### Scenario: Diện tích cập nhật khi vẽ
- **WHEN** user vẽ hoặc kéo chỉnh polygon
- **THEN** giá trị diện tích cập nhật theo thời gian thực

#### Scenario: Diện tích 0 khi chưa vẽ
- **WHEN** user chưa vẽ polygon
- **THEN** hiển thị "0.00 ha"

### Requirement: Save Field button màu xanh lá đậm và validation
New Field page SHALL có `<UButton size="lg" block>` với text "Save Field", class `h-[52px] rounded-xl !bg-primary-500 hover:!bg-primary-600 text-white`. Button disabled nếu `fieldName` rỗng hoặc `points.length < 3`. Header Save action đồng bộ disabled state. Khi save thành công, navigate về `/fields`.

#### Scenario: Save button disabled khi thiếu dữ liệu
- **WHEN** user chưa nhập tên field hoặc chưa vẽ đủ 3 điểm
- **THEN** Save button và header Save ở trạng thái disabled

#### Scenario: Save thành công
- **WHEN** user đã nhập tên và vẽ polygon hợp lệ, tap "Save Field"
- **THEN** app navigate về `/fields` (mock save)

### Requirement: Không hardcode hex color
New Field page SHALL dùng mock data (không API call thật). Toàn bộ code dùng Tailwind utility class hoặc Nuxt UI color prop — không hardcode mã hex.

#### Scenario: Kiểm tra code không có hex
- **WHEN** kiểm tra source code New Field
- **THEN** không có bất kỳ mã hex nào
