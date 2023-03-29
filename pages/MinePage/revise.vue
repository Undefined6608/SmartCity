<template>
	<view class="container">
		<view class="revise">
			<view class="input">
				<image src="../../static/icons/locked.png" mode=""></image>
				<input type="password" v-model="old_password" placeholder="请输入原始密码" >
			</view>
			<view class="input">
				<image src="../../static/icons/locked.png" mode=""></image>
				<input type="password" v-model="new_password" placeholder="请输入新密码">
			</view>
			<view class="input">
				<image src="../../static/icons/locked.png" mode=""></image>
				<input type="password" v-model="verify_password" placeholder="请确认密码">
			</view>
			
			<button class="confirm" @click="confirm">确认</button>
		</view>
	</view>
</template>

<script>
import { UpdatePassword } from '../../common/api'
	export default {
		data() {
			return {
				old_password:'',
				new_password:'',
				verify_password:''
			}
		},
		methods: {
			confirm(){
				if(this.new_password == this.verify_password){
					UpdatePassword(uni.getStorageSync('token',''),this.old_password,this.new_password).then((res)=>{
						if(res.code == 200){
							uni.showToast({
								icon:'success',
								title:'修改成功，请重新登录',
								duration:500
							})
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/Login/Login'
								})
							},500)
						}else{
							uni.showToast({
								icon:'error',
								title:res.msg,
								duration:500
							})
						}
					})
				}else{
					uni.showToast({
						icon:'error',
						title:"两次输入的密码不一致",
						duration:500
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.revise{
		width: 90%;
		height: 35%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		box-shadow: 0 0 20px #ccc;
		margin: 20px auto; 
		background-color: #e9f1f6;
		
		.input{
			width: 90%;
			height: 20%;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			
			image{
				width: 40px;
				height: 40px;
				margin-left: 10px;
			}
			
			input{
				flex: 1;
				height: 40px;
				margin-left: 10px;
				margin-right: 10px;
				border-bottom: 2px solid #3eede7;
				
			}
		}
		.confirm{
			width: 90%;
			height: 50px;
			background-color: #815476;
			color: #fff;
			font-weight: bold;
			border-radius: 10px;
		}
	}

</style>
