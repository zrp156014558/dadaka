<template>
    <view class="con">
		<view class="top">
			<view class="title">
				<view class="reg">注册</view>
			</view>
			<view class="main">
				<view class="form-phone flex">
					<image class="phone-logo" src="../../static/img/phone.png" mode=""></image>
					<input v-model="phone" class="phone-ipt" placeholder="请输入账户(手机号)" type="text" value="" />
				</view>
				<view class="flex form-auth">
					<view class="flex">
						<image class="auth-logo" src="../../static/img/auth.png" mode=""></image>
						<input class="auth-ipt" placeholder="请输入验证码" type="text" value=""  v-model="auth"/>
					</view>
					<view class="gain-auth">
						<text v-show="time===0" @tap="regGetAuth()">获取验证码</text>
						<text class="font-c" v-show="time===1">{{times}}秒</text>
						<text class="font-c" v-show="time===2" @tap="regGetAuth()">重新发送</text>
					</view>
				</view>
				<view class="form-pwd flex">
					<image class="pwd-logo" src="../../static/img/pwd.png" mode=""></image>
					<input v-model="pwd1" class="pwd-ipt" placeholder="请输入密码" type="password" value="" />
				</view>
				<view class="form-pwd flex">
					<image class="pwd-logo" src="../../static/img/pwd.png" mode=""></image>
					<input v-model="pwd2" class="pwd-ipt" placeholder="请确认密码" type="password" value="" />
				</view>
			</view>
			<view class="main-bottom">
				<view class="reg-btn" @tap="userReg">注册</view>
				<view class="agreement">
					注册代表您已同意
					<text class="user-agreement" @tap="userAgreement()">《卡易达用户协议》</text>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
    import mInput from '../../components/m-input.vue';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                time:0,
                times:'',
                phone:'',
                auth:'',
                pwd1:'',
                pwd2:'',
            }
        },
        methods: {
            userAgreement() {
            	uni.navigateTo({
            		url:"../userareement/userareement"
            	})
            },
			regGetAuth() {
				let p = this.phone;
				let data = {
					mobile: p,
					send_type:'reg'
				}
			   uni.request({
			   	url:"http://www.zgkayida.com/api/sms/sendCode",
			   	data:data,
			   	header:{
			   		'content-type': 'application/x-www-form-urlencoded;application/json;charset=UTF-8'
			   	},
			   	method:"POST",
			   	success: (res) => {
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
			   	}
			   })
			},
			userReg() {
				let data = {
					mobile:this.phone,
					code:this.auth,
					password:this.pwd1,
					confirm_password:this.pwd2
				}
			   uni.request({
			   	url:"http://www.zgkayida.com/api/user/reg",
			   	data:data,
			   	header:{
			   		'content-type': 'application/x-www-form-urlencoded;application/json;charset=UTF-8'
			   	},
			   	method:"POST",
			   	success: (res) => {
			   		if(res.data.code !== 1000){
			   			uni.showToast({
			   				title:res.data.msg,
			   				icon:"none"
			   			})
			   		}else if(res.data.code === 1000){
			   			uni.redirectTo({
			   				url:"../login/login"
			   			})
			   		}
			   	}
			   })
			}
        }
    }
</script>

<style lang="less" scoped>
.top{
	padding-top: 20rpx;
	.title{
		margin-top: 40rpx;
		text-align: center;
		font-size: 30rpx;
		color: #333;
	}
	.main{
		margin-top: 20rpx;
		border-top: 5rpx solid #E4E4E4;
		padding: 0 40rpx;
		.form-phone{
			margin-top: 25rpx;
			padding-bottom: 25rpx;
			border-bottom: 1rpx solid #E4E4E4;
			.phone-logo{
				width: 27rpx;
				height: 43rpx;
			}
			.phone-ipt{
				margin-left: 42rpx;
				.uni-input-placeholder{
					color: #BFBFBF;
					font-size: 26rpx;
				}
			}
		}
		.form-auth{
			padding: 20rpx 0;
			border-bottom: 1rpx solid #E4E4E4;
			justify-content: space-between;
			height: 60rpx;
			line-height: 80rpx;
			align-items: center;
			.auth-logo{
				margin-top: 10rpx;
				width: 33rpx;
				height: 37rpx;
			}
			.auth-ipt{
				margin-top: 10rpx;
				margin-left: 40rpx;
				.uni-input-placeholder{
					color: #BFBFBF;
					font-size: 26rpx;
				}
			}
			.gain-auth{
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
		.form-pwd{
			padding: 20rpx 0;
			border-bottom: 1rpx solid #E4E4E4;
			.pwd-logo{
				margin-top: 10rpx;
				width: 35rpx;
				height: 35rpx;
			}
			.pwd-ipt{
				margin-top: 10rpx;
				margin-left: 38rpx;
				height: 50rpx;
				.uni-input-placeholder{
					color: #BFBFBF;
					font-size: 26rpx;
					line-height: 50rpx;
				}
			}
		}
	}
	.main-bottom{
		padding: 60rpx;
		margin-top: 40rpx;
		.reg-btn{
			font-size: 36rpx;
			color: #fff;
			background: #00ABFA;
			width: 630rpx;
			height: 86rpx;
			text-align: center;
			line-height: 86rpx;
			border-radius: 20rpx;
		}
		.agreement{
			margin-top: 20rpx;
			font-size: 26rpx;
			color: #333;
			.user-agreement{
				color: #00ABFA;
			}
		}
	}
}
</style>
