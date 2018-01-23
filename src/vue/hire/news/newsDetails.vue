<template>
	<div id="newsDetails">
		<mt-header fixed title="文章详情" class="title1">
			<a href="javascript:history.go(-1);" slot="left">
				<mt-button icon="back"></mt-button>
			</a>
		  <mt-button  slot="right">
		  		<img v-if="contentList.isFavorites == 1"  @click="favoritesExposureBar(0)" src="../../../assets/users/icon/icon_collect.png">
    			<img v-else @click="favoritesExposureBar(1)" src="../../../assets/users/icon/icon_collect_active1s.png">
		  </mt-button>
		</mt-header> 
		<div class="breakbox"></div>
		<!-- <iframe src="http://www.izheng.org/" style="width: 100%;min-height: 100%" id="iframe"></iframe>  -->
	  	  <div class="userDefault1">
	  	  	<img :src="contentList.thumbnail" v-if="contentList.thumbnail">
		  	<img v-else src="../../../assets/users/icon/icon_placeHoldeImage.png">
		  	<div class="userBox">
		  		<div class="userName">
		  			<span v-text="contentList.source"></span>
		  		</div>
		  		<div class="userNumBox">
		  			<span class="userNum" v-text="contentList.updateDate.substring(0,11)" v-if="contentList.updateDate"></span>
		  		</div>
		  	</div>
		  </div>
		  <div class="newContent">
		  	<div class="contentTitle" v-text="contentList.title">
		  	</div>
		  	<div class="contentBox" v-html="contents">
		  	</div>
		  </div>
		  <div class="entranceBox">
				<img v-if="contentList.isPraise == 1" @click="praise" src="../../../assets/users/icon/icon_redlike1.png">
				<img v-else @click="praise" src="../../../assets/users/icon/icon_redlike.png">
	        	<img v-show="pageAll >0" @click="gotoComment"src="../../../assets/users/icon/icon_Shape.png">
			</div>
			<div class="commentsNumber">
				<span v-text="contentList.praiseNum || 0 "></span><span>Like</span>
				<div class="likeImg">
					<img v-for="user in contentList.list_user" :src="user.avatar">
					<!-- <img src="../../../assets/users/icon/icon_imgMore.png"> -->
				</div>
			</div>
		  <div class="commentsBox" >
			<div class="commentsTitle">
				全部评论 <span v-text="pageAll"></span>
			</div>
			<div class="commentsDefault" v-for="comment in comments">
				<img class="userImg" v-if="comment.avatar" :src="comment.avatar">
			  	<img v-else class="userImg" src="../../../assets/users/icon/icon_head_portrait.png">
			  	<div class="userBox">
			  		<div class="userName">
			  			<span v-text="comment.userName || '昵称'"></span>
			  		</div>
			  		<div>
			  			<span v-text="comment.updateDateStr.substr(0,10) || '时间'"></span>
			  		</div>
			  		<div>
			  			<span v-text="comment.content || '内容'"></span>
			  		</div>
			  	</div>
		</div>
		<div class="allComment" style="text-align: center" v-text="'查看全部评论'"  @click="gotoComment" v-show="pageAll >0"/>
				
		</div>
		<div class="footer1">
			<mt-field v-model="content" id="noimg" placeholder="评论" type="text">
				<mt-button @click="publish" type="default">发布</mt-button>
			</mt-field>
			
		</div>
    	<div class="breakbox1"></div>
	</div>

</template>

