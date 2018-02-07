<template>
	<div class="add_salesman">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写用户信息-->
			<div class="user_info">
				<el-form   ref="form" label-width="140px" class="demo-ruleForm">
					<el-row v-for="(item,index) in form" :key="index">
						<el-col :span="9">
							<el-form-item label="帐号类型：" >
								<el-select v-model="form[index].accountypename" placeholder="请选择" @change="change(form[index].accountypename,index)">
									<el-option v-for="item in url" :label="item.accountypename" :value="item.accountypename" :key="item.accountypename"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="密码：" >
								<el-input type="text" v-model="form[index].password" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="帐号：" >
								<el-input type="tel" v-model.number="form[index].username" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="网址：">
								<el-input type="text" v-model.number="form[index].url"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="其他：">
								<el-input type="textarea" v-model="form[index].comments"></el-input>
							</el-form-item>
						</el-col>
						<el-col :offset="1" :span="9">
							<el-button v-if="index>0" type="success" @click="deleteList(index)">删除</el-button>
						</el-col>
					</el-row>
					
					<el-row>
						<el-col :span="23">
							<el-form-item label="勾选对应的项目：">
								<template>
									<el-checkbox-group v-model="itemids" @change="handleCheckedCitiesChange">
										<el-checkbox v-for="item in items" :label="item.itemid" :key="item.itemid">{{item.itemname}}</el-checkbox>
									</el-checkbox-group>
								</template>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label-width="120px">
								<el-button type="success" @click="submitForm1('ruleForm1')">提交</el-button>
								<el-button @click="resetForm('ruleForm1')">取消</el-button>
								<el-button @click="addList">添加</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</main_component>
	</div>
</template>

<script>
	import top_component from '@/components/module/component_top'
	import nav_left_component from '@/components/module/component_left'
	import main_component from '@/components/module/component_main'
	import breadcrumb_component from '@/components/module/component_Breadcrumb'
	export default {
		name: "add_salesman",
		data() {

			return {
				itemids: [],
				items: [],
				url: [],
//				form: {
//					searchType: '',
//					searchTypeValue: '',
//				},
				form:[
					{
						accountypename: '',
						username: '', //帐号
						password: '', //密码
						url: '', //网址
						comments: '', //其他
					}
				],
				all_index : []		,
				active_index : ""	,
//				ruleForm1: {
//					username: '', //帐号
//					password: '', //密码
//					url: '', //网址
//					comments: '', //其他
//
//				},
//				rules: {
//					password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
//					username: [{ required: true, message: '请输入帐号', trigger: 'blur' }]
//				}
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
			loadData() {
				this.findAllUrl();
				this.findItemsByCustid();
			},
			findItemsByCustid() {
				this.$http.get('/list/customer/findItemsByCustid', {
					params: {
						token: localStorage.CRM_token,
						custid: this.$route.query.custid,
					}
				}).then(function(res) {
					console.log(res);
					if(res.body.code == 100) {
						this.items = res.body.data;
					}
				})
			},
			findAllUrl() {
				this.$http.post('/list/url/findAll', {
					"token": localStorage.CRM_token
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 100) {
						this.url = res.body.data;
						this.form[0].accountypename = this.url[0].accountypename;
						this.form[0].url = this.url[0].url;
					}
				})
			},
			handleCheckedCitiesChange(val) {
				this.itemids = val;
			},
			change(val,index) {
				console.log(val,'+-=-=-=-==---==-=-=-')
				for (var i=0;i<this.url.length;i++) {
					if(this.url[i].accountypename==val){
						this.form[index].url=this.url[i].url;
					}
				}
			},
			addList() {
				var that = this;
				let listItem = {
					accountypename: this.url[0].accountypename,
					username: '', //帐号
					password: '', //密码
					url: this.url[0].url, //网址
					comments: '', //其他
				};
				that.form.push(listItem)
			},
			deleteList(index) {
				var that = this;
				console.log(index)
				that.form.splice(index,1)
			},
			//表单1提交
			submitForm1(formName) {
				this.all_index=[];
				var check = true;
				var check1 = true;
				for (var i=0;i<this.form.length;i++) {
						this.all_index.push(this.form[i].accountypename)
					if(this.form[i].username=='' || this.form[i].password==''){
						check = false;
					}
				}
				var nary = this.all_index.sort(); 
				for(var i=0;i<nary.length;i++){ 
					if (nary[i]==nary[i+1]){ 
						check1 = false;
					} 
				} 
				if(check1){
					if(check){
						console.log(this.itemids,'1111111111-------------++++++++++++++++++')
							this.$http.post('/list/itemAccountNumberController/addAccountList', {
									"token": localStorage.CRM_token,
									"requestAccountVos": JSON.stringify(this.form),
									"itemids": this.itemids
	
								}, {
									emulateJSON: true
								}).then(function(res) {
									console.log(res)
									if(res.body.code == 100) {
										//成功提示
										this.message('添加成功', 'success')
										this.$router.push({
											path: "/customer_item",
											query:{custid: this.$route.query.custid, custuserid: this.$route.query.custuserid}
										})
										this.$emit("reload", 1);
									} else if(res.body.code == 106) {
										this.message("添加失败，没有选择项目", 'error')
										this.$refs['ruleForm1'].resetFields();
									}else if(res.body.code == 108) {
										this.message(res.body.msg, 'error')
										this.$refs['ruleForm1'].resetFields();
									}else {
										this.message("添加失败", 'error')
										this.$refs['ruleForm1'].resetFields();
									}
								})
					
					}else{
						this.message("有未填写的账号或密码","error")
					}
				}else{
					this.message("有重复的帐号类型","error")
				}
				
			},
			//重置表单
			resetForm(formName) {
				//this.$refs[formName].resetFields();
				this.$router.push({
					path: "/customer_item",
					query:{custid: this.$route.query.custid, custuserid: this.$route.query.custuserid}
				})
			},
			message(msg, msg_type) {
				this.$message({
					message: msg,
					type: msg_type
				});
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
				if(newVal[9].childList[1].map.addBtn == 0) {
					this.$router.push({
						path: "/login"
					})
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.user_info {
		background: white;
		padding-top: 30px;
		padding-left: 30px;
		border-radius: 5px;
	}
	/*更改按钮颜色*/
	
	.el-button--success {
		background: #2EB398;
		border-color: #2EB398;
	}
	/*更改选择框宽度*/
	
	.el-select {
		width: 100%;
	}
</style>