<template>
	<view class="container">
		<view class="ditie">
			<uni-search-bar class="search" placeholder="请输入搜索内容" @confirm="search" @clear="clear" @cancel="clear"></uni-search-bar>
			<image class="cityImg" :src="DiTie.imgUrl" mode="widthFix"></image>
			<scroll-view class="scroll" scroll-y="true" v-show="DiTie.isMsgView" scroll-x="false">
				<view class="msgView">
					<view class="left">
						<image class="icon" src="../../static/icons/services/metro.png" mode=""></image>
					</view>
					<view class="right">
						<text class="title">{{ DiTie.loadName }}</text>
						<view class="line_view">
							<view class="item" v-for="(item,index) in DiTie.lineMsg" :key="index" @click="jumpPage(item.lineId)">
								<view class="item_left">
									<text>{{ item.lineName }}</text>
									<text>下一站: {{ item.nextStep.name }}</text>
								</view>
								<text class="item_right">{{ item.reachTime }}分钟后</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { baseUrl, HomeDiTie, HomeDiTieMsg } from '@/common/api';
	import { navigateTo } from '../../common/rule';
	export default {
		data() {
			return {
				baseUrl:uni.getStorageSync("baseUrl",""),
				DiTie:{
					cityName:"",
					imgUrl:"",
					isMsgView:true,
					lineMsg:[],
					errMsg:"",
					loadName:"建国门"
				},
			};
		},
		methods:{
			search(res){
				this.DiTie.loadName = res.value;
				HomeDiTieMsg(res.value).then((res)=>{
					// console.log(res);
					if(res.length != 0){
						this.DiTie.lineMsg = res;
						this.DiTie.isMsgView = true;
					}else{
						this.DiTie.errMsg = "无此站点";
						this.DiTie.isMsgView = false;
						uni.showToast({
							icon:'error',
							title:this.DiTie.errMsg
						})
					}
				})
			},
			clear(e){
				HomeDiTieMsg("建国门").then((res)=>{
					// console.log(res);
					if(res.length != 0){
						this.DiTie.lineMsg = res;
						this.DiTie.isMsgView = true;
						this.DiTie.loadName = "建国门";
					}else{
						this.DiTie.errMsg = "服务器错误！";
						uni.showToast({
							icon:'error',
							title:this.DiTie.errMsg
						})
					}
				})
			},
			jumpPage(id){
				navigateTo("/pages/InnerPage/DiTieInner?id="+id);
			}
		},
		onShow() {
			HomeDiTie().then((res)=>{
				// console.log(res);
				this.DiTie.cityName = res.name;
				this.DiTie.imgUrl = baseUrl + res.imgUrl;
			})
			// 初始位置在建国门
			HomeDiTieMsg("建国门").then((res)=>{
				// console.log(res);
				if(res.length != 0){
					this.DiTie.lineMsg = res;
					// 初始化
				}else{
					this.DiTie.errMsg = "服务器错误！";
					uni.showToast({
						icon:'error',
						title:this.DiTie.errMsg
					})
				}
			})
			this.clear("updata");
			this.loadName = "建国门";
		}
	}
</script>

<style lang="less" scoped>
	.ditie{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.search{
			width: 90%;
			background-color: #fff;
			margin-top: 10px;
			border-radius: 10px;
		}
		
		.cityImg{
			width: 90%;
			margin-top: 10px;
			box-shadow: 0 0 30px #ccc;
			border-radius: 20px;
		}
		
		.scroll{
			width: 90%;
			flex: 1;
			background-color: #e7eaf5;
			border-radius: 20px;
			margin: 20px auto;
			box-shadow: 0 0 30px #ccc;
			overflow: hidden;
			
			.msgView{
				width: 100%;
				height: auto;
				overflow: hidden;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				
				.left{
					width: 60px;
					height: 100%;
					margin: 0 10px;
					
					.icon{
						width: 60px;
						height: 60px;
						margin-top: 20px;
					}
				}
				
				.right{
					flex: 1;
					height: 100%;
					margin: 20px 20px 0 0;
					display: flex;
					flex-direction: column;
					
					.title{
						line-height: 60px;
						font-size: 25px;
						font-weight: bold;
					}
					
					.line_view{
						width: 100%;
						height: auto;
						display: flex;
						flex-direction: column;
						align-items: center;
						
						.item{
							width: 100%;
							border-bottom: 2px dashed #aaa;
							display: flex;
							flex-wrap: wrap;
							margin-top: 5px;
							justify-content: space-between;
							
							.item_left{
								display: flex;
								flex-direction: column;
								justify-content: space-around;
								line-height: 40px;
								font-size: 20px;
							}
							
							.item_right{
								display: flex;
								flex-direction: column;
								justify-content: space-around;
								font-size: 20px;
								line-height: 40px;
								color: #0055ff;
							}
						}
					}
				}
			}
		}
	}
</style>
