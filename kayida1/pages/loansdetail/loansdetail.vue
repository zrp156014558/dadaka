<template>
	<view class="con">
		<view class="top">
			<rich-text :nodes="content"></rich-text>
		</view>
		<view class="loans-applyfor flex">
			<view class="flex sen-loans-bottom">
				<view class="sen-genera sen" @tap="toPromote()">
					<image src="../../static/img/sen_generalize.png" mode=""></image>
					<view>我要推广</view>
				</view>
				<view class="sen-guide sen" @tap="loadDetail(id)">
					<image src="../../static/img/guide.png" mode=""></image>
					<view>申请指南</view>
				</view>
			</view>
			<view class="loans-apply-btn" @tap="toApply(id)">立即申请</view>
		</view>
	</view>
</template>

<script>
	import {
			mapState,  
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	var wv; //计划创建的webview
	export default {
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				poster: '',
				name: '',
				id: '',
				content:``,
				pic:'',
				short_url:'',
				type:'',
				loan_type:'loan',
				describe:''
			}
		},
		methods: {
			toPromote() {
				let type = 'loan'
				uni.navigateTo({
					url:"../topromote/topromote?id="+this.id+"&type="+this.loan_type+"&loan="+this.type
				})
			},
			loadDetail(id) {
				uni.navigateTo({
					url:"../guide/guide?id="+id+"&type="+this.type
				})
			},
			toApply(id) {
				uni.navigateTo({
					url:"../onapplication/onapplication?id="+id+"&type="+this.loan_type+"&loan="+this.type
				})
			},
		},
		onLoad(option) {
			this.id = option.id
			let data = {
				id: option.id,
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			let type = option.type
			this.type = option.type
			if(option.type == 0){
				this.request.httpRequest('api/loan/loadDetail',data,'GET').then(res => {
					this.poster = res.data.retval
					this.name = res.data.retval.name
					this.content = res.data.retval.content
					this.type = res.data.retval.loan_type
					uni.setNavigationBarTitle({
						title:this.name
					})
				})
				this.request.httpRequest('api/loan/poster',data,'GET').then(res => {
					this.pic = res.data.retval.poster
					this.short_url = res.data.retval.short_url
					this.describe = res.data.retval.describe
				})
			}else{
				this.request.httpRequest(`api/loan${type}/loadDetail`,data,'GET').then(res => {
					console.log(res.data)
					this.poster = res.data.retval
					this.name = res.data.retval.name
					this.content = res.data.retval.content
					this.type = res.data.retval.loan_type
					uni.setNavigationBarTitle({
						title:this.name
					})
				})
				this.request.httpRequest(`api/loan${type}/poster`,data,'GET').then(res => {
					this.pic = res.data.retval.poster
					this.short_url = res.data.retval.short_url
					this.describe = res.data.retval.describe
				})
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.name
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F8F8F8;
	.top{
		margin-bottom: 100rpx;
		image{
			width: 750rpx;
			height: 1300rpx;
			margin-bottom: 100rpx;
		}
	}
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
}
</style>
