<template>
	<view>
		<web-view :src="sys_url"></web-view>
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
				sys_url:''
			}
		},
		methods: {
			
		},
		onLoad(option) {
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/message/index',data,'GET').then(res => {
				this.sys_url = res.data.retval[option.index].url
			})
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
