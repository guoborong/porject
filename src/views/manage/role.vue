<template>
    <div id='user'>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础数据</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--表格-->
        <el-card class="box-card">
            <span>角色管理</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addTab">新增</el-button>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type='index' label="编号" width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.userTypeId }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="角色名称" width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.userTypeTypeName }}</span>
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
            <el-form :model="form">
                <el-form-item label="角色编号" prop="userTypeId" :label-width="formLabelWidth">
                    <el-input v-model="form.userTypeId" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form">
                <el-form-item label="角色名称" prop="userRoleName" :label-width="formLabelWidth">
                    <el-input v-model="form.userRoleName" autocomplete="off"></el-input>
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
            return {
                tableData: [],//表格数据接受
                dialogFormVisible: false,//弹框的显示
                formValue: false,//选择编辑或添加
                formLabelWidth: '80px',
                form: {
                    index: 0,
                    userTypeId: '',
                    userRoleName: '',//新的角色名称
                }
            }
        },
        created() {
            var that = this;
            that.array();
        },
        methods: {
            /**
			 * 角色接受接口数据
			 * */
            array() {
                var that = this;
                that.axios.get('/api/UserType/GetUserRoles').then((res) => {
                    //console.log(res)
                    that.tableData = res.data;//将数据赋值到tableData【】里
                })
            },
            /**
			 * 新添数据初始化
			 */
            addTab() {
                let that = this;
                that.formValue = false;//代表添加
                that.dialogFormVisible = true;//弹框打开
                that.form.userTypeId = '';
                that.form.userRoleName = '';
                that.form.index = '';
            },
            /**
			*编辑行
			*/
            handleEdit(index, row) {//将本行数据赋值
                var that = this;
                that.formValue = true;//代表编辑
                that.form.userTypeId = row.userTypeId;
                that.form.userRoleName = row.userTypeTypeName;
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
                        that.axios//要修改的角色编号//要修改的角色名称
                            .post("/api/UserType/ModifyUserRole?id=" + that.form.userTypeId + '&userRoleName=' + that.form.userRoleName)
                            .then(res => {
                                console.log(res);
                                if (res.data.code == 0) {
                                    //根据返回code值来判断添加的情况
                                    that.$message("数据没有改变");
                                    that.dialogFormVisible = false;//弹框关闭
                                } else if (res.data.code == -1) {
                                    that.$message.error("系统异常,禁止删除");
                                    that.dialogFormVisible = false;//弹框关闭
                                } else if (res.data.code == -2) {
                                    that.$message.error("参数错误");
                                    that.dialogFormVisible = false;//弹框关闭
                                } else if (res.data.code == 1) {
                                    let index = that.form.index;//根据下标重新赋值
                                    //console.log(that.tableData[index].userTypeId, that.form.userTypeId)
                                    that.tableData[index].userTypeId = that.form.userTypeId;
                                    that.tableData[index].userTypeTypeName = that.form.userRoleName;
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
                    that.axios.post('/api/UserType/RemoveUserRole?userRoleId=' + that.tableData[index].userTypeId)
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
                that.$confirm('"您确定添加吗, 是否继续?", 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.axios
                        .post("/api/UserType/AddUserRole?userRoleName=" + that.form.userRoleName)
                        .then(res => {
                            console.log(1234, res)
                            let data = res.data;
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
                                data.userTypeId = that.form.userTypeId;
                                data.userTypeTypeName = that.form.userRoleName;
                                that.tableData.unshift(data);//添加到第一行
                                disable = true;//禁止删除
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
    .el-dialog{
		width: 46%;
		.el-dialog__header{
			text-align: center;
		}
	}
</style>