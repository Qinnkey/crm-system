<template>
	<div class="organize_add">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="organize_info">
				<el-form :model="organizeForm" :rules="rules" ref="organizeForm" label-width="100px" class="demo-ruleForm">
					<el-row>
						<el-col :span="24">
							<el-form-item label-width="100px">
								<el-button type="primary" icon="plus" @click="dialogFormVisibleAdd(1)">添加部门</el-button>
								<el-dialog title="添加部门" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
									<el-form :model="addform">
										<el-form-item label="父级部门：" :label-width="formLabelWidth">
											<el-input type="text" v-model="addform.fatherOrganize" :disabled="true"></el-input>
										</el-form-item>
										<el-form-item label="部门名称：" :label-width="formLabelWidth">
											<el-input type="text" v-model="addform.organizeName"></el-input>
										</el-form-item>
									</el-form>
									<div slot="footer" class="dialog-footer">
										<el-button @click="dialogFormVisibleAdd(0)">取 消</el-button>
										<el-button type="primary" @click="dialogFormVisibleAdd(2)">确 定</el-button>
									</div>
								</el-dialog>

								<el-button type="primary" icon="edit" @click="dialogFormVisibleEdit(1)">修改部门</el-button>
								<el-dialog title="修改部门" :visible.sync="dialogFormVisible1" :modal-append-to-body="false">
									<el-form :model="editform">
										<el-form-item label="部门名称：" :label-width="formLabelWidth">
											<el-input type="text" v-model="editform.organizeName"></el-input>
										</el-form-item>
									</el-form>
									<div slot="footer" class="dialog-footer">
										<el-button @click="dialogFormVisibleEdit(0)">取 消</el-button>
										<el-button type="primary" @click="dialogFormVisibleEdit(2)">确 定</el-button>
									</div>
								</el-dialog>

								<el-button type="primary" icon="delete" @click="dialogFormVisibledelete(1)">删除部门</el-button>
								<el-dialog title="删除部门提示" :visible.sync="dialogFormVisible2" size="tiny" :modal-append-to-body="false">
									<span>您是否确定要删除该部门 ( 会删除下属的所有的部门和对应的岗位  ) ？</span>
									<span slot="footer" class="dialog-footer">
									    <el-button @click="dialogFormVisibledelete(0)">取 消</el-button>
									    <el-button type="primary" @click="dialogFormVisibledelete(2)">确 定</el-button>
									  </span>
								</el-dialog>
								
								<el-button type="warning" icon="plus" @click="addPost(1)">添加岗位</el-button>
								<el-dialog title="添加岗位" :visible.sync="dialogAddPost" :modal-append-to-body="false">
									<el-form :model="addPostForm">
										<el-form-item label="部门名称：" :label-width="formLabelWidth">
											<el-input type="text" v-model="addPostForm.organizeName" :disabled="true"></el-input>
										</el-form-item>
										<el-form-item label="岗位名称：" :label-width="formLabelWidth">
											<el-input type="text" v-model="addPostForm.postname"></el-input>
										</el-form-item>
									</el-form>
									<div slot="footer" class="dialog-footer">
										<el-button @click="addPost(0)">取 消</el-button>
										<el-button type="primary" @click="addPost(2)">确 定</el-button>
									</div>
								</el-dialog>
								
								<el-button type="warning" icon="edit" @click="editPost(1)">修改岗位</el-button>
								<el-dialog title="修改岗位" :visible.sync="dialogEditPost" :modal-append-to-body="false">
									<el-form :model="editPostForm">
										<el-form-item label="岗位名称：" :label-width="formLabelWidth">
											<el-input type="text" v-model="editPostForm.postname"></el-input>
										</el-form-item>
									</el-form>
									<div slot="footer" class="dialog-footer">
										<el-button @click="editPost(0)">取 消</el-button>
										<el-button type="primary" @click="editPost(2)">确 定</el-button>
									</div>
								</el-dialog>
								
								<el-button type="warning" icon="delete" @click="deletePost(1)">删除岗位</el-button>
								<el-dialog title="删除部门提示" :visible.sync="dialogDeletePost" size="tiny" :modal-append-to-body="false">
									<span>您是否确定要删除该岗位 ？</span>
									<span slot="footer" class="dialog-footer">
									    <el-button @click="deletePost(0)">取 消</el-button>
									    <el-button type="primary" @click="deletePost(2)">确 定</el-button>
									  </span>
								</el-dialog>
							</el-form-item>
						</el-col>
						<el-col id="app">
							<el-tree :data="regions" :default-expand-all=false  :highlight-current=true :props="props" :load="loadNode" :ref="tree" node-key="id" lazy="" @node-click="handleNodeClick">
								<!--<el-tree :data="data2" :props="defaultProps" show-checkbox="" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">-->
							</el-tree>
						</el-col>
					</el-row>
				</el-form>

			</div>

		</main_component>

	</div>

