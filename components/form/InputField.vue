<template>
  <div class="flex flex-col">
    <label class="mb-1 font-medium text-sm">{{ label }}</label>
    <input
        :type="type"
        v-model="model"
        class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  type?: string
}>()

const model = defineModel<string | number>()
</script>
