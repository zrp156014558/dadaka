import Vue from 'vue'
import App from './App'
import request from './kayida/common/request.js'

import store from './store'
//请求加载组件
import requestLoading from './components/compt_requestLoading.vue';
//组件挂载到全局，方便每个页面使用
Vue.component('request-loading', requestLoading);
//挂载全局显示/隐藏请求加载动画
function showLoading(){
	store.commit('request_show_loading');
}
function hideLoading(){
	store.commit('request_hide_loading');
}
Vue.prototype.$showLoading = showLoading; //全局显示动画可以 this.$showLoading();
Vue.prototype.$hideLoading = hideLoading; //全局隐藏动画可以 this.$hideLoading();


Vue.config.productionTip = false

Vue.prototype.$store = store


Vue.prototype.request = request
Vue.prototype.$user = ()=>{
	var p = {};
	uni.getStorage({
		key: 'token',
		success(res) {
			p.token = res.data
		}
	})
	return p;
}


App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
