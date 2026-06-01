## ADDED Requirements

### Requirement: Login page dùng auth layout
Page `pages/index.vue` SHALL sử dụng `layout: 'auth'` và render `<LoginForm />`.

#### Scenario: Truy cập route root
- **WHEN** user navigate đến `/`
- **THEN** trang login hiển thị full-screen không có BottomNav

### Requirement: Logo block với primary background
LoginForm SHALL có logo block trên cùng với `bg-primary-500`, chứa icon tròn viền trắng, text "FAEGER AWD" (20px bold white), và subtitle "Field Monitor" (13px white opacity-70).

#### Scenario: Logo block hiển thị
- **WHEN** user mở trang login
- **THEN** logo block xanh lá đậm hiển thị ở trên cùng với icon, app name, và subtitle

### Requirement: Monitor ID input
LoginForm SHALL có `UInput` label "Monitor ID" với default value `MON-2417`.

#### Scenario: Monitor ID có default value
- **WHEN** user mở form login
- **THEN** ô Monitor ID hiển thị sẵn giá trị `MON-2417`

### Requirement: Password input
LoginForm SHALL có `UInput` label "Password" với type `password`.

#### Scenario: Password bị ẩn khi nhập
- **WHEN** user nhập password
- **THEN** ký tự hiển thị dưới dạng dấu chấm

### Requirement: Sign in button
LoginForm SHALL có `UButton` "Sign in" với `color="primary"`, `variant="solid"`, full-width, height 52px, border-radius 12px. Khi click, gọi `navigateTo('/home')`.

#### Scenario: Click Sign in
- **WHEN** user click nút "Sign in"
- **THEN** app navigate đến `/home`

### Requirement: Remember me checkbox và Forgot link
LoginForm SHALL có row ngang chứa `UCheckbox` "Remember me" bên trái và `UButton` ghost "Forgot?" bên phải.

#### Scenario: Toggle Remember me
- **WHEN** user click checkbox "Remember me"
- **THEN** giá trị `rememberMe` toggle giữa `true` và `false`

### Requirement: Footer với Privacy/Terms và version
LoginForm SHALL có footer text "Privacy Policy · Terms of Use" (11px, neutral-400) và "v2.2.0" (11px, neutral-300).

#### Scenario: Footer hiển thị
- **WHEN** user scroll xuống cuối form
- **THEN** hiển thị Privacy Policy · Terms of Use và version v2.2.0

### Requirement: Không hardcode hex color
Toàn bộ LoginForm SHALL dùng Tailwind utility class hoặc Nuxt UI color prop — không hardcode mã hex.

#### Scenario: Kiểm tra code không có hex
- **WHEN** kiểm tra source code LoginForm
- **THEN** không có chuỗi `#2D5A27`, `#FFFFFF`, hay bất kỳ mã hex nào
