<template>
	<view class="box">
		<!-- 步骤条 -->
		<view class="set-1">
			<view class="set-2" :class="`${item.status==0?'status':'c-status'}`" :key="index" v-for="(item, index) in options">
				<text class="set2-test">{{ item.text1 }}</text>
				<view class="set-view">
					<view class="set-view-test">
						<view class="set-view-test1">{{ item.text2 }}</view>
						<view class="set-view-test2">信息：{{item.text3}}</view>
					</view>
					<view class="set-view-test3">订单状态：正常</view>
					<view class="set-view-test4">
						<view class="set-zuo">处理详情：执行合约流程</view>
						<view class="set-you">查看详情</view>
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
			options: [{ text1: '2021-03-10 12:00', text2: '订单生成',text3:'支付定金' }, 
			{ text1: '2021-03-10 14:00', text2: '第二阶段',text3:'2阶段金额已支付'},
			{ text1: '2021-03-15 12:00', text2: '第三阶段',text3:'当前阶段未支付',status:0 },
			{ text1: '2021-03-16 12:00', text2: '已发货',text3:'订单已出货',status:0 }]
		};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
	@import 'customProDetails.scss';
</style>
