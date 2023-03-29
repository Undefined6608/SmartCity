<template>
	<view class="container">
		<view class="setting">
			<view class="item">
				<text>头像</text>
				<image class="avatar" v-if="userMessage.avatar!=''" :src="baseUrl+userMessage.avatar" mode="" @click="upAvatar"></image>
				<image class="avatar" v-if="userMessage.avatar==''" src="../../static/icons/user.png" mode="" @click="upAvatar"></image>
			</view>
			<view class="item">
				<text>昵称</text>
				<input class="input" type="text" v-model="userMessage.nickName"/>
			</view>
			<view class="item">
				<text>性别</text>
				<radio-group @change="setSex">
					<label class="radio"><radio value="0" :checked="userMessage.sex=='0'" />男</label>
					<label class="radio"><radio value="1" :checked="userMessage.sex=='1'"/>女</label>
				</radio-group>
			</view>
			<view class="item">
				<text>证件号</text>
				<input class="input" type="text" v-model="userMessage.idCard"/>
			</view>
			<view class="item">
				<text>邮箱</text>
				<input class="input" type="text" v-model="userMessage.email"/>
			</view>
			<view class="item">
				<text>手机号</text>
				<input class="input" type="text" v-model="userMessage.phonenumber"/>
			</view>
		</view>
		
		<button class="update" @click="update">确定</button>
	</view>
</template>

<script>
import { GetUesrMessage, UpdateUesrMessage, UpFile } from '../../common/api';
	export default {
		data() {
			return {
				baseUrl:uni.getStorageSync('baseUrl',''),
				userMessage:{
					avatar:'',
					email:'',
					idCard:'',
					nickName:'',
					phonenumber:'',
					sex:'',
				}
			}
		},
		methods: {
			setSex(e){
				// console.log(e.detail.value);
				this.userMessage.sex = e.detail.value;
			},
			upAvatar(){
				let that = this
				uni.chooseImage({
					count:1,
					success: chooseImageRes =>{
						console.log('成功',chooseImageRes);
						const tempFilePaths = chooseImageRes.tempFilePaths[0];
						uni.uploadFile({
							url:uni.getStorageSync('baseUrl','')+"/prod-api/common/upload",
							header:{
								Authorization:"Bearer "+uni.getStorageSync("token",'')
							},
							filePath:tempFilePaths,
							name:'file',
							success: (res) => {
								console.log(res);
								let src = JSON.parse(res.data).fileName
								console.log(JSON.parse(res.data).fileName);
								that.userMessage.avatar = '/prod-api'+src;
							}
						})
					}
				})
			},
			update(){
				UpdateUesrMessage(uni.getStorageSync('token',''),this.userMessage).then((res)=>{
					console.log(res);
					if(res.code == 200){
						uni.showToast({
							icon:'success',
							title:'修改成功'
						})
					}
				})
			}
		},
		onLoad(e) {
			// console.log(e);
			GetUesrMessage(e.token).then((res)=>{
				// console.log(res);
				this.userMessage = res;
			})
		}
	}
</script>

<style lang="less" scoped>
	.setting{
		width: 90%;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		margin: 20px auto;
		box-shadow: 0 0 20px #ccc;
		border-radius: 15px;
		background-color: #e0f0e9;
		
		
		.item{
			width: 90%;
			height: auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px dashed #ccc;
			
			
			text{
				font-size: 20px;
				line-height: 60px;
			}
			
			.avatar{
				width: 60px;
				height: 60px;
				border-radius: 30px;
			}
			
			input{
				height: 40px;
				font-size: 20px;
				text-align: right;
			}
			
			.radio{
				margin-right: 10px;
				font-size: 20px;
			}
		}
	}
	.update{
		width: 90%;
		height: 50px;
		font-size: 20px;
		background-color: #f2ecde;
		margin-top: 40px;
		border-radius: 10px;
	}
</style>
