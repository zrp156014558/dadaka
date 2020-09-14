<template>
	<view>
		<web-view src="http://www.zgkayida.com/index/set/userprotocol"></web-view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav/uni-nav.vue"
	var wv
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onReady() {
			// #ifdef APP-PLUS
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			setTimeout(function() {
				wv = currentWebview.children()[0]
				wv.setStyle({
					top: 76
				})
			}, 1000);
			// #endif
		},
	}
</script>

<style>

</style>
