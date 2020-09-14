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
				name:''
			}
		},
		methods: {
			
		},
		onLoad(option) {
			this.url = JSON.parse(decodeURIComponent(option.link))
			this.name = option.name
			uni.setNavigationBarTitle({
				title: this.name
			});
			// #ifdef APP-PLUS
			// #endif
		},
	}
</script>

<style lang="less" scoped>

</style>
