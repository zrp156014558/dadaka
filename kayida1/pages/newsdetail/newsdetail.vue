<template>
	<view class="con">
		<web-view :src="url"></web-view>
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
									imageUrl: this.thumb,
									summary: this.descr,
								    success: function (res) {
								        uni.showToast({
								        	title:"分享成功",
								        	icon:"none"
								        });
										bottomImageMenu.close()
								    },
								    fail: function (err) {
										console.log("fail:" + JSON.stringify(err));
								        uni.showToast({
								        	title:"分享失败",
								        	icon:"none"
								        });
								    }
								});
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
									imageUrl: this.thumb,
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
								}
							},
						]
					},
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				url:'',
				index:'',
				title:'',
				descr:'',
				thumb:''
			}
		},
		methods: {
			
		},
		onNavigationBarButtonTap(e) {
			bottomImageMenu.show()
		},
		onLoad(option) {
			bottomImageMenu = new BottomImageMenu(this.menus)
			this.index = option.index
			let data = {
				nav_id:option.infor,
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/news/index',data,'GET').then(res =>{
				this.url = res.data.retval[this.index].url
				this.title = res.data.retval[this.index].title
				this.descr = res.data.retval[this.index].descr
				this.thumb = res.data.retval[this.index].thumb
			})
		},
		onReady() {
			// #ifdef APP-PLUS
			// var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			// setTimeout(function() {
			// 	wv = currentWebview.children()[0]
			// 	// wv.getSettings().setJavaScriptEnabled(true);
			// 	wv.webSettings.setUseWideViewPort(true);
			// 	wv.setStyle({
			// 	})
			// }, 1000);
			// #endif
		},
		onUnload() {
			bottomImageMenu.close()
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
}
</style>
