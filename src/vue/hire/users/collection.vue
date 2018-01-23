<template>
	<div id="collection">
		<mt-header fixed title="我的收藏">
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
				      <mt-tab-item id="2">发现</mt-tab-item>
				      <mt-tab-item id="3">正品优选</mt-tab-item>
				    </mt-navbar>
			    </div>
		    <mt-tab-container v-model="selected">
		      <mt-tab-container-item id="1" class="confirmStatus">
			 	<router-link :to="{name:'goodsDetailsShow',query:{id:item.id,countryType:item.countryType}}" v-for="(item,index) of goodsLists">
				 	<div class="userDefault news">
						<img class="userImg" :src="item.thumbnail" v-if="item.thumbnail">
						<img v-else class="userImg" src="../../../assets/users/icon/icon_wine.png">
						<!-- <div class="goodsTitle">
							<div class="goodsName" v-text="item.name">
							</div>
						</div> -->
						<div class="userBox">
					  		<div class="userName">
					  			<span v-text="item.name">
					  			</span>
					  		</div>
							<div class="goodsNumber" v-if="item.createDate" v-text="item.createDate">
							</div>
					  	</div>
					</div>
				</router-link>
		      </mt-tab-container-item>
		      <mt-tab-container-item id="2">
		        <div class="newsBox">
		        	<router-link :to="{name:'newsDetails',query:{id:newsList.id}}" v-for="newsList in newsLists">
			        	<div class="userDefault news">
						  	<img class="userImg" :src="newsList.thumbnail">
						  	<router-link :to="{ name: 'commentsHot', query: { id:newsList.id,type: 1 }}">
						  		<img class="collection" src="../../../assets/users/icon/icon_Shape.png">
						  	</router-link>
						  	<div class="userBox">
						  		<div class="userName">
						  			<span v-text="newsList.title">
						  			</span>
						  		</div>
								<div>
									<span v-text="newsList.summary"></span>
								</div>
						  		<div class="userNumBox">
						  		<span v-show="newsList.hazardClass!=='0'">危险等级:</span>
				  			<img class="userIcon"  v-if="newsList.hazardClass == '1'" src="../../../assets/users/icon/icon_hazardClassimg1.png">
				  			<img class="userIcon" v-if="newsList.hazardClass == '2'" src="../../../assets/users/icon/icon_hazardClassimg2.png">
				  			<img class="userIcon" v-if="newsList.hazardClass == '3'" src="../../../assets/users/icon/icon_hazardClassimg3.png">
						  			<!-- <span class="fl">危险等级:</span>
						  			<img class="userIcon" :src="newsList.hazardClassimg"> -->
						  		</div>
						  		<div>
						  			<span v-text="'来源'"></span>
						  			<span v-text="newsList.source"></span>
						  		</div>
						  	</div>

						</div>
					</router-link>
		        </div>
		      </mt-tab-container-item>
		      <mt-tab-container-item id="3">
		        <div class="newsBox">
		        	<router-link :to="{name:'optimization',query:{id:OptimizationList.id}}" v-for="OptimizationList in OptimizationLists">
			        	<div class="userDefault news">
						  	<img class="userImg" :src="OptimizationList.thumbnail">
						  	<router-link :to="{ name: 'commentsHot', query: { id: OptimizationList.id,type : 2 }}">
						  		<img class="collection" src="../../../assets/users/icon/icon_Shape.png">
						  	</router-link>
						  	<div class="userBox">
						  		<div class="userName">
						  			<span v-text="OptimizationList.title">
						  			</span>
						  		</div>
								<div>
									<span v-text="OptimizationList.summary"></span>
								</div>
						  		<div>
						  			<span v-text="OptimizationList.source"></span>
						  		</div>
						  	</div>

						</div>
					</router-link>
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
					getGoods:'/genuine/favorite/getMyFavoritesGoodsList',
					getBarList:'/genuine/favorite/getMyFavoritesExposureBarList',
					getContenById:'/genuine/favorite/getMyFavoritesPreferenceList'
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
	    		var _this =this;
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
			},
			getOptimization:function(pageNo){
				var params = {};
		      	params.pageNo = pageNo || 1;
		      	this.$http({
			          method:'GET',
			          url:this.api.getContenById,
			  		  params:params,
			  		  // headers: {"token": "14af3bb2ca6a42429648f347b89ea158"},
			//           emulateJSON: true,
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					var data=res.data;
					var _this =this;
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
			},
			getGoods:function(pageNo){
				var params = {};
		      	params.pageNo = pageNo || 1;
		      	this.$http({
			          method:'GET',
			          url:this.api.getGoods,
			  		  params:params,
			//           headers: {"token": "c3b20d78eeac42848f7eb001bd6f8a6d"},
			//           emulateJSON: true,
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
			//           headers: {"token": "c3b20d78eeac42848f7eb001bd6f8a6d"},
			//           emulateJSON: true,
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
			}
		}

	}
</script>
<style lang="sass">
	#collection {
		.goodsBody{
			img{
				max-height: 150px;
			}
		}
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
			// a{
			// 	color: #a38489;
			// }
			.mint-tab-container-wrap{

				margin-top: 50px;
			}
		}
		.mint-tab-item-label{
  			font-size: 0.9em;
  		}
  		.mint-tab-container{
			background: #fff;
			// margin-top: 10px;

  		}
		.userDefault{
			margin: 0;
			padding:0;
			    padding: 10px 20px;
    			margin-right: 0;
    			.userImg{
    				height:125px;
				    margin: 10px;
    				margin-left: 0;
    			}
		}
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