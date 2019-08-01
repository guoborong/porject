<template>
  <div id="home">
		<div class="nav">
			<router-link to="/">登入</router-link> |
			<router-link to="/home">后台登入</router-link>
		</div>
		<div class="router">
			<router-link to='/teacherManage'>教师管理</router-link>
			<router-link to='/studentManage'>学生管理</router-link>
			<router-link to='/classManage'>班级管理</router-link>
			<router-link to='/password'>修改密码</router-link>
			<router-link to='/Testinput'>考试录入</router-link>
			<router-link to='/arrangetest'>安排考试</router-link>
			<router-link to='/Markexampapers'>批阅试卷</router-link>
			<router-link to='/Viewresults'>查看成绩</router-link>
		</div>
		<div class="content">
			<router-view />
		</div>
  </div>
</template>

<style scoped lang="less">
	a{
		margin: 0 5px; font-weight: bold; text-decoration: none;
	}
</style>
