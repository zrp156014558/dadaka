<template>
	<view class="con">
		<view class="user-main top">
			<view class="annot">注：姓名与身份证号一经确认无法修改，请慎重填写</view>
			<view class="flex information-detail ava-img">
				<view>头像</view>
				<image :src="information.head_pic" mode=""></image>
			</view>
			<view class="flex information-detail">
				<view>昵称</view>
				<view class="nickname">{{information.nickname}}</view>
			</view>
			<view class="flex information-detail">
				<view>姓名</view>
				<input type="text" placeholder="请输入姓名" v-model="realname" />
			</view>
			<view class="flex information-detail">
				<view>身份证号</view>
				<input type="text" placeholder="请输入有效的身份证号" />
			</view>
			<view class="flex information-detail">
				<view>手机号</view>
				<input type="text" placeholder="请输入手机号码" v-model="mobile" />
			</view>
			<view class="flex information-auth">
				<view class="flex ">
					<view class="auth-text">验证码</view>
					<input type="text" placeholder="请输入验证码" v-model="code" />
				</view>
				<view class="gain-auth">
					<text v-show="time===0" @tap="inforGetAuth()">获取验证码</text>
					<text class="font-c" v-show="time===1">{{times}}秒</text>
					<text class="font-c" v-show="time===2" @tap="loginGetAuth()">重新发送</text>
				</view>
			</view>
			<view class="flex information-detail">
				<view>微信号</view>
				<input type="text" placeholder="请输入微信号" v-model="wx" />
			</view>
			<view class="flex information-detail">
				<view>支付宝账号</view>
				<input type="text" placeholder="请输入有效的支付宝号" v-model="bank_card" />
			</view>
		</view>
		<view class="information-btn amend" @tap="amend">确认修改</view>
		<view class="information-btn logout" @tap="in_logout">注销账户</view>
	</view>
</template>

<script>
	import {
			mapState,
			mapMutations
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	
	export default {
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				information:'',
				realname:'',
				mobile:'',
				code:'',
				bank_card:'',
				wx:'',
				time:0,
				times:''
			}
		},
		methods: {
			inforGetAuth(){
				var data = {
					mobile: this.mobile,
					send_type:'information_change'
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
					if (res.data.code !== 1000){
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
				})
			},
			amend() {
				let data = {
					nickname:this.information.nickname,
					head_pic:this.information.head_pic,
					wx:this.wx,
					mobile:this.mobile,
					code:this.code,
					realname:this.realname,
					bank_card:this.bank_card,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/user/updateProfile',data,'GET').then(res => {
					if(res.data.code === 1000){
						uni.showToast({
							title:"修改成功",
							icon:"none"
						})
						setTimeout(function(){
							uni.switchTab({
								url:"../user/user"
							})
						},1000)
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
				})
			},
			in_logout() {
				this.logout()
				this.outbind()
			},
			...mapMutations(['logout','whetherbind','outbind']),
		},
		onLoad() {
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/user/index',data,'GET').then(res =>{
					this.information = res.data.retval
				}
			)
		},
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.user-main{
		background: #fff;
		.annot{
			font-size: 24rpx;
			color: #808080;
			text-align: center;
			height: 50rpx;
			line-height: 50rpx;
		}
		.ava-img{
			justify-content: space-between;
		}
		.information-detail{
			border-top: 2rpx solid #F2F2F2;
			// justify-content: space-between;
			height: 100rpx;
			line-height: 100rpx;
			padding: 0 40rpx;
			font-size: 26rpx;
			color: #333;
			.nickname{
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			view{
				width: 180rpx;
			}
			image{
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				margin-top: 15rpx;
			}
			input{
				margin-top: 25rpx;
				.uni-input-placeholder{
					font-size: 26rpx;
					color: #CCCCCC;
				}
			}
		}
		.information-auth{
			border-top: 2rpx solid #F2F2F2;
			// justify-content: flex-start;
			justify-content: left;
			height: 100rpx;
			line-height: 100rpx;
			padding: 0 40rpx;
			font-size: 26rpx;
			color: #333;
			.auth-text{
				width: 180rpx;
			}
			input{
				width: 300rpx;
				margin-top: 25rpx;
				.uni-input-placeholder{
					font-size: 26rpx;
					color: #CCCCCC;
				}
			}
			.gain-auth{
				margin-top: 30rpx;
				font-size: 26rpx;
				width: 240rpx;
				text-align: center;
				color: #00ABFA;
				padding: 0 20rpx;
				border-left: 2rpx solid #E4E4E4;
				height: 40rpx;
				line-height: 40rpx;
				.font-c{
					color: #333;
				}
			}
		}
	}
	.information-btn{
		width: 590rpx;
		line-height: 65rpx;
		height: 65rpx;
		text-align: center;
		font-size: 26rpx;
		border-radius: 20rpx;
		margin-top: 40rpx;
		margin-left: 80rpx;
	}
	.amend{
		background: #00ABFA;
		color: #fff;
	}
	.logout{
		background: #fff;
		color: #00ABFA;
		border: 2rpx solid #00ABFA;
	}
}
</style>
