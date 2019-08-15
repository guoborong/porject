<template>
	<div id="teacher">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>基础数据</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
			<!--表格-->
			<span>用户管理</span>
			<span style="color: blue; margin-left: 15px;">请选择角色:</span>
			<el-radio-group v-model="radio" @change="tableData = tableFilter">
				<el-radio v-for="item in radioData" :key="item.userTypeId" :label="item.userTypeTypeName"
					:value="item.userTypeId"></el-radio>
			</el-radio-group>
			</el-form>
			<el-button style="float: right; padding: 3px 0" type="text" @click="addTab">新增</el-button>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column type='index' label="编号" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.userId }}</span>
					</template>
				</el-table-column>
				<el-table-column label="手机号" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.userMobile }}</span>
					</template>
				</el-table-column>
				<el-table-column label="老师名称" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.userName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="性别" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.userSex }}</span>
					</template>
				</el-table-column>
				<el-table-column label="密码" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.userPassword }}</span>
					</template>
				</el-table-column>
				<el-table-column label="角色" width="180">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span>{{ scope.row.userUserTypeId }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 新增 编辑表单 -->
		<el-button type="text" @click="dialogFormVisible = true"></el-button>
		<el-dialog :title="formValue?'编辑':'增 加'" :visible.sync="dialogFormVisible" classCourseId="el-dialog">
			<el-form :model="form" :rules="rules">
				<el-form-item label="用户名" prop="userName" :label-width="formLabelWidth">
					<el-input v-model="form.userName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="userMobile" :label-width="formLabelWidth">
					<el-input v-model="form.userMobile" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="userPassword" :label-width="formLabelWidth">
					<el-input v-model="form.userPassword" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="userSex" :label-width="formLabelWidth">
					<el-radio-group v-model="form.userSex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="选择角色" prop="userTypeTypeName" :label-width="formLabelWidth">
					<el-select v-model="form.userTypeTypeName" placeholder="请选择" @change="selectTypeName">
						<el-option v-for="(item,index) in typeName" :key="index" :value="item.userTypeTypeName">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="formValue?editSubmit():editSubmit2()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			// 手机号验证
			var checkPhone = (rule, value, callback) => {
				const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
				if (!value) {
					return callback(new Error('手机号码不能为空'))
				}
				setTimeout(() => {

					if (!Number.isInteger(+value)) {
						callback(new Error('请输入数字值'))
					} else {
						if (phoneReg.test(value)) {
							callback()
						} else {
							callback(new Error('手机号码格式不正确'))
						}
					}
				}, 100)
			};
			return {
				tableData: [],//表格数据接受
				dialogFormVisible: false,//弹框的显示
				formValue: false,//选择编辑或添加
				formLabelWidth: '80px',
				form: {
					index: 0,
					userUid: '',//编号
					userName: '', //用户名
					userMobile: "", //手机号
					userSex: "", //性别
					userPassword: '',//密码
					userTypeTypeName: "", //角色
					userUserTypeId: 0//角色编号
				},
				typeName: [],//选择角色数据
				radio: "全部", //默认性别选中全部
				tableDatas: [],//用于过滤时
				radioData: [{       //用于过滤时默认选中全部
					disable: true,
					userTypeId: 0,
					userTypeTypeName: '全部'
				}],
				rules: {//表单验证提示信息
					userName: [
						{ required: true, message: '用户名不能为空', trigger: 'blur' }
					],
					userMobile: [
						{ required: true, validator: checkPhone, trigger: 'blur' },
					],
					userPassword: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, max: 18, message: '密码长度6~18', trigger: 'blur' }
					],
					userTypeTypeName: [
						{ required: true, message: '请选择角色', trigger: 'blur' }
					],
					userTypeTypeName: [
						{ required: true, message: '请选择性别', trigger: 'blur' }
					]
				}
			}
		},
		created() {
			var that = this;
			that.array();//班级信息接口函数
			that.user();//角色信息接口函数
		},
		computed: {//用于过滤
			// 过滤计算
			tableFilter() {
				let that = this;
				//console.log(that.radio);
				if (that.radio == that.radioData[0].userTypeTypeName) {
					return that.tableDatas;
				}
				return that.tableDatas.filter(value => value.userTypeTypeName == that.radio)    //过滤
			}
		},
		methods: {
			/**
			 * 学生信息接受接口数据
			 * */
			array() {
				var that = this;
				that.axios.get('/api/User/GetTeachers').then((res) => {
					//console.log(res)
					that.tableData = res.data;//将数据赋值到tableData【】里
					that.tableDatas = res.data;
				})
			},
			/**
			*角色接口数据
			*/
			user() {
				var that = this;
				that.axios.get('/api/UserType/GetUserRoles').then((res) => {
					//console.log(res)
					that.typeName = res.data;//将数据赋值到tableData【】里
					that.radioData.push(...res.data);
				})
				return this.typeName;
			},
			/**
			 * 角色下拉框返回位置
			 */
			selectTypeName(userTypeTypeName) {
				let that = this;
				let index = that.typeName.findIndex(item => item.userTypeTypeName == userTypeTypeName);
				return that.form.userUserTypeId = that.typeName[index].userTypeId;
				console.log(that.form.userUserTypeId, that.typeName[index].userTypeId)
			},
			/**
			 * 新添数据初始化
			 */
			addTab() {
				let that = this;
				that.formValue = false;//代表添加
				that.dialogFormVisible = true;//弹框打开
				that.form.userUid = '';
				that.form.userName = '';
				that.form.userMobile = "";
				that.form.userSex = "";
				that.form.userPassword = "";
				that.form.userTypeTypeName = "";
				that.form.userUserTypeId = "";
				that.form.index = 0;
			},
			/**
			*编辑行
			*/
			handleEdit(index, row) {//将本行数据赋值
				//console.log(index, row);
				var that = this;
				that.formValue = true;//代表编辑
				that.form.userUid = row.userUid;
				that.form.userName = row.userName;
				that.form.userSex = row.userSex;
				that.form.userMobile = row.userMobile;
				that.form.userPassword = row.userPassword;
				that.form.userTypeTypeName = row.userTypeTypeName;
				that.form.userUserTypeId = row.userUserTypeId;
				that.form.index = index;
				that.dialogFormVisible = true;//弹框打开
			},
			/**
			*编辑行修改数据
			*/
			editSubmit() {
				var that = this;
				that.editFormVisible = false;
				that
					.$confirm("您确定修改吗, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						that.axios
							.post("/api/User/ModifyTeacher", {
								userUid: that.form.userUid, //要修改的用户标识符
								userName: that.form.userName, //修改名称
								userMobile: that.form.userMobile, //要修改的手机号，11位手机号
								userSex: that.form.userSex, //要修改的性别，男|女
								userUserTypeId: that.form.userUserTypeId,//角色
								userPassword: that.form.userPassword//密码
							})
							.then(res => {
								console.log(res)
								if (res.data.code == 0) {
									//根据返回code值来判断添加的情况
									that.$message("数据没有改变");
									that.dialogFormVisible = false;//弹框关闭
								} else if (res.data.code == -1) {
									that.$message.error("系统异常");
									that.dialogFormVisible = false;//弹框关闭
								} else if (res.data.code == -2) {
									that.$message.error("参数错误");
									that.dialogFormVisible = false;//弹框关闭
								} else if (res.data.code == 1) {
									let index = that.form.index;//重新赋值
									that.tableData[index].userUid = that.form.userUid;
									that.tableData[index].userName = that.form.userName;
									that.tableData[index].userMobile = that.form.userMobile;
									that.tableData[index].userSex = that.form.userSex;
									that.tableData[index].userTypeTypeName = that.form.userTypeTypeName;
									that.tableData[index].userPassword = that.form.userPassword;
									that.dialogFormVisible = false;
									that.$message.success("修改成功");
								}
							})
							.catch(error => {
								that.$message({
									message: "修改失败",
									type: "error"
								});
								console.log(error);
								that.dialogFormVisible = false;//弹框关闭
							});
					});
			},
			/**
			*删除行
			*
			*/
			handleDelete(index, row) {
				console.log(index, row);
				var that = this;
				that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.axios.post('/api/User/RemoveTeacher?uid=' + that.tableData[index].userUid)
						.then((res) => {
							console.log(res)
							console.log("删除状态", res.data.code)
							//res.data.code == 1为成功，== 其它为错误
							if (res.data.code == 1) {
								that.$message({
									type: 'success',
									message: '删除成功!'
								})
								that.tableData.splice(index, 1)//成功则删除
							} else if (res.data.code == -2) {
								that.$message({
									type: 'error',
									message: '参数错误'
								})
							} else {
								that.$message({
									type: 'error',
									message: '其它错误'
								})
							}
						})
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			/**
			*新增行
			*/
			editSubmit2() {
				var that = this;
				that.dialogFormVisible = false;
				that
					.$confirm("您确定添加吗, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						that.axios
							.post("/api/User/AddTeacher", {
								userName: that.form.userName,
								userMobile: that.form.userMobile,
								userSex: that.form.userSex,
								userPassword: that.form.userPassword,
								userUserTypeId: that.form.userUserTypeId
							})
							.then(res => {
								//console.log(1234, res)
								let data = res.data.data;
								if (res.data.code == 0) {
									//根据返回code值来判断添加的情况
									that.$message("数据没有改变");
									that.dialogFormVisible = false;//弹框关闭
								} else if (res.data.code == -1) {
									that.$message.error("系统异常");
									that.dialogFormVisible = false;//弹框关闭
								} else if (res.data.code == -2) {
									that.$message.error("参数错误");
									that.dialogFormVisible = false;//弹框关闭
								} else if (res.data.code == 1) {
									data.userTypeTypeName = that.form.userTypeTypeName;
									that.tableData.unshift(data);
									that.$message({
										message: "增加成功",
										type: "success"
									});
								}
							})
							.catch(error => {
								console.log(error);
							})
					})
			}
		}
	}
</script>

<style scoped lang="less" type="text/less">
	.el-card{
        margin-top: 20px;
    }
	.el-radio-group{
		margin-left: 20px;
	}
	.el-dialog{
		width: 46%;
		.el-dialog__header{
			text-align: center;
		}
	}
</style>