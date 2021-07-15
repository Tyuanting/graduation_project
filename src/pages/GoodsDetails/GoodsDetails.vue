<template>
	<view @click="isMore = false">
		<view class="goods-head" :style="'background:rgba(255,255,255,' + PageScrollTop / 100 + ')'">
			<!-- 返回 -->
			<view class="back" @click="onBack">
				<view class="back-one" :class="{ action: PageScrollTop > 120 }"><text></text></view>
			</view>
			<!-- tab切换 -->
			<view class="head-tab" v-if="PageScrollTop > 120">
				<view class="tab" :class="{ action: TabShow === 0 }" @click="onTab(0)">
					<text>商品</text>
					<text class="line"></text>
				</view>
				<view class="tab" :class="{ action: TabShow === 1 }" @click="onTab(1)">
					<text>评价</text>
					<text class="line"></text>
				</view>
				<view class="tab" :class="{ action: TabShow === 2 }" @click="onTab(2)">
					<text>详情</text>
					<text class="line"></text>
				</view>
			</view>
			<!-- 分享更多 -->
			<view class="share-more">
				<view class="share-more-one" :class="{ action: PageScrollTop > 120 }">
					<view class="list"><text class="iconfont icon-share"></text></view>
					<view class="list" @click.stop="isMore = !isMore"><text class="iconfont icon-diandian"></text></view>
				</view>
				<view class="mroe-list" v-show="isMore">
					<navigator class="list" open-type="switchTab" url="/pages/message/message">
						<view class="icon"><text class="iconfont icon-xiaoxi"></text></view>
						<view class="title"><text>消息</text></view>
					</navigator>
					<navigator open-type="switchTab" url="/pages/home/home" class="list">
						<view class="icon"><text class="iconfont icon-home"></text></view>
						<view class="title"><text>首页</text></view>
					</navigator>
					<navigator class="list">
						<view class="icon"><text class="iconfont icon-guanzhu"></text></view>
						<view class="title"><text>我的关注</text></view>
					</navigator>
					<navigator class="list">
						<view class="icon"><text class="iconfont icon-zuji"></text></view>
						<view class="title"><text>浏览记录</text></view>
					</navigator>
				</view>
			</view>
		</view>
		<!-- banner，标题 -->
		<view class="banner-title">
			<!-- banner -->
			<view class="banner">
				<swiper class="screen-swiper round-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500">
					<swiper-item v-for="(item, index) in swiperList" :key="index"><image :src="item.url" mode="aspectFill"></image></swiper-item>
				</swiper>
			</view>
			<!-- 价格 -->
			<view class="price-info" v-show="proData.ishot == 0">
				<view class="price">
					<text class="min">￥</text>
					<text class="max">{{proData.original_price}}</text>
				</view>
				<view class="info">
					<view class="list" @click="onDepreciate">
						<text class="iconfont icon-jiangjia"></text>
						<text>降价通知</text>
					</view>
					<view class="list" @click="onAttention">
						<text class="iconfont" :class="AttentionShow === 0 ? 'icon-guanzhu-off' : 'icon-guanzhu-on action'"></text>
						<text>{{ AttentionShow === 0 ? '关注' : '已关注' }}</text>
					</view>
				</view>
			</view>
			<!-- 限时抢购 -->
			<view class="flash-price" v-show="proData.ishot == 1">
				<view class="price-item">
					<view class="icon-item"><text class="iconfont icon-flash-sale"></text></view>
					<view class="price">
						<view class="current-price">
							<text class="min">￥</text>
							<text class="max">{{proData.promotion_price}}</text>
						</view>
						<view class="original-price"><text>￥{{proData.original_price}}</text></view>
					</view>
					<view class="tag"><text class="iconfont icon-flash-naozhong"></text></view>
				</view>
				<view class="time-item">
					<view class="title"><text>距结束还剩：</text></view>
					<view class="time">
						<text class="num">02</text>
						<text class="dot">:</text>
						<text class="num">46</text>
						<text class="dot">:</text>
						<text class="num">52</text>
					</view>
				</view>
			</view>
			<!-- 标题 -->
			<view class="goods-title">
				<text>{{ proData.pro_name }} {{ proData.pro_desc }}</text>
			</view>
			<!-- 产地与浏览量 -->
			<view class="goods-ori"><text class="iconfont icon-jiaoyi">成交1.8万元</text></view>
			<view class="goods-ori"><text class="iconfont icon-browse">浏览量30000</text></view>
		</view>
		<!-- 优惠积分 -->
		<view class="goods-discounts">
			<view class="list">
				<view class="title">发货地</view>
				<view class="content">
					<text>{{ proData.place }}</text>
				</view>
				<view class="more"><text class="iconfont icon-more"></text></view>
			</view>
			<view class="list" @click="$refs['GoodsServe'].show()">
				<view class="title">服务</view>
				<view class="content">
					<view class="serve">
						<text class="iconfont icon-baozheng"></text>
						<text>退款保证</text>
					</view>
					<view class="serve">
						<text class="iconfont icon-baozheng"></text>
						<text>物流配送</text>
					</view>
				</view>
				<view class="more"><text class="iconfont icon-more"></text></view>
			</view>
			<view class="list" @click="$refs['GoodsCoupon'].show()">
				<view class="title">领券</view>
				<view class="content">
					<view class="coupon-list"><view>满19减5</view></view>
					<view class="coupon-list"><view>满19减5</view></view>
				</view>
				<view class="more"><text class="iconfont icon-more"></text></view>
			</view>
		</view>
		<!-- 属性规格 -->
		<view class="goods-discounts">
			<view class="list">
				<view class="title">规格</view>
				<view class="content"><text>箱装</text></view>
				<view class="more"><text class="iconfont icon-more"></text></view>
			</view>

			<view class="list">
				<view class="title">运费</view>
				<view class="content"><text>免运费</text></view>
				<view class="more"><!-- <text class="iconfont icon-more"></text> --></view>
			</view>
		</view>
		<!-- 评价 -->
		<view class="evaluate-data" ref="evaluate">
			<view class="title-more" @click="onEvaluate">
				<view class="title">
					<text>评价</text>
					<text class="num">999+</text>
				</view>
				<view class="more"><text class="iconfont icon-more"></text></view>
			</view>
			<view class="evaluate-list">
				<view class="user-info">
					<view class="thumb"><image src="/static/4.jpg" mode=""></image></view>
					<view class="nickname-grade">
						<view class="nickname"><text>小唐同学</text></view>
						<view class="grade"><text class="cuIcon-favorfill lg text-gray"></text></view>
					</view>
				</view>
				<view class="content">
					<view class="character"><text class="two-omit">物流快，苹果非常的的好，非常的讲信誉</text></view>
					<view class="attr"><text>箱装</text></view>
					<view class="thumb-list">
						<view class="list"><image src="/static/4.jpg" mode=""></image></view>
						<view class="list"><image src="/static/6.jpeg" mode=""></image></view>
						<view class="list"><image src="/static/1.jpeg" mode=""></image></view>
					</view>
				</view>
				<view class="look-all" @click="onEvaluate"><text>查看全部评价</text></view>
			</view>
		</view>
		<!-- 商家 -->
		<view class="p-list" v-if="proData.merchants">
			<view class="p-list-item">
				<view class="p-list-image"><image :src="proData.merchants.head" mode="aspectFill"></image></view>
				<view class="p-list-content">
					<view class="p-list-content-title">{{proData.merchants.m_name}}</view>
					<view class="p-list-content-sum">{{proData.merchants.m_desc}}</view>
					<view class="p-list-content-des">
						<view class="">
							<image v-for="count in proData.merchants.star" class="des-img" src="../../static/leaf.png" mode=""></image>

						</view>
						<view class="">好评{{proData.merchants.favor}}%</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品介绍 -->
		<view class="products-introduction" ref="products">
			<view class="title"><text>商品介绍</text></view>
			<view class="content" v-html="web_content"></view>
		</view>
		<!-- 底部 -->
		<view class="page-footer">
			<view class="footer-fn">
				<view class="list">
					<text class="iconfont icon-kefu"></text>
					<text>联系客服</text>
				</view>
				
				<view class="list a1" @click="onToCart">
						<text class="iconfont icon-cart aaa">
							<text class="center-order-num-posi">{{this.$store.state.arrCart.length}}</text>
						</text>
						
					<text>购物车</text>
				</view>
			</view>
			<view class="footer-buy">
				<view class="cart-add" @click="add()"><text>加入购物车</text></view>
				<view class="buy-at" @click="buyNow()"><text>立即购买</text></view>
			</view>
		</view>
		<!-- 服务弹窗 -->
		<goods-serve ref="GoodsServe"></goods-serve>
		<!-- 优惠券 -->
		<goods-coupon ref="GoodsCoupon"></goods-coupon>
	</view>
