# New Pipe

## Purpose

Form tạo pipe mới với tên pipe, chọn monitoring field, ghi chú, GPS warning box, và nút Save.

## Requirements

### Requirement: New Pipe page với AppHeader có back, title, và Save action
Page `app/pages/pipes/new.vue` SHALL sử dụng `layout: 'default'` và render `<AppHeader>` với `#back` slot (chevron-left, navigate về trang trước), `#title` = "New Pipe", và `#action` = "Save" text button (`<UButton variant="ghost" class="text-white font-semibold">`). Save button disabled nếu `pipeName` rỗng hoặc `selectedFieldId` chưa chọn.

#### Scenario: Header New Pipe
- **WHEN** user navigate đến `/pipes/new`
- **THEN** AppHeader hiển thị "< New Pipe" bên trái và "Save" bên phải

#### Scenario: Save button disabled khi thiếu dữ liệu
- **WHEN** user chưa nhập tên pipe hoặc chưa chọn field
- **THEN** Save button và header Save ở trạng thái disabled

### Requirement: Pipe Name Input
New Pipe page SHALL có `<UInput>` cho Pipe Name với label "Pipe Name", `color="primary" size="xl" class="w-full"`, `:ui="{ base: 'px-3 py-3.5 text-base gap-2' }"`. Placeholder hiển thị tên pipe suggestion (e.g. "Pipe A-3").

#### Scenario: Nhập tên pipe
- **WHEN** user nhập text vào Pipe Name input
- **THEN** giá trị `pipeName` ref được cập nhật

### Requirement: Monitoring Field Selector
New Pipe page SHALL có `<USelectMenu>` cho Monitoring Field với label "Monitoring Field". Mỗi option hiển thị tên field (bold, dòng trên) và sub-info "X.XX ha · N pipes" (xám, dòng dưới). Khi chọn field, trigger hiển thị field name + sub-info. Mặc định chọn Field A. Dùng mock data.

#### Scenario: Chọn field từ dropdown
- **WHEN** user tap USelectMenu và chọn "Field A"
- **THEN** `selectedFieldId` = "A", selector hiển thị "Field A" + "0.84 ha · 2 pipes"

#### Scenario: Pre-select field từ query param
- **WHEN** user navigate đến `/pipes/new?fieldId=A`
- **THEN** USelectMenu pre-selected "Field A"

### Requirement: Pipe Note Input
New Pipe page SHALL có `<UInput>` cho Pipe Note với label "Pipe Note", `color="primary" size="xl" class="w-full"`, `:ui="{ base: 'px-3 py-3.5 text-base gap-2' }"`. Optional, placeholder "Near the inlet".

#### Scenario: Nhập note
- **WHEN** user nhập text vào Pipe Note input
- **THEN** giá trị `pipeNote` ref được cập nhật

### Requirement: GpsWarningBox component
Hệ thống SHALL có component `GpsWarningBox.vue` hiển thị warning box khi GPS không available. Box có background `bg-orange-50 border border-orange-400 rounded-lg p-3`, icon `i-lucide-triangle-alert text-orange-600`, và text cảnh báo tiếng Anh với `text-orange-900 text-xs`. Component nhận prop `visible` (boolean).

#### Scenario: Hiển thị warning khi GPS off
- **WHEN** prop `visible = true`
- **THEN** GpsWarningBox hiển thị với icon và text cảnh báo

#### Scenario: Ẩn warning khi GPS on
- **WHEN** prop `visible = false`
- **THEN** GpsWarningBox không render

### Requirement: Save Pipe button màu xanh lá đậm
New Pipe page SHALL có `<UButton size="lg" block>` với text "Save Pipe", class `h-[52px] rounded-xl !bg-primary-500 hover:!bg-primary-600 text-white`. Button disabled khi `pipeName` rỗng hoặc `selectedFieldId` chưa chọn. Khi save thành công, navigate về field detail.

#### Scenario: Save button disabled khi thiếu dữ liệu
- **WHEN** user chưa nhập tên pipe hoặc chưa chọn field
- **THEN** Save Pipe button ở trạng thái disabled

#### Scenario: Save thành công
- **WHEN** user đã nhập tên pipe và chọn field hợp lệ, tap "Save Pipe"
- **THEN** app navigate về `/fields/<selectedFieldId>` (mock save)

### Requirement: New Pipe dùng mock data
New Pipe page SHALL dùng mock data cho field list — không gọi API thật. Toàn bộ code dùng Tailwind utility class hoặc Nuxt UI color prop — không hardcode hex.

#### Scenario: Kiểm tra code không có hex
- **WHEN** kiểm tra source code New Pipe và các component liên quan
- **THEN** không có mã hex nào
