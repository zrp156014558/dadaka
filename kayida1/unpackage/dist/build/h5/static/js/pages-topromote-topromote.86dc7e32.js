(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-topromote-topromote"],{1364:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o={data:function(){return{url:"",pic:"",share:0,popup:0,text:"您可以将推广海报发送至客户，或者复制推广链接给客户申请信用卡",pic_list:[{thumb:"../../static/img/abc.jpg"},{thumb:"../../static/img/abc.jpg"},{thumb:"../../static/img/abc.jpg"},{thumb:"../../static/img/abc.jpg"},{thumb:"../../static/img/start_h.png"},{thumb:"../../static/img/abc.jpg"},{thumb:"../../static/img/abc.jpg"},{thumb:"../../static/img/abc.jpg"},{thumb:"../../static/img/abc.jpg"}]}},methods:{downPromote:function(){this.popup=1},copyText:function(){uni.setClipboardData({data:this.text,success:function(){uni.showToast({title:"复制成功",duration:2e3,icon:"none"})}})},downPic:function(){uni.downloadFile({url:this.pic,success:function(t){200===t.statusCode&&uni.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(){uni.showToast({title:"保存成功",icon:"none"})},fail:function(){uni.showToast({title:"保存失败，请稍后重试",icon:"none"})}})}}),this.popup=0},canceldown:function(){this.popup=0},shareWeixin:function(){uni.share({provider:"weixin",scene:"WXSceneSession",type:2,imageUrl:this.pic,success:function(t){uni.showToast({title:"分享成功",icon:"none"})},fail:function(t){uni.showToast({title:"分享失败",icon:"none"})}}),this.share=0},shareFriends:function(){uni.share({provider:"weixin",scene:"WXSenceTimeline",type:2,imageUrl:this.pic,success:function(t){uni.showToast({title:"分享成功",icon:"none"})},fail:function(t){uni.showToast({title:"分享失败",icon:"none"})}}),this.share=0},shareCancel:function(){this.share=0},copy:function(){uni.setClipboardData({data:this.url,success:function(){uni.showToast({title:"复制成功",duration:2e3,icon:"none"})}})},shareDetail:function(){this.share=1}},onLoad:function(t){this.url=t.url,this.pic=t.pic}};i.default=o},3665:function(t,i,n){i=t.exports=n("2350")(!1),i.push([t.i,".con[data-v-491c30b0]{background:#f8f8f8}.con .promote-main[data-v-491c30b0]{text-align:center;margin-bottom:%?100?%}.con .promote-main .promote-text[data-v-491c30b0]{color:#333;font-size:%?26?%;padding:0 %?40?%;text-align:left}.con .promote-main uni-image[data-v-491c30b0]{width:%?650?%;height:%?1200?%}.con .promote-bottom[data-v-491c30b0]{position:fixed;bottom:0;padding-bottom:%?20?%;width:100%;background:#fff}.con .promote-bottom uni-textarea[data-v-491c30b0]{margin-left:%?30?%;width:%?440?%;border:%?1?% solid #333;border-radius:%?20?%;height:%?60?%;font-size:%?18?%;color:#333;padding-left:%?10?%}.con .promote-bottom .promote-btn[data-v-491c30b0]{width:%?114?%;height:%?48?%;line-height:%?48?%;background:#00abfa;color:#fff;text-align:center;font-size:%?18?%;border-radius:%?20?%;margin-top:%?10?%;margin-left:%?20?%}.con .share-mask[data-v-491c30b0]{position:fixed;top:0;background:#8f8f94;opacity:.4;height:100%;width:%?750?%;z-index:998}.con .share[data-v-491c30b0]{position:fixed;bottom:0;width:100%;height:%?450?%;text-align:center;background:#f2f2f2;color:#333;z-index:999}.con .share .share-text[data-v-491c30b0]{font-size:%?30?%;margin-top:%?70?%}.con .share .share-btn[data-v-491c30b0]{-webkit-justify-content:space-around;justify-content:space-around;margin-top:%?60?%;font-size:%?26?%}.con .share .share-btn uni-image[data-v-491c30b0]{width:%?100?%;height:%?100?%}.con .share .share-cancel[data-v-491c30b0]{width:100%;height:%?88?%;font-size:%?26?%;color:#666;background:#fff;line-height:%?88?%;margin-top:%?60?%}.con .popup[data-v-491c30b0]{height:100%;width:100%;z-index:999;position:fixed;top:0;color:#00abfa;font-size:%?26?%}.con .popup .popup-bg[data-v-491c30b0]{opacity:.6;background:#6c6c6c;z-index:999;height:100%}.con .popup .animation[data-v-491c30b0]{position:relative;-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-iteration-count:1;animation-iteration-count:1}.con .popup .animation-name[data-v-491c30b0]{-webkit-animation-name:pop-data-v-491c30b0;animation-name:pop-data-v-491c30b0}.con .popup .animation-cname[data-v-491c30b0]{-webkit-animation-name:cpop-data-v-491c30b0;animation-name:cpop-data-v-491c30b0}@-webkit-keyframes pop-data-v-491c30b0{from{bottom:%?-180?%}to{bottom:%?0?%}}@keyframes pop-data-v-491c30b0{from{bottom:%?-180?%}to{bottom:%?0?%}}@-webkit-keyframes cpop-data-v-491c30b0{from{bottom:%?0?%}to{bottom:%?-180?%}}@keyframes cpop-data-v-491c30b0{from{bottom:%?0?%}to{bottom:%?-180?%}}.con .popup .downpic[data-v-491c30b0]{height:%?80?%;line-height:%?80?%;position:absolute;bottom:%?100?%;background:#fff;text-align:center;left:%?50?%;border-radius:%?120?%;width:%?650?%}.con .popup .cancel[data-v-491c30b0]{height:%?80?%;line-height:%?80?%;width:%?650?%;position:absolute;bottom:0;background:#fff;text-align:center;left:%?50?%;border-radius:%?120?%}",""])},6609:function(t,i,n){"use strict";var o=n("b84f"),a=n.n(o);a.a},"87ba":function(t,i,n){"use strict";var o,a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",{staticClass:"con"},[n("v-uni-view",{staticClass:"promote-main top"},[n("v-uni-image",{attrs:{src:t.pic,mode:""},on:{longpress:function(i){arguments[0]=i=t.$handleEvent(i),t.downPromote.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"promote-text",on:{longpress:function(i){arguments[0]=i=t.$handleEvent(i),t.copyText.apply(void 0,arguments)}}},[t._v(t._s(t.text))])],1),n("v-uni-view",{staticClass:"flex promote-bottom"},[n("v-uni-textarea",{attrs:{value:t.url,disabled:!0}}),n("v-uni-view",{staticClass:"promote-btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.copy.apply(void 0,arguments)}}},[t._v("复制链接")]),n("v-uni-view",{staticClass:"promote-btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.shareDetail.apply(void 0,arguments)}}},[t._v("分享")])],1),t.share?n("v-uni-view",{staticClass:"share"},[n("v-uni-view",{staticClass:"share-text"},[t._v("选择要分享到的平台")]),n("v-uni-view",{staticClass:"share-btn flex"},[n("v-uni-view",{staticClass:"share-weixin",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.shareWeixin.apply(void 0,arguments)}}},[n("v-uni-image",{attrs:{src:"../../static/img/share_weixin.png",mode:""}}),n("v-uni-view",[t._v("微信")])],1),n("v-uni-view",{staticClass:"share-friends",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.shareFriends.apply(void 0,arguments)}}},[n("v-uni-image",{attrs:{src:"../../static/img/share_friends.png",mode:""}}),n("v-uni-view",[t._v("朋友圈")])],1)],1),n("v-uni-view",{staticClass:"share-cancel",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.shareCancel.apply(void 0,arguments)}}},[t._v("取消分享")])],1):t._e(),t.share?n("v-uni-view",{staticClass:"share-mask"}):t._e(),n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.popup,expression:"popup"}],staticClass:"popup",on:{touchmove:function(i){i.stopPropagation(),i.preventDefault(),arguments[0]=i=t.$handleEvent(i),t.moveHandle.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"popup-bg"}),n("v-uni-view",{class:"animation "+[1===t.popup?"animation-name":"animation-cname"]},[n("v-uni-view",{staticClass:"downpic",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.downPic.apply(void 0,arguments)}}},[t._v("保存图片到相册")]),n("v-uni-view",{staticClass:"cancel",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.canceldown.apply(void 0,arguments)}}},[t._v("取消")])],1)],1)],1)},e=[];n.d(i,"b",function(){return a}),n.d(i,"c",function(){return e}),n.d(i,"a",function(){return o})},b1be:function(t,i,n){"use strict";n.r(i);var o=n("87ba"),a=n("da6c");for(var e in a)"default"!==e&&function(t){n.d(i,t,function(){return a[t]})}(e);n("6609");var c,s=n("f0c5"),r=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"491c30b0",null,!1,o["a"],c);i["default"]=r.exports},b84f:function(t,i,n){var o=n("3665");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=n("4f06").default;a("77cee920",o,!0,{sourceMap:!1,shadowMode:!1})},da6c:function(t,i,n){"use strict";n.r(i);var o=n("1364"),a=n.n(o);for(var e in o)"default"!==e&&function(t){n.d(i,t,function(){return o[t]})}(e);i["default"]=a.a}}]);