<template>
	<div class="breadcrumb vertical_m">
		<!--<b class="title">
			{{$route.name}}
			<img src="../../../static/img/open.png" width="6"/>
		</b>-->
		<el-breadcrumb separator="/" class="breadcrumb-inner">
			<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
				{{ item.name }}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
	export default{
		data(){
			return{

			}
		},
		created(){

		}
	}
</script>

<style type="text/css">
  .el-breadcrumb__item__inner a:hover, .el-breadcrumb__item__inner:hover{cursor: auto; color: #333;}
</style>

<style lang="less" scoped="scoped">
	.breadcrumb{
		padding: 10px;
		margin-bottom: 20px;
		background: white;
		border-left: 3px solid #2EB398;
		.title{
			width: 100px;
			font-size: 14px;
			img{
				margin: 0 5px;
			}
		}
		.breadcrumb-inner{
			display: inline-block;
			height: 18px;
			line-height: 20px;
		}
	}
</style>
