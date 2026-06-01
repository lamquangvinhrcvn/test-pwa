# Screen 3-1a: Monitoring + Water Level Dialog（水位入力ダイアログ）

## Mục đích
Bottom sheet / modal overlay để nhập water level (cm) cho một pipe cụ thể. Xuất hiện khi user tap FAB hoặc tap một pipe row.

---

## Layout tổng thể

```
┌─────────────────────────────┐
│  [Header: "Monitoring"]     │
│  [Pipe list — dimmed]       │
│  Pipe A-1  Field A  12 cm   │
│  Pipe A-2  Field A  14 cm   │
│  Pipe B-1  Field B   8 cm   │
│ ─────────────────────────── │
│  ┌───────────────────────┐  │
│  │ Enter Water Level  [✕]│  │
│  │ Pipe A-1 · Field A    │  │
│  │                       │  │
│  │ Date                  │  │
│  │ 📅 May 25, 2026 (Today)│  │
│  │                       │  │
│  │ Water Level           │  │
│  │  [−]    12    cm  [+] │  │
│  │                       │  │
│  │ [Cancel]  [   Save  ] │  │
│  │                       │  │
│  │ * Always offline...   │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

## Màu sắc & Visual

| Element | Value |
|---|---|
| Dialog background | `#FFFFFF` |
| Dialog border-radius top | 20px (bottom sheet style) |
| Overlay scrim | `rgba(0,0,0,0.4)` |
| Dialog title "Enter Water Level" | `#1A1A1A`, 16px, bold |
| Close button `✕` | `#757575`, 20px |
| Sub "Pipe A-1 · Field A" | `#757575`, 13px |
| "Date" label | `#757575`, 12px |
| Date icon 📅 | `#757575` |
| Date value "May 25, 2026 (Today)" | `#1A1A1A`, 14px, medium |
| "Water Level" label | `#757575`, 12px |
| Stepper container | `#E8F0FE` bg, radius 12px, padding 12px 16px |
| `−` button | `#1565C0` text, white bg, circle 32px, border `#BBDEFB` |
| `+` button | `#1565C0` text, white bg, circle 32px, border `#BBDEFB` |
| Stepper value "12" | `#1565C0`, 32px, bold |
| Unit "cm" | `#1565C0`, 14px |
| Cancel button | White bg, border `#E0E6DC`, text `#757575`, 44px, radius 10px |
| Save button | `#2D5A27` bg, white text, 44px, radius 10px |
| Footer note `*` | `#9E9E9E`, 11px, italic |

---

## Components chi tiết

### Dialog Header
- Title: "Enter Water Level", bold 16px
- Subtitle: "[Pipe Name] · [Field Name]", 13px xám
- Close (✕): top-right, tap → close dialog

### Date Section
- Label: "Date"
- Row: calendar icon + formatted date + "(Today)" indicator
- Tap → date picker (optional, có thể default today)

### Water Level Stepper
- Container: `#E8F0FE` rounded box
- Layout: `[−]  [VALUE]  cm  [+]`
- `−` button: giảm 1 cm (min: 0)
- `+` button: tăng 1 cm (max: 999)
- Value: 32px, bold, blue `#1565C0`
- "cm" unit: 14px blue, ngay bên phải value

#### Interaction
- Long press `+` / `−`: tăng/giảm liên tục (repeat)
- Tap giá trị → focus input keyboard (manual entry)

### Footer Note
- `* Always offline, form saved on device → syncs automatically to server policy`
- 11px, italic, xám
- Hiển thị khi `isOffline === true` (có thể luôn hiện)

### Action Buttons
- Row: Cancel (left, 45% width) + Save (right, 50% width)
- Gap: 8px
- Save: disabled khi value = null hoặc unchanged

---

## Behavior

```
Dialog mở với:
  - Pipe context (name, field)
  - Date = today
  - Water level = last known value (pre-filled) hoặc 0

User chỉnh value → Tap Save
  → POST /api/readings { pipeId, date, level }
  → Nếu offline: lưu local IndexedDB, queue sync
  → Close dialog
  → Refresh list (update giá trị mới trong row)

Tap Cancel / ✕ → close, no save
```

---

## Nuxt / Vue Component

```
components/
  monitor/
    WaterLevelDialog.vue
```

### Props
```ts
interface Props {
  pipe: { id: string, name: string, fieldName: string }
  initialLevel?: number
  modelValue: boolean   // v-model for open/close
}
```

### Emits
```ts
emit('save', { pipeId, date, level })
emit('update:modelValue', false)
```

### State
```ts
const selectedDate = ref(new Date())
const waterLevel = ref(props.initialLevel ?? 0)
```
