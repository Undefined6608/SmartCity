<script>
import { selectHosCard, updateHosCard } from '@/common/api';
	export default {
		data() {
			return {
				user:{
					address:"",
					birthday:"",
					cardId:"",
					name:"",
					sex:"0",
					tel:"",
					id:"",
					
				},
				sexs: [{
							text: '男',
							value: "0"
						}, {
							text: '女',
							value: "1"
						}
					]
			}
		},
		methods: {
			maskClick(e){
				
			},
			back(){
				this.user.address = "";
				this.user.birthday = "";
				this.user.cardId = "";
				this.user.sex = "0";
				this.user.tel = "";
				uni.navigateBack();
			},
			ok(){
				// console.log(this.user);
				if(this.user.address != "" && this.user.birthday != "" && this.user.cardId != "" && this.user.tel != ""){
					updateHosCard(uni.getStorageSync('token',''),this.user).then((res)=>{
						// console.log(res);
						if(res.code == 200){
							uni.showToast({
								icon:'success',
								title:"修改成功",
								duration:500
							})
							setTimeout(()=>{
								uni.navigateBack();
							},500)
						}else{
							uni.showToast({
								icon:'error',
								title:"修改失败"
							})
						}
					})
				}else{
					uni.showToast({
						icon:'error',
						title:"信息不完整"
					})
				}
			}
		},
		onLoad(e){
			// console.log(e.id);
			selectHosCard(uni.getStorageSync('token','')).then((res)=>{
				console.log(res);
				for (var i = 0; i < res.length; i++) {
					if(res[i].id == e.id*1){
						this.user = res[i];
					}
				}
			})
		}
		
	}
</script>

<template>
	<view class="setting-hos-card">
		<view class="item">
			<text>姓名</text>
			<input v-model="user.name" type="text" placeholder="请输入姓名">
		</view>
		<view class="item">
			<text>性别</text>
			<uni-data-checkbox class="xb" v-model="user.sex" :localdata="sexs" />
		</view>
		<view class="item">
			<text>身份证号</text>
			<input v-model="user.cardId" type="text" placeholder="请输入身份证号">
		</view>
		<view class="item">
			<text>出生年月</text>
			<uni-datetime-picker class="rq" type="date" :clear-icon="false" v-model="user.birthday" @maskClick="maskClick" />
		</view>
		<view class="item">
			<text>手机号</text>
			<input v-model="user.tel" type="text" placeholder="请输入手机号">
		</view>
		<view class="item">
			<text>住址</text>
			<input v-model="user.address" type="text" placeholder="请输入住址">
		</view>
		
		<view class="btn_out">
			<button class="back" @click="back">取消</button>
			<button class="ok" @click="ok">确定</button>
		</view>
	</view>
</template>

<style lang="less" scoped>
	.setting-hos-card{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.item{
			width: 90%;
			height: 50px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2px dashed #aaa;
			
			.xb{
				width: 100px;
				flex: 0.4;
			}
			
			.rq{
				flex: 0.5;
			}
			
			input{
				text-align: right;
			}
		}
		
		.btn_out{
			width: 95%;
			height: 50px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			margin-top: 20px;
			
			.back{
				width: 40%;
				height: 100%;
				background-color: #fff;
				box-shadow: 0 0 20px #ccc;
				border-radius: 25px;
				border: 1px solid #aaa;
			}
			
			.ok{
				width: 40%;
				height: 100%;
				background-color: #4b5cc4;
				box-shadow: 0 0 20px #ccc;
				border-radius: 25px;
				border: 1px solid #4b5cc4;
				color: #fff;
			}
		}
		
	}
</style>
