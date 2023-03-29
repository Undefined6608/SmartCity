<template>
	<view class="news-Bottom" @click="jump">
		<image src="../static/icons/in.png" mode=""></image>
		<text>说说你的看法</text>
		<image style="margin-right: 30px;" src="../static/icons/pl.png" mode=""></image>
		<image class="jb" v-if="count != 0" src="../static/icons/jb.png" mode=""></image>
		<text class="gs" v-if="count != 0">{{ count }}</text>
	</view>
</template>

<script>
	import { AllPressCommentsList } from '../common/api';
	import { navigateTo } from '../common/rule';
	export default {
		name:"newsBottom",
		props:['newsId'],
		data() {
			return {
				count:0
			};
		},
		mounted() {
			AllPressCommentsList(this.newsId).then((res)=>{
				this.count = res.length;
			})
		},
		methods:{
			jump(){
				navigateTo('/pages/InnerPage/PressComments?newsId='+this.newsId)
			}
		}
	}
</script>

<style lang="less" scoped>
	.news-Bottom{
		width: 100%;
		height: 50px;
		position: fixed;
		z-index: 2;
		bottom: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 0 20px #ccc;
		background-color: #fff;
		
		image{
			width: 25px;
			height: 25px;
			margin-left: 10px;
			margin-right: 10px;
		}
		text{
			font-size: 15px;
			color: #666666;
		}
		
		.jb{
			position: absolute;
			width: 30px;
			height: 30px;
			top: 0;
			right: 5px;
		}
		
		.gs{
			position: absolute;
			width: 30px;
			height: 30px;
			top: 5px;
			font-size: 10px;
			color: #fff;
			font-weight: bold;
			right: 3px;
		}
	}
</style>