<template>
	<div id="news">
		<mt-header fixed title="行业资讯"></mt-header>
		<div class="breakbox"></div>
		<div class="tabBox clearfix">
			<router-link :to="{ name: 'news'}">曝光</router-link>
			<a href="javascript:;" class="cur">行业资讯</a>
			<router-link :to="{ name: 'news2'}">正品动态</router-link>
		</div>
		<div style="height: 1.4rem;"></div>
        <div class="newsBox">
        <div class="content_bd" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		<div 	v-infinite-scroll="loadMore"
		  		infinite-scroll-disabled="loading"
		  		infinite-scroll-distance="100" style="background: #fff;">
        	<router-link v-for="newsList in newsLists" :to="{ path: '/newsDetails', query: { id:newsList.id }}" >
	        	<div class="userDefault">
				  	<img class="userImg" :src="newsList.thumbnail">
				  	<router-link :to="{ name: 'commentsHot', query: { id: newsList.id ,type:1}}">
				  		<img class="collection" src="../../../assets/users/icon/icon_Shape.png">
				  	</router-link>
				  	<div class="userBox">
				  		<div class="userName">
				  			<span v-text="newsList.title">
				  			</span>
				  		</div>
						<div>
							<span v-text="newsList.summary" style="white-space: nowrap;overflow: hidden;text-overflow:ellipsis;display: block; "></span>
						</div>
				  		<div class="userNumBox">
				  			<span v-show="newsList.hazardClass!=='0'">危险等级:</span>
				  			<img class="userIcon"  v-if="newsList.hazardClass == '1'" src="../../../assets/users/icon/icon_hazardClassimg1.png">
				  			<img class="userIcon" v-if="newsList.hazardClass == '2'" src="../../../assets/users/icon/icon_hazardClassimg2.png">
				  			<img class="userIcon" v-if="newsList.hazardClass == '3'" src="../../../assets/users/icon/icon_hazardClassimg3.png">
				  		</div>
				  		<div>
				  			<span v-text="newsList.source"></span>
				  		</div>
				  	</div>

				</div>
			</router-link>
        </div>
        <div class="base-empty-div" style="background: #fff;"></div>
        </div>
        </div>
        
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'//提示
import { Indicator } from 'mint-ui'//加载
export default {
  	name: 'news',
  	data () {
	    return {
	    	newsLists:[],
	    	loading:false,
			wrapperHeight: 0,
			current_page:1,
			allPage:0,
			api : {
				getList :'/genuine/exposureBar/getList',
			}
	    }
  	},
    methods: {
    	loadMore() {
    		var _this = this;
	      	if (this.allPage>0) {
			  	this.loading=true;
			  	this.current_page++;
        		this.receive(this.current_page);
		    }
		},
      receive(pageNO){//接收消息推送
      	var params = {
      		pageNo :pageNO || 1,
      		newsType:2
      	};
		this.$http({
	          method:'GET',
	          url:this.api.getList,
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
				this.allPage = body.result.length;
				this.newsLists = this.newsLists.concat(body.result);
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
      fetchData(){
			 //获取url的id参数
		 	this.oldParams = this.$router.currentRoute.params;
			 if(this.oldParams.city){
			 	this.showLiveend=true;
			 }
			 if(this.oldParams.job_third_rank){
			 	this.showPositionend= true;
			 }
			 if(this.oldParams.pay){
			 	 this.showpayend=true;
			 }
		},
		backPage(){
			window.history.go(-1)
		},

   },
	watch:{
		'$route':'fetchData',
	},
   mounted(){
   	$(window).scrollTop(0);
	this.receive();
   }
}
</script>
<style lang="sass">
$red: #ff7d85;
.userName{
	overflow: hidden;
	text-overflow:ellipsis;
	white-space:initial;
}
.userDefault .userImg{width: 3.6rem;height: 3.6rem;}
#news{
	background: #fff;
	height: 100%;
	a{background: #fff;}
	.userDefault{
		background: #fff;
	}
	.newsBox{
		background: #fff;
	}
}
.userNumBox{
	span{vertical-align: middle}
	img{vertical-align: middle}
}
.userDefault .userBox{margin: 0.1rem 0.1rem 0.1rem 3.7rem;width: 5rem;white-space: nowrap;overflow: hidden;-text-overflow: ellipsis}
.tabBox{
	height: 1.4rem;
	border: 1px solid #f1f1f1;
	box-shadow: 0 2px 5px #f1f1f1;
	width: 100%;
	position: fixed;
	background: #fff;
	z-index: 1000;
	a{
		display: block;
		float: left;
		width: 33.33333%;
		text-align: center;
		height: 1.4rem;
		line-height: 1.4rem;
		font-size: 0.42rem;
		color: #333;
		border-bottom: 0.03rem solid #f1f1f1

	}
	a.cur{
			color: #c3222c;
			border-bottom: 0.03rem solid #bd212b
		}
}
</style>


