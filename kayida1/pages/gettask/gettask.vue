<template>
	<view class="con">
		<view class="gettask-main top">
			<view class="gettask-title">
				<view class="title-text">标题</view>
				<view class="title-main">{{text}}</view>
				<view class="title-copy" @tap="copyText">复制</view>
			</view>
			<view class="gettask-img">
				<image :src="pic" mode=""></image>
			</view>
		</view>
		<view class="gettask-btn" @tap="getTask">领取任务</view>
		<view class="share-mask" v-if="share"></view>
		<view class="share" v-if="share">
			<view class="share-text">选择要分享到的平台</view>
			<view class="share-btn flex">
				<view class="share-weixin" @tap="shareWeixin">
					<image src="../../static/img/share_weixin.png" mode=""></image>
					<view>微信</view>
				</view>
				<view class="share-friends" @tap="shareFriends">
					<image src="../../static/img/share_friends.png" mode=""></image>
					<view>朋友圈</view>
				</view>
			</view>
			<view class="share-cancel" @tap="shareCancel">取消分享</view>
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
				id:'',
				name:'',
				text:'',
				pic:'',
				share:0
			}
		},
		methods: {
			getTask() {
				let data = {
					id: this.id,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/task/todo',data,'GET').then(res => {
					if(res.data.code === 1000){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						this.share = 1
						uni.setClipboardData({
						    data: this.text,
						});
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				})
			},
			copyText() {
				uni.setClipboardData({
				    data: this.text,
				    success: function () {
						uni.showToast({
							title: '复制成功',
							duration:2000,
							icon:"none"
						})
				    }
				});
			},
			shareCancel() {
				this.share = 0
			},
			shareWeixin() {
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 2,
				    imageUrl: this.pic,
				    success: function (res) {
				        uni.showToast({
				        	title:"分享成功",
				        	icon:"none"
				        });
				    },
				    fail: function (err) {
				        uni.showToast({
				        	title:"分享失败",
				        	icon:"none"
				        });
				    }
				});
				this.share = 0
			},
			shareFriends() {
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 2,
				    imageUrl: this.pic,
				    success: function (res) {
				        uni.showToast({
				        	title:"分享成功",
				        	icon:"none"
				        });
				    },
				    fail: function (err) {
				        uni.showToast({
				        	title:"分享失败",
				        	icon:"none"
				        });
				    }
				});
				this.share = 0
			},
		},
		onHide() {
			this.share = 0
		},
		onLoad(option) {
			this.id = option.id
			this.name = option.name
			let data = {
				id: this.id,
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/task/preview',data,'GET').then(res => {
				this.text = res.data.retval.copy_text
				this.pic = res.data.retval.image_group[0]
			})
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.name
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.gettask-main{
		.gettask-title{
			background: #fff;
			padding: 10rpx 40rpx;
			font-size: 26rpx;
			color: #666666;
			position: relative;
			.title-text{
				font-weight: bold;
			}
			.title-main{
				margin-top: 30rpx;
				width: 450rpx;
			}
			.title-copy{
				position: absolute;
				bottom: 20rpx;
				right: 40rpx;
				color: #00ABFA;
			}
		}
		.gettask-img{
			margin-top: 20rpx;
			text-align: center;
			margin-bottom: 100rpx;
			image{
				width: 630rpx;
				height: 1130rpx;
			}
		}
	}
	.gettask-btn{
		width: 100%;
		text-align: center;
		height: 88rpx;
		color: #fff;
		font-size: 26rpx;
		line-height: 88rpx;
		position: fixed;
		bottom: 0;
		background: #00ABFA;
	}
	.share-mask{
		position: fixed;
		top: 0;
		background: #8F8F94;
		opacity: 0.4;
		height: 100%;
		width: 750rpx;
		z-index: 998;
	}
	.share{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 450rpx;
		text-align: center;
		background: #F2F2F2;
			color: #333;
			z-index: 999;
		.share-text{
			font-size: 30rpx;
			margin-top: 70rpx;
		}
		.share-btn{
			justify-content: space-around;
			margin-top: 60rpx;
			font-size: 26rpx;
			image{
				width: 100rpx;
				height: 100rpx;
			}
		}
		.share-cancel{
			width: 100%;
			height: 88rpx;
			font-size: 26rpx;
			color: #666;
			background: #fff;
			line-height: 88rpx;
			margin-top: 60rpx;
		}
	}
}
</style>
