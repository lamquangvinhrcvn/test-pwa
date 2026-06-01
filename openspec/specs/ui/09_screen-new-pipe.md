# Screen 3-3: New Pipe（パイプ新規）

## Mục đích
Form tạo pipe mới. Người dùng nhập tên pipe, chọn monitoring field, thêm ghi chú. Có cảnh báo GPS nếu GPS không khả dụng.

---

## Layout tổng thể

```
┌─────────────────────────────┐
│  [< New Pipe         Save]  │
│  Add a new pipe to a field  │
│ ─────────────────────────── │
│  Pipe Name                  │
│  [Pipe A-3              ]   │
│                             │
│  Monitoring Field           │
│  [Field A                   │
│   0.64 ha · 2 pipes     ]   │
│                             │
│  Pipe Note                  │
│  [Near the inlet        ]   │
│                             │
│ ┌─────────────────────────┐ │
│ │ ⚠ GPS位置取得行いません  │ │
│ │ 管理上のため、画面内の   │ │
│ │ パイプの位置は管理者が   │ │
│ │ 後に設定を要求します。  │ │
│ └─────────────────────────┘ │
│                             │
│  [       Save Pipe       ]  │
│ ─────────────────────────── │
│  [Home][Fields][●Monitor][Log]│
└─────────────────────────────┘
```

---

## Màu sắc & Visual

| Element | Value |
|---|---|
| Header background | `#2D5A27` |
| Back `<` + "New Pipe" | `#FFFFFF` |
| "Save" right button | `#FFFFFF`, semibold |
| Sub-title "Add a new pipe to a field" | `#757575`, 13px |
| Input label | `#757575`, 12px |
| Input border | `#E0E6DC`, 1px, radius 8px |
| Input value | `#1A1A1A`, 15px |
| Monitoring Field box | Multi-line card, border `#E0E6DC`, radius 8px |
| Field name in box | `#1A1A1A`, 15px, bold |
| Field sub "0.64 ha · 2 pipes" | `#757575`, 12px |
| GPS warning box bg | `#FFF8E1` (amber light) |
| GPS warning border | `#FFB300`, 1px, radius 8px |
| GPS warning icon ⚠ | `#FF8F00`, 18px |
| GPS warning text | `#5D4037` (dark brown), 12px |
| Save Pipe button | `#2D5A27` bg, white text, radius 12px, 52px |

---

## Components chi tiết

### Header
- Back + "New Pipe"
- Right: "Save" text action
- Instruction below header: "Add a new pipe to a field", 13px grey

### Pipe Name Input
- Label: `Pipe Name`
- Placeholder hoặc pre-filled: `Pipe A-3` (auto-incremented)
- Type: text

### Monitoring Field Selector
- Label: `Monitoring Field`
- Displays as tappable card:
  ```
  [Field Name]
  [X.XX ha · N pipes]
  ```
- Tap → bottom sheet / modal để chọn field
- Trailing: dropdown arrow `⌄`

### Pipe Note Input
- Label: `Pipe Note`
- Placeholder: `Near the inlet`
- Type: text, optional

### GPS Warning Box
- Only shown when GPS không available
- Icon ⚠ + Japanese text về việc admin sẽ set vị trí sau
- Background: `#FFF8E1`, border: `#FFB300`
- Text: `#5D4037`, 12px, multi-line

### Save Pipe Button
- Full-width
- Background: `#2D5A27`
- Text: "Save Pipe"
- Disabled khi pipe name trống hoặc field chưa chọn

---

## Nuxt / Vue Component

```
pages/
  pipes/
    new.vue
components/
  pipes/
    FieldSelector.vue       ← tap để chọn field
    GpsWarningBox.vue
```

### Query params
- `?fieldId=A` — pre-select field khi navigate từ Field Detail

### State
```ts
const pipeName = ref('')
const selectedFieldId = ref(route.query.fieldId ?? '')
const pipeNote = ref('')
const gpsAvailable = ref(false)  // check on mount

const canSave = computed(() => pipeName.value.length > 0 && selectedFieldId.value)
```

### Submit
```ts
async function savePipe() {
  await $fetch('/api/pipes', {
    method: 'POST',
    body: { name: pipeName.value, fieldId: selectedFieldId.value, note: pipeNote.value }
  })
  navigateTo(`/fields/${selectedFieldId.value}`)
}
```
