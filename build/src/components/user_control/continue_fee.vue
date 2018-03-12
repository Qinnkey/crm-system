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
								<el-select v-model="form.searchType" placeholder="请选择项目全称">
									<el-option label="所有项目" value=""></el-option>
									<el-option label="客户手机号" value="phone"></el-option>
									<el-option label="客户姓名" value="contact"></el-option>
									<el-option label="项目类型" value="itemtype"></el-option>
									<el-option label="项目全称" value="itemname"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="3">
							<el-form-item>
								<el-select v-model="form.custstatus" placeholder="请选择">
									<el-option label="全部状态" value=""></el-option>
									<el-option label="正常" value="1"></el-option>
									<el-option label="禁用" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4" v-if="form.searchType!='itemtype'">
								<el-form-item>
									<el-input v-model="form.typevalue" placeholder="请输入查询的值"></el-input>
								</el-form-item>
						</el-col>
						<el-col :span="4" v-else>
							<el-form-item>
								<el-select v-model="form.typevalue" placeholder="请选择">
										<el-option v-for="item in itemTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item>
								<el-col :span="7">
									<el-date-picker type="date" placeholder="开始时间" :picker-options="pickerOptions0" v-model="form.begindate" style="width: 100%;"></el-date-picker>
								</el-col>
								<el-col class="line" :span="1">&nbsp;--</el-col>
								<el-col :span="8">
									<el-date-picker type="date" placeholder="结束时间"  :picker-options="pickerOptions1" v-model="form.endDate" style="width: 100%;"></el-date-picker>
								</el-col>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label-width="80px">
								<el-button v-if="limitCtrl.searchBtn==1" type="success" icon="search" @click="search(1)">查找</el-button>
								<!--<el-button type="success" icon="add" @click="signrenewitem()">标记续费跟踪</el-button>-->
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<!--表格块-->
				<el-table :data="tableData3" border style="width: 100%" height="460" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" ref="multipleTable">
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
				</el-table>
				<div class="renewal" style="margin-top: 20px;">
					<el-col :span="2">
						<el-button v-if="limitCtrl.importBtn==1" style="margin: 0 10px;" type="success" @click="export_data">数据导出</el-button>
					</el-col>
					<!--分页器-->
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="totalCount">
						</el-pagination>
					</div>
				</div>
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
					searchType: '',
					typevalue: '',
					custstatus: '',
					begindate: '',
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
						name: '客户状态',
						prop: 'custstatusName',
						width: '150'
					},
					{
						name: '标记续费',
						prop: 'markstatusname',
						width: '150'
					},
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
		},
		methods: {
			//搜索,点击搜索的是够后台返回数据
			search(onpage) {
				this.$http.get("/list/customer/search", {
					params: {
						searchType: this.form.searchType,
						typevalue: this.form.typevalue,
						custstatus: this.form.custstatus,
						begindate: this.form.begindate?this.changeTime(this.form.begindate):'',
						endDate: this.form.endDate?this.changeTime(this.form.endDate):'',
						pageNum: onpage,
						pageSize: this.pageSize,
						isrenew:  1
					}
				}).then(function(res) {
					console.log(res);
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
						this.this.totalCount=0;
						this.currentPage=1;
					}
				})
			},  //加载数据
			loadData(page){
				 	this.$http.get("/list/customer/renew", {
					params: {
						token  : localStorage.CRM_token,
						beginDate:localStorage.CRM_beginDate,
						endDate:localStorage.CRM_endDate,
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
						if(this.tableData3[i].markstatus == '1'){
							this.tableData3[i].markstatusname = '已'
						}else{
							this.tableData3[i].markstatusname = '未'
						}
					}
					}else{
						this.tableData3=[]
					}

				})
			},
			//标记代处理项目
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
			},
			//添加
			add() {
				this.$router.push({
					path: "/add"
				})
			},

			//列表选择
			handleSelectionChange(val) {
				console.log(val)
				this.itemIdArr = [];
				for(var i=0; i<val.length; i++){
					this.itemIdArr.push(val[i].itemid)
				}
				console.log(this.itemIdArr);
      		},
      		//列表-修改-操作功能事件
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
      		},
			//导出数据
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
			},
			
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
        if(newVal[0].childList[3].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
				this.limitCtrl =newVal[0].childList[3].map;
			}
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
