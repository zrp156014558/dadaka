<template>
	<view class="con">
			<image class="award-bg top" src="../../static/user/teamaward_bg.png" mode=""></image>
		<view class="award-main">
			<view class="award-top">
				<image src="../../static/user/team_development.png" mode=""></image>
				<view class="flex ">
					<view class="award-top-card fml">
						<view class="award-top-de">
							<text>{{team_count}}</text>
							(名)
						</view>
						<view class="award-top-mem">总推荐推卡客</view>
					</view>
					<view class="award-top-card ml">
						<view class="award-top-de">
							<text>{{apply_count}}</text>
							(名)
						</view>
						<view class="award-top-mem">完成首单推卡客</view>
					</view>
					<view class="award-top-card ml">
						<view class="award-top-de">
							<text>{{apply_count}}</text>
							(名)
						</view>
						<view class="award-top-mem">已生效推卡客</view>
					</view>
					
				</view>
				<view class="flex f-bottom">
					<view class="award-top-card fml">
						<view class="award-top-de">
							<text>{{money}}</text>
							(元)
						</view>
						<view class="award-top-mem">已获得拓新奖金</view>
					</view>
					<view class="award-top-card ml">
						<view class="award-top-de">
							<text>{{need}}</text>
							(名)
						</view>
						<view class="award-top-mem">距离下次奖励还需</view>
					</view>
				</view>
				<view class="award-guide">
					<view>拓展新推卡客奖励规则：</view>
					<view>已生效推卡客：注册推卡客并完成首单</view>
					<view>直属团队内每{{ring_num}}个新的推卡客完成首单业绩，奖励{{ring_money}}元</view>
				</view>
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
				team_count:'',
				apply_count:'',
				money:'',
				need:'',
				ring_num:'',
				ring_money:'',
				lists:'',
				max:'',
				team_money:'',
				e_mondy:''
			}
		},
		methods: {
			
		},
		onLoad() {
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/user/reward',data,'GET').then(res => {
				this.team_count = JSON.stringify(res.data.retval.reward1.team_count)
				this.apply_count = JSON.stringify(res.data.retval.reward1.apply_count)
				this.money = res.data.retval.reward1.money
				this.need = JSON.stringify(res.data.retval.reward1.need)
				this.ring_num = res.data.retval.reward1.ring_num
				this.ring_money = res.data.retval.reward1.ring_money
				this.lists = res.data.retval.reward2.lists
				this.max = res.data.retval.reward2.max
				this.team_money = JSON.stringify(res.data.retval.reward2.team_money)
				this.e_mondy = JSON.stringify(res.data.retval.reward2.e_mondy)
			})
		},
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
		.award-bg{
			// margin-left: -40rpx;
			width: 750rpx;
			height: 602rpx;
			overflow: hidden;
		}
	.award-main{
		padding: 10rpx 40rpx;
		background: #5F78CE;
		margin-top: -106rpx;
		height: 100%;
		.award-top{
			position: relative;
			margin-top: 120rpx;
			background: #fff;
			padding-top: 20rpx;
			height: 450rpx;
			border-radius: 20rpx;
			image{
				width: 371rpx;
				height: 70rpx;
				position: absolute;
				left: 150rpx;
				top: -40rpx;
			}
			.flex{
				justify-content: flex-start;
				flex-wrap: wrap;
				.award-top-card{
					margin-top: 40rpx;
					text-align: center;
					.award-top-de{
						font-size: 20rpx;
						color: #333;
						font-weight: bold;
						text{
							font-size: 36rpx;
							color: #1958C2
						}
					}
					.award-top-mem{
						color: #4D4D4D;
						font-size: 26rpx;
						margin-top: 20rpx;
					}
				}
			}
			.f-bottom{
				justify-content: space-around;
			}
			.award-guide{
				margin-top: 20rpx;
				border-top: 2rpx solid #F5F5F5;
				font-size: 20rpx;
				color: #333;
				padding: 10rpx 20rpx;
			}
		}
		.award-bottom{
			position: relative;
			margin-top: 60rpx;
			background: #fff;
			padding-top: 20rpx;
			height: 750rpx;
			border-radius: 20rpx;
			margin-bottom: 30rpx;
			image{
				width: 371rpx;
				height: 70rpx;
				position: absolute;
				left: 150rpx;
				top: -40rpx;
			}
			.award-bottom-perfor{
				justify-content: space-around;
				.award-bottom-card{
					margin-top: 40rpx;
					text-align: center;
					.award-bottom-de{
						font-size: 20rpx;
						color: #333;
						text{
							font-size: 36rpx;
							color: #1958C2;
						}
					}
					.award-bottom-earnings{
						font-size: 26rpx;
						color: #4d4d4d;
						margin-top: 20rpx;
					}
				}
			}
			.award-bottom-guide{
				margin-top: 20rpx;
				border-top: 2rpx solid #f5f5f5;
				font-size: 24rpx;
				color: #333;
				text-align: center;
				.flex{
					justify-content: space-around;
					margin-top: 10rpx;
					view{
						width: 180rpx;
					}
				}
			}
			.award-bottom-perforcal{
				border-top: 2rpx solid #f5f5f5;
				margin-top: 10rpx;
				font-size: 20rpx;
				color: #333;
				padding-top: 10rpx;
				padding-left: 10rpx;
			}
		}
	}
	.ml{
		margin-left: 60rpx;
	}
	.fml{
		margin-left: 30rpx;
	}
}
</style>
