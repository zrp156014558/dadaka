<template>
	<view class="con">
		<view class="applypage-main top">
			<view class="applypage-top">
				<!-- <image class="applypage-banner" :src="applyPage.banner" mode=""></image> -->
				<image class="applypage-banner" src="../../static/img/onbanner.png" mode=""></image>
				<view class="applypage-top-list" v-if="loan == 6">
					<view class="flex top-list-item">
						<view>
							<image class="apply-name" src="../../static/main/fr.png" mode=""></image>
						</view>
						<input v-model="realnameQ" type="text" placeholder="请输入公司名字" />
					</view>
					<view class="flex top-list-item">
						<view>
							<image class="identitycard" src="../../static/main/gs.png" mode=""></image>
						</view>
						<input v-model="card_numQ" type="text" placeholder="请输入统一社会信用代码" />
					</view>
					<view class="flex top-list-item">
						<view>
							<image class="apply-phone" src="../../static/main/dh.png" mode=""></image>
						</view>
						<input v-model="mobileQ" type="text" placeholder="请输入法人手机号" />
					</view>
				</view>
				<view class="applypage-top-list" v-else-if="loan != 6">
					<view class="flex top-list-item">
						<view>
							<image class="apply-name" src="../../static/user/apply_name.png" mode=""></image>
						</view>
						<input v-model="realname" type="text" placeholder="请输入姓名" />
					</view>
					<view class="flex top-list-item">
						<view>
							<image class="identitycard" src="../../static/user/identitycard.png" mode=""></image>
						</view>
						<input v-model="card_num" type="text" placeholder="请输入身份证号" />
					</view>
					<view class="flex top-list-item">
						<view>
							<image class="apply-phone" src="../../static/user/apply_phone.png" mode=""></image>
						</view>
						<input v-model="mobile" type="text" placeholder="请输入手机号" />
					</view>
				</view>
				<view class="flex protocol">
					<image @click="pitch = 1" class="pitch" v-show="!pitch" src="../../static/user/pitch.png" mode=""></image>
					<image @click="pitch = 0" class="pitch" v-show="pitch" src="../../static/user/pitchd.png" mode=""></image>
					<view class="protocol-text">
						我已阅读并同意<text @tap="userAgreement">《用户注册协议》</text>
					</view>
				</view>
				<view class="change-proposer" @tap="changeIpt">
					更换申请人
				</view>
			</view>
			<view class="need-attention">注意事项</view>
			<view class="attention">
				<rich-text :nodes="apply_tips"></rich-text>
			</view>
		</view>
			<view class="application-btn" @click="submitA" v-if="loan == 6">提交</view>
			<view class="application-btn" @click="submitA" v-else-if="loan != 6">提交</view>
			<uni-popup  ref="popup" type="center" :maskClick="m">
				<view class="rule">
					<view class="rule-title">
						<image src="../../static/main/onapplication.png" mode=" scaleToFill"></image>
					</view>
					<view class="rule-main">
						<rich-text :nodes="text"></rich-text>
					</view>
					<view class="rule-btn flex">
						<view class="refuse" @click="close">
							拒绝办理
						</view>
						<view class="agree" v-if="loan == 6" @click="submitApplicationQ">
							同意办理
						</view>
						<view class="agree" v-else-if="loan !== 6" @click="submitApplication">
							同意办理
						</view>
					</view>
				</view>
			</uni-popup>
	</view>
</template>

