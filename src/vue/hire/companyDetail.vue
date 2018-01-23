<template>
	<div id="companyDetail" class="transWrap">
	    <mt-header class="title" title="公司简介">
      		<span class="backprev" @click="backPage" slot="right"></span>
		</mt-header>
		<div class="companyIntro">
	  		<img :src="merchants.logo" v-if="merchants.logo"  class="fl">
	     	<img  class="fl" v-else src='src/assets/hire/img_placeholder.png'>
			<div id="companyDetail">
				<h4 v-text="merchants.enterprise_name"></h4>
				<div class="companyReferral">
					<span v-text="merchants.merchant_type"></span>|
					<span v-text="merchants.merchant_size"></span>|
					<span v-text="merchants.trade_code"></span>
				</div>
			</div>
		</div>
		<div class="companySite" v-text="merchants.address"></div>
		<div class="companyState">
			<h4 class="StateName">公司介绍</h4>
			<p v-text="merchants.merchant_desc">
			</p>
			<div class="Comimgs">
				<span  class="introImg fl" v-for="img in imgs" v-show="imgs">
					<img  :src="img" @click="gallery($event)"/>
				</span>
			</div>
		</div>
		<div class="gallery" @click="galleryRes()">
        	<span>
        		<img src="" alt="">
        	</span>
        </div>
		<div class="companyPosition">
			<span class="positionTitle"> 
				招聘职位
			</span>
			<div class="positionList" v-for="positionList in positionLists" @click="divClick(positionList.recruit_id)" >
				<div class="positionFirst">
					<h4 v-text="positionList.job_type"></h4>
					<div class="positionMoney fr red" v-text="'【'+positionList.pay+'】'"></div>
				</div>
				<div class="positionSecond">
					<span class="positionSite" v-text="positionList.work_place_province+' '+positionList.work_place_city"></span>
					<span class="positionEdu" v-text="positionList.edu"></span>
				</div>
				<div class="positionThirdly">
					<span class="matchingRate">匹配度:<span class="blue" v-text="positionList.points+'%'"><span></span></span>
					<div class="fr positionTime" v-text="positionList.create_at"></div>
				</div>
			</div>
		</div>
		<div class="base-empty-div">
		</div>
		<div class="comAttention">
			<mt-button v-if="btnType" type="primary" id="felxBtn" @click="saveAttention">关注公司</mt-button>
			<mt-button v-else class="blue"  id="felxBtn" @click="saveAttention">取消关注</mt-button>
		</div>
	</div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
	export default {
		name:'companyDetail',
		data(){
			return {
				windowHah: '',
				id:'',
				imgs:[],
				merchants:{},
				btnType:false,
				positionLists:[]
			}
		},
		created(){
			optionTitle.pageTitle = '公司简介';
			this.fetchData();
			this.getCompanyList();
			this.getPositionList();
		},
		watch:{
			'$route':'fetchData'
		},
		mounted:function(){

   			$(window).scrollTop(0);
			appHideTitle();
		},
		methods:{
			gallery(event){
				var src = event.toElement.src;
				var st = $(window).scrollTop();
				$('.gallery span img').attr('src', src);
				$('.gallery').css({
					'visibility': 'visible',
					'top': st
				});
//				$('body').css({
//					' overflow-y':'hidden'
//				})
			},
			 //图片还原
		    galleryRes:function(){
		    	$('.gallery').css({
					'visibility': 'hidden'
				});
//				$('body').css({
//					' overflow-y':'auto'
//				})
		    },
			divClick(id){
				var cliUrl = '/positionDetail/'+id;
//					if(window.webkit){
//					window.webkit.messageHandlers.gotoCompanyIntroduce.postMessage(id);
//				}else{
//					this.$router.push(cliUrl);
//				}
				this.$router.push(cliUrl);
			},
			backPage(){
				window.history.go(-1)
			},
			fetchData(){
				this.id=this.$route.params.id;
			},
			saveAttention(){
				var userFollowMerchantsUrl = '/hire/userFollowMerchants/'+this.id;
				this.$http.get(userFollowMerchantsUrl,{
					before:function(){
						Indicator.open('加载中')
					}
				}).then(function(response){
					
					if(response.data.respCode=='0'){
						this.btnType = !this.btnType;
					}else{
						Toast(response.data.reason);
					}
					Indicator.close();
				},function(response){
					response.data.respCode.parseInt()
					Indicator.close();
					Toast(response.data.reason);
				})
			},
			getPositionList(){
				var positionUrl = '/hire/merchantadlist/'+this.id;
				this.$http.get(positionUrl,{
					before:function(){
						Indicator.open('加载中')
					}
				}).then(function(response){
					if(response.data.respCode == '0'){
						this.positionLists = response.data.data;
						Indicator.close();
					}else{
						Toast(response.data.reason);
					}
					
				},function(response){
					Indicator.close();
					Toast(response.data.reason);
				})
			},
			getCompanyList(){
				var param ={};
				param.id =this.id;
				var companyUrl = '/hire/companydetail/'+this.id;
				this.$http.get(companyUrl,{
					before:function(){
						Indicator.open('加载中')
					}
				}).then(function(response){
					Indicator.close();
					var data = response.data.data;
					this.merchants = data;
					this.imgs = data.img;
					if(data.isFollow == 0){
						this.btnType = true;
					}else{
						this.btnType = false;
					}
				},function(response){
					Indicator.close();
					Toast(response.data.reason);
				})
			}
		}
	}
