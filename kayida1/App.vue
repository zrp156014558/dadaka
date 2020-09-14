<script>
	import {  
	        mapMutations  
	    } from 'vuex';
	
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			switch ( plus.os.name ) {
			    case "Android":
			    // Android平台: plus.android.*
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				    uni.request({
				        url: 'https://www.zgkayida.com/api/loan2/versions',
				        data: {
				            now_version: widgetInfo.version,
							pass_version: '0.08'
				        },
				        success: (result) => {
				            var data = result.data.retval;
				            if (data.update && data.wgtUrl) {
				                uni.downloadFile({
				                    url: encodeURI(data.wgtUrl),
				                    success: (downloadResult) => {
				                        if (downloadResult.statusCode === 200) {
				                            plus.runtime.install(downloadResult.tempFilePath, {
				                                force: false
				                            }, function() {
				                                plus.runtime.restart();
				                            }, function(e) {
				                            });
				                        }
				                    }
				                });
				            }
				        }
				    });
				});
			    break;
			    case "iOS":
			    // iOS平台: plus.ios.*
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				    uni.request({
				        url: 'https://www.zgkayida.com/api/loan2/versions',
				        data: {
				            now_version: widgetInfo.version,
				            pass_version: '0.08'
				        },
				        success: (result) => {
				            var data = result.data.retval;
				            if (data.update && data.wgtUrl) {
								uni.downloadFile({
								    url: encodeURI(data.wgtUrl),
								    success: (downloadResult) => {
								        if (downloadResult.statusCode === 200) {
								            uni.showModal({
								            	title:"有新版本更新",
								            	content:"有新版本，请前往卡易达公众号下载使用",
								            	showCancel:false,
								            	success() {
								            		plus.runtime.restart();
								            	}
								            })
								        }
								    }
								});
				            }
				        }
				    });
				});
			    break;
			    default:
			    // 其它平台
			    break;
			}
			
			// #endif
		},
		onShow: function() {
			uni.getStorage({//获得保存在本地的用户信息
				key: 'userInfo',
				success:(res) => {  
					this.login(res.data); 
					// 再次校验并刷新token的有效时间
					this.login(res.data)
				}
			})
		},
		onHide: function() {
		},
		methods: {
			...mapMutations(['login'])  
		} 
	}
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.top{
	}

	.credit-card{
		width: 100%;
		padding: 20rpx;
	}

	.s-level{
		/* width: 100%; */
		padding: 20rpx;
		background: #F8F8F8;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: 24rpx 44rpx;
	}

	.con{
		width: 100%;
	}

	.flex{
		display: flex;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	}
	/* #endif*/
</style>
