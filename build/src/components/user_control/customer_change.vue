<template>
	<div class="user_list">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<!--搜索区块-->
				<el-form ref="form" :inline="true" :model="form" label-width="80px">
					<el-col :span="3">
						<el-form-item>
							<el-select v-model="form.searchType" placeholder="请选择项目全称">
								<el-option label="所有客户" value=""></el-option>
								<el-option label="客户手机号" value="phone"></el-option>
								<el-option label="客户姓名" value="contact"></el-option>
								<el-option label="项目全称" value="itemname"></el-option>
								<el-option label="业务员名称" value="salename"></el-option>
								<el-option label="未分配业务员项目" value="salenull"></el-option>
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
					<el-form-item>
						<el-input v-model="form.typevalue" placeholder="请输入查询的值"></el-input>
					</el-form-item>
					<el-form-item>
						<el-col :span="8">
							<el-date-picker type="date" placeholder="开始时间" v-model="form.begindate" style="width: 100%;"></el-date-picker>
						</el-col>
						<el-col class="line" :span="1">&nbsp;--</el-col>
						<el-col :span="8">
							<el-date-picker type="date" placeholder="结束时间"   :picker-options="pickerOptions0"  v-model="form.endDate" style="width: 100%;"></el-date-picker>
						</el-col>
					</el-form-item>
					<el-form-item label-width="80px">
						<el-button v-if="limitCtrl.searchBtn==1" type="success" icon="search" @click="search(1)">查找</el-button>
						<el-button type="info"  @click="histList">变更记录</el-button>
					</el-form-item>
				</el-form>
				<!--表格块-->
				<el-table :data="tableData3" border style="width: 100%" height="460" @selection-change="handleSelectionChange">
					<el-table-column type="selection" fixed='left' width="55"></el-table-column>
					<el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name" :width="item.width"></el-table-column>
					<el-table-column fixed="right" label="操作" width="col100(100%-1060px)">
						<template scope="scope">
						<!--	<el-button v-if="limitCtrl.updateBtn==1" type="text" size="small" @click="user_modifu(scope.$index, scope.row)">修改</el-button> -->
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
				<div class="change flex_between" style="margin-top: 20px;">
					<el-form :inline="true" class="demo-form-inline">
						<el-form-item label="变更给指定人">
							<el-autocomplete class="inline-input" v-model="state1" placeholder="输入内容"  @select="handleSelect"  :fetch-suggestions="querySearchAsync"></el-autocomplete>
						</el-form-item>
						<el-form-item>
							<el-button style="margin: 0 10px;" type="primary" @click="onSubmit">提交</el-button><font color="red">注意（*提交后变更所有项目）</font>
						</el-form-item>
					</el-form>
					<!--<el-col :span="2">
						<el-button type="success" @click="submit">提交</el-button>
					</el-col>-->
					<!--分页器-->
					<div class="inline_block">
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
			form: {
					searchType:'',
					typevalue: '',
					custstatus: "",
					begindate: '',
					endDate: '',
				},
				table_list: [{
						name: '序号',
						prop: 'index',
						width: '70'
					},
					{
						name: '客户姓名',
						prop: 'contact',
						width: '110'
					},
					{
						name: '项目',
						prop: 'itemname',
						width: '150'
					},
					{
						name: '手机号',
						prop: 'phone',
						width: '130'
					},
					{
						name: '公司名称',
						prop: 'companyname',
						width: '150'
					},
					{
						name: '公司地址',
						prop: 'addressInfo',
						width: '250'
					},
					{
						name: '用户状态',
						prop: 'custstatusName',
						width: '100'
					},
					{
						name: '业务员',
						prop: 'salename',
						width: '100'
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

				changesaleid: '',		//指定变更人的手机号
				custIdArr: [],	//item的id数组
				restaurants:[],
				state1:   "",

				limitCtrl: {},		//权限控制
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
				this.$http.get("/list/customer/search", {
					params: {
						searchType: this.form.searchType,
						typevalue: this.form.typevalue,
						custstatus: this.form.custstatus,
						begindate: this.form.begindate?this.changeTime(this.form.begindate):'',
						endDate: this.form.endDate?this.changeTime(this.form.endDate):'',
						salename:salename,
						salenull:salenull,
						pageNum: onpage,
						pageSize: this.pageSize
					}
				}).then(function(res) {
					console.log(res)
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
						this.totalCount=0;
						this.currentPage=1;
					}
				})
			},  //加载数据
			loadData(page){
				 	this.$http.get("/list/customer/changecustomer/index", {
					params: {
						pageNum: page,
						pageSize: this.pageSize
					}
				}).then(function(res) {
					console.log(res)
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
			//添加
			add() {
				this.$router.push({
					path: "/add"
				})
			},
			
			histList() {
				this.$router.push({
					path: "/Hist_list"
				})
			},

			//列表选择
			handleSelectionChange(val) {
        		this.custIdArr = [];
				for(var i=0; i<val.length; i++){
					this.custIdArr.push(val[i].custid)
				}
				//console.log(this.custIdArr)
      		},
      	/*	//列表-修改-操作功能事件
      		user_modifu(index,row){
      		//	console.log("111111111")
      			//console.log(index, row)
      			this.$router.push({path: '/customer_change_modifu', query: { itemid: row.itemid,custid:row.custid,saleid:row.saleid}})
      		},*/
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
      			//console.log(index, row)   customer_change_record
      			this.$router.push({path: '/customer_change_record',query:{ itemid: row.itemid}})
      		},
      		//列表-查看详情-操作功能事件
      		user_detail(index,row){
      			//console.log(index, row)
      			this.$router.push({path: '/customer_change_detail',query:{ itemid: row.itemid}})
      		},
      		//页码改变触发
      		handleSizeChange(val) {
      			console.log("dsfsdfsdf")
      		},
      		//currentPage 改变时会触发
      		handleCurrentChange(val) {
      			//判断是搜索的下一页还是普通首页的下一页
      			if(this.tableData3.length>0){
      				if(this.form.searchType!=''||this.form.typevalue!=''||this.form.custstatus!=''||this.form.begindate!=''||this.form.endDate!='') {
						this.search(val);
					} else {
						this.loadData(val);
					}
      			}
      				
      		},
      		//提交给指定人
      		onSubmit(){
      			if(this.custIdArr.length>0&&this.changesaleid!=''){
      				console.log("提交")
	      			this.$http.get("/list/customer/changecustomer/customerChangeSaleman",{
	      				params:{
	      					custids  : this.custIdArr,
	      					saleid: this.changesaleid
	      				}
	      			}).then(function(res){
	      				if(res.body.code!=null){
	      					if(res.body.code==404){
	      						//异常
	      						this.$message.error('错误，请联系管理员');
	      					}else if(res.body.code==102){
	      						//参数为空
	      						 this.$message({
							          message: '参数不能为空',
							          type: 'warning'
							        });

	      					}else if(res.body.code==100){
	      						 this.$message({
							          message: '变更成功',
							          type: 'success'
							        });
	      					this.loadData();
	      					}
	      				}else{
	      					console.log("错误")
	      				}
	      			})
		      	}else {
		      		this.$message("请选择变更客户或指定业务员");
		      	}
      		},
			changeTime(time){
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth()+1;
				var dd = newTime.getDate();
				return (yy+"-"+mm+"-"+dd)
			},

			querySearchAsync(queryString, cb) {
		        var restaurants = this.restaurants;
		        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
		          cb(results);

		      },
		      createStateFilter(queryString) {
		        return (state) => {
		          return (state.value.indexOf(queryString.toLowerCase()) === 0);
		        };
		      },
		      handleSelect(item) {
		      	this.changesaleid=item.saleid;
        		this.salename = item.salename;
		      },
		      loadAll(){
        		this.$http.get("/list/salesman/findSaleAll").then(function(res){
				    //加载json对象
	         		this.restaurants = res.body.data;
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
        if(newVal[0].childList[4].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
				this.limitCtrl =newVal[0].childList[4].map;
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
