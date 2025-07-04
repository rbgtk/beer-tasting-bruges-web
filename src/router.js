import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'

import AdminLayout from '@/layouts/AdminLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/public/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/pages/public/About.vue'),
      },
      {
        path: 'articles',
        name: 'Articles',
        component: () => import('@/pages/public/Articles.vue'),
      },
      {
        path: 'faq',
        name: 'FAQ',
        component: () => import('@/pages/public/FAQ.vue'),
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/pages/public/Contact.vue'),
      },
      {
        path: 'booking',
        name: 'Booking',
        component: () => import('@/pages/public/Booking.vue'),
      },
      {
        path: 'legal',
        name: 'Legal',
        component: () => import('@/pages/public/Legal.vue'),
      },
      {
        path: 'privacy',
        name: 'Privacy',
        component: () => import('@/pages/public/Privacy.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/public/Login.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFoundGuest',
        component: () => import('@/pages/public/NotFound.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: AdminLayout,
    meta: { requiresAuth: true, roles: ['ADMIN'] },
    children: [
      {
        path: 'bookings',
        name: 'ListBookings',
        component: () => import('@/pages/admin/bookings/List.vue'),
      },
      {
        path: 'services',
        name: 'ListServices',
        component: () => import('@/pages/admin/services/List.vue'),
      },
      {
        path: 'services/create',
        name: 'CreateService',
        component: () => import('@/pages/admin/services/Create.vue'),
      },
      {
        path: 'services/edit/:id',
        name: 'EditService',
        component: () => import('@/pages/admin/services/Edit.vue'),
      },
      {
        path: 'locations',
        name: 'ListLocations',
        component: () => import('@/pages/admin/locations/List.vue'),
      },
      {
        path: 'locations/create',
        name: 'CreateLocation',
        component: () => import('@/pages/admin/locations/Create.vue'),
      },
      {
        path: 'locations/edit/:id',
        name: 'EditLocation',
        component: () => import('@/pages/admin/locations/Edit.vue'),
      },
      {
        path: 'announcements',
        name: 'ListAnnouncements',
        component: () => import('@/pages/admin/announcements/List.vue'),
      },
      {
        path: 'announcements/create',
        name: 'CreateAnnouncement',
        component: () => import('@/pages/admin/announcements/Create.vue'),
      },
      {
        path: 'announcements/edit/:id',
        name: 'EditAnnouncement',
        component: () => import('@/pages/admin/announcements/Edit.vue'),
      },
      {
        path: 'unavailabilities',
        name: 'ListUnavailabilities',
        component: () => import('@/pages/admin/unavailabilities/List.vue'),
      },
      {
        path: 'unavailabilities/create',
        name: 'CreateUnavailability',
        component: () => import('@/pages/admin/unavailabilities/Create.vue'),
      },
      {
        path: 'unavailabilities/edit/:id',
        name: 'EditUnavailability',
        component: () => import('@/pages/admin/unavailabilities/Edit.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // 🔹 If the route requires authentication
  if (to.meta.requiresAuth) {
    // Ensure backend session is valid
    if (!authStore.user) {
      try {
        await authStore.fetchUser()
      } catch (error) {
        console.warn('Session invalid or expired, redirecting to login.')
        return next('/login')
      }
    }

    // 🔹 If the route requires specific roles
    if (to.meta.roles && to.meta.roles.length > 0) {
      const userRole = authStore.user?.role
      if (!to.meta.roles.includes(userRole)) {
        console.warn('User role does not have access to this page.')
        return next('/forbidden') // or wherever you handle "Access Denied"
      }
    }
  }

  // Otherwise, proceed!
  next()
})

export default router
