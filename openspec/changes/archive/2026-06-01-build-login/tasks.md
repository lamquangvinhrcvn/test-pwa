## 1. Login Page

- [x] 1.1 Tạo `pages/index.vue`: set `layout: 'auth'`, render `<LoginForm />`, xóa nội dung cũ nếu có

## 2. LoginForm Component

- [x] 2.1 Tạo `components/auth/LoginForm.vue`: logo block `bg-primary-500` với icon tròn `i-lucide-droplets` viền trắng, text "FAEGER AWD" (`text-white text-xl font-bold`), subtitle "Field Monitor" (`text-white/70 text-sm`)
- [x] 2.2 Thêm "Sign in" section title (`text-neutral-900 text-2xl font-bold`) + sub-instruction text (`text-neutral-500 text-sm`)
- [x] 2.3 Thêm `UInput` Monitor ID với label, default value `MON-2417`, `color="primary"`
- [x] 2.4 Thêm `UInput` Password với label, `type="password"`, `color="primary"`
- [x] 2.5 Thêm `UButton` "Sign in" `color="primary" variant="solid"` full-width, rounded-xl, height 52px
- [x] 2.6 Thêm row `UCheckbox` "Remember me" + `UButton` ghost "Forgot?" (`color="primary"`)
- [x] 2.7 Thêm footer: Privacy Policy · Terms of Use (`text-xs text-neutral-400`) + v2.2.0 (`text-xs text-neutral-300`)

## 3. Form Submit

- [x] 3.1 Thêm `onSubmit` handler: gọi `navigateTo('/home')` khi submit form
