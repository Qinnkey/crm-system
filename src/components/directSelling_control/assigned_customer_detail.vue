<template>
	<div class="user_list">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<el-form :model="user_detail" ref="user_detail" label-width="140px" class="demo-ruleForm">
					<el-row>
						<el-col :span="18">
							<b>大客户信息：</b> <br/> <br/>
						</el-col>
						<el-col :span="9">
							<el-form-item label="客户姓名：" prop="bigcontact">
								<el-input type="text" v-model="ruleForm.bigcontact" auto-complete="off" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="手机号：" prop="bigphone">
								<el-input type="tel" v-model.number="ruleForm.bigphone" auto-complete="off" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="公司名称：" prop="bigcompanyname">
								<el-input type="text" v-model="ruleForm.bigcompanyname" auto-complete="off" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="公司地址：" prop="bigaddress">
								<el-input type="text" v-model="ruleForm.bigaddress" auto-complete="off" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						
						<!--制作要求-->
						<el-col :span="18">
							<b>备注：</b> <br/> <br/>
						</el-col>
						<el-col :span="18">
							<el-form-item label-width="140px" prop="bigremark">
								<el-input type="textarea" placeholder="填写客户提交的附加资料，及需求描述" :rows='5' v-model="ruleForm.bigremark" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				
				<!---->
				<el-col :span="24">
					<el-collapse v-model="activeNames" style="margin: 20px 0;">
						<el-collapse-item title="拜访记录" name="1">
							<el-table :data="tableData1" style="width: 100%">
								<el-table-column prop="salename" 	label="业务员" width="200"></el-table-column>
								<el-table-column prop="createdate" label="拜访时间" ></el-table-column>
								<el-table-column prop="visitwayname" 	label="拜访方式"></el-table-column>
								<el-table-column prop="visitremarks" 	label="备注"></el-table-column>
							</el-table>
						</el-collapse-item>
					</el-collapse>
				</el-col>
				
				<el-col :span="4":offset="9">
					<router-link to="/assigned_customer"><el-button style="margin-bottom: 40px;">返回</el-button></router-link>
				</el-col>
			</div>
		</main_component>
		<router-view></router-view>
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
			return {
				bigid:'',
				ruleForm: {
					bigcontact     : '',				//姓名
					bigphone    : '',				//手机
					bigcompanyname   : '',				//公司
					bigaddress    : '',				//地址
					bigremark: '',			//公司名称
				},
				activeNames: ['1'],
				tableData1 : [],
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.bigid = this.$route.query.bigid;
			this.$http.get('/list/bigcustomer/detail',{
				params: {
					token: localStorage.CRM_token,
					userId:this.bigid,
				}}).then(function(res){
				this.ruleForm = res.body.data;
				}
			);
			//回访记录list
			this.$http.get('/list/bigVisitRecord/findBigVisit',{
				params: {
					token: localStorage.CRM_token,
					bigid:this.bigid,
				}}).then(function(res){
					console.log(res);
				this.tableData1 = res.body.data;
				
			});
			this.petname = localStorage.CRM_petname;
		},
		methods: {
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
		        if (newVal[2].childList[1].map.detailFun == 0) {
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
		border: 1px solid #CCCCCC; 
		border-radius: 5px;
		b{
			display: inline-block;
			margin-left: 50px;
		}
	}
</style>
