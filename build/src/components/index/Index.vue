<template>
	<div class="index">
		<main_component>
			<img class="bigImg" src="../../../static/img/welcome.png" width="100%"/>
			<div class="content">
				<!--有keyid的显示页面-->
				<div v-if="!keyid" class="normal">
					<table border="0" cellspacing="0" cellpadding="10">
						<tr><th colspan="2">系统消息</th></tr>
						<tr>
							<td>操作系统：linux</td>
							<td>JAVA版本：jdk7</td>
						</tr>
						<tr>
							<td>服务器软件：tomcat7</td>
							<td>MySQL版本：mysql5.1</td>
						</tr>
					</table>
				</div>
				<!--无keyid的显示页面-->
				<div v-else class="special">
					<p class="count " v-if="count">
						<span>你好！有<b>{{count}}</b>个用户近期需要续费</span>
					</p>
					<p>
					<ul class="listUl">
							<span>项目类型：</span>
							<li v-for="item in itemTypes" @click="toItem(item.value, item.type)">
								<b>{{item.count}}</b>
								<br>{{item.label}}
							</li>
						</ul>
					</p>
					<p>
						<ul class="listUl">
							<span>合同进度：</span>
								<li v-for="item in contractTypes" @click="toItem(item.value, item.type)">
									<b>{{item.count}}</b>
									<br>{{item.label}}
								</li>
						</ul>
					</p>
					
					<ul class="bigUl flex_between">
						<li style="background: #8fcf8f;" @click="userList">我的全部客户<p class="noBg">{{totalcount}}</p></li>
						<li style="background: #84bdd0;" @click="feeList">待续费客户<p>{{count}}</p></li>
						<li style="background: #849bd0;" @click="userReverseList">预付款客户<p>{{advancecount}}</p></li>
						<li style="background: #a984d0;" @click="userRemianList">待结尾款客户<p>{{finalcount}}</p></li>
						<li style="background: #B9B973;" @click="userPendingList">标记待处理项目<p>{{pendingcount}}</p></li>
					</ul>
				</div>
			</div>
		</main_component>
		<router-view></router-view>
	</div>
</template>

