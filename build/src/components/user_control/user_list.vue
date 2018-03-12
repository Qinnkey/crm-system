<template>
	<div class="user_list">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<!--搜索区块-->
				<el-form ref="form" :inline="true" :model="form" label-width="80px">
					<el-row>
						<el-col :span="2">
							<el-form-item>
								<el-select v-model="form.searchType">
									<el-option label="所有项目" value=""></el-option>
									<el-option label="客户手机号" value="phone"></el-option>
									<el-option label="客户姓名" value="contact"></el-option>
									<el-option label="项目全称" value="itemname"></el-option>
									<el-option label="业务员名称" value="salename"></el-option>
									<el-option label="未分配业务员项目" value="salenull"></el-option>
									<el-option label="已逾期项目" value="overdue"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="3">
							<el-form-item>
								<el-input v-model="form.typevalue" placeholder="请输入查询的值"></el-input>
							</el-form-item>
						</el-col>
						<!--<el-col :span="2">
							<el-form-item>
								<el-select v-model="form.custstatus" >
									<el-option label="所有状态" value=""></el-option>
									<el-option label="正常" value="1"></el-option>
									<el-option label="禁用" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>-->
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
							<el-button type="info" icon="plus" @click="add">添加</el-button>
							<el-button type="info" icon="arrow-down" @click="dataExport">导出</el-button>
							<el-button type="info" icon="edit" @click="signitem">标记待处理项目</el-button>
						</el-form-item>
					</el-row>
				</el-form>
				<!--表格块-->
				<el-table :data="tableData3"  ref="multipleTable" border style="width: 100%" height="460" :row-class-name="tableRowClassName"  @selection-change="handleSelectionChange">
					<el-table-column type="selection" fixed='left' width="55"></el-table-column>
					<el-table-column v-for="(item,index) in table_list" :key="item.name" :prop="item.prop" :label="item.name" :width="item.width"></el-table-column>
					<el-table-column fixed="right" label="操作" width="265">
						<template scope="scope">
							<el-button v-if="limitCtrl.updateFun==1" type="text" size="small" @click="addItem(scope.$index, scope.row)">添加项目</el-button>
							<el-button v-if="limitCtrl.updateFun==1" type="text" size="small" @click="user_modifu(scope.$index, scope.row)">修改</el-button>
							<el-button v-if="limitCtrl.ableFun==1" type="text" size="small" @click="user_disabled(scope.$index, scope.row)">
								<p v-if="scope.row.custstatus==1">禁用客户</p>
								<p v-if="scope.row.custstatus==2">启用客户</p>
								<p v-if="scope.row.custstatus==3">启用客户</p>
							</el-button>
							<el-button v-if="limitCtrl.ableFun==1" type="text" size="small" @click="item_status(scope.$index, scope.row)">
								<p v-if="scope.row.status==1">禁用项目</p>
								<p v-if="scope.row.status==2">启用项目</p>
								<p v-if="scope.row.status==3">启用项目</p>
							</el-button>
							<el-button v-if="limitCtrl.visitHisFun==1" type="text" size="small" @click="user_record(scope.$index, scope.row)">回访记录</el-button>
							<el-button v-if="limitCtrl.detailFun==1" type="text" size="small" @click="user_detail(scope.$index, scope.row)">查看详情</el-button>
							<el-button v-if="limitCtrl.tradeFun==1" type="text" size="small" @click="user_trad(scope.$index, scope.row)">交易</el-button>
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
					typevalue: '',
					custstatus: "",
					status: "",
					begindate: '',
					endDate: '',
					tradetype:'',
					contractStatus:'',
					sortCondition:''
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
						name: '交易类型',
						prop: 'tradetypename',
						width: '150'
					},
					{
						name: '交易状态',
						prop: 'commitstatusname',
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
						name: '被签单人',
						prop: 'replaceusername',
						width: '150'
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
		},
		methods: {
			reload: function(text) {
				
				if(text == 1) {
					this.loadData(this.currentPage)
				}
			},
			//搜索,点击搜索的是够后台返回数据
			search(onpage) {
				var salename = "";
				var salenull = "";
				var overdue = "";
				if(this.form.searchType=='salename'){
					salename = this.form.typevalue;
				}
				if(this.form.searchType=='salenull'){
					salenull = "0";
				}
				if(this.form.searchType=='overdue'){
					overdue = "overdue";
				}
				var req = {
					token: localStorage.CRM_token,
					searchType: this.form.searchType,
					typevalue: this.form.typevalue,
					custstatus: this.form.custstatus,
					tradetype:this.form.tradetype,
					itemType:this.form.itemType,
					contractStatus:this.form.contractStatus,
					sortCondition:this.form.sortCondition,
					begindate: this.form.begindate ? this.changeTime(this.form.begindate) : '',
					endDate: this.form.endDate ? this.changeTime(this.form.endDate) : '',
					salename:salename,
					salenull:salenull,
					overdue:overdue,
					pageNum: onpage,
					pageSize: this.pageSize
				};
				this.$http.get("/list/customer/search", {params: req}).then(function(res) {
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
			//标记代处理项目
			signitem(){
				if(this.itemIdArr.length<1){
      				this.$message({
          				message: '请选择一个项目',
				        type: 'warning'
				    });
      			}else{
      				//修改该项目的状态，变为1就是带处理
					this.$http.get("/list/customer/signPendingItem",{params:{
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
					})
      			}
			},
			//加载数据
			loadData(oncurrentPage) {
				console.log({
						token: localStorage.CRM_token,
						tradetype:this.tradetype,
						begindate: this.form.begindate ? this.changeTime(this.form.begindate) : '',
						endDate: this.form.endDate ? this.changeTime(this.form.endDate) : '',
						itemType:this.itemType,
						contractStatus:this.contractStatus,
						pageNum: oncurrentPage,
						pageSize: this.pageSize
					});
				this.$http.get("/list/customer/destopIndex", {
					params: {
						token: localStorage.CRM_token,
						tradetype:this.tradetype,
						begindate: this.form.begindate ? this.changeTime(this.form.begindate) : '',
						endDate: this.form.endDate ? this.changeTime(this.form.endDate) : '',
						itemType:this.itemType,
						contractStatus:this.contractStatus,
						pageNum: oncurrentPage,
						pageSize: this.pageSize
					}
				}).then(function(res) {
					if(res.body.code == 100) {
						console.log("list^^^^^^^^^^^^^^^^^^^^", res);
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
			//添加
			add() {
				if(this.itemIdArr.length>1){
      				this.$message({
          				message: '请选择一个客户客户',
				        type: 'error',
				        duration:2000,
				    });
      				return;
      			}
				this.$router.push({path: '/add', query: { itemid: this.itemIdArr[0]}})
				/*this.$router.push({
					path: "/add"
				})*/
			},

			//添加项目
			addItem(index, row) {
				if(this.itemIdArr.length>1){
      				this.$message({
          				message: '请选择一个客户客户',
				        type: 'error',
				        duration:2000,
				    });
      				return;
      			}
				this.$router.push({path: '/add', query: { itemid: row.itemid}})
				/*this.$router.push({
					path: "/add"
				})*/
			},
			//列表选择
			handleSelectionChange(val) {
				//console.log(val)
				this.itemIdArr = [];
				for(var i = 0; i < val.length; i++) {
					this.itemIdArr.push(val[i].itemid)
				}
			},
			//列表-修改-操作功能事件
			user_modifu(index, row) {
				//console.log(index, row);
				this.$router.push({
					path: '/user_modifu',
					query: {
						itemid: row.itemid,
						custid: row.custid,
						saleid: row.saleid
					}
				})
			},
			//列表-禁用-操作功能，相当于局部的刷新效果
			user_disabled(index, row) {
				var a = 0;
				if(row.custstatus == 1) {
					a = 2;
				} else {
					a = 1
				}
				this.$http.get("/list/customer/changeCustomerStatus", {
					params: {
						token: localStorage.CRM_token,
						custid: row.custid,
						status: a
					}
				}).then(function(res) {
					if(res.body.code == 100) {
						this.tableData3[index].custstatus = a;
						if(a == 1) {
							this.tableData3[index].custstatusName = "正常";
						} else if(a == 2) {
							this.tableData3[index].custstatusName = "禁用";
						}
					}
				})
			},
			//列表-禁用-操作功能，相当于局部的刷新效果
			item_status(index, row) {
				var a = 0;
				if(row.status == 1) {
					a = 2;
				} else {
					a = 1
				}
				this.$http.get("/list/customer/changItemStatus", {
					params: {
						token: localStorage.CRM_token,
						itemid: row.itemid,
						status: a
					}
				}).then(function(res) {
					if(res.body.code == 100) {
						this.tableData3[index].status = a;
						if(a == 1) {
							this.tableData3[index].itemstatusName = "正常";
						} else if(a == 2) {
							this.tableData3[index].itemstatusName = "禁用";
						}
					}
				})
			},
			//列表-回访-操作功能事件
			user_record(index, row) {
				this.$router.push({
					path: '/user_record',
					query: {
						itemid: row.itemid
					}
				})
			},
			//列表-查看详情-操作功能事件
			user_detail(index, row) {
				console.log(index, row)
				this.$router.push({
					path: '/user_list_detail',
					query: {
						itemid: row.itemid
					}
				})
			},
			//列表-交易-操作功能事件
			user_trad(index, row) {
				console.log(index, row);
				//提交状态:1未提交-;2-提交;3-审核通过;4-审核不通过
				if(row.commitstatus=='2'||row.commitstatus=='3'){
					this.$message({
			            message: '有未审核记录，不能进行此操作！',
			            type: 'error',
			            duration: 2000,
			          });
					return;
				}
				this.$router.push({
					path: '/user_trade',
					query: {
						itemid: row.itemid,
						tradetypeval: row.tradetype,
						commitstatusval: row.commitstatus,
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
				if(this.searchType != "" || this.typevalue != '' || this.custstatus != ""|| this.begindate != '' || this.endDate != '') {
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
				if(newVal[0].childList[0].childstatus == 0) {
		          this.$router.push({path: "/login"})
		        }
				this.limitCtrl =newVal[0].childList[0].map;
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
			tableRowClassName(row, index) {
		        if (row.relatecontstatus == -1) {
		          return 'info-row';
		        }
		        return '';
		    }
		},
		watch:{
//			"form.searchType"(n, o){
//				if(this.$route.query.itemtype && this.$route.query.itemtype >= 0 && this.$route.query.itemtype <= 7){
//					if (n!="itemtype") {
//						this.form.typevalue = ''
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
