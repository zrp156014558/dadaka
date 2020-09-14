<template>
	<view class="con">
		<view class="top">
			<image class="realname-pic" src="../../static/user/realname.png" mode=""></image>
			<view class="real-list">
				<view class="flex real-list-item">
					<view>姓名</view>
					<input v-model="realname" type="text" placeholder="请填写您的真实姓名" />
				</view>
				<view class="flex real-list-item">
					<view>身份证号</view>
					<input v-model="idcard" type="text" placeholder="请填写有效身份证件号" />
				</view>
				<view class="flex real-list-item">
					<view>手机号</view>
					<input v-model="mobile" type="text" placeholder="请填写有效的手机号" />
				</view>
				<view class="flex real-list-item">
					<view>支付宝账户</view>
					<input v-model="bank_card" type="text" placeholder="请填写有效的支付宝账户" />
				</view>
				<view class="flex real-list-auth real-list-item">
					<view>验证码</view>
					<input v-model="code" type="text" placeholder="请输入验证码" />
					<view class="get-auth">
						<text v-show="time===0" @tap="realGetAuth()">获取验证码</text>
						<text class="font-c" v-show="time===1">{{times}}秒</text>
						<text class="font-c" v-show="time===2" @tap="realGetAuth()">重新发送</text>
					</view>
				</view>
			</view>
			<view class="real-btn" @click="realName">提交</view>
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
				time:0,
				times:'',
				mobile:'',
				code:'',
				idcard:'',
				realname:'',
				bank_card:'',
			}
		},
		methods: {
			realGetAuth(){
					let data = {
						mobile:this.mobile,
						send_type:'identity_check'
					}
					this.request.httpRequest('api/sms/sendCode',data,'POST').then(res => {
						if (res.data.code === 1000){
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							this.time = 1;
							this.times = 59;
							setInterval(()=>{
								this.times --;
								if(this.times < 1){
									this.time = 2;
									clearInterval()
								}
							},1000)
						}
						if (res.data.code === 1100){
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					})
			},
			realName() {
				let data = {
					mobile: this.mobile,
					code:this.code,
					idcard:this.idcard,
					realname:this.realname,
					bank_card:this.bank_card,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/user/auth',data,'GET').then(res => {
					if (res.data.code === 1000){
						uni.showToast({
							title: "提交成功",
							icon: "success"
						})
						setTimeout(function() {
							uni.switchTab({
								url:"../main/main"
							})
						}, 1000);
					}
					if (res.data.code === 1100){
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.con{
	.realname-pic{
		width: 100%;
		height: 480rpx;
	}
	.real-list{
			font-size: 26rpx;
			margin-top: -10rpx;
		.real-list-item{
			font-weight: bold;
			height: 105rpx;
			line-height: 105rpx;
			border-top: 5rpx solid #E6E6E6;
			padding: 0 40rpx;
			justify-content: flex-start;
			view{
				width: 160rpx;
			}
			input{
				margin-top: 26rpx;
				font-size: 26rpx;
				margin-left: 40rpx;
				.uni-input-placeholder{
					color: #b8b8b8;
				}
			}
			
			.get-auth{
				margin-top: 26rpx;
				height: 50rpx;
				line-height: 50rpx;
				color: #00ABFA;
				border-left: 1rpx solid #CBCBCB;
				padding: 0 20rpx;
				width: 154rpx;
				text-align: center;
				.font-c{
					color: #333;
				}
			}
		}
		.real-list-auth{
			input{
				width: 300rpx;
			}
		}
	}
	.real-btn{
		width: 670rpx;
		height: 76rpx;
		background: #00ABFA;
		line-height: 76rpx;
		font-size: 26rpx;
		color: #fff;
		border-radius: 20rpx;
		text-align: center;
		margin-left: 40rpx;
	}
}
</style>
