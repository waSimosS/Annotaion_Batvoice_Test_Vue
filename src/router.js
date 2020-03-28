import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      beforeEnter(to, from, next) {
        const loggedIn = localStorage.getItem("user");
        if (loggedIn) {
          next({
            name: "home"
          });
        } else next();
      }
    },

    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/Signup.vue")
    },
    {
      path: "/visualize",
      name: "visualize",

      component: () =>
        import(/* webpackChunkName: "visualize" */ "./views/VisualizeData.vue")
    }
  ]
});
