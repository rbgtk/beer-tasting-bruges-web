import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '@/layouts/GuestLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import api from '@/axios'

const routes = [
  {
    path: '/',
    component: GuestLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/guest/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/pages/guest/About.vue'),
      },
      {
        path: 'legal',
        name: 'Legal',
        component: () => import('@/pages/guest/Legal.vue'),
      },
      {
        path: 'privacy',
        name: 'Privacy',
        component: () => import('@/pages/guest/Privacy.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/Login.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
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
        path: 'events/onetime',
        name: 'OneTimeEventsList',
        component: () => import('@/pages/admin/events/onetime/List.vue'),
      },
      {
        path: 'events/onetime/create',
        name: 'OneTimeEventCreate',
        component: () => import('@/pages/admin/events/onetime/Create.vue'),
      },
      {
        path: 'events/onetime/edit/:id',
        name: 'OneTimeEventEdit',
        component: () => import('@/pages/admin/events/onetime/Edit.vue'),
      },
      {
        path: 'events/recurring',
        name: 'RecurringEventsList',
        component: () => import('@/pages/admin/events/recurring/List.vue'),
      },
      {
        path: 'events/recurring/create',
        name: 'RecurringEventCreate',
        component: () => import('@/pages/admin/events/recurring/Create.vue'),
      },
      {
        path: 'events/recurring/edit/:id',
        name: 'RecurringEventEdit',
        component: () => import('@/pages/admin/events/recurring/Edit.vue'),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    beforeEnter: (to, from, next) => {
      api
        .get('/api/auth/me')
        .then(() => next({ name: 'NotFoundAdmin' }))
        .catch(() => next({ name: 'NotFoundGuest' }))
    },
  },
  {
    path: '/not-found',
    name: 'NotFoundGuest',
    component: () => import('@/pages/guest/NotFound.vue'),
  },
  {
    path: '/not-found-admin',
    name: 'NotFoundAdmin',
    component: () => import('@/pages/admin/NotFound.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    api
      .get('/api/auth/me')
      .then(() => next())
      .catch(() => next('/login'))
  } else {
    next()
  }
})

export default router
