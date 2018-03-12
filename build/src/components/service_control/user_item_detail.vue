<template>
	<div class="user_list">
		<main_component>
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<el-form :model="user_detail" ref="user_detail" label-width="140px" class="demo-ruleForm">
					<el-row>
						<el-col :span="18">
							<b>填写用户信息：</b> <br/> <br/>
						</el-col>
						<el-col :span="9" v-for="item in user_detail.userInfo" :key="item.name">
							<el-form-item v-if="item.type=='input' && item.modelVal != 0" :label="item.name">
								<el-input :disabled="true" type="text" v-model="item.modelVal" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item v-if="item.type=='radio'" :label="item.name">
								<el-radio-group v-model="item.modelVal">
									<el-radio-button v-for="it in item.options" :disabled="item.modelVal!=it" :label="it" :key="it"></el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>

						<!--制作要求-->
						<el-col :span="18">
							<b>制作要求  参考/说明/需求：</b> <br/> <br/>
						</el-col>
						<el-col :span="18">
							<el-form-item label-width="100px">
								<el-input type="textarea" placeholder="填写客户提交的附加资料，及需求描述" :readonly='true' :rows='5' v-model="user_detail.explain"></el-input>
							</el-form-item>

							<span v-for="(item,index) in itemrequire">
								<span style="margin-left: 110px; color: #C4C4C4;">{{itemrequire[index].createdate}}</span>
								<el-form-item label-width="100px">
									<el-input type="textarea" readonly :rows='5' v-model="itemrequire[index].requirecontent"></el-input>
								</el-form-item>
							</span>

						</el-col>
						<el-col :span="18">
							<el-form-item label-width="140px">
								<el-upload class="upload-demo" :disabled="true" action="/list/customer/uploadRequireDoc" :on-preview="handlePreview" :file-list="fileList3">
									&nbsp;
									<i slot="tip" class="el-upload__tip">项目相关文档</i>
								</el-upload>
							</el-form-item>
						</el-col>
						<!--客服备注-->
						<el-col :span="18">
							<b>客服备注  参考/说明/需求：</b> <br/> <br/>
						</el-col>
						<el-col :span="18">
							<el-form-item label-width="140px">
								<el-input type="textarea" placeholder="客服填写备注" :readonly='true' :rows='5' v-model="user_detail.standby4"></el-input>
							</el-form-item>
						</el-col>

						<!--业务员信息-->
						<el-col :span="18">
							<b>业务员信息：</b> <br/> <br/>
						</el-col>
						<el-col :span="9" v-for="item in user_detail.salesmanInfo" :key="item.name">
							<el-form-item :label="item.name">
								<el-input :disabled="true" type="text" v-model="item.modelVal"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>

				<!---->
				<el-row>
					<el-col :span="24">
						<el-collapse v-model="activeNames" style="margin: 20px 0;">
							<el-collapse-item title="服务变更记录" name="1">
								<el-table :data="tableData1" style="width: 100%">
									<el-table-column prop="salename" label="业务员" width="200"></el-table-column>
									<el-table-column prop="beginDate" label="服务开始时间"></el-table-column>
									<el-table-column prop="endDate" label="服务中止时间"></el-table-column>
									<el-table-column prop="changecause" label="变更服务原因"></el-table-column>
								</el-table>
							</el-collapse-item>
							<el-collapse-item title="交易记录" name="2">
								<el-table :data="tableData2" style="width: 100%">
									<el-table-column prop="tradetypename" label="交易类型" width="200"></el-table-column>
									<el-table-column prop="tradedate" label="交易时间"></el-table-column>
									<el-table-column prop="salename" label="申请人"></el-table-column>
									<el-table-column prop="auditstatusname" label="审批状态"></el-table-column>
									<el-table-column prop="auditdate" label="审批时间"></el-table-column>
								</el-table>
							</el-collapse-item>
						</el-collapse>
					</el-col>

					<el-col :span="4" :offset="9">
						<el-button style="margin-bottom: 40px;" @click="back">返回</el-button>
						<!--<router-link to="/user_list"><el-button style="margin-bottom: 40px;">返回</el-button></router-link>-->
					</el-col>
				</el-row>
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
		name: 'user_list',
		data() {
			return {
				itemrequire: [],
				//				timechanged:[],
				tempdate: [],
				fileList3: [],
				user_detail: {
					//用户信息
					userInfo: [
						{ name: "姓名：", modelVal: null, type: "input" },
						{ name: "手机号：", modelVal: null, type: "input" },
						{ name: "微信号：", modelVal: null, type: "input" },
						{ name: "邮箱：", modelVal: null, type: "input" },
						{ name: "公司名称：", modelVal: null, type: "input" },
						{ name: "公司简介：", modelVal: null, type: "input" },
						{ name: "地址：", modelVal: null, type: "input" },
						{ name: "客户备注：", modelVal: null, type: "input" },
						{ name: "身份证：", modelVal: null, type: "input" },
						{ name: "业务员：", modelVal: null, type: "input" },
						{ name: "项目类型：", modelVal: null, type: "input" },
						{name: "汇搜云权限：", 	modelVal: null, type: "input"},
						{ name: "项目全称：", modelVal: null, type: "input" },
						{ name: "合同编号：", modelVal: null, type: "input" },
						{ name: "开始时间：", modelVal: null, type: "input" },
						{ name: "结束时间：", modelVal: null, type: "input" },
						{ name: "服务状态：", modelVal: null, type: "input" },
						{ name: "评价：", modelVal: '好', type: "radio", options: ['差', '一般', '好'] },
					],
					explain: null, //制作说明
					standby4: null, //客服备注
					//销售员信息
					salesmanInfo: [
						{ name: "姓名：", modelVal: null },
						{ name: "手机号：", modelVal: null },
						{ name: "微信号：", modelVal: null },
						{ name: "邮箱：", modelVal: null },
					],
					itemid: ''
				},
				activeNames: ['1', '2'],
				tableData1: [],
				tableData2: [],
				provinceid: '', //省id
				cityid: '', //市id
				areaid: '', //区id
				p_c_a: '', //省市区名称
				address: null //详细地址
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			//用来显示具体的用户的详细情况
			this.itemid = this.$route.query.itemid;
			console.log("-----------------------")
			console.log(this.itemid)
			console.log("+++++++++++++++++++++++")
			this.loadData();
			console.log("=======================+")
			this.findItemrequire();
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!")
		},
		methods: {
			//加载制作需求文档
			findItemrequire() {
				this.$http.get("/list/itemRequire/list", {
					params: {
						token: localStorage.CRM_token,
						itemid: this.itemid
					}
				}).then(function(res) {
					if(res.body.code == 100 && res.body.data != null && res.body.data.length > 0) {
						var json = res.body.data;
						for(var i = json.length - 1; i >= 0; i--) {
							var item = { requirecontent: json[i].requirecontent, createdate: json[i].createdate }
							this.itemrequire.push(item)
						}
					}
				})
			},
			loadData() {
				this.$http.get("/list/customer/detailedInfo", {
					params: {
						token: localStorage.CRM_token,
						itemid: this.itemid
					}
				}).then(function(res) {
					console.log("----------------")
					console.log(res)
					if(res.body.code == 100 && res.body.data != null) {
						var datas = res.body.data;
						//省市区id
						this.provinceid = datas.province;
						this.cityid = datas.city;
						this.areaid = datas.area;
						this.address = datas.address;
						this.user_detail.userInfo[0].modelVal = datas.contact;
						this.user_detail.userInfo[1].modelVal = datas.phone;
						this.user_detail.userInfo[2].modelVal = datas.weixin;
						this.user_detail.userInfo[3].modelVal = datas.email;
						this.user_detail.userInfo[4].modelVal = datas.companyname;
						this.user_detail.userInfo[5].modelVal = datas.companyintro;
						this.user_detail.userInfo[6].modelVal = datas.address;

						this.user_detail.userInfo[7].modelVal = datas.custremark;
						this.user_detail.userInfo[8].modelVal = datas.idcard;
						this.user_detail.userInfo[9].modelVal = datas.salename;
						this.user_detail.userInfo[10].modelVal = datas.itemtypename;
						this.user_detail.userInfo[11].modelVal=datas.itemdetailname;
						this.user_detail.userInfo[12].modelVal = datas.itemname;
						
						this.user_detail.userInfo[13].modelVal = datas.contnum;
						this.user_detail.userInfo[14].modelVal = datas.itembegindate ? this.changeTime(datas.itembegindate) : "";
						this.user_detail.userInfo[15].modelVal = datas.itemenddate ? this.changeTime(datas.itemenddate) : "";
						this.user_detail.userInfo[16].modelVal = datas.custstatusName;
						this.user_detail.userInfo[17].modelVal = datas.evaluate;
						this.user_detail.explain = datas.itemrequire;
						this.user_detail.standby4 = datas.standby4;

						//业务员
						this.user_detail.salesmanInfo[0].modelVal = datas.salename;
						this.user_detail.salesmanInfo[1].modelVal = datas.salephone;
						this.user_detail.salesmanInfo[2].modelVal = datas.saleweixin;
						this.user_detail.salesmanInfo[3].modelVal = datas.saleemail;

						if(res.body.data.salesCustHistoryVos.length > 0) {
							this.tableData1 = res.body.data.salesCustHistoryVos;
						}
						if(res.body.data.tradeCecordPos.length > 0) {
							this.tableData2 = res.body.data.tradeCecordPos;
							for(var i = 0; i < this.tableData2.length; i++) {
								this.tableData2[i].tradedate = this.tableData2[i].tradedate ? this.changeTime(this.tableData2[i].tradedate) : ""
							}
						}
						//填充fileList3中的数据
						if(res.body.data.uploadDocs.length > 0) {
							var docs = res.body.data.uploadDocs;
							for(var i = 0; i < docs.length; i++) {
								var url = docs[i].picurl;
								var a = [];
								a = url.split("/");
								this.fileList3.push({
									name: a[a.length - 1],
									url: docs[i].picurl,
									status: 'finished',
									uid: docs.picid
								})

							}
						}

						this.tempdate = this.fileList3;
						this.searchRegion(1, this.provinceid)
						this.searchRegion(2, this.cityid);
						this.searchRegion(3, this.areaid);
					}
				})
			},
			back() {
				this.$router.go(-1);
				this.$emit('reload', 1);
			},
			//通过serachRegion来查询对应的省市区的详细情况
			searchRegion(type, regionId) {
				if(regionId != '') {
					this.$http.get('/list/customer/getregion', {
						params: {
							token: localStorage.CRM_token,
							flag: 3,
							regionId: regionId
						}
					}).then(function(res) {
						if(res.body.code == 100 && res.body.data != null) {
							this.p_c_a += res.body.data.name
						}
					})
				}

			},
			changeTime(time) {
				console.log("--" + time)
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth() + 1;
				var dd = newTime.getDate();

				return(yy + "-" + mm + "-" + dd)
			},
			//权限改变
			limititem(val) {
				var newVal = [];
				for(var i = 0; i < val.length; i++) {
					for(var j = 0; j < val.length; j++) {
						if(val[j].menutarget == i + 1) {
							newVal.push(val[j])
						}
					}
				}
				if(newVal[0].childList[0].map.detailFun == 0) {
					this.$router.push({ path: "/login" })
				}
			},
			handlePreview(file) {
				//下载
				var urls = file.url.split("/");
				var url = urls[urls.length - 2] + "/" + urls[urls.length - 1]
				if(file.url != null && file.url != '') {
					this.$http.get("/list/customer/docDonwload/" + url).then(function(res) {
						console.log(res)
						//跳转下载
						location.href = "/list/customer/docDonwload/" + url + "?token=" + localStorage.CRM_token;
					})
				}
				/*handleRemove1(file) {
					//用来判断是真删除还是假删除
					console.log("--------------")
					this.fileList3=[]
					for (var i = 0; i < this.tempdate.length; i++) {
						this.fileList3.push(this.tempdate[i])
					}
				}*/
			}
		},
		watch: {
			p_c_a(newVal, oldVal) {
				this.user_detail.userInfo[6].modelVal = newVal + this.address
			}
		}
	}
</script>

<style type="text/css">
	.table_list .el-upload-list__item .el-icon-close {
		display: none;
	}
</style>
<style lang="less" scoped="scoped">
	.table_list {
		background: white;
		border-radius: 5px;
		b {
			display: inline-block;
			margin-left: 50px;
		}
	}
</style>