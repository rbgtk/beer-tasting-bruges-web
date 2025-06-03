<template>
  <header>
    <header-view />
  </header>
  
  <main>
    <router-view />
  </main>

  <footer>
    <footer-view />
  </footer>
</template>

<script setup lang="ts">
import HeaderView from '@/components/Header.vue'
import FooterView from '@/components/Footer.vue'
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
