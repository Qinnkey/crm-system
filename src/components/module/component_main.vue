<template>
	<div class="main" :style="{height: main_height+'px'}">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		name: 'main',
		data(){
			return{
				main_height: null,		//main高度
				limitItme: null,
			}
		},
		created: function(){
			this.main_height = document.documentElement.clientHeight - 100;
			//无token转向登录
			if(!localStorage.CRM_token){
				this.$router.push({path: "/login"})
			}
			
			/*this.$http.get("/list/customer/renew/count",{
				params:{
					token: localStorage.CRM_token
				}
			}).then(function(res){
				//console.log(res,"过期")
				//登录过期跳到登录界面
				if (res.body.code=="504") {
					this.$message({
	          			message: "登录过期，请重新登录！",
	          			type: 'error'
	        		});
	        		this.$router.push({path: "/login"})
				}
			});*/
			console.log("quanxuan==================================");
			//权限数据
			this.$http.post("/list/user/list", {
				userid : localStorage.CRM_userid,
				token  : localStorage.CRM_token
			},{emulateJSON: true}).then(function(res) {
				this.limitItme = res.body.data.list["0"].menuLists
				this.$emit('limititem', this.limitItme)
			})
		},
	}
</script>

<style scoped="scoped">
	/*主要内容的布局样式*/
	.main{
		position: fixed;
		left: 160px;
		right: 0;
		top: 60px;
		padding: 20px;
		background:#f3f3f3;
		overflow-y: auto;
	}
</style>