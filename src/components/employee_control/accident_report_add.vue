<template>
	<div class="add_accident">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写员工信息-->
			<div class="table_list">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="160px" class="demo-ruleForm">
					<el-row>           			
            			<el-col :span="9">
		            		<el-form-item label="项目名称: " prop = "itemname">
		              				<el-autocomplete style="width: 100%;" class="inline-input" v-model="ruleForm1.itemname" :fetch-suggestions="querySearch"
		                               placeholder="请选择项目名称" @select="handleSelect"></el-autocomplete>
		            		</el-form-item>
            			</el-col>            			
						<el-col :span="9">
							<el-form-item label="责任人：" prop="responsible">
								<el-autocomplete style="width: 100%;" class="inline-input" v-model="ruleForm1.responsible" :fetch-suggestions="querySearch1"
		                               placeholder="请选择责任人名字" @select="handleSelect1"></el-autocomplete>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="小组负责人：" prop="groupresponsible">
								<el-autocomplete style="width: 100%;" class="inline-input" v-model="ruleForm1.groupresponsible" :fetch-suggestions="querySearch2"
		                               placeholder="请选择小组负责人名字" @select="handleSelect2"></el-autocomplete>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="是否首次：">
								<el-select v-model="ruleForm1.status" placeholder="请选择">
									<el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="小组负责人关联部门："prop="department">
								<el-cascader :change-on-select=true :options="deps" v-model="selectedOptions3" @change="handleChange"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="发生时间：">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.time" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
							</el-form-item>
						</el-col>	
						<el-col :span="18">
							<el-form-item label="事故描述：">
								<el-input type="textarea" :rows='5' v-model="ruleForm1.description"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="事故起因：">
								<el-input type="textarea" :rows='5' v-model="ruleForm1.cause"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="解决方案：">
								<el-input type="textarea" :rows='5' v-model="ruleForm1.solution"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="18">
              				<el-form-item label="文档：" label-width="150px">
                				<el-upload class="upload-demo" :on-success="handlesuccess1" :before-upload="beforeAvatarUpload1"
                           				action="/list/accident/uploaddoc" :file-list="files" :data="token"
                           				:on-preview="handlePreview" :on-remove="handleRemove1">
                  						<el-button size="small" type="primary">点击上传</el-button> &nbsp; &nbsp;
                  					<i slot="tip" class="el-upload__tip">上传pdf,doc,docx,txt文件</i>
                				</el-upload>
              				</el-form-item>
            			</el-col>
						<el-col :span="24">
							<el-form-item label-width="160px">
								<el-button type="success" @click="submitForm1('ruleForm1')">提交</el-button>
								<el-button @click="resetForm('ruleForm1')">取消</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
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
		name: "add_accident",
		data() {
			return {
				deps:[],                    // 部门
				posts:[],
				restaurants: [],         //项目名称
				responsibles:[],        //责任人列表
				groupres:[],             //小组负责人列表
				selectedOptions3:[], // 部门选择
				files:[],
				isResBinded:false, 
				isGroupBinded:false,
				isItemBinded:false,    
				token: null,
				itemid: null,             // 项目id
				responsibleid:null,   // 责任人id
				resorgid:null,          // 责任/负责人部门id
				groupresid: null,      // 小组负责人id
//				grouporgid:null,      // 小组负责人部门id
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
				ruleForm1: {
					responsible : '',				  //责任人
					itemname : '',				  //项目名称
					description : '',				   //事故描述
					cause : '',			                 //事故起因
					status : '',				             //是否首次
					solution : '',                       //解决方案
					groupresponsible : '',		//小组负责人
					time: '',				                  //时间
					department : '',                      //部门ID
					zips: [],                           // 上传文档
					postid : '',                        //
				},
				rules: {
					/*responsible: [
						{required: true, message: '请选择责任人名字', trigger: 'change' }
					],*/
					groupresponsible: [
						{required: true, message: '请选择小组负责人名字', trigger: 'change' }
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
			//初始化部门树
			this.cascadervalue();	
			//项目名称列表
			this.itemList();
			//责任人列表
			this.responsibleList();
			//小组负责人列表
			this.groupResList();
			//输入数据格式校验
			this.checkedData();
		},
		methods: {
			checkedData(){
				var ll = this.ruleForm1.responsible.indexOf('(');
				if (ll != -1 ){
					var index = this.ruleForm1.responsible.indexOf('(');
					var subStr = this.ruleForm1.responsible.substr(0, index);
					this.ruleForm1.responsible = subStr;
				} 
				var rr = this.ruleForm1.groupresponsible.indexOf('(');
				if (rr != -1 ){
					var index = this.ruleForm1.groupresponsible.indexOf('(');
					var subStr = this.ruleForm1.groupresponsible.substr(0, index);
					this.ruleForm1.groupresponsible = subStr;
				}
			},
			createFilter(queryString) {
      			return (restaurant) => {
      				return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      			};
      		},
			//项目名称列表
			itemList(){
				this.$http.get("/list/customer/findAllItems").then(function (res) {
          		//加载json对象
          		if(res.body.code==100 && res.body.data != null){
          			this.restaurants = res.body.data;
          		}
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
          		this.itemid = item.itemid;
          		this.isItemBinded = true;
      		},
      		//责任人列表
			responsibleList(){
				this.$http.get('/list/user/findResponsible',{
					params:{
						token: localStorage.CRM_token,
						leader: '',
					}
				}).then(function(res){
					if(res.body.code==100 && res.body.data != null){
						this.responsibles = res.body.data;
					}
				})
			},
      		//责任人列表查询
      		querySearch1(queryString, cb) {
      			var restaurants = this.responsibles;
        		var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        		// 调用 callback 返回建议列表的数据
        		cb(results);
      		},
      		handleSelect1(item) {
      			this.isResBinded = true,
          		this.ruleForm1.responsible= item.value,
          		this.responsibleid = item.responsibleid,
          		this.resorgid = item.resorgid,
          		this.$http.get('/list/organize/findAllOrg',{
						params:{
							token: localStorage.CRM_token,
							orgid: this.resorgid,
						}
					}).then(function(res){
						if(res.body.code==100 && res.body.data != null){
							this.selectedOptions3 = res.body.data;
							this.oid = this.selectedOptions3[this.selectedOptions3.length-1];
						}
					})	
      		},
      		
      		//小组负责人列表
			groupResList(){
				this.$http.get('/list/user/findResponsible',{
					params:{
						token: localStorage.CRM_token,
						leader: 1,
					}
				}).then(function(res){
					if(res.body.code==100 && res.body.data != null){
						this.groupres = res.body.data;
					}
				})
			},
      		//小组责任人列表查询
      		querySearch2(queryString, cb) {
      			var restaurants = this.groupres;
        		var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        		// 调用 callback 返回建议列表的数据
        		cb(results);
      		},
      		handleSelect2(item) {
          		this.ruleForm1.groupresponsible= item.value;
          		this.groupresid = item.groupresid;
          		this.isGroupBinded = true;
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
							this.checkedData();
							this.$http.post('/list/accident/save',{
								token: localStorage.CRM_token,
								itemname: this.ruleForm1.itemname,
								itemid:this.itemid,
								responsible: this.ruleForm1.responsible,
								responsibleid:this.responsibleid,
								groupresid:this.groupresid,
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
        		if (fileext == '.pdf' || fileext == '.doc' || fileext == '.docx' || fileext == '.txt') {
          			isZip = true;
       	 		}
        		const isLt10M=file.size / 1024 / 1024 < 10;
		        if (!isZip) {
		          this.$message.error('只能上传pdf,doc,docx,txt 格式!');
		        }
		        if (!isLt10M) {
		          this.$message.error('上传压缩文件大小不能超过 10MB!');
		        }
        		return isZip && isLt10M;
      		},
      		//用于对应的下载，在添加界面不使用。
      		handlePreview(file) {
        		console.log(file)
      		},
      		//用于添加页面的删除 ，为
      		handleRemove1(file) {
        		console.log(file)
        		if (file.response.data != null && file != null) {
			        var docname = file.response.data.docname;
			        var url = file.response.data.docurl;
			        //同时删除ruleForm1.itemdocUrl中的数据
			        this.deleteData(this.ruleForm1.zips, url)
			        //删除服务器中的图片
          			this.$http.get("/list/accident/delfile", {
            			params: {
             				token: localStorage.CRM_token,
              				docName: url
      					}
          			}).then(function (res) {
            		console.log(this.ruleForm1.zips)
          			})
        		}
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
        		this.ruleForm1.imgs=imageUrls;
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
		},
		    watch: {
				'ruleForm1.itemname' (newVal, oldVal) {
					if(!this.isItemBinded) {				
						this.itemid = null;	
					} else {
						this.isItemBinded = false;	
					}
				},
				'ruleForm1.responsible' (newVal, oldVal) {
					if(!this.isResBinded) {				
						this.responsibleid = null;	
					} else{
						this.isResBinded = false;	
					}
				},
				'ruleForm1.groupresponsible' (newVal, oldVal) {
					if(!this.isGroupBinded) {				
						this.groupresid = null;	
					} else {
						this.isGroupBinded = false;	
					}
				}
			}
	}
</script>

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
