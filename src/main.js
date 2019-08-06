import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
//axios.defaults.baseURL='http://192.168.1.188:12'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)


//设置路由守卫
// router.beforeEach((to, from, next) => {
// 	//console.log(to);
// 	//console.log(from);
// 	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
// 	console.log(to.meta.requireAuth)
// 		if (sessionStorage.getItem('userUid')) { //判断本地是否存在sessionStorage
// 			next();
// 		} else {
// 			next({
// 				path: '/',
// 				query: {
// 					redirect: location.hostname
// 				} //跳转到以前的路由
// 			})
// 		}
// 	} else {
// 		next();
// 	}
// 	/*如果本地 存在 sessionStorage 则 不允许直接跳转到 登录页面*/
// 	if (to.fullPath == "/") {
// 		if (sessionStorage.getItem('userUid')) {
// 			next({
// 				path: from.fullPath
// 			});
// 		} else {
// 			next();
// 		}
// 	}
// });


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

// axios request 拦截器
axios.interceptors.request.use(
	function(config) {
		// 拦截每次请求,携带token
		config.headers.Authorization = sessionStorage.getItem('token')

		return config
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

// 对返回的状态进行判断，比如token是否过期
axios.interceptors.response.use((res) => {
  // 对响应正确做处理
  return res
}, function(error) {
  // 对响应错误做点什么 token 已过期 页面如果有catch处理不会进来
  
  //获取状态码
  const {status} = error.response;
  if(status === 401) {
    failureToken();
  }
  // 重定向到登录页面
  //   router.replace({
  //     path: '/',
  //     query: {redirect: router.currentRoute.fullPath} 
  //   })
  return Promise.reject(error) 
})

// 全局前置路由守卫
router.beforeEach((to,from,next) => {
  const isLogin = sessionStorage.token ? true : false
  if(to.path === '/') {
    next()
  } else {
    isLogin ? next() : failureToken()
  }
})

// token失效提示
function failureToken(){
  //清除token
  Message.error("token失效,请重新登录,3秒后自动跳转");
  sessionStorage.removeItem('token');
  //重新登录，三秒后跳转
  setTimeout(function() {
    router.push('/')
  }, 3000);
}



