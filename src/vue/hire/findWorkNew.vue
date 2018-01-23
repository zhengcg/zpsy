<template>
	<div id="homePage">
		<mt-header fixed title="正品溯源">
		  <router-link :to="{name:'userinfo'}" slot="right">
		  	<img class="headerImg" src="../../assets/users/icon/icon_reset.png">
		  </router-link>
		</mt-header>
		<div class="breakbox"></div>
		<div @click="swipeClick" id="swipeDiv">
	    	<mt-swipe class="myswipe" :auto="3000" >
		  		<mt-swipe-item v-for="(banner,index) in list_banner" :data-value="banner.jumpUrl" class="swiper-slide">
		  			<img :src="banner.image" :title="banner.title"/>
		  		</mt-swipe-item>
	    	</mt-swipe>
    	</div>
    	<div class="richScan"  @click="scanQRCode">
    		<img src="../../assets/users/icon/home_scan.png"/>
    	</div>
		<div class="feedbackBox">
			<div class="feedbackTitle">
				<span>正品优选</span>
				<router-link to="/optimizationList">
					<span class="fr time">更多</span>
				</router-link>
			</div>
			<div class="feedbackImgs">
				<span class="introImg fl" v-for="img in list_preference" v-show="list_preference">
					<a :href="img.jumpUrl"><img :src="img.image"/></a>
				</span>
			</div>
		</div>
    	<a :href="activity.jumpUrl" class="activityBox" v-for="(activity,index) in list_frontpage">
    		<div class="activityHead">
    			<img :src="activity.image" v-if="activity.image"/>
    			<img v-else src="../../assets/users/icon/icon_head_portrait.png">
				<span class="activityTitle">
					<span v-text="activity.title"></span>
				</span>
    		</div>
			<div id="activityBody">
				<div class="activityUser">
					<span class="contentImg">
						<img :src="activity.field1" v-if="activity.field1">
						<img v-else src="../../assets/users/icon/icon_head_portrait.png">
					</span>
					<span class="contentName" v-text="activity.field2">
					</span>
				</div>
				<p class="activitIntro" v-text="activity.detail">
				</p>
			</div>
    	</a>
    	<div class="base-empty-div"></div>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default{
		name:'findWork',
		data(){
			return {
				dataList:'',
				tokenLiist:'',
				banners:[{path:'../../../dist/366bc1e4529ca90ff92a36cd319a45b1.png'},{path:'../../../dist/366bc1e4529ca90ff92a36cd319a45b1.png'},{path:'../../../dist/366bc1e4529ca90ff92a36cd319a45b1.png'}],
				activities:[{path:'../../assets/users/icon/icon_goodslogo.png'},{path:'../../../dist/366bc1e4529ca90ff92a36cd319a45b1.png'},{path:'../../../dist/366bc1e4529ca90ff92a36cd319a45b1.png'}],
				shareOpt : {
					title:'Hi,朋友,送你5元新手礼包',
					desc:'玛娜花园,数据银行领导者',
					link:'',
					icon:'https://m.mana.com/static/images/mobile/shareicon.png',
				},
				ua : '',
				api : {
					getList :'/genuine/advertisement/getList',
					signForH5:'/genuine/user/signForH5',
					getDataForloginH5ByWeixin: "/genuine/login/getDataForloginByH5"
				},
				imgs:['../../assets/users/icon/icon_goodslogo.png','../../assets/users/icon/icon_goodslogo.png','../../assets/users/icon/icon_goodslogo.png'],
				list_banner:'',
				list_frontpage:'',
				list_preference:'',
			}
		},
		mounted: function() {
			$(window).scrollTop(0);
			this.getDataForloginH5ByWeixin();
			this.getActivity();
			// this.getBanner();			
			
		},
		
		methods:{
			// 获取H5端，微信登录接口之后的用户数据
			getDataForloginH5ByWeixin: function(){
		      // var params = {};
		      //     params.pageNo = 1;
		          this.$http({
		            method:'post',
		            url:this.api.getDataForloginH5ByWeixin,
		            // params:params,
		            // headers: {"token": "14af3bb2ca6a42429648f347b89ea158"},
		            emulateJSON: true,
		            before:function(){
		              Indicator.open('加载中...');
		            }
		          }).then(function(res){
		            Indicator.close();
		            console.log(res.data)
		            var data=res.data;
		            var _this =this;
		            if(data.errorCode=="0"){
		                _this.dataList = data.result;
		                var str = JSON.stringify(_this.dataList);
    					window.localStorage.setItem("locParams",str);
    					// this.getConfig();
		            }else{
		              // Toast(data.reason)
		            }
		          },function(res){
		            Indicator.close();
		            
		            Toast({
		                    message: '系统错误,请刷新',
		                    position: 'middle',
		                    duration: 1000
		            });
		          })
	    	},
	    	// 返回数据给微信用户
			getConfig:function(){
				var params = {};
				params.targetUrl = location.href.split("#")[0];
				// console.log(location.origin);
				this.$http({
					params :params,
			          method:'GET',
			          url:this.api.signForH5,
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					var data=res.data;
					var _this =this;
					if(data.errorCode=="0"){
						
						// Toast({
					 //            message: data.result,
					 //            position: 'middle',
					 //            duration: 1000
						// 	});
						wx.config(data.result);
					    wx.ready(function(){
					    	
					  //   	wx.onMenuShareTimeline({
							//     title: 13123, // 分享标题
							//     link: this.shareOpt.link, // 分享链接
							//     imgUrl: this.shareOpt.icon, // 分享图标
							//     success: function () { 
							//         _czc.push(['_trackEvent', '邀请好友', '分享', '分享朋友圈']);
							//     },
							//     cancel: function () { 
							//         _czc.push(['_trackEvent', '邀请好友', '分享', '取消分享朋友圈']);
							//     }
							// });
							// wx.onMenuShareAppMessage({
							//     title: '正品溯源', // 分享标题
							//     desc: '看见真实的幸福', // 分享描述
							//     link: 'http://app.izheng.org/', // 分享链接
							//     imgUrl: '../../assets/users/icon/icon_placeHoldeImage.png', // 分享图标
							//     // success: function () { 
							//     //     _czc.push(['_trackEvent', '邀请好友', '分享', '分享微信好友']);
							//     // },
							//     // cancel: function () { 
							//     //     _czc.push(['_trackEvent', '邀请好友', '分享', '取消分享微信好友']);
							//     // }
							// });

					    });
					    wx.error(function(res){
					    	  Toast({
				                    message: '微信签名失败',
				                    position: 'middle',
				                    duration: 1000
				            });
						    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

						});
					}else{
					  	Toast({
		                    message: '系统错误,请刷新',
		                    position: 'middle',
		                    duration: 1000
	        			});
					}
				},function(res){
					Indicator.close();
					Toast({
			            message: '系统错误,请刷新',
			            position: 'middle',
			            duration: 1000
					});
				})
			},
			scanQRCode:function(){
		       	wx.scanQRCode({ 
	                needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，  
	                scanType : [ "qrCode", "barCode" ], // 可以指定扫二维码还是一维码，默认二者都有  
	                success : function(res) {
                		var length1 = res.resultStr.split("/").length;
	                    var aa = res.resultStr.split("/")[length1-1];
	                    if(res.errMsg === "scanQRCode:ok"){
	                      location.href = 'http://app.izheng.org/#/richScan?code='+res.resultStr;
	                    } 
	                   	
	                },
	                error:function(res){	
	                	Toast({
			            message: '系统错误,请刷新',
			            position: 'middle',
			            duration: 1000
					});
	                }  
	            });
			},
			//swipe跳转
			swipeClick:function(){
				window.location.href=$('.is-active').attr("data-value");
      		},
			//获取活动图片
			getActivity(){
				// alert(this.api.getList)
		      	this.$http({
			          method:'GET',
			          url:this.api.getList,
			          emulateJSON: true,
				//       headers: {"token": "c3b20d78eeac42848f7eb001bd6f8a6d"},
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					console.log(res.data)
					var data=res.data;
					var _this =this;
					if(data.errorCode=="0"){
							_this.list_banner = data.result.list_banner;
							_this.list_frontpage = data.result.list_frontpage;
							_this.list_preference = data.result.list_preference;
							console.log(_this.list_preference)
					}else{
						// Toast(data.reason)
					}
				},function(res){
					Indicator.close();
					Toast({
			            message: '系统错误,请刷新',
			            position: 'middle',
			            duration: 1000
					});
				})
			}
		}
	}
