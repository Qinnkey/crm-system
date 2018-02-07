<template>
	<div class="modify_password">
		<div class="modify_password_top">
			<div class="welcome_wenzi">欢迎登陆，账号管理系统</div>
		</div>
		<div class="modify_password_middle">
			<span>
				<img src="../../../static/img/会搜拷贝.png" alt="" />
			</span>
			<span>
				修改密码
			</span>
		</div>
		<div class="form">
			<el-form :model="formInline" class="demo-form-inline" label-width="120px" :rules="rules" ref="formInline">
				<!--<el-row>-->
					<!--旧密码-->
					<!--<el-col :span="15">
						<el-form-item label="请输入旧密码：" prop="old_pswd">
							<el-input size="medium" v-model="formInline.old_pswd" placeholder="请输入旧密码"></el-input>
						</el-form-item>
					</el-col>-->
				<!--</el-row>-->
				<el-row>
					<!--新密码-->
					<el-col :span="15">
						<el-form-item label="请输入新密码：" prop="new_pswd">
							<el-input size="medium" v-model="formInline.new_pswd" placeholder="请输入新密码"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<!--<el-row>
					<!--重复新密码--
					<el-col :span="15">
						<el-form-item label="重复新密码：" prop="qr_pswd">
							<el-input size="medium" v-model="formInline.qr_pswd" placeholder="重复新密码"></el-input>
						</el-form-item>
					</el-col>
				</el-row>-->
				<el-row>
					<!--重复新密码-->
					<el-col :span="15">
						<el-form-item>
					    	<el-button type="primary" @click="onSubmit('formInline')">确认修改</el-button>
					    	<el-button @click="onReturn">返回</el-button>
					  	</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default({
		name : "modify_password"	,
		data(){
			var newPassword = (rule, value, callback) =>{
				if (value == '' || value.replace(/\s+/g,"").length ==0) {
					callback(new Error('输入新密码不能为空'));
				}else{
					callback();
				}
			};
//			var qrPassword = (rule, value, callback) =>{
//				if (value == '' || value.replace(/\s+/g,"").length ==0) {
//					callback(new Error('重复新密码不能为空'));
//				}else{
//					callback();
//				}
//			};
			return{
				formInline:{
					old_pswd 	: 	""		,
					new_pswd 	: 	""		,
					qr_pswd		:	""		,
				},
				rules:{
					new_pswd: [
						{required: true, validator: newPassword,trigger: 'blur' },
					],
//					qr_pswd: [
//						{required: true, validator: qrPassword, trigger: 'blur' },
//					],
				}
			}
		},
		methods:{
			onReturn(){
				this.$router.push({path: "/manage_list"});
			},
			onSubmit(formName){
				this.$refs[formName].validate((valid) => {
						if(valid) {
//							if (this.formInline.new_pswd != this.formInline.qr_pswd){
//								this.$message.error('输入新密码和重复新密码必须相同');
//								return false;
//							} else if (this.formInline.new_pswd == this.formInline.qr_pswd){
								this.$http.post('/list/customerUser/update',{
									token: localStorage.CRM_token,
									custuserid:localStorage.CRM_userid,
									password:this.formInline.new_pswd,
									loginSign:localStorage.loginSign
								},{emulateJSON: true}).then(function(res){
//                                  this.$message({
//        				                message: '恭喜你，密码修改成功',
//        				                type: 'success'
//     				             });
       				         		this.$router.push({path: "/manage_list"});
								})								
//							}
						} else {
							console.log('error submit!!');
							return false;
						}
				});
			}
		}
	})
</script>
<style>
	.modify_password .el-form-item__content{
		text-align: left;
	}
</style>
<style scoped="scoped" lang="less">
	.modify_password{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		background: white;
	}
	.modify_password_top{
		height: 150px;
		background-image: url('../../../static/img/1920x360.png');
	}
	.modify_password_top .welcome_wenzi{
		height: 100%;
		font-size:35px;
		color: #fff;
		line-height: 150px;
		text-align: center;
		letter-spacing: 3px;
		font-family:'PingFang SC', Helvetica, Arial, sans-serif
	}
	.modify_password_middle{
		padding: 100px 0;
		display: flex;
		align-items: center;
		text-align: center;
	}
	.modify_password_middle span:nth-child(1){
		display: inline-block;
		width: 150px;
		height: 40px;
		margin-left: 30%;
	}
	.modify_password_middle span:nth-child(2){
		display: inline-block;
		width: 150px;
		height: 35px;
		border-left: 1px solid #e5e5e5;
		line-height:35px;
		font-family:'PingFang SC', Helvetica, Arial, sans-serif
	}
	.form form{
		position: relative;
		width: 50%;
		left: 60%;
		transform: translateX(-50%);
	}
</style>