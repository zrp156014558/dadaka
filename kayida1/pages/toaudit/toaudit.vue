<template>
	<view class="con">
		<view class="audit flex">
			<view class="audit-card" v-for="(item,index) in audit_list" :key="index">
				<view class="audit-card-top">
					<image :src="item.logo" mode=""></image>
					<view class="audit-card-title">{{item.title}}</view>
					<view class="audit-title-price">￥{{item.price}}</view>
				</view>
				<view class="audit-btn" v-if="type == 2">审核中</view>
				<view class="audit-btn1" v-else-if="type == 3">已完成</view>
				<view class="audit-btn2" v-else-if="type == 4">截图异常</view>
			</view>
		</view>
		<view class="none" v-if="none">暂无数据</view>
	</view>
</template>

<script>
	import {
			mapState
		} from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	
	export default {
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				audit_list:'',
				type:0,
				none:0
			}
		},
		methods: {
			
		},
		onLoad(option) {
			this.type = option.type
			let data = {
				// page: 1,
				type: option.type,
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/taskOrder/index',data,'GET').then(res=>{
				if(res.data.code === 1000){
					this.audit_list = res.data.retval
					if(this.audit_list.length < 1){
						this.none = 1
					}else{
						this.none = 0
					}
				}else{
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
				}
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F8F8F8;
	.none{
		font-size: 30rpx;
		color: ccc;
		line-height: 800rpx;
		height: 800rpx;
		text-align: center;
	}
	.audit{
		margin-top: 40rpx;
		justify-content: flex-start;
		flex-wrap: wrap;
			.audit-card{
				text-align: center;
				margin-left: 40rpx;
				margin-bottom: 40rpx;
				.audit-card-top{
					width: 200rpx;
					height: 215rpx;
					background: #fff;
					image{
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
						margin-top: 16rpx;
					}
					.audit-card-title{
						font-size: 26rpx;
						color: #333;
						margin-top: 10rpx;
					}
					.audit-title-price{
						font-size: 26rpx;
						color: #00ABFA;
						margin-top: 10rpx;
					}
				}
				
			}
	}
	.audit-btn{
		width: 150rpx;
		height: 46rpx;
		line-height: 46rpx;
		background: #00ABFA;
		color: #fff;
		border-radius: 120rpx;
		font-size: 26rpx;
		margin-top: 20rpx;
		margin-left: 25rpx;
	}
	.audit-btn1{
		width: 150rpx;
		height: 46rpx;
		line-height: 46rpx;
		background: #fff;
		border: 1rpx solid #00ABFA;
		color: #00ABFA;
		border-radius: 120rpx;
		font-size: 26rpx;
		margin-top: 20rpx;
		margin-left: 25rpx;
	}
	.audit-btn2{
		width: 150rpx;
		height: 46rpx;
		line-height: 46rpx;
		background: #FD2D2D;
		color: #fff;
		border-radius: 120rpx;
		font-size: 26rpx;
		margin-top: 20rpx;
		margin-left: 25rpx;
	}
}
</style>
