<template>
	<view class="his_app">
		<view class="item" v-for="(item,index) in list" :key="index">
			<view class="list">
				<text class="name">预约订单</text>
				<text class="name">预约金额</text>
				<text class="name">就诊人</text>
				<text class="name">预约科室</text>
				<text class="name">门诊类型</text>
				<text class="name">预约时间</text>
			</view>
			<view class="list">
				<text class="msg">{{ item.orderNo }}</text>
				<text class="msg">{{ item.money }}</text>
				<text class="msg">{{ item.patientName }}</text>
				<text class="msg">{{ item.categoryName }}</text>
				<text class="msg">{{ item.type*1 == 1?'专家号':item.type*1 == 2?'普通号':'错误' }}</text>
				<text class="msg">{{ item.reserveTime }}</text>
			</view>
		</view>
		<button class="btn" @click="goHome">返回首页</button>
	</view>
</template>

<script>
import { selectAppointmentPage } from '@/common/api'
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			goHome(){
				uni.switchTab({
					url:'/pages/Home/Home'
				})
			}
		},
		onShow() {
			selectAppointmentPage(uni.getStorageSync('token','')).then((res)=>{
				// console.log(res);
				this.list = res;
			})
		}
	}
</script>

<style lang="less" scoped>
	.his_app{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		
		.item{
			width: 90%;
			height: 250px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: center;
			background-color: #fff;
			box-shadow: 0 0 20px #ccc;
			margin-top: 20px;
			border-radius: 10px;
			
			.list{
				width: auto;
				height: 90%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: flex-start;
				
				.name{
					font-size: 18px;
					color: #0055ff;
				}
				
				.msg{
					font-size: 18px;
				}
			}
			
		}
		
		.btn{
			width: 90%;
			height: 50px;
			margin-top: 20px;
			margin-bottom: 40px;
			background-color: #0055ff;
			color: #fff;
			border-radius: 25px;
		}
	}
</style>
