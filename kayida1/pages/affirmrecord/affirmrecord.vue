<template>
	<view class="con">
		<view class="main top">
			<view class="no-record" v-if="noRecord">暂无记录</view>
			<view class="record-card flex" v-for="(item,index) in record_list" :key="index">
				<view class="card-left">
					<view class="withdraw">
						提现到{{item.bank_name}}：
						<text class="status">{{item.status}}</text>
					</view>
					<view class="time">
						{{item.add_time}}
					</view>
				</view>
				<view class="sum">
					-
					<text>{{item.money}}</text>
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
				record_list:'',
				noRecord:0
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
			this.request.httpRequest('api/withdrawal/history',data,'GET').then(res =>{
				this.record_list = res.data.retval
				if(this.record_list < 1){
					this.noRecord = 1
				}else{
					this.noRecord = 0
				}
				for(let i=0;i<this.record_list.length;i++){
					var time = new Date(res.data.retval[i].add_time*1000)
					var year = time.getFullYear()
					var month = time.getMonth()+1
					if(month < 10){
						month = '0'+month
					}
					var date = time.getDate()
					if(date < 10){
						date = '0'+date
					}
					var hours = time.getHours()
					if(hours < 10){
						hours = '0'+hours
					}
					var minute = time.getMinutes()
					if(minute < 10){
						minute = '0'+minute
					}
					this.record_list[i].add_time = year + "." + month + "." + date + " " + hours + ":" + minute
					if(res.data.retval[i].status == 1){
						this.record_list[i].status = "申请中"
					}else if(res.data.retval[i].status == 2){
						this.record_list[i].status = "成功"
					}else if(res.data.retval[i].status == 3){
						this.record_list[i].status = "审核不通过"
					}else if(res.data.retval[i].status == 4){
						this.record_list[i].status = "提现失败"
					}
				}
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.main{
		padding: 20rpx 40rpx;
		.no-record{
			font-size: 40rpx;
			color: #999999;
			text-align: center;
			margin-top: 100rpx;
			font-weight: bold;
		}
		.record-card{
			width: 630rpx;
			height: 78rpx;
			background: #fff;
			padding: 20rpx;
			justify-content: space-between;
			margin-bottom: 20rpx;
			.card-left{
				.withdraw{
					font-size: 26rpx;
					color: #333333;
					text{
						color: #00ABFA;
					}
				}
				.time{
					font-size: 24rpx;
					margin-top: 10rpx;
					color: #808080;
				}
			}
			.sum{
				line-height: 78rpx;
				font-size: 30rpx;
				color: #333;
			}
		}
	}
}
</style>
