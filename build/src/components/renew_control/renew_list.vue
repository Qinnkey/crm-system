<template>
	<div class="user_list">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<!--搜索区块-->
				<el-form ref="form" :inline="true" :model="form" label-width="80px">
					<el-row>
						<el-col :span="2" style="width: 200px;">
							<el-form-item>
								<el-input v-model="form.searchValue" placeholder="公司/姓名/项目/业务"></el-input>
							</el-form-item>
						</el-col>
					
						<el-col :span="2">
							<el-form-item>
								<el-select v-model="form.itemType"  @change="search(1)">
									<el-option v-for="item in itemTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						
						<el-col :span="8">
							<el-form-item>
								<el-col :span="7">
									<el-date-picker type="date" placeholder="开始时间起" :picker-options="pickerOptions0" v-model="form.beginDate" style="width: 100%;"></el-date-picker>
								</el-col>
								<el-col class="line" :span="1">&nbsp;--</el-col>
								<el-col :span="8">
									<el-date-picker type="date" placeholder="开始时间止" :picker-options="pickerOptions1" v-model="form.endDate" style="width: 100%;"></el-date-picker>
								</el-col>
							</el-form-item>
						</el-col>
						<el-form-item label-width="80px">
							<el-button type="success" icon="search" @click="search(1)">查找</el-button>
							<el-button type="info"  icon="edit" @click="toService">指派缴费服务人</el-button>
						</el-form-item>
					</el-row>
				</el-form>
				<!--表格块-->
				<!--表格块-->
				<el-table :data="tableData3"  ref="multipleTable" border style="width: 100%" height="460" :row-class-name="tableRowClassName"  @selection-change="handleSelectionChange">
					<el-table-column type="selection" fixed='left' width="55"></el-table-column>
					<el-table-column v-for="(item,index) in table_list" :key="item.name" :prop="item.prop" :label="item.name" :width="item.width"></el-table-column>
					<el-table-column fixed="right" label="操作" width="265">
						<template scope="scope">
							<el-button v-if="limitCtrl.renreTraceAdd==1" type="text" size="small" @click="add(scope.$index, scope.row)">续费添加</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!--<el-table :data="tableData3" border style="width: 100%" height="460" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" ref="multipleTable">
					<el-table-column type="selection" fixed='left' width="55"></el-table-column>
					<el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name" :width="item.width"></el-table-column>
					<el-table-column fixed="right" label="操作" width="230">
						<template scope="scope">
							<el-button v-if="limitCtrl.updateBtn==1" type="text" size="small" @click="user_modifu(scope.$index, scope.row)">修改</el-button>
							<el-button v-if="limitCtrl.ableFun==1" type="text" size="small" @click="user_disabled(scope.$index, scope.row)">
								<p v-if="scope.row.custstatus==1">禁用</p>
								<p v-if="scope.row.custstatus==2">启用</p>
								<p v-if="scope.row.custstatus==3">启用</p>
							</el-button>
							<el-button v-if="limitCtrl.visitHisFun==1" type="text" size="small" @click="user_record(scope.$index, scope.row)">回访记录</el-button>
							<el-button v-if="limitCtrl.detailFun==1" type="text" size="small" @click="user_detail(scope.$index, scope.row)">查看详情</el-button>
						</template>
					</el-table-column>
				</el-table>-->
				<div class="renewal" style="margin-top: 20px;">
					<!--<el-col :span="2">
						<el-button v-if="limitCtrl.importBtn==1" style="margin: 0 10px;" type="success" @click="export_data">数据导出</el-button>
					</el-col>-->
					<!--分页器-->
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="totalCount">
						</el-pagination>
					</div>
				</div>
			</div>
		</main_component>
		<!--指派客服对话框-->
		<el-dialog title="选择客服列表" size="tiny" :modal='true' :modal-append-to-body='false' :visible.sync="dialogFormVisible">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="22">
						<el-form-item label="姓名：" label-width="100px" prop="petname">
							<el-autocomplete style="width: 100%;" class="inline-input" v-model="ruleForm.petname" placeholder="请输入姓名" @select="handleSelect" :fetch-suggestions="querySearchAsync"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="22">
						<el-form-item label="用户名：" label-width="100px" prop="username">
							<el-input :disabled="true" v-model="ruleForm.username" placeholder="请输入用户名" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="22">
						<el-form-item label="备注：" label-width="100px">
							<el-input type="textarea" placeholder="请输入备注" :rows='4' v-model="ruleForm.serremark"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>
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
				itemTypes: [
					{label:'项目类型', value: ''},
					{label:'企业版', value: 1},
					{label: '门户版', value:2},
					{label: '电商版',value:3},
					{label: '微商app',value:4},
					{label: '小程序',value:5},
					{label: '阿凡提',value:6},
					{label: '汇搜云',value:7}
					],	
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				multipleTable:[],
				itemTypes:[
					{label:'企业版', value: 1},
					{label: '门户版', value:2},
					{label: '电商版',value:3},
					{label: '微商app',value:4},
					{label: '独立小程序',value:5},
					{label: '阿凡提',value:6},
					{label: '汇搜云',value:7}
				],
				form:{
					searchValue:'',
					itemType:'',
					searchType: '',
					typevalue: '',
					custstatus: '',
					beginDate: '',
					endDate: '',
				},
				renewal: '', //续费
				table_list: [{
						name: '序号',
						prop: 'index',
						width: '70'
					},
					{
						name: '客户姓名',
						prop: 'contact',
						width: '150'
					},
					{
						name: '手机号',
						prop: 'phone',
						width: '150'
					},
					{
						name: '企业名称',
						prop: 'companyname',
						width: '150'
					},
					{
						name: '项目姓名',
						prop: 'itemname',
						width: '150'
					},
					{
						name: '项目类型',
						prop: 'itemtypename',
						width: '150'
					},
					{
						name: '汇搜云权限',
						prop: 'itemdetailname',
						width: '150'
					},
					{
						name: '到期时间',
						prop: 'expirationTime',
						width: '150'
					},
					{
						name: '微信号',
						prop: 'weixin',
						width: '150'
					},
					{
						name: '邮箱',
						prop: 'email',
						width: '150'
					},
					{
						name: '公司地址',
						prop: 'addressInfo',
						width: '250'
					},
					{
						name: '业务员',
						prop: 'salename',
						width: '150'
					},
					{
						name: '交易类型',
						prop: 'tradetypename',
						width: '150'
					},
					{
						name: '开始时间',
						prop: 'itembegindate',
						width: '150'
					},
					{
						name: '结束时间',
						prop: 'itemenddate',
						width: '150'
					},
					{
						name: '跟踪次数',
						prop: 'tracenum',
						width: '150'
					},
					{
						name: '是否续费',
						prop: 'custrenewstatusname',
						width: '150'
					},
					{
						name: '缴费服务人',
						prop: 'petname',
						width: '150'
					},
					{
						name: '指派备注',
						prop: 'serremark',
						width: '150'
					},
					/*{
						name: '客户状态',
						prop: 'custstatusName',
						width: '150'
					},
					{
						name: '标记续费',
						prop: 'markstatusname',
						width: '150'
					},*/
				],
				tableData3: [],
				//定义列表总数
				totalCount: 0,
				//定义当前页
				currentPage: 1,
				//定义每页条数
				pageSize: 10,
				//select值
				tradetype: null,
				
				//指派客服弹出框
				dialogFormVisible:false,
				ruleForm: {
					responsibleid: null,
					petname: null, //变更业务员姓名
					username: null, //变更业务员微信号
					serremark: null, //变更业务员邮箱
				},
				rules: {
					petname: [{
						required: true,
						message: '请输入姓名',
						trigger: 'change'
					}],
				},

				itemIdArr: [],			//item的id数组
				limitCtrl: {},			//权限控制
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.loadData(1);
			this.loadAll();
		},
		methods: {
			//加载客服列表
			loadAll() {
				this.$http.get("/list/user/findResponsible", {
					params:{
						token: localStorage.CRM_token,
						leader: '',
					}
				}).then(function(res) {
					//加载json对象
					console.log(res,"==客服列表==");
					this.restaurants = res.body.data;
				})
			},
			//用于业务员的自动填充
			querySearchAsync(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
				cb(results);
			},
			createStateFilter(queryString) {
				return(state) => {
					return(state.value.indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				this.saleManId = true;
				this.getSaleman(item.saleid)
			},
			
			handleSelect(item) {
				console.log(item,"==item==",item.petname);
				this.ruleForm.responsibleid = item.responsibleid;
				this.ruleForm.petname = item.value;
				this.ruleForm.username = item.username;
			},
			//指派客服
			toService(){
				if(this.itemIdArr.length<1){
      				this.$message({
          				message: '请选择一个项目',
				        type: 'warning'
				    });
      			}else{
      				//修改该项目的状态，变为1就是带处理
      				this.dialogFormVisible = true;
					/*this.$http.get("/list/customer/signPendingItem",{params:{
						token: localStorage.CRM_token,
						itemIds:this.itemIdArr,
						markstatus:1
					}}).then(function(res){
						if(res.body.code==100){
							 this.$message({
					          message: '标记成功',
					          type: 'success'
					        });
					        
					        this.loadData(this.currentPage)
						}
					})*/
      			}
			},
			//表单1提交
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						//提交对应的内容
						this.$http.post("/list/serviceRenewController/saveServiceRenewBatch", {
							token: localStorage.CRM_token,
							itemIds: this.itemIdArr,
							userid: this.ruleForm.responsibleid,
							serremark: this.ruleForm.serremark, //备注
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body.code == 100) {
								console.log("指派客服成功");
								this.ruleForm.responsibleid = '';
								this.ruleForm.petname = '';
								this.ruleForm.username = '';
								this.dialogFormVisible = false;
								//成功跳转
  								this.$router.go(0);
      							this.$emit('reload', 1);
							} else if(res.body.code == 404) {
								console.log("指派客服失败");
								this.$message.error('保存失败，请重试');
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//续费添加
			add(index, row) {
				this.$router.push({path: '/renew_add', query: { itemid: row.itemid}})
				/*this.$router.push({
					path: "/add"
				})*/
			},
			//搜索,点击搜索的是够后台返回数据
			search(onpage) {
					this.loadData(onpage);
				}, 
			//加载数据
			loadData(page){
				 	this.$http.get("/list/customer/serviceRenew", {
					params: {
						token  : localStorage.CRM_token,
						beginDate: this.form.beginDate ? this.changeTime(this.form.beginDate) : '',
						endDate: this.form.endDate ? this.changeTime(this.form.endDate) : '',
						itemType:this.form.itemType,
						searchValue:this.form.searchValue,
						pageNum: page,
						pageSize: this.pageSize
					}
				}).then(function(res) {
					console.log(res)
					if(res!=null&&res.body.data!=null&&res.body.data.list.length>0){
					var json = res.body.data.list;
					this.tableData3 = json;
					this.totalCount = res.body.data.total;
					this.currentPage = res.body.data.pageNum;
					for(var i=0;i<this.tableData3.length;i++){
						this.tableData3[i].index=i+1;
						if(this.tableData3[i].custrenewstatus=='1'){
							this.tableData3[i].custrenewstatusname = '是';
						}else{
							this.tableData3[i].custrenewstatusname = '否';
						}
					}
					}else{
						this.tableData3=[]
					}

				})
			},
			/*//标记代处理项目
			signrenewitem(){
				if(this.itemIdArr.length<1){
      				this.$message({
          				message: '请选择一个项目',
				        type: 'warning'
				    });
      			}else{
      				//修改该项目的状态，变为1就是带处理
					this.$http.get("/list/renewMark/renewMarkSign",{params:{
						token: localStorage.CRM_token,
						itemIds:this.itemIdArr,
					}}).then(function(res){
						if(res.body.code==100){
							 this.$message({
					          message: '标记成功',
					          type: 'success'
					        });
					        
					        this.loadData(this.currentPage)
						}
					})
      			}
			},*/
		/*	//添加
			add() {
				this.$router.push({
					path: "/add"
				})
			},*/

			//列表选择
			handleSelectionChange(val) {
				console.log(val)
				this.itemIdArr = [];
				for(var i=0; i<val.length; i++){
					this.itemIdArr.push(val[i].itemid)
				}
				console.log(this.itemIdArr);
      		},
      		/*//列表-修改-操作功能事件
      		user_modifu(index,row){
      			console.log(index, row)
      			this.$router.push({path: '/continue_fee_modifu', query: { itemid: row.itemid,custid:row.custid,saleid:row.saleid}})
      		},
      		//列表-禁用-操作功能，相当于局部的刷新效果
      		user_disabled(index,row){
      			var a=0;
      			if(row.custstatus==1){
      				a=2;
      			}else{
      				a=1
      			}
      			this.$http.get("/list/customer/changeCustomerStatus",{
      				params:{
      					custid:row.custid,
      					status:a
      				}
      			}).then(function(res){
      				if (res.body.code==100) {
      					this.tableData3[index].custstatus = a;
      					if(a==1){
      						this.tableData3[index].custstatusName="正常";
      					}else if(a==2){
      						this.tableData3[index].custstatusName="禁用";
      					}
      				}
      			})
      		},
      		//列表-回访-操作功能事件
      		user_record(index,row){
      			console.log(index, row)
      			this.$router.push({path: '/continue_fee_record',query:{ itemid: row.itemid}})
      		},
      		//列表-查看详情-操作功能事件
      		user_detail(index,row){
      			console.log(index, row)
      			this.$router.push({path: '/continue_fee_detail',query:{ itemid: row.itemid}})
      		},*/
			/*//导出数据
			export_data(){
				console.log("导出数据")
				if (this.itemIdArr.length ==0) return false;
				this.$http.get("/list/customer/dateExport",{
					params:{
						itemids: this.itemIdArr
					}
				}).then(function(res){
					console.log(res)
					//跳转下载
					location.href = "/list/customer/dateExport?itemids[]="+this.itemIdArr+"&token="+localStorage.CRM_token;
					
					//下载完成取消选择
					this.$refs.multipleTable.clearSelection();
					
				})
			},*/
			
			tableRowClassName(row, index) {
		        if (row.markstatus == '1') {
		          return 'info-row';
		        }
		        return '';
		    },
      		//页码改变触发
      		handleSizeChange(val) {
        		console.log('每页 '+val+' 条');
      		},
      		//currentPage 改变时会触发
      		handleCurrentChange(val) {
  				if(this.form.searchType!=''||this.form.typevalue!=''||this.form.custstatus!=''||this.form.begindate!=''||this.form.endDate!='') {
					this.search(val);
				} else {
					this.loadData(val);
				}
      		},
			changeTime(time){
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth()+1;
				var dd = newTime.getDate();
				return (yy+"-"+mm+"-"+dd)
			},
      /*//权限改变
			limititem(val){
				var newVal = [];
				for (var i=0; i<val.length; i++) {
					for (var j=0; j<val.length; j++) {
						if (val[j].menutarget == i+1) {
							newVal.push(val[j])
						}
					}
				}
        if(newVal[0].childList[3].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
				this.limitCtrl =newVal[0].childList[3].map;
			}*/
			
			//权限改变
			limititem(val){
				var newVal = [];
				for (var i=0; i<val.length; i++) {
					for (var j=0; j<val.length; j++) {
						if (val[j].menutarget == i+1) {
							newVal.push(val[j])
						}
					}
				}
				if(newVal[7].childList[0].childstatus == 0) {
		          this.$router.push({path: "/login"})
		        }
				this.limitCtrl =newVal[7].childList[0].map;
			},
		}
	}
</script>

<style scoped="scoped">
	.el-button--success {
		background: #2EB398;
		border-color: #2EB398;
	}
	.el-table .info-row {
		background: #C6E2FF;
	}
</style>
