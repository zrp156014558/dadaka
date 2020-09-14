<template>
	<view class="con">
		<view class="team-main top">
			<view>
				<scroll-view scroll-y="true" :scroll-top="scrollTop" @scrolltolower="lower" lower-threshold="50" v-bind:style="[{height: Height}]">
					<view class="team-card flex" v-for="(item,index) in team_list" :key="index">
						<image :src="item.head_pic" mode=""></image>
						<view class="flex">
							<view class="team-member">
								<view>用户昵称:{{item.nickname}}</view>
								<view>联系方式:{{item.mobile}}</view>
								<view class="mem-level">{{item.level_tag}}</view>
							</view>
							<!-- <view class="team-btn">
								<view @click="toteam(item.user_id)">他的团队</view>
								<view @click="torecord(item.user_id)">申请记录</view>
							</view> -->
						</view>
					</view>
				</scroll-view>
			</view>
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
				team_list:'',
				page:1,
				Height:0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				i1:0,
				i2:20,
				n:0
			}
		},
		methods: {
			lower(e) {
				this.page = this.page + 1
				let data = {
					user_id: this.userInfo.user_id,
					pageNo:this.page,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/underline/index',data,'GET').then(res => {
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
							this.team_list = this.team_list.concat(list)
							uni.hideLoading()
					}
				})
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success:(res) => {
					this.Height = res.screenHeight - 44 +'px'
				}
			})
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/underline/index',data,'GET').then(res => {
				if(res.data.code === 1000) {
					this.team_list = res.data.retval
					if(this.team_list.length < 1) {
						this.n = 1
					}
					else{
						this.n = 0
					}
				}else {
					uni.showToast({
						title:"加载失败",
						icon:"none"
					})
				}
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.team-main{
		padding: 10rpx 40rpx;
		.team-card{
			margin-top: 30rpx;
			background: #fff;
			border-radius: 10rpx;
			// height: 192rpx;
			image{
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				margin-left: 20rpx;
				margin-top: 26rpx;
			}
			.flex{
				justify-content: space-between;
				width: 500rpx;
			}
			.team-member{
				font-size: 28rpx;
				color: #333;
				margin-left: 20rpx;
				view{
					margin-top: 20rpx;
				}
				.mem-level{
					color: #00ABFA;
					margin-bottom: 20rpx;
				}
			}
			.team-btn{
				margin-left: 20rpx;
				view{
					width: 164rpx;
					height: 66rpx;
					line-height: 66rpx;
					background: #00ABFA;
					color: #fff;
					margin-top: 20rpx;
					font-size: 26rpx;
					border-radius: 20rpx;
					text-align: center;
				}
			}
		}
	}
}
</style>
