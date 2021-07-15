<template>
	<view class="page">
		<view class="first-item">
			<view class="list">
				<view class="title">
					<text>定制产品</text>
				</view>
				<view class="more-content" @click="categorySelect()">
					<input class="content" placeholder="品类选择" disabled="true" v-model="queryForm.categoryType"></input>
					<text class="iconfont icon-more more"></text>
				</view>
			</view>
			
			<view class="list">
				<view class="title">
					<text>订购数量</text>
				</view>
				<view class="more-content">
					<input class="content" placeholder="选择数量" v-model="queryForm.orderNumber" @blur="checkCount()"></input>
					<text class="price">斤</text>
				</view>
			</view>
			
			<view class="list">
				<view class="title">
					<text>生产地区</text>
				</view>
				<view class="more-content">
					<pickerAddress @change="changeOriginPoint" class="address-content">{{queryForm.originPoint}}</pickerAddress>
					<text class="iconfont icon-more more"></text>
				</view>
			</view>
			
			<view class="list">
				<view class="title">
					<text>定制频次</text>
				</view>
				<view class="more-content">
					<picker @change="bindPickerChange" :value="queryForm.frequencyType" :range="array" class="address-content">{{array[queryForm.frequencyType]}}</picker>
					<text class="iconfont icon-more more"></text>
				</view>
			</view>
		</view>
		<view class="first-item">
			<view class="list">
				<view class="title">
					<text>期望单价</text>
				</view>
				<view class="more-content">
					<input class="content" placeholder="请输入单价" v-model="queryForm.reqPrice"></input>
					<text class="price">元/公斤</text>
				</view>
			</view>
			</view>
			
			<view class="first-item">
				<view class="list">
					<view class="title">
						<text>送货地区</text>
					</view>
					<view class="more-content">
						<pickerAddress @change="changeDestination" class="address-content">{{queryForm.destination}}</pickerAddress>
						<text class="iconfont icon-more more"></text>
					</view>
				</view>
				<view class="req-list">
					<view class="title">
						<view class="title-req">
							<text>定制要求</text>
						</view>
					</view>
					<view class="more-content">
						<textarea class="req-content" placeholder="请填写规格/包装和运输等要求" v-model="queryForm.customReq"></textarea>
					</view>
				</view>
				</view>
				
				<view class="first-item">
					<view class="list">
						<view class="title">
							<text>指定商家</text>
						</view>
						<view class="more-content">
							<text class="content"></text>
							<view class="more">
							                <switch />
							            </view>
						</view>
					</view>
					</view>
					<view class="btn-info">
						<view class="btn" :style="issue ? 'opacity:1' : 'opacity:0.4'" @click="issue ? onSub() : ''"><text>确认发布</text></view>
					</view>
	</view>
</template>

<script>
	import pickerAddress from '../../components/wangding-pickerAddress/wangding-pickerAddress.vue'
	
	export default {
		components:{
			pickerAddress
		},
		data(){
			return {
				issue:false,
				queryForm:{
					uId:'',
					categoryType:'',//选择品类
					orderNumber:'',//定购数量
					originPoint:'全国不限',//生产地区
					frequencyType:0,//频次
					reqPrice:'',//期望单价
					destination:'四川省成都市龙泉驿区',//收货地区
					customReq:''//定制要求
				}
				,
				array: ['一次性定制', '每周', '每月'],	
			}
		},
		onLoad(options) {
		            this.queryForm.categoryType=options.index
								this.getUid();
		        },
		methods:{
			
			changeOriginPoint(data) {
				this.queryForm.originPoint = data.data.join('')
			},
			
			changeDestination(data){
				this.queryForm.destination = data.data.join('')
			},
			
			bindPickerChange(e) {
			            this.queryForm.frequencyType = e.target.value
			        },
			
			categorySelect(){
				uni.navigateTo({
					url:'/pages/CategorySelection/CategorySelection'
				})
			},
			
			checkCount(){
				if(this.queryForm.orderNumber<500) {
					uni.showToast({
						title:'定制数量不允许小于500斤',
						icon:'none'
					})
				}
			},
			
			/* 点击发布 */
			onSub(){
				if(this.queryForm.orderNumber<500) {
					uni.showToast({
						title:'定制数量不允许小于500斤',
						icon:'none'
					})
				}else {
					this.$Request({
					url: '/custom/requirement_sub',
					method: 'POST',
					data: this.queryForm
				})
					.then(res => {
						if (res.code == 1) {
							uni.navigateTo({
								url:'../CustomMadeRes/CustomMadeRes'
							})
						}
					})
					.catch(error => {
						console.log(error);
					});
				}
			},
			/* 获取用户ID */
			getUid(){
				uni.getStorage({
					//获得保存在本地的用户信息
					key: 'uerInfo',
					success: res => {
						this.queryForm.uId=res.data.uId;
						console.log(this.queryForm.uId)
					}
				});
			}
		},
		watch: {
			queryForm: {
				handler(newValue, oldValue) {
					if (newValue.categoryType && newValue.orderNumber && newValue.reqPrice && newValue.customReq) {
						this.issue = true;
					} else {
						this.issue = false;
					}
				},
				deep: true
			}
		}
	}
</script>

<style scoped lang="scss">
@import 'CostomMade.scss';
</style>
