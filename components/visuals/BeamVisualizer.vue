<template>
  <div class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-2xl shadow-md max-w-full overflow-x-auto">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Représentation de la poutre</h2>
    <svg
        :viewBox="`0 0 ${beamW} ${svgHeight}`"
        class="w-full h-auto bg-white rounded-lg border border-gray-300 px-8"
        preserveAspectRatio="xMidYMin meet"
    >
      <!-- Poutre principale -->
      <rect
          :y="offsetY"
          :width="beamW"
          :height="beamH"
          fill="#cbd5e1"
      >
        <title>Poutre</title>
      </rect>

      <!-- Réservation -->
      <rect
          :x="scale(props.beamData.reser.posi)"
          :y="scale(props.beamData.poutre.haut - props.beamData.reser.haut) + offsetY"
          :width="scale(props.beamData.reser.long)"
          :height="scale(props.beamData.reser.haut)"
          fill="white"
          stroke="#ef4444"
          stroke-width="2"
          stroke-dasharray="4"
      >
        <title>Réservation</title>
      </rect>

      <!-- Rehausse -->
      <rect
          :x="scale(props.beamData.rehaus.posi)"
          :y="offsetY - scale(props.beamData.rehaus.haut)"
          :width="scale(props.beamData.rehaus.long)"
          :height="scale(props.beamData.rehaus.haut)"
          fill="#94a3b8"
      >
        <title>Rehausse</title>
      </rect>

      <!-- Centre de gravité -->
      <circle
          :cx="scale(props.beamData.centreGx)"
          :cy="scale(props.beamData.centreGy) + offsetY"
          r="5"
          fill="green"
      >
        <title>Centre de gravité</title>
      </circle>

      <!-- Ancres -->
      <circle
          :cx="scale(props.beamData.ancre1)"
          :cy="scale(props.beamData.poutre.haut + 5)"
          r="4"
          fill="black"
      >
        <title>Ancre 1</title>
      </circle>

      <circle
          :cx="scale(props.beamData.poutre.long - props.beamData.ancre2)"
          :cy="scale(props.beamData.poutre.haut + 5)"
          r="4"
          fill="black"
      >
        <title>Ancre 2</title>
      </circle>
    </svg>
    <p class="text-sm text-gray-500 mt-3">Visualisation approximative à l’échelle avec rehausse, réservation et centre de gravité.</p>
  </div>
</template>

<script setup lang="ts">
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
  beamData: BeamData
}>()

// Définir une largeur maximum (en pixels) pour le rendu
const maxSvgWidth = 1000
const scaleFactor = maxSvgWidth / props.beamData.poutre.long

// Échelle dynamique
const scale = (val: number) => val * scaleFactor

const beamW = scale(props.beamData.poutre.long)
const beamH = scale(props.beamData.poutre.haut)
const marginTop = scale(props.beamData.rehaus.haut) + 20
const marginBottom = 40
const svgHeight = beamH + marginTop + marginBottom
const offsetY = marginTop

</script>
