<template>
	<div class="trade_list_detail">
		<!---->
		<el-row>
			<el-col :span="24">
				<el-collapse v-model="activeNames" style="margin: 20px 0;">
					<el-collapse-item title=" 交易记录" name="1">
						<el-table :data="tableData2" style="width: 100%">
							<el-table-column prop="tradetypename" label="交易类型" width="200"></el-table-column>
							<el-table-column prop="tradedate" label="交易时间"></el-table-column>
							<el-table-column prop="salename" label="申请人"></el-table-column>
							<el-table-column prop="auditstatusname" label="审批状态"></el-table-column>
							<el-table-column prop="auditdate" label="审批时间"></el-table-column>
							<el-table-column prop="voucherno" label="交易凭证号"></el-table-column>
						</el-table>
					</el-collapse-item>
				</el-collapse>
			</el-col>

			<el-col :span="4":offset="9">
				<el-button style="margin-bottom: 40px;" @click="back">返回</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import top_component from '@/components/module/component_top'
	import nav_left_component from '@/components/module/component_left'
	import main_component from '@/components/module/component_main'
	import breadcrumb_component from '@/components/module/component_Breadcrumb'
	export default {
		name: 'trade_list_detail',
		data() {
			return {
				tempdate:[],
				activeNames: ['1'],
          		tableData2 : [],
          		itemid : '',
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {
			//用来显示具体的用户的详细情况
			this.itemid=this.$route.query.itemid;
			console.log(this.itemid,"itemid---------------------------------");
			this.loadData();
		},
		methods: {
			loadData(){
				this.$http.get("/list/tradeController/tradeListDetail",{
					params:{
						token: localStorage.CRM_token,
						itemid:this.itemid
					}
				}).then(function(res){
					console.log("交易记录----------------",res)
					if(res.body.code==100 && res.body.data != null && res.body.data.length > 0){
						this.tableData2=res.body.data;
						for (var i = 0; i < this.tableData2.length; i++) {
							//this.tableData2[i].tradedate=this.tableData2[i].tradedate?this.tableData2[i].tradedate:""
							this.tableData2[i].tradedate=this.tableData2[i].tradedate?this.changeTime(this.tableData2[i].tradedate):""
						}
					}
				})
			},
			changeTime(time){
				console.log("--"+time)
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth() + 1;
				var dd = newTime.getDate();

				return(yy + "-" + mm + "-" + dd)
			},
			back(){
				this.$router.go(-1);
      		},
		},
	}
</script>

<style type="text/css">
	.table_list .el-upload-list__item .el-icon-close{display: none;}
</style>
<style lang="less" scoped="scoped">
	.table_list{
		background: white; 
		border-radius: 5px;
		b{
			display: inline-block;
			margin-left: 50px;
		}
	}
</style>
