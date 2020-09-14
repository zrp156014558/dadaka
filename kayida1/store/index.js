import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: true,
        hasLogin: false,
        userInfo: {},
		requestLoading: false, //加载等待是否显示
		// 订单页面显示
		orderTitle: 0,
		is_bind:0
    },
    mutations: {
        login(state, provider) {//改变登录状态
            state.hasLogin = true
			state.forcedLogin = false
			state.userInfo.is_bind = provider.is_bind
			state.userInfo.token = provider.token
			state.userInfo.user_id = provider.user_id
			state.userInfo.mobile = provider.mobile
			// state.userInfo.pwd = provider.pwd
			uni.setStorage({//将用户信息保存在本地  
				key: 'userInfo',  
				data: provider
			})
        },
        logout(state) {//退出登录
            state.hasLogin = false
			state.forcedLogin = true
			state.userInfo = {}  
			uni.removeStorage({
				key: 'userInfo'  
			})
			uni.reLaunch({
				url:"../../pages/login/login"
			})
        },
		//显示请求加载动画
		request_show_loading(state) {
			state.requestLoading = true;
		},
		//隐藏请求加载动画
		request_hide_loading(state) {
			state.requestLoading = false;
		},
		toorder(state,provider) {
			if(provider === 1){
				state.orderTitle = 1
			}else{
				state.orderTitle = 0
			}
		},
		whetherbind(state,provider) {
			state.is_bind = provider
		},
		outbind(state) {
			state.is_bind = 0
		}
    }
})

export default store
