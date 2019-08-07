# 班级管理功能

## 实现的功能
 
1. 完成界面的布局，面包屑导航，使用el-card作为容器布局，使用el-table显示数据
2. 完成班级管理的基本功能：加载所有班级、新增班级、修改班级、删除班级 
3. 在DateFormatter.js实现对日期的格式显示 

## 修改bug
 使用F5或是其它方式刷新页面，发现Axios的钩子函数不执行，经过分析发现是代码执行顺序的问题，在刷新页面的时候，会先执行子组件的钩子函数，造成在还没有为Axios添加拦截器就调用接口了，于是总是返回401错。解决方法就是，先添加拦截器，然后将Axios添加到Vue实例。具体代码如下：
 ```
    axios.defaults.baseURL = "http://192.168.1.188:12/api/";
    //发送凭证
    axios.interceptors.request.use(function (config) {
    //携带凭证
    config.headers.common['Authorization'] = sessionStorage.getItem("token"); 
    return config;
    }, function (error) {
    return Promise.reject(error);
    });

    //权限控制
    axios.interceptors.response.use(function (response) {
    return response;
    }, function (error) {
    var url = error.config.url.toLocaleLowerCase();
    //除了获取令牌接口外，其它接口出现401会尝试获取新令牌。
    //也是为了防止死循环调用的情况。假如密码修改了，用户之前记录的密码和数据不一致，访问是会出现401错误，这样就会造成死循不断地调用令牌的接口。 
    if (error.response.status === 401 && !url.endsWith("oauth/authenticate")) {
        var result = checkRemember();
        if (result) {
        //需要重新获取新的token 
        return reGetToken(result, error);
        }
        else { //回到登录页面，重新登录
        reLogin();
        }
    }
    return Promise.reject(error); //返回错误
    });
    //注意顺序，为axios做好了所有的配置，最后添加到Vue对象
    Vue.use(VueAxios, axios)
 ```
 
***
## 技能要点

1. 尽量减少对接口调用的频次  
    + 新增班级： 新增班级后，接口会返回新增后的数据，只需要将这些信息添加到现有的集合即可，不用去重新获取班级所有信息
     ```
            that.axios.post("Class/AddClass", that.edittingClass).then(res => {
            var code = res.data.code;
            var msg = res.data.message;
            var clas = res.data.data;//返回新增的信息
            switch (code) {
              case 1:
                //将新的数据添加到集合的第一个元素上
                that.allClass.unshift({
                  classId: clas.classId,//班级主键编号
                  className: clas.className,//班级名称
                  classTeacherId: clas.classTeacherId,//老师编号
                  userName: that.getTeacherById(clas.classTeacherId).userName,//授课老师
                  classCourseId: clas.classCourseId,//课程编号
                  courseName: that.getCourseById(clas.classCourseId).courseName,//班级的课程
                  classStudents: 0,//班级人数
                  classCreateTime: clas.classCreateTime,//开班时间    
                });
                that.$message({ type: "success", message: msg });
                break;
              case 0:
                that.$message(msg);
                break;
              default:
                that.$message.error(msg);
                break;
            }
          }).catch(err => { console.log(err) });
     ```

    + 删除班级：删除班级后，只需要从现有的集合移除即可，不用重新加载所有班级信息
    ```
        that.allClass.splice(index, 1);
    ``` 
    + 修改班级：修改班级信息，只需要根据用户修改的信息，更新列表的对象信息即可
    ```
        that.axios.post("Class/ModifyClass", that.edittingClass).then(res => {
        var code = res.data.code;
        var msg = res.data.message;
        switch (code) {
          case 1:
            //更新修改后的信息
            var clas = that.allClass[that.edittingClass.index];
            clas.className = that.edittingClass.className;
            clas.classCourseId = that.edittingClass.classCourseId;
            clas.classTeacherId = that.edittingClass.classTeacherId;
            clas.courseName = that.getCourseById(clas.classCourseId).courseName;
            clas.userName = that.getTeacherById(clas.classTeacherId).userName;
            that.$message({ type: "success", message: msg });
            that.classDialogVisiable = false;
            break;
          case 0:
            that.$message(msg);
            break;
          default:
            that.$message.error(msg);
            break;
        }
      }).catch(err => { console.log(err) });
    ```
2. 编写日期格式化工具  
因为后台传递过来的日期格式与前端需要的格式不符合，需要对数据格式进行格式化显示，所以专门编写了DateFormater.js
```
    /**
    * 日期格式化
    */
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份   
            "d+": this.getDate(),                    //日   
            "h+": this.getHours(),                   //小时   
            "m+": this.getMinutes(),                 //分   
            "s+": this.getSeconds(),                 //秒   
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
            "S": this.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    /**
    * 日期工具，可以格式化日期
    * @author caolingxiong 
    * @date 2019-7-28 
    */
    class DateFormatter {
        /**
        * 构造函数
        * @param {String} str  字符串类似的日期格式
        */
        constructor(str) {

            this.date = new Date(str);
        }
        /**
        * 格式化日期
        * @param {String} fmt   日期格式字符串  yyyy：年  MM：月 dd：日   HH：时  mm：分 ss：秒  ms：毫秒
        */
        formate(fmt) {
            return this.date.Format(fmt);
        }

    }
    export default DateFormatter
``` 
日期格式化工具的使用
```
import DF from "@/util/DateFormatter"

data(){
    return {
        DF,//日期格式,这个主要的目的就是能够在页面的表达式中能够使用DF对象，否则会报错！！！！
    }
}
``` 
在页面的使用
```
  {{ new DF(scope.row.classCreateTime).formate("yyyy-MM-dd")}}
```

## 提示
1. 要能够正确使用element的组件
2. 要熟练使用数组常用的方法
3. 要尽量考虑用户体验和程序的性能，减少不必要的执行