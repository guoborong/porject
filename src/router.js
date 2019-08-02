import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'
import manage from './childroute/manage.js'//引入子路由
import testmodule from './childroute/testmodule.js'//引入子路由


Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/Home',
      name: 'Home',
      // route level code-splitting
      // this generates a separate chunk (Home.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue'),
	  children:[//子路由
	  ...manage,
	  ...testmodule
	  ]
    }
  ]
})
