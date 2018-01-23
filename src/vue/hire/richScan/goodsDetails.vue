<template>
	<div id="goodsDetails">
		<mt-header fixed title="商品详情" class="title1">
		</mt-header>
		<div class="breakbox"></div>
		<div id="swipeDiv">
	    	<mt-swipe class="myswipe" :auto="0" >
		  		<mt-swipe-item v-for="img in imgList.split(',')" class="swiper-slide">
		  			<img :src="img" v-if="img">
		  			<img v-else src="../../../assets/hire/icon-empty.png"/>
		  		</mt-swipe-item>
	    	</mt-swipe>
    	</div>
    	<div class="detailsHead">
    			<span v-text="goodsLists.name || '无'"></span>
    	</div>
    	<div class="detailsBox">
    		<div class="collectionNum">
    			<span v-text="goodsLists.favoritesNum || 0"></span> 人收藏了该商品
    		</div>
    		<div class="detailsTitle">
    			产品基本信息
    		</div>
    		<div v-for="ceccGoodsField in GoodsField"><span v-text="ceccGoodsField.fieldName+':'"></span><span v-text="ceccGoodsField.fieldValue"></span></div>
    	</div>
    	<div class="base-empty-div"></div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'//提示
import { Indicator } from 'mint-ui'//加载
export default {
  	name: 'goodsDetails',
  	data () {
	    return {
	    	content:'',
	    	type:0,
	    	id:'',
	    	unread:false,
	    	badge_num:0,
	    	goodsLists:'',
	    	imgList:'',
	    	GoodsField:'',
	    	banners:[{path:'../../../dist/366bc1e4529ca90ff92a36cd319a45b1.png'},{path:'../../../dist/366bc1e4529ca90ff92a36cd319a45b1.png'},{path:'../../../dist/366bc1e4529ca90ff92a36cd319a45b1.png'}],
	      	api:{
	      		getGoods:'/genuine/product/findById',
	      		

	      	}
	    }
  	},
    methods: {
		fetchData:function(){
		 	this.id  = this.$route.query.id;
		},
      	getGoods:function(){
      		var _this =this;
      		var params = {};
				params.id = this.id;
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
   		optionTitle.pageTitle = '商品详情';
		appHideTitle();
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
#goodsDetails{
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
		img{
		    float: right;
		    width: 20px;
		    margin-top: -3px;
	    }
	}
	.detailsBox{

		background: #fff;
	    margin-top: 15px;
	    color: #818181;
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


