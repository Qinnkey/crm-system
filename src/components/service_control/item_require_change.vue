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
								<el-option label="全部状态" value="0"></el-option>
								<el-option label="正常" value="1"></el-option>
								<el-option label="禁用" value="2"></el-option>
								<el-option label="待续费" value="3"></el-option>
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
							<el-date-picker type="date" placeholder="结束时间"   :picker-options="pickerOptions0"  v-model="form.enddate" style="width: 100%;"></el-date-picker>
						</el-col>
					</el-form-item>
					<el-form-item label-width="80px">
						<el-button  type="success" icon="search" @click="search(1)">查找</el-button>
<!--						<el-button type="info"  @click="histList">变更记录</el-button>
-->						<el-button type="info"  @click="dispose()">处理</el-button>
					</el-form-item>
				</el-form>
				<!--表格块-->
				<el-table :data="tableData3" border style="width: 100%" height="460" @selection-change="handleSelectionChange">
					<el-table-column type="selection" fixed='left' width="55"></el-table-column>
					<el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name" :width="item.width"></el-table-column>
					<el-table-column fixed="right" label="操作" width="col100(100%-1605px)">
						<template scope="scope">	
							<el-col :span="18"  :offset="5">
								<el-button  type="text" size="small" @click="user_detail(scope.$index, scope.row)">查看项目</el-button>
								<el-button type="text" size="small" @click="requireDetail(scope.$index, scope.row)">需求详情</el-button></el-col>
									<el-dialog title="添加需求" :visible.sync="isAddRequireVisible" :modal-append-to-body="false">
										<el-input type="textarea" readonly=true placeholder="填写客户提交的附加资料，及需求描述" :rows='5' v-model="Additemrequire"></el-input>
										<div label-width="100px">
											<el-upload class="upload-demo" :disabled=true :data="token" action="/list/customer/uploadRequireDoc"  :on-preview="handlePreview" :file-list="fileList4" >
												<el-button size="small" type="primary" disabled=true @click="change_salesman()">上传需求文档</el-button>
												&nbsp;
												<i slot="tip" class="el-upload__tip">上传word、pdf、ececl格式</i>
											</el-upload>
										</div>
										<div slot="footer" class="dialog-footer">
											<el-button @click="isAddRequireVisibleAdd(0)">返回</el-button>
										</div>
									</el-dialog>
							<!--<el-button v-if="limitCtrl.detailFun==1" type="text" size="small" @click="user_detail(scope.$index, scope.row)">查看详情</el-button>-->
						</template>
					</el-table-column>
				</el-table>
				<div class="change flex_between" style="margin-top: 20px;">
					<!--<el-form :inline="true" class="demo-form-inline">
						<el-form-item label="变更给指定人">
							<el-autocomplete class="inline-input" v-model="state1" placeholder="输入内容"  @select="handleSelect"  :fetch-suggestions="querySearchAsync"></el-autocomplete>
						</el-form-item>
						<el-form-item>
							<el-button style="margin: 0 10px;" type="primary" @click="onSubmit">提交</el-button><font color="red">注意（*提交后变更所有项目）</font>
						</el-form-item>
					</el-form>-->
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
					custstatus: "0",
					begindate: '',
					enddate: '',
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
						width: '120'
					},
					{
						name: '公司名称',
						prop: 'companyname',
						width: '150'
					},
					{
						name: '公司地址',
						prop: 'addressInfo',
						width: '230'
					},
					{
						name: '项目类型',
						prop: 'itemtypeName',
						width: '105'
					},
					{
						name: '汇搜云权限',
						prop: 'itemdetailname',
						width: '150'
					},
					{
						name: '变更次数',
						prop: 'changenum',
						width: '100'
					},
					{
						name: '是否处理',
						prop: 'dealstatusName',
						width: '100'
					},
					{
						name: '客户状态',
						prop: 'custstatusName',
						width: '100'
					},
					{
						name: '项目状态',
						prop: 'itemstatusName',
						width: '100'
					},
					{
						name: '业务员',
						prop: 'salename',
						width: '100'
					},
					{
						name: '变更时间',
						prop: 'createdate',
						width: '150'
					},
				],
				Additemrequire:'',
				token:null,
				isAddRequireVisible:false,
				fileList4:[],
				tableData3: [],
				//定义列表总数
				totalCount: 0,
				//定义当前页
				currentPage: 1,
				//定义每页条数
				pageSize: 10,
				//select值
				tradetype: null,

			/*	changesaleid: '',		//指定变更人的手机号*/
				custIdArr: [],	//item的id数组
				/*restaurants:[],
				state1:   "",*/
				phone:'',
				contact:'',
				itemname:'',
				salename:'',
				saleid:-1,
				requirechangeids:[],
				limitCtrl: {},		//权限控制
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
			
				//列表-查看详情-操作功能事件
			user_detail(index, row) {
				console.log(index, row)
				this.$router.push({
					path: '/user_item_detail',
					query: {
						itemid: row.itemid
					}
				})
			},
			
			//弹窗
			isAddRequireVisibleAdd(type) {
				switch(type) {
					case 0:
						this.isAddRequireVisible = false;
						break;
					case 1:
						this.isAddRequireVisible = true;
						break;
					default:
						this.isAddRequireVisible = false;
						//   		console.log(其他")
						break;
				}
			},
			
			requireDetail(index, row){
				this.isAddRequireVisibleAdd(1);
				var requireid = row.requireid;
				this.$http.get("/list/requireChange/requireDetail", {
						params: {
							requireid:requireid
						}
					}).then(function(res) {
						 let tmpZips = new Array();
						if(res.code=100 && res.body.data!=null){
							var json =res.body.data;
							json[0].forEach(function (o) {
				              var a = o.split("/");
				             tmpZips.push({
				                name: a[a.length - 1],
				                url: o 
				              })
				            });
				           this.fileList4=tmpZips;
				            this.Additemrequire=json[1].requirecontent;
						}else{
							
						}
					})
			},
			//搜索,点击搜索的是够后台返回数据
			search(onpage) {
				this.loadData(onpage);
			},  //加载数据
			loadData(page){
					var phone=''
					var contact=''
					var itemname=''
					var salename=''
					var saleid=-1
					if(this.form.searchType=='phone'){
						phone = this.form.typevalue;
					}
					if(this.form.searchType=='contact'){
						contact = this.form.typevalue;
					}
					if(this.form.searchType=='itemname'){
						itemname = this.form.typevalue;
					}
					if(this.form.searchType=='salename'){
						salename = this.form.typevalue;
					}
					if(this.form.searchType=='salenull'){
						saleid = 0;
					}
				 	this.$http.get("/list/requireChange/search", {
					params: {
						phone:phone,
						contact:contact,
						itemname:itemname,
						salename:salename,
						saleid:saleid,
						begindate: this.form.begindate?this.changeTime(this.form.begindate):'',
						enddate: this.form.enddate?this.changeTime(this.form.enddate):'',
						itemtype:this.form.custstatus,
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
			
			dispose(){
				if(this.requirechangeids.length!=0){
					this.$http.get("/list/requireChange/dispose", {
						params: {
							requirechangeids:this.requirechangeids
						}
					}).then(function(res) {
						if(res.code=100){
							this.$message({
						          message: '处理成功',
						          type: 'success'
						        });
						        this.loadData(1);
						}else{
							this.$message({
						          message: '处理失败',
						          type: 'error'
						        });
						}
					})
				}else{
					this.$message({
				          message: '必须勾选需求记录',
				          type: 'warning'
				        });
				}
				
			},
			
			handlePreview(file) {
				console.log(file)
				//下载
				var urls=file.url.split("/");
				var url=urls[urls.length-2]+"/"+urls[urls.length-1]
				if(file.url != null && file.url != '') {
					this.$http.get("/list/customer/docDonwload/"+url).then(function(res) {
						console.log(res)
						//跳转下载
						if((res==null||res.body==null)||res.body.code==404){
							this.$message.error("文件丢失")
							return;
						}else{
							location.href ="/list/customer/docDonwload/"+url+"?token="+localStorage.CRM_token;
						}
					})
					

				}

			}, 
			
			//列表选择
			handleSelectionChange(val) {
        		this.requirechangeids = [];
				for(var i=0; i<val.length; i++){
					this.requirechangeids.push(val[i].requirechangeid)
				}
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
        if(newVal[6].childList[2].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
				this.limitCtrl =newVal[6].childList[2].map;
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
