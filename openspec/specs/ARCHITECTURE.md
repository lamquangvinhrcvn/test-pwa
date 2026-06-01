# UG AWD Monitor App — Kiến trúc dự án

> Đọc file này trước khi bắt đầu. Nó định nghĩa cấu trúc thư mục, routing, data model,
> và thứ tự build để OpenSpec vibe-code chính xác.

---

## 1. Stack

| Lớp | Công nghệ |
|---|---|
| Framework | Nuxt 4 |
| UI | Nuxt UI v3 (trên Tailwind v4) |
| PWA | @vite-pwa/nuxt |
| State | Pinia (hoặc useState của Nuxt) |
| Offline storage | IndexedDB (Dexie) đã có setup và chạy được ở file pages/sync-test.vue |
| Môi trường | Docker Compose (đã setup) |

---

## 2. Cấu trúc thư mục (mục tiêu sau khi build xong)

```
app/
├── app.vue                       # Root + <NuxtPwaAssets />
├── assets/
│   └── css/
│       └── main.css              # @theme màu (Tailwind v4)
├── layouts/
│   ├── default.vue               # Wrap page + BottomNav
│   └── auth.vue                  # Layout cho login (không có nav)
├── pages/
│   ├── index.vue                 # 0-0 Login
│   ├── home.vue                  # 1-1 Home
│   ├── fields/
│   │   ├── index.vue             # 2-1 Fields Top
│   │   ├── [id].vue              # 2-2 Field Detail
│   │   └── new.vue               # 2-3 New Field
│   ├── monitor/
│   │   ├── index.vue             # 3-1 Monitoring
│   │   └── [pipeId].vue          # 3-2 Pipe Detail
│   ├── pipes/
│   │   └── new.vue               # 3-3 New Pipe
│   └── logbook/
│       ├── index.vue             # 4-1 Logbook
│       └── [fieldId].vue         # 4-2 Logbook Field
├── components/
│   ├── BottomNav.vue
│   ├── AppHeader.vue             # Header xanh dùng chung
│   ├── auth/
│   │   └── LoginForm.vue
│   ├── map/
│   │   ├── MapCanvas.vue         # SVG map readonly
│   │   └── DrawableMap.vue       # SVG map vẽ được (New Field)
│   ├── fields/
│   │   ├── FieldPipeRow.vue
│   │   ├── FieldListRow.vue
│   │   └── PipeListRow.vue
│   ├── monitor/
│   │   ├── PipeReadingRow.vue
│   │   ├── WaterLevelDialog.vue
│   │   ├── WaterLevelStepper.vue
│   │   ├── OfflineBadge.vue
│   │   └── DailyReadingsTable.vue
│   └── logbook/
│       ├── DroppedBanner.vue
│       ├── FieldSurveyRow.vue
│       └── SurveyItemRow.vue
├── composables/
│   ├── useAuth.ts                # login state
│   ├── useFields.ts              # CRUD fields
│   ├── usePipes.ts               # CRUD pipes
│   ├── useReadings.ts            # water level readings + offline queue
│   └── useOfflineSync.ts         # sync IndexedDB ↔ server
├── stores/                       # nếu dùng Pinia
│   ├── fields.ts
│   ├── pipes.ts
│   └── readings.ts
├── types/
│   └── index.ts                  # interface Field, Pipe, Reading...
└── utils/
    └── geometry.ts               # tính diện tích polygon (New Field)
```

---

## 3. Data Model (types/index.ts)

```typescript
export interface Field {
  id: string                // 'A', 'B', 'C'
  name: string              // 'Field A'
  area: number              // hectares
  note?: string
  polygon: Point[]          // tọa độ vẽ trên map
  pipeIds: string[]
}

export interface Pipe {
  id: string                // 'A-1', 'A-2'
  name: string              // 'Pipe A-1'
  fieldId: string
  note?: string
}

export interface Reading {
  id: string
  pipeId: string
  date: string              // ISO date
  level: number             // cm
  syncedAt?: string         // null = chưa sync (offline)
}

export interface Point {
  x: number
  y: number
}

export interface SurveyItem {
  type: 'baseline' | 'endline' | 'waterlog'
  label: string
  completedDate?: string
  status: 'completed' | 'pending' | 'skipped'
}
```

---

## 4. Routing map

| Route | Screen | File |
|---|---|---|
| `/` | Login | `pages/index.vue` |
| `/home` | Home | `pages/home.vue` |
| `/fields` | Fields Top | `pages/fields/index.vue` |
| `/fields/[id]` | Field Detail | `pages/fields/[id].vue` |
| `/fields/new` | New Field | `pages/fields/new.vue` |
| `/monitor` | Monitoring | `pages/monitor/index.vue` |
| `/monitor/[pipeId]` | Pipe Detail | `pages/monitor/[pipeId].vue` |
| `/pipes/new` | New Pipe | `pages/pipes/new.vue` |
| `/logbook` | Logbook | `pages/logbook/index.vue` |
| `/logbook/[fieldId]` | Logbook Field | `pages/logbook/[fieldId].vue` |

---

## 5. Thứ tự build (QUAN TRỌNG)

Build theo thứ tự dependency — nền tảng trước, màn hình phức tạp sau.
Mỗi nhóm = 1 OpenSpec change.

```
┌─ change 1: foundation ────────────────────────┐
│  main.css (@theme), nuxt.config ui, types,    │
│  AppHeader, BottomNav, layouts                 │
└────────────────────────────────────────────────┘
            ↓
┌─ change 2: auth ──────────────────────────────┐
│  Login screen (pages/index.vue + LoginForm)    │
└────────────────────────────────────────────────┘
            ↓
┌─ change 3: home ──────────────────────────────┐
│  Home + MapCanvas + FieldPipeRow               │
└────────────────────────────────────────────────┘
            ↓
┌─ change 4: fields ────────────────────────────┐
│  Fields Top + Field Detail + New Field         │
│  (+ DrawableMap, geometry util)                │
└────────────────────────────────────────────────┘
            ↓
┌─ change 5: monitoring ────────────────────────┐
│  Monitoring + WaterLevelDialog + Stepper       │
│  + Pipe Detail + New Pipe                       │
└────────────────────────────────────────────────┘
            ↓
┌─ change 6: logbook ───────────────────────────┐
│  Logbook + Logbook Field + DroppedBanner       │
└────────────────────────────────────────────────┘
            ↓
┌─ change 7: offline-pwa ───────────────────────┐
│  IndexedDB queue, useOfflineSync, PWA polish   │
└────────────────────────────────────────────────┘
```

**Lý do:** Login/Home cần BottomNav + AppHeader trước. New Field cần geometry util. Monitoring cần data model của Pipe. Offline cần tất cả màn hình data xong.

---

## 6. Quy ước chung mọi màn hình

- Header xanh `bg-primary-500` qua `<AppHeader>` — không viết lại từng page
- Mọi page (trừ login) dùng `layout: 'default'` (có BottomNav)
- Login dùng `layout: 'auth'`
- Màu: chỉ dùng class/prop từ `00_design-tokens.md`, không hardcode hex
- Component Nuxt UI ưu tiên hơn HTML thuần
- Map = SVG (không canvas), tap event qua `@click`
