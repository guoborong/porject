import Vue from 'vue'//接受manage里的四个vue
import Router from 'vue-router'
import password from '../views/manage/password.vue'
import studentManage from '../views/manage/studentManage.vue'
import teacherManage from '../views/manage/teacherManage.vue'
import classManage from '../views/manage/classManage.vue'
Vue.use(Router)

export default[
	{
		path: '/password',
		component: password
	},
	{
		path: '/studentManage',
		component: studentManage
	},
	{
		path: '/teacherManage',
		component: teacherManage
	},
	{
		path: '/classManage',
		component: classManage
	}
]

