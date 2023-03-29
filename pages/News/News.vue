<script>
	import { Banner, HomeNewsList, HomeNewsListBottom, HomeNewsType } from '@/common/api';
	import { navigateTo } from '@/common/rule';
	export default {
		data() {
			return {
				banner:[],
				baseUrl:uni.getStorageSync("baseUrl",""),
				news_current:0,
				inner_scorll:false,
				newsType:[],
				newsTypeRes:[],
				styleType:'button',
				news:{
					list:[]
				},
				dialog:{
					type:"",
					msg:""
				}
			};
		},
		methods:{
			newsUrl(Id,Name){
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
			set_inner(){
				this.inner_scorll = false;
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
		}
	}
</script>

<template>
	<view class="container">
		<scroll-view class="scroll" scroll-y="true" show-scrollbar="false" @scrolltolower="out_bottom" >
			<view class="news-banner">
				<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(item,index) in banner" :key="index">
						<view class="swiper-item"><image :src="baseUrl+item.advImg"></image></view>
					</swiper-item>
				</swiper>
			</view>
			<view class="newsPaper">
				<scroll-view scroll-x="true" scroll-y="false" >
					<view><uni-segmented-control class="select" :current="news_current" :values="newsType" :style-type="styleType" @clickItem="newsTypeItem"></uni-segmented-control></view>
				</scroll-view>
				<view class="news">
					<scroll-view class="news_list_out" :scroll-y="inner_scorll" scroll-x="false" @scrolltoupper="set_inner">
						<view class="news_list">
							<view class="news_item" v-for="(item ,index) in news.list" :key="index" @click="newsUrl(item.id,item.title)">
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
		height: calc(100vh + 10px);
		overflow: hidden;
		
		.news-banner{
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
		.newsPaper{
			width: 95%;
			height: auto;
			margin: 0 auto;
			
			.select{
				width: 130%;
				height: 40px;
				font-size: 10px;
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
