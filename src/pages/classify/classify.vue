<template>
	<view class="page" ref="page">
		<!-- 搜索 -->
		<view class="search-index">
			<view class="icon" @click="onPayCode">
				<text class="iconfont icon-magic"></text>
			</view>
			<view class="search">
				<view class="iconfont icon-fadajing"></view>
				<input type="text" placeholder="输入搜索内容" @focus="onSearch()"/>
			</view>
			<view class="icon">
				<text class="iconfont icon-xiaoxi"></text>
			</view>
		</view>
		<!-- 分类数据 -->
		<view class="classify-data" :style="'height:'+height+'px'">
			<view class="classify-one">
				<scroll-view scroll-y class="classify-list">
					<view class="list">
						<text>分类</text>
					</view>
					<view :class="(selected==index?'list action':'list')" v-for="(item,index) in oneCategory" :key="index" @click="selectCategory(index)">
						<text>{{item.name}}</text>
					</view>
				</scroll-view>
			</view>
			<view class="classify-two-three">
				<scroll-view scroll-y class="scroll">
					<view class="classify-two">
						<view class="classify-three">
							<view class="list" v-for="(item,index) in twoCategory" :key="index" @click="toCateList(item)">
								<image :src="item.img"></image>
								<text>{{item.name}}</text>
							</view>
							
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				selected:0,
				// twoName:'',
				oneCategory:[],
				twoCategory:[],
				height: 0,
			};
		},
		onReady() {
			let info = uni.createSelectorQuery().select(".page");
			　　　  info.boundingClientRect((data) => { //data - 各种参数
								console.log(data.height);
								this.height = data.height - 50;
								
			　　    }).exec()
		},
		onLoad(){
			this.getOneCategory();
			
		},
		methods:{
			/**
			 * 搜索点击
			 */
			onSearch() {
				uni.navigateTo({ url: '/pages/search/search' });
			},
			
			selectCategory(index){
				this.selected = index
				this.$Request({
					url: '/twocatelist',
					method: 'POST',
					data:{"cid":index+1}
				})
					.then(res => {
						if (res.code == 1) {
							this.twoCategory = res.data;
						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			
			/*  */
			getOneCategory(){
				this.$Request({
					url: '/classlist',
					method: 'GET'
				})
					.then(res => {
						if (res.code == 1) {
							this.oneCategory = res.data;
						}
					})
					.catch(error => {
						console.log(error);
					});
					this.$Request({
						url: '/twocatelist',
						method: 'POST',
						data:{cid:1}
					})
						.then(res => {
							if (res.code == 1) {
								this.twoCategory = res.data;
							}
						})
						.catch(error => {
							console.log(error);
						});
			},
			/*  */
			toCateList(item){
				let oid=item.one_category_id;
				let tid=item.two_id;
				uni.navigateTo({
					url: '/pages/SearchGoodsList/SearchGoodsList?keyword=' + encodeURIComponent(JSON.stringify({"oid":oid,"tid":tid})),
				})
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
			 * 付款码点击
			 */
			onPayCode(){
				uni.navigateTo({
					url: '/pages/PaymentCode/PaymentCode'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
@import 'classify.scss'
</style>
