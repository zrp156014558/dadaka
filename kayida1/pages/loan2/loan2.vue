<template>
	<view class="con">
		<view class="flex loans-detail top">
			<view class="loans-card" v-for="(item,index) in loans_list" :key="index" @tap="toDetail(item.id,item.loan_type)">
				<view class="loans-tag">
					<image @click.stop="open(index)" src="../../static/img/tag.png" mode=""></image>
				</view>
				<view class="card-top">
					<view>
						<image class="loans-img" :src="item.thumb" mode=""></image>
					</view>
					<view class="loans-title mar-t">{{item.name}}</view>
					<view class="loans-way mar-t">
						{{item.desc}}
					</view>
					<view class="loans-interest mar-t">{{item.unit}}
						<text>{{item.spend}}</text>
					</view>
					<view class="loans-commission mar-t">
						{{item.credit_line}}
					</view>
				</view>
				<view class="loans-btn">{{item.bonus1}}</view>
			</view>
		</view>
		<uni-popup  ref="popup" type="center" :maskClick="m">
			<view class="rule">
				<view class="rule-main">
					<view class="trait">
						<!-- 产品特点： -->
						<!-- <text>{{condition}}</text> -->
						<rich-text :nodes="condition"></rich-text>
					</view>
				</view>
				<view class="rule-btn" @click="close">
					我知道了
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	
	export default {
		components: {tabControl,uniPopup},
		data() {
			return {
				current: 0,
				m:false,
				loans_list:'',
				condition:''
			}
		},
		methods: {
			toDetail(id,type) {
				uni.navigateTo({
					url:"../loansdetail/loansdetail?id="+id+"&type="+type
				})
			},
			open(index){
				this.$refs.popup.open()
				this.condition = this.loans_list[index].rule_tips
			},
			close(){
				this.$refs.popup.close()
			}
		},
		onLoad() {
			this.request.httpRequest('api/loan2/index','GET').then(res => {
				this.loans_list = res.data.retval.list_data
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F8F8F8;
}
.loans-detail{
	justify-content: flex-start;
	flex-wrap: wrap;
}
.loans-card{
	width: 225rpx;
	margin-left: 20rpx;
	margin-top: 20rpx;
	align-content: center;
	position: relative;
}
.loans-tag image{
	width: 70rpx;
	height: 60rpx;
}
.loans-tag{
	font-size: 12rpx;
	position: absolute;
	top: ;
	left: 166rpx;
}
.card-top{
	background: #fff;
	text-align: center;
	height: 325rpx;
	box-shadow: 2rpx 5rpx 5rpx #E5E5E5;
	border-radius: 20rpx;
}
.loans-img{
	width: 105rpx;
	height: 105rpx;
}
.loans-title{
	font-size: 28rpx;
	font-weight: bold;
}
.loans-way{
	font-size: 18rpx;
	color: #FFAF30;
}
.loans-interest{
	font-size: 18rpx;
}
.loans-interest text{
	color: #FFAF30;
}
.loans-commission{
	font-size: 18rpx;
	color: #FFAF30;
}
.mar-t{
	margin-top: 16rpx;
}
.loans-btn{
	font-size: 21rpx;
	color: #fff;
	width: 101%;
	height: 44rpx;
	background: #00ABFA;
	border-bottom-right-radius: 12rpx;
	border-bottom-left-radius: 12rpx;
	text-align: center;
	line-height: 44rpx;
	margin-bottom: 20rpx;
	margin-top: -14rpx;
}
.rule{
	position: relative;
	width: 522rpx;
	// height: 426rpx;
	text-align: center;
	background: #fff;
	border-radius: 20rpx;
	padding: 34rpx;
	image{
		width: 124rpx;
		height: 124rpx;
		position: absolute;
		top: -60rpx;
		left: 233rpx;
	}
	.rule-title{
		font-size: 30rpx;
		margin-top: 40rpx;
		font-weight: bold;
	}
	.rule-main{
		overflow:auto;
		font-size: 26rpx;
		font-weight: bold;
		color: #333;
		min-height: 200rpx;
		max-height: 600rpx;
		.trait{
			margin-top: 20rpx;
		}
		text{
			font-weight: 100;
		}
	}
	.rule-btn{
		width: 400rpx;
		height: 88rpx;
		background: #00ABFA;
		border-radius: 120rpx;
		font-size: 30rpx;
		color: #fff;
		text-align: center;
		line-height: 88rpx;
		margin-top: 40rpx;
		margin-left: 70rpx;
	}
}
</style>
