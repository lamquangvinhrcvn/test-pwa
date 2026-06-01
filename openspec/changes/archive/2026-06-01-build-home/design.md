## Context

Foundation và Login đã hoàn thành. Home là màn hình chính đầu tiên dùng layout `default` (có BottomNav). Hiển thị 2 vùng chính: SVG map canvas (tổng quan field) và danh sách Fields & Pipes bên dưới.

## Goals / Non-Goals

**Goals:**
- Tạo `pages/home.vue` với AppHeader + map + danh sách fields
- SVG MapCanvas với field rectangles và pipe dots, tương tác tap được
- FieldPipeRow component hiển thị thông tin field trong list
- Mock data 4 fields
- Điều hướng: tap row → field detail, "See all" → fields list

**Non-Goals:**
- Không có data thật (mock data)
- Không có FAB (floating action button) — sẽ thêm ở change sau
- Không có MapCanvas tương tác vẽ (DrawableMap dành cho New Field)
- Không có chức năng Today badge (chỉ hiển thị static)

## Decisions

### Decision 1: SVG viewBox cố định, polygon từ mock data

**Chọn:** Dùng `<svg viewBox="0 0 300 200">` với polygon points được tính thủ công từ mock data.

**Lý do:** MapCanvas là readonly overview. Các field polygon sẽ được hardcode tọa độ trong mock data để tạo bố cục map hợp lý. Khi có data thật, polygon sẽ đến từ Field.polygon.

**Đã cân nhắc:** Tính toán auto-layout — quá phức tạp cho mock data.

### Decision 2: FieldPipeRow dùng USeparator thay vì border

**Chọn:** Dùng `<USeparator>` giữa các row để tạo đường kẻ phân cách.

**Lý do:** Convention từ design tokens — "List separator: `<USeparator>`". Component có sẵn, nhất quán với toàn app.

### Decision 3: MapCanvas emit 'field-tap' event, parent xử lý navigation

**Chọn:** MapCanvas emit `field-tap(id)` khi user click vào field rect. Home page listen event và gọi `navigateTo('/fields/'+id)`.

**Lý do:** Tách biệt presentation (SVG map) và navigation logic. MapCanvas không nên biết về routing.

### Decision 4: AppHeader dùng slot #title và #action

**Chọn:** `<AppHeader>` với `#title` = "Home", `#action` = Today badge (static "3 items").

**Lý do:** AppHeader đã có 3 named slots. Home dùng title center + action right.

## Risks / Trade-offs

- **SVG performance với nhiều polygon** → hiện tại chỉ 4 field, không đáng lo. Nếu scale lên 50+ field, cân nhắc Canvas thay SVG.
- **Mock data cứng** → cần cập nhật khi có real data source. Các change sau (fields CRUD) sẽ thay mock bằng Pinia store.
