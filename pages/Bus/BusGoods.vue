<template>
	<view class="container">
		<view class="bus_goods">
			<view class="form">
				<view class="item">
					<text>{{ formList[0] }}</text>
					<text class="xzq">{{ name }}</text>
				</view>
				<view class="item">
					<text>{{ formList[1] }}</text>
					<text class="xzq">{{ phone }}</text>
				</view>
				<view class="item">
					<text>{{ formList[2] }}</text>
					<text class="xzq">{{ up.start }}</text>
				</view>
				<view class="item">
					<text>{{ formList[3] }}</text>
					<text class="xzq">{{ up.end }}</text>
				</view>
			</view>
			<button class="down" @click="insert">提交订单</button>
		</view>
	</view>
</template>

<script>
import { getBusIdLine, getBusLine, insertBusGoods } from '@/common/api';
	export default {
		data() {
			return {
				id:"",
				name:"",
				up:{
					start:"",
					end:"",
					price:"",
					path:"",
					status:"0"
				},
				formList:["姓名","手机号码","上车地点","下车地点"],
				phone:""
			}
		},
		methods: {
			insert(){
				insertBusGoods(uni.getStorageSync('token',''),this.up).then((res)=>{
					console.log(res);
					if(res.code == 200){
						uni.showToast({
							icon:'success',
							title:"提交成功",
							duration:500
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/MinePage/goods'
							},500)
						})
					}else{
						uni.showToast({
							icon:'error',
							title:"操作失败",
							duration:1000
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/TuiJian/TuiJianBus'
							},1000)
						})
					}
				})
			}
		},
		onLoad(e) {
			// console.log(e);
			this.id = e.id;
			this.up.start = e.start;
			this.up.end = e.end;
			this.name = e.name;
			this.phone = e.phone;
			
			getBusIdLine(this.id).then((res)=>{
				// console.log(res);
				this.up.price = res.price;
				this.up.path = res.name;
			})
		}
	}
</script>

<style lang="less" scoped> 
	.bus_goods{
		width: 100%;
		height: 100%;
		margin: 10px auto;
		overflow: hidden;
		
		.form{
			width: 90%;
			height: auto;
			display: flex;
			margin: 20px auto;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			background-color: #f0fcff;
			box-shadow: 0 0 10px #aaa;
			border-radius: 20px;
			
			.item{
				width: 100%;
				height: 60px;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2px dashed #aaa;
				
				text{
					margin-left: 20px;
				}
				
				input{
					text-align: right;
					margin-right: 20px;
				}
				
				.xzq{
					width: 30%;
					margin-left: 100px;
					margin-right: 20px;
					text-align: right;
				}
			}
		}
		
		.down{
			width: 90%;
			height: 50px;
			font-size: 20px;
			background-color: #1675df;
			color: #fff;
			font-weight: bold;
		}
	}
</style>
