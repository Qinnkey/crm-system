<template>
	<div class="add_itemDevelop">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写员工信息-->
			<div class="table_list">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="160px" class="demo-ruleForm">
					<el-row>           			
            			<el-col :span="9">
		            		<el-form-item label="项目名称： " prop = "itemname">
		              				<el-autocomplete style="width: 100%;" class="inline-input" v-model="ruleForm1.itemname" :fetch-suggestions="querySearch"
		                               placeholder="请选择项目名称" @select="handleSelect"></el-autocomplete>
		            		</el-form-item>
            			</el-col>
            			<el-col :span="9">
							<el-form-item label="负责人：">
									<el-input type="text" v-model="ruleForm1.responsible" :disabled="true" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
            			<el-col :span="9">
							<el-form-item label="开发时间起：" prop = "devdatebegin">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.devdatebegin"  style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="开发时间止：" prop = "devdateend">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.devdateend" style="width: 100%;" ></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="开发状态：">
								<el-select v-model="ruleForm1.devstatus" placeholder="请选择">
									<el-option v-for="item in devstatus_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="交付状态：">
								<el-select v-model="ruleForm1.delystatus" placeholder="请选择">
									<el-option v-for="item in delystatus_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="创建时间：">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.createdate" style="width: 100%;" :picker-options="pickerOptions"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="制作需求：">
								<span v-for="(item,index) in ruleForm1.itemrequire">
									<el-input :disabled="true" type="textarea" :rows='5' v-model="ruleForm1.itemrequire[index]"></el-input>
									<p>&nbsp;</p>
								</span>
							</el-form-item>
						</el-col>
						<!--<el-col :span="18">
              				<el-form-item label="制作文档：" label-width="150px">
                				<el-upload class="upload-demo" :disabled="true" :on-success="handlesuccess1" :before-upload="beforeAvatarUpload1"
                           				action="/list/accident/uploaddoc" :file-list="files" :data="token"
                           				:on-preview="handlePreview" :on-remove="handleRemove1">
                  						<el-button size="small" type="primary">点击上传</el-button> &nbsp; &nbsp;
                  					<i slot="tip" class="el-upload__tip">上传pdf,doc,docx,txt文件</i>
                				</el-upload>
              				</el-form-item>
            			</el-col>-->
            			<el-col :span="18">
							<el-form-item label="需求文档：" label-width="160px">
								<el-upload class="upload-demo" :disabled="true" action="/list/accident/uploaddoc"  
									:on-preview="handlePreview" :file-list="this.ruleForm1.zips" >
								<!--&nbsp;
									<i slot="tip" class="el-upload__tip">需求文档</i>-->
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
		name: "add_itemDevelop",
		data() {
			var checkDate = (rule, value, callback) => {
				if(value == null || value == '') {
					callback(new Error("开始时间不能为空"))
				} else {
						callback()
				}

			};

			var checkDate1 = (rule, value, callback) => {
				if(value == null || value == '') {
					callback(new Error("结束时间不能为空"))
				}else if (value < this.ruleForm1.devdatebegin) {
          			callback(new Error('结束时间不能小于开始时间'));
        		}else {
					callback()
				}

			};
			return {
				restaurants: [],         //项目名称
				files:[],
				isItemBinded:false,    
				token: null,
				itemid: null,             // 项目id
				//创建时间选择限定
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				devstatus_options: [
					{label: '前期', value: '1'},
					{label: '开发中', value: '2'},
					{label: '逾期', value: '3'},
					{label: '完成', value: '4'}
				],								            //项目开发状态选项
				delystatus_options: [
					{label: '正常交付', value: '1'},
					{label: '逾期交付', value: '2'}
				],								            //项目结束状态选项
				ruleForm1: {
					responsible : '',				  //责任人
					itemname : '',				  //项目名称
					itemrequire : [''],				   //制作需求
					devstatus:'',                   // 开发状态
					delystatus:'',                  // 交付状态
					devdatebegin:'',            // 开发时间起
					devdateend:'',               // 开发时间止
					createdate:'',                 // 创建时间
					zips: [],                           // 上传文档
				},
				rules: {
			        itemname: [
			          {required: true, message: '请选择项目名称', trigger: 'change'}
			        ],
			        devdatebegin: [{
						required: true,
						validator: checkDate,
						trigger: 'change'
					}],
					devdateend: [{
						required: true,
						validator: checkDate1,
						trigger: 'change'
					}]
				},						
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.ruleForm1.responsible = localStorage.CRM_petname;
			this.token = {"token": localStorage.CRM_token};
			//项目名称列表
			this.itemList();
		},
		methods: {
			// 加载文档和需求
			itemData(){
				this.$http.get("/list/itemDevelop/itemDocs",{
					params: {
						token: localStorage.CRM_token,
						itemid: this.itemid
					}
				}).then(function (res) {
	          		//加载json对象
	          		var json = res.body.data;
	          		if (res.body.code == 100 && json.itemrequire.length > 0){
	          			this.$set(this.ruleForm1.itemrequire, 0, json.itemrequire[0])
//	          			this.ruleForm1.itemrequire[0] = "aaa"
//	          			that.ruleForm1.itemrequire[1] = "000"
//	          			this.ruleForm1.itemrequire.splice(0,1,"ddd");
//	          			console.log(that.ruleForm1.itemrequire[0])
	          			for (var i = 1; i < json.itemrequire.length; i++){
	          				this.ruleForm1.itemrequire.push(json.itemrequire[i]);
	          			}
	          		}
	          		if (res.body.code == 100 && json.file.length > 0){
	          			this.ruleForm1.zips = [];
						let tmpZips = new Array();
						json.file.forEach(function(o) {
							var a = o.split("/");
							tmpZips.push({
								name: a[a.length - 1],
								url: o + "?token=" + localStorage.CRM_token
							})
						});
						this.ruleForm1.zips = tmpZips;
	          		}
				})
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
          		this.itemData();
      		},
			//页面数据实时更改
			reload: function(text){
				if (text == 1){
					this.loadData(this.currentPage)
				}
			},
			//表单1提交
			submitForm1(formName) {
					this.$refs[formName].validate((valid) => {
						if(valid) {
							this.$http.post('/list/itemDevelop/save',{
								token: localStorage.CRM_token,
								itemname: this.ruleForm1.itemname,
								itemid:this.itemid,
								devstatus: this.ruleForm1.devstatus,
								delystatus: this.ruleForm1.delystatus,
								createdate: this.ruleForm1.createdate?this.changeTime(this.ruleForm1.createdate):'',
								devdatebegin: this.ruleForm1.devdatebegin?this.changeTime(this.ruleForm1.devdatebegin):'',
								devdateend: this.ruleForm1.devdateend?this.changeTime(this.ruleForm1.devdateend):'',
							},{emulateJSON: true}).then(function(res){
								console.log(res)
								if(res.body.code='100'){
									this.$router.push({path: "/item_develop_list"});
									this.$emit('reload', 1);
								}
								})
						} else {
							console.log('error submit!!');
							return false;
						}
				});		
			},
			//重置表单
			resetForm(formName) {
				this.ruleForm1.devstatus = '';
				this.ruleForm1.delystatus = '';
				this.ruleForm1.createdate = '';
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
      		//用于对应的下载。
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
		        if (newVal[3].childList[5].map.addBtn == 0) {
		          this.$router.push({path: "/login"})
		        }
		      },
		},
		    watch: {
				'ruleForm1.itemname' (newVal, oldVal) {
					if(!this.isItemBinded) {				
						this.itemid = null;	
						this.ruleForm1.zips = [];
						this.ruleForm1.itemrequire = [''];
					} else {
						this.isItemBinded = false;
					}
				},
			}
	}
</script>
<style type="text/css">
	.add_itemDevelop .table_list .el-upload-list__item .el-icon-close{display: none;} 
	.add_itemDevelop .table_list .el-form-item__content .upload-demo .el-upload{display: none;}
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
