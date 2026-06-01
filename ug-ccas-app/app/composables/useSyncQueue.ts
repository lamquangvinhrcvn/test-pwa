import { db } from './useDb'

export const useSyncQueue = () => {
  const { isOnline } = useOnlineStatus()
  const isSyncing = ref(false)
  const logs = ref<string[]>([])

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString()
    logs.value.push(`[${timestamp}] ${msg}`)
  }

  const addNote = async (text: string) => {
    await db.notes.add({
      text,
      syncStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    addLog(`Đã thêm: "${text}" → pending`)
  }

  const syncPending = async () => {
    if (!isOnline.value) {
      addLog('Không có mạng, bỏ qua sync')
      return
    }

    isSyncing.value = true
    addLog('Bắt đầu sync...')

    try {
      const pending = await db.notes.where('syncStatus').equals('pending').toArray()

      for (const note of pending) {
        // TODO: Gửi note lên server thật
        // await $fetch('/api/notes', { method: 'POST', body: note })

        await db.notes.update(note.id!, { syncStatus: 'synced', updatedAt: new Date().toISOString() })
        addLog(`Synced: "${note.text}"`)
      }

      addLog(`Sync hoàn tất — ${pending.length} notes`)
    } catch (e: any) {
      addLog(`Lỗi sync: ${e.message}`)
    } finally {
      isSyncing.value = false
    }
  }

  return { addNote, syncPending, isSyncing, logs, isOnline }
}
