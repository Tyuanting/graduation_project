<template>
	<view class="page">
		<!-- 搜索 -->
		<view class="search-head">
			<view class="back" @click="onBack">
				<text></text>
			</view>
			<view class="search">
				<text class="iconfont icon-fadajing"></text>
				<input type="text" v-model="keyword" placeholder="搜索商品" />
				<text class="sousuo" @click="onSearch">搜索</text>
			</view>
			<view class="cut" @click="isList = !isList">
				<text class="iconfont" :class="isList?'icon-shitu01':'icon-shitu02'"></text>
			</view>
		</view>
		<!-- 筛选 -->
		<view class="screen-info">
			<view class="screen-list">
				<view class="list" :class="{'action':screenShow===0}" @click="onSynthesize(0)">
					<text>综合</text>
					<text class="iconfont icon-sanjiao icon_z"></text>
				</view>
				<view class="list">
					<text>销量</text>
					<text></text>
				</view>
				<view class="list">
					<text>价格</text>
					<view class="icon_j">
						<text class="iconfont icon-sanjiao up"></text>
						<text class="iconfont icon-sanjiao down"></text>
					</view>
				</view>
				<view class="list" @click="isDrawer = true">
					<text>筛选</text>
					<text class="iconfont icon-shaixuan icon_s"></text>
				</view>
			</view>
			<!-- 筛选弹窗 -->
			<view class="screen-popup" @click.stop="isScreen = false" v-show="isScreen">
				<view class="synthesize">
					<view class="list">
						<text class="check"></text>
						<text class="title">综合排序</text>
					</view>
					<view class="list">
						<text class="check"></text>
						<text class="title">评论数从高到低</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="goods-data">
			<mescroll-body ref="mescrollRef"
				@init="mescrollInit"
				@down="downCallback"
				@up="upCallback"
				:down="downOption"
				:up="upOption"
				:top="0">
				<view class="goods-list">
					<view :class="isList?'list-view':'list-li'" v-for="(item,index) in goodsList" @click="onGoodsList(item.pro_id)" :key="index">
						<view class="thumb">
							<image :src="item.main_image" mode="heightFix"></image>
						</view>
						<view class="item">
							<view class="title">
								<text class="two-omit">{{item.pro_name}} {{item.pro_desc}}</text>
							</view>
							<view class="price">
								<view class="retail-price">
									<text class="min">￥</text>
									<text class="max">{{item.original_price}}</text>
								</view>
								<view class="vip-price">
									<text class="max iconfont icon-browse"></text>
									<text class="min">{{ item.browser }}人看过</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
		<!-- 抽屉 -->
		<view class="cu-modal drawer-modal justify-end" :class="{'show':isDrawer}" @click="isDrawer = false" style="position: absolute;">
			<view class="cu-dialog basis-lg" @click.stop="isDrawer = true">
				<view class="serve">
					<view class="title">
						<text>服务</text>
					</view>
					<view class="serve-list">
						<view class="list action">
							<text>会员专享</text>
						</view>
						<view class="list">
							<text>活动</text>
						</view>
						<view class="list">
							<text>活动</text>
						</view>
					</view>
				</view>
				<view class="price-screen">
					<view class="title">
						<text>价格区间</text>
					</view>
					<view class="price-section">
						<input type="number" placeholder="最低价">
						<text></text>
						<input type="number" placeholder="最高价">
					</view>
				</view>
				<view class="operation-btn">
					<view class="btn" @click.stop="isDrawer = false">
						<text>取消</text>
					</view>
					<view class="btn action">
						<text>确认</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
				},
				// 列表视图切换
				isList: true,
				// 筛选弹窗
				isScreen: false,
				// 筛选切换
				screenShow: 0,
				// 抽屉
				isDrawer: false,
				keyword: '',
        goodsList:[],
			}
		},
		onLoad(params) {
			 let data = JSON.parse(decodeURIComponent(params.keyword));
			 this.keyword = data.keyword
			if(this.keyword){
				this.getGoodList()
			}else{
				this.getCateproList(data.oid,data.tid)
			}
			
		},
		methods: {
			getGoodList(){
				this.$Request({
					url:"/search",
					method:'POST',
					data:{"key":this.keyword}
				}).then((res)=>{
					if(res.code==1){
						this.goodsList = res.results
					}else {
						this.goodsList=[]
						uni.showToast({
							title:'没有相关搜索哦！',
							icon:'none'
						})
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			getCateproList(oid,tid){
				this.$Request({
					url:"/get_cate_prolist",
					method:'POST',
					data:{oid:oid,tid:tid}
				}).then((res)=>{
					if(res.code==1){
						this.goodsList = res.results
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			onSearch(){
				this.getGoodList()
			},
			
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
			 * 返回点击
			 */
			onBack(){
				uni.navigateBack();
			},
			/**
			 * 综合点击
			 * @param {Number} type
			 */
			onSynthesize(type){
				this.screenShow = type;
				this.isScreen = !this.isScreen;
			},
			/**
			 * 商品列表点击
			 */
			onGoodsList(val){
				uni.navigateTo({
					url: '/pages/GoodsDetails/GoodsDetails?pid=' + encodeURIComponent(val),
					animationType: 'zoom-fade-out',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import  'SearchGoodsList.scss';
</style>
