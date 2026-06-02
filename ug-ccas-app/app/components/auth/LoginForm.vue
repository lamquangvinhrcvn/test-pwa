<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Logo Block -->
    <div class="bg-primary-500 pt-12 pb-8 flex flex-col items-center">
      <div class="w-16 h-16 rounded-full border-2 border-white/40 flex items-center justify-center mb-4">
        <UIcon name="i-lucide-droplets" class="text-white size-8" />
      </div>
      <h1 class="text-white text-xl font-bold">FAEGER AWD</h1>
      <p class="text-white/70 text-sm mt-1">Field Monitor</p>
    </div>

    <!-- Form Section -->
    <div class="flex-1 px-4 mt-8">
      <div class="border border-neutral-200 rounded-2xl p-5">
        <h2 class="text-neutral-900 text-2xl font-bold">Sign in</h2>
        <p class="text-neutral-500 text-sm mt-1">Monitor ID</p>

        <form class="mt-6 space-y-5" @submit.prevent="onSubmit">
          <!-- Monitor ID -->
          <UFormField label="Monitor ID" :error="errors.monitorId ? errorMsg : undefined">
            <UInput
              v-model="monitorId"
              size="lg"
              :ui="{ base: 'px-3 py-3.5 text-base/5 gap-2' }"
              class="w-full"
              @input="clearErrors"
            />
          </UFormField>

          <!-- Password -->
          <UFormField label="Password" :error="errors.password ? errorMsg : undefined">
            <UInput
              v-model="password"
              type="password"
              size="lg"
              :ui="{ base: 'px-3 py-3.5 text-base/5 gap-2' }"
              class="w-full"
              @input="clearErrors"
            />
          </UFormField>

          <UButton
            type="submit"
            color="primary"
            variant="solid"
            size="lg"
            block
            class="mt-6 h-[52px] rounded-3xl bg-primary-500 hover:bg-primary-600"
          >
            Sign in
          </UButton>
        </form>

        <div class="flex items-center justify-between mt-4">
          <UCheckbox v-model="rememberMe" label="Remember me" color="primary" size="sm" />
          <UButton variant="ghost" color="primary" size="sm" @click="navigateTo('/sync-test')">
            Sync online/offline
          </UButton>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center pb-8 mt-auto">
      <p class="text-xs text-neutral-400">Privacy Policy · Terms of Use</p>
      <p class="text-xs text-neutral-300 mt-1">v2.2.0</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const monitorId = ref('MON-2417')
const password = ref('MON-2417')
const rememberMe = ref(false)
const errorMsg = ref<string | null>(null)
const errors = reactive({ monitorId: false, password: false })

function clearErrors() {
  errorMsg.value = null
  errors.monitorId = false
  errors.password = false
}

function onSubmit() {
  clearErrors()

  if (!monitorId.value.trim() && !password.value.trim()) {
    errorMsg.value = 'Please enter Monitor ID and password.'
    errors.monitorId = true
    errors.password = true
    return
  }

  if (!monitorId.value.trim()) {
    errorMsg.value = 'Please enter Monitor ID.'
    errors.monitorId = true
    return
  }

  if (!password.value.trim()) {
    errorMsg.value = 'Please enter password.'
    errors.password = true
    return
  }

  navigateTo('/home')
}
</script>
