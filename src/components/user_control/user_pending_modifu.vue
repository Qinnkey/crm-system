<template>
	<div class="add_user">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写用户信息-->
			<div class="user_info">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
					<el-row>
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
							<el-form-item label="邮箱：">
								<el-input type="email" v-model="ruleForm1.email"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="企业名称：">
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
							<el-form-item label="详细地址：" prop="address">
								<el-input type="text" v-model="ruleForm1.address"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="项目类型：" prop="itemtype">
								<el-select v-model="ruleForm1.itemtype" placeholder="请选择">
									<el-option v-for="item in itemTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="项目全称：">
								<el-input type="text" v-model="ruleForm1.itemname"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="合同编号：" prop="contnum">
								<el-input type="text" placeholder="请输入合同编号" v-model="ruleForm1.contnum" style="width: 100%;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="身份证：" prop="idcard">
								<el-input type="text" v-model="ruleForm1.idcard"></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="9">
							<el-form-item label="开始时间：" prop="itembegindate">
								<el-date-picker type="date" placeholder="选择日期" :editable="false" v-model="ruleForm1.itembegindate" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="结束时间：" prop="itemenddate">
								<el-date-picker type="date" placeholder="选择日期" :editable="false" v-model="ruleForm1.itemenddate" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="服务状态：">
								<el-select v-model="ruleForm1.custstatus" placeholder="请选择">
									<el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value">
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
								<el-upload class="upload-demo" :data="token" action="/list/customer/uploadRequireDoc" :on-success="handlesuccess1" :on-preview="handlePreview" :file-list="fileList3" :on-remove="handleRemove1" :before-upload="beforeAvatarUpload1">
									<el-button size="small" type="primary">上传需求文档</el-button>
									&nbsp;
									<i slot="tip" class="el-upload__tip">上传word、pdf、ececl格式</i>
								</el-upload>
							</el-form-item>
						</el-col>
						<!--业务员信息-->
						<el-col :span="18">
							<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业务员信息：</b> <br/> <br/>
						</el-col>
						<el-col :span="9">
							<el-form-item label="姓名：" prop="salename">
								<el-input type="text" :disabled="true" v-model="ruleForm1.salename"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="手机号：" prop="phone">
								<el-input type="text" :disabled="true" v-model.number="ruleForm1.salephone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<el-button type="text" @click="dialogFormVisible = true">&nbsp;变更业务员</el-button><font size="1" color="red">（*单个项目）</font>
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

						<!--客户信息上传-->
						<el-col :span="18">
							<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户信息上传：</b> <br/> <br/>
						</el-col>
						<el-col :span="18">
							<el-form-item label="上传身份证照片：" label-width="150px">
								<el-upload :data="data1" :on-success="handlesuccess" :file-list="imgDisplay.idurl" :before-upload="beforeAvatarUpload" action="/list/customer/uploadimage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<!--<el-dialog v-model="dialogVisibles.dialog1" size="tiny">
									<img width="100%" :src="imgUrls.idurl" alt="">
								</el-dialog>-->
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="上传合同照：" label-width="150px">
								<el-upload :before-upload="beforeAvatarUpload" :on-success="handlesuccess" :file-list="imgDisplay.contracturl" :data="data2" action="/list/customer/uploadimage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<!--<el-dialog v-model="dialogVisibles.dialog2" size="tiny">
									<img width="100%" :src="imgUrls.contracturl" alt="">
								</el-dialog>-->
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="上传公司营业执照：" label-width="150px">
								<el-upload :data="data3" :on-success="handlesuccess" :file-list="imgDisplay.licenseurl" :before-upload="beforeAvatarUpload" action="/list/customer/uploadimage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<!--<el-dialog v-model="dialogVisibles.dialog3" size="tiny">
									<img width="100%" :src="imgUrls.licenseurl" alt="">
								</el-dialog>-->
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="上传发票照片：" label-width="150px">
								<el-upload :data="data4" :on-success="handlesuccess" :file-list="imgDisplay.invoiceurl" :before-upload="beforeAvatarUpload" action="/list/customer/uploadimage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<!--	<el-dialog v-model="dialogVisibles.dialog4" size="tiny">
									<img width="100%" :src="imgUrls.invoiceurl" alt="">
								</el-dialog>-->
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label-width="100px">
								<el-button type="success" @click="submitForm1('ruleForm1')">提交</el-button>
								<el-button @click="resetForm('ruleForm1')">取消</el-button>
								<!--<router-link to="/user_list"><el-button style="margin-bottom: 40px;">返回</el-button></router-link>-->
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

				<!--变更业务员对话框-->
				<el-dialog title="变更业务员" size="tiny" :modal='true' :modal-append-to-body='false' :visible.sync="dialogFormVisible">
					<el-form :model="ruleForm2" :rules="rule1" ref="ruleForm2">
						<el-row>
							<el-col :span="22">
								<el-form-item label="姓名：" :label-width="form2LabelWidth" prop="name">
									<el-autocomplete style="width: 100%;" class="inline-input" v-model="ruleForm2.name" placeholder="输入业务员姓名" @select="handleSelect" :fetch-suggestions="querySearchAsync"></el-autocomplete>
								</el-form-item>
							</el-col>
							<el-col :span="22">
								<el-form-item label="手机号：" :label-width="form2LabelWidth" prop="salephone">
									<el-input :disabled="true" v-model="ruleForm2.salephone" placeholder="输入正确的手机号匹配业务员" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="22">
								<el-form-item label="微信号：" :label-width="form2LabelWidth">
									<el-input :disabled="true" v-model="ruleForm2.weixin" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="22">
								<el-form-item label="邮箱：" :label-width="form2LabelWidth">
									<el-input :disabled="true" v-model="ruleForm2.email" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="22">
								<el-form-item label="变更原因：" :label-width="form2LabelWidth">
									<el-input type="textarea" placeholder="填写变更原因" :rows='4' v-model="ruleForm2.explain"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="submitForm2('ruleForm2')">确 定</el-button>
					</div>
				</el-dialog>
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
		name: "add_user",
		data() {
			//手机号码的自定义验证
			var checkPhone = (rule, value, callback) => {
				if(value == '') {
					callback(new Error('请输入手机号码'));
				} else if(isNaN(value)) {
					callback(new Error('请输入数字'));
				} else if(value.toString().length != 11) {
					callback(new Error('手机号码为11位'))
				} else {
					callback()
				}
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
					callback()
				}
			
			};

			var checkDate1 = (rule, value, callback) => {
				if(value == null || value == '') {
					callback(new Error("结束时间不能为空"))
				}else if (value < this.ruleForm1.itembegindate) {
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
						label: '小程序',
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
				ruleForm1: {
					custid: '',
					itemid: '',
					contact: '', //姓名
					phone: '', //手机
					weixin: '', //微信
					email: '', //邮箱
					companyname: '', //公司名称
					companyintro: '', //公司简介
					province: '', //省份
					provincename: '', //省份名
					city: '', //市
					cityname: '', //市名
					area: '', //区
					areaname: '', //区名
					address: null, //详细地址
					salesman: null, //业务员
					itemtype: '', //项目类型
					itemname: '', //项目全称
					idcard: '', //身份证号
					contnum: "", //合同编号
					itembegindate: null, //开始时间
					itemenddate: null, //结束时间
					custstatus: '', //服务状态
					evaluate: '', //评价
					itemrequire: '',
					saleid: '', //制作说明
					salename: '', //业务员姓名	
					salephone: '', //业务员电话	
					saleweixin: '', //业务员微信	
					saleemail: '', //业务员邮箱	
					IDImageUrl: [], //上传身份证图片url
					contractImageUrl: [], //上传合同图片url
					licenseImageUrl: [], //上传营业执照图片url
					invoiceImageUrl: [],
				},
				itemdocUrl: [],
				imgDisplay: {
					idurl: [],
					contracturl: [],
					licenseurl: [],
					invoiceurl: []
				},
				imgUrl: null,
				imgShow: false,
				rule1: {
					name: [{
						required: true,
						message: "名字不能为空",
						trigger: 'change'
					}],
					salephone: [{
						required: true,
						message: "手机号不能为空",
						trigger: 'change'
					}]
				},
				provinces: null, //省份数组
				citys: null, //市份数组
				areas: null,
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
						},
						{
							min: 2,
							max: 5,
							message: '长度在2 到 5 个字符',
							trigger: 'blur'
						}
					],
					phone: [{
						required: true,
						validator: checkPhone,
						trigger: 'blur'
					}],
					itemtype: [{
						required: true,
						message: '请选择项目类型',
						type: 'number',
						trigger: 'change'
					}],
					idcard: [{
						required: true,
						validator: checkID,
						trigger: 'blur'
					}],
					contnum: [{
						required: true,
						message: "请输入合同编号",
						trigger: 'blur'
					}],
					itembegindate: [{
						required: true,
						validator: checkDate,
						trigger: 'change'
					}],
					itemenddate: [{
						required: true,
						validator: checkDate1,
						trigger: 'change'
					}]

				},
				dialogFormVisible: false, //变更业务员对话框显示与否
				form2LabelWidth: '100px', //form2的label宽度
				//form2的label宽度
				ruleForm2: {
					saleid: null,
					name: null, //变更业务员姓名
					weixin: null, //变更业务员微信号
					salephone: null, //变更业务员手机号
					email: null, //变更业务员邮箱
					explain: null, //原因
				},
				//用来存放之前的saleid和custid，以及itemid的内容
				itemid: '',
				custid: '',
				beforesaleid: '',
				pics: [], //用来存放所有获取到的后台图片的对象
				restaurants: [],
				saleManId: false
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.itemid = this.$route.query.itemid;
			this.custid = this.$route.query.custid;
			this.beforesaleid = this.$route.query.saleid;
			this.loadAll();
			this.token={"token":localStorage.CRM_token} ;
			this.data1={"token":localStorage.CRM_token,'imageType':1}
			this.data2={"token":localStorage.CRM_token,'imageType':2}
			this.data3={"token":localStorage.CRM_token,'imageType':3}
			this.data4={"token":localStorage.CRM_token,'imageType':4}
			this.$http.get("/list/customer/update/index", {
				params: {
					token: localStorage.CRM_token,
					itemid: this.itemid
				}
			}).then(function(res) {
				if(res.body.data != null && res.body.code == 100) {

					console.log(res, "=====================>>>>>>>")
					console.log(Number(res.body.data.contact))
					console.log(typeof(Number(res.body.data.contact)))
					console.log(isNaN(Number(res.body.data.city)))
					this.ruleForm1 = res.body.data;
					this.pics = res.body.data.pics;
					this.ruleForm1.IDImageUrl = [];
					this.ruleForm1.contractImageUrl = [];
					this.ruleForm1.licenseImageUrl = [];
					this.ruleForm1.invoiceImageUrl = [];
					this.itemdocUrl = [];
					//图片的回显
					if(this.pics.length > 0.5) {
						for(var i = 0; i < this.pics.length; i++) {
							if(this.pics[i].pictype == 1) {
								this.imgDisplay.idurl.push({
									url: this.pics[i].picurl+"?token="+localStorage.CRM_token,
									uid: this.pics[i].picid
								});
							} else if(this.pics[i].pictype == 2) {
								this.imgDisplay.contracturl.push({
									url: this.pics[i].picurl+"?token="+localStorage.CRM_token,
									uid: this.pics[i].picid
								});

							} else if(this.pics[i].pictype == 3) {
								this.imgDisplay.licenseurl.push({
									url: this.pics[i].picurl+"?token="+localStorage.CRM_token,
									uid: this.pics[i].picid
								});

							} else if(this.pics[i].pictype == 4) {
								this.imgDisplay.invoiceurl.push({
									url: this.pics[i].picurl+"?token="+localStorage.CRM_token,
									uid: this.pics[i].picid
								});
							} else if(this.pics[i].pictype == 5) {
								var url = this.pics[i].picurl;
								var a = [];
								a = url.split("/");
								this.fileList3.push({
									name: a[a.length - 1],
									url: this.pics[i].picurl,
									status: 'finished',
									uid:this.pics[i].picid
								})

							}
						}
					};

					console.log(this.ruleForm1)
					//省市区的解析
					this.Pid = res.body.data.province;
					this.Cid = res.body.data.city;
					this.Aid = res.body.data.area;
				}
			})
			//获取省市区数据
			this.getregion("", "")
		},
		methods: {
			change_salesman() {
				console.log("更改业务员")

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
			changeTime(time) {
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth() + 1;
				var dd = newTime.getDate();
				return(yy + "-" + mm + "-" + dd)
			},
			//表单1提交
			submitForm1(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						//提交对应的内容
						this.$http.post("/list/customer/update/save", {
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
							salesman: this.ruleForm1.salesman, //业务员
							itemtype: this.ruleForm1.itemtype, //项目类型
							itemname: this.ruleForm1.itemname, //项目全称
							idcard: this.ruleForm1.idcard, //身份证号
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
							invoiceImageUrl: this.ruleForm1.invoiceImageUrl, //上
							custid: this.ruleForm1.custid,
							itemid: this.ruleForm1.itemid,
							itemdocUrl: this.itemdocUrl
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body.code == 100) {
								//成功跳转到对应的首页去
								this.$router.push({
									path: "/user_list"
								});
								//触发父组件的刷新数据
								this.$emit('reload', 1);

							} else if(res.body.code == 404) {
								this.$message.error('保存失败，请重试');
							}
						})
						console.log(this.ruleForm1)
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}, //表单提交2
			submitForm2(formName) {
				this.$refs[formName].validate((valid) => {
					console.log("----------11111")
					if(valid) {
						this.$http.post("/list/customer/changeSaleman", {
							token: localStorage.CRM_token,
							custid: this.custid,
							beforesaleid: this.beforesaleid,
							endsaleid: this.ruleForm2.saleid,
							itemid: this.itemid,
							salephone: this.ruleForm2.salephone,
							saleemail: this.ruleForm2.email,
							salename: this.ruleForm2.name,
							saleweixin: this.ruleForm2.weixin,
							changecause: this.ruleForm2.explain
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body.code == 100 && res.body.data != null) {
								var date = res.body.data;
								this.ruleForm1.saleid = date.saleid;
								this.ruleForm1.salename = date.salename;
								this.ruleForm1.salephone = date.salephone;
								this.ruleForm1.saleemail = date.saleemail;
								this.ruleForm1.saleweixin = date.saleweixin;
								this.dialogFormVisible = false;
							} else if(res.body.code == 102) {
								this.$message.error("请求参数异常");
							}

						})
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			//根据用户的输入的手机号，到后台查询
			getSaleman(saleid) {
				//多手机号进行判断
				if(saleid != null) {
					this.$http.get("/list/salesman/findSaleBySaleid", {
						params: {
							token: localStorage.CRM_token,
							saleid: saleid
						}
					}).then(function(res) {
						console.log(res)
						if(res.body.code == 100) {
							if(res.body.data != null) {
								this.ruleForm2.saleid = res.body.data.saleid;
								this.ruleForm2.email = res.body.data.saleemail;
								this.ruleForm2.name = res.body.data.salename;
								this.ruleForm2.salephone = res.body.data.salephone;
								this.ruleForm2.weixin = res.body.data.saleweixin;
								this.saleManId = true;
							} else {
								this.ruleForm2.saleid = '';
								this.ruleForm2.email = '';
								this.ruleForm2.salephone = ''
								this.ruleForm2.weixin = ''
							}
						}
					})
				} else {
					this.ruleForm2.saleid = '';
					this.ruleForm2.email = '';
					this.ruleForm2.salephone = ''
					this.ruleForm2.weixin = ''
				}

			},

			//重置表单
			resetForm(formName) {
				this.$router.push({
					path: "/user_pending_list"
				});
			},
			//当我们移除文件的时候，我们需要移除保存提交到表单里面的数据和删除上传到服务器的图片
			handleRemove(file, fileList) {
				var pic = '';
				var flag = false;
				for(var i = 0; i < this.pics.length; i++) {
					if(this.pics[i].picurl+"?token="+localStorage.CRM_token == file.url) {
						flag = true;
						pic = this.pics[i]
					}
				}

				if(flag) {
					//根据file.uid假删除图片
					this.$http.get("/list/customer/deleteImage", {
						params: {
							token: localStorage.CRM_token,
							picid: file.uid
						}
					}).then(function(res) {
				
					});
				} else {
					if(file.url != null) {
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

						})
					}
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
							this.ruleForm1.IDImageUrl.push(url);
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
				this.imgUrl = imageurl;
				console.log(this.imgUrl);
				this.imgShow = true;
				/*if(type == 1) {
					this.dialogVisibles.dialog1 = true;
					this.imgUrls.idurl = imageurl;
				} else if(type == 2) {
					this.dialogVisibles.dialog2 = true;
					this.imgUrls.contracturl = imageurl;
				} else if(type == 3) {
					this.dialogVisibles.dialog3 = true;
					this.imgUrls.licenseurl = imageurl;
				} else if(type == 4) {
					this.dialogVisibles.dialog4 = true;
					this.imgUrls.invoiceurl = imageurl;
				}*/

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
				if(fileext == '.doc' || fileext == '.docx' || (fileext == '.pdf' || fileext == '.xls') || (fileext == '.xlsx')) {
					isJPG = true;
				}

				if(!isJPG) {
					this.$message.error('只能上传word、pdf、ececl格式!');
				}
				return isJPG;
			},
			//
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

			}, //用于添加页面的删除 ，为
			handleRemove1(file) {
				//用来判断是真删除还是假删除
				console.log("--------------")
				console.log(file)
				console.log(this.itemdocUrl)
				var flag=false
				for (var i = 0; i < this.itemdocUrl.length; i++) {
					if(this.itemdocUrl[i]==file.response.data.docurl){
						flag=true;
					}
					
				}
				//如果flag等于
				if(flag){
					if(file.response.data != null && file != null) {
						var docname = file.response.data.docname;
						var url = file.response.data.docurl;
						//同时删除ruleForm1.itemdocUrl中的数据
						this.deleteData(this.itemdocUrl, url)
						//删除服务器中的图片
						this.$http.get("/list/customer/realdelete", {
							params: {
								token: localStorage.CRM_token,
								imageName: url
							}
						}).then(function(res) {
							console.log("查询数据")
							console.log(this.itemdocUrl)
						})
					}
				}else {
					//根据file.uid假删除图片
					this.$http.get("/list/customer/deleteImage", {
						params: {
							token: localStorage.CRM_token,
							picid: file.uid
						}
					}).then(function(res) {
				
					});
					
				}
				
				
			},
			//上传图片成功后的内容
			handlesuccess1(response, file, fileList) {
				console.log()
				//上传成功将url存放到ruleForm1.itemdocUrl
				if(response != null) {
					if(response.code == 100 && response.data != null) {
						var url = response.data.docurl;
						this.itemdocUrl.push(url);
						file.url=url;
						console.log(this.itemdocUrl);
					}
					if(response.code == 102) {
						this.$message({
							message: '文件不能为空',
							type: 'warning'
						});
						for(var i = 0; i < fileList.length; i++) {
							console.log(file.name)
							console.log(fileList[i].name)
							if(file.name == fileList[i].name) {
								fileList.splice(i);
							}

						}

					}
				}

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
			'ruleForm1.provincename' (newVal, oldVal) {
				console.log(newVal, oldVal)
				this.getregion(newVal, 2)
			},
			'ruleForm1.cityname' (newVal, oldVal) {
				console.log(newVal, oldVal)
				this.getregion(newVal, 3)
			},
			'ruleForm2.name' (newVal, oldVal) {
				//console.log(newVal)
				//console.log(this.restaurants)
				/*	var id = null;
					for (var i=0; i<this.restaurants.length; i++) {
						if (this.restaurants[i].salename==newVal) {
							id = this.restaurants[i].saleid;
						}
					}*/
				if(!this.saleManId) {
					this.ruleForm1.saleid = '';
					this.ruleForm2.email = '';
					this.ruleForm2.salephone = ''
					this.ruleForm2.weixin = ''
				}
				this.saleManId = false;
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
	
	.user_info {
		padding: 20px;
		background: white;
		border-radius: 5px;
		/*更改选择框宽度*/
		.el-select {
			width: 100%;
		}
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
	}
</style>