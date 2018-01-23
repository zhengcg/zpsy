var optionTitle = {
	pageTitle:'',//导航名字
	buttonTilte:'',//右边按钮
	buttonColor:'',//右边按钮方法名
	buttonClickFunction:'',//当前页面名称,
	navgationBarColor:'',//导航栏颜色
	isFavorites:'',
	asdff:''
};
var platformParams = '';
function submitPlatformInfo(platformJson){
	if(platformJson){
		var platformJson1 = JSON.parse(platformJson)
		platform = platformJson1.platform;
	}
}
function appHideTitle(){
	if(navigator.userAgent.split('platformParams=')[1]){
		platformParams =  JSON.parse(navigator.userAgent.split('platformParams=')[1]);
	}else{
		return;
	}
	if(platformParams.platform == 'ios'){
		if(!!$('.mint-indicator-wrapper')){
			$('.mint-indicator-wrapper').top="40%";
		}
		if(!!$('.breakbox')){
			 $('.breakbox').height(0);
		}
		$('.title1').hide();
		window.webkit.messageHandlers.getNavigationBarInfo.postMessage(optionTitle);
	}else if(platformParams.platform == 'android'){
		if(!!$('.mint-indicator-wrapper')){
			$('.mint-indicator-wrapper').top="40%";
		}
     	$('.title1').hide();
		if(!!$('.breakbox')){
			 $('.breakbox').height(0);
		}
		if(!!$(".companyIntro")){
			$(".companyIntro").css({'margin-top':'0px'});
		}
			AndroidAndIosObj.getNavigationBarInfo(JSON.stringify(optionTitle));
		}
}
