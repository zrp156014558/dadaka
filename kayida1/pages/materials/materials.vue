<template>
	<view class="con">
		<view class="top" style="margin-bottom: 100rpx;">
			<view>
				<rich-text :nodes="materials"></rich-text>
			</view>
			<view class="loans-applyfor flex">
				<view class="flex sen-loans-bottom">
					<view class="sen-genera sen" @tap="toPromote">
						<image src="../../static/img/sen_generalize.png" mode=""></image>
						<view>我要推广</view>
					</view>
					<view class="sen-guide sen" @tap="toMaterGuide">
						<image src="../../static/img/guide.png" mode=""></image>
						<view>申请指南</view>
					</view>
				</view>
				<view class="loans-apply-btn">立即申请</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
			mapState,
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	
	var wv
	export default {
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				materials:``,
				pic:'',
				short_url:'',
				code:0
			}
		},
		methods: {
			toPromote() {
				// if(this.code === 0){
					uni.navigateTo({
						url:"../topromote/topromote?pic="+this.pic+"&url="+this.short_url
					})
				// }else{
					
				// }
			},
			toMaterGuide() {
				uni.navigateTo({
					url:"../materguide/materguide"
				})
			}
		},
		onLoad() {
			this.request.httpRequest('api/materials/loadDetail','GET').then(res =>{
				this.materials = res.data.retval.content
			})
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/materials/poster',data,'GET').then(res => {
				if(res.data.code === 1000){
					this.pic = res.data.retval.poster
					this.short_url = res.data.retval.short_url
				}else{
					this.code = 1
				}
			})
		},
	}
</script>

<style lang="less" scoped>
.loans-applyfor{
		z-index: 999;
		background: #fff;
		position: fixed;
		width: 100%;
		height: 100rpx;
		bottom: 0;
		justify-content: space-between;
		text-align: center;
		font-size: 20rpx;
		color: #00ABFA;
		.sen-loans-bottom{
			.sen{
				margin-left: 40rpx;
				margin-top: 20rpx;
			}
		}
		image{
			width: 42rpx;
			height: 39rpx;
		}
	}
	.loans-apply-btn{
		background: #00ABFA;
		color: #fff;
		font-size: 25rpx;
		width: 143rpx;
		height: 46rpx;
		line-height: 46rpx;
		border-radius: 120rpx;
		margin-right: 40rpx;
		margin-top: 26rpx;
		z-index: 999;
	}
</style>
