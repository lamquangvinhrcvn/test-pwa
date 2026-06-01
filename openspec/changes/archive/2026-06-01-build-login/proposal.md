## Why

Màn hình login là entry point của app — người dùng nhập Monitor ID và Password để vào hệ thống. Đây là change thứ 2 trong lộ trình build, ngay sau foundation setup. Cần auth layout (đã có từ foundation) và form components để người dùng đăng nhập.

## What Changes

- **Tạo `pages/index.vue`** — page login dùng `layout: 'auth'`, render `<LoginForm />`
- **Tạo `components/auth/LoginForm.vue`** — form đăng nhập với logo block, Monitor ID, Password, Sign in button, Remember me, Forgot link, footer
- **Logo block** — background `bg-primary-500`, icon tròn, tên app "FAEGER AWD" + subtitle "Field Monitor"
- **Form fields** — `UInput` Monitor ID (default `MON-2417`), `UInput` Password type=password
- **Sign in button** — `UButton` color=primary variant=solid full-width, submit → `navigateTo('/home')`
- **Remember me + Forgot** — `UCheckbox` "Remember me" + `UButton` ghost "Forgot?"
- **Footer** — Privacy Policy · Terms of Use + v2.2.0

## Capabilities

### New Capabilities
- `login-screen`: Màn hình đăng nhập với form Monitor ID/Password, logo block, và điều hướng sau login

### Modified Capabilities
<!-- Không có capability hiện có nào bị thay đổi -->

## Impact

- `pages/index.vue` — file mới
- `components/auth/LoginForm.vue` — file mới
- Dùng layout `auth.vue` (đã có từ foundation)
- Dùng `UInput`, `UButton`, `UCheckbox` từ Nuxt UI v3
- Dùng color tokens `primary`, `neutral` từ `design-tokens`
