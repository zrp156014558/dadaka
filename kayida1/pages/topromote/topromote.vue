<template>
	<view class="con">
		<view class="promote-main top">
			<image :src="pic" mode="" @longpress="downPromote"></image>
		</view>
		<view class="flex promote-bottom">
			<view class="textarea">
				<!-- <rich-text type="text" :nodes="describe"></rich-text> -->
				<!-- <rich-text :nodes="c"></rich-text> -->
				{{describe}}
			</view>
			<view>
				<view class="promote-btn" @tap="copy">复制链接</view>
				<view class="promote-btn" @tap="shareDetail">我要推广</view>
			</view>
		</view>
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
			mapState,  
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	
	export default {
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				url:'',
				pic:'',
				share:0,
				popup:0,
				describe:'',
				type:'',
			}
		},
		methods: {
			downPromote() {
				this.popup = 1
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
			downPic() {
				uni.downloadFile({
					url: this.pic,
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
			canceldown() {
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
			copy() {
				uni.setClipboardData({
				    data: this.url,
				    success: function () {
						uni.showToast({
							title: '复制成功',
							duration:2000,
							icon:"none"
						})
				    },
					fail:function(res){
					}
				});
			},
			shareDetail() {
				this.share = 1
				uni.setClipboardData({
				    data: this.describe,
				    success: function () {
						uni.showToast({
							title: '复制成功',
							duration:2000,
							icon:"none"
						})
				    },
					fail(res) {
					}
				});
				//#ifdef APP-PLUS
				judgePlatform(this.pic_list)
				//#endif
			},
		},
		onLoad(option) {
			this.type = option.type
			this.id = option.id
			let data = {
				id: option.id,
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			if(this.type == 'apply'){
				this.request.httpRequest('api/card/poster',data,'GET').then(res => {
					this.pic = res.data.retval.poster
					this.url = res.data.retval.short_url
					this.describe = res.data.retval.describe
				})
			}else if(this.type == 'loan'){
				let loan = option.loan
				if(loan == 0){
					this.request.httpRequest('api/loan/poster',data,'GET').then(res => {
						this.pic = res.data.retval.poster
						this.url = res.data.retval.short_url
						this.describe = res.data.retval.describe
					})
				}else{
					this.request.httpRequest(`api/loan${loan}/poster`,data,'GET').then(res => {
						this.pic = res.data.retval.poster
						this.url = res.data.retval.short_url
						this.describe = res.data.retval.describe
					})
				}
			}else if(this.type == 'credit'){
				let data = {
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/credit/poster',data,'GET').then(res => {
					this.pic = res.data.retval.poster
					this.url = res.data.retval.short_url
					this.describe = res.data.retval.describe
				})
			}
		},
	}
	//#ifdef APP-PLUS
	function judgePlatform(pic){
	    switch ( plus.os.name ) {
	        case "Android":
	        // Android平台: plus.android.*
			function setShareMsg(goodsdata){
				// msg.content = msg.title = goodsdata.goods_name;
				// /* 分享图片 */
				// for(var i = 0 ; i < goodsdata.length ; i ++){
				// 	msg.pictures.push( goodsdata[i].thumb );
				// }
				// /* 分享链接 */
				// msg.href = mui.constMap.SERVER_HOST + "/mobile/goods.php?id=" + goodsdata.id ;
				// msg.thumbs.push("_www/72.png");
				// var userdata = getCachedUser();
				// if(userdata ){
				// 	msg.href += "&father=" + userdata.user.wx.wxid;
				// }
				// msg.brief = goodsdata.goods_brief;
				// getShortUrl(msg.href, function(result){
				// 	if(! result.error_code){
				// 		msg.url_short = result[0].url_short;
				// 	}
				// }); 
			}
			setShareMsg(pic)
	        break;
	        case "iOS":
	        // iOS平台: plus.ios.*
	        break;
	        default:
	        // 其它平台
	        break;
	    }
	}
	//#endif
</script>

<style lang="less" scoped>
.con{
	background: #F8F8F8;
	.promote-main{
		text-align: center;
		margin-bottom: 140rpx;
		.promote-text{
			color: #333;
			font-size: 26rpx;
			padding: 0 40rpx;
			text-align: left;
		}
		image{
			width: 650rpx;
			height: 1200rpx;
		}
	}
	.promote-bottom{
		position: fixed;
		bottom: 0;
		padding-bottom: 20rpx;
		width: 100%;
		background: #fff;
		.textarea{
			margin-left: 30rpx;
			width: 440rpx;
			border: 1rpx solid #333;
			border-radius: 20rpx;
			height: 120rpx;
			font-size: 24rpx;
			color: #333;
			padding-left: 10rpx;
		}
		.promote-btn{
			width: 200rpx;
			height: 50rpx;
			line-height: 48rpx;
			background: #00ABFA;
			color: #fff;
			text-align: center;
			font-size: 18rpx;
			border-radius: 20rpx;
			margin-top: 10rpx;
			margin-left: 20rpx;
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
}
</style>
