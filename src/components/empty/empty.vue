<template>
	<view class="empty">
		<image :src="src" mode=""></image>
		<view class="emptyfont">这里空空如也哦！</view>
	</view>
</template>

<script>
	export default{
		props:{
			// 提示标题
			src: {
				type: String,
				default: '../../static/nopeasant.png',
			}
		}
	}
</script>

<style lang="scss">
	.empty{
		margin: 0 auto;
		padding-top: 120rpx;
		text-align: center;
		color: #646464;
		image{
			width: 400rpx;
			padding-bottom: 20rpx;
		}
		.emptyfont{
			font-size: 28rpx;
			color: #909090;
		}
	}
</style>
