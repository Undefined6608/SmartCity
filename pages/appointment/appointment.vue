<template>
	<view class="appointment">
		<view class="methods">
			<uni-segmented-control :current="appointment_methods.current" :values="appointment_methods.item" :style-type="appointment_methods.styleType" :activeColor="appointment_methods.activeColor" @clickItem="onClickItem" />
		</view>
		<view class="appointment_page">
			<view class="appointment_inner" v-if="appointment_methods.current == 0">
				<uni-list>
					<uni-list-item v-for="(item,index) in zj_list" :key="index" showArrow :title="item.categoryName" clickable @click="yy(item.id,item.money,item.type,id)" ></uni-list-item>
				</uni-list>
			</view>
			<view class="appointment_inner" v-if="appointment_methods.current == 1">
				<uni-list>
					<uni-list-item v-for="(item,index) in pt_list" :key="index" showArrow :title="item.categoryName" clickable @click="yy(item.id,item.money,item.type,id)" ></uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
import { selectAppointment } from '@/common/api'
	export default {
		data() {
			return {
				appointment_methods:{
					current:0,
					item:['专家号','普通号'],
					styleType:'button',
					activeColor:'#007aff'
				},
				id:"",
				zj_list:[],
				pt_list:[]
			}
		},
		methods: {
			onClickItem(e){
				if(this.appointment_methods.current !== e.currentIndex){
					this.appointment_methods.current = e.currentIndex
				}
			},
			yy(categoryId,money,type,id){
				uni.navigateTo({
					url:'/pages/appointment_true/appointment_true?categoryId='+categoryId+'&money='+money+'&type='+type+'&id='+id
				})
			}
		},
		onLoad(e) {
			this.id = e.id;
			selectAppointment(1).then((res)=>{
				// console.log(res);
				if(res!=[]){
					this.zj_list = res;
				}
			});
			selectAppointment(2).then((res)=>{
				// console.log(res);
				if(res!=[]){
					this.pt_list = res;
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.appointment{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		
		.methods{
			width: 90%;
			height: 40px;
			margin-top: 20px;
		}
		
		.appointment_page{
			width: 90%;
			height: auto;
			margin-top: 10px;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			
			.appointment_inner{
				width: 100%;
				height: auto;
				
			}
		}
	}
</style>
