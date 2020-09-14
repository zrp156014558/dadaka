<template>
	<view>
		<web-view class="top" src="http://www.zgkayida.com/api/materials/guide"></web-view>
	</view>
</template>

<script>
	import {
			mapState,  
	    } from 'vuex';
	var wv
	export default {
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
			
		},
		onReady() {
			// #ifdef APP-PLUS
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			setTimeout(function() {
				wv = currentWebview.children()[0]
				wv.setStyle({
					top: 76,
				})
			}, 1000);
			// #endif
		},
	}
</script>

<style>

</style>
