<template>
	<div id="feedback">
		<mt-header fixed title="反馈">
			<router-link to="/home/user" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="breakbox"></div>
		<div class="content_bd" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		<div 	v-infinite-scroll="loadMore"
		  		infinite-scroll-disabled="loading"
		  		infinite-scroll-distance="20">
		<div class="feedbackBox" v-for="dataList in dataLists">
			<div class="feedbackTitle" >
				<span>反馈意见</span>
				<span class="fr time" v-text="dataList.qtime"></span>
			</div>
			<div class="feedbackText" v-text="dataList.question">
			</div>
			<div class="feedbackImgs">

				<span  class="introImg fl" v-for="img in dataList.image.split(',')" v-show="dataList.image">
					<img  :src="img" @click="gallery($event)"/>
				</span>
			</div>
			<div class="replyTitle">
				<span>答复</span>
				<span class="fr time" v-text="dataList.atime">2017-2-10</span>
			</div>
			<div class="replyText" v-text="dataList.answer || '尚未答复'">
				
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
  	name: 'feedback',
  	data () {
	    return {
	    	dataLists:[],
			loading:false,
			wrapperHeight: 0,
			current_page:1,
			allPage:0,
	    	imgs:['https://mana-static-prod.oss-cn-hangzhou.aliyuncs.com/user/ad460f80-91ec-11e6-a7ac-0d9e87709e72/uploads/images/20170214/58a26cc808fae.jpg','https://mana-static-prod.oss-cn-hangzhou.aliyuncs.com/user/ad460f80-91ec-11e6-a7ac-0d9e87709e72/uploads/images/20170214/58a26cd462edc.jpg','https://mana-static-prod.oss-cn-hangzhou.aliyuncs.com/user/ad460f80-91ec-11e6-a7ac-0d9e87709e72/uploads/images/20170214/58a26cdb512c1.jpg'],
	      	api:{
	      		getFeedBackList:'/genuine/feedback/getMyFeedbackList',
	      	}

	    }
  	},
   mounted(){
   		this.getFeedBackList();
   		$(window).scrollTop(0);

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
						}else{
							this.allPage = 0;
							Toast(data.reason)
						}
					},function(res){
						this.allPage = 0;
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
#feedback{
	.feedbackBox{
		background: #fff;
		margin-bottom: 10px;
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
				img{
					height: 4.6rem;
					width: 100%;
				}
			}
		}
	}
}
</style>


