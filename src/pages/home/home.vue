<template>
	<view class="page">
		<view class="head-info">
			<!-- 搜索 -->
			<view class="head-search">
				<view class="icon-info"><text class="iconfont icon-magic"></text></view>
				<view class="search" @click="onSearch">
					<view class="icon"><image src="/static/search.png" mode=""></image></view>
					<view class="hint">
						<text class="max">搜索</text>
						<text class="min">定制商品来袭！</text>
					</view>
				</view>
				<view class="icon-info"  @click="onCode"><text class="iconfont icon-scan"></text></view>
			</view>
			<!-- 分类列表 -->
			<view class="classify-list">
				<view class="list" v-for="(item, index) in classList" :class="{ action: classifyShow == index }" @click="onClassify(item, index)" :key="index">
					<text>{{ item.name }}</text>
					<text class="line" v-show="classifyShow == index"></text>
				</view>
			</view>
		</view>
		<mescroll-body ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :top="0">
			<view class="main" v-show="classifyShow === 0">
				<!-- banner -->
				<view class="banner">
					<swiper class="screen-swiper square-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500">
						<swiper-item v-for="(item, index) in swiperList" :key="index"><image :src="item.url" mode="aspectFill"></image></swiper-item>
					</swiper>
				</view>
				<!-- 菜单导航 -->
				<view class="menu-nav">
					<scroll-view scroll-x @scroll="ScrollMenu" class="nav-list">
						<view class="nav" ref="nav" :style="navList.length <= 10 ? 'flex-direction:row' : ''">
							<view class="list" v-for="(item, index) in navList" @click="onSkip(item.code)" :key="item.id">
								<image :src="'/static/nav/nav_' + (index + 1) + '.png'" mode=""></image>
								<text>{{ item.name }}</text>
							</view>
						</view>
					</scroll-view>
					<view class="indicator" v-if="navList.length > 10">
						<view class="plan"><view class="bar" :style="'left:' + slideNum + '%'"></view></view>
					</view>
				</view>
				<!-- 通知 -->
				<view class="inform">
					<view class="inform-info">
						<view class="picture"><image src="/static/gg_ico.png" mode=""></image></view>
						<view class="info">
							<swiper class="swiper" :circular="true" :vertical="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
								<swiper-item>
									<view class="swiper-item" @click="onSkip('inform')"><text class="one-omit">何*** 理刚刚通过推广赚了￥25.00元，商品男装休闲装购买</text></view>
								</swiper-item>
								<swiper-item>
									<view class="swiper-item" @click="onSkip('inform')"><text class="one-omit">张*** 理刚刚通过推广赚了￥99.00元，商品Mac book pro 15寸购买</text></view>
								</swiper-item>
								<swiper-item>
									<view class="swiper-item" @click="onSkip('inform')"><text class="one-omit">郑*** 理刚刚通过推广赚了￥88.00元，商品华为meat30 pro购买</text></view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
				<!-- 限时抢购，好货精选 -->
				<view class="flash-good">
					<view class="flash-sale">
						<view class="line"></view>
						<view class="flash-title" @click="onSkip('flash')">
							<view class="pictrue"><image src="/static/xsqg_title.png" mode=""></image></view>
							<view class="date-time">
								<text class="time">02</text>
								<text class="da">:</text>
								<text class="time">15</text>
								<text class="da">:</text>
								<text class="time">55</text>
							</view>
						</view>
						<view class="goods-list">
							<view class="list" @click="toGoodsDetails(item.pro_id)" v-for="(item, index) in hotList" :key="index">
								<view class="pictrue"><image :src="item.main_image"></image></view>
								<view class="price">
									<text class="selling-price">￥{{ item.promotion_price }}</text>
									<text class="original-price">￥{{ item.original_price }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 为你推荐 -->
				<view class="recommend-info">
					<view class="recommend-title">
						<view class="title"><image src="/static/wntj_title.png" mode=""></image></view>
					</view>
					<view class="goods-list">
						<view class="list" v-for="(item, index) in goodsList" @click="toGoodsDetails(item.pro_id)" :key="index">
							<view class="pictrue"><image :src="item.main_image" mode="heightFix"></image></view>
							<view class="title-tag">
								<view class="tag">
									<!-- <text v-if="item.is_goods === 1">特价</text> -->
									{{ item.pro_name }} {{ item.pro_desc }}
								</view>
							</view>
							<view class="price-info">
								<view class="user-price">
									<text class="min">￥</text>
									<text class="max">{{ item.original_price }}</text>
								</view>
								<view class="vip-price">
									<!-- <image src="/static/vip_ico.png"></image> -->
									<text>{{ item.browser }}人看过</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
		<ClassifyData v-show="classifyShow != 0" :cateList="cateList" :proList="proList"></ClassifyData>
	</view>
</template>

<script>
//引入类别样式组件
import ClassifyData from '../../components/ClassifyData/ClassifyData.vue';
// 引入mescroll-mixins.js
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import { mapState } from 'vuex';
export default {
	mixins: [MescrollMixin], // 使用mixin混入方法
	components: {
		ClassifyData
	},
	computed: mapState(['hasLogin']),//登录状态
	data() {
		return {
			title: 'Hello',
			mescroll: null, // mescroll实例对象 ixins已默认
			downOption: {},
			upOption: {
				use: false
			},
			swiperList: [],
			hotList: [],
			classList: [
				{
					id: 0,
					name: '首页'
				},
				{
					id: 1,
					name: '水果'
				},
				{
					id: 2,
					name: '蔬菜'
				},
				{
					id: 3,
					name: '肉蛋'
				},
				{
					id: 4,
					name: '水产'
				},
				{
					id: 5,
					name: '杂粮'
				},
				{
					id: 6,
					name: '农业服务'
				}
			],
			navList: [
				{
					id: 1,
					name: '供应大厅',
					code: ''
				},
				{
					id: 2,
					name: '农业资讯',
					code: ''
				},
				{
					id: 3,
					name: '小学堂',
					code: ''
				},
				{
					id: 4,
					name: '定制专场',
					code: 'CustomMade'
				}
			],
			classifyShow: 0,
			goodsList: [],
			cateList: [],
			proList: []
		};
	},
	onReady() {},
	onLoad() {
		/* 轮播图 */
		this.getSwiperList();
		this.getHotPro();
		this.getGoodsList();
	},
	methods: {
		/* 获取banner轮播图片 */
		getSwiperList() {
			this.$Request({
				url: '/banner',
				method: 'GET'
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

		/* 限时秒杀位的商品展示 */
		getHotPro() {
			this.$Request({
				url: '/hot',
				method: 'GET'
			})
				.then(res => {
					if (res.code == 1) {
						this.hotList = res.data;
					}
				})
				.catch(error => {
					console.log(error);
				});
		},

		/* 为你推荐部分的商品列表 */
		getGoodsList() {
			this.$Request({
				url: '/goodslist',
				method: 'GET'
			})
				.then(res => {
					if (res.code == 1) {
						this.goodsList = res.data;
					}
				})
				.catch(error => {
					console.log(error);
				});
		},

		/*下拉刷新的回调, 有三种处理方式:*/
		downCallback() {
			this.mescroll.endSuccess();
		},

		/*上拉加载的回调*/
		upCallback(page) {
			setTimeout(() => {
				this.mescroll.endByPage(10, 20);
			}, 2000);
		},

		/**
		 * 菜单导航滚动
		 */
		ScrollMenu(e) {
			let scrollLeft = e.target.scrollLeft;
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.nav')
				.boundingClientRect(data => {
					let wid = e.target.scrollWidth - data.width - (data.left * 2 + 5);
					this.slideNum = ((scrollLeft / wid) * 300) / 2;
				})
				.exec();
		},

		/**
		 * 搜索点击
		 */
		onSearch() {
			uni.navigateTo({ url: '/pages/search/search' });
		},

		/**
		 * 扫一扫点击
		 */
		onCode() {
			// 只允许通过相机扫码
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				}
			});
		},

		/**
		 * 分类点击
		 */
		onClassify(item, index) {
			this.classifyShow = index;
			this.$Request({
				url: '/prolist',
				method: 'POST',
				data: { cid: index }
			})
				.then(res => {
					if (res.code == 1) {
						this.proList = res.data;
					}
				})
				.catch(error => {
					console.log(error);
				});
		},

		/**
		 * 点击导航跳转
		 */
		onSkip(val) {
			switch (val) {
				//定制
				case 'CustomMade':
					if (!this.hasLogin) {
						uni.navigateTo({
							url: '../login/login'
						});
					} else {
						uni.navigateTo({
							url: '/pages/CustomMade/CustomMade'
						});
					}
					break;
			}
		},

		/* 
		点击商品
		 */
		toGoodsDetails(val) {
			uni.navigateTo({
				url: '/pages/GoodsDetails/GoodsDetails?pid=' + encodeURIComponent(val),
				animationType: 'zoom-fade-out',
				animationDuration: 200
			});
		}
	}
};
</script>

<style scoped lang="scss">
@import 'home.scss';
</style>
