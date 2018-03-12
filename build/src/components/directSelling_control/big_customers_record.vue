<template>
	<div class="user_record" @limititem="limititem">
		<main_component>
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<el-row>
					<el-col :span="20">
						<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;拜访记录</b> <br/> <br/>
					</el-col>
					<!--<el-col :span="2" class="addOne"><a @click="add_one">添加一条</a></el-col>-->
				</el-row>
				<el-form v-model="record_detail" ref="record_detail" label-width="100px" class="demo-ruleForm">
					<div class="record_list" v-for="item in record_detail">
						<el-row>
							<el-col :span="9">
								<el-form-item label="负责人：">
									<el-input  type="text" v-model="item.recordName" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="售后方式：">
									<el-select v-model="item.afterSale_style" placeholder="请选择">
										<el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="联系时间：">
									<el-date-picker type="date" v-model="item.contactTime"></el-date-picker >
								</el-form-item>
							</el-col>
							<el-col :span="18">
								<el-form-item label="回访备注：">
									<el-input  type="textarea" placeholder="填写客户提交的附加资料，及需求描述" :rows='5' v-model="item.explain"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<!--返回按钮-->
					<el-row>
						<el-col :span="4":offset="9">
							<el-form-item>
								<el-button type="primary" @click="submitForm('record_detail')">提交</el-button>
								<el-button @click="resetForm('record_detail')">取消</el-button>
								<!--<el-button @click="toBigCustomersList">返回</el-button>-->
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
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
		name: 'user_record',
		data() {
			return {
				record_detail: [
					{ recordName: null, afterSale_style: null, contactTime: null, explain: null}
				],
				status_options:[
					{label: '电话回访', value: 1},
					{label: '拜访', value: 2},
					{label: '邮件回访', value: 3}
				],
									contact:  [
						{required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在2 到 5 个字符', trigger: 'blur'}
					]
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			//初始化拜访记录
			this.loadData();
		},
		methods: {
			//加载拜访记录
			loadData(){
//				this.$http.get('/list/bigVisitRecord/findBigVisit', {
//					params: {
//						bigid : this.$route.query.bigid
//					}}
//				).then(function(res){
//					console.log(res)
//			        this.record_detail[].recordName = res.body.data[i].salename;
//			        this.record_detail[i].afterSale_style = this.convertToString(res.body.data[i].visitway);
//			        this.record_detail[i].contactTime = res.body.data[i].createdate;
//			        this.record_detail[i].explain = res.body.data[i].visitremarks;
//					}
//				})
			},
			//时间转换
			changeTime(time){
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth()+1;
				var dd = newTime.getDate();
				return (yy+"-"+mm+"-"+dd)
			},
			//添加一条
			add_one(){
				this.record_detail.push({ recordName: null, afterSale_style: null, contactTime: null,explain: null})
			},
			//表单提交
			submitForm(formName) {
					this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http.post('/list/bigVisitRecord/addBigVisit',{
							token: localStorage.CRM_token,
							bigid:this.$route.query.bigid,
							saleid:this.$route.query.saleid,
							salename: this.record_detail[0].recordName,
							visitway: this.record_detail[0].afterSale_style,
							visitremarks: this.record_detail[0].explain,
							createdate: this.changeTime(this.record_detail[0].contactTime),
						}
						).then(function(res){
							console.log(res)
							if(res.code='100'){
								this.$router.push({path: "/big_customers"})
							}
							})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//取消
			resetForm(){
				this.record_detail =[{recordName: null, afterSale_style: null, contactTime: null,explain: null}]
			},
			//返回到上一层
			toBigCustomersList(){
    			this.$router.push({path: '/big_customers'})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.table_list{
		padding-top: 30px;
		padding-left: 30px;
		background: white;
		border-radius: 5px;
		.addOne{
			font-size: 14px;
			color: #2EB398;
			cursor: pointer;
		}
	}
	.record_list{margin-top: 20px;}
</style>
