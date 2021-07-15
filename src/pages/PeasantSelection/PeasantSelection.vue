<template>
	<view class="">
		<mescroll-body ref="mescrollRef"
		               @down="downCallback"
		               @up="upCallback"
		               :down="downOption"
		               :up="upOption"
		               :top="0">
 <!-- 顶部定制信息 -->
 	<view class="top">
 	 <view class="info-card" @click="toCustomDetails(data)">
			<view class="info">
				<view class="info-left">
					<text class="info-title">{{data.pro_cate}}</text>
					<text class="info-num">定制{{data.pro_count}}斤</text>
					<text class="info-req">品质规格：{{data.pro_desc}}</text>
				</view>
				<view class="info-right">
					<text class="iconfont icon-more"></text>
				</view>				
			</view>
		</view>
 </view>
		
	<!-- 匹配的农户列表 -->
	<view class="p-list" v-for="(item,index) in data.peasant" :key="index">
		<view class="p-list-item">
			<view class="p-list-image"><image :src="item.head" mode="aspectFill"></image></view>
						<view class="p-list-content">
							<view class="p-list-content-title">{{item.m_name}}</view>
							<view class="p-list-content-sum">{{item.m_desc}}</view>
							<view class="p-list-content-des">
								<view class="">
								<image v-for="(i,index) in item.star" :key="index" class="des-img" src="../../static/leaf.png" mode=""></image>
								</view>
								
								<view class="">好评{{item.favor}}%</view>
							</view>
						</view>
						
		</view>
		<view class="btn">
			<view class="btn-group">
			<button class="btn-group-meet">聊一聊</button>
			<button class="btn-refresh" @click="toSign(item)">合作</button>
			</view>		
		</view>
	</view>
 
		</mescroll-body>
	</view>
</template>

<script>
	
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
	               data() {
	                       return {
	                               mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
	                               // 下拉刷新的配置(可选, 绝大部分情况无需配置)
	                               downOption: {},
	                               // 上拉加载的配置(可选, 绝大部分情况无需配置)
	                               upOption: {
	                                 use: false
	                               },
																 data:{}
	                       }
	               },
								 onLoad(params){
								 	const item = JSON.parse(decodeURIComponent(params.item));
								 				this.data = item
								 },
	               methods: {
	                       /*下拉刷新的回调, 有三种处理方式:*/
	                       downCallback(){
	                         this.mescroll.endSuccess();
	                       },
	                       /*上拉加载的回调*/
	                       upCallback(page) {
	                         setTimeout(() =>{
	                           this.mescroll.endByPage(10, 20);
	                         },2000)
	                       },
												 toCustomDetails(val){
													 let details = val
													 uni.navigateTo({
													 	url:"../CustomDetails/CustomDetails?item=" + encodeURIComponent(JSON.stringify(details))
													 })
												 },
												 toSign(val){
													 let item = {}
													 item = JSON.parse(JSON.stringify(this.data))
													 item.mId = val.mId
													 item.m_name = val.m_name
													 uni.navigateTo({
													 	url:"../CustomOrderDo/CustomOrderDo?item=" + encodeURIComponent(JSON.stringify(item))
													 })
												 }
	               }
	       }
</script>

<style scoped lang="scss">
@import 'PeasantSelection.scss';
</style>
