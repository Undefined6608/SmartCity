<script>
	// 公共引入
	export default {
		onLaunch: function() {
			// 初始进入欢迎页面
			if(uni.getStorageSync("baseUrl",'')==''){
				uni.navigateTo({
					url:"pages/index/index"
				})
			}else{
				if(uni.getStorageSync('token','')==''){
					uni.navigateTo({
						url:'/pages/Login/Login'
					})
				}else{
					uni.navigateTo({
						url:"pages/Home/Home"
					})
				}
			}
		},
		onShow: function() {
		},
		onHide: function() {
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}
	
	.container{
		width: 100vw;
		height: 100vh;
		// 获取状态栏的高度
		padding:0;
		background-color: #f7f7f7;
		// 拒绝margin传递
		overflow: hidden;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
