# Screen 2-1: Fields Top（圃場一覧）

## Mục đích
Danh sách tất cả các field. Hiển thị bản đồ lớn hơn với label A/B/C. FAB để thêm field mới.

---

## Layout tổng thể

```
┌─────────────────────────────┐
│  [Header: "Fields" — green] │
│ ┌─────────────────────────┐ │
│ │  MAP CANVAS (lớn hơn)   │ │
│ │  ┌────────┐  ┌────────┐ │ │
│ │  │   A    │  │   B    │ │ │
│ │  │    •   │  │    •   │ │ │
│ │  └────────┘  └────────┘ │ │
│ │       ┌──────────────┐  │ │
│ │       │      C       │  │ │
│ │       │       •      │  │ │
│ │       └──────────────┘  │ │
│ └─────────────────────────┘ │
│                             │
│  All Fields           4  > │
│  ─────────────────────────  │
│  Field A                 >  │
│  0.8 ha · 2 pipes           │
│  ─────────────────────────  │
│  Field B                 >  │
│  0.5 ha · 2 pipes           │
│  ─────────────────────────  │
│  Field C                 >  │
│  1.2 ha · 3 pipes           │
│                             │
│                    [+ FAB]  │
│ ─────────────────────────── │
│  [Home] [●Fields] [Monitor] [Log] │
└─────────────────────────────┘
```

---

## Màu sắc & Visual

| Element | Value |
|---|---|
| Header background | `#2D5A27` |
| Header text "Fields" | `#FFFFFF`, 18px, bold |
| Map canvas background | `#C8D9C0` |
| Field rect fill | `#9DB894` |
| Field rect border | `#6B9662`, 1.5px |
| Field label (A/B/C) | `#1A1A1A`, 13px, bold, top-left trong rect |
| Pipe dot | `#4A90D9`, 10px circle |
| "All Fields" label | `#1A1A1A`, 14px, semibold |
| Count badge "4" | `#757575`, 14px |
| Chevron | `#BDBDBD` |
| Field name | `#1A1A1A`, 15px, medium |
| Sub-info | `#757575`, 12px |
| FAB | `#2D5A27` background, `+` white icon, 56px circle |
| FAB shadow | `0 4px 12px rgba(0,0,0,0.25)` |

---

## Components chi tiết

### Header
- "Fields" — trắng, bold, căn giữa hoặc căn trái
- Không có back arrow (tab root screen)

### Map Canvas (lớn hơn Home)
- Height: ~220px
- Field rectangles có label chữ (A, B, C) góc trên-trái
- Tap field rect → navigate to Field Detail

### All Fields List
- Header row: "All Fields" (left) + count + chevron (right)
  - Tap → không làm gì (đã là trang này) hoặc filter
- List items:

```
[Field Name]                  [>]
[X.X ha · N pipes]
```

- Không hiện water level cm ở màn này (khác Home)
- Tap → `navigateTo('/fields/[id]')`

### FAB
- Position: `fixed`, bottom-right
- Margin: 24px from bottom (above nav), 20px from right
- Tap → `navigateTo('/fields/new')`

---

## Nuxt / Vue Component

```
pages/
  fields/
    index.vue          ← Fields Top
    [id].vue           ← Field Detail
    new.vue            ← New Field
components/
  fields/
    FieldMap.vue
    FieldList.vue
    FieldListRow.vue
```

### Data Shape
```ts
interface Field {
  id: string         // 'A', 'B', 'C', 'D'
  name: string       // 'Field A'
  area: number       // ha
  pipeCount: number
  mapPosition: { x: number, y: number, w: number, h: number }
}
```
