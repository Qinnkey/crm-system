<template>
	<el-row class="nav_left" :style="{height: screen_height-60+'px'}">
		<el-col>
			<div class="nav_left_title">MENU</div>
			<el-menu v-for="item in nav_list" :key="item" theme="dark" :unique-opened="true" :default-active="$route.matched[1]?$route.matched[1].path:$route.path" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
				<el-menu-item v-if="item.children.length==0" :index="item.path">
					<i><img :src="item.icon" width="15"/></i>
					{{item.title}}
				</el-menu-item>
				<el-submenu v-else index="">
					<template slot="title">
						<i><img :src="item.icon" width="13"/></i>
						{{item.title}}
					</template>
					<el-menu-item v-if="it.childstatus==1" v-for="it in item.children" :key="it.childname" :index="it.childurl">{{it.childname}}</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	import shouye   from '../../../static/img/sy.png'
	import yonghu   from '../../../static/img/yhgl.png'
	import caiwu    from '../../../static/img/cw.png'
	import zhixiao  from '../../../static/img/zxgl.png'
	import yuangong from '../../../static/img/yggl.png'
	import quanxian from '../../../static/img/qxgl.png'
	import shezhi   from '../../../static/img/sz.png'
	export default {
		name: 'navleft',
		data(){
			return {
				nav_list_icon:[yonghu, caiwu, zhixiao, yuangong, quanxian, shezhi,yonghu,yonghu,yonghu,yonghu],
				nav_list: [
					{icon: shouye,   title:'首页',    path:'/index', children:[]},
//					{icon: yonghu,   title:'用户管理', path:'/user_list', children:[
//							{ title: '客户列表', path:'/user_list' },
//							{ title: '业务员列表', path:'/salesman_list' },
//							{ title: '售后管理', path: '/after_sales' },
//							{ title: '待续费客户', path: '/continue_fee'},
//							{ title: '客户变更', path: '/customer_change' }
//						]
//					},
//					{icon: caiwu,    title:'财务管理', path:'/trade_list', children:[
//							{ title: '财务管理', path: '/trade_list' },
//							{ title: '审核列表', path: '/trade_audit_list' }
//						]
//					},
//					{icon: zhixiao,  title:'直销管理', path:'/big_customers', children:[
//							{ title: '大客户列表', 	path: '/big_customers' },
//							{ title: '已指派客户列表', 	path: '/assigned_customer' },
//							{ title: '已成单客户', 	path: '/ordered' }
//						]
//					},
//					{icon: yuangong, title:'员工管理', path:'/employee_list', children:[
//							{ title: '员工列表', path: '/employee_list' },
//							{ title: '部门管理', path: '/organize_add' }
//						]
//					},
//					{icon: quanxian, title: '权限管理', path: '/menu', children: [
//				            {title: '管理员列表', path: '/info_list'},
//				            {title: '权限管理', path: '/permission_list'},
//				            {title: '菜单管理', path: '/menu_list'},
//				            {title: '资源管理', path: '/sources_list'}
//			        	]
//					},
//					{icon: shezhi,   title:'设置', path:'/sets', children:[
//						{ title: '全局设置', path: '/set_tabs' },
//						{ title: '业务设置', path: '/set_sale_tabs' },
//					]},
				],
				screen_height: null,		//屏幕高度
			}
		},
		props:[ "limitData"],

		created: function(){
			this.screen_height = document.documentElement.clientHeight;
			//console.log(this.$route.matched)
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		watch:{
			limitData(newVal){
				var sequenceNavArr = [];			//重新排序
				for (var i=0; i<newVal.length; i++) {
					console.log(newVal[i].menuid,newVal[i].menuname,"=====newVal====");
					if (newVal[i].menustatus==1) {
						var  list=newVal[i]
						//用来将待处理项目列表排列到待处理项目列表的下面去
						if(list.menuid==2){
							var s=list.childList.pop();
							list.childList.splice(1,0,s);
						}
						sequenceNavArr.push(list)
					}
				}
				for(var k=0; k<sequenceNavArr.length; k++){
					var addItem = {
						icon: this.nav_list_icon[k],
						title:sequenceNavArr[k].menuname,
						path: sequenceNavArr[k].menuurl,
						children: sequenceNavArr[k].childList
					}
					console.log(sequenceNavArr[k].menuname,"===menuname=============");
					this.nav_list.push(addItem);
				}
				console.log(addItem.length,"changdu=============");
			}
		}
	}
</script>

<style lang="less" scoped="scoped"> 
	.nav_left{
		position: fixed;
		top: 60px;
		left: 0;
		overflow-y: auto;
		background: #1f282d;
		.nav_left_title{
			width: 160px;
			height: 56px;
			line-height: 56px;
			text-align: center;
			color: #3c4d57;
			background: #1f282d;
		}
		.el-col{
			width: 160px;
			.el-menu-vertical-demo{
				background: #1f282d;
				.is-active{
					color: #2EB398;
				}
			}
			.el-submenu .el-menu-item{
				min-width: 160px;
			}
		}
	}
</style>

