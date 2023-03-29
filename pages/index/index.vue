<template>
	<view class="index">
		<swiper class="swiper" :indicator-dots="true">
			<swiper-item>
				<view class="swiper-item"><image :src="img[0]" ></image></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"><image :src="img[1]" ></image></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"><image :src="img[2]" ></image></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"><image :src="img[3]" ></image></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image :src="img[4]"></image>
					<button class="IpSet" @click="SetIpSetOpenOrDown">IP端口设置</button>
					<button class="Login" @click="go_login">立即体验</button>
				</view>
			</swiper-item>
		</swiper>
		<!-- IPSet -->
		<IpSet v-if="IpSet"></IpSet>
	</view>
</template>

<script>
	import IpSet from '@/components/IpSet.vue'
	import { navigateTo } from '@/common/rule';
	import { baseUrl } from '@/common/api'
	export default {
		data() {
			return {
				IpSet:false,
				img:["../../static/image/guide1.jpg","../../static/image/guide2.jpg","../../static/image/guide3.jpg","../../static/image/guide4.jpg","../../static/image/guide5.jpg"]
			}
		},
		methods: {
			SetIpSetOpenOrDown(){
				this.IpSet = !this.IpSet;
			},
			go_login(){
				if(uni.getStorageSync("baseUrl","") != ""){
					navigateTo("/pages/Login/Login");
				}else{
					uni.showToast({
						icon:'error',
						title:"请先设置IP端口"
					})
				}
			}
		},
		components:{
			IpSet
		}
	}
</script>

<style lang="less" scoped>
	.index{
		width: 100vw;
		height: 100vh;
		background-color: white;
		.swiper{
			width: 100%;
			height: 100%;
			.swiper-item{
				width: 100%;
				height: 100%;
				.IpSet{
					width: 146px;
					height: 42px;
					position: absolute;
					top:23px;
					right: 23px;
					background-color: rgba(255, 255, 255, 0.5);
				}
				.Login{ 
					width: 146px;
					height: 42px;
					position: absolute;
					// 底部51px,横向居中
					bottom: 50px;
					left: 0;
					right: 0;
					background-color: rgba(255, 255, 255, 0.5);
				}
				
				image{
					width: 100%;
					height: 100%;
				}
			}
			
		}
		
		
	}
	
</style>
