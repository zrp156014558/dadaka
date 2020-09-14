<template>
    <view class="con">
		<!-- 轮播图 -->
        <view class="carou" >
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" circular="true" indicator-active-color="#fff" indicator-color="#00ABFA" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item v-for="(item,index) in carousel_list" :key="index" @tap="carouselLink(item.name,item.app_link)">
								<view class="swiper-item uni-bg-red">
									<image :src="item.thumb" mode="widthFix"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- 轮播下方图片 -->
			<view class="banner">
				<view v-for="(item,index) in ad_list_show" :key="index">
					<image :src="item.thumb" mode=" aspectFit" @tap="toAdListShow(item.name,item.app_link,item.ad_type)"></image>
				</view>
			</view>
			<view class="ttk">
				<view v-for="(item,index) in tkk_list" :key="index">
					<image :src="item.thumb" mode="scaleToFill" @tap="tkkLink(item.name,item.app_link)"></image>
				</view>
			</view>
			<!-- 功能列表 -->
			<view class="list">
				<view v-for="(item,index) in list" :key="index" class="list-item" @click="jump(item.name)">
					<image :src="'../../static/main/'+item.img+'.png'" mode=""></image>
					<view class="list-font">{{item.text}}</view>
				</view>
			</view>
			<!-- 信息查询 -->
			<view class="infor">
				<view class="infor-text">信息查询</view>
				<view class="infor-img">
					<view v-for="(item,index) in infor_list" :key="index">
						<image @tap="toCredit(item.name,item.app_link,index)" :src="item.thumb" mode=""></image>
					</view>
				</view>
			</view>
			<view class="footer">
				<view v-for="(item,index) in foot_list" :key="index" class="footer-img" @tap="carouselLink(item.name,item.link)">
					<!-- <image :src="item.thumb" mode="scaleToFill"></image> -->
					<image :src="item.thumb" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="popup" v-if="has_msg">
			<view class="popup-bg"></view>
			<view class="rule">
				<image src="../../static/img/kyd.png" mode=""></image>
				<view class="rule-main">
					<view class="rule-title">{{notice_msg.title}}</view>
					<view class="rule-time">发布时间：{{notice_msg.addtime_str}}</view>
					<view class="trait">
						<rich-text :nodes="new_message"></rich-text>
					</view>
				</view>
				<view class="flex rule-btn">
					<view class="rule-next" @tap="nextMess">下一条</view>
					<view class="rule-close" @click="close">我知道了</view>
				</view>
			</view>
		</view>
		<!-- 红包 -->
		<view class="r_bag" v-if="red_packed">
		<!-- <view class="r_bag"> -->
			<image class="bag1" :animation="bag1animation" src="/static/icon/bag1.png" mode="" @click="openrbagbtn()"></image>
		</view>
		
		<!-- 红包封面 -->
		<view class="rbag_model" v-if="rbagmodelshow" @touchmove.prevent.stop>
			<view class="rbag_con hidden">
				<view class="rbag_top">
					<view class="rbag_top_info">
						<!-- <image class="rbag_logo" src="/static/icon/logo.png" mode=""></image> -->
						<view class="app_name">拓新奖励</view>
						<view class="rbag_tips">送您一个红包</view>
					</view>
				</view>
				<view class="open_rbag_btn" :animation="openbrnanimation" @click="openbtn()">開</view>
			</view>
			<view class="rbag_con">
				<view class="hide_btn" @click.stop="hidebtn">
					<icon type="cancel" color="#fbd977" size="28" />
				</view>
			</view>
		</view>
		
		<!-- 打开红包 -->
		<view class="open_rbag_model" v-if="openrbagmodelshow" @touchmove.prevent.stop>
			<image class="rbag_conbg" src="/static/icon/openrbag.png"></image>
			<view class="rbag_conbg open_rbag_con">
				<view class="open_title">— 恭喜您获得 —</view>
				<view class="rbag_detail">
					<view class="open_money">
						<countup :num="num" color="#c95948" width='21' height='34' fontSize='34'></countup>
						<view class="danwei">元</view>
					</view>
					<view class="open_tips">已存入钱包，可直接提现</view>
				</view>
				<view class="lookbag_box">
					<view class="lookbag_btn">
						<!-- <view class="text" @click.stop="lookbagbrn()">查看我的钱包</view> -->
						<!-- <view class="text" @click.stop="lookbagbrn()">团队拓新奖励规则：</view> -->
						<view class="red-title">
							团队拓新奖励规则
						</view>
						<view class="red-main">
							活动期间，每推广一位推卡客晋升，可获得一次抽取红包机会，最高88元，直接到账卡易达钱包！更有最高10%团队管理奖等你来领！
						</view>
					</view>
				</view>
				<view class="hide_btn" @click.stop="hideopenbtn()">
					<icon type="cancel" color="#fbd977" size="28" />
				</view>
			</view>
		</view>
    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'
	import bwSwiper from '@/wxcomponents/bw-swiper/bw-swiper.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import md5 from '../../kayida/common/md5.js'
	import countup from '@/components/countUp.vue';
	
    export default {
        computed: mapState(['forcedLogin', 'hasLogin', 'userName','userInfo','is_bind']),
		components: {bwSwiper,uniPopup,countup},
		data() {
		        return {
					notice:'',
					notice_msg:'',
					new_message:``,
					new_msg:0,
					has_msg:0,
					m:false,
					carousel_list:'',
					ad_list_show:'',
					list:[
						{img:"xyk",text:"信用卡",name:"xy"},
						{img:"xydk",text:"信用贷款",name:"dk"},
						{img:"qyxd",text:"企业信贷",name:"qy"},
						{img:"zclx",text:"注册拉新",name:"zc"},
						{img:"dlsq",text:"代理申请",name:"dl"},
						{img:"kyzs",text:"代理邀请",name:"yq"},
						{img:"rwzx",text:"任务中心",name:"rw"},
						{img:"xtgg",text:"系统公告",name:"xt"},
					],
					infor_list:'',
					foot_list:'',
					tkk_list:'',
					bind:0,
					/**
					* 轮播图设置
					*/
		            background: ['color1', 'color2', 'color3'],
		            indicatorDots: true,
		            autoplay: true,
		            interval: 2000,
		            duration: 500,
					/*
					* 红包部分
					*/
				   red_packed:0,
				   red_id:0,
				   num: 0,
				   bag1animation: {},
				   openbrnanimation: {},
				   rbagmodelshow: false,
				   openrbagmodelshow: false,
		        }
		    },
		methods: {
			carouselLink(name,link) {
				if(link.includes('http')){
					uni.navigateTo({
						url:"../carousellinks/carousellinks?name="+name+"&link="+encodeURIComponent(JSON.stringify(link))
					})
				}else{
					uni.navigateTo({
						url:link
					})
				}
			},
			toAdListShow(name,link,type) {
				if(link.includes('http')){
					uni.navigateTo({
						url:"../carousellinks/carousellinks?name="+name+"&link="+encodeURIComponent(JSON.stringify(link))
					})
				}if(link.includes('id')) {
					var ad_type
					if(type == "loan"){
						ad_type = 0
					}else if(type == "loan2") {
						ad_type = 2
					}else if(type == "loan6") {
						ad_type = 6
					}
					uni.navigateTo({
						url:link +"&name=" + name + "&type=" + ad_type
					})
				}else{
					uni.navigateTo({
						url:link
					})
				}
			},
			nextMess() {
				if(this.new_msg < this.notice.length - 1){
					this.new_msg ++
				}else{
					uni.showToast({
						title:"没有下一条了",
						icon:"none"
					})
					this.has_msg = 0
				}
			},
			toCredit(name,link,index) {
				if(link.includes('http')){
					uni.navigateTo({
						url:"../carousellinks/carousellinks?name="+name+"&link="+link
					})
				}else{
					uni.navigateTo({
						url:link
					})
				}
			},
			tkkLink(name,link) {
				if(link.includes('http')){
					uni.navigateTo({
						url:"../carousellinks/carousellinks?name="+name+"&link="+link
					})
				}else{
					uni.navigateTo({
						url:link
					})
				}
			},
			jump(name) {
				if(name === 'xy'){
					uni.navigateTo({
						url:"../card/card"
					})
				}else if(name === 'dk'){
					uni.navigateTo({
						url:"../loan/loan"
					});
				}else if(name === 'xt'){
					uni.navigateTo({
						url:"../systemnotice/systemnotice"
					})
				}else if(name === 'rw'){
					uni.navigateTo({
						url: "../taskcenter/taskcenter"
					})
				}else if(name === 'qy'){
					uni.navigateTo({
						url: "../loan6/loan6"
					})
				}else if(name=== 'zc'){
					uni.navigateTo({
						url:"../loan2/loan2"
					})
				}else if(name === 'dl'){
					if(this.bind === 1) {
						uni.showToast({
							title:"您已经是推卡客",
							icon:"none"
						})
					}else{
						uni.navigateTo({
							url:"../bind/bind"
						})
					}
				}else if(name === 'yq'){
					if(this.bind === 0) {
						uni.showToast({
							title:"您还不是推卡客，请先晋升推卡客",
							icon:"none"
						})
						setTimeout(function() {
							uni.navigateTo({
								url:"../realname/realname"
							})
						},300)
					}else {
						uni.navigateTo({
							url:"../become/become"
						})
					}
				}
			},
			close() {
				this.has_msg = 0
				let data = {
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/index/readNotice',data,'GET').then(res => {
				})
			},
			// 侧边红包 => 动画
			imageanimation: function() {
				var that = this;
				var next = true;
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})
				that.bag1animation = animation
				setInterval(function() {
					if (next) {
						animation.rotate(36).step();
						next = !next;
					} else {
						animation.rotate(6).step();
						next = !next;
					}
					that.bag1animation = animation.export()
				}, 1100)
			},
			// 侧边红包 => 点击
			openrbagbtn: function() {
				let data = {
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				} 
				this.request.httpRequest('api/apply/redpacket',data,'GET').then(res => {
					if(res.data.code == 1000) {
						this.num = res.data.retval.red_money[0]
						this.red_id = res.data.retval.red_id[0]
						this.rbagmodelshow = true;
					}else {
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
				})
			},
			
			// 红包封面 => 关闭按钮
			hidebtn: function() {
				this.rbagmodelshow = false;
			},
			// 红包封面 => 開红包按钮
			openbtn: function() {
				var that = this;
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})
				that.openbrnanimation = animation;
				// animation.rotate3d(0,1,0,360).step();
				animation.rotateY(360).step();
				that.openbrnanimation = animation.export();
				setTimeout(function() {
					that.rbagmodelshow = false;
					that.openrbagmodelshow = true;
					that.openbrnanimation = {};
				}, 1000);
				let data = {
					red_id:this.red_id,
					user_id: this.userInfo.user_id,
					token: this.userInfo.token,
					sign: md5(this.userInfo.user_id+this.userInfo.token)
				}
				this.request.httpRequest('api/apply/changered',data,'GET').then(res => {					if(res.data.code == 1000) {
						let data1 = {
							user_id: this.userInfo.user_id,
							token: this.userInfo.token,
							sign: md5(this.userInfo.user_id+this.userInfo.token)
						}
						this.request.httpRequest('api/user/index',data1,'GET').then(res => {
							if(res.data.retval.red_packed_num < 1) {
								this.red_packed = 0
							}else {
								this.red_packed = 1
							}
						})
					}else {
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
				})
			},
			
			// 打开红包  => 关闭按钮
			hideopenbtn: function() {
				this.openrbagmodelshow = false;
			},
			// 打开红包  => 查看钱包
			lookbagbrn: function() {
			
			}
		},
		watch:{
			new_msg(newval,oldval) {
				this.notice_msg = this.notice[newval]
				this.new_message = this.notice[newval].message
			}
		},
        onLoad() {
			this.imageanimation();
			// uni.getLocation({
			//     type: 'wgs84',
			// 	geocode:true,
			//     success: function (res) {
			//         console.log('当前位置的经度：' + res.longitude);
			//         console.log('当前位置的纬度：' + res.latitude);
			// 		console.log(res.address)
			//     }
			// });
			if(this.forcedLogin){
				uni.reLaunch({
					url:"../login/login"
				})
			}
			var data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			} 
			this.request.httpRequest('api/user/index',data,'GET').then(res => {
				this.bind = res.data.retval.is_bind
				if(res.data.retval.red_packed_num < 1) {
					this.red_packed = 0
				}else {
					this.red_packed = 1
				}
			})
			this.request.httpRequest('api/index/index','GET').then(res => {
				if(res.data.code == 1400){
				}else if(res.data.code == 1000) {
					// 轮播图
					this.carousel_list = res.data.retval.ad_list
					// 轮播下方图片
					this.ad_list_show = res.data.retval.ad_list_show
					this.tkk_list = res.data.retval.ad_list_page
					// 信息查询图
					this.infor_list = res.data.retval.ad_list_info
					// 最下方图片
					this.foot_list = res.data.retval.ad_list_active
				}
				
			})
			this.request.httpRequest('api/index/notice',data,'GET').then(res => {
				if(res.data.code === 1000){
					// 判断是否有新公告
					if(res.data.retval.new_msg.length<1){
						this.has_msg = 0
					}else{
						this.has_msg = 1
						this.notice = res.data.retval.new_msg
						this.notice_msg = this.notice[this.new_msg]
						this.new_message = this.notice[this.new_msg].message
					}
				}else if (res.data.code == 1400) {
				}
			})
        },
		onReady() {
			// 判断是否有新公告需要弹窗
			if(this.notice.length<1){
				
			}else{
				this.has_msg = 1
			}
		},
		onShow() {
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			} 
			this.request.httpRequest('api/index/notice',data,'GET').then(res => {
				if (res.data.code == 1400) {
						uni.showToast({
							title:"登录失效，请重新登录",
							icon:"none"
						})
						uni.reLaunch({
							url:"../login/login"
						})
				}
			})
		}
    }
