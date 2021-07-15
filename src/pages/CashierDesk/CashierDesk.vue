<template>
	<view class="page">
		<view class="price-count-down">
			<view class="price">
				<text class="min">￥</text>
				<text class="max">{{total}}</text>
			</view>
			<view class="count-down">
				<view class="title">支付剩余时间</view>
				<view class="count">
					<text class="time">{{hour}}</text>
					<text class="dot">:</text>
					<text class="time">{{min}}</text>
					<text class="dot">:</text>
					<text class="time">{{sec}}</text>
				</view>
			</view>
		</view> 
		<!-- 支付方式列表 -->
		<view class="pay-way">
			<view class="pay-list">
				<view class="list" v-for="(item,index) in PayList" 
				@click="onPayWay(item,index)"
				:key="index">
					<view class="pay-type">
						<image :src="item.icon" mode=""></image>
						<text>{{item.name}}</text>
					</view>
					<view class="check">
						<text class="iconfont" :class="PayWay === index ? 'icon-checked action':'icon-check'"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="pay-submit">
			<view class="submit" @click="onSubmit">{{PayPirce}}</view>
		</view>
	</view>
</template>

<script>
	import {  mapState, mapMutations } from 'vuex';
	export default {

		data() {
			return {
				PayList: [
					{
						icon: '/static/wx_pay.png',
						name: '微信支付',
					},{
						icon: '/static/zfb_pay.png',
						name: '支付宝支付',
					},{
						icon: '/static/yl_pay.png',
						name: '银联支付',
					},
				],
				PayWay: 0,
				PayPirce: `微信支付${this.total}`,
				total:'',
				type:0,
				CountDown: 1000,
				day: 0,
				hour: 0,
				min: 0,
				sec: 0,
				obj:{
					name:'微信支付'
				}
			};
		},
		computed: {
		   //映射
		   ...mapState(["arrCart","order","customOrder"]),
			 },
		onLoad(params){
			// console.log(this.uerInfo)
			const total = JSON.parse(decodeURIComponent(params.total));
			this.PayPirce = `微信支付￥${total.total}`
			this.type = total.type
			this.total=total.total
			this.obj.total = this.total
			this.obj.type = this.type
			this.CountDownData();
		},
		methods:{
			/**
			 * 支付方式切换点击
			 */
			onPayWay(item,index){
				this.PayWay = index;
				this.PayPirce = `${item.name}￥${this.total}`
				this.obj.name = item.name
			},
			/**
			 * 倒计时
			 */
			CountDownData(){
				setTimeout(() =>{
					this.CountDown--;
					this.day = parseInt(this.CountDown / (24*60*60))
					this.hour = parseInt(this.CountDown / (60 * 60) % 24);
					this.min = parseInt(this.CountDown / 60 % 60);
					this.sec = parseInt(this.CountDown % 60);
					if(this.CountDown <= 0){
						return
					}
					this.CountDownData();
				},1000)
			},
			/* 时间格式获取 */
			getNowTime: function () {
			      let dateTime
			      let yy = new Date().getFullYear()
			      let mm = new Date().getMonth() + 1
			      let dd = new Date().getDate()
			      let hh = new Date().getHours()
			      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes()
			        :
			        new Date().getMinutes()
			      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
			        :
			        new Date().getSeconds()
			      dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
			      console.log(dateTime)
			      return dateTime
			    },
			/**
			 * 支付点击
			 */
			onSubmit(){
				if(this.type==0){
				let arr=this.arrCart.filter((item)=>item.check!==true)
				this.$store.commit("updateArrCart",arr);
				let form = {}
				form.order_date=this.getNowTime()
				form.user_id = uni.getStorageSync('uerInfo').uId
				form.total_price = this.total
				form.list=this.order.list
				this.$Request({
					url:'/order/save_comorder',
					method:'POST',
					data:form
				}).then((res)=>{
					console.log(111)
				})
				uni.redirectTo({
					url: '/pages/PayResult/PayResult?item='+encodeURIComponent(JSON.stringify(this.obj)),
				})
				}else{
					this.$Request({
						url:'/order/save_cusorder',
						method:'POST',
						data:this.customOrder
					}).then((res)=>{
						console.log(222)
					})
					uni.redirectTo({
						url: '/pages/PayResult/PayResult?item='+encodeURIComponent(JSON.stringify(this.obj)),
					})
				}	
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'CashierDesk.scss';
</style>
