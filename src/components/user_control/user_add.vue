<template>
	<div class="add_user">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写用户信息-->
			<div class="user_info">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
					<el-row>
						<!--客户信息-->
						<el-col :span="18">
							<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户信息：</b> <br/> <br/>
						</el-col>
						<el-col :span="9">
							<el-form-item label="姓名：" prop="contact">
								<el-input type="text" v-model="ruleForm1.contact" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="手机号：" prop="phone">
								<el-input type="tel" v-model.number="ruleForm1.phone" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="微信号：">
								<el-input type="text" v-model.number="ruleForm1.weixin"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="邮箱：" prop="email">
								<el-input type="email" v-model="ruleForm1.email" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="企业名称：" prop="companyname">
								<el-input type="text" v-model="ruleForm1.companyname"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="企业简介：">
								<el-input type="text" v-model="ruleForm1.companyintro"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="地址：">
								<el-row :gutter="0">
									<el-col :span="8">
										<el-select v-model="ruleForm1.provincename" placeholder="请选择省份">
											<el-option v-for="item in provinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
										</el-select>
									</el-col>
									<el-col :span="8">
										<el-select v-model="ruleForm1.cityname" placeholder="请选择市">
											<el-option v-for="item in citys" :key="item.id" :label="item.name" :value="item.id"></el-option>
										</el-select>
									</el-col>
									<el-col :span="8">
										<el-select v-model="ruleForm1.areaname" placeholder="请选择区">
											<el-option v-for="item in areas" :key="item.id" :label="item.name" :value="item.id"></el-option>
										</el-select>
									</el-col>
								</el-row>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="详细地址：">
								<el-input type="text" v-model="ruleForm1.address"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="身份证：" prop="idcard">
								<el-input type="text" v-model="ruleForm1.idcard"></el-input>
							</el-form-item>
						</el-col><el-col :span="9">
							<el-form-item label="被签单人：" prop="replaceusername">
								<el-autocomplete v-model="ruleForm1.replaceusername" :fetch-suggestions="querySearchAsyncToReplaced" placeholder="请输入被签单人" @select="handleSelectToReplaced"></el-autocomplete>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="客户备注：" prop="custremark">
								<el-input type="textarea" placeholder="填写客户多个手机号、邮箱等信息" :rows='2' v-model="ruleForm1.custremark"></el-input>
							</el-form-item>
						</el-col>
						
						<!--项目信息-->
						<el-col :span="18">
							<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;项目信息：</b> <br/> <br/>
						</el-col>
						<el-col :span="9">
							<el-form-item label="项目类型：" prop="itemtype">
								<el-select v-model="ruleForm1.itemtype">
									<el-option v-for="item in itemTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9" v-if="this.ruleForm1.itemtype == 7" >
							<el-form-item label="汇搜云权限：">
								<el-select v-model="ruleForm1.itemtypedetail">
										<el-option v-for="item in itemDetailTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="项目全称：" prop="itemname">
								<el-input type="text" placeholder="请输入项目全称" v-model="ruleForm1.itemname"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="合同编号：" prop="contnum">
								<el-input type="text" placeholder="请输入合同编号" v-model="ruleForm1.contnum" style="width: 100%;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="开始时间：" prop="itembegindate">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.itembegindate" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="结束时间：" prop="itemenddate">
								<el-date-picker type="date" placeholder="选择日期" :editable="false" v-model="ruleForm1.itemenddate" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="服务状态：">
								<el-select v-model="ruleForm1.custstatus">
									<el-option v-for="item in status_options" :editable="false" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="评价：">
								<el-radio-group v-model="ruleForm1.evaluate">
									<el-radio-button v-for="item in appraisals" :label="item" :key="item"></el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>

						<!--制作要求-->
						<el-col :span="18">
							<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;制作要求  参考/说明/需求：</b> <br/> <br/>
						</el-col>
						<el-col :span="18">
							<el-form-item label-width="100px">
								<el-input type="textarea" placeholder="填写客户提交的附加资料，及需求描述" :rows='5' v-model="ruleForm1.itemrequire"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label-width="100px">
								<el-upload class="upload-demo" :data="token"  action="/list/customer/uploadRequireDoc" :on-success="handlesuccess1"  :on-preview="handlePreview" :file-list="fileList3" :on-remove="handleRemove1" :before-upload="beforeAvatarUpload1">
									<el-button size="small" type="primary">上传需求文档</el-button> &nbsp;
									<i slot="tip" class="el-upload__tip">上传word、pdf、ececl格式</i>
								</el-upload>
							</el-form-item>
						</el-col>
						<!--业务员信息-->
						<el-col :span="18">
							<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业务员信息：</b> <br/> <br/>
						</el-col>
						<div v-if="this.keyid!='null'">
							<el-col :span="9">
								<el-form-item label="姓名：" prop="salename">
									<el-autocomplete style="width: 100%;" :disabled="true" class="inline-input" v-model="ruleForm1.salename" placeholder="输入业务员姓名" @select="handleSelect" :fetch-suggestions="querySearchAsync"></el-autocomplete>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="手机号：" prop="salephone">
									<el-input type="text" :disabled="true" v-model.number="ruleForm1.salephone" placeholder="输入手机号搜索对应业务员信息"></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="9">
								<el-form-item label="微信号：">
									<el-input type="text" :disabled="true" v-model.number="ruleForm1.saleweixin"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="邮箱：">
									<el-input type="text" :disabled="true" v-model="ruleForm1.saleemail"></el-input>
								</el-form-item>
							</el-col>
						</div>
						<div v-else>
							<el-col :span="9">
								<el-form-item label="姓名：" prop="salename">
									<el-autocomplete style="width: 100%;" class="inline-input" v-model="ruleForm1.salename" placeholder="输入业务员姓名" @select="handleSelect" :fetch-suggestions="querySearchAsync"></el-autocomplete>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="手机号：" prop="salephone">
									<el-input type="text" :disabled="true" v-model.number="ruleForm1.salephone" placeholder="输入手机号搜索对应业务员信息"></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="9">
								<el-form-item label="微信号：">
									<el-input type="text" :disabled="true" v-model.number="ruleForm1.saleweixin"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="邮箱：">
									<el-input type="text" :disabled="true" v-model="ruleForm1.saleemail"></el-input>
								</el-form-item>
							</el-col>
						</div>

						<!--客户信息上传-->
						<el-col :span="18">
							<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户信息上传：</b> <br/> <br/>
						</el-col>
						<el-col :span="18">
							<el-form-item label="上传身份证照片：" label-width="150px">
								<el-upload :data="data1" :on-success="handlesuccess" :before-upload="beforeAvatarUpload" action="/list/customer/uploadimage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<!--<el-dialog v-model="dialogVisibles.dialog1" size="tiny">
									<img width="100%" :src="imgUrls.idurl" alt="">
								</el-dialog>-->
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="上传合同照：" label-width="150px">
								<el-upload :before-upload="beforeAvatarUpload" :on-success="handlesuccess" :data="data2" action="/list/customer/uploadimage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<!--<el-dialog v-model="dialogVisibles.dialog2" size="tiny">
									<img width="100%" :src="imgUrls.contracturl" alt="">
								</el-dialog>-->
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="上传公司营业执照：" label-width="150px">
								<el-upload :data="data3" :on-success="handlesuccess" :before-upload="beforeAvatarUpload" action="/list/customer/uploadimage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<!--<el-dialog v-model="dialogVisibles.dialog3" size="tiny">
									<img width="100%" :src="imgUrls.licenseurl" alt="">
								</el-dialog>-->
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="上传发票照片：" label-width="150px">
								<el-upload :data="data4" :on-success="handlesuccess" :before-upload="beforeAvatarUpload" action="/list/customer/uploadimage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<!--<el-dialog v-model="dialogVisibles.dialog4" size="tiny">
									<img width="100%" :src="imgUrls.invoiceurl" alt="">
								</el-dialog>-->
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label-width="100px">
								<el-button type="success" @click="submitForm1('ruleForm1')">提交</el-button>
								<el-button @click="resetForm('ruleForm1')">取消</el-button>
							</el-form-item>
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

			//手机号码的自定义验证
			var checkPhone2 = (rule, value, callback) => {
				if(value == '') {
					callback(new Error('请输入手机号码'));
				} else if(isNaN(value)) {
					callback(new Error('请输入数字'));
				} else if(value.toString().length !=11) {
					callback(new Error('手机号码为11位'))
				} else {
					callback()
				}
			};
			//手机号码的自定义验证、并校验手机号名字是否存在
			var checkPhone = (rule, value, callback) => {
				if(value == '') {
					callback(new Error('请输入手机号码'));
				} else if(isNaN(value)) {
					callback(new Error('请输入数字'));
				} else if(value.toString().length !=11) {
					callback(new Error('手机号码为11位'))
				} 
				if(!this.itemid){
					this.$http.get("/list/customer/checkCustByContAndPhone", {
						params: {
							token: localStorage.CRM_token,
							phone: this.ruleForm1.phone,
							contact:this.ruleForm1.contact
						}
					}).then(function(res) {
						console.log("校验用户唯一",res);
						if(res.body.code == '100') {
							callback(new Error('客户姓名与手机号已经存在，不能添加！'));
						}else {
			            	callback();
			            }
					});
				}else {
					callback();
				}
			};
			//手机号码的自定义验证、并校验手机号名字是否存在
			var checkItemName = (rule, value, callback) => {
				console.log(value,"项目名称");
				if(value == '') {
					callback(new Error('请输入项目全称'));
				} 
				this.$http.get("/list/customer/checkItemByNameAndType", {
					params: {
						token: localStorage.CRM_token,
						itemname: this.ruleForm1.itemname,
						itemtype:this.ruleForm1.itemtype,
						itemtypedetail:this.ruleForm1.itemtypedetail,
					}
				}).then(function(res) {
					console.log("项目全称与项目类型唯一",res);
					if(res.body.code == '100') {
						callback(new Error('项目全称与项目类型已经存在，不能添加！'));
					}else {
		            	callback();
		            }
				});
				console.log();
			};
			//身份证验证
			var checkID = (rule, value, callback) => {
				var exp = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
				if(!exp.test(value)) {
					callback(new Error('输入的身份证号有误'))
				} else {
					callback()
				}
			};

			var checkDate = (rule, value, callback) => {
				if(value == null || value == '') {
					callback(new Error("开始时间不能为空"))
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

			var checkDate1 = (rule, value, callback) => {
				if(value == null || value == '') {
					callback(new Error("结束时间不能为空"))
				}else if (value <= this.ruleForm1.itembegindate) {
          			callback(new Error('结束时间不能小于开始时间'));
        		}else {
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
					contact: '', //姓名
					phone: '', //手机
					weixin: '', //微信
					email: '', //邮箱
					companyname: '', //公司名称
					companyintro: '', //公司简介
					province: '', //省份
					provincename: null,
					city: null, //市
					cityname: null,
					area: null, //区
					areaname: null,
					address: null, //详细地址
					custremark:'',
					idcard: '', //身份证号
					replaceuserid:'',//被签单人userid
					replaceusername:null,//被签单人名称
					salesman: null, //业务员
					itemtype: 1, //项目类型
					itemtypedetail:1,//汇搜云小程序类型
					itemname: '', //项目全称
					contnum: "", //合同编号
					itembegindate: null, //开始时间
					itemenddate: null, //结束时间
					custstatus: 1, //服务状态
					evaluate: '', //评价
					itemrequire: '',
					saleid: '', //业务员的id
					salename: '', //业务员姓名	
					salephone: '', //业务员电话	
					saleweixin: '', //业务员微信	
					saleemail: '', //业务员邮箱	
					IDImageUrl: [], //上传身份证图片url
					contractImageUrl: [], //上传合同图片url
					licenseImageUrl: [], //上传营业执照图片url
					invoiceImageUrl: [] ,//上传发票图片url
					itemdocUrl: [] //项目文档路径
				},
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
				//					dialog1:false,
				//					dialog2:false,
				//					dialog3:false,
				//					dialog4:false
				//				},
				provinces: null, //省份数组
				citys: null, //市份数组
				areas: null, //县份数组

				rules: {
					salename: [{
						required: true,
						message: '请输入姓名',
						trigger: 'change'
					}],
					contact: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						}, {
							min: 1,
							max: 28,
							message: '长度在1 到 28个字符',
							trigger: 'blur'
						}
					],
					phone: [{
						required: true,
						validator: checkPhone2,
						trigger: 'blur'
					}],
					email:[{
						required: true,
						type: 'email',
						message: '请输入邮箱',
						trigger: 'blur'
					}],
					companyname:[{
						required: true,
						message: '请输入企业名称',
						trigger: 'blur'
						},
						{ min: 1, max: 90, message: '长度在 1 到 90个字符', trigger: 'blur' }
					],
					salephone: [{
						required: true,
						message: '手机号不能为空',
						trigger: 'change'
					}],
					itemtype: [{
						required: true,
						message: '请选择项目类型',
						type: 'number',
						trigger: 'change'
					}],
					itemname: [{
							required: true,
							validator: checkItemName,
							trigger: 'blur'
						},{ min: 1, max: 16, message: '长度在 1 到 16个字符', trigger: 'blur' }
					],
//					idcard: [{
//						required: true,
//						validator: checkID,
//						trigger: 'change'
//					}],
//					contnum: [{
//						required: true,
//						message: "请输入合同编号",
//						trigger: 'blur'
//					}],
					itembegindate: [{
						validator: checkDate,
						trigger: 'change'
					}],
					itemenddate: [{
						validator: checkDate1,
						trigger: 'change'
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
			this.itemid = this.$route.query.itemid;
			console.log(this.itemid,"---item---",this.itemid != null && this.itemid != '');
			this.keyid = localStorage.CRM_keyid;
			console.log(this.keyid,"---keyid---",this.keyid != 'null',);
			if(this.keyid != 'null'){
				this.getSaleman(this.keyid);
			}else{
				this.loadAll();
			}
			//被签单人初始化
			this.loadAllToReplaced();
			
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
						this.ruleForm1.contact = res.body.data.contact;
						this.ruleForm1.phone = res.body.data.phone;
						this.ruleForm1.weixin = res.body.data.weixin;
						this.ruleForm1.itemtype = res.body.data.itemtype;
						if (res.body.data.itemtypedetail != 0){
							this.ruleForm1.itemtypedetail = res.body.data.itemtypedetail;
						}
						this.ruleForm1.email = res.body.data.email;
						this.ruleForm1.companyname = res.body.data.companyname;
						this.ruleForm1.companyintro = res.body.data.companyintro;
						this.ruleForm1.province = res.body.data.province;
						this.ruleForm1.provincename = res.body.data.provincename;
						this.ruleForm1.city = res.body.data.city;
						this.ruleForm1.cityname = res.body.data.cityname;
						this.ruleForm1.area = res.body.data.area;
						this.ruleForm1.areaname = res.body.data.areaname;
						this.ruleForm1.address = res.body.data.address;
						this.ruleForm1.custremark = res.body.data.custremark, //客户备用
						this.ruleForm1.idcard=res.body.data.idcard;
						this.ruleForm1.replaceuserid=res.body.data.replaceuserid;
						this.ruleForm1.replaceusername=res.body.data.replaceusername;
	
						//sale信息
						this.ruleForm1.saleid = res.body.data.saleid;
						this.ruleForm1.saleemail = res.body.data.saleemail;
						this.ruleForm1.salename = res.body.data.salename;
						this.ruleForm1.salephone = res.body.data.salephone;
						this.ruleForm1.saleweixin = res.body.data.saleweixin;
	
						console.log(this.ruleForm1)
						//省市区的解析
						this.Pid = res.body.data.province;
						this.Cid = res.body.data.city;
						this.Aid = res.body.data.area;
					}
				});
			}

			//获取省市区数据
			this.getregion("", "")
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
				console.log("^^^^^^^^^^^^^^^^^^^^^^^", this.ruleForm1.itemtypedetail)
				this.ruleForm1.replaceuserid = '';
				for(var i=0;i<this.restaurantsReplaced.length;i++){
					if(this.restaurantsReplaced[i].petname==this.ruleForm1.replaceusername){
						this.ruleForm1.replaceuserid = this.restaurantsReplaced[i].userid;
						this.ruleForm1.replaceusername
					}
				}
				
				if(this.submitJud){
					this.$refs[formName].validate((valid) => {
						if(valid) {
							this.submitJud = false;
							//提交对应的内容
							this.$http.post("/list/customer/save", {
								custid: this.ruleForm1.custid,
								token: localStorage.CRM_token,
								contact: this.ruleForm1.contact, //姓名
								phone: this.ruleForm1.phone, //手机
								weixin: this.ruleForm1.weixin, //微信
								email: this.ruleForm1.email, //邮箱
								companyname: this.ruleForm1.companyname, //公司名称
								companyintro: this.ruleForm1.companyintro, //公司简介
								province: isNaN(Number(this.ruleForm1.provincename)) ? this.Pid : this.ruleForm1.provincename, //省份
								city: isNaN(Number(this.ruleForm1.cityname)) ? this.Cid : this.ruleForm1.cityname, //市
								area: isNaN(Number(this.ruleForm1.areaname)) ? this.Aid : this.ruleForm1.areaname, //区
								address: this.ruleForm1.address, //详细地址
								custremark: this.ruleForm1.custremark, //客户备用
								idcard: this.ruleForm1.idcard, //身份证号
								replaceuserid:this.ruleForm1.replaceuserid,//被签单人userid
								replaceusername:this.ruleForm1.replaceusername,//被签单人名称
								salesman: this.ruleForm1.salesman, //业务员
								itemtype: this.ruleForm1.itemtype, //项目类型
								itemtypedetail: this.ruleForm1.itemtype == 7? this.ruleForm1.itemtypedetail:0,//汇搜云小程序类型
								itemname: this.ruleForm1.itemname, //项目全称
								contnum: this.ruleForm1.contnum, //合同编号
								itembegindate: this.ruleForm1.itembegindate ? this.changeTime(this.ruleForm1.itembegindate) : '', //开始时间
								itemenddate: this.ruleForm1.itemenddate ? this.changeTime(this.ruleForm1.itemenddate) : '', //结束时间
								custstatus: this.ruleForm1.custstatus, //服务状态
								evaluate: this.ruleForm1.evaluate, //评价
								itemrequire: this.ruleForm1.itemrequire,
								saleid: this.ruleForm1.saleid, //制作说明
								salename: this.ruleForm1.salename, //业务员姓名	
								salephone: this.ruleForm1.salephone, //业务员电话	
								saleweixin: this.ruleForm1.saleweixin, //业务员微信	
								saleemail: this.ruleForm1.saleemail, //业务员邮箱	
								IDImageUrl: this.ruleForm1.IDImageUrl, //上传身份证图片url
								contractImageUrl: this.ruleForm1.contractImageUrl, //上传合同图片url
								licenseImageUrl: this.ruleForm1.licenseImageUrl, //上传营业执照图片url
								invoiceImageUrl: this.ruleForm1.invoiceImageUrl,//上
								itemdocUrl:this.ruleForm1.itemdocUrl
	
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
									this.$router.go(-1);
      								this.$emit('reload', 1);
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
			//根据用户的输入的手机号，到后台查询
			getSaleman(saleid) {
				//多手机号进行判断
				if(saleid != null && saleid != '') {
					this.$http.get("/list/salesman/findSaleBySaleid", {
						params: {
							token: localStorage.CRM_token,
							saleid: saleid
						}
					}).then(function(res) {
						console.log(res)
						if(res.body.code == 100) {
							if(res.body.data != null) {
								this.ruleForm1.saleid = res.body.data.saleid;
								this.ruleForm1.saleemail = res.body.data.saleemail;
								this.ruleForm1.salename = res.body.data.salename;
								this.ruleForm1.salephone = res.body.data.salephone;
								this.ruleForm1.saleweixin = res.body.data.saleweixin;
								this.saleManId = true;
							}
						}
					})
				} else {
					this.ruleForm1.saleid = "";
					this.ruleForm1.saleemail = "";
					this.ruleForm1.salename = "";
					this.ruleForm1.salephone = "";
					this.ruleForm1.saleweixin = ""
				}

			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
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
			//省市区的数据请求
			getregion(questid, classify) {
				//不是省市区id的不发送请求
				if(isNaN(Number(questid))) return false;
				this.$http.get('/list/customer/getregion', {
					params: {
						token: localStorage.CRM_token,
						flag: 2,
						regionId: questid
					}
				}).then(function(res) {
					if(res.body.code == 100) {
						if(classify == 2) {
							this.citys = res.body.data;
							this.ruleForm1.cityname = null;
						} else if(classify == 3) {
							this.areas = res.body.data;
							this.ruleForm1.areaname = null;
						} else {
							this.provinces = res.body.data;
						}
					}
				})
			},
			//用于业务员的自动填充
			querySearchAsync(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
				cb(results);
			},
			createStateFilter(queryString) {
				return(state) => {
					return(state.value.indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				this.saleManId = true;
				this.getSaleman(item.saleid)
			},
			loadAll() {
				this.$http.get("/list/salesman/findSaleAll", {
					params: {
						token: localStorage.CRM_token
					}
				}).then(function(res) {
					//加载json对象
					this.restaurants = res.body.data;
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
			//加载客服列表
			loadAllToReplaced() {
				this.$http.get("/list/user/customerList", {
					params: {
						token: localStorage.CRM_token,
					}
				}).then(function(res) {
					//加载json对象
					console.log(res,"==user列表==");
					this.restaurantsReplaced = res.body.data;
				})
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
		        if (newVal[0].childList[0].map.addBtn == 0) {
		          this.$router.push({path: "/login"})
		        }
		      }
			
		},
		watch: {
//			'ruleForm1.provincename' (newVal, oldVal) {
//				console.log(newVal, oldVal)
//				this.getregion(newVal, 2)
//			},
			'ruleForm1.provincename' (newVal, oldVal) {
				console.log(newVal, oldVal)
				this.getregion(newVal, 2)
			},
			'ruleForm1.cityname' (newVal, oldVal) {
				//console.log(newVal, oldVal)
				this.getregion(newVal, 3)
			},
			'ruleForm1.salename' (newVal, oldVal) {
				if('' == this.itemid || undefined == this.itemid) {
					if(!this.saleManId) {
						this.ruleForm1.saleemail = '';
						this.ruleForm1.saleweixin = '';
						this.ruleForm1.salephone = '';
						this.ruleForm1.saleid = '';
					}
					this.saleManId = false;
				}
			}

		}

	}
</script>

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