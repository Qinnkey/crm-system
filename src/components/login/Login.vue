<template>
	<div class="login relative">
		<img id="topBgImg" src="../../../static/img/1440x360.png"/>
		<img class="logo absolute" src="../../../static/img/group_1.png" width="30%"/>
		<div class="bottom_div">
			<div class="userName inputGrp flex_between">
				<img src="../../../static/img/name.png" width="15"/>
				<input type="text" v-model="phoneNumber" placeholder="用户名/手机号" />
			</div>
			<div class="pwd inputGrp flex_between">
				<img src="../../../static/img/mima.png" width="15"/>
				<input type="password" v-model="password" placeholder="密码" @keyup.enter="login"/>
			</div>
			<button id="login" @click="login">登录</button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'login',
		data (){
			return {
				phoneNumber: null,		//电话号码
				password   : null,     	//密码
			}
		},
		created: function(){
			//清空存储数据
			localStorage.CRM_token = '';
			localStorage.CRM_keyid = '';
			localStorage.CRM_petname = '';
			localStorage.loginSign = '';
		},
		methods: {
			login(){
				this.$http.get('/list/login', {
					params: {
						username : this.phoneNumber,
						password : this.password
					}
				}).then(function(res){
					console.log(res,"login")
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

						//this.$emit("userId", res.body.data.userid)   //将userid传入App.vue中
						//到首页
						this.$router.push({path: "/index"})
						this.$router.go(0)
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
      		},
		}
	}
</script>

<style lang="less" scoped="scoped">
	.login{
		#topBgImg{
			height: 260px;
			width: 100%;
			margin-bottom: 25px;
		}
		.logo{
			margin: 0 auto;
			top: 90px;
			left: 35%;
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
				}
			}
			#login{
				display: block;
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
	}
</style>