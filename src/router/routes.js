
const routes = [
  {
    path: '/',
    component: () => import('layouts/FocusLayout.vue'),
    //component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HanziScroll.vue') },
      { path: 'hanzi', component: () => import('pages/HanziScroll.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