</template>

<script>
	import main_component from '@/components/module/component_main'
	import breadcrumb_component from '@/components/module/component_Breadcrumb'

	export default {
		name: 'organize_add',
		data() {
		
			return {
				regions: [],
				count: 1,
				props: {
					children: 'children',
					label: 'label'
				},
				//弹出框
				dialogFormVisible: false,
				addform: {
					fatherOrganize: '',
					organizeName: ''
				},
				dialogFormVisible1: false,
				editform: {
					organizeName: ''
				},
				dialogFormVisible2: false,
				
				
				dialogAddPost: false,
				addPostForm : {
					organizeName: '',
					postname: ''
				},
				dialogEditPost: false,
				editPostForm: {
					postname:''
				},
				dialogDeletePost: false,
				formLabelWidth: '120px',
					 oid : 0,
					 oname : "",
					 postid : 0,
					 isorg: 9,
					 postOid:0,
					 postname:""
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			
		},
		methods: {
			/*      //权限改变
			      limititem(val) {
			        var newVal = [];
			        for (var i = 0; i < val.length; i++) {
			          for (var j = 0; j < val.length; j++) {
			            if (val[j].menutarget == i + 1) {
			              newVal.push(val[j])
			            }
			          }
			        }
			        if (newVal[4].childList[2].map.addBtn == 0) {
			          this.$router.push({path: "/login"})
			        }
			      }*/
			dialogFormVisibleAdd(type) {
				switch(type) {
					case 0:
						this.dialogFormVisible = false;
						//   		console.log("关闭")
						break;

					case 1:
						if(this.isorg==1){
							if(this.oid != 0) {
								this.addform.fatherOrganize = this.oname;
								this.dialogFormVisible = true;
							} else {
								this.$message({
									message: "请点击选择上级部门",
									type: "warning"
								});
							}
						}else{
							this.$message({
									message: "请点击选择上级部门",
									type: "warning"
								});
						}
							
						//   		console.log("添加")
						break;

					case 2:
						this.$http.post('/list/organize/save', {
							'token': localStorage.CRM_token,
							'orgid': this.oid,
							'dep': this.addform.organizeName
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body.code == 100) {
								this.$message('添加成功', 'success')
								this.$router.go(0)
							} else {
								this.$message('添加失败', 'error')
							}
						})
						this.dialogFormVisible = false;
						//   		console.log("确定")
						break;

					default:
						this.dialogFormVisible = false;
						//   		console.log(其他")
						break;
				}
			},

			dialogFormVisibleEdit(type) {

				switch(type) {
					case 0:
						this.dialogFormVisible1 = false;
						//   		console.log("关闭")
						break;

					case 1:
						if(this.isorg==1){
							if(this.oid != 0) {
								this.editform.organizeName = this.oname;
								this.dialogFormVisible1 = true;
							} else {
								this.$message({
									message: "请点击选择要修改的部门",
									type: "warning"
								});
							}
						}else{
							this.$message({
									message: "请点击选择要修改的部门",
									type: "warning"
								});
						}
							
						//   		console.log("添加")
						break;

					case 2:
						this.$http.get('/list/organize/edit', {
							params: {
								token: localStorage.CRM_token,
								orgid: this.oid,
								orgname: this.editform.organizeName
							}
						}).then(function(res) {
							if(res.body.code == 100) {
								this.$message('修改成功', 'success')
								this.$router.go(0)
							} else {
								this.$message('修改失败', 'error')
							}
						})
						this.dialogFormVisible1 = false;
						//   		console.log("确定")
						break;

					default:
						this.dialogFormVisible1 = false;
						//   		console.log(其他")
						break;
				}

			},

			dialogFormVisibledelete(type) {
				switch(type) {
					case 0:
						this.dialogFormVisible2 = false;
						//   		console.log("关闭")
						break;

					case 1:
						if(this.isorg==1){
								if(this.oid != 0) {
								this.addform.fatherOrganize = this.oname;
								this.dialogFormVisible2 = true;
							} else {
								this.$message({
									message: "请点击选择要删除的部门",
									type: "warning"
								});
							}
						}else{
							this.$message({
								message: "请点击选择要删除的部门",
								type: "warning"
							});
						}
						
						//   		console.log("添加")
						break;

					case 2:
						this.$http.get('/list/organize/delete', {
							params: {
								token: localStorage.CRM_token,
								orgid: this.oid
							}
						}).then(function(res) {
							if(res.body.code == 100) {
								this.$message('删除成功', 'success')
								this.$router.go(0)
							} else {
								this.$message('删除失败', 'error')
							}
						})
						this.dialogFormVisible2 = false;
						//   		console.log("确定")
						break;

					default:
						this.dialogFormVisible2 = false;
						//   		console.log(其他")
						break;
				}
			},
			
			
			
			addPost(type) {

				switch(type) {
					case 0:
						this.dialogAddPost = false;
						//   		console.log("关闭")
						break;

					case 1:
					if(this.isorg==1){
						if(this.oid != 0) {
							this.addPostForm.organizeName = this.oname;
							this.dialogAddPost = true;
						} else {
							this.$message({
								message: "请点击选择部门 添加岗位",
								type: "warning"
							});
						}
					}else{
						this.$message({
								message: "请点击选择部门 添加岗位",
								type: "warning"
							});
					}
						
						//   		console.log("添加")
						break;

					case 2:
						if(this.addPostForm.postname){
							this.$http.post('/list/post/save', {
									'token': localStorage.CRM_token,
									'organizeid': this.oid,
									'postname': this.addPostForm.postname
							}, {
								emulateJSON: true
							}).then(function(res) {
								if(res.body.code == 100) {
									this.$message('添加岗位成功', 'success')
									this.$router.go(0)
								} else {
									this.$message('添加岗位失败', 'error')
								}
							})
							this.dialogAddPost = false;
						}else{
							this.$message({
										 	message: "岗位不能为空",
											type: "error"
								});
							this.dialogAddPost = true;
						}
							
							//   		console.log("确定")
						break;

					default:
						this.dialogAddPost = false;
						//   		console.log(其他")
						break;
				}

			},
				
			editPost(type){
				switch(type) {
					case 0:
						this.dialogEditPost = false;
						//   		console.log("关闭")
						break;

					case 1:
					if(this.isorg==0){
						if(this.oid != 0) {
							this.editPostForm.postname = this.postname.substr(1);
							this.dialogEditPost = true;
						} else {
							this.$message({
								message: "请点击选择要修改的岗位",
								type: "warning"
							});
						}
					}else{
						this.$message({
								message: "请点击选择要修改的岗位",
								type: "warning"
							});
					}
						
						//   		console.log("添加")
						break;

					case 2:
						if(this.editPostForm.postname){
							this.$http.post('/list/post/update', {
									'token': localStorage.CRM_token,
									'postid': this.postid,
									'organizeid': this.postOid,
									'postname': this.editPostForm.postname
							}, {
								emulateJSON: true
							}).then(function(res) {
								if(res.body.code == 100) {
									this.$router.go(0)
								} else {
									this.$message({
										 	message: "修改岗位失败",
											type: "error"
										});
								}
							})
						}else{
							this.$message({
										 	message: "岗位不能为空",
											type: "error"
								});
							this.dialogEditPost = true;
						}
						
						//this.dialogEditPost = false;
						//   		console.log("确定")
						break;

					default:
						this.dialogEditPost = false;
						//   		console.log(其他")
						break;
				}
			},
			
			deletePost(type){
					
					switch(type) {
						case 0:
							this.dialogDeletePost = false;
							//   		console.log("关闭")
							break;
	
						case 1:
						if(this.isorg==0){
							if(this.oid != 0) {
								this.dialogDeletePost = true;
							} else {
								this.$message({
									message: "请点击选择要删除的岗位",
									type: "warning"
								});
							}
						}else{
							this.$message({
									message: "请点击选择要删除的岗位",
									type: "warning"
								});
						}
							
							//   		console.log("添加")
							break;
	
						case 2:
							this.$http.get('/list/post/delete', {
								params:{
									token: localStorage.CRM_token,
									postid: this.postid
								}
							}).then(function(res) {
								if(res.body.code == 100) {
									this.$router.go(0)
								} else {
									this.$message({
										 	message: "删除岗位失败",
											type: "error"
										});
								}
							})
							//this.dialogEditPost = false;
							//   		console.log("确定")
							break;
	
						default:
							this.dialogDeletePost = false;
							//   		console.log(其他")
							break;
					}
			
			},
			
			//点击树节点的选中事件
			handleNodeClick(data, node, VueComponent) {
				if(data.pid){
					this.isorg   = 0;
					this.postid = data.pid;
					this.postname = data.label;
					this.postOid = data.id;
				}else{
					this.oid = data.id;
					this.oname = data.label;
					this.isorg   = 1;
				}
				
			},
			//点击树加载
			loadNode(node, resolve) {
				var data1 = [];
				var orgid;
				if(node.data.length == 0) {
					this.$http.get('/list/organize/getMaxFather', {
						params: {
							token: localStorage.CRM_token,
							orgid: 1
						}
					}).then(function(res) {
						if(res.body.code == 100 && res.body.data != null) {
							var data3 = res.body.data;
							var str = {
								name: '',
								label: '',
								id: ''
							};
							str.name = data3.departname;
							str.label = data3.departname;
							str.id = data3.orgid;
							data1.push(str);
							return resolve(data1);
						}
					});
				} else {
					orgid = node.data.id;
				}if(node.data.pid){
					return resolve([]);
				}else{
					this.$http.get('/list/organize/findOrgChildrenByOrgid', {
					params: {
						token: localStorage.CRM_token,
						orgid: orgid
					}
				}).then(function(res) {
					if(res.body.code == 100 && res.body.data != null) {
						var data3 = res.body.data;
						for(var i = 0; i < data3.length; i++) {
							//console.log(data3[i].postname,"----");
							if(data3[i].postname){
								var str = {
									name: '',
									label: '',
									id:'',
									pid: '',
									disabled: true
								};
								str.name = data3[i].postname;
								str.label = '# '+data3[i].postname;
								str.id = data3[i].organizeid;
								str.pid = data3[i].postid;
								data1.push(str);
							}else{
								var str = {
								name: '',
								label: '',
								id: ''
								};
							str.name = data3[i].departname;
							str.label = data3[i].departname;
							str.id = data3[i].orgid;
							data1.push(str);
							}
						
						}
						return resolve(data1);
					}
				});
				}
				

			}
		},
	}
</script>

<style scoped="scoped">
	.organize_info {
		background: white;
		padding-top: 30px;
		padding-bottom: 30px;
		padding-left: 30px;
		border: 1px solid #CCCCCC;
		border-radius: 5px;
	}
</style>