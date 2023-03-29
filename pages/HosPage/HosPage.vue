<script>
import { selectHosImg, selectHosMsg } from '@/common/api';
	export default {
		data() {
			return {
				baseUrl:uni.getStorageSync('baseUrl',''),
				Banner:[],
				Msg:{
					brief:""
				}
			}
		},
		methods: {
			HosCard(){
				uni.navigateTo({
					url:'/pages/HosCard/HosCard'
				})
			}
		},
		onLoad(e) {
			// console.log(e.id);
			selectHosImg(e.id).then((res)=>{
				// console.log(res);
				this.Banner = res;
			});
			selectHosMsg(e.id).then((res)=>{
				// console.log(res);
				this.Msg = res;
			})
		}
	}
</script>

<template>
	<view class="container">
		<view class="hos_page">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in Banner" :key="index">
					<view class="swiper-item">
						<image :src="baseUrl+item.imgUrl" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="content">
				<text class="msg">
					{{ Msg.brief.replace(/<\/?[^>]*>/g, '') }}
				</text>
			</view>
			<button class="btn" @click="HosCard">预约挂号</button>
		</view>
	</view>
</template>

<style lang="less" scoped>
	.hos_page{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		
		.swiper{
			width: 95%;
			height: 150px;
			margin-top: 10px;
			border-radius: 15px;
			overflow: hidden;
			
			.swiper-item{
				width: 100%;
				height: 100%;
				
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.content{
			width: 95%;
			height: 310px;
			background-color: #f0fcff;
			margin-top: 10px;
			box-shadow: 0 0 20px #ccc;
			overflow: hidden;
			border-radius: 10px;
			
			.msg{
				display: block;
				margin: 10px;
				font-size: 18px;
			}
		}
		
		.btn{
			width: 95%;
			height: 50px;
			margin-top: 10px;
			text-align: center;
			line-height: 50px;
			color: #fff;
			background-color: #177cb0;
			border-radius: 25px;
		}
	}
</style>
