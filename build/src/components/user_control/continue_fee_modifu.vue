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
							<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.itembegindate" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="9">
						<el-form-item label="结束时间：" prop="itemenddate">
							<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.itemenddate" style="width: 100%;"></el-date-picker>
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
						<el-form-item label="手机号：" prop="salephone">
							<el-input type="text" :disabled="true" v-model.number="ruleForm1.salephone" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="2">
						<el-button type="text" @click="dialogFormVisible = true">&nbsp;变更业务员</el-button>
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
							<el-upload :data="{'imageType':1}" :on-success="handlesuccess"  :file-list="imgDisplay.idurl" :before-upload="beforeAvatarUpload" action="/list/customer/uploadimage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
								<i class="el-icon-plus"></i>
							</el-upload>
							<!--<el-dialog v-model="dialogVisibles.dialog1" size="tiny">
								<img width="100%" :src="imgUrls.idurl" alt="">
							</el-dialog>-->
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="上传合同照：" label-width="150px">
							<el-upload :before-upload="beforeAvatarUpload" :on-success="handlesuccess" :file-list="imgDisplay.contracturl"   :data="{'imageType':2}" action="/list/customer/uploadimage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
								<i class="el-icon-plus"></i>
							</el-upload>
							<!--<el-dialog v-model="dialogVisibles.dialog2" size="tiny">
								<img width="100%" :src="imgUrls.contracturl" alt="">
							</el-dialog>-->
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="上传公司营业执照：" label-width="150px">
							<el-upload :data="{'imageType':3}" :on-success="handlesuccess" :file-list="imgDisplay.licenseurl"  :before-upload="beforeAvatarUpload" action="/list/customer/uploadimage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
								<i class="el-icon-plus"></i>
							</el-upload>
							<!--<el-dialog v-model="dialogVisibles.dialog3" size="tiny">
								<img width="100%" :src="imgUrls.licenseurl" alt="">
							</el-dialog>-->
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="上传发票照片：" label-width="150px">
							<el-upload :data="{'imageType':4}" :on-success="handlesuccess" :file-list="imgDisplay.invoiceurl"  :before-upload="beforeAvatarUpload" action="/list/customer/uploadimage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
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
						<img :src="imgUrl"/>
					</div>
				</div>

				<!--变更业务员对话框-->
				<el-dialog title="变更业务员" size="tiny" :modal='true' :modal-append-to-body='false' :visible.sync="dialogFormVisible">
					<el-form :model="ruleForm2"  :rules="rule1" ref="ruleForm2">
						<el-row>

							<el-col :span="22">
								<el-form-item label="姓名：" :label-width="form2LabelWidth"  prop="name">
									<el-autocomplete class="inline-input" v-model="ruleForm2.name"  placeholder="输入业务员姓名"  @select="handleSelect"  :fetch-suggestions="querySearchAsync"></el-autocomplete>
								</el-form-item>
							</el-col>
							<el-col :span="22">
								<el-form-item label="手机号：" :label-width="form2LabelWidth" prop="phone">
									<el-input  v-model="ruleForm2.phone"   placeholder="输入正确的手机号匹配业务员" auto-complete="off"></el-input>
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
				} else if(value.toString().length < 11) {
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
				value = value ? this.changeTime(value) : '';
				var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
				console.log(value)
				var r = value.match(reg);
				if(r == null) {
					callback(new Error("格式错误")); //请将“日期”改成你需要验证的属性名称!
				} else {
					callback()
				}
			};

			var checkDate1 = (rule, value, callback) => {
				if(value == null || value == '') {
					callback(new Error("结束时间不能为空"))
				} else {
					callback()
				}

				value = value ? this.changeTime(value) : '';
				var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
				var r = value.match(reg);
				if(r == null) {
					callback(new Error("格式错误")); //请将“日期”改成你需要验证的属性名称!
				} else {
					callback()
				}
			};

			return {

				itemTypes: [
					{label:'企业版', value: 1},
					{label: '门户版', value:2},
					{label: '电商版',value:3},
					{label: '微商app',value:4},
					{label: '小程序',value:5},
					{label: '阿凡提',value:6},
					{label: '汇搜云',value:7}
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
					saleid: '', //业务员的id
					salename: '', //业务员姓名
					salephone: '', //业务员电话
					saleweixin: '', //业务员微信
					saleemail: '', //业务员邮箱
					IDImageUrl: [], //上传身份证图片url
					contractImageUrl: [], //上传合同图片url
					licenseImageUrl: [], //上传营业执照图片url
					invoiceImageUrl: [],
					custid:'',
					itemid:''
				},
				/*imgUrls: {
					idurl: "",
					contracturl: "",
					licenseurl: "",
					invoiceurl: ""
				},
				dialogVisibles: {
					dialog1: false,
					dialog2: false,
					dialog3: false,
					dialog4: false
				},*/

				imgDisplay: {
					idurl: [],
					contracturl: [],
					licenseurl: [],
					invoiceurl: []
				},
				imgUrl : null,
				imgShow: false,
				rule1:{
					name:[{
					required:true,
					message:"名字不能为空",
					trigger:'change'
				}],
					phone:[{
						required:true,
						message:"手机号不能为空",
						trigger:'change'
					}]
				}
				,
				provinces: null,		//省份数组
				citys    : null,		//市份数组
				areas    : null,
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
					salephone: [{
						required: true,
						validator: checkPhone,
						trigger: 'blur'
					}],
					phone: [
						{required: true, validator: checkPhone, trigger: 'change' }
					],

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
					saleid:null,
					name: null, //变更业务员姓名
					weixin: null, //变更业务员微信号
					phone: null, //变更业务员手机号
					email: null, //变更业务员邮箱
					explain: null, //原因
				},
				//用来存放之前的saleid和custid，以及itemid的内容
				itemid:'',
				custid:'',
				beforesaleid:'',
				pics:[],//用来存放所有获取到的后台图片的对象
				restaurants:[]
			}
		},
		components: {
			top_component,
			nav_left_component,
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.itemid=this.$route.query.itemid;
			this.custid=this.$route.query.custid;
			this.beforesaleid=this.$route.query.saleid;
			this.loadAll();
			this.$http.get("/list/customer/update/index",{
				params:{
					token  : localStorage.CRM_token,
					itemid:this.itemid
				}
			}).then(function(res){
				if(res.body.data!=null&&res.body.code==100){
					console.log(res)
					this.ruleForm1=res.body.data;
					this.pics=res.body.data.pics;
					this.ruleForm1.IDImageUrl=[];
					this.ruleForm1.contractImageUrl=[];
					this.ruleForm1.licenseImageUrl=[];
					this.ruleForm1.invoiceImageUrl=[];
					//图片的回显
					if(this.pics.length>0.5){
						for (var i = 0; i < this.pics.length; i++) {
							if(this.pics[i].pictype==1){
								this.imgDisplay.idurl.push({url:this.pics[i].picurl,uid:this.pics[i].picid});
							}else if(this.pics[i].pictype==2){
								this.imgDisplay.contracturl.push({url:this.pics[i].picurl,uid:this.pics[i].picid});

							}else if(this.pics[i].pictype==3){
								this.imgDisplay.licenseurl.push({url:this.pics[i].picurl,uid:this.pics[i].picid});

							}else if(this.pics[i].pictype==4){
								this.imgDisplay.invoiceurl.push({url:this.pics[i].picurl,uid:this.pics[i].picid});
							}
						}
					};

					//省市区的解析
					this.Pid = res.body.data.province;
					this.Cid = res.body.data.city;
					this.Aid = res.body.data.area;

//					this.getRegionName(1, "", 1)
//					this.getRegionName(2, this.Pid, 2)
//					this.getRegionName(2, this.Cid, 3)
				}
			})
			//获取省市区数据
			this.getregion("", "")

		},
		methods: {
			change_salesman() {
				console.log("更改业务员")

			},
//			getRegionName(flag, id, type){
//				this.$http.get("/list/customer/getregion",{
//					params:{
//						flag    : flag,
//						regionId: id
//					}
//				}).then(function(res){
//					console.log(res)
//					for (var i=0; i<res.body.data.length; i++) {
//						if(type==1){
//							this.provinces = res.body.data;
//							if (this.ruleForm1.province==res.body.data[i].id) {
//								this.ruleForm1.province = res.body.data[i].name;
//							}
//						}else if(type==2){
//							this.citys = res.body.data;
//							if (this.ruleForm1.city==res.body.data[i].id) {
//								this.ruleForm1.city = res.body.data[i].name;
//							}
//						}else{
//							this.areas = res.body.data;
//							if (this.ruleForm1.area==res.body.data[i].id) {
//								this.ruleForm1.area = res.body.data[i].name;
//							}
//						}
//					}
//				})
//			},
			//省市区的数据请求
		    getregion(questid, classify){
		    	//不是省市区id的不发送请求
		    	if (isNaN(Number(questid))) return false;
		    	this.$http.get('/list/customer/getregion',{
  					params: {
  						token  : localStorage.CRM_token,
  						flag: 2,
  						regionId: questid
  					}
  				}).then(function(res){
  					if (res.body.code==100) {
	  					if (classify==2) {
							this.citys = res.body.data;
							this.ruleForm1.cityname = null;
	  					}else if(classify==3){
	  						this.areas = res.body.data;
	  						this.ruleForm1.areaname = null;
	  					}else{
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
				console.log("-------------"+this.ruleForm1.saleid)
				this.$refs[formName].validate((valid) => {
					if(valid) {
						//提交对应的内容
						this.$http.post("/list/customer/update/save", {
							token  : localStorage.CRM_token,
							contact: this.ruleForm1.contact, //姓名
							phone  : this.ruleForm1.phone, //手机
							weixin : this.ruleForm1.weixin, //微信
							email  : this.ruleForm1.email, //邮箱
							companyname : this.ruleForm1.companyname, //公司名称
							companyintro: this.ruleForm1.companyintro, //公司简介
							province : isNaN(Number(this.ruleForm1.provincename))?this.Pid:this.ruleForm1.provincename, //省份
							city     : isNaN(Number(this.ruleForm1.cityname))?this.Cid:this.ruleForm1.cityname, //市
							area     : isNaN(Number(this.ruleForm1.areaname))?this.Aid:this.ruleForm1.areaname, //区
							address  : this.ruleForm1.address, //详细地址
							salesman : this.ruleForm1.salesman, //业务员
							itemtype : this.ruleForm1.itemtype, //项目类型
							itemname : this.ruleForm1.itemname, //项目全称
							idcard   : this.ruleForm1.idcard, //身份证号
							contnum  : this.ruleForm1.contnum, //合同编号
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
							invoiceImageUrl: this.ruleForm1.invoiceImageUrl ,//上
							custid:this.ruleForm1.custid,
							itemid:this.ruleForm1.itemid
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body.code == 100) {
								//成功跳转到对应的首页去
								this.$router.push({
									path: "/continue_fee"
								});
							this.$router.go(0)
							} else if(res.body.code == 404) {
								this.$message.error('保存失败，请重试');
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},//表单提交2
			submitForm2(formName){
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http.post("/list/customer/changeSaleman",{
								token  : localStorage.CRM_token,
								custid:this.custid,
								beforesaleid:this.beforesaleid,
								endsaleid:this.ruleForm2.saleid,
								itemid:this.itemid,
								salephone:this.ruleForm2.phone,
								saleemail:this.ruleForm2.email,
								salename:this.ruleForm2.name,
								saleweixin:this.ruleForm2.weixin,
								changecause:this.ruleForm2.explain
						},{
							emulateJSON: true
						}).then(function(res){
								if(res.body.code==100&&res.body.data!=null){
									var date=res.body.data;
									this.ruleForm1.saleid=date.saleid;
									this.ruleForm1.salename=date.salename;
									this.ruleForm1.salephone=date.salephone;
									this.ruleForm1.saleemail=date.saleemail;
									this.ruleForm1.saleweixin=date.saleweixin;
									this.dialogFormVisible = false;
								}

						})
					}else{
						console.log('error submit!!');
						return false;
					}
				})
			},
			//根据用户的输入的手机号，到后台查询
			getSaleman(saleid){
				//多手机号进行判断
				if(saleid!=null){
					this.$http.get("/list/salesman/findSaleBySaleid",{
					params:{
						token  : localStorage.CRM_token,
						saleid:saleid
					}
				}).then(function(res){
					if(res.body.code==100){
						if(res.body.data!=null){
							this.ruleForm2.saleid=res.body.data.saleid;
							this.ruleForm2.email=res.body.data.saleemail;
							this.ruleForm2.name=res.body.data.salename;
							this.ruleForm2.phone=res.body.data.salephone;
							this.ruleForm2.weixin=res.body.data.saleweixin
						}else{
							this.ruleForm2.saleid='';
							this.ruleForm2.email='';
							this.ruleForm2.name=''
							this.ruleForm2.weixin=''
						}
					}
					})
				}else{
					this.ruleForm2.saleid='';
					this.ruleForm2.email='';
					this.ruleForm2.name=''
					this.ruleForm2.weixin=''
				}

			},

			//重置表单
			resetForm(formName) {
					this.$router.push({path: "/continue_fee"});
			},
			//当我们移除文件的时候，我们需要移除保存提交到表单里面的数据和删除上传到服务器的图片
			handleRemove(file, fileList) {
				var pic='';
				var flag=false;
				for (var i = 0; i < this.pics.length; i++) {
					if(this.pics[i].picurl==file.url){
						flag=true;
						pic=this.pics[i]
					}
				}

				if(flag){
						//根据file.uid假删除图片
						this.$http.get("/list/customer/deleteImage",{
							params:{
								token  : localStorage.CRM_token,
								picid:file.uid
							}
						}).then(function(res){
						/*	if(res.body.code==100){
								if(pic.pictype==1){
									this.deleteData(this.ruleForm1.IDImageUrl, file.url);
									console.log("111111111"+this.ruleForm1.IDImageUrl.toString());
								}else if(pic.pictype==2){
									this.deleteData(this.ruleForm1.contractImageUrl, file.url);
									console.log("2222222222222"+this.ruleForm1.contractImageUrl.toString());
								}else if(pic.pictype==3){
									this.deleteData(this.ruleForm1.licenseImageUrl, file.url);
									console.log("33333333333333"+this.ruleForm1.licenseImageUrl.toString());
								}else if(pic.pictype==4){
									this.deleteData(this.ruleForm1.invoiceImageUrl, file.url);
									console.log("444444444444444"+this.ruleForm1.invoiceImageUrl.toString());
								}
							}*/
						});
				}else{
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
								token  : localStorage.CRM_token,
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
				hideBoard(){
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
			querySearchAsync(queryString, cb) {
		        var restaurants = this.restaurants;
		        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
		          cb(results);
		      },
		      createStateFilter(queryString) {
		        return (state) => {
		          return (state.value.indexOf(queryString.toLowerCase()) === 0);
		        };
		      },
		      handleSelect(item) {
		      	this.getSaleman(item.saleid)
		      },
		      loadAll(){
        		this.$http.get("/list/salesman/findSaleAll?token="+localStorage.CRM_token).then(function(res){
				    //加载json对象
	         		this.restaurants = res.body.data;
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
        if (newVal[0].childList[3].map.updateFun == 0) {
          this.$router.push({path: "/login"})
        }
      }
		},
		watch: {
			'ruleForm1.provincename'(newVal, oldVal){
				console.log(newVal, oldVal)
				this.getregion(newVal, 2)
			},
			'ruleForm1.cityname'(newVal, oldVal){
				console.log(newVal, oldVal)
				this.getregion(newVal, 3)
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

		.showImg{
		.showImgBoard{
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: rgba(0,0,0,.5);
			z-index: 100;
		}
		.imgItem{
			padding: 10px;
			width: 500px;
			height: auto;
			background: white;
			border-radius: 5px;
			top: 150px;
			left: calc(~"50% - 250px");
			z-index: 101;
			align-items: center;
			img{
				width: 100%;
				max-height: 500px;
			}
		}
	}
</style>
