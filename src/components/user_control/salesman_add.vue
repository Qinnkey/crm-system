<template>
	<div class="add_salesman">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写用户信息-->
			<div class="user_info">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
					<el-row>
						<el-col :span="9">
							<el-form-item label="业务员名称：" prop="salename">
								<el-input type="text" v-model="ruleForm1.salename" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="手机号：" prop="salephone">
								<el-input type="tel" v-model.number="ruleForm1.salephone" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="微信号：">
								<el-input type="text" v-model.number="ruleForm1.saleweixin"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="邮箱：">
								<el-input type="email" v-model="ruleForm1.saleemail"></el-input>
							</el-form-item>
						</el-col>
								<el-input type="hidden" v-model="ruleForm1.salestatus" ></el-input>


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
		name: "add_salesman",
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
					salename     : '',				//姓名
					salephone    : '',				//手机
					saleweixin   : '',				//微信
					saleemail    : '',				//邮箱
					salestatus   : '1',              //业务员状态：1为正常，2为禁用
				 },
				rules: {
					salename: [
						{required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在2 到 5 个字符', trigger: 'blur'},
					],
					salephone: [
						{required: true, validator: checkPhone, trigger: 'blur' },
					]
				}
			}
		},
		components: {

			main_component,
			breadcrumb_component
		},
		created: function() {
			this.petname = localStorage.CRM_petname;
		},
		methods: {
			//表单1提交
			submitForm1(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http.post('/list/salesman/add',{
					"token": localStorage.CRM_token,
					"salename":this.ruleForm1.salename,
					"salephone":this.ruleForm1.salephone,
					"saleweixin":this.ruleForm1.saleweixin,
					"saleemail":this.ruleForm1.saleemail,
					"leader":0,
					"salestatus":this.ruleForm1.salestatus

					}, {emulateJSON: true}
					).then(function(res){
					console.log(res)
					if(res.body.code==100){
						//成功提示
						this.message('添加成功','success')
							this.$router.push({path: "/salesman_list"})
							this.$emit("reload", 1);
					}else if(res.body.code==102){
						this.message("添加失败，手机号已存在",'error')
						this.$refs['ruleForm1'].resetFields();
					}else{
						this.message("添加失败",'error')
						this.$refs['ruleForm1'].resetFields();
					}
				}),
				
					this.$http.post('/list/employee/save',{
					"token": localStorage.CRM_token,
					"empname":this.ruleForm1.salename,
					"empphone":this.ruleForm1.salephone,
					"empweixin":this.ruleForm1.saleweixin,
					"empemail":this.ruleForm1.saleemail
					}, {emulateJSON: true}
					).then(function(res){
					console.log(res)
					if(res.body.code==100){
						//成功提示
						this.message('添加成功','success')
							this.$router.push({path: "/salesman_list"})
							this.$emit("reload", 1);
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
				this.$router.push({path: "/salesman_list"})
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
        if (newVal[0].childList[1].map.addBtn == 0) {
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
