<template>
	<div class="trade_tabs">
		<!--交易tabs信息-->
		<div>
			<el-tabs v-model="activeName" type="card" label-width="100px" class="demo-ruleForm" >
			    <!--交易tab-->
				<el-tab-pane label="预付订金" name="reserve" :disabled="tradetypeval!=0 && tradetypeval!=2">
			    	<!--尾款交易tab-->
					<div class="user_info">
						<el-form :model="reserveitems" :rules="rules" ref="reserveitems" label-width="100px" class="demo-ruleForm">
							<el-col :span="9">
								<el-form-item label="预付金额：" prop="advancemoney">
									<el-input type="text" v-model="reserveitems.advancemoney" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="交易时间：" prop="tradedate">
									<el-date-picker type="date" placeholder="选择日期" v-model="reserveitems.tradedate" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="交易凭证号：" prop="voucherno">
									<el-input type="text" v-model="reserveitems.voucherno" auto-complete="off" ></el-input>
								</el-form-item>
							</el-col>
							<div v-if="reserveitems.auditstatus==0">
								<el-col :span="24">
									<el-form-item label-width="100px">
										<el-button type="success" @click="submitReserveForm('reserveitems',1)">审核通过</el-button>
										<el-button type="success" @click="submitReserveForm('reserveitems',2)">审核不通过</el-button>
									</el-form-item>
								</el-col>
							</div>
							<div v-else>
								<el-col :span="9">
									<el-form-item label="审核结果：">
										<el-input type="text" v-model="reserveitems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
							</div>
						</el-form>
					</div>
			    </el-tab-pane>
			    
			    <el-tab-pane label="尾款交易" name="remain" :disabled="tradetypeval!=3">
			    	<!--尾款交易tab-->
					<div class="user_info">
						<el-form v-model="remainitems" :rules="rules" ref="remainitems" label-width="100px" class="demo-ruleForm">
							<el-row>
								<el-col :span="9">
									<el-form-item label="交易金额：" prop="advancemoney">
										<el-input type="text" v-model="remainitems.advancemoney" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="交易时间：" prop="tradedate">
										<el-date-picker type="date" placeholder="选择日期" v-model="remainitems.tradedate" style="width: 100%;" :disabled="true"></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="负责人：" >
										<el-input type="text" v-model="remainitems.salename" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="评价：" >
										<el-radio-group v-model="remainitems.evaluationtypename">
										    <el-radio-button v-for="eval in appraisal" :label="eval" :key="eval"></el-radio-button>
			 							</el-radio-group>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="交易凭证号：" prop="voucherno">
										<el-input type="text" v-model="remainitems.voucherno" auto-complete="off"></el-input>
									</el-form-item>
								</el-col>
								<div v-if="remainitems.auditstatus==0">
									<el-col :span="24">
										<el-form-item label-width="100px">
											<el-button type="success" @click="submitRemainForm('remainitems',1)">审核通过</el-button>
											<el-button type="success" @click="submitRemainForm('remainitems',2)">审核不通过</el-button>
										</el-form-item>
									</el-col>	
								</div>
								<div v-else>
									<el-col :span="9">
										<el-form-item label="审核结果：" >
										<el-input type="text" v-model="remainitems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
									</el-col>	
								</div>
							</el-row>							
						</el-form>
					</div>
			    </el-tab-pane>
			    
			    <el-tab-pane label="续费记录" name="renew" :disabled="tradetypeval!=1">
			    	<!--续费记录tab-->
					<div class="user_info">
						<el-form v-model="renewitems" :rules="rules" ref="renewitems" label-width="100px" class="demo-ruleForm">
							<el-row></el-row>
								<el-col :span="9">
									<el-form-item label="预付金额：" prop="advancemoney">
										<el-input type="text" v-model="renewitems.advancemoney" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="交易时间：" prop="tradedate">
										<el-date-picker type="date" placeholder="选择日期" v-model="renewitems.tradedate" style="width: 100%;" :disabled="true"></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="付费方式：" prop="tradewayname">
										<el-input type="text" v-model="renewitems.tradewayname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="付费账户：" prop="payaccount">
										<el-input type="text" v-model="renewitems.payaccount" auto-complete="off"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="交易凭证号：" prop="voucherno">
										<el-input type="text" v-model="renewitems.voucherno" auto-complete="off"></el-input>
									</el-form-item>
								</el-col>
								<div v-if="renewitems.auditstatus==0">
									<el-col :span="24">
										<el-form-item label-width="100px">
											<el-button type="success" @click="submitRenewForm('renewitems',1)">审核通过</el-button>
											<el-button type="success" @click="submitRenewForm('renewitems',2)">审核不通过</el-button>
										</el-form-item>
									</el-col>
								</div>
								<div v-else>
									<el-col :span="9">
										<el-form-item label="审核结果：" >
										<el-input type="text" v-model="renewitems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
									</el-col>	
								</div>
							</el-row>
						</el-form>
					</div>
			    </el-tab-pane>
			    
			    <el-tab-pane label="退款记录" name="refund" :disabled="tradetypeval!=1">
			    	<!--退款记录tab-->
					<div class="user_info">
						<el-form v-model="refunditems" :rules="rules" ref="refunditems" label-width="100px" class="demo-ruleForm">
							<el-row>
								<el-col :span="9">
									<el-form-item label="退款金额：" prop="advancemoney">
										<el-input type="text" v-model="refunditems.advancemoney" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="申请时间：" >
										<el-date-picker type="date" placeholder="选择日期" v-model="refunditems.createdate" style="width: 100%;" :disabled="true"></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="申请人：" >
										<el-input type="text" v-model="refunditems.salename" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="打款日期：" prop="tradedate">
										<el-date-picker type="date" placeholder="选择日期" v-model="refunditems.tradedate" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="退款理由：" prop="traderemarks">
										<el-input type="text" v-model="refunditems.traderemarks" auto-complete="off"></el-input>
									</el-form-item>
								</el-col>
								<div v-if="refunditems.auditstatus==0">
									<el-col :span="24">
										<el-form-item label-width="100px">
											<el-button type="success" @click="submitRefundForm('refunditems',1)">审核通过</el-button>
											<el-button type="success" @click="submitRefundForm('refunditems',2)">审核不通过</el-button>
										</el-form-item>
									</el-col>
								</div>
								<div v-else>
									<el-col :span="9">
										<el-form-item label="审核结果：" >
										<el-input type="text" v-model="refunditems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
									</el-col>	
								</div>
							</el-row>
					
						</el-form>
					</div>
			    </el-tab-pane>
			    
			    <!--全款tab-->
				<el-tab-pane label="全款交易" name="total" :disabled="tradetypeval!=0">
			    	<!--尾款交易tab-->
					<div class="user_info">
						<el-form :model="totalitems" :rules="rules" ref="totalitems" label-width="100px" class="demo-ruleForm">
							<el-col :span="9">
								<el-form-item label="预付金额：" prop="advancemoney">
									<el-input type="text" v-model="totalitems.advancemoney" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="交易时间：" prop="tradedate">
									<el-date-picker type="date" placeholder="选择日期" v-model="totalitems.tradedate" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="交易凭证号：" prop="voucherno">
									<el-input type="text" v-model="totalitems.voucherno" auto-complete="off" ></el-input>
								</el-form-item>
							</el-col>
							<div v-if="totalitems.auditstatus==0">
								<el-col :span="24">
									<el-form-item label-width="100px">
										<el-button type="success" @click="submitTotalForm('totalitems',1)">审核通过</el-button>
										<el-button type="success" @click="submitTotalForm('totalitems',2)">审核不通过</el-button>
									</el-form-item>
								</el-col>
							</div>
							<div v-else>
								<el-col :span="9">
									<el-form-item label="审核结果：" >
										<el-input type="text" v-model="totalitems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
							</div>
						</el-form>
					</div>
			    </el-tab-pane>
			</el-tabs>
		</div>
			
	</div>
