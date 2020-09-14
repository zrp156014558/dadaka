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
				index:''
			}
		},
		methods: {
			
		},
		onLoad(option) {
			this.index = option.index
			this.request.httpRequest('api/notebook/index','GET').then(res =>{
				this.url = res.data.retval[this.index].url
			})
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

<style lang="less" scoped>
.con{
	background: #F7F7F7;
}
</style>
