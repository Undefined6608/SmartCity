<template>
	<view class="container">
		<view class="ditie_inner">
			<view class="line">
				<text>{{ handler.first }}</text>
				<image class="to_right" src="../../static/icons/services/right.png" mode=""></image>
				<text>{{ handler.end }}</text>
			</view>
			
			<view class="msg">
				<text class="time">{{ handler.remainingTime }}分钟</text>
				<text class="km">{{ handler.stationsNumber }}站/{{ handler.km }}km</text>
			</view>
			
			<view class="list">
				<scroll-view class="scroll" scroll-x="true" scroll-y="false" >
					<view class="scroll-out">
						<view class="scroll_view" v-for="(item,index) in handler.metroStepList" :key="index">
							<image src="../../static/icons/services/metro.png" mode="" v-if="item.name == handler.runStationsName"></image>
							<image class="dot" :src="item.name == handler.runStationsName?'../../static/icons/services/dot_select.png':'../../static/icons/services/dot.png'" mode=""></image>
							<text :class="item.name == handler.runStationsName?'text_select':''">{{ item.name }}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import { HomeDiTieLoad } from '@/common/api'
	export default {
		data() {
			return {
				handler:{
					cityId: 0,
					end: "",
					endTime: "",
					first: "",
					id: 31,
					km: 0,
					metroStepList: [],
					name: "",
					remainingTime: 0,
					runStationsName: "",
					startTime: "",
					stationsNumber: 0
				}
			}
		},
		methods: {
			
		},
		onLoad(e) {
			HomeDiTieLoad(e.id).then((res)=>{
				// console.log(res);
				this.handler = res;
				uni.setNavigationBarTitle({
					title:this.handler.name
				})
			})
		}
	}
</script>

<style lang="less" scoped>
	.ditie_inner{
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
	}
</style>
