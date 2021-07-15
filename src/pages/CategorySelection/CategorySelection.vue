<template>
	<view class="page">
		<view class="content">
		<view>
			<view class="select-form">
				<!-- <button @click="getCurrentItem">获取当前索引</button> -->
				<input type="text" v-model="category" class="selected" placeholder="选择你想要的产品类" />
				<navigator :url="'/pages/CustomMade/CustomMade?index='+category" type="default" class="submit"><button>确定</button></navigator>
			</view>
			<long-categories
				ref="long"
				:list="list"
				:maxSelected="max"
				@change="change"
			>
			</long-categories>
		</view>
	</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				list: [
				],
				count: 0,
				max: 1,
				category:''
			}
		},
		onLoad(){
			this.getList()
		},
		
		methods: {
			getList(){
				this.$Request({
					url:"/categoryselection",
					method:'GET'
				}).then((res)=>{
					if(res.code==1){
						this.list=res.data
						console.log(this.list)
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			
			change (data) {
				this.count = data.length
				console.log(data)
				if(data.length>0){
					this.category = data[0].name
				}else{
					this.category = ''
				}
			},
			getCurrentItem () {
				console.log(this.$refs.long.getActive())
			}
		}
	}
</script>

<style scoped lang="scss">
@import 'CategorySelection.scss';
</style>
