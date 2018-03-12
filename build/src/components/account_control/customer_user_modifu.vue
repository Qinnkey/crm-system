<template>
	<div class="customer_user_modifu">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写用户信息-->
			<div class="user_info">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
					<el-row>
						<el-col :span="9">
							<el-form-item label="帐号：" prop="phone">
								<el-input type="text" v-model="ruleForm1.phone" :disabled="true" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						
						<el-col :span="9">
							<el-form-item label="密码：" prop="password1">
								<el-input type="text" v-model="ruleForm1.password1"></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="24">
							<el-form-item label-width="120px">
								<el-button type="success" @click="submitForm1('ruleForm1')">提交</el-button>
								<el-button @click="resetForm('ruleForm1')">取消</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</main_component>
	</div>
</template>

<script>
	import top_component from '@/components/module/component_top'
	import nav_left_component from '@/components/module/component_left'
	import main_component from '@/components/module/component_main'
	import breadcrumb_component from '@/components/module/component_Breadcrumb'
	export default {
		name: "update_salesman",
		data() {
			//手机号码的自定义验证
			var checkPhone = (rule, value, callback) => {
				//console.log(typeof(value))
				if(value==''){
					callback(new Error('请输入手机号码'));
				}else if(!Number.isInteger(value)){
					callback(new Error('请输入数字'));
				}else if(value.toString().length<11){
					callback(new Error('手机号码为11位'))
				}else{
					callback()
				}

			};

			return {

				ruleForm1: {
					phone     : '',				//用户名
					password1    : '',				//密码
				 },
				 rules: {
					password1: [
						{required: true, message: '请输入密码', trigger: 'blur' },
					]
					}
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.loadData();
			//alert(this.$route.query.salephone);
			this.petname = localStorage.CRM_petname;
		},
		methods: {
			//表单1提交
			submitForm1(formName) {
					this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http.post('/list/customerUser/updateCustUser',{
					"token": localStorage.CRM_token,
					"custuserid":this.$route.query.custuserid,
					"phone":this.ruleForm1.phone,
					"password":this.ruleForm1.password1

					}, {emulateJSON: true}
					).then(function(res){
					if(res.body.code==100){
							this.$router.push({path: "/account_supervise"});
							this.$emit("reload", 1);
					}else if(res.body.code==102){
						this.message("修改失败，请求参数错误",'error')
						this.$refs['ruleForm1'].resetFields();
					}else{
						this.message("修改失败",'error')
						this.$refs['ruleForm1'].resetFields();
					}
				})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				
				

			},
			
			//重置表单
			resetForm(formName) {
				//this.$refs[formName].resetFields();
				this.$router.push({path: "/account_supervise"})
			},
			selectOne(){
				this.$http.get('/list/customerUser/selectOne',{
					params:{
						token: localStorage.CRM_token,
						custuserid:this.$route.query.custuserid
					}
				}).then(function(res){
					var json=res.body.data;
					this.ruleForm1 = json;
				})
			},
			loadData(){
				this.selectOne();
			},
			//提示信息
			message(msg, msg_type) {
        		this.$message({
          			message: msg,
          			type: msg_type
        		});
      		},
      //权限改变
      limititem(val) {
        var newVal = [];
        for (var i = 0; i < val.length; i++) {
          for (var j = 0; j < val.length; j++) {
            if (val[j].menutarget == i + 1) {
              newVal.push(val[j])
            }
          }
        }
        if (newVal[9].childList[1].map.updateFun == 0) {
          this.$router.push({path: "/login"})
        }
      }
		}
	}
</script>

<style scoped="scoped">
	.user_info{
		background: white;
		padding-top: 30px;
		padding-left: 30px;
		border-radius: 5px;
	}
	/*更改按钮颜色*/
	.el-button--success{
		background: #2EB398;
		border-color: #2EB398;
	}
	/*更改选择框宽度*/
	.el-select{width: 100%;}
</style>
