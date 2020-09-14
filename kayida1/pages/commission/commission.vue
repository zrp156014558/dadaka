<template>
	<view class="con">
		<view class="com-top">
			<image src="../../static/user/com_top.png" mode=""></image>
			<view class="com-title flex">
				<view class="bank">银行</view>
				<view class="bonus">推广佣金</view>
				<view class="condition">结算条件</view>
				<view class="way">结算方式</view>
				<view class="cycle">结算周期</view>
			</view>
		</view>
		<view class="com-main">
			<view class="blue-bg">
				<view class="purple-bg">
					<view class="white-bg">
						<view class="table">
							<view class="flex row" v-for="(item,index) in com_list" :key="index">
								<view class="name">{{item.name}}</view>
								<view class="bonus">{{item.bonus}}</view>
								<view class="period">{{item.js_term}}</view>
								<view class="term">{{item.js_type}}</view>
								<view class="type">{{item.js_period}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<image class="com-bottom" src="../../static/user/com_bottom.png" mode=""></image>
	</view>
</template>

<script>
	import {
			mapState,
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	
	// var wv
	export default {
		computed: {
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				com_list:''
			}
		},
		methods: {
			
		},
		onLoad() {
			this.request.httpRequest('api/card/typecar','GET').then(res => {
				let str = "%"
				for (var i = 0; i < res.data.retval.length; i++) {
					if(res.data.retval[i].bonus.indexOf(str) != -1){
						res.data.retval[i].bonus = "额度*" + res.data.retval[i].bonus
					}
				}
				this.com_list = res.data.retval
			})
		},
	}
</script>

<style lang="less" scoped>
.con{
	.com-top{
		position: relative;
		height: 360rpx;
		image{
			width: 750rpx;
			height: 360rpx;
		}
		.com-title{
			color: #FEFEFE;
			position: absolute;
			top: 320rpx;
			left: 74rpx;
			font-size: 26rpx;
			font-weight: bold;
			.bank{
				margin-left: 25rpx;
			}
			.bonus{
				margin-left: 60rpx;
			}
			.condition{
				margin-left: 20rpx;
			}
			.way{
				margin-left: 25rpx;
			}
			.cycle{
				margin-left: 25rpx;
			}
		}
	}
	.com-bottom{
		width: 750rpx;
		height: 1000rpx;
		margin-bottom: -10rpx;
	}
	.blue-bg{
		background: #020F31;
		background-image: linear-gradient(to bottom left, #2D0C56, #020F31);
		z-index: 1;
	}
	.purple-bg{
		background: #A731D8;
		background-image: linear-gradient(#A731D8, #0818AB);
		z-index: 2;
		margin-left: 21rpx;
		width: 710rpx;
	}
	.white-bg{
		background: #fff;
		z-index: 3;
		margin-left: 30rpx;
		width: 654rpx;
	}
	.table{
		border-top: 5rpx solid #333;
		width: 660rpx;
		border-spacing: 0;
		border-collapse: collapse;
		font-size: 20rpx;
		font-weight: bold;
		.row{
			display: table;
			height: 70rpx;
			view{
				border-left: 5rpx solid #333;
				border-right: 5rpx solid #333;
				border-bottom: 5rpx solid #333;
				text-align: center;
			}
			.name{
				width: 150rpx;
				display: table-cell;
				vertical-align: middle;
				color: #A831D8;
			}
			.bonus{
				width: 100rpx;
				display: table-cell;
				vertical-align: middle;
			}
			.period{
				width: 130rpx;
				display: table-cell;
				vertical-align: middle;
			}
			.term{
				width: 130rpx;
				display: table-cell;
				vertical-align: middle;
			}
			.type{
				width: 130rpx;
				display: table-cell;
				vertical-align: middle;
			}
		}
	}
}
</style>
