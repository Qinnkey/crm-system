<template>
	<div class="user_trade">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="tab_list">
				<el-tabs v-model="activeName" type="card" label-width="100px" class="demo-ruleForm" >
				<!--交易tab-->
				<el-tab-pane label="预付订金" name="reserve" :disabled="tradetypeval!=0 && tradetypeval!=2">
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
							
							<div v-if="reserveitems.auditstatus==1">
								<el-col :span="9">
									<el-form-item label="交易凭证号：" prop="voucherno">
										<el-input type="text" v-model="reserveitems.voucherno" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="审核结果：" prop="auditstatusname">
										<el-input type="text" v-model="reserveitems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
							</div>
							<div v-else-if="reserveitems.auditstatus==2">
								<el-col :span="9">
									<el-form-item label="审核结果：" prop="auditstatusname">
										<el-input type="text" v-model="reserveitems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label-width="100px">
										<el-button type="success" @click="submitReserveForm('reserveitems')">提交</el-button>
										<el-button  @click="resetForm('reserveitems')">取消</el-button>
									</el-form-item>
								</el-col>
							</div>
							<div v-else>
								<el-col :span="24">
									<el-form-item label-width="100px">
										<el-button type="success" @click="submitReserveForm('reserveitems')">提交</el-button>
										<el-button  @click="resetForm('reserveitems')">取消</el-button>
									</el-form-item>
								</el-col>
							</div>
						</el-form>
					</div>
			    </el-tab-pane>
			    
			    <el-tab-pane label="尾款交易" name="remain"  :disabled="tradetypeval!=3">
			    	<!--尾款交易tab-->
					<div class="user_info">
						<el-form :model="remainitems" :rules="rules" ref="remainitems" label-width="100px" class="demo-ruleForm">
							<el-col :span="9">
								<el-form-item label="交易金额：" prop="advancemoney">
									<el-input type="text" v-model="remainitems.advancemoney" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="交易时间：" prop="tradedate">
									<el-date-picker type="date" placeholder="选择日期" v-model="remainitems.tradedate" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="评价：" prop="evaluationtypename">
									<el-radio-group v-model="remainitems.evaluationtypename">
									    <el-radio-button v-for="eval in appraisal" :label="eval" :key="eval"></el-radio-button>
		 							</el-radio-group>
								</el-form-item>
							</el-col>

							<div v-if="remainitems.auditstatus==0">
								<el-col :span="9">
									<el-form-item label="交易凭证号：" prop="voucherno">
										<el-input type="text" v-model="remainitems.voucherno" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="审核结果：" prop="auditstatusname">
										<el-input type="text" v-model="remainitems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
							</div>
							<div v-else-if="remainitems.auditstatus==2">
								<el-col :span="9">
									<el-form-item label="审核结果：" prop="auditstatusname">
										<el-input type="text" v-model="remainitems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label-width="100px">
										<el-button type="success" @click="submitRemainForm('remainitems')">提交</el-button>
										<el-button  @click="resetForm('remainitems')">取消</el-button>
									</el-form-item>
								</el-col>
							</div>
							<div v-else>
								<el-col :span="24">
									<el-form-item label-width="100px">
										<el-button type="success" @click="submitRemainForm('remainitems')">提交</el-button>
										<el-button  @click="resetForm('remainitems')">取消</el-button>
									</el-form-item>
								</el-col>
							</div>
						</el-form>
					</div>
			    </el-tab-pane>

			    <el-tab-pane label="续费记录" name="renew" :disabled="tradetypeval!=1&&tradetypeval!=7">
			    	<!--续费记录tab-->
					<div class="user_info">
						<el-form :model="renewitems" :rules="rules" ref="renewitems" label-width="100px" class="demo-ruleForm">
							<el-col :span="9">
								<el-form-item label="预付金额：" prop="advancemoney">
									<el-input type="text" v-model="renewitems.advancemoney" auto-complete="off" ></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="交易时间：" prop="tradedate">
									<el-date-picker type="date" placeholder="选择日期" v-model="renewitems.tradedate" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<!--1支付宝;2微信，3网银-->
								<el-form-item label="付费方式：" prop="tradewayname">
									<el-select v-model="renewitems.tradewayname" placeholder="请选择" @change="handleSelectChange">
										<el-option label="支付宝" value="1"></el-option>
										<el-option label="微信" value="2"></el-option>
										<el-option label="网银" value="3"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="付费账户：" prop="payaccount">
									<el-input type="text" v-model="renewitems.payaccount" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<div v-if="renewitems.auditstatus==1">
								<el-col :span="9">
									<el-form-item label="交易凭证号：" prop="voucherno">
										<el-input type="text" v-model="renewitems.voucherno" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="审核结果：" prop="auditstatusname">
									<el-input type="text" v-model="renewitems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
								</el-form-item>
								</el-col>
							</div>
							<div v-else-if="renewitems.auditstatus==2">
								<el-col :span="9">
									<el-form-item label="交易凭证号：" prop="voucherno">
										<el-input type="text" v-model="renewitems.voucherno" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
									<el-col :span="9">
										<el-form-item label="审核结果：" prop="auditstatusname">
										<el-input type="text" v-model="renewitems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label-width="100px">
										<el-button type="success" @click="submitRenewForm('renewitems')">提交</el-button>
										<el-button  @click="resetForm('renewitems')">取消</el-button>
									</el-form-item>
								</el-col>
							</div>
							<div v-else>
								<el-col :span="24">
									<el-form-item label-width="100px">
										<el-button type="success" @click="submitRenewForm('renewitems')">提交</el-button>
										<el-button  @click="resetForm('renewitems')">取消</el-button>
									</el-form-item>
								</el-col>
							</div>
						</el-form>
					</div>
			    </el-tab-pane>

			    <el-tab-pane label="退款记录" name="refund" :disabled="tradetypeval!=1">
			    	<!--退款记录tab-->
					<div class="user_info">
						<el-form :model="refunditems" :rules="rules" ref="refunditems" label-width="100px" class="demo-ruleForm">
							<el-col :span="9">
								<el-form-item label="退款金额：" prop="advancemoney">
									<el-input type="text" v-model="refunditems.advancemoney" auto-complete="off" ></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="申请时间：" prop="createdate">
									<el-date-picker type="date" placeholder="选择日期" v-model="refunditems.createdate" style="width: 100%;" :disabled="true"></el-date-picker>
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
							<div v-if="refunditems.auditstatus==1">
								<el-col :span="9">
									<el-form-item label="审核结果：" prop="auditstatusname">
										<el-input type="text" v-model="refunditems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
							</div>
							<div v-if="refunditems.auditstatus==2">
								<el-col :span="9">
									<el-form-item label="审核结果：" prop="auditstatusname">
										<el-input type="text" v-model="refunditems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label-width="100px">
										<el-button type="success" @click="submitRefundForm('refunditems')">提交</el-button>
										<el-button @click="resetForm('refunditems')">取消</el-button>
									</el-form-item>
								</el-col>
							</div>
							<div v-else>
								<el-col :span="24">
									<el-form-item label-width="100px">
										<el-button type="success" @click="submitRefundForm('refunditems')">提交</el-button>
										<el-button @click="resetForm('refunditems')">取消</el-button>
									</el-form-item>
								</el-col>
							</div>
						</el-form>
					</div>
			    </el-tab-pane>
			    
			    <!--全款交易-->
			    <el-tab-pane label="全款交易" name="total"  :disabled="tradetypeval!=0">
					<div class="user_info">
						<el-form :model="totalitems" :rules="rules" ref="totalitems" label-width="100px" class="demo-ruleForm">
							<el-col :span="9">
								<el-form-item label="全款金额：" prop="advancemoney">
									<el-input type="text" v-model="totalitems.advancemoney" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="交易时间：" prop="tradedate">
									<el-date-picker type="date" placeholder="选择日期" v-model="totalitems.tradedate" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
								</el-form-item>
							</el-col>

							<div v-if="reserveitems.auditstatus>0">
								<el-col :span="9">
									<el-form-item label="交易凭证号：" prop="voucherno">
										<el-input type="text" v-model="totalitems.voucherno" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="9">
									<el-form-item label="审核结果：" prop="auditstatusname">
										<el-input type="text" v-model="totalitems.auditstatusname" auto-complete="off" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
							</div>
							<div v-else>
								<el-col :span="24">
									<el-form-item label-width="100px">
										<el-button type="success" @click="submitTotalForm('totalitems')">提交</el-button>
										<el-button  @click="resetForm('totalitems')">取消</el-button>
									</el-form-item>
								</el-col>
							</div>
						</el-form>
					</div>
			    </el-tab-pane>

			</el-tabs>
			</div>
			
			<trade_list_detail id="tradlistdetail"></trade_list_detail>
		</main_component>
		<router-view></router-view>
	</div>
