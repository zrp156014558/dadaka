<template>
	<view class="con">
		<view class="task-nav top flex">
			<view :class="[current === 0 ? 'task-nav-color' : '']" @tap="toLobby">任务大厅</view>
			<view :class="[current === 1 ? 'task-nav-color' : '']" @tap="toSubmit">提交任务</view>
			<view :class="[current === 2 ? 'task-nav-color' : '']" @tap="toRecord">任务记录</view>
		</view>
		<!-- 任务大厅 -->
		<view class="lobby" v-show="current === 0">
			<view class="lobby-title">今日任务</view>
			<view class="lobby-main flex">
				<view class="lobby-main-card" v-for="(item,index) in task_list" :key="index">
					<view class="lobby-card-top">
						<image :src="item.logo" mode=""></image>
						<view class="lobby-card-title">{{item.title}}</view>
						<view class="lobby-title-price">￥{{item.price}}</view>
					</view>
					<view class="get-btn" @tap="getTask(item.task_id,item.title)">领取</view>
				</view>
			</view>
			<view class="task-explain">任务说明</view>
			<rich-text :nodes="task_explain"></rich-text>
		</view>
		<!-- 提交任务 -->
		<view class="submit" v-show="current === 1">
			<view class="submit-main flex">
				<view class="submit-card" v-for="(item,index) in submit_task" :key="index">
					<view class="submit-card-top">
						<image :src="item.logo" mode=""></image>
						<view class="submit-card-title">{{item.title}}</view>
						<view class="submit-title-price">￥{{item.price}}</view>
					</view>
					<view class="submit-btn" @tap="toUploading(item.task_id,item.status)">去完成</view>
				</view>
			</view>
			<view class="none" v-if="none">暂无数据</view>
		</view>
		<!-- 任务记录 -->
		<view class="record" v-show="current === 2">
			<view class="record-main">
				<uni-list>
				    <uni-list-item @tap="toAudit(2)" title="待审核任务"></uni-list-item>
				    <uni-list-item @tap="toAudit(3)" title="已完成任务"></uni-list-item>
				    <uni-list-item @tap="toAudit(4)" title="驳回任务"></uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import {
			mapState
		} from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	
	var wv
	export default {
		components: {uniList,uniListItem},
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				items: ['任务大厅', '提交任务', '任务记录'],
				current: 0,
				task_list:'',
				task_explain:``,
				submit_task:'',
				none:0
			}
		},
		onLoad(){
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/task/index',data,'GET').then(res =>{
				this.task_list = res.data.retval
			})
			this.request.httpRequest('api/task/tips',data,'GET').then(res =>{
				this.task_explain = res.data.retval.content
			})
			let data1 = {
				type:1,
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/taskOrder/index',data1,'GET').then(res =>{
				this.submit_task = res.data.retval
			})
		},
		methods: {
			getTask(id,name){
				uni.navigateTo({
					url:"../gettask/gettask?id="+id+"&name="+name
				})
			},
			toUploading(id,status) {
				if(status === 0){
					uni.navigateTo({
						url:"../uploading/uploading?id="+id
					})
				}else{
					
				}
			},
			toLobby() {
				if(this.current !== 0){
					this.current = 0
				}
			},
			toSubmit() {
				if(this.current !== 1){
					this.current = 1
				}
				let data1 = {
					type:1,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/taskOrder/index',data1,'GET').then(res =>{
					this.submit_task = res.data.retval
					if(this.submit_task.length < 1){
						this.none = 1
					}else{
						this.none = 0
					}
				})
			},
			toRecord() {
				if(this.current !== 2){
					this.current = 2
				}
			},
			toAudit(i) {
				uni.navigateTo({
					url:"../toaudit/toaudit?type="+i
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.con{
		background: #F8F8F8;
	}
	.lobby{
		.lobby-title{
			background: #fff;
			font-size: 26rpx;
			height: 46rpx;
			line-height: 46rpx;
			margin-top: 88rpx;
			padding-left: 40rpx;
		}
		.lobby-main{
			padding: 10rpx;
			justify-content: flex-start;
			flex-wrap: wrap;
			.lobby-main-card{
				text-align: center;
				margin-left: 40rpx;
				margin-bottom: 40rpx;
				.lobby-card-top{
					width: 200rpx;
					height: 215rpx;
					background: #fff;
					image{
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
						margin-top: 16rpx;
					}
					.lobby-card-title{
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
						font-size: 26rpx;
						color: #333;
						margin-top: 10rpx;
					}
					.lobby-title-price{
						font-size: 26rpx;
						color: #00ABFA;
						margin-top: 10rpx;
					}
				}
				.get-btn{
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
			}
		}
		.task-explain{
			background: #fff;
			font-size: 32rpx;
			height: 60rpx;
			line-height: 60rpx;
		}
	}
	.submit{
		background: #F8F8F8;
		height: 100%;
		.none{
			font-size: 30rpx;
			color: ccc;
			line-height: 800rpx;
			height: 800rpx;
			text-align: center;
		}
		.submit-main{
		margin-top: 88rpx;
			padding: 10rpx;
			justify-content: flex-start;
			flex-wrap: wrap;
			.submit-card{
				text-align: center;
				margin-left: 40rpx;
				margin-bottom: 40rpx;
				.submit-card-top{
					width: 200rpx;
					height: 215rpx;
					background: #fff;
					image{
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
						margin-top: 16rpx;
					}
					.submit-card-title{
						font-size: 26rpx;
						color: #333;
						margin-top: 10rpx;
					}
					.submit-title-price{
						font-size: 26rpx;
						color: #00ABFA;
						margin-top: 10rpx;
					}
				}
				.submit-btn{
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
			}
		}
	}
	.record{
		background: #F8F8F8;
		height: 100%;
		.record-main{
			margin-top: 88rpx;
			padding-top: 20rpx;
		}
	}
.task-nav{
	box-shadow: 0 2rpx 2rpx #F8F8F8;
	justify-content: space-around;
	font-size: 24rpx;
	color: #333;
	position: fixed;
	width: 100%;
	height: 66rpx;
	line-height: 66rpx;
	background: #fff;
	z-index: 999;
}
.task-nav-color{
	color: #00ABFA;
	border-bottom: 6rpx solid #00ABFA;
	border-radius: 6rpx;
}
</style>
