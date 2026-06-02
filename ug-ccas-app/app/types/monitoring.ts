export interface FieldOption {
  id: string
  name: string
  area: number
  pipeCount: number
}

export interface PipeReading {
  pipeId: string
  fieldId: string
  fieldName: string
  pipeName: string
  latestLevel: number | null
  isPendingSync: boolean
  note?: string
}

export interface DailyReading {
  id: string
  pipeId: string
  date: string
  label: string
  level: number
}

export interface PipeContext {
  id: string
  name: string
  fieldId: string
  fieldName: string
}
