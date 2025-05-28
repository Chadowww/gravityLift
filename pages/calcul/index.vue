<script setup lang="ts">
const formResult = ref<null | {
  centreGx: number
  centreGy: number
  volumeTotal: number
  poutreLong: number
  poutreHaut: number
  reser: { long: number; haut: number; posi: number }
  rehaus: { long: number; haut: number; posi: number }
}>(null)

const ancre1 = ref(0)
const ancre2 = ref(0)

watch([formResult, ancre1], ([form, a1]) => {
  if (!form) return
  ancre2.value = 2 * form.centreGx - form.poutreLong + a1
})

function handleFormSubmit(data: any) {
  formResult.value = {
    centreGx: data.centreGx,
    centreGy: data.centreGy,
    volumeTotal: data.volumeTotal,
    poutreLong: data.poutreLong,
    poutreHaut: data.poutreHaut,
    reser: data.reser,
    rehaus: data.rehaus,
  }
}
</script>

<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <h1 class="text-2xl font-bold text-center mb-6">Calcul d’ancrage</h1>

    <FormBeamInputForm @submit="handleFormSubmit" />

    <FormAnchorCalculation
        v-if="formResult"
        v-model="ancre1"
        :centreGx="formResult.centreGx"
        :poutreLong="formResult.poutreLong"
    />

    <VisualsBeamVisualizer
        v-if="formResult"
        :beamData="{ long: formResult.poutreLong, haut: formResult.poutreHaut }"
        :reser="formResult.reser"
        :rehaus="formResult.rehaus"
        :centreGx="formResult.centreGx"
        :centreGy="formResult.centreGy"
        :ancre1="ancre1"
        :ancre2="ancre2"
    />
  </div>
</template>
