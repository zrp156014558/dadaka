<template>
	<view class="con">
		<view class="pro-main top">
			<view class="pro-img">
				<!-- <image :src="pro_list.poster" mode="" @longpress="downPromo"></image> -->
				<easy-loadimage
				:scroll-top="scrollTop"
				:image-src="pro_list.poster" 
				:open-transition="true" @longpress="downPromo"></easy-loadimage>
			</view>
		</view>
		<view class="pro-share" @tap="shareDetail">分享</view>
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
		<view class="share-mask" v-if="share" @touchmove.stop.prevent="moveHandle"></view>
		<view class="popup" v-show="popup" @touchmove.stop.prevent="moveHandle">
			<view class="popup-bg"></view>
			<view :class="'animation' + ' ' + [popup===1 ? 'animation-name' : 'animation-cname']">
				<view class="downpic" @tap="downPic">保存图片到相册</view>
				<view class="cancel" @tap="canceldown">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
			mapState
		} from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	const MockData = require('@/static/easy-loadimage/mock-data.json')
	
	export default {
		components: {easyLoadimage},
		computed: {
		            ...mapState(['userInfo','is_bind'])  
		        },
		data() {
			return {
				canvasId: 'default_PosterCanvasId',
				id:'',
				pro_list:'',
				share:0,
				pic:'',
				popup:0,
				scrollTop:0,
				list:MockData
			};
		},
		onPageScroll({scrollTop}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
		},
		onLoad(option) {
			this.id = option.id
			let data = {
				id:this.id,
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/poster/poster',data,'GET').then(res =>{
				if(res.data.code === 1000){
					this.pro_list = res.data.retval
					this.pic = res.data.retval.poster
				}
			});
		},
		methods: {
			moveHandle() {
				return
			},
			downPromo() {
				this.popup = 1
			},
			canceldown() {
				this.popup = 0
			},
			downPic() {
				uni.downloadFile({
					url: this.pro_list.poster,
					success: (res) =>{
						if (res.statusCode === 200){
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
						}
					}
				})
				this.popup = 0
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
			shareCancel() {
				this.share = 0
			},
			shareDetail() {
					this.share = 1
			},
		}
	}
</script>

<style lang="less" scoped>
.pro-share{
	background: #0D5A8E;
	position: fixed;
	bottom: 0;
	width: 100%;
	color: #fff;
	font-size: 30rpx;
	text-align: center;
	height: 88rpx;
	line-height: 88rpx;
}
.pro-main{
	padding: 20rpx;
	.pro-img{
		margin-bottom: 80rpx;
		image{
			width: 100%;
			height: 1400rpx;
			margin-bottom: 88rpx;
		}
	}
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
	.popup{
		height: 100%;
		width: 100%;
		z-index: 999;
		position: fixed;
		top: 0;
		color: #00ABFA;
		font-size: 26rpx;
		.popup-bg{
			opacity: 0.6;
			background: #6C6C6C;
			z-index: 999;
			height: 100%;
		}
		.animation{
			position: relative;
			// animation: pop 3s linear ;
			animation-duration: .2s;
			animation-timing-function: linear;
			animation-iteration-count: 1;
		}
		.animation-name{
			animation-name: pop;
		}
		.animation-cname{
			animation-name: cpop;
		}
		@keyframes pop {
			from {bottom:-180rpx;}
			to {bottom:0rpx}
		}
		@keyframes cpop {
			from {bottom:0rpx;}
			to {bottom:-180rpx}
		}
		.downpic{
			height: 80rpx;
			line-height: 80rpx;
			position: absolute;
			bottom: 100rpx;
			background: #fff;
			text-align: center;
			left: 50rpx;
			border-radius: 120rpx;
			width: 650rpx;
		}
		.cancel{
			height: 80rpx;
			line-height: 80rpx;
			width: 650rpx;
			position: absolute;
			position: absolute;
			bottom: 0;
			background: #fff;
			text-align: center;
			left: 50rpx;
			border-radius: 120rpx;
		}
	}
</style>
