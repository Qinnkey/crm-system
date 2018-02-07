<template>
	<div class="add_user" @limititem="limititem">
		<main_component>
			<breadcrumb_component></breadcrumb_component>
			<!--填写用户信息-->
			<div class="user_info">
				<el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
					<el-row>
						<el-col :span="9">
							<el-form-item label="姓名：" prop="contact">
								<el-input type="text" v-model="ruleForm2.contact" auto-complete="off" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="手机号：" prop="phone">
								<el-input type="tel" v-model.number="ruleForm2.phone" auto-complete="off" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="微信号：" prop="weixin">
								<el-input type="number" v-model.number="ruleForm2.weixin" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="邮箱：" prop="email">
								<el-input type="email" v-model="ruleForm2.email" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="企业名称：" prop="companyname">
								<el-input type="text" v-model="ruleForm2.companyname" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="企业介绍：" prop="companyintro">
								<el-input type="text" v-model="ruleForm2.companyintro" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="项目全称：" prop="itemname">
								<el-input type="text" v-model="ruleForm2.itemname" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="开始时间：" prop="itembegindate">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm2.itembegindate" style="width: 100%;" :disabled="true"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="结束时间：" prop="itemenddate">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm2.itemenddate" style="width: 100%;" :disabled="true"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="总金额：" prop="allmoney">
								<el-input type="tel" v-model.number="ruleForm2.allmoney" auto-complete="off" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="开发费：" prop="developmoney">
								<el-input type="tel" v-model.number="ruleForm2.developmoney" auto-complete="off" :disabled="true">></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="服务费：" prop="servicemoney">
								<el-input type="tel" v-model.number="ruleForm2.servicemoney" auto-complete="off" :disabled="true">></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6" :offset="6">
							<el-form-item label-width="100px">
								<el-button style="margin-bottom: 40px;" @click="back">返回</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!--<trade_tabs id="tradTabs"></trade_tabs>-->
			<trade_list_detail id="tradlistdetail"></trade_list_detail>
		</main_component>
	</div>
</template>

<script>
	import top_component from '@/components/module/component_top'
	import nav_left_component from '@/components/module/component_left'
	import main_component from '@/components/module/component_main'
	import breadcrumb_component from '@/components/module/component_Breadcrumb'
	import trade_list_detail from '@/components/trade_control/trade_list_detail'
	export default {
		name: "add_user",
		data() {
			return {
				status_options: [
					{label:'优', value: 1},
					{label: '良', value:2}
				],								//状态选项
				appraisal: ['差','一般','好'],	//评价
				ruleForm2: {
					contact     : '',				//姓名
					phone    : '',				//手机
					weixin   : '',				//微信
					email    : '',				//邮箱
					companyname: '',			//公司名称
					companyintro: '',			//公司简介
					itemname : '',				//项目全称
					itembegindate: '',				//开始时间
          			itemenddate  : '',				//结束时间
          			appraisal: null,			//评价
          			status   : null,			//服务状态
          			explain  : null,			//制作说明
          			dialogImageUrl: '',			//上传图片url
        			dialogVisible : false,		//上传框显示与否
				},
				rules: {
					allmoney: [
						{type:'number', min:1, max:1000000000, message: '请输入数字', trigger: 'blur'}
					],
					developmoney: [
						{type:'number', min:1, max:1000000000, message: '请输入数字', trigger: 'blur'}
					],
					servicemoney: [
						{type:'number', min:1, max:1000000000, message: '请输入数字', trigger: 'blur'}
					]
				}
			}
		},
		components: {
			main_component,
			breadcrumb_component,
			trade_list_detail
		},
		created: function() {
			console.log(this.$route.query.itemid);
			this.$http.get('/list/customer/detailedInfo?itemid='+this.$route.query.itemid+'&token='+localStorage.CRM_token).then(function(res){
			    //加载json对象，如果是json字符串要eval()转成json对象
         		this.ruleForm2 = res.body.data;
			})
			this.petname = localStorage.CRM_petname;
		},
		methods: {
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
      		back(){
      			this.$router.go(-1);
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
        if (newVal[1].childList[0].map.reviewFun == 0 && newVal[1].childList[1].detailFun == 0) {
          this.$router.push({path: "/login"})
        }
      }
		}
	}
</script>

<style scoped="scoped">
	.el-button--success{
		background: #2EB398;
		border-color: #2EB398;
	}
	#tradTabs{
		padding: 20px;
		margin-top: 40px;
	}
	.user_info{
		background: white;
		padding: 20px;
		border-radius: 5px;
	}
</style>