</template>

<script>
import GoodsServe from '../../components/GoodsServe/GoodsServe.vue';
import GoodsCoupon from '../../components/GoodsCoupon/GoodsCoupon.vue';
export default {
	components: {
		GoodsServe,
		GoodsCoupon
	},
	data() {
		return {
			TabShow: 0,
			isMore: false,
			AttentionShow: 0,
			swiperList: [],
			proData: {},//此商品信息
			web_content:
				'<div class="m-img"><img src="/static/detail.JPG"><div class="tools" hidden><i class="fa fa-arrow-up move-up"></i><i class="fa fa-arrow-down move-down"></i><em class="move-remove" hidden ><i class="fa fa-times" aria-hidden="true"></i> 移除</em><div class="cover"></div></div></div>',
			PageScrollTop: 0,
			type: 0,
			count:this.$store.state.arrCart.length
		};
	},
	onLoad(params) {
		this.type = params.pid || 0;
		// console.log(this.type)
		this.getSwiperList();
		this.getProData();
	},
	onPageScroll(e) {
		this.PageScrollTop = e.scrollTop;
	},
	methods: {
		/* 加入购物车 */
		add(){
			if(this.$store.state.hasLogin==false) {
				uni.showToast({
					title:'请先登录',
					icon:'none'
				})
			}else {
				this.count++;
			this.$store.commit('setCount',this.count);
			this.proData.count = 1;
			this.$store.commit('setCart',this.proData);
			uni.showToast({
				title:'加入成功！',
				icon:'success'
			})
			}
			
		},
		
		/* 立即购买 */
		buyNow(){
			if(this.$store.state.hasLogin==false) {
				uni.showToast({
					title:'请先登录',
					icon:'none'
				})
			}else {
			let obj={}
			obj.list=[this.proData]
			obj.total=this.proData.promotion_price
			this.$store.commit('setOrder',obj);
			uni.navigateTo({
				url: '/pages/ConfirmOrder/ConfirmOrder'
			})
			}
		},
		/*  */
		getSwiperList() {
			this.$Request({
				url: '/detailswiperlist',
				method: 'POST',
				data: { pid: this.type }
			})
				.then(res => {
					if (res.code == 1) {
						this.swiperList = res.data;
					}
				})
				.catch(error => {
					console.log(error);
				});
		},

		/*  */
		getProData() {
			this.$Request({
				url: '/prodatalist',
				method: 'POST',
				data: { pid: this.type }
			})
				.then(res => {
					if (res.code == 1) {				
							this.proData = res.data[0]
					}
				})
				.catch(error => {
					console.log(error);
				});
		},
		/**
		 * 返回
		 */
		onBack() {
			uni.navigateBack();
		},
		/**
		 * tab
		 */
		onTab(type) {
			this.TabShow = type;
			switch (type) {
				case 0:
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
					break;
				case 1:
					uni
						.createSelectorQuery()
						.select('.evaluate-data')
						.boundingClientRect(data => {
							//data - 各种参数
							uni.pageScrollTo({
								scrollTop: this.PageScrollTop + data.top - 50,
								duration: 300
							});
						})
						.exec();
					break;
				case 2:
					uni
						.createSelectorQuery()
						.select('.products-introduction')
						.boundingClientRect(data => {
							//data - 各种参数
							uni.pageScrollTo({
								scrollTop: this.PageScrollTop + data.top - 50,
								duration: 300
							});
						})
						.exec();
					break;
			}
		},
		/**
		 * 去购物车
		 */
		onToCart() {
			uni.switchTab({
				url: '/pages/cart/cart'
			});
		},
		/**
		 * 降价通知点击
		 */
		onDepreciate() {
			uni.showToast({
				title: '降价通知提醒成功',
				icon: 'success'
			});
		},

		/**
		 * 关注点击
		 */
		onAttention() {
			if (this.AttentionShow === 0) {
				this.AttentionShow = 1;
				uni.showToast({
					title: '关注成功',
					icon: 'none'
				});
			} else {
				this.AttentionShow = 0;
				uni.showToast({
					title: '取消成功',
					icon: 'none'
				});
			}
		},

		/**
		 * 评价点击
		 */
		onEvaluate() {
			uni.navigateTo({
				url: '/pages/GoodsEvaluateList/GoodsEvaluateList'
			});
		}
	}
};
</script>

<style scoped lang="scss">
@import 'GoodsDetails.scss';
</style>
