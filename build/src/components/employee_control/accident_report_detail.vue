<template>
	<div class="detail_accident">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写员工信息-->
			<div class="table_list">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="160px" class="demo-ruleForm">
					<el-row>        			
            			<el-col :span="9">
		            		<el-form-item label="项目名称: " prop = "itemname">
		              				<el-autocomplete style="width: 100%;" :disabled="true" class="inline-input" v-model="ruleForm1.itemname" :fetch-suggestions="querySearch"
		                               placeholder="请输入项目名称" @select="handleSelect"></el-autocomplete>
		            		</el-form-item>
            			</el-col>
						<el-col :span="9">
							<el-form-item label="责任人：" prop="responsible">
								<el-input :disabled="true" type="text" v-model="ruleForm1.responsible" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="小组负责人：" prop="groupresponsible">
								<el-input :disabled="true" type="text" v-model="ruleForm1.groupresponsible" ></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="发生时间：">
								<el-date-picker :disabled="true" type="date" placeholder="选择日期" v-model="ruleForm1.time" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
							</el-form-item>
						</el-col>	
						<el-col :span="9">
							<el-form-item label="是否解决：">
								<el-select :disabled="true" v-model="ruleForm1.solve" placeholder="请选择">
									<el-option v-for="item in solve_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="是否首次：">
								<el-select :disabled="true" v-model="ruleForm1.status" placeholder="请选择">
									<el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="小组负责人关联部门："prop="department">
								<el-cascader :disabled="true" :change-on-select=true :options="deps" v-model="selectedOptions3" @change="handleChange"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="事故描述：">
								<el-input :disabled="true" type="textarea" :rows='5' v-model="ruleForm1.description"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="事故起因：">
								<el-input :disabled="true" type="textarea" :rows='5' v-model="ruleForm1.cause"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="解决方案：">
								<el-input :disabled="true" type="textarea" :rows='5' v-model="ruleForm1.solution"></el-input>
							</el-form-item>
						</el-col>
						
						<el-col :span="18">
							<el-form-item label-width="140px">
								<el-upload class="upload-demo" :disabled="true" action="/list/accident/uploaddoc"  
									:on-preview="handlePreview" :file-list="this.ruleForm1.zips" >
								&nbsp;
									<i slot="tip" class="el-upload__tip">相关文档</i>
								</el-upload>
							</el-form-item>
						</el-col>	
					</el-row>
				</el-form>
            	<el-row>
					<el-col :span="4":offset="9">
						<router-link to="/accident_list"><el-button style="margin-bottom: 40px;">返回</el-button></router-link>
					</el-col>
				</el-row>		
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
		name: "detail_accident",
		data() {
			return {
				deps:[],                    // 部门
				posts:[],
				restaurants: [],
				selectedOptions3:[],  // 部门选择
				files:[],
				token: null,
				//时间选择限定
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				status_options: [
					{label: '是', value: '0'},
					{label: '否', value: '1'}
				],								            //事故报告状态选项
				solve_options: [
					{label: '是', value: '0'},
					{label: '否', value: '1'}
				],								            //事故解决状态选项
				ruleForm1: {
					responsible : '',				  //责任人
					itemname : '',				  //项目名称
					description : '',				   //事故描述
					cause : '',			                 //事故起因
					status : '',				             //是否首次
					solve: '',                            // 是否解决
					solution : '',                       //解决方案
					groupresponsible : '',				   //小组负责人
					time: '',				                  //时间
					department : '',                      //部门ID
					zips: [],                           // 上传文档
					postid : '',                        //
				},
				rules: {
					responsible: [
						{required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 16, message: '长度在2 到 16 个字符', trigger: 'blur'}
					],
					groupresponsible: [
						{required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 16, message: '长度在2 到 16 个字符', trigger: 'blur'}
					],
			        itemname: [
			          {required: true, message: '请选择项目名称', trigger: 'change'}
			        ],
				},	
			    oid : 0,
				postid : 0,		
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.petname = localStorage.CRM_petname;
			this.token = {"token": localStorage.CRM_token};
			// 加载数据
			this.loadData();
			//初始化部门树
			this.cascadervalue();
			//项目名称列表
			this.itemList();
		},
		methods: {
			//加载数据
			loadData(){
				this.$http.get('/list/accident/list', {
					params: {
						token: localStorage.CRM_token,
						accidentid : this.$route.query.accidentid,
						itemname: '',
                		responsible: '',
                		groupresponsible:'',
					}}
				).then(function(res){
					var json = res.body.data;
					this.ruleForm1.responsible = json.responsible;
					this.ruleForm1.itemname = json.itemname;
					this.ruleForm1.description = json.description;
					this.ruleForm1.cause = json.cause;
					this.ruleForm1.solution = json.solution;
					this.ruleForm1.groupresponsible = json.groupresponsible;
					this.ruleForm1.time = json.time;
					this.ruleForm1.status = json.status == 0? '0':'1';
					this.ruleForm1.solve = json.solve == 0? '0':'1';
					this.oid = json.department;
					
					let tmpZips = new Array();
					if (json.zips.length > 0) {
			            json.zips.forEach(function (o) {
			              var a = o.split("/");
			              tmpZips.push({
			                name: a[a.length - 1],
			                url: o + "?token=" + localStorage.CRM_token
			              })
			            });
			        }
					this.ruleForm1.zips = tmpZips;
					this.$http.get('/list/organize/findAllOrg',{
						params:{
							token: localStorage.CRM_token,
							orgid: this.oid,
						}
					}).then(function(res){
						if(res.body.code==100 && res.body.data != null){
							this.selectedOptions3 = res.body.data;
							this.oid = this.selectedOptions3[this.selectedOptions3.length-1]
						}
					})
				})
			},
			itemList(){
				this.$http.get("/list/customer/findAllItems").then(function (res) {
          		//加载json对象
          		this.restaurants = res.body.data;
				})
			},
			//项目列表查询
      		querySearch(queryString, cb) {
      			var restaurants = this.restaurants;
        		var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        		// 调用 callback 返回建议列表的数据
        		cb(results);
      		},
      		handleSelect(item) {
          		this.ruleForm1.itemname = item.value;
      		},
      		createFilter(queryString) {
      			return (restaurant) => {
      				return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      			};
      		},
			selectChange(value){
				this.postid=value.substr(0,value.indexOf(','));	
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

			//页面数据实时更改
			reload: function(text){
				if (text == 1){
					this.loadData(this.currentPage)
				}
			},
			//表单1提交
			submitForm1(formName) {
			if(this.oid==0){
					this.$message({
							message: "请选择部门",
							type: "warning"
							});
			}else{
					this.$refs[formName].validate((valid) => {
						if(valid) {
							console.log(this.ruleForm1)
							this.$http.post('/list/accident/update',{
								token: localStorage.CRM_token,
								accidentid:this.$route.query.accidentid,
								itemname: this.ruleForm1.itemname,
								responsible: this.ruleForm1.responsible,
								groupresponsible: this.ruleForm1.groupresponsible,
								status: this.ruleForm1.status == ''?'0':this.ruleForm1.status,
								department:this.oid,
								time: this.ruleForm1.time?this.changeTime(this.ruleForm1.time):'',
								description: this.ruleForm1.description,
								cause: this.ruleForm1.cause,
								solution: this.ruleForm1.solution,
								zips: this.ruleForm1.zips,
							},{emulateJSON: true}).then(function(res){
								console.log(res)
								if(res.body.code='100'){
									this.$router.push({path: "/accident_list"});
									this.$emit('reload', 1);
								}
								})
						} else {
							console.log('error submit!!');
							return false;
						}
				});		
				}	
			},
			//重置表单
			resetForm(formName) {
				this.ruleForm1.status = '';
				this.ruleForm1.time = null;
				this.ruleForm1.cause = '';
				this.ruleForm1.description = '';
				this.ruleForm1.solution = '';
				this.$refs[formName].resetFields();
			},
			//时间转换
			changeTime(time){
				if (typeof(time) =="undefined"){
					return null;
				}
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = (newTime.getMonth()+1)>10?(newTime.getMonth()+1):'0'+(newTime.getMonth()+1);
				var dd = newTime.getDate()>10?newTime.getDate():"0"+newTime.getDate();
				return (yy+"-"+mm+"-"+dd)
			},
			
			//点击级联触发事件
			handleChange(value){
				this.oid=value[value.length-1];
				//posts赋值
				this.ruleForm1.postid='';
				this.postid=0;
				this.posts = [];
				// 查询提交人领导
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
								strs.value=data3[i].postid+','+data3[i].organizeid;
								this.posts.push(strs);
							}
						}
					})
			},
			//上传文档成功后的内容
	      	handlesuccess1(response, file, fileList) {
	        	//上传成功将url存放到ruleForm1.itemdocUrl
		        if (response.code == 100 && response.data != null) {
		          	var url = response.data.docurl;
		        	this.ruleForm1.zips.push(url);
		          	console.log("文档上传的地址为:" + this.ruleForm1.zips);
		        }
		        if (response.code == 102) {
		          	this.$message({
		            message: '文件不能为空',
		            type: 'warning'
		          });
		        for (var i = 0; i < fileList.length; i++) {
		            console.log(file.name)
		            console.log(fileList[i].name)
		            if (file.name == fileList[i].name) {
		              	fileList.splice(i);
		            }
		          }
	        	}
	      	},
	      	// 对上传的文件 （压缩包）进行限制
      		beforeAvatarUpload1(file) {
        		var isZip = false;
        		var fileext = file.name.substring(file.name.lastIndexOf("."), file.name.length);
        		console.log(fileext)
        		if (fileext == '.zip' || fileext == '.rar') {
          			isZip = true;
       	 		}
        		const isLt10M=file.size / 1024 / 1024 < 10;
		        if (!isZip) {
		          this.$message.error('只能上传zip,rar 格式!');
		        }
		        if (!isLt10M) {
		          this.$message.error('上传压缩文件大小不能超过 10MB!');
		        }
        		return isZip && isLt10M;
      		},
      		//用于对应的下载，在添加界面不使用。
      		handlePreview(file) {
        		//下载
				var urls = file.url.substr(0,file.url.indexOf('?')).split("/");
				var url=urls[urls.length-2]+"/"+urls[urls.length-1]
				if(file.url != null && file.url != '') {
					this.$http.get("/list/customer/docDonwload/"+url+"?token="+localStorage.CRM_token).then(function(res) {
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
      		//用于添加页面的删除 ，为
      		handleRemove1(file) {
        		console.log(file)
      		},
      		//用于删除数据
      		deleteData(imageUrls, url) {
        		if (imageUrls != null) {
          			for (var i = 0; i < imageUrls.length; i++) {
            			if (imageUrls[i] == url) {
              				imageUrls.splice(i, 1);
            			}
          			}
        		}
        		this.ruleForm1.zips=imageUrls;
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
		        if (newVal[3].childList[4].map.addBtn == 0) {
		          this.$router.push({path: "/login"})
		        }
		      },
		}
	}
</script>
<style type="text/css">
	.detail_accident .table_list .el-upload-list__item .el-icon-close{display: none;}
</style>
<style lang="less" scoped="scoped">
	.table_list{
		padding-top: 30px;
		background: white;
		border-radius: 5px;
		b{
			display: inline-block;
			margin-left: 50px;
		}
	}
	.el-select{
		width: 100%;
	}
	.el-button--success {
		background: #2EB398;
		border-color: #2EB398;
	}
</style>
