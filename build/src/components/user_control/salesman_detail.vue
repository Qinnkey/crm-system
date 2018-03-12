<template>
	<div class="update_salesman">
		<!--<top_component :petname="petname"></top_component>-->
		<!--<nav_left_component></nav_left_component>-->
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写用户信息-->
			<div class="user_info">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
					<el-row>
						<el-col :span="9">
							<el-form-item label="业务员名称：" prop="salename">
								<el-input :disabled="true" type="text" v-model="ruleForm1.salename" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="手机号：" prop="salephone">
								<el-input :disabled="true" type="tel" v-model.number="ruleForm1.salephone" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="微信号：">
								<el-input :disabled="true" type="text" v-model.number="ruleForm1.saleweixin"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="邮箱：">
								<el-input :disabled="true" type="email" v-model="ruleForm1.saleemail"></el-input>
							</el-form-item>
						</el-col>
						<el-input  type="hidden" v-model="ruleForm1.saleid" ></el-input>
						<el-col :span="4":offset="9">
							<router-link to="/salesman_list"><el-button style="margin-bottom: 40px;">返回</el-button></router-link>
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
			return {
				ruleForm1: {
					salename     : '',				//姓名
					salephone    : '',				//手机
					saleweixin   : '',				//微信
					saleemail    : '',				//邮箱
					saleid   	 : '',              //业务员状态：1为正常，2为禁用
				 },

			}
		},
		components: {
				/*top_component,
			nav_left_component,*/
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.loadData();
			//alert(this.$route.query.salephone);
			this.petname = localStorage.CRM_petname;
		},
		methods: {

			loadData(){
				this.$http.get('/list/salesman/findSaleBySalephone',{
					params:{
						token: localStorage.CRM_token,
						salephone:this.$route.query.salephone
					}
				}).then(function(res){
					var json=res.body.data;
					this.ruleForm1 = json;
				})
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
        if (newVal[0].childList[1].map.detailFun == 0) {
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
