<template>
	<view class="">
		<view class="tab-top">
			<view :class="['tab-no', index == 0 ? 'tab-selected' : '']" @click="index = 0">全部</view>
			<view :class="['tab-no', index == 1 ? 'tab-selected' : '']" @click="index = 1">待发货</view>
			<view :class="['tab-no', index == 2 ? 'tab-selected' : '']" @click="index = 2">已结束</view>
		</view>
		<view class="" v-show="index == 0">
			<empty v-if="allList.length == 0"></empty>
			<view class="o-list" v-for="(item,index) of allList" :key="index">
				<view class="o-list-item">
					<view class="o-list-content">
						<view class="o-list-content-title">
							<text>{{item.details.pro_cate}}</text>
							<text class="o-list-content-num">--{{item.details.pro_count}}斤</text>
						</view>
						<view>
							<text>状态：</text>
							<text class="o-list-content-status">{{item.status==0?'待发货':'待收货'}}</text>
						</view>
						<view class="o-list-content-des">
							<view>
								<text class="iconfont icon-germination peasant-icon"></text>
								<text class="o-list-content-peasant">{{item.m_name}}</text>
							</view>
							<view>
								￥
								<text class="o-list-content-price">{{item.total_price}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="btn">
					<view class="btn-group">
						<button class="btn-group-meet" plain="true" @click="toProDetails()">订单详情</button>
						<button class="btn-refresh" plain="true" @click="toStatus()">产品状态</button>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-show="index == 1">
			<empty v-if="endList.length == 0"></empty>
		<view class="o-list" v-for="(item,index) of endList" :key="index">
			<view class="o-list-item">
				<view class="o-list-content">
					<view class="o-list-content-title">
						<text>{{item.details.pro_cate}}</text>
						<text class="o-list-content-num">--{{item.details.pro_count}}斤</text>
					</view>
					<view>
						<text>状态：</text>
						<text class="o-list-content-status">{{item.status==0?'待发货':'待收货'}}</text>
					</view>
					<view class="o-list-content-des">
						<view>
							<text class="iconfont icon-germination peasant-icon"></text>
							<text class="o-list-content-peasant">{{item.m_name}}</text>
						</view>
						<view>
							￥
							<text class="o-list-content-price">{{item.total_price}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="btn">
				<view class="btn-group">
					<button class="btn-group-meet" plain="true" @click="toProDetails()">订单详情</button>
					<button class="btn-refresh" plain="true" @click="toStatus()">产品状态</button>
				</view>
			</view>
		</view></view>
		<view class="" v-show="index == 2"><empty v-if="turnList.length == 0"></empty></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			index: 0, //选中的tab
			allList: [],
			endList: [],
			turnList: []
		};
	},
	onLoad() {
		this.getOrderList();
	},
	methods: {
		/* 获取订单列表 */
		getOrderList() {
			let uId = uni.getStorageSync('uerInfo').uId;
			this.$Request({
				url: '/order/get_cusorder',
				method: 'POST',
				data: { id: uId }
			}).then(res => {
				if (res.code == 0) {
					this.allList = res.data;
					this.allList.forEach((item)=>{
						if(item.status==0){
							this.endList.push(item)
						}
					})
				}
			});
		},
		toProDetails() {
			console.log(1)
			uni.navigateTo({
				url:"../customProDetails/customProDetails"
			})
		},
		toStatus(){
			uni.navigateTo({
				url:"../realTimeStatus/realTimeStatus"
			})
		}
	}
};
</script>

<style scoped lang="scss">
@import 'CustomOrder.scss';
</style>
