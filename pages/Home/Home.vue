<script>
	import { Banner, HomeNewsList, HomeNewsListBottom, HomeNewsType,Login } from '@/common/api';
	import { navigateTo } from '@/common/rule';
	export default {
		data() {
			return {
				banner:[],
				baseUrl:uni.getStorageSync("baseUrl",""),
				tuijian_msg:{
					icon:["../../static/icons/services/park.png","../../static/icons/services/metro.png","../../static/icons/services/bus.png","../../static/icons/services/hotel.png","../../static/icons/services/moveCar.png"],
					title:["停哪儿","城市地铁","智慧巴士","门诊预约","智慧交管"],
				},
				zhuanti_msg:[],
				news_current:0,
				inner_scorll:false,
				newsType:[],
				newsTypeRes:[],
				styleType:'button',
				dialog:{
					type:"",
					msg:""
				},
				news:{
					list:[]
				}
			};
		},
		methods:{
			tuijain(index){
				switch(index){
					case 0:
						navigateTo("/pages/TuiJian/TuiJianStop")
					break;
					case 1:
						navigateTo("/pages/TuiJian/TuiJianDiTie")
					break;
					case 2:
						navigateTo("/pages/TuiJian/TuiJianBus")
					break;
					case 3:
						navigateTo("/pages/TuiJian/TuiJianHos")
					break;
					case 4:
						navigateTo("/pages/TuiJian/TuiJianJiaoguan")
					break;
				}
			},
			zhuanti(Id,Name){
				uni.navigateTo({
					url:"/pages/NewsPaper/NewsPaper?newsId="+Id+"&newsName="+Name
				})
			},
			newsTypeItem(e){
				if(this.news_current !== e.currentIndex){
					this.news_current = e.currentIndex
				}
				HomeNewsListBottom(this.newsTypeRes[this.news_current].id).then((res)=>{
					// console.log(res);
					if(res.length != 0){
						this.news.list = res;
					}
				})
				
			},
			// 外层scoll-view
			out_bottom(e){
				this.inner_scorll = true;
			},
			
			// 弹出框方法
			// 确认
			dialogConfirm(){
				uni.navigateTo({
					url:"/pages/Login/Login"
				})
			},
			// 关闭
			dialogClose(){
				// #// #ifdef APP-PLUS
					plus.runtime.quit();
				// #endif
			},
			set_inner(){
				this.inner_scorll = false;
			}
		},
		onShow(){
			Banner().then((res)=>{
				// console.log(res);
				if(res.code == 200){
					this.banner = res.rows;
				}
			})
			
			HomeNewsList().then((res)=>{
				// console.log(res);
				if(res.length != 0){
					this.zhuanti_msg = res;
				}
			})
			
			HomeNewsType().then((res)=>{
				// console.log(res);
				if(res.length != 0){
					this.newsTypeRes = res;
					let a = [];
					for (var i = 0; i < res.length; i++) {
						a.push(res[i].name);
					}
					this.newsType = a;
					// 获取新闻列表
					HomeNewsListBottom(res[this.news_current].id).then((res)=>{
						// console.log(res);
						if(res.length != 0){
							this.news.list = res;
						}
					})
				}
			})
			
			if(uni.getStorageSync("token","")==""){
				this.$refs.alertDialog.open();
				this.dialog.type = "warn";
				this.dialog.msg = "登录过期，请重新登录!!!";
			}
		},
		onLoad() {
			Login(uni.getStorageSync("username",""),uni.getStorageSync("password","")).then((res)=>{
				// console.log(res);
				if(res.code == 200){
					uni.setStorageSync("token",res.token);
				}else{
					uni.showToast({
						icon:'error',
						title:"登录信息失效",
						duration:500
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/Login/Login'
						})
					},500)
					
				}
			})
		}
	}
</script>



