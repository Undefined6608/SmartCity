<script>
import { getGoods, selectBusGoods } from '@/common/api'
	export default {
		data() {
			return {
				BusGoods_nor:[],
				BusGoods:[],
				Goods_nor:[],
				Goods:[],
				select_methods:{
					current:0,
					item:['未支付','已支付'],
					styleType:'button',
					activeColor:'#007aff'
				}
			}
		},
		methods: {
			onClickItem(e){
				if(this.select_methods.current !== e.currentIndex){
					this.select_methods.current = e.currentIndex
				}
			},
			jumpPrice(item){
				uni.navigateTo({
					url:'/pages/MinePage/js?orderNum='+item.orderNum+'&price='+item.price
				})
			}
		},
		onShow() {
			getGoods(uni.getStorageSync('token','')).then((res)=>{
				// console.log(res);
				if(res!=[]){
					let a = [];
					let b = [];
					for (var i = 0; i < res.length; i++) {
						if(res[i].status == 0){
							a.push(res[i])
						}else{
							b.push(res[i])
						}
					}
					this.Goods_nor = a;
					this.Goods = b;
				}
			})
			selectBusGoods(uni.getStorageSync('token','')).then((res)=>{
				// console.log(res);
				if(res!=[]){
					let a = [];
					let b = [];
					for (var i = 0; i < res.length; i++) {
						if(res[i].status == 0){
							a.push(res[i])
						}else{
							b.push(res[i])
						}
					}
					this.BusGoods_nor = a;
					this.BusGoods = b;
				}
			})
		}
	}
</script>

<template>
	<view class="container">
		<view class="goods">
			<uni-section title="订单详情" type="line" titleFontSize="20px">
				<view class="methods">
					<uni-segmented-control :current="select_methods.current" :values="select_methods.item" :style-type="select_methods.styleType" :activeColor="select_methods.activeColor" @clickItem="onClickItem" />
				</view>
				<view class="goods_page">
					<view class="goods_inner" v-if="select_methods.current == 0">
						<scroll-view scroll-y="true" class="scroll">
							<view class="list">
								<view class="bus" v-if="BusGoods_nor.length != 0">
									<view class="item" v-for="(item,index) in BusGoods_nor" :key="index" @click="jumpPrice(item)">
										<view class="left">
											<text>{{ item.path }}</text>
											<view class="msg">
												<text>{{ item.start }}</text>
												<image class="jt" src="../../static/icons/services/jiantou.png" mode=""></image>
												<text>{{ item.end }}</text>
											</view>
										</view>
										<text class="ts">去结算</text>
										<image class="right" src="../../static/icons/right_ou.png" mode=""></image>
									</view>
								</view>
								<view class="goods" v-if="Goods_nor.length != 0">
									<view class="item" v-for="(item,index) in BusGoods_nor" :key="index" @click="jumpPrice(item)">
										<view class="left">
											
										</view>
										<text class="ts">去结算</text>
										<image class="right" src="../../static/icons/right_ou.png" mode=""></image>
									</view>
								</view>
								<view class="null" v-if="BusGoods_nor.length == 0&&Goods_nor.length == 0">
									<image src="../../static/icons/not.png" mode=""></image>
									<text>暂无订单</text>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="goods_inner" v-if="select_methods.current == 1">
						<scroll-view scroll-y="true" class="scroll">
							<view class="list">
								<view class="bus" v-if="BusGoods.length != 0">
									<view class="item" v-for="(item,index) in BusGoods" :key="index">
										<view class="left">
											<text>{{ item.path }}</text>
											<view class="msg">
												<text>{{ item.start }}</text>
												<image class="jt" src="../../static/icons/services/jiantou.png" mode=""></image>
												<text>{{ item.end }}</text>
											</view>
										</view>
									</view>
								</view>
								<view class="goods" v-if="Goods.length != 0">
									<view class="item" v-for="(item,index) in BusGoods" :key="index">
										<view class="left">
											
										</view>
									</view>
								</view>
								<view class="null" v-if="BusGoods.length == 0&&Goods.length == 0">
									<image src="../../static/icons/not.png" mode=""></image>
									<text>暂无订单</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</uni-section>
		</view>
	</view>
</template>

<style lang="less" scoped>
	.goods{
		width: 90vw;
		height: auto;
		margin: 40px auto;
		box-shadow: 0 0 20px #ccc;
		
		.goods_page{
			width: 100%;
			margin-top: 10px;
			height: auto;
			
			.goods_inner{
				overflow: hidden;
				width: 100%;
				height: auto;
				padding-bottom: 20px;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				.bus,.goods,.null{
					width: 100%;
					height: auto;
					display: flex;
					flex-direction: column;
					align-items: center;
					
					.scroll{
						width: 100%;
						height: 100%;
						
						.list{
							width: 100%;
							height: auto;
							display: flex;
							flex-direction: column;
							align-items: center;
						}
					}
				}
				
				.bus{
					.item{
						width: 90%;
						height: 70px;
						margin: 0 auto;
						margin-bottom: 10px;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-around;
						align-items: center;
						border-bottom: 2px dashed #aaa;
						.left{
							width: 70%;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							
							.msg{
								width: 100%;
								display: flex;
								flex-wrap: wrap;
								align-items: center;
								justify-content: space-around;
								.jt{
									width: 40%;
									height: 20px;
								}
							}
						}
						
						.ts{
							font-size: 10px;
						}
						
						.right{
							width: 20px;
							height: 20px;
						}
					}
				}
				
				.null{
					image{
						width: 100px;
						height: 100px;
						margin-top: 20px;
					}
					
					text{
						margin: 20px;
						font-size: 20px;
						color: #666666;
					}
				}
			}
		}
	}
</style>
