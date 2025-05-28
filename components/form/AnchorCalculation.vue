<template>
  <div class="mt-8 p-4 bg-white rounded shadow">
    <h2 class="text-xl font-semibold mb-4">Position des ancres</h2>

    <div class="mb-4">
      <label class="block font-medium mb-1">Position de l’ancre 1 (cm)</label>
      <input
          v-model.number="ancre1"
          type="number"
          min="0"
          class="input"
          placeholder="Distance depuis le bord"
      />
    </div>

    <div v-if="centreGx !== null" class="text-gray-700">
      <p>Centre de gravité X : <strong>{{ centreGx.toFixed(2) }} cm</strong></p>
      <p v-if="ancre2 !== null">
        ➤ Position de l’ancre 2 : <strong>{{ ancre2.toFixed(2) }} cm</strong>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue: number
  centreGx: number | null
  poutreLong: number
}>()
const emit = defineEmits(['update:modelValue'])

const ancre1 = ref(props.modelValue)
watchEffect(() => {
  ancre1.value = props.modelValue
})
watch(ancre1, (val) => emit('update:modelValue', val))

const ancre2 = computed(() => {
  if (props.centreGx === null) return null
  return 2 * props.centreGx - ancre1.value
})
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
