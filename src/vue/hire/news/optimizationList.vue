<template>
	<div id="optimizationList">
		<mt-header fixed title="正品优选">
			<router-link to="/home/findwork" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="breakbox"></div>
		<div class="imgbox">
			<div class="imgContent" v-for="newsList in newsLists">
	        	<router-link :to="{ path: '/optimization', query: { id:newsList.id }}" >
	        		<img class="userImg" :src="newsList.thumbnail" v-if="newsList.thumbnail">
					  	<img v-else class="userImg" src="../../../assets/users/icon/icon_news_goods.png">
				</router-link>
        	</div>
		</div>
        <div class="base-empty-div"></div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'//提示
import { Indicator } from 'mint-ui'//加载
export default {
  	name: 'optimizationList',
  	data () {
	    return {
	    	newsLists:[],
			api : {
				getList :'/genuine/preference/getList',
			}
	    }
  	},
    methods: {
      receive(){//接收消息推送
      	var params = {
      		pageNo :1
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
				this.newsLists = body.result;
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
#optimizationList{
	.imgbox{
		overflow: hidden;
		.imgContent{
		    width: 50%;
		    float: left;
		    padding: 4%;
		    height: 5.4rem;
		    .userImg{
	    	    border-radius: 10px;
    			width: 100%;
    			height: 100%;
    			vertical-align: middle;
		    }
		}
	}
	.newsBox{
		background: #fff;
	}
}
</style>


