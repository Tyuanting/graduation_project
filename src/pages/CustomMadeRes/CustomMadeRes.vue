<template>
	<view class="page">
		<view class="content">
			<view class="img">
				<image src="../../static/fbcg.png" mode=""></image>
			</view>
			<view class="text">
				<view class="title">
					发布成功
				</view>
				<view class="msg">
					<text>正在通知最佳匹配的商家…</text>
				</view>
				<view class="msg">
					<text>注意“我的定制”查看最新信息</text>
				</view>
			</view>
			<view class="buttom">
				<button type="default" class="btn-fix" @click="toCustom()">我的定制</button>
				<button type="default" class="btn-end" @click="toMade()">继续发布</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			toCustom(){
				uni.navigateTo({
					url:"../MyCustom/MyCustom"
				})
			},
			toMade(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #fff;
		overflow-x: hidden;
		// overflow-y: auto;
	}
	.content{
		// display: flex;
		// margin-top: 100rpx;
		background-color: #fff;
		.img{
			padding-top: 80rpx;
			display: flex;
			justify-content: center;
			item-align:center;
			image{
				height: 160rpx;
				width: 160rpx;
			}
		}
		.text{
			text-align: center;
			.title{
				padding: 20rpx 0;
				font-size: 56rpx;
				font-weight: bold;
			}
			.msg{
				padding-top: 10rpx;
			}
		}
	}
	.buttom{
		padding: 10px 15px;
		    background-color: #fff;
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    position: fixed;
		    bottom: 0;
		    left: 0;
		    width: 100%;
		    box-sizing: border-box;
				button{
					    border-radius: 20px;
					    width: 167px;
					    height: 40px;
					    line-height: 40px;
					    text-align: center;
					    font-size: 16px;
					    color: #222222;
				}
				.btn-fix{
					    border: none;
					    background-color: #39BF3E;
					    color: #FFFFFF;
				}
				.btn-end{
					border: none;
					background-color: #f47012;
					color: #FFFFFF;
				}
	}
</style>
