export const useOnlineStatus = () => {
  const isOnline = ref(import.meta.client ? navigator.onLine : true)
  const isChecking = ref(false)
  const isInitialCheckDone = ref(false)

  let _initialCheckDone = false

  // Active network check — thực sự gửi request để kiểm tra internet
  // navigator.onLine chỉ biết thiết bị có kết nối mạng (WiFi) hay không,
  // không biết mạng đó có internet thật không.
  // Khi load từ cache qua service worker, navigator.onLine vẫn true
  // dù đang offline → cần active check để phát hiện đúng.
  const checkNetwork = async () => {
    isChecking.value = true
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      // Tương lai sẽ ping vào API thực tế.
      await fetch(`/__health?_t=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      isOnline.value = true
    } catch {
      isOnline.value = false
    } finally {
      isChecking.value = false
      if (!_initialCheckDone) {
        _initialCheckDone = true
        isInitialCheckDone.value = true
      }
    }
  }

  const handleOnline = () => {
    // Khi browser báo online, verify bằng active check
    checkNetwork()
  }

  const handleOffline = () => {
    isOnline.value = false
  }

  if (import.meta.client) {
    onMounted(() => {
      // Chạy active check ngay khi mount để phát hiện offline
      // khi load từ cache (F5)
      checkNetwork()

      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)

      // Định kỳ check lại mỗi 60s
      const interval = setInterval(checkNetwork, 60_000)

      onUnmounted(() => {
        clearInterval(interval)
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
      })
    })
  }

  return { isOnline, isChecking, isInitialCheckDone, checkNetwork }
}