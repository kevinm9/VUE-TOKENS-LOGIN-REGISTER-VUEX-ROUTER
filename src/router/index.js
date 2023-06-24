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
      component: () => import("../components/TutorialsList.vue")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("../components/Tutorial.vue")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("../components/AddTutorial.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "Sign In" },
      component: () => import("../components/Login.vue")
    },
    {
      path: "/profile",
      name: "profile",
      //meta: { title: "profile", roles: ["SUPER_ADMIN","ADMIN"] },
      component: () => import("../components/Profile.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../components/Register.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../components/Dashboard.vue")
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("../components/Logout.vue")
    },
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

  const publicPages = ['/login', '/register', '/dashboard'];
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

