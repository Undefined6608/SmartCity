<template>
	<view class="container">
		<view class="js">
			<view class="msg">
				<text class="jg">支付金额：<span class="m">{{ price }}</span>元</text>
			</view>
			<view class="button">
				<button class="zfb" @click="zf(1)">支付宝</button>
				<button class="wx" @click="zf(2)">微信</button>
			</view>
		</view>
	</view>
</template>

<script>
import { payGoods } from '@/common/api';
	export default {
		data() {
			return {
				orderNum:"",
				price:0
			}
		},
		methods: {
			zf(e){
				if(e==1){
					payGoods(uni.getStorageSync('token',''),this.orderNum,"支付宝").then((res)=>{
						// console.log(res);
						if(res.code == 200){
							uni.navigateTo({
								url:'/pages/MinePage/goods'
							})
						}
					})
				}else if(e==2){
					payGoods(uni.getStorageSync('token',''),this.orderNum,"微信").then((res)=>{
						// console.log(res);
						if(res.code == 200){
							uni.navigateTo({
								url:'/pages/MinePage/goods'
							})
						}
					})
				}
				
			}
		},
		onLoad(e) {
			// console.log(e);
			this.orderNum = e.orderNum
			this.price = e.price
		}
	}
</script>

<style lang="less" scoped>
	.js{
		width: 100%;
		height: 100%;
		
		.msg{
			width: 90%;
			height: 15%;
			margin: 20px auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			background-color: #fff;
			border-radius: 20px;
			box-shadow: 0 0 30px #ccc;
			
			.jg{
				font-size: 30px;
				color: darkcyan;
				
				.m{
					color: crimson;
					font-size: 40px;
				}
			}
			
		}
		
		.button{
			width: 90%;
			height: 70px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: center;
			margin: 10px auto;
			
			.zfb,.wx{
				width: 45%;
				height: 50px;
				box-shadow: 0 0 20px #ccc;
				border-radius: 20px;
				color: #fff;
				font-weight: bold;
			}
			
			.zfb{
				background-color: #027AFF;
			}
			
			.wx{
				background-color: #04BE02;
			}
		}
		
	}
</style>
