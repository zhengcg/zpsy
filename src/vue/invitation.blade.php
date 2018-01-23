<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <title>玛娜花园</title>
    <link rel="stylesheet" href="{{ autoVersion('static/css/mobile/toInvitation.css') }}"/>
</head>
<body ontouchstart class="body-pd-top" id="app">
    <header class="header-fixed">
        <div class="mana-header">
            <div class="mana-header-left">
                <a class="mana-header-back"  onclick="window.history.back();">
                    <i class="icon icon-back"></i>
                </a> 
            </div> 
            <h1 class="mana-header-title">邀请好友,一起来赚</h1> 
        </div>
    </header>
    <img class="invitationBox" src="{{ asset('static/images/mobile/user/bg_invitation5.png') }}" />
	<script type="text/javascript" src="{{ asset('/static/js/common/zepto.min.js') }}"></script>
    <script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" charset="utf-8">
	var shareOpt = {
		title:'Hi,朋友,送你5元新手红包,一起来赚!',
		desc:'玛娜花园,数据银行领导者',
		link:'',
		icon:'https://m.mana.com/static/images/mobile/shareicon.png',
	}
	$(function(){
		function getInviteCode(resolve,reject){
	    	$.ajax({
	    		url:'/user/code',
	    		success:function(data){
	    			if(data.respCode=="0"){
	    				shareOpt.link='https://m.mana.com/public/activity/invitation?invited_code='+data.data.baseinfo.invited_code+'&song=weixin';
	    			}
	    			resolve(data)
	    		}
	    	})
		};
		function wxConfig(resolve,reject){
		    wx.config({!!$js!!});
		}
		var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	    	new Promise(getInviteCode).then(function(val){
	    		return new Promise(wxConfig);
			});
	    }else{
	    	alert('请用微信浏览器打开！')
	    }
	    wx.ready(function(){
	    	wx.onMenuShareTimeline({
			    title: shareOpt.title, // 分享标题
			    link: shareOpt.link, // 分享链接
			    imgUrl: shareOpt.icon, // 分享图标
			    success: function () { 
			        _czc.push(['_trackEvent', '邀请好友', '分享', '分享朋友圈']);
			    },
			    cancel: function () { 
			        _czc.push(['_trackEvent', '邀请好友', '分享', '取消分享朋友圈']);
			    }
			});

			wx.onMenuShareAppMessage({
			    title: shareOpt.title, // 分享标题
			    desc: shareOpt.desc, // 分享描述
			    link: shareOpt.link, // 分享链接
			    imgUrl: shareOpt.icon, // 分享图标
			    success: function () { 
			        _czc.push(['_trackEvent', '邀请好友', '分享', '分享微信好友']);
			    },
			    cancel: function () { 
			        _czc.push(['_trackEvent', '邀请好友', '分享', '取消分享微信好友']);
			    }
			});
	    })
	})
</script>
<script src="https://s4.cnzz.com/z_stat.php?id=1260587961&web_id=1260587961" language="JavaScript"></script>
</body>
</html>
