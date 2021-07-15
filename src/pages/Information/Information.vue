<template>
	<view class="page">
		<!-- 用户信息列表 -->
		<view class="user-list">
			<view class="list" style="height: 160rpx;">
				<view class="title"><text>头像</text></view>
				<view class="more-content">
					<image src="/static/login.jpeg" mode=""></image>
					<text class="iconfont icon-more more"></text>
				</view>
			</view>
			<view class="list" @click="onNickname">
				<view class="title"><text>昵称</text></view>
				<view class="more-content">
					<text class="content">{{ info.nickname }}</text>
					<text class="iconfont icon-more more"></text>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>性别</text></view>
				<view class="more-content">
					<text class="content">{{ info.sexText }}</text>
					<text class="iconfont icon-more more"></text>
				</view>
				<view class="picker">
					<picker @change="sexPickerChange" :value="sexIndex" :range="sexArray">
						<view class="uni-input" style="height: 100rpx;">{{ info.sexText }}</view>
					</picker>
				</view>
			</view>
			<view class="list">
				<view class="title"><text>出生日期</text></view>
				<view class="more-content">
					<text class="content">{{ info.birthday }}</text>
					<text class="iconfont icon-more more"></text>
				</view>
				<view class="picker">
					<picker @change="birthdayPickerChange" mode="date" :value="birthdayDate" :start="startDate" :end="endDate">
						<view class="uni-input" style="height: 100rpx;">{{ birthdayDate }}</view>
					</picker>
				</view>
			</view>
		</view>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	computed: mapState(['hasLogin','uerInfo']), 
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			// 性别
			sexArray: ['男', '女', '保密'],
			sexIndex: 0,
			// 生日
			birthdayDate: currentDate,
			startDate: this.getDate('start'),
			endDate: this.getDate('end'),
			DialogBox: {},
			// 昵称
			info:{
				sexText: '保密',
				birthday: '2020-02-02',
				nickname: '爱跳舞的汤姆猫'
			}
		};
	},
	onLoad() {
		this.info.nickname = this.uerInfo.nickName
		this.info.sexText = this.uerInfo.gender
		this.info.birthday = this.uerInfo.birthDate
	},
	methods: {
		/**
		 * 性别
		 * @param {Object} e
		 */
		sexPickerChange(e) {
			this.sexIndex = e.detail.value;
			this.info.sexText = this.sexArray[this.sexIndex];
			this.$store.commit('changeUerSex',this.info)
		},
		/**
		 * 生日
		 * @param {Object} e
		 */
		birthdayPickerChange(e) {
			this.info.birthday = e.detail.value;
			this.$store.commit('changeUerBrith',this.info)
		},
		/**
		 * 获取日期
		 * @param {Object} type
		 */
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		/**
		 * 昵称点击
		 */
		onNickname() {
			this.$refs['DialogBox']
				.confirm({
					title: '更改昵称',
					placeholder: '请输入修改的昵称',
					value: this.nickname,
					DialogType: 'input',
					animation: 0
				})
				.then(res => {
					this.info.nickname = res.value;
					this.$store.commit('changeUerNick',this.info)
				});
		}
	}
};
</script>

<style scoped lang="scss">
@import 'Information.scss';
</style>
