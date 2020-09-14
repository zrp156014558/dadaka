<template>
	<view class="con">
		<view class="promote top">
		</view>
		<view class="become">邀请推卡客</view>
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
.con{
	.promote{
		
	}
	.become{
		height: 88rpx;
		line-height: 88rpx;
		background: #00ABFA;
		text-align: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		color: #fff;
		font-size: 30rpx;
	}
}
</style>
