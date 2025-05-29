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
          :x="scale(reser.posi)"
          :y="scale(beamData.haut - reser.haut) + offsetY"
          :width="scale(reser.long)"
          :height="scale(reser.haut)"
          fill="white"
          stroke="#ef4444"
          stroke-width="2"
          stroke-dasharray="4"
      >
        <title>Réservation</title>
      </rect>

      <!-- Rehausse -->
      <rect
          :x="scale(rehaus.posi)"
          :y="offsetY - scale(rehaus.haut)"
          :width="scale(rehaus.long)"
          :height="scale(rehaus.haut)"
          fill="#94a3b8"
      >
        <title>Rehausse</title>
      </rect>

      <!-- Centre de gravité -->
      <circle
          :cx="scale(centreGx)"
          :cy="scale(centreGy) + offsetY"
          r="5"
          fill="green"
      >
        <title>Centre de gravité</title>
      </circle>

      <!-- Ancres -->
      <circle
          :cx="scale(ancre1)"
          :cy="scale(beamData.haut + 5)"
          r="4"
          fill="black"
      >
        <title>Ancre 1</title>
      </circle>

      <circle
          :cx="scale(props.beamData.long - ancre2)"
          :cy="scale(beamData.haut + 5)"
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
const props = defineProps<{
  beamData: { long: number; haut: number }
  reser: { long: number; haut: number; posi: number }
  rehaus: { long: number; haut: number; posi: number }
  centreGx: number
  centreGy: number
  ancre1: number
  ancre2: number
}>()

// Définir une largeur maximum (en pixels) pour le rendu
const maxSvgWidth = 1000
const scaleFactor = maxSvgWidth / props.beamData.long

// Échelle dynamique
const scale = (val: number) => val * scaleFactor

const beamW = scale(props.beamData.long)
const beamH = scale(props.beamData.haut)
const marginTop = scale(props.rehaus.haut) + 20
const marginBottom = 40
const svgHeight = beamH + marginTop + marginBottom
const offsetY = marginTop

</script>
