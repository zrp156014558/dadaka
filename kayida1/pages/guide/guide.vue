<template>
	<view>
		<web-view class="top" :src="guide.guide_url"></web-view>
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
				guide:''
			}
		},
		methods: {
			
		},
		onLoad(option) {
			let type = option.type
			let data = {
				id:option.id
			}
			if(option.type == 'card'){
				this.request.httpRequest('api/card/loadDetail',data,'GET').then(res => {
					this.guide = res.data.retval
				})
			}else if(option.type == 0){
				this.request.httpRequest('api/loan/loadDetail',data,'GET').then(res => {
					this.guide = res.data.retval
				})
			}else{
				this.request.httpRequest(`api/loan${type}/loadDetail`,data,'GET').then(res => {
					this.guide = res.data.retval
				})
			}
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
