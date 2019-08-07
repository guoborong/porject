import Vue from 'vue'//接受testModule里的四个vue
import Router from 'vue-router'
import arrangetest from '@/views/testmodule/arrangetest.vue'
import markexampapers from '@/views/testmodule/Markexampapers.vue'
import testinput from '@/views/testmodule/Testinput.vue'
import papers from '@/views/testmodule/papers.vue'
import viewresults from '@/views/testmodule/Viewresults.vue'
Vue.use(Router)

export default[
	{
		path: '/arrangetest',
		component: arrangetest
	},
	{
		path: '/markexampapers',
		component: markexampapers
	},
	{
		path: '/papers',
		component: papers
	},
	{
		path: '/testinput',
		component: testinput
	},
	{
		path: '/viewresults',
		component: viewresults
	}
]