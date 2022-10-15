
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/AuthenticationLayout.vue'),
    children: [
      { path: '/', name: 'landing', component: () => import('src/pages/LandingPage.vue') },
      { path: '/signin', name: 'signin', component: () => import('src/pages/SignInPage.vue') },
      { path: '/signup', name: 'signup', component: () => import('src/pages/SignUpPage.vue') },
    ]
  },
  {
    path: '/home',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('../pages/HomePage.vue') },
      { path: '/menu', name: 'menu', component: () => import('../pages/MenuPage.vue') },
      { path: '/despensa', name: 'despensa', component: () => import('../pages/DespensaPage.vue') },
      { path: '/recetario', name: 'recetario', component: () => import('../pages/RecetarioPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
