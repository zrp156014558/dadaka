(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-service-service"],{1471:function(t,a,n){"use strict";var i=n("676f"),o=n.n(i);o.a},"150c":function(t,a,n){"use strict";n.r(a);var i=n("9561"),o=n.n(i);for(var e in i)"default"!==e&&function(t){n.d(a,t,function(){return i[t]})}(e);a["default"]=o.a},"189d":function(t,a,n){"use strict";n.r(a);var i=n("ef37"),o=n.n(i);for(var e in i)"default"!==e&&function(t){n.d(a,t,function(){return i[t]})}(e);a["default"]=o.a},"1d06":function(t,a,n){"use strict";var i=n("288e");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,n("a481"),n("ac6a");var o=i(n("cebc"));n("c5f6");var e={name:"uniTransition",props:{show:{type:Boolean,default:!1},modeClass:{type:Array,default:function(){return[]}},duration:{type:Number,default:300},styles:{type:Object,default:function(){return{}}}},data:function(){return{isShow:!1,transform:"",ani:{in:"",active:""}}},watch:{show:{handler:function(t){t?this.open():this.close()},immediate:!0}},computed:{stylesObject:function(){var t=(0,o.default)({},this.styles,{"transition-duration":this.duration/1e3+"s"}),a="";for(var n in t){var i=this.toLine(n);a+=i+":"+t[n]+";"}return a}},created:function(){},methods:{change:function(){this.$emit("click",{detail:this.isShow})},open:function(){var t=this;for(var a in this.isShow=!0,this.transform="",this.ani.in="",this.getTranfrom(!1))"opacity"===a?this.ani.in="fade-in":this.transform+="".concat(this.getTranfrom(!1)[a]," ");this.$nextTick(function(){setTimeout(function(){t._animation(!0)},50)})},close:function(t){this._animation(!1)},_animation:function(t){var a=this,n=this.getTranfrom(t);for(var i in this.transform="",n)"opacity"===i?this.ani.in="fade-".concat(t?"out":"in"):this.transform+="".concat(n[i]," ");clearTimeout(this.timer),this.timer=setTimeout(function(){t||(a.isShow=!1),a.$emit("change",{detail:a.isShow})},this.duration)},getTranfrom:function(t){var a={transform:""};return this.modeClass.forEach(function(n){switch(n){case"fade":a.opacity=t?1:0;break;case"slide-top":a.transform+="translateY(".concat(t?"0":"-100%",") ");break;case"slide-right":a.transform+="translateX(".concat(t?"0":"100%",") ");break;case"slide-bottom":a.transform+="translateY(".concat(t?"0":"100%",") ");break;case"slide-left":a.transform+="translateX(".concat(t?"0":"-100%",") ");break;case"zoom-in":a.transform+="scale(".concat(t?1:.8,") ");break;case"zoom-out":a.transform+="scale(".concat(t?1:1.2,") ");break}}),a},_modeClassArr:function(t){var a=this.modeClass;if("string"!==typeof a){var n="";return a.forEach(function(a){n+=a+"-"+t+","}),n.substr(0,n.length-1)}return a+"-"+t},toLine:function(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}}};a.default=e},"1d9f":function(t,a,n){a=t.exports=n("2350")(!1),a.push([t.i,".uni-transition[data-v-3cf63318]{-webkit-transition-timing-function:ease;transition-timing-function:ease;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform}.fade-in[data-v-3cf63318]{opacity:0}.fade-active[data-v-3cf63318]{opacity:1}.slide-top-in[data-v-3cf63318]{\n\t/* transition-property: transform, opacity; */-webkit-transform:translateY(-100%);transform:translateY(-100%)}.slide-top-active[data-v-3cf63318]{-webkit-transform:translateY(0);transform:translateY(0)\n\t/* opacity: 1; */}.slide-right-in[data-v-3cf63318]{-webkit-transform:translateX(100%);transform:translateX(100%)}.slide-right-active[data-v-3cf63318]{-webkit-transform:translateX(0);transform:translateX(0)}.slide-bottom-in[data-v-3cf63318]{-webkit-transform:translateY(100%);transform:translateY(100%)}.slide-bottom-active[data-v-3cf63318]{-webkit-transform:translateY(0);transform:translateY(0)}.slide-left-in[data-v-3cf63318]{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.slide-left-active[data-v-3cf63318]{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}.zoom-in-in[data-v-3cf63318]{-webkit-transform:scale(.8);transform:scale(.8)}.zoom-out-active[data-v-3cf63318]{-webkit-transform:scale(1);transform:scale(1)}.zoom-out-in[data-v-3cf63318]{-webkit-transform:scale(1.2);transform:scale(1.2)}",""])},2509:function(t,a,n){a=t.exports=n("2350")(!1),a.push([t.i,".con[data-v-a49a76e0]{background:#f7f7f7}.con .contact-title[data-v-a49a76e0]{padding:%?30?% %?40?%;font-size:%?26?%;color:#333}.con .contact-title .contact-details[data-v-a49a76e0]{font-size:%?18?%;margin-top:%?20?%}.con .contact-way[data-v-a49a76e0]{background:#fff;padding:%?30?% 0;text-align:center}.con .contact-way .job-time[data-v-a49a76e0]{font-size:%?26?%;color:#333}.con .contact-way .contact-btn[data-v-a49a76e0]{margin-top:%?30?%}.con .contact-way .contact-btn .chat-btn[data-v-a49a76e0]{-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;color:#00abfa;font-size:%?26?%}.con .contact-way .contact-btn .chat-btn uni-view[data-v-a49a76e0]{line-height:%?58?%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-left:%?20?%}.con .contact-way .contact-btn .chat-btn uni-view uni-image[data-v-a49a76e0]{margin-top:%?10?%}.con .contact-way .contact-btn .chat-btn .weixin-btn[data-v-a49a76e0]{width:%?196?%;height:%?58?%;border:%?2?% solid #00abfa;border-radius:%?20?%}.con .contact-way .contact-btn .chat-btn .phone-btn[data-v-a49a76e0]{margin-left:%?40?%;width:%?196?%;height:%?58?%;border:%?2?% solid #00abfa;border-radius:%?20?%}.con .contact-way .contact-btn .chat-btn .wechat-img[data-v-a49a76e0]{width:%?45?%;height:%?37?%}.con .contact-way .contact-btn .chat-btn .phone-img[data-v-a49a76e0]{width:%?32?%;height:%?40?%}.con .contact-bottom[data-v-a49a76e0]{margin-top:%?40?%;text-align:center;padding:0 %?204?%}.con .contact-bottom .wechat-group[data-v-a49a76e0]{font-size:%?26?%;color:#333}.con .contact-bottom .wechat-details[data-v-a49a76e0]{font-size:%?18?%;color:grey;margin-top:%?30?%}.con .contact-bottom uni-image[data-v-a49a76e0]{width:%?260?%;height:%?300?%;margin-top:%?20?%}.con .popup[data-v-a49a76e0]{height:100%;width:100%;z-index:999;position:absolute;top:0;color:#00abfa;font-size:%?26?%}.con .popup .popup-bg[data-v-a49a76e0]{opacity:.6;background:#6c6c6c;z-index:999;height:100%}.con .popup .animation[data-v-a49a76e0]{position:relative;-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-iteration-count:1;animation-iteration-count:1}.con .popup .animation-name[data-v-a49a76e0]{-webkit-animation-name:pop-data-v-a49a76e0;animation-name:pop-data-v-a49a76e0}.con .popup .animation-cname[data-v-a49a76e0]{-webkit-animation-name:cpop-data-v-a49a76e0;animation-name:cpop-data-v-a49a76e0}@-webkit-keyframes pop-data-v-a49a76e0{from{bottom:%?-180?%}to{bottom:%?0?%}}@keyframes pop-data-v-a49a76e0{from{bottom:%?-180?%}to{bottom:%?0?%}}@-webkit-keyframes cpop-data-v-a49a76e0{from{bottom:%?0?%}to{bottom:%?-180?%}}@keyframes cpop-data-v-a49a76e0{from{bottom:%?0?%}to{bottom:%?-180?%}}.con .popup .downpic[data-v-a49a76e0]{height:%?80?%;line-height:%?80?%;position:absolute;bottom:%?100?%;background:#fff;text-align:center;left:%?50?%;border-radius:%?120?%;width:%?650?%}.con .popup .cancel[data-v-a49a76e0]{height:%?80?%;line-height:%?80?%;width:%?650?%;position:absolute;bottom:0;background:#fff;text-align:center;left:%?50?%;border-radius:%?120?%}",""])},"43e2":function(t,a,n){var i=n("1d9f");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("32b293fa",i,!0,{sourceMap:!1,shadowMode:!1})},"525f":function(t,a,n){"use strict";var i,o=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("v-uni-view",{staticClass:"con"},[n("v-uni-view",{staticClass:"top contact-title"},[n("v-uni-view",[t._v("联系方式")]),n("v-uni-view",{staticClass:"contact-details"},[t._v("您可拨打电话联系客服，或扫描二维码添加客服微信，即可在线沟通客服")])],1),n("v-uni-view",{staticClass:"contact-way"},[n("v-uni-view",{staticClass:"job-time"},[t._v("工作时间：周一至周六9:00~18:00")]),n("v-uni-view",{staticClass:"contact-btn"},[n("v-uni-view",{staticClass:"flex chat-btn"},[n("v-uni-view",{staticClass:"weixin-btn flex"},[n("v-uni-image",{staticClass:"wechat-img",attrs:{src:"../../static/user/weixin.png",mode:""}}),n("v-uni-view",[t._v("在线聊天")])],1),n("v-uni-view",{staticClass:"phone-btn flex"},[n("v-uni-image",{staticClass:"phone-img",attrs:{src:"../../static/user/phone.png",mode:""}}),n("v-uni-view",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.servicePhone(t.service.tel)}}},[t._v("一键拨号")])],1)],1)],1)],1),n("v-uni-view",{staticClass:"contact-bottom"},[n("v-uni-view",{staticClass:"wechat-group"},[t._v("———官方微信群———")]),n("v-uni-view",{staticClass:"wechat-details"},[t._v("加入官方微信群，您可随时收到我们的最新活动消息，有机会获取超值优惠")]),n("v-uni-image",{attrs:{src:t.service.logo,mode:""},on:{longpress:function(a){arguments[0]=a=t.$handleEvent(a),t.openPopup()}}})],1),n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.popup,expression:"popup"}],staticClass:"popup"},[n("v-uni-view",{staticClass:"popup-bg"}),n("v-uni-view",{class:"animation "+[1===t.popup?"animation-name":"animation-cname"]},[n("v-uni-view",{staticClass:"downpic",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.downPic.apply(void 0,arguments)}}},[t._v("保存图片到相册")]),n("v-uni-view",{staticClass:"cancel",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.canceldown.apply(void 0,arguments)}}},[t._v("取消")])],1)],1)],1)},e=[];n.d(a,"b",function(){return o}),n.d(a,"c",function(){return e}),n.d(a,"a",function(){return i})},5814:function(t,a,n){"use strict";n.r(a);var i=n("a243"),o=n("150c");for(var e in o)"default"!==e&&function(t){n.d(a,t,function(){return o[t]})}(e);n("5f7e");var r,s=n("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"6928518c",null,!1,i["a"],r);a["default"]=c.exports},"5f7e":function(t,a,n){"use strict";var i=n("8399"),o=n.n(i);o.a},"676f":function(t,a,n){var i=n("2509");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("e5a12786",i,!0,{sourceMap:!1,shadowMode:!1})},8399:function(t,a,n){var i=n("e600");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("cfc72b24",i,!0,{sourceMap:!1,shadowMode:!1})},9561:function(t,a,n){"use strict";var i=n("288e");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=i(n("9cd8")),e={name:"UniPopup",components:{uniTransition:o.default},props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},maskClick:{type:Boolean,default:!0}},data:function(){return{ani:[],showPopup:!1,showTrans:!1,maskClass:{position:"fixed",bottom:0,top:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.4)"},transClass:{position:"fixed",left:0,right:0}}},watch:{type:{handler:function(t){switch(this.type){case"top":this.ani=["slide-top"],this.transClass={position:"fixed",left:0,right:0};break;case"bottom":this.ani=["slide-bottom"],this.transClass={position:"fixed",left:0,right:0,bottom:0};break;case"center":this.ani=["zoom-out","fade"],this.transClass={position:"fixed",display:"flex",flexDirection:"column",bottom:0,left:0,right:0,top:0,justifyContent:"center",alignItems:"center"};break}},immediate:!0}},created:function(){},methods:{clear:function(t){t.stopPropagation()},open:function(){var t=this;this.showPopup=!0,this.$nextTick(function(){setTimeout(function(){t.showTrans=!0},50)}),this.$emit("change",{show:!0})},close:function(t){var a=this;this.showTrans=!1,this.$nextTick(function(){clearTimeout(a.timer),a.timer=setTimeout(function(){a.$emit("change",{show:!1}),a.showPopup=!1},300)})},onTap:function(){this.maskClick&&this.close()}}};a.default=e},"95f1":function(t,a,n){"use strict";n.r(a);var i=n("525f"),o=n("189d");for(var e in o)"default"!==e&&function(t){n.d(a,t,function(){return o[t]})}(e);n("1471");var r,s=n("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"a49a76e0",null,!1,i["a"],r);a["default"]=c.exports},"9cd8":function(t,a,n){"use strict";n.r(a);var i=n("d9c6"),o=n("c24f");for(var e in o)"default"!==e&&function(t){n.d(a,t,function(){return o[t]})}(e);n("e6be");var r,s=n("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"3cf63318",null,!1,i["a"],r);a["default"]=c.exports},a243:function(t,a,n){"use strict";var i={"uni-transition":n("9cd8").default},o=function(){var t=this,a=t.$createElement,n=t._self._c||a;return t.showPopup?n("v-uni-view",{staticClass:"uni-popup",on:{touchmove:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a),t.clear.apply(void 0,arguments)}}},[n("uni-transition",{attrs:{"mode-class":["fade"],styles:t.maskClass,show:t.showTrans},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.onTap.apply(void 0,arguments)}}}),n("uni-transition",{attrs:{"mode-class":t.ani,styles:t.transClass,show:t.showTrans},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.onTap.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"uni-popup__wrapper-box",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.clear.apply(void 0,arguments)}}},[t._t("default")],2)],1)],1):t._e()},e=[];n.d(a,"b",function(){return o}),n.d(a,"c",function(){return e}),n.d(a,"a",function(){return i})},c24f:function(t,a,n){"use strict";n.r(a);var i=n("1d06"),o=n.n(i);for(var e in i)"default"!==e&&function(t){n.d(a,t,function(){return i[t]})}(e);a["default"]=o.a},d9c6:function(t,a,n){"use strict";var i,o=function(){var t=this,a=t.$createElement,n=t._self._c||a;return t.isShow?n("v-uni-view",{ref:"ani",staticClass:"uni-transition",class:[t.ani.in],style:"transform:"+t.transform+";"+t.stylesObject,on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.change.apply(void 0,arguments)}}},[t._t("default")],2):t._e()},e=[];n.d(a,"b",function(){return o}),n.d(a,"c",function(){return e}),n.d(a,"a",function(){return i})},e600:function(t,a,n){a=t.exports=n("2350")(!1),a.push([t.i,".uni-popup[data-v-6928518c]{position:fixed;top:var(--window-top);bottom:0;left:0;right:0;z-index:99}.uni-popup__mask[data-v-6928518c]{position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,.4);opacity:0}.mask-ani[data-v-6928518c]{-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-duration:.2s;transition-duration:.2s}.uni-top-mask[data-v-6928518c]{opacity:1}.uni-bottom-mask[data-v-6928518c]{opacity:1}.uni-center-mask[data-v-6928518c]{opacity:1}.uni-popup__wrapper[data-v-6928518c]{display:block;position:absolute}.top[data-v-6928518c]{top:0;left:0;right:0;-webkit-transform:translateY(-500px);transform:translateY(-500px)}.bottom[data-v-6928518c]{bottom:0;left:0;right:0;-webkit-transform:translateY(500px);transform:translateY(500px)}.center[data-v-6928518c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;bottom:0;left:0;right:0;top:0;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-transform:scale(1.2);transform:scale(1.2);opacity:0}.uni-popup__wrapper-box[data-v-6928518c]{display:block;position:relative}.content-ani[data-v-6928518c]{-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;-webkit-transition-duration:.2s;transition-duration:.2s}.uni-top-content[data-v-6928518c]{-webkit-transform:translateY(0);transform:translateY(0)}.uni-bottom-content[data-v-6928518c]{-webkit-transform:translateY(0);transform:translateY(0)}.uni-center-content[data-v-6928518c]{-webkit-transform:scale(1);transform:scale(1);opacity:1}",""])},e6be:function(t,a,n){"use strict";var i=n("43e2"),o=n.n(i);o.a},ef37:function(t,a,n){"use strict";var i=n("288e");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=i(n("5814")),e={components:{uniPopup:o.default},data:function(){return{service:"",popup:0}},methods:{servicePhone:function(t){uni.makePhoneCall({phoneNumber:t})},downPic:function(){uni.downloadFile({url:this.service.logo,success:function(t){200===t.statusCode&&uni.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(){uni.showToast({title:"保存成功",icon:"none"})},fail:function(){uni.showToast({title:"保存失败，请稍后重试",icon:"none"})}})}}),this.popup=0},openPopup:function(){this.popup=1},canceldown:function(){this.popup=0}},onLoad:function(){var t=this;this.request.httpRequest("api/service/index","GET").then(function(a){t.service=a.data.retval})}};a.default=e}}]);