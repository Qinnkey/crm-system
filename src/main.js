// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入element必须的代码
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

//vuejs过滤器，所有请求前调用，next返回response处理
Vue.http.interceptors.push(function(request, next) {
  // modify headers
	request.headers.set('token', localStorage.CRM_token);
  // continue to next interceptor
  next((res) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
		if('cust'==localStorage.loginSign){
			//登录过期跳到登录界面
			if (res.body.code=="504") {
				this.$message({
	  			message: "登录过期，请重新登录！",
	  			type: 'error'
				});
				this.$router.push({path: "/user"})
			}
		}else{
			//登录过期跳到登录界面
			if (res.body.code=="504") {
				this.$message({
	  			message: "登录过期，请重新登录！",
	  			type: 'error'
				});
				this.$router.push({path: "/login"})
			}
		}
  });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data:{
  	Bus : new Vue()
  }
})
