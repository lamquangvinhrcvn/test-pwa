# Pipe Detail

## Purpose

Chi tiết lịch sử water level của một pipe. Hiển thị today summary, bảng daily readings với edit/delete, và FAB để thêm reading.

## Requirements

### Requirement: Pipe Detail page với AppHeader có back, title, và overflow menu
Page `app/pages/monitor/[pipeId].vue` SHALL sử dụng `layout: 'default'` và render `<AppHeader>` với `#back` slot (chevron-left, navigate về `/monitor`), `#title` là tên pipe (e.g. "Pipe A-1"), và `#action` slot chứa overflow menu icon `i-lucide-ellipsis`. Dùng mock data.

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
Pipe Detail page SHALL có section Today dạng card `bg-white border border-neutral-200 rounded-2xl p-4`, bên trái hiển thị field name, pipe name (bold, large), và pipe note. Bên phải hiển thị label "Today" nhỏ `text-neutral-500 text-xs` và giá trị water level `text-blue-500 text-[22px] font-bold` kèm "cm". Nếu chưa có reading, hiển thị "—".

#### Scenario: Today summary hiển thị giá trị
- **WHEN** pipe có reading hôm nay là 12 cm
- **THEN** section Today hiển thị "12 cm" to, màu xanh, bên phải

#### Scenario: Today summary khi chưa có reading
- **WHEN** pipe chưa có reading cho ngày hôm nay
- **THEN** hiển thị "—" màu `text-neutral-400`

### Requirement: DailyReadingsTable component
Hệ thống SHALL có component `DailyReadingsTable.vue` hiển thị bảng readings theo ngày dạng card list `gap-3`. Header row có "Daily readings" bên trái và period label "7d" bên phải. Mỗi reading row hiển thị: date, giá trị cm (xanh, right-aligned), edit icon `i-lucide-pencil`, và delete icon `i-lucide-x` (`text-red-400`). Rows dạng card `bg-white border border-neutral-200 rounded-2xl p-4`.

#### Scenario: Bảng hiển thị readings
- **WHEN** render DailyReadingsTable với mảng readings gồm 7 ngày
- **THEN** hiển thị 7 card rows, mỗi row có date, cm, edit icon, delete icon

#### Scenario: Tap edit icon
- **WHEN** user tap edit icon trên 1 row
- **THEN** mở WaterLevelDialog pre-filled với ngày và giá trị của row đó

#### Scenario: Tap delete icon
- **WHEN** user tap delete icon trên 1 row
- **THEN** reading đó bị xóa khỏi mock data, bảng cập nhật

### Requirement: FAB trên Pipe Detail mở WaterLevelDialog
Pipe Detail page SHALL có FAB button ở góc phải dưới. Khi tap FAB, mở WaterLevelDialog pre-filled với pipe hiện tại và ngày hôm nay.

#### Scenario: FAB mở dialog với pipe context
- **WHEN** user tap FAB trên Pipe Detail của pipe A-1
- **THEN** WaterLevelDialog mở với pipe A-1, date = today, level pre-filled từ last known

### Requirement: Pipe Detail dùng mock data
Pipe Detail page SHALL dùng mock data — không gọi API thật. Toàn bộ code dùng Tailwind utility class hoặc Nuxt UI color prop — không hardcode hex.

#### Scenario: Kiểm tra code không có hex
- **WHEN** kiểm tra source code Pipe Detail và các component liên quan
- **THEN** không có mã hex nào
