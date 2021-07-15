<template>
	<view class="price-num">
		<view class="price">
			<text class="min">￥</text>
			<text class="max">{{price}}</text>
		</view>
		<view class="num">
			<view class="add">
				<text class="iconfont icon-jian" @click="red()"></text>
			</view>
			<view class="number">
				<text>{{num}}</text>
			</view>
			<view class="add">
				<text class="iconfont icon-jia" @click="add()"></text>
			</view>
		</view>
	</view>
</template>

<script>
	  export default {
	    props: ["count", "index","price"],
	    data() {
	      return {
	        num: 1,
	      };
	    },
	    methods: {
	      red() {
	        if (this.num > 1) {
	          this.num--;
	        } else if (this.num == 1) {
	          this.num = 1;
	        }
	      },
	      add() {
	        this.num++;
	      },
	    },
	    watch: {
	      num(val) {
	        this.$store.commit("updateCount", { index: this.index, count: val });
	      },
	    },
	    created() {
	      this.num = this.count;
	    },
	  };
</script>

<style scoped lang="scss">
	.price-num{
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  height: 80rpx;
	  .price{
	    display: flex;
	    .min{
	      color: #fe3b0f;
	      font-size: 24rpx;
	    }
	    .max{
	      font-size: 28rpx;
	      color: #fe3b0f;
	      font-weight: bold;
	    }
	  }
	  .num{
	    display: flex;
	    height: 40rpx;
	    .add{
	      display: flex;
	      justify-content: center;
	      align-items: center;
	      width: 40rpx;
	      height: 40rpx;
	      background-color: #FFFFFF;
	      text{
	        color: #212121;
	        font-size: 24rpx;
	      }
	    }
	    .number{
	      display: flex;
	      justify-content: center;
	      align-items: center;
	      width: 80rpx;
	      height: 40rpx;
	      background-color: #f6f6f6;
	      border-radius: 8rpx;
	      text{
	        font-size: 24rpx;
	        color: #212121;
	      }
	    }
	  }
	}
</style>
