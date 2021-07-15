<template>
	<view class="page">
		<view class="search-head">
			<view class="back" @click="onBack"><text></text></view>
			<view class="search">张三</view>
		</view>

		<view class="bg-conston">
			<view class="user-session" :style="{ height: height + 'px' }">
				<block v-for="(userContext, index) in userContextItem" :key="index">
					<view class="user-h" :class="{ 'user-me': userContext.userId == '' }">
						<view class="user-img"><image src="../../static/1.jpeg" mode="scaleToFill"></image></view>
						<view class="user-type">
							<!-- 是否显示用户昵称 -->
							<template v-if="userContext.userId != ''">
								<view class="user-n">
									<text>{{ userContext.userName }}</text>
									<text>{{ userContext.time }}</text>
								</view>
							</template>
							<!-- 文本格式 -->
							<template v-if="userContext.type == 'text'">
								<view class="text-type">
									<text>{{ userContext.context }}</text>
								</view>
							</template>
							<!-- 图片格式 -->
							<template v-else-if="userContext.type == 'img'">
								<view class="img-type"><image src="../../static/1.jpeg" mode="scaleToFill"></image></view>
							</template>
							<!-- 视频格式 -->
							<template v-else-if="userContext.type == 'video'">
								<view class="video-type"><video src="" controls="false"></video></view>
							</template>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="user-input">
			<input type="text" v-model="text" placeholder="文明发言" />
			<view class="sum-text" @click="submit()">发送</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			height: 500,
			text:'',
			userContextItem:[{
				userId:1,
				meId:"",
				userName:'cccc',
				type:'text',
				context:"你有什么事吗？",
				time:(new Date().getTime())
			},
			{
				userId:'',
				meId:2,
				userName:'...',
				type:'text',
				context:"你有什么事吗不知道不知道不足浮动？",
				time:(new Date().getTime())
			}]
		};
	},
	onLoad() {
		//获取系统信息
		uni.getSystemInfo({
			success: res => {
				let height = (res.windowHeight = uni.upx2px(100));
				this.height = height;
			}
		});
	},
	methods: {
		/**
		 * 返回点击
		 */
		onBack() {
			uni.navigateBack();
		},
		/**
		 * 发送
		 */
		submit(){
			if(!this.text){
				uni.showToast({
					title:'内容不能为空',
					icon:'none'
				})
			}else{
				let obj = {
				userId:"",
				meId:2,
				userName:"...",
				type:"text",
				context:this.text,
				time:(new Date().getTime())
			};
			//
			this.userContextItem.push(obj);
			}
			this.text=''
	}
	}
};
</script>

<style scoped lang="scss">
@import 'chat.scss';
</style>
