<template>
  <nav class="flex flex-col gap-2">
    <router-link to="/dashboard" class="hover:bg-gray-700 rounded px-3 py-2" exact-active-class="bg-gray-700">
      Dashboard
    </router-link>
    <router-link to="/dashboard/events" class="hover:bg-gray-700 rounded px-3 py-2" exact-active-class="bg-gray-700">
      Events
    </router-link>
    <router-link to="/dashboard/locations" class="hover:bg-gray-700 rounded px-3 py-2" exact-active-class="bg-gray-700">
      Locations
    </router-link>
    <router-link
      to="/dashboard/unavailabilities"
      class="hover:bg-gray-700 rounded px-3 py-2"
      exact-active-class="bg-gray-700"
    >
      Unavailabilities
    </router-link>
    <router-link
      to="/dashboard/announcements"
      class="hover:bg-gray-700 rounded px-3 py-2"
      exact-active-class="bg-gray-700"
    >
      Announcements
    </router-link>
    <router-link to="/" class="hover:bg-gray-700 rounded px-3 py-2" exact-active-class="bg-gray-700">
      View Site
    </router-link>
  </nav>
</template>
