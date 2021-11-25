import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/partner',
    name: 'Partner',
    component: () =>
      import(/* webpackChunkName: "partner" */ '../views/Partner.vue'),
  },
  {
    path: '/program',
    name: 'Program',
    component: () =>
      import(/* webpackChunkName: "program" */ '../views/Program.vue'),
  },
  {
    path: '/private',
    name: 'Private',
    component: () =>
      import(/* webpackChunkName: "private" */ '../views/Private.vue'),
  },
  {
    path: '/wyif',
    name: 'WYIF',
    component: () => import(/* webpackChunkName: "wyif" */ '../views/Wyif.vue'),
  },
  {
    path: '/irc',
    name: 'IRC',
    component: () => import(/* webpackChunkName: "irc" */ '../views/IRC.vue'),
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () =>
      import(/* webpackChunkName: "forum" */ '../views/Forum.vue'),
  },
  {
    path: '/escap',
    name: 'Escap',
    component: () =>
      import(/* webpackChunkName: "escap" */ '../views/Escap.vue'),
  },
  {
    path: '/horizon',
    name: 'Horizon',
    component: () =>
      import(/* webpackChunkName: "horizon" */ '../views/Horizon.vue'),
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () =>
      import(/* webpackChunkName: "terms" */ '../views/Terms.vue'),
  },
  {
    path: '/soon',
    name: 'Soon',
    component: () => import(/* webpackChunkName: "soon" */ '../views/Soon.vue'),
  },
  {
    path: '/rating',
    name: 'Rating',
    component: () =>
      import(/* webpackChunkName: "rating" */ '../views/Rating.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
