import Vue from 'vue'//接受manage里的四个vue
import Router from 'vue-router'
import password from '../views/manage/password.vue'
import studentManage from '../views/manage/studentmanage.vue'
import teacherManage from '../views/manage/teachermanage.vue'
import classManage from '../views/manage/classmanage.vue'
import role from '../views/manage/role.vue'

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
	},
	{
		path: '/role',
		component: role
	}
]

