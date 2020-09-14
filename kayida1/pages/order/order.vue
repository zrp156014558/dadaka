<template>
	<view class="con">
		<view class="flex top order-title">
			<view :class="'mt'+' '+[current===0 ? 'color' : ' ']" @click="Uorder">个人订单</view>
			<view :class="'mt'+' '+[current===0 ? ' ' : 'color']" @click="Torder">团队订单</view>
		</view>
		<view class="self-title flex">
			<view v-for="(item,index) in credit_list" :key="index" @click="credit(index)">
				<view :class="'credit'+' '+[index === credit_current ? 'credit-bg' : ' ']">{{item.name}}</view>
			</view>
		</view>
		<view class="subtitle-bg">
			<view class="subtitle flex">
				<view v-for="(item,index) in order_list" :key="index" @click="order(index)">
					<view :class="'order-subtitle'+' '+[index === order_current ? 'order-bg' : ' ']">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="list tt" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
		    <sib-list ref="sibList" @isRefresh='isRefresh' @scrolltolowerFn="scrolltolowerFn" :floterText="d">
		        <!-- 内部block可自定义 -->
		        <block class="" slot="sibScrollList">
					<view class="main" :style="'margin-top:' + [current == 0 ? '140rpx' : '160rpx']">
						<view class="hint" v-show="current===1">
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
								<view class="flex card-btn">
									<view class="plan" v-if="plan === 0" @tap="Plan(item.link_href)">查询进度</view>
									<view class="plan" v-else-if="plan === 1" @tap="Plan(item.link_href)">提交进度</view>
									<view class="del" v-if="u_share === 0" @tap="toDelete(item.order_id)">移至回收站</view>
									<view class="del" v-if="u_share === 1 || u_share === 0" @tap="toShare(index)">分享用户查询</view>
								</view>
							</view>
						</view>
					</view>
				</block>
		    </sib-list>
		</view>
		
		<uni-popup class="ru"  ref="popup" type="center" :maskClick="m">
			<view class="rule">
				<view class="rule-main">是否将此订单移至回收站</view>
				<view class="flex rule-btn">
					<view class="rule-del rule-cancel" @tap="close">取消</view>
					<view class="rule-del" @tap="del">确认</view>
				</view>
			</view>
		</uni-popup>
		<view class="popup" v-if="popup">
			<view class="popup-bg"></view>
			<view class="popup-main">
				<view class="popup-text">无需查询，自动结算</view>
				<view class="popup-btn" @click="popup = 0">确定</view>
			</view>
		</view>
		<view class="share" v-if="share">
			<view class="share-text">选择要分享到的平台</view>
			<view class="share-btn flex">
				<view class="share-weixin" @tap="shareWeixin">
					<image src="../../static/img/share_weixin.png" mode=""></image>
					<view>微信</view>
				</view>
			</view>
			<view class="share-cancel" @tap="shareCancel">取消分享</view>
		</view>
		<view class="share-mask" v-if="share"></view>
	</view>
</template>

