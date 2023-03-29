<template>
	<view class="container">
		<view class="chengche">
			<view class="form">
				<view class="item">
					<text>{{ formList[0] }}</text>
					<uni-datetime-picker class="xzq" type="date" :clear-icon="false" v-model="message.date" @change="dateClick" :border="false" />
				</view>
				<view class="item">
					<text>{{ formList[1] }}</text>
					<picker class="xzq" mode="time" :value="message.time" start="00:00" end="23:59" @change="bindTimeChange">
						<view class="xzq_input">{{message.time}}</view>
					</picker>
				</view>
				<view class="item">
					<text>{{ formList[2] }}</text>
					<input type="text" v-model="message.name">
				</view>
				<view class="item">
					<text>{{ formList[3] }}</text>
					<input type="text" v-model="message.phone">
				</view>
				<view class="item">
					<text>{{ formList[4] }}</text>
					<uni-data-select
						class="xzq"
						:localdata="LoadList"
						v-model="message.upLoad"
					></uni-data-select>
				</view>
				<view class="item">
					<text>{{ formList[5] }}</text>
					<uni-data-select
						class="xzq"
						:localdata="LoadList"
						v-model="message.downLoad"
					></uni-data-select>
				</view>
			</view>
			<button class="down" @click="down">下一步</button>
		</view>
	</view>
</template>

<script>
import { getBusStop, GetUesrMessage } from '@/common/api';
	export default {
		data() {
			return {
				formList:["选择日期","时间选择","姓名","手机号码","上车地点","下车地点"],
				LoadList:[],
				id:1,
				message:{
					date:"",
					time:"请选择",
					name:"",
					phone:"",
					upLoad:"",
					downLoad:"",
					price:""
				}
			}
		},
		methods: {
			dateClick(e){
				this.message.date = e;
				// console.log(this.message.date);
			},
			down(){
				uni.navigateTo({
					url:'/pages/Bus/BusGoods?start='+this.message.upLoad+'&end='+this.message.downLoad+'&id='+this.id+'&name='+this.message.name+'&phone='+this.message.phone
				})
			},
			bindTimeChange(e){
				this.message.time = e.detail.value;
				// console.log(this.message.time);
			}
		},
		onLoad(e) {
			// console.log(e);
			GetUesrMessage(e.token).then((res)=>{
				// console.log(res);
				this.message.name = res.nickName;
				this.message.phone = res.phonenumber;
			})
			getBusStop().then((res)=>{
				// console.log(res);
				let a = [];
				let  j = 0;
				for (var i = 0; i < res.length; i++) {
					if(res[i].linesId==e.id*1){
						a.push({'value':res[i].name,'text':res[i].name});
						j++;
					}
				}
				this.LoadList = a;
				// console.log(this.LoadList);
			})
		}
	}
</script>

<style lang="less" scoped>
	.chengche{
		width: 100%;
		height: 100%;
		margin: 10px auto;
		overflow: hidden;
		
		.form{
			width: 90%;
			height: auto;
			display: flex;
			margin: 20px auto;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			background-color: #f0fcff;
			box-shadow: 0 0 10px #aaa;
			border-radius: 20px;
			
			.item{
				width: 100%;
				height: 60px;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2px dashed #aaa;
				
				text{
					margin-left: 20px;
				}
				
				input{
					text-align: right;
					margin-right: 20px;
				}
				
				.xzq{
					width: 30%;
					margin-left: 100px;
					margin-right: 20px;
					
					.xzq_input{
						text-align: right;
					}
				}
			}
		}
		
		.down{
			width: 90%;
			height: 50px;
			font-size: 20px;
			background-color: #1675df;
			color: #fff;
			font-weight: bold;
		}
	}
</style>
