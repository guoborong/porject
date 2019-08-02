<template>
	<div id="home">
		<div class="h-sidebar">
			<!-- 左侧侧边栏 -->
			<el-radio-group v-model="isCollapse" class='btn-top'>
				<el-radio-button :label="false">展开</el-radio-button>
				<el-radio-button :label="true">收起</el-radio-button>
			</el-radio-group>
			<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
			 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" v-for="(items,index) in lists" :key="items.index"
			 :index="'' + index">
				<!-- 多重for循环渲染 -->
				<el-submenu index="1">
					<template slot="title">
						<i v-bind:class="items.icon"></i>
						<span slot="title">{{items.title}}</span>
					</template>
					<el-menu-item-group v-for='(item,index) in items.arr' :key="item.index" :index="'' + index">
						<el-menu-item index="1-1" class="aciton" @click="clickMenu(item.text)">
							<router-link :to='{path: item.src}'>{{item.text}}</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</div>
		<div class='h-right'>
			<!-- 右边头部 -->
			<div class='h-top'>
				<span>后台</span>
				<el-dropdown class='top-r'>
					<span class="el-dropdown-link">
						我的<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>后台管理系统</el-dropdown-item>
						<el-dropdown-item>修改密码</el-dropdown-item>
						<el-dropdown-item>退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<!-- 菜单添加类 -->
			<div class="tab-menu">
				<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClickTab">
					<el-tab-pane :key="item.name" v-for="item in editableTabs" :label="item.title" :name="item.name">
						{{item.content}}
					</el-tab-pane>
				</el-tabs>
			</div>
			<div class="content">
				<router-view />
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				isCollapse: false, //打开状态
				editableTabsValue: '/',
				editableTabs: [{
					title: '首页',
					name: '/',
					content: '111'
				}],
				tabIndex: 1,
				openedTab: ["首页","教师管理","学生管理","班级管理","修改密码","老师出卷","试卷管理","安排考试","批阅试卷","查看成绩"],
				routers:["/","teacherManage","studentManage","classManage","password","testinput","papers","arrangetest","markexampapers","viewresults"],
				// 双重v-for循环格式
				lists: [{ //数组
						icon: "el-icon-s-comment",
						title: "基础数据",
						arr: [{
								'src': '/teacherManage',
								'text': '教师管理',
							},
							{
								'src': '/studentManage',
								'text': '学生管理',
							},
							{
								'src': '/classManage',
								'text': '班级管理',
							},
							{
								'src': '/password',
								'text': '修改密码',
							}
						]
					},
					{
						icon: "el-icon-s-promotion",
						title: "考试中心",
						arr: [{
								'src': '/testinput',
								'text': '老师出卷',
							},
							{
								'src': '/papers',
								'text': '试卷管理',
								"num": '2-2'
							},
							{
								'src': '/arrangetest',
								'text': '安排考试',
							},
							{
								'src': '/markexampapers',
								'text': '批阅试卷',
							},
							{
								'src': '/viewresults',
								'text': '查看成绩',
							}
						]
					}
				],
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			 clickMenu (componentName) {
				 var that = this
				 console.log(componentName)		//点击当前名称
				let indexa=that.openedTab.indexOf(componentName) 	//点击当前下标
				console.log(indexa)		
				that.$router.push(that.routers[indexa])		//跳路由
				that.editableTabsValue=that.routers[indexa]	
						//点击左边栏同步导航栏
					console.log(that.routers[indexa])						
					//如果没有导航信息则向editableTabs中加入	
				// if(indexa==-1){
					that.editableTabs.push(
					{title:componentName,
					name:that.routers[indexa],
					content:''},
					)
					// }
			 },
			handleClickTab(targetName) {
				console.log(targetName.label)		//查看页面名称
				var that=this
				let indexa=that.openedTab.indexOf(targetName.label)  //查看页面下标
				console.log(indexa)	
				 this.$router.push(that.routers[indexa])		//跳路由
				 
			},
			removeTab(targetName) {
				let tabs = this.editableTabs
				let activeName = this.editableTabsValue
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1]
							if (nextTab) {
								activeName = nextTab.name
							}
						}
					})
				}
				let deductIndex = this.openedTab.indexOf(targetName)
				this.openedTab.splice(deductIndex, 1)
				this.$router.push(activeName)
				this.editableTabsValue = activeName
				this.editableTabs = tabs.filter(tab => tab.name !== targetName)
				if (this.openedTab.length === 0) {
					this.$router.push('/Home')
				}
			}
		}
	}
</script>



<style scoped lang="less">
	#home {
		width: 100%;
	}

	a {
		margin: 0 5px;
		font-weight: bold;
		text-decoration: none;
		color: #fff;
	}

	.aciton {
		width: 100%;
	}

	.btn-top {
		width: 100%;
		background-color: #545c64;
	}

	.h-sidebar {
		float: left;
		width: 17%;
		height: 100vh;
		background-color: #545c64;
	}

	.h-right {
		width: 83%;
		height: 100vh;
		float: right;

		.h-top {
			background-color: #2D87C2;
			padding: 8px 0;
			font-size: 18px;
			font-weight: bold;
			color: #fff;
			display: relative;

			span {
				margin-left: 6px;
			}
		}
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 100%;
		min-height: 17px;
		background-color: #545c64;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #fff;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	/deep/ .el-radio-button__inner {
		background-color: #545c64;
		border-color: red;
		color: #79B900;
	}

	/deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
		background-color: #545c64;
		border-color: #79B900;
		color: #FF2424;
	}

	.top-r {
		display: absolute;
		left: 90%;
	}

	.el-icon-umbrella {
		color: red;
	}

	.el-radio-button__inner {}
</style>
