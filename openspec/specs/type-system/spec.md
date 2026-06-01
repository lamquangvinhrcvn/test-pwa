# Type System

## Purpose

Định nghĩa toàn bộ TypeScript interfaces cho data model của UG AWD Monitor App: Field (khu vực), Pipe (ống), Reading (chỉ số nước), Point (tọa độ), SurveyItem (khảo sát).

## Requirements

### Requirement: Field interface
Hệ thống SHALL định nghĩa TypeScript interface `Field` với các thuộc tính: `id: string`, `name: string`, `area: number`, `note?: string`, `polygon: Point[]`, `pipeIds: string[]`.

#### Scenario: Field object hợp lệ
- **WHEN** tạo một object `{ id: 'A', name: 'Field A', area: 12.5, polygon: [{x: 10, y: 20}], pipeIds: ['A-1'] }`
- **THEN** TypeScript compiler không báo lỗi

#### Scenario: Field thiếu optional field
- **WHEN** tạo một object không có `note` (optional)
- **THEN** TypeScript compiler không báo lỗi

### Requirement: Pipe interface
Hệ thống SHALL định nghĩa TypeScript interface `Pipe` với các thuộc tính: `id: string`, `name: string`, `fieldId: string`, `note?: string`.

#### Scenario: Pipe object hợp lệ
- **WHEN** tạo một object `{ id: 'A-1', name: 'Pipe A-1', fieldId: 'A' }`
- **THEN** TypeScript compiler không báo lỗi

### Requirement: Reading interface
Hệ thống SHALL định nghĩa TypeScript interface `Reading` với các thuộc tính: `id: string`, `pipeId: string`, `date: string` (ISO date), `level: number` (cm), `syncedAt?: string` (null = chưa sync offline).

#### Scenario: Reading có syncedAt
- **WHEN** tạo Reading với `syncedAt: '2026-06-01T10:00:00Z'`
- **THEN** TypeScript compiler không báo lỗi

#### Scenario: Reading không có syncedAt (offline)
- **WHEN** tạo Reading không có `syncedAt`
- **THEN** TypeScript compiler không báo lỗi (optional field)

### Requirement: Point interface
Hệ thống SHALL định nghĩa TypeScript interface `Point` với `x: number` và `y: number` dùng cho tọa độ map.

#### Scenario: Point object hợp lệ
- **WHEN** tạo `{ x: 100, y: 200 }`
- **THEN** TypeScript compiler không báo lỗi

### Requirement: SurveyItem interface
Hệ thống SHALL định nghĩa TypeScript interface `SurveyItem` với `type: 'baseline' | 'endline' | 'waterlog'`, `label: string`, `completedDate?: string`, `status: 'completed' | 'pending' | 'skipped'`.

#### Scenario: SurveyItem với type baseline
- **WHEN** tạo `{ type: 'baseline', label: 'Baseline Survey #1', status: 'pending' }`
- **THEN** TypeScript compiler không báo lỗi

#### Scenario: SurveyItem với type không hợp lệ
- **WHEN** tạo SurveyItem với `type: 'invalid'`
- **THEN** TypeScript compiler báo lỗi (union type constraint)
