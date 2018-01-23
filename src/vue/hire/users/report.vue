<template>
	<div id="report">
		<mt-header fixed title="举报">
			<router-link to="/home/user" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="breakbox"></div>
				<div class="content_bd" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		<div 	v-infinite-scroll="loadMore"
		  		infinite-scroll-disabled="loading"
		  		infinite-scroll-distance="20">
		<div class="toReport" v-for="dataList in dataLists">
			<div class="goodsBox">
				<div class="goodsHead">
					<img :src="dataList.ceccGoods.thumbnail" v-if="dataList.ceccGoods.thumbnail">
					<img v-else src="../../../assets/hire/icon-empty.png">
					<div class="goodsTitle">
						<div class="goodsName" v-text="dataList.ceccGoods.name">
						</div>
						<div class="goodsNumber" v-text="dataList.ceccGoods.createDateStr">
							2017-4-16
						</div>
					</div>
				</div>
				<div class="goodsBody">
					<img :src="dataList.ceccGoods.goodsImg" v-if="dataList.ceccGoods.goodsImg">
					<img v-else src="../../../assets/advert/icon_status_1.png">
				</div>
			</div>
			<div class="reportBox">
				<div>
					<span>举报内容</span>
					<span class="fr time" v-text="dataList.createDateStr">2017-2-10</span>
				</div>
				<div class="fsmall" v-text="dataList.contents">
				</div>
				<div class="reportImgs">
					<span  class="introImg fl" v-for="img in dataList.image1.split(',')" v-show="imgs">
						<img  :src="img" @click="gallery($event)"/>
					</span>
				</div>
				<div style="clear: both;height: 0;"></div>
				<div class="replyTitle">
					<span>答复</span>
					<span class="fr time">2017-2-10</span>
				</div>
				<div class="fsmall" v-text="dataList.answer">
					
				</div>
			</div>
		</div>
	</div>
</div>
		<div class="gallery" @click="galleryRes()">
        	<span>
        		<img src="" alt="">
        	</span>
        </div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'//提示
import { Indicator } from 'mint-ui'//加载
export default {
  	name: 'report',
  	data () {
	    return {
	    	dataLists:[],
			loading:false,
			wrapperHeight: 0,
			current_page:1,
			allPage:0,
	    	imgs:['https://mana-static-prod.oss-cn-hangzhou.aliyuncs.com/user/ad460f80-91ec-11e6-a7ac-0d9e87709e72/uploads/images/20170214/58a26cc808fae.jpg','https://mana-static-prod.oss-cn-hangzhou.aliyuncs.com/user/ad460f80-91ec-11e6-a7ac-0d9e87709e72/uploads/images/20170214/58a26cd462edc.jpg'],
	      	api:{
	      		getFeedBackList:'/genuine/report/getMyReportList',
	      	}

	    }
  	}, 
  	mounted(){
   		$(window).scrollTop(0);
   		this.getFeedBackList();
   	},
    methods: {
      	loadMore() {
	      	if (this.allPage>0) {
			  	this.loading=true;
			  	this.current_page++;
        		this.getFeedBackList(this.current_page);
		    }
			 
		},
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
		    getFeedBackList:function(pageNo){
		    	this.loading = false;
					var params = {};
			      	params.pageNo = pageNo || 1;
			      	this.$http({
				          method:'GET',
				          url:this.api.getFeedBackList,
				  		  params:params,
				//           headers: {"token": "14af3bb2ca6a42429648f347b89ea158"},
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
							this.allPage = data.result.length;
							_this.dataLists = _this.dataLists.concat(data.result);
							console.log(_this.dataLists)
						}else{
							this.allPage  = 0;
							Toast(data.reason)
						}
					},function(res){
						this.allPage  = 0;
						Indicator.close();
						Toast({
				            message: '系统错误,请刷新！',
				            position: 'middle',
				            duration: 1000
						});
					})
		    }
   	}
  
}
</script>
<style lang="sass">
$red: #ff7d85;
#report{
	.toReport{
		background: #fff;
		margin: 10px 0;
	}
	.fsmall{
		font-size:0.8em;
	}
  	.userDefault{
  		padding: 5px;
  		background: #fff url(../../../assets/users/icon/icon_nav_goto_black.png) no-repeat right 10px top 10px;
  		background-size: 50px auto;
  		overflow: hidden;
  		height:auto;
  		img{
	    	float: left;
		    width: 50px;
		    height: 50px;
		    margin: 10px;
  		}
  		.userBox{
  			margin: 10px 30px 10px 80px;
  			div{
  				margin-top: 10px;
  			}
  		}
  	}
  	.reportBox:after{
  		display: block;
  		content: '';
  		height: 0;
  		clear: both;
  	}
	.reportBox{
		.time{
			font-size: 0.8em;
		}
		div{
			padding:5px;
			&:nth-of-type(1){
				margin:0 10px;
			}
			&:nth-of-type(2){
				margin:0 20px;
			}
			&:nth-of-type(4){
				border-top: 1px solid #ebebeb;
				margin:0 15px;
			}
			&:nth-of-type(5){
			    padding: 0 20px 10px 30px;
			}
		}
		
		.reportImgs{
		    width: 97%;
		    margin: 0 10px;
		    .introImg:after{
		    	display: block;
		  		content: '';
		  		height: 0;
		  		clear: both;
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
					height: 4rem;
					width: 100%;
				}
			}
		}
	}
}
</style>


