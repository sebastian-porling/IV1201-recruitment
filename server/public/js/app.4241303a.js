(function(e){function t(t){for(var n,i,u=t[0],o=t[1],c=t[2],d=0,m=[];d<u.length;d++)i=u[d],a[i]&&m.push(a[i][0]),a[i]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);l&&l(t);while(m.length)m.shift()();return s.push.apply(s,c||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,u=1;u<r.length;u++){var o=r[u];0!==a[o]&&(n=!1)}n&&(s.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={app:0},s=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],o=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var l=o;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var n=r("64a9"),a=r.n(n);a.a},"0655":function(e,t,r){},4678:function(e,t,r){var n={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function a(e){var t=s(e);return r(t)}function s(e){var t=n[e];if(!(t+1)){var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}return t}a.keys=function(){return Object.keys(n)},a.resolve=s,e.exports=a,a.id="4678"},"4ec8":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("097d"),r("cabf"),r("96d3"),r("594f");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("HeaderComponent"),r("router-view")],1)},s=[],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("mdb-navbar",{staticClass:"indigo",attrs:{expand:"large",dark:""}},[r("mdb-container",[r("mdb-navbar-toggler",[r("mdb-navbar-brand",[e._v("Recruitment")]),r("mdb-navbar-nav",[r("mdb-nav-item",{attrs:{to:"/",active:""}},[e._v("Home")]),r("mdb-nav-item",{attrs:{to:"/login"}},[e._v("Login")]),r("mdb-nav-item",{attrs:{to:"/register"}},[e._v("Register")])],1),e._v("\n    "+e._s(e.msgFromServer)+"\n    "),r("mdb-btn",{on:{click:function(t){e.logoutApi()}}},[e._v("Logout")])],1)],1)],1)},u=[],o=(r("96cf"),r("3b8d")),c=r("d225"),l=r("b0b4"),d=r("7338"),m=r.n(d),p="auth",b=function(){function e(){Object(c["a"])(this,e)}return Object(l["a"])(e,null,[{key:"register",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(t,r,n){var a,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.a.post(p+"/register",{name:t,password:n,email:r});case 3:return a=e.sent,s=a.data,e.abrupt("return",s.msg);case 8:if(e.prev=8,e.t0=e["catch"](0),!e.t0.response){e.next=17;break}e.t1=e.t0.response.data.error,e.next="Error on the server."===e.t1?14:"Email already taken"===e.t1?15:16;break;case 14:return e.abrupt("return","Error on the server.");case 15:return e.abrupt("return","Email already taken");case 16:return e.abrupt("return",e.t0.response.data.error);case 17:case"end":return e.stop()}},e,this,[[0,8]])}));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"login",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.a.post(p+"/login",{email:t,password:r});case 3:return n=e.sent,a=n.data,e.abrupt("return",a.msg);case 8:if(e.prev=8,e.t0=e["catch"](0),!e.t0.response){e.next=17;break}e.t1=e.t0.response.data.error,e.next="Username or password incorrect"===e.t1?14:"email invalid"===e.t1?15:16;break;case 14:return e.abrupt("return","Username or password incorrect");case 15:return e.abrupt("return","email invalid");case 16:return e.abrupt("return",e.t0.response.data.error);case 17:case"end":return e.stop()}},e,this,[[0,8]])}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"logout",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.a.get(p+"/logout");case 3:return t=e.sent,r=t.data,e.abrupt("return",r.msg);case 8:if(e.prev=8,e.t0=e["catch"](0),!e.t0.response){e.next=17;break}e.t1=e.t0.response.data.error,e.next="Username or password incorrect"===e.t1?14:"email incorrect"===e.t1?15:16;break;case 14:return e.abrupt("return","Username or password incorrect");case 15:return e.abrupt("return","email invalid");case 16:return e.abrupt("return",e.t0.response.data.error);case 17:case"end":return e.stop()}},e,this,[[0,8]])}));function t(){return e.apply(this,arguments)}return t}()}]),e}(),f=b,v=r("7b6a"),j={name:"HeaderComponent",data:function(){return{loginURL:"test.se",msgFromServer:""}},components:{mdbNavbar:v["f"],mdbNavItem:v["e"],mdbNavbarNav:v["h"],mdbNavbarToggler:v["i"],mdbNavbarBrand:v["g"],mdbBtn:v["a"]},methods:{logoutApi:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,f.logout();case 2:this.msgFromServer=e.sent;case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}},g=j,h=(r("dd0b"),r("2877")),y=Object(h["a"])(g,i,u,!1,null,null,null),w=y.exports,k={name:"app",components:{HeaderComponent:w}},x=k,q=(r("034f"),Object(h["a"])(x,a,s,!1,null,null,null)),_=q.exports,O=r("8c4f"),C=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("mdb-card",{staticClass:"card-image",staticStyle:{"background-image":"url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)"}},[r("div",{staticClass:"text-white text-center py-5 px-4 my-5"},[r("div",[r("h2",{staticClass:"card-title h1-responsive pt-3 mb-5 font-bold"},[r("strong",[e._v("The top one tivoli employer!")])]),r("p",{staticClass:"mx-5 mb-5"},[e._v("Make an account to submit your application TODAY!\n      ")]),r("mdb-btn",{attrs:{outline:"white",size:"md",icon:"clone"}},[e._v("Sign up")])],1)])]),r("mdb-container",[e._v("\n          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod diam magna, id cursus diam sagittis quis. Nullam laoreet, sapien eget cursus consequat, ipsum ligula dignissim arcu, quis auctor lorem mauris eu nibh. Phasellus hendrerit elit elit, sed luctus leo porttitor porta. Suspendisse odio orci, venenatis eu lorem vel, finibus fringilla nulla. Morbi vitae nisl a tellus maximus ultricies. Integer semper quis magna nec suscipit. Morbi elementum velit quis nisi venenatis maximus. Aliquam finibus tellus ac augue cursus facilisis. Praesent iaculis auctor odio at cursus. In efficitur, eros quis convallis ornare, urna nunc dictum neque, eget gravida quam arcu at risus. Quisque arcu est, euismod quis blandit sed, gravida id metus.\n\nPraesent nec risus risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur quis magna velit. Maecenas vestibulum placerat ligula ut volutpat. Vestibulum ut nisi erat. Pellentesque porttitor, quam id aliquet iaculis, lacus elit eleifend mi, ac tincidunt urna risus sit amet neque. Vivamus ac dolor ullamcorper, interdum ante ac, pretium lorem.\n\nMorbi tristique ipsum libero, eu feugiat dui suscipit quis. Phasellus laoreet mi augue. Phasellus ac odio laoreet, scelerisque justo nec, lobortis ipsum. Praesent elit quam, consequat sed tortor quis, efficitur mattis leo. Ut iaculis posuere congue. Integer nec efficitur dolor. Donec id leo enim. Proin suscipit nisl vitae semper venenatis. Donec vulputate, dui sed placerat vehicula, arcu erat tempor orci, eget efficitur nisl sapien nec quam. Curabitur efficitur eu erat vitae semper. Duis pharetra dolor justo, at interdum ante pulvinar id. Nam ac ultricies quam. Aenean rutrum arcu et venenatis dignissim. Donec commodo sollicitudin turpis, vitae gravida augue interdum rutrum. Sed ultrices molestie purus, at mattis nibh ullamcorper non. Nunc consectetur erat sem, vel hendrerit odio vestibulum quis.\n\nDonec id ultricies nibh, eu fringilla est. Praesent ultricies, arcu nec consequat hendrerit, nulla arcu sodales dui, non lobortis arcu libero id purus. Sed eget tincidunt metus. Donec quis efficitur lacus. Donec viverra tortor mauris, a condimentum nisi suscipit vitae. Donec dolor sapien, mattis non sollicitudin ac, luctus eu nibh. Duis feugiat quis lorem ullamcorper iaculis. Mauris a lacus nec ipsum congue ultrices. Ut hendrerit lectus a justo lobortis viverra. Donec accumsan semper urna, eu congue mauris eleifend ut. Vestibulum tellus mi, facilisis sodales dignissim et, ornare sed enim. Fusce vitae sollicitudin elit, eget auctor sapien. Integer sodales laoreet pharetra.\n  ")])],1)},z=[],S={name:"HomeComponent",data:function(){return{loginURL:"test.se"}},components:{mdbCard:v["b"],mdbBtn:v["a"],mdbContainer:v["c"]}},R=S,P=(r("d1f6"),Object(h["a"])(R,C,z,!1,null,null,null)),D=P.exports,M=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("mdb-container",{attrs:{id:"login"}},[r("form",{attrs:{method:"post"},on:{submit:e.loginApi}},[r("p",{staticClass:"h4 text-center mb-4"},[e._v("Sign in")]),r("div",{staticClass:"grey-text"},[r("mdb-input",{attrs:{label:"Your email",icon:"envelope",type:"email",name:"email",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),r("mdb-input",{attrs:{label:"Your password",icon:"lock",type:"password",name:"password",required:""},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),r("div",{staticClass:"text-center"},[r("mdb-btn",{attrs:{color:"primary",value:"submit"}},[e._v("Login")])],1),r("span",[e._v("Message: "+e._s(e.msgFromServer))])])])},E=[],F={name:"LoginComponent",components:{mdbContainer:v["c"],mdbBtn:v["a"],mdbInput:v["d"]},data:function(){return{login:!1,msgFromServer:"test",email:"",password:""}},methods:{loginApi:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,f.login(this.email,this.password);case 3:this.msgFromServer=e.sent;case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}},N=F,U=(r("cc47"),Object(h["a"])(N,M,E,!1,null,null,null)),A=U.exports,L=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("form",{attrs:{method:"post"},on:{submit:e.registerApi}},[r("p",{staticClass:"h4 text-center mb-4"},[e._v("Sign up")]),r("div",{staticClass:"grey-text"},[r("mdb-input",{attrs:{label:"Your name",icon:"user",type:"text",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),r("mdb-input",{attrs:{label:"Your email",icon:"envelope",type:"email",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),r("mdb-input",{attrs:{label:"Confirm your email",icon:"exclamation-triangle",type:"text",required:""}}),r("mdb-input",{attrs:{label:"Your password",icon:"lock",type:"password",required:""},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),r("div",{staticClass:"text-center"},[r("mdb-btn",{attrs:{color:"primary",type:"submit"}},[e._v("Register")])],1),e._v("\n  "+e._s(e.msgFromServer)+"\n")])},I=[],T=(r("7f7f"),{name:"RegisterComponent",components:{mdbBtn:v["a"],mdbInput:v["d"]},data:function(){return{register:!1,name:"",email:"",password:"",msgFromServer:""}},methods:{registerApi:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.preventDefault(),alert(this.email+" "+this.name+" "+this.password),e.next=4,f.register(this.name,this.email,this.password);case 4:this.msgFromServer=e.sent;case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}}),H=T,Y=(r("5821"),Object(h["a"])(H,L,I,!1,null,null,null)),$=Y.exports;n["default"].config.productionTip=!1,n["default"].use(O["a"]);var B=new O["a"]({mode:"history",base:"/",routes:[{path:"/",name:"Home",component:D},{path:"/login",name:"Login",component:A},{path:"/register",name:"Register",component:$}]});n["default"].config.productionTip=!1,new n["default"]({router:B,render:function(e){return e(_)}}).$mount("#app")},5821:function(e,t,r){"use strict";var n=r("5eb5"),a=r.n(n);a.a},"5eb5":function(e,t,r){},"64a9":function(e,t,r){},"81af":function(e,t,r){},cc47:function(e,t,r){"use strict";var n=r("81af"),a=r.n(n);a.a},d1f6:function(e,t,r){"use strict";var n=r("0655"),a=r.n(n);a.a},dd0b:function(e,t,r){"use strict";var n=r("4ec8"),a=r.n(n);a.a}});
//# sourceMappingURL=app.4241303a.js.map