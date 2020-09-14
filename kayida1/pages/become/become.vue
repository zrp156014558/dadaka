<template>
	<view class="con">
		<view class="promote top">
			<!-- <image src="../../static/main/become.png" mode="scaleToFill"></image> -->
			<image :src="pic" mode="widthFix"></image>
		</view>
		<view class="become" @click="shareBecome">邀请成为推卡客</view>
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
		<view class="share-mask" v-if="share"></view>
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
				share:0,
				pic:''
			}
		},
		methods: {
			shareBecome() {
				this.share = 1
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
		onLoad() {
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/bind/index',data,'GET').then(res => {
				this.pic = res.data.retval.poster
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	.promote{
		width: 100%;
		height: 100%;
		image{
			width: 100%;
			// height: 1334rpx;
			margin-bottom: 78rpx;
		}
	}
	.become{
		height: 88rpx;
		line-height: 88rpx;
		background: #00ABFA;
		text-align: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		color: #fff;
		font-size: 30rpx;
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
