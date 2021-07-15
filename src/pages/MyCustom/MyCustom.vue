<template>
	<view>
	                <view class="tab-top">
	                        <view :class="['tab-no',index==0?'tab-selected':'']" @click="index=0">我的发布</view>
	                        <view :class="['tab-no',index==1?'tab-selected':'']" @click="index=1">已结束</view>
	                        <view :class="['tab-no',index==2?'tab-selected':'']" @click="index=2">已驳回</view>
	                </view>
									<view class="menuFixed" @click="toCustomMade()">
										<image src="../../static/custom.png"s style="width: 120rpx; height: 120rpx;"></image>
									</view>
	                <view class="" v-show="index == 0">
										<empty v-if="allList.length==0"></empty>
	                        <view class="list" v-for="(item,index) in allList" :key="index">
	                        	<view class="info">
															<view class="info-left">
																<text class="info-title">{{item.pro_cate}}</text>
																<text class="info-num">定制{{item.pro_count}}斤</text>
																<text class="info-req">定制要求:{{item.pro_desc}}</text>
															</view>
															<view class="info-right" @click="checkPeasant(item)">
																<text class="bus-num" v-if="item.peasant">已匹配{{item ? item.peasant.length : 0}}家农户</text>
																<text class="iconfont icon-more"></text>
															</view>
	                        		
	                        	</view>
														<view class="btn">
															<view class="btn-group">
															<button plain="true" @click="toCustomDetails(item)">管理</button>
															<button plain="true" :class="refresh=='刷新'?'btn-refresh':'btn-refreshed'" @click="refresh='已刷新'">{{refresh}}</button>
															</view>
															
														</view>
	                        </view>
													
	                </view>
	                <view class="" v-show="index == 1">
	                        <empty v-if="endList.length==0"></empty>
	                </view>
									<view class="" v-show="index == 2">
									        <empty v-if="turnList.length==0"></empty>
									</view>
	        </view>
</template>

<script>
	//引入空数据展示
	import Empty from "@/components/empty/empty"
	 export default {
	                data() {
	                        return {
	                                index:0,//选中的tab
																	allList:[111,111],
																	endList:[],
																	turnList:[],
																	refresh:'刷新',
																	
	                        }
	                },
									onLoad(){
										this.getAllList()
									},
	                methods: {
										
													/* 获取有效定制单 */
													getAllList(){
														let uId
														uni.getStorage({
															//获得保存在本地的用户信息
															key: 'uerInfo',
															success: res => {
																uId=res.data.uId;
															}
														});
														this.$Request({
															url: '/custom/requirement_get',
															method: 'POST',
															data: { uId: uId }
														})
															.then(res => {
																if (res.code == 1) {
																	this.allList = res.data;
																}else{
																	this.allList = res.data;
																}
															})
															.catch(error => {
																console.log(error);
															});
													},
													
	                        changeTab(index){
	                                that.navIdx = index;
	                                 
	                        },
													checkPeasant(val){
														uni.navigateTo({
															url:'../PeasantSelection/PeasantSelection?item=' + encodeURIComponent(JSON.stringify(val))
														})
													},
													toCustomMade(){
														uni.navigateTo({
															url:"../CustomMade/CustomMade"
														})
													},
													toCustomDetails(val){
														let details = val
														uni.navigateTo({
															url:"../CustomDetails/CustomDetails?item=" + encodeURIComponent(JSON.stringify(details))
														})
													}
													
	                }
	        }

</script>

<style scoped lang="scss">
@import 'MyCustom.scss';
</style>
