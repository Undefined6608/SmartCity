<template>
	<view class="container">
		<view id="stop">
			<scroll-view class="scroll" scroll-y="true" scroll-x="false">
				<view class="stop_load" v-for="(item, index) in stop_list" :key="index" v-if="index < stop_list_length" @click="show_stop_inner(item.id)">
					<view class="top">
						<text class="left">{{ item.parkName }}</text>
						<text class="right">{{ item.distance }}公里</text>
					</view>
					<view class="bottom">
						<view class="message">
							<text>空位{{ item.priceCaps }}个 | 停车费{{ item.rates }}/小时</text>
							<text>{{ item.address }}</text>
						</view>
						<view class="icon">
							<image src="@/static/icons/right.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="list_btn_view">
					<button class="list_btn" @click="showStopTakeNotes()">查看停车记录</button>
					<button class="list_btn" @click="showMore(stop_list.length+3)">查看更多</button>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { HomeStopList } from '@/common/api';
	import { navigateTo } from '../../common/rule';
	export default {
		data() {
			return {
				stop_list:[],
				stop_list_length:3
			};
		},
		methods:{
			showMore(){
				if (this.stop_list_length + 3 < this.stop_list.length) {
					this.stop_list_length += 3;
				} else{
					this.stop_list_length = this.stop_list.length;
					uni.showToast({
						icon:'none',
						title:"暂无更多"
					})
				}
			},
			showStopTakeNotes(){
				navigateTo("/pages/TuiJian/ParkingRecord");
			},
			show_stop_inner(id){
				navigateTo("/pages/InnerPage/StopInnerPage?id="+id);
			}
		},
		onShow() {
			HomeStopList().then((res)=>{
				this.stop_list = res;
				// console.log(this.stop_list);
			})
		}
	}
</script>

<style lang="less" scoped>
	#stop{
		width: 100%;
		height: 100%;
		
		.scroll{
			width: 100%;
			height: 100%;
			
			.stop_load{
				width: 90%;
				height: 240rpx;
				margin: 19rpx auto;
				border-radius: 20px;
				display: flex;
				flex-direction: column;
				overflow: hidden;
				// 设置组件突出显示
				box-shadow: 0px 0px 30px #ccc;
				
				.top{
					width: 100%;
					height: 75rpx;
					display: flex;
					align-items: center;
					background: linear-gradient(#8bc6fc,#ffffff);
					border-bottom: 2px dashed #90bad6;
					
					text.left{
						width: 70%;
						height: 75rpx;
						line-height: 75rpx;
						font-size: 20px;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-left: 10px;
						color: #5161de;
						
					}
					
					text.right{
						font-size: 20px;
						text-align: right;
						margin-right: 10px;
						flex: 1;
						color: #5161de;
					}
				}
				
				.bottom{
					width: 100%;
					height: calc(240rpx - 75rpx);
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					align-items: center;
					
					.message{
						width: 70%;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						text{
							font-size: 18px;
							color: #4d4d4d;
							line-height: 25px;
						}
					}
					
					.icon{
						width: 40px;
						height: 40px;
						image{
							width: 100%;
							height: 100%;
						}
					}
				}
			}
			
			.list_btn_view{
				width: 100%;
				height: 60px;
				margin: 20px auto;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				
				.list_btn{
					width: 40%;
					height: 40px;
					background-color: #ffa238;
					color: #fff;
					border-radius: 25px;
					line-height: 40px;
				}
			}
		}
	}
</style>
