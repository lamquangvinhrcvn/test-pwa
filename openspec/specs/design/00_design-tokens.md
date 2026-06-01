# UG AWD Monitor App — Design Tokens

> Tài liệu tham chiếu màu sắc, typography, spacing dùng chung cho toàn bộ app.
> Dùng file này làm nền khi vibe-code từng màn hình.

---

## Color Palette

| Token | HEX | Dùng ở đâu |
|---|---|---|
| `--color-primary` | `#2D5A27` | Header bar, nút chính (Sign In, Save), FAB |
| `--color-primary-dark` | `#1E3D1A` | Header gradient bottom, nút hover |
| `--color-primary-light` | `#4A7C42` | Active tab indicator |
| `--color-bg-map` | `#C8D9C0` | Nền bản đồ / canvas field (xanh lá nhạt) |
| `--color-field-rect` | `#9DB894` | Hình chữ nhật field trên bản đồ |
| `--color-field-border` | `#6B9662` | Viền field trên bản đồ |
| `--color-dot-blue` | `#4A90D9` | Chấm xanh pipe trên bản đồ |
| `--color-dot-new` | `#FFFFFF` | Điểm add mới (circle outline trắng) |
| `--color-accent-blue` | `#2979FF` | Giá trị water level (12 cm, 14 cm…) |
| `--color-accent-orange` | `#FF6D00` | Badge "Offline" |
| `--color-accent-red` | `#D32F2F` | Banner "DROPPED", trạng thái lỗi |
| `--color-accent-green-btn` | `#388E3C` | Nút submit/save xanh lá |
| `--color-surface` | `#FFFFFF` | Card, modal, input background |
| `--color-surface-alt` | `#F5F7F4` | Background chính của app |
| `--color-border` | `#E0E6DC` | Đường kẻ phân cách list |
| `--color-text-primary` | `#1A1A1A` | Tiêu đề, label chính |
| `--color-text-secondary` | `#757575` | Sub-label, placeholder, meta info |
| `--color-text-on-primary` | `#FFFFFF` | Text trên nền xanh đậm |
| `--color-stepper-bg` | `#E8F0FE` | Nền vùng stepper (nhập water level) |
| `--color-stepper-value` | `#1565C0` | Số giá trị stepper |
| `--color-logbook-survey-baseline` | `#4CAF50` | Dot Baseline Survey (xanh lá) |
| `--color-logbook-survey-endline` | `#9E9E9E` | Dot Endline Survey (xám) |
| `--color-logbook-waterlog` | `#FF9800` | Dot Water Log (cam) |

---

## Typography

| Role | Size | Weight | Color |
|---|---|---|---|
| App title (header) | 18px | 700 | `--color-text-on-primary` |
| Screen title | 20px | 700 | `--color-text-on-primary` |
| Section title | 14px | 600 | `--color-text-primary` |
| List item title | 15px | 500 | `--color-text-primary` |
| List item sub | 12px | 400 | `--color-text-secondary` |
| Water level value | 22px | 700 | `--color-accent-blue` |
| Stepper value | 32px | 700 | `--color-stepper-value` |
| Badge / chip | 11px | 600 | varies |
| DROPPED banner | 28px | 900 | `#FFFFFF` |
| Button label | 15px | 600 | `#FFFFFF` |
| Input label | 13px | 500 | `--color-text-secondary` |
| Input value | 15px | 400 | `--color-text-primary` |

Font family: **System default** (San Francisco trên iOS, Roboto trên Android). Không dùng custom font.

---

## Spacing

| Token | Value | Notes |
|---|---|---|
| `--space-xs` | 4px | |
| `--space-sm` | 8px | |
| `--space-md` | 16px | Padding ngang card / modal |
| `--space-lg` | 24px | Khoảng cách section |
| `--space-xl` | 32px | |

---

## Component Patterns

