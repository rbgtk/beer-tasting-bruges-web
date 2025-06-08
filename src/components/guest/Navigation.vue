<!-- Navigation.vue -->
<template>
  <nav class="space-x-2">
    <router-link
      to="/"
      exact
      exact-active-class="bg-gray-700"
      class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    >
      Home
    </router-link>
    <router-link
      to="/about"
      exact
      exact-active-class="bg-gray-700"
      class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    >
      About
    </router-link>
    <router-link
      to="/posts"
      exact
      exact-active-class="bg-gray-700"
      class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    >
      Articles
    </router-link>
    <router-link
      to="/reservations"
      exact
      exact-active-class="bg-gray-700"
      class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    >
      Reservations
    </router-link>
  </nav>
</template>
