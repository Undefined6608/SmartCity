<script>
import { getBusLine, getBusStop } from '@/common/api';
	export default {
		data() {
			return {
				BusLines:[],
				BusStops:[]
			};
		},
		methods:{
			jumpStop(id){
				uni.navigateTo({
					url:'/pages/InnerPage/busMessage?id='+id
				})
			}
		},
		mounted() {
			getBusLine().then((res)=>{
				// console.log(res);
				if(res != []){
					this.BusLines = res;
				}
			})
			getBusStop().then((res)=>{
				// console.log(res);
				if(res != []){
					this.BusStops = res;
				}
			})
		},
	}
</script>

<template>
	<view class="container">
		<view class="bus">
			<scroll-view class="scroll" scroll-y="true" >
				<view>
					<view class="item-bus" v-for="(item,index) in BusLines" :key="index">
						<view class="top" @click="jumpStop(item.id)">
							<text class="name">{{ item.name }}</text>
							<view class="message">
								<view class="title">
									<image class="icon" src="../../static/icons/services/bus.png" mode=""></image>
									<text>{{ item.first }}</text>
									<image class="jt" src="../../static/icons/services/right.png" mode=""></image>
									<text>{{ item.end }}</text>
								</view>
								<view class="bottom">
									<view class="left">
										<text>票价：￥{{ item.price }}</text>
										<text>里程：{{ item.mileage }}</text>
									</view>
									<view class="right">
										<view class="s">
											<image src="../../static/icons/start.png" mode=""></image>
											<text>{{ item.startTime }}</text>
										</view>
										<view class="s">
											<image src="../../static/icons/end.png" mode=""></image>
											<text>{{ item.endTime }}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<uni-collapse class="collapse">
							<uni-collapse-item title="路线信息">
								<view class="block_box">
									<view class="left">
										<ul>
											<li v-for="(item1, index1) in BusStops" :key="index1" v-if="item1.linesId*1==item.id">
												<text>{{ item1.name }}</text>
											</li>
										</ul>
									</view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</view>
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<style lang="less" scoped>
	.bus{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.scroll{
			width: 95%;
			height: 100%;
			
			.item-bus{
				width: 100%;
				height: auto;
				margin-top: 20px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				background-color: #fff;
				box-shadow: 0 10px 10px #ccc;
				
				.top{
					width: 100%;
					height: 240px;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					.name{
						width: 120px;
						height: 50px;
						line-height: 50px;
						background-color: #e0eee8;
						text-align: center;
						font-weight: bold;
						border-radius: 10px;
					}
					
					.message{
						width: 100%;
						height: 160px;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						align-items: center;
						
						.title{
							width: 100%;
							height: 50px;
							display: flex;
							flex-wrap: wrap;
							justify-content: center;
							align-items: center;
							
							.icon{
								width: 50px;
								height: 50px;
							}
							
							text{
								font-size: 18px;
								margin-left: 20px;
							}
							
							.jt{
								width: 100px;
								height: 20px;
								margin-left: 20px;
							}
						}
						
						.bottom{
							width: 95%;
							height: 100px;
							display: flex;
							flex-wrap: wrap;
							justify-content: space-around;
							align-items: center;
							
							.left{
								width: 45%;
								height: 100%;
								display: flex;
								flex-direction: column;
								justify-content: space-around;
								align-items: center;
								
								text{
									font-size: 15px;
									color: #1685a9;
								}
							}
							
							.right{
								width: 45%;
								height: 100%;
								display: flex;
								flex-direction: column;
								justify-content: space-around;
								align-items: center;
								
								text{
									font-size: 15px;
									color: #21a675;
								}
								
								.s{
									width: 100%;
									height: auto;
									display: flex;
									flex-wrap: wrap;
									justify-content: center;
									align-items: center;
									image{
										width: 40px;
										height: 40px;
										margin: 10px;
									}
								}
							}
						}
					}
				}
			}
			
			.collapse{
				width: 100%;
				height: auto;
				
				.block_box{
					width: 100%;
					height: auto;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					align-items: center;
					
					.left{
						width: 45%;
						height: auto;
						
						ul{
							padding: 0;
							color: #a4e2c6;
							
							li{
								font-size: 20px;
								margin-bottom: 10px;
								
								text{
									color:black;
									margin-left: 20px;
								}
							}
						}
					}
				}
			}
		}
		
	}
</style>
