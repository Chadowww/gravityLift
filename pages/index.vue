<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-8">
    <h1 class="text-4xl font-bold text-blue-600 mb-4">
      GravityLift
    </h1>
    <p class="text-lg text-gray-700">
      Bienvenue sur l'application de calcul d’ancrage pour poutres en béton.
    </p>

    <NuxtLink
        to="/calcul"
        class="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
    >
      Accéder au calcul
    </NuxtLink>
  </div>
</template>


<style scoped>

</style>