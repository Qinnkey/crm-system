<template>
	<div class="user_list" @limititem="limititem">
		<main_component>
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
					<el-row>
						<el-col :span="18">
							<b>大客户信息：</b> <br/> <br/>
						</el-col>
						<el-col :span="9">
							<el-form-item label="客户姓名：" prop="bigcontact">
								<el-input type="text" v-model="ruleForm.bigcontact" auto-complete="off" ></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="手机号：" prop="bigphone">
								<el-input type="tel" v-model.number="ruleForm.bigphone" auto-complete="off" ></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="公司名称：" prop="bigcompanyname">								<el-input type="text" v-model="ruleForm.bigcompanyname" auto-complete="off" ></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="公司地址：" prop="bigaddress">
								<el-input type="text" v-model="ruleForm.bigaddress" auto-complete="off" ></el-input>
							</el-form-item>
						</el-col>
						<!--制作要求-->
						<el-col :span="18">
							<b>备注：</b> <br/> <br/>
						</el-col>
						<el-col :span="18">
							<el-form-item label-width="140px" prop="bigremark">
								<el-input type="textarea" placeholder="填写客户提交的附加资料，及需求描述" :rows='5' v-model="ruleForm.bigremark"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24" :offset="1">
							<el-form-item label-width="100px">
								<el-button type="success" @click="submitForm('ruleForm')">提交</el-button>
								<el-button @click="resetForm('ruleForm')">取消</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</main_component>
		<router-view @reload="reload"></router-view>
	</div>
</template>

<script>
	import top_component from '@/components/module/component_top'
	import nav_left_component from '@/components/module/component_left'
	import main_component from '@/components/module/component_main'
	import breadcrumb_component from '@/components/module/component_Breadcrumb'
	export default {
		name: 'user_list',
		data() {
			//手机号码的自定义验证
			var checkPhone = (rule, value, callback) => {
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
				ruleForm: {
					bigcontact     : '',				//姓名
					bigphone    : '',				//手机
					bigcompanyname   : '',				//公司
					bigaddress    : '',				//地址
					bigremark: '',			//公司名称
				},
				rules: {
					bigcontact: [
						{required: true, message: '请输入姓名', trigger: 'change' },
						{ min: 1, max: 32, message: '长度在1到 32 个字符', trigger: 'blur'}
					],
					bigphone: [
						{required: true, validator: checkPhone, trigger: 'blur' }
					],
					bigcompanyname:  [
						{required: true, message: '请输入公司名称', trigger: 'blur' },
						{ min: 1, max: 64, message: '长度在1到 64 个字符', trigger: 'blur'}
					],
					bigaddress: [
						{ min: 1, max: 64, message: '长度在1到 64 个字符', trigger: 'blur'}
					],
					bigremark: [
						{ min: 1, max: 64, message: '长度在1到 64 个字符', trigger: 'blur'}
					]
				},
				bigid:'',
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
			reload: function(text) {
				if(text == 1) {
					this.loadData();
				}
			},
			submitForm(formName) {
				console.log("----------------提交")
				this.$refs[formName].validate((valid) => {
					if(valid) {
						//提交对应的内容
						this.$http.post("/list/bigcustomer/save",{
									//bigid     : this.ruleForm.bigcontact,
									token: localStorage.CRM_token,
									bigcontact     : this.ruleForm.bigcontact,				//姓名
									bigphone    : this.ruleForm.bigphone,				//手机
									bigcompanyname   : this.ruleForm.bigcompanyname,				//微信
									bigaddress    : this.ruleForm.bigaddress,				//邮箱
									bigremark: this.ruleForm.bigremark,			//公司名称
							},{emulateJSON:true }
						).then(function(res){
							if (res.body.code ==100) {
								//成功跳转到对应的首页去
								this.$router.push({ path: "/big_customers" });
								//this.$router.go(0)
								this.$emit("reload", 1);
							}else if(res.body.code==404){
								 this.$message.error('保存失败，请重试');
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName){
				this.$refs[formName].resetFields();
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
        if (newVal[2].childList[0].map.addBtn == 0) {
          this.$router.push({path: "/login"})
        }
      }
		}
	}
</script>

<style lang="less" scoped="scoped">
	.table_list{
		padding-top: 30px;
		background: white;
		border-radius: 5px;
		b{
			display: inline-block;
			margin-left: 50px;
		}
	}
	.el-button--success {
		background: #2EB398;
		border-color: #2EB398;
	}
</style>
