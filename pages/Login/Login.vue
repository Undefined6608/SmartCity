<template>
	<view class="container">
		<view class="login">
			<uni-section title="登录" type="line" titleFontSize="20px">
				<view class="methods">
					<uni-segmented-control :current="Login_methods.current" :values="Login_methods.item" :style-type="Login_methods.styleType" :activeColor="Login_methods.activeColor" @clickItem="onClickItem" />
				</view>
				<view class="login_page">
					<view class="login_inner" v-if="Login_methods.current == 0">
						<uni-section title="账号" subTitle="请输入您的账号" type="line" padding>
							<uni-easyinput type="text" v-model="username" style="color: #00f;" placeholder="请输入账号"></uni-easyinput>
						</uni-section>
						<uni-section title="密码" subTitle="请输入您的密码" type="line" padding>
							<uni-easyinput type="password" v-model="password" style="color: #00f;" placeholder="请输入密码"></uni-easyinput>
						</uni-section>
						<button class="button" type="primary" @click="login">登录</button>
					</view>
					<view class="login_inner" v-if="Login_methods.current == 1">
						<text>此登录方式还在开发中，尽请期待···</text>
					</view>
				</view>
			</uni-section>
		</view>
	</view>
</template>

<script>
	import { Login } from '@/common/api'
	import { switchTab } from '@/common/rule'
	export default {
		data() {
			return {
				Login_methods:{
					current:0,
					item:['账号密码登录','注册'],
					styleType:'button',
					activeColor:'#007aff'
				},
				username:uni.getStorageSync("username",""),
				password:""
			};
		},
		methods:{
			onClickItem(e){
				if(this.Login_methods.current !== e.currentIndex){
					this.Login_methods.current = e.currentIndex
				}
			},
			login(){
				Login(this.username, this.password).then((res)=>{
					// console.log(res);
					if(res.code == 200){
						uni.setStorageSync("token",res.token);
						uni.setStorageSync("username",this.username);
						uni.setStorageSync("password",this.password);
						uni.showToast({
							icon:'success',
							title:"登录成功！正在跳转···",
							duration:500
						})
						switchTab("/pages/Home/Home");
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						})
						this.password = "";
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login{
		width: 90vw;
		height: auto;
		margin: 40px auto;
		
		.login_page{
			width: 100%;
			margin-top: 10px;
			height: auto;
			
			.login_inner{
				overflow: hidden;
				width: 100%;
				height: auto;
				padding-top: 20px;
				
				.button{
					width: 80%;
					margin-top: 40px;
					margin-bottom: 40px;
				}
			}
		}
	}
</style>
