# Screen 3-2: Pipe Detail（水位履歴）

## Mục đích
Chi tiết lịch sử water level của một pipe. Hiển thị giá trị hôm nay nổi bật, bảng readings theo ngày, và FAB để thêm reading.

---

## Layout tổng thể

```
┌─────────────────────────────┐
│  [< Pipe A-1       ...menu] │
│  Field A                    │
│  Pipe A-1  [Never made inst]│
│ ─────────────────────────── │
│  Today                      │
│                    12 cm    │
│ ─────────────────────────── │
│  Daily readings        30d  │
│  ─────────────────────────  │
│  Today        12 cm  %  ✕  │
│  May 24       14 cm  %  ✕  │
│  May 23       10 cm  %  ✕  │
│  May 22        8 cm  %  ✕  │
│  May 21        7 cm  %  ✕  │
│  May 20        9 cm  %  ✕  │
│  May 19       12 cm  %  ✕  │
│  May 18       15 cm  %  ✕  │
│                             │
│                    [+ FAB]  │
│ ─────────────────────────── │
│  [Home][Fields][●Monitor][Log]│
└─────────────────────────────┘
```

---

## Màu sắc & Visual

| Element | Value |
|---|---|
| Header background | `#2D5A27` |
| Back `<` | `#FFFFFF` |
| Title "Pipe A-1" | `#FFFFFF`, 18px, bold |
| `...` menu icon | `#FFFFFF` |
| Sub header "Field A / Pipe A-1" | `#FFFFFF` tint hoặc white 80%, 13px |
| "Never made installation" sub | `#FFFFFF` 60%, 12px, italic |
| "Today" label | `#757575`, 12px |
| Today value "12 cm" | `#2979FF`, 32px, bold |
| "Daily readings" header | `#1A1A1A`, 14px, semibold |
| "30d" tab/label | `#757575`, 12px |
| Date column | `#1A1A1A`, 14px |
| Value column | `#1A1A1A`, 14px, medium |
| `%` icon (percent/edit) | `#9E9E9E`, 16px |
| `✕` delete icon | `#E57373`, 16px |
| Row divider | `#E0E6DC` |
| FAB | `#2D5A27`, `+` white |

---

## Components chi tiết

### Header
- Back `<` + Pipe name "Pipe A-1"
- Right: `...` overflow menu (Edit pipe, Delete pipe)
- Sub-header below title: "Field A / Pipe A-1" + installation note

### Today's Summary
- "Today" label: small, grey
- Value: `12 cm`, large blue (32px), bold
- Toàn width section, center hoặc right-aligned

### Daily Readings Table
- Header: "Daily readings" + period selector "30d"
- Columns: `Date | Value | % | ✕`
  - Date: "Today", "May 24", "May 23"...
  - Value: `X cm` — 14px, medium
  - `%`: icon cho edit/percentage (mục đích chưa rõ, có thể là "edit reading")
  - `✕`: delete row

#### Row layout
```
[Date      ]   [ X cm ]   [%]   [✕]
```
- Height: 44px per row
- Alternating bg tùy chọn (có thể đơn giản là divider)

### FAB
- Tap → open Water Level Dialog (pre-fill today's date, current pipe)

---

## Nuxt / Vue Component

```
pages/
  monitor/
    [pipeId].vue       ← Pipe Detail
components/
  monitor/
    DailyReadingsTable.vue
    ReadingRow.vue
    TodaySummary.vue
```

### Route
- `/monitor/[pipeId]` — e.g. `/monitor/A-1`

### Data
```ts
interface DailyReading {
  date: string    // 'Today', 'May 24', ...
  level: number   // cm
  id: string      // for delete
}

const todayLevel = ref(12)
const readings = ref<DailyReading[]>([...])
const periodDays = ref(30)
```

### Actions
- `deleteReading(id)` → confirm → DELETE /api/readings/:id
- `editReading(id)` → open dialog pre-filled
- Change period → filter/fetch data for different range

### `...` Menu items
- "Edit Pipe Info"
- "Delete Pipe"
- "Export CSV" (optional)
