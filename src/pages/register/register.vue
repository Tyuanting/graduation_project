<template>
	<view class="page">
		<view class="logo"><image src="../../static/login.jpeg" mode=""></image></view>
		<!-- 填写区 -->
		<view class="input-info">
			<view class="info">
				<input type="tel" v-model="form.phone" maxlength="11" placeholder="请输入手机号" @blur="checkPhone()" />
				<view class="more"></view>
			</view>
			<view class="info">
				<input type="tel" v-model="form.code" maxlength="6" placeholder="请输入验证码" />
				<view class="more">
					<text class="mo" @click="getCheckCode()">获取验证码</text>
					<text class="mo" style="display: none">59秒后重试</text>
				</view>
			</view>
			<view class="info">
				<input :password="!isPassword" maxlength="26" v-model="form.password" placeholder="请设置6-26位字母数字组合密码" @blur="checkPassword()" />
				<view class="more"><text class="iconfont" :class="isPassword ? 'icon-eye-on' : 'icon-eye-off'" @click="isPassword = !isPassword"></text></view>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="btn-info">
			<view class="btn" :style="isRegister ? 'opacity:1' : 'opacity:0.4'" @click="isRegister ? onRegister() : ''"><text>注册</text></view>
		</view>
		<!-- 操作 -->
		<view class="operation">
			<text></text>
			<text @click="onLogin">已有账号?登录</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phoneStatus: true,
			passwordStatus: true,
			isPassword: false,
			isRegister: false,
			// 表单
			form: {
				phone: '',
				code: '',
				password: ''
			}
		};
	},
	methods: {
		onLogin() {
			uni.redirectTo({
				url: '/pages/login/login'
			});
		},
		/**
		 * 验证手机号格式
		 */
		checkPhone() {
			let reg = /^1[3-9]\d{9}$/;
			if (reg.test(this.form.phone)==false) {
				this.phoneStatus = false;
			}
			console.log(this.form.phone)
			console.log(this.phoneStatus)
		},

		/**
		 * 点击获取验证码
		 */
		getCheckCode() {
			uni.showToast({
				title: '暂不需要验证码',
				icon: 'none'
			});
		},
		/**
		 * 验证密码格式
		 */
		checkPassword() {
			let reg = /^[0-9A-Za-z]{6,26}$/;
			if (reg.test(this.form.password==false)) {
				this.passwordStatus = false;
			}
		},

		/**
		 * 注册点击
		 */
		onRegister() {
			if (this.phoneStatus == false) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});
			} else if (this.passwordStatus == false) {
				uni.showToast({
					title: '请设置6-26位字母数字组合密码',
					icon: 'none'
				});
			} else {
				this.$Request({
					url: '/users/reg',
					method: 'POST',
					data: this.form
				})
					.then(res => {
						if (res.code == 1) {
							uni.showToast({
								title: '注册成功',
								icon: 'success'
							});
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/login/login'
								});
							}, 1000);
						}else {
							uni.showToast({
								title: '该号码已注册，请前往登录',
								icon: 'none'
							});
						}
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	},
	watch: {
		form: {
			handler(newValue, oldValue) {
				if (newValue.phone && newValue.password) {
					this.isRegister = true;
				} else {
					this.isRegister = false;
				}
			},
			deep: true
		}
	}
};
</script>

<style scoped lang="scss">
@import 'register.scss';
</style>
