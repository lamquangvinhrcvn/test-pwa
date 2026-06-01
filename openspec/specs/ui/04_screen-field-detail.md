# Screen 2-2: Field Detail（圃場詳細）

## Mục đích
Chi tiết một field: bản đồ riêng của field + danh sách pipes trong field đó.

---

## Layout tổng thể

```
┌─────────────────────────────┐
│  [< Field A        — green] │
│ ┌─────────────────────────┐ │
│ │  MAP CANVAS (field only)│ │
│ │                         │ │
│ │          •              │ │
│ │                   •     │ │
│ └─────────────────────────┘ │
│                             │
│  Field Name        Area     │
│  Field A           0.84 ha  │
│                             │
│  Pipes                  2   │
│  ─────────────────────────  │
│  Pipe A-1                >  │
│  Last: 12cm · today         │
│  ─────────────────────────  │
│  Pipe A-2                >  │
│  Last: 16cm · yesterday     │
│                             │
│  [      + Add Pipe      ]   │
│                             │
│ ─────────────────────────── │
│  [Home] [●Fields] [Monitor] [Log] │
└─────────────────────────────┘
```

---

## Màu sắc & Visual

| Element | Value |
|---|---|
| Header background | `#2D5A27` |
| Back arrow `<` | `#FFFFFF` |
| Header title "Field A" | `#FFFFFF`, 18px, bold |
| Map canvas background | `#C8D9C0` |
| Field boundary | `#9DB894` fill, `#6B9662` border |
| Pipe dots | `#4A90D9`, 10px |
| "Field Name" label | `#757575`, 12px |
| "Area" label | `#757575`, 12px |
| Field A value | `#1A1A1A`, 16px, semibold |
| Area value "0.84 ha" | `#1A1A1A`, 16px, semibold |
| "Pipes" section header | `#1A1A1A`, 14px, semibold |
| Pipe count "2" | `#757575`, 14px |
| Pipe name | `#1A1A1A`, 15px, medium |
| "Last:" sub | `#757575`, 12px |
| "Add Pipe" button | Outlined, border `#2D5A27`, text `#2D5A27`, height 48px, radius 10px |
| OR: filled `#2D5A27` text white | depends on design direction |

---

## Components chi tiết

### Header
- Back button `<` + Field name (dynamic: "Field A")
- No right action

### Field Map
- Height: ~200px
- Chỉ hiển thị field đang xem (không có các field khác)
- Pipe dots với position tương đối trong field

### Field Info Row
- 2 columns dạng label/value:
  - Left: `Field Name` / `Field A`
  - Right: `Area` / `0.84 ha`
- Margin: 16px, padding: 0 16px

### Pipes Section
- Header: "Pipes" (left) + count (right)
- List rows:

```
[Pipe Name]                    [>]
Last: Xcm · [timeago]
```

- "Last:" sub-text: `#757575`, 12px

### Add Pipe Button
- Full-width
- Outlined style: border 1.5px `#2D5A27`, text `#2D5A27`
- Height: 48px, radius 10px
- Icon `+` trước text
- Tap → `navigateTo('/pipes/new?fieldId=A')`

---

## Nuxt / Vue Component

```
pages/
  fields/
    [id].vue
components/
  fields/
    FieldDetailMap.vue
    FieldInfoRow.vue
    PipeListRow.vue
    AddPipeButton.vue
```

### Route params
- `id`: field ID (e.g. `'A'`)

### Data
```ts
interface FieldDetail {
  id: string
  name: string
  area: number
  pipes: Pipe[]
}
interface Pipe {
  id: string       // 'A-1', 'A-2'
  lastLevel: number
  lastDate: string // 'today', 'yesterday', ISO date
}
```