</template>

<script>
	import top_component from '@/components/module/component_top'
	import nav_left_component from '@/components/module/component_left'
	import main_component from '@/components/module/component_main'
	import breadcrumb_component from '@/components/module/component_Breadcrumb'
	import trade_list_detail from '@/components/trade_control/trade_list_detail'
	export default {
		name: 'user_trade',
		data() {
			//交易金额的自定义验证
			var checkdealMoney = (rule, value, callback) => {
				if(value==''){
					callback(new Error('请输入交易金额'));
				}else if(isNaN(value)){
					callback(new Error('请输入数字'));
				}else{
					callback()
				}
			};
			//时间校验
			var checkDate1=(rule,value,callback) =>{
				if(value==null||value==''){
					callback(new Error("请选择时间"))
				}else{
					callback()
				}
				value=value?this.changeTime(value):'';
				var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
			    var r = value.match(reg);
			    console.log(r);
			    if(r==null){
			          callback(new Error("时间格式错误")); //请将“日期”改成你需要验证的属性名称!
			    }else{
			    	callback()
			    }
			};
			return {
				pickerOptions0: {
		          	disabledDate(time) {
		            	return time.getTime() > Date.now();
		         	}
		        },
				activeName:'',
				//交易订金记录
				reserveitems:{
					advancemoney     : '',				//金额
					tradedate    : '',
				},
				//尾款记录
				remainitems:{
					advancemoney     : '',				//金额
					tradedate    : '',
					evaluationtypename: ""
				},	
				//续费记录				
				renewitems:{
					advancemoney     : '',				//金额
					tradedate    : '',
					tradewayname : '',
				},	//续费记录
				refunditems:{
					advancemoney     : '',				//金额
					tradedate    : '',
				},	
				//全款记录
				totalitems:{
					advancemoney     : '',				//金额
					tradedate    : '',
				},
				itemid:'',
				appraisal: ['差','一般','好'],	//评价
				tradeway:'',
				//列表传过来的交易类型
				tradetypeval:'',
				//列表传过来的交易结果
				commitstatusval:'',
				
				rules: {
					advancemoney: [
						{required: true, validator: checkdealMoney, trigger: 'blur' },
					],
					tradedate: [
						{required: true,validator:checkDate1 , trigger:'change'}
					],
				},
			}
		},
		components: {
			main_component,
			breadcrumb_component,
			trade_list_detail
		},
		created: function() {
			this.itemid = this.$route.query.itemid;
			this.tradetypeval = this.$route.query.tradetypeval;
			this.commitstatusval = this.$route.query.commitstatusval;
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
  			if(this.tradetypeval=='7'){
  				this.activeName = 'renew';
  			}
      			
			this.loadTabs(this.tradetypeval);
		},
		methods: {
			change_salesman(){
				console.log("更改业务员")
			},
			submitReserveForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {

						var url = '/list/tradeController/save';

						var json = {tradeid:this.reserveitems.tradeid,itemid:this.itemid, advancemoney:this.reserveitems.advancemoney, tradetype:2, tradedate:this.reserveitems.tradedate?this.changeTime(this.reserveitems.tradedate):''};
						this.getSubmit(url,json);
						//成功跳转到对应的首页去
//						this.$router.push({
//							path: "/user_list"
//						});
//						this.$emit("reload", 1);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitRemainForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {

						var url = '/list/tradeController/save';
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

						var json = {tradeid:this.remainitems.tradeid,itemid:this.itemid, evaluationtype:evaltype, advancemoney:this.remainitems.advancemoney, tradetype:3, tradedate:this.changeTime(this.remainitems.tradedate)};
						this.getSubmit(url,json);
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			submitRenewForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var url = '/list/tradeController/save';
						//付费方式：1支付宝;2微信，3网银
						var evaltype = '';
						console.log(this.renewitems.tradeway,"----------------",this.renewitems.tradewayname);
						if(this.renewitems.tradewayname=='支付宝'){
							this.tradeway = 1;
						}
						if(this.renewitems.tradewayname=='微信'){
							this.tradeway = 2;
						}
						if(this.renewitems.tradewayname=='网银'){
							this.tradeway = 3;
						}
						var json = {tradeid:this.renewitems.tradeid,itemid:this.itemid, tradeway:this.tradeway, payaccount:this.renewitems.payaccount, advancemoney:this.renewitems.advancemoney, tradetype:4, tradedate:this.changeTime(this.renewitems.tradedate)};
						this.getSubmit(url,json);
						//成功跳转到对应的首页去
//						this.$router.push({
//							path: "/user_list"
//						});
//						this.$emit("reload", 1);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitRefundForm(formName,auditstatus) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var url = '/list/tradeController/save';
						var json = {tradeid:this.refunditems.tradeid, itemid:this.itemid, tradedate:this.changeTime(this.refunditems.tradedate), advancemoney:this.refunditems.advancemoney,traderemarks:this.refunditems.traderemarks, tradetype:5};
						console.log(json);
						this.getSubmit(url,json);
						//成功跳转到对应的首页去
//						this.$router.push({
//							path: "/user_list"
//						});
//						this.$emit("reload", 1);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitTotalForm(formName,auditstatus) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var url = '/list/tradeController/save';
						var json = {tradeid:this.totalitems.tradeid, itemid:this.itemid, tradedate:this.changeTime(this.totalitems.tradedate), advancemoney:this.totalitems.advancemoney, tradetype:6};
						console.log(json);
						this.getSubmit(url,json);
						//成功跳转到对应的首页去
//						this.$router.push({
//							path: "/user_list"
//						});
//						this.$emit("reload", 1);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
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

      		//缴费类型：1正常；2定金；3尾款;4续费;5退款;6全款
      		loadTabs(type){
      			this.$http.get('/list/tradeController/tradeListByItem?tradetype='+type+'&itemid='+this.itemid).then(function(res){
				    //加载json对象，如果是json字符串要eval()转成json对象
				    console.log(res);
				    console.log("--"+res.body.data,"data是否==空",res.body.data==null);
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
      					//成功跳转到对应的首页去
						this.$router.push({
							path: "/user_list"
						});
						this.$emit("reload", 1);
      				}
      			})
      		},
      		changeTime(time){
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth()+1;
				var dd = newTime.getDate();
				return (yy+"-"+mm+"-"+dd)
			},
			//搜索选择select
      		handleSelectChange(val) {
      			this.tradeway = val;
      		},
      limititem(val) {
        var newVal = [];
        for (var i = 0; i < val.length; i++) {
          for (var j = 0; j < val.length; j++) {
            if (val[j].menutarget == i + 1) {
              newVal.push(val[j])
            }
          }
        }
        if (newVal[0].childList[0].map.tradeFun == 0) {
          this.$router.push({path: "/login"})
        }
      }
		}
	}
</script>

<style scoped="scoped">
	.tab_list{
		padding: 30px 10px 10px 30px;
		background: white;
		border: 1px solid #CCCCCC;
		border-radius: 5px;
	}
</style>
