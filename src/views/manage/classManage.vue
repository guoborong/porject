<template>
	<div id="classManage">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>基础数据</el-breadcrumb-item>
			<el-breadcrumb-item>班级管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
			<!--表格-->
			<span>班级管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="addTab">新增</el-button>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column type="index" label="编号" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.classId }}</span>
					</template>
				</el-table-column>
				<el-table-column label="班级名称" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.className }}</span>
					</template>
				</el-table-column>
				<el-table-column label="老师名称" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.userName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="专业名称" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.courseName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="班级人数" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.classStudents }}</span>
					</template>
				</el-table-column>
				<el-table-column label="创建日期" width="180">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span>{{ scope.row.classCreateTime | formatDate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" :disabled="tableData[scope.$index].classStudents>0"
							@click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
						<!-- 如果班级有学生的话按钮就禁用 -->
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 新增 编辑表单 -->
		<el-button type="text" @click="dialogFormVisible = true"></el-button>
		<el-dialog :title="formValue?'编辑':'增 加'" :visible.sync="dialogFormVisible" classCourseId="el-dialog">
			<el-form :model="form" :rules="rules">
				<el-form-item label="班级名称" prop="className" :label-width="formLabelWidth">
					<el-input v-model="form.className" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="专业名称" prop="courseName" :label-width="formLabelWidth">
					<el-select v-model="form.courseName" placeholder="请选择" @change="selectObj">
						<el-option v-for="(item,index) in obj" :key="index" :value="item.courseName"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="老师名称" prop="userName" :label-width="formLabelWidth">
					<el-select v-model="form.userName" placeholder="请选择" @change="selectTeacher">
						<el-option v-for="(item,index) in teacher" :key="index" :value="item.userName"></el-option>
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
	import { formatDate } from "@/util/date.js";//引入
	export default {
		data() {
			return {
				date: 1496311370052,
				tableData: [],//表格数据接受
				dialogFormVisible: false,//弹框的显示
				obj: [],//专业数据接收
				teacher: [],//老师数据接收
				form: {
					index: 0,
					classId: '', //班级主键
					courseName: "", //专业名称
					className: "", //班级名称
					classCourseId: "", //课程编号
					userName: "", //老师名称
					classTeacherId: "" //老师编号
				},
				formValue: false,//选择编辑或添加
				formLabelWidth: '80px',
				rules: {//表单验证提示信息
					className: [
						{ required: true, message: '请输入班级名称', trigger: 'blur' }
					],
					courseName: [
						{ required: true, message: '请选择专业', trigger: 'blur' }
					],
					userName: [
						{ required: true, message: '请选择老师', trigger: 'blur' }
					]
				}
			}
		},
		created() {
			var that = this;
			that.array();//班级信息接口函数
			that.teacherNmb();//老师名称接口函数
			that.objNmb();//专业名称接口函数
		},
		methods: {
			/**
			 * 班级信息接受接口数据
			 * */
			array() {
				var that = this;
				that.axios.get('/api/Class/GetAllClass').then((res) => {
					//console.log(res)
					that.tableData = res.data;//将数据赋值到tableData【】里
				})
			},
			/**
			*老师名称接口数据
			*/
			teacherNmb() {
				var that = this;
				that.axios.get('/api/User/GetTeachers').then((res) => {
					that.teacher = res.data;//将数据赋值到teacher【】里
					//console.log(that.form.teacher)
				})
			},

			/**
			*专业名称接口数据
			*/
			objNmb() {
				var that = this;
				that.axios.get('/api/Class/GetAllCourse').then((res) => {
					// console.log(res)
					that.obj = res.data;//将数据赋值到obj【】里
					//console.log(that.form.obj)
				})
			},
			/**
			 *专业名称下拉框返回位置
			 */
			selectObj(courseName) {
				let that = this;
				let index = that.obj.findIndex(item => item.courseName == courseName);
				//findIndex默认去遍历数组集合，将集合中的每个元素传入到function的item里，
				return that.form.classCourseId = that.obj[index].courseId;
			},
			/**
			 * 老师名称下拉框返回位置
			 */
			selectTeacher(userName) {
				let that = this;
				let index = that.teacher.findIndex(item => item.userName == userName);
				return that.form.classTeacherId = that.teacher[index].userId;
			},
			/**
			 * 新添数据初始化
			 */
			addTab() {
				let that = this;
				that.formValue = false;//代表添加
				that.dialogFormVisible = true;//弹框打开
				that.form.classId = '';
				that.form.className = "";
				that.form.classCourseId = "";
				that.form.courseName = "";
				that.form.classTeacherId = "";
				that.form.userName = "";
				that.form.index = 0;
			},
			/**
			*编辑行
			*/
			handleEdit(index, row) {//将本行数据赋值
				console.log(index, row);
				var that = this;
				that.formValue = true;//代表编辑
				that.form.classId = row.classId;
				that.form.courseName = row.courseName;
				that.form.userName = row.userName;
				that.form.className = row.className;
				that.form.classCourseId = row.classCourseId;
				that.form.classTeacherId = row.classTeacherId;
				that.dialogFormVisible = true;//弹框打开
				that.form.index = index;
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
							.post("/api/Class/ModifyClass", {
								classId: that.form.classId, //要修改的班级主键
								className: that.form.className, //要修改的班级名称
								classCourseId: that.form.classCourseId, //课程编号
								classTeacherId: that.form.classTeacherId //老师编号
							})
							.then(res => {
								console.log(res.data);
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
									let index = that.form.index;
									that.tableData[index].className = that.form.className;
									that.tableData[index].courseName = that.form.courseName;
									that.tableData[index].userName = that.form.userName;
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
				//console.log(index, row);
				var that = this;
				that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.axios.get('/api/Class/RemoveClass', {
						params: {
							classId: that.tableData[index].classId//班级编号等于表格所删行的班级编号
						}
					}).then((res) => {
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
								message: '系统错误'
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
					}).then(() => {
						that.axios
							.post("/api/Class/AddClass", {
								className: that.form.className,
								classCourseId: that.form.classCourseId,
								classTeacherId: that.form.classTeacherId
							})
							.then(res => {
								let data = res.data.data;
								console.log(1234, data)
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
									data.courseName = that.form.courseName;
									data.userName = that.form.userName;
									that.tableData.unshift(data);
									that.$message({
										message: "增加成功",
										type: "success"
									});
								}
							})
							.catch(error => {
								console.log(error);
							});
					})
			}
		},
		// 格式化时间
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			}
		}
	}
</script>

<style scoped lang="less" type="text/less">
	.el-card{
        margin-top: 20px;
    }
	.el-dialog{
		width: 46%;
		.el-dialog__header{
			text-align: center;
		}
	}
</style>