<template>
	<div class="salesman_list">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<!--搜索区块-->
				<el-form ref="form" :inline="true" :model="form" label-width="80px">
					<el-form-item>
						<el-select v-model="form.searchType" placeholder="请选择">
							<el-option label="业务员名称" value="salename"></el-option>
							<el-option label="业务员手机号" value="salephone"></el-option>
							<el-option label="客户名称" value="contact"></el-option>
							<el-option label="客户手机号" value="phone"></el-option>
							<el-option label="项目名称" value="itemname"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item>
						<el-input v-model="form.searchTypeValue" placeholder="请输入值"></el-input>
					</el-form-item>
					<el-form-item>
						<el-col :span="11">
							<el-date-picker type="date" placeholder="开始时间" :picker-options="pickerOptions0" v-model="form.startTime" style="width: 100%;"></el-date-picker>
						</el-col>
						<el-col :span="1">&nbsp;--</el-col>
						<el-col :span="11">
							<el-date-picker type="date" placeholder="结束时间" :picker-options="pickerOptions0" v-model="form.endTime" style="width: 100%;"></el-date-picker>
						</el-col>
					</el-form-item>
					<el-form-item>
						<el-select v-model="replystatus" placeholder="">
							<el-option label="业务回复状态" value=""></el-option>
							<el-option label="不需要回复" value="0"></el-option>
							<el-option label="需要回复" value="1"></el-option>
							<el-option label="已回复" value="2"></el-option>
						</el-select>
						&nbsp;&nbsp;
						<el-button type="success" icon="search" @click="search">查找</el-button>
					</el-form-item>
				</el-form>
				<!--表格块-->
				<el-table :data="tableData3" border height="460" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name" :width="item.width"></el-table-column>
					<el-table-column label="操作" width="calc(100% - 975px)">
						<template scope="scope">
							<el-button type="text" size="small" @click="after_sale_log(scope.$index, scope.row)">售后日志
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="renewal" style="margin-top: 20px;">
					<!--更改业务员状态
                    <el-col :span="3">
                        <el-select v-model="renewal" placeholder="请选择">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="禁用" value="2"></el-option>
                        </el-select>
                    </el-col>
                    -->
					<!--分页器-->
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total,  prev, pager, next, jumper" :total="totalCount">
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
		name: 'salesman_list',
		data() {

			return {
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				form: {
					searchType: 'salename',
					searchTypeValue: '',
					startTime: '',
					endTime: '',
				},
				renewal: '', //业务员状态批量变更
				table_list: [{
						name: '序号',
						prop: 'index',
						width: '65'
					},
					{
						name: '编号',
						prop: 'standby3',
						width: '120'
					},
					{
						name: '项目',
						prop: 'itemname',
						width: '150'
					},
					{
						name: '拜访客户',
						prop: 'contact',
						width: '110'
					},
					{
						name: '客户手机号',
						prop: 'phone',
						width: '130'
					},
					{
						name: '服务次数',
						prop: 'visitcount',
						width: '100'
					},
					{
						name: '业务员',
						prop: 'salename',
						width: '100'
					},
					{
						name: '最近联系时间',
						prop: 'createdate',
						width: '130'
					},
					{
						name: '售后形式',
						prop: 'visitwayname',
						width: '100'
					},
					{name: '回访人', prop: 'petname', width: '100'},
					{
						name: '备注',
						prop: 'visitremarks',
						width: '300'
					},
					{
						name: '是否业务员回复',
						prop: 'replystatusname',
						width: '135'
					},
					{
						name: '业务员回复内容',
						prop: 'replycontext',
						width: '300'
					},
					//{name:'回访记录ID',    prop:'visitid', width:'0' },
				],
				tableData3: [],
				//表模块选中的值
				multipleSelection: [],
				//定义列表总数
				totalCount: 0,
				//定义当前页
				currentPage: 0,
				//定义每页条数
				pageSize: 10,
				//select值
				tradetype: null,
				//项目id数组
				itemids: [],

				limitCtrl: {}, //权限控制
				replystatus: null
			}

		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			//初始化列表
			this.loadData();
		},
		methods: {
			reload() {
				this.loadData();
			},
			//处理日期的方法
			changeTime(time) {
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = (newTime.getMonth() + 1) > 10 ? (newTime.getMonth() + 1) : '0' + (newTime.getMonth() + 1);
				var dd = newTime.getDate() > 10 ? newTime.getDate() : "0" + newTime.getDate();
				return(yy + "-" + mm + "-" + dd)
			},
			//搜索
			search() {
				console.log('submit!');
				console.log(this.form)
				this.loadData();
			},
			/* add() {
			   if (this.itemids.length == 1) {
			     this.$router.push({path: "/after_sales_add", query: {itemid: this.itemids[0]}})
			   } else if (this.itemids.length == 0) {
			     this.message('添加售后日志 必须选择项目', 'error');
			     this.loadData();
			   } else {
			     this.message('添加售后日志 不能选择多个项目', 'error');
			     this.loadData();
			   }

			 },*/
			//加载列表数据
			loadData() {
				this.$http.get('/list/visitRecord/search', {
					params: {
						token: localStorage.CRM_token,
						searchType: this.form.searchType,
						searchTypeValue: this.form.searchTypeValue,
						startTime: this.form.startTime ? this.changeTime(this.form.startTime) : '',
						endTime: this.form.endTime ? this.changeTime(this.form.endTime) : '',
						pageNum: this.currentPage,
						pageSize: this.pageSize,
						replystatus: this.replystatus
					}
				}).then(function(res) {
					//console.log(res.body.data.list)
					if(res.body.data.list.length == 0 || res == null || res.body == null) {
						this.tableData3 = [];
						this.totalCount = 0;
						this.currentPage = 1;
					} else {
						//console.log(res)
						this.tableData3 = res.body.data.list;
						//添加一个index属性显示
						for(var i = 0; i < this.tableData3.length; i++) {
							this.tableData3[i].index = i + 1
						}
						this.totalCount = res.body.data.total;
						this.currentPage = res.body.data.pageNum;
					}

				})

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				this.itemids = [];
				for(var i = 0; i < val.length; i++) {
					this.itemids.push(val[i].itemid)
				}
			},
			//修改
			modifu(index, row) {
				console.log(index, row)
				this.$router.push({
					path: "/after_sales_modifu",
					query: {
						visitid: row.visitid
					}
				})
			},
			//售后日志
			after_sale_log(index, row) {
				this.$router.push({
					path: "/service_reply_log",
					query: {
						itemid: row.itemid
					}
				})
			},

			//一键回访
			onSubmit() {
				//console.log(this.renewal)

				//console.log(itemids);
				if(this.itemids.length == 0) {
					this.$message({
						message: '请选择项目',
						type: 'error',
						duration: 2000,
					})
				}

				this.$http.get('/list/visitRecord/addVisitList', {
					params: {
						token: localStorage.CRM_token,
						itemids: this.itemids,
					}
				}).then(function(res) {
					if(res.body.code == 100) {
						this.message('一键回访成功', 'success');
						this.loadData();
					} else {
						this.message('一键回访失败', 'error');
					}
				})
			},
			//分页条数
			handleSizeChange(val) {
				this.pageSize = val;
				console.log('每页 条' + val);
				//this.loadData();
			},
			//换页触发
			handleCurrentChange(val) {
				console.log('当前页: ' + val);
				this.currentPage = val;
				this.loadData();
			},
			//搜索选择select
			handleSelectChange(val) {
				this.tradetype = val;
				//this.loadData();
			},
			//提示信息
			message(msg, msg_type) {
				this.$message({
					message: msg,
					type: msg_type
				});
			},
			
			tableRowClassName(row, index) {
		        if (row.visitcount > 0) {
		          return 'info-row';
		        }
		        return '';
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
				console.log(newVal[6].childList[1],"======================");
				if(newVal[6].childList[1].childstatus == 0) {
					this.$router.push({
						path: "/login"
					})
				}
				this.limitCtrl = newVal[6].childList[1].map;
			}
		},
	}
</script>
<!--            <el-button v-if="limitCtrl.allVisitBtn==1" style="margin: 0 20px;" type="success" @click="onSubmit">一键回访
-->
<style scoped="scoped">
	.el-button--success {
		background: #2EB398;
		border-color: #2EB398;
	}
	.el-table .info-row {
		background: #C6E2FF;
	}
</style>