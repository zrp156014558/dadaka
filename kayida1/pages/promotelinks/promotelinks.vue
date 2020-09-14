<template>
	<view class="con">
		<view class="information">
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
	</view>
</template>

<script>
	import {
			mapState,
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	const MockData = require('@/static/easy-loadimage/mock-data.json')
	
	var wv
	export default {
		components: {easyLoadimage},
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				infor_title:'',
				infor_card:'',
				infor_current:0,
				scrollTop:0,
				old:{
					scrollTop:0
				},
				list:MockData
			}
		},
		methods: {
			toInforC(index) {
				if(this.infor_current !== index){
					this.infor_current = index
				}
			},
			toNewsDetail(index) {
				uni.navigateTo({
					url:"../newsdetail/newsdetail?index="+index+"&infor="+this.infor_current
				})
			},
		},
		onPageScroll({scrollTop}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
		},
		watch:{
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
		onLoad() {
			this.request.httpRequest('api/newsnav/index','GET').then(res =>{
				if(res.data.code === 1000){
					this.infor_title = res.data.retval.nav
				}
			});
			let data = {
				nav_id:0,
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/news/index',data,'GET').then(res =>{
				if(res.data.code === 1000){
					this.infor_card = res.data.retval
				}
			});
		},
	}
</script>

<style lang="less" scoped>
.con{
	background: #EEEEEE;
	.information{
		background: #F7F7F7;
		// margin-top: 88rpx;
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
}
</style>
