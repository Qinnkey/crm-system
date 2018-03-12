<template>
	<div class="add_user">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写用户信息-->
			<div class="user_info">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="200px" class="demo-ruleForm">
					<el-row>
						<!--客户信息-->
						<el-col :span="18">
							<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户续费信息：</b> <br/> <br/>
						</el-col>
						<el-col :span="9">
							<el-form-item label="客户姓名：" prop="contact">
								<el-input type="text" :disabled="true" v-model="ruleForm1.contact" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
		
						<el-col :span="9">
							<el-form-item label="企业名称：" prop="companyname">
								<el-input type="text" :disabled= "true" v-model="ruleForm1.companyname"></el-input>
							</el-form-item>
						</el-col>
					
						<el-col :span="9">
							<el-form-item label="项目名称：" prop="itemname">
								<el-input type="text" :disabled= "true"  v-model="ruleForm1.itemname"></el-input>
							</el-form-item>
						</el-col>
						
						<el-col :span="9">
								<el-form-item label="业务员：" >
									<el-input type="text" :disabled= "true"  v-model="ruleForm1.salename"></el-input>
								</el-form-item>
							</el-col>
						<el-col :span="9">
							<el-form-item label="开始时间：" >
								<el-date-picker type="date" :disabled= "true" placeholder="选择日期" v-model="ruleForm1.itembegindate" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						
						<el-col :span="9">
							<el-form-item label="结束时间：">
								<el-date-picker type="date" :disabled= "true" placeholder="选择日期" :editable="false" v-model="ruleForm1.itemenddate" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						
						<el-col :span="9">
							<el-form-item label="售后方式：">
									<el-select v-model="ruleForm1.visitway">
										<el-option label="电话回访" value="1"></el-option>
										<el-option label="到访" value="2"></el-option>
										<el-option label="邮件回访" value="3"></el-option>
										<el-option label="微信回访" value="4"></el-option>
										<el-option label="qq回访" value="5"></el-option>
										<el-option label="日常备注" value="6"></el-option>
									</el-select>
							</el-form-item>
						</el-col>
						
						<el-col :span="9">
							<el-form-item label="续费意向：">
								<el-rate v-model="ruleForm1.renewintention" :texts="texts" show-text></el-rate>
							</el-form-item>
						</el-col>
						
						<el-col :span="9">
							<el-form-item label="客户回访态度：">
								<el-rate v-model="ruleForm1.custvistiattitude" :texts="texts" show-text></el-rate>
							</el-form-item>
						</el-col>
						
						<el-col :span="9">
							<el-form-item label="客户评价：">
								<el-rate v-model="ruleForm1.custevaluate" :texts="texts"  show-text></el-rate>
							</el-form-item>
						</el-col>
						
						<el-col :span="9">
							<el-form-item label="客户是否有新项目：">
								<el-switch v-model="ruleForm1.custnewitem"on-color="#13ce66" off-color="#ff4949" on-text="是"   off-text="否"  on-value="1" off-value="0"></el-switch>
							</el-form-item>
						</el-col>
							<el-col :span="9">
							<el-form-item label="客户倾向项目类型：" >
								<el-select v-model="ruleForm1.custitemtype">
									<el-option v-for="item in itemTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9" v-if="this.ruleForm1.custitemtype == 7" >
							<el-form-item label="汇搜云权限：">
								<el-select v-model="ruleForm1.itemtypedetail">
										<el-option v-for="item in itemDetailTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="评价(是否为优质客户)：">
								<el-rate v-model="ruleForm1.serviceevaluate" :texts="texts" show-text></el-rate>
							</el-form-item>
						</el-col>
					<el-col :span="9">
							<el-form-item label="客户是否续费：" >
								<el-switch  v-model="ruleForm1.custrenewstatus"  on-color="#13ce66" off-color="#ff4949" on-text="是"   off-text="否"   on-value="1" off-value="0"></el-switch>
							</el-form-item>
					</el-col>
					
					<el-col :span="9">
							<el-form-item label="续费后项目开始时间："  prop = "renewitembegindate">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.renewitembegindate" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
					<el-col :span="9">
							<el-form-item label="续费后项目结束时间："  prop = "renewitemenddate" >
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.renewitemenddate" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
	
						<el-col :span="9">
							<el-form-item label="客户续费时间："  >
								<el-date-picker type="date"   placeholder="选择日期" v-model="ruleForm1.renewdate" style="width: 100%;"></el-date-picker>
							</el-form-item>
					</el-col>
					
					

						<!--制作要求-->
						<el-col :span="18">
							<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户跟踪备注：</b> <br/> <br/>
						</el-col>
						<el-col :span="18">
							<el-form-item label-width="100px">
								<el-input type="textarea" placeholder="说明用户不续费原因、续费意向等" :rows='5' v-model="ruleForm1.tracedesc"></el-input>
							</el-form-item>
						</el-col>
						
						<el-col :span="24" >
							<el-form-item label-width="100px">
								<el-button @click="resetForm('ruleForm1')">返回</el-button>
							</el-form-item>
						</el-col>
					</el-row>
					
					
					<el-row >
						<el-col :span="24" >
							<el-collapse v-model="activeNames" style="margin: 10px 0;">
								<el-collapse-item title="跟踪记录" name="1">
									<el-table :data="tableData1" style="width: 100%">
										<el-table-column prop="petname" label="服务人"  width="100px"></el-table-column>
										<el-table-column prop="visitwayName" label="售后方式" width="120px"></el-table-column>
										<el-table-column prop="renewintentionName" label="续费意向" width="120px"></el-table-column>
										<el-table-column prop="custvistiattitudeName" label="回访态度" width="120px"></el-table-column>
										<el-table-column prop="custitemtypeName" label="倾向项目类型" width="150px"></el-table-column>
										<el-table-column prop="custitemName" label="会搜云权限" width="120px"></el-table-column>
										<el-table-column prop="custnewitemName" label="是否有新项目" width="150px"></el-table-column>
										<el-table-column prop="custrenewstatusName" label="是否续费" width="150px"></el-table-column>
										<el-table-column prop="custevaluateName" label="客户评价" width="150px"></el-table-column>
										<el-table-column prop="serviceevaluateName" label="优质客户" width="150px"></el-table-column>
										<el-table-column prop="renewitembegindate" label="续费开始时间" width="150px"></el-table-column>
										<el-table-column prop="renewitemenddate" label="续费结束时间" width="150px"></el-table-column>
										<el-table-column prop="renewdate" label="续费时间" width="150px"></el-table-column>
										<el-table-column prop="tracedesc" label="客户跟踪备注" width="400px"></el-table-column>
									</el-table>
								</el-collapse-item>
							</el-collapse>
						</el-col>
					</el-row>
				</el-form>
				<div v-if="imgShow" class="showImg">
					<div class="showImgBoard fixed" @click="hideBoard"></div>
					<div class="imgItem fixed">
						<img :src="imgUrl" />
					</div>
				</div>
			</div>
		</main_component>
		<router-view @reload="reload">

		</router-view>
	</div>
