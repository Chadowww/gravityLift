<template>
  <div class="mt-8 max-w-full overflow-x-auto">
    <h2 class="text-xl font-semibold mb-2">Représentation de la poutre</h2>
    <svg
        :viewBox="`0 0 ${beamW} ${svgHeight}`"
        class="w-full h-auto bg-gray-100 border border-gray-400"
        preserveAspectRatio="xMidYMin meet"
    >
      <!-- Poutre principale -->
      <rect :y="offsetY" :width="beamW" :height="beamH" fill="#cbd5e1" />

      <!-- Réservation -->x
      <rect
          :x="scale(reser.posi)"
          :y="scale(beamData.haut - reser.haut) + offsetY"
          :width="scale(reser.long)"
          :height="scale(reser.haut)"
          fill="white"
          stroke="red"
          stroke-dasharray="4"
      />

      <!-- Rehausse -->
      <rect
          :x="scale(rehaus.posi)"
          :y="offsetY - scale(rehaus.haut)"
          :width="scale(rehaus.long)"
          :height="scale(rehaus.haut)"
          fill="#94a3b8"
      />

      <!-- Centre de gravité -->
      <circle
          :cx="scale(centreGx)"
          :cy="scale(centreGy) + offsetY"
          r="4"
          fill="green"
      >
        <title>Centre de gravité</title>
      </circle>

      <!-- Ancres -->
      <circle
          :cx="scale(ancre1)"
          :cy="scale(beamData.haut + 5)"
          r="3"
          fill="black"
      >
        <title>Ancre 1</title>
      </circle>

      <circle
          :cx="scale(beamData.long - ancre2)"
          :cy="scale(beamData.haut + 5)"
          r="3"
          fill="black"
      >
        <title>Ancre 2</title>
      </circle>
    </svg>
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
