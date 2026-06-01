<script setup lang="ts">
const { $pwa } = useNuxtApp()

const isOnline = ref(true)
const isStandalone = ref(false)
const swStatus = ref('đang kiểm tra...')

onMounted(() => {
  isOnline.value = navigator.onLine
  window.addEventListener('online', () => (isOnline.value = true))
  window.addEventListener('offline', () => (isOnline.value = false))

  // Kiểm tra PWA standalone mode
  isStandalone.value = window.matchMedia('(display-mode: standalone)').matches

  // Kiểm tra Service Worker status
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      if (registrations.length === 0) {
        swStatus.value = 'chưa đăng ký'
      } else {
        const sw = registrations[0]
        if (sw.active) {
          swStatus.value = `active (scope: ${sw.scope})`
        } else if (sw.installing) {
          swStatus.value = 'đang cài đặt...'
        } else if (sw.waiting) {
          swStatus.value = 'đang chờ kích hoạt'
        } else {
          swStatus.value = 'đã đăng ký'
        }
      }
    }).catch(() => {
      swStatus.value = 'lỗi truy cập SW'
    })
  } else {
    swStatus.value = 'trình duyệt không hỗ trợ'
  }
})
</script>

<template>
  <UContainer class="py-8">
    <h1 class="text-3xl font-bold mb-2">Nuxt 4 PWA</h1>
    <p class="text-gray-500 mb-6">@vite-pwa/nuxt + @nuxt/ui</p>

    <!-- Debug PWA Status -->
    <UCard class="mb-6">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-info" />
          <span>Trạng thái PWA</span>
        </div>
      </template>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <span class="text-xs text-gray-400 uppercase">Kết nối</span>
          <UBadge :color="isOnline ? 'success' : 'error'" variant="subtle" class="ml-2">
            {{ isOnline ? 'Online' : 'Offline' }}
          </UBadge>
        </div>

        <div>
          <span class="text-xs text-gray-400 uppercase">Service Worker</span>
          <UBadge
            :color="swStatus.includes('active') ? 'success' : 'warning'"
            variant="subtle"
            class="ml-2"
          >
            {{ swStatus }}
          </UBadge>
        </div>

        <div>
          <span class="text-xs text-gray-400 uppercase">Standalone</span>
          <UBadge :color="isStandalone ? 'success' : 'neutral'" variant="subtle" class="ml-2">
            {{ isStandalone ? 'Yes' : 'No' }}
          </UBadge>
        </div>

        <div>
          <span class="text-xs text-gray-400 uppercase">Cài đặt được</span>
          <UBadge
            :color="$pwa?.showInstallPrompt && !$pwa?.isPWAInstalled ? 'success' : 'neutral'"
            variant="subtle"
            class="ml-2"
          >
            {{ $pwa?.showInstallPrompt ? 'Yes' : 'No (chưa trigger BIP)' }}
          </UBadge>
        </div>

        <div>
          <span class="text-xs text-gray-400 uppercase">Đã cài PWA</span>
          <UBadge :color="$pwa?.isPWAInstalled ? 'success' : 'neutral'" variant="subtle" class="ml-2">
            {{ $pwa?.isPWAInstalled ? 'Yes' : 'No' }}
          </UBadge>
        </div>

        <div>
          <span class="text-xs text-gray-400 uppercase">Offline Ready</span>
          <UBadge :color="$pwa?.offlineReady ? 'success' : 'neutral'" variant="subtle" class="ml-2">
            {{ $pwa?.offlineReady ? 'Yes' : 'No' }}
          </UBadge>
        </div>
      </div>
    </UCard>

    <!-- Install prompt -->
    <UCard v-if="$pwa?.showInstallPrompt && !$pwa?.isPWAInstalled" class="mb-4" variant="soft">
      <template #header>📲 Cài đặt App</template>
      <p class="text-gray-600 mb-3">Cài app này lên màn hình chính để dùng offline.</p>
      <UButton color="primary" size="lg" @click="$pwa?.install()">
        Cài đặt lên màn hình chính
      </UButton>
    </UCard>

    <!-- Update banner -->
    <UCard v-if="$pwa?.needRefresh" class="mb-4" variant="soft">
      <template #header>🔄 Có phiên bản mới</template>
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
    <UCard v-if="$pwa?.offlineReady" class="mb-4" variant="soft">
      <template #header>✅ Offline Ready</template>
      <p class="text-gray-600">App đã cache xong, sẵn sàng dùng offline.</p>
    </UCard>

    <!-- Test buttons -->
    <UCard class="mb-6">
      <template #header>Nuxt UI Components</template>
      <div class="flex flex-wrap gap-2">
        <UButton color="primary" size="lg">Primary</UButton>
        <UButton color="secondary" variant="outline" size="lg">Secondary</UButton>
        <UButton color="success" size="lg">Success</UButton>
        <UButton color="error" variant="soft" size="lg">Error</UButton>
        <UButton color="warning" size="lg">Warning</UButton>
        <UButton color="info" variant="link" size="lg">Info Link</UButton>
      </div>
    </UCard>

    <p class="text-xs text-gray-400">
      PWA Service Worker: dev mode ({{ swStatus }}).
      Để test PWA đầy đủ, chạy <code>pnpm build && pnpm preview</code>.
    </p>
  </UContainer>
</template>
