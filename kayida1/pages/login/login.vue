<template>
    <view class="con">
		<view class="top">
			<view class=" flex title">
				<view :class="[current===0 ? 'cl' : '']" @click="shortcut()">快捷登录</view>
				<view :class="[current===0 ? '' : 'cl']" @click="topwd()">密码登录</view>
			</view>
			<view class="main">
				<view class="flex form-phone">
					<image class="phone-logo" src="../../static/img/phone.png" mode=""></image>
					<input class="phone-ipt" placeholder="请输入账号(手机号)" type="text" value="" v-model="phone"/>
				</view>
				<view class="flex form-auth" v-show="!current">
					<view class="flex">
						<image class="auth-logo" src="../../static/img/auth.png" mode=""></image>
						<input class="auth-ipt" placeholder="请输入验证码" type="text" value=""  v-model="auth"/>
					</view>
					<view class="gain-auth">
						<text v-show="time===0" @tap="loginGetAuth()">获取验证码</text>
						<text class="font-c" v-show="time===1">{{times}}秒</text>
						<text class="font-c" v-show="time===2" @tap="loginGetAuth()">重新发送</text>
					</view>
				</view>
				<view class="flex form-pwd" v-show="current">
					<image class="pwd-logo" src="../../static/img/pwd.png" mode=""></image>
					<input v-model="pwd" class="pwd-ipt" placeholder="请输入密码" type="password" value="" />
				</view>
				<view class="forget" v-show="current" @click="toForgetpwd()">忘记密码</view>
				<view class="btn">
					<!-- 快捷登录按钮 -->
					<view class="login" v-show="!current" @tap="quickLogin()">登录</view>
					<!-- 密码登录按钮 -->
					<view class="login" v-show="current" @tap="pwdLogin()">登录</view>
					<view class="login" @click="toReg">注册</view>
					<view class="flex agreement">
						注册代表您已同意
						<text class="user-agreement" @tap="userAgreement()">《卡易达用户协议》</text>
					</view>
					<view class="third-party" v-show="!current">
						<view>———— 第三方登录 ————</view>
						<view @tap="weixinLogin()">
							<image src="../../static/img/weixin.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
    import mInput from '../../components/m-input.vue';
	import {  
	        mapMutations  
	    } from 'vuex';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                current:0,
				phone:'',
				auth:'',
				times:'',
				time:0,
				pwd:''
            }
        },
        methods: {
            shortcut() {
				if(this.current !== 0){
					this.current = 0
				}
			},
			topwd() {
				if(this.current !== 1){
					this.current = 1
				}
			},
			toReg() {
				uni.navigateTo({
					url:"../reg/reg"
				})
			},
			toForgetpwd() {
				uni.navigateTo({
					url:"../forgetpwd/forgetpwd"
				})
			},
			loginGetAuth(){
				var p = this.phone;
				var t = /^1[3456789]\d{9}$/;
				if(!(t.test(p))){
					uni.showToast({
						title:"手机号格式不正确",
						icon: "none"
					})
					return
				}else{
					var data = {
						mobile: p,
						send_type:'login_confirm'
					}
					/*
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
					*/
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
									title: "发送成功",
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
				}
			},
			quickLogin() {
				var p = this.phone;
				var auth = this.auth;
				var data = {
					mobile: p,
					code: auth
				}
				/*
				this.request.httpRequest('api/user/quickLogin',data,'POST').then(res => {
					if (res.data.code !== 1000){
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}else if(res.data.code === 1000){
						// res.data.retval[mobile] = data.mobile
						var userInfo = res.data.retval
						this.login(userInfo)
						this.whetherbind(res.data.retval.is_bind)
						uni.switchTab({
							url:"../main/main"
						})
					}
				})
				*/
			   console.log(123)
				uni.request({
					url:"http://www.zgkayida.com/api/user/quickLogin",
					data:data,
					header:{
						'content-type': 'Access-Control-Allow-Origin'
					},
					method:"POST",
					success: (res) => {
						if (res.data.code !== 1000){
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}else if(res.data.code === 1000){
							var userInfo = res.data.retval
							this.login(userInfo)
							this.whetherbind(res.data.retval.is_bind)
							uni.showToast({
								title:"登录成功",
								icon:"none"
							})
							setTimeout(() => {
								uni.switchTab({
									url:"../main/main"
								})
							},1000)
						}
					}
				})
			},
			pwdLogin() {
				var p = this.phone;
				var pwd = this.pwd;
				var data = {
					mobile: p,
					password: pwd
				}
				/*
				this.request.httpRequest('api/user/login',data,'POST').then(res => {
					if (res.data.code !== 1000){
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}else if(res.data.code === 1000){
						function extend(target, source) { 
							for (var obj in source) {
								target[obj] = source[obj];
							} 
							return target;
						}
						var userInfo = extend(res.data.retval,data)
						this.login(userInfo)
						this.whetherbind(res.data.retval.is_bind)
						uni.switchTab({
							url:"../main/main"
						})
					}
				})
				*/
				uni.request({
					url:"http://www.zgkayida.com/api/user/login",
					data:data,
					header:{
						'content-type': 'application/x-www-form-urlencoded;application/json;charset=UTF-8'
					},
					method:"POST",
					success: (res) => {
						if (res.data.code !== 1000){
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}else if(res.data.code === 1000){
							console.log(res.data)
							function extend(target, source) { 
								for (var obj in source) {
									target[obj] = source[obj];
								} 
								return target;
							}
							var userInfo = extend(res.data.retval,data)
							this.login(userInfo)
							this.whetherbind(res.data.retval.is_bind)
							uni.showToast({
								title:"登录成功",
								icon:"none"
							})
							setTimeout(() => {
								uni.switchTab({
									url:"../main/main"
								})
							},1000)
						}
					}
				})
			},
			weixinLogin() {
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									// 获取用户信息
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											let data = {
												unionid: infoRes.userInfo.unionId,
												openid: infoRes.userInfo.openId,
												headimgurl: infoRes.userInfo.avatarUrl,
												nickname: infoRes.userInfo.nickName
											}
											this.request.httpRequest('api/user/wechatLogin',data,'POST').then(res => {
												
												if (res.data.code !== 1000){
													uni.showToast({
														title: res.data.msg,
														icon: "none"
													})
												}else if(res.data.code === 1000){
													function extend(target, source) { 
														for (var obj in source) {
															target[obj] = source[obj];
														} 
														return target;
													}
													var userInfo = extend(res.data.retval,data)
													this.login(userInfo)
													this.whetherbind(res.data.retval.is_bind)
													uni.showToast({
														title:"登录成功",
														icon:"none"
													})
													setTimeout(() => {
														uni.switchTab({
															url:"../main/main"
														})
													},1000)
												}
											})
										}.bind(this)
									});
								}.bind(this)
							});
						}
					}.bind(this)
				});
			},
			...mapMutations(['login','whetherbind']),
			userAgreement() {
				uni.navigateTo({
					url:"../userareement/userareement"
				})
			}
        }
    }
</script>

<style lang="less" scoped>
.con{
	.top{
		padding-top: 20rpx;
		.cl{
			color: #00ABFA;
		}
		.forget{
			font-size: 26rpx;
			color: #00ABFA;
			margin-top: -60rpx;
			margin-bottom: 80rpx;
		}
		.title{
			margin-top: 40rpx;
			font-size: 30rpx;
			color: #333;
			justify-content: space-around;
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
				margin-bottom: 80rpx;
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
				margin-bottom: 80rpx;
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
			.btn{
				padding: 20rpx;
				.login{
					width: 630rpx;
					height: 86rpx;
					background: #00ABFA;
					text-align: center;
					margin-bottom: 30rpx;
					color: #fff;
					border-radius: 20rpx;
					line-height: 86rpx;
					font-size: 36rpx;
				}
				.agreement{
					font-size: 26rpx;
					.user-agreement{
						color: #00ABFA;
					}
				}
				.third-party{
					margin-top: 40rpx;
					font-size: 26rpx;
					color: #808080;
					text-align: center;
					image{
						width: 94rpx;
						height: 94rpx;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
	
}
</style>
