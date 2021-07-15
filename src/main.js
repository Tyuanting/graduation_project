import Vue from 'vue'
import App from './App'
import store from './store'
import Request from './common/js/request'
// 弹出框
// import DialogBox from './components/DialogBox/DialogBox';
Vue.prototype.$store = store
Vue.config.productionTip = false

// 全局组件
// Vue.component('DialogBox', DialogBox);
//mescroll
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.prototype.$Request = Request;
App.mpType = 'app'

const app = new Vue({
	store,
  ...App
})
app.$mount()
