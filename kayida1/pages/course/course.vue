<template>
	<view class="con">
		<view class="top">
			<image class="limit-banner" :src="banner" mode=""></image>
			<view class="limit-main">
				<view class="flex">
					<image class="strategy" src="../../static/img/strategy.png" mode=""></image>
					<view class="stra-text">提额攻略</view>
				</view>
				<view>
					<view class="flex limit-card">
						<image :src="item.thumb" mode="" v-for="(item,index) in creditlimit" :key="index" @tap="toFrontal(index)"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				banner:'',
				creditlimit:''
			}
		},
		methods: {
			toFrontal(index) {
				uni.navigateTo({
					url:"../frontal/frontal?index="+index
				})
			}
		},
		onLoad() {
			this.request.httpRequest('api/course/index','GET').then(res => {
				this.banner = res.data.retval.banner
				this.creditlimit = res.data.retval.list_data
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F8F8F8;
	.limit-banner{
		width: 100%;
		height: 340rpx;
	}
	.limit-main{
		font-size: 30rpx;
		padding: 10rpx 40rpx;
		.strategy{
			width: 40rpx;
			height: 36rpx;
			vertical-align: top;
			margin-top: 6rpx;
		}
		.stra-text{
			margin-left: 20rpx;
			font-weight: bold;
		}
		.limit-card{
			margin-top: 20rpx;
			flex-wrap: wrap;
			justify-content: space-between;
			image{
				width: 320rpx;
				height: 88rpx;
				margin-top: 20rpx;
			}
		}
	}
}
</style>
