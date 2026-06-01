<script setup lang="ts">
import { liveQuery } from 'dexie'
import { db } from '~/composables/useDb'

const { addNote, syncPending, isSyncing, logs, isOnline } = useSyncQueue()

const noteText = ref('')
const notes = ref<any[]>([])

const pendingCount = computed(() => notes.value.filter(n => n.syncStatus === 'pending').length)
const syncedCount = computed(() => notes.value.filter(n => n.syncStatus === 'synced').length)

onMounted(() => {
  const subscription = liveQuery(() => db.notes.reverse().toArray())
    .subscribe(data => { notes.value = data })

  onUnmounted(() => subscription.unsubscribe())
})

const handleAdd = async () => {
  if (!noteText.value.trim()) return
  await addNote(noteText.value.trim())
  noteText.value = ''
}

const clearAll = async () => {
  await db.notes.clear()
}
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <!-- Status bar -->
    <div class="flex items-center gap-3 p-3 rounded-lg border mb-6">
      <span :class="['w-3 h-3 rounded-full', isOnline ? 'bg-green-500' : 'bg-red-500']" />
      <span class="font-medium">{{ isOnline ? 'Online' : 'Offline' }}</span>
      <span class="text-sm text-gray-500 ml-auto">
        {{ isOnline ? 'Kết nối bình thường' : 'Dữ liệu lưu local, sẽ sync khi có mạng' }}
      </span>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="p-4 rounded-lg border text-center">
        <div class="text-3xl font-medium text-amber-600">{{ pendingCount }}</div>
        <div class="text-sm text-gray-500 mt-1">Chờ đồng bộ</div>
      </div>
      <div class="p-4 rounded-lg border text-center">
        <div class="text-3xl font-medium text-green-600">{{ syncedCount }}</div>
        <div class="text-sm text-gray-500 mt-1">Đã đồng bộ</div>
      </div>
    </div>

    <!-- Input -->
    <div class="flex gap-2 mb-4">
      <input
        v-model="noteText"
        @keyup.enter="handleAdd"
        placeholder="Nhập ghi chú..."
        class="flex-1 px-3 py-2 border rounded-lg"
      />
      <button
        @click="handleAdd"
        class="px-4 py-2 bg-green-700 text-white rounded-lg"
      >
        Thêm
      </button>
      <button
        @click="syncPending"
        :disabled="!isOnline || isSyncing"
        class="px-4 py-2 border rounded-lg disabled:opacity-40"
      >
        {{ isSyncing ? 'Đang sync...' : 'Sync' }}
      </button>
      <button
        @click="clearAll"
        class="px-4 py-2 border rounded-lg text-red-600"
      >
        Xoá
      </button>
    </div>

    <!-- List -->
    <div class="flex flex-col gap-2 mb-4">
      <div
        v-for="note in notes"
        :key="note.id"
        class="flex items-center gap-3 px-3 py-2 rounded-lg border bg-gray-50"
      >
        <span class="flex-1 text-sm">{{ note.text }}</span>
        <span
          :class="['text-xs px-2 py-1 rounded-full',
            note.syncStatus === 'pending' ? 'bg-amber-100 text-amber-800' :
            note.syncStatus === 'synced'  ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800']"
        >
          {{ note.syncStatus }}
        </span>
      </div>

      <div v-if="notes.length === 0" class="text-sm text-gray-400 text-center py-6">
        Chưa có dữ liệu nào
      </div>
    </div>

    <!-- Logs -->
    <div class="bg-zinc-900 rounded-lg p-3 font-mono text-xs text-green-400 max-h-32 overflow-y-auto">
      <div v-for="(l, i) in logs" :key="i">{{ l }}</div>
      <div v-if="logs.length === 0" class="text-zinc-500">Chưa có log...</div>
    </div>
  </div>
</template>