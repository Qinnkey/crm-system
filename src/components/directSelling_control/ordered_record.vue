<template>
	<div class="user_record">
		<main_component @limititem="limititem">
			<breadcrumb_component></breadcrumb_component>
			<div class="table_list">
				<el-row>
					<el-col :span="20">
						<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;拜访记录</b> <br/> <br/>
					</el-col>
					<el-col :span="2" class="addOne"><a @click="add_one">添加一条</a></el-col>
				</el-row>
				<el-form v-model="record_detail" ref="record_detail" label-width="100px" class="demo-ruleForm">
					<div class="record_list" v-for="item in record_detail">
						<el-row>
							<el-col :span="9">
								<el-form-item label="负责人：">
									<el-input type="text" v-model="item.name" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="售后方式：">
									<el-input type="text" v-model="item.afterSale_style" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="联系时间：">
									<el-input type="text" v-model="item.contactTime"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="9">
								<el-form-item label="业务员：">
									<el-input type="text" v-model="item.saleman"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="18">
								<el-form-item label="回访备注：">
									<el-input type="textarea" placeholder="填写客户提交的附加资料，及需求描述" :rows='5' v-model="item.explain"></el-input>
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
				record_detail: [
					{ name: null, afterSale_style: null, contactTime: null, saleman: null, explain: null},
				]
			}
		},
		components: {
			main_component,
			breadcrumb_component
		},
		created: function() {

		},
		methods: {
			//添加一条
			add_one(){
				this.record_detail.push({ name: null, afterSale_style: null, contactTime: null, saleman: null, explain: null})
			},
			//提交
			submitForm(){
				console.log(this.record_detail)
			},
			//取消
			resetForm(){
				this.record_detail =[{name: null, afterSale_style: null, contactTime: null, saleman: null, explain: null}]
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.table_list{
		padding-top: 30px;
		padding-left: 30px;
		background: white;
		border: 1px solid #CCCCCC;
		border-radius: 5px;
		.addOne{
			font-size: 14px;
			color: #2EB398;
			cursor: pointer;
		}
	}
	.record_list{margin-top: 20px;}
</style>
