## Context

Foundation setup đã hoàn thành — đã có `layout/auth.vue` (không nav), `design-tokens` (primary green, neutral gray), và Nuxt UI v3 đã được cấu hình. Login là màn hình đầu tiên người dùng thấy, dùng layout auth.

Màn hình login được định nghĩa chi tiết trong `openspec/specs/ui/01_screen-login.md`. Cần chuyển đặc tả UI thành code Nuxt/Vue với Nuxt UI components.

## Goals / Non-Goals

**Goals:**
- Tạo `pages/index.vue` dùng layout `auth`, render `LoginForm`
- Tạo `components/auth/LoginForm.vue` với đầy đủ: logo block, form inputs, sign in button, remember me, footer
- Submit form → `navigateTo('/home')`
- Dùng đúng Nuxt UI components (`UInput`, `UButton`, `UCheckbox`)
- Dùng đúng color tokens (không hardcode hex)

**Non-Goals:**
- Không implement authentication thật (API call, token storage)
- Không implement "Forgot password" flow
- Không implement offline login logic
- Không tạo `LogoBlock.vue` riêng — logo block là một phần của `LoginForm.vue` để tránh over-engineering

## Decisions

### Decision 1: Logo block nằm trong LoginForm, không tách component riêng

**Chọn:** Logo block là một `<div class="bg-primary-500">` bên trong `LoginForm.vue`.

**Lý do:** Logo block chỉ dùng một lần ở login, không tái sử dụng. Tách component riêng cho 1 div màu + text là over-engineering. Nếu sau này cần dùng lại, refactor sau.

**Đã cân nhắc:** Tạo `components/auth/LogoBlock.vue` như spec UI đề xuất — bác bỏ vì vi phạm nguyên tắc "no abstractions for single-use code".

### Decision 2: Logo icon dùng `i-lucide-droplets` thay vì SVG custom

**Chọn:** Dùng icon `i-lucide-droplets` (hoặc `i-lucide-circle-dot`) trong một `div` tròn viền trắng để thể hiện water sensor logo.

**Lý do:** Icon Lucide có sẵn trong Nuxt UI, không cần file SVG riêng. Icon `i-lucide-droplets` gợi ý water/sensor phù hợp với ngữ cảnh app.

### Decision 3: Form state local trong LoginForm, không Pinia store

**Chọn:** Dùng `ref()` local cho `monitorId`, `password`, `rememberMe`, `isLoading`.

**Lý do:** Auth state chưa có backend, chưa cần global store. Khi có backend auth, sẽ migrate lên `useAuth` composable.

### Decision 4: Submit → `navigateTo('/home')` trực tiếp

**Chọn:** Gọi `navigateTo('/home')` sau khi submit form (không validation ở bước này).

**Lý do:** Đây là UI scaffolding — chưa có auth service. Khi có backend, sẽ thêm `await $fetch('/api/login')` trước khi navigate.

## Risks / Trade-offs

- **Không có validation** → user có thể submit form trống. Mitigation: Sẽ thêm validation ở change sau khi có auth service thật.
- **Icon droplets có thể không khớp chính xác với design** → designer có thể muốn icon khác. Mitigation: Dễ đổi — chỉ cần thay `i-lucide-droplets` thành icon khác.
