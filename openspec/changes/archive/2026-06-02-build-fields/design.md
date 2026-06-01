## Context

Foundation, login, và home đã hoàn thành. Fields là tab thứ 2 trong BottomNav, gồm 3 màn hình: danh sách fields (`/fields`), chi tiết field (`/fields/[id]`), và tạo mới (`/fields/new`). Các màn hình này dùng chung layout `default` (có BottomNav) và pattern AppHeader từ home.

## Goals / Non-Goals

**Goals:**
- Tạo `pages/fields/index.vue` với FieldMap (SVG có label text A/B/C), FieldListRow (tên + ha·pipes + chevron, không cm), FAB `+`
- Tạo `pages/fields/[id].vue` với AppHeader back + title động, FieldDetailMap (chỉ field đang xem), FieldInfoRow (name | area), PipeListRow ("Last: Xcm · timeago"), UButton outline "Add Pipe"
- Tạo `pages/fields/new.vue` với DrawableMap (tap thêm điểm, kéo góc, vẽ polygon), utils/geometry.ts (shoelace), UInput Field Name + Field Note, Area auto-calc read-only, Save Field button + header Save action
- Mock data 3 field (A, B, C) mỗi field có 2 pipes

**Non-Goals:**
- Không có data thật (mock data)
- Không có API integration (POST /api/fields chỉ mock)
- Không có Pinia store (sẽ thêm ở change sau)
- Không implement page `/pipes/new` (chỉ navigate đến đó với query param)
- FieldMap/FieldDetailMap vẫn là SVG readonly, DrawableMap mới là tương tác

## Decisions

### Decision 1: Tách FieldMap, FieldDetailMap, và DrawableMap thành 3 component riêng

**Chọn:** 3 component SVG map riêng biệt, không tái sử dụng chung 1 component.

- `FieldMap.vue` — cho Fields Top: viewBox lớn hơn (~350px), field rect có `<text>` label, pipe dots
- `FieldDetailMap.vue` — cho Field Detail: chỉ hiển thị field đang xem, không label text, pipe dots rải trong field
- `DrawableMap.vue` — cho New Field: tương tác tap-to-draw, drag handles, polygon preview

**Lý do:** Mỗi map có behavior khác nhau rõ rệt. Gom chung sẽ tạo component phức tạp với nhiều mode/flag. Theo YAGNI, tách riêng đơn giản hơn.

**Đã cân nhắc:** Dùng chung 1 `MapCanvas.vue` với props `mode` — nhưng sẽ phức tạp hóa component vốn đơn giản (MapCanvas chỉ có 55 dòng).

### Decision 2: FieldListRow dùng card style giống FieldPipeRow nhưng bỏ cm

**Chọn:** `FieldListRow.vue` mới, dùng card style `bg-white border border-neutral-200 rounded-2xl p-4`, flex row với tên field + sub info (ha·pipes) + chevron. KHÔNG hiển thị water level cm.

**Lý do:** Fields Top là màn overview danh sách, cm chỉ hiển thị ở Home (map overview) và Field Detail (per-pipe). Pattern card bo tròn đã dùng ở home → nhất quán.

### Decision 3: PipeListRow dùng USeparator thay vì card riêng

**Chọn:** PipeListRow render dạng flat row với USeparator giữa các pipe (giống FieldPipeRow ban đầu trước khi chuyển card).

**Lý do:** Pipes nằm trong 1 field, là sub-items của field. Dùng separator tạo cảm giác "cùng nhóm" hơn là card rời. Khác với FieldListRow nơi mỗi field là 1 entity độc lập.

**Đã cân nhắc:** Dùng card cho pipe — nhưng card lồng card trông nặng nề và không phân cấp rõ ràng.

### Decision 4: DrawableMap dùng SVG với event handling thủ công

**Chọn:** Dùng `<svg>` với `@click` để thêm điểm, `<circle>` draggable cho handles, `<polygon>` cho shape preview. Không dùng thư viện external.

**Lý do:** Yêu cầu đơn giản (vẽ rectangle 4 điểm, kéo góc). SVG native events đủ dùng. Thêm thư viện như `fabric.js` hay `konva` là overkill.

**Rủi ro:** Drag trên mobile có thể cần `@touchstart`/`@touchmove`/`@touchend` ngoài `@mousedown`/`@mousemove`/`@mouseup`.

### Decision 5: Shoelace formula trong utils/geometry.ts

**Chọn:** Hàm `polygonArea(points: Point[]): number` dùng Shoelace formula, trả về diện tích hectares. Scale factor: pixel² → hectares qua hằng số `PX2_PER_HA`.

**Lý do:** Shoelace là công thức chuẩn tính diện tích polygon từ tọa độ. Đơn giản, O(n). Scale factor được hardcode tạm cho mock data, sẽ thay bằng real-world calibration sau.

```ts
// Shoelace formula
export function polygonArea(pts: Point[]): number {
  let area = 0
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length
    area += pts[i].x * pts[j].y
    area -= pts[j].x * pts[i].y
  }
  return Math.abs(area) / 2
}

// Scale factor: 1 px² = 0.01 ha (tạm, cho mock)
const PX2_PER_HA = 0.01
export function pixelToHa(pxArea: number): number {
  return pxArea * PX2_PER_HA
}
```

### Decision 6: AppHeader pattern cho từng màn hình

**Chọn:**
- Fields Top: AppHeader title "Fields", không back, không action (màn tab root)
- Field Detail: AppHeader với `#back` slot (chevron-left) + `#title` = field name động, không action
- New Field: AppHeader với `#back` slot + `#title` = "New Field", `#action` = "Save" text button

**Lý do:** AppHeader đã có 3 named slots `#back`, `#title`, `#action`. Tận dụng triệt để.

### Decision 7: Mock data structure

**Chọn:** Mock data khai báo inline trong mỗi page (chưa dùng Pinia store), theo đúng data model từ type-system spec.

```ts
// Fields Top + Field Detail mock
interface MockField {
  id: string
  name: string
  area: number         // ha
  polygon: Point[]
  pipes: MockPipe[]
}
interface MockPipe {
  id: string
  lastLevel: number    // cm
  lastDate: string     // 'today', 'yesterday', '2 days ago'
}
```

**Lý do:** Mock data cứng trong page cho đến khi có Pinia store. Nhất quán với cách home screen đã làm.

## Risks / Trade-offs

- **Drag trên mobile** → Cần test kỹ touch events. Nếu SVG drag không mượt, fallback: dùng HTML div overlay với absolute positioning.
- **Scale factor diện tích** → Hardcode tạm `PX2_PER_HA = 0.01`. Khi có real-world data, cần calibrate lại dựa trên GPS tọa độ thực.
- **DrawableMap UX** → User có thể tap sai hoặc tap ít hơn 3 điểm. Cần validation `points.length >= 3` trước khi tính diện tích và enable Save.
- **Field label trong SVG** → `<text>` element cần `pointer-events: none` để không block click vào field rect.
