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
								<el-select v-model="form.itemType"  @change="search(currentPage)">
									<el-option v-for="item in itemTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						
						<el-col :span="8">
							<el-form-item>
								<el-col :span="7">
									<el-date-picker type="date" placeholder="开始时间起" v-model="form.beginDate" style="width: 100%;"></el-date-picker>
								</el-col>
								<el-col class="line" :span="1">&nbsp;--</el-col>
								<el-col :span="8">
									<el-date-picker type="date" placeholder="开始时间止" v-model="form.endDate" style="width: 100%;"></el-date-picker>
								</el-col>
							</el-form-item>
						</el-col>
						<el-form-item label-width="80px">
							<el-button type="success" icon="search" @click="search(currentPage)">查找</el-button>
						</el-form-item>
					</el-row>
				</el-form>
				<!--表格块-->
				<el-table :data="tableData3"  ref="multipleTable" border style="width: 100%" height="460"  @selection-change="handleSelectionChange">
					<el-table-column type="selection" fixed='left' width="55"></el-table-column>
					<el-table-column v-for="(item,index) in table_list" :key="item.name" :prop="item.prop" :label="item.name" :width="item.width"></el-table-column>
					<el-table-column fixed="right" label="操作" width="265">
						<template scope="scope">
							<el-button v-if="limitCtrl.renreTraceDetail==1" type="text" size="small" @click="add(scope.$index, scope.row)">续费明细</el-button>
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
				form: {
					searchValue:'',
					itemType:'',
					beginDate: '',
					endDate: '',
				},
				table_list: [{
						name: '序号',
						prop: 'index',
						width: '100'
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
						width: '180'
					},
					{
						name: '企业名称',
						prop: 'companyname',
						width: '250'
					},
					{
						name: '项目全称',
						prop: 'itemname',
						width: '280'
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
						name: '业务员',
						prop: 'salename',
						width: '150'
					},
					{
						name: '跟踪次数',
						prop: 'tracenum',
						width: '150'
					},
					{
						name: '续费服务人',
						prop: 'petname',
						width: '150'
					},
					/*{
						name: '是否续费',
						prop: 'custrenewstatusname',
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
				itemType:'',
				//用来存放选中的对象的
				selectObject: [],
				itemIdArr:[],
				limitCtrl: {},//权限控制
			}
		},
		props: ['limitData'],

		components: {
			main_component,
			breadcrumb_component
		},

		created: function() {

			this.itemType = this.$route.query.itemType?this.$route.query.itemType:'',
			this.form.itemType=this.itemType?parseInt(this.itemType):'';
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
				this.loadData(onpage);
			}, 
			//加载数据
			loadData(oncurrentPage) {
				this.$http.get("/list/renewMark/listMarkSuc", {
					params: {
						token: localStorage.CRM_token,
						beginDate: this.form.beginDate ? this.changeTime(this.form.beginDate) : '',
						endDate: this.form.endDate ? this.changeTime(this.form.endDate) : '',
						itemType:this.form.itemType,
						searchValue:this.form.searchValue,
						pageNum: oncurrentPage,
						pageSize: this.pageSize
					}
				}).then(function(res) {
					if(res.body.code == 100) {
						
						if(res != null && res.body.data != null && res.body.data.list.length > 0) {
							var json = res.body.data.list;
							this.tableData3 = json;
							this.totalCount = res.body.data.total;
							this.currentPage = res.body.data.pageNum;
							for(var i = 0; i < this.tableData3.length; i++) {
								this.tableData3[i].index = i + 1;
								/*if(this.tableData3[i].custrenewstatus=='1'){
									this.tableData3[i].custrenewstatusname = '是';
								}else{
									this.tableData3[i].custrenewstatusname = '否';
								}*/
							}
						} else {
							this.tableData3 = []
						}
					}
				})
			},
			//添加
			add(index, row) {
				this.$router.push({path: '/renew_add_suc', query: { itemid: row.itemid}})
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

			//页码改变触发
			handleSizeChange(val) {
				//console.log('每页 ' + val + ' 条');
			},
			//currentPage 改变时会触发
			handleCurrentChange(val) {
				//val是当前的值，看是否的搜索，如果是搜索的话那么就是带着条件去搜索到下一页去
				console.log('当前页:' + val);
				//代条件的搜索
				this.loadData(val);

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
				if(newVal[7].childList[1].childstatus == 0) {
		          this.$router.push({path: "/login"})
		        }
				this.limitCtrl =newVal[7].childList[1].map;
			},
			changeTime(time){
				//console.log("--"+time)
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth() + 1;
				var dd = newTime.getDate();

				return(yy + "-" + mm + "-" + dd)
			},
			
			tableRowClassName(row, index) {
		        if (row.custrenewstatus == 1) {
		          return 'info-row';
		        }
		        return '';
		    }
		},
		watch:{
			"form.beginDate"(n,o){
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
