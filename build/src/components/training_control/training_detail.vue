<template>
	<div class="user_record">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<el-col :span="18" style="padding-left: 20px;">
					<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;培训人详情</b> <br/> <br/>
				</el-col>
				<el-form ref="ruleForm1" label-width="100px" class="demo-ruleForm">
					<div class="record_list" >
											<el-row>
						<el-col :span="9">
							<el-form-item label="客户姓名：" prop="name">
								<el-input type="text" v-model="ruleForm1.name" auto-complete="off" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="客户公司：">
								<el-input type="text" v-model="ruleForm1.companyname" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="客户手机号：" prop="phone">
								<el-input type="tel" v-model.number="ruleForm1.phone" auto-complete="off" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="公司地址：">
								<el-input type="text" v-model="ruleForm1.address" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="销售员：">
								<el-input type="text" v-model="ruleForm1.username" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="业务员：">
								<el-input type="text" v-model="ruleForm1.salename" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="课程名称：">
								<el-input type="text" v-model="ruleForm1.coursename" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="课程时间：" prop="coursetime" :disabled="true">
								<el-input type="text" v-model="ruleForm1.coursetime" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="课程地址：" prop="courseaddress" :disabled="true">
								<el-input type="text" v-model="ruleForm1.courseaddress" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					</div>
					<!--返回按钮-->
					<el-row>
						<el-col :span="4":offset="9">
							<!--<el-button  type="primary" style="margin-bottom: 20px;"  @click="submitForm()">添加</el-button> &nbsp;&nbsp;&nbsp;-->
							<el-button style="margin-bottom: 20px;"  @click="returnPage()">返回</el-button>
						</el-col>
					</el-row>
				<el-row >
					<el-col :span="24" >
						<el-collapse v-model="activeNames" style="margin: 10px 0;">
							<el-collapse-item title="新增项目记录" name="1">
								<el-table :data="tableData1" style="width: 100%">
									<el-table-column prop="itemtypename" label="项目类型" width="150"></el-table-column>
									<el-table-column prop="name" label="项目名称" width="200"></el-table-column>
									<el-table-column prop="coursename" label="相关课程" width="200"></el-table-column>
									<el-table-column prop="courseaddress" label="课程地点" width="200"></el-table-column>
									<el-table-column prop="createdate" label="添加时间"></el-table-column>
								</el-table>
							</el-collapse-item>
						</el-collapse>
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
		name: 'user_record',
		data() {
			return {
				pickerOptions0: {
			          disabledDate(time) {
			            return time.getTime() > Date.now();
			          }
			        },
				tableData1:[],
				activeNames:["1"],
				itemid:'',
				ruleForm1: {
					name     : '',				     //客户姓名
					phone    : '',				     //客户手机号
					companyname    : '',		 //公司名称
					address : '',			         //公司地址
					salename:'',                  //业务员
					username:'',                  //销售员
					coursename:'',              //课程名称
					coursetime:'',                //课程时间
					courseaddress:'',           //课程地址
					
				},
				pagetype:null
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.trainingrecordid=this.$route.query.trainingrecordid;
			this.intentioncustid=this.$route.query.intentioncustid;
			this.courseid=this.$route.query.courseid;
			this.loadData();
			this.loadTableData1();
		},
		methods: {
			loadData(){
					this.$http.get('/list/training/find',{
					params :{
						token: localStorage.CRM_token,
						trainingrecordid:this.trainingrecordid
					}
				}).then(function(res){
					if(res.body.code==100 && res.body.data!= null){
						var json = res.body.data;
						this.ruleForm1.name = json.name;
						this.ruleForm1.phone = json.phone;
						this.ruleForm1.companyname=json.companyname;
						this.ruleForm1.address=json.address;
						this.ruleForm1.salename=json.salename;
						this.ruleForm1.username=json.username;
						this.ruleForm1.coursename=json.coursename;
						this.ruleForm1.coursetime=json.coursetime;
						this.ruleForm1.courseaddress=json.courseaddress;
					}else{
						this.$emit("reload", 1);
					}
				})
			},
			//新增项目记录
			loadTableData1(){
				//加载所有的内容
				this.$http.get("/list/intentionItem/list",{
					params:{
						token: localStorage.CRM_token,
						intentioncustid:this.intentioncustid,
						courseid:this.courseid,
					}
				}).then(function(res){
					if(res.body.code==100&&res.body.data!=null){
						this.tableData1=res.body.data;
						console.log(this.tableData1)
					}else if(res.body.code==404){
						console.log(res);
					}
				})
			},
				changeTime(time){
				//console.log("--"+time)
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth() + 1;
				var dd = newTime.getDate();
				return(yy + "-" + mm + "-" + dd)
			},
			returnPage(){
				this.$router.push({path: "/training_list"});
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
        	if (newVal[8].childList[0].map.visitHisFun == 0) {
          		this.$router.push({path: "/login"})
        		}
      		}
		}
	}
</script>

<style scoped="scoped">
	.table_list{
		padding-top: 30px;
		
		background: white;
		border-radius: 5px;
	}
	.record_list{margin-top: 20px;
		padding-left: 20px;
	}
</style>
