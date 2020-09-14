<template name="UniNavBar">
	<view class="tab">
		<view v-if="back" class="back-icon">
			<image src="../../static/img/back.png" mode="" class="back-img" @click="goBack()"></image>
		</view>
		<view class="title">{{text}}</view>
	</view>
</template>

<script>
	import uniIcons from "../uni-icons/uni-icons.vue";
	export default {
		name:"UniNavBar",
		components: {uniIcons},
		props:{
			/**
			 * 文字内容
			 */
			text: String,
			back:{
				type: [Boolean, String],
				default: false
			},
			color: {
				type: String,
				default: "#ffffff"
			},
		},
		methods:{
			goBack() {
				uni.navigateBack({
					
				})
			}
		},
	}
</script>

<style scoped>
.tab{
	height: 140rpx;
	background: #00ABFA;
	display: flex;
	width: 100%;
	position: fixed;
	z-index: 996;
}
.back-icon{
	margin-top: 60rpx;
	margin-left: 20rpx;
}
.back-img{
	width: 50rpx;
	height: 50rpx;
}
.title{
	position: absolute;
	top: 60rpx;
	left: 50%;
	transform: translate(-50%);
	color: #fff;
}
</style>
