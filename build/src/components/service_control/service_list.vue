<template>
	<div class="user_list">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<!--搜索区块-->
				<el-form ref="form" :inline="true" :model="form" label-width="80px">
					<el-row>
						<el-col :span="3">
							<el-form-item>
								<el-input v-model="form.searchvalue" placeholder="手机/公司/姓名/项目/业务/域名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<el-form-item>
								<el-select v-model="form.searchType" @change="search(currentPage)">
									<el-option label="所有项目" value=""></el-option>
									<el-option label="已逾期项目" value="overdue"></el-option>
									<el-option label="未分配业务员项目" value="salenull"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<el-form-item>
								<el-select v-model="form.tradetype"  @change="search(currentPage)">
									<el-option label="交易类型" value=""></el-option>
									<el-option label="新建" value="0"></el-option>
									<el-option label="正常" value="1"></el-option>
									<el-option label="订金" value="2"></el-option>
									<el-option label="尾款" value="3"></el-option>
									<el-option label="续费" value="4"></el-option>
									<el-option label="退款" value="5"></el-option>
									<el-option label="全款" value="6"></el-option>
									<el-option label="终结" value="7"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<el-form-item>
								<el-select v-model="form.itemType"  @change="search(currentPage)">
									<el-option v-for="item in itemTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<el-form-item>
								<el-select v-model="form.contractStatus"  @change="search(currentPage)">
									<el-option v-for="item in contractStatusdetails" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<el-form-item>
								<el-select v-model="form.sortCondition"  @change="search(currentPage)">
									<el-option v-for="item in sortConditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<el-form-item>
								<el-checkbox v-model="form.pointme" @change="handleCheckedCitiesChange">指派给我</el-checkbox>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item>
								<el-col :span="7">
									<el-date-picker type="date" placeholder="开始时间" :picker-options="pickerOptions0" v-model="form.begindate" style="width: 100%;"></el-date-picker>
								</el-col>
								<el-col class="line" :span="1">&nbsp;--</el-col>
								<el-col :span="8">
									<el-date-picker type="date" placeholder="结束时间" :picker-options="pickerOptions1" v-model="form.endDate" style="width: 100%;"></el-date-picker>
								</el-col>
							</el-form-item>
						</el-col>
						<el-form-item label-width="80px">
							<el-button type="success" icon="search" @click="search(currentPage)">查找</el-button>
							<el-button type="info" v-if="limitCtrl.exportService==1" icon="arrow-down" @click="dataExport">导出</el-button>
							<el-button type="info" v-if="limitCtrl.toService==1" icon="edit" @click="toService">指派客服</el-button>
						</el-form-item>
					</el-row>
				</el-form>
				<!--表格块-->
				<el-table :data="tableData3"  ref="multipleTable" border style="width: 100%" height="460" :row-class-name="tableRowClassName"  @selection-change="handleSelectionChange">
					<el-table-column type="selection" fixed='left' width="55"></el-table-column>
					<el-table-column v-for="(item,index) in table_list" :key="item.name" :prop="item.prop" :label="item.name" :width="item.width"></el-table-column>
					<el-table-column fixed="right" label="操作" width="150">
						<template scope="scope">
							<el-button type="text" size="small" @click="user_detail(scope.$index, scope.row)">查看详情</el-button>
							<el-button type="text" v-if="limitCtrl.visit==1" size="small" @click="user_record(scope.$index, scope.row)">回访记录</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="renewal" style="margin-top: 20px;">
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
		<router-view @reload="reload"></router-view>
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
				
				
				//限定选择的时间
				multipleTable:[],
				sortConditions: [
					{label:'排序选择', value: ''},
					{label:'创建时间', value:1},
					{label:'更新时间', value:2},
					{label:'开始时间', value:3},
					{label:'结束时间', value:4},
				],
				itemTypes: [
					{label:'项目类型', value: ''},
					{label:'企业版', value: 1},
					{label: '门户版', value:2},
					{label: '电商版',value:3},
					{label: '微商app',value:4},
					{label: '独立小程序',value:5},
					{label: '阿凡提',value:6},
					{label: '汇搜云',value:7}
					],	
				contractStatusdetails:[
					{label:'合同进度',value:""},
					{label:'审核失败',value:-2},
					{label:'等待客服审核',value:-1},
					{label:'应用正常',value:1},
					{label:'美工上传素材',value:2},
					{label:'客服进行app抢注',value:3},
					{label:'程序生成',value:4},
					{label:'系统初始化',value:5},
					{label:'客服添加数据',value:6},
					{label:'应用生成',value:7},
					{label:'应用上传',value:8}
				],
				
				form: {
					itemType:'',
					searchType: '',
					searchvalue: '',
					custstatus: "",
					status:"",
					begindate: '',
					endDate: '',
					tradetype:'',
					contractStatus:'',
					sortCondition:'',
					pointme:false,
				},
				renewal: '', //续费
				table_list: [{
						name: '序号',
						prop: 'index',
						width: '70'
					},
					{
						name: '编号',
						prop: 'standby3',
						width: '120',
						sortable:1,
					},
					{
						name: '域名',
						prop: 'standby2',
						width: '120',
						sortable:1,
					},
					{
						name: '客户姓名',
						prop: 'contact',
						width: '150',
						sortable:1,
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
						name: '项目全称',
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
						name: '项目进度',
						prop: 'relatecontstatusname',
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
						name: '客户状态',
						prop: 'custstatusName',
						width: '150'
					},
					{
						name: '项目状态',
						prop: 'itemstatusName',
						width: '150'
					},
					{
						name: '指派客服',
						prop: 'petname',
						width: '150'
					},
					{
						name: '指派备注',
						prop: 'serremark',
						width: '300'
					}

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
				begindate1:localStorage.CRM_beginDate,
				endDate1:localStorage.CRM_endDate,
				contractStatus:'',
				itemType:'',
				//用来存放选中的对象的
				selectObject: [],
				itemIdArr:[],
				limitCtrl: {},//权限控制
				pickerOptions0: {
					disabledDate(time) {
						//console.log(this.begindate1, "=====");
						//return time.getTime() > this.begindate1;
					}
				},
				pickerOptions1: {
					disabledDate(time) {
						//return time.getTime() < this.endDate1;
					}
				},
				
				//指派客服弹出框
				dialogFormVisible:false,
				ruleForm: {
					userid: null,
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
			}
		},
		props: ['limitData'],

		components: {
			main_component,
			breadcrumb_component
		},

		created: function() {
			this.tradetype = this.$route.query.tradetype?this.$route.query.tradetype:'';

			this.begindate1 = localStorage.CRM_beginDate;
			this.endDate1 = localStorage.CRM_endDate;
			this.form.begindate = localStorage.CRM_beginDate;
			this.form.endDate = localStorage.CRM_endDate;
			
			this.itemType = this.$route.query.itemType?this.$route.query.itemType:'',
			this.contractStatus = this.$route.query.contractStatus?this.$route.query.contractStatus:'';
			this.form.tradetype=this.tradetype.toString();
			this.form.itemType=this.itemType?parseInt(this.itemType):'';
			this.form.contractStatus=this.contractStatus?parseInt(this.contractStatus):'';
			this.loadData(this.currentPage);
			this.loadAll();
		},
		methods: {
			reload: function(text) {
				
				if(text == 1) {
					this.loadData(this.currentPage)
				}
			},
			//搜索,点击搜索的是够后台返回数据
			search(onpage) {
				var salenull = "";
				var overdue = "";
				if(this.form.searchType=='salenull'){
					salenull = "0";
				}
				if(this.form.searchType=='overdue'){
					overdue = "overdue";
				}
				var req = {
					token: localStorage.CRM_token,
					searchvalue: this.form.searchvalue,
					custstatus: this.form.custstatus,
					tradetype:this.form.tradetype,
					itemtype:this.form.itemType,
					contractstatus:this.form.contractStatus,
					sortcondition:this.form.sortCondition,
					begindate: this.form.begindate ? this.changeTime(this.form.begindate) : '',
					enddate: this.form.endDate ? this.changeTime(this.form.endDate) : '',
					salenull:salenull,
					overdue:overdue,
					pointme:this.form.pointme,
					pageNum: onpage,
					pageSize: this.pageSize
				};
				this.$http.get("/list/customer/serviceItem", {params: req}).then(function(res) {
						if(res!=null&&res.body.data!=null){
							var json = res.body.data.list;
							this.tableData3 = json;
							this.totalCount = res.body.data.total;
							this.currentPage = res.body.data.pageNum;
							for(var i=0;i<this.tableData3.length;i++){
								this.tableData3[i].index=i+1;
							}
						}else{
							this.tableData3=[]
					}
				})
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
			//加载数据
			loadData(oncurrentPage) {
				this.$http.get("/list/customer/serviceItem", {
					params: {
						token: localStorage.CRM_token,
						tradetype:this.tradetype,
						begindate: this.form.begindate ? this.changeTime(this.form.begindate) : '',
						enddate: this.form.endDate ? this.changeTime(this.form.endDate) : '',
						itemtype:this.itemType,
						contractstatus:this.contractStatus,
						pageNum: oncurrentPage,
						pageSize: this.pageSize
					}
				}).then(function(res) {
					if(res.body.code == 100) {
						console.log("客服列表……………………………………………………",res);
						if(res != null && res.body.data != null) {
							var json = res.body.data.list;
							this.tableData3 = json;
							this.totalCount = res.body.data.total;
							this.currentPage = res.body.data.pageNum;
							for(var i = 0; i < this.tableData3.length; i++) {
								this.tableData3[i].index = i + 1;
							}
						} else {
							this.tableData3 = []
						}
					}
				})
			},
			/*//排序，点击一下按客户排序，再点击按时间排序
			sortChange(column, prop, order){
				if(this.orderby==''){
					this.orderby = "custid";
				}else{
					this.orderby = "";
				}
				this.loadData(this.currentPage);
			},*/
			//列表选择
			handleSelectionChange(val) {
				//console.log(val)
				this.itemIdArr = [];
				for(var i = 0; i < val.length; i++) {
					this.itemIdArr.push(val[i].itemid)
				}
			},
			//列表-查看详情-操作功能事件
			user_detail(index, row) {
				this.$router.push({
					path: '/service_detail',
					query: {
						itemid: row.itemid
					}
				})
			},
			//回访记录-操作功能事件
			user_record(index, row) {
				console.log("点击回访记录====");
				this.$router.push({
					path: "/service_reply_log",
					query: {
						itemid: row.itemid,
					}
				})
			},
			//页码改变触发
			handleSizeChange(val) {
				//console.log('每页 ' + val + ' 条');
			},
			//currentPage 改变时会触发
			handleCurrentChange(val) {
				//val是当前的值，看是否的搜索，如果是搜索的话那么就是带着条件去搜索到下一页去
				console.log('当前页:' + val);
				//代条件的搜索
				if(this.searchType != "" || this.searchvalue != '' || this.custstatus != ""|| this.begindate != '' || this.endDate != '') {
					this.search(val);
				} else {
					this.loadData(val);
				}

			}, //提交
			onSubmit() {
				var obj = [];
				var obj2 = [];
				for(var i = 0; i < this.selectObject.length; i++) {
					obj.push(this.selectObject[i].custid);
					obj2.push(this.selectObject[i].index);
				};
				this.$http.get("/list/customer/batch/changeCustomerStatus", {
					params: {
						token: localStorage.CRM_token,
						custids: obj.toString(),
						custStatus: this.renewal
					}
				}).then(function(res) {
					//获取对应的值,修改对应的状态
					if(res.body.code == 100) {
						for(var i = 0; i < obj2.length; i++) {
							console.log(this.tableData3[obj2[i]]);
							this.tableData3[obj2[i] - 1].custstatus = this.renewal;
							if(this.renewal == 1) {
								this.tableData3[obj2[i] - 1].custstatusName = "正常";
							} else if(this.renewal == 2) {
								this.tableData3[obj2[i] - 1].custstatusName = "禁用";
							}
						}
					}
				})
			},

			handleCheckedCitiesChange(key){
				console.log("点击==",key);
//				if(value){
//					this.form.pointme = value;
//				}
				this.search(this.currentPage);
			},
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
				if(newVal[6].childList[0].childstatus == 0) {
		          this.$router.push({path: "/login"})
		        }
				this.limitCtrl =newVal[6].childList[0].map;
				console.log(this.limitCtrl,"==",this.limitCtrl.toService);
			},
			changeTime(time){
				//console.log("--"+time)
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth() + 1;
				var dd = newTime.getDate();

				return(yy + "-" + mm + "-" + dd)
			},
			dataExport(){
				//console.log("导出数据")
				if(this.itemIdArr.length == 0){
					  this.$message({
			          message: '请选择导出项目',
			          type: 'warning'
			        });
					return false;
				}
				this.$http.get("/list/customer/dateExportList", {
					params: {
						token: localStorage.CRM_token,
						itemids: this.itemIdArr
					}
				}).then(function(res) {
					//跳转下载
					location.href = "/list/customer/dateExportList?itemids[]=" + this.itemIdArr+"&token="+localStorage.CRM_token;
					this.$refs.multipleTable.clearSelection();
				})
			},
			
			//加载客服列表
			loadAll() {
				this.$http.get("/list/user/customerList", {
					params: {
						token: localStorage.CRM_token,
						roleid:777
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
				this.ruleForm.userid = item.userid;
				this.ruleForm.petname = item.value;
				this.ruleForm.username = item.username;
			},
			
			tableRowClassName(row, index) {
				console.log("row.petname",row.petname);
		        if (row.petname != null) {
		          return 'info-row';
		        }
		        return '';
		    },
			
			//表单1提交
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						//提交对应的内容
						this.$http.post("/list/serviceItemController/saveServiceItemBatch", {
							token: localStorage.CRM_token,
							itemIds: this.itemIdArr,
							userid: this.ruleForm.userid,
							serremark: this.ruleForm.serremark, //备注
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body.code == 100) {
								console.log("指派客服成功");
								this.ruleForm.userid = '';
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
		},
		watch:{
//			"form.searchType"(n, o){
//				if(this.$route.query.itemtype && this.$route.query.itemtype >= 0 && this.$route.query.itemtype <= 7){
//					if (n!="itemtype") {
//						this.form.searchvalue = ''
//					}
//				}
//			},
			"form.begindate"(n,o){
				//console.log(n,o,"++++++++")
				var _date = new Date(n)
				var yy = _date.getFullYear();
				var mm = (_date.getMonth()+1)>9?(_date.getMonth()+1):("0"+(_date.getMonth()+1));
				var dd = _date.getDate()>9? _date.getDate() : ("0"+_date.getDate());
				var newDate = yy+''+mm+''+dd;
				var crmBegin = localStorage.CRM_beginDate.replace(/-/g, "");
			//.	console.log(Number(newDate), Number(crmBegin))
				if (Number(newDate) < Number(crmBegin)) {
					this.$message({
			          message: '开始时间要小于'+localStorage.CRM_beginDate,
			          type: 'error'
			        });
			        this.form.begindate = localStorage.CRM_beginDate
				}
			},
			"form.endDate"(n,o){
				var _date1 = new Date(n)
				var yy1 = _date1.getFullYear();
				var mm1 = (_date1.getMonth()+1)>9?(_date1.getMonth()+1):("0"+(_date1.getMonth()+1));
				var dd1 = _date1.getDate()>9? _date1.getDate() : ("0"+_date1.getDate());
				var newDate1 = yy1+''+mm1+''+dd1;
				var crmEnd = localStorage.CRM_endDate.replace(/-/g, "");
				//console.log(Number(newDate1), Number(crmEnd))
				if (Number(newDate1) < Number(crmEnd)) {
					this.$message({
			          message: '结束时间要大于'+localStorage.CRM_endDate,
			          type: 'error'
			        });
			        this.form.endDate = localStorage.CRM_endDate
				}
			},
		}
	}
</script>

<style>
	.el-button--success {
		background: #2EB398;
		border-color: #2EB398;
	}
	.el-table .info-row {
		background: #C6E2FF;
	}
</style>
