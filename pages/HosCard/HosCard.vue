<script>
import { selectHosCard } from '@/common/api'
	export default {
		data() {
			return {
				baseUrl:uni.getStorageSync('baseUrl',""),
				HosCardList:[],
			}
		},
		methods: {
			add(){
				uni.navigateTo({
					url:'/pages/AddHosCard/AddHosCard'
				})
			},
			next(id){
				uni.navigateTo({
					url:"/pages/appointment/appointment?id="+id
				})
			},
			setting(id){
				uni.navigateTo({
					url:'/pages/SettingHosCard/SettingHosCard?id='+id
				})
			}
		},
		onShow() {
			selectHosCard(uni.getStorageSync('token','')).then((res)=>{
				// console.log(res);
				this.HosCardList = res;
			})
		}
	}
</script>

<template>
	<view class="HosCard">
		<view class="item" v-for="(item,index) in HosCardList" :key="index" @click="next(item.id)">
			<image class="tx" :src="item.imgUrl==null?'../../static/icons/user.png':baseUrl+item.imgUrl" mode=""></image>
			<view class="msg">
				<text class="name">{{item.name}}</text>
				<text class="id-card">身份证号: {{ item.cardId }}</text>
				<text class="phone">手机号: {{ item.tel }}</text>
			</view>
			<image @click.stop="setting(item.id)" class="setting" src="../../static/icons/set.png" mode=""></image>
		</view>
		<view class="add_out" @click="add">
			<image class="add_icon" src="../../static/icons/add.png" mode=""></image>
			<text class="add_msg">添加就诊人</text>
		</view>
	</view>
</template>

<style lang="less" scoped>
	.HosCard{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		
		.item{
			width: 95%;
			height: 100px;
			margin-top: 20px;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 0 20px #ccc;
			border-radius: 10px;
			
			.tx{
				width: 50px;
				height: 50px;
			}
			
			.msg{
				width: 250px;
				height: 90%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				
				.name{
					font-size: 25px;
					font-weight: bold;
					line-height: 30px;
					border-bottom: 2px dashed #aaa;
				}
			}
			
			.setting{
				width: 35px;
				height: 35px;
				z-index: 5;
			}
			
		}
		
		.add_out{
			width: 95%;
			height: 100px;
			margin-top: 20px;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 20px #ccc;
			border-radius: 10px;
			.add_icon{
				width: 40px;
				height: 40px;
			}
			
			.add_msg{
				font-size: 18px;
				margin-left: 10px;
			}
		}
	}
</style>