<script>
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import {
			mapState,
			mapMutations
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import sibList from '@/components/sib-list/sib-list.vue'
	
	export default {
		components: {tabControl,uniPopup,sibList},
		computed: {
		            ...mapState(['userInfo','orderTitle'])  
		        },
		data() {
			return {
				current: 0,
				credit_current:0,
				credit_num:0,
				order_current:0,
				order_num:0,
				credit_list:'',
				credit_type:0,
				order_list:'',
				order_q:0,
				order_details:'',
				m:false,
				order_id:'',
				plan:0,
				u_share:0,
				c_share:0,
				popup:0,
				noData:0,
				share:0,
				share_index:0,
				page:1,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				n:0,
				d:''
			};
		},
		onLoad(option) {
			uni.getSystemInfo({
				success:(res) => {
					this.Height = res.screenHeight - 400 +'px'
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
				mode:this.current,
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
			current(newval,oldval){
				this.current = newval
				this.$refs.sibList.toTopClick()
				this.credit_type = 0
				this.credit_current = 0
				this.order_current = 0
				this.order_q = 0
				this.n = 0
				if(newval == 1) {
					this.u_share = 1
					this.plan = 3
					this.u_share = 3
				}else {
					// this.u_share = 0
					this.plan = 0
					// this.u_share = 0
					this.u_share = 0
				}
				let data = {
					mode:newval,
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
			credit_current(newval,oldval){
				this.$refs.sibList.toTopClick()
				this.c_share = newval
				this.credit_type = this.credit_list[newval].type
				this.order_current = 0
				this.order_q = 0
				this.n = 0
				if(this.current == 0){
					if(newval == 1 || newval == 2 || newval == 3){
						this.plan = 1
					}else{
						this.plan = 0
					}
					this.u_share = 0
				}else{
					this.u_share = 3
					this.plan = 3
				}
				let data = {
					mode:this.current,
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
				this.$refs.sibList.toTopClick()
				this.order_q = this.order_list[newval].q
				this.n = 0
				let data = {
					mode:this.current,
					type:this.credit_type,
					q:this.order_q,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/apply/index',data,'GET').then(res => {
					if(this.order_q == 6){
						this.plan = 3
						this.u_share = 3
						for (var i = 0; i < res.data.retval.length; i++) {
							if(res.data.retval[i].is_deleted == 1) {
								res.data.retval[i].status = "已删除订单"
							}
						}
					}else {
						if(this.current == 1){
							this.u_share = 3
							this.plan = 3
						}else {
							this.plan = 0
							this.u_share = 0
						}
					}
					this.order_details = res.data.retval
					if(this.order_details < 1) {
						this.noData = 1
					}else{
							this.noData = 0
						}
				})
			}
		},
		methods: {
			lower(e) {
				this.page = this.page + 1
				let data = {
					mode:this.current,
					type:this.credit_type,
					q:this.order_q,
					pageNo:this.page,
					user_id: this.userInfo.user_id,
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
							this.order_details = this.order_details.concat(list)
							uni.hideLoading()
					}
				})
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			Uorder() {
				this.current = 0
			},
			Torder() {
				this.current = 1
			},
			credit(index) {
				if(this.credit_current !== index){
					this.credit_current = index
				}
			},
			order(index) {
				if(this.order_current !== index){
					this.order_current = index
				}
			},
			Plan(url) {
				if(url != 1){
					uni.navigateTo({
						url:"../checkprogress/checkprogress?url="+encodeURIComponent(JSON.stringify(url))
					})
				}else{
					this.popup = 1
				}
			},
			close() {
				this.$refs.popup.close()
			},
			del() {
				this.$refs.popup.close()
				let data = {
					id:this.order_id,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/apply/delete',data,'GET').then(res => {
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
					let data = {
						mode:this.current,
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
				})
			},
			toDelete(order_id){
				this.order_id = order_id
				this.$refs.popup.open()
			},
			toShare(index) {
				var s
				let data = {
					mode:this.current,
					type:this.credit_type,
					q:this.order_q,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/apply/index',data,'GET').then(res => {
					this.order_details = res.data.retval
					s = this.order_details[index].link_href
					if(s != 1) {
						this.share = 1
						this.share_index = index
					}else if (s == 1){
						this.popup = 1
					}
					if(this.order_details < 1) {
						this.noData = 1
					}else{
								this.noData = 0
							}
				})
			},
			shareCancel() {
				this.share = 0
			},
			shareWeixin() {
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: this.order_details[this.share_index].link_href,
					title: this.order_details[this.share_index].realname + "邀请您查询" + this.order_details[this.share_index].name + "办卡进度",
					imageUrl: this.order_details[this.share_index].thumb,
					summary: this.order_details[this.share_index].realname + "邀请您查询" + this.order_details[this.share_index].name + "办卡进度",
				    success: function (res) {
				        uni.showToast({
				        	title:"分享成功",
				        	icon:"none"
				        });
				    },
				    fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
				        uni.showToast({
				        	title:"分享失败",
				        	icon:"none"
				        });
				    }
				});
				this.share = 0
			},
			// 刷新touch监听
			touchstart: function(e) {
			    this.$refs.sibList.refreshStart(e);
			},
			touchmove: function(e) {
			    this.$refs.sibList.refreshMove(e);
			},
			touchend: function(e) {
			    this.$refs.sibList.refreshEnd(e);
			},
			isRefresh: function() {
			    
			},
			scrolltolowerFn: function() {
			    this.page = this.page + 1
			    let data = {
			    	mode:this.current,
			    	type:this.credit_type,
			    	q:this.order_q,
			    	pageNo:this.page,
			    	user_id: this.userInfo.user_id,
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
			    			this.order_details = this.order_details.concat(list)
			    			uni.hideLoading()
			    	}
			    })
			},
			...mapMutations(['toorder'])
		},
		onShow() {
			this.credit_current = this.orderTitle
		},
		onHide() {
			this.toorder(0)
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
}
.tt{
	margin-top: 210rpx;
}
.order-title{
	justify-content: space-around;
	font-size: 30rpx;
	height: 70rpx;
	line-height: 56rpx;
	position: fixed;
	background: #F7F7F7;
	width: 100%;
	z-index: 999;
	.mt{
		margin-top: 10rpx;
	}
	.color{
		color: #00ABFA;
		font-size: 34rpx;
	}
}
.self-title{
	// width: 670rpx;
	width: 100%;
	height: 60rpx;
	font-size: 26rpx;
	color: #fff;
	padding: 0 0 0 40rpx;
	background: #00ABFA;
	margin-top: 66rpx;
	position: fixed;
	z-index: 999;
	.credit{
		padding: 0 20rpx;
		line-height: 60rpx;
	}
	.credit-bg{
		background: #fff;
		color: #00ABFA;
	}
}
.subtitle-bg{
	width: 100%;
	background: #fff;
	height: 80rpx;
	position: fixed;
	z-index: 999;
	margin-top: 120rpx;
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
.hint{
	font-size: 26rpx;
	color: #808080;
	// margin-left: 38rpx;
	// margin-top: 330rpx;
	// position: fixed;
}
.no-data{
	font-size: 40rpx;
	color: #999999;
	text-align: center;
	margin-top: 100rpx;
	font-weight: bold;
}
.main{
	padding: 0 40rpx;
	.order-card{
		width: 670rpx;
		// height: 350rpx;
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
			.card-btn{
				margin-bottom: 40rpx;
			}
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
.ru{
	position: fixed;
	z-index: 999;
}
.rule{
	width: 600rpx;
	height: 240rpx;
	background: #fff;
	border-radius: 20rpx;
	padding-top: 10rpx;
	.rule-main{
		font-size: 30rpx;
		text-align: center;
		margin-top: 60rpx;
	}
	.rule-btn{
		justify-content: space-around;
		margin-top: 40rpx;
		.rule-del{
			font-size: 28rpx;
			background: #00ABFA;
			height: 60rpx;
			width: 200rpx;
			line-height: 60rpx;
			color: #fff;
			text-align: center;
			border-radius: 20rpx;
		}
		.rule-cancel{
			background: #fff;
			border: 1rpx solid #00ABFA;
			color: #00ABFA;
		}
	}
}
.popup{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	z-index: 999;
	.popup-bg{
		background: #8F8F94;
		height: 100%;
		z-index: 999;
		opacity: 0.5;
	}
	.popup-main{
		position: absolute;
		top: 500rpx;
		left: 100rpx;
		width: 550rpx;
		height: 300rpx;
		background: #fff;
		border-radius: 24rpx;
		.popup-text{
			margin-top: 100rpx;
			font-size: 40rpx;
			color: #333;
			text-align: center;
			font-weight: bold;
		}
		.popup-btn{
			margin-top: 85rpx;
			border-bottom-left-radius: 24rpx;
			border-bottom-right-radius: 24rpx;
			width: 100%;
			height: 80rpx;
			background: #00ABFA;
			color: #fff;
			font-size: 30rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
}
.share-mask{
		position: fixed;
		top: 0;
		background: #8F8F94;
		opacity: 0.4;
		height: 100%;
		width: 750rpx;
		z-index: 999;
	}
	.share{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 450rpx;
		text-align: center;
		background: #F2F2F2;
			color: #333;
			z-index: 1000;
		.share-text{
			font-size: 30rpx;
			margin-top: 70rpx;
		}
		.share-btn{
			justify-content: space-around;
			margin-top: 60rpx;
			font-size: 26rpx;
			image{
				width: 100rpx;
				height: 100rpx;
			}
		}
		.share-cancel{
			width: 100%;
			height: 88rpx;
			font-size: 26rpx;
			color: #666;
			background: #fff;
			line-height: 88rpx;
			margin-top: 60rpx;
		}
	}
</style>
