<template>
	<div class="account_statistics">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--统计块-->
			<div class="table_list">
				<p>
					<ul class="listUl">
						<!--<span>项目类型：</span>-->
							<li v-for="item in allCount" >
								<b>{{item.count}}</b>
								<br>{{item.label}}
							</li>
						</ul>
				</p>
				<p v-if="itemCount.length > 0">
					<ul class="listUl">
						<!--<span>项目类型：</span>-->
							<li v-for="item in itemCount" >
								<b>{{item.count}}</b>
								<br>{{item.label}}
							</li>
						</ul>
				</p>
				<p v-if="lastSevenCount.length > 0">
						<ul class="listUl">
							<!--<span>项目类型：</span>-->
								<li v-for="item in lastSevenCount">
									<b>{{item.count}}</b>
									<br>{{item.label}}
								</li>
						</ul>
				</p>
				<el-table :data="tableData3" border height="460" style="width: 100%" @sort-change="orderChange">
					<el-table-column  prop="index" label="序号"  width="100"></el-table-column>
					<el-table-column prop="contact" label="客户姓名"   width="250">
					</el-table-column>
					<el-table-column prop="phone" label="手机号"  width="250">
					</el-table-column>
					<el-table-column prop="loginCount" label="登陆总次数"  sortable="custom" width="250">
					</el-table-column>
					<el-table-column prop="lastLoginDate" label="最近登陆时间 " sortable="custom" width="calc(100% - 975px)">
					</el-table-column>
					
					<!--<el-table-column label="操作" width="calc(100% - 975px)">
						<template scope="scope">
							<el-button v-if="limitCtrl.updateFun==1" type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改
							</el-button>
							<el-button v-if="limitCtrl.detailFun==1" type="text" size="small" @click="handleDetail(scope.$index, scope.row)">查看详情
							</el-button>
						</template>
					</el-table-column>-->
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
		name: 'account_statistics',
		data() {
			return {
				allCount: [
					{label:'最近7天登陆次数', value: 1, count:0,type:0},
					{label: '登陆总次数', value:2, count:0,type:0},
//					{label: '最近登陆时间',value:3, count:'',type:0}
				],
				itemCount: [
//					{label:'企业版登陆总次数', value: 1, count:0,type:0},
//					{label: '门户版登陆总次数', value:2, count:0,type:0},
//					{label: '电商版登陆总次数',value:3, count:0,type:0},
//					{label: '微商app登陆总次数',value:4, count:0,type:0},
//					{label: '小程序登陆总次数',value:5, count:0,type:0},
//					{label: '阿凡提登陆总次数',value:6, count:0,type:0},
//					{label: '汇搜云登陆总次数',value:7, count:0,type:0}
				],
				lastSevenCount:[
//					{label:'企业版最近7天登陆次数', value: 1, count:0,type:0},
//					{label: '门户版最近7天登陆次数', value:2, count:0,type:0},
//					{label: '电商版最近7天登陆次数',value:3, count:0,type:0},
//					{label: '微商app最近7天登陆次数',value:4, count:0,type:0},
//					{label: '小程序最近7天登陆次数',value:5, count:0,type:0},
//					{label: '阿凡提最近7天登陆次数',value:6, count:0,type:0},
//					{label: '汇搜云最近7天登陆次数',value:7, count:0,type:0}
				],
				form: {
					name: '',
					region1: '',
					region2: '',
					date1: '',
					date2: '',
				},
				orderFactor:2,
				tableData3: [],
				multipleSelection: [],
				//定义列表总数
				totalCount: 0,
				//定义当前页
				currentPage: 1,
				//定义每页条数
				pageSize: 10,
				limitCtrl: {}, //权限控制
				token: '',
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.token = { "token": localStorage.CRM_token };
			//初始化列表
			this.loadData();
			this.loadCountData();
		},
		methods: {
			reload(text) {
				if(text == 1) {
					this.loadData();
				}
			},
			//搜索
			search() {
				this.loadData();
			},
			add() {
				this.$router.push({ path: "/employee_list/add" })
			},
			//加载统计数据
			loadCountData() {
				this.$http.get('/list/customerUser/accountList', {
					params: {
						token: localStorage.CRM_token,
					}
				}).then(function(res) {
					console.log(res, "项目次数统计*********************")
					if(res != null && res.body.data != null ) {
						this.allCount[0].count = res.body.data.lastSevenCount  == null ? 0: res.body.data.lastSevenCount;
						this.allCount[1].count = res.body.data.loginCount == null ? 0: res.body.data.loginCount;
						var clickUrls = res.body.data.clickUrlVos;
						if (clickUrls.length > 0){
							for(var i = 0; i < clickUrls.length; i++){
							switch (clickUrls[i].itemtype){
								case 1: 
										var allCount = new Object();
										var lastSevenCount = new Object();
										allCount.label = "企业版登陆总次数";
										allCount.count = clickUrls[i].clickAllCount;
										this.itemCount.push(allCount);
										lastSevenCount.label = "企业版最近7天登陆次数";
										lastSevenCount.count = clickUrls[i].lastSevenCount == null ? 0 : clickUrls[i].lastSevenCount;
										this.lastSevenCount.push(lastSevenCount);	
										break;
								case 2:
										var allCount = new Object();
										var lastSevenCount = new Object();
										allCount.label = "门户版登陆总次数";
										allCount.count = clickUrls[i].clickAllCount;
										this.itemCount.push(allCount);
										lastSevenCount.label = "门户版最近7天登陆次数";
										lastSevenCount.count = clickUrls[i].lastSevenCount == null ? 0 : clickUrls[i].lastSevenCount;
										this.lastSevenCount.push(lastSevenCount);	
										break;
								case 3:
										var allCount = new Object();
										var lastSevenCount = new Object();
										allCount.label = "电商版登陆总次数";
										allCount.count = clickUrls[i].clickAllCount;
										this.itemCount.push(allCount);
										lastSevenCount.label = "电商版最近7天登陆次数";
										lastSevenCount.count = clickUrls[i].lastSevenCount == null ? 0 : clickUrls[i].lastSevenCount;
										this.lastSevenCount.push(lastSevenCount);	
										break;
								case 4:
										var allCount = new Object();
										var lastSevenCount = new Object();
										allCount.label = "微商app登陆总次数";
										allCount.count = clickUrls[i].clickAllCount;
										this.itemCount.push(allCount);
										lastSevenCount.label = "微商app最近7天登陆次数";
										lastSevenCount.count = clickUrls[i].lastSevenCount == null ? 0 : clickUrls[i].lastSevenCount;
										this.lastSevenCount.push(lastSevenCount);	
										break;
								case 5:
										var allCount = new Object();
										var lastSevenCount = new Object();
										allCount.label = "小程序登陆总次数";
										allCount.count = clickUrls[i].clickAllCount;
										this.itemCount.push(allCount);
										lastSevenCount.label = "小程序最近7天登陆次数";
										lastSevenCount.count = clickUrls[i].lastSevenCount == null ? 0 : clickUrls[i].lastSevenCount;
										this.lastSevenCount.push(lastSevenCount);	
										break;
								case 6:
										var allCount = new Object();
										var lastSevenCount = new Object();
										allCount.label = "阿凡提登陆总次数";
										allCount.count = clickUrls[i].clickAllCount;
										this.itemCount.push(allCount);
										lastSevenCount.label = "阿凡提最近7天登陆次数";
										lastSevenCount.count = clickUrls[i].lastSevenCount == null ? 0 : clickUrls[i].lastSevenCount;
										this.lastSevenCount.push(lastSevenCount);	
										break;
								case 7:
										var allCount = new Object();
										var lastSevenCount = new Object();
										allCount.label = "汇搜云登陆总次数";
										allCount.count = clickUrls[i].clickAllCount;
										this.itemCount.push(allCount);
										lastSevenCount.label = "汇搜云最近7天登陆次数";
										lastSevenCount.count = clickUrls[i].lastSevenCount == null ? 0 : clickUrls[i].lastSevenCount;
										this.lastSevenCount.push(lastSevenCount);	
										break;
								default:
									break;
							}
						}
						}
					} else {
					}
				})
			},
			//加载列表数据
			loadData() {
				console.log("orderFactor*************", this.orderFactor)
				this.$http.get('/list/customerUser/custUserOrder', {
					params: {
						token: localStorage.CRM_token,
						orderFactor: this.orderFactor,
						custuserid: localStorage.CRM_userid,
						pageNum: this.currentPage,
						pageSize: this.pageSize,
					}
				}).then(function(res) {
					console.log(res, "客户列表数据*********************")
					if(res != null && res.body.data != null && res.body.data.list.length > 0) {
//						this.tableData3 = "";
						this.tableData3 = res.body.data.list;
						//添加一个index属性显示
						for(var i = 0; i < this.tableData3.length; i++) {
							this.tableData3[i].index = i + 1;
						}
						this.totalCount = res.body.data.total;
						this.currentPage = res.body.data.pageNum;
					} else {
						this.tableData3 = []
					}
				})
			},
			orderChange(scope){
				if (scope.prop == "lastLoginDate" && scope.order == "ascending"){
					this.orderFactor = 1;
				} else if (scope.prop == "lastLoginDate" && scope.order == "descending"){
					this.orderFactor = 2;
				} else if (scope.prop == "loginCount" && scope.order == "ascending"){
					this.orderFactor =3;
				} else if (scope.prop == "loginCount" && scope.order == "descending"){
					this.orderFactor = 4;
				}
				this.loadData();
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//员工信息修改页
			handleEdit(index, row) {
				console.log(index, row)
				this.$router.push({
					path: '/employee_list/update',
					query: {
						token: localStorage.CRM_token,
						empid: row.empid,
					}
				})
			},
			//员工信息详情页
			handleDetail(index, row) {
				console.log(index, row)
				this.$router.push({
					path: '/employee_list/detail',
					query: {
						token: localStorage.CRM_token,
						empid: row.empid
					}
				})
			},
			//分页条数
			handleSizeChange(val) {
				this.pageSize = val;
				console.log('每页 条' + val);
			},
			//换页触发
			handleCurrentChange(val) {
				console.log('当前页: ' + val);
				this.currentPage = val;
				if(this.tableData3.length > 0) {
					this.loadData();
				}
			},
			//时间转换
			changeTime() {
				var newTime = new Date();
				var yy = newTime.getFullYear();
				var mm = (newTime.getMonth() + 1) > 10 ? (newTime.getMonth() + 1) : '0' + (newTime.getMonth() + 1);
				var dd = newTime.getDate() > 10 ? newTime.getDate() : "0" + newTime.getDate();
				var hh = newTime.getHours() > 10 ? newTime.getHours() : "0" + newTime.getHours();
				var min = newTime.getMinutes() > 10 ? newTime.getMinutes() : "0" + newTime.getMinutes();
				var ss = newTime.getSeconds() > 10 ? newTime.getSeconds() : "0" + newTime.getSeconds();
				return(yy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":" + ss)
			},
			//权限改变
			limititem(val) {
				var newVal = [];
				for(var i = 0; i < val.length; i++) {
					for(var j = 0; j < val.length; j++) {
						if(val[j].menutarget == i + 1) {
							newVal.push(val[j])
						}
					}
				}
				if(newVal[9].childList[0].childstatus == 0) {
					this.$router.push({ path: "/login" })
				}
				this.limitCtrl = newVal[9].childList[0].map;
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.account_statistics{
		.table_list{
		margin-top: 40px;
			border: 1px solid #d9d9d9;
			p{
				padding: 15px 10px;
				border-bottom: 1px solid #d9d9d9;
			}
				.listUl{
						display: inline-block;
						li{
							display: inline-block;
							margin: 0 10px;
							text-align: center;
							color: #333;
							&:hover{
								cursor: pointer;
							};
							b{
								 color: dodgerblue;
							}
						}
					}
					}
	}
	
	.el-button--success {
		background: #2EB398;
		border-color: #2EB398;
	}
</style>