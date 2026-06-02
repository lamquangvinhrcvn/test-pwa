<template>
  <div>
    <AppHeader>
      <template #back>
        <UButton
          icon="i-lucide-chevron-left"
          variant="ghost"
          class="text-white"
          @click="goBack"
        />
      </template>
      <template #title>New Pipe</template>
      <template #action>
        <UButton
          variant="ghost"
          class="text-white font-semibold"
          :disabled="!canSave"
          @click="onSave"
        >
          Save
        </UButton>
      </template>
    </AppHeader>

    <p class="px-4 py-1.5 text-neutral-500 text-[13px]">
      Add a new pipe to a field
    </p>

    <div class="px-4 mt-4 space-y-5">
      <!-- Pipe Name -->
      <div>
        <label class="block text-xs text-neutral-500 mb-1.5">Pipe Name</label>
        <UInput
          v-model="pipeName"
          color="primary"
          size="xl"
          class="w-full"
          :ui="{ base: 'px-3 py-3.5 text-base gap-2' }"
          placeholder="Pipe A-3"
        />
      </div>

      <!-- Monitoring Field -->
      <div>
        <label class="block text-xs text-neutral-500 mb-1.5">Monitoring Field</label>
        <USelectMenu
          v-model="selectedFieldId"
          :items="fieldItems"
          value-key="value"
          color="primary"
          size="xl"
          class="w-full"
          :ui="{ base: 'px-3 py-3.5 text-base gap-2' }"
          placeholder="Select a field"
        >
          <template #default>
            <div v-if="selectedField">
              <div class="text-neutral-900 text-[15px] font-medium">{{ selectedField.name }}</div>
              <div class="text-neutral-500 text-xs">
                {{ selectedField.area.toFixed(2) }} ha · {{ selectedField.pipeCount }} pipes
              </div>
            </div>
            <span v-else class="text-neutral-400">Select a field</span>
          </template>
          <template #item-label="{ item }">
            <span class="text-neutral-900 text-[15px] font-medium">{{ item.label }}</span>
          </template>
          <template #item-description="{ item }">
            <span class="text-neutral-500 text-xs">
              {{ item.area.toFixed(2) }} ha · {{ item.pipeCount }} pipes
            </span>
          </template>
        </USelectMenu>
      </div>

      <!-- Pipe Note -->
      <div>
        <label class="block text-xs text-neutral-500 mb-1.5">Pipe Note</label>
        <UInput
          v-model="pipeNote"
          color="primary"
          size="xl"
          class="w-full"
          :ui="{ base: 'px-3 py-3.5 text-base gap-2' }"
          placeholder="Near the inlet"
        />
      </div>

      <!-- GPS Warning -->
      <GpsWarningBox :visible="!gpsAvailable" />

      <!-- Save Pipe Button -->
      <UButton
        size="lg"
        block
        class="h-[52px] rounded-xl !bg-primary-500 hover:!bg-primary-600 text-white"
        :disabled="!canSave"
        @click="onSave"
      >
        Save Pipe
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const { fields } = useMockData()

const pipeName = ref('')
const pipeNote = ref('')
const selectedFieldId = ref(route.query.fieldId as string ?? 'A')
const gpsAvailable = ref(false)

const fieldItems = computed(() =>
  fields.value.map(f => ({
    label: f.name,
    value: f.id,
    area: f.area,
    pipeCount: f.pipeCount,
  }))
)

const selectedField = computed(() => {
  if (!selectedFieldId.value) return null
  return fields.value.find(f => f.id === selectedFieldId.value) ?? null
})

const canSave = computed(() => pipeName.value.length > 0 && selectedFieldId.value.length > 0)

function goBack() {
  if (selectedFieldId.value) {
    navigateTo(`/fields/${selectedFieldId.value}`)
  } else {
    navigateTo('/fields')
  }
}

function onSave() {
  if (!canSave.value) return
  navigateTo(`/fields/${selectedFieldId.value}`)
}
</script>
