
<template>
	<div class="user_list">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<!--搜索区块-->
				<el-form ref="form" :inline="true" :model="form" label-width="80px">
					<el-row>
						<el-col v-if="limitCtrl.searchBtn==1" :span="12">
							<el-form-item>
								<el-select v-model="form.searchType" placeholder="请选择">
									<el-option label="全部客户" value=""></el-option>
									<el-option label="客户手机号" value="2"></el-option>
									<el-option label="客户名称" value="3"></el-option>
	
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-input v-model="form.typevalue" placeholder="请输入查询值"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="success" icon="search" @click="search">查找</el-button>
							</el-form-item>
						</el-col>
						<el-col :span="5" :offset="7">
							<el-button v-if="limitCtrl.allVisitBtn==1" type="success" @click="all_visit">一键拜访</el-button>
							<el-button v-if="limitCtrl.tradedBtn==1" type="success" @click="user_deal">成单</el-button>
						</el-col>
					</el-row>
				</el-form>
				<!--表格块-->
				<el-table :data="tableData3" border style="width: 100%" height="460" @selection-change="handleSelectionChange">
					<el-table-column type="selection" fixed='left' width="55"></el-table-column>
					<el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name" :width="item.width"></el-table-column>
					<el-table-column label="操作" width="calc(100% - 975px)">
						<template scope="scope">
							<el-button v-if="limitCtrl.updateBtn==1" type="text" size="small" @click="user_modifu(scope.$index, scope.row)">修改</el-button>
							<el-button v-if="limitCtrl.removeFun==1" type="text" size="small" @click="user_disabled(scope.$index, scope.row)">移除</el-button>
							<el-button v-if="limitCtrl.visitFun==1" type="text" size="small" @click="user_record(scope.$index, scope.row)">拜访</el-button>
							<el-button v-if="limitCtrl.detailFun==1" type="text" size="small" @click="user_detail(scope.$index, scope.row)">查看详情</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="change flex_between" style="margin-top: 20px;">
					<!--分页器-->
					<div class="inline_block">
						<el-pagination @current-change="handleCurrentChange" :current-page.sync="current_page" layout="total, prev, pager, next, jumper" :total="totalCount">
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
				restaurants: [],
		        state1: '',
		        state2: '',
		        saleid:'',
		        salename:'',
				form:{
					searchType: '',
					typevalue: '',
					custstatus: '',
					begindate: '',
					endDate: '',
				},
				table_list: [{
						name: '序号',
						prop: 'index',
						width: '120'
					},
					{
						name: '客户姓名',
						prop: 'bigcontact',
						width: '150'
					},
					{
						name: '手机号',
						prop: 'bigphone',
						width: '150'
					},
					{
						name: '公司名称',
						prop: 'bigcompanyname',
						width: '250'
					},
					{
						name: '公司地址',
						prop: 'bigaddress',
						width: '300'
					},
					{
						name: '用户状态',
						prop: 'bigcontstatusname',
						width: '120',
					},
				],
				tableData3: [],
				//定义列表总数
				totalCount: 0,
				//定义当前页
				current_page: 1,
				//定义每页条数
				pageSize: 10,
				//select值
				tradetype: null,
				//用来存放选中的对象的
				selectObject:[],
				//大客户id数组
				bigIds: [],
				currentPage: 1,
				limitCtrl: {},		//权限控制
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.loadData();
		},
		methods: {
			reload(text){
				if (text==1) {
					this.loadData();
				}
			},
			//搜索,点击搜索的是够后台返回数据
			search() {
				this.loadData();
			},
			//业务员状态：1，正常；2，禁用
			formatter(row, column) {
				console.log(row.bigcontstatus);
				if(row.bigcontstatus=='1'){
					return "正常";
				}else{
					return "禁用";
				}
		   },
			//一键拜访
			all_visit(){
				console.log(this.bigIds);
				if(this.bigIds.length==0){
      				this.$message({
          				message: '请选择客户',
				        type: 'error',
				        duration:2000,
				    });
      				return ;
      			}
				this.$http.get('/list/bigVisitRecord/addBigVisitList',{
					params:{
						token: localStorage.CRM_token,
						bigids:this.bigIds,
					}
				}).then(function(res){
					console.log(res.code)
					if(res.code='100'){
                        this.loadData();                        
                        this.message('一键拜访成功','success')                    
					}else{
						this.loadData();
						this.message('一键拜访失败','error');					
					}
				})	
			},
			//加载数据
			loadData(){
				var bigContact = '';
				var bigPhone = '';
				if(this.form.searchType==2){
					bigPhone = this.form.typevalue;
				}
				if(this.form.searchType==3){
					bigContact = this.form.typevalue;
				}
				this.$http.get("/list/bigcustomer/list", {
					params: {
						token: localStorage.CRM_token,
						bigSaleStatus:2,
						bigPhone: bigPhone,
						bigContact: bigContact,
						pageNum: this.current_page,
						pageSize: this.pageSize
					}
				}).then(function(res) {
					if(res!=null&&res.body.data!=null&&res.body.data.list.length>0){
						var json = res.body.data.list;
						this.tableData3 = json;
						this.totalCount = res.body.data.total;
						this.current_page = res.body.data.pageNum;
						for(var i=0;i<this.tableData3.length;i++){
							this.tableData3[i].index=i+1;
							if(this.tableData3[i].bigcontstatus=='1'){
								this.tableData3[i].bigcontstatusname = '正常';
							}else{
								this.tableData3[i].bigcontstatusname = '禁用';
							}
						}
					}else{
						this.tableData3=[]
					}
				})
			},
			//列表选择
			handleSelectionChange(val) {
        		this.selectObject = val;
        		var idArr = [];
				for (var i=0; i<val.length; i++) {
					console.log(val[i].bigid);
					idArr.push(val[i].bigid);
				}
				this.bigIds = idArr;
      		},
      		//列表-修改-操作功能事件
      		user_modifu(index,row){
      			console.log(index, row)
      			this.$router.push({path: '/assigned_customer_modifu', query: { bigid: row.bigid}})
      		},
      		//列表-禁用-操作功能，相当于局部的刷新效果
      		user_disabled(index,row){
      			//大客户状态标志：1，正常；2，禁用; 3，移除
      			var bigStatus=3;
      			this.$http.get("/list/bigcustomer/status",{
      				params:{
      					token: localStorage.CRM_token,
      					bigId:row.bigid,
      					bigStatus:bigStatus
      				}
      			}).then(function(res){
      				if (res.body.code==100) {
      					this.loadData();
////    				this.$router.push({ path: "/assigned_customer" });
//						this.reload(1);
      				}
      			})
      		},
      		//列表-回访-操作功能事件
      		user_record(index,row){
      			console.log("大客户拜访记录");
      			this.$router.push({
      				path: '/assigned_customer_record',
      				query: { 
      					bigid: row.bigid,
      					saleid: row.saleid,
      				}
      			})
      		},
      		//列表-成单
      		user_deal(){
      			if(this.bigIds.length==0){
      				this.$message({
          				message: '请选择客户',
				        type: 'error',
				        duration:2000,
				    });
      				return;
      			}
      			var json = {token: localStorage.CRM_token,bigIds:this.bigIds, bigSaleStatus:2};
      			this.$http.post("/list/bigcustomer/allocate",json,{emulateJSON:true}).then(function(res){
      				this.loadData();
      			})
      		},
      		//列表-查看详情-操作功能事件
      		user_detail(index,row){
      			console.log(index, row)
      			this.$router.push({path: '/assigned_customer_detail', query: { bigid: row.bigid}})
      		},
      		//currentPage 改变时会触发
      		handleCurrentChange(val) {
          		this.current_page = val;
        		if(this.tableData3.length>0){
        				this.loadData();
     			   }
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
		        if (newVal[2].childList[1].childstatus == 0) {
		          this.$router.push({path: "/login"})
		        }
		        this.limitCtrl = newVal[2].childList[1].map;
	      	},
			message(msg, msg_type) {
        		this.$message({
          			message: msg,
          			type: msg_type
        		});
      		}
		}
	}
</script>

<style scoped="scoped">
	.el-button--success {
		background: #2EB398;
		border-color: #2EB398;
	}
</style>

