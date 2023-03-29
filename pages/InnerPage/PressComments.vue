<script>
	import { AllPressCommentsList, putPressComment } from '@/common/api';
	export default {
		data() {
			return {
				pressList:[],
				newsId:'',
				search_msg:''
			}
		},
		methods: {
			search(){
				if(this.search_msg != ''){
					console.log(this.search_msg);
					putPressComment(this.newsId,this.search_msg).then((res)=>{
						// #ifdef H5
						setTimeout(()=>{
							this.$router.go(0)
						},500)
						// #endif
						
					}).catch((err_res)=>{
						console.log(err_res);
						uni.showToast({
							icon:'error',
							title:"评论失败"
						})
					})
				}else{
					uni.showToast({
						icon:'error',
						title:'评论失败',
						duration:500
					})
				}
			},
			clear(e){
			},
		},
		onLoad(res1) {
			AllPressCommentsList(res1.newsId).then((res)=>{
				
				let a = [];
				if(res!=[]){
					for (var i = 0; i < res.length; i++) {
						if(res[i].newsId == res1.newsId){
							a.push(res[i])
						}
					}
					this.pressList = a;
				}
				
			})
			// 传入newsId
			this.newsId = res1.newsId;
		},
	}
</script>

<template>
	<view class="container">
		<view class="press">
			<view class="search">
				<input class="in" type="text" v-model="search_msg" placeholder="说说你的看法" placeholder-class="place_c" >
				<button class="s_btn" @click="search"><span>评论</span></button>
			</view>
			<view class="main">
				<text class="title">最新评论</text>
				<scroll-view class="scroll" scroll-y="true" >
					<view class="list">
						<view class="scroll_view" v-for="(item, index) in pressList" :key="index">
							<image src="../../static/uni.png" mode=""></image>
							<view class="right">
								<text class="userName">{{ item.userName }}</text>
								<text class="content">{{ item.content }}</text>
								<text class="time">{{ item.commentDate }}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<style lang="less" scoped>
	.press{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.search{
			width: 90%;
			height: 40px;
			margin-top: 10px;
			box-shadow: 0 0 20px #ccc;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			
			.in{
				width: 80%;
				height: 100%;
				border-top-left-radius: 10px;
				border-bottom-left-radius: 10px;
				background-color: #fff;
				.place_c{
					margin-left: 20px;
				}
			}
			
			.s_btn{
				width: 20%;
				height: 100%;
				border-radius: 0;
				border-top-right-radius: 10px;
				border-bottom-right-radius: 10px;
				background-color: cornflowerblue;
				text-align: center;
				font-size: 20px;
				color: #fff;
				line-height: 40px;
			}
		}
		
		.main{
			width: 95%;
			flex:1;
			background-color: #fff;
			margin-top: 10px;
			box-shadow: 0 0 20px #ccc;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			
			.title{
				width: 100%;
				height: 30px;
				font-size: 20px;
				text-align: center;
				margin-top: 10px;
				margin-bottom: 20px;
			}
			
			.scroll{
				width: 100%;
				height: 80vh;
				
				.list{
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: start;
					align-items: center;
					
					.scroll_view{
						width: 90%;
						height: 150px;
						background-color: #f2ecde;
						box-shadow: 0 0 20px #ccc;
						margin-top: 10px;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-around;
						border-radius: 15px;
						
						image{
							width: 40px;
							height: 40px;
							margin: 10px;
						}
						
						.right{
							flex: 1;
							height: 100%;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							align-items: center;
							.userName{
								width: 100%;
								line-height: 40px;
								font-size: 25px;
								font-family: '微软雅黑';
								font-weight: bold;
								
							}
							
							.content{
								width: 100%;
								line-height: 30px;
								font-size: 20px;
								font-family: '楷体';
							}
							
							.time{
								width: 90%;
								font-size: 10px;
								color: #666666;
								text-align: right;
							}
						}
						
						
					}
					
				}
			}
		}
	}
</style>
