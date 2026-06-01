# Screen 0-0: Login (ログイン画面)

## Mục đích
Màn hình đăng nhập đầu tiên của app. Người dùng nhập Monitor ID và Password để vào hệ thống.

---

## Layout tổng thể

```
┌─────────────────────────────┐
│  [Header — dark green]      │
│  ┌─────────────────────┐    │
│  │  ◑  (logo icon)     │    │
│  │  FAEGER AWD         │    │
│  │  Field Monitor      │    │
│  └─────────────────────┘    │
│                             │
│  Sign in                    │
│  Monitor IDとパスワードを入力  │
│                             │
│  Monitor ID                 │
│  [MON-2417          ]       │
│                             │
│  Password                   │
│  [••••••••••         ]      │
│                             │
│  [      Sign in      ]      │
│                             │
│  □ Remember me    Forgot?   │
│                             │
│  ─────── または ────────     │
│  オフラインもサインイン可能     │
│                             │
│  Privacy Policy · Terms     │
│                             │
│  v2.2.0                     │
└─────────────────────────────┘
```

---

## Màu sắc & Visual

| Element | Value |
|---|---|
| Toàn màn hình background | `#FFFFFF` |
| Header block (logo area) | `#2D5A27` (xanh lá đậm) |
| Logo icon shape | Hình tròn viền trắng, icon nửa trên/dưới (◑), size ~64px |
| App name "FAEGER AWD" | `#FFFFFF`, 20px, bold |
| Sub "Field Monitor" | `#FFFFFF`, 13px, regular |
| "Sign in" title | `#1A1A1A`, 24px, bold |
| Sub-instruction text | `#757575`, 13px |
| Input label | `#757575`, 12px |
| Input border | `#E0E6DC`, 1px, radius 8px |
| Input text | `#1A1A1A`, 15px |
| Sign in button | Background `#2D5A27`, text `#FFFFFF`, radius 12px, height 52px |
| Checkbox + label | `#757575`, 13px |
| "Forgot?" link | `#2979FF`, 13px |
| Divider line | `#E0E6DC` |
| Offline note | `#757575`, 12px, italic |
| Privacy/Terms | `#9E9E9E`, 11px |
| Version | `#BDBDBD`, 11px, bottom center |

---

## Components chi tiết

### Logo Block (Header)
- Background: `#2D5A27`
- Padding top: 48px (safe area), bottom: 32px
- Logo icon: SVG circle với nửa phải tô trắng, nửa trái viền trắng — gợi ý water sensor
- Tên app: `FAEGER AWD`, 20px bold, white, căn giữa
- Subtitle: `Field Monitor`, 13px, white 70% opacity, căn giữa

### Form Section
- Margin top: 32px
- Padding ngang: 24px

#### Monitor ID input
- Label: `Monitor ID`, 12px, #757575
- Placeholder / default value: `MON-2417`
- Type: text

#### Password input
- Label: `Password`
- Type: password (hiển thị dots)
- Trailing icon: eye toggle (optional)

### Sign in Button
- Width: 100%
- Background: `#2D5A27`
- Text: `Sign in`, white, 15px, semibold
- Border-radius: 12px
- Height: 52px
- Margin top: 24px

### Remember me + Forgot
- Row layout: checkbox + "Remember me" (left) / "Forgot?" link (right)
- Margin top: 16px

### Offline note
- Separator line với chữ "または" ở giữa
- Below: text "オフラインもサインイン可能", 12px, #757575

### Footer
- `Privacy Policy · Terms of Use`, 11px, center, #9E9E9E
- `v2.2.0`, 11px, center, #BDBDBD

---

## Nuxt / Vue Component

```
pages/
  index.vue         ← Login page
components/
  auth/
    LoginForm.vue
    LogoBlock.vue
```

### State
```ts
const monitorId = ref('MON-2417')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
```

### Events
- `onSubmit()` → validate → `navigateTo('/home')`
- `onForgot()` → show modal hoặc `navigateTo('/forgot')`

---

## Accessibility
- Input có `autocomplete="username"` và `autocomplete="current-password"`
- Button disabled khi `isLoading === true`
- Error state: viền input đỏ + message bên dưới
