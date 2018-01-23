<template>
	<div id="goodsDetailsShow">
		<mt-header fixed title="扫码结果">
			<a href="javascript:history.go(-1);" slot="left">
				<mt-button icon="back"></mt-button>
			</a>
		</mt-header>
		<div class="breakbox"></div>
		<div id="swipeDiv">
	    	<mt-swipe class="myswipe" :auto="0" >
		  		<mt-swipe-item v-for="img in imgList.split(',')" class="swiper-slide">
		  			<img :src="img" v-if="img">
		  			<img v-else src="../../../assets/users/icon/icon_news.png"/>
		  		</mt-swipe-item>
	    	</mt-swipe>
    	</div>
    	<div class="detailsHead">
    			<span v-text="goodsLists.name || '无'"></span>
    			<img v-if="goodsLists.isFavorites == 1" class="defaultImg" @click="favoritesGoods(0)" src="../../../assets/users/icon/icon_collect1.png">
    			<img v-else class="activeImg" @click="favoritesGoods(1)" src="../../../assets/users/icon/icon_collect_active.png">
    	</div>
    	<div class="detailsBox">
    		<div class="collectionNum">
    			<span v-text="goodsLists.favoritesNum || 0"></span> 人收藏了该商品
    		</div>
    		<!-- <div class="detailsTitle">
    			
    		</div> -->
    		<table>
    			<caption>产品基本信息</caption>
    			
    			<tbody>
    				<tr v-for="ceccGoodsField in GoodsField">
    					<th v-text="ceccGoodsField.fieldName"></th>
    					<td v-if="ceccGoodsField.fieldType=='6'"><img :src="ceccGoodsField.fieldValue" @click="previewImg(ceccGoodsField.fieldValue,[ceccGoodsField.fieldValue])"></td>
						<td v-else>{{ceccGoodsField.fieldValue}}</td>
 
    				</tr>
    			</tbody>
    		</table>
    		<!-- <div v-for="ceccGoodsField in GoodsField"><span v-text="ceccGoodsField.fieldName+':'"></span><span v-text="ceccGoodsField.fieldValue"></span></div> -->
    	</div>
    	<div class="base-empty-div"></div>
    	<div class="footer1">
    		<!-- <router-link>
    			
    		</router-link> -->
			<div @click="publish123" id="noimg" type="text">
				写点什么东西吧！
			</div>
			
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'//提示
import { Indicator } from 'mint-ui'//加载
export default {
  	name: 'goodsDetailsShow',
  	data () {
	    return {
	    	imgType:true,
	    	content:'',
	    	type:0,
	    	id:'',
	    	countryType:'',
	    	unread:false,
	    	badge_num:0,
	    	GoodsField:'',
	    	goodsLists:'',
	    	imgList:'',
	    	banners:[{path:'../../../dist/366bc1e4529ca90ff92a36cd319a45b1.png'},{path:'../../../dist/366bc1e4529ca90ff92a36cd319a45b1.png'},{path:'../../../dist/366bc1e4529ca90ff92a36cd319a45b1.png'}],
	      	api:{
	      		getGoods:'/genuine/product/findById',
	      		favoritesGoods:'/genuine/favorite/favoritesOrCanclefavorites'
	      		

	      	}
	    }
  	},
    methods: {
    	favoritesGoods:function(type){
    		var flag = 0;
    		var _this =this;
      		var params = {};
      		
      		if(type == 0){
      			flag = 0;
    		}else{
    			flag = 1;
    		}
			params.flag = flag;
			params.resourceId = this.id;
			params.type = 0;
			params.countryType=this.countryType;
	      	this.$http({
				  method:'POST',
		          url:this.api.favoritesGoods,
		  		  params:params,
		   		  dataType:'json',
		   		  // headers: {"token": "c3b20d78eeac42848f7eb001bd6f8a6d"},
				  before:function(){
					Indicator.open('加载中...');
				  }
	          }).then(function(res){
				Indicator.close();
				var data=res.data;
				this.imgType = !this.imgType;
				if(data.errorCode=="0"){
					if(_this.goodsLists.isFavorites == 1){
						_this.goodsLists.isFavorites = 0;
						_this.goodsLists.favoritesNum++
						// Toast(data.reason)
					}else{
						_this.goodsLists.isFavorites = 1;
						_this.goodsLists.favoritesNum--
					}
					// Toast({
			  //           message: '成功!!',
			  //           position: 'middle',
			  //           duration: 1000
					// });
					// _this.content = '';
					// _this.goodsLists = data.result;
					// _this.imgList = _this.goodsLists.goodsImg;
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
    	 previewImg:function(src,arr){

	      	wx.previewImage({
		      current: src,
		      urls:arr
		    });

	      },
    	publish123:function(){
    		var _this = this;
			this.$router.push({ name: 'commentsHot', query: { id:_this.id ,type:0,countryType:_this.countryType}});
 //    		var _this =this;
 //      		var params = {};
	// 		params.content = this.content;
	// 		params.type= 0;
	// 		params.resourcesId = this.id;
	//       	this.$http({
	// 			  method:'POST',
	// 	          url:this.api.getGoods,
	// 	  		  params:params,
	// 	   		  // dataType:'json',
	// 	   		  // headers: {"token": "c3b20d78eeac42848f7eb001bd6f8a6d"},
	// 			  before:function(){
	// 				Indicator.open('加载中...');
	// 			  }
	//           }).then(function(res){
	// 			Indicator.close();
	// 			var data=res.data;
	// 			if(data.errorCode=="0"){
	// 				Toast({
	// 		            message: '评论成功！',
	// 		            position: 'middle',
	// 		            duration: 1000
	// 				});
	// 				_this.content = '';
	// 				// _this.goodsLists = data.result;
	// 				// _this.imgList = _this.goodsLists.goodsImg;
	// 			}else{
	// 				Toast(data.reason)
	// 			}
	// 		},function(res){
	// 			Indicator.close();
	// 			Toast({
	// 	            message: '系统错误,请刷新！',
	// 	            position: 'middle',
	// 	            duration: 1000
	// 			});
	// 		})
    	},
		fetchData:function(){
		 	this.id  = this.$route.query.id;
		 	this.countryType=this.$route.query.countryType;
		},
      	getGoods:function(){
      		var _this =this;
      		var params = {};
				params.id = this.id;
				params.countryType=this.countryType;
		      	this.$http({
					  method:'POST',
			          url:this.api.getGoods,
			  		  params:params,
			   		  dataType:'json',
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					var data=res.data;
					
					if(data.errorCode=="0"){
						_this.goodsLists = data.result;
						_this.imgList = _this.goodsLists.goodsImg;
						_this.GoodsField = _this.goodsLists.list_ceccGoodsField;
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
      	}
	},
	mounted(){
   		$(window).scrollTop(0);
	},
   	created(){
   		this.fetchData();
   		this.getGoods();
   	},
   	watch:{
		'$route':'fetchData',
	}

}
</script>
<style lang="sass">
$red: #ff7d85;
td{padding: 0.1rem;vertical-align: middle;}
td img{width: 2rem;}
#goodsDetailsShow{
	#swipeDiv{
		.mint-swipe {
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
	.detailsHead{
		background: #fff;
		padding: 10px 20px;
		color: #818181;
		.defaultImg{
		    float: right;
		    width: 20px;
		    margin-top: -3px;
	    }
	    .activeImg{
	    	float: right;
		    width: 38px;
		    margin-top: -11px;
		    margin-right: -8px;
	    }
	}
	.detailsBox{

		background: #fff;
	    margin-top: 15px;
	    color: #818181;
	    padding-bottom:1em;
	    .detailsTitle{
	    	position:relative;
	    	&:before{
			    position: absolute;
			    background: #000;
			    height: 50%;
			    width: 2%;
			    content: '';
			    left: 2%;
	    	}

	    }
	    table{
	    		border-collapse: collapse;
	    		border:1px solid #ccc;
	    		line-height:1.5em;
	    		margin:1em auto;
	    		width:90%;
	    		font-size: 14px;
	    		color:#818181;
	    		th{border:1px solid #ccc;padding:0.1rem;text-align:left;white-space:nowrap;font-weight: normal;vertical-align: middle;}

	    		td{text-align:left;border:1px solid #ccc;vertical-align: middle}
	    	}
	    #noimg{
	    	text-align:left;
	    	border-top:1px solid #e3e3e3;

	    }
	    .collectionNum{
	    	text-align: center;
			position: relative;
			&:after,&:before{
				content: '';              
            	position: absolute;       
	            top: 52%;
	            background: #e1e1e1;      
	            width: 13%;
	            height: 1px;
			}
			&:after{
				left: 17%;
			}
			&:before{
				right: 17%;
			}
	    }
	    div{
			padding: 10px 20px;
	    }
	}


}
</style>


