<template>
  <form @submit.prevent="handleSubmit" class="space-y-8 max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">

    <fieldset class="bg-gray-50 p-5 rounded-xl shadow-sm">
      <legend class="text-2xl font-semibold mb-4 text-gray-800">Poutre</legend>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormInputField v-model.number="poutre.long" label="Longueur (cm)" />
        <FormInputField v-model.number="poutre.haut" label="Hauteur (cm)" />
        <FormInputField v-model.number="poutre.epais" label="Épaisseur (cm)" />
      </div>
    </fieldset>

    <fieldset class="bg-gray-50 p-5 rounded-xl shadow-sm">
      <legend class="text-2xl font-semibold mb-4 text-gray-800">Réservation</legend>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <FormInputField v-model.number="reser.long" label="Longueur (cm)" />
        <FormInputField v-model.number="reser.haut" label="Hauteur (cm)" />
        <FormInputField v-model.number="reser.epais" label="Épaisseur (cm)" />
        <FormInputField v-model.number="reser.posi" label="Position (cm)" />
      </div>
    </fieldset>

    <fieldset class="bg-gray-50 p-5 rounded-xl shadow-sm">
      <legend class="text-2xl font-semibold mb-4 text-gray-800">Rehausse</legend>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <FormInputField v-model.number="rehaus.long" label="Longueur (cm)" />
        <FormInputField v-model.number="rehaus.haut" label="Hauteur (cm)" />
        <FormInputField v-model.number="rehaus.epais" label="Épaisseur (cm)" />
        <FormInputField v-model.number="rehaus.posi" label="Position (cm)" />
      </div>
    </fieldset>

    <div class="text-center">
      <button
          type="submit"
          class="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
      >
        🚀 Calculer
      </button>
    </div>

    <div v-if="result" class="mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
      <h3 class="text-xl font-bold mb-2 text-green-800">✅ Résultats</h3>
      <p class="text-green-900">Volume total : {{ result.volumeTotal.toFixed(2) }} m³</p>
      <p class="text-green-900">Centre de gravité X : {{ result.centreGx.toFixed(2) }} cm</p>
      <p class="text-green-900">Centre de gravité Y : {{ result.centreGy.toFixed(2) }} cm</p>
    </div>

  </form>
</template>


<script setup lang="ts">
import { ref } from 'vue'

const poutre = ref({ long: 0, haut: 0, epais: 0 })
const reser = ref({ long: 0, haut: 0, epais: 0, posi: 0 })
const rehaus = ref({ long: 0, haut: 0, epais: 0, posi: 0 })
const emit = defineEmits(['submit'])
const result = ref<null | {
  volumeTotal: number
  centreGx: number
  centreGy: number
}>(null)

function handleSubmit() {
  const volume_Poutre = poutre.value.long * poutre.value.haut * poutre.value.epais
  const volume_Reser = reser.value.long * reser.value.haut * reser.value.epais
  const volume_Rehaus = rehaus.value.long * rehaus.value.haut * rehaus.value.epais

  const volumeTotal = volume_Poutre - volume_Reser + volume_Rehaus

  const surface1 = (poutre.value.long - reser.value.long) * poutre.value.haut
  const xg1 = (poutre.value.long - reser.value.long) / 2
  const yg1 = poutre.value.haut / 2
  const Sxg1 = surface1 * xg1
  const Syg1 = surface1 * yg1

  const surface2 = (poutre.value.haut - reser.value.haut) * reser.value.long
  const xg2 = reser.value.long / 2 + reser.value.posi
  const yg2 = (poutre.value.haut - reser.value.haut) / 2 + reser.value.haut
  const Sxg2 = surface2 * xg2
  const Syg2 = surface2 * yg2

  const surface3 = rehaus.value.haut * rehaus.value.long
  const xg3 = rehaus.value.long / 2 + rehaus.value.posi
  const yg3 = rehaus.value.haut / 2
  const Sxg3 = surface3 * xg3
  const Syg3 = surface3 * yg3

  const surfacei = surface1 - surface2 + surface3
  const xgi = Sxg1 - Sxg2 + Sxg3
  const ygi = Syg1 - Syg2 + Syg3

  const centreGx = xgi / surfacei
  const centreGy = ygi / surfacei

  result.value = {
    volumeTotal: volumeTotal / 1_000_000,
    centreGx,
    centreGy,
  }
  emit('submit', {
    volumeTotal: volumeTotal / 1_000_000,
    centreGx,
    centreGy,
    poutreLong: poutre.value.long,
    poutreHaut: poutre.value.haut,
    reser: reser.value,
    rehaus: rehaus.value,
  })
}

</script>
