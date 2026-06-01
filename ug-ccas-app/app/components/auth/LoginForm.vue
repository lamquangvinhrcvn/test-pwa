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
        <p class="text-neutral-500 text-sm mt-1">Monitor IDとパスワードを入力</p>

        <form class="mt-6 space-y-5" @submit.prevent="onSubmit">
          <!-- Monitor ID -->
          <div>
            <label class="block text-xs text-neutral-500 mb-1.5">Monitor ID</label>
            <UInput
              v-model="monitorId"
              color="primary"
              size="lg"
              class="w-full"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-xs text-neutral-500 mb-1.5">Password</label>
            <UInput
              v-model="password"
              type="password"
              color="primary"
              size="lg"
              class="w-full"
            />
          </div>

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
          <UButton variant="ghost" color="primary" size="sm">
            Forgot?
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
const password = ref('')
const rememberMe = ref(false)

function onSubmit() {
  navigateTo('/home')
}
</script>
