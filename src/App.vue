<script>
import { mapMutations } from 'vuex';
export default {
	onLaunch: function() {
		uni.getStorage({
			//获得保存在本地的用户信息
			key: 'uerInfo',
			success: res => {
				this.login(res.data);
				// this.$store.dispatch('getCartList',{uId:res.data.uId})
			}
		});
	},
	methods: {
		...mapMutations(['login'])
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import 'colorui/main.css';
@import 'colorui/icon.css';
@import 'style/iconfont.css';

/* 超出一行省略号 */
.one-omit {
	white-space: nowrap; /*规定段落中的文本不进行换行*/
	overflow: hidden; /*内容会被修剪，并且其余内容是不可见的。*/
	text-overflow: ellipsis; /*显示省略号来代表被修剪的文本*/
}
.two-omit {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
}
img {
	width: 100%;
}
</style>
