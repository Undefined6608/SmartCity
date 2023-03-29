<script>
import { selectHosCard,selectAppointment, insertAppointmentPage } from '@/common/api';
import { navigateBack } from '@/common/rule';
	export default {
		data() {
			return {
				msg:{
					categoryId: 0,
					money: 0,
					patientName: "",
					reserveTime: "",
					type: 1,
				},
				categoryName:""
			}
		},
		methods: {
			changeLog(e){
				this.msg.reserveTime = e;
			},
			qx(){
				this.msg.reserveTime= "";
				navigateBack();
			},
			qd(){
				// console.log(this.msg);
				insertAppointmentPage(uni.getStorageSync('token',''),this.msg).then((res)=>{
					if(res.code == 200){
						uni.showToast({
							icon:'success',
							title:"预约成功",
							duration:500
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/AppointmentHistory/AppointmentHistory'
							})
						},500)
					}
				})
			}
		},
		onLoad(e) {
			this.msg.categoryId = e.categoryId;
			this.msg.money = e.money;
			this.msg.type = e.type*1;
			
			selectHosCard(uni.getStorageSync('token','')).then((res)=>{
				// console.log(res);
				for (var i = 0; i < res.length; i++) {
					if(res[i].id == e.id*1){
						// console.log(res[i]);
						this.msg.patientName = res[i].name
					}
				}
			})
			
			selectAppointment(e.type).then((res)=>{
				// console.log(res);
				for (var i = 0; i < res.length; i++) {
					if(res[i].id == e.categoryId){
						this.categoryName = res[i].categoryName;
					}
				}
			});
		}
	}
</script>

<template>
	<view class="appointment_true">
		<view class="msg_view">
			<text class="item"><span class="up">就诊人</span>{{ msg.patientName }}</text>
			<text class="item"><span class="up">预约科室</span>{{ categoryName }}</text>
			<text class="item"><span class="up">门诊类型</span>{{ msg.type==1?'专家号':msg.type==2?'普通号':'错误' }}</text>
			<text class="item"><span class="up">金额</span>{{ msg.money }}元</text>
		</view>
		<view class="time">
			<span class="up">选择时间</span>
			<uni-datetime-picker class="s_time" returnType="timestamp" v-model="msg.reserveTime" @change="changeLog($event)" />
		</view>
		<view class="btn">
			<button class="qx" @click="qx">取消</button>
			<button class="qd" @click="qd">确定</button>
		</view>
	</view>
</template>

<style lang="less" scoped>
	.appointment_true{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		
		.msg_view{
			width: 90%;
			height: 200px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			background-color: #fff;
			box-shadow: 0 0 20px #ccc;
			margin-top: 20px;
			border-radius: 10px;
			
			.item{
				margin-left: 20px;
				font-size: 18px;
				
				.up{
					color: #0055ff;
					margin-right: 40px;
				}
			}
		}
		
		.time{
			width: 90%;
			height: 50px;
			margin-top: 20px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: center;
			
			.up{
				font-size: 18px;
				margin-left: 20px;
				color: #0055ff;
			}
			
			.s_time{
				flex: 0.9;
			}
		}
		
		.btn{
			width: 90%;
			height: 50px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			
			.qx{
				width: 40%;
				height: 100%;
				border-radius: 25px;
				background-color: #fff;
				border: 1px solid #0055ff;
				line-height: 50px;
			}
			
			.qd{
				width: 40%;
				height: 100%;
				border-radius: 25px;
				background-color: #0055ff;
				border: 1px solid #0055ff;
				line-height: 50px;
				color: #fff;
			}
		}
	}
</style>
