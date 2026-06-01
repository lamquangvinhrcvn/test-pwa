# Login Screen

## Purpose

Màn hình đăng nhập đầu tiên của app. Người dùng nhập Monitor ID và Password để vào hệ thống. Dùng layout `auth` (không BottomNav).

## Requirements

### Requirement: Login page dùng auth layout
Page `app/pages/index.vue` SHALL sử dụng `layout: 'auth'` và render `<AuthLoginForm />`.

#### Scenario: Truy cập route root
- **WHEN** user navigate đến `/`
- **THEN** trang login hiển thị full-screen không có BottomNav

### Requirement: Logo block với primary background
LoginForm SHALL có logo block trên cùng với `bg-primary-500`, chứa icon tròn viền trắng (`i-lucide-droplets`), text "FAEGER AWD" (20px bold white), và subtitle "Field Monitor" (13px white opacity-70).

#### Scenario: Logo block hiển thị
- **WHEN** user mở trang login
- **THEN** logo block xanh lá đậm hiển thị ở trên cùng với icon, app name, và subtitle

### Requirement: Monitor ID input
LoginForm SHALL có `<label>Monitor ID</label>` riêng dòng trên `<UInput>` với default value `MON-2417`, `color="primary"`.

#### Scenario: Monitor ID có default value
- **WHEN** user mở form login
- **THEN** ô Monitor ID hiển thị sẵn giá trị `MON-2417`

### Requirement: Password input
LoginForm SHALL có `<label>Password</label>` riêng dòng trên `<UInput>` với `type="password"`, `color="primary"`.

#### Scenario: Password bị ẩn khi nhập
- **WHEN** user nhập password
- **THEN** ký tự hiển thị dưới dạng dấu chấm

### Requirement: Khung border bọc form section
LoginForm SHALL có khung `border border-neutral-200 rounded-2xl` bọc toàn bộ phần form từ "Sign in" title đến hết "Forgot?" link.

#### Scenario: Khung form hiển thị
- **WHEN** user mở trang login
- **THEN** form section được bọc trong border card bo góc

### Requirement: Sign in button
LoginForm SHALL có `UButton` "Sign in" với `color="primary"`, `variant="solid"`, `block` (full-width), height 52px, `rounded-3xl`, `bg-primary-500`. Khi click, gọi `navigateTo('/home')`.

#### Scenario: Click Sign in
- **WHEN** user click nút "Sign in"
- **THEN** app navigate đến `/home`

### Requirement: Inputs responsive full-width
Các `UInput` Monitor ID và Password SHALL có `class="w-full"` để responsive ngang bằng với nút Sign in.

#### Scenario: Input full-width
- **WHEN** user xem form trên mọi kích thước màn hình
- **THEN** input và button đều rộng bằng nhau, không bị lệch

### Requirement: Remember me checkbox và Forgot link
LoginForm SHALL có row ngang chứa `UCheckbox` "Remember me" bên trái và `UButton` ghost "Forgot?" bên phải.

#### Scenario: Toggle Remember me
- **WHEN** user click checkbox "Remember me"
- **THEN** giá trị `rememberMe` toggle giữa `true` và `false`

### Requirement: Footer với Privacy/Terms và version
LoginForm SHALL có footer text "Privacy Policy · Terms of Use" (`text-xs text-neutral-400`) và "v2.2.0" (`text-xs text-neutral-300`).

#### Scenario: Footer hiển thị
- **WHEN** user scroll xuống cuối form
- **THEN** hiển thị Privacy Policy · Terms of Use và version v2.2.0

### Requirement: Không hardcode hex color
Toàn bộ LoginForm SHALL dùng Tailwind utility class hoặc Nuxt UI color prop — không hardcode mã hex.

#### Scenario: Kiểm tra code không có hex
- **WHEN** kiểm tra source code LoginForm
- **THEN** không có chuỗi `#2D5A27`, `#FFFFFF`, hay bất kỳ mã hex nào
