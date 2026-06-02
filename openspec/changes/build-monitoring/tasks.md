## 1. Mock Data & Shared Infrastructure

- [x] 1.1 Create `composables/useMockData.ts` with shared mock data: `pipes` (array of PipeReading), `readings` (array of DailyReading per pipe), `fields` (array for USelectMenu), `isOffline` flag
- [x] 1.2 Define TypeScript interfaces: `PipeReading`, `DailyReading`, `FieldOption` in `types/monitoring.ts`

## 2. Monitoring Page — Pipe List

- [x] 2.1 Create `components/PipeReadingRow.vue` — pipe name (bold 15px), field sub-label (grey 12px), water level value (22px bold `text-blue-500` + "cm"), no-data "—" (`text-neutral-300`), edit icon `i-lucide-clipboard-list` when pending, divider `border-b border-neutral-200`
- [x] 2.2 Create `components/OfflineBadge.vue` — `<UBadge color="warning" variant="solid">Offline</UBadge>`, shown when `isOffline` prop is true
- [x] 2.3 Create `app/pages/monitor/index.vue` — AppHeader "Monitoring", status row ("Today's readings" + OfflineBadge), pipe list using PipeReadingRow, FAB (`i-lucide-plus`, primary, bottom-right fixed)
- [x] 2.4 Wire FAB to open WaterLevelDialog (v-model pattern, pipe context from first pipe or global default)

## 3. Water Level Dialog

- [x] 3.1 Create `components/WaterLevelStepper.vue` — container `bg-blue-50 rounded-xl p-3`, `[−] [value text-blue-800 text-3xl font-bold] cm [+]`, UButton ghost for ±, v-model number, min 0 max 999
- [x] 3.2 Create `components/WaterLevelDialog.vue` — UDrawer bottom sheet, title "Enter Water Level" + subtitle "Pipe X · Field Y", date row with `i-lucide-calendar` + "Mon DD, YYYY (Today)", WaterLevelStepper, Cancel (ghost) + Save (primary solid), footer note italic, emit `save` with `{ pipeId, date, level }`
- [x] 3.3 Integrate WaterLevelDialog into monitoring page — open/close with v-model, handle `save` emit to update mock reading

## 4. Pipe Detail — History & Readings

- [x] 4.1 Create `components/DailyReadingsTable.vue` — header "Daily readings" + "30d" label, rows: date | cm value | `i-lucide-pencil` edit icon | `i-lucide-x` delete icon (`text-red-400`), divider between rows, emit `edit` and `delete` events
- [x] 4.2 Create `app/pages/monitor/[pipeId].vue` — AppHeader with back + pipe name title + `...` overflow menu, sub-header "Field X / Pipe X-X", Today summary (`text-blue-500 text-3xl font-bold` + "cm" or "No reading today"), DailyReadingsTable with mock data, FAB (opens WaterLevelDialog pre-filled)
- [x] 4.3 Wire edit/delete on DailyReadingsTable — edit opens WaterLevelDialog with date+value pre-filled, delete removes from mock array

## 5. New Pipe — Creation Form

- [x] 5.1 Create `components/GpsWarningBox.vue` — `bg-amber-50 border border-amber-400 rounded-lg p-3`, `i-lucide-triangle-alert text-amber-600`, warning text in Japanese (`text-amber-900 text-xs`), shown via `visible` prop
- [x] 5.2 Create `app/pages/pipes/new.vue` — AppHeader with back + "New Pipe" title + "Save" ghost action, sub-title "Add a new pipe to a field", UInput Pipe Name (xl, color="primary"), USelectMenu Monitoring Field (custom option: field name + "X ha · N pipes"), UInput Pipe Note (optional), GpsWarningBox (shown when GPS unavailable), UButton "Save Pipe" (primary solid, full-width, 52px, rounded-xl, disabled when invalid)
- [x] 5.3 Wire field pre-select from query param `?fieldId=X` on USelectMenu
- [x] 5.4 Wire save to navigate to `/fields/<fieldId>` on success (mock)

## 6. Verification

- [x] 6.1 Verify all pages use `layout: 'default'` and render within AppHeader + BottomNav
- [x] 6.2 Verify zero hardcoded hex colors — all styling via Tailwind utility classes or Nuxt UI color props
- [x] 6.3 Verify component auto-imports work (Nuxt auto-imports all components under `components/`)
- [x] 6.4 Verify mock data consistency — same pipe/reading data shared across monitor index and pipe detail