<script>
//	import top_component from '@/components/module/component_top'
//	import nav_left_component from '@/components/module/component_left'
	import main_component from '@/components/module/component_main'
	export default{
		name: 'index',
		components: {
			main_component
		},
		data (){
			return {
				keyid  : 0,		//是否有keyid
				count  : 0,//续费人数
				totalcount :0,//所有的客户
				advancecount:0,//预付款客户
				finalcount:0 ,//代结尾款客户
				itemTypes: [
					{label:'企业版', value: 1, count:0,type:0},
					{label: '门户版', value:2, count:0,type:0},
					{label: '电商版',value:3, count:0,type:0},
					{label: '微商app',value:4, count:0,type:0},
					{label: '独立小程序',value:5, count:0,type:0},
					{label: '阿凡提',value:6, count:0,type:0},
					{label: '汇搜云',value:7, count:0,type:0}
				],
				contractTypes:[
					{label:'等待客服审核', value: -1, count:0,type:1},
					{label: '美工上传素材',value:2, count:0,type:1},
					{label: '客服进行APP抢注',value:3, count:0,type:1},
					{label: '程序生成 ',value:4, count:0,type:1},
					{label: '系统初始化 ',value:5, count:0,type:1},
					{label: '客服添加数据',value:6, count:0,type:1},
					{label: '应用生成 ',value:7, count:0,type:1},
					{label: '应用上传 ',value:8, count:0,type:1},
					{label: '审核失败', value:-2, count:0,type:1},
					{label: '应用正常',value:1, count:0,type:1},
				]
			}
		},
		created: function(){
			this.keyid = localStorage.CRM_keyid;
			this.loadCount('',1);
			this.loadCount(2,2);
			this.loadCount(3,3);
			this.loadCount('',4,1);
			this.$http.get("/list/customer/renew/count",{
				params:{
					token: localStorage.CRM_token,
					beginDate:localStorage.CRM_beginDate,
					endDate:localStorage.CRM_endDate,
				}
			}).then(function(res){
				//console.log(res)
				if (res.body.data.count) {
					this.count = res.body.data.count;
				}
			});
			
			this.$http.get("/list/count/itemTypeCount/",{
				params: {}
			}).then(function(res){
				if(res != null && res.body.data != null && res.body.data.list.length > 0){
					var list = res.body.data.list;
					for (var i=0 ;i<list.length; i++) {
						for (var j=0 ; j<this.itemTypes.length; j++) {
							if(list[i].itemtype==this.itemTypes[j].value){
								this.itemTypes[j].count = list[i].count
							}
						}
					}
					console.log(this.itemTypes)
				}
			});
			
			this.$http.get("/list/count/contactTypeCount/",{
				params: {}
			}).then(function(res){
				if(res != null && res.body.data != null && res.body.data.list.length > 0){
					var list = res.body.data.list;
					for (var i=0 ;i<list.length; i++) {
						for (var j=0 ; j<this.contractTypes.length; j++) {
							if(list[i].relatecontstatus==this.contractTypes[j].value){
								this.contractTypes[j].count = list[i].count
							}
						}
					}
					console.log(this.contractTypes)
				}
			});
		},
		methods:{
			toItem(value,type){
				var itemtype = '';
				var contractstatus = '';
				if (type == 0){
					itemtype = value;
				} else if (type == 1){
					contractstatus = value;
				}
					this.$router.push({
          			path: '/user_list',
         			query: {
            			token: localStorage.CRM_token,
            			itemType: itemtype,
            			contractStatus:contractstatus,
            			type:type
         			}
				})
			},
			loadCount(param,type,pending){
				console.log({
						tradetype:param,
						pendingflag:pending,
						token: localStorage.CRM_token,
						beginDate:localStorage.CRM_beginDate,
						endDate:localStorage.CRM_endDate,
					},"-----------------------------");
				this.$http.get("/list/customer/countByItemTradetype",{
					params:{
						tradetype:param,
						pendingflag:pending,
						token: localStorage.CRM_token,
						beginDate:localStorage.CRM_beginDate,
						endDate:localStorage.CRM_endDate,
					}
				}).then(function(res){
		
					if (res.body.data.count) {
						var count = res.body.data.count;
						if(type==1){
							this.totalcount=count;
						}else if(type==2){
							this.advancecount=count;
						}else if(type==3){
							this.finalcount=count;
						}
						else if(type==4){
							this.pendingcount=count;
						}
					}
				})
			},
			
			
			userList(){
				this.$router.push({path: "/user_list"})
			},
			//待结尾款
			userRemianList(){
				this.$router.push({
					path: '/user_list',
					query: {
						tradetype: 3
					}
				})
			},
			//预付款
			userReverseList(){
				this.$router.push({
					path: '/user_list',
					query: {
						tradetype: 2
					}
				})
			},
			//标记待处理客户
			userPendingList(){
				this.$router.push({
					path: '/user_pending_list',
					query: {
						pendingflag: 1
					}
				})
			},
			feeList(){
				this.$router.push({path: "/continue_fee"})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.content{
		.normal{
			table{
				width: 100%;
				margin-top: 40px;
				padding-bottom: 10px;
				color: #555;
				border: 1px solid #d9d9d9;
				tr{
					th{
						text-align: left;
						padding: 10px;
						background: white;
						border: none;
						border-bottom: 1px solid #d9d9d9;
					}
					td{
						padding: 10px;
						border: none;
						font-size: 15px;
					}
				}
			}
		}
		.special{
			margin-top: 40px;
			border: 1px solid #d9d9d9;
			p{
				padding: 15px 10px;
				border-bottom: 1px solid #d9d9d9;
			}
			.count{
				color: #989898;
				b{color: dodgerblue;}
			}
			.listUl{
				display: inline-block;
				li{
					display: inline-block;
					margin: 0 10px;
					text-align: center;
					color: #333;
					&:hover{
						cursor: pointer;
					};
					b{
						 color: dodgerblue;
					}
				}
			}
			.bigUl{
				padding: 10px;
				width: calc(~"100% - 20px");
				li{
					position: relative;
					display: inline-block;
					padding: 80px 0;
					margin: 10px;
					/*height: 160px;*/
					/*line-height: 160px;*/
					text-align: center;
					width: calc(~"25% - 20px");
					color: white;
					border-radius: 5px;
					transition: all .3s;
					&:hover{
						cursor: pointer;
						transform: translateY(-5px);
						box-shadow: -8px 8px 10px #ccc;
						transition: all .3s;
					}
					p{
						position: absolute;
						top: 15px;
						right: 25px;
						display: inline-block;
						height: 15px;
						width: 15px;
						padding: 2px;
						color: red;
						border: none;
						font-size: 12px;
						text-align: center;
						line-height: 17px;
					}
					.noBg{
						color: white;
					}
				}
			}
		}
	}
</style>
