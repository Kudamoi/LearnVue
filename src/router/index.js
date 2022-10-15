import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/pages/MainPage'),
  },
  {
    path: '/product/:id/',
    name: 'product',
    component: () => import('@/pages/ProductPage'),
  },
  {
    path: '/cart/',
    name: 'cart',
    component: () => import('@/pages/CartPage'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFoundPage',
    component: () => import('@/pages/NotFoundPage'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
