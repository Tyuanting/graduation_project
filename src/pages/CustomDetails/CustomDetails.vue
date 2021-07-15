<template>
	<view class="">
		<!-- 顶部 -->
		<view class="top">
			 <view class="info-card">
					<view class="info">
							<text class="info-title">{{details.pro_cate}}</text>
							<text class="info-num">{{details.pro_count}}斤</text>
					</view>
				</view>
				
				<view class="d-list">
					<view class="d-title">
						<text>定制状态：</text>
					</view>
					<view class="content">
						<text class="status">{{details.status==0?'定制中':'已结束'}}</text>
					</view>
				</view>
				
				<view class="d-list">
					<view class="d-title">
						<text>匹配农户：</text>
					</view>
					<view class="content">
						<text class="status">匹配中</text>
					</view>
				</view>
				
				<view class="d-list">
					<view class="d-title">
						<text>期望货源地：</text>
					</view>
					<view class="content">
						<text>{{details.ori_place}}</text>
					</view>
				</view>
				
				<view class="d-list">
					<view class="d-title">
						<text>收货地：</text>
					</view>
					<view class="content">
						<text>{{details.to_place}}</text>
					</view>
				</view>
				
				<view class="d-list" style="height: 150rpx;">
					<view class="d-title">
						<text class="title-req">定制要求：</text>
					</view>
					<view class="req-content">
						<text class="req">{{details.pro_desc}}</text>
					</view>
				</view>
				
		</view> 
	<!-- 底部按钮 -->
	<view class="buttom" v-if="status=='ing'">
		<button type="default" class="btn-end" @click="endCustom()">结束定制</button>
		<button type="default" class="btn-fix" @click="toCustomMade()">修改条件</button>
	</view>
	<view class="buttom" v-else>
		<button type="default" class="btn-end">删除</button>
		<button type="default" class="btn-fix">再次发布</button>
	</view>
	<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				status:'ing',
				details:{}
			}
		},
		onLoad(params){
			const item = JSON.parse(decodeURIComponent(params.item));
			// console.log(item)
						this.details = item
		},
		methods:{
			toCustomMade(){
				uni.navigateTo({
					url:"../CustomMade/CustomMade"
				})
			},
			endCustom(){
				this.$refs['DialogBox'].confirm({
					title: '提示',
					content: '下架后，就无法进行农户匹配了',
					DialogType:'inquiry',
					animation: 0
				}).then((res)=>{
					console.log(1)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
@import 'CustomDetails.scss';
</style>
