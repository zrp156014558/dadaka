<template>
	<view class="con">
		<view class="main top">
			<view class="user">
				<view class="head-pic">
					<image :src="confirm.head_pic" mode=""></image>
				</view>
				<view class="nickname">{{confirm.nickname}}</view>
				<view class="user-mess">
					<view class="name">
						支付宝姓名：
						<text>{{confirm.realname}}</text>
					</view>
					<view class="bank-card">
						支付宝账户：
						<text>{{confirm.bank_card}}</text>
					</view>
				</view>
			</view>
			<view class="draw-card">
				<view class="draw-to">
					提现金额 (元)
					<text>(提现到支付宝)</text>
				</view>
				<view class="draw-sum flex">
					<text>￥</text>
					<input v-model="money" class="draw-ipt" placeholder="0.00" type="text" value="" />
				</view>
				<view class="flex draw-f">
					<view class="can-draw">可提现金额{{confirm.user_money}}元</view>
					<view class="all-draw" @tap="allWith">全部提现</view>
				</view>
			</view>
			<view class="affirm" @tap="withdrawal">预计两小时到账，确认提现</view>
			<view class="record" @tap="toRecord">提现记录</view>
			<view class="explain">
				<view>提现说明：</view>
				<view>工作日：8:30~18:00之间提现，2个小时内到账：周六、周日及法定节假日提现，24小时内到账</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
			mapState
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	
	export default {
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				confirm: '',
				money:'',
				pay:0
			}
		},
		onPullDownRefresh() {
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/withdrawal/index',data,'GET').then(res =>{
					if(res.data.code === 1000){
						this.confirm = res.data.retval
						if(this.confirm.bank_card.length < 1){
							this.pay = 0
						}else{
							this.pay = 1
						}
					}
				}
			)
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			allWith() {
				this.money = this.confirm.user_money
			},
			toRecord() {
				uni.navigateTo({
					url:"../affirmrecord/affirmrecord"
				})
			},
			withdrawal() {
				if(this.pay === 0){
					uni.showToast({
						title:"您尚未绑定支付宝，请绑定后再试",
						icon:"none"
					})
				}else{
					let data = {
						money: this.money,
						bank_card: this.confirm.bank_card,
						realname: this.confirm.realname,
						user_id: this.userInfo.user_id,
						token: this.userInfo.token,
						sign: md5(this.userInfo.user_id+this.userInfo.token)
					}
					this.request.httpRequest('api/withdrawal/confirm',data,'GET').then(res => {
						if(res.data.code == 1000){
							uni.showToast({
								title:"提交成功",
								icon:"none"
							})
							setTimeout(function(){
								uni.switchTab({
									url:"../user/user"
								})
							},1000)
							uni.startPullDownRefresh();
						}else{
							uni.showToast({
								title:"提交失败，请稍后再试",
								icon:"none"
							})
						}
					})
				}
			}
		},
		onLoad() {
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/withdrawal/index',data,'GET').then(res =>{
					if(res.data.code === 1000){
						this.confirm = res.data.retval
						if(this.confirm.bank_card.length < 1){
							this.pay = 0
						}else{
							this.pay = 1
						}
						if(this.confirm.bank_card.length < 1 || this.confirm.realname.length < 1){
							uni.showToast({
								title:"账户信息有误，请修改",
								icon:"none"
							})
							setTimeout(function(){
								uni.redirectTo({
									url:"../userinformation/userinformation"
								})
							},1000)
						}
					}
				}
			)
		}
	}
</script>

<style lang="less" scoped>
.main{
	padding: 40rpx;
	background: #F7F7F7;
	height: 100%;
	.user{
		width: 590rpx;
		height: 284rpx;
		background: #fff;
		margin-left: 40rpx;
		text-align: center;
		font-size: 26rpx;
		color: #808080;
		border-radius: 10rpx;
		.head-pic{
			image{
				margin-top: 30rpx;
				width: 90rpx;
				height: 90rpx;
			}
		}
		.user-mess{
			text-align: left;
			margin-left: 150rpx;
		}
		.nickname{
			color: #333333;
			margin-top: 4rpx;
		}
		text{
			color: #333;
		}
		.name{
			margin-top: 6rpx;
		}
		.bank-card{
			margin-top: 6rpx;
		}
	}
	.draw-card{
		width: 510rpx;
		height: 155rpx;
		margin-left: 40rpx;
		margin-top: 40rpx;
		background: #fff;
		border-radius: 10rpx;
		padding: 30rpx 40rpx;
		.draw-to{
			font-size: 26rpx;
			font-weight: bold;
			text{
				font-weight: 500;
				margin-left: 40rpx;
				color: #00ABFA;
			}
		}
		.draw-sum{
			margin-top: 20rpx;
			border-bottom: 1rpx solid #F7F7F7;
			font-size: 48rpx;
			.draw-ipt{
				height: 64rpx;
				margin-left: 10rpx;
				font-size: 48rpx;
				.uni-input-placeholder{
					font-size: 48rpx;
				}
			}
		}
		.draw-f{
			margin-top: 10rpx;
			justify-content: space-between;
			.can-draw{
				font-size: 20rpx;
				color: #808080;
			}
			.all-draw{
				font-size: 24rpx;
				color: #00ABFA;
			}
		}
	}
	.affirm{
		margin-left: 40rpx;
		margin-top: 40rpx;
		border-radius: 10rpx;
		width: 590rpx;
		height: 65rpx;
		line-height: 65rpx;
		color: #fff;
		background: #00ABFA;
		text-align: center;
		font-size: 26rpx;
	}
	.record{
		color: #00ABFA;
		font-size: 26rpx;
		text-align: center;
		margin-top: 30rpx;
	}
	.explain{
		margin-top: 80rpx;
		font-size: 24rpx;
		color: #808080;
		background: #fff;
		border-radius: 20rpx;
	}
}

</style>
