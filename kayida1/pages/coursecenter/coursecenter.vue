<template>
	<view class="con">
		<view class="course-main top">
			<image class="course-banner" :src="banner" mode=""></image>
			<video :src="video" controls style="width: 100%;"></video>
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
				banner:'',
				video:''
			}
		},
		methods: {
			
		},
		onLoad() {
			this.request.httpRequest('api/course/center','GET').then(res =>{
				this.banner = res.data.retval.banner
				this.video = res.data.retval.list_data[0].video
			})
		}
	}
</script>

<style lang="less" scoped>
.con{
	background: #F7F7F7;
	.course-main{
		.course-banner{
			width: 100%;
			height: 340rpx;
		}
	}
}
</style>
