<script>
import { selectHos } from '@/common/api';
	export default {
		data() {
			return {
				HosList:[],
				baseUrl:uni.getStorageSync("baseUrl",""),
			};
		},
		methods:{
			search(e){
				
			},
			clear(e){
			},
			jump(e){
				uni.navigateTo({
					url:'/pages/HosPage/HosPage?id='+ e
				})
			}
		},
		onShow() {
			selectHos().then((res)=>{
				// console.log(res);
				this.HosList = res;
			})
		}
	}
</script>

<template>
	<view class="container">
		<view class="Hos">
			<uni-search-bar class="search" placeholder="请输入搜索内容" @confirm="search" @clear="clear" @cancel="clear"></uni-search-bar>
			<view class="list">
				<view class="item" v-for="(item,index) in HosList" :key="index" @click="jump(item.id)">
					<view class="left">
						<image class="icon" :src="baseUrl+item.imgUrl" mode=""></image>
						<text class="title">{{ item.hospitalName }}</text>
					</view>
					<view class="right">
						<view class="level">
							<image v-for="(item1,index1) in item.level" class="sing" src="../../static/icons/sing.png" mode=""></image>
							<image v-for="(item1,index1) in 5-item.level" class="sing" src="../../static/icons/sing_nor.png" mode=""></image>
						</view>
						<image class="jump" src="../../static/icons/right_ou.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="less" scoped>
	.Hos{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		
		.search{
			width: 90%;
			background-color: #fff;
			margin-top: 10px;
			border-radius: 10px;
		}
		
		.list{
			width: 90%;
			height: auto;
			padding-top: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.item{
				width: 100%;
				height: 60px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;
				border-bottom: 2px dashed #aaa;
				
				.left{
					width: auto;
					height: 45px;
					display: flex;
					justify-content: start;
					align-items: center;
					margin-left: 10px;
					
					.icon{
						width: 50px;
						height: 30px;
					}
					
					.title{
						font-size: 15px;
						margin-left: 10px;
					}
					
				}
				
				.right{
					width: auto;
					height: 45px;
					display: flex;
					flex-wrap: wrap;
					justify-content: end;
					align-items: center;
					margin-right: 10px;
					
					.level{
						width: auto;
						height: 20px;
						.sing{
							width: 20px;
							height: 20px;
						}
					}
					
					.jump{
						width: 20px;
						height: 30px;
						margin-left: 10px;
					}
				}
			}
		}
	}
</style>
