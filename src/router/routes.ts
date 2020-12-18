import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Dashboard',
        path: '',
        alias: 'complaints',
        component: () => import('pages/Index.vue'),
      },
      {
        name: 'AddComplaint',
        path: 'add-complaint',
        component: () => import('pages/AddComplaint.vue'),
      },
      {
        name: 'Auth',
        path: 'auth',
        component: () => import('pages/Auth.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
