<template>
	<view class="container">
		<view class="put_idea">
			<textarea name="idea_name" id="idea" cols="30" v-model="idea_msg" rows="10" maxlength="150" placeholder="提点意见吧!"></textarea>
			<text class="font">{{ s_text + '/' + a_text }}</text>
			<button class="update" @click="update">提交</button>
		</view>
	</view>
</template>

<script>
import { PutIdea } from '../../common/api'
	export default {
		data() {
			return {
				s_text:0,
				a_text:150,
				idea_msg:''
			}
		},
		methods: {
			update(){
				PutIdea(uni.getStorageSync('token',''),this.idea_msg).then((res)=>{
					if(res.code == 200){
						uni.showToast({
							icon:'success',
							title:"感谢您的反馈",
							duration:500
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/PrivateCenter/PrivateCenter'
							})
						},500)
					}
				})
			}
		},
		watch:{
			idea_msg(){
				this.s_text = this.idea_msg.length
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.put_idea{
		width: 90%;
		height: 40%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin: 10px auto;
		
		#idea{
			width: 90%;
			height: 50%;
			background-color: #fff;
			padding:10px;
			border-radius: 10px;
			box-shadow: 0 0 20px #ccc;			
		}
		
		.font{
			position: absolute;
			top: 23vh;
			right: 10vw;
		}
		
		.update{
			width: 90%;
			height: 50px;
			background-color: blueviolet;
			color: #fff;
			font-weight: bold;
			line-height: 50px;
			box-shadow: 0 10px 20px #aaa;
		}
	}

</style>
