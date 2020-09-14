<template>
	<view class="con">
		<view class="top uploading">
			<view class="uploading-text">上传截图</view>
			<view class="pic-f">
				<image @tap="open" :src="pic" mode="" :class="[pic_m === 0 ? 'screenshot' : 'screenshot-succ']"></image>
			</view>
		</view>
		<view class="explain">
			<view class="explain-text">任务说明</view>
			<rich-text :nodes="task_tips"></rich-text>
		</view>
		<view class="uploading-btn" @tap="uploadingSubmit">提交</view>
		<view class="popup" v-show="popup">
			<view class="popup-bg"></view>
			<view :class="'animation' + ' ' + [popup===1 ? 'animation-name' : 'animation-cname']">
				<view class="downpic" @tap="uploading">从相册获取</view>
				<view class="cancel" @tap="canceldown">取消</view>
			</view>
		</view>
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
				id:'',
				pic:'../../static/main/uploading.png',
				pic_m:0,
				task_tips:'',
				popup:0
			}
		},
		methods: {
			uploading() {
				uni.chooseImage({
					// count: 1, 
					// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					// success: function(res) {
					// 	console.log(JSON.stringify(res.tempFilePaths));
					// 	console.log(res.tempFiles[0].path)
					// 	this.pic_m = 1
					// 	this.pic = JSON.stringify(res.tempFilePaths)
					// 	this.popup = 0
					// }.bind(this)
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths
						this.pic = tempFilePaths[0]
						this.pic_m = 1
						this.popup = 0
					}
				});
			},
			open() {
				this.popup = 1
			},
			canceldown() {
				this.popup = 0
			},
			uploadingSubmit() {
				if(this.pic_m === 0){
					uni.showToast({
						title:"请上传图片",
						icon:'none'
					})
				}else{
					let data = {
						id:this.id,
						task_image:this.pic,
						user_id: this.userInfo.user_id,
						token: this.userInfo.token,
						sign: md5(this.userInfo.user_id+this.userInfo.token)
					}
					this.request.httpRequest('api/task/submit',data,'GET').then(res => {
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					})
				}
			}
		},
		onLoad(option) {
			this.id = option.id
			this.request.httpRequest('api/task/tips','GET').then(res => {
				this.task_tips = res.data.retval.content
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	.uploading{
		padding: 10rpx 40rpx;
		.uploading-text{
			margin-top: 30rpx;
			font-size: 26rpx;
			color: #333;
		}
		.pic-f{
			.screenshot{
				margin-left: 245rpx;
				margin-top: 150rpx;
				width: 180rpx;
				height: 180rpx;
			}
			.screenshot-succ{
				margin-left: 185rpx;
				margin-top: 90rpx;
				width: 300rpx;
				height: 300rpx;
			}
		}
	}
	.explain{
		margin-top: 100rpx;
		margin-bottom: 100rpx;
		.explain-text{
			font-size: 26rpx;
			color: #333;
			margin-bottom: 40rpx;
		}
	}
	.uploading-btn{
		width: 100%;
		font-size: 26rpx;
		color: #fff;
		background: #00ABFA;
		text-align: center;
		height: 88rpx;
		line-height: 88rpx;
		position: fixed;
		bottom: 0;
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
