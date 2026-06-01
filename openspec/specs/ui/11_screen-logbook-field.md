# Screen 4-2: Logbook Field（不採用）— DROPPED State

## Mục đích
Chi tiết logbook của một field cụ thể. Màn hình cũng ở trạng thái DROPPED. Hiển thị field info, survey items (Baseline, Endline), Water Log. Button "Submit to Admin" bị disabled.

---

## Layout tổng thể

```
┌─────────────────────────────┐
│  [< Field A       ...menu]  │
│  Field A · 0.84 ha          │
│  Last visit · [date]        │
│ ─────────────────────────── │
│                             │
│ ┌─────────────────────────┐ │
│ │      DROPPED            │ │
│ │  Logbook機能は不採用と   │ │
│ │  なりました              │ │
│ └─────────────────────────┘ │
│                             │
│  ● Baseline Survey          │
│    Baseline: May 1          │
│                             │
│  ○ Endline Survey           │
│    (pending)                │
│                             │
│  ● Water Log                │
│    Water: [date]            │
│                             │
│  [    Submit to Admin    ]  │
│  (disabled / greyed out)    │
│ ─────────────────────────── │
│  [Home][Fields][Monitor][●Log]│
└─────────────────────────────┘
```

---

## Màu sắc & Visual

| Element | Value |
|---|---|
| Header background | `#2D5A27` |
| Back + "Field A" | `#FFFFFF` |
| `...` menu | `#FFFFFF` |
| Sub "Field A · 0.84 ha" | `#FFFFFF` 80%, 13px |
| "Last visit · date" | `#FFFFFF` 60%, 12px |
| **DROPPED banner** | `#D32F2F` bg, full-width |
| DROPPED text | `#FFFFFF`, 28px, 900 weight |
| Sub "Logbook機能..." | `#FFFFFF`, 12px |
| Baseline Survey dot | `#4CAF50` filled circle, 12px |
| Endline Survey dot | `#9E9E9E` empty/outline circle, 12px |
| Water Log dot | `#FF9800` filled circle (orange), 12px |
| Survey item name | `#1A1A1A`, 15px, medium |
| Survey item date | `#757575`, 12px |
| **Submit to Admin button** | Background `#9E9E9E` (disabled grey), text `#FFFFFF`, radius 12px, 52px |
| Disabled opacity | 0.5 hoặc flat grey |

---

## Components chi tiết

### Header
- Back + "Field A"
- Sub info: "Field A · 0.84 ha" + "Last visit · [date]"
- `...` menu: Edit, History, etc.

### DROPPED Banner
- Giống Screen 4-1: full-width đỏ đậm
- Đặt ở TOP của content (trước survey list)
- "DROPPED" 28px bold trắng
- "Logbook機能は不採用となりました" 12px trắng

### Survey Items List

Mỗi survey item:
```
[●] [Survey Name]
    [Date / Status]
```

| Survey | Dot color | Trạng thái |
|---|---|---|
| Baseline Survey | `#4CAF50` xanh lá | Completed: hiện ngày |
| Endline Survey | `#9E9E9E` xám | Pending: không có ngày |
| Water Log | `#FF9800` cam | Completed: hiện ngày |

- Tap item → navigate vào survey detail (nếu available)
- Trong trạng thái DROPPED: tất cả items có thể disabled/read-only

### Submit to Admin Button
- **Disabled** trong DROPPED state
- Background: `#9E9E9E` hoặc `#E0E6DC`
- Text: "Submit to Admin", white hoặc `#BDBDBD`
- No tap action
- Tooltip/note nếu cần: "Dropped from program"

---

## Sự khác biệt vs Screen 4-1

| Screen 4-1 | Screen 4-2 |
|---|---|
| Danh sách fields | Chi tiết một field |
| DROPPED banner giữa list | DROPPED banner đầu content |
| Status chips (Active/Continue) | Survey items + Submit button |
| Không có action | Submit button (disabled) |

---

## Nuxt / Vue Component

```
pages/
  logbook/
    [fieldId].vue
components/
  logbook/
    DroppedBanner.vue     ← reuse từ Screen 4-1
    SurveyItemRow.vue
    SubmitButton.vue
```

### Route
- `/logbook/[fieldId]` — e.g. `/logbook/A`

### Props / State
```ts
interface SurveyItem {
  type: 'baseline' | 'endline' | 'waterlog'
  label: string
  completedDate?: string
  status: 'completed' | 'pending' | 'skipped'
}

const isDropped = ref(true)
const surveys = ref<SurveyItem[]>([
  { type: 'baseline', label: 'Baseline Survey', completedDate: 'May 1', status: 'completed' },
  { type: 'endline', label: 'Endline Survey', status: 'pending' },
  { type: 'waterlog', label: 'Water Log', completedDate: '...', status: 'completed' },
])
```
