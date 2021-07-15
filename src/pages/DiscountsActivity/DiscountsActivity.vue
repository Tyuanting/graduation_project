<template>
	<view class="page">
		<view class="activity-list">
			<view class="list" v-for="(item,index) in 1" :key="index">
				<view class="date">
					<text>09.13 09:20</text>
				</view>
				<view class="item">
					<view class="title">
						<text class="one-omit">新年果子节优惠大放送</text>
					</view>
					<view class="pictrue">
						<image src="../../static/4.jpg" mode=""></image>
						<view class="hint">
							<text>活动结束</text>
						</view>
					</view>
					<view class="describe">
						<text class="two-omit">大批量定购可享受平台免费物流，物流到家</text>
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
		}
	}
</script>

<style scoped lang="scss">
	@import 'DiscountsActivity.scss';
</style>
