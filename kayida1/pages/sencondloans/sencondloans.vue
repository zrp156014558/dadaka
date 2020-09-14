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
				describe:'',
				code:'',
				page_skip_status:0,
				progress_link:''
			}
		},
		methods: {
			toPromote() {
				let type = 'apply'
				uni.navigateTo({
					// url:"../topromote/topromote?pic="+this.pic+"&url="+this.short_url+"&describe="+this.describe
					url:"../topromote/topromote?id="+this.id+"&type="+type
				})
			},
			loadDetail(id) {
				let type = 'card'
				uni.navigateTo({
					url:"../guide/guide?id="+id+"&type="+type
				})
			},
			toApply(id) {
				let type = 'apply'
				if(this.page_skip_status) {
					uni.redirectTo({
						url:"../applycard/applycard?url="+encodeURIComponent(JSON.stringify(this.progress_link))
					})
				}else {
					uni.navigateTo({
						url:"../onapplication/onapplication?id="+id+"&type="+type+"&code="+this.code
					})
				}
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
			this.request.httpRequest('api/card/loadDetail',data,'GET').then(res => {
				this.page_skip_status = res.data.retval.page_skip_status
				this.progress_link = res.data.retval.progress_link
				this.poster = res.data.retval
				this.name = res.data.retval.name
				this.content = res.data.retval.content
				this.code = res.data.retval.query_code
				uni.setNavigationBarTitle({
					title:this.name
				})
			})
			this.request.httpRequest('api/card/poster',data,'GET').then(res => {
				this.pic = res.data.retval.poster
				this.short_url = res.data.retval.short_url
				this.describe = res.data.retval.describe
			})
		},
	}
</script>

<style lang="less" scoped>
.con{
	background: #F8F8F8;
	.top{
		image{
			width: 750rpx;
			height: 1300rpx;
			margin-bottom: 100rpx;
		}
		rich-text{
			margin-bottom: 160rpx;
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
