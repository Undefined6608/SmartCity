<script>
import { GetUesrMessage } from '@/common/api';
	export default {
		data() {
			return {
				list:['个人设置','我的订单','修改密码','意见反馈'],
				baseUrl:uni.getStorageSync('baseUrl',''),
				userMessage:{
					avatar:'',
					balance:0,
					email:'',
					idCard:'',
					nickName:'',
					phonenumber:'',
					score:0,
					sex:'',
					userId:'',
					userName:''
				}
			};
		},
		methods:{
			go(index){
				// console.log(index);
				if(index == 0){
					uni.navigateTo({
						url: `/pages/MinePage/setting?token=${uni.getStorageSync('token','')}`,
					});
					return;
				}
				if(index == 1){
					uni.navigateTo({
						url: '/pages/MinePage/goods'
					});
					return;
				}
				if(index == 2){
					uni.navigateTo({
						url: '/pages/MinePage/revise'
					});
					return;
				}
				if(index == 3){
					uni.navigateTo({
						url: '/pages/MinePage/putIdea'
					});
					return;
				}
			},
			loginOut(){
				uni.setStorageSync('token','')
				uni.navigateTo({
					url:'/pages/Login/Login'
				})
			}
		},
		mounted() {
			GetUesrMessage(uni.getStorageSync('token','')).then((res)=>{
				// console.log(res);
				this.userMessage = res;
				if(this.userMessage.avatar!=undefined){
					// console.log(this.baseUrl+this.userMessage.avatar)
				}else{
					uni.showToast({
						icon:'error',
						title:"请重新登录！",
						duration:900
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/Login/Login'
						})
					},1000)
				}
			})
			
		}
	}
</script>

<template>
	<view class="container">
		<view class="private">
			<view class="icon-view">
				<image class="icon" :src="baseUrl+userMessage.avatar" mode=""></image>
				<text class="name">{{ userMessage.nickName }}</text>
			</view>
			<uni-list class="list" :border="true">
				<uni-list-item class="list_item" v-for="(item,index) in list" :key="index" :title="item" link="reLaunch" ellipsis="1" clickable @click="go(index)" ></uni-list-item>
			</uni-list>
			<button class="button" @click="loginOut">退出登录</button>
		</view>
	</view>
</template>

<style lang="less" scoped>
	.private{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		
		.icon-view{
			width: auto;
			height: 200px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			.icon{
				width: 100px;
				height: 100px;
				border-radius: 50px;
			}
			
			.name{
				margin-top: 15px;
				font-size: 20px;
			}
		}
		
		.list{
			width: 90%;
			height: auto;
			display: flex;
			flex-direction: column;
			justify-content: start;
			
			
			.list_item{
				width: 100%;
				height: 50px;
			}
		}
		
		.button{
			width: 80%;
			height: 50px;
			font-size: 20px;
			margin-top: 20px;
			background-color: #4671D5;
			color: #fff;
		}
	}
</style>
