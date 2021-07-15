<template>
	<view>
					<uni-list-chat
								title="系统通知"
								avatar="../../static/tz-mess.png"
								note="你的订单已发货."
								time="2021.04.30 xxx"
								:badge-text="3"
								:clickable="true"
								@click="onClick()"
							/>
							
					<uni-list-chat
								title="鲜鲜水果"
								avatar="../../static/peasant.jpeg"
								note="带通知角标的单头像聊天列表.带通知角标的单头像聊天列表."
								time="2021.03.30 xxx"
								:badge-text="2"
								:clickable="true"
								@click="onClick()"
							/>
					
					<uni-list-chat
								title="老李土特产"
								avatar="../../static/1.jpeg"
								note="带通知角标的单头像聊天列表.带通知角标的单头像聊天列表."
								time="2021.02.27 xxx"
								:badge-text="1"
								:clickable="true"
								@click="onClick()"
							/>
	
					<uni-list-chat
								title="昌盛果蔬园"
								avatar="../../static/6.jpeg"
								note="带通知角标的单头像聊天列表.带通知角标的单头像聊天列表."
								time="2021.04.19 xxx"
								:badge-text="2"
								:clickable="true"
								@click="onClick()"
							/>
					
		</view>
</template>

<script>
	
	export default {
				data() {
					return {
						list:[]
					}
				},
				methods: {
						onClick() {
							// console.log(val)
							uni.navigateTo({
								url:"/pages/chat/chat"
							})
						}
					}

	}
</script>

<style>
	
</style>
