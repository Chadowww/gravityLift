<template>
  <div class="mt-8 p-6 bg-gray-50 rounded-2xl shadow-md border border-gray-200 max-w-xl mx-auto">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Position des ancres</h2>

    <div class="mb-6">
      <label class="block text-gray-700 font-medium mb-2">Position de l’ancre 1 (cm)</label>
      <input
          v-model.number="ancre1"
          type="number"
          min="0"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Distance depuis le bord"
      />
    </div>

    <div class="mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
      <h3 class="text-xl font-bold mb-2 text-green-800">✅ Résultats</h3>
      <p class="text-green-900">➤ Position de l'ancre 2 : <strong>{{ ancre2.toFixed(2) }} cm</strong></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Define the beam data type
interface BeamData {
  poutre: {
    long: number
    haut: number
    epais: number
  }
  reser: { 
    long: number
    haut: number
    epais: number
    posi: number 
  }
  rehaus: { 
    long: number
    haut: number
    epais: number
    posi: number 
  }
  centreGx: number
  centreGy: number
  volumeTotal: number
  ancre1: number
  ancre2: number
}

const props = defineProps<{
  modelValue: number
  beamData: BeamData
}>()
const emit = defineEmits(['update:modelValue'])

const ancre1 = ref(props.modelValue)
watchEffect(() => {
  ancre1.value = props.modelValue
})
watch(ancre1, (val) => emit('update:modelValue', val))

const ancre2 = computed(() => {
  return props.beamData.ancre2
})
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
