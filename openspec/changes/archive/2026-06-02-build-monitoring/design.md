## Context

Implementation of 4 monitoring screens per UI specs 06–09 and design tokens `00_design-tokens.md`. The app uses Nuxt 4 + Nuxt UI v3 + Tailwind v4. Existing auth, home, and field management screens are already built. These monitoring screens complete the core workflow: viewing pipe water levels, entering readings, and managing pipes.

## Goals / Non-Goals

**Goals:**
- Build `pages/monitor/index.vue` — pipe list with latest readings, offline badge, no-data states, FAB
- Build `components/monitor/WaterLevelDialog.vue` — water level entry with date display and custom stepper
- Build `pages/monitor/[pipeId].vue` — pipe detail with today summary and daily readings table
- Build `pages/pipes/new.vue` — pipe creation form with field selector and GPS warning
- All components use Nuxt UI v3 + Tailwind utility classes from `00_design-tokens.md` mapping
- No hardcoded hex colors

**Non-Goals:**
- Real API integration — use mock data like existing screens
- Offline/IndexedDB sync — offline state is visual only
- Date picker for date change — date is read-only "Today" for now
- Period selector functionality on pipe detail — show 30d static mock data
- GPS actual detection — GPS warning shows based on mock flag

## Decisions

### 1. Dialog: UModal vs UDrawer

**Decision**: Use `UDrawer` (bottom sheet) for WaterLevelDialog.

**Rationale**: The spec calls for a bottom-sheet style overlay that slides up from the bottom. `UDrawer` provides this natively. `UModal` could work with custom positioning but `UDrawer` is the more natural fit for a mobile-first water level entry UI.

### 2. Stepper: custom component, not Nuxt UI Stepper

**Decision**: Build `WaterLevelStepper.vue` as a custom component.

**Rationale**: Nuxt UI's built-in stepper is for multi-step wizard flows, not numeric ± increment/decrement. The water level stepper is a simple `[−] [value] cm [+]` row inside a `bg-blue-50 rounded-xl` container — trivial to build with two `UButton icon variant="ghost"` and a centered value display.

### 3. Pipe detail table: custom, not UTable

**Decision**: Build `DailyReadingsTable.vue` with custom rows, not Nuxt UI `UTable`.

**Rationale**: Each row has specific layout (date | cm | edit-icon | delete-icon) with custom styling. A simple flex/grid list is more maintainable than configuring UTable for this mobile-optimized layout.

### 4. Field selector: USelectMenu with custom display

**Decision**: Use `USelectMenu` for the Monitoring Field picker on New Pipe.

**Rationale**: `USelectMenu` supports custom option rendering (field name + sub-info like "0.64 ha · 2 pipes"), matching the spec's requirement for a tappable card-style selector.

### 5. File organization: flat components at root level

**Decision**: Place all shared components directly in `components/` (e.g., `components/PipeReadingRow.vue`), not nested under `components/monitor/` or `components/pipes/`.

**Rationale**: Follows existing convention — the project already uses flat component structure in `components/` (e.g., `FieldInfoRow.vue`, `PipeListRow.vue`). Nuxt auto-imports work the same regardless of nesting.

### 6. Mock data: centralized in composable

**Decision**: Define mock pipe/reading data in a composable `composables/useMockData.ts` shared across all monitoring screens.

**Rationale**: Multiple screens (monitor index, pipe detail) need the same pipe and reading data. A composable avoids duplication and keeps mock data consistent.

## Risks / Trade-offs

- **Stepper long-press repeat** → Not implemented in v1; user taps ± repeatedly. Can add `@pointerdown` repeat logic later.
- **Delete reading confirmation** → Not implemented in v1; delete button directly removes from mock array. Add confirmation dialog later.
- **Calendar date picker** → Deferred; date always "Today". The date row exists visually but is read-only.
- **Real GPS detection** → Mocked; GPS warning displays based on a ref flag. Real `navigator.geolocation` integration is future work.
