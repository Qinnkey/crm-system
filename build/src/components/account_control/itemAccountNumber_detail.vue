<template>
	<div class="add_salesman">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写用户信息-->
			<div class="user_info">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="140px" class="demo-ruleForm">
					<el-row>
						<el-col :span="9">
							<el-form-item label="帐号：" prop="username">
								<el-input type="tel" v-model.number="ruleForm1.username" :disabled="true" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="密码：" prop="password">
								<el-input type="text" v-model="ruleForm1.password" :disabled="true" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="网址：">
								<el-input type="text" v-model.number="ruleForm1.url" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="其他：">
								<el-input type="textarea" v-model="ruleForm1.comments" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						
						<el-col :span="24">
							<el-form-item label-width="120px">
								<el-button @click="resetForm('ruleForm1')">返回</el-button>
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
		name: "add_salesman",
		data() {

			return {
					itemids:[],
				    items:[],
				    url:[],
					form: {
					searchType   : '',
					searchTypeValue: '',
				},
				ruleForm1: {
					username     : '',				//帐号
					password    : '',				//密码
					url   : '',				        //网址
					comments    : '',				//其他
				
				 },
				rules: {
					username: [
						{required: true, message: '请输入帐号', trigger: 'blur' },
					],
					password: [
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
		},
		methods: {
			loadData(){
				this.findAccountByAccountid();
			},
			findAccountByAccountid(){
				this.$http.post('/list/itemAccountNumberController/findAccountByAccountid',{
					"token": localStorage.CRM_token,
					"accountid":this.$route.query.accountid
					}, {emulateJSON: true}
					).then(function(res){
						if(res.body.code==100){
							this.ruleForm1.username = res.body.data.username;
							this.ruleForm1.password = res.body.data.password;
							this.ruleForm1.url = res.body.data.url;
							this.ruleForm1.comments = res.body.data.comments;
						}
					})
			},
			//表单1提交
			submitForm1(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http.post('/list/itemAccountNumberController/update',{
					"token": localStorage.CRM_token,
					"accountid":this.$route.query.accountid,
					"username":this.ruleForm1.username,
					"password":this.ruleForm1.password,
					"url":this.ruleForm1.url,
					"comments":this.ruleForm1.comments

					}, {emulateJSON: true}
					).then(function(res){
					console.log(res)
					if(res.body.code==100){
						//成功提示
						this.message('修改成功','success')
						if(this.$route.query.num==1){
							this.$router.push({path: "/customer_item",query:{custid: this.$route.query.custid, custuserid: this.$route.query.custuserid}})
							this.$emit("reload", 1);
						}else if(this.$route.query.num==2){
							this.$router.push({path: "/account_list"});
							this.$emit("reload", 1);
						}
							
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
					if(this.$route.query.num==1){
							this.$router.push({path: "/customer_item",query:{custid: this.$route.query.custid, custuserid: this.$route.query.custuserid}})
							this.$emit("reload", 1);
						}else if(this.$route.query.num==2){
							this.$router.push({path: "/account_list"});
							this.$emit("reload", 1);
						}
			},
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
        if (newVal[9].childList[1].map.addBtn == 0) {
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
