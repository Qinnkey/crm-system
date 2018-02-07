<template>
	<div class="user_list">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<el-form :model="user_detail" ref="user_detail" label-width="140px" class="demo-ruleForm">
					<el-row>
						<el-col :span="18">
							<b>用户信息：</b> <br/> <br/>
						</el-col>
						<el-col :span="9" v-for="item in user_detail.userInfo" :key="item.name">
							<el-form-item v-if="item.type=='input'" :label="item.name">
								<el-input :disabled="true" type="text" v-model="item.modelVal" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item v-if="item.type=='radio'" :label="item.name">
								<el-radio-group v-model="item.modelVal">
								    <el-radio-button v-for="it in item.options" :label="it" :key="it"></el-radio-button>
	 							</el-radio-group>
							</el-form-item>
						</el-col>

						<!--制作要求-->
						<el-col :span="18">
							<b>备注：</b> <br/> <br/>
						</el-col>
						<el-col :span="18">
							<el-form-item label-width="140px">
								<el-input type="textarea" placeholder="填写客户提交的附加资料，及需求描述" :disabled='true' :rows='5' v-model="user_detail.explain"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>

				<!---->
				<el-col :span="24">
					<el-collapse v-model="activeNames" style="margin: 20px 0;">
						<el-collapse-item title="拜访记录" name="1">
							<el-table :data="tableData1" style="width: 100%">
								<el-table-column prop="name" 	label="业务员" width="200"></el-table-column>
								<el-table-column prop="startTime" label="拜访时间"></el-table-column>
								<el-table-column prop="type" 	label="拜访方式"></el-table-column>
								<el-table-column prop="reason" 	label="备注"></el-table-column>
							</el-table>
						</el-collapse-item>
					</el-collapse>
				</el-col>

				<el-col :span="4":offset="9">
					<router-link to="/big_customers"><el-button style="margin-bottom: 40px;">返回</el-button></router-link>
				</el-col>
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
				user_detail: {
					//用户信息
					userInfo: [
						{name: "客户姓名：",	modelVal: null, type: "input"},
						{name: "手机号：",	modelVal: null, type: "input"},
						{name: "公司名称：",	modelVal: null, type: "input"},
						{name: "公司地址：", 	modelVal: null, type: "input"},
						{name: "服务状态：", 	modelVal: null, type: "input"},
						{name: "客户评价：", 	modelVal: '好', type: "radio", options: ['差','一般','好']},
					],
					explain  : null,			//制作说明
				},
				activeNames: ['1'],
				tableData1 : [
					{ name: '王小虎', startTime: '2016-05-02', type: '电话拜访', reason : "一些原因" },
	          		{ name: '王小虎', startTime: '2016-05-02', type: '电话拜访', reason : "一些原因" },
	          		{ name: '王小虎', startTime: '2016-05-02', type: '电话拜访', reason : "一些原因" },
	          		{ name: '王小虎', startTime: '2016-05-02', type: '电话拜访', reason : "一些原因" }
          		],
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped="scoped">
	.table_list{
		padding-top: 30px;
		background: white;
		border: 1px solid #CCCCCC;
		border-radius: 5px;
		b{
			display: inline-block;
			margin-left: 50px;
		}
	}
</style>
