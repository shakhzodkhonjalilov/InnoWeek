import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import middlewarePipeline from "../middleware/middlewarePipeline";
import auth from "../middleware/auth";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Auth.vue"),
  },
  {
    path: "/agreement/:id",
    name: "Agreement",
    component: () =>
      import(/* webpackChunkName: "agreement" */ "../views/Agreement.vue"),

    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/create",
    name: "Create",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Create.vue"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import(/* webpackChunkName: "edit" */ "../views/Edit.vue"),
    meta: {
      middleware: [auth],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "Auth") {
    return next();
  }

  const middleware = [auth];

  const context = {
    to,
    from,
    next,
    store,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
