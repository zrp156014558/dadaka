<template>
	<view class="con">
		<view class="promote top">
			<!-- <image class="promote-banner" src="../../static/user/promotebanner.png" mode=" aspectFit"></image> -->
			<image class="promote-banner" :src="pic" mode="widthFix"></image>
		</view>
		<view class="become" @tap="toBecome">成为推卡客</view>
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
				pic:''
			}
		},
		methods: {
			toBecome() {
				uni.navigateTo({
					url:"../realname/realname"
				})
			}
		},
		onLoad() {
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/bind/index',data,'GET').then(res => {
				this.pic = res.data.retval.agency
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	.promote{
		margin-bottom: 90rpx;
		.promote-banner{
			width: 750rpx;
			// height: 1200rpx;
		}
	}
	.become{
		height: 88rpx;
		line-height: 88rpx;
		background: #00ABFA;
		text-align: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		color: #fff;
		font-size: 30rpx;
	}
}
</style>
