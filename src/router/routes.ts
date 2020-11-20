import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'Login' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/Login.vue'),
    meta: {
      noHeader: true,
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/usuarios/novo',
    name: 'CreateUser',
    component: () => import('@/pages/users/Create.vue'),
    meta: {
      noHeader: true,
    },
  },
  {
    path: '/projetos/novo',
    name: 'CreateProject',
    component: () => import('@/pages/projects/Create.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos/:projectId',
    name: 'ShowProject',
    component: () => import('@/pages/projects/Show.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos',
    name: 'IndexProject',
    component: () => import('@/pages/projects/Index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/organizacoes/novo',
    name: 'CreateOrganization',
    component: () => import('@/pages/organizations/Create.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/organizacoes',
    name: 'IndexOrganization',
    component: () => import('@/pages/organizations/Index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.Authenticated !== 'true') {
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
