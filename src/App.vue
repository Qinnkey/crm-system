<template>
	<div id="app">
		<top_component></top_component>
		<nav_left_component :limitData="limitData"></nav_left_component>
		<!--<main_component></main_component>-->
		<router-view :limitData="limitData" v-if="isShow"></router-view>
		<router-view  v-else></router-view>
	</div>
</template>
<script>
	import top_component from '@/components/module/component_top'
	import nav_left_component from '@/components/module/component_left'
	import main_component from '@/components/module/component_main'
	export default {
		name: 'app',
		data: function() {
			return {
				limitData: null,
				isShow : true,
			}
		},
		components: {
			top_component,
			nav_left_component,
			main_component
		},
		created(){
			var that = this ;
			if(localStorage.CRM_token==''){
				return;
			}
			if("cust" != localStorage.loginSign){
					that.$http.post("/list/user/list", {
					token: localStorage.CRM_token,
					userid : localStorage.CRM_userid
				},{emulateJSON:true}).then(function(res){
					console.log(res,"---权限---")
					that.limitData = res.body.data.list["0"].menuLists
				})
			}else{
				that.isShow = false;
				console.log(888888888)
			}
		},
		mounted() {
			// this.$http.get('http://127.0.0.1/shop/indexStore/1').then(function(data){
			//   console.log(data);
			// });
		},
		methods:{
//			user_id(userId){
//				this.$http.post("/list/user/list", {
//					userid : userId
//				},{emulateJSON:true}).then(function(res){
//					console.log(res,"---权限---")
//					this.limitData = res.body.data.list["0"].menuLists
//				})
//			}
		}
	}
</script>

<style>
	* {
		padding: 0;
		margin: 0;
	}
	
	ul {
		list-style: none;
	}
	
	li {
		list-style: none;
	}
	/*颜色*/
	
	.bg1 {
		background: #2eb398
	}
	/*(用于导航)*/
	
	.bg2 {
		background: #31c2a5
	}
	/*（用于登录页面的背景）*/
	
	.bg3 {
		background: #f3f3f3
	}
	/*用于内容区域背景色*/
	
	.ft1 {
		color: #333333
	}
	/*重要文字信息，如大标题，正文信息*/
	
	.ft2 {
		color: #999999
	}
	/*次要的文字信息*/
	
	.hr {
		color: #d9d9d9
	}
	/*用于分割线*/
	
	.tbgreen {
		color: #edf9f6;
	}
	/*表格绿色*/
	
	.tbdark {
		color: #f8f8f8;
	}
	/*表格深色*/
	
	.tbwhite {
		color: #ffffff;
	}
	/*表格白色*/
	
	.tbdisabled {
		color: #e8e8e8;
	}
	/*表格不可用*/
	
	.pad_10 {
		padding: 10px;
	}
	
	.fixed {
		position: fixed;
	}
	
	.relative {
		position: relative;
	}
	
	.absolute {
		position: absolute;
	}
	
	.vertical_m {
		display: flex;
		align-items: center;
	}
	
	.flex_start {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.flex_start {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	
	.flex_between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.flex_around {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>