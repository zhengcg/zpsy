<template>
	<div id="comments">
		<mt-header fixed title="我的评论">
			<router-link to="/home/user" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="breakbox"></div>
		<div class="content_bd" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		<div 	v-infinite-scroll="loadMore"
		  		infinite-scroll-disabled="loading"
		  		infinite-scroll-distance="20">
		  <div class="page-navbar prodNavbar">
			  <div class="pagePart">
			  	 <mt-navbar class="page-part" v-model="selected">
			      <mt-tab-item id="1">商品</mt-tab-item>
			      <mt-tab-item id="2">曝光</mt-tab-item>
			      <mt-tab-item id="3">正品优选</mt-tab-item>
			    </mt-navbar>
			  </div>
		    <mt-tab-container v-model="selected">
		      <mt-tab-container-item id="1" class="confirmStatus">
			 	<div class="newsBox" v-for="goodsList in goodsLists">
					<div class="goodsBox">
						<div class="goodsHead">
							<img :src="goodsList.ceccGoods.thumbnail" v-if="goodsList.ceccGoods.thumbnail">
							<img v-else src="../../../assets/users/icon/icon_wine.png">
							<div class="goodsTitle">
								<div class="goodsName" v-text="goodsList.ceccGoods.name">
								</div>
								<div class="goodsNumber" v-text="goodsList.ceccGoods.updateDateStr">
								</div>
							</div>
						</div>
						<div class="goodsBody">
							<img :src="goodsList.ceccGoods.thumbnail" v-if="goodsList.ceccGoods.thumbnail">
							<img v-else  src="../../../assets/users/icon/icon_news.png">
						</div>
					</div>
					<div class="commentsBox">
						<div class="commentsDefault">
							<img v-if="goodsList.avatar" class="userImg" :src="goodsList.avatar">
						  	<img v-else class="userImg" src="../../../assets/users/icon/icon_head_portrait.png">
						  	<div class="userBox">
						  		<div class="userName">
						  			<span v-text="goodsList.nickName || '昵称'"></span>
						  		</div>
						  		<div>
						  			<span v-text="goodsList.updateDateStr"></span>
						  		</div>
						  		<div>
						  			<span v-text="goodsList.content"></span>
						  		</div>
						  		<img class="userBoxIcon" src="../../../assets/users/icon/icon_redlike.png">
						  		<span class="userBoxNumber" v-text="goodsList.praiseNum"></span>
						  	</div>
						</div>
					</div>
			 	</div>
		      </mt-tab-container-item>
		      <mt-tab-container-item id="2">
        	<div class="newsBox" v-for="newsList in newsLists">
	        	<div class="userDefault" v-if="newsList.ceccExposurebar">
	        		<img class="userImg" :src="newsList.ceccExposurebar.thumbnail" v-if="newsList.ceccExposurebar.thumbnail">
				  	<img v-else class="userImg" src="../../../assets/users/icon/icon_news_goods.png">
				  	<router-link :to="{ name: 'commentsHot', query: { id: newsList.id }}">
				  		<img class="collection" src="../../../assets/users/icon/icon_Shape.png">
				  	</router-link>
				  	<div class="userBox">
				  		<div class="userName">
				  			<span v-text="newsList.ceccExposurebar.title">
				  			</span>
				  		</div>
						<div>
							<span v-text="newsList.ceccExposurebar.shortTitle"></span>
						</div>
				  		<div class="userNumBox">
				  			<span class="fl">危险等级:</span>
				  			<img class="userIcon" :src="newsList.ceccExposurebar.hazardClassimg">
				  		</div>
				  		<div>
				  			<span v-text="newsList.ceccExposurebar.source"></span>
				  		</div>
				  	</div>
				</div>
		    	<div class="commentsBox">
					<div class="commentsDefault">
						<img class="userImg" :src="newsList.avatar" v-if="newsList.avatar">
					  	<img v-else class="userImg" src="../../../assets/users/icon/icon_head_portrait.png">
					  	<div class="userBox">
					  		<div class="userName">
					  			<span v-text="newsList.nickName"></span>
					  		</div>
					  		<div>
					  			<span v-text="newsList.updateDateStr"></span>
					  		</div>
					  		<div>
					  			<span v-text="newsList.content"></span>
					  		</div>
					  		<img class="userBoxIcon" src="../../../assets/users/icon/icon_redlike.png">
					  		<span class="userBoxNumber"v-text="newsList.praiseNum"></span>
					  	</div>
					</div>
				</div>
        	</div>
		      </mt-tab-container-item>
		      <mt-tab-container-item id="3">
        	<div class="newsBox" v-for="OptimizationList in OptimizationLists">
	        	<div class="userDefault" v-if="OptimizationList.ceccPreference">
	        		<img class="userImg" :src="OptimizationList.ceccPreference.thumbnail" v-if="OptimizationList.ceccPreference.thumbnail">
				  	<img v-else class="userImg" src="../../../assets/users/icon/icon_news_goods.png">
				  	<router-link :to="{ name: 'commentsHot', query: { id: OptimizationList.id }}">
				  		<img class="collection" src="../../../assets/users/icon/icon_Shape.png">
				  	</router-link>
				  	<div class="userBox">
				  		<div class="userName">
				  			<span v-text="OptimizationList.ceccPreference.title">
				  			</span>
				  		</div>
						<div>
							<span v-text="OptimizationList.ceccPreference.shortTitle"></span>
						</div>
				  		<div class="userNumBox">
				  			<!-- <span class="fl">危险等级:</span>
				  			<img class="userIcon" :src="newsList.ceccPreference.hazardClassimg"> -->
				  			<!-- <img class="userIcon" src="../../../assets/users/icon/icon_Alertred.png"> -->
				  		</div>
				  		<div>
				  			<span v-text="OptimizationList.ceccPreference.source"></span>
				  		</div>
				  	</div>
				</div>
		    	<div class="commentsBox">
					<div class="commentsDefault">
						<img class="userImg" :src="OptimizationList.avatar" v-if="OptimizationList.avatar">
					  	<img v-else class="userImg" src="../../../assets/users/icon/icon_head_portrait.png">
					  	<div class="userBox">
					  		<div class="userName">
					  			<span v-text="OptimizationList.nickName"></span>
					  		</div>
					  		<div>
					  			<span v-text="OptimizationList.updateDateStr"></span>
					  		</div>
					  		<div>
					  			<span v-text="OptimizationList.content"></span>
					  		</div>
					  		<img class="userBoxIcon" src="../../../assets/users/icon/icon_redlike.png">
					  		<span class="userBoxNumber"v-text="OptimizationList.praiseNum"></span>
					  	</div>
					</div>
				</div>
        	</div>
		      </mt-tab-container-item>
		    </mt-tab-container>
		  </div>
		  </div>
		  </div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui'
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name:'comments',
		data(){
			return{
				selected:'1',
				newsLists:[],
				goodsId:'',
				goodsLists:[],
				OptimizationLists:[],
				loading:false,
				wrapperHeight: 0,
				current_page:1,
				allPage1:0,
				allPage2:0,
				allPage3:0,
				api:{
					getGoods:'/genuine/comment/getMyGoodsComment',
					getBarList:'/genuine/comment/getMyExposureBarComment',
					getOptimization:'/genuine/comment/getMyPreferenceComment'
				}
			}
		},
		mounted(){
   		$(window).scrollTop(0);
	},
		created(){
			this.getGoods();
			this.getBarList();
			this.getOptimization();
		},
		methods:{
			loadMore() {

	    		var _this = this;
	    		switch(_this.selected){
			      		case '1':
			      		if (this.allPage1>0) {
						  	this.loading=true;
						  	this.current_page++;
						  	this.getGoods(this.current_page);
					    };break;
			      		case '2':if (this.allPage2>0) {
					  		this.loading=true;
						  	this.current_page++;
						  	this.getBarList(this.current_page);
			   		 	};break;
			      		case '3':
			      		if (this.allPage3>0) {
						  	this.loading=true;
						  	this.current_page++;
						  	this.getOptimization(this.current_page);
					    };break;
		      	};
		     	// if (this.allPage>0) {
				  	// this.loading=true;
				  	// this.current_page++;
				  	// if(_this.selected == '1'){
				  	// 	this.getGoods(this.current_page);
				  	// }else{
				  	// 	this.getBarList(this.current_page);
				  	// }
	        		
			    // }
			},
			getGoods:function(pageNo){
				var params = {};
		      	params.pageNo = pageNo || 1;
		      	this.$http({
			          method:'GET',
			          url:this.api.getGoods,
			  		  params:params,
			//           headers: {"token": "14af3bb2ca6a42429648f347b89ea158"},
			          emulateJSON: true,
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					var data=res.data;
					var _this =this;
					if(data.errorCode=="0"){
						this.allPage1 = data.result.length;
						_this.goodsLists = _this.goodsLists.concat(data.result);
					}else{
						this.allPage1 = 0;
						Toast(data.reason)
					}
				},function(res){
					this.allPage1 = 0;
					Indicator.close();
					Toast({
			            message: '系统错误,请刷新！',
			            position: 'middle',
			            duration: 1000
					});
				})
			},
			getBarList:function(pageNo){
				var params = {};
		      	params.pageNo = pageNo || 1;
		      	this.$http({
			          method:'GET',
			          url:this.api.getBarList,
			  		  params:params,
			          emulateJSON: true,
					  // headers: {"token": "14af3bb2ca6a42429648f347b89ea158"},
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					var data=res.data;
					var _this =this;
					if(data.errorCode=="0"){

						this.allPage2 = data.result.length;
						_this.newsLists = _this.newsLists.concat(data.result);
					}else{
						this.allPage2 = 0;
						Toast(data.reason)
					}
				},function(res){
					this.allPage2 = 0;
					Indicator.close();
					Toast({
			            message: '系统错误,请刷新！',
			            position: 'middle',
			            duration: 1000
					});
				})
			},
			getOptimization:function(pageNo){
				var params = {};
		      	params.pageNo = pageNo || 1;
		      	this.$http({
			          method:'GET',
			          url:this.api.getOptimization,
					  // headers: {"token": "2ea5ca0e4c7140f68297f243bf01dfdc"},
			  		  params:params,
			          emulateJSON: true,
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					var data=res.data;
					var _this =this;
					Toast({
			            message: res,
			            position: 'middle',
			            duration: 1000
					});
					if(data.errorCode=="0"){
						this.allPage3 = data.result.length;
						_this.OptimizationLists = _this.OptimizationLists.concat(data.result);

					}else{
						this.allPage3 = 0;
						Toast(data.reason)
					}
				},function(res){
					this.allPage3 = 0;
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
	#comments {
		.pagePart{
		    top: 50px;
		    right: 0;
		    left: 0;
		    position: fixed;
		    z-index: 6;
		}
		.page-navbar{
			.mint-navbar{
				background-color: #b12;
			}
			
			.mint-tab-item{
				color: #a38489;
			}
			.is-selected{
				color: #fff;
				border:0;
			}
			.mint-tab-container-wrap{

				margin-top: 50px;
			}
		}
		.newsBox{
			background:#fff;
			margin: 10px 0;
		}
		.mint-tab-container-item{
		    flex-shrink: 0;
		    width: 100%;
		    height: auto;
		    margin-top: 10px;
		}
		.mint-tab-item-label{
  			font-size: 22px;
  		}
		.userDefault{border:0px;}
		.commentsDefault{
			padding:0;
		    border-top: 1px solid #e3e3e3;
		    padding-top: 10px;
		    overflow: hidden;
		    margin-left: 20px
		}
		.contentBox{
			margin:10px 0;
		}
	}
</style>