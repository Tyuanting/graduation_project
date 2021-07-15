<template>
	<view class="page">
		<!-- 头部 -->
		<view class="header">
			<view class="header-title">定制确认单</view>
			<view class="header-nav">
				<view class="nav-bg"></view>
				<view class="nav">
					<view class="nav-item">
						<view class="nav-icon nav-after"><i class="iconfont icon-qiandan"></i></view>
						<view class="nav-title">签订定制合同</view>
						<view >确认卖家订单</view>
						<view >一键达成协议</view>
					</view>
					<view class="nav-item">
						<view class="nav-icon nav-after"><i class="iconfont icon-liucheng"></i></view>
						<view class="nav-title">分期交付货款</view>
						<view >实时动态获取</view>
						<view >作物信息</view>
					</view>
					<view class="nav-item">
						<view class="nav-icon"><i class="iconfont icon-shouhuo"></i></view>
						<view class="nav-title">货品出库</view>
						<view >按期出货</view>
						<view >物流跟踪有保障</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单部分 -->
		<view class="inquiry-form marginBootom">
			<view class="form-title">
				订单详情
			</view>
			<view class="d-list d-list-after">
				<view class="d-title">
					<text>定制品类：</text>
				</view>
				<view class="content">
					<text>{{data.pro_cate}}</text>
				</view>
			</view>
			<view class="d-list d-list-after">
				<view class="d-title">
					<text>定制数量：</text>
				</view>
				<view class="content">
					<text>{{data.pro_count}} 斤</text>
				</view>
			</view>
			<view class="d-list d-list-after">
				<view class="d-title">
					<text>收货地址：</text>
				</view>
				<view class="content">
					<text>{{data.to_place}}</text>
				</view>
			</view>
			<view class="d-list d-list-after">
				<view class="d-title">
					<text>频次阶段：</text>
				</view>
				<view class="content">
					<text>一次性定制</text>
				</view>
			</view>
			<view class="explain">
				<view class="explain-title">
					其他说明
				</view>
				<view class="explain-text-area">
					<textarea v-model="data.pro_desc" placeholder="" class="text-area" disabled="true"/>
				</view>
			</view>
			<view class="d-list">
				<view class="d-title">
					<text class="total">应付定金：</text>
				</view>
				<view class="content">
					<text>{{data.pro_count * data.price * 0.3}}</text>
				</view>
			</view>
			<view class="d-list">
				<view class="d-title">
					<text class="total">总价合计：</text>
				</view>
				<view class="content">
					<text class="status">{{data.pro_count *data.price}}</text>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="button-fixed">
			<view class="argument">
				<text class="iconfont icon-checked"></text>
					<text>我已阅读并同意</text>
					<text class="argument1">《用户服务协议》</text>
					<text class="argument1">《用户授权协议》</text>
					<text class="argument1">《隐私政策》</text>
				
			</view>
			<view class="submit">
				<button type="default" class="van-button" @click="topay()">
					确认订单
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				data:{}
			}
		},
		onLoad(params){
			const item = JSON.parse(decodeURIComponent(params.item));
						this.data = item
		},
		methods:{
			topay(){
				let val=this.data.price*this.data.pro_count*0.3
				let cusorder={}
				cusorder.user_id = uni.getStorageSync('uerInfo').uId
				cusorder.re_id=this.data.reId
				cusorder.total_price=this.data.price*this.data.pro_count
				cusorder.sub_price=val
				cusorder.status=0
				cusorder.merchant_id = this.data.mId
				cusorder.m_name = this.data.m_name
				this.$store.commit('setcustomOrder',cusorder);
				let obj={total:val,type:1}
				uni.redirectTo({
					url: '/pages/CashierDesk/CashierDesk?total='+encodeURIComponent(JSON.stringify(obj))
				});
			}
		}
	}
</script>

<style scoped lang="scss">
@import 'CustomOrderDo.scss';
</style>
