<template>
	<div class="trainingcourse_update">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<!--填写用户信息-->
			<div class="user_info">
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
					<el-row>
						<el-col :span="9">
							<el-form-item label="课程名称：" >
								<el-input type="text" v-model="ruleForm1.coursename" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="课程地址：" >
								<el-input type="tel" v-model.number="ruleForm1.courseaddress" auto-complete="off"></el-input>
							</el-form-item>
						</el-col >
						<el-col :span="9">
							<el-form-item label="课程时间：">
								<el-date-picker type="date" placeholder="开始时间"  v-model="ruleForm1.coursetime" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label="课程天数：">
								<el-select v-model="ruleForm1.coursedays" placeholder="请选择">
									<el-option label="半天" value="半天"></el-option>
									<el-option label="一天" value="一天"></el-option>
									<el-option label="两天" value="两天"></el-option>
									<el-option label="三天" value="三天"></el-option>
								</el-select>
								
							</el-form-item>
						</el-col>

						<el-col :span="24">
							<el-form-item label-width="120px">
								<el-button type="success" @click="submitForm1('ruleForm1')">提交</el-button>
								<el-button @click="resetForm('ruleForm1')">取消</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
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
		name: "invite_add",
		data() {

			return {			
				ruleForm1: {
					coursename      : '',               //课程名称
					coursetime      : '',               //课程时间
					courseaddress   : '',               //课程地点
					coursedays      : '',               //课程天数
				},
			}
		},
		components: {

			main_component,
			breadcrumb_component
		},
		created: function() {
			this.petname = localStorage.CRM_petname;
			this.loadData();
		},
		methods: {
			
			loadData(){
				
				this.$http.get('/list/trainingCourse/findCourse',{
					params: {
					token: localStorage.CRM_token,
					courseid: this.$route.query.courseid
					}
				}).then(function(res){
					this.ruleForm1.coursename = res.body.data.coursename;
					this.ruleForm1.coursetime = res.body.data.coursetime;
					this.ruleForm1.courseaddress = res.body.data.courseaddress;
					this.ruleForm1.coursedays = res.body.data.coursedays;
				})
			},
			//表单1提交
			submitForm1(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http.post('/list/trainingCourse/updateTrainingCourse',{
					"token": localStorage.CRM_token,
					"courseid": this.$route.query.courseid,
					"coursename":this.ruleForm1.coursename,
					"courseaddress":this.ruleForm1.courseaddress,
					"coursedays":this.ruleForm1.coursedays,
					"coursetime":this.changeTime(this.ruleForm1.coursetime)

					}, {emulateJSON: true}
					).then(function(res){
					console.log(res)
					if(res.body.code==100){
						//成功提示
						this.message('修改成功','success')
							this.$router.push({path: "/trainingcourse_list"})
							this.$emit("reload", 1);
					}else if(res.body.code==102){
						this.message("修改失败，手机号已存在",'error')
						this.$refs['ruleForm1'].resetFields();
					}else{
						this.message("修改失败",'error')
						this.$refs['ruleForm1'].resetFields();
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
				//this.$refs[formName].resetFields();
				this.$router.push({path: "/trainingcourse_list"})
			},
			message(msg, msg_type) {
        		this.$message({
          			message: msg,
          			type: msg_type
        		});
      		},
      		//时间转换
			changeTime(time){
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = (newTime.getMonth()+1)>10?(newTime.getMonth()+1):'0'+(newTime.getMonth()+1);
				var dd = newTime.getDate()>10?newTime.getDate():"0"+newTime.getDate();
				return (yy+"-"+mm+"-"+dd)
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
        if (newVal[8].childList[2].map.addBtn == 0) {
          this.$router.push({path: "/login"})
        }
      }
		}
	}
</script>

<style scoped="scoped">
	.user_info{
		background: white;
		padding-top: 30px;
		padding-left: 30px;
		border-radius: 5px;
	}
	/*更改按钮颜色*/
	.el-button--success{
		background: #2EB398;
		border-color: #2EB398;
	}
	/*更改选择框宽度*/
	.el-select{width: 100%;}
</style>
