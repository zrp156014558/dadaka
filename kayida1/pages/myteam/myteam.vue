<template>
	<view class="con">
		<view class="myteam-main top">
			<view class="referrer" v-if="hasUpuser">
				<view class="myreferrer">
					我的推荐人
				</view>
				<view class="referrer-card">
					<view class="referrer-card-top flex">
						<view class="referrer-card-left flex">
							<image :src="upuser.head_pic" mode=""></image>
							<view class="referrer-infor">
								<view class="flex" style="line-height: 32rpx;">
									昵称：
									<text class="infor-nickname">{{upuser.nickname}}</text>
									<view class="referer-post">{{upuser.level_tag}}</view>
								</view>
								<view class="flex referrer-infor-bottom">
									<view>
										<view>
											姓名：
											<text>{{upuser.realname}}</text>
										</view>
										<view>
											推荐码：
											<text>{{upuser.recode}}</text>
										</view>
									</view>
									<view class="referrer-card-right flex">
										<image class="referrer-phone" @tap="callPhone(upuser.mobile)" src="../../static/user/dial.png" mode=""></image>
										<image class="referrer-phone" @tap="open" src="../../static/user/add_wechat.png" mode=""></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="referrer-card-bottom">这是你的上级推荐人，如有问题可及时联系</view>
				</view>
			</view>
			<view class="team-infor">
				<view class="team-infor-title">我的团队</view>
				<view class="team-infor-main flex">
					<view class="peo-left" v-for="(item,index) in count_list" :key="index">
						<view class="peo-num ">{{item.quantity}}</view>
						<view class="people">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="myteam-list flex" @tap="toTeam">
				<view class="flex list-left">
					<image class="list-img" src="../../static/img/myteam.png" mode=""></image>
					<view>我的团队</view>
				</view>
				<image class="list-right" src="../../static/img/right.png" mode=""></image>
			</view>
			<view class="myteam-list flex" @tap="toStatis">
				<view class="flex list-left">
					<image class="list-img" src="../../static/img/teamstatis.png" mode=""></image>
					<view>团队统计</view>
				</view>
				<image class="list-right" src="../../static/img/right.png" mode=""></image>
			</view>
			<view class="myteam-list flex" @tap="toOrder">
				<view class="flex list-left">
					<image class="list-img" src="../../static/img/teamsearch.png" mode=""></image>
					<view>团队订单</view>
				</view>
				<image class="list-right" src="../../static/img/right.png" mode=""></image>
			</view>
		</view>
		<uni-popup  ref="popup" type="center" :maskClick="m">
			<view class="rule">
				<!-- <image :src="weixin_pic" mode="" @longpress="openP"></image> -->
				<view class="rule-title">
					推荐人微信：{{upuser.mobile}}
				</view>
				<view class="rule-main">
					号码已复制，可直接去微信中搜索
				</view>
				<view class="rule-btn" @click="close">
					确定
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
			mapState,
			mapMutations
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	
	export default {
		components:{uniPopup},
		computed: {
		            ...mapState(['userInfo',])  
		        },
		data() {
			return {
				count_list:'',
				upuser:'',
				hasUpuser:0,
				m:true,
				weixin_pic:'',
				popup:0
			}
		},
		methods: {
			callPhone(phone) {
				uni.makePhoneCall({
				    phoneNumber: phone, 
				});
			},
			toStatis() {
				uni.navigateTo({
					url:"../statistics/statistics"
				})
			},
			toTeam() {
				uni.navigateTo({
					url:"../team/team"
				})
			},
			toOrder() {
				uni.navigateTo({
					url:"../teamorder/teamorder"
				})
			},
			open(){
				this.$refs.popup.open()
				uni.setClipboardData({
				    data: this.upuser.mobile,
				    success: function () {
						uni.showToast({
							title: '复制成功',
							duration:2000,
							icon:"none"
						})
				    }
				});
			},
			close() {
				this.$refs.popup.close()
			},
			downPic() {
				uni.downloadFile({
					url: this.weixin_pic,
					success: (res) =>{
						if (res.statusCode === 200){
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
						}
					}
				})
			}
		},
		onLoad() {
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/team/index',data,'GET').then(res =>{
					if(res.data.code === 1000){
						this.upuser = res.data.retval.upuser
						this.count_list = res.data.retval.count_list
						this.hasUpuser = res.data.retval.hasUpuser
						this.weixin_pic = res.data.retval.upuser.wxqr
					}else{
						uni.showToast({
							title:res.data.msg,
							icon: "none"
						})
					}
				}
			)
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	// height: 1334rpx;
	// overflow: hidden;
	.rule{
		width: 500rpx;
		margin: 0 auto;
		background: #fff;
		border-radius: 20rpx;
		height: 200rpx;
		padding-top: 40rpx;
		.rule-title{
			// margin-top: 40rpx;
			text-align: center;
			font-weight: bold;
			color: #333;
			font-size: 30rpx;
		}
		.rule-main{
			margin-top: 20rpx;
			text-align: center;
			color: #999;
			font-size: 26rpx;
		}
		.rule-btn{
			text-align: center;
			margin: 40rpx auto;
			width: 150rpx;
			height: 50rpx;
			line-height: 50rpx;
			background: #00ABFA;
			border-radius: 40rpx;
			font-size: 26rpx;
			color: #fff;
		}
	}
	.referrer{
		background: #fff;
		padding: 20rpx 40rpx;
		.myreferrer{
			color: #00ABFA;
			font-size: 26rpx;
			margin-bottom: 20rpx;
		}
		.referrer-card{
			border-top: 1rpx solid #FBFBFB;
			.referrer-card-top{
				margin-top: 20rpx;
				.referrer-card-left{
					image{
						width: 141rpx;
						height: 141rpx;
						border-radius: 50%;
					}
					.referrer-infor{
						font-size: 26rpx;
						color: #333;
						font-weight: bold;
						margin-left: 20rpx;
						.referrer-infor-bottom{
							margin-top: -10rpx;
						}
						view{
							margin-top: 10rpx;
						}
						text{
							font-weight: 100;
							color: #666;
						}
						.infor-nickname{
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							max-width: 300rpx;
						}
						.referer-post{
							font-size: 16rpx;
							color: #00ABFA;
							border: 1rpx solid #00ABFA;
							border-radius: 120rpx;
							// width: 68rpx;
							height: 21rpx;
							padding: 0 2rpx;
							line-height: 21rpx;
							margin-top: 6rpx;
							margin-left: 20rpx;
							text-align: center;
						}
					}
				}
				.referrer-card-right{
					margin-left: 40rpx;
					.referrer-phone{
						margin-left: 20rpx;
						margin-top: 10rpx;
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
					}
				}
			}
			.referrer-card-bottom{
				font-size: 20rpx;
				color: #808080;
				margin-top: 20rpx;
			}
		}
	}
	.team-infor{
		background: #fff;
		margin-top: 20rpx;
		.team-infor-title{
			padding: 20rpx 40rpx;
			color: #00ABFA;
			font-size: 26rpx;
			border-bottom: 1rpx solid #F1F1F1;
		}
		.team-infor-main{
			justify-content: center;
			text-align: center;
			.peo-left{
				margin-right: 60rpx;
				margin-left: 60rpx;
			}
			.peo-right{
			}
			.peo-num{
				font-weight: bold;
				font-size: 36rpx;
				color: #333;
				margin-top: 10rpx;
			}
			.people{
				color: #808080;
				font-size: 20rpx;
				margin-top: 10rpx;
				margin-bottom: 10rpx;
			}
		}
	}
	.myteam-list{
		margin-top: 20rpx;
		background: #fff;
		padding: 0 50rpx;
		justify-content: space-between;
		height: 92rpx;
		vertical-align: middle;
		.list-left{
			// margin-left: 50rpx;
			.list-img{
				width: 51rpx;
				height: 51rpx;
				margin-top: 21rpx;
			}
			view{
				font-size: 26rpx;
				color: #333;
				margin-left: 20rpx;
				font-weight: bold;
				line-height: 92rpx;
			}
		}
		.list-right{
			margin-top: 30rpx;
			width: 17rpx;
			height: 32rpx;
		}
	}
	.popup{
		height: 100%;
		width: 100%;
		// background: #6C6C6C;
		z-index: 999;
		position: absolute;
		top: 0;
		color: #00ABFA;
		font-size: 26rpx;
		.popup-bg{
			opacity: 0.6;
			background: #6C6C6C;
			z-index: 999;
			height: 100%;
		}
		.animation{
			position: relative;
			// animation: pop 3s linear ;
			animation-duration: .2s;
			animation-timing-function: linear;
			animation-iteration-count: 1;
		}
		.animation-name{
			animation-name: pop;
		}
		.animation-cname{
			animation-name: cpop;
		}
		@keyframes pop {
			from {bottom:-180rpx;}
			to {bottom:0rpx}
		}
		@keyframes cpop {
			from {bottom:0rpx;}
			to {bottom:-180rpx}
		}
		.downpic{
			height: 80rpx;
			line-height: 80rpx;
			position: absolute;
			bottom: 100rpx;
			background: #fff;
			text-align: center;
			left: 50rpx;
			border-radius: 120rpx;
			width: 650rpx;
		}
		.cancel{
			height: 80rpx;
			line-height: 80rpx;
			width: 650rpx;
			position: absolute;
			position: absolute;
			bottom: 0;
			background: #fff;
			text-align: center;
			left: 50rpx;
			border-radius: 120rpx;
		}
	}
}
</style>
