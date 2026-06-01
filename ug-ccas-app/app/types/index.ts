export interface Point {
  x: number
  y: number
}

export interface Field {
  id: string // 'A', 'B', 'C'
  name: string // 'Field A'
  area: number // hectares
  note?: string
  polygon: Point[] // tọa độ vẽ trên map
  pipeIds: string[]
}

export interface Pipe {
  id: string // 'A-1', 'A-2'
  name: string // 'Pipe A-1'
  fieldId: string
  note?: string
}

export interface Reading {
  id: string
  pipeId: string
  date: string // ISO date
  level: number // cm
  syncedAt?: string // null = chưa sync (offline)
}

export interface SurveyItem {
  type: 'baseline' | 'endline' | 'waterlog'
  label: string
  completedDate?: string
  status: 'completed' | 'pending' | 'skipped'
}
