<template>
	<view class="con">
			<view class="tab-nav flex top">
				<view :class="'nav-respects' +' '+ [current === 0 ? 'nav-color' : '']" @click="toRespects">问安</view>
				<view :class="'nav-infor' +' '+ [current === 1 ? 'nav-color' : '']" @click="toInfor">资讯</view>
				<view :class="'nav-generalize' +' '+ [current === 2 ? 'nav-color' : '']" @click="toGener">推广</view>
			</view>
			<view v-show="current === 0">
				<scroll-view class="scroll" style="height: 650px;" :scroll-top="scrollTop" scroll-y="true" lower-threshold="50" @scrolltolower="lower" @scroll="scroll">
					<view class="respects">
						<view class="respects-card flex" v-for="(item,index) in respects" :key="index">
							<view class="respects-card-left flex">
								<view>
									<view class="day">{{item.day_tag}}</view>
									<view class="day-bor"></view>
									<view class="year">{{item.addtime_tag}}</view>
								</view>
								<view class="time-circle"></view>
							</view>
							<view class="respects-card-right">
								<view class="right-card">
									<view class="right-title flex">
										<view class="flex title-left">
											<image :src="item.icon" mode=""></image>
											<view class="card-user">{{item.gname}}</view>
											<view class="card-time">{{item.hour_tag}}</view>
										</view>
										<view class="share-btn" @tap="shareDetail(index)">分享</view>
									</view>
									<view class="right-subtitle">
										{{item.content}}
									</view>
									<view class="right-img">
										<image :src="item.thumb" mode="scaleToFill"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="share" v-if="share">
					<view class="share-text">选择要分享到的平台</view>
					<view class="share-btn flex">
						<view class="share-weixin" @tap="shareWeixin">
							<image src="../../static/img/share_weixin.png" mode=""></image>
							<view>微信</view>
						</view>
						<view class="share-friends" @tap="shareFriends">
							<image src="../../static/img/share_friends.png" mode=""></image>
							<view>朋友圈</view>
						</view>
					</view>
					<view class="share-cancel" @tap="shareCancel">取消分享</view>
				</view>
			<view class="share-mask" v-if="share"></view>
			</view>
			<view class="information" v-show="current === 1">
				<view class="infor-title flex">
					<view class="infor-text" v-for="(item,index) in infor_title" :key="index">
						<view :class="index === infor_current ? 'infor-color' : ' '" @tap="toInforC(index)">{{item.nav_name}}</view>
					</view>
				</view>
				<view class="infor-main">
					<view class="flex infor-card" v-for="(item,index) in infor_card" :key="index" @tap="toNewsDetail(index)">
						<view class="infor-card-left">
							<view class="card-title">{{item.title}}</view>
							<view class="card-details">{{item.content}}</view>
							<view class="card-bottom flex">
								<view>{{item.nav}}</view>
								<view>{{item.addtime_tag}}</view>
							</view>
						</view>
						<view class="card-img">
							<!-- <image :src="item.thumb" mode=""></image> -->
							<easy-loadimage
							:scroll-top="scrollTop"
							:image-src="item.thumb" 
							:open-transition="true"></easy-loadimage>
						</view>
					</view>
				</view>
			</view>
			<view class="generalize flex" v-show="current === 2">
				<view class="generalize-img" v-for="(item,index) in poster" :key="index" @click="toPromotion(item.id)">
					<!-- <image @tap="toPromotion(item.id)" :src="item.thumb" mode=""></image> -->
					<easy-loadimage
					:scroll-top="scrollTop"
					:image-src="item.thumb" 
					:open-transition="true"></easy-loadimage>
				</view>
			</view>
	</view>
</template>