<template>
	<view class="container">
		<scroll-view class="scroll" scroll-y="true" show-scrollbar="false" @scrolltolower="out_bottom" >
			<view class="home-banner">
				<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(item,index) in banner" :key="index">
						<view class="swiper-item"><image :src="baseUrl+item.advImg"></image></view>
					</swiper-item>
				</swiper>
			</view>
			<view class="tuijian">
				<uni-section title="推荐服务" type="line" title-font-size="20px">
					<view class="icon-view">
						<view class="icon" v-for="(item,index) in tuijian_msg.title" :key="index" @click="tuijain(index)">
							<image :src="tuijian_msg.icon[index]"></image>
							<text>{{ item }}</text>
						</view>
					</view>
				</uni-section>
			</view>
			<view class="zhuanti">
				<uni-section title="专题" type="line" title-font-size="20px">
					<view class="grid-list">
						<view class="grid-item" v-for="(item, index) in zhuanti_msg" :index="index" :key="index" @click="zhuanti(item.id,item.title)">
							<image :src="baseUrl+item.cover" mode=""></image>
							<p>{{ item.content.replace(/<\/?[^>]*>/g, '') }}</p>
						</view>
					</view>
				</uni-section>
			</view>
			
			<view class="newsPaper">
				<scroll-view scroll-x="true" scroll-y="false" >
					<view><uni-segmented-control class="select" :current="news_current" :values="newsType" :style-type="styleType" @clickItem="newsTypeItem"></uni-segmented-control></view>
				</scroll-view>
				<view class="news">
					<scroll-view class="news_list_out" :scroll-y="inner_scorll" scroll-x="false" @scrolltoupper="set_inner">
						<view class="news_list">
							<view class="news_item" v-for="(item ,index) in news.list" :key="index" @click="zhuanti(item.id,item.title)">
								<image :src="baseUrl+item.cover" mode=""></image>
								<text> {{ item.title }} </text>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="dialog.type" cancelText="关闭" confirmText="确定" title="警告" :content="dialog.msg" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<style lang="less" scoped>
	.scroll{
		width: 100%;
		height: 100%;
		overflow: hidden;
		
		.home-banner{
			width: 700rpx;
			height: 235rpx;
			margin: 25rpx auto 13px auto;
			
			.swiper{
				width: 100%;
				height: 100%;
				
				.swiper-item{
					width: 100%;
					height: 100%;
					
					image{
						width: 100%;
						height: 100%;
						border-radius: 20rpx;
					}
				}
			}
		}
		
		.tuijian{
			width: 100%;
			height: 210rpx;
			
			.icon-view{
				display: flex;
				justify-content: space-around;
				.icon{
					width: 150rpx;
					height: 150rpx;
					display: flex;
					flex-direction: column;
					background-color: rgba(0, 0, 0, 0);
					image{
						width: 78rpx;
						height: 78rpx;
						position: relative;
						display: block;
						margin: 0 auto;
					}
					
					text{
						margin: 0 auto;
					}
				}
			}
		}
		
		.zhuanti{
			width: 100%;
			height: 670rpx;
			margin: 10px auto;
			overflow: hidden;
			.grid-list{
				width: 100%;
				height: auto;
				
				.grid-item{
					width: 45vw;
					height: auto;
					float: left;
					margin: 15rpx;
					background-color: white;
					border-radius: 10px;
					image{
						width: 100%;
						height: 142rpx;
						border-top-left-radius: 10px;
						border-top-right-radius: 10px;
					}
					
					p{
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						word-wrap: break-word;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						line-height: 20px;
						margin: 10px auto;
					}
				}
			}
		}
		
		.newsPaper{
			width: 100%;
			height: auto;
			
			.select{
				width: 130%;
				height: 30px;
			}
			
			.news{
				width: 100%;
				height: calc(100vh - 50px);
				padding: 10px;
				
				.news_list_out{
					width: 100%;
					height: 100%;
					
					.news_list{
						width: 100%;
						height: 100%;
						
						.news_item{
							width: 100%;
							height: 100px;
							border-bottom: 1px solid #c7c7c7;
							display: flex;
							flex-wrap: wrap;
							align-items: center;
							
							image{
								width: 130px;
								height: 90px;
								margin-right: 10px;
							}
							
							text{
								margin-right: 10px;
								flex:1;
							}
						}
					}
				}
			}
		}
	}
</style>