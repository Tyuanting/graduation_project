import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		uerInfo: {},
		hasLogin: false,
		count: uni.getStorageSync('count'),
		cart: uni.getStorageSync('details'),
		arrCart: JSON.parse(uni.getStorageSync('shopList') || '[]'),
		order:[],//普通订单
		customOrder:{}
	},
	mutations: {
		
		/* 存储数量 */
		setCount(state,count){
			state.count = count;
			//保存到本地
			uni.setStorageSync('count',state.count);
		},
		
		/* 创建购物车 */
		setCart(state,details){
			let index = state.arrCart.findIndex((item)=>{
				return item.pro_id == details.pro_id;
			});
			console.log(index);
			if(index == -1){
				state.arrCart.push(details);
			}else{
				state.arrCart[index].count++;
			}
			uni.setStorageSync('shopList',JSON.stringify(state.arrCart));
		},
		
		/* 重复添加 */
		updateCount(state,obj){
			// 深拷贝
			let arrCart = JSON.parse(JSON.stringify(state.arrCart));
			arrCart[obj.index].count = obj.count;
			state.arrCart = arrCart;
			uni.setStorageSync('shopList',JSON.stringify(state.arrCart));
		},
		
		/* 购物车列表更新 */
		updateArrCart(state,arr){
			state.arrCart=arr;
			uni.setStorageSync('shopList',JSON.stringify(state.arrCart));
		},
		
		/* 普通订单 */
		setOrder(state,obj){
			state.order=obj
		},
		
		/* 定制订单 */
		setcustomOrder(state,obj){
			state.customOrder=obj
			console.log(obj)
		},
		
		login(state, provider) { //改变登录状态  
			state.hasLogin = true
			state.uerInfo.birthDate = provider.birthDate
			state.uerInfo.uPhone = provider.uPhone
			state.uerInfo.nickName = provider.nickName
			state.uerInfo.gender = provider.gender
			state.uerInfo.uId = provider.uId
			uni.setStorage({ //将用户信息保存在本地  
				key: 'uerInfo',
				data: provider
			})
		},
		logout(state) { //退出登录  
			state.hasLogin = false
			state.uerInfo = {}
			state.arrCart=[]
			uni.setStorageSync('shopList','[]')
			uni.removeStorageSync('count')
			uni.removeStorageSync('details')
			uni.removeStorageSync('orderList')
			uni.removeStorage({
				key: 'uerInfo'
			})
		},
		/* 改变用户信息 */
		changeUerSex(state,provider){
			state.uerInfo.gender = provider.sexText
			console.log(state.uerInfo)
			uni.setStorageSync('uerInfo',state.uerInfo)
		},
		changeUerNick(state,provider){
			state.uerInfo.nickName = provider.nickname
			console.log(state.uerInfo)
			uni.setStorageSync('uerInfo',state.uerInfo)
		},
		changeUerBrith(state,provider){
			state.uerInfo.birthDate = provider.birthday
			console.log(state.uerInfo)
			uni.setStorageSync('uerInfo',state.uerInfo)
		},
		getCart(state,val){
			state.arrCart=val;
			uni.setStorageSync('shopList',JSON.stringify(state.arrCart));
		}
	},
	actions:{
		saveCartList(context,val=[]){
			Vue.prototype.$Request({
				url:'/order/save_cart',
				method:'POST',
				data:val
			}).then((res)=>{
				// console.log(res.code)
			})
		},
		getCartList(context,val){
			Vue.prototype.$Request({
				url:'/order/get_cart',
				method:'POST',
				data:val
			}).then((res)=>{
				// console.log(res.data)
				context.commit('getCart',res.data)
				
			})
		},
		delCart(context,val){
			Vue.prototype.$Request({
				url:'/order/del_cart',
				method:'POST',
				data:val
			}).then((res)=>{
				// console.log(res)	
			})
		},
		saveUerInfo(context,val){
			Vue.prototype.$Request({
				url:'/users/save_info',
				method:'POST',
				data:context.state.uerInfo
			}).then((res)=>{
				// console.log(res.data)
			})
		},
	}
})
export default store