<script>
	import {
			mapState, 
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	var wv;//计划创建的webview
	
	export default {
		components:{uniPopup},
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				applyPage:'',
				pitch:1,
				id:'',
				realname:'',
				realnameQ:'',
				card_num:'',
				card_numQ:'',
				mobile:'',
				mobileQ:'',
				apply_tips:``,
				type:'',
				loan:0,
				m:false,
				text:``,
				asseinfo:'',
				query_code:'',
			}
		},
		methods: {
			userAgreement() {
				uni.navigateTo({
					url:"../userareement/userareement"
				})
			},
			changeIpt() {
				this.realname = ''
				this.card_num = ''
				this.mobile = ''
				this.realnameQ = ''
				this.card_numQ = ''
				this.mobileQ = ''
			},
			close() {
				this.$refs.popup.close()
			},
			submitA() {
				this.$refs.popup.open()
			},
			submitApplicationQ() {
				this.$refs.popup.close()
				var p = /^1[3456789]\d{9}$/
				if(this.realnameQ.length < 1) {
					uni.showToast({
						title:"法人姓名不能为空",
						icon:"none"
					})
					return
				}else if(this.card_numQ.length != 18 && this.card_numQ.length != 15) {
					uni.showToast({
						title:"统一社会信用代码格式不正确",
						icon:"none"
					})
					return
				}else if(!(p.test(this.mobileQ))) {
					uni.showToast({
						title:"手机号格式不正确",
						icon:"none"
					})
					return
				}
				if(this.pitch !== 1){
					uni.showToast({
						icon:"none",
						title:"请勾选用户注册协议"
					})
				}else{
					var data = {
						id:this.id,
						realname:this.realnameQ,
						card_num:this.card_numQ,
						mobile:this.mobileQ,
						user_id: this.userInfo.user_id,
						token: this.userInfo.token,
						sign: md5(this.userInfo.user_id+this.userInfo.token)
					}
					this.request.httpRequest('api/loan6/apply',data,'GET').then(res => {
						if(res.data.code===1000){
							uni.showToast({
								title:"提交成功",
								icon:"none"
							})
							uni.navigateTo({
								url:"../applycard/applycard?url="+encodeURIComponent(JSON.stringify(res.data.retval))
							})
						}else{
							uni.showToast({
								icon:"none",
								title:"提交失败，请重试"
							})
						}
					})
					
				}
			},
			submitApplication() {
				this.$refs.popup.close()
				var p = /^1[3456789]\d{9}$/
				if(this.realname.length < 1) {
					uni.showToast({
						title:"姓名不能为空",
						icon:"none"
					})
					return
				}else if(this.card_num.length != 18) {
					uni.showToast({
						title:"身份证格式不正确",
						icon:"none"
					})
					return
				}else if(!(p.test(this.mobile))) {
					uni.showToast({
						title:"手机号格式不正确",
						icon:"none"
					})
					return
				}
				if(this.pitch !== 1){
					uni.showToast({
						icon:"none",
						title:"请勾选用户注册协议"
					})
				}else{
					var data = {
						id:this.id,
						realname:this.realname,
						card_num:this.card_num,
						mobile:this.mobile,
						user_id: this.userInfo.user_id,
						token: this.userInfo.token,
						sign: md5(this.userInfo.user_id+this.userInfo.token)
					}
					if(this.type === 'apply'){
						var data1 = {
							asseinfo:this.asseinfo,
							query_code:this.query_code,
							id:this.id,
							realname:this.realname,
							card_num:this.card_num,
							mobile:this.mobile,
							user_id: this.userInfo.user_id,
							token: this.userInfo.token,
							sign: md5(this.userInfo.user_id+this.userInfo.token)
						}
						this.request.httpRequest('api/card/apply',data1,'GET').then(res => {
							if(res.data.code===1000){
								uni.showToast({
									title:"提交成功",
									icon:"none"
								})
								uni.navigateTo({
									url:"../applycard/applycard?url="+encodeURIComponent(JSON.stringify(res.data.retval))
								})
							}else{
								uni.showToast({
									icon:"none",
									title:"提交失败，请重试"
								})
							}
						})
					}else if(this.type === 'loan'){
						if(this.loan == 0) {
							this.request.httpRequest('api/loan/apply',data,'GET').then(res => {
								if(res.data.code===1000){
									uni.showToast({
										title:"提交成功",
										icon:"none"
									})
									uni.navigateTo({
										url:"../applycard/applycard?url="+encodeURIComponent(JSON.stringify(res.data.retval))
									})
								}else{
									uni.showToast({
										icon:"none",
										title:"提交失败，请重试"
									})
								}
							})
						}else {
							let loan = this.loan
							this.request.httpRequest(`api/loan${loan}/apply`,data,'GET').then(res => {
								if(res.data.code===1000){
									uni.showToast({
										title:"提交成功",
										icon:"none"
									})
									uni.navigateTo({
										url:"../applycard/applycard?url="+encodeURIComponent(JSON.stringify(res.data.retval))
									})
								}else{
									uni.showToast({
										icon:"none",
										title:"提交失败，请重试"
									})
								}
							})
						}
					}else if(this.type === 'credit'){
						this.request.httpRequest('api/credit/apply',data,'GET').then(res => {
							if(res.data.code===1000){
								uni.showToast({
									title:"提交成功",
									icon:"none"
								})
								uni.navigateTo({
									url:"../applycard/applycard?url="+encodeURIComponent(JSON.stringify(res.data.retval))
								})
							}else{
								uni.showToast({
									icon:"none",
									title:"提交失败，请重试"
								})
							}
						})
					}
				}
			}
		},
		onLoad(option) {
			this.id = option.id
			this.type = option.type
			this.loan = option.loan
			let data = {
				id:option.id,
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			if(this.type === 'apply'){
				let data1 = {
					query_code:option.code,
					id:option.id,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/card/applyPage',data1,'GET').then(res => {
					this.applyPage = res.data.retval
					this.apply_tips = res.data.retval.apply_tips
					this.realname = res.data.retval.realname
					this.card_num = res.data.retval.card_num
					this.mobile = res.data.retval.mobile
					this.asseinfo = res.data.retval.asseinfo
					this.query_code = option.code
					this.text = res.data.retval.prompt_1
				})
			}else if(this.type === 'loan'){
				let loan = option.loan
				if(loan == 0){
					this.request.httpRequest('api/loan/applyPage',data,'GET').then(res => {
						this.applyPage = res.data.retval
						this.apply_tips = res.data.retval.apply_tips
						this.realname = res.data.retval.realname
						this.card_num = res.data.retval.card_num
						this.mobile = res.data.retval.mobile
						this.text = res.data.retval.prompt_1
					})
				}else{
					this.request.httpRequest(`api/loan${loan}/applyPage`,data,'GET').then(res => {
						if(loan == 2){
							this.realnameQ = res.data.retval.realname
							this.card_numQ = res.data.retval.card_num
							this.mobileQ = res.data.retval.mobile
						}else{
							this.realname = res.data.retval.realname
							this.card_num = res.data.retval.card_num
							this.mobile = res.data.retval.mobile
						}
						this.applyPage = res.data.retval
						this.apply_tips = res.data.retval.apply_tips
						this.text = res.data.retval.prompt_1
					})
				}
			}else if(this.type === 'credit'){
				this.request.httpRequest('api/credit/applyPage',data,'GET').then(res => {
					this.applyPage = res.data.retval
					this.apply_tips = res.data.retval.apply_tips
					this.realname = res.data.retval.realname
					this.card_num = res.data.retval.card_num
					this.mobile = res.data.retval.mobile
					this.text = res.data.retval.prompt_1
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.applypage-main{
		padding: 0 40rpx;
		.applypage-top{
			background: #fff;
			height: 730rpx;
			z-index: 999;
			.applypage-banner{
				height: 300rpx;
				width: 100%;
			}
			.applypage-top-list{
				border-bottom: 1rpx solid #EAEAEA;
				.top-list-item{
					height: 85rpx;
					border-top: 1rpx solid #EAEAEA;
					view{
						width: 60rpx;
						margin-top: 25rpx;
					}
					.apply-name{
						width: 34rpx;
						height: 36rpx;
						margin-left: 23rpx;
					}
					.identitycard{
						width: 39rpx;
						height: 30rpx;
						margin-left: 20rpx;
					}
					.apply-phone{
						width: 30rpx;
						height: 45rpx;
						margin-left: 25rpx;
					}
					input{
						margin-left: 30rpx;
						margin-top: 20rpx;
						font-size: 26rpx;
						width: 560rpx;
						.uni-input-placeholder{
							color: B3B3B3;
						}
					}
				}
			}
			.protocol{
				margin-top: 30rpx;
				margin-left: 30rpx;
				.pitch{
					width: 25rpx;
					height: 25rpx;
					// margin-top: 8rpx;
				}
				.protocol-text{
					margin-left: 10rpx;
					font-size: 26rpx;
					color: #333;
					text{
						color: #00ABFA;
					}
				}
			}
			.change-proposer{
				width: 160rpx;
				height: 56rpx;
				line-height: 56rpx;
				text-align: center;
				color: #fff;
				background: #00ABFA;
				border-radius: 20rpx;
				margin-left: 255rpx;
				margin-top: 30rpx;
				font-size: 26rpx;
			}
		}
		.need-attention{
			margin-top: 20rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #333;
			.attention{
				background: #fff;
			margin-bottom: 100rpx;
			}
		}
	}
		.application-btn{
			width: 100%;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 26rpx;
			color: #fff;
			background: #00ABFA;
			text-align: center;
			position: fixed;
			bottom: 0;
			z-index: 999;
		}
		.rule{
			width: 600rpx;
			height: 630rpx;
			background-color: #fff;
			border-radius: 20rpx;
			.rule-main{
				margin-top: 20rpx;
				padding: 0 40rpx;
			}
			.rule-title{
				image{
					width: 600rpx;
					height: 150rpx;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
				}
			}
			.rule-btn{
				position: absolute;
				bottom: 0;
				height: 110rpx;
				font-size: 34rpx;
				border-top: 1rpx solid #DDDDDD;
				line-height: 110rpx;
				text-align: center;
				.refuse{
					color: #333;
					width: 300rpx;
					border-right: 1rpx solid #DDDDDD;
				}
				.agree{
					color: #00ABFA;
					width: 300rpx;
				}
			}
		}
}
</style>
