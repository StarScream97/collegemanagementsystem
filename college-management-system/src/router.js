import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Signup from './views/Signup.vue'
import Dashboard from './views/Dashboard.vue'
import Teachers from './views/Teachers.vue'
import Students from './views/Students.vue'
import Posts from './views/Posts.vue'
import PendingRequests from './views/PendingRequests.vue'
import CreatePost from './views/CreatePost.vue'

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
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path:'/teachers',
      name:'teachers',
      component:Teachers
    },
    {
      path:'/students',
      name:'students',
      component:Students
    },
    {
      path:'/posts',
      name:'posts',
      component:Posts
    },
    {
      path:'/posts/create',
      name:'createpost',
      component:CreatePost
    },
    {
      path:'/pending',
      name:'pending',
      component:PendingRequests
    }
    ,
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
