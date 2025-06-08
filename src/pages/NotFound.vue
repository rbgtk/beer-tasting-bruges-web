<!-- src/pages/NotFoundGuest.vue -->
<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-xl font-semibold">Beer Tasting Bruges</h1>
    </header>
    <main class="flex-grow flex flex-col items-center justify-center text-center">
      <h1 class="text-6xl font-bold mb-4">404</h1>
      <p class="text-2xl mb-4">Page not found.</p>
      <router-link to="/" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Go Home</router-link>
    </main>
    <footer class="bg-gray-800 text-white text-center p-4">
      <p>&copy; 2025 Beer Tasting Bruges</p>
    </footer>
  </div>
</template>
