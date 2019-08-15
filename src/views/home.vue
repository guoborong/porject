<template>
  <div id="home">
    <el-container style="height: 100vh;">
      <!-- 左侧侧边栏 -->
      <el-aside width="auto">
        <el-row class="pic" style="background-color: #000">
            <span>
              <img src="../assets/logo.png" style="width: 50px; height: 50ox;">
            </span>
          </el-row>
        <!-- :default-active="$route.path"双向绑定 -->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          :default-openeds="['1','2']" :collapse="isCollapse" background-color="#000" text-color="#fff"
          active-text-color="#ffd04b" v-for="(item,index) in lists" :key="item.name" router>
          <!-- router用于跳路由 -->
          <!-- 多重for循环渲染 -->
          <el-submenu :index="++index+'' ">
            <template slot="title" class="el-submenu is-active is-opened">
              <i v-bind:class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="(item,index) in item.arr" :key="item.index">
              <el-menu-item :index="item.src" class="aciton" @click="addTab(item)">
                {{item.name}}
                <!-- v-bind:index="item.src"代表路由路径 -->
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 左侧侧边栏 -->
      <el-container>
        <!-- 头部 -->
        <el-row :gutter="10"></el-row>
        <el-header style="text-align: right; height: 54px; font-size: 12px; padding-left: 0; position: relative; border-radius: 4px">
          <!-- 展开/收起按钮 -->
          <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="1">
            <div class="grid-content bg-purple">
              <el-tooltip class="tooltip" effect="dark" :content="isCollapse?'展开':'收起'" placement="right">
                <el-button @click="isCollapse=!isCollapse" :icon="isCollapse?'el-icon-s-fold':'el-icon-s-unfold'"
                  style="color:rgb(0, 0, 0);border: 0; float: left; background-color: rgb(18, 247, 29); padding: 20px" />
              </el-tooltip>
            </div>
          </el-col>
          <!-- tab标签页 -->
          <el-col :xs="15" :sm="15" :md="20" :lg="20" :xl="18">
            <div class="grid-content bg-purple">
              <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" @tab-click="openTab">
                <el-tab-pane :key="item.name" v-for="(item,index) in editableTabs" :label="item.title" :name="item.name"
                  :closable="index>0">
                  {{item.text}}
                  <!-- :closable="index>0"首页标签不能关闭 -->
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <!-- 顶部右边 -->
          <el-col :xs="4" :sm="4" :md="2" :lg="2" :xl="2">
            <div class="grid-content bg-purple">
              <el-dropdown>
                <span class="el-dropdown-link">
                  我的
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item>后台登入系统</el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="quit()">退出</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-header>
        </el-row>

        <!-- 头部 -->
        <!--内容-->
        <el-main>
          <router-view />
        </el-main>
        <!--内容-->
      </el-container>
    </el-container>
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
        editableTabs: [
          {
            title: "首页",//teb标题
            name: "/Home",//路由
            text: ""//teb内容
          }
        ],
        // 侧边栏数据
        lists: [
          {
            icon: "el-icon-s-comment",//图标
            title: "基础数据",//小数组名称
            arr: [//基础数据
              {
                src: "/teacherManage",
                name: "用户管理"
              },
              {
                src: "/studentManage",
                name: "学生管理"
              },
              {
                src: "/classManage",
                name: "班级管理"
              },
              {
                src: "/role",
                name: "角色管理"
              },
              {
                src: "/password",
                name: "修改密码"
              }
            ]
          },
          {
            icon: "el-icon-s-promotion",//图标
            title: "考试中心",//小数组名称
            arr: [//考试中心
              {
                src: "/testinput",
                name: "老师出卷"
              },
              {
                src: "/papers",
                name: "试卷管理",
                num: "2-2"
              },
              {
                src: "/arrangetest",
                name: "安排考试"
              },
              {
                src: "/markexampapers",
                name: "批阅试卷"
              },
              {
                src: "/viewresults",
                name: "查看成绩"
              }
            ]
          }
        ]
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
      });
    },
    methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      /**
     * 添加tab
     */
      addTab(menu) {
        //console.log(menu)
        var exist = false;
        var that = this;
        for (var i = 0; i < that.editableTabs.length; i++) {
          if (menu.name == that.editableTabs[i].title) {
            //名字相同
            exist = true;
            break;
          }
        }
        if (exist == true) {
          that.editableTabsValue = menu.src; //跳路由
          return;
        }
        that.editableTabs.push({
          //添加tab标签里名字与路由
          title: menu.name,
          name: menu.src
        });
        that.editableTabsValue = menu.src;
        that.$router.push(menu.src); //跳路由
        sessionStorage.setItem("editableTabs", JSON.stringify(this.editableTabs)); //添加存储用户操作的tab内容
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
            if (ser[n].name == name.label) {
              //label==arr.name
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
        that.$router.push(activeName); //删除后跳转路由
        that.editableTabsValue = activeName;
        that.editableTabs = tabs.filter(tab => tab.name !== targetName);
        sessionStorage.setItem("editableTabs", JSON.stringify(that.editableTabs)); //删除时存储用户操作的tab内容
        sessionStorage.setItem("TabName", activeName); //存储用户操作的tab位置,这里需要的是editableTabs数组中name
      },
      /**
       * 退出登入
       */
      quit() {
        var that = this;
        that.$confirm("是否退出登入", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            sessionStorage.clear(); //清除所有session值
            //session.removeAttribute("userUid")//清除session里的某项值
            that.$router.push("/");

            that.$message({
              type: "success",
              message: "退出成功"
            });
          })
          .catch(() => {
            that.$message({
              type: "error",
              message: "已取消"
            });
          });
      }
    }
  }
</script>



<style scoped lang="less" type="text/less">
  /* 头部 */
  .el-header {
    background-color: #000;
    color: #c5d4df;
    line-height: 54px;
    vertical-align: middle;
      .el-icon-s-fold,.el-icon-s-unfold{
        font-size: 46px;
      }
    /deep/.el-icon-arrow-left,/deep/.el-icon-arrow-right,/deep/.el-tabs__item.is-active{
      color: #fff;
    }
    .el-dropdown{
      color: aqua;
    }
    /deep/ .el-tabs__item {
      color: aqua;
    }
  }
/* 头部 */

/* 侧边栏 */
  .el-aside {
    background-color: #545c64;
    color: #333;
    .element.style{
      width: 200px;
      /deep/.el-submenu .el-menu-item{
      min-width: 0;
    }
    }
  }
  /* 侧边栏 */

</style>