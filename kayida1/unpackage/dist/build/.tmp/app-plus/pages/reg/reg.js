(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/reg/reg"],{1413:function(e,t,n){"use strict";(function(e){n("cb51"),n("921b");o(n("66fd"));var t=o(n("57f8"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"57f8":function(e,t,n){"use strict";n.r(t);var o=n("83e0"),a=n("b46d");for(var c in a)"default"!==c&&function(e){n.d(t,e,(function(){return a[e]}))}(c);n("6de3");var i,r=n("f0c5"),u=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"41dd8351",null,!1,o["a"],i);t["default"]=u.exports},"6de3":function(e,t,n){"use strict";var o=n("ac18"),a=n.n(o);a.a},"83e0":function(e,t,n){"use strict";var o,a=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return o}))},a632:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){n.e("components/m-input").then(function(){return resolve(n("4c82"))}.bind(null,n)).catch(n.oe)},a={components:{mInput:o},data:function(){return{time:0,times:"",phone:"",auth:"",pwd1:"",pwd2:""}},methods:{userAgreement:function(){e.navigateTo({url:"../userareement/userareement"})},regGetAuth:function(){var t=this,n=this.phone,o={mobile:n,send_type:"reg"};e.request({url:"http://www.zgkayida.com/api/sms/sendCode",data:o,header:{"content-type":"application/x-www-form-urlencoded;application/json;charset=UTF-8"},method:"POST",success:function(n){1e3===n.data.code&&(e.showToast({title:n.data.msg,icon:"none"}),t.time=1,t.times=59,setInterval((function(){t.times--,t.times<1&&(t.time=2,clearInterval())}),1e3)),1e3!==n.data.code&&e.showToast({title:n.data.msg,icon:"none"})}})},userReg:function(){var t={mobile:this.phone,code:this.auth,password:this.pwd1,confirm_password:this.pwd2};e.request({url:"http://www.zgkayida.com/api/user/reg",data:t,header:{"content-type":"application/x-www-form-urlencoded;application/json;charset=UTF-8"},method:"POST",success:function(t){1e3!==t.data.code?e.showToast({title:t.data.msg,icon:"none"}):1e3===t.data.code&&e.redirectTo({url:"../login/login"})}})}}};t.default=a}).call(this,n("6e42")["default"])},ac18:function(e,t,n){},b46d:function(e,t,n){"use strict";n.r(t);var o=n("a632"),a=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=a.a}},[["1413","common/runtime","common/vendor"]]]);