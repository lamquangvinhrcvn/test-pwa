## ADDED Requirements

### Requirement: WaterLevelDialog dùng UDrawer bottom sheet
Hệ thống SHALL có component `WaterLevelDialog.vue` dùng `<UDrawer>` hiển thị bottom sheet để nhập water level. Dialog nhận `v-model:open` để control open/close, prop `pipe` chứa thông tin pipe, và emit `save` khi user lưu.

#### Scenario: Dialog mở với thông tin pipe
- **WHEN** WaterLevelDialog được mở với pipe `{ id: 'A-1', name: 'Pipe A-1', fieldName: 'Field A' }`
- **THEN** dialog hiển thị title "Enter Water Level", subtitle "Pipe A-1 · Field A", và date row hiển thị ngày hôm nay

#### Scenario: Dialog đóng khi tap close
- **WHEN** user tap nút ✕ trong dialog header
- **THEN** dialog đóng, emit `update:modelValue = false`

### Requirement: Date row hiển thị ngày hiện tại
WaterLevelDialog SHALL có date section với icon `i-lucide-calendar` và text hiển thị ngày hiện tại theo format "Mon DD, YYYY (Today)". Date row là read-only trong v1.

#### Scenario: Date row hiển thị hôm nay
- **WHEN** dialog mở vào ngày May 25, 2026
- **THEN** date row hiển thị "📅 May 25, 2026 (Today)"

### Requirement: WaterLevelStepper custom component
Hệ thống SHALL có component `WaterLevelStepper.vue` là custom stepper: container `bg-blue-50 rounded-xl p-3`, layout `[−] [value] cm [+]`. Nút `−` và `+` dùng `<UButton icon variant="ghost">` với icon `i-lucide-minus` / `i-lucide-plus`. Giá trị hiển thị `text-blue-800 text-3xl font-bold`. Đơn vị "cm" hiển thị `text-blue-800 text-sm`. Prop `modelValue` (number), emit `update:modelValue`.

#### Scenario: Tăng giá trị
- **WHEN** user tap nút `+`
- **THEN** giá trị tăng thêm 1 cm, max 999

#### Scenario: Giảm giá trị
- **WHEN** user tap nút `−`
- **THEN** giá trị giảm 1 cm, min 0

#### Scenario: Giá trị ban đầu
- **WHEN** WaterLevelStepper được render với `modelValue = 12`
- **THEN** hiển thị "12 cm" ở giữa

### Requirement: Nút Cancel và Save trong dialog
WaterLevelDialog SHALL có 2 nút ở footer: Cancel (`<UButton variant="ghost" color="neutral">`) và Save (`<UButton color="primary" variant="solid">`). Save disabled khi value không thay đổi hoặc null. Cancel đóng dialog không lưu. Save emit event `save` với `{ pipeId, date, level }` rồi đóng dialog.

#### Scenario: Cancel không lưu
- **WHEN** user tap Cancel
- **THEN** dialog đóng, không emit event `save`

#### Scenario: Save emit data
- **WHEN** user tap Save với pipe A-1, level 12
- **THEN** emit `save` với `{ pipeId: 'A-1', date: today, level: 12 }`, dialog đóng

### Requirement: Footer note luôn hiển thị
WaterLevelDialog SHALL luôn hiển thị footer note: "* Always offline, form saved on device → syncs automatically to server policy" với `text-neutral-400 text-xs italic`.

#### Scenario: Footer note hiển thị
- **WHEN** dialog mở
- **THEN** footer note luôn hiển thị bên trên action buttons

### Requirement: WaterLevelDialog không hardcode hex
Toàn bộ WaterLevelDialog và WaterLevelStepper SHALL dùng Tailwind utility class hoặc Nuxt UI color prop — không hardcode hex.

#### Scenario: Kiểm tra code không có hex
- **WHEN** kiểm tra source code WaterLevelDialog và WaterLevelStepper
- **THEN** không có mã hex nào
