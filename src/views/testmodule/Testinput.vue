<template>
	<div id="input">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>考试中心</el-breadcrumb-item>
			<el-breadcrumb-item>老师出卷</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
			<!-- 老师出卷步骤 -->
			<div slot="header" class="clearfix">
				<el-steps :active="active" finish-status="success">
					<el-step title="试卷信息"></el-step>
					<el-step title="添加题目"></el-step>
					<el-step title="完成制作"></el-step>
				</el-steps>
			</div>
			<div>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="活动名称" prop="name">
						<el-input v-model="ruleForm.name"></el-input>
					</el-form-item>
					<el-form-item label="活动区域" prop="region">
						<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" style="margin-top: 12px;" @click="next">下一步</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: 0
			};
		},
		methods: {
			next() {
				if (this.active++ > 2) this.active = 0;
			}
		}
	}
</script>

<style>

</style>