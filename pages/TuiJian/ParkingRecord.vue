<script>
import { ParkingRecordList } from '../../common/api';
	export default {
		data() {
			return {
				turn_in:{
					date:"日期",
					time:"时间"
				},
				turn_out:{
					date:"日期",
					time:"时间"
				},
				RowsList:[],
				stop_list_length:3
			}
		},
		methods: {
			turn_in_date(e){
				this.turn_in.date = e.detail.value;
			},
			turn_in_time(e){
				this.turn_in.time = e.detail.value;
			},
			turn_out_date(e){
				this.turn_out.date = e.detail.value;
			},
			turn_out_time(e){
				this.turn_out.time = e.detail.value;
			},
			showMore(){
				if (this.stop_list_length + 3 < this.RowsList.length) {
					this.stop_list_length += 3;
				} else{
					this.stop_list_length = this.RowsList.length;
					uni.showToast({
						icon:'none',
						title:"暂无更多"
					})
				}
			}
		},
		onShow() {
			ParkingRecordList().then((res)=>{
				// console.log(res);
				if(res.length != 0){
					this.RowsList = res;
				}
			})
		}
	}
</script>

<template>
	<view class="container">
		<view class="park">
			<view class="top">
				<text class="title">请选择出入时间进行查询</text>
				<view class="time">
					<text>入场时间</text>
					<view class="select">
						<picker class="se" mode="date" @change="turn_in_date">
							<text>{{ turn_in.date }}</text>
						</picker>
						<picker class="se" mode="time" start="00:00" end="23:59" @change="turn_in_time">
							<text>{{ turn_in.time }}</text>
						</picker>
						<image src="../../static/icons/right_ou.png" mode=""></image>
					</view>
				</view>
				<view class="time">
					<text>出场时间</text>
					<view class="select">
						<picker class="se" mode="date" @change="turn_out_date">
							<text>{{ turn_out.date }}</text>
						</picker>
						<picker class="se" mode="time" start="00:00" end="23:59" @change="turn_out_time">
							<text>{{ turn_out.time }}</text>
						</picker>
						<image src="../../static/icons/right_ou.png" mode=""></image>
					</view>
				</view>
				<button class="search"><image src= "../../static/icons/search.png" mode=""></image></button>
			</view>
			
			<view class="list">
				<scroll-view class="scroll" scroll-y="true" scroll-x="false">
					<view class="stop_load" v-for="(item,index) in RowsList" :key="index" v-if="index < stop_list_length">
						<view class="item_top">
							<text class="left">{{ item.plateNumber }}</text>
							<text class="right">收费金额: {{ item.monetary }}</text>
						</view>
						<view class="bottom">
							<view class="message">
								<text><span class="say">入场时间</span>{{ item.entryTime }}</text>
								<text><span class="say">出场时间</span>{{ item.outTime }}</text>
								<text><span class="say">停车场名称</span>{{ item.parkName }}</text>
							</view>
						</view>
					</view>
					<view class="list_btn_view">
						<button class="list_btn" @click="showMore">查看更多</button>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<style lang="less" scoped>
	.park{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.top{
			width: 90%;
			height: 25vh;
			margin: 10px auto;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			background-color: #fff;
			border-radius: 20px;
			box-shadow: 0 0 30px #ccc;
			overflow: hidden;
			.title{
				width: 100%;
				height: 55px;
				line-height: 55px;
				padding-left: 40px;
				font-size: 20px;
				border-bottom: 2px solid #f7f7f7;
			}
			
			.time{
				width: 100%;
				height: 40px;
				border-bottom: 2px solid #f7f7f7;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				align-items: center;
				padding-left: 40px;
				text{
					font-size: 15px;
					line-height: 30px;
					color: #6e77f6;
				}
				.select{
					padding-right: 40px;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					.se{
						width: 100px;
						text-align: center;
						
						text{
							width: 100%;
							font-size: 15px;
							line-height: 30px;
							color: #000;
						}
					}
					
					image{
						width: 20px;
						height: 20px;
					}
				}
			}
			
			.search{
				width: 50%;
				height: 45px;
				margin: auto;
				border-radius: 23px;
				background-color: #ffa238;
				
				image{
					width: 45px;
					height: 45px;
				}
			}
		}
		
		.list{
			width: 90%;
			height: 530px;
			margin: 10px auto;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			background-color: #fff;
			border-radius: 20px;
			box-shadow: 0 0 30px #ccc;
			.scroll{
				width: 100%;
				height: 100%;
				
				.stop_load{
					width: 90%;
					flex: 1;
					margin: 19rpx auto;
					border-radius: 20px;
					display: flex;
					flex-direction: column;
					overflow: hidden;
					// 设置组件突出显示
					box-shadow: 0px 0px 30px #ccc;
					
					.item_top{
						width: 100%;
						height: 75rpx;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-around;
						align-items: center;
						background: linear-gradient(#8bc6fc,#ffffff);
						border-bottom: 2px dashed #90bad6;
						
						text.left{
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
						height: calc(260rpx - 75rpx);
						display: flex;
						flex-wrap: wrap;
						justify-content: space-around;
						align-items: center;
						
						.message{
							width: 90%;
							height: 100%;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							text{
								font-size: 18px;
								color: #4d4d4d;
								line-height: 25px;
							}
							
							.say{
								color: #707070;
								margin-right: 15px;
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
	}
</style>
