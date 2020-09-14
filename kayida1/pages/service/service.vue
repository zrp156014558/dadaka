<template>
	<view class="con">
		<view class="top contact-title">
			<view>联系方式</view>
			<view class="contact-details">您可拨打电话联系客服，或扫描二维码添加客服微信，即可在线沟通客服</view>
		</view>
		<view class="contact-way">
			<view class="job-time">
				工作时间：周一至周六9:00~18:00
			</view>
			<view class="contact-btn">
				<view class="flex chat-btn">
					<view class="weixin-btn flex">
						<image class="wechat-img" src="../../static/user/weixin.png" mode=""></image>
						<view>在线聊天</view>
					</view>
					<view class="phone-btn flex">
						<image class="phone-img" src="../../static/user/phone.png" mode=""></image>
						<view @tap="servicePhone(service.tel)">一键拨号</view>
					</view>
				</view>
			</view>
		</view>
		<view class="contact-bottom">
			<view class="wechat-group">———官方微信群———</view>
			<view class="wechat-details">加入官方微信群，您可随时收到我们的最新活动消息，有机会获取超值优惠</view>
			<image :src="service.logo" mode="" @longpress="openPopup()"></image>
		</view>
		<!-- <uni-popup ref="popup" type="bottom"> -->
		<view class="popup" v-show="popup">
			<view class="popup-bg"></view>
			<view :class="'animation' + ' ' + [popup===1 ? 'animation-name' : 'animation-cname']">
				<view class="downpic" @tap="downPic">保存图片到相册</view>
				<view class="cancel" @tap="canceldown">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	
	export default {
		components: {uniPopup},
		data() {
			return {
				service:'',
				popup: 0,
			}
		},
		methods: {
			servicePhone(phone){
				uni.makePhoneCall({
				    phoneNumber: phone,
				});
			},
			downPic() {
				uni.downloadFile({
					url: this.service.logo,
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
			openPopup() {
				this.popup = 1
			},
			canceldown() {
				this.popup = 0
			}
		},
		onLoad() {
			this.request.httpRequest('api/service/index','GET').then(res =>{
				this.service = res.data.retval
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.contact-title{
		padding: 30rpx 40rpx;
		font-size: 26rpx;
		color: #333;
		.contact-details{
			font-size: 18rpx;
			margin-top: 20rpx;
		}
	}
	.contact-way{
		background: #fff;
		padding: 30rpx 0;
		text-align: center;
		.job-time{
			font-size: 26rpx;
			color: #333;
		}
		.contact-btn{
			margin-top: 30rpx;
			.chat-btn{
				justify-content: center;
				color: #00ABFA;
				font-size: 26rpx;
				view{
					line-height: 58rpx;
					justify-content: center;
					margin-left: 20rpx;
					image{
						margin-top: 10rpx;
					}
				}
				.weixin-btn{
					width: 196rpx;
					height: 58rpx;
					border: 2rpx solid #00ABFA;
					border-radius: 20rpx;
				}
				.phone-btn{
					margin-left: 40rpx;
					width: 196rpx;
					height: 58rpx;
					border: 2rpx solid #00ABFA;
					border-radius: 20rpx;
				}
				.wechat-img{
					width: 45rpx;
					height: 37rpx;
				}
				.phone-img{
					width: 32rpx;
					height: 40rpx;
				}
			}
		}
	}
	.contact-bottom{
		margin-top: 40rpx;
		text-align: center;
		padding: 0 204rpx;
		.wechat-group{
			font-size: 26rpx;
			color: #333;
		}
		.wechat-details{
			font-size: 18rpx;
			color: #808080;
			margin-top: 30rpx;
		}
		image{
			width: 260rpx;
			height: 300rpx;
			margin-top: 20rpx;
		}
	}
	.popup{
		height: 100%;
		width: 100%;
		// background: #6C6C6C;
		z-index: 999;
		position: absolute;
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
}
</style>
