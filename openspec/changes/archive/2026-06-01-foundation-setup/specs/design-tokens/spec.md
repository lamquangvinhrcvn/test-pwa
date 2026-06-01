## ADDED Requirements

### Requirement: Tailwind v4 theme với primary color palette
Hệ thống SHALL định nghĩa primary color palette (xanh lá) trong CSS `@theme` block, từ shade 50 đến 950, với `--color-primary-500` là `#2d5a27`.

#### Scenario: Primary color available as Tailwind class
- **WHEN** developer dùng class `bg-primary-500` trên một element
- **THEN** element có background color `#2d5a27`

#### Scenario: Nuxt UI nhận diện primary color
- **WHEN** developer dùng `<UButton color="primary">`
- **THEN** button có màu xanh lá `#2d5a27`

### Requirement: Tailwind v4 theme với neutral color palette
Hệ thống SHALL định nghĩa neutral color palette (xám xanh) trong CSS `@theme` block, từ shade 50 đến 950.

#### Scenario: Neutral color available as Tailwind class
- **WHEN** developer dùng class `text-neutral-500` trên một element
- **THEN** text có màu neutral-500

#### Scenario: Neutral được dùng làm màu nền app
- **WHEN** developer dùng class `bg-neutral-50`
- **THEN** background có màu `#f5f7f4` (surface-alt)

### Requirement: Nuxt UI theme configuration
`nuxt.config.ts` SHALL cấu hình `ui.primary` thành `'primary'` và `ui.neutral` thành `'neutral'` để Nuxt UI components nhận diện đúng token.

#### Scenario: Nuxt UI primary prop hoạt động
- **WHEN** bất kỳ Nuxt UI component nào dùng `color="primary"`
- **THEN** component render với màu từ `--color-primary-*` palette

### Requirement: Không hardcode hex color
Toàn bộ app SHALL sử dụng Tailwind utility class hoặc Nuxt UI color prop thay vì hardcode mã hex trong code.

#### Scenario: Header component dùng class thay vì hex
- **WHEN** code AppHeader background
- **THEN** dùng class `bg-primary-500`, không dùng `style="background: #2D5A27"`
