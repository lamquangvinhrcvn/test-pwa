## ADDED Requirements

### Requirement: Pipe Detail page với AppHeader có back, title, và overflow menu
Page `app/pages/monitor/[pipeId].vue` SHALL sử dụng `layout: 'default'` và render `<AppHeader>` với `#back` slot (chevron-left, navigate về `/monitor`), `#title` là tên pipe (e.g. "Pipe A-1"), và `#action` slot chứa overflow menu icon `i-lucide-ellipsis`. Sub-header hiển thị "Field X / Pipe X-X". Dùng mock data.

#### Scenario: Header hiển thị tên pipe
- **WHEN** user navigate đến `/monitor/A-1`
- **THEN** AppHeader hiển thị nút back `<`, title "Pipe A-1", và overflow menu `...`

#### Scenario: Back button quay lại monitor
- **WHEN** user tap nút back `<`
- **THEN** app navigate về `/monitor`

#### Scenario: Pipe không tồn tại
- **WHEN** user navigate đến `/monitor/X-99` (không có trong mock data)
- **THEN** hiển thị thông báo "Pipe not found"

### Requirement: Today Summary section
Pipe Detail page SHALL có section "Today" với label nhỏ `text-neutral-500 text-xs` và giá trị water level hôm nay `text-blue-500 text-3xl font-bold` kèm đơn vị "cm". Nếu chưa có reading hôm nay, hiển thị "No reading today" màu xám.

#### Scenario: Today summary hiển thị giá trị
- **WHEN** pipe có reading hôm nay là 12 cm
- **THEN** section Today hiển thị "12 cm" to, màu xanh

#### Scenario: Today summary khi chưa có reading
- **WHEN** pipe chưa có reading cho ngày hôm nay
- **THEN** hiển thị "No reading today" màu `text-neutral-400`

### Requirement: DailyReadingsTable component
Hệ thống SHALL có component `DailyReadingsTable.vue` hiển thị bảng readings theo ngày. Header row có "Daily readings" bên trái và period label "30d" bên phải. Mỗi reading row hiển thị: date (e.g. "Today", "May 24"), giá trị cm, edit icon `i-lucide-pencil` (`text-neutral-400`), và delete icon `i-lucide-x` (`text-red-400`). Rows cách nhau bằng divider `border-b border-neutral-200`.

#### Scenario: Bảng hiển thị readings
- **WHEN** render DailyReadingsTable với mảng readings gồm 7 ngày
- **THEN** hiển thị 7 rows, mỗi row có date, cm, edit icon, delete icon

#### Scenario: Tap edit icon
- **WHEN** user tap edit icon trên 1 row
- **THEN** mở WaterLevelDialog pre-filled với ngày và giá trị của row đó

#### Scenario: Tap delete icon
- **WHEN** user tap delete icon trên 1 row
- **THEN** reading đó bị xóa khỏi mock data, bảng cập nhật

### Requirement: FAB trên Pipe Detail mở WaterLevelDialog
Pipe Detail page SHALL có FAB button (`<UButton icon="i-lucide-plus" color="primary" size="xl" class="fixed bottom-24 right-5 rounded-full shadow-lg z-40 size-14" />`) ở góc phải dưới. Khi tap FAB, mở WaterLevelDialog pre-filled với pipe hiện tại và ngày hôm nay.

#### Scenario: FAB mở dialog với pipe context
- **WHEN** user tap FAB trên Pipe Detail của pipe A-1
- **THEN** WaterLevelDialog mở với pipe A-1, date = today, level pre-filled từ last known

### Requirement: Pipe Detail dùng mock data
Pipe Detail page SHALL dùng mock data — không gọi API thật. Toàn bộ code dùng Tailwind utility class hoặc Nuxt UI color prop — không hardcode hex.

#### Scenario: Kiểm tra code không có hex
- **WHEN** kiểm tra source code Pipe Detail và các component liên quan
- **THEN** không có mã hex nào
