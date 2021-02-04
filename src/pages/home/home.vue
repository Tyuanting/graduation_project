<template>
	<view class="page">
		<view class="head-info">
			<!-- 搜索 -->
			<view class="head-search">
				<view class="icon-info" @click="onCode"><text class="iconfont icon-magic"></text></view>
				<view class="search" @click="onSearch">
					<view class="icon"><image src="/static/search.png" mode=""></image></view>
					<view class="hint">
						<text class="max">搜索</text>
						<text class="min">定制商品来袭！</text>
					</view>
				</view>
				<view class="icon-info" @click="onSkip('paycode')">
					<text class="iconfont icon-scan"></text>
					<!-- <image src="/static/fkm_ico.png" mode=""></image> -->
				</view>
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
					<view class="nav" ref="nav" :style="navList.length<=10?'flex-direction:row':''">
						<view class="list" v-for="(item,index) in navList"
						@click="onSkip('menu')"
						:key="item.id">
							<image :src="'/static/nav/nav_'+(index+1)+'.png'" mode=""></image>
							<text>{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
				<view class="indicator" v-if="navList.length>10">
					<view class="plan">
						<view class="bar" :style="'left:'+slideNum+'%'"></view>
					</view>
				</view>
			</view>
				<!-- 通知 -->

				<!-- 限时抢购，好货精选 -->

				<!-- 今日上新 -->

				<!-- 为你推荐 -->
			</view>
		</mescroll-body>
		<ClassifyData v-show="classifyShow==selected&&classifyShow!=0"></ClassifyData>
	</view>
</template>

<script>
// import TabBar from '../../components/TabBar/TabBar.vue';
import ClassifyData from '../../components/ClassifyData/ClassifyData.vue';
// 引入mescroll-mixins.js
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	components: {
		// TabBar,
		ClassifyData
	},
	data() {
		return {
			selected:1,
			title: 'Hello',
			mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
			// 下拉刷新的配置(可选, 绝大部分情况无需配置)
			downOption: {},
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			upOption: {
				use: false
			},
			swiperList: [
				{
					id: 0,
					type: 'image',
					url: '/static/banner/banner_1.jpg'
				},
				{
					id: 1,
					type: 'image',
					url: '/static/banner/banner_2.jpg'
				},
				{
					id: 2,
					type: 'image',
					url: '/static/banner/banner_3.jpg'
				},
				{
					id: 3,
					type: 'image',
					url: '/static/banner/banner_4.jpg'
				}
			],
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
					name: '水产'
				},
				{
					id: 4,
					name: '肉蛋'
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
				},{
					id: 2,
					name: '农业资讯',
				},{
					id: 3,
					name: '小学堂',
				},{
					id: 4,
					name: '定制专场',
				}
			],
			classifyShow: 0
		};
	},
	onReady() {},
	onLoad() {},
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
		/**
		 * 菜单导航滚动
		 */
		ScrollMenu(e){
			let scrollLeft = e.target.scrollLeft;
			const query = uni.createSelectorQuery().in(this);
			query.select('.nav').boundingClientRect(data => {
				let wid = e.target.scrollWidth - data.width - (data.left*2+5);
				this.slideNum = (scrollLeft/wid*300) / 2;
			}).exec();
		},
		/**
		 * 搜索点击
		 */
		onSearch(){
			uni.navigateTo({url:'/pages/search/search'})
		},
		/**
		 * 扫一扫点击
		 */
		onCode(){
			// 只允许通过相机扫码
			uni.scanCode({
				onlyFromCamera: true,
				success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
				}
			});
		},
		/**
		 * 分类点击
		 * @param {Object} item
		 * @param {Number} index
		 */
		onClassify(item, index) {
			this.classifyShow = index;
			this.selected=index;
		}
	}
};
</script>

<style scoped lang="scss">
@import 'home.scss';
</style>
