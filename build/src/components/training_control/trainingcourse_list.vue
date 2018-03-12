<template>
	<div class="trainingcourse_list">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<!--搜索区块-->
				<el-form ref="form" :inline="true" :model="form" label-width="80px">
					<el-col :span="4">
						<el-form-item>
							<el-select v-model="form.searchType" placeholder="请选择">
								<el-option label="课程名称" value="coursename"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-form-item>
						<el-input v-model="form.searchTypeValue"  placeholder="请输入值"></el-input>
					</el-form-item>
					<el-form-item>
						<el-col :span="8">
							<el-date-picker type="date" placeholder="开始时间"  v-model="form.startDate" style="width: 100%;"></el-date-picker>
						</el-col>
						<el-col class="line" :span="1">&nbsp;--</el-col>
						<el-col :span="8">
							<el-date-picker type="date" placeholder="结束时间"  v-model="form.endDate" style="width: 100%;"></el-date-picker>
						</el-col>
					</el-form-item>
					<el-form-item label-width="80px">
						<el-button  type="success" icon="search" @click="search">查找</el-button>
						<el-button  type="info" icon="plus" @click="add">添加</el-button>
					</el-form-item>
				</el-form>
				<!--表格块-->
				<el-table :data="tableData3" border height="460" @selection-change="handleSelectionChange">
					<el-table-column type="selection"  width="55"></el-table-column>
					<el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name" :width="item.width"></el-table-column>
					<el-table-column  label="操作" width="calc(100% - 1085px)">
						<template scope="scope">
							<el-button  type="text" size="small" @click="trainingcourse_modifu(scope.$index, scope.row)">修改</el-button>
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
				coursename:'',
				pickerOptions0: {
                  disabledDate(time) {
                        return time.getTime() > Date.now();
                        }
                },

				form: {
					searchType   : 'coursename',
					searchTypeValue: '',
					startDate  : '',
					endDate  : '',
				},
				renewal:'',		//业务员状态批量变更
				table_list: [
					{name:'序号', 	prop:'index',	width:'70'},
					{name:'课程名称',	prop:'coursename',	width:'170'},
					{name:'课程地点',	prop:'courseaddress',	width:'180'},
					{name:'课程时间',	prop:'coursetime',	width:'150'},
					{name:'邀约人数',	prop:'invitecount', width:'140'},
					{name:'实到人数',	prop:'traincount', width:'140'},
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
				this.$router.push({path: "/trainingcourse_add"})
			},
			//修改
			trainingcourse_modifu(index,row){
				this.$router.push({path:"/trainingcourse_update",query:{courseid:row.courseid}})
			},
			//加载列表数据
			loadData(){
				this.$http.get('/list/trainingCourse/index',{
					params: {
					token: localStorage.CRM_token,
					coursename: this.form.searchTypeValue,
					startDate: this.form.startDate?this.changeTime(this.form.startDate) :'',
					endDate:this.form.endDate?this.changeTime(this.form.endDate) :'',
					pageNum : this.currentPage,
					pageSize : this.pageSize
					}
				}).then(function(res){
						if(res.body==""){
							this.tableData3 = [];
							this.totalCount = 0;
							this.currentPage =1;
						}else{
							if(res.body.data==null || res.body.data.list==null || res.body.data.list.length==0){
								this.tableData3 =[];
							}else{
								var json=res.body.data.list;
								this.tableData3 = json;
				         		this.totalCount = res.body.data.total;
				         		this.currentPage = res.body.data.pageNum;
				         		for (var i=0; i<this.tableData3.length; i++) {
				         			this.tableData3[i].index = i+1
								}
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
        if(newVal[8].childList[2].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
				this.limitCtrl =newVal[8].childList[2].map;
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
