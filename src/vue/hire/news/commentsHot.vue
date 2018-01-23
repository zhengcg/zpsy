<template>
	<div id="commentsHot">
		<mt-header fixed title="热点评论">
			 <div @click="goback" slot="left">
				<mt-button icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="breakbox"></div>
		<div class="content_bd" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		<div 	v-infinite-scroll="loadMore"
		  		infinite-scroll-disabled="loading"
		  		infinite-scroll-distance="20">
		<div class="commentsBox">
			<div class="commentsTitle">
				评论<span v-text="'('+pageAll+')'"></span>
			</div>
			<div class="commentsDefault" v-for="(newList,$index) in newsLists">
				<img class="userImg" :src="newList.avatar" v-if="newList.avatar">
			  	<img class="userImg" v-else src="../../../assets/users/icon/icon_head_portrait.png">
			  	<div class="userBox">
			  		<div class="userName">
			  			<span v-text="newList.userName || '昵称'"></span>
			  			<span class="praise" @click="praiseClick(newList,$index)">
			  				<img src="../../../assets/users/icon/icon_redlike.png">
			  				<span class="asd" v-text="newList.praiseNum"></span>
			  			</span>
			  		</div>
			  		<div>
			  			<span v-text="newList.updateDateStr.substr(0,10)"></span>
			  		</div>
			  		<div>
			  			<span v-text="newList.content || '无' "></span>
			  		</div>
			  	</div>
			</div>
			</div>
			</div>
			<div class="footer1">
			<mt-field v-model="content" id="noimg" placeholder="评论" type="text">
				<mt-button @click="publish" type="default">发布</mt-button>
			</mt-field>
		</div>
		<div class="breakbox1">
		</div>
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'//提示
import { Indicator } from 'mint-ui'//加载
export default {
  	name: 'commentsHot',
  	data () {
	    return {
	    	content:'',
	    	unread:false,
	    	badge_num:0,
	      	api:{
	      		getMessage:'/genuine/comment/getComment',
	      		praise:'/genuine/praise/commitPraise',
	      		publish:'/genuine/comment/publish'
	      	},
	      	newsLists:[],
	      	oldParams:{},
	      	pageAll:0,
	      	loading:false,
			wrapperHeight: 0,
			current_page:1,
			allPage:0,
			oneClick:false,

	    }
  	},
    methods: {
    	publish:function(){
    		if(!this.content){
    			return false;
    		}
    		var params = {};
		  	params.content = this.content;
			params.type = this.oldParams.type;
			params.resourcesId = this.oldParams.id;
			params.countryType=this.oldParams.countryType;
		  	this.$http({
				  method:'POST',
		          url:this.api.publish,
		  		  body:JSON.stringify(params),
		   		  dataType:'json',
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
					_this.getMessage(1,true);
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
    	praiseClick:function(newList,index){
    		var type = 0;
    		switch(this.oldParams.type){
    			case '0':
    				type = 1 
    				break;
    			case '1':
    				type = 3
    				break;
				case '2':
					type = 5
					break;
    		}

    		var params = {};
				params.type = type;
				params.id = this.newsLists[index].id;
		      	this.$http({
					  method:'POST',
			          url:this.api.praise,
			  		  body:params,
			   		  dataType:'json',
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
						newList.praiseNum ++;
						Toast({
				            message: '点赞成功!!',
				            position: 'middle',
				            duration: 1000
						});
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
    	loadMore() {
    		var _this = this;
	      	if (this.allPage>0) {
			  	this.loading=true;
			  	this.current_page++;
			  	this.getMessage(this.current_page);
		    }
		},
    	goback:function(){
    		window.href = window.history.go(-1);
    	},
    	getMessage:function(pageNo,type1){
    		var _this =this;
    		var params = {
    			id:_this.oldParams.id,
    			type:_this.oldParams.type,
    			isforHotFive:false,
      			pageNo :pageNo || 1
	      	};
			this.$http({
		          method:'GET',
		          url:this.api.getMessage,
		  		  params:params,
		//           headers: {"token": "c3b20d78eeac42848f7eb001bd6f8a6d"},
		          emulateJSON: true,
				  before:function(){
					Indicator.open('加载中...');
				  }
	          }).then(function(res){
				Indicator.close();
				var body=res.body;
				if(body.errorCode=="0"){
					this.pageAll = body.result.sum;
					this.allPage =body.result.list_comment.length;
					_this.newsLists = _this.newsLists.concat(body.result.list_comment);
					if(type1){
						_this.newsLists = body.result.list_comment;
					}
				}else{
					this.allPage = 0;
					Toast(body.reason);
				}
			},function(res){
				this.allPage = 0 ;
				Indicator.close();
				Toast({
		            message: '系统错误,请刷新！',
		            position: 'middle',
		            duration: 1000
				});
			})
    	},
      	fetchData(){
      		console.log(this.$route.query)
		 	var query = this.$route.query;
			this.oldParams = query;

		}
   	},

   mounted(){
   	var _this = this;
   	$(window).scrollTop(0);
   	Indicator.open('加载中...');
   	this.fetchData();
	this.getMessage()
	// $(document).on('click','.praise',function(){
	// 	// $(this).find('.asd').text(parseInt($(this).find('.asd').text())+1)
	// })
   },
   watch:{
		'$route':'fetchData',
	},
}
</script>
<style lang="sass">
$red: #ff7d85;
#commentsHot{
	

}
</style>


