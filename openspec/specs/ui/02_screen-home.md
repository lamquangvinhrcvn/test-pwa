# Screen 1-1: Home（マップ＋一覧）

## Mục đích
Màn hình chính sau khi đăng nhập. Hiển thị bản đồ tổng quan các field + danh sách Fields & Pipes phía dưới.

---

## Layout tổng thể

```
┌─────────────────────────────┐
│  [Header: "Home"  — green]  │
│  Today    [3 items]         │
│ ┌─────────────────────────┐ │
│ │  MAP CANVAS             │ │
│ │  ┌──────┐  ┌────┐       │ │
│ │  │  •   │  │ •  │       │ │
│ │  └──────┘  └────┘       │ │
│ │        ┌────────┐       │ │
│ │        │   •    │       │ │
│ │        └────────┘       │ │
│ └─────────────────────────┘ │
│                             │
│  Fields & Pipes    See all  │
│  ─────────────────────────  │
│  Field A           12cm  >  │
│  1 pipe · 0.8 ha            │
│  ─────────────────────────  │
│  Field B            8cm  >  │
│  1 pipe · 1.2 ha            │
│  ─────────────────────────  │
│  Field C           15cm  >  │
│  1 pipe · 2.3 ha            │
│  ─────────────────────────  │
│  Field D            6cm  >  │
│  1 pipe · 1.3 ha            │
│ ─────────────────────────── │
│  [Home] [Fields] [●Monitor] [Log] │
└─────────────────────────────┘
```

---

## Màu sắc & Visual

| Element | Value |
|---|---|
| Header background | `#2D5A27` |
| Header text "Home" | `#FFFFFF`, 18px, bold |
| "Today" label | `#FFFFFF`, 13px |
| "3 items" badge | rounded pill, white bg, green text `#2D5A27`, 11px |
| Map canvas background | `#C8D9C0` |
| Field rectangles | `#9DB894`, border `#6B9662` 1.5px |
| Pipe dots on map | `#4A90D9`, size 10px circle |
| Section label "Fields & Pipes" | `#1A1A1A`, 14px, semibold |
| "See all" | `#757575`, 13px |
| Field name | `#1A1A1A`, 15px, medium |
| Sub-info (pipe count, ha) | `#757575`, 12px |
| Water level value | `#2979FF`, 18px, bold |
| List divider | `#E0E6DC`, 1px |
| Chevron `>` | `#BDBDBD` |
| Bottom nav background | `#FFFFFF` |
| Active tab icon | `#2D5A27` |
| Inactive tab icon | `#9E9E9E` |

---

## Components chi tiết

### Header
- Background: `#2D5A27`
- Left: text "Home", 18px bold white
- Right: "Today" text + item count badge (pill)
- Badge: white background, `#2D5A27` text, padding 4px 10px, radius 12px

### Map Canvas
- Height: ~180px
- Background: `#C8D9C0`
- Border-radius: 0 (full width) hoặc 12px nếu card-style
- Field rectangles: border-radius 8px, fill `#9DB894`
- Each field có 1 dot `#4A90D9` ở vị trí pipe
- Tap vào field → navigate to Field Detail

### Fields & Pipes List
- Section header: "Fields & Pipes" (left) + "See all →" (right)
- Margin: 16px top, 16px horizontal
- List rows:

```
[Field Name]         [X cm] [>]
[N pipes · X.X ha]
```

- Tap row → navigate to Field Detail
- Giá trị cm: color `#2979FF`, 18px bold

### Bottom Navigation
Tabs (trái → phải):
1. **Home** — house icon
2. **Fields** — grid/field icon
3. **Monitor** — dot/gauge icon (active dot indicator)
4. **Logbook** — book icon

Active: icon tô màu `#2D5A27`, label hiện
Inactive: icon xám `#9E9E9E`, label ẩn hoặc xám nhỏ

---

## Nuxt / Vue Component

```
pages/
  home.vue
components/
  home/
    MapCanvas.vue         ← SVG/canvas map
    FieldPipeList.vue     ← list section
    FieldPipeRow.vue      ← single row
layout/
  BottomNav.vue
```

### State / Props
```ts
// home.vue
const todayItemCount = ref(3)
const fields = ref([
  { id: 'A', name: 'Field A', pipes: 1, area: 0.8, latestLevel: 12 },
  { id: 'B', name: 'Field B', pipes: 1, area: 1.2, latestLevel: 8 },
  { id: 'C', name: 'Field C', pipes: 1, area: 2.3, latestLevel: 15 },
  { id: 'D', name: 'Field D', pipes: 1, area: 1.3, latestLevel: 6 },
])
```

### Navigation
- Tap field row → `navigateTo('/fields/[id]')`
- Tap "See all" → `navigateTo('/fields')`
- Map tap on field rect → same as row tap
