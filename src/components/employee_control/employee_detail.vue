<template>
	<div class="employee_list">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<el-form :model="employee_detail" ref="employee_detail" label-width="160px" class="demo-ruleForm">
					<el-row>
						<el-col :span="18">
							<b>员工详细信息：</b> <br/> <br/>
						</el-col>
						<el-col :span="9" v-for="item in employee_detail.employeeInfo" :key="item.name">
							<el-form-item v-if="item.type=='input'" :label="item.name">
								<el-input :disabled="true" type="text" v-model="item.modelVal" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
							<el-col :span="9">
							<el-form-item label="部门：" prop="duty">
								<el-cascader :disabled=true  :change-on-select=true :options="deps" v-model="selectedOptions3" @change="handleChange"></el-cascader>
							</el-form-item>
						</el-col>
						
						<el-col :span="9">
							<el-form-item label="岗位：" prop="post">
								<el-select :disabled=true v-model="employee_detail.postid"  @change="selectChange"  placeholder="请选择">
								    <el-option v-for="item in posts" :key="item.value" :label="item.label" :value="item.value">
								    </el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="18">
					
							<el-form-item label="备注："prop="empremark">
								<el-input type="textarea" :disabled="true" :rows='5' v-model="employee_detail.employeeInfo.empremark"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-row>
					<el-col :span="4":offset="9">
						<router-link to="/employee_list"><el-button style="margin-bottom: 40px;">返回</el-button></router-link>
					</el-col>
				</el-row>	
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
	var oid = '';
	export default {
		name: 'employee_list',
		data() {
			return {
				//部门
				deps:[],
				posts:[],
				selectedOptions3:[],
				oid: 0,
				pid: '',
				tableData3:[],
				employee_detail: {
					//用户信息
					employeeInfo: [
						{name: "姓名：",		modelVal: null, type: "input"},
						{name: "手机号：",	modelVal: null, type: "input"},
						{name: "身份证：", 	modelVal: null, type: "input"},
						{name: "生日：", 		modelVal: null, type: "input"},
						{name: "微信号：",	modelVal: null, type: "input"},
						{name: "QQ：",	modelVal: null, type: "input"},
						{name: "邮箱：", 		modelVal: null, type: "input"},
						{name: "入职时间：",	modelVal: null, type: "input"},
						{name: "职务：",	modelVal: null, type: "input"},
						{name: "地址：",	modelVal: null, type: "input"},
						{name: "籍贯：",	modelVal: null, type: "input"},
						{name: "员工状态：",	modelVal: null, type: "input"},
						{name: "紧急联系人：",	modelVal: null, type: "input"},
						{name: "紧急联系人手机号：",	modelVal: null, type: "input"},
						{name: "角色：",	modelVal: null, type: "input"},
						
						{name: "备注：",	modelVal: null, type: "textarea"},
						
					],
					post:'',
					postid:'',
				},
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			//加载详细信息
			this.loadData();
				//初始化部门树
			this.cascadervalue();
			//回显岗位id
			this.loadPostid();
			//回显部门树
			this.loadOrgAndPost();
			
		},
		methods: {
			orgChoosed(value){
				if (value > 0){
					this.$http.get('/list/post/findPost', {
						params: {
							token: localStorage.CRM_token,
							postid : value,
					}}
				).then(function(res){
					if (res.body.data != null){
						var strs = {
								value:'',
								label:''
							};
							strs.label=res.body.data.postname;
							strs.value=res.body.data.postid;
							this.posts.push(strs);
					}else{
						this.employee_detail.postid = 0;
					}
					})		
				}
			},
			roleChoosed(value){
				this.$http.post('/list/role/list', {"token": localStorage.CRM_token,}, {emulateJSON: true}).then(function (res) {
          		var json = res.body.data;
          		//加载json对象，如果是json字符串要eval()转成json对象
          		this.rolelist = json;
          		console.log(this.rolelist,"0-0-0-0")
          		for (var i = 0; i < this.rolelist.length; i++){
          			if (this.rolelist[i].roleid == value){
          				this.employee_detail.employeeInfo[14].modelVal = this.rolelist[i].rolename;
          			}
          		}
        	})
			},
			selectChange(value){
				console.log(value,"--------");
				this.pid=value;
			},
			loadPostid(){
				this.$http.get('/list/employee/findPostByEmpid',{
					params:{
						token: localStorage.CRM_token,
						empid: this.$route.query.empid,
					}
				}).then(function(res){
					if(res.body.code==100 && res.body.data != null){
						if(res.body.data.postid==null){
							this.pid = '';
						}else{
							this.pid = res.body.data.postid;
						}
					}
				})
			},
			loadOrgAndPost(){
				this.$http.get('/list/organize/findAllOrgByempid',{
					params:{
						token: localStorage.CRM_token,
						empid: this.$route.query.empid,
					}
				}).then(function(res){
					if(res.body.code==100 && res.body.data != null){
						this.selectedOptions3 = res.body.data;
						this.oid = this.selectedOptions3[this.selectedOptions3.length-1]
					}
					this.$http.get('/list/post/findPostByOrgid',{
							params:{
								token: localStorage.CRM_token,
								orgid: this.oid
							}
						}).then(function(res){
							if(res.body.code==100 && res.body.data != null){
								var data3 = res.body.data;
								/*this.options.push({value:'',label:(this.oname+'成员')});*/
								for (var i = 0; i < data3.length; i++) {
									var strs = {
										value:'',
										label:''
									};
									strs.label=data3[i].postname;
									strs.value=data3[i].postid;
									this.posts.push(strs);
								}
							}
						}),
					this.employee_detail.postid = this.pid;
				})
				
			},
			
			//初始化部门
			cascadervalue(){
				this.$http.get('/list/organize/findAllChildrenByorgid',{
					params:{
						token: localStorage.CRM_token,
						orgid: 1
					}
				}).then(function(res){
					if(res.body.code==100 && res.body.data != null){
						this.deps = res.body.data;
					}
				})
			},
			//点击级联触发事件
			handleChange(value){
				this.oid=value[value.length-1];
				//posts赋值
				this.employee_detail.postid='';
				this.posts = [];
				this.$http.get('/list/post/findPostByOrgid',{
						params:{
							token: localStorage.CRM_token,
							orgid: this.oid
						}
					}).then(function(res){
						if(res.body.code==100 && res.body.data != null){
							var data3 = res.body.data;
							/*this.options.push({value:'',label:(this.oname+'成员')});*/
							for (var i = 0; i < data3.length; i++) {
								var strs = {
									value:'',
									label:''
								};
								strs.label=data3[i].postname;
								strs.value=data3[i].postid;
								this.posts.push(strs);
							}
						}
					})
					        
			},
			//加载列表数据
			loadData(){
				console.log(this.$route.query.empid)
				this.$http.get('/list/employee/detail', {
					params: {
						token: localStorage.CRM_token,
						userId : this.$route.query.empid,
					}}
				).then(function(res){
					console.log(res);
	         		this.employee_detail.employeeInfo[0].modelVal = res.body.data.empname;
	         		this.employee_detail.employeeInfo[1].modelVal = res.body.data.empphone;
	         		this.employee_detail.employeeInfo[2].modelVal = res.body.data.empidcard;
	         		this.employee_detail.employeeInfo[3].modelVal = res.body.data.birthday;
	         		this.employee_detail.employeeInfo[4].modelVal = res.body.data.empweixin;
	         		this.employee_detail.employeeInfo[5].modelVal = res.body.data.empqq;
	         		this.employee_detail.employeeInfo[6].modelVal = res.body.data.empemail;
	         		this.employee_detail.employeeInfo[7].modelVal = res.body.data.entrydate;
	         		this.employee_detail.employeeInfo[8].modelVal = res.body.data.duty;
	         		this.employee_detail.employeeInfo[9].modelVal = res.body.data.address;
	         		this.employee_detail.employeeInfo[10].modelVal = res.body.data.nativeplace;
	         		this.employee_detail.employeeInfo[11].modelVal = this.convertToString(res.body.data.empstatus);
	         		this.employee_detail.employeeInfo[12].modelVal = res.body.data.urgentcont;
	         		this.employee_detail.employeeInfo[13].modelVal = res.body.data.urgentcontphone;
	         		this.employee_detail.employeeInfo.empremark = res.body.data.empremark;

					this.roleChoosed(res.body.data.rolevalue);
					this.orgChoosed(res.body.data.postid);
				})
		},
		//数字转员工状态
		convertToString(num){
			if (num == 1){
				return '在岗'
			} else if (num == 2){
				return '离职'
			} else if (num == 3){
				return '出差'
			} else {
				return '请假'
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
        if (newVal[3].childList[0].map.detailFun == 0) {
          this.$router.push({path: "/login"})
        }
      }
	},
	watch: {
		'employee_detail.postid' (newVal, oldVal) {
			if(newVal == 0){
				this.employee_detail.postid = null
			}
		}
	}
}
</script>

<style lang="less" scoped="scoped">
	.table_list{
		padding-top: 30px;
		background: white;
		border: 1px solid #CCCCCC;
		border-radius: 5px;
		b{
			display: inline-block;
			margin-left: 50px;
		}
	}
</style>