<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'//提示
import { Indicator } from 'mint-ui'//加载
export default {
  	name: 'newsDetails',
  	data () {
	    return {
	    	praiseType:true,
	    	imgType:true,
	    	content:'',
	    	token:'',
	    	id:'',
	    	dataList:'',
	    	contentList:'',
	    	contents :'',
	    	contents1:'',
	    	data1:'',
	    	type:1,
	    	comments:'',
	    	pageAll:0,
	      	api:{
	      		getConten:'/genuine/exposureBar/getContenById',
	      		commitPraise:'/genuine/praise/commitPraise',
	      		getComment:'/genuine/comment/getComment',
	      		publish:'/genuine/comment/publish',
	      		favoritesExposureBar:'/genuine/favorite/favoritesOrCanclefavorites'

	      	}
	    }
  	},
    methods: {
    	gotoComment:function(){
    		var _this = this;
    		if(platformParams){
    			window.location.href ="ZPSY://comment?id="+_this.id+"&type="+this.type;
    		}else{
    			this.$router.push({ name: 'commentsHot', query: { id:_this.id ,type:_this.type}});
    		}
    	},
    	
		favoritesExposureBar:function(type){
			var flag = 0;
			var params = {};
      		if(type == 0){
      			flag = 0;
    		}else{
    			flag = 1;
    		}

	      	params.resourceId = this.id;
	      	params.flag = flag;
	      	params.type = 1;
	      	this.$http({
		          method:'GET',
		          url:this.api.favoritesExposureBar,
		  		  params:params,

		//           headers: {"token": "c3b20d78eeac42848f7eb001bd6f8a6d"},
		          emulateJSON: true,
				  before:function(){
					Indicator.open('加载中...');
				  }
	          }).then(function(res){
				Indicator.close();
				var data=res.data;
				var _this =this;
				this.imgType = !this.imgType;
				if(data.errorCode=="0"){
					if(_this.contentList.isFavorites == 1){
						_this.contentList.isFavorites = 0
						// Toast(data.reason)
					}else{
						_this.contentList.isFavorites = 1
					}
				}else{
					Toast(data.reason)
				}
			},function(res){
				Indicator.close();
				Toast({
		            message: '系统错误,请刷新！',
		            position: 'middle',
		            duration: 1000
				});
			})
		},
      getConten(){
      	var params = {};
      	var _this =this;
      	params.id = this.id;
      	this.$http({
	          method:'GET',
	          url:this.api.getConten,
	  		  params:params,
	//           headers: {"uuid": "244F015C-9745-4744-B7EB-72F4CFEAE1F4"},
	          emulateJSON: true,
			  before:function(){
				Indicator.open('加载中...');
			  }
		}).then(function(res){
			Indicator.close();
			var data=res.data;
			if(data.errorCode=="0"){
					_this.contentList = data.result;
					_this.contents = data.result.contents+'';
					_this.contents = _this.escape2Html(_this.contents)
					optionTitle.isFavorites = _this.contentList.isFavorites;
					appHideTitle();
			}else{
				Toast(data.reason)
			}
		},function(res){
			Indicator.close();
			Toast({
	            message: '系统错误,请刷新！',
	            position: 'middle',
	            duration: 1000
			});
		})
      },
      	escape2Html:function (str) {
		 var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
		 return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
		},
		
		praise:function(){
			var _this = this;
			if(platformParams){
				if(!_this.token){
					window.location.href ="ZPSY://login";
				}else{
					_this.savePraise();
				}
			}else{
				_this.savePraise();
			}
		},
		savePraise:function(){
		  	var _this = this;
		  	var params = {};
		  	params.id = this.id;
		  	params.type = '2';
			this.$http({
		          method:'GET',
		          url:this.api.commitPraise,
		  		  params:params,
		          headers: {"token":_this.token},
		          emulateJSON: true,
				  before:function(){
					Indicator.open('加载中...');
				  }
		          }).then(function(res){
				Indicator.close();
				var data=res.data;
				var _this =this;
				if(data.errorCode=="0"){
					// var locParams = JSON.parse(localStorage.getItem("locParams"));
					// if(locParams){
					// 	_this.contentList.list_user.push({avatar:locParams.avatar})
					// }else{

					// }
				_this.contentList.list_user.push({avatar:res.data.result.avatar})

				_this.contentList.praiseNum++;
				if(_this.contentList.isPraise == 1){
						_this.contentList.isPraise = 0
						// Toast(data.reason)
					}else{
						_this.contentList.isPraise = 1
					}
					Toast({
			            message: '点赞成功!',
			            position: 'middle',
			            duration: 1000
					});
				}else{
					Toast({
			            message: data.reason,
			            position: 'middle',
			            duration: 1000
					});
				}
			},function(res){
				Indicator.close();
				Toast({
		            message: '系统错误,请刷新！',
		            position: 'middle',
		            duration: 1000
				});
			})
		},
		getComment:function(){
			var params = {};
		  	params.id = this.id;
		  	params.type = this.type;
		  	params.pageNo = 1;
		  	params.isforHotFive = true;
		  	this.$http({
		          method:'GET',
		          url:this.api.getComment,
		  		  params:params,
		//           headers: {"token": "2ea5ca0e4c7140f68297f243bf01dfdc"},
		          emulateJSON: true,
				  before:function(){
					Indicator.open('加载中...');
				  }
		          }).then(function(res){
				Indicator.close();
				var data=res.data;
				var _this =this;
				if(data.errorCode=="0"){
						_this.comments = data.result.list_comment;
						_this.pageAll = data.result.sum;
				}else{
					Toast(data.reason)
				}
			},function(res){
				Indicator.close();
				Toast({
		            message: '系统错误,请刷新！',
		            position: 'middle',
		            duration: 1000
				});
			})
		},
		publish:function(){
			if(!this.content){
    			return false;
    		}
			var _this = this;
			if(platformParams){
				if(!_this.token){
					window.location.href ="ZPSY://login";
				}else{
					_this.savePublish();
				}
			}else{
				_this.savePublish();
			}
		},
		savePublish:function(){
			var params = {};
		  	params.content = this.content;
			params.type = this.type;
			params.resourcesId = this.id;
		  	this.$http({
				  method:'POST',
		          url:this.api.publish,
		  		  body:JSON.stringify(params),
		   		  dataType:'json',
		          headers: {"token": this.token},
				  before:function(){
					Indicator.open('加载中...');
				  }
		          }).then(function(res){
				Indicator.close();
				var data=res.data;
				var _this =this;
				if(data.errorCode=="0"){
					Toast({
			            message: '评论成功!',
			            position: 'middle',
			            duration: 1000
					});
					this.content = '';
					_this.getComment();
				}else{
					Toast(data.reason)
				}
			},function(res){
				Indicator.close();
				Toast({
		            message: '系统错误,请刷新！',
		            position: 'middle',
		            duration: 1000
				});
			})
		},
		fetchData(){
			var query1 = this.$route.query;
			this.id = query1.id;
			this.token = query1.token;
		}
   },
   watch:{
   	'$route':'fetchData',
   },
   created(){
		this.fetchData();
		this.getConten();
		this.getComment();

   },
   	mounted(){
   		$(window).scrollTop(0);
   		optionTitle.isFavorites = this.contentList.isFavorites;
   		optionTitle.pageTitle = '文章详情';
		appHideTitle();   		
	}
}
</script>
<style lang="sass">
$red: #ff7d85;
#newsDetails{
	height: 100%;
		.mint-field-state.is-default{
			display:none;
		}
	.mint-field-other{
			padding: 5px;
		}
	.contentBox{
	    margin: 10px;
    	word-wrap: break-word;
	}
	.newContent{
		line-height: normal;
		.contentTitle{
			padding: 10px;
			font-size: 1.3em;
		}
		background:#fff;
		padding:10px 0;
		img{
			width:100%!important;
		}
		p{
			padding: 10px;
			margin-left: 0!important;
		}
	}
	.allComment{
		padding: 10px 20px;
		border-top: 1px solid #e3e3e3;
	}
    .userDefault1{
        padding: 10px;
        background: #FFFFFF;
        margin-bottom: 10px;
        overflow: hidden;
        height:auto;
        img{
	        float: left;
	        width: 50px;
	        height: 50px;
	        margin: 10px;
          	border-radius: 50px;
        }
        .userBox{
            margin: 20px 30px 10px 80px;
        .userNumBox {
            font-size: 0.7em;
            color: #999;
        }
            div{
                margin-top: 10px;
            }
        }
    }

}
</style>