</template>

<script>
	import top_component from '@/components/module/component_top'
	import nav_left_component from '@/components/module/component_left'
	import main_component from '@/components/module/component_main'
	import breadcrumb_component from '@/components/module/component_Breadcrumb'
	export default {
		name: "add_user",
		data() {
			return {
				pickerOptions0: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				}
			},
				activeName:'reserve',

				//定金
				reserveitems:{
					advancemoney:null,
					tradedate:null,
					voucherno:null,
					auditstatusname:null,
					auditstatus:null,
					auditstatusname:null
				},//交易尾款记录
				remainitems:{
					evaluationtypename:null, 
					advancemoney:null,
					tradedate:null,
					voucherno:null,
					salename:null,
					auditstatus:null,
					auditstatusname:null
				},	
				renewitems:{
					voucherno:null,
					tradedate:null,
					voucherno:null,
					salename:null,
					payaccount:null,
					tradewayname:null,
					auditstatus:null,
					auditstatusname:null,
				},	//续费记录
				refunditems:{
					createdate:"",
					advancemoney:"",
					tradedate:'',
					traderemarks:'',
					auditstatus:'',
					auditstatusname:'',
					salename:'',
				},	//退款记录
				totalitems:{
					advancemoney:null,
					tradedate:null,
					voucherno:null,
					auditstatusname:null,
				},  //全款交易

				itemid:'',
				appraisal: ['差','一般','好'],	//评价
				tradetypeval:'',
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
				/*	voucherno:[
						{required:true, message: '不能为空', trigger: 'blur'},
						{type:'number', min:1, max:30, message: '请输入数字', trigger: 'blur'}
					],
					advancemoney:[
						{required:true, message: '不能为空', trigger: 'blur'},
						{type:'number', min:1, max:30, message: '请输入数字', trigger: 'blur'}
					],
					tradedate:[
						{required:true, message: '不能为空', trigger: 'blur'}
					],
					tradewayname:[
						{required:true, message: '不能为空', trigger: 'blur'}
					],
					payaccount:[
						{required:true, message: '不能为空', trigger: 'blur'}
					],
					traderemarks:[
						{required:true, message: '不能为空', trigger: 'blur'},
					]*/
				}
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.itemid = this.$route.query.itemid;
			this.tradetypeval = this.$route.query.tradetypeval;
			this.petname = localStorage.CRM_petname;
			
			if(this.tradetypeval=='0'){
  				this.activeName = 'reserve';
  			}
			if(this.tradetypeval=='1'){
  				this.activeName = 'renew';
  			}
			if(this.tradetypeval=='2'){
  				this.activeName = 'reserve';
  			}
  			if(this.tradetypeval=='3'){
  				this.activeName = 'remain';
  			}
  			if(this.tradetypeval=='4'){
  				this.activeName = 'renew';
  			}
  			if(this.tradetypeval=='5'){
  				this.activeName = 'refund';
  			}
  			if(this.tradetypeval=='6'){
  				this.activeName = 'total';
  			}
  			
  			this.loadTabs(this.tradetypeval);
