# Screen 3-1: Monitoring（パイプ一覧）

## Mục đích
Tab Monitoring: hiển thị tất cả pipes trên toàn bộ fields. Mỗi pipe có giá trị water level mới nhất. Offline badge khi mất kết nối. FAB để thêm reading mới.

---

## Layout tổng thể

```
┌─────────────────────────────┐
│  [Header: "Monitoring" — green]│
│  Today's readings  [Offline]  │
│  ─────────────────────────    │
│  Pipe A-1                 📋 │
│  Field A           12 cm     │
│  ─────────────────────────    │
│  Pipe A-2                    │
│  Field A           14 cm     │
│  ─────────────────────────    │
│  Pipe B-1                    │
│  Field B            8 cm     │
│  ─────────────────────────    │
│  Pipe C-1                    │
│  Field C             —       │
│  ─────────────────────────    │
│  Pipe C-2                 📋 │
│  Field C           15 cm     │
│  ─────────────────────────    │
│  Pipe C-3                    │
│  Field C            9 cm     │
│                              │
│                    [+ FAB]   │
│ ──────────────────────────── │
│  [Home][Fields][●Monitor][Log]│
└─────────────────────────────┘
```

---

## Màu sắc & Visual

| Element | Value |
|---|---|
| Header background | `#2D5A27` |
| Header title "Monitoring" | `#FFFFFF`, 18px, bold |
| "Today's readings" label | `#1A1A1A`, 14px, semibold |
| "Offline" badge | `#FF6D00` bg, `#FFFFFF` text, 11px, pill shape, padding 4px 10px |
| Pipe name | `#1A1A1A`, 15px, medium |
| Field sub-label | `#757575`, 12px |
| Water level value | `#2979FF`, 22px, bold |
| Unit "cm" | `#2979FF`, 14px, regular |
| "—" (no data) | `#BDBDBD`, 18px |
| Edit/note icon 📋 | `#9E9E9E`, 18px, trailing |
| List divider | `#E0E6DC`, 1px |
| FAB | `#2D5A27`, `+` white, 56px circle |
| Bottom nav active | Monitor tab |

---

## Components chi tiết

### Header
- Title: "Monitoring"
- Right: không có action (hoặc filter icon)

### Status Row
- "Today's readings" (left)
- "Offline" badge (right) — chỉ hiện khi `isOffline === true`
- Badge: orange `#FF6D00`, white text, radius 12px

### Pipe List Row
```
[Pipe Name]          [edit icon?]
[Field Sub]          [XX cm]
```

- Pipe name: bold, 15px
- Field: "Field X", 12px xám
- Water level: 22px bold blue — align right
- Edit/clipboard icon bên phải tên nếu có note/đang offline-pending

#### Trạng thái đặc biệt
- **No data**: Hiển thị "—" thay vì số, màu xám `#BDBDBD`
- **Offline pending**: Trailing icon 📋 (clipboard) màu `#9E9E9E`

### FAB
- Position: bottom-right fixed
- Tap → show "Enter Water Level" dialog (xem Screen 3-1a)
- Hoặc tap pipe row để open dialog cho pipe đó

---

## Nuxt / Vue Component

```
pages/
  monitor/
    index.vue
components/
  monitor/
    PipeReadingRow.vue
    OfflineBadge.vue
    WaterLevelDialog.vue    ← inline dialog
```

### Data
```ts
interface PipeReading {
  pipeId: string        // 'A-1'
  fieldId: string       // 'A'
  fieldName: string     // 'Field A'
  pipeName: string      // 'Pipe A-1'
  latestLevel: number | null
  isPendingSync: boolean
}

const isOffline = ref(false)
const pipes = ref<PipeReading[]>([...])
```

### Sorting
- Pipes sorted by field order (A → B → C...) then pipe number
- "No data" pipes shown last (hoặc inline với field group)
