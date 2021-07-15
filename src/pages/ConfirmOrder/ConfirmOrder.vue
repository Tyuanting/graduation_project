<template>
	<view class="page">
		<!-- 地址 -->
		<view class="address-data">
			<view class="address-list" @click="onSkip('address')">
				<view class="list"><text>四川省成都市龙泉驿区</text></view>
				<view class="list"><text class="address">成洛大道xxx号</text></view>
				<view class="list">
					<text>张三</text>
					<text>178****8888</text>
				</view>
				<view class="list"><text class="tips">(如果快递不方便接收，您可以选择暂时寄存服务)</text></view>
			</view>
			<view class="bar"></view>
		</view>
		<!-- 商品 -->
		<view class="goods-data">
			<view class="goods-title"><text>商品信息</text></view>
			<view class="goods-list">
				<view class="list" v-for="(item, index) in orderList" :key="index">
					<view class="thumb"><image :src="item.main_image" mode=""></image></view>
					<view class="item">
						<view class="title">
							<text class="name one-omit">{{ item.pro_name }} {{ item.pro_desc }}</text>
							<text class="attr">标椎规格</text>
						</view>
						<view class="price-number">
							<view class="price">
								<text class="min">￥</text>
								<text class="max">{{ item.promotion_price }}</text>
							</view>
							<view class="number">
								<text v-if="item.count">x {{ item.count }}</text>
								<text v-else>x 1</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="delivery">
				<div class="list">
					<view class="title">配送</view>
					<view class="content">
						<text>快递运输</text>
						<text class="iconfont icon-more"></text>
					</view>
				</div>
				<div class="list">
					<view class="title">留言</view>
					<view class="content"><input type="text" placeholder="选填,建议先和商家沟通确认" /></view>
				</div>
			</view>
		</view>
		<!-- 优惠 -->
		<view class="discounts-data">
			<view class="discounts">
				<div class="list">
					<view class="title">发票</view>
					<view class="content">
						<text>不开发票</text>
						<text class="iconfont icon-more"></text>
					</view>
				</div>
				<div class="list" @click="$refs['UseCoupon'].show()">
					<view class="title">优惠券</view>
					<view class="content">
						<text>无可用</text>
						<text class="iconfont icon-more"></text>
					</view>
				</div>
			</view>
		</view>
		<!-- 订单金额 -->
		<view class="order-price">
			<view class="price-list">
				<view class="list">
					<view class="title"><text>商品金额</text></view>
					<view class="price">
						<text>{{ total }}</text>
					</view>
				</view>
				<view class="list">
					<view class="title"><text>运费</text></view>
					<view class="price"><text class="highlight">+￥0.00</text></view>
				</view>
				<view class="list">
					<view class="title"><text>运费险</text></view>
					<view class="price"><text class="highlight">+￥0.00</text></view>
				</view>
			</view>
		</view>
		<!-- 地址提示 -->
		<view class="address-tips" :style="scrollTop >= 100 ? '' : 'display:none'"><text>四川省成都市龙泉驿区成洛大道xxx号</text></view>
		<!-- 底部合计提交 -->
		<view class="footer-submit">
			<view class="price">
				<text class="min">￥</text>
				<text class="max">{{ total }}</text>
			</view>
			<view class="submit" @click="onSubmit"><text>提交订单</text></view>
		</view>
		<!-- 优惠券 -->
		<use-coupon ref="UseCoupon"></use-coupon>
	</view>
</template>

<script>
import UseCoupon from '../../components/UseCoupon/UseCoupon.vue';
	import {  mapState, mapMutations } from 'vuex';
export default {
	components: {
		// 优惠券
		UseCoupon
	},
	data() {
		return {
			scrollTop: 0,
			orderList: [],
			total: '0'
		};
	},
	computed: mapState(['order']),
	onLoad() {
		this.getOrderList()
	},
	
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	methods: {
		getOrderList() {
			this.orderList = this.order.list;
				this.total = this.order.total;

		},
		/**
		 * 提交订单
		 */
		onSubmit() {
			let obj={total:this.total,type:0}
			uni.redirectTo({
				url: '/pages/CashierDesk/CashierDesk?total='+encodeURIComponent(JSON.stringify(obj))
			});
		},
		/**
		 * 跳转点击
		 * @param {String} type 跳转类型
		 */
		onSkip(type) {
			switch (type) {
				case 'address':
					uni.navigateTo({
						url: '/pages/AddressList/AddressList'
					});
					break;
			}
		}
	}
};
</script>

<style scoped lang="scss">
@import 'ConfirmOrder.scss';
</style>
