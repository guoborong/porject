import Vue from 'vue'
import Router from 'vue-router'
import logan from './views/logan.vue'
import manage from './childroute/manage.js'//引入子路由
import testmodule from './childroute/testmodule.js'//引入子路由


Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'logan',
      component: logan
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (home.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ './views/home.vue'),
	  children:[//子路由
	  ...manage,
	  ...testmodule
	  ]
    }
  ]
})
