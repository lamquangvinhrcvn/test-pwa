# App Shell

## Purpose

Định nghĩa các component shell dùng chung cho toàn bộ UG AWD Monitor App: AppHeader (header xanh), BottomNav (4 tab navigation), và 2 layouts (default có nav, auth không nav).

## Requirements

### Requirement: AppHeader component
Hệ thống SHALL có component `AppHeader.vue` với background `bg-primary-500`, cung cấp 3 named slots: `#title`, `#back`, `#action`.

#### Scenario: Header chỉ có title
- **WHEN** page dùng `<AppHeader><template #title>Home</template></AppHeader>`
- **THEN** header hiển thị text "Home" căn giữa trên nền xanh, không có nút back hay action

#### Scenario: Header có title + back + action
- **WHEN** page dùng cả 3 slots: `#title` (text), `#back` (icon chevron-left), `#action` (nút Save)
- **THEN** header hiển thị nút back bên trái, title căn giữa, nút action bên phải

#### Scenario: Header dùng Nuxt UI color prop thay vì hardcode hex
- **WHEN** kiểm tra code AppHeader
- **THEN** không có `style="background: #2D5A27"` mà dùng class `bg-primary-500`

### Requirement: BottomNav component
Hệ thống SHALL có component `BottomNav.vue` với 4 tab: Home (`i-lucide-home`), Fields (`i-lucide-layout-grid`), Monitor (`i-lucide-gauge`), Logbook (`i-lucide-book-open`). Tab active hiển thị màu `primary`, tab inactive màu `neutral`. Dùng `UButton` variant `ghost`.

#### Scenario: Tab Home active
- **WHEN** current route là `/home`
- **THEN** icon `i-lucide-home` hiển thị màu primary, 3 icon còn lại màu neutral

#### Scenario: Tab Fields active
- **WHEN** current route là `/fields`
- **THEN** icon `i-lucide-layout-grid` hiển thị màu primary

#### Scenario: Click tab điều hướng
- **WHEN** user click tab Fields
- **THEN** app navigate đến `/fields`

#### Scenario: BottomNav fixed ở bottom
- **WHEN** page scroll dài
- **THEN** BottomNav vẫn cố định ở đáy màn hình với `fixed bottom-0`

### Requirement: Layout default
Hệ thống SHALL có layout `default.vue` bao gồm `<slot />` (page content) và `<BottomNav />`.

#### Scenario: Page dùng default layout có BottomNav
- **WHEN** page set `layout: 'default'`
- **THEN** page được render bên trên BottomNav cố định

### Requirement: Layout auth
Hệ thống SHALL có layout `auth.vue` chỉ chứa `<slot />`, không có BottomNav hay AppHeader.

#### Scenario: Page dùng auth layout không có nav
- **WHEN** page set `layout: 'auth'`
- **THEN** page render full-screen không có BottomNav
