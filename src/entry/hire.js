import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import '../scss/common.scss'
import '../assets/animate.min.css'
import routes from '../router/router.js'




import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import 'plupload'
// import 'qiniu-js'


Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(VueResource);
// Vue.use(plupload);
// Vue.use(qiniuJs);
var getOS = function() { 
	//获取用户代理 
	var ua = navigator.userAgent; 
	if (ua.indexOf("Windows NT 5.1") != -1) return "Windows XP"; 
	if (ua.indexOf("Windows NT 6.0") != -1) return "Windows Vista"; 
	if (ua.indexOf("Windows NT 6.1") != -1) return "Windows 7"; 
	if (ua.indexOf("iPhone") != -1) return "ios"+" "+(navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/))[1].replace(/_/g,"."); 
	if (ua.indexOf("iPad") != -1) return "iPad"; 
	if (ua.indexOf("Linux") != -1) { 
	var index = ua.indexOf("Android"); 
	if (index != -1) { 
	//os以及版本 
	var os = ua.slice(index, index+13); 

	//手机型号 
	var index2 = ua.indexOf("Build"); 
	var type = ua.slice(index, index2); 
	// console.log(type);
	// console.log(os);
	// return type + os; 
	return os
	} else { 
	return "Linux"; 
	} 
	} 

	return "未知操作系统"; 
} 

Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push(function(request, next) {
	var timestamp=new Date().getTime();
    request.headers.set('platform','3');
    request.headers.set('client','1');
    request.headers.set('os',getOS());
    request.headers.set('mobileType','');
    request.headers.set('version','');
    request.headers.set('channel','');
    request.headers.set('uuid','');
    // request.headers.set('token','');
    request.headers.set('timestamp',timestamp.toString());
  next();
});

const router = new VueRouter({
 	// mode: 'history',
	routes: routes, // short for routes: routes
	linkActiveClass: 'active' //router-link的选中状态的class，也有一个默认的值
});
router.beforeEach((to, from, next) => {
	window.scrollTo(0,1000)
	next()
})
const app = new Vue({
	router
}).$mount('#app');
