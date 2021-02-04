<template>
	<view class="page-total">
		
			<view class="">
				水果
			</view>
			
		
		
	
	</view>
</template>

<script>
export default {
	data() {
		return {

		
		};
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
