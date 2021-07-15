<template>
	<view class="page">
		<view class="my-top">
			<!-- head -->
			<view class="head" :style="'background-color: rgba(255,255,255,'+(scrollTop/50)+');'">
				<view class="portrait">
					<image v-show="scrollTop>20" src="//img11.360buyimg.com/jdphoto/s40x40_jfs/t1/25255/18/10701/1678/5c89f892E78c04688/684d63c0d68e39b1.png"></image>
				</view>
				<view class="title">
					<text v-show="scrollTop>20">我的</text>
				</view>
				<view class="setting-mess">
					<view class="setting" @click="onSetting">
						<text class="iconfont icon-setting" :style="scrollTop>20?'color:#333333':''"></text>
					</view>
					<view class="mess" @click="onMessage">
						<text class="iconfont icon-xiaoxi" :style="scrollTop>20?'color:#333333':''"></text>
					</view>
				</view>
			</view>
			<view class="user-info" @click="onUserInfo">
			  <view class="portrait" v-show="!hasLogin">
			    <image src="http://img2.imgtn.bdimg.com/it/u=1039075865,3371165857&fm=26&gp=0.jpg"></image>
			  </view>
				<view class="portrait" v-show="hasLogin">
				  <image src="../../static/login.jpeg"></image>
				</view>
			  <view class="info">
			    <view class="nickname">
			      <text v-if="!hasLogin">登录/注册</text>
			      <text v-else>{{uerInfo.nickName}}({{uerInfo.uPhone}})</text>
			    </view>
			  </view>
			</view>
			<!-- 关注区 -->
			<view class="focus-area">
				<view class="list">
					<view class="num">
						<text>28</text>
					</view>
					<view class="title">
						<text>商品关注</text>
					</view>
				</view>
				<view class="list">
					<view class="num">
						<text>28</text>
					</view>
					<view class="title">
						<text>喜欢的内容</text>
					</view>
				</view>
				<view class="list">
					<view class="num">
						<text>...</text>
					</view>
					<view class="title">
						<text>浏览记录</text>
					</view>
				</view>
			</view>
			<!-- 会员 -->
				<view class="vip-info">
					<view class="vip">
						<text>每日签到</text>
						<text class="line"></text>
					</view>
					<view class="vip-explain">
						<text>参与平台活动，领优惠券！</text>
					</view>
					<view class="vip-btn">
						<text>立即查看</text>
					</view>
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="order-info">
				<view class="list" @click="onSkipOrder(1)">
					<view class="icon">
						<text class="iconfont icon-daifukuan"></text>
						<!-- <text class="num">22</text> -->
					</view>
					<view class="title">
						<text>待付款</text>
					</view>
				</view>
				<view class="list" @click="onSkipOrder(2)">
					<view class="icon">
						<text class="iconfont icon-daifahuo"></text>
						<text class="num" v-if="num>0">{{num}}</text>
					</view>
					<view class="title">
						<text>待发货</text>
					</view>
				</view>
				<view class="list" @click="onSkipOrder(3)">
					<view class="icon">
						<text class="iconfont icon-daishouhuo"></text>
						<!-- <text class="num">22</text> -->
					</view>
					<view class="title">
						<text>待收货</text>
					</view>
				</view>
				<view class="list" @click="onSkipOrder(5)">
					<view class="icon">
						<text class="iconfont icon-tuikuan"></text>
						<!-- <text class="num">22</text> -->
					</view>
					<view class="title">
						<text>理赔</text>
					</view>
				</view>
			</view>
			<!-- 我的服务 -->
			<view class="my-service">
				<view class="title">
					<text>定制管理</text>
				</view>
				<view class="service-list">
					<view class="list" @click="toMyCustom()">
						<view class="thumb">
							<image src="/static/dzdd.png"></image>
						</view>
						<view class="name">
							<text>我的定制</text>
						</view>
					</view>
					<view class="list" @click="toCustomOrder()">
						<view class="thumb">
							<image src="/static/subtitle_unblock_light.png"></image>
						</view>
						<view class="name">
							<text>定制订单</text>
						</view>
					</view>
					<view class="list">
						<view class="thumb">
							<image src="/static/szzt.png"></image>
						</view>
						<view class="name">
							<text>实时状态</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TabBar from '../../components/TabBar/TabBar.vue';
	import {  mapState, mapMutations } from 'vuex';
	export default{
		components:{
			TabBar,
		},
		computed: mapState(['hasLogin','uerInfo']),
		data(){
			return{
				scrollTop: 0,
				num:''
			}
		},
		onLoad() {
			if(uni.getStorageSync('orderList')!=='undefined'){
				this.num = uni.getStorageSync('orderList').length
			}	
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		mounted() {
			// console.log(this.scrollTop)
		},
		methods:{
			
			// 用户信息点击
			onUserInfo(){
				if(this.hasLogin){
					uni.navigateTo({
						url:"/pages/Information/Information"
					})
				}else{
					 uni.navigateTo({ 
			    url: '/pages/login/login'
			  })
				} 
			},
			toMyCustom(){
				if(!this.hasLogin){
					uni.navigateTo({
						url:"../login/login"
					})
				}else{
					uni.navigateTo({
						url: '/pages/MyCustom/MyCustom'
					});
				}
			},
			toCustomOrder(){
				uni.navigateTo({
					url:"../CustomOrder/CustomOrder"
				})
			},
			/**
			 * 点击设置
			 */
			onSetting(){
				uni.navigateTo({
					url:"../Setting/Setting"
				})
			},
			/**
			 * 点击消息
			 */
			onMessage(){
				uni.navigateTo({
					url:"../DiscountsActivity/DiscountsActivity"
				})
			},
			/**
			 * 订单
			 */
			onSkipOrder(type){
				if(type === 5){
					uni.navigateTo({
						url: '/pages/AfterSalesOrder/AfterSalesOrder',
					})
					return;
				}
				uni.navigateTo({
					url: '/pages/MyOrderList/MyOrderList?type=' + type,
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'my.scss';
</style>
