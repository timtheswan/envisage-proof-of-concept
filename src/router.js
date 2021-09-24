import Vue from "vue";
import Router from "vue-router";

import Home from "./pages/Home.vue";
import Plan from "./pages/Plan.vue";
import Join from "./pages/Join.vue";
import Investor from "./pages/Investor.vue";
import Work from "./pages/Work.vue";



Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { name: "home-page", path: "/", component: Home },
    { name: "plan", path: "/plan", component: Plan },
    { name: "join", path: "/join", component: Join },
    { name: "investor", path: "/investor", component: Investor },
    { name: "work", path: "/work", component: Work },


    
  ]
});
