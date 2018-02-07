<template>
	<div class="training_add">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写员工信息-->
			<div class="table_list">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="160px" class="demo-ruleForm">
					<el-row>
						<el-col :span="9">
							<el-form-item label="客户姓名：" prop="name">
								<el-input type="text" v-model="ruleForm1.name" auto-complete="off" ></el-input>
								<el-button @click="dialogFormVisibleAdd(1)">选择客户</el-button>
								<el-dialog title="选择客户" :visible.sync="dialogFormVisible" :modal-append-to-body="false">	
									<div class="table_list">
								        <!--搜索区块-->
								        <el-form ref="form" :inline="true" :model="form" label-width="80px">
								          <el-row >
								            <el-col :span="4">
								              <el-form-item>
								                <el-select v-model="form.region1" placeholder="请选择">
								                  <el-option label="客户名称" value=""></el-option>
								                </el-select>
								              </el-form-item>
								            </el-col>
								            <el-form-item>
								              <el-input v-model="form.name" placeholder="请输入查询值"></el-input>
								            </el-form-item>
								            <el-form-item :span="7">
								              <el-button  type="success" icon="search" @click="search">查找</el-button>
								            </el-form-item>
								          </el-row>
								        </el-form>
								        <!--表格块-->
								        <el-table :data="tableData3" border height="460" @selection-change="handleSelectionChange">
								          <el-table-column type="selection" width="55"></el-table-column>
								          <el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name"
								                           :width="item.width"></el-table-column>
								        </el-table>
								      </div> 
									<div slot="footer" class="dialog-footer">
										<el-button @click="dialogFormVisibleAdd(0)">取 消</el-button>
										<el-button type="primary" @click="dialogFormVisibleAdd(2)">确 定</el-button>
									</div>
								</el-dialog>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="客户公司：">
								<el-input type="text" v-model="ruleForm1.companyname" ></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="客户手机号：" prop="phone">
								<el-input type="tel" v-model.number="ruleForm1.phone" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="公司地址：">
								<el-input type="text" v-model="ruleForm1.address"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="课程名称："  >
								<el-autocomplete style="width: 100%;" class="inline-input" v-model="ruleForm1.coursename" :fetch-suggestions="querySearch1"
		                               placeholder="请选择课程" @select="handleSelect1"></el-autocomplete>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="课程时间：" >
								<el-date-picker type="date" placeholder="开始时间"  v-model="ruleForm1.coursetime" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="课程天数：" >
								<el-select v-model="ruleForm1.coursedays" placeholder="请选择">
									<el-option label="半天" value="半天"></el-option>
									<el-option label="一天" value="一天"></el-option>
									<el-option label="两天" value="两天"></el-option>
									<el-option label="三天" value="三天"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="课程地址：" >
								<el-input type="text" v-model="ruleForm1.courseaddress"></el-input>
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
		name: "training_add",
		data() {
			//手机号码的自定义验证
			var checkPhone = (rule, value, callback) => {
				var value = Number(value);
				if(value==''){
					callback(new Error('请输入手机号码'));
				}else if(!Number.isInteger(value)){
					callback(new Error('请输入数字'));
				}else if(value.toString().length != 11){
					callback(new Error('手机号码为11位'))
				}else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){
					callback(new Error('手机号格式不对'))
				}else{
					callback();
				}
			};
			var coursename = (rule, value, callback) => {
				console.log("coursername*******",coursename)
				if(value==''){
					callback(new Error('请输入课程名称'));
				}else{
					callback();
				}
			};
			var coursetime = (rule, value, callback) => {
				if(value==''){
					callback(new Error('请输入课程时间'));
				}else{
					callback();
				}
			};
			var courseaddress = (rule, value, callback) => {
				if(value==''){
					callback(new Error('请输入课程地址'));
				}else{
					callback();
				}
			};
			var coursedays = (rule, value, callback) => {
				if(value==''){
					callback(new Error('请输入课程天数'));
				}else{
					callback();
				}
			};
			return {
				name:'',
				companyname:'',
				phone:'',
				address:'',
				intentioncustids:[],
				courseList:[],      //课程列表
				courseid   : '',				   //课程id
				isCourseBinded:false,       //课程绑定 
				dialogFormVisible: false,
				form: {
		          name: '',
		          region1: '',
		          region2: '',
		          date1: '',
		          date2: '',
		        },
		        table_list: [
		          {name: '序号', prop: 'index', width: '70'},
		          {name: '客户名', prop: 'name', width: '100'},
		          {name: '客户公司', prop: 'companyname', width: '150'},
		          {name: '客户手机号', prop: 'phone', width: '150'},
		          {name: '客户公司地址', prop: 'address', width: '150'},
		        ],
		        tableData3: [],
				//时间选择限定
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				ruleForm1: {
					name     : '',				   //客户姓名
					phone    : '',				   //客户手机号
					companyname    : '',		//公司名称
					address : '',			        //公司地址
					coursename:'',             //课程名称
					coursetime:'',               //课程时间
					courseaddress:'',           //课程地址
					coursedays:'',               //课程天数
				},
				rules: {
					name: [
						{required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 16, message: '长度在2 到 16 个字符', trigger: 'blur'}
					],
					phone: [
						{required: true, validator: checkPhone, trigger: 'blur' },
					],
					coursename: [
						{required: true, validator: coursename, trigger: 'blur' },
					],
					coursetime: [
						{required: true, validator: coursetime, trigger: 'blur' },
					],
					courseaddress: [
						{required: true, validator: courseaddress, trigger: 'blur' },
					],
					coursedays: [
						{required: false, validator: coursedays, trigger: 'blur' },
					],
				},	
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			this.petname = localStorage.CRM_petname;
			//加载课程列表
			this.loadCourseList();
			//加载意向客户数据
			this.loadIntentionCust();
		},
		methods: {
			//加载课程列表
			loadCourseList(){
				this.$http.get('/list/trainingCourse/getCoursenameAndCoursetime',{
					params:{
						token: localStorage.CRM_token,
					}
				}).then(function(res){
					if(res.body.code==100 && res.body.data != null){
						var courseData = res.body.data;
						for(var i = 0; i < courseData.length; i++){
							var course = new Object();
							course.courseid = courseData[i].courseid;
							course.value = courseData[i].coursenameandtime;
							course.coursetime = courseData[i].coursetime;
							course.courseaddress = courseData[i].courseaddress;
							course.coursedays = courseData[i].coursedays;
							this.courseList.push(course);
						}
					}
				})
			},
			//加载意向客户数据
			loadIntentionCust(){
				this.$http.get('/list/intentionCust/findAll',{
					params:{
						token: localStorage.CRM_token,
						name: this.form.name
					}
				}).then(function(res){
					if(res.body.code==100 && res.body.data != null){
						this.tableData3 = res.body.data;
						for (var i=0; i<this.tableData3.length; i++) {
	         				this.tableData3[i].index = i+1
						}
					}
				})
			},
			search(){
				this.loadIntentionCust();
			},
			//课程列表查询
      		querySearch1(queryString, cb) {
      			var restaurants = this.courseList;
        		var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        		// 调用 callback 返回建议列表的数据
        		cb(results);
      		},
      		//课程列表选择
      		handleSelect1(item) {
      			this.ruleForm1.coursetime = item.coursetime,
      			this.ruleForm1.courseaddress = item.courseaddress,
          		this.ruleForm1.coursename= item.value,
          		this.ruleForm1.coursedays= item.coursedays,
          		this.courseid = item.courseid,
      			this.isCourseBinded = true
      		},
      		createFilter(queryString) {
      			return (restaurant) => {
      				return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      			};
      		},
			selectChange(value){
				this.postid=value.substr(0,value.indexOf(','));	
			},
			clear(){
				this.options=[];
				this.postid=0;
			},
			//页面数据实时更改
			reload: function(text){
				if (text == 1){
					this.loadData(this.currentPage)
				}
			},
			//选中列表
	      handleSelectionChange(val) {
	        this.multipleSelection = val;
	        this.intentioncustids = [];
	        for (var i = 0; i < val.length; i++) {
	          this.intentioncustids.push(val[i].intentioncustid)
	          this.name = val[i].name;
	          this.companyname = val[i].companyname;
	          this.phone = val[i].phone;
	          this.address = val[i].address;
	        }
	       },
			//表单1提交
			submitForm1(formName) {
			if(this.ruleForm1.coursetime == '' || typeof(this.ruleForm1.coursetime) == "undefined"){
					this.$message({
							message: "请选择课程时间",
							type: "warning"
							});
			}else if (this.ruleForm1.coursename == ''){
				this.$message({
							message: "请选择课程名称",
							type: "warning"
							});
			}else{
					this.$refs[formName].validate((valid) => {
						if(valid) {
							console.log("ruleForm1********************")
							console.log(this.ruleForm1)
							this.$http.post('/list/training/save',{
								token: localStorage.CRM_token,
								name: this.ruleForm1.name,
								phone: this.ruleForm1.phone,
								companyname: this.ruleForm1.companyname,
								address: this.ruleForm1.address,
								courseid  : this.courseid,
								coursename:this.ruleForm1.coursename,
								courseaddress:this.ruleForm1.courseaddress,
								coursedays:this.ruleForm1.coursedays,
								coursetime:this.changeTime(this.ruleForm1.coursetime)
							},{emulateJSON: true}).then(function(res){
								console.log(res)
								if(res.body.code='100'){
									this.$router.push({path: "/training_list"});
									this.$emit('reload', 1);
								}
								})
						} else {
							console.log('error submit!!');
							return false;
						}
				});		
			}
			}
			,
			//重置表单
			resetForm(formName) {
				this.ruleForm1.name = null;
				this.ruleForm1.companyname = null;
				this.ruleForm1.address = null;
				this.ruleForm1.coursename = null;
				this.$refs[formName].resetFields();
			},
			//时间转换
			changeTime(time){
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = (newTime.getMonth()+1)>10?(newTime.getMonth()+1):'0'+(newTime.getMonth()+1);
				var dd = newTime.getDate()>10?newTime.getDate():"0"+newTime.getDate();
				return (yy+"-"+mm+"-"+dd)
			},
			//展示
			dialogFormVisibleAdd(type) {
				switch(type) {
					case 0:
						this.dialogFormVisible = false;
						//   		console.log("关闭")
						break;
					case 1:
						this.dialogFormVisible = true;
						//   		console.log("添加")
						break;
					case 2:	
						 if (this.intentioncustids.length == 1) {
					          this.ruleForm1.name = this.name;
					          this.ruleForm1.companyname = this.companyname;
					          this.ruleForm1.phone = this.phone;
					          this.ruleForm1.address = this.address;
					          this.dialogFormVisible = false;
					        } else if (this.intentioncustids.length == 0) {
					          this.message('提交必须选择客户', 'error');
					          this.loadIntentionCust();
					        } else {
					          this.message('不能选择多个客户', 'error');
					          this.loadIntentionCust();
					        }
						this.dialogFormVisible = false;
						//   		console.log("确定")
						break;
					default:
						this.dialogFormVisible = false;
						//   		console.log(其他")
						break;
				}
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
		        if (newVal[8].childList[0].map.addBtn == 0) {
		          this.$router.push({path: "/login"})
		        }
		      },
		},
		watch: {
				'ruleForm1.coursename' (newVal, oldVal) {
					if(!this.isCourseBinded) {				
						this.courseid = '';
						this.ruleForm1.coursetime= '';
						this.ruleForm1.courseaddress= '';
						this.ruleForm1.coursedays= '';
					} else{
						this.isCourseBinded = false;	
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
