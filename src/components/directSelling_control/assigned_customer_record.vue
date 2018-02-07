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
									<el-input :disabled="true" type="text" v-model="item.recordName" auto-complete="off"></el-input>
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
									<el-date-picker type="date" v-model="item.contactTime" :picker-options="pickerOptions0"></el-date-picker >
								</el-form-item>
							</el-col>
							<el-col :span="18">
								<el-form-item label="回访备注：">
									<el-input type="textarea" placeholder="填写客户提交的附加资料，及需求描述" :rows='5' v-model="item.explain"></el-input>
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
		<router-view @reload="reload"></router-view>
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
				//时间选择限定
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				record_detail: [
					{ recordName: null, afterSale_style: 1, contactTime: null, explain: null}
				],
				status_options:[
					{label: '电话回访', value: 1},
					{label: '拜访', value: 2},
					{label: '邮件回访', value: 3}
				],
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
			//页面数据实时更改
			reload: function(text){
				if (text == 1){
					this.loadData(this.currentPage)
				}
			},
			//加载拜访记录
			loadData(){
				this.$http.get('/list/bigcustomer/detail', {
					params: {
						token: localStorage.CRM_token,
						userId : this.$route.query.bigid
					}}
				).then(function(res){
					console.log(res);
			        this.record_detail[0].recordName = res.body.data.salename;
				})
			},
			//添加一条
			add_one(){
				this.record_detail.push({ recordName: null, afterSale_style: null, contactTime: null,explain: null})
			},
			//表单提交
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						console.log(this.record_detail)
						this.$http.post('/list/bigVisitRecord/addBigVisit',{
							token: localStorage.CRM_token,
							bigid: this.$route.query.bigid,
							saleid: this.$route.query.saleid,
							salename: this.record_detail[0].recordName,
							visitway: this.record_detail[0].afterSale_style,
							visitremarks: this.record_detail[0].explain,
							createdate: this.record_detail[0].contactTime? this.changeTime(this.record_detail[0].contactTime): '',
						},{emulateJSON: true}).then(function(res){
							console.log(res)
							if(res.body.code='100'){
								this.$router.push({path: "/assigned_customer"});
								this.$emit('reload', 1);
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
//				this.record_detail =[{recordName: this.record_detail[0].recordName,afterSale_style:1, contactTime: null,explain: null}]
				this.$router.push({path: "/assigned_customer"})
			},
			//时间转换
			changeTime(time){
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = (newTime.getMonth()+1)>10?(newTime.getMonth()+1):'0'+(newTime.getMonth()+1);
				var dd = newTime.getDate()>10?newTime.getDate():"0"+newTime.getDate();
				return (yy+"-"+mm+"-"+dd)
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
        if (newVal[2].childList[1].map.visitFun == 0) {
          this.$router.push({path: "/login"})
        }
      }
		}
	}
</script>

<style lang="less" scoped="scoped">
	.table_list{
		padding-top: 30px;
		padding-left: 30px;
		background: white;
		border: 1px solid #CCCCCC;
		border-radius: 5px;
		.addOne{
			font-size: 14px;
			color: #2EB398;
			cursor: pointer;
		}
	}
	.el-select, .el-date-editor {
		width: 100%;
	}
	.record_list{margin-top: 20px;}
</style>
