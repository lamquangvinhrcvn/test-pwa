# Screen 2-3: New Field（圃場新規）

## Mục đích
Màn hình tạo field mới. Người dùng vẽ hình chữ nhật trên bản đồ bằng cách tap các điểm góc, nhập tên, ghi chú. Diện tích tự động tính toán.

---

## Layout tổng thể

```
┌─────────────────────────────┐
│  [< New Field       Save]   │
│  "Tap to add points" hint   │
│                    [Reset]  │
│ ┌─────────────────────────┐ │
│ │  MAP CANVAS (draw mode) │ │
│ │   ○──────────────────○  │ │
│ │   │                  │  │ │
│ │   │   (green rect)   │  │ │
│ │   │                  │  │ │
│ │   ○──────────────────○  │ │
│ └─────────────────────────┘ │
│                             │
│  Field Name                 │
│  [Field D              ]    │
│                             │
│  Field Note                 │
│  [Optional note...     ]    │
│                             │
│  Area (auto-calculated)     │
│                      0.46ha │
│                             │
│  [       Save Field      ]  │
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
| Title "New Field" | `#FFFFFF`, 18px, bold |
| "Save" button (header right) | `#FFFFFF`, 15px, semibold (text button) |
| Hint text "Tap to add points" | `#757575`, 12px, italic |
| "Reset" link | `#2979FF`, 13px |
| Map canvas background | `#C8D9C0` |
| Drawn rectangle fill | `#9DB894` (50% opacity khi đang vẽ) |
| Drawn rectangle border | `#6B9662`, 1.5px solid |
| Corner control points | White circle `○`, size 12px, border `#6B9662` |
| Input label | `#757575`, 12px |
| Input border | `#E0E6DC`, 1px, radius 8px |
| Input height | 48px |
| "Area (auto-calculated)" label | `#757575`, 12px, italic |
| Area value "0.46 ha" | `#1A1A1A`, 16px, semibold, align right |
| Save Field button | `#2D5A27` bg, white text, radius 12px, 52px height |

---

## Components chi tiết

### Header
- Left: `<` back + "New Field"
- Right: "Save" text button (same as header Save action)

### Map Draw Canvas
- Hint text phía trên: "Tap to add points" + "Reset" link right
- Canvas: user tap để tạo polygon (min 4 points = rectangle)
- Sau khi tap 4 điểm, vẽ closed shape
- Hiển thị circle handles ở mỗi góc (draggable)
- Tự động tính diện tích khi shape thay đổi

### Form Fields

#### Field Name
- Label: `Field Name`
- Input: text, placeholder để trống hoặc "e.g. Field D"
- Autofocus sau khi user finish drawing

#### Field Note
- Label: `Field Note`
- Input: text, placeholder `Optional note...`
- Multiline optional (1-2 dòng)

#### Area (read-only)
- Label: `Area (auto-calculated)`, italic
- Value: tính từ drawn polygon, format `X.XX ha`
- Align right, `#1A1A1A`, 16px, semibold
- Background: `#F5F7F4`, disabled input style

### Save Field Button
- Full-width
- Background: `#2D5A27`
- Text: "Save Field", white, semibold
- Disabled nếu chưa vẽ shape hoặc chưa có tên

---

## Interaction Flow

```
User taps on map canvas
  → Add point
  → When 4 points: auto-close polygon, show handles
  → Drag handles to resize
  → Area re-calculates in real time

"Reset" tap → clear all points, reset area to 0

Fill "Field Name" → required

Tap "Save Field" or header "Save"
  → Validate (name not empty, shape exists)
  → POST /api/fields
  → Navigate back to Fields Top
```

---

## Nuxt / Vue Component

```
pages/
  fields/
    new.vue
components/
  fields/
    DrawableMap.vue      ← tap-to-draw canvas
    AreaCalculator.ts    ← utility: polygon area from coords
```

### State
```ts
const points = ref<{x: number, y: number}[]>([])
const fieldName = ref('')
const fieldNote = ref('')
const calculatedArea = computed(() => polygonArea(points.value))
const canSave = computed(() => fieldName.value.length > 0 && points.value.length >= 3)
```

### Area Calculation
- Shoelace formula cho polygon area
- Convert từ pixel coords sang hectares (dùng map scale factor)
