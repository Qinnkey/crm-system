<template>
	<div class="user_record">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<el-col :span="18" style="padding-left: 20px;">
					<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日志添加</b> <br/> <br/>
				</el-col>
				<el-form ref="record_detail" label-width="100px" class="demo-ruleForm">
					<div class="record_list" >
						<el-row>
							<el-col :span="9">
								<el-form-item label="客户姓名：">
									<el-input  type="text" :disabled="true" v-model="record_detail.contact" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
						<el-col :span="9">
								<el-form-item label="售后方式：">
									<el-select v-model="record_detail.visitwayname">
										<el-option label="电话回访" value="1"></el-option>
										<el-option label="到访" value="2"></el-option>
										<el-option label="邮件回访" value="3"></el-option>
										<el-option label="微信回访" value="4"></el-option>
										<el-option label="qq回访" value="5"></el-option>
										<el-option label="日常备注" value="6"></el-option>
									</el-select>
								</el-form-item>
						 </el-col>
							<el-col :span="9">
								<el-form-item label="企业名称：">
									<el-input  type="公司" :disabled="true" v-model="record_detail.company"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="项目名称：">
									<el-input  type="text" :disabled="true" v-model="record_detail.itemname"></el-input>
								</el-form-item>
							</el-col>
						
							<el-col :span="9">
								<el-form-item label="联系时间：">
									<el-date-picker type="date" :picker-options="pickerOptions0" v-model="record_detail.createdate"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="业务员：">
									<el-input  type="text"  :disabled="true" v-model="record_detail.salename"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="18">
								<el-form-item label="回访备注：">
									<el-input  type="textarea"  placeholder="填写客户提交的附加资料，及需求描述" :rows='5' v-model="record_detail.visitremarks"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<!--返回按钮-->
					
					<el-row>
						<el-col :span="4":offset="9">
							<el-button  type="primary" style="margin-bottom: 20px;"  @click="submitForm()">添加</el-button> &nbsp;&nbsp;&nbsp;
							<el-button style="margin-bottom: 20px;"  @click="returnPage()">返回</el-button>
						</el-col>
					</el-row>
					
				<el-row >
					<el-col :span="24" >
						<el-collapse v-model="activeNames" style="margin: 10px 0;">
							<el-collapse-item title="回访记录" name="1">
								<el-table :data="tableData1" style="width: 100%">
									<el-table-column prop="contact" label="客户姓名" width="150"></el-table-column>
									<el-table-column prop="salename" label="业务员" width="150"></el-table-column>
									<el-table-column prop="createdate" label="服务时间" width="150"></el-table-column>
									<el-table-column prop="visitwayname" label="服务方式"></el-table-column>
									<el-table-column prop="visitremarks" label="回访备注"></el-table-column>	
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
				record_detail: {
				contact:null,
				visitwayname:null,
				createdate:null,
				visitremarks:null,
				salename:null,
				company:null,
				itemname:null
				},
				record_details:[]
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.itemid=this.$route.query.itemid;
			this.loadData();
			this.loadList();
		},
		methods: {
			loadData(){
				
					this.$http.get('/list/customer/findSaleAndCustomer',{
					params :{
						token: localStorage.CRM_token,
						itemid:this.itemid
					}
				}).then(function(res){
					if(res.body.code==100){
						var json = res.body.data;
						this.record_detail.contact = json.contact;
						this.record_detail.salename = json.salename;
						this.record_detail.itemname=json.itemname;
						this.record_detail.company=json.companyname;
					}else if(res.body.code==102){
						this.$message('没有这个项目','error')
						this.$router.push({path: "/after_sales"})
							this.$emit("reload", 1);
					}else{
						this.$message('报错','error')
						this.$router.push({path: "/after_sales"})
							this.$emit("reload", 1);
					}
				})
			},
			loadList(){
					//加载所有的内容
				
				this.$http.get("/list/visitRecord/lisitVisit",{
					params:{
						token: localStorage.CRM_token,
						itemid:this.itemid
					}
				}).then(function(res){
					if(res.body.code==100&&res.body.data!=null&&res.body.data.list!=null){
						this.tableData1=res.body.data.list;
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
					this.$router.push({path: "/customer_change"})
			}	
			,
			//提交
			submitForm(){

				//判断售后方式是否选中
				if(this.record_detail.visitwayname==null){
					this.$message('添加失败,售后方式未选','error');
					return false;
				}
				this.$http.post('/list/visitRecord/addVisit',{
					'token': localStorage.CRM_token,
					'itemid':this.$route.query.itemid,
					'visitway':this.record_detail.visitwayname,
					'createdate':this.record_detail.createdate ? this.changeTime(this.record_detail.createdate) : '',
					'visitremarks':this.record_detail.visitremarks
				},{emulateJSON: true}).then(function(res){
					console.log(res)
			if(res.body.code==100){	
						this.$message('添加成功','success');
						this.record_detail.visitwayname=null;
						this.record_detail.createdate=null;
						this.record_detail.visitremarks=null;
						this.loadList();
					}else if(res.body.code==102){
						this.$message('添加失败,没有该项目','error')
						this.$router.push({path: "/after_sales"})
							this.$emit("reload", 1);

					}else{
						this.$message('添加失败','error')
						this.$router.push({path: "/after_sales"})
							this.$emit("reload", 1);

					}
				})

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
        if (newVal[0].childList[0].map.visitHisFun == 0) {
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
