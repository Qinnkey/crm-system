<template>
	<div class="nav_left">
		<ul :style="{height:screen_height+'px'}" ref="ulEle">
			<li v-for="(item,index) in navLeft_list" @click="openList(index, item.path)">
				<p class="flex_between">
					<span><img :src="item.icon"/>{{item.title}}</span>
					<img v-if="item.children!=''" :class="nav_children_show==index ? 'rowUp':'rowDn'" src="../../static/img/xiangxia.png"/>
				</p>
				<div class="children" 
					:class="(item.children!='' && nav_children_show==index) ? 'aniShow': 'aniHide'"
					:style="{height:(item.children!='' && nav_children_show==index) ?nav_children_height+'px':0}">
					<p v-for="(it,index) in item.children" class="child" @click.stop="link(index, it.path)">{{it.title}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import shouye   from '../../static/img/sy.png'
	import yonghu   from '../../static/img/yhgl.png'
	import caiwu    from '../../static/img/cw.png'
	import zhixiao  from '../../static/img/zxgl.png'
	import yuangong from '../../static/img/yggl.png'
	import quanxian from '../../static/img/qxgl.png'
	import shezhi   from '../../static/img/sz.png'
	import row   from '../../static/img/guanbi.png'
	export default({
		name: "nav_left",
		data(){
			return{
				navLeft_list: [
					{icon: shouye,   title:'首页', path:'/',children:[]},
					{icon: yonghu,   title:'用户管理', path:'/user', children:[
							{ title: '客户列表', path:'/user_list' },
							{ title: '待处理项目列表', path:'/user_pending_list' },							
							{ title: '业务员列表', path:'/salesman_list' }, 
							{ title: '售后管理', path: '/after_sales' }, 
							{ title: '待续费客户', path: '/continue_fee'}, 
							{ title: '客户变更', path: '/customer_change' }
						]
					},
					{icon: caiwu,    title:'财务管理', path:'/trade_list', children:[
							{ title: '财务管理', path: '/trade_list' },
							{ title: '审核列表', path: '/' }
						]
					},
					{icon: zhixiao,  title:'直销管理', path:'/big_customers', children:[
							{ title: '大客户列表', 	path: '/big_customers' },
							{ title: '已指派客户列表', 	path: '/assigned_customer' },
							{ title: '已成单客户', 	path: '/ordered' }
						]
					},
					{icon: yuangong, title:'员工管理', path:'/index', children:[
							{ title: '员工列表', path: '/employee_list' },
							{ title: '部门管理', path: '/organize_add' }
						]
					},
					{icon: quanxian, title: '权限管理', path: '/menu', children: [
				            {title: '管理员列表', path: '/info_list'},
				            {title: '权限管理', path: '/permission_list'},
				            {title: '菜单管理', path: '/menu_list'},
				            {title: '资源管理', path: '/'}
			        	]
					},
					{icon: shezhi,   title:'设置', path:'/index', children:[]},
				],
				nav_children_show  : null,
				nav_children_height: null,		//高度
				
			}
		},
		created(){
			this.screen_height = document.documentElement.clientHeight;
		},
		methods:{
			openList(index, router){
				console.log(index, router)
				var childrenLen = this.navLeft_list[index].children.length;
				if (this.nav_children_show==index) {
					this.nav_children_show = null
				}else{
					this.nav_children_show = index;
					this.nav_children_height = this.navLeft_list[index].children.length*41;
					//无下级的情况下点击即选中
					if (childrenLen==0) {
						console.log(this.$refs.ulEle)
						var ulChildren = this.$refs.ulEle.children;
						for (var i=0; i<ulChildren.length; i++) {
							ulChildren[i].style.color = '#BFCBD9'
						}
						ulChildren[index].style.color = '#2EB398'
					}
				}
			},
			link(index, router){
				console.log(router)
				var pindex = this.nav_children_show;
				var liChildren = this.$refs.ulEle.children[pindex].childNodes[2].children;
				for (var i=0; i<liChildren.length; i++) {
					liChildren[i].style.color = '#BFCBD9'
				}
				liChildren[index].style.color="#2EB398";
//				this.$router.push({path: router});
			}
		},
		computed:{
			judge(){
				return 
			}
		}
	})
</script>

<style lang="less">
	ul {
		width: 180px;
		background: #1F282D;
		li{
			width: 100%;
			color: #BFCBD9;
			background: #1F282D; 
			p{
				padding: 10px 10px;
				cursor: pointer;
				img{
					margin-right: 5px;
				}
				&:hover{
					background: #48576a;
				}
			}
			.children{
				
				.child{
					padding-left: 40px;
					background: #1f2d3d;
					&:hover{
						background: #48576a;
					}
				}
			}
			/*列表上下拉动动画*/
			.aniHide{
				height: 0;
				overflow: hidden;
				transition: all .3s ease-in-out;
			}
			.aniShow{
				overflow: hidden;
				transition: all .3s ease-in-out;
			}
			/*箭头动画*/
			.rowUp{
				transform: rotate(0deg);
				transition: all .3s ease-in-out;
			}
			.rowDn{
				transform: rotate(-180deg);
				transition: all .3s ease-in-out;
			}
			/*选中样式*/
			
		}
	}
</style>