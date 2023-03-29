<script>
import { AllServerList } from '../../common/api';
import { navigateTo } from '../../common/rule';
	export default {
		data() {
			return {
				AllServerType:[],
				AllServerList:[],
				AllServerId:[],
				selectItem:0,
				BaseUrl:uni.getStorageSync('baseUrl','')
			};
		},
		mounted() {
			AllServerList().then((res)=>{
				// console.log(res)
				this.AllServerList = res;
				let a = [];
				let id = [];
				for (var i = 0; i < res.length; i++) {
					a.push(res[i].serviceType);
					id.push(res[i].id);
				}
				this.AllServerType = this.noRepeat2(a);
				this.AllServerId = id;
				// console.log(this.AllServerType);
			})
		},
		methods:{
			search(res){
				this.DiTie.loadName = res.value;
				
			},
			clear(e){
				
			},
			noRepeat2(arr){
				for (var i = 0; i < arr.length; i++) {
					if (arr.indexOf(arr[i]) != i) {
						arr.splice(i,1);//删除数组元素后数组长度减1后面的元素前移
						i--;//数组下标回退
					}
				}
				return arr;
			},
			setSelectItem(index,item){
				this.selectItem = index;
				
			},
			go(id){
				console.log(id);
				switch(id){
					case 0:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 1:
						uni.navigateTo({
							url:'/pages/TuiJian/TuiJianHos'
						})
						break;
					case 2:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 3:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 4:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 5:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 6:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 7:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 8:
						uni.navigateTo({
							url:'/pages/TuiJian/TuiJianStop'
						})
						break;
					case 9:
						uni.navigateTo({
							url:'/pages/TuiJian/TuiJianDiTie'
						})
						break;
					case 10:
						uni.navigateTo({
							url:'/pages/TuiJian/TuiJianBus'
						})
						break;
					case 11:
						uni.navigateTo({
							url:'/pages/TuiJian/TuiJianHos'
						})
						break;
					case 12:
						uni.navigateTo({
							url:'/pages/TuiJian/TuiJianJiaoguan'
						})
						break;
					case 13:
						uni.navigateTo({
							url:'/pages/InnerPage/living_expenses'
						})
						break;
					case 14:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 15:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 16:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 17:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 18:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 19:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 20:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 21:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 22:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
					case 23:
						uni.showToast({
							icon:'error',
							title:'正在开发中'
						})
						break;
				}
			}
		},
		computed:{
		}
	}
</script>

<template>
	<view class="container">
		<view class="all_server">
			<uni-search-bar class="search" placeholder="请输入搜索内容" @confirm="search" @clear="clear" @cancel="clear"></uni-search-bar>
			<view class="main">
				<view class="left">
					<text :class="selectItem==index?'select_left_item':'left_item'" v-for="(item,index) in AllServerType" :key="index" @tap="setSelectItem(index,item)">{{ item }}</text>
				</view>
				<view class="right">
					<scroll-view class="scroll" :scroll-y="true" :scroll-into-view="'list'+selectItem">
						<view class="inner">
							<view :id="'list'+index1" v-for="(item1,index1) in AllServerType" class="right_item" :key="index1">
								<text class="title"> {{ item1 }} </text>
								<view class="right_list_item">
									<view class="icon_item" v-for="(item2,index2) in AllServerList" v-if="item2.serviceType == item1" :key="index2" @click="go(index2)">
										<image class="icon" :src="BaseUrl+item2.imgUrl" mode=""></image>
										<text class="msg">{{ item2.serviceName }}</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="less" scoped>
	.all_server{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.search{
			width: 90%;
			height: 40px;
			background-color: #fff;
			margin-top: 10px;
			border-radius: 10px;
			border-bottom: 2px solid #e6e6e6;
		}
		
		.main{
			flex: 1;
			width: 90%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 20px #ccc;
			
			.left{
				width: 30%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: start;
				
				.left_item{
					width: 100%;
					height: 60px;
					font-size: 20px;
					text-align: center;
					line-height: 60px;
					background-color: #f3f1f2;
					color: #32373b;
					
					span{
						width: 100%;
						height: 100%;
					}
				}
				
				.select_left_item{
					width: 100%;
					height: 60px;
					font-size: 20px;
					text-align: center;
					line-height: 60px;
					background-color: #fff;
					color: #32373b;
					
					span{
						width: 100%;
						height: 100%;
					}
				}
			}
			.right{
				width: 70%;
				height: 100%;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				
				.scroll{
					width: 100%;
					height: 100%;
					
					.inner{
						width: 100%;
						height: 150%;
						
						.right_item{
							width: 100%;
							display: flex;
							flex-direction: column;
							justify-content: start;
							align-items: center;
							margin-top: 10px;
							
							.title{
								width: 100%;
								line-height: 40px;
								font-size: 20px;
								padding-left: 20px;
								margin-bottom: 10px;
							}
							
							.right_list_item{
								width: 100%;
								height: auto;
								display: flex;
								flex-wrap: wrap;
								align-items: center;
								border-bottom: 1px solid #e6e6e6;
								
								.icon_item{
									width: 70px;
									height: 80px;
									margin-left: 10px;
									margin-top: 10px;
									display: flex;
									flex-direction: column;
									align-items: center;
									
									.icon{
										width: 50px;
										height: 50px;
									}
									.msg{
										line-height: 30px;
										font-size: 15px;
										color: #666666;
										word-break:keep-all;
										white-space:nowrap;
										overflow:hidden;
										text-overflow:ellipsis;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
