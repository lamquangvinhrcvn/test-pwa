<script setup lang="ts">
const { $pwa } = useNuxtApp()

const isOnline = ref(true) // SSR-safe default
onMounted(() => {
  isOnline.value = navigator.onLine
  window.addEventListener('online', () => (isOnline.value = true))
  window.addEventListener('offline', () => (isOnline.value = false))
})
</script>

<template>
  <UContainer class="py-8">
    <h1 class="text-3xl font-bold mb-4">Nuxt 4 PWA</h1>

    <!-- Trạng thái online/offline -->
    <div class="flex items-center gap-2 mb-4">
      <UBadge :color="isOnline ? 'success' : 'error'" variant="subtle">
        {{ isOnline ? 'Online' : 'Offline' }}
      </UBadge>
      <span class="text-sm text-gray-500">Trạng thái kết nối</span>
    </div>

    <!-- Install prompt -->
    <UCard v-if="$pwa?.showInstallPrompt && !$pwa?.isPWAInstalled" class="mb-4">
      <template #header>Cài đặt App</template>
      <UButton @click="$pwa?.install()">
        Cài đặt lên màn hình chính
      </UButton>
    </UCard>

    <!-- Đã cài -->
    <UCard v-if="$pwa?.isPWAInstalled" class="mb-4">
      <template #header>App đã được cài đặt</template>
      <p class="text-gray-600">PWA đã sẵn sàng trên thiết bị của bạn.</p>
    </UCard>

    <!-- Update banner -->
    <UCard v-if="$pwa?.needRefresh" class="mb-4">
      <template #header>Có phiên bản mới</template>
      <div class="flex gap-2">
        <UButton color="primary" @click="$pwa?.updateServiceWorker()">
          Cập nhật ngay
        </UButton>
        <UButton variant="ghost" @click="$pwa?.cancelPrompt()">
          Để sau
        </UButton>
      </div>
    </UCard>

    <!-- Offline ready -->
    <UCard v-if="$pwa?.offlineReady" class="mb-4">
      <template #header>Offline Ready</template>
      <p class="text-gray-600">App đã sẵn sàng hoạt động offline.</p>
    </UCard>

    <!-- Các nút test -->
    <div class="flex flex-wrap gap-2 mt-6">
      <UButton color="primary" size="lg">
        Primary Button
      </UButton>
      <UButton color="secondary" variant="outline" size="lg">
        Secondary
      </UButton>
      <UButton color="success" size="lg">
        Success
      </UButton>
      <UButton color="error" variant="soft" size="lg">
        Error
      </UButton>
    </div>
  </UContainer>
</template>
