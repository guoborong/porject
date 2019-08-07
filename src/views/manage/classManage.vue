<template>
	<div id="classManage">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>班级管理</el-breadcrumb-item>
		</el-breadcrumb>
		<template>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column label="日期" width="180">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span style="margin-left: 10px">111<!-- {{ scope.row.date }} --></span>
					</template>
				</el-table-column>
				<el-table-column label="姓名" width="180">
					<el-tag size="medium">222<!-- {{ scope.row.name }} --></el-tag>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			this.array();
		},
		methods: {
			array() {
				var that = this;
				that.axios.get('/api/Class/GetAllClass').then((res) => {
					console.log(res)
					//this.tableData = res
				})
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
		}
	}
</script>

<style>
</style>
