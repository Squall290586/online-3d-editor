import Vue from "vue";
import Router from "vue-router";
import Error404 from "@/components/Error404";
import SignIn from "@/components/SignIn";
import Editor from "@/components/Editor";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: SignIn
    },
    {
      path: "/editor",
      name: "editor",
      component: Editor,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/404",
      name: "404",
      component: Error404
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isAuthenticated) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
