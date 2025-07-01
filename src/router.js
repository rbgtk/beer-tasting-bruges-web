import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import GuestLayout from '@/layouts/GuestLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const routes = [
  {
    path: '/',
    component: GuestLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/pages/About.vue'),
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('@/pages/Posts.vue'),
      },
      {
        path: 'faq',
        name: 'FAQ',
        component: () => import('@/pages/FAQ.vue'),
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/pages/Contact.vue'),
      },
      {
        path: 'booking',
        name: 'Booking',
        component: () => import('@/pages/Booking.vue'),
      },
      {
        path: 'legal',
        name: 'Legal',
        component: () => import('@/pages/Legal.vue'),
      },
      {
        path: 'privacy',
        name: 'Privacy',
        component: () => import('@/pages/Privacy.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/Login.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFoundGuest',
        component: () => import('@/pages/NotFound.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true, roles: ['ADMIN'] },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/pages/admin/Dashboard.vue'),
      },
      {
        path: 'locations',
        name: 'LocationsList',
        component: () => import('@/pages/admin/locations/List.vue'),
      },
      {
        path: 'locations/create',
        name: 'LocationCreate',
        component: () => import('@/pages/admin/locations/Create.vue'),
      },
      {
        path: 'locations/edit/:id',
        name: 'LocationEdit',
        component: () => import('@/pages/admin/locations/Edit.vue'),
      },
      {
        path: 'events',
        name: 'EventsList',
        component: () => import('@/pages/admin/events/List.vue'),
      },
      {
        path: 'events/create',
        name: 'EventCreate',
        component: () => import('@/pages/admin/events/Create.vue'),
      },
      {
        path: 'events/edit/:id',
        name: 'EventEdit',
        component: () => import('@/pages/admin/events/Edit.vue'),
      },
      {
        path: 'unavailabilities',
        name: 'UnavailabilitiesList',
        component: () => import('@/pages/admin/unavailabilities/List.vue'),
      },
      {
        path: 'unavailabilities/create',
        name: 'UnavailabilityCreate',
        component: () => import('@/pages/admin/unavailabilities/Create.vue'),
      },
      {
        path: 'unavailabilities/edit/:id',
        name: 'UnavailabilityEdit',
        component: () => import('@/pages/admin/unavailabilities/Edit.vue'),
      },
      {
        path: 'announcements',
        name: 'AnnouncementsList',
        component: () => import('@/pages/admin/announcements/List.vue'),
      },
      {
        path: 'announcements/create',
        name: 'AnnouncementCreate',
        component: () => import('@/pages/admin/announcements/Create.vue'),
      },
      {
        path: 'announcements/edit/:id',
        name: 'AnnouncementEdit',
        component: () => import('@/pages/admin/announcements/Edit.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFoundAdmin',
        component: () => import('@/pages/admin/NotFound.vue'),
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
