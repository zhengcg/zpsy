<template>
	<div id="optimization">

		<mt-header fixed title="正品优选" class="title1">
			<a href="javascript:history.go(-1);" slot="left">
				<mt-button icon="back"></mt-button>
			</a>
			<mt-button  slot="right">
			<img v-if="dataList.isFavorites == 1"  @click="favoritesPreference(0)" src="../../../assets/users/icon/icon_collect.png">
			<img v-else @click="favoritesPreference(1)" src="../../../assets/users/icon/icon_collect_active1s.png">
			</mt-button>
		</mt-header>

		<div class="breakbox"></div>
	  	  <div class="userDefault1">
	  	  	<img :src="dataList.thumbnail" v-if="dataList.thumbnail">
		  	<img v-else src="../../../assets/users/icon/icon_placeHoldeImage.png">
		  	<div class="userBox">
		  		<div class="userName">
		  			<span v-text="dataList.shortTitle"></span>
		  		</div>
		  		<div class="userNumBox">
		  			<span class="userNum" v-if="dataList.updateDateStr" v-text="dataList.updateDateStr.substr(0,10) || ''"></span>
		  		</div>
		  	</div>
		  </div>
		  <div class="newContent">
		  	<div class="contentTitle" v-text="dataList.title">
		  	</div>
		  	<div v-html="contents">
		  	</div>
		  </div>
			<div class="entranceBox">
				<img v-if="dataList.isPraise == 1" @click="praise" src="../../../assets/users/icon/icon_redlike1.png">
				<img v-else @click="praise" src="../../../assets/users/icon/icon_redlike.png">
	        	<img v-show="pageAll >0" @click="gotoComment"src="../../../assets/users/icon/icon_Shape.png">
			</div>
			<div class="commentsNumber">
				<span v-text="dataList.praiseNum || 0 "></span><span>Like</span>
				<div class="likeImg">
					<img v-for="user in dataList.list_user" :src="user.avatar">
					<!-- <img v-if="dataList.praiseNum > 4" src="../../../assets/users/icon/icon_imgMore.png"> -->
				</div>
			</div>
		  <div class="commentsBox">
			<div class="commentsTitle">
				全部评论<span v-text="'(' + pageAll + ')'"></span>
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
		</div>
		<div class="allComment" style="text-align: center" v-text="'查看全部评论'"  @click="gotoComment" v-show="pageAll >0">
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
  	name: 'optimization',
  	data () {
	    return {
	    	praiseType:true,
	    	imgType:true,
	    	token:'',
	    	content:'',
	    	id:'',
	    	dataList:'',
	    	type:2,
	    	contents:'',
	    	comments:'',
	    	pageAll:0,
	      	api:{
	      		getContent:'/genuine/preference/getContenById',
	      		getComment:'/genuine/comment/getComment',
	      		publish:'/genuine/comment/publish',
	      		favoritesPreference:'/genuine/favorite/favoritesOrCanclefavorites',
	      		praise:'/genuine/praise/commitPraise'

	      	}
	    }
  	},
    methods: {	
      favoritesPreference:function(type){
      	var params = {};
      	var flag = 0;
      	params.resourceId = this.id;
		if(type == 0){
  			flag = 0;
		}else{
			flag = 1;
		}
		params.type = 2;
      	params.flag = flag;
      	this.$http({
	          method:'GET',
	          url:this.api.favoritesPreference,
	  		  params:params,
	          emulateJSON: true,
			  before:function(){
				Indicator.open('加载中...');
			  }
          }).then(function(res){
			Indicator.close();
			console.log(res.data)
			var data=res.data;
			var _this =this;
			this.imgType = !this.imgType;
			if(data.errorCode=="0"){
				if(_this.dataList.isFavorites == 1){
					_this.dataList.isFavorites = 0
					// Toast(data.reason)
				}else{
					_this.dataList.isFavorites = 1
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
	  gotoComment:function(){
	  		var _this = this;
    		if(platformParams){
    			window.location.href ="ZPSY://comment?id="+_this.id+"&type="+_this.type;
    		}else{
    			this.$router.push({ name: 'commentsHot', query: { id:_this.id ,type:2}});
    		}
	  },
	  // 根据id获取正品优选详情
      getContent(){
      	var params = {};
      	params.id = this.id;
      	this.$http({
	          method:'GET',
	          url:this.api.getContent,
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
			if(data.errorCode=="0"){
					_this.dataList = data.result;
					_this.contents = data.result.contents+'';
					_this.contents = _this.escape2Html(_this.contents);
					optionTitle.isFavorites = this.dataList.isFavorites;
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
			var _this=this;
			var params = {};
			params.type = '4';
			params.id = this.id;
			// Indicator.open(_this.token);
	      	this.$http({
				  method:'get',
		          url:this.api.praise,
		  		  params:params,
		   		  dataType:'json',
		          headers: {"token":_this.token},
				  before:function(){
					Indicator.open('加载中...');
				  }
			}).then(function(res){
				Indicator.close();
				console.log(res.data)
				var data=res.data;
				var _this =this;
				if(data.errorCode=="0"){
					Toast({
				        message: '点赞成功!!',
				        position: 'middle',
				        duration: 1000
					});

					_this.dataList.praiseNum ++;
				// var locParams = JSON.parse(localStorage.getItem("locParams"));
				// _this.dataList.list_user.push({avatar:locParams.avatar})
				_this.dataList.list_user.push({avatar:res.data.result.avatar})
				if(_this.dataList.isPraise == 1){
					_this.dataList.isPraise = 0
					// Toast(data.reason)
				}else{
					_this.dataList.isPraise = 1
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
      getComment:function(){
      		var _this =this;
			var params = {};
	      	params.id = this.id;
	      	params.type = this.type;
	      	params.pageNo = 1;
	      	params.isforHotFive = false;
	      	this.$http({
		          method:'GET',
		          url:this.api.getComment,
		  		  params:params,
		//           headers: {"token": "c3b20d78eeac42848f7eb001bd6f8a6d"},
		          emulateJSON: true,
				  before:function(){
					Indicator.open('加载中...');
				  }
	          }).then(function(res){
				Indicator.close();
				
				var body=res.data;
				console.log(body.result)
				if(body.errorCode == "0"){
						this.comments = body.result.list_comment;
						this.pageAll = body.result.sum;
				}else{
					Toast(body.reason)
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
				var _this =this;
		      	params.content = this.content;
				params.type = this.type;
				params.resourcesId = this.id;
		      	this.$http({
					  method:'POST',
			          url:this.api.publish,
			  		  body:JSON.stringify(params),
			   		  dataType:'json',
			   		  headers: {"token":_this.token},
			//           headers: {"token": "c3b20d78eeac42848f7eb001bd6f8a6d"},
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					console.log(res.data)
					var data=res.data;
					var _this =this;
					if(data.errorCode=="0"){
							_this.content = '';
							Toast({
					            message: '评论成功!!',
					            position: 'middle',
					            duration: 1000
							});
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
		this.getContent();
		this.getComment();
   },
   mounted(){
   	$(window).scrollTop(0);
   		optionTitle.isFavorites = this.dataList.isFavorites;
		optionTitle.pageTitle = '正品优选';
		appHideTitle();
   }
   
}
</script>
<style lang="sass">
$red: #ff7d85;
// .newContent img{max-width: 100%!import;}
#optimization{
	.is-right img{
		margin-top: 10px;
	}
	.allComment{
		background:#fff;
		padding: 10px 20px;
		border-top: 1px solid #e3e3e3;
	}
	.newContent{
		line-height: normal;
		.contentTitle{
			padding: 10px;
			font-size: 1.3em;
		}
		background:#fff;
		padding:10px 15px;
		img{
			width:100%!important;
		}
		p{
			padding: 10px;
			margin-left: 0!important;
		}
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


