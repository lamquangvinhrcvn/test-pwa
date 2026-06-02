import type { PipeReading, DailyReading, FieldOption, PipeContext } from '~/types/monitoring'

const fields = ref<FieldOption[]>([
  { id: 'A', name: 'Field A', area: 0.84, pipeCount: 2 },
  { id: 'B', name: 'Field B', area: 0.52, pipeCount: 2 },
  { id: 'C', name: 'Field C', area: 1.23, pipeCount: 3 },
])

const pipes = ref<PipeReading[]>([
  { pipeId: 'A-1', fieldId: 'A', fieldName: 'Field A', pipeName: 'Pipe A-1', latestLevel: 12, isPendingSync: false, note: 'Near road side' },
  { pipeId: 'A-2', fieldId: 'A', fieldName: 'Field A', pipeName: 'Pipe A-2', latestLevel: 14, isPendingSync: true },
  { pipeId: 'B-1', fieldId: 'B', fieldName: 'Field B', pipeName: 'Pipe B-1', latestLevel: 8, isPendingSync: false, note: 'Near main gate' },
  { pipeId: 'B-2', fieldId: 'B', fieldName: 'Field B', pipeName: 'Pipe B-2', latestLevel: null, isPendingSync: false },
  { pipeId: 'C-1', fieldId: 'C', fieldName: 'Field C', pipeName: 'Pipe C-1', latestLevel: 15, isPendingSync: true, note: 'Near pump house' },
  { pipeId: 'C-2', fieldId: 'C', fieldName: 'Field C', pipeName: 'Pipe C-2', latestLevel: 9, isPendingSync: false },
  { pipeId: 'C-3', fieldId: 'C', fieldName: 'Field C', pipeName: 'Pipe C-3', latestLevel: null, isPendingSync: false },
])

const today = new Date()
const fmt = (d: Date) => d.toISOString().slice(0, 10)

function makeReadings(pipeId: string): DailyReading[] {
  const list: DailyReading[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = fmt(d)
    const label = i === 0 ? 'Today' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    list.push({
      id: `${pipeId}-${dateStr}`,
      pipeId,
      date: dateStr,
      label,
      level: Math.floor(Math.random() * 20) + 1,
    })
  }
  return list
}

const allReadings: Record<string, DailyReading[]> = {
  'A-1': makeReadings('A-1'),
  'A-2': makeReadings('A-2'),
  'B-1': makeReadings('B-1'),
  'B-2': makeReadings('B-2'),
  'C-1': makeReadings('C-1'),
  'C-2': makeReadings('C-2'),
  'C-3': makeReadings('C-3'),
}

const isOffline = ref(false)

export const useMockData = () => {
  function getPipeReadings(pipeId: string): DailyReading[] {
    return allReadings[pipeId] ?? []
  }

  function getTodayLevel(pipeId: string): number | null {
    const readings = allReadings[pipeId]
    if (!readings || readings.length === 0) return null
    return readings[0].level
  }

  function getPipeContext(pipeId: string): PipeContext | null {
    const pipe = pipes.value.find(p => p.pipeId === pipeId)
    if (!pipe) return null
    return {
      id: pipe.pipeId,
      name: pipe.pipeName,
      fieldId: pipe.fieldId,
      fieldName: pipe.fieldName,
    }
  }

  function addReading(pipeId: string, level: number) {
    const readings = allReadings[pipeId]
    if (!readings) return
    const todayStr = fmt(today)
    const existing = readings.findIndex(r => r.date === todayStr)
    if (existing >= 0) {
      readings[existing].level = level
    } else {
      readings.unshift({
        id: `${pipeId}-${todayStr}`,
        pipeId,
        date: todayStr,
        label: 'Today',
        level,
      })
    }
    // Update pipe latestLevel
    const pipe = pipes.value.find(p => p.pipeId === pipeId)
    if (pipe) pipe.latestLevel = level
  }

  function deleteReading(pipeId: string, readingId: string) {
    const readings = allReadings[pipeId]
    if (!readings) return
    const idx = readings.findIndex(r => r.id === readingId)
    if (idx >= 0) readings.splice(idx, 1)
  }

  function toggleOffline() {
    isOffline.value = !isOffline.value
  }

  function getFieldById(id: string): FieldOption | undefined {
    return fields.find(f => f.id === id)
  }

  return {
    fields,
    pipes,
    isOffline,
    getPipeReadings,
    getTodayLevel,
    getPipeContext,
    addReading,
    deleteReading,
    toggleOffline,
    getFieldById,
  }
}
