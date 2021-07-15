<template>
	<view class="page-total">
			<!-- 热卖推荐 -->
			<view class="more-hot">
				<view class="hot-title">
					<view class="title">
						<text class="iconfont icon-xiedian"></text>
						<text class="icon">热卖推荐</text>
						<text class="iconfont icon-xiedian"></text>
					</view>
				</view>
			  <view class="goods-list">
			    <view class="list" v-for="(item,index) in proList" @click="onSkip('goods')" :key="index">
			      <view class="pictrue">
			        <image :src="item.main_image" mode="heightFix"></image>
			      </view>
			      <view class="title-tag">
			        <view class="tag">
			          <!-- <text v-if="item.is_goods === 1">特价</text> -->
			          {{item.pro_name}} {{item.pro_desc}}
			        </view>
			      </view>
			      <view class="price-info">
			        <view class="user-price">
			          <text class="min">￥</text>
			          <text class="max">{{item.original_price}}</text>
			        </view>
			        <view class="vip-price">
			          <text>{{ item.browser }}人看过</text>
			        </view>
			      </view>
			    </view>
			  </view>
			</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		
		};
	},
	props:{
		cateList:{
			type:Array,
			default:[]
		},
		proList:{
			type:Array,
			default:[]
		}
	},
	methods:{
		/**
		 * 跳转点击
		 * @param {String} type 跳转类型
		 */
		onSkip(type){
			switch (type){
				case 'classify':
					uni.navigateTo({
						url: '/pages/SearchGoodsList/SearchGoodsList',
					})
					break;
				case 'goods':
					uni.navigateTo({
						url: '/pages/GoodsDetails/GoodsDetails',
						animationType: 'zoom-fade-out',
						animationDuration: 200
					})
					break;
			}
		}
	}
};
</script>

<style lang="scss">
@import 'ClassifyData.scss';
</style>