</script>

<style lang="scss" scoped>
	@import 'scss/red_bag.scss';
.carou{
}
.swiper{
	height: 350rpx;
}
.uni-padding-wrap image{
	width: 100%;
	// height: 320rpx;
}
.banner{
	display: flex;
	justify-content: space-between;
	height: 100rpx;
}
.banner image{
	width: 200rpx;
	height: 100rpx;
	border-radius: 20rpx;
}
.list{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.list-item{
	margin-top: 46rpx;
	width: 150rpx;
	text-align: center;
}
.list-font{
	font-size: 26rpx;
}
.list image{
	width: 80rpx;
	height: 80rpx;
}
.ttk{
	/* height: 100rpx; */
}
.ttk image{
	width: 100%;
	height: 100rpx;
	border-radius: 20rpx;
	margin-top: 40rpx;
}
.infor-text{
	font-size: 28rpx;
	margin-top: 40rpx;
	margin-bottom: 30rpx;
	font-weight: bold;
}
.infor-img{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.infor-img image{
	width: 320rpx;
	height: 200rpx;
	border-radius: 20rpx;
	margin-bottom: 20rpx;
}
.footer-img{
	margin-bottom: 20rpx;
}
.footer-img image{
	// height: 300rpx;
	width: 100%;
	border-radius: 20rpx;
}
.popup{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	z-index: 999;
	.popup-bg{
		background: #8F8F94;
		height: 100%;
		z-index: 999;
		opacity: 0.5;
	}
}
.rule{
	position: absolute;
	width: 550rpx;
	// height: 426rpx;
	text-align: center;
	background: #fff;
	border-radius: 20rpx;
	padding-bottom: 40rpx;
	top: 300rpx;
	left: 100rpx;
	z-index: 1001;
	image{
		width: 100%;
		height: 171rpx;
	}
	.rule-main{
		overflow:auto;
		padding: 34rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #333;
		min-height: 200rpx;
		max-height: 600rpx;
		border-bottom: 1rpx solid #F4F4F4;
		.rule-title{
			font-size: 30rpx;
			font-weight: bold;
		}
		.rule-time{
			font-size: 24rpx;
			color: #808080;
			font-weight: 100;
		}
		.trait{
			margin-top: 20rpx;
		}
		text{
			font-weight: 100;
		}
	}
	.rule-btn{
		justify-content: space-around;
		font-size: 30rpx;
		color: #fff;
		text-align: center;
		margin-top: 40rpx;
		.rule-next{
			padding: 10rpx 30rpx;
			background: #00ABFA;
			border-radius: 120rpx;
		}
		.rule-close{
			padding: 10rpx 30rpx;
			background: #00ABFA;
			border-radius: 120rpx;
		}
	}
}
</style>
