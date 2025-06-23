<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Column 1 -->
    <div>
      <!-- Welcome Section -->
      <section class="p-4 mb-8">
        <h1 class="text-2xl font-bold mb-4">Welcome</h1>

        <hr class="h-px mb-4 bg-gray-400 border-0" />

        <div class="text-gray-700">
          <p class="mb-2">
            … to our Bruges’ best beer tasting experience! We offer
            <b>two public</b>
            and a
            <b>private</b>
            beer tasting for you to enjoy:
          </p>
          <ul class="list-disc list-inside px-4 mb-2">
            <li>
              The first tasting is on Mondays and Fridays at 5:30 PM in the charming, picturesque setting of Resto Mojo
              and features a side of homemade tapas of local cheeses and meats.
            </li>
            <li>
              If you’re more of a night owl, and like to kick off the evening with our tasting, join us every day except
              Thursday at 8 PM in the iconic Bauhaus for another exciting session.
            </li>
          </ul>
          <p class="mb-2">
            Both tastings feature six distinct Belgian beers, each with its own unique flavor profile and story, all
            expertly explained by our knowledgeable guide.
          </p>
        </div>
      </section>

      <section class="p-4 mb-8">
        <h1 class="text-2xl font-bold mb-4">Reservations</h1>

        <hr class="h-px mb-4 bg-gray-400 border-0" />

        <div class="text-gray-700">
          <p class="mb-2">Join us for a public beer tasting and discover a world of flavors!</p>
          <p class="mb-2">
            Whether you’re coming solo or with friends, this is the perfect chance to explore new beers and meet fellow
            enthusiasts. Simply fill out the
            <router-link to="/booking" class="underline">booking form</router-link>
            to reserve your spot and get ready for a great time! The price for a beer tasting at Resto Mojo is
            <b>40 euros per person</b>
            , whereas the beer tasting at the Bauhaus is
            <b>31 euros per person</b>
            .
          </p>
        </div>
      </section>
    </div>

    <!-- Column 2 -->
    <div>
      <section class="p-4 mb-8">
        <h1 class="text-2xl font-bold mb-4">Tailor your experience</h1>

        <hr class="h-px mb-4 bg-gray-400 border-0" />

        <div class="text-gray-700">
          <p class="mb-2">
            If you’re interested in a custom or private tasting for a special occasion, such as a stag party or
            corporate event, feel free to reach out through our
            <router-link to="/contact" class="underline">contact form</router-link>
            .
            <b>Pricing for private tastings is custom</b>
            and depends on your specific request.
          </p>
        </div>
      </section>

      <section class="p-4 mb-8">
        <h1 class="text-2xl font-bold mb-4">Our Locations</h1>

        <hr class="h-px mb-4 bg-gray-400 border-0" />

        <div class="text-gray-700">
          <p class="mb-2">
            Find us at prime spots across Bruges. As we serve our tastings at different times and different locations,
            make sure to choose whichever bests fits your style.
          </p>
        </div>

        <Carousel
          v-if="locations.length > 0"
          :items="locations"
          :cardComponent="LocationCard"
          :navigation="false"
          :autoScroll="true"
          :autoScrollInterval="5000"
        />
      </section>
    </div>
  </div>

  <!-- Placeholder for Trustindex reviews -->
  <div class="text-center">
    <h2 class="text-2xl font-bold mb-4">What Our Customers Say</h2>
    <div id="trustindex-widget" data-widget-id="785f04447a0f7010b046ba5fd6e"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchLocations } from '@/services/locationService'
import Carousel from '@/components/Carousel.vue'
import LocationCard from '@/components/guest/LocationCard.vue'

const locations = ref([])

onMounted(async () => {
  locations.value = await fetchLocations()

  const div = document.getElementById('trustindex-widget')
  let script = document.createElement('script')
  script.src = 'https://cdn.trustindex.io/loader.js?785f04447a0f7010b046ba5fd6e'
  script.defer = true
  script.async = true
  div.appendChild(script)
})
</script>
