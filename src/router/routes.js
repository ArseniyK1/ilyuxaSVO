const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),

    children: [
      { path: '', component: () => import('pages/MainPage.vue') },
      { path: 'reports', component: () => import('pages/ReportsPage.vue') },
      { path: 'admin', component: () => import('pages/AdminPage.vue') },
      { path: 'lpr', component: () => import('pages/LprPage.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/LoginPage.vue'), name: 'Login' },
      { path: 'register', component: () => import('pages/RegisterPage.vue'), name: 'Register' }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: '/',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
