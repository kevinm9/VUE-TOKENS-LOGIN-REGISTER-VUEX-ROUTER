import Vue from "vue";
import VueRouter  from "vue-router";
import store from "../store";
Vue.use(VueRouter);

  const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/test',
      name: 'test',
      component: () => import("../components/PosVenta.vue")
    },
    {
      path: '/facturas',
      name: 'facturas',
      component: () => import("../views/Facturas.vue")
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import("../views/Showproducto.vue")
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartShop.vue")
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("../views/StoreShop.vue")
    },
    {
      path: "/formasdepagos",
      name: "formasdepagos",
      component: () => import("../views/Formasdepago.vue")
    },
    {
      path: "/productos",
      name: "productos",
      component: () => import("../views/Productos.vue")
    },
    {
      path: "/categorias",
      name: "categorias",
      component: () => import("../views/Categorias.vue")
    },
    {
      path: "/nuevacategoria",
      name: "nuevacategoria",
      component: () => import("../components/ModalFormCategorias.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "Sign In" },
      component: () => import("../views/Login.vue")
    },
    {
      path: "/profile",
      name: "profile",
      //meta: { title: "profile", roles: ["SUPER_ADMIN","ADMIN"] },
      component: () => import("../views/Profile.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue")
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
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue")
    },
    { path: '*', component: () => import("../views/Home.vue") },
  ]
});

export default router;

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   if (to.meta.title) {
//     document.title = to.meta.title + " | SPA";
//   } else {
//     document.title = "SPA VUE";
//   }

//   const publicPages = ['/login', '/register', '/productos', '/formasdepagos'];
//   const authRequired = !publicPages.includes(to.path);
//   //const rutaProtegida = to.matched.some(record => record.meta.requireAuth);
//   if (authRequired && !store.state.auth.user?.token) {
//     return next('/login');
//   }

//   if (to.path == '/login' && store.state.auth.user?.token) {
//     return next('/');
//   }

//   if (to.meta.roles && !to.meta.roles.includes(store.state.auth.roles) && store.state.auth.user?.token) {
//     return next('/tutorials');
//   }

//   next();
// })

