<template>
	<div id='password'>
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="原密码" prop="oldPass">
				<el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入原密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if (value == this.ruleForm.oldPass) {
					callback(new Error('该密码与原密码一致!'));
				} else {
					callback();
				}
			};
			var validatePass3 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					console.log(111)
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					oldPass: '',
					pass: '',
					checkPass: ''
				},
				rules: {
					oldPass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass3,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			/**
			 * 修改密码
			 */
			submitForm(formName) {
				var that = this;
				that.$refs[formName].validate(valid => {
					if (valid) {
						that
							.$confirm("你确定修改密码吗, 是否继续?", "提示", {
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning"
							})
							.then(() => {
								that.axios
									.get("/api/User/ModifyPassword", {
										params: {
											uid: sessionStorage.getItem("userUid"),
											oldPassword: that.ruleForm.oldPass, //旧密码
											newPassword: that.ruleForm.pass //新密码
										}
									})
									.then(res => {
										console.log(res);
										//修改成功后跳转到登录页面
										if(res.data.code == 1){
											that.$message({
												message: "密码已被修改,请重新登入",
												type: 'success'
											});
											setTimeout(function() {
												that.$router.replace("/"); //成功后跳转到首页
											}, 2000);
										}else if(res.data.code == -3){
											that.$message({
												//修改后提示语句
												message: "原密码与登入密码不一致",
												type: 'error'
											});
										}else{
											that.$message({
												//修改后提示语句
												message: "其它错误",
												type: 'error'
											});
										}
									})
									.catch(error => {
										that.$message({
											//修改失败提示语句
											message: "修改密码失败",
											type: "error"
										});
										console.log(error);
									});
							})
							.catch(() => {
								that.$message({
									type: "info",
									message: "已取消修改"
								});
							});
					} else {
						// 密码为空时提示语句
						that.$message({
							message: "请输入正确的密码",
							type: "warning"
						});
						return false;
					}
				});
			},
			/**
			 * @param {Object} formName
			 * 重置
			 */
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
	}
</script>

<style>
</style>