</script>
<style lang="sass">
.mint-swipe-indicator{background: #fff!important;}
		#homePage{
			.headerImg{
			    height: 20px;
			    width: 20px;
			    display: inline;
			}
			.feedbackBox{
				margin-top: 10px;
				background: #fff;
				margin-bottom: 10px;
				.feedbackTitle{
					padding: 10px 20px;
				}
				.time{
					font-size: 0.8em;
				}
				.feedbackImgs{
				    width: 97%;
				    height: 100px;
				    margin: 0 10px;
					.introImg{
						width:33.33% ;
						display: block;
						padding-bottom: 10px;
						padding-top: 10px;
					    padding-right: 10px;
						min-height: 4rem;
						box-sizing: border-box;
						position:relative ;
						img{
							// height: 5.6rem;
							width: 100%;
							background:#000;
						}
						.introName{
						    position: absolute;
						    top: 50%;
						    left: 50%;
						    display: inline-block;
						    margin-left: -26%;
    						margin-top: -6%;
    						color: #fff;
    						padding-bottom: 10px;	
    						border-bottom: 1px solid #fff;
						}
					}
				}
			}
			img{
		      width: 100%;
		      display: block
		  	}
			.next{
				background:url(../../assets/advert/icon-company.png) no-repeat;
			    position: fixed;
			    height: 30px;
			    width: 30px;
			    top: 13px;
			    right: 5px;
			    z-index: 1000;
			}
			.utilBtn{
				background: url(../../assets/advert/icon-company.png) no-repeat;
			}
			#swipeDiv{
				.mint-swipe {
			        height: 300px;
			        color: #fff;
			        font-size: 30px;
			        text-align: center;  
		      	}
			      .myswipe{
			      	height:200px;
			      	img{
			      		height: 100%;
			      		width: 100%;
			      	}
			      }
			}
			.richScan{
				margin-top: 10px;
				background: #FFFFFF;
				text-align: center;
				img{
					padding-top: 10px;
				}
			}
			.activityBox{
				position:relative;
			    margin-top: 10px;
			    background: #fff;
			    text-align: center;
			    padding-bottom: 10px;
			    .activityHead{
			    	position: relative;
			    	.activityTitle{
			    	    position: absolute;
					    bottom: 0;
					    left: 0;
					    margin-left: 20px;
					    // margin-bottom: 15px;
					    // background: rgba(0, 0, 0, 0.5);
					    // width: 75%;
					    color: #fff;
					    padding: 10px;
					    border-radius: 10px;
				        word-break: break-word;
			            text-align: left;
				    }
			    }
			    #activityBody{
			    	p{
						margin:0 20px;
						word-break: break-word;
						line-height: normal;
						text-align: left;
						font-size:0.9em;
						margin-bottom:10px;
					}
			    	.activityUser{
			    		overflow: hidden;
			    		.contentImg{
						    height: 40px;
						    width: 40px;
						    float: left;
						    margin:20px 20px;
						    margin-right: 10px;
						}
						.contentName{
							float: left;
							line-height: 60px;
							padding: 10px 0;
							font-size: 1em;
						}

			    	}
					
			    }
			    
			}
		} 	
</style>
