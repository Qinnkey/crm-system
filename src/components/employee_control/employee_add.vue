<template>
	<div class="add_employee">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写员工信息-->
			<div class="table_list">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="160px" class="demo-ruleForm">
					<el-row>
						<el-col :span="9">
							<el-form-item label="姓名：" prop="empname">
								<el-input type="text" v-model="ruleForm1.empname" auto-complete="off" ></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="手机号：" prop="empphone">
								<el-input type="tel" v-model.number="ruleForm1.empphone" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="身份证：" prop="empidcard">
								<el-input type="text" v-model="ruleForm1.empidcard" ></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="生日：">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.birthday" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="微信号：">
								<el-input type="text" v-model.number="ruleForm1.empweixin"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="qq号：">
								<el-input type="text" v-model="ruleForm1.empqq"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="邮箱：" prop="empemail">
								<el-input type="email" v-model="ruleForm1.empemail"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="入职时间：">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.entrydate" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="职务："prop="duty">
								<el-input type="text" v-model="ruleForm1.duty"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="地址："prop="address">
								<el-input v-model="ruleForm1.address"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="籍贯："prop="nativeplace">
								<el-input type="text" v-model="ruleForm1.nativeplace"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="紧急联系人："prop="urgentcont">
								<el-input type="text" v-model="ruleForm1.urgentcont"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="紧急联系人手机号："prop="urgentcontphone">
								<el-input type="tel" v-model.number="ruleForm1.urgentcontphone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
			              <el-form-item label="角色：" prop="roleid">
			                <el-select v-model="ruleForm1.roleid">
			                  <el-option v-for="item in rolelist" :key="item.roleid" :label="item.rolename"
			                             :value="item.roleid"></el-option>
			                </el-select>
			              </el-form-item>
			            </el-col>
						<el-col :span="9">
							<el-form-item label="部门："prop="duty">
								<el-cascader :change-on-select=true :options="deps" v-model="selectedOptions3" @change="handleChange"></el-cascader>
							</el-form-item>
						</el-col>
						
						<el-col :span="9">
							<el-form-item label="岗位："prop="duty">
								<el-select v-model="ruleForm1.postid" placeholder="" @change="selectChange">
								    <el-option v-for="item in posts" :key="item.value" :label="item.label" :value="item.value">
								    </el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="18">
							<el-form-item label="备注："prop="empremark">
								<el-input type="textarea" :rows='5' v-model="ruleForm1.empremark"></el-input>
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
		name: "add_employee",
		data() {

			//紧急联系人手机号码的自定义验证
			var checkUrgPhone = (rule, value, callback) => {
				var value = Number(value);
//				console.log(typeof(value), value)		
				if(value){
					if(!Number.isInteger(value)){
						callback(new Error('请输入数字'));
					}else if(value.toString().length != 11){
						callback(new Error('手机号码为11位'))
					}else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){
						callback(new Error('手机号格式不对'))
				    }else if(this.ruleForm1.empphone == this.ruleForm1.urgentcontphone){
						callback(new Error('员工手机号和紧急联系人手机号不能重复'))
					}else{
						callback();
					}}else{
						callback();
					}
			};
			//手机号码的自定义验证
			var checkPhone = (rule, value, callback) => {
				var value = Number(value);
//				console.log(typeof(value), value)
				if(value==''){
					callback(new Error('请输入手机号码'));
				}else if(!Number.isInteger(value)){
					callback(new Error('请输入数字'));
				}else if(value.toString().length != 11){
					callback(new Error('手机号码为11位'))
				}else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){
					callback(new Error('手机号格式不对'))
				}else if(this.phonelist.indexOf(value.toString()) > -1){
					callback(new Error('手机号已存在'))
				}else{
					callback();
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
			//邮箱验证
			var checkEmail = (rule, value, callback) =>{
				var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				if (value) {
					if (!reg.test(value)){
						callback(new Error('输入的邮箱格式有误'))
					}else{
						callback();
					}
				}else{
					callback();
				}
			};
			return {
				//部门
				deps:[],
				posts:[],
				selectedOptions3:[],
				rolelist: [],
				phonelist:[],
				//时间选择限定
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				status_options: [
					{label: '在岗', value: 1},
					{label: '离职', value: 2},
					{label: '出差', value: 3},
					{label: '请假', value: 4}
				],								            //员工状态选项
				ruleForm1: {
					empname     : '',				//姓名
					empphone    : '',				//手机
					empidcard    : '',				//身份证号
					birthday : null,			        //生日
					empweixin   : '',				   //微信
					empqq : '',                       //qq号
					empemail    : '',				   //邮箱
					entrydate: new Date(),				   //入职时间
					duty : '',                           //职务
					address  : '',				       //地址
					nativeplace : '',                //籍贯
					empstatus : '在岗',                 //员工状态
					urgentcont : '',                //紧急联系人
					urgentcontphone : '',      //紧急联系人手机号
					empremark : '',               //备注
//					depid : '',                        //部门ID
					postid : '',                        //部门ID
					createby : '',                   //创建人
					roleid: '',
				},
				rules: {
					empname: [
						{required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 16, message: '长度在2 到 16 个字符', trigger: 'blur'}
					],
					urgentcontphone: [
						{required: false, validator: checkUrgPhone, trigger: 'blur'}
					],
					empphone: [
						{required: true, validator: checkPhone, trigger: 'blur' },
					],
					/*empidcard: [
						{required: true, validator: checkID, trigger: 'blur'}
					],*/
					empemail: [
						{required: false, validator: checkEmail, trigger: 'blur'}
					],
					urgentcont: [
						{required: false, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 16, message: '长度在2 到 16 个字符', trigger: 'blur'}
					],
			        roleid: [
			          {required: true, message: '请选择角色', trigger: 'change', type: 'number'}
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
			
			//初始化部门树
			this.cascadervalue();
			//角色选择
			this.roleChoosed();
			//员工手机号获取
			this.phoneList();
		},
		methods: {
			phoneList(){
				this.$http.get('/list/employee/findAll', {
	            params: {
	              	token: localStorage.CRM_token,
	            }
	          }
	       ).then(function (res) {
	          console.log(res)
	          if (res != null && res.body.data != null && res.body.data.length > 0){		  
	          			var result = res.body.data;
			          //保存员工手机号
			          for (var i = 0; i < result.length; i++) {
			            this.phonelist[i] = result[i].empphone;
			          }
	          }else{
	          	this.phonelist = [];
	          }
	        })	
			},
			roleChoosed(){
				this.$http.post('/list/role/list', {"token": localStorage.CRM_token,}, {emulateJSON: true}).then(function (res) {
          		var json = res.body.data;
          		//加载json对象，如果是json字符串要eval()转成json对象
          		this.rolelist = json;
        	})
			},
			selectChange(value){
				this.postid=value.substr(0,value.indexOf(','));	
			},
			clear(){
				this.options=[];
				this.postid=0;
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
							this.$http.post('/list/employee/save',{
								token: localStorage.CRM_token,
								empname: this.ruleForm1.empname,
								empphone: this.ruleForm1.empphone,
								empidcard: this.ruleForm1.empidcard,
								empweixin: this.ruleForm1.empweixin,
								empemail  : this.ruleForm1.empemail,
								empqq: this.ruleForm1.empqq,
								entrydate: this.ruleForm1.entrydate?this.changeTime(this.ruleForm1.entrydate):'',
								birthday: this.ruleForm1.birthday?this.changeTime(this.ruleForm1.birthday):'',
								duty: this.ruleForm1.duty,
								address: this.ruleForm1.address,
								nativeplace: this.ruleForm1.nativeplace,
//								empstatus: this.changeStatus(this.ruleForm1.empstatus),
								urgentcont: this.ruleForm1.urgentcont,
								urgentcontphone: this.ruleForm1.urgentcontphone,
								empremark: this.ruleForm1.empremark,
								roleid:this.ruleForm1.roleid,
								orgid:this.oid,
								postid:this.postid,
	//							depid: this.ruleForm1.depid,
								createby: this.ruleForm1.createby,
							},{emulateJSON: true}).then(function(res){
								console.log(res)
								if(res.body.code='100'){
									this.$router.push({path: "/employee_list"});
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
				this.ruleForm1.birthday = null;
				this.ruleForm1.entrydate = null;
				this.ruleForm1.updatedate = null;
				this.ruleForm1.empstatus = '在岗';
				this.ruleForm1.empweixin = '';
				this.$refs[formName].resetFields();
			},
			//员工状态转换
			changeStatus(status){
				if(status == "在岗"){
					return "1"
				} else if (status == "离职"){
					return "2"
				} else if (status == "出差"){
					return "3"
				} else if (status == "请假"){
					return "4"
				}
			},
			//时间转换
			changeTime(time){
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
		        if (newVal[3].childList[0].map.addBtn == 0) {
		          this.$router.push({path: "/login"})
		        }
		      },
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
