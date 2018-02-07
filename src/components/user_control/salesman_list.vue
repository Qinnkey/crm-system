<template>
	<div class="salesman_list">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<!--搜索区块-->
				<el-form ref="form" :inline="true" :model="form" label-width="80px">
					<el-col :span="4">
						<el-form-item>
							<el-select v-model="form.searchType" placeholder="请选择">
								<el-option label="业务员名称" value="salename"></el-option>
								<el-option label="业务员手机号" value="salephone"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-form-item>
						<el-input v-model="form.searchTypeValue"  placeholder="请输入值"></el-input>
					</el-form-item>
					<el-form-item>
						<el-col :span="8">
							<el-date-picker type="date" placeholder="开始时间" :picker-options="pickerOptions0" v-model="form.startTime" style="width: 100%;"></el-date-picker>
						</el-col>
						<el-col class="line" :span="1">&nbsp;--</el-col>
						<el-col :span="8">
							<el-date-picker type="date" placeholder="结束时间" :picker-options="pickerOptions0" v-model="form.endTime" style="width: 100%;"></el-date-picker>
						</el-col>
					</el-form-item>
					<el-form-item label-width="80px">
						<el-button v-if="limitCtrl.searchBtn==1" type="success" icon="search" @click="search">查找</el-button>
						<el-button v-if="limitCtrl.addBtn==1" type="info" icon="plus" @click="add">添加</el-button>
					</el-form-item>
				</el-form>
				<!--表格块-->
				<el-table :data="tableData3" border height="460" @selection-change="handleSelectionChange">
					<el-table-column type="selection"  width="55"></el-table-column>
					<el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name" :width="item.width"></el-table-column>
					<el-table-column  label="操作" width="calc(100% - 975px)">
						<template scope="scope">
							<el-button v-if="limitCtrl.updateFun==1" type="text" size="small" @click="salesman_modifu(scope.$index, scope.row)">修改</el-button>
							<!-- <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">禁用</el-button> -->
							<el-button v-if="limitCtrl.detailFun==1" type="text" size="small" @click="salesman_detail(scope.$index, scope.row)">查看详情</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="renewal" style="margin-top: 20px;" >
					<!--更改业务员状态-->
				<!--	<el-col :span="3">
						<el-select v-model="renewal" placeholder="请选择">
							<el-option label="正常" value="1"></el-option>
							<el-option label="禁用" value="2"></el-option>
						</el-select>
					</el-col>

					<el-col :span="2">
						<el-button style="margin: 0 10px;" type="success" @click="onSubmit">提交</el-button>
					</el-col>
					-->
					<!--分页器-->
					<div class="block">
						<el-pagination @size-change="handleSizeChange"   @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total,  prev, pager, next, jumper" :total="totalCount">
						</el-pagination>
					</div>
				</div>
			</div>
		</main_component>
		<router-view @reload="search"></router-view>
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
					searchType   : 'salename',
					searchTypeValue: '',
					startTime  : '',
					endTime  : '',
				},
				renewal:'',		//业务员状态批量变更
				table_list: [
					{name:'序号', 	prop:'index',	width:'70'},
					{name:'业务员', 	prop:'salename',	width:'150'},
					{name:'手机号',	prop:'salephone',	width:'190'},
					{name:'微信号',	prop:'saleweixin',	width:'190'},
					{name:'邮箱',	prop:'saleemail',	width:'220'},
					/*{name:'手机号',	prop:'salephone',	width:'150'},
					{name:'微信号',	prop:'saleweixin',	width:'150'},
					{name:'邮箱',	prop:'saleemail',	width:'150'},*/
					{name:'客户数量',	prop:'customers', width:'125'},
					//{name:'业务员状态',	prop:'salestatus', width:'150'},
				],
				tableData3: [],
				multipleSelection: [],
				//定义列表总数
				totalCount: 0,
				//定义当前页
				currentPage: 0,
				//定义每页条数
				pageSize:10,
				//select值
				tradetype:null,

				limitCtrl: {},		//权限控制
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
			changeTime(time){
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = (newTime.getMonth()+1)>10?(newTime.getMonth()+1):'0'+(newTime.getMonth()+1);
				var dd = newTime.getDate()>10?newTime.getDate():"0"+newTime.getDate();
				return (yy+"-"+mm+"-"+dd)
			},
			//搜索
			search() {
				this.loadData();
			},
			//添加
			add(){
				this.$router.push({path: "/salesman_add"})
			},
			//修改
			salesman_modifu(index,row){
				this.$router.push({path:"/salesman_modifu",query:{salephone:row.salephone}})
			},
			//查看详情
			salesman_detail(index,row){
				this.$router.push({path:"/salesman_detail",query:{salephone:row.salephone}})
			},
			//加载列表数据
			loadData(){
				this.$http.get('/list/salesman/findSale',{
					params: {
					token: localStorage.CRM_token,
					searchType:this.form.searchType,
					searchTypeValue:this.form.searchTypeValue,
					startTime: this.form.startTime?this.changeTime(this.form.startTime) :'',
					endTime:this.form.endTime?this.changeTime(this.form.endTime) :'',
					pageNum : this.currentPage,
					pageSize : this.pageSize
					}
				}).then(function(res){
						if(res.body==""){
							this.tableData3 = [];
							this.totalCount = 0;
							this.currentPage =1;
						}else{
							var json=res.body.data.list;
							this.tableData3 = json;
	         		this.totalCount = res.body.data.total;
	         		this.currentPage = res.body.data.pageNum;
	         		for (var i=0; i<this.tableData3.length; i++) {
	         			this.tableData3[i].index = i+1
					}
						}

				})

			},
			handleSelectionChange(val) {
        		this.multipleSelection = val;
      		},
      		handleEdit(index,row){
      			console.log(index, row)
      		},
      		onSubmit(){
      			console.log(this.renewal)
      		},
      		//分页条数
      		handleSizeChange(val) {
      			this.pageSize = val;
        		console.log('每页 条'+val);
      		},
      		//换页触发
      		handleCurrentChange(val) {
        		console.log('当前页: '+val);
        		this.currentPage = val;
        		this.loadData();
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
        if(newVal[0].childList[1].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
				this.limitCtrl =newVal[0].childList[1].map;
				console.log(this.limitCtrl,"6666")
			},
		}
	}
</script>

<style scoped="scoped">
	.el-button--success{
		background: #2EB398;
		border-color: #2EB398;
	}
</style>
