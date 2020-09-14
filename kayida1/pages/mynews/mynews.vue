<template>
	<view class="con">
		<view class="top news-main">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltolower="lower" lower-threshold="50" v-bind:style="[{height: Height}]">
				<view class="news-card" v-for="(item,index) in message" :key="index">
					<view class="flex news-card-title">
						<image src="../../static/user/mynews.png" mode=""></image>
						<view>{{item.title}}</view>
					</view>
					<view class="news-card-main">{{item.message}}</view>
					<view class="news-time">{{item.addtime}}</view>
				</view>
			</scroll-view>
			<view class="none" v-if="none">暂无数据</view>
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
				message:'',
				none:0,
				Height:0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				i1:0,
				i2:20,
				n:0
			}
		},
		methods: {
			lower(e) {
				let data = {
					type:1,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/message/index',data,'GET').then(res => {
					if(!this.n) {
						uni.showLoading({
							title: '加载中...',
							mask: true
						})
							let i1 = this.i1
							let i2 = this.i2
							let i3 = this.i1++
							i3 = i3 ++
							let i4
							if(i3 != 0) {
								i3 = i3 + 1
								i4 = i2 * i3
							}else {
								i4 = 20
							}
							let list = res.data.retval
							if(res.data.retval.length - this.message.length < 1){
								this.n = 1
							}else{
								this.n = 0
							}
							const newData = list.slice(i4,i2 + i4)
							if(!this.n) {
								uni.showToast({
									icon: 'success',
									title: '加载成功'
								})
							}else {
								uni.showToast({
									icon: 'none',
									title: '没有消息了'
								})
							}
							this.message = this.message.concat(newData)
							uni.hideLoading()
					}
				})
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success:(res) => {
					this.Height = res.screenHeight - 44 +'px'
				}
			})
			let data = {
				type:1,
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/message/index',data,'GET').then(res => {
				// this.message = res.data.retval
				let message_list = res.data.retval
				this.message = message_list.slice(0,20)
				if(this.message.length < 1) {
					this.none = 1
					this.n = 1
				}
				else{
					this.none = 0
					this.n = 0
				}
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.news-main{
		padding: 10rpx 40rpx;
		.none{
			font-size: 30rpx;
			color: ccc;
			line-height: 800rpx;
			height: 800rpx;
			text-align: center;
		}
		.news-card{
			background: #fff;
			// height: 160rpx;
			font-size: 26rpx;
			margin-top: 40rpx;
			padding-top: 20rpx;
			.news-card-title{
				margin-left: 20rpx;
				color: #333;
				image{
					width: 35rpx;
					height: 35rpx;
				}
				view{
					margin-left: 10rpx;
				}
			}
			.news-card-main{
				margin-top: 20rpx;
				color: #666;
				margin-left: 60rpx;
			}
			.news-time{
				color: #999;
				font-size: 24rpx;
				margin-top: 20rpx;
				margin-left: 60rpx;
				margin-bottom: 20rpx;
			}
		}
	}
}
</style>
