<template>
	<view class="con">
		<view class="top account-title">
			<view class="flex account-subt">
				<view v-for="(item,index) in title_list" :key="index" :class="[title === index ? 'title-cl' : '']" @click="toTitle(index)">{{item.name}}</view>
			</view>
		</view>
		<view class="list" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
			<sib-list ref="sibList" @isRefresh='isRefresh' @scrolltolowerFn="scrolltolowerFn" :floterText="d">
				<!-- 内部block可自定义 -->
				<block class="" slot="sibScrollList">
					<view class="account-main">
						<view class="acc-card flex" v-for="(item,index) in credit_card" :key="index">
							<image :src="item.uhead_pic" mode=""></image>
							<view>
								<view class="flex">
									<view class="acc-card-left">
										<view class="unickname">昵称：
											<text>{{item.unickname}}</text>
										</view>
										<view class="unickname">姓名：
											<text>{{item.realname}}</text>
										</view>
									</view>
									<view class="acc-card-right">
										<view class="unickname">级别：
											<text class="level">{{item.level}}</text>
										</view>
										<view class="unickname">已发放(￥)：
											<text class="acc-card-money">{{item.money}}</text>
										</view>
									</view>
								</view>
								<view class="cards unickname">业务：
									<text class="cards-c">{{item.name}}</text>
								</view>
								<view class="cards unickname">通过时间：
									<text>{{item.addtime}}</text>
								</view>
							</view>
						</view>
					</view>
				</block>
			</sib-list>
		</view>
		
	</view>
</template>

<script>
	import {
			mapState,  
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	import sibList from '@/components/sib-list/sib-list.vue'
	
	export default {
		components: {sibList},
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				title:0,
				title_list:'',
				credit_card:'',
				i1:0,
				i2:20,
				d:'',
				h:'',
				type:0
			}
		},
		methods: {
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
			toTitle(index) {
				this.title = index
				this.$refs.sibList.toTopClick()
			},
			isRefresh: function() {
				const _this = this
				let data = {
					type:this.type,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/money/index',data,'GET').then(res => {
					// this.credit_card = res.data.retval
					let list = res.data.retval
					const defaultData = list.slice(0,20)
					_this.credit_card = defaultData
					this.$refs.sibList.endAfter()
				})
			},
			scrolltolowerFn: function() {
				
				const _this = this
				let data = {
					type:this.type,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				if(this.d == '数据加载中...') {
					uni.showLoading({
						title: '加载中...',
						mask: true
					})
					this.request.httpRequest('api/money/index',data,'GET').then(res => {
						let i1 = _this.i1
						let i2 = _this.i2
						let i3 = this.i1++
						i3 = i3 ++
						let i4
						if(i3 != 0) {
							i3 = i3 + 1
							i4 = i2 * i3
						}else {
							i4 = 20
						}
						let list = res.data.retval
						if(res.data.retval.length - this.credit_card.length < 1){
							this.d = '数据加载中...'
						}else{
							this.d = '暂无数据了...'
						}
						// this.credit_card = list.slice(this.i1,this.i2)
						const newData = list.slice(i4,i2 + i4)
						uni.showToast({
							icon: 'success',
							title: '加载成功'
						})
						_this.credit_card = _this.credit_card.concat(newData)
						uni.hideLoading()
					})
				}
				
			}
		},
		watch:{
			title(newval,oldval) {
				this.title = newval
				this.type = this.title_list[newval].type
				let data = {
					type:this.type,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/money/index',data,'GET').then(res => {
					let list = res.data.retval
					if(this.i2 < res.data.retval.length){
						this.d = '数据加载中...'
					}else{
						this.d = '暂无数据了...'
					}
					this.credit_card = list.slice(this.i1,this.i2)
					this.$refs.sibList.toTopClick()
				})
			},
			scroll(newval,oldval) {
			}
		},
		onLoad() {
			let data = {
				type:this.type,
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/money/nav','GET').then(res => {
				this.title_list = res.data.retval
				this.type = this.title_list[0].type
			})
			this.request.httpRequest('api/money/index',data,'GET').then(res => {
				let list = res.data.retval
				if(this.i2 < res.data.retval.length){
					this.d = '数据加载中...'
				}else{
					this.d = '暂无数据了...'
				}
				this.credit_card = list.slice(this.i1,this.i2)
			})
			uni.getSystemInfo({
				success(a) {
					let h = a.screenHeight - 130
					this.h = h + 'px'
				}
			})
		},
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.list{
		// height: 100%;
	}
	.account-title{
		height: 60rpx;
		font-size: 28rpx;
		color: #333;
		line-height: 60rpx;
		overflow-x: scroll;
		position: fixed;
		background: #F7F7F7;
		z-index: 990;
		.account-subt{
			width: 730rpx;
			height: 60rpx;
		}
		view{
			width: 180rpx;
			padding: 0 20rpx;
			white-space: nowrap;
		}
		.title-cl{
			color: #00ABFA;
			border-bottom: 2rpx solid #00ABFA;
		}
	}
	.account-main{
		padding: 10rpx 40rpx;
		margin-top: 200rpx;
		.acc-card{
			background: #fff;
			height: 192rpx;
			margin-top: 40rpx;
			.acc-card-money{
				color: #FFA200;
			}
			text{
				color: #999;
				// font-weight: bold;
			}
			.level{
				font-weight: bold;
			}
			.cards-c{
				color: #EAD35C;
			}
			image{
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
				margin-top: 40rpx;
				margin-left: 20rpx;
			}
			.acc-card-left{
				font-size: 26rpx;
				color: #666;
				margin-left: 40rpx;
				width: 250rpx;
				.unickname{
					margin-top: 10rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
			.acc-card-right{
				font-size: 26rpx;
				color: #999;
				margin-left: 20rpx;
				.unickname{
					margin-top: 10rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
			.cards{
				margin-top: 10rpx;
				font-size: 26rpx;
				color: #999;
				margin-left: 40rpx;
				width: 450rpx;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>
