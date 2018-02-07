<template>
	<div class="top_component flex_start">
		<div class="top_title">客户关系管理系统</div>
		<div class="top_fun">
			<div class="flex_between">
				<span>您好！{{petname}}【系统管理员】</span>
				<span class="vertical_m" v-if="isDisplay==1" @click="messageNotice">消息提醒</span>
				<span class="vertical_m" @click="updatePswd">
					<img src="../../../static/img/mima.png" width="15"/>修改密码
				</span>
				<span class="vertical_m" @click="exit">
					<img src="../../../static/img/tuichu.png" width="15"/>退出
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "top_component",
		data() {
			return {
				petname: null,
				isDisplay: 0,
				roleid: 0,
				noticeContent: [], // 消息提示内容
				index: 0, // 消息循环显示索引
				count: 0,// 重新从后台加载新数据起点
				intervalid: 0,
			}
		},
		created() {
			var that = this;
			that.roleid = localStorage.CRM_roleid;
			that.petname = localStorage.CRM_petname;
			console.log(localStorage.loginSign)
			if("cust" != localStorage.loginSign){
				//消息提醒是否显示
				that.noticeIsDisplay();
				//加载通知消息
				that.loadData();
			}
		},
		methods: {
			noticeIsDisplay() {
				var that = this;
				if(that.roleid == 999 || that.roleid == 777 || that.roleid == 888 || that.roleid == 1001) {
					that.isDisplay = 1;
					that.intervalid =  setInterval(function(){that.messageNotice()}, 5000)
					setInterval(function() {
						that.loadData()
					}, 300000)
				}
			},
			loadData() {
				var that = this;
				that.$http.get('/list/noticeRead/findNotices', {
					params: {
						token: localStorage.CRM_token,
					}
				}).then(function(res) {
					console.log("______________" , res)
					clearInterval(that.intervalid)
					if(res.body.code == 100 && res.body.data.length!=0) {
						that.noticeContent = [];
						that.noticeContent = res.body.data;
						if (that.count ==  that.index){
							that.index = 0;
							that.count = 0;
						} else if (that.count < that.index){
							that.index = that.index - that.count;
							that.count = 0;
						}
						console.log("count: " + that.count + " index: " + that.index);
						if(that.index != 0 && that.index == res.body.data.length){	
						} else{
							that.intervalid =  setInterval(function(){that.messageNotice()}, 5000)
						}
					}
				})
			},
			exit: function() {
				this.$confirm('此操作将退出登录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push({ path: '/login' })
					localStorage.removeItem("CRM_token"); //清除token
					localStorage.removeItem("CRM_petname"); //清除昵称
					localStorage.removeItem("CRM_keyid"); //清除keyid
					localStorage.removeItem("CRM_userid"); //清除userid
					console.log(localStorage)
					this.$message({
						type: 'success',
						message: '已退出登录!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			updatePswd() {
				this.$router.push({ path: "/pwsd" })
			},
			messageNotice() {
				this.loadData();
				var that = this;
				console.log("-------------------------------------")
				if(that.index >= that.noticeContent.length || that.noticeContent.length == 0) {
					return;
				}
				var noticetype = that.noticeContent[that.index].noticetype;
				var itemid = that.noticeContent[that.index].itemid;
				var noticeid = that.noticeContent[that.index].noticeid;
				var noticename = that.noticeContent[that.index].noticename;
				var noticemessage = that.noticeContent[that.index].noticemessage;
				that.index++
				console.log(noticetype + "  " + itemid + "  " + noticeid)
				that.$notify({
					title: noticename,
					message: noticemessage,
					duration: 0,
					offset: 100,
					onClose() {
						console.log("消息关闭")
						that.count++;
						
						that.$http.post('/list/noticeRead/save', {
							'token': localStorage.CRM_token,
							'noticeid': noticeid,
						}, { emulateJSON: true }).then(function(res) {
							if(res.body.code == 100) {
								console.log("消息阅读成功")
							}
						})
					},
					onClick() {
						console.log("消息点击")
						console.log("noticetype: " + noticetype)
						console.log("itemid: " + itemid)
						console.log("noticeid: " + noticeid)
						switch(noticetype) {
							case 1:
								that.$router.push({ path: '/service_detail', query: { token: localStorage.CRM_token, reloadType: itemid}});
								that.$root.Bus.$emit("busData", itemid);
								this.close();
								break;
							case 2:
								that.$router.push({ path: '/service_detail', query: { token: localStorage.CRM_token, reloadType: itemid }});
								that.$root.Bus.$emit("busData", itemid);
								this.close();
								break;
							case 3:
								that.$router.push({ path: '/service_reply_log', query: { token: localStorage.CRM_token, itemid: itemid } });
								that.$root.Bus.$emit("busData", itemid);
								this.close();
								break;
							case 4:
								that.$router.push({ path: "/after_sales" });
								this.close();
								break;
						}
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.top_component {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 60px;
		color: white;
		background: #1f282d;
		.top_title {
			position: relative;
			width: 160px;
			height: 60px;
			line-height: 60px;
			text-align: center;
			background: #2EB398;
			&::after {
				position: absolute;
				top: 25px;
				right: -5px;
				z-index: 100;
				content: "";
				width: 10px;
				height: 10px;
				background: #1f282d;
				transform: rotate(45deg);
			}
		}
		.top_fun {
			width: calc(~"100% - 160px");
			font-size: 15px;
			div {
				float: right;
				padding-right: 25px;
				span {
					img {
						margin-left: 10px;
						margin-right: 5px;
					}
					&:nth-child(2) {
						&:hover {
							cursor: pointer;
							color: #2EB398;
						}
					}
				}
			}
		}
	}
</style>