<script>
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import {
			mapState
		} from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	const MockData = require('@/static/easy-loadimage/mock-data.json')
	
	export default {
		components: {tabControl,easyLoadimage},
		computed: {
		            ...mapState(['userInfo','is_bind'])  
		        },
		data() {
			return {
				respects: '',
				infor_title: '',
				current: 0,
				infor_current:0,
				infor_card: [],
				poster:'',
				val:"",
				share:0,
				pageNo:1,
				share_index:'',
				scrollTop:0,
				old:{
					scrollTop:0
				},
				list:MockData
			};
		},
		onPageScroll({scrollTop}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
		},
		onPullDownRefresh() {
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/timing/index',data,'GET').then(res =>{
				if(res.data.code === 1000){
					this.respects = res.data.retval
					uni.stopPullDownRefresh();
				}
				}
			)
		},
		onLoad(option) {
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/timing/index',data,'GET').then(res =>{
				if(res.data.code === 1000){
					this.respects = res.data.retval
					uni.startPullDownRefresh()
				}
				}
			)
			this.request.httpRequest('api/poster/index','GET').then(res =>{
				if(res.data.code === 1000){
					this.poster = res.data.retval
				}
			});
		},
		onHide() {
			this.share = 0
		},
		watch:{
			current(newval,oldval) {
				if(newval === 1) {
					this.infor_current = 0;
					this.request.httpRequest('api/newsnav/index','GET').then(res =>{
						if(res.data.code === 1000){
							this.infor_title = res.data.retval.nav
						}
					});
					let data = {
						nav_id:newval - 1,
						user_id: this.userInfo.user_id,
						token: this.userInfo.token,
						sign: md5(this.userInfo.user_id+this.userInfo.token)
					}
					this.request.httpRequest('api/news/index',data,'GET').then(res =>{
						if(res.data.code === 1000){
							this.infor_card = res.data.retval
						}
					});
				}else if(newval === 2){
					this.request.httpRequest('api/poster/index','GET').then(res =>{
						if(res.data.code === 1000){
							this.poster = res.data.retval
						}
					});
				}else if(newval === 0) {
					let data = {
						user_id: this.userInfo.user_id,
						token: this.userInfo.token,
						sign: md5(this.userInfo.user_id+this.userInfo.token)
					}
					this.request.httpRequest('api/timing/index',data,'GET').then(res =>{
						if(res.data.code === 1000){
							this.respects = res.data.retval
						}
						}
					)
				}
			},
			infor_current(newval,oldval) {
				let data = {
					nav_id:newval,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/news/index',data,'GET').then(res =>{
					if(res.data.code === 1000){
						this.infor_card = res.data.retval
					}
				});
			}
		},
		methods: {
			lower:function(e) {
				this.pageNo = ++this.pageNo
				let data = {
					pageNo:this.pageNo,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/timing/index',data,'GET').then(res =>{
					if(res.data.code === 1000){
						let list = res.data.retval
						this.respects = this.respects.concat(list)
					}
					}
				)
			},
			scroll:function(e) {
			},
			shareWeixin() {
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 2,
				    imageUrl: this.respects[this.share_index].thumb,
				    success: function (res) {
				        uni.showToast({
				        	title:"分享成功",
				        	icon:"none"
				        });
				    },
				    fail: function (err) {
				        uni.showToast({
				        	title:"分享失败",
				        	icon:"none"
				        });
				    }
				});
				this.share = 0
			},
			shareFriends() {
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 2,
				    imageUrl: this.respects[this.share_index].thumb,
				    success: function (res) {
				        uni.showToast({
				        	title:"分享成功",
				        	icon:"none"
				        });
				    },
				    fail: function (err) {
				        uni.showToast({
				        	title:"分享失败",
				        	icon:"none"
				        });
				    }
				});
				this.share = 0
			},
			shareDetail(index) {
					this.share = 1
					this.share_index = index
					uni.setClipboardData({
					    data: this.respects[this.share_index].content,
					    success: function () {
							uni.showToast({
								title: '复制成功',
								duration:2000,
								icon:"none"
							})
					    }
					});
			},
			shareCancel() {
				this.share = 0
			},
			toNewsDetail(index) {
				uni.navigateTo({
					url:"../newsdetail/newsdetail?index="+index+"&infor="+this.infor_current
				})
			},
			toRespects() {
				if(this.current !== 0){
					this.current = 0
				}
			},
			toInfor() {
				if(this.current !== 1){
					this.current = 1
				}
			},
			toGener() {
				if(this.current !== 2){
					this.current = 2
				}
			},
			toInforC(index) {
				if(this.infor_current !== index){
					this.infor_current = index
				}
			},
			toPromotion(index) {
				uni.navigateTo({
					url:"../promotioncenter/promotioncenter?id="+index,
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.scroll{
		height: 1600rpx;
	}
	.respects{
		background: #F7F7F7;
		padding: 20rpx 20rpx 100rpx 50rpx;
		margin-top: 88rpx;
		.respects-card{
			.respects-card-left{
				margin-top: 90rpx;
				position: relative;
				.day{
					font-size: 70rpx;
					font-weight: bold;
					margin-bottom: -10rpx;
				}
				.day-bor{
					width: 91rpx;
					height: 6rpx;
					border-radius: 120rpx;
					background: #00ABFA;
				}
				.year{
					font-size: 24rpx;
					color: #1A1A1A;
					width: 100rpx;
				}
				.time-circle{
					width: 14rpx;
					height: 14rpx;
					background: #000;
					border-radius: 50%;
					position: absolute;
					right: -26rpx;
					top: 60rpx;
				}
			}
			.respects-card-right{
				margin-left: 20rpx;
				// margin-top: 10rpx;
				padding: 0 0 20rpx 20rpx;
				border-left: 5rpx solid #ECECEC;
				.right-card{
					background: #fff;
					width: 515rpx;
					border-radius: 20rpx;
					// height: 1120rpx;
					margin-top: 20rpx;
					.right-title{
						padding: 20rpx 40rpx 20rpx 30rpx;
						justify-content: space-between;
						.title-left{
							image{
								width: 60rpx;
								height: 40rpx;
							}
							.card-user{
								font-size: 26rpx;
								color: #333;
								line-height: 50rpx;
								margin-left: 10rpx;
							}
							.card-time{
								color: #808080;
								font-size: 18rpx;
								line-height: 60rpx;
								margin-left: 10rpx;
							}
						}
						.share-btn{
							width: 117rpx;
							height: 48rpx;
							line-height: 48rpx;
							background: #00ABFA;
							color: #fff;
							font-size: 30rpx;
							border-radius: 120rpx;
							text-align: center;
						}
					}
					.right-subtitle{
						padding: 0 20rpx;
						font-size: 26rpx;
						color: #333;
					}
					.right-img{
						margin-top: 20rpx;
						margin-bottom: 20rpx;
						image{
							height: 912rpx;
							width: 515rpx;
						}
					}
				}
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
		z-index: 998;
	}
	.share{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 450rpx;
		text-align: center;
		background: #F2F2F2;
			color: #333;
			z-index: 999;
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
	.information{
		background: #F7F7F7;
		margin-top: 88rpx;
		.infor-title{
			justify-content: space-around;
			font-size: 30rpx;
			color: #808080;
			height: 66rpx;
			line-height: 66rpx;
			background: #fff;
			position: fixed;
			background: #F7F7F7;
			width: 100%;
			z-index: 999;
			.infor-color{
				color: #00ABFA;
			}
		}
		.infor-main{
			background: #fff;
			// margin-top: 250rpx;
				padding: 40rpx;
				padding-top: 80rpx;
			.infor-card{
				height: 160rpx;
				background: #fff;
				border-bottom: 1rpx solid #F5F5F5;
				justify-content: space-between;
				.infor-card-left{
					width: 460rpx;
					margin-top: 10rpx;
					position: relative;
					.card-title{
						font-size: 26rpx;
						color: #333;
						font-weight: bold;
					}
					.card-details{
						font-size: 20rpx;
						color: #4D4D4D;
						margin-top: 10rpx;
						width: 400rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					.card-bottom{
						justify-content: space-between;
						font-size: 20rpx;
						color: #4D4D4D;
						margin-top: 6rpx;
						position: absolute;
						bottom: 10rpx;
						width: 100%;
					}
				}
				.card-img{
					width: 180rpx;
					height: 120rpx;
					.origin-img{
						height: 120rpx;
					}
					image{
						width: 180rpx;
						height: 120rpx;
						margin-top: 10rpx;
					}
				}
			}
		}
	}
	.generalize{
		padding: 20rpx 30rpx;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin-bottom: 60rpx;
		margin-top: 88rpx;
		.generalize-img{
			margin-left: 20rpx;
			margin-bottom: 30rpx;
			width: 210rpx;
			height: 373rpx;
			image{
				width: 210rpx;
				height: 373rpx;
			}
			image.origin-img{
				width: 210rpx;
				height: 373rpx;
				border-radius: 20rpx;
				margin-bottom: 38rpx;
			}
		}
	}
.tab-nav{
	box-shadow: 0 2rpx 2rpx #EFEFEF;
	height: 88rpx;
	justify-content: space-around;
	line-height: 88rpx;
	font-size: 30rpx;
	color: #333;
	font-weight: bold;
	position: fixed;
	background: #F7F7F7;
	width: 100%;
	z-index: 997;
}
.nav-color{
	font-size: 34rpx;
	color: #00ABFA;
}
</style>
