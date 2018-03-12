<template>
	<div class="user_record">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<el-row>
					<el-col :span="20">
						<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;售后日志</b> <br/> <br/>
					</el-col>
					<!--
                    	作者：991405143@qq.com
                    	时间：2017-08-09
                    	描述：添加一条
                    	<el-col :span="2" class="addOne"><a @click="add_one">添加一条</a></el-col>
                    -->

				</el-row>
				<el-form v-model="record_detail" ref="record_detail" label-width="100px" class="demo-ruleForm">
					<div class="record_list" v-for="item in record_detail">
						<el-row>
							<el-col :span="9">
								<el-form-item label="负责人：">
									<el-input type="text" v-model="item.contact" disabled="true" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="售后方式：">
									<el-select v-model="item.visitway">
										<el-option label="电话回访" value="1"></el-option>
										<el-option label="到访" value="2"></el-option>
										<el-option label="邮件回访" value="3"></el-option>
										<el-option label="微信回访" value="4"></el-option>
										<el-option label="qq回访" value="5"></el-option>
										<el-option label="日常备注" value="6"></el-option>
									</el-select>
							<!--
                            	作者：991405143@qq.com
                            	时间：2017-08-08
                            	描述：
                            	<el-input type="text" v-model="item.visitway" auto-complete="off"></el-input>
                            -->
								</el-form-item>
							</el-col>
							<!--<el-col :span="9">
								<el-form-item label="联系时间：">
									<el-date-picker type="date" :picker-options="pickerOptions0" v-model="item.createdate"></el-date-picker>
								</el-form-item>
							</el-col>-->
							<el-col :span="9">
								<el-form-item label="业务员：">
									<el-input type="text" disabled="true" v-model="item.salename"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="18">
								<el-form-item label="回访备注：">
									<el-input type="textarea" placeholder="填写客户提交的附加资料，及需求描述" :rows='5' v-model="item.visitremarks"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<!--返回按钮-->
					<el-row>
						<el-col :span="4":offset="9">
							<el-form-item>
								<el-button type="primary" @click="submitForm('record_detail')">提交</el-button>
								<el-button @click="resetForm('record_detail')">取消</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</main_component>
		<router-view></router-view>
	</div>
</template>

<script>
	import top_component from '@/components/module/component_top'
	import nav_left_component from '@/components/module/component_left'
	import main_component from '@/components/module/component_main'
	import breadcrumb_component from '@/components/module/component_Breadcrumb'
	export default {
		name: 'user_record',
		data() {
			return {
				 pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
				record_detail: [
					{ contact: null, visitway: null, createdate: null, salename: null, visitremarks: null},
				]
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
				this.loadData();
		},
		methods: {
			/*//添加一条
			add_one(){
				this.record_detail.push({ name: null, afterSale_style: null, contactTime: null, saleman: null, explain: null})
			},
			//提交*/

			//提示信息
			message(msg, msg_type) {
        		this.$message({
          			message: msg,
          			type: msg_type
        		});
      	},
			//处理日期的方法
			changeTime(time){
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = (newTime.getMonth()+1)>10?(newTime.getMonth()+1):'0'+(newTime.getMonth()+1);
				var dd = newTime.getDate()>10?newTime.getDate():"0"+newTime.getDate();
				return (yy+"-"+mm+"-"+dd)
			},

			//加载数据
			loadData(){
					console.log(this.$route.query.itemid);

				this.$http.get('/list/customer/findSaleAndCustomer',{
					params :{
						token: localStorage.CRM_token,
						itemid:this.$route.query.itemid
					}
				}).then(function(res){
					if(res.body.code==100){
						console.log(res);
						var json = res.body.data;
						this.record_detail[0].contact = json.contact;
						this.record_detail[0].salename = json.salename;
					}else if(res.body.code==102){
						this.$message('没有这个项目','error')
						this.$router.push({path: "/after_sales"})
							this.$emit("reload", 1);
					}else{
						this.$message('报错','error')
						this.$router.push({path: "/after_sales"})
							this.$emit("reload", 1);
					}
				})
			},
			//提交
			submitForm(){
				console.log(this.record_detail)

				//判断售后方式是否选中
				if(this.record_detail[0].visitway==null){
					this.$message('添加失败,售后方式未选','error');
					return false;
				}
				this.$http.post('/list/visitRecord/addVisit',{
					'token': localStorage.CRM_token,
					'itemid':this.$route.query.itemid,
					'visitway':this.record_detail[0].visitway,
					'createdate':this.record_detail[0].createdate ? this.changeTime(this.record_detail[0].createdate) : '',
					'visitremarks':this.record_detail[0].visitremarks
				},{emulateJSON: true}).then(function(res){
					if(res.body.code==100){
						this.$message('添加成功','success')
						this.$router.push({path: "/after_sales"})
							this.$emit("reload", 1);

					}else if(res.body.code==102){
						this.$message('添加失败,没有该项目','error')
						this.$router.push({path: "/after_sales"})
							this.$emit("reload", 1);

					}else{
						this.$message('添加失败','error')
						this.$router.push({path: "/after_sales"})
							this.$emit("reload", 1);

					}
				})

			},
			//取消
			resetForm(){
				//this.record_detail =[{name: null, afterSale_style: null, contactTime: null, saleman: null, explain: null}]
				this.$router.push({path: "/after_sales"})
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
        if (newVal[0].childList[2].map.addBtn == 0) {
          this.$router.push({path: "/login"})
        }
      }
		}
	}
</script>

<style lang="less" scoped="scoped">
	.table_list{
		padding-top: 30px;
		padding-left: 30px;
		background: white;
		border-radius: 5px;
		/*.addOne{
			font-size: 14px;
			color: #2EB398;
			cursor: pointer;
		}*/
	}
	.record_list{margin-top: 20px;}
</style>
