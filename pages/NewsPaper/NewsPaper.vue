<script>
	import { baseUrl, NewsDetailedInformation } from '../../common/api';
	import newsBottom from '../../components/newsBottom.vue';
	export default {
		data() {
			return {
				prop:{
					id:"",
					baseUrl:uni.getStorageSync("baseUrl",""),
					msg:{
						cover:"",
						content:"",
						publishDate:"",
						title:"",
						updateTime:""
					}
				}
			}
		},
		methods: {
			replaceAll(str,find,replace){
				return str.replace(new RegExp(find,'g'),replace);
			}
		},
		onLoad(prop){
			this.prop.id = prop.newsId;
			// 设置标题
			uni.setNavigationBarTitle({
				title:prop.newsName
			})
			NewsDetailedInformation(this.prop.id).then((res)=>{
				// console.log(res);
				this.prop.msg = res;
				let result = this.replaceAll(this.prop.msg.content,"<img src=\"","<img src=\""+baseUrl);
				this.prop.msg.content = result;
			})
		},
		components:{
			newsBottom
		}
	}
</script>

<template>
	<view class="news_paper">
		<scroll-view class="scroll-a" scroll-y="true" >
			<view>
				<view class="newpaper">
					<h4>{{ prop.msg.title }}</h4>
					<view class="msg">
						<image :src="prop.baseUrl+prop.msg.cover" mode=""></image>
						<rich-text class="html5" :nodes="prop.msg.content"></rich-text>
					</view>
				</view>
			</view>
		</scroll-view>
		<news-bottom :newsId="prop.id"></news-bottom>
	</view>
</template>

<style lang="less" scoped>
	.news_paper{
		width: 100vw;
		height: 97vh;
		// 获取状态栏的高度
		padding:0;
		background-color: #f7f7f7;
		// 拒绝margin传递
		overflow: hidden;
		z-index: -1;
		
		
		.scroll-a{
			width: 100%;
			height: 100%;
			
			.newpaper{
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				
				h4{
					width: 90%;
					height: 50px;
					text-align: center;
					margin: 10px auto;
				}
				
				.msg{
					width: 90%;
					flex: 1;
					background-color: antiquewhite;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 0 auto;
					margin-bottom: 20px;
					padding-bottom: 20px;
					background-color: #e9f1f6;
					box-shadow: 0 0 30px #ccc;
					overflow: hidden;
					
					image{
						width: 90%;
						height: 200px;
						margin: 10px auto;
						border-radius: 20px;
					}
					
					.html5{
						width: 90%;
						flex:1;
						
						
						img{
							width: 100%;
							border-radius: 20px;
							
						}
					}
				}
			}
		}
	}
</style>
