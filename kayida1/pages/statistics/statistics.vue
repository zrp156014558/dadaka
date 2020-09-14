<template>
	<view class="con">
		<view class="statis-main top">
			<view class="statis-card">
				<view class="sta-title">当日增加直推人数</view>
				<view class="sta-de">+{{statis_list.newCard}}人</view>
			</view>
			<view class="statis-card">
				<view class="sta-title">当日进件数</view>
				<view class="sta-de">+{{statis_list.newLoan}}人</view>
			</view>
			<view class="statis-card">
				<view class="sta-title">新增会员数</view>
				<view class="sta-de">+{{statis_list.newVip}}人</view>
			</view>
		</view>
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
				statis_list:''
			}
		},
		methods: {
			
		},
		onLoad() {
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/team/statistics',data,'GET').then(res => {
				this.statis_list = res.data.retval
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.statis-main{
		padding: 10rpx 40rpx;
		.statis-card{
			background: #fff;
			height: 187rpx;
				margin-top: 20rpx;
			.sta-title{
				margin-left: 20rpx;
				border-left: 5rpx solid #00ABFA;
				font-size: 26rpx;
				color: #333;
				padding-left: 5rpx;
			}
			.sta-de{
				text-align: center;
				font-size: 48rpx;
				color: #333;
				height: 150rpx;
				line-height: 150rpx;
			}
		}
	}
}
</style>
