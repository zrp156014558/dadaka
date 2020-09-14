<template>
    <view class="con">
        <view class="title" :style="{backgroundImage:`url(${indexBackgroundImage})`}">
        <!-- <view class="title"> -->
            <view class="ava flex">
				<image class="ava-img" :src="user_message.head_pic" mode="" @tap="toInformation"></image>
				<view class="ava-right">
					<view class="flex ava-post">
						<view class="user-uname">{{user_message.nickname}}</view>
					</view>
					<view class="flex">
						<view class="recom">
							推荐码: {{user_message.recode}}
						</view>
						<view class="flex" style="height: 40rpx;margin-top: 10rpx;">
							<view class="flex member" @tap="open">
								<image class="kyd" src="../../static/user/kyd.png" mode=""></image>
								<text class="tkk-font">{{user_message.level_tag}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
        </view>
		<view class="dep-card">
			<view class="dep flex">
				<view class="can-dep">
					<view>可提现金额(元)</view>
					<view class="flex mar-t">
						<text class="f f-c">{{user_message.user_money}}</text>
						<view class="dep-btn" @click="toWithDrawal()">提现</view>
					</view>
				</view>
				<view class="total-dep">
					<view>收益总额(元)</view>
					<view class="mar-t f-c">{{user_message.total_money}}</view>
				</view>
				<view class="alr-dep">
					<view>已提现金额(元)</view>
					<view class="mar-t f-c">{{user_message.frozen_money}}</view>
				</view>
			</view>
			<view class="flex team-details">
				<view class="myteam team-btn" @tap="toMyTeam">我的团队</view>
				<view class="team-award team-btn" @tap="toTeamAward">活动奖励</view>
			</view>
		</view>
		<view class="team-awa">
			<view class="flex team-awa-top">
				<view class="awa-left">团队管理奖</view>
				<view class="awa-right" @tap="openGuide">查看规则</view>
			</view>
			<view class="flex team-awa-bottom">
				<view class="team-awa-perfor">
					<view class="awa-perfor">团队总业绩(元)</view>
					<view class="perfor-num">{{team_money}}</view>
				</view>
				<view class="awa-s"></view>
				<view class="team-awa-perfor">
					<view class="awa-perfor">预计收益(元)</view>
					<view class="perfor-num">{{e_mondy}}</view>
				</view>
			</view>
		</view>
		<view class="team">
			
			<view class="user-f-list">
				<view v-for="(item,index) in user_list" :key="index" class="f-item" @tap="userFunc(item.img)">
					<image :src="'../../static/user/'+item.img+'.png'" mode=""></image>
					<view class="f-text">{{item.text}}</view>
				</view>
			</view>
		</view>
		<view class="set-list">
			<uni-list class="list-d">
			    <uni-list-item @tap="toProblem" class="list-item problem" title="常见问题" thumb="../../static/user/cjwt.png"></uni-list-item>
			    <uni-list-item @tap="toAdvice" class="list-item" title="投诉建议" thumb="../../static/user/tsjy.png"></uni-list-item>
			    <uni-list-item @tap="toService" class="list-item" title="联系客服" thumb="../../static/user/lxkf.png"></uni-list-item>
			    <uni-list-item @tap="logOut()" class="list-item logout" title="退出登录" thumb="../../static/user/tcdl.png"></uni-list-item>
			</uni-list>
		</view>
		<uni-popup  ref="popup" type="center" :maskClick="m">
			<view class="rule">
				<view class="rule-text">
					{{level_descr}}
				</view>
				<view class="rule-btn" @tap="close">确定</view>
			</view>
		</uni-popup>
		<view class="popup" v-if="guide">
			<view class="popup-bg"></view>
			<view class="rule-g">
				<view class="award-bottom-guide">
					<view class="flex">奖励规则</view>
					<view class="flex">
						<view>团队总业绩(元)</view>
						<view>奖励金额</view>
					</view>
					<view class="flex">
						<view>n&gt;{{lists[0].name}}</view>
						<view>0%</view>
					</view>
					<view class="flex" v-for="(item,index) in lists" :key="index" v-if="index !== lists.length-1">
						<view>{{item.name}}&lt;n&lt;{{lists[index+1].name}}</view>
						<view>{{item.reward}}%</view>
					</view>
					<view class="flex">
						<view>n&gt;{{max.name}}</view>
						<view>{{max.reward}}%</view>
					</view>
				</view>
				<view class="award-bottom-perforcal">
					<view>总业绩计算规则：</view>
					<view>直属内所有推卡客总业绩，每个自然月1号开始计算，并与1号结算上月团队奖励。如：团队总业绩200万，则1号发放奖励为200万*10%</view>
				</view>
				<view class="user-pop-btn" @tap="nGuide">我知道了</view>
			</view>
		</view>
    </view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import {
			mapState,
	        mapMutations  
	    } from 'vuex';
	import md5 from '../../kayida/common/md5.js'
	import indexBackgroundImage from "@/static/user/bg.png"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"

    export default {
		components:{uniList,uniListItem,uniPopup},
		computed: {  
		            ...mapState(['forcedLogin','userInfo'])  
		        },
		data() {
			return{
				indexBackgroundImage:indexBackgroundImage,
				bind:'',
				user_list:[
					{img:"zhmx",text:"账户明细"},
					{img:"tglj",text:"新闻资讯"},
					{img:"ptsc",text:"平台手册"},
					{img:"wdxx",text:"我的消息"},
					{img:"wltg",text:"物料推广"},
					{img:"tgfy",text:"推广费用"},
					{img:"kczx",text:"课程中心"},
					{img:"kyjj",text:"卡易讲解"},
				],
				user_message: '',
				level_descr:'',
				team_money:'',
				e_mondy:'',
				m:false,
				guide:0,
				lists:'',
				max:'',
			}
		},
		onPullDownRefresh() {
			if(this.forcedLogin){
				uni.reLaunch({
					url:"../login/login"
				})
			}
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/user/index',data,'GET').then(res =>{
					this.user_message = res.data.retval
					this.bind = res.data.retval.is_bind
					if(res.data.code === 1000) {
						uni.stopPullDownRefresh();
					}else if(res.data.code === 1400) {
							uni.showToast({
								title:"登录失效，请重新登录",
								icon:"none"
							})
							uni.reLaunch({
								url:"../login/login"
							})
					}
				}
			)
			this.request.httpRequest('api/user/reward',data,'GET').then(res =>{
					this.team_money = JSON.stringify(res.data.retval.reward2.team_money)
					this.e_mondy = JSON.stringify(res.data.retval.reward2.e_mondy)
				}
			)
		},
        methods: {
			openGuide() {
				this.guide = 1
			},
			nGuide() {
				this.guide = 0
			},
			open(){
				this.$refs.popup.open()
				this.level_descr = this.user_message.level_descr
			},
			close(){
				this.$refs.popup.close()
			},
			toInformation() {
				uni.navigateTo({
					url:"../userinformation/userinformation"
				})
			},
            toWithDrawal() {
				uni.navigateTo({
					url:"../withdrawal/withdrawal"
				})
			},
			toTeamAward() {
				// uni.navigateTo({
				// 	url:"../teamaward/teamaward"
				// })
				uni.showToast({
					title:"暂未开放",
					icon:"none"
				})
			},
			logOut() {
				this.logout()
				this.outbind()
				uni.reLaunch({
					url:"../login/login"
				})
			},
			toMyTeam() {
				uni.navigateTo({
					url:"../myteam/myteam"
				})
			},
			toService() {
				uni.navigateTo({
					url: "../service/service"
				})
			},
			toAdvice(){
				uni.navigateTo({
					url: "../advice/advice"
				})
			},
			toProblem() {
				uni.navigateTo({
					url:"../problem/problem"
				})
			},
			userFunc(t){
				if(t === 'wdxx'){
					uni.navigateTo({
						url:"../mynews/mynews"
					})
				}else if (t === 'zhmx'){
					uni.navigateTo({
						url:"../accountdetails/accountdetails"
					})
				}else if(t === 'ptsc'){
					uni.navigateTo({
						url:"../handbook/handbook"
					})
				}else if(t === 'kczx'){
					uni.navigateTo({
						url:"../coursecenter/coursecenter"
					})
				}else if(t === 'tglj'){
					uni.navigateTo({
						url:"../promotelinks/promotelinks"
					})
				}else if(t === 'wltg'){
					uni.navigateTo({
						url:"../materials/materials"
					})
				}else if(t === 'tgfy'){
					uni.navigateTo({
						url:"../commission/commission"
					})
				}else if(t === 'kyjj'){
					uni.showToast({
						title:"暂未开放",
						icon:"none"
					})
				}
			},
			...mapMutations(['logout','whetherbind','outbind']),
        },
		onLoad() {
			if(this.forcedLogin){
				uni.reLaunch({
					url:"../login/login"
				})
			}
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/user/index',data,'GET').then(res =>{
					if(res.data.code === 1400) {
					}
					this.user_message = res.data.retval
					this.bind = res.data.retval.is_bind
				}
			)
			this.request.httpRequest('api/user/reward',data,'GET').then(res => {
				this.lists = res.data.retval.reward2.lists
				this.max = res.data.retval.reward2.max
				this.team_money = JSON.stringify(res.data.retval.reward2.team_money)
				this.e_mondy = JSON.stringify(res.data.retval.reward2.e_mondy)
			})
			uni.startPullDownRefresh();
		},
		onShow() {
			if(this.forcedLogin){
				uni.reLaunch({
					url:"../login/login"
				})
			}
			let data = {
				user_id: this.userInfo.user_id,
				token: this.userInfo.token,
				sign: md5(this.userInfo.user_id+this.userInfo.token)
			}
			this.request.httpRequest('api/user/index',data,'GET').then(res =>{
					this.user_message = res.data.retval
					this.bind = res.data.retval.is_bind
					if(res.data.code === 1000) {
						uni.stopPullDownRefresh();
					}else if(res.data.code === 1400) {
							uni.showToast({
								title:"登录失效，请重新登录",
								icon:"none"
							})
							uni.reLaunch({
								url:"../login/login"
							})
					}
				}
			)
			this.request.httpRequest('api/user/reward',data,'GET').then(res =>{
					this.team_money = JSON.stringify(res.data.retval.reward2.team_money)
					this.e_mondy = JSON.stringify(res.data.retval.reward2.e_mondy)
				}
			)
		}
    }