</script>
<style lang="sass">
	#companyDetail{
		.red{color:#ed6f72}
		.blue{color:#4ba5fb;}
		font-size: 14px;
		.header-middle{
			font-size:1.5em;
		}
		.fl{float: left;}
		.fr{float: right;}
		.clear{clear:both;}
	.Comimgs{
		width: 100%;
		height: 100px;
	}
	.companyIntro {
			position: relative;
			height: 90px;
			margin-top: 50px;
			padding:10px;
			padding-left:20px ;
			border-bottom: 1px solid #f7f7f7;
			background-color:#FFFFFF ;
			height: auto;
			#companyImg{
				padding:10px;
				padding-left:30px ;
			}
			img{
				margin-top: 14px;
				margin-left:5px ;
		        height: 40px;
		        width: 40px;
			}
			#companyDetail{
				position:relative;
				padding-left: 55px;
				padding-top:15px ;
				box-sizing: border-box;
			}
			.companyReferral{
				color: #a6a6a6;
				margin-top:10px ;
				margin-right: 10%;
			    overflow: hidden;
			    line-height: initial;
			    span{
			    	display: inline-block;
    				line-height: 1.5;
		        	padding-right: 5px;
			    }
			}
		}
	.companySite{
		position: relative;
		padding:10px;
		padding-left:45px;
		background:#FFFFFF ;
		height:35px;
		height:auto; 
		line-height:1.5;
		&:before{
			position: absolute;
			left: 25px;
			content: '';
			top: 10px;
			height:18px;
			width: 30px;
			background: url(../../assets/hire/icon-address-active.png) no-repeat;
			background-size: auto 100%;
		}
	}
	.companyState{
		margin-top:10px ;
		margin-bottom:10px ;
		padding-left:20px;
		padding-right:20px ;
		border-top: 1px solid #f7f7f7;
		background:#FFFFFF ;
		.StateName{
			padding-top:10px ;
			padding-bottom:10px ;
			border-bottom: 1px solid #f7f7f7;
			position: relative;
			padding-left:28px;
			background:#FFFFFF ;
			&:before{
				position: absolute;
				left: 3px;
				content: '';
				top: 8px;
				height:18px;
				width: 30px;
				background: url(../../assets/hire/icon-home.png) no-repeat;
				background-size: auto 100%;
			}
		}
		p{
			padding-top:10px ;
			line-height:180%;
			word-wrap:break-word ;
		}
	}
	.introImg{
		width:33.33% ;
		display: block;
		padding-bottom: 10px;
		padding-top: 10px;
	    padding-right: 10px;
		min-height: 4rem;
		box-sizing: border-box;
		img{
			height: 4.6rem;
			width: 100%;
		}
	}
	.companyPosition{
		padding:20px ;
		background: #ffffff;
	    span{
		/*padding-left:20px;*/
		position:relative; 
			&:before {
					position: absolute;
					left: 0px;
					top: -2px;
					content: '';
					width: 30px;
					height: 18px;
			}
		}
		.positionTitle{
			padding-left:20px; 
			&:before{
				background: url(../../assets/hire/icon-order.png) no-repeat;	
				background-size: auto 100%;
			}			
		}
		/*.positionSite:before{
			background: url(../../assets/hire/icon-adress.png) no-repeat;	
			background-size: auto 100%;
		}
		.positionEdu{
			padding-left:30px; 
			&:before{
			background: url(../../assets/hire/icon-degree.png) no-repeat;	
			background-size: auto 100%;
			}
		}*/
		
	}
	.positionFirst {
		position: relative;
		margin-top:10px ;
		padding: 0 0 10px;
	}
	.positionList{
		position: relative;
		border-top:1px solid #f3f3f3;
		margin-top:20px ;
		margin-bottom: 20px;
		margin-right:20px; 
		color:#666666;
		h4{
			color: #333333;
		}
		&:after{
			    position: absolute;
			    content: '';
			    right: -40px;
			    top: 45%;
			    width: 25px;
			    height: 25px;
			    /*margin-top: -6px;*/
			    background: url(../../assets/hire/arrleft.png) no-repeat;
			    background-size: auto 100%;
		}
	}
	.positionThirdly{
		padding-top:10px ;
		.positionTime{
			color: #999999;
		}
	}
	#felxBtn{
		border-radius:0px ;
	    text-align: center;
	    position: fixed;
	    bottom: 0;
	    width: 100%;
	    z-index: 100;
	    height: 50px;
	}
}
	
</style>