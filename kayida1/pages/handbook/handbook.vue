<template>
	<view class="con">
		<view class="problem-main top">
			<view class="problem-card flex" v-for="(item,index) in notebook_list" :key="index" @tap="toPlatformHandbook(index)">
				<view class="flex">
					<!-- <view class="problem-card-bg" :style="{backgroundImage:`url(${indexBackgroundImage})`}">{{index+1}}</view> -->
					<view class="problem-card-bg">{{index+1}}</view>
					<view class="problem-card-title">{{item.title}}</view>
				</view>
				<view>{{item.addtime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
			mapState,
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	import indexBackgroundImage from "@/static/user/handbook.png"
	
	export default {
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				notebook_list:'',
				indexBackgroundImage:indexBackgroundImage,
			}
		},
		methods: {
			toPlatformHandbook(index) {
				uni.navigateTo({
					url:"../platformhandbook/platformhandbook?index="+index
				})
			}
		},
		onLoad() {
			this.request.httpRequest('api/notebook/index','GET').then(res =>{
				this.notebook_list = res.data.retval
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.problem-main{
		padding: 10rpx 40rpx;
		.problem-card{
			background: #fff;
			margin-top: 20rpx;
			height: 66rpx;
			line-height: 66rpx;
			padding: 0 20rpx;
			font-size: 26rpx;
			color: #333;
			justify-content: space-between;
			.problem-card-bg{
				background-size: 31rpx 34rpx;
				width: 32rpx;
				height: 34rpx;
				line-height: 34rpx;
				text-align: center;
				margin-top: 16rpx;
				color: #fff;
				font-size: 26rpx;
				background-image: url(../../static/user/handbook.png);
			}
			.problem-card-title{
				margin-left: 10rpx;
				font-weight: bold;
			}
		}
	}
}
</style>
