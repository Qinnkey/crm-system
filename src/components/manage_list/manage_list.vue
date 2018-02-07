<template>
	<div class="manage_list">
		<div class="user_info">
			<span>您好！<strong>尊敬的客户</strong></span>
			<span @click="go_pswd_page"><img src="../../../static/img/mima.png"/>修改密码</span>
			<span @click="sign_out"><img src="../../../static/img/tuichu.png"/>退出</span>
		</div>
		<div class="manage_list_top">
			<div class="welcome_wenzi">欢迎登陆，账号管理系统</div>
		</div>
		<div class="flex_around login_info">
			<div v-for="item in login_data" class="login_info_demo">
				<div>{{item.data}}</div>
				<div>{{item.title}}</div>
			</div>
		</div>
		<div class="project_info">
			<table  v-for="(item,index) in table_list">
				<tr>
					<td colspan="3" class="project_title">{{item.itemFullName}}</td>
				</tr>
				<tr v-for="(items,index) in item.itemAccountNumberList" v-if="item.itemAccountNumberList.length>0" class="project_content_tr">
					<td>
						<span>账号名称：{{items.username}}</span>
						<span>密码：{{items.password}}</span>
					</td>
					<td>帐号类型：{{items.accountypename}}</td>
					<td>网址：<span style="cursor: pointer;" @click="go_url(items,item,index)">{{items.url}}</span></td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	export default({
		name : "manage_list"	,
		data(){
			return{
				table_list:[],
				login_data:[
					{data:"123456",title:"登录总次数"},
					{data:"2018-10-19 15:38:57",title:"最近登录时间"},
					{data:"123",title:"最近7天登录次数"},
				]
			}
		},
		created: function() {
			this.loadDefaultData();
		},
		methods:{
			//加载数据
			loadDefaultData(){
				this.$http.get('/list/customerUser/list', {
					params: {
						token: localStorage.CRM_token,
						loginSign:localStorage.loginSign
					}
				}).then(function(res){
					console.log("account_list***************************",res)
					var resData = res.body.data;
					if (res.body.code==100) {
						this.login_data[0].data = resData.loginCount;
						this.login_data[1].data = resData.lastLoginDate;
						this.login_data[2].data = resData.lastSevenCount;
						if (resData.itemsVo != null && resData.itemsVo.length > 0){
							this.table_list = resData.itemsVo;
						}
					}else{
					}
				})
			},
			//点击退出
			sign_out(){
				this.$confirm('此操作将退出登录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push({ path: '/user' })
					localStorage.removeItem("CRM_token"); //清除token
					localStorage.removeItem("CRM_petname"); //清除昵称
					localStorage.removeItem("CRM_keyid"); //清除keyid
					localStorage.removeItem("CRM_userid"); //清除userid
					localStorage.removeItem("loginSign"); //清除loginSign
					//console.log(localStorage)
					this.$message({
						type: 'success',
						message: '已退出登录!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//点击修改密码
			go_pswd_page(){
				this.$router.push({path:"modify_password"})
			},
			go_url(items,item){
				console.log(items,item)
				this.$http.get('/list/customerUser/addUrlNumber', {
					params: {
						token: localStorage.CRM_token,
						accountid:items.accountid,
						custuserid:items.custuserid,
						itemtype:items.itemtype,
						itemid:items.itemid,
						urlid:items.urlid,
						loginSign:localStorage.loginSign
					}
				}).then(function(res){
					if (res.body.code==100) {
						console.log("url点击保存成功")
					}else{
						console.log("url点击保存失败")
					}
				})
				window.open(items.url);
			}
		}
	})
</script>

<style scoped="scoped">
	.manage_list{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		background: white;
		overflow: auto;
	}
	.manage_list .manage_list_top{
		height: 150px;
		background-image: url('../../../static/img/1920x360.png');
	}
	.manage_list .manage_list_top .welcome_wenzi{
		height: 100%;
		font-size:35px;
		color: #fff;
		line-height: 150px;
		text-align: center;
		letter-spacing: 3px;
		font-family:'PingFang SC', Helvetica, Arial, sans-serif
	}
	.manage_list .user_info {
		height: 50px;
		line-height: 50px;
	}
	.manage_list .user_info span:nth-child(1){
		margin-left: 70%;
	}
	.manage_list .user_info span{
		display: inline-block;
		height: 100%;
		margin: 0 10px;
		font-size: 14px;
		cursor: pointer;
	}
	.manage_list .user_info span img{
		position: relative;
		top: 3px;
		height: 16px;
		margin-right: 5px;
	}
	.manage_list .flex_around{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.manage_list .login_info{
		width: 60%;
		margin: 50px auto;
	}
	.manage_list .login_info_demo{
		width: 150px;
		height: 150px;
		border-radius: 50%;
		background: #2EB398;
	}
	.manage_list .login_info_demo div{
		color: #f5f5f5;
		font-size: 15px;
		text-align: center;
	}
	.manage_list .login_info_demo div:nth-child(1){
		height: 70px;
		line-height: 130px;
	}
	.manage_list .login_info_demo div:nth-child(2){
		line-height: 45px;
	}
	.manage_list .project_info{
		width: 60%;
		margin: 0 auto;
	}
	.manage_list .project_info table{
		width: 100%;
		border-collapse:collapse;
		font-size: 15px;
		border-right: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		margin: 20px 0;
	}
	
	.manage_list .project_info table tr td{
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		text-align: left;
		padding:5px 20px;
		height: 40px;
		font-weight: 700;
	}
	.manage_list .project_info table tr td:nth-child(1) span{
		display: inline-block;
		width: 100%;
		margin: 5px 0;
	}
	.manage_list .project_info .project_title{
		text-align: center;
		background: #f2f2f2;
		font-weight: 700;
	}
	.manage_list .project_info tr{
		background: #EDF9F6;
	}
	.project_content_tr td:nth-child(1){
		width: 33.3%
	}
	.project_content_tr td:nth-child(2){
		width: 33.3%
	}
</style>