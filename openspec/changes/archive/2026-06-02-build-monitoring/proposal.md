## Why

The Monitoring tab, water level input, pipe detail, and new pipe screens are designed (see UI specs 06–09) but not yet implemented. These screens form the core monitoring workflow — viewing pipe water levels, entering readings, and managing pipes — which is the primary user interaction in the app.

## What Changes

- **New screen**: Monitoring page (`pages/monitor/index.vue`) — lists all pipes with latest water level readings, offline badge, and FAB
- **New component**: Water Level Dialog (`components/monitor/WaterLevelDialog.vue`) — bottom sheet/modal with date display, custom stepper for cm input, and save/cancel actions
- **New screen**: Pipe Detail page (`pages/monitor/[pipeId].vue`) — today's level summary, daily readings table with edit/delete, and FAB
- **New screen**: New Pipe page (`pages/pipes/new.vue`) — pipe name, field selector, note, GPS warning box, and save button
- **New reusable components**: PipeReadingRow, OfflineBadge, WaterLevelStepper, DailyReadingsTable, GpsWarningBox

## Capabilities

### New Capabilities

- `monitoring-screen`: Pipe list view with latest readings, offline indicator, no-data state, and FAB trigger for water level entry
- `water-level-dialog`: Bottom sheet/modal for entering water level with date display and custom stepper (± buttons, cm value)
- `pipe-detail`: Single pipe detail view with today's summary, daily readings table, edit/delete row actions, and FAB
- `new-pipe`: Pipe creation form with name, field selection (USelectMenu), optional note, GPS warning banner, and save

### Modified Capabilities

<!-- None — these are new screens, not modifying existing capabilities. -->

## Impact

- **New files**: `pages/monitor/index.vue`, `pages/monitor/[pipeId].vue`, `pages/pipes/new.vue`
- **New components**: `components/monitor/PipeReadingRow.vue`, `components/monitor/OfflineBadge.vue`, `components/monitor/WaterLevelDialog.vue`, `components/monitor/WaterLevelStepper.vue`, `components/monitor/DailyReadingsTable.vue`, `components/pipes/GpsWarningBox.vue`
- **Dependencies**: Nuxt UI v3 (UButton, UBadge, UModal/UDrawer, UInput, USelectMenu, USeparator), Tailwind v4 with design tokens from `00_design-tokens.md`
- **Routes**: `/monitor`, `/monitor/:pipeId`, `/pipes/new`
