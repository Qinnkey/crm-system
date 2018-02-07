<template>
	<div class="HSLogin">
		<!--背景图片-->
		<div class="login_top">
			<img src="../../../static/img/wenzi.png" alt="" />
		</div>
		<!--账号密码部分-->
		<div class="bottom_div">
			<div class="userName inputGrp flex_between">
				<img src="../../../static/img/name.png" width="15"/>
				<input type="text" v-model="phoneNumber" placeholder="用户名/手机号" />
			</div>
			<div class="pwd inputGrp flex_between">
				<img src="../../../static/img/mimamima.png" width="15"/>
				<input type="password" v-model="password" placeholder="密码" @keyup.enter="login"/>
			</div>
			<button id="login" @click="login">登录</button>
		</div>
	</div>
</template>

<script>
	export default({
		name : "HSLogin" ,
		data(){
			return{
				phoneNumber:"",
				password:""
			}
		},
		created(){
			//清空存储数据
			localStorage.CRM_token = '';
			localStorage.CRM_keyid = '';
			localStorage.CRM_petname = '';
			localStorage.loginSign = '';
		},
		methods:{
			login(){
				this.$http.get('/list/custLogin', {
					params: {
						phone : this.phoneNumber,
						password : this.password
					}
				}).then(function(res){
//					console.log("custLogin***************************",res)
					if (res.body.code==100) {
						//显示成功提示
						this.message(res.body.msg, 'success')
						//存储token、keyid、petname
						localStorage.CRM_token = res.body.data.token;
						localStorage.CRM_keyid = res.body.data.keyid;
						localStorage.CRM_petname = res.body.data.petname;
						localStorage.CRM_userid = res.body.data.userid;
						localStorage.CRM_beginDate = res.body.data.begindate;
						localStorage.CRM_endDate = res.body.data.enddate;
						localStorage.CRM_roleid = res.body.data.roleid;
						localStorage.loginSign='cust';

						//this.$emit("userId", res.body.data.userid)   //将userid传入App.vue中
						//到首页
						this.$router.push({path: "/manage_list"})
//						this.$router.go(0)
					}else{
						//显示错误提示
						this.message(res.body.msg, 'error')
					}
					console.log(localStorage)
				})
			},
			message(msg, msg_type) {
        		this.$message({
          			message: msg,
          			type: msg_type
        		});
      		}
		}
	})
</script>

<style lang="less" scoped="scoped">
	.HSLogin{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		background: white;
	}
	.HSLogin .login_top{
		height: 260px;
		width: 100%;
		background-image: url('../../../static/img/1920x360.png');
		position: relative;
		img{
			position: absolute;
			top: 55%;
			left: 50%;
			transform: translate(-50%,-50%);
			height: 120px;
		}
	}
	.bottom_div{
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			top: 260px;
			background: white;
			.inputGrp{
				padding: 5px;
				margin: 25px auto;
				border: 1px solid #ccc;
				border-radius: 5px;
				width: 300px;
				input{
					width: calc(~"100% - 35px");
					padding: 5px;
					border: none;
					outline: none;
				}
				img{
					
				}
			}
			#login{
				display: block;
				outline: none;
				padding: 10px;
				margin: 20px auto;
				width: 310px;
				border: 1px solid #ccc;
				border-radius: 5px;
				font-size: 16px;
				color: white;
				font-weight: bold;
				background: #2eb398;
				&:hover{
					cursor: pointer;
				}
			}
		}
</style>