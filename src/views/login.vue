<template>
	<div id="login">
		<div class="form">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="手机号" prop="phone">
					<el-input type="int" v-model="ruleForm.phone" autocomplete="off" placeholder="请输入用户名或邮箱"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-checkbox class='check' v-model="checked">记住密码</el-checkbox>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">登入</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Base64 from '../util/Base64.js'
	import Cookie from '../util/Cookie.js'
	export default {
		name: 'logan',
		data() {
			return {
				ruleForm: {
					phone: "", //手机号
					pass: '', //密码
					logining: false //登陆状态
				},
				checked: false, //记住密码状态
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
		created() {
			// 清除后台页面用户存留的tab标签页操作
			sessionStorage.removeItem('TabName');
			sessionStorage.removeItem('editableTabs');
			if (Cookie.getCookie("phone") && Cookie.getCookie("phone")) { //当cookie中有值时
				this.checked = true; //状态为true
				this.ruleForm.phone = Base64.decode(Cookie.getCookie("phone")); //解码
				this.ruleForm.pass = Base64.decode(Cookie.getCookie("pass")); //解码
			}
		},
		methods: {
			/**
			 * 登入
			 */
			submitForm(formName) {
				var that = this;
				that.logining = true;
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				setTimeout(() => {
					loading.close();
				}, 1000);
				that.axios.get('/api/OAuth/authenticate', {
					params: {
						userMobile: that.ruleForm.phone,
						userPassword: that.ruleForm.pass
					}
				}).then((res) => {
					that.logining = true;
					console.log(res)
					// 定义令牌,根据后台数据得到想要的数据拼接起来
					let token = res.data.token_type + ' ' + res.data.access_token //加空格不然报错401
					sessionStorage.setItem('token', token); //本地存储token
					// 存储返回的用户id,用作指定修改密码
					sessionStorage.setItem('userUid', res.data.profile.userUid);
					if (that.checked == true) {
						console.log("checked == true");
						let phone = Base64.encode(that.ruleForm.phone); //加密
						let pass = Base64.encode(that.ruleForm.pass); //加密
						//传入账号名，密码，和保存天数 3个参数
						Cookie.setCookie("phone", phone, {
							maxAge: 60 * 60 * 24 * 7
						});
						Cookie.setCookie("pass", pass, {
							maxAge: 60 * 60 * 24 * 7
						});
					} else {
						console.log("清空Cookie");
						//清空Cookie内容
						Cookie.removeCookie("phone");
						Cookie.removeCookie("pass");
					}
					that.$router.replace("/Home");
					that.$message({
						message: '登入成功',
						type: 'success',
					});
				}).catch((err) => {
					that.logining = false;
					console.log(err.response.status)
					if (err.response.status == 403) {
						that.$message.error('您登入太频繁');
					} else if (err.response.status == 401) {
						that.$message.error('您输入手机号与密码不匹配');
					} else {
						that.$message.error('登入失败');
					}
				})
			},
			/**
			 * 重置
			 */
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped lang="less">
	#login {
		width: 100%;
		height: 100vh; //宽度100%
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
