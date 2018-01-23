import index from '../vue/hire/index.vue'
import home from '../vue/hire/home.vue' //主页
import userinfo from '../vue/hire/userinfo.vue'

import findWork from '../vue/hire/findWork.vue'
import web1 from '../vue/hire/web1.vue'
import web2 from '../vue/hire/web2.vue'
//扫一扫
// import richScan  from '../vue/hire/richScan/richScanNew.vue'
import richScan  from '../vue/hire/richScan/richScan.vue'
import reportIndex from '../vue/hire/richScan/reportIndexNew.vue'
// import reportIndexNew from '../vue/hire/richScan/reportIndexNew.vue'
import goodsDetails from '../vue/hire/richScan/goodsDetails.vue'
import goodsDetailsShow from '../vue/hire/richScan/goodsDetailsShow.vue'

import reportDetail from '../vue/hire/richScan/reportDetail.vue'

//排行榜-模块
import history from '../vue/hire/history/history.vue'

//个人信息

import opinion from '../vue/hire/about/opinion.vue'
import aboutUs from '../vue/hire/about/aboutUs.vue'
import agreement from '../vue/hire/about/agreement.vue'
import cooperation from '../vue/hire/about/cooperation.vue'

//消息-模块
import news from '../vue/hire/news/news.vue'
import news1 from '../vue/hire/news/news1.vue'
import news2 from '../vue/hire/news/news2.vue'
import newsDetails from '../vue/hire/news/newsDetails.vue'
import commentsHot from '../vue/hire/news/commentsHot.vue'
//正品优选

import optimizationList from '../vue/hire/news/optimizationList.vue'
import optimization from '../vue/hire/news/optimization.vue'
//我的-模块
import user from '../vue/hire/user.vue'
import integral from '../vue/hire/users/integral'
import integralRules from '../vue/hire/users/integralRules'
import comments from '../vue/hire/users/comments'
import collection from '../vue/hire/users/collection'
import message from '../vue/hire/users/message'
import report from '../vue/hire/users/report'
import feedback from '../vue/hire/users/feedback'

// 落地页
import downLoad from '../vue/hire/downLoad.vue'
export default [
	{
		path: '/home',
		component: home,
    	name:'home',
		children: [{
			path: '/home/findwork',
			name: 'findwork',
			component: findWork,
		}, {
			path: '/home/user',
			name: 'user',
			component: user,
		}, {
			path: '/home/news',
			name: 'news',
			component: news,
		},{
			path: '/home/news1',
			name: 'news1',
			component: news1,
		},{
			path: '/home/news2',
			name: 'news2',
			component: news2,
		}, {
			path: '/home/history',
			name: 'history',
			component: history,
		},{
			path:'/home',
			redirect:'/home/findwork'
		}]
	}, {
		path: '/userinfo',
		name: 'userinfo',
		component: userinfo
	},{
		path:'/richScan',
		name:'richScan',
		component:richScan
	},{
		path:'/integral',
		name:'integral',
		component:integral
	},{
		path:'/integralRules',
		name:'integralRules',
		component:integralRules
	},{
		path:'/comments',
		name:'comments',
		component:comments
	},{
		path:'/collection',
		name:'collection',
		component:collection
	},{
		path:'/message',
		name:'message',
		component:message
	},{
		path:'/report',
		name:'report',
		component:report
	},{
		path:'/reportDetail',
		name:'reportDetail',
		component:reportDetail

	},{
		path:'/feedback',
		name:'feedback',
		component:feedback
	},{
		path:'/reportIndex',
		name:'reportIndex',
		component:reportIndex
	},{
		path:'/newsDetails',
		name:'newsDetails',
		component:newsDetails
	},{
		path:'/commentsHot',
		name:'commentsHot',
		component:commentsHot
	},{
		path:'/goodsDetails',
		name:'goodsDetails',
		component:goodsDetails
	},{
		path:'/goodsDetailsShow',
		name:'goodsDetailsShow',
		component:goodsDetailsShow
	},
	{
		path:'/opinion',
		name:'opinion',
		component:opinion
	},{
		path:'/aboutUs',
		name:'aboutUs',
		component:aboutUs
	},{
		path:'/agreement',
		name:'agreement',
		component:agreement
	},{
		path:'/cooperation',
		name:'cooperation',
		component:cooperation
	},{
		path:'/optimization',
		name:'optimization',
		component:optimization
	},{
		path:'/optimizationList',
		name:'optimizationList',
		component:optimizationList
	},{
		path:'/web1',
		name:'web1',
		component:web1
	},{
		path:'/web2',
		name:'web2',
		component:web2
	},{
		path:'/downLoad',
		name:'downLoad',
		component:downLoad
	},{
		path:'/',
		redirect:'/home'
	}

]