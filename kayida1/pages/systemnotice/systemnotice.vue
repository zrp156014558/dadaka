<template>
	<view class="con">
		<view class="top sys-main">
			<scroll-view scroll-y="true" :scroll-top="scrollTop" @scrolltolower="lower" lower-threshold="50" v-bind:style="[{height: Height}]">
				<view class="sys-card" v-for="(item,index) in sys_list" :key="index">
					<view class="sys-title flex">
						<image src="../../static/img/systemnotice.png" mode=""></image>
						<view class="title-font">
							<view class="sys-t">{{item.title}}</view>
							<view class="sys-time">{{item.addtime}}</view>
						</view>
					</view>
					<view :class="[sys === index ? 'sys-details-lg' : 'sys-details']" @tap="sysMess(index)">
						<view>
							<rich-text :nodes="item.message"></rich-text>
						</view>
					</view>
				</view>
			</scroll-view>
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
				sys_list:'',
				sys:-1,
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
			sysMess(index) {
				if(this.sys !== index){
					this.sys = index
				}else if(this.sys === index){
					this.sys = -1
				}
			},
			lower(e) {
				let data = {
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
							if(res.data.retval.length - this.sys_list.length < 1){
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
							this.sys_list = this.sys_list.concat(newData)
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
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/message/index',data,'GET').then(res => {
				if(res.data.code === 1000) {
					let sys = res.data.retval
					this.sys_list = sys.slice(0,20)
					if(this.sys_list.length < 1) {
						this.n = 1
					}
					else{
						this.n = 0
					}
				}else {
					uni.showToast({
						title:"加载失败",
						icon:"none"
					})
				}
			})
		}
	}
</script>

<style lang="less" scoped>
.sys-main{
	.sys-card{
		padding: 30rpx 60rpx;
		border-bottom: 1rpx solid #CECECE;
		.sys-title{
			
			image{
				width: 60rpx;
				height: 60rpx;
			}
			.title-font{
				margin-left: 20rpx;
				.sys-t{
					font-size: 26rpx;
					color: #333;
				}
				.sys-time{
					font-size: 20rpx;
					color: #808080;
				}
			}
		}
		.sys-details{
			margin-top: 10rpx;
			padding: 20rpx;
			padding-top: 10rpx;
			margin-left: 80rpx;
			font-size: 26rpx;
			color: #808080;
			width: 540rpx;
			height: 68rpx;
			line-height: 40rpx;
			background: #E6E6E6;
			border-radius: 10rpx;
			
			view{
				overflow: hidden;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
		}
		.sys-details-lg{
			margin-top: 10rpx;
			padding: 20rpx;
			padding-top: 10rpx;
			margin-left: 80rpx;
			font-size: 26rpx;
			color: #808080;
			width: 540rpx;
			min-height: 68rpx;
			line-height: 40rpx;
			background: #E6E6E6;
			border-radius: 10rpx;
		}
	}
}
</style>