</script>

<style scoped>
.con{
	background: #F8F8F8;
}
.title{
	height: 400rpx;
	width:670;
	padding: 40rpx;
	color: #fff;
	/* background-image: url(../../static/user/bg.png); */
}
.ava{
	margin-top: 60rpx;
}
.ava-img{
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
}
.ava-right{
	margin-left: 20rpx;
	margin-top: 20rpx;
	width: 80%;
}
.ava-post{
	/* justify-content: space-between; */
}
.user-uname{
	font-size: 32rpx;
	max-width: 270rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.member{
	border: 4rpx solid #7FD5FD;
	border-radius: 120rpx;
	text-align: center;
	height: 30rpx;
	line-height: 30rpx;
	margin-left: 40rpx;
	padding: 0 10rpx 0 0;
}
.kyd{
	width: 34rpx;
	height: 24rpx;
	margin-left: 10rpx;
}
.tkk-font{
	font-size: 16rpx;
	margin-left: 6rpx;
	color: #D8F0FE;
}
.recom{
	font-size: 28rpx;
	margin-top: 10rpx;
}
.dep-card{
	width: 670rpx;
	height: 258rpx;
	background: #fff;
	border-radius: 20rpx;
	margin-left: 40rpx;
	margin-top: -240rpx;
	padding-top: 10rpx;
	box-shadow: -3rpx 5rpx 5rpx #DDDDDD;
}
.dep{
	margin-top: 20rpx;
	font-size: 26rpx;
	justify-content: space-between;
	align-items: flex-end;
}
.can-dep{
	margin-left: 40rpx;
}
.f{
	font-size: 40rpx;
}
.f-c{
	color: #00ABFA;
}
.mar-t{
	margin-top: 10rpx;
	text-align: center;
}
.dep-btn{
	font-size: 20rpx;
	width: 80rpx;
	height: 34rpx;
	line-height: 36rpx;
	background: #EC2E3D;
	border-radius: 120rpx;
	margin-top: 10rpx;
	margin-left: 10rpx;
	color: #fff;
}
.alr-dep{
	margin-right: 40rpx;
}
.team{
	width: 670rpx;
	height: 340rpx;
	/* position: relative;
	left: 40rpx;
	top: 30rpx; */
	margin-top: 30rpx;
	margin-left: 40rpx;
	background: #fff;
	border-radius: 20rpx;
	box-shadow: -3rpx 5rpx 5rpx #DDDDDD;
}
.team-details{
	justify-content: space-around;
	border-top: 2rpx solid #EEEEEE;
	height: 100rpx;
	margin-top: 20rpx;
}
.team-btn{
	width: 160rpx;
	height: 50rpx;
	background-image: linear-gradient(to right,#01ABFA, #0082FA) ;
	border-radius: 120rpx;
	font-size: 26rpx;
	color: #FBFDFF;
	text-align: center;
	line-height: 50rpx;
	margin-top: 32rpx;
	font-weight: bold;
}
.user-f-list{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.f-item{
	width: 160rpx;
	text-align: center;
	margin-top: 50rpx;
}
.f-item image{
	width: 50rpx;
	height: 50rpx;
}
.f-text{
	font-size: 26rpx;
	margin-top: 10rpx;
}
.set-list{
	width: 670rpx;
	margin-left: 40rpx;
	margin-top: 20rpx;
	font-size: 26rpx;
	box-shadow: -3rpx 5rpx 5rpx #DDDDDD;
	border-radius: 60rpx;
	margin-bottom: 50rpx;
}
.list-d >>> .uni-list-item__container {
	line-height: 30rpx;
	margin-left: ;
}
.list-d >>> .uni-list-item__content{
	margin-left: 20rpx;
}
.list-d >>> .uni-list-item__icon{
	width: 50rpx;
	height: 50rpx;
}
.list-item{
	padding-right: 28rpx;
}
.rule{
	width: 670rpx;
	height: 300rpx;
	background: #fff;
	border-radius: 20rpx;
	position: relative;
}
.rule-text{
	padding: 80rpx;
	font-size: 26rpx;
	color: #333;
	text-align: center;
	font-weight: bold;
}
.rule-btn{
	background: #00ABFA;
	line-height: 80rpx;
	font-size: 30rpx;
	height: 80rpx;
	text-align: center;
	color: #fff;
	position: absolute;
	bottom: 0;
	width: 100%;
	border-bottom-left-radius: 20rpx;
	border-bottom-right-radius: 20rpx;
}
.team-awa{
	margin-top: 20rpx;
	width: 670rpx;
	margin-left: 40rpx;
}
.team-awa-top{
	justify-content: space-between;
}
.awa-left{
	font-size: 30rpx;
	color: #333;
	font-weight: bold;
	margin-left: 20rpx;
}
.awa-right{
	width: 100rpx;
	margin-right: 20rpx;
	height: 30rpx;
	font-size: 20rpx;
	color: #fff;
	background: #00ABFA;
	border-radius: 60rpx;
	text-align: center;
	line-height: 30rpx;
}
.team-awa-bottom{
	margin-top: 10rpx;
	height: 130rpx;
	justify-content: center;
	font-size: 26rpx;
	color: #333;
	background: #fff;
	border-radius: 20rpx;
	box-shadow: -3rpx 5rpx 5rpx #DDDDDD;
}
.team-awa-perfor{
	text-align: center;
	margin-top: 30rpx;
}
.awa-s{
	height: 60rpx;
	width: 2rpx;
	background: #EDEDED;
	margin-left: 75rpx;
	margin-right: 75rpx;
	margin-top: 35rpx;
}
.perfor-num{
	font-size: 30rpx;
	color: #00ABFA;
}
.problem{
	border-top-left-radius: 60rpx;
	border-top-right-radius: 60rpx;
}
.logout{
	border-bottom-left-radius: 60rpx;
	border-bottom-right-radius: 60rpx;
}
.popup{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	z-index: 999;
}
.popup-bg{
	background: #8F8F94;
	height: 100%;
	z-index: 999;
	opacity: 0.5;
}
.award-bottom-guide{
	margin-top: 20rpx;
	border-top: 2rpx solid #f5f5f5;
	font-size: 24rpx;
	color: #333;
	text-align: center;
}
.award-bottom-guide .flex{
	justify-content: space-around;
	margin-top: 10rpx;
}
.award-bottom-guide .flex view{
	width: 180rpx;
}
.award-bottom-perforcal{
			border-top: 2rpx solid #f5f5f5;
			margin-top: 10rpx;
			font-size: 20rpx;
			color: #333;
			padding-top: 10rpx;
			padding-left: 10rpx;
}
.ml{
	margin-left: 60rpx;
}
.fml{
	margin-left: 30rpx;
}
.rule-g{
	position: absolute;
	width: 550rpx;
	text-align: center;
	background: #fff;
	border-radius: 20rpx;
	padding-bottom: 40rpx;
	top: 300rpx;
	left: 100rpx;
	z-index: 1001;
	height: 700rpx;
	overflow:auto;
}
.user-pop-btn{
	width: 230rpx;
	height: 66rpx;
	color: #fff;
	background: #00ABFA;
	text-align: center;
	line-height: 66rpx;
	border-radius: 120rpx;
	position: absolute;
	bottom: 40rpx;
	left: 160rpx;
	font-size: 26rpx;
}
</style>
