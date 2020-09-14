<template>
	<view class="con">
		<view class="apply-nav top flex">
			<view :class="[current === index ? 'apply-nav-color' : '']" @tap="toCurrent(index,item.nav_id)" v-for="(item,index) in nav_list" :key="index">{{item.name}}</view>
		</view>
		<view class="flex apply-detail">
			<view class="apply-card" v-for="(item,index) in apply_list" :key="index" @tap="toApplyFor(item.id,item.name)">
				<view class="apply-tag">
					<image @click.stop="open(index)" src="../../static/img/tag.png" mode=""></image>
				</view>
				<view class="card-top">
					<view>
						<image class="apply-img" :src="item.thumb" mode=""></image>
					</view>
					<view class="apply-title mar-t">{{item.name}}</view>
					<view class="apply-applied mar-t">已申请
						<text>{{item.num}}</text>
					</view>
					<view class="apply-close mar-t">{{item.desc}}</view>
					<!-- <view class="apply-commission mar-t">
						{{item.bonus1}}
					</view> -->
					<view class="apply-commission mar-t">
						{{item.credit_line}}
					</view>
				</view>
				<!-- <view class="apply-btn">立即申请</view> -->
				<view class="apply-btn">{{item.bonus1}}</view>
			</view>
			<rich-text style="width: 100%;" :node="content"></rich-text>
		</view>
		<uni-popup  ref="popup" type="center" :maskClick="m">
			<view class="rule">
				<!-- <image src="../../static/img/rule.png" mode=""></image> -->
				<!-- <view class="rule-title">规则提示</view> -->
				<view class="rule-main">
					<view class="trait">
						<!-- 产品特点： -->
						<rich-text :nodes="content"></rich-text>
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
	import {
			mapState, 
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	
	export default {
		components: {tabControl,uniPopup},
		computed: {  
		            ...mapState(['userInfo'])  
		        },
		data() {
			return {
				current: 0,
				m:false,
				apply_list: '',
				content:``,
				nav_list:''
			}
		},
		methods: {
			toCurrent(index,nav_id){
				if(this.current !== index){
					this.current = index
				}
				let data = {
					nav_id:nav_id
				}
				this.request.httpRequest('api/card/index',data,'GET').then(res =>{
					this.apply_list = res.data.retval.list_data
				})
			},
			open(index){
				this.content = this.apply_list[index].rule_tips
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			toApplyFor(id,name) {
				uni.navigateTo({
					url: `../sencondloans/sencondloans?id=${id}&name=${name}`
				});
			}
		},
		onLoad() {
			this.request.httpRequest('api/card/index','GET').then(res =>{
				this.apply_list = res.data.retval.list_data
			})
			this.request.httpRequest('api/card/nav','GET').then(res =>{
				this.nav_list = res.data.retval
			})
		}
	}
</script>

<style lang="less" scoped>
.apply-nav{
	box-shadow: 0 2rpx 2rpx #E8E8E8;
	height: 70rpx;
	justify-content: space-around;
	line-height: 70rpx;
	font-size: 30rpx;
	color: #666;
	font-weight: bold;
	position: fixed;
	background: #F7F7F7;
	width: 100%;
	z-index: 999;
}
.apply-nav-color{
	font-size: 32rpx;
	color: #00ABFA;
}
.con{
	background: #F8F8F8;
}
.apply-detail{
	justify-content: flex-start;
	flex-wrap: wrap;
	margin-top: 88rpx;
}
.apply-card{
	width: 225rpx;
	/* height: 277rpx; */
	margin-left: 20rpx;
	margin-top: 20rpx;
	align-content: center;
	position: relative;
}
.apply-tag image{
	width: 70rpx;
	height: 60rpx;
}
.apply-tag{
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
.apply-img{
	width: 105rpx;
	height: 105rpx;
}
.apply-title{
	font-size: 28rpx;
	font-weight: bold;
	white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.apply-applied{
	font-size: 20rpx;
	color: #6C6C6C;
}
.apply-applied text{
	color: #FFAF30;
}
.apply-close{
	font-size: 20rpx;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.apply-commission{
	font-size: 21rpx;
	color: #FFAF30;
}
.mar-t{
	margin-top: 16rpx;
}
.apply-btn{
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
