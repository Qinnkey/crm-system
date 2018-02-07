<template>
	<div class="training_item_add" @limititem="limititem">
		<main_component>
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
					<el-row>
						<el-col :span="16">
							<b>项目信息：</b> <br/> <br/>
						</el-col>
						<el-col :span="9">
							<el-form-item label="项目类型：" prop="itemType">
								<el-select v-model="ruleForm.itemType" placeholder="选择项目类型">
									<el-option v-for="item in itemTypes" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="项目名称：" prop="itemName">								
								<el-input type="text" v-model="ruleForm.itemName" auto-complete="off" placeholder="请输入项目名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24" :offset="1">
							<el-form-item label-width="70px">
								<el-button type="success" @click="submitForm('ruleForm')">提交</el-button>
								<el-button @click="resetForm('ruleForm')">重置</el-button>
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
		name: 'training_item_add',
		data() {
			return {
				itemTypes: [{
						label: '企业版',
						value: 1
					},
					{
						label: '门户版',
						value: 2
					},
					{
						label: '电商版',
						value: 3
					},
					{
						label: '微商app',
						value: 4
					},
					{
						label: '小程序',
						value: 5
					},
					{
						label:'阿凡提',
						value:6
					},
					{
						label:'汇搜云',
						value:7
					}
				],
				ruleForm: {
					itemType : 1,				        //项目类型
					itemName : '',				    //项目名称
				},
				rules: {
					itemName:  [
						{required: true, message: '请输入项目名称', trigger: 'blur' },
						{ min: 1, max: 64, message: '长度在1到 64 个字符', trigger: 'blur'}
					]
				},
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
//			this.petname = localStorage.CRM_petname;
			this.intentioncustid=this.$route.query.intentioncustid;
			this.courseid=this.$route.query.courseid;
		},
		methods: {
			//表单1提交
			reload: function(text) {
				if(text == 1) {
					this.loadData();
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						//提交对应的内容
						this.$http.post("/list/intentionItem/save",{
									token: localStorage.CRM_token,
									itemtype  : this.ruleForm.itemType,				
									name    : this.ruleForm.itemName,
									intentioncustid : this.intentioncustid,
									courseid : this.courseid,
							},{emulateJSON:true }
						).then(function(res){
							if (res.body.code ==100) {
								//成功跳转到对应的首页去
								this.$router.push({ path: "/training_list" });
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
        if (newVal[8].childList[0].map.addBtn == 0) {
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
