<template>
	<view class="container">
		<view id="stop_inner_page">
			<view class="stop_load">
				<view class="top">
					<text class="left">{{ stop_list_msg.parkName }}</text>
					<text class="right">{{ stop_list_msg.distance }}公里</text>
				</view>
				<view class="bottom">
					<view class="message">
						<text>{{ stop_list_msg.open=="Y"?"对外开放":"暂不对外开放" }}</text>
						<view class="load">
							<image src="../../static/icons/postion.png" mode=""></image>
							<text>{{ stop_list_msg.address }}</text>
						</view>
					</view>
					<view class="car_msg">
						<view class="title">
							<text>车位信息</text>
						</view>
						<view class="type">
							<text>停车费</text>
							<text>剩余车位</text>
						</view>
						<view class="number">
							<text class="left">{{ stop_list_msg.rates }}元<span class="dw">/小时</span></text>
							<text class="right">{{ stop_list_msg.vacancy }}个<span class="dw">/{{ stop_list_msg.allPark }}个</span></text>
						</view>
					</view>
				</view>
				<view class="money">
					<text>收费参考</text>
					<text>每小时{{ stop_list_msg.rates }}元, 最高{{ stop_list_msg.priceCaps }}元一天</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { HomeStopMsg } from '@/common/api';
	export default {
		data() {
			return {
				stop_list_msg:{
					address:"",//地址
					allPark:"",//总车位
					distance:"",//公里数
					imgUrl:"",//图片
					open:"",// 是否对外开放
					parkName:"",//停车场名称
					priceCaps:"",//最高价格
					rates:"",//停车费
					vacancy:""// 剩余车位
				}
			};
		},
		onLoad(res){
			HomeStopMsg(res.id).then((handler_res)=>{
				// console.log(handler_res);
				this.stop_list_msg = handler_res;
			})
		}
	}
</script>

<style lang="less" scoped>
	#stop_inner_page{
		.stop_load{
			width: 90%;
			height: auto;
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
				height: auto;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				
				.message{
					width: 90%;
					height: 150rpx;
					padding-left: 20px;
					border-bottom: 1px solid #dddddd;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					text{
						width: 100%;
						font-size: 18px;
						color: #000;
						line-height: 25px;
					}
					
					.load{
						display: flex;
						flex-wrap: wrap;
						justify-content: left;
						align-items: center;
						image{
							width: 35px;
							height: 35px;
						}
						text{
							flex: 1;
							font-size: 18px;
							line-height: 25px;
							color:#757575;
						}
					}
				}
				
				.car_msg{
					width: 90%;
					height: 200rpx;
					padding-left: 10px;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					
					.title{
						width: 100%;
						font-size: 18px;
						color: #000;
						line-height: 25px;
					}
					
					.type{
						display: flex;
						flex-wrap: wrap;
						justify-content: space-around;
						
						text{
							font-size: 16px;
							line-height: 20px;
							color:#757575;
						}
					}
					
					.number{
						display: flex;
						flex-wrap: wrap;
						justify-content: space-around;
						margin-bottom: 10px;
						
						text{
							font-size: 25px;
						}
						
						text.left{
							color: #fc9825;
						}
						
						text.right{
							color:#2638ec;
						}
						
						.dw{
							font-size: 15px;
						}
					}
				}
			}
			
			.money{
				width: 100%;
				height: 120rpx;
				background-color: #7f8bf7;
				color: #fff;
				font-size: 15px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding-bottom: 5px;
				
				text{
					width: 90%;
					margin-left: 20px;
				}
			}
		}
	}
</style>
