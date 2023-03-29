<script>
import { getBusIdLine,getBusStop } from '../../common/api';
	export default {
		data() {
			return {
				id:'',
				StopLine:{
					first:"",
					end:"",
					price:"",
					mileage:"",
				},
				BusStops:[],
			}
		},
		methods: {
			down(){
				uni.navigateTo({
					url:'/pages/Bus/Buschengche?id='+ this.id +'&token='+uni.getStorageSync('token','')
				})
			}
		},
		onLoad(e) {
			// console.log(e.id);
			this.id = e.id;
			getBusIdLine(e.id).then((res)=>{
				// console.log(res);
				this.StopLine = res;
			})
			getBusStop().then((res)=>{
				// console.log(res);
				if(res != []){
					this.BusStops = res;
				}
			})
		}
	}
</script>

<template>
	<view class="container">
		<view class="bus_message">
			<view class="line">
				<text>{{ StopLine.first }}</text>
				<image class="to_right" src="../../static/icons/services/right.png" mode=""></image>
				<text>{{ StopLine.end }}</text>
			</view>
			
			<view class="msg">
				<text class="time">￥{{ StopLine.price }}元</text>
				<text class="km">全程{{ StopLine.mileage }}km</text>
			</view>
			
			<view class="list">
				<scroll-view class="scroll" scroll-x="true" scroll-y="false" >
					<view class="scroll-out">
						<view class="scroll_view" v-for="(item,index) in BusStops" v-if="item.linesId*1==id" :key="index">
							<image src="../../static/icons/services/bus.png" mode="" v-if="index == 0"></image>
							<image class="dot" :src="index==0?'../../static/icons/services/dot_select.png':'../../static/icons/services/dot.png'" mode=""></image>
							<text :class="index==0?'text_select':''">{{ item.name }}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<button class="down" @click="down">下一步</button>
			
		</view>
	</view>
</template>

<style lang="less" scoped>
	.bus_message{
		width: 100%;
		height: 100%;
		.line{
			width: 90%;
			height: 10%;
			margin: 20px auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: center;
			background-color: #fff;
			border-radius: 20px;
			box-shadow: 0 0 30px #ccc;
			
			text{
				font-size: 40rpx;
			}
			
			.to_right{
				width: 35%;
				height: 15px;
			}
		}
		
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
			
			.time{
				font-size: 30px;
				color: #1675df;
			}
			
			.km{
				font-size: 20px;
				color: #4fd866;
			}
		}
		
		.list{
			width: 90%;
			height: 30%;
			margin: 20px auto;
			background-color: #fff;
			border-radius: 20px;
			box-shadow: 0 0 30px #ccc;
			
			.scroll{
				width: 100%;
				height: 100%;
				
				.scroll-out{
					width: 100%;
					height: 100%;
					display: flex;
					white-space: nowrap;
					
					.scroll_view{
						width: 40px;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						margin:auto 20px;
						
						image{
							width: 40px;
							height: 40px;
						}
						
						.dot{
							width: 25px;
							height: 25px;
							margin-top: 20px;
							margin-bottom: 10px;
						}
						text{
							width: 30px;
							height: auto;
							font-size: 20px;
							writing-mode: vertical-rl;
							line-height: 30px;
						}
						.text_select{
							width: 30px;
							height: auto;
							font-size: 20px;
							writing-mode: vertical-rl;
							line-height: 30px;
							color: #1afa29;
						}
					}
				}
			}
		}
		
		.down{
			width: 90%;
			height: 50px;
			background-color: #1675df;
			color: #fff;
			font-weight: bold;
		}
	}
</style>
