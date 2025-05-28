<template>
  <div class="flex min-h-screen flex-col">
    <MainHeader />
    <main class="flex-1">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// useSeoMeta({
//   charset: 'utf-8',
//   viewport: 'width=device-width, initial-scale=1',
//   ogType: 'website',
//   ogLocale: 'fr_FR',
//   ogSiteName: 'Gravity Lift',
//   linkCanonical: `https://www.gravity-lift.fr${route.path === '/' ? '' : route.path}`,
// })

</script>