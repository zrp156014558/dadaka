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
	var wv
	export default {
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				url:'',
				index:'',
				title:''
			}
		},
		methods: {
			
		},
		onLoad(option) {
			this.index = option.index
			this.request.httpRequest('api/problem/index','GET').then(res =>{
				this.url = res.data.retval[this.index].url
				this.title = res.data.retval[this.index].title
			})
			// #ifdef APP-PLUS
			wv = plus.webview.create("","custom-webview",{
				plusrequire:"none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
				top:uni.getSystemInfoSync().statusBarHeight+44 //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
			})
			wv.loadURL(this.url)
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			currentWebview.append(wv);//一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			// setTimeout(function() {
				console.log(wv.getStyle())
			// }, 1000);//如果是首页的onload调用时需要延时一下，二级页面无需延时，可直接获取
			uni.setNavigationBarTitle({
			    title: this.title
			});
			// #endif
		},
		// onReady() {
		// 	// #ifdef APP-PLUS
		// 	var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
		// 	setTimeout(function() {
		// 		wv = currentWebview.children()[0]
		// 		wv.setStyle({
		// 			top: 76,
		// 		})
		// 	}, 1000);
		// 	// #endif
		// },
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
}
</style>
