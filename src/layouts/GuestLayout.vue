<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-xl font-semibold">Beer Tasting Bruges</h1>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white text-center p-4">
      <p>&copy; 2025 Beer Tasting Bruges. All rights reserved.</p>
    </footer>
  </div>
</template>

