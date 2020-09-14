<template>
	<view class="con">
		<view class="flex top credit-title">
			<view v-for="(item,index) in credit_list" :key="index" @click="credit(index)">
				<view :class="'credit'+' '+[index === credit_current ? 'credit-c' : ' ']">{{item.name}}</view>
			</view>
		</view>
		<view class="subtitle-bg">
			<view class="subtitle flex">
				<view v-for="(item,index) in order_list" :key="index" @click="order(index)">
					<view :class="'order-subtitle'+' '+[index === order_current ? 'order-bg' : ' ']">{{item.name}}</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" :scroll-top="scrollTop" @scrolltolower="lower" lower-threshold="50" v-bind:style="[{height: Height}]">
			<view class="main">
				<view class="hint">
					温馨提示：团队进度每日仅可查询两次,如下级为推卡客,则不可代替查询
				</view>
				<view class="no-data" v-if="noData">暂无数据</view>
				<view class="flex order-card" v-for="(item,index) in order_details" :key="index">
					<view class="type">{{item.status}}</view>
					<view class="card-right">
						<view class="applyfor">
							申请姓名：
							<text class="details">{{item.realname}}</text>
						</view>
						<view class="applyfor">
							浏览业务：
							<text class="details">{{item.name}}</text>
						</view>
						<view class="applyfor">
							申请人昵称：
							<text class="details">{{item.nickname}}</text>
						</view>
						<view class="applyfor">
							申请人手机号：
							<text class="details">{{item.mobile}}</text>
						</view>
						<view class="applyfor">
							浏览时间：
							<text class="details">{{item.addtime}}</text>
						</view>
						<view class="applyfor">
							目前申请状态：
							<text class="state">{{item.status}}</text>
						</view>
						<view class="flex">
							<view class="plan" @tap="Plan(item.link_href)">查询进度</view>
							<view class="del" v-if="u_share === 1">分享用户查询</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
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
				credit_current:0,
				credit_list:'',
				order_list:'',
				order_current:0,
				u_share:1,
				credit_type:0,
				order_q:0,
				noData:0,
				order_details:'',
				page:0,
				Height:0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
			}
		},
		methods: {
			credit(index) {
				if(this.credit_current !== index){
					this.credit_current = index
				}
				this.order_current = 0
			},
			order(index) {
				this.goTop()
				if(this.order_current !== index){
					this.order_current = index
				}
			},
			goTop() {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			lower(e) {
				this.page = this.page + 1
				let data = {
					user_id: this.userInfo.user_id,
					pageNo:this.page,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/apply/index',data,'GET').then(res => {
					if(!this.n) {
						uni.showLoading({
							title: '加载中...',
							mask: true
						})
							let list = res.data.retval
							if(res.data.retval.length < 1){
								this.n = 1
								uni.showToast({
									icon: 'none',
									title: '没有消息了'
								})
							}else{
								this.n = 0
								uni.showToast({
									icon: 'success',
									title: '加载成功'
								})
							}
							if(!this.n) {
								uni.showToast({
									icon: 'success',
									title: '加载成功'
								})
							}else {
								uni.showToast({
									icon: 'none',
									title: '没有消息了'
								})
							}
							this.order_details = this.order_details.concat(list)
							uni.hideLoading()
					}
				})
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success:(res) => {
					this.Height = res.screenHeight - 20 +'px'
				}
			})
			this.request.httpRequest('api/apply/nav','GET').then(res => {
				if(res.data.code === 1000){
					this.credit_list = res.data.retval
					this.order_list = res.data.retval[this.credit_current].child
				}else{
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
				}
			})
			let data = {
				mode:1,
				type:this.credit_type,
				q:this.order_q,
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/apply/index',data,'GET').then(res => {
				this.order_details = res.data.retval
				if(this.order_details < 1) {
					this.noData = 1
				}else{
							this.noData = 0
						}
			})
		},
		watch:{
			credit_current(newval,oldval){
				this.goTop()
				this.credit_type = this.credit_list[newval].type
				this.order_current = 0
					if(newval == 4 || newval == 2 || newval == 3){
						this.u_share = 3
					}else{
						this.u_share = 1
					}
				let data = {
					mode:1,
					type:this.credit_type,
					q:this.order_q,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/apply/index',data,'GET').then(res => {
					this.order_details = res.data.retval
					if(this.order_details < 1) {
						this.noData = 1
					}else{
							this.noData = 0
						}
				})
				this.request.httpRequest('api/apply/nav','GET').then(res => {
					if(res.data.code === 1000){
						this.order_list = res.data.retval[newval].child
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
				})
			},
			order_current(newval,oldval){
				this.goTop()
				this.order_q = this.order_list[newval].q
				let data = {
					mode:1,
					type:this.credit_type,
					q:this.order_q,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/apply/index',data,'GET').then(res => {
					this.order_details = res.data.retval
					if(this.order_details < 1) {
						this.noData = 1
					}else{
							this.noData = 0
						}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.credit-title{
		justify-content: space-around;
		background: #fff;
		position: fixed;
		width: 100%;
		height: 80rpx;
		line-height: 50rpx;
		z-index: 999;
		.credit{
			margin-top: 10rpx;
			font-size: 30rpx;
		}
		.credit-c{
			color: #00ABFA;
			font-size: 34rpx;
		}
	}
	.subtitle-bg{
		width: 100%;
		background: #fff;
		height: 80rpx;
		position: fixed;
		z-index: 999;
		margin-top: 80rpx;
	}
	.subtitle{
		padding: 20rpx 40rpx;
		font-size: 24rpx;
		color: #EBEBEB;
		.order-subtitle{
			background: #808080;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 10rpx;
		}
		.order-bg{
			background: #00ABFA;
		}
	}
	.main{
		padding: 0 40rpx;
		margin-top: 180rpx;
		.hint{
			font-size: 26rpx;
			color: #808080;
		}
		.no-data{
			font-size: 40rpx;
			color: #999999;
			text-align: center;
			font-weight: bold;
		}
		.order-card{
			width: 670rpx;
			height: 350rpx;
			font-size: 24rpx;
			margin-bottom: 40rpx;
			.type{
				width: 40rpx;
				background: #00ABFA;
				color: #fff;
				text-align: center;
				vertical-align:middle;
				writing-mode: vertical-lr;
				padding-left: 6rpx;
				letter-spacing: 16rpx;
				border-bottom-left-radius: 10rpx;
				border-top-left-radius: 10rpx;
			}
			.card-right{
				background: #fff;
				width: 602rpx;
				padding-left: 20rpx;
				padding-top: 20rpx;
				font-size: 24rpx;
				color: #A1A1A1;
				.applyfor{
					margin-top: 10rpx;
				}
				.details{
					color: #3D3D3D;
				}
				.state{
					color: #0DAFFA;
				}
				.plan,.del{
					border-radius: 10rpx;
					text-align: center;
					line-height: 43rpx;
					color: #fff;
					margin-top: 20rpx;
					font-size: 24rpx;
				}
				.plan{
					width: 125rpx;
					height: 43rpx;
					background: #FEAB31;
					margin-left: 10rpx;
				}
				.del{
					width: 151rpx;
					height: 43rpx;
					background: #EE3C3A;
					margin-left: 40rpx;
				}
			}
		}
	}
}
</style>
