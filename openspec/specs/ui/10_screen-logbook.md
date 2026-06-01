# Screen 4-1: Logbook（不採用）— DROPPED State

## Mục đích
Tab Logbook hiển thị danh sách survey fields. Màn hình này ở trạng thái **DROPPED** — logbook bị không sử dụng/dropped, hiển thị banner cảnh báo đỏ lớn.

---

## Layout tổng thể

```
┌─────────────────────────────┐
│  [Header: "Logbook" — muted]│
│                             │
│  ⚠ [notification row — red] │
│     不採用のlogbook詳細...   │
│                             │
│  Fields                     │
│  ─────────────────────────  │
│  Field A                    │
│  [████ progress bar ████]   │        [Active]
│                             │
│  Field B                    │
│  [████ progress bar ████]   │       [Continue]
│                             │
│ ┌─────────────────────────┐ │
│ │      DROPPED            │ │  ← full-width red banner
│ │  Logbook機能は不採用と   │ │
│ │  なりました              │ │
│ └─────────────────────────┘ │
│                             │
│  Field D                    │
│  [████ progress bar ████]   │        [Active]
│ ─────────────────────────── │
│  [Home][Fields][Monitor][●Log]│
└─────────────────────────────┘
```

---

## Màu sắc & Visual

| Element | Value |
|---|---|
| Header background | `#2D5A27` (hoặc muted nếu dropped) |
| Header title "Logbook" | `#FFFFFF`, 18px, bold |
| Top notification row bg | `#FFEBEE` (light red) |
| Notification icon ⚠ | `#D32F2F` |
| Notification text | `#C62828`, 12px |
| "Fields" section header | `#1A1A1A`, 14px, semibold |
| Field name | `#1A1A1A`, 15px, medium |
| Progress bar track | `#E0E6DC` |
| Progress bar fill | `#4CAF50` hoặc gradient green |
| Progress bar height | 6px, radius 3px |
| "Active" chip | `#E8F5E9` bg, `#2E7D32` text, 11px, radius 6px |
| "Continue" chip | `#F5F5F5` bg, `#757575` text, 11px, radius 6px |
| **DROPPED banner** | `#D32F2F` bg (solid dark red), full width |
| DROPPED text | `#FFFFFF`, 28px, black/900 weight |
| Sub text "Logbook機能..." | `#FFFFFF`, 12px, regular |
| DROPPED banner height | ~80px |

---

## Components chi tiết

### Header
- "Logbook" title
- No back button (root tab)

### Notification Row (top)
- Warning icon + text về trạng thái dropped
- Background: `#FFEBEE`, border bottom `#FFCDD2`
- Text: nhỏ, 12px, đỏ

### Fields List
- Section header: "Fields"
- Mỗi field:

```
[Field Name]                  [Status chip]
[━━━━━━━━━━━ progress ━━━━━━]
```

- Field name: 15px medium
- Progress bar: full-width, 6px height, màu xanh lá
- Status chip: "Active" (xanh) hoặc "Continue" (xám)

### DROPPED Banner (inline trong list)
- **Full-width** red block xen giữa danh sách fields
- Chữ "DROPPED": 28px, 900 weight, trắng, uppercase
- Sub: "Logbook機能は不採用となりました", 12px, trắng
- Padding: 16px vertical
- Không có action/button

---

## Notes về ý nghĩa "DROPPED"

DROPPED banner xuất hiện giữa danh sách, ám chỉ rằng một số fields (Field C, D...) đã bị dropped khỏi chương trình logbook. Fields phía trên banner = active/continue. Fields phía dưới banner = dropped/excluded.

---

## Nuxt / Vue Component

```
pages/
  logbook/
    index.vue
components/
  logbook/
    FieldSurveyRow.vue
    DroppedBanner.vue
    NotificationBar.vue
```

### Data
```ts
interface SurveyField {
  fieldId: string
  fieldName: string
  progress: number        // 0–100
  status: 'active' | 'continue' | 'dropped' | 'submitted'
}

// Render logic:
// - Nhóm fields: active/continue trước, dropped sau
// - Insert <DroppedBanner> trước first dropped field
```
