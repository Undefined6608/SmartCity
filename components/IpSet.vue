<template>
	<view class="IpSet">
		<button class="back" @click="Close">返回</button>
		<view class="form">
			<uni-section style="background-color: rgba(0,0,0,0);" title="请输入IP地址" title-font-size="20px" sub-title-font-size="15px" subTitle="输入Ip地址,如:127.0.0.1" >
				<uni-easyinput v-model="url" trim="all" style="color: #00f; font-size: 15px;" placeholder="127.0.0.1"></uni-easyinput>
			</uni-section>
			<uni-section style="background-color: rgba(0,0,0,0);" title="请输入端口号" title-font-size="20px" sub-title-font-size="15px" subTitle="输入Ip地址,如:8080">
				<uni-easyinput v-model="port" trim="all" style="color: #00f; font-size: 15px;" placeholder="8080" ></uni-easyinput>
			</uni-section>
		</view>
		
		<button class="setting" @click="setting">保存</button>
		<uni-popup ref="popup" type="message">
			<uni-popup-message ref="popup" :message="err_msg" type="error" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import { sGetCharCount, navigateTo } from '@/common/rule'
	import { setBaseUrl } from '@/common/api.js'
	export default {
		name:"IpSet",
		props:["IpSet"],
		data() {
			return {
				url:'',
				port:'',
				err_msg:""
			};
		},
		methods:{
			Close(){
				/* 差异化编译 */
				//#// #ifdef H5
				this.$parent.$parent.SetIpSetOpenOrDown();
				// #endif
				
				// #// #ifdef APP
				this.$parent.SetIpSetOpenOrDown();
				// #endif
			
				// #// #ifdef MP-WEIXIN
				this.$parent.SetIpSetOpenOrDown();
				// #endif
			},
			setting(){
				if(this.url==""&& this.port==""){
					this.err_msg = "您输入的Ip地址或端口号为空，请输入后再保存";
					this.$refs.popup.open('top');
					console.log(sGetCharCount('.',this.url+':'+this.port) == 3);
				}else if(sGetCharCount('.',this.url+':'+this.port) == 3){
					console.log("https://"+this.url + ':'+this.port);
					uni.setStorageSync("baseUrl","https://"+this.url + ':'+this.port);
					setBaseUrl("https://"+this.url + ':'+this.port);
					if(uni.getStorageSync("baseUrl","")!=""){
						this.Close();
					}else{
						this.err_msg = "保存失败，请重新保存";
					}
				}else{
					this.err_msg = "您输入的Ip地址或端口格式不正确";
					this.$refs.popup.open('top');
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.IpSet{
		width: 100vw;
		height: 100vh;
		position: absolute;
		top:0;
		left: 0;
		background-color: #f7f7f7; 
		
		.back{
			position: absolute;
			top: 23px;
			left: 23px;
			background-color: #fff2df;
			box-shadow: 0 0 20px #ccc;
		}
		
		.form{
			width: 80vw;
			height: auto;
			margin: 200px auto 10px auto;
			padding: 20px;
			box-shadow: 0 0 20px #ccc;
			border-radius: 10px;
		}
		
		.setting{
			width: 80vw;
			height: 45px;
			margin-top: 40px;
			background-color: #fff2df;
			box-shadow: 0 0 20px #ccc;
		}
	}
</style>