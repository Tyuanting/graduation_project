<template>
	<view class="page">
		<view class="head">
			<!-- #ifdef APP-PLUS -->
			<view class="title">购物车</view>
			<!-- #endif -->
			<view class="edit" @click="isEdit = !isEdit">
				<text>{{isEdit?'完成':'编辑'}}</text>
			</view>
		</view>
		<!-- 购物车列表 -->
    <mescroll-body ref="mescrollRef"
                   @down="downCallback"
                   @up="upCallback"
                   :down="downOption"
                   :up="upOption"
                   :top="0">
		<view class="cart-list">
			<empty v-if="arrCart.length==0"></empty>
			<view class="list" v-for="(item,index) of arrCart" :key="index">
				<view class="check">
					<text class="iconfont" :class="item.check ? 'icon-checked' : 'icon-check'" @click="listcheck(item)"></text>
				</view>
				<view class="goods">
					<view class="thumb">
						<image :src="item.main_image" mode=""></image>
					</view>
					<view class="item">
						<view class="title">
							<text class="two-omit">{{item.pro_name}} {{item.pro_desc}}</text>
						</view>
						<view class="attribute">
							<view class="attr">
								<text>箱装，大果</text>
								<!-- <text class="more"></text> -->
							</view>
						</view>
						 <cart-add :count="item.count" :index="index" :price="item.promotion_price"></cart-add>
					</view>
				</view>
			</view>
		</view>
    
		<!-- 结算 -->
		<view class="close-account">
			<view class="check-total">
				<view class="check">
					<text class="iconfont" :class="allcheck"></text>
					<text class="all" @click="alllistcheck">全选</text>
				</view>
				<view class="total">
					<text>合计：</text>
					<text class="price">￥{{ subtotal }}</text>
				</view>
			</view>
			<view class="account">
				<view class="btn-calculate" v-if="!isEdit" @click="toAccount()">
					<text>去结算</text>
				</view>
				<view class="btn-del" v-else>
					<text class="attention">移入关注</text>
					<text class="del" @click="del()">删除</text>
				</view>
			</view>
		</view>
    </mescroll-body>
	</view>
</template>

<script>
  // 引入mescroll-mixins.js
  import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import CartAdd from "@/components/CartAdd/CartAdd.vue"
	import {  mapState, mapMutations } from 'vuex';
	import Empty from "@/components/empty/empty"
	export default {
		components: {
			CartAdd
		},
    mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
        mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
        // 下拉刷新的配置(可选, 绝大部分情况无需配置)
        downOption: {},
        // 上拉加载的配置(可选, 绝大部分情况无需配置)
        upOption: {
          use: false,
          toTop: {
            src: '',
          }
        },
				isEdit: false,
        allcheck: "icon-check"
			};
		},
		 computed: {
		    //映射
		    ...mapState(["arrCart","hasLogin","uerInfo"]),
		    subtotal: function() {
		      // console.log(this.arrCart)
		      let arrCart = this.arrCart;
		      let total = 0;
		      arrCart.forEach((item) => {
		        if (item.check) {
		          total = total + item.promotion_price * item.count;
		        }
		      });
		      return total.toFixed(2);
		    },
		  },
		onLoad() {
      if(!this.hasLogin){
				uni.navigateTo({
					url:'../login/login'
				})
				}
			// }else{
			// 	this.$store.dispatch('getCartList',{uId:this.uerInfo.uId})
			// }
		},
		onUnload() {

		},
    methods:{
			 listcheck(item) {
				 // console.log(item)
			      if (typeof item.check === "undefined") {
			        this.$set(item, "check", true);
			      } else {
			        item.check = !item.check;
			        this.allcheck = "icon-check";
			      }
			      let has = this.arrCart.some(item => {
			        return !item.check
			      })
			      if(has){
			        this.allcheck = "icon-check";
			      }else{
			        this.allcheck = "icon-checked"
			      }
			    },
			    alllistcheck() {
			      if (this.allcheck == "icon-check") {
			        this.allcheck = "icon-checked";
			        this.arrCart.forEach((item) => {
			          if (typeof item.check === "undefined") {
			            this.$set(item, "check", true);
			          }else{
									item.check = true;
								}
			        });
			      } else if (this.allcheck == "icon-checked") {
			        this.allcheck = "icon-check";
			        this.arrCart.forEach((item) => {
			          item.check = false;
			        });
			      }
			    },
					/* del */
					del(){
					let arr=this.arrCart.filter((item)=>item.check!==true)
					let list = this.arrCart.filter((item)=>item.check==true)
					this.$store.dispatch('delCart',{list:list,uId:this.uerInfo.uId})
					this.$store.commit("updateArrCart",arr);
					},
					
					/* 去结算 */
					toAccount(){
						let obj={}
						obj.list=this.arrCart.filter((item)=>item.check==true)
						obj.total=this.subtotal
						// console.log(obj)
						if(obj.list.length==0){
							uni.showToast({
								title:'请选择',
								icon:'none'
							})
						}else{
							this.$store.commit('setOrder',obj);
						uni.navigateTo({
							url:"/pages/ConfirmOrder/ConfirmOrder",															
						})
						}
						
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
	}
</script>

<style scoped lang="scss">
	@import 'cart.scss';
</style>
