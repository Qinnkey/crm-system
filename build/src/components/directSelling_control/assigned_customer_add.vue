<template>
	<div class="add_user">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写用户信息-->
			<div class="user_info">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
					<el-row>
						<el-col :span="9">
							<el-form-item label="姓名：" prop="name">
								<el-input type="text" v-model="ruleForm1.name" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="手机号：" prop="phone">
								<el-input type="tel" v-model.number="ruleForm1.phone" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="微信号：">
								<el-input type="number" v-model.number="ruleForm1.weixin"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="邮箱：">
								<el-input type="email" v-model="ruleForm1.email"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="公司名称：">
								<el-input type="text" v-model="ruleForm1.companyName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="企业简介：">
								<el-input type="text" v-model="ruleForm1.companyInfo"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="地址：">
								<el-row :gutter="0">
									<el-col :span="8">
										<el-select v-model="ruleForm1.province" placeholder="请选择省份">
											<el-option label="区域一" value="shanghai"></el-option>
											<el-option label="区域二" value="beijing"></el-option>
										</el-select>
									</el-col>
									<el-col :span="8">
										<el-select v-model="ruleForm1.city" placeholder="请选择市">
											<el-option label="区域一" value="shanghai"></el-option>
											<el-option label="区域二" value="beijing"></el-option>
										</el-select>
									</el-col>
									<el-col :span="8">
										<el-select v-model="ruleForm1.country" placeholder="请选择区">
											<el-option label="区域一" value="shanghai"></el-option>
											<el-option label="区域二" value="beijing"></el-option>
										</el-select>
									</el-col>
								</el-row>
							</el-form-item>
						</el-col>
						<!--<el-col :span="9">
							<el-form-item label="业务员：">
								<el-input type="text" v-model="ruleForm1.salesman"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<el-button type="text" @click="dialogFormVisible = true">&nbsp;变更业务员</el-button>
						</el-col>-->
						<el-col :span="9">
							<el-form-item label="详细地址：" prop="address">
								<el-input type="text" v-model="ruleForm1.address"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="项目类型：" prop="itemType">
								<el-select v-model="ruleForm1.itemType" placeholder="请选择">
									<el-option v-for="item in itemTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="项目全称：">
								<el-input type="text" v-model="ruleForm1.itemName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="身份证：" prop="IDNum">
								<el-input type="text" v-model="ruleForm1.IDNum"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="生日：">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.birthday" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="开始时间：">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.startTime" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="结束时间：">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.endTime" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="服务状态：">
								<el-select v-model="ruleForm1.status" placeholder="请选择">
									<el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="评价：">
								<el-radio-group v-model="ruleForm1.appraisal">
								    <el-radio-button v-for="item in appraisals" :label="item" :key="item"></el-radio-button>
	 							</el-radio-group>
							</el-form-item>
						</el-col>

						<!--制作要求-->
						<el-col :span="18">
							<b>制作要求  参考/说明/需求：</b> <br/> <br/>
						</el-col>
						<el-col :span="18">
							<el-form-item label-width="100px">
								<el-input type="textarea" placeholder="填写客户提交的附加资料，及需求描述" :rows='5' v-model="ruleForm1.explain"></el-input>
							</el-form-item>
						</el-col>

						<!--业务员信息-->
						<el-col :span="18">
							<b>业务员信息：</b> <br/> <br/>
						</el-col>
						<el-col :span="9">
							<el-form-item label="手机号：">
								<el-input type="text" v-model.number="ruleForm1.salesmanPhone" placeholder="输入手机号搜索对应业务员信息"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="姓名：">
								<el-input type="text" :disabled="true" v-model="ruleForm1.salesmanName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="微信号：">
								<el-input type="text" :disabled="true" v-model.number="ruleForm1.salesmanWeixin"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="邮箱：">
								<el-input type="text" :disabled="true" v-model="ruleForm1.salesmanEmail"></el-input>
							</el-form-item>
						</el-col>

						<!--客户信息上传-->
						<el-col :span="18">
							<b>客户信息上传：</b> <br/> <br/>
						</el-col>
						<el-col :span="18">
							<el-form-item label="上传身份证照片：" label-width="150px">
								<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog v-model="ruleForm1.dialogVisible" size="tiny">
									<img width="100%" :src="ruleForm1.IDImageUrl" alt="">
								</el-dialog>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="上传合同照：" label-width="150px">
								<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog v-model="ruleForm1.dialogVisible" size="tiny">
									<img width="100%" :src="ruleForm1.contractImageUrl" alt="">
								</el-dialog>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="上传公司营业执照：" label-width="150px">
								<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog v-model="ruleForm1.dialogVisible" size="tiny">
									<img width="100%" :src="ruleForm1.licenseImageUrl" alt="">
								</el-dialog>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="上传发票照片：" label-width="150px">
								<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog v-model="ruleForm1.dialogVisible" size="tiny">
									<img width="100%" :src="ruleForm1.invoiceImageUrl" alt="">
								</el-dialog>
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
				<!--变更业务员对话框-->
				<el-dialog title="变更业务员" size="tiny" :modal='true' :modal-append-to-body='false' :visible.sync="dialogFormVisible">
					<el-form :model="ruleForm2">
						<el-row>
							<el-col :span="22">
								<el-form-item label="姓名：" :label-width="form2LabelWidth">
									<el-input v-model="ruleForm2.name" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="22">
								<el-form-item label="微信号：" :label-width="form2LabelWidth">
									<el-input v-model="ruleForm2.weixin" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="22">
								<el-form-item label="手机号：" :label-width="form2LabelWidth">
									<el-input v-model="ruleForm2.phone" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="22">
								<el-form-item label="邮箱：" :label-width="form2LabelWidth">
									<el-input v-model="ruleForm2.email" auto-complete="off"></el-input>
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
						<el-button type="primary" @click="submitForm2">确 定</el-button>
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
				//console.log(typeof(value))
				if(value==''){
					callback(new Error('请输入手机号码'));
				}else if(!Number.isInteger(value)){
					callback(new Error('请输入数字'));
				}else if(value.toString().length<11){
					callback(new Error('手机号码为11位'))
				}else{
					callback()
				}
			};
			//身份证验证
			var checkID = (rule, value, callback) =>{
				var exp = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
				if (!exp.test(value)) {
					callback(new Error('输入的身份证号有误'))
				}else{
					callback()
				}
			};
			return {
				itemTypes:[
					{label:'企业版', value: 1},
					{label: '门户版', value:2},
					{label: '电商版',value:3},
					{label: '微商app',value:4},
					{label: '小程序',value:5},
					{label: '阿凡提',value:6},
					{label: '汇搜云',value:7}
				],
				status_options: [
					{label:'优', value: 1},
					{label: '良', value:2}
				],								//状态选项
				appraisals: ['差','一般','好'],	//评价
				ruleForm1: {
					name     : '',				//姓名
					phone    : '',				//手机
					weixin   : '',				//微信
					email    : '',				//邮箱
					companyName: '',			//公司名称
					companyInfo: '',			//公司简介
					province : '',				//省份
					city     : '',				//市
					country  : '',				//区
					address  : null,			//详细地址
					salesman : null,			//业务员
					itemType : '',				//项目类型
					itemName : '',				//项目全称
					IDNum    : '',				//身份证号
					birthday : null,			//生日
					startTime: '',				//开始时间
          			endTime  : '',				//结束时间
          			status   : null,			//服务状态
          			appraisal: '好',				//评价
          			explain  : null,			//制作说明
          			salesmanName  : null,		//业务员姓名
          			salesmanPhone : null,		//业务员电话
          			salesmanWeixin: null,		//业务员微信
          			salesmanEmail : null,		//业务员邮箱
          			IDImageUrl    : null,		//上传身份证图片url
          			contractImageUrl: null,		//上传合同图片url
          			licenseImageUrl : null,		//上传营业执照图片url
          			invoiceImageUrl : null,		//上传身份证图片url
        			dialogVisible   : false,	//上传框显示与否
				},
				rules: {
					name: [
						{required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在2 到 5 个字符', trigger: 'blur'}
					],
					phone: [
						{required: true, validator: checkPhone, trigger: 'blur' },
					],
					itemType:[
						{required: true, message: '请选择项目类型',type: 'number', trigger: 'change' }
					],
					IDNum: [
						{required: true, validator: checkID, trigger: 'blur'}
					]
				},
				dialogFormVisible: false,		//变更业务员对话框显示与否
				form2LabelWidth: '100px',		//form2的label宽度
				ruleForm2: {
					name   : null,				//变更业务员姓名
					weixin : null,				//变更业务员微信号
					phone  : null,				//变更业务员手机号
					email  : null,				//变更业务员邮箱
					explain: null,				//变更业务员原因
				}
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
//			this.petname = localStorage.CRM_petname;
		},
		methods: {
			change_salesman(){
				console.log("更改业务员")
			},
			//表单1提交
			submitForm1(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						console.log(this.ruleForm1)

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			//图片文件列表移除文件时的钩子
			handleRemove(file, fileList) {
        		console.log(file, fileList);
      		},
      		//通过 file.response 拿到服务端返回数据
      		handlePictureCardPreview(file) {
      			console.log(file)
        		this.dialogVisible = true;
      		},
      		//表单2提交(更改业务员)
      		submitForm2(){
      			this.dialogFormVisible = false;
      			console.log(this.ruleForm2)
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
        if (newVal[2].childList[1].map.addBtn == 0) {
          this.$router.push({path: "/login"})
        }
      }
		}
	}
</script>

<style lang="less" scoped="scoped">
	.user_info{
		background: white;
		padding-top: 30px;
		padding-left: 30px;
		border: 1px solid #CCCCCC;
		border-radius: 5px;
		b{
			display: inline-block;
			margin-left: 20px;
		}
	}
	/*更改按钮颜色*/
	.el-button--success{
		background: #2EB398;
		border-color: #2EB398;
	}
	/*更改选择框宽度*/
	.el-select{width: 100%;}
</style>