### Header Bar
- Background: `--color-primary` (#2D5A27)
- Height: ~56px
- Text: trắng, căn giữa hoặc căn trái
- Left: `<` back arrow hoặc logo
- Right: action button (Save / `...` menu)

### Bottom Navigation (4 tabs)
- Tabs: **Home · Fields · Monitor · Logbook**
- Active tab: icon + label, indicator xanh
- Inactive: icon xám, no label
- Background: trắng, có shadow trên

### FAB (Floating Action Button)
- Size: 56px circle
- Background: `--color-primary` (#2D5A27)
- Icon: `+` trắng
- Shadow: `0 4px 12px rgba(0,0,0,0.25)`
- Vị trí: bottom-right, 24px từ mép

### List Item (Fields & Pipes)
- Height: ~52px
- Padding: 16px ngang
- Left: tên (bold) + sub (light)
- Right: giá trị cm (blue, bold) → chevron `>`
- Divider: 1px `--color-border`

### Card
- Background: white
- Border-radius: 12px
- Shadow: `0 2px 8px rgba(0,0,0,0.08)`
- Padding: 16px

### Input Field
- Border: 1px solid `--color-border`
- Border-radius: 8px
- Height: 48px
- Focus border: `--color-primary`

### Primary Button
- Background: `--color-primary` (#2D5A27)
- Border-radius: 12px
- Height: 52px
- Full width

### "See all" link
- Color: `--color-text-secondary`
- Size: 13px
- Align: right

---

## Map Canvas
- Background: `--color-bg-map` (#C8D9C0)
- Field rectangles: `--color-field-rect` với viền `--color-field-border`
- Pipe dots: `--color-dot-blue` (#4A90D9), size 10px
- Label (A, B, C): đen, 14px bold, trong rect
- Add-point: circle outline trắng, 8px

---

## Status Indicators

| Trạng thái | Visual |
|---|---|
| Online | Không hiện badge |
| Offline | Badge cam `Offline`, rounded |
| DROPPED | Full-width banner đỏ đậm, text trắng bold |
| Active (survey) | Chip xanh `Active` |
| Continue | Chip `Continue` (outlined hoặc muted green) |
| Submitted | Nút xám disabled |

---

## ⚙️ Tailwind v4 + Nuxt UI Setup (BẮT BUỘC)

> Nuxt UI v3 chạy trên Tailwind v4 — **KHÔNG còn** `tailwind.config.js`.
> Màu khai báo bằng CSS custom properties trong `@theme`, Nuxt UI tự pick up.

### File `app/assets/css/main.css`

```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  /* Primary — xanh lá đậm #2D5A27 của app */
  --color-primary-50:  #f0f7ee;
  --color-primary-100: #d8ecd4;
  --color-primary-200: #b4d9ac;
  --color-primary-300: #7fba74;
  --color-primary-400: #4a9640;
  --color-primary-500: #2d5a27;   /* màu chính */
  --color-primary-600: #1e3d1a;
  --color-primary-700: #163015;
  --color-primary-800: #0f2110;
  --color-primary-900: #08120a;
  --color-primary-950: #040a05;

  /* Neutral — text, border, surface */
  --color-neutral-50:  #f5f7f4;
  --color-neutral-100: #e8ede6;
  --color-neutral-200: #d0d9cd;
  --color-neutral-300: #b0bfac;
  --color-neutral-400: #8a9e84;
  --color-neutral-500: #6b7c65;
  --color-neutral-600: #556059;
  --color-neutral-700: #424d3e;
  --color-neutral-800: #2e3629;
  --color-neutral-900: #1a1f17;
  --color-neutral-950: #0d1009;
}
```

### File `nuxt.config.ts` (thêm phần ui)

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],
  ui: {
    primary: 'primary',
    neutral: 'neutral',
  },
})
```

---

## 🎨 Hex → Tailwind / Nuxt UI Mapping

> Khi code, **KHÔNG hardcode hex**. Dùng class hoặc color prop tương ứng.

| Hex gốc | Tailwind class | Nuxt UI prop | Dùng ở đâu |
|---|---|---|---|
| `#2D5A27` | `bg-primary-500` | `color="primary"` | Header, button chính, FAB |
| `#1E3D1A` | `bg-primary-600` | — | Hover, header gradient bottom |
| `#4A7C42` | `bg-primary-400` | — | Active tab indicator |
| `#C8D9C0` | `bg-primary-100` | — | Map canvas background |
| `#9DB894` | `fill-primary-200` | — | Field rectangle (SVG) |
| `#6B9662` | `stroke-primary-300` | — | Field border (SVG) |
| `#FFFFFF` | `bg-white` / `text-white` | — | Card, modal, text trên xanh |
| `#F5F7F4` | `bg-neutral-50` | — | App background |
| `#E0E6DC` | `border-neutral-200` | — | Divider, input border |
| `#1A1A1A` | `text-neutral-900` | — | Tiêu đề, label chính |
| `#757575` | `text-neutral-500` | — | Sub-label, placeholder, meta |
| `#9E9E9E` | `text-neutral-400` | — | Inactive icon |
| `#BDBDBD` | `text-neutral-300` | — | Chevron, "—" no data |
| `#2979FF` | `text-blue-500` | `color="info"` | Water level value, Forgot link |
| `#FF6D00` | `bg-orange-500` | `color="warning"` | Offline badge |
| `#D32F2F` | `bg-red-700` | `color="error"` | DROPPED banner |
| `#4CAF50` | `bg-green-500` | `color="success"` | Baseline dot, progress fill |
| `#FF9800` | `bg-amber-500` | — | Water log dot |
| `#4A90D9` | `fill-blue-400` | — | Pipe dot (SVG) |
| `#E8F0FE` | `bg-blue-50` | — | Stepper background |
| `#1565C0` | `text-blue-800` | — | Stepper value |
| `#FFF8E1` | `bg-amber-50` | — | GPS warning box |
| `#FFB300` | `border-amber-400` | — | GPS warning border |

---

## 🧩 Nuxt UI Component Conventions

> Ưu tiên Nuxt UI component thay vì HTML thuần.

| Thay vì HTML thuần | Dùng Nuxt UI |
|---|---|
| `<button class="bg-primary-500">` | `<UButton color="primary" variant="solid">` |
| `<button class="border border-primary-500">` | `<UButton color="primary" variant="outline">` |
| `<button>` text-only | `<UButton color="primary" variant="ghost">` |
| `<input>` | `<UInput color="primary" />` |
| Badge `Offline` | `<UBadge color="warning" variant="solid">Offline</UBadge>` |
| Chip `Active` | `<UBadge color="success" variant="subtle">Active</UBadge>` |
| Chip `Continue` | `<UBadge color="neutral" variant="subtle">Continue</UBadge>` |
| Modal / Dialog | `<UModal>` |
| Bottom sheet (water level) | `<UDrawer>` (hoặc `<UModal>` fullscreen-bottom) |
| List separator | `<USeparator>` |
| Loading state | `<UButton loading>` / `<USkeleton>` |
| Checkbox | `<UCheckbox>` |
| Select field | `<USelectMenu>` |

### UButton variant map

| Thiết kế trong PNG | `variant` |
|---|---|
| Nền đặc (Sign in, Save Field, Save Pipe) | `solid` |
| Viền (Add Pipe) | `outline` |
| Text (Cancel, Forgot, header Save) | `ghost` |
| Disabled (Submit to Admin khi DROPPED) | `solid` + `:disabled="true"` + `color="neutral"` |

### FAB (Floating Action Button — custom)

```vue
<UButton
  icon="i-lucide-plus"
  color="primary"
  size="xl"
  class="fixed bottom-24 right-5 rounded-full shadow-lg z-40 size-14"
/>
```

### Bottom Navigation (custom — không có sẵn)

```vue
<nav class="fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 flex justify-around py-2 z-30">
  <UButton variant="ghost" :color="active === 'home' ? 'primary' : 'neutral'" ... />
  <!-- Home / Fields / Monitor / Logbook -->
</nav>
```

### Water Level Stepper (custom — không có sẵn)

Bọc trong `<div class="bg-blue-50 rounded-xl">` + 2 `<UButton icon variant="ghost">` (− / +) + số `text-blue-800 text-3xl font-bold`.

### Icon set

Nuxt UI dùng Iconify. Khuyến nghị `i-lucide-*`:
- Home: `i-lucide-home`
- Fields: `i-lucide-layout-grid`
- Monitor: `i-lucide-gauge`
- Logbook: `i-lucide-book-open`
- Add: `i-lucide-plus`
- Back: `i-lucide-chevron-left`
- Chevron: `i-lucide-chevron-right`
- Edit/note: `i-lucide-clipboard-list`
- Delete: `i-lucide-x`
- Calendar: `i-lucide-calendar`
