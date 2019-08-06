<template>
	<div id="home">
		<div class="h-sidebar">
			<!-- 左侧侧边栏 -->
			<div class="menu-item-wrapper">
				<i @click="showHidden" class="el-icon-sunny" id="icon1"></i>
				<i @click="showHidden" class="el-icon-moon" id="icon2" style="display: none;"></i>
			</div>
			<!-- :default-active="$route.path"双向绑定 -->
			<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
			 :default-openeds="['1','2']" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
			 v-for="(item,index) in lists" :key="item.name" router>
				<!-- router用于跳路由 -->
				<!-- 多重for循环渲染 -->
				<el-submenu :index="++index+'' ">
					<template slot="title" class='el-submenu is-active is-opened'>
						<i v-bind:class="item.icon"></i>
						<span slot="title">{{item.title}}</span>
					</template>
					<el-menu-item-group v-for='(item,index) in item.arr' :key="item.index">
						<el-menu-item :index="item.src" class="aciton" @click="addTab(item)">
							{{item.name}}<!-- v-bind:index="item.src"代表路由路径 -->
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
						<el-dropdown-item><img src="../assets/0.jpg" width='30px' /></el-dropdown-item>
						<el-dropdown-item>后台登入系统</el-dropdown-item>
						<el-dropdown-item><span @click="quit()">退出</span></el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<!-- 菜单添加类tab标签页 -->
			<div class="tab-menu">
				<el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" @tab-click="openTab">
					<el-tab-pane :key="item.name" v-for="(item,index) in editableTabs" :label="item.title" :name="item.name" :closable="index>0">
						{{item.text}}<!-- :closable="index>0"首页标签不能关闭 -->
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
				isCollapse: false, //打开状态为关闭
				editableTabsValue: "Home",
				tabIndex: 1,
				asideTionList: [],
				editableTabs: [{
					title: "首页",
					name: "/Home",
					text: ""
				}],
				// 嵌套v-for循环格式
				lists: [{ //数组
						icon: "el-icon-s-comment",
						title: "基础数据",
						arr: [{
								'src': '/teacherManage',
								'name': '教师管理',
							},
							{
								'src': '/studentManage',
								'name': '学生管理',
							},
							{
								'src': '/classManage',
								'name': '班级管理',
							},
							{
								'src': '/password',
								'name': '修改密码',
							}
						]
					},
					{
						icon: "el-icon-s-promotion",
						title: "考试中心",
						arr: [{
								'src': '/testinput',
								'name': '老师出卷',
							},
							{
								'src': '/papers',
								'name': '试卷管理',
								"num": '2-2'
							},
							{
								'src': '/arrangetest',
								'name': '安排考试',
							},
							{
								'src': '/markexampapers',
								'name': '批阅试卷',
							},
							{
								'src': '/viewresults',
								'name': '查看成绩',
							}
						]
					}
				],
			}
		},
		mounted() {
			setTimeout(_ => {
				let that = this;
				// forEach循环遍历数组，适用于循环次数未知或计算循环次数比较麻烦情况下使用效率更高不能进行添加删除操作
				that.lists.forEach(item => {
					item.arr.forEach(item => {
						that.asideTionList.push(item);
					});
				});
				let EditableTabs = JSON.parse(sessionStorage.getItem("editableTabs")); //用变量接收得到存储的tab内容
				let TabName = sessionStorage.getItem("TabName"); //得用变量接收得到存储的tab的name
				// console.log(TabName)
				//如果存在sessionStorage数据,改变其结果
				//刷新页面tab页面不会清除
				if (EditableTabs && TabName) {
					that.editableTabs = EditableTabs;
					that.editableTabsValue = TabName;
					for (var m = 0; m < that.lists.length; m++) {
						for (var n = 0; n < that.lists[m].arr.length; n++) {
							var ser = that.lists[m].arr;
						}
					}
				}
			}, );
		},
		methods: {
			handleOpen(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//console.log(key, keyPath);
			},
			/**
			 * 伸缩侧边栏按钮的隐藏和显示
			 */
			showHidden() {
				let icon1 = document.getElementById("icon1")
				let icon2 = document.getElementById("icon2")
				this.isCollapse = !this.isCollapse
				if (this.isCollapse) {
					icon1.style.display = "none"
					icon2.style.display = "block"
				} else {
					icon1.style.display = "block"
					icon2.style.display = "none"
				}
			},
			/**
			 * 添加tab
			 */
			addTab(menu) {
				//console.log(menu)
				var exist = false;
				var that = this;
				for (var i = 0; i < that.editableTabs.length; i++) {
					if (menu.name == that.editableTabs[i].title) { //名字相同
						exist = true;
						break;
					}
				}
				if (exist == true) {
					that.editableTabsValue = menu.src; //跳路由
					return;
				}
				that.editableTabs.push({ //添加tab标签里名字与路由
					title: menu.name,
					name: menu.src
				});
				that.editableTabsValue = menu.src;
				that.$router.push(menu.src) //跳路由
				sessionStorage.setItem(
					"editableTabs",
					JSON.stringify(this.editableTabs)
				); //添加存储用户操作的tab内容
				sessionStorage.setItem("TabName", menu.src); //存储menu.routers,这里需要的是editableTabs数组中name
			},
			/**
			 * tab标签跳转页面
			 */
			openTab(name) {
				//console.log(666, name);
				var that = this;
				for (var m = 0; m < that.lists.length; m++) {
					for (var n = 0; n < that.lists[m].arr.length; n++) {
						var ser = that.lists[m].arr;
						if (ser[n].name == name.label) { //label==arr.name
							//console.log(11111, ser[n])
							that.addTab(ser[n]);
							sessionStorage.setItem("TabName", ser[n].src);
							that.$router.push(ser[n].src); //添加路由src;

						}
					}
				}
			},
			/**
			 * tab移除
			 */
			removeTab(targetName) {
				var that = this;
				// if (targetName == '/Home') {
				// 	return;
				// }
				let tabs = that.editableTabs;
				let activeName = that.editableTabsValue;
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1]; //删除跳下一个如果没有就跳到上一个
							if (nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}
				that.$router.push(activeName) //删除后跳转路由
				that.editableTabsValue = activeName;
				that.editableTabs = tabs.filter(tab => tab.name !== targetName);
				sessionStorage.setItem("editableTabs", JSON.stringify(that.editableTabs)); //删除时存储用户操作的tab内容
				sessionStorage.setItem("TabName", activeName); //存储用户操作的tab位置,这里需要的是editableTabs数组中name
			},
			/**
			 * 退出登入
			 */
			quit() {
				this.$confirm('是否退出登入', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					sessionStorage.clear() //清除所有session值
					//session.removeAttribute("userUid")//清除session里的某项值
					this.$router.push("/");

					this.$message({
						type: 'success',
						message: '退出成功'
					})
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '已取消'
					});
				});
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

	.menu-item-wrapper {
		width: 100%;
		background-color: rgba(0, 0, 0, 0.75);
		padding: 20px 0;

		.el-icon-sunny {
			width: 36px;
			height: 36px;
			font-size: 36px;
			color: red;
		}

		.el-icon-moon {
			width: 36px;
			height: 36px;
			font-size: 36px;
			color: blue;
		}
	}

	/deep/.el-submenu .el-menu-item {
		//deep覆盖element样式
		min-width: 100%;
	}

	.h-sidebar {
		float: left;
		width: 17%;
		height: 100vh;
		background-color: #ccc;
	}

	/deep/.tab-menu {
		//deep覆盖element样式
		overflow: hidden;

		.el-tabs {
			overflow: hidden;
		}
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

	.top-r {
		display: absolute;
		left: 90%;
	}

	.el-icon-umbrella {
		color: red;
	}

	.el-radio-button__inner {}
</style>
