<template>
	<view class="con">
		<view class="credit-main top">
			<view v-for="(item,index) in banner" :key="index">
				<image :src="item.thumb" mode="" @tap="inquire(item.id)"></image>
			</view>
		</view>
		<view class="credit-page">
			<rich-text class="page-content" :nodes="content"></rich-text>
		</view>
		<view class="credit-btn" @click="toTopromote">我要推广</view>
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
				banner:'',
				content:``,
				url:'',
				pic:''
			}
		},
		methods: {
			inquire(id) {
				let type = 'credit'
				uni.navigateTo({
					url:"../onapplication/onapplication?id="+id+"&type="+type
				})
			},
			toTopromote() {
				let type = 'credit'
				uni.navigateTo({
					url:"../topromote/topromote?type="+type
				})
			}
		},
		onLoad() {
			this.request.httpRequest('api/credit/index','GET').then(res => {
				this.banner = res.data.retval.list_data
				this.content = res.data.retval.page.content
			})
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/credit/poster',data,'GET').then(res => {
				this.url = res.data.short_url
				this.pic = res.data.poster
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.credit-main{
		padding: 0 40rpx;
		image{
			width: 670rpx;
			height: 156rpx;
			margin-top: 10rpx;
		}
	}
		.credit-btn{
			color: #fff;
			background: #00ABFA;
			width: 100%;
			position: fixed;
			bottom: 0;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			font-size: 26rpx;
		}
		.credit-page{
			margin-top: 10rpx;
			background: #fff;
			height: 365rpx;
			.page-content{
				text-align: center;
				font-size: 26rpx;
				overflow: auto;
			}
		}
}
</style>