</template>

<script>
	import top_component from '@/components/module/component_top'
	import nav_left_component from '@/components/module/component_left'
	import main_component from '@/components/module/component_main'
	import breadcrumb_component from '@/components/module/component_Breadcrumb'
	export default {
		name: "add_user",
		data() {
			var checkDate = (rule, value, callback) => {
				if(value == null || value == '') {
					callback();
//					callback(new Error("开始时间不能为空"))
				} else {
					value = value ? this.changeTime(value) : '';
					var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
					console.log(value)
					var r = value.match(reg);
					if(r == null) {
						callback(new Error("格式错误")); //请将“日期”改成你需要验证的属性名称!    
					} else {
						callback()
					}
				}

			};

			
			var checkDate2= (rule, value, callback) => {
					console.log(value + "---" +this.ruleForm1.renewitembegindate)
					console.log(value <= this.ruleForm1.renewitembegindate)
				if (value){
					 if (value <= this.ruleForm1.renewitembegindate) {
	          			callback(new Error('结束时间不能小于开始时间'));
	        		}else {
						callback();
					}

				}else{
					callback()
				}
				
			};
			return {
				data1:null,
				data2:null,
				data3:null,
				data4:null,
				token:null,
				fileList3: [],
				texts:	['差','一般','中等',"良好",'优'],
				activeNames:["1"],
				itemDetailTypes: [{
						label: '基础版',
						value: 1
					},
					{
						label: '小程序版',
						value: 2
					},
					{
						label: '高级版',
						value: 3
					},
					{
						label: '至尊版',
						value: 4
					},
				],
				itemTypes: [{
						label: '企业版',
						value: 1
					},
					{
						label: '门户版',
						value: 2
					},
					{
						label: '电商版',
						value: 3
					},
					{
						label: '微商app',
						value: 4
					},
					{
						label: '独立小程序',
						value: 5
					},
					{
						label:'阿凡提',
						value:6
					},
					{
						label:'汇搜云',
						value:7
					}
				],
				status_options: [{
						label: '正常',
						value: 1
					},
					{
						label: '禁用',
						value: 2
					},
				], //状态选项
				appraisals: ['差', '一般', '好'], //评价
				keyid:'',//业务员
				ruleForm1: {
					traceid:null,//跟踪的ip地址
					itemid:null,//项目的id
					itemname:null,//项目的名称
					custid:null,//客户的对应的id
					contact: '', //姓名
					companyname: '', //公司名称
					companyintro: '', //公司简介
					salesman: null, //业务员
					saleid: null,
					itembegindate:null,//项目开始时间
					itemenddate:null,//项目结束时间
					visitway:"1",//访问的方式
					renewintention:null,//续费意向
					custvistiattitude:null,//客户回访态度
					custevaluate:null,//客户评价
					custnewitem:'1',//客户是否有新的项目
					custitemtype: 1, //客户倾向的项目类型
					itemtypedetail:1,//汇搜云小程序类型
					serviceevaluate:null,//客户评价是否为优质客户
					custrenewstatus:"1",//是否续费
					renewitembegindate:null,//项目续费开始时间
					renewitemenddate:null,//项目续费结束时间
					renewdate:null,//续费时间
					tracedesc:null //客户跟踪备注
				
				},
				limitCtrl: {},//权限控制
				tableData1:[],
				
				//用于图片的显示
				//				imgUrls:{
				//					idurl:"",
				//					contracturl:"",
				//					licenseurl:"",
				//					invoiceurl:""
				//				},
				imgUrl: null,
				imgShow: false,

				//				dialogVisibles:{
				//					dcheckItemNameialog1:false,
				//					dialog2:false,
				//					dialog3:false,
				//					dialog4:false
				//				},
				provinces: null, //省份数组
				citys: null, //市份数组
				areas: null, //县份数组

				rules: {
				renewitembegindate:[{
						validator: checkDate,
						trigger: 'blur'
					}],
				renewitemenddate:[{
						validator: checkDate2,
						trigger: 'blur'
					}]
				},
				dialogFormVisible: false, //变更业务员对话框显示与否
				form2LabelWidth: '100px', //form2的label宽度
				restaurants: [],//业务员列表
				restaurantsReplaced: [],//被签单人列表
				//用来存放之前的saleid和custid，以及itemid的内容
				itemid: '',

				saleManId: false,
				submitJud: true,		//防止表单重复提交
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.ruleForm1.itemid = this.$route.query.itemid;
			this.itemid = this.$route.query.itemid;
			this.keyid = localStorage.CRM_keyid;
//			console.log(this.keyid,"---keyid---",this.keyid != 'null',);
//			if(this.keyid != 'null'){
//				this.getSaleman(this.keyid);
//			}else{
//				this.loadAll();
//			}
			this.loadAll();
			this.token={"token":localStorage.CRM_token} ;
			this.data1={"token":localStorage.CRM_token,'imageType':1}
			this.data2={"token":localStorage.CRM_token,'imageType':2}
			this.data3={"token":localStorage.CRM_token,'imageType':3}
			this.data4={"token":localStorage.CRM_token,'imageType':4}
			
			//如果项目id不为空，则查询客户信息
			if(this.itemid != null && this.itemid != ''){
				this.$http.get("/list/customer/update/index", {
					params: {
						token: localStorage.CRM_token,
						itemid: this.itemid
					}
				}).then(function(res) {
					if(res.body.data != null && res.body.code == 100) {
	
						console.log(res, "=====================>>>>>>>");
						this.ruleForm1.custid = res.body.data.custid;
						this.ruleForm1.itembegindate = res.body.data.itembegindate;
						this.ruleForm1.itemenddate = res.body.data.itemenddate;
						this.ruleForm1.contact = res.body.data.contact;
						this.ruleForm1.companyname = res.body.data.companyname;
						this.ruleForm1.itemname = res.body.data.itemname;
						this.ruleForm1.itemtypedetail = res.body.data.itemtypedetail;
						this.ruleForm1.custitemtype = res.body.data.itemtype;
						//sale信息
						this.ruleForm1.saleid = res.body.data.saleid;
						this.ruleForm1.salename = res.body.data.salename;
					}
				});
			}
//
//			//获取省市区数据
//			this.getregion("", "")
		},
		methods: {
			reload: function(text) {
				if(text == 1) {
					this.loadData(this.currentPage);
				}
			},
			change_salesman() {
				console.log("更改业务员")

			},
			changeTime(time) {
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth() + 1;
				var dd = newTime.getDate();
				return(yy + "-" + mm + "-" + dd)
			},
			//表单1提交
			submitForm1(formName) {
				
			console.log("-------0")
			
				if (this.ruleForm1.custrenewstatus == "1"){
					if (!this.ruleForm1.renewitembegindate  || !this.ruleForm1.renewitemenddate  || !this.ruleForm1.renewdate){
						  this.$message({
					          message: '已续费时，续费开始或结束时间等不能为空',
					          type: 'warning'
					        });
					     return;
					}
				}else if(this.ruleForm1.custrenewstatus == "0"){
						
					if (this.ruleForm1.renewitembegindate || this.ruleForm1.renewitemenddate || this.ruleForm1.renewdate ){
					  this.$message({
				          message: '未续费，续费开始或结束时间不能填写',
				          type: 'warning'
				        });
				     return;
					}
				}
				
				console.log("-------1")
				
				if(this.submitJud){
					this.$refs[formName].validate((valid) => {
						
						if(valid) {
							console.log(valid)
							
							this.submitJud = false;
							//提交对应的内容
							this.$http.post("/list/itemRenew/save", {
								custid: this.ruleForm1.custid,
								token: localStorage.CRM_token,
								//contact: this.ruleForm1.contact, //姓名
								itemid: this.ruleForm1.itemid,
								//itemname: this.ruleForm1.itemname, //项目全称
								//companyname: this.ruleForm1.companyname,//公司名称
								saleid: this.ruleForm1.saleid,
//								itembegindate: this.ruleForm1.itembegindate ? this.changeTime(this.ruleForm1.itembegindate) : '', //开始时间
//								itemenddate: this.ruleForm1.itemenddate ? this.changeTime(this.ruleForm1.itemenddate) : '', //结束时间
								visitway: this.ruleForm1.visitway,
								renewintention: this.ruleForm1.renewintention,
								custvistiattitude:this.ruleForm1.custvistiattitude,
								custevaluate:this.ruleForm1.custevaluate,
								custnewitem:this.ruleForm1.custnewitem,
								custitemtype:this.ruleForm1.custitemtype,
								serviceevaluate:this.ruleForm1.serviceevaluate,
								renewdate:this.ruleForm1.renewdate ? this.changeTime(this.ruleForm1.renewdate) : '',
								custrenewstatus:this.ruleForm1.custrenewstatus,
								renewitembegindate:this.ruleForm1.renewitembegindate ? this.changeTime(this.ruleForm1.renewitembegindate) : '',
								renewitemenddate:this.ruleForm1.renewitemenddate ? this.changeTime(this.ruleForm1.renewitemenddate) : '',
								tracedesc:this.ruleForm1.tracedesc
							}, {
								emulateJSON: true
							}).then(function(res) {
								this.submitJud = true;
								if(res.body.code == 100) {
									//成功跳转到对应的首页去
									/*this.$router.push({
										path: "/user_list"
									});
									this.$emit("reload", 1);*/
      								this.$emit('reload', 1);
      								
      								this.$message({
							          message: '添加成功',
							          type: 'success'
									});
									this.loadAll();
								
									this.ruleForm1.visitway="1",//访问的方式
									this.ruleForm1.renewintention=null,//续费意向
									this.ruleForm1.custvistiattitude=null,//客户回访态度
									this.ruleForm1.custevaluate=null,//客户评价
									this.ruleForm1.custnewitem='1',//客户是否有新的项目
									this.ruleForm1.custitemtype= 1, //客户倾向的项目类型
									this.ruleForm1.serviceevaluate=null,//客户评价是否为优质客户
									this.ruleForm1.custrenewstatus="1",//是否续费
									this.ruleForm1.renewitembegindate=null,//项目续费开始时间
									this.ruleForm1.renewitemenddate=null,//项目续费结束时间
									this.ruleForm1.renewdate=null,//续费时间
									this.ruleForm1.tracedesc=null,l
									} else if(res.body.code == 404) {
										this.$message.error('保存失败，请重试');
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
				this.$router.go(-1);
      			this.$emit('reload', 1);
			},
			//当我们移除文件的时候，我们需要移除保存提交到表单里面的数据和删除上传到服务器的图片
			handleRemove(file, fileList) {
				if(file.response.data != null) {
					var imagetype = file.response.data.imageType;
					var url = file.response.data.imageurl;
					if(imagetype == 1) {
						this.deleteData(this.ruleForm1.IDImageUrl, url);
					} else if(imagetype == 2) {
						this.deleteData(this.ruleForm1.contractImageUrl, url);
					} else if(imagetype == 3) {
						this.deleteData(this.ruleForm1.licenseImageUrl, url);
					} else if(imagetype == 4) {
						this.deleteData(this.ruleForm1.invoiceImageUrl, url);
					}
					//删除服务器中的图片
					this.$http.get("/list/customer/realdelete", {
						params: {
							token: localStorage.CRM_token,
							imageName: url
						}
					}).then(function(res) {
						console.log(res)
					})
				}
			},
			//用于删除数据
			deleteData(imageUrls, url) {
				if(imageUrls != null) {
					for(var i = 0; i < imageUrls.length; i++) {
						if(imageUrls[i] == url) {
							imageUrls.splice(i, 1);
						}

					}
				}
			},
			//图片上传成功事件，上传成功后将对应的url存放对应的属性中去。
			handlesuccess(response, file, fileList) {
				if(response.code == 100) {
					if(response.data != null) {
						var imagetype = response.data.imageType;
						var url = response.data.imageurl;
						if(imagetype == 1) {
							/*		IDImageUrl    : null,		//上传身份证图片url
		          			contractImageUrl: null,		//上传合同图片url
		          			licenseImageUrl : null,		//上传营业执照图片url
		          			invoiceImageUrl
		      				ruleForm1.IDImageUrl=*/
							this.ruleForm1.IDImageUrl.push(url)
						} else if(imagetype == 2) {
							this.ruleForm1.contractImageUrl.push(url)
						} else if(imagetype == 3) {
							this.ruleForm1.licenseImageUrl.push(url);
						} else if(imagetype == 4) {
							this.ruleForm1.invoiceImageUrl.push(url);
						}
					}
				}
			},
			//通过 这个是点击图片放大时触发的事件
			handlePictureCardPreview(file) {
				//用来放大图片
				var imageurl = file.url;
				//对图片的类型进行判断
				var type = file.response.data.imageType;
				console.log(imageurl)
				this.imgUrl = imageurl;
				this.imgShow = true;

			},
			hideBoard() {
				this.imgShow = false;
			},
			//对上传的文件进行限制
			beforeAvatarUpload(file) {
				var type = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
				var isJPG = false;
				for(var i = 0; i < type.length; i++) {
					if(file.type === type[i]) {
						isJPG = true;
					}
				}
				const isLt2M = file.size / 1024 / 1024 < 10;
				if(!isJPG) {
					this.$message.error('只能上传图片格式格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 10MB!');
				}
				return isJPG && isLt2M;
			},
			//所有word文件上传的方法
			beforeAvatarUpload1(file) {
				var isJPG = false;
				var fileext = file.name.substring(file.name.lastIndexOf("."), file.name.length);
				console.log(fileext)
				if(fileext =='.doc' || fileext == '.docx' ||(fileext=='.pdf' || fileext=='.xls') ||(fileext=='.xlsx') ) {
					isJPG = true; 
				}
				
				if(!isJPG) {
					this.$message.error('只能上传word、pdf、ececl格式!');
				}
				return isJPG;
			},
			//用于对应的下载，在添加界面不使用。
			handlePreview(file) {
				console.log(file)
			}, //用于添加页面的删除 ，为
			handleRemove1(file) {
				console.log(file)
				if(file.response.data != null&&file!=null) {
					var docname = file.response.data.docname;
					var url = file.response.data.docurl;
					//同时删除ruleForm1.itemdocUrl中的数据
					this.deleteData(this.ruleForm1.itemdocUrl,url)
					//删除服务器中的图片
					this.$http.get("/list/customer/realdelete", {
						params: {
							token: localStorage.CRM_token,
							imageName: url
						}
					}).then(function(res) {
							console.log(this.ruleForm1.itemdocUrl)
						})
					}
			},
			//上传图片成功后的内容
			handlesuccess1(response, file, fileList) {
				//上传成功将url存放到ruleForm1.itemdocUrl
				if(response.code==100&&response.data!=null){
					var url = response.data.docurl;
					this.ruleForm1.itemdocUrl.push(url);
				}
				if(response.code==102){
					 this.$message({
			          message: '文件不能为空',
			          type: 'warning'
			        });
			        for (var i = 0; i < fileList.length; i++) {
			        	console.log(file.name)
			        	console.log(fileList[i].name)
			        	if(file.name==fileList[i].name){
			        		fileList.splice(i);
			        	}
			        	
			        }
			        
				}
				
			},
			//当进入该页面的时候，自动加载之前的续费信息
			loadAll() {
				this.$http.get("/list/itemRenew/getTraceRecord",{
					params:{
						token: localStorage.CRM_token,
						itemid:this.itemid
					}
				}).then(function(res){
					if(res.body.code==100&&res.body.data!=null){
						this.tableData1=res.body.data;
						console.log("这个是客户端" + this.tableData1)
					}else if(res.body.code==404){
						console.log(res);
					}
				})
			},
			
			//被签单人自动填充
			querySearchAsyncToReplaced(queryString, cb) {
				var restaurantsReplaced = this.restaurantsReplaced;
				var replacedResults = queryString ? restaurantsReplaced.filter(this.createStateFilterToReplaced(queryString)) : restaurantsReplaced;
				cb(replacedResults);
			},
			createStateFilterToReplaced(queryString) {
				return(state) => {
					return(state.value.indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelectToReplaced(item) {
				console.log(item,"==item==",item.value,"==",item.petname);
				this.ruleForm1.replaceuserid = '';
				this.ruleForm1.replaceusername='';
				
				if(item){
					this.ruleForm1.replaceuserid = item.userid;
					this.ruleForm1.replaceusername = item.petname;
				}
				//this.getSaleman(item.saleid)
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
		        if (newVal[7].childList[1].map.renreTraceDetail == 0) {
		          this.$router.push({path: "/login"})
		        }
		        this.limitCtrl =newVal[7].childList[1].map;
		      }
			
		},
//		watch: {
//			'ruleForm1.provincename' (newVal, oldVal) {
//				console.log(newVal, oldVal)
//				this.getregion(newVal, 2)
//			},
//			'ruleForm1.cityname' (newVal, oldVal) {
//				//console.log(newVal, oldVal)
//				this.getregion(newVal, 3)
//			},
//			'ruleForm1.salename' (newVal, oldVal) {
//				if('' == this.itemid || undefined == this.itemid) {
//					if(!this.saleManId) {
//						this.ruleForm1.saleemail = '';
//						this.ruleForm1.saleweixin = '';
//						this.ruleForm1.salephone = '';
//						this.ruleForm1.saleid = '';
//					}
//					this.saleManId = false;
//				}
//			}
//
//		}

	}
</script>
<style type="text/css">
	.add_user .el-form .el-col .el-form-item .el-form-item__content .el-rate{margin-top: 8px;}
	.add_user .el-form .el-col-9{height:58.66px;}
</style>
<style lang="less" scoped="scoped">
	/*更改按钮颜色*/
	
	.el-button--success {
		background: #2EB398;
		border-color: #2EB398;
	}
	/*更改选择框宽度*/
	
	.el-select {
		width: 100%;
	}
	
	.user_info {
		padding: 20px;
		background: white;
		border-radius: 5px;
	}
	/*上传的图片显示预览*/
	
	.showImg {
		.showImgBoard {
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: rgba(0, 0, 0, .5);
			z-index: 100;
		}
		.imgItem {
			padding: 10px;
			width: 500px;
			height: auto;
			background: white;
			border-radius: 5px;
			top: 150px;
			left: calc(~"50% - 250px");
			z-index: 101;
			align-items: center;
			img {
				width: 100%;
				max-height: 500px;
			}
		}
	}
</style>