<template>
	<view class="page">
		<view class="pay-price">
			<view class="icon">
				<image src="/static/pay_success.png" mode=""></image>
			</view>
			<view class="price-data">
				<view class="list">
					<view class="title">支付方式</view>
					<view class="content">：{{obj.name}}</view>
				</view>
				<view class="list">
					<view class="title">支付金额</view>
					<view class="content">：￥{{obj.total}}</view>
				</view>
			</view>
		</view>
		<!-- 跳转按钮 -->
		<view class="skip-btn">
			<view v-if="obj.type==1" class="btn" @click="onSkip(2)">我的订单</view>
			<view v-else class="btn" @click="onSkip(0)">我的订单</view>
			<view class="btn" @click="onSkip(1)">返回首页</view>
		</view>
    <!-- 为你推荐 -->
    <view class="recommend-info">
      <view class="recommend-title">
        <view class="title">
          <image src="/static/wntj_title.png" mode=""></image>
        </view>
      </view>
      <view class="goods-list">
        <view class="list" v-for="(item,index) in goodsList" @click="onSkip('goods')" :key="index">
          <view class="pictrue">
            <image :src="item.img" mode="heightFix"></image>
          </view>
          <view class="title-tag">
            <view class="tag">
              <text v-if="item.is_goods === 1">特价</text>
              {{item.name}}
            </view>
          </view>
          <view class="price-info">
            <view class="user-price">
              <text class="min">￥</text>
              <text class="max">{{item.price}}</text>
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
        goodsList:[
          {
            id: 1,
            name: '红富士苹果 虞城故道大量走货中，产区直供 ',
            price: '31.80',
            img: 'http://localhost:3000/images/main/apple2.jpeg',
            is_goods: 0,
          },{
            id: 1,
            name: '花花公子 卫衣男秋季圆领薄款休闲体恤男士时尚长袖T恤外套上衣男生情侣装套头衣服秋天男装 白色 XL',
            price: '39.00',
            img: 'http://localhost:3000/images/main/apple1.jpeg',
            is_goods: 1,
          },
					{
					  id: 1,
					  name: '赣南脐橙 产地直供  纯甜橙子10斤包邮',
					  price: '27.00',
					  img: 'http://localhost:3000/images/main/orange1.jpg',
					  is_goods: 1,
					},
					{
					  id: 1,
					  name: '赣南脐橙 产地直供  纯甜橙子10斤包邮',
					  price: '39.00',
					  img: 'http://localhost:3000/images/main/orange2.jpg',
					  is_goods: 1,
					}
        ],
				obj:{}
			}
		},
		onLoad(params) {
			this.obj=JSON.parse(decodeURIComponent(params.item));
		},
		methods: {
			/**
			 * @param {Number} type 0 订单 1 首页
			 */
			onSkip(type){
				switch(type){
					case 0:
						uni.redirectTo({
							url: '/pages/MyOrderList/MyOrderList?type=0'
						})
						break;
						case 2:
							uni.redirectTo({
								url: '/pages/CustomOrder/CustomOrder'
							})
							break;
					case 1:
						uni.switchTab({
							url: '/pages/home/home'
						})
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'PayResult.scss';
</style>
