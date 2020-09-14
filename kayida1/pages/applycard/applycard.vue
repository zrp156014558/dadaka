<template>
	<view>
		<!-- <uni-nav-bar back="true" text="申请"></uni-nav-bar> -->
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav/uni-nav.vue"
	var wv
	export default {
		components: {uniNavBar},
		data() {
			return {
				url:''
			}
		},
		methods: {
			
		},
		onLoad(option) {
			// this.url = option.url
			this.url = JSON.parse(decodeURIComponent(option.url))
		},
		onReady() {
			// #ifdef APP-PLUS
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			setTimeout(function() {
				wv = currentWebview.children()[0]
				wv.setStyle({
				})
			}, 1000);
			// #endif
		},
	}
</script>

<style>

</style>
