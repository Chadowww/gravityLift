<script setup lang="ts">
// const colorMode = useColorMode()
const mobileMenuOpen = ref(false)
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
const subServices = [

]

const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = "translateY(-10px)"
}
const enter = (el, done) => {
  el.style.transition = "all 0.3s ease"
  el.style.opacity = 1
  el.style.transform = "translateY(0)"
  setTimeout(done, 300)
}
const leave = (el, done) => {
  el.style.transition = "all 0.2s ease"
  el.style.opacity = 0
  el.style.transform = "translateY(-10px)"
  setTimeout(done, 200)
}
</script>
<template>
  <header class="flex text-primary items-center justify-between px-6 py-4 border-bsticky top-0 shadow z-50 w-full">
    <h1>Header</h1>
  </header>
</template>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.3s ease;
}
.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>