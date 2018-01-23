<template>
	<div id="positionDetail" class="transWrap">
	    <mt-header class="title" title="职位详情">
      		<span class="backprev" @click="backPage" slot="right"></span>
		</mt-header>
		<div v-if="!positionOver">
			<div class="positionDetail">
				<div class="positionFirst">
					<div class="firstText fl" v-bind:class="{'w100':w100,'w70':w70}">
						<h4 class="fl" v-text="title"></h4>
						<span class="red" v-text="'【'+pay+'】'" v-show="pay"></span>
					</div>
					<div class="fr money" v-text="task_reward" v-show="task_reward"></div>
					<div class="clear"></div>
				</div>
				<div class="positionSecond">
					<span class="area" v-text="work_city" v-show="work_city"></span>
					<span class="workTime" v-text="work_experience" v-show="work_experience"></span>
					<span class="positionEdu" v-text="educational" v-show="educational"></span>
					<span class="positionWork" v-text="working_property" v-show="working_property"></span>
				</div>
				<div class="positionThirdly">
					<span v-for='company_benefit in company_benefits' v-text="company_benefit"></span>
				</div>
			</div>
			<div class="companySiteBox">
				<div class="companySite" >
					<span v-text="companySite"></span>
				</div>
			</div>
				<div class="companyIntro" @click="goCompany(merchants.merchant_origins_id)">
					<img :src="merchants.logo" v-if="merchants.logo"  class="fl">
		     		<img  class="fl" v-else src='src/assets/hire/img_placeholder.png'>	
					<div id="companyDetail">
						<div class="companyName" v-text="merchants.enterprise_name"></div>
						<div class="companyReferral">
							<span v-text="merchants.merchant_type"></span>|
							<span v-text="merchants.merchant_size"></span>|
							<span v-text="merchants.trade_code"></span>
						</div>
					</div>
				</div>
			<div class="positionInfo">
				<h4 class="positionAsk">职务描述</h4>
				<span>任职要求:</span>
				<div v-html="job_requirements"></div>
				<span class="workSpan">工作职责:</span>
				<div v-html="job_responsibilities"></div>
			</div>
			<div class="base-empty-div">
			</div>
			<div class="comAttention">
				<mt-button type="default" id="felxBtn" @click="saveCollect">
					<div v-if="jobImg">
						<span class="blue collected">已收藏</span>
					</div>
					<div v-else>
						<span class="collect">收藏</span>
					</div>
				</mt-button>
				<div v-if="btnType">
					<mt-button  type="primary"id="posBtn" @click="saveApply">申请职位</mt-button>
				</div>
				<div v-else>
					<mt-button disabled type="default" id="posBtn" @click="saveApply">已申请</mt-button>
				</div>
			</div>
		</div>
		<div v-else class="positionOver">
			<img src="../../assets/hire/positionOver.png"/>
		</div>
	</div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
 import { MessageBox } from 'mint-ui';
	export default{
		name:'positionDetail',
		data(){
			return{
				path:'',
				id:"",
				title:'',
				company_benefits :[],
				working_property:'',
				educational:'',
				work_experience:'',
				task_reward:'',
				pay:'',
				work_city:'',
				companySite:'',
				merchants:[],
				job_requirements:'',
				job_responsibilities:'',
				btnType:false,
				jobImg:false,
				status:false,
				param:{},
				jobCreat:1,
				jobName:0,
				w100:true,
				w70:false,
				positionOver:false
			}
		},
		created(){
			optionTitle.pageTitle = '招聘详情';
			this.fetchData();
			this.getPosition();
		},
		watch:{
			'$route':'fetchData'
		},
		mounted() {
   			$(window).scrollTop(0);
			appHideTitle();
		  },
		methods:{
			 confirmResume(){
		      var vm = this;
		      $.ajax({
		          type: 'GET',
		          dataType: 'json',
		          url: '/hire/confirm',
		          beforeSend: function(){
		              Indicator.open('加载中...');
		          },
		          success: function(res){
		            Indicator.close();
		            if(res.respCode!="0"){
		              vm.$router.push('/resume_create');
		            } else {
		              vm.$router.push('/resume');
		            }
		          },
		          error: function() {
		              Indicator.close();
		              Toast({
		                message: '信息获取失败！',
		                position: 'middle',
		                duration: 1000
		              });
		          }
		      });
		    },
			goCompany(id){
//				if(window.webkit){
//					window.webkit.messageHandlers.gotoCompanyIntroduce.postMessage(id);
//				}else{
//					this.$router.push("/companyDetail/"+id);
//				}
	this.$router.push("/companyDetail/"+id);
			},
			backPage(){
				window.history.go(-1)
			},
			fetchData(){
        		this.param = this.$route.params;
        		this.path = this.$route.path;
			},
			//申请职位
			saveApply(){
				var ts = this;
				if(ts.jobCreat == 0){
					layer.open({
						icon: 4,
						content: '体验更多功能<br/>请先完善您的简历',
						shadeClose:false,
						btn:['立即完善','暂不完善'],
						yes:function(){
							layer.closeAll();
							if(platformParams.platform == 'ios'){
								window.webkit.messageHandlers.gotoPerfectInfo.postMessage(null);
							}else if(platformParams.platform == 'android'){
								AndroidAndIosObj.gotoPerfectInfo();
							}else{
								layer.closeAll();
								ts.confirmResume();
							}
						},
						no:function(){
							layer.closeAll();
						}
					});
				}else if(ts.jobCreat == 1){
						if(ts.jobName == 0){
							layer.open({
								icon: 12,
								content: '申请职位请先实名认证',
								shadeClose:false,
								btn:['立即认证','暂不认证'],
								yes:function(){
									layer.closeAll();
									if(platformParams.platform == 'ios'){
										optionTitle = '职位详情';
										window.webkit.messageHandlers.gotoCertifyRealName.postMessage(null);
									}else if(platformParams.platform == 'android'){
										optionTitle = '职位详情';
										AndroidAndIosObj.gotoCertifyRealName();
									}else{
										layer.closeAll();
										window.location.href='/user/authentication';
									}
								},
								no:function(){
									layer.closeAll();
								}
							});
						}else if(ts.jobName == 2){
								var  deliveryUrl = '/hire/deliveryresume/'+ts.param.id
								ts.$http.get(deliveryUrl,{
									before:function(){
										Indicator.open('加载中')
									}
								}).then(function(response){
									if(response.data.respCode == 0){
										ts.btnType=false;
										Toast({
								            message: '职位申请成功，7天内不能重复申请！',
								            position: 'middle',
								            duration: 1000
							          	})
									}else{
										Toast({
								            message:response.data.reason,
								            position: 'middle',
								            duration: 1000
							          	})
									}
									Indicator.close();
								},function(response){
									Indicator.close();
									Toast(response.data.reason);
								})
						}else if(ts.jobName == 3){
							layer.open({
								icon: 12,
								content: '实名认证未通过,请重新认证',
								shadeClose:false,
								btn:['立即认证','暂不认证'],
								yes:function(){
									layer.closeAll();
									if(platformParams.platform == 'ios'){
										optionTitle = '职位详情';
										window.webkit.messageHandlers.gotoCertifyRealName.postMessage(null);
									}else if(platformParams.platform == 'android'){
										AndroidAndIosObj.gotoCertifyRealName();
									}else{
										layer.closeAll();
										window.location.href='/user/authentication';
									}
								},
								no:function(){
									layer.closeAll();
								}
								
							})
						}else if(ts.jobName == 1){
							layer.open({
								icon:12,
								content:'实名认证正在审核中</br><span>请耐心等待</span>',
								shadeClose:false,
								btn:'好的',
								yes:function(){
									layer.closeAll();
								}
							})
						}
				}
				
				
				
			},
			//收藏
			saveCollect(){
				var collectUrl = '/hire/userConllection/'+this.param.id;
				this.$http.get(collectUrl,{
					before:function(){
						Indicator.open('加载中...');
					}
				}).then(function(response){
					Indicator.close();
					this.jobImg =!this.jobImg;
					if(this.jobImg){
						Toast({
				            message: '收藏成功！',
				            position: 'middle',
				            duration: 1000
			          	})
					}else{
						Toast({
				            message: '取消收藏！',
				            position: 'middle',
				            duration: 1000
			          	})
					}
				},function(response){
					Indicator.close();
					Toast(response.data.reason);
				})
			},
			getPosition(){
				var ts = this ;
				var hUrl = '/hire/hireDetail/'+this.param.id;
				this.$http.get(hUrl,{
					before:function(){
						Indicator.open('加载中...');
					}
				}).then(function(response){
					if(response.data.respCode != '0'){
						Indicator.close();
						if(response.data.respCode == '4'){
							ts.positionOver =true;
						}else{
							Toast(response.data.reason);
						}
					}else{
						Indicator.close();
						var response =response.data;
						var data = response.data;
						ts.jobCreat = data.is_finish;
						ts.jobName = data.is_auth;
						ts.company_benefits = data.company_benefits;
						ts.working_property = data.working_property;
						ts.educational = data.educational;
						ts.work_experience = data.work_experience;
						if(data.task_reward){
							ts.task_reward =((data.task_reward/100).toFixed(2))+'元';
							ts.w100 = false;
							ts.w70 = true;
						}else{
							ts.w100 = true;
							ts.w70 = false;
						}
						ts.pay = data.pay;
						ts.work_city = data.work_place_province +" "+data.work_place_city;
						ts.companySite = data.merchants.address||"无";
						ts.merchants = data.merchants;
						ts.job_requirements = data.job_requirements;
						ts.job_responsibilities = data.job_responsibilities;
						ts.id=data.id;
						ts.title = data.job_third_rank;
						if(data.isCollect == 0){
							ts.jobImg =  false;
						} else{
							ts.jobImg =  true;
						}
						if(data.status == 0){
							ts.btnType = true;
						} else{
							ts.btnType = false;
						}
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
	#positionDetail{
		.positionOver{
			text-align: center;
		    margin: 100px 0px;
		    img{
		    	width: 30%;
		    }
		}
		.blue{color:#56abfb;}
		font-size: 14px;
		.comAttention {
			.mint-button{
				height: 50px;
			}
			#felxBtn{
				border-radius:0px ;
				.collect{
					margin-left:20px ;
					position:relative; 
					&:before{
						position: absolute;
						background: url(../../assets/hire/icon-lick.png) no-repeat;
		    			background-size: auto 100%;
		    			content: '';
		    			height: 16px;
						width: 25px;
						left: -24px;
						top: 1px;
					}
				}
				.collected{
					margin-left:20px ;
					position:relative; 
					&:before{
						position: absolute;
						background: url(../../assets/hire/icon-lick-active.png) no-repeat;
					    height: 15px;
					    width: 25px;
					    left: -18px;
					    top: 2px;
					    content: "";
						content:'';
		    			background-size: auto 100%;
					}
				}
			}
			
		}
		.mint-indicator-wrapper{
		  	z-index: 530;
	  	}
		.header-middle{font-size: 1.5em;}
		.fl{float: left;}
		.fr{float: right;}
		.clear{clear:both;}
		.red{color:#ff646e ;}
		.w40{width: 40%;}
		.w60{width: 60%;}
		.positionFirst{
			.firstText{
				&.w100{
					width: 100%;
				}
				&.w70{
					width: 70%;
				}
				h4{
					width: 50%;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				span{
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					display: block;
				}
			}
			position: relative;
			span{
				font-size: 16px;
				padding-left:5px ;
			}
			.money{
				position:relative;
		    	padding: 2px;
		    	border: 1px solid #4ba5fb; 
		    	border-left:20px solid #4ba5fb;
		    	border-radius:3px;
		    	color: #4ba5fb;
		    	&:after{
		    		position: absolute;
		    		background: url(../../assets/hire/icon-white-money.png) no-repeat;
		    		background-size: auto 100%;
		    		margin-top: -1px;
		    		left: -18px;
		    		content: '';
		    		width: 20px;
		    		height: 15px;
		    	}
			}
		}
		.positionDetail{
			margin-top:50px;
			padding: 15px;
			background:#FFFFFF;
			.positionSecond{
				margin-top: 10px;
				span{
					padding-left:20px;
					position:relative;
					display: inline-block;
					margin-top:8px;  
					&:before{
						position: absolute;
						left: 0;
						top: 0;
					    bottom: 0px;
						content: '';
						width: 100%;
						height: 16px;
					}
				}
				.area{
				    padding-left: 17px;
					&:before{
					/*left: 0;
					height: 15px;*/
				    /*height: 18px;
				    top: -2px;
				    left: 1px;*/
					background: url(../../assets/hire/icon-adress.png) no-repeat;	
					background-size: auto 100%;
					}
				}
				.workTime:before{
				    /*height: 20px;
    				top: -3px;*/
					background: url(../../assets/hire/icon-nav-work-active1.png) no-repeat;	
					background-size: auto 100%;
				    /*height: 18px;
				    left: 5px;
				    top: -2px;*/
				}
				.positionEdu:before{
					/*left: 3px;
					top: 1px;
					height: 12px;*/
					background: url(../../assets/hire/icon-degree.png) no-repeat;	
					background-size: auto 100%;
				}
				.positionWork:before{
					/*top: 1px;
					left: 6px;
					height: 13px;*/
					background: url(../../assets/hire/icon-time.png) no-repeat;	
					background-size: auto 100%;
				}
			}
			.positionThirdly{
				font-size: 12px;
				margin-top: 10px;
				span{
					width: 23%;
					text-align: center;
					margin-right: 5px;
					margin-top:5px ;
					background-color:#ddedff;
					color: #4ba5fb;
					padding: 6px;
					display :inline-block;
					border-radius:5px ;
					white-space: nowrap;
				    overflow: hidden;
				    text-overflow: ellipsis;
				}
			}
			.mint-badge.is-size-normal{
				padding: 6px;
			}
		}
		.companySiteBox{
			    position: relative;
			    padding-right: 15px;
			    padding-left: 15px;
			    background: #fff;
			    height: 40px;
			    height: auto;
			.companySite{
				border-top: 1px solid #e5e5e5;
				position: relative;
				padding-right: 10px;
	    		padding-bottom: 10px;
			    padding-top: 10px;
				background:#FFFFFF ;
				span{
				    padding-left: 17px;
    				line-height: initial;
				}
				&:before{
					position: absolute;
					left: 0px;
					content: '';
				    top: 9px;
	    			height: 18px;
					width: 30px;
					background: url(../../assets/hire/icon-address-active.png) no-repeat;
					background-size: auto 100%;
				}
			}
		}
		.companyIntro {
			position: relative;
			height: 90px;
			margin-top: 10px;
			margin-bottom: 10px;
			padding:10px;
			border-bottom: 1px solid #f7f7f7;
			background-color:#FFFFFF ;
			height:auto; 
			&:after{
			    position: absolute;
			    content: '';
			    /*left: 0px;*/
			   right: 10px;
			   top: 40%;
			    width: 25px;
			    height: 15px;
			    background: url(../../assets/hire/arrleft.png) no-repeat;
			    background-size: auto 100%;
			}
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
				padding-left: 60px;
				padding-top:15px ;
				box-sizing: border-box;
				.companyName{
					font-size: 1.1em;
				    color: #333;
				    font-weight: bold;
				}
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
		#felxBtn{
	    text-align: center;
	    position: fixed;
	    bottom: 0;
	    width: 40%;
	    z-index: 100
		}
		#posBtn{
		    opacity: 1;
			border-radius:0px ;
			text-align: center;
		    position: fixed;
		    bottom: 0;
		    width: 60%;
		    z-index: 100;
		    margin-left:40% ;
		    &.mint-button--default{
		    	background-color: #cccccc;
		    }
		}
		.positionInfo{
			.workSpan{
				border-top: 1px solid #e5e5e5;
			}
			padding: 10px;
			span{
				display: block;
				padding-top:10px ;
			}
			.positionAsk{
				padding-bottom:10px ;
				border-bottom: 1px solid #f3f3f3;
				margin-bottom:10px ;
			}
			background-color: #FFFFFF;
			p{
				padding-top:10px ;
				line-height:180%;
				word-wrap:break-word ;
			}
			div{
			    margin-bottom: 10px;
    			margin-top: 10px;
    			word-wrap: break-word;
			}
		}	
	}
	
</style>