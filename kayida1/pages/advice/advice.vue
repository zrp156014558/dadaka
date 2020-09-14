<template>
	<view class="con">
		<view class="advice top">
			<view class="advice-title">您有任何意见或建议，我们都乐意接受哦~</view>
			<view class="description-text">问题描述</view>
			<textarea v-model="description" class="problem-description" value="" placeholder="请将您的想法告诉我们" />
			<view class="advice-contact-way description-text">联系方式</view>
			<input v-model="advice_phone" class="advice-ipt" type="text" placeholder="请留下您的邮箱/手机号" />
			<view class="advice-btn" @tap="adviceSubmit">提交</view>
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
				description: '',
				advice_phone: ''
			}
		},
		methods: {
			adviceSubmit() {
				let data = {
					content: this.description,
					contact: this.advice_phone,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/advice/confirm',data,'GET').then(res =>{
					if(res.data.code === 1000){
						uni.showToast({
							title:res.data.msg,
							icon: "none"
						})
						setTimeout(function() {
							uni.navigateBack({
								
							})
						},1000)
					}else{
						uni.showToast({
							title:res.data.msg,
							icon: "none"
						})
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.advice{
		padding: 20rpx 40rpx;
		font-size: 26rpx;
		color: #333;
		.advice-title{
			font-size: 18rpx;
			color: #00ABFA;
		}
		.description-text{
			margin-top: 40rpx;
		}
		.problem-description{
			margin-top: 20rpx;
			width: 630rpx;
			height: 160rpx;
			padding: 20rpx;
			background: #fff;
			font-size: 18rpx;
			color: #808080;
		}
		.advice-ipt{
			padding: 10rpx;
			color: #808080;
			font-size: 18rpx;
			background: #fff;
			height: 40rpx;
			border-radius: 10rpx;
			margin-top: 20rpx;
		}
		.advice-btn{
			width: 670rpx;
			height: 56rpx;
			color: #fff;
			background: #00ABFA;
			text-align: center;
			border-radius: 10rpx;
			line-height: 56rpx;
			margin-top: 40rpx;
		}
	}
}
</style>
