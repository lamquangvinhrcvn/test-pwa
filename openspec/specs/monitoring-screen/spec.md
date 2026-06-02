# Monitoring Screen

## Purpose

Màn hình Monitoring (tab thứ 3) hiển thị danh sách tất cả pipes kèm water level mới nhất, offline badge, và FAB để thêm reading mới.

## Requirements

### Requirement: Monitoring page hiển thị danh sách pipe với latest reading
Page `app/pages/monitor/index.vue` SHALL sử dụng `layout: 'default'` và render danh sách các pipe có sẵn, mỗi pipe hiển thị: tên pipe (bold, 15px), tên field (sub-label xám 12px), giá trị water level mới nhất (22px bold `text-blue-500`) kèm đơn vị "cm", và trailing edit icon nếu có pending sync. Pipe được sắp xếp theo field order rồi pipe number. Dùng mock data.

#### Scenario: Hiển thị danh sách pipe có reading
- **WHEN** user navigate đến `/monitor`
- **THEN** danh sách pipe hiển thị với tên pipe, field, và giá trị water level (e.g. "12 cm")

#### Scenario: Hiển thị "—" khi không có data
- **WHEN** pipe không có reading nào (latestLevel = null)
- **THEN** cột water level hiển thị "—" với màu `text-neutral-300` cỡ 18px

#### Scenario: Hiển thị edit icon khi pending sync
- **WHEN** pipe có `isPendingSync === true`
- **THEN** trailing icon `i-lucide-clipboard-list` màu `text-neutral-400` hiển thị bên phải tên pipe

### Requirement: Offline badge trong Monitoring page
Monitoring page SHALL hiển thị `<UBadge color="warning" variant="solid">Offline</UBadge>` ở góc phải trên của status row khi `isOffline === true`. Badge dùng màu `warning` (orange `#FF6D00`) của Nuxt UI.

#### Scenario: Hiển thị Offline badge khi offline
- **WHEN** `isOffline = true`
- **THEN** badge "Offline" màu warning hiển thị ở header row

#### Scenario: Không hiển thị badge khi online
- **WHEN** `isOffline = false`
- **THEN** không có badge offline

### Requirement: FAB trên Monitoring page mở WaterLevelDialog
Monitoring page SHALL có FAB button (`<UButton icon="i-lucide-plus" color="primary" size="xl" class="fixed bottom-24 right-5 rounded-full shadow-lg z-40 size-14" />`) ở góc phải dưới. Khi tap FAB, mở WaterLevelDialog.

#### Scenario: FAB mở dialog
- **WHEN** user tap FAB trên Monitoring page
- **THEN** WaterLevelDialog mở ra với pipe context mặc định (pipe đầu tiên hoặc không pre-select)

### Requirement: PipeReadingRow component
Hệ thống SHALL có component `PipeReadingRow.vue` hiển thị 1 pipe row dạng card: `bg-white border border-neutral-200 rounded-2xl p-4`, tên pipe, field name, water level bên phải, và edit icon nếu pending. Không hardcode hex.

#### Scenario: PipeReadingRow hiển thị đúng dữ liệu
- **WHEN** render PipeReadingRow với `{ pipeName: 'Pipe A-1', fieldName: 'Field A', latestLevel: 12, isPendingSync: false }`
- **THEN** hiển thị "Pipe A-1", "Field A", "12 cm", không có edit icon

### Requirement: Monitoring page dùng mock data
Monitoring page SHALL dùng mock data (mảng `PipeReading[]`) — không gọi API thật. Toàn bộ code dùng Tailwind utility class hoặc Nuxt UI color prop — không hardcode hex.

#### Scenario: Kiểm tra code không có hex
- **WHEN** kiểm tra source code Monitoring page và các component liên quan
- **THEN** không có mã hex nào