//			this.loadTabs(2);
		},
		methods: {
			submitReserveForm(formName,auditstatus) {
				this.$refs[formName].validate((valid) => {
					if(valid) {

						var url = '/list/tradeController/audit';

						var json = {tradeid:this.reserveitems.tradeid,itemid:this.itemid, voucherno:this.reserveitems.voucherno, advancemoney:this.reserveitems.advancemoney, tradetype:2, auditstatus:auditstatus, tradedate:this.changeTime(this.reserveitems.tradedate)};
						this.getSubmit(url,json);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitRemainForm(formName,auditstatus) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						
						var url = '/list/tradeController/audit';
						//评价类型：1好;2一般，3差
						var evaltype = '';
						if(this.remainitems.evaluationtypename=='好'){
							evaltype = 1;
						}
						if(this.remainitems.evaluationtypename=='一般'){
							evaltype = 2;
						}
						if(this.remainitems.evaluationtypename=='差'){
							evaltype = 3;
						}
						var json = {tradeid:this.remainitems.tradeid,voucherno:this.remainitems.voucherno,evaluationtype:evaltype, auditstatus:auditstatus,tradetype:3};
						this.getSubmit(url,json);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitRenewForm(formName,auditstatus) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var url = '/list/tradeController/audit';
						
						var json = {token: localStorage.CRM_token,tradeid:this.renewitems.tradeid,voucherno:this.renewitems.voucherno,payaccount:this.renewitems.payaccount, auditstatus:auditstatus,tradetype:4};
						this.getSubmit(url,json);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitRefundForm(formName,auditstatus) {
				console.log(this.refunditems);
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var url = '/list/tradeController/audit';
						console.log(this.changeTime(this.refunditems.tradedate));
						var json = {token: localStorage.CRM_token,tradeid:this.refunditems.tradeid, tradedate:this.changeTime(this.refunditems.tradedate), traderemarks:this.refunditems.traderemarks, auditstatus:auditstatus,tradetype:5};
						console.log(json);
						this.getSubmit(url,json);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitTotalForm(formName,auditstatus) {
				this.$refs[formName].validate((valid) => {
					if(valid) {

						var url = '/list/tradeController/audit';

						var json = {tradeid:this.totalitems.tradeid,itemid:this.itemid, voucherno:this.totalitems.voucherno, advancemoney:this.totalitems.advancemoney, tradetype:6, auditstatus:auditstatus, tradedate:this.changeTime(this.totalitems.tradedate)};
						this.getSubmit(url,json);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//图片上传
			handleRemove(file, fileList) {
        		console.log(file, fileList);
      		},
      		handlePictureCardPreview(file) {
      			console.log(file)
        		this.dialogImageUrl = file.url;
        		this.dialogVisible = true;
      		},
      		//tab切换
      		handleClick(tab, event){
      			console.log(tab.name+"-"+event);
      			if(tab.name=='reserve'){
      				this.loadTabs(2);
      			}
      			if(tab.name=='remain'){
      				this.loadTabs(3);
      			}
      			if(tab.name=='renew'){
      				this.loadTabs(4);
      			}
      			if(tab.name=='refund'){
      				this.loadTabs(5);
      			}
      			if(tab.name=='total'){
      				this.loadTabs(6);
      			}
      		},
      		//缴费类型：1正常；2订金；3尾款;4续费;5退款;6全款
      		loadTabs(type,items){
      			this.$http.get('/list/tradeController/tradeListByItem?tradetype='+type+'&itemid='+this.itemid+'&token='+localStorage.CRM_token).then(function(res){
				    console.log(res,"===");
				    //加载json对象，如果是json字符串要eval()转成json对象
				    if(res.body.data==null){
				    	return;
				    }
				   //订金
				    if(type==2){
      					this.reserveitems = res.body.data;
	      			}
				    //尾款
				    if(type==3){
      					this.remainitems = res.body.data;
	      			}
				    //续费
				    if(type==4){
      					this.renewitems = res.body.data;
	      			}
				    //退款
	      			if(type==5){
	      				this.refunditems = res.body.data;
	      			}
	      			//全款
	      			if(type==6){
	      				this.totalitems = res.body.data;
	      			}
				})
      		},
      		getSubmit(url,json){
      			this.$http.get(url,{params:json}).then(function(res){
      				if(res.body.code==100){
      					//成功刷新
      					this.loadTabs(this.tradetypeval);
						//this.$router.go(0);
      				}
      			})
      		},
      		changeTime(time){
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth()+1;
				var dd = newTime.getDate();
				return (yy+"-"+mm+"-"+dd)
			}
		}
	}
</script>

<style scoped="scoped">
	.el-button--success{
		background: #2EB398;
		border-color: #2EB398;
	}
	.trade_tabs{
		background: white;
		border-radius: 5px;
	}
</style>