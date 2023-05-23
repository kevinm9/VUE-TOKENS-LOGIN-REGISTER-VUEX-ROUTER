import Vue from "vue";
import VueRouter  from "vue-router";
import store from "../store";
Vue.use(VueRouter);

//export const router = new Router({
//export default new Router({
  const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/tutorials",
      name: "tutorials",
      component: () => import("../components/TutorialsList")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("../components/Tutorial")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("../components/AddTutorial")
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "Sign In" },
      component: () => import("../components/Login")
    },
    {
      path: "/profile",
      name: "profile",
      //meta: { title: "profile", roles: ["SUPER_ADMIN","ADMIN"] },
      component: () => import("../components/Profile")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../components/Register")
    },
    {
      path: "/dashboard",
      alias: "dashboard",
      name: "dashboard",
      component: () => import("../components/Dashboard")
    }
  ]
});

export default router;

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  if (to.meta.title) {
    document.title = to.meta.title + " | SPA";
  } else {
    document.title = "SPA VUE";
  }

  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  //const rutaProtegida = to.matched.some(record => record.meta.requireAuth);
  if (authRequired && !store.state.auth.user?.token) {
    return next('/login');
  }

  if (to.path == '/login' && store.state.auth.user?.token) {
    return next('/');
  }

  if (to.meta.roles && !to.meta.roles.includes(store.state.auth.roles) && store.state.auth.user?.token) {
    return next('/tutorials');
  }

  next();
})

