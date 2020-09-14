<template>
	<view class="con">
		<view class="problem-main top">
			<view class="problem-card flex" v-for="(item,index) in problem_list" :key="index" @tap="toProDetail(index)">
				<view class="flex">
					<image class="ask" src="../../static/user/ask.png" mode=""></image>
					<view class="problem-card-text">{{item.title}}</view>
				</view>
				<image class="question" src="../../static/img/right.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
			mapState,
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	
	export default {
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				problem_list:''
			}
		},
		methods: {
			toProDetail(index) {
				uni.navigateTo({
					url:"../problemdetail/problemdetail?index="+index
				})
			}
		},
		onLoad() {
			this.request.httpRequest('api/problem/index','GET').then(res =>{
				this.problem_list = res.data.retval
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
			// background: #fff;
			// margin-top: 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			// padding: 0 20rpx;
			font-size: 26rpx;
			color: #333;
			justify-content: space-between;
			// border-radius: 120rpx;
			// box-shadow: -8rpx 0 5rpx #B1B2B2;
			border-bottom: 1rpx solid #e5e5e5;
			.problem-card-text{
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.ask{
				width: 36rpx;
				height: 40rpx;
				margin-top: 20rpx;
				// margin-left: 10rpx;
			}
			view{
				margin-left: 20rpx;
			}
			.question{
				width: 10rpx;
				height: 16rpx;
				margin-right: 15rpx;
				margin-top: 30rpx;
			}
		}
	}
}
</style>
