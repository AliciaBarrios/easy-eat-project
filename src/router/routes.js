
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/AuthenticationPage.vue') },
      
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/PageLayout.vue'),
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
