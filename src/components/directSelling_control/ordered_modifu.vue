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
								<el-input  type="text" v-model="item.modelVal" auto-complete="off"></el-input>
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
								<el-input type="textarea" placeholder="填写客户提交的附加资料，及需求描述" :rows='5' v-model="user_detail.explain"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24" :offset="1">
							<el-form-item label-width="100px">
								<el-button type="success" @click="submitForm('user_detail')">提交</el-button>
								<el-button @click="resetForm('user_detail')">取消</el-button>
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
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {

		},
		methods: {
			submitForm(){
				console.log("提交")
			},
			resetForm(){
				console.log("重置")
			}
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
	.el-button--success {
		background: #2EB398;
		border-color: #2EB398;
	}
</style>
