<!-- src/pages/NotFoundAdmin.vue -->
<template>
  <div class="flex min-h-screen">
    <aside class="bg-gray-800 text-white w-64 p-4">
      <h1 class="text-xl font-semibold mb-6">Admin Dashboard</h1>
      <router-link to="/dashboard" class="hover:bg-gray-700 rounded px-3 py-2 block mb-2" active-class="bg-gray-700">
        Dashboard
      </router-link>
    </aside>
    <main class="flex-1 flex flex-col items-center justify-center text-center p-4">
      <h1 class="text-6xl font-bold mb-4">404</h1>
      <p class="text-2xl mb-4">This page does not exist.</p>
      <router-link to="/dashboard" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Go to Dashboard
      </router-link>
    </main>
  </div>
</template>
