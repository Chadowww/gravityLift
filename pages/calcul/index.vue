<script setup lang="ts">
import { ref, watch } from 'vue'

// Define interface for form submission data
interface FormSubmitData {
  poutreLong: number
  poutreHaut: number
  epais: number
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
}

// Unified beam data structure
const beamData = ref<null | {
  // Beam dimensions
  poutre: {
    long: number
    haut: number
    epais: number
  }
  // Reservation
  reser: {
    long: number
    haut: number
    epais: number
    posi: number
  }
  // Rehausse
  rehaus: {
    long: number
    haut: number
    epais: number
    posi: number
  }
  // Calculated values
  centreGx: number
  centreGy: number
  volumeTotal: number
  // Anchor positions
  ancre1: number
  ancre2: number
}>(null)

watch(() => beamData.value?.ancre1, (newAncre1) => {
  if (!beamData.value || newAncre1 === undefined) return
  beamData.value.ancre2 = beamData.value.centreGx - (beamData.value.poutre.long - newAncre1 - beamData.value.centreGx)
}, { immediate: true })

function handleFormSubmit(data: FormSubmitData) {
  beamData.value = {
    poutre: {
      long: data.poutreLong,
      haut: data.poutreHaut,
      epais: data.epais
    },
    reser: data.reser,
    rehaus: data.rehaus,
    centreGx: data.centreGx,
    centreGy: data.centreGy,
    volumeTotal: data.volumeTotal,
    ancre1: 0,
    ancre2: 0
  }

  if (beamData.value) {
    beamData.value.ancre2 = beamData.value.centreGx - (beamData.value.poutre.long - beamData.value.ancre1 - beamData.value.centreGx)
  }
}
</script>

<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <h1 class="text-2xl font-bold text-center mb-6">Calcul d’ancrage</h1>

    <FormBeamInputForm @submit="handleFormSubmit" />

    <FormAnchorCalculation
        v-if="beamData"
        v-model="beamData.ancre1"
        :beamData="beamData"
    />

    <VisualsBeamScene
        v-if="beamData"
        :beamData="beamData"
    />

    <VisualsBeamVisualizer
        v-if="beamData"
        :beamData="beamData"
    />
  </div>
</template>
