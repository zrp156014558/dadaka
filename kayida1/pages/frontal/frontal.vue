<template>
	<view class="con">
		<!-- <rich-text :nodes="content"></rich-text> -->
		<web-view :src="url"></web-view>
		<!-- <view class="share" v-if="share">
			<view class="share-text">选择要分享到的平台</view>
			<view class="share-btn flex">
				<view class="share-weixin">
					<image src="../../static/img/share_weixin.png" mode=""></image>
					<view>微信</view>
				</view>
				<view class="share-friends">
					<image src="../../static/img/share_friends.png" mode=""></image>
					<view>朋友圈</view>
				</view>
			</view>
			<view class="share-cancel" @tap="shareCancel">取消分享</view>
		</view> -->
	</view>
</template>

<script>
	import {
			mapState,
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	import BottomImageMenu from '@/components/zh-bottom-image-menu/zh-bottom-image-menu.js'
	var bottomImageMenu = null
	
	var wv
	export default {
		computed: {
					menus() {
						return [
							{
							  icon: '/static/img/share_weixin.png',
							  label: '微信',
							  onClick:() => {
								uni.share({
								    provider: "weixin",
								    scene: "WXSceneSession",
								    type: 0,
								    href: this.url,
									title: this.title,
									imageUrl: '/static/user/kyd.png',
									summary: this.descr,
								    success: function (res) {
								        uni.showToast({
								        	title:"分享成功",
								        	icon:"none"
								        });
										bottomImageMenu.close()
								    },
								    fail: function (err) {
								        uni.showToast({
								        	title:"分享失败",
								        	icon:"none"
								        });
								    }
								});
								bottomImageMenu.close()
								}
							},
							{
							  icon: '/static/img/share_friends.png',
							  label: '朋友圈',
							  onClick:() => {
								uni.share({
								    provider: "weixin",
								    scene: "WXSenceTimeline",
								    type: 0,
									href: this.url,
									title: this.title,
									imageUrl: '/static/user/kyd.png',
									summary: this.descr,
								    success: function (res) {
								        uni.showToast({
								        	title:"分享成功",
								        	icon:"none"
								        });
										bottomImageMenu.close()
								    },
								    fail: function (err) {
								        uni.showToast({
								        	title:"分享失败",
								        	icon:"none"
								        });
								    }
								});
								bottomImageMenu.close()
								}
							},
						]
					},
		            ...mapState(['userInfo'])
		        },
		data() {
			return {
				content:``,
				name:'',
				share:0,
				url:'',
				title:'',
				descr:''
			}
		},
		methods: {
			shareCancel() {
				// this.share = 0
			},
		},
		onNavigationBarButtonTap(e) {
			bottomImageMenu.show()
		},
		onLoad(option) {
			bottomImageMenu = new BottomImageMenu(this.menus)
			this.request.httpRequest('api/course/index','GET').then(res => {
				this.url = res.data.retval.list_data[option.index].url
				this.title = res.data.retval.list_data[option.index].title
				this.descr = res.data.retval.list_data[option.index].descr
			})
		},
		onUnload() {
			bottomImageMenu.close()
		}
	}
</script>

<style lang="less" scoped>
.con{
	.share{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 450rpx;
		text-align: center;
		background: #F2F2F2;
			color: #333;
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
			margin-top: 50rpx;
		}
	}
}
</style>
