<template>
	<div class="logan">
		<div class="form">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="手机号" prop="phone">
					<el-input type="int" v-model="ruleForm.phone" autocomplete="off" placeholder="请输入用户名或邮箱"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-checkbox class='check' v-model="ruleForm.checked">记住密码</el-checkbox>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">登入</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Base64 from '../views/logan.vue'
	import Cookie from '../views/logan.vue'
	export default {
		name: 'logan',
		data() {
			return {
				ruleForm: {
					phone: "", //手机号
					pass: '', //密码
					checked:false
				},
				rules: {
					phone: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					pass: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.axios.get('/api/OAuth/authenticate', {
					params: {
						userMobile: this.ruleForm.phone,
						userPassword: this.ruleForm.pass
					}
				}).then((res) => {
					console.log(res.status)
					if (res.status == 200) {
						this.$router.push("/home");
						this.$message({
							message: '登入成功',
							type: 'success'
						});
							
					}
				}).catch((err) => {
					console.log(err)
					this.$message.error('登入失败');
				})
			},
			
			
			
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped>
	.logan {
		width: 100%;
		height: 694px;
		background-image: url(../assets/timg.jpg);
		background-size: cover;
		display: flex;
	}

	.form {
		margin: auto;
		background-color: rgba(0, 0, 0, 0.75);
		width: 360px;
		height: 250px;
		border-radius: 0.5rem;
		padding: 3rem 2.5rem 0 0;
		color: #fff;
	}

	.form form input {
		width: 2.5rem;
	}

	.form form button {
		margin-left: 1.8rem;
	}

	.check {
		margin-left: 6.1rem;
		margin-bottom: 0.5rem;
	}
</style>
