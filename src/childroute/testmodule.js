import Vue from 'vue'//接受testmodule里的四个vue
import Router from 'vue-router'
import arrangetest from '../views/testmodule/arrangetest.vue'
import Markexampapers from '../views/testmodule/Markexampapers.vue'
import Testinput from '../views/testmodule/Testinput.vue'
import Viewresults from '../views/testmodule/Viewresults.vue'
Vue.use(Router)

export default[
	{
		path: '/arrangetest',
		component: arrangetest
	},
	{
		path: '/Markexampapers',
		component: Markexampapers
	},
	{
		path: '/Testinput',
		component: Testinput
	},
	{
		path: '/Viewresults',
		component: Viewresults
	}
]