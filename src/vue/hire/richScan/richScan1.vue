<template>
	<div id="richScan">
		<mt-header fixed title="正品溯源">
			<router-link to="/home/findwork" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
		</mt-header>
		<div class="breakbox"></div>
		<div v-if="dataStatus == '1'"  class="bgIcon">
			<img src="../../../assets/users/icon/icon_nofind.png">
		</div>
		<div v-if="dataStatus == '1' " class="noData">
			<p>抱歉，正品溯源暂时未收录该商品的跨境正品溯源信息</p>
			<p>厂商跨境正溯源信息展示合作</br>欢迎拨打:<a href="tel:123123">123123</a></p>
		</div>
		<div v-else>
			  <div class="page-navbar prodNavbar">
			  	<div class="pagePart">
			  		 <mt-navbar class="page-part" v-model="selected">
				      <mt-tab-item id="1">识真假</mt-tab-item>
				      <mt-tab-item id="2">比价格</mt-tab-item>
				    </mt-navbar>
			  	</div>
			    <mt-tab-container v-model="selected">
			      	<mt-tab-container-item id="1" class="confirmStatus">
			      		<router-link :to="{ name: 'goodsDetailsShow', query: { id:goodList.id}}">
				      		<div class="goods">
				      			<div class="goodsBox">
					      			<div class="goodsBody">
					      				<img :src="goodList.goodsImg" v-if="goodList.goodsImg">
										<img v-else src="../../../assets/users/icon/icon_news.png">
									</div>
									<div class="goodsHead">
										<img  v-if="goodList.thumbnail" :src="goodList.thumbnail">
										<img v-else src="../../../assets/users/icon/icon_wine.png">
										<div class="goodsTitle">
											<div class="goodsName" v-text="goodList.name || '名称'">
											</div>
											<div class="goodsNumber" v-text="goodList.updateDateStr || '时间'">
											</div>
										</div>
									</div>
								</div>
								<div class="goodsIntroduce">
									 <div class="">
										<span>生产企业:</span>
										<span v-text="goodList.officeName || '企业名称'"></span>
									</div>
									<div class="">
										<span>包装单位&规格:</span>
										<span v-text="goodList.packingSpec"></span>
									</div>
								</div>
				      		</div>
		      			</router-link>
						
				       	<div class="prodStatusBox" v-if="prodStatus == '0'">
				       		<div class="prodBox">
				       			<div class="collectionNum">
				       					<img src="../../../assets/users/icon/icon_successSymbol.png">
					    			<span class="prodTitle">正品</span>
					    		</div>
					    		<div>
					    			<span>正品溯源码:</span>
					    			<span>1122334455667788</span>
					    		</div>
					    		<div>
						    		<p>
						    			您扫描的商品为中日韩官方政府唯一认可第三方正品溯源平台认可正品!
						    		</p>
					    		</div>
				       		</div>
				       	</div>
				       	<div class="prodStatusBox" v-if="prodStatus == '1'">
				       		<div class="prodStatus">
					       		<div class="prodBox">
					       			<div class="collectionNum">
					       					<img src="../../../assets/advert/icon-Horn.png">
						    			<span class="prodTitle">可疑品</span>
						    		</div>
						    		<div>
						    			<span>正品溯源码:</span>
						    			<span>1122334455667788</span>
						    		</div>
						    		<div>
							    		<p>
							    			似乎哪里有些不对劲！马上告诉我们！
							    		</p>
							    		<router-link :to="{ name: 'reportIndex', query: { id:goodList.id,code:this.code}}">
					       					<mt-button type="danger">举报有奖</mt-button>
				       					</router-link>
						    		</div>
					       		</div>
		       					<div class="prodDetails">
		       						<h3>扫码记录</h3>
									<p v-if="products">
										此正品溯源码已经在不同设备、不同地点总共被扫<span v-text="products.length"></span>次！ 请仔细核对以下扫码记录，如有确认不是您本人掌握的扫 码记录，则此商品可能
									</p>
									<div class="tableBox">
										<div>
											<span>扫码时间</span>
											<span>机型</span>
											<span>扫码地点</span>
										</div>
										<div class="tableTd" v-for="product in products">
											<span v-text="product.scanTime || '时间'">2017-2-17</span>
											<span v-text="product.model || '设备'">iphone7</span>
											<span v-text="product.city || '地点'">北京</span>
										</div>
									</div>
								</div>
				       		</div>
				       	</div>
				       	<div class="prodStatusBox" v-if="prodStatus == '2'">
				       		<div class="prodBox">
				       			<div class="collectionNum">
				       					<img src="../../../assets/advert/icon-Horn.png">
					    			<span class="prodTitle">伪品</span>
					    		</div>
					    		<div>
					    			<span>正品溯源码:</span>
					    			<span>1122334455667788</span>
					    		</div>
					    		<div>
						    		<p>
						    			似乎哪里有些不对劲！马上告诉我们！
						    		</p>
						    		<router-link :to="{ name: 'reportIndex', query: { id:goodList.id,code:this.code}}">
				       					<mt-button type="danger">举报有奖</mt-button>
			       					</router-link>
					    		</div>
				       		</div>
				       	</div>
						<div v-if=" prodStatus != '2' " class="prodLogistics">
							<div class="batchTitle">
								<img src="../../../assets/users/icon/icon_batch.png">
							</div>
							<div class="timeline">
								<ul>
									<li class="timeline-item" v-for="GoodsLotBatch in GoodsLotBatchs">
										<div class="timeline-item-head">
										</div>
										<div class="timeline-item-tail">
										</div>
										<div class="timeline-item-content">
											<span v-text="GoodsLotBatch.date || '时间'">2017-2-17</span><br>
											<span v-text="GoodsLotBatch.event || '地点'">抵达中国海关</span>								
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="entranceBox">
							<img @click="praise" src="../../../assets/users/icon/icon_redlike.png">
							<router-link v-show="pageAll >0" :to="{ name: 'commentsHot', query: { id:id ,type:0}}">
				        		<img src="../../../assets/users/icon/icon_Shape.png">
				        	</router-link>
							
						</div>
						<div class="commentsNumber">
							<span v-text="goodList.praiseNum || 0 "></span><span>Like</span>
							<div class="likeImg">
								<img v-for="user in goodList.list_user" :src="user.avatar">
								<img src="../../../assets/users/icon/icon_imgMore.png">
							</div>
						</div>
			      	</mt-tab-container-item>
		      	<mt-tab-container-item id="2">
		      		<div class="goodsBox">
						<router-link :to="{ name: 'goodsDetailsShow', query: { id:goodList.id}}">
				      		<div class="goods">
				      			<div class="goodsBox">
										<div class="goodsBody">
					      				<img :src="goodList.goodsImg" v-if="goodList.goodsImg">
										<img v-else src="../../../assets/users/icon/icon_news.png">
									</div>
									<div class="goodsHead">
										<img src="../../../assets/users/icon/icon_wine.png">
										<div class="goodsTitle">
											<div class="goodsName" v-text="goodList.name || '名称'">
											</div>
											<div class="goodsNumber" v-text="goodList.updateDateStr || '时间'">
											</div>
										</div>
									</div>
								</div>
								<div class="goodsIntroduce">
								 <div class="">
										<span>生产企业:</span>
										<span v-text="goodList.officeName || '企业名称'"></span>
									</div>
								</div>
				      		</div>
		      			</router-link>
					</div>
			        <div>
			        	<mt-cell :href="pricesList.spurl" v-for="pricesList in pricesListsFive" :title="pricesList.siteName"  is-link :value="'￥'+pricesList.spprice"/>
			        </div>
			        <div @click="moreBtn">
			        	<mt-cell title="更多" id="moreBtn"/>
			        </div>
			      </mt-tab-container-item>
			    </mt-tab-container>
			    <div class="commentsBox" v-show="pageAll >0">
					<div class="commentsTitle">
						全部评论<span v-text="'(' + pageAll + ')'"></span>
					</div>
					<div class="commentsDefault" v-for="comment in comments">
						<img class="userImg" v-if="comment.avatar" :src="comment.avatar">
					  	<img v-else class="userImg" src="../../../assets/users/icon/icon_head_portrait.png">
					  	<div class="userBox">
					  		<div class="userName">
					  			<span v-text="comment.nickName || '昵称'"></span>
					  		</div>
					  		<div>
					  			<span v-text="comment.updateDateStr || '时间'"></span>
					  		</div>
					  		<div>
					  			<span v-text="comment.content || '内容'"></span>
					  		</div>
					  	</div>
					</div>
				</div>
			 	<router-link v-show="pageAll >0" :to="{ name: 'commentsHot', query: { id:id ,type:0}}">
	        		<mt-cell title="查看全部评论"  is-link/>
	        	</router-link>
				<div class="footer1">
					<mt-field v-model="content" id="noimg" placeholder="评论" type="text">
						<mt-button @click="publish" type="default">发布</mt-button>
					</mt-field>
					
				</div>
		</div>
		<div class="breakbox"></div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui'
	import { Toast } from 'mint-ui'//提示
	import { Indicator } from 'mint-ui'//加载
	export default{
		name:'richScan',
		data(){
			return {
				type:0,
				dataStatus:2,
				selected:'1',
				prodStatus:'2',
				goodList:'',
				GoodsLotBatchs:'',
				products:'',
				comments:'',
				pageAll:'',
				pricesLists:'',
				pricesListsFive:[],
				content:'',
				id:'',
				code:'',
				api:{
					find:'/genuine/scanRecord/find',
					getComment:'/genuine/comment/getComment',
					getComparePrices:'/genuine/product/comparePrices',
					publish:'/genuine/comment/publish',
					praise:'/genuine/praise/commitPraise'
				}
			}
		},
	   	watch:{
	   		'$route':'fetchData',
	   	},
		created(){
			this.fetchData();
			this.getScan();
			// if(wx){
			// 	wx.onMenuShareAppMessage({
   //                  title: 'Hi,朋友,送你5元新手红包,一起来赚!', // 分享标题
   //                  desc: '玛娜花园,数据银行领导者', // 分享描述
   //                  link: 'www.hao123.com', // 分享链接
   //                  imgUrl: 'https://m.mana.com/static/images/mobile/shareicon.png', // 分享图标
   //                  // success: function () { 
   //                  //     _czc.push(['_trackEvent', '邀请好友', '分享', '分享微信好友']);
   //                  // },
   //                  // cancel: function () { 
   //                  //     _czc.push(['_trackEvent', '邀请好友', '分享', '取消分享微信好友']);
   //                  // }
   //              });
			// }
		},
		methods:{
			praise:function(){
				var params = {};
				params.type = '0';
				params.id = this.id;
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
						Toast({
				            message: '点赞成功!!',
				            position: 'middle',
				            duration: 1000
						});
						_this.goodList.praiseNum ++;
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
		      	this.code = query1.code;
		      	
		      },
	     	publish:function(){
	      		var params = {};
		      	params = {};
		      	params.content = this.content;
				params.type = this.type;
				params.resourcesId = this.id;
				console.log(JSON.stringify(params));
		      	this.$http({
					  method:'POST',
			          url:this.api.publish,
			  		  body:JSON.stringify(params),
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
							_this.content = '';
							Toast({
					            message: '评论成功!!',
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
			moreBtn:function(){
				this.pricesListsFive = this.pricesLists;
			},
			getList:function(){
					var _this = this;
		 	// 	this.$http.get(this.api.getList,{
				// 	before:function(){
				// 		Indicator.open('加载中...');
				// 	}
				// }).then(function(response){
				// 	Indicator.close();
				// 	var response =response.data.data;
				// 	this.banners = response;
				// },function(response){
				// 	Indicator.close();
				// 	Toast({
			 //            message: '系统错误,请刷新！',
			 //            position: 'middle',
			 //            duration: 1000
		  //         });
				// })
			},
			getComparePrices:function(){
				var _this =this;

	    		var params = {}
    			params.keyword = this.goodList.name;
				this.$http({
			          method:'GET',
			          url:this.api.getComparePrices,
			  		  params:params,
			//           headers: {"token": "14af3bb2ca6a42429648f347b89ea158"},
			          emulateJSON: true,
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					var body=res.body;
					if(body.errorCode=="0"){
						this.pricesLists = body.result;
						$.each(body.result,function(i,item){
							if(i < 5 ){
								_this.pricesListsFive.push(item);
							}else{
								return false;
							}
							
						});
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
			getComment:function(){
				var _this =this;
	    		var params = {
	    			id:_this.id,
	    			type:0,
	    			isforHotFive:true,
	      			pageNo :1
		      	};
				this.$http({
			          method:'GET',
			          url:this.api.getComment,
			  		  params:params,
			//           headers: {"token": "14af3bb2ca6a42429648f347b89ea158"},
			          emulateJSON: true,
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					var body=res.body;
					if(body.errorCode=="0"){
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
			getScan:function(){
				var model = 'iPhone';
				if(navigator.userAgent.indexOf('Android')>0){
					model = 'Android';
				}else{
					model = "iPhone";
				}
               var params = {
                        "codeId": this.code,
                        // "codeId": '123',
                        model:model,
                      };
                      this.$http({
                      		// emulateHTTP:true,
                            method:'post',
                            url:this.api.find,
                            body:params,
                            // headers: {"uuid": "14af3bb2ca6a42429648f347b89ea158"},
      						emulateJSON:false,
                        before:function(){
                          Indicator.open('加载中...');
                          }
                          }).then(function(res){
                      Indicator.close();
                      var body=res.body;
                      //   Toast({
                      //         message: res,
                      //         position: 'middle',
                      //         duration: 3000
                      // });
                      if(body.errorCode=="0"){
                      	var data = res.body.result;
                      	this.goodList =  res.body.result.ceccGoods;
                      	this.id = this.goodList.id;
                      	this.prodStatus = this.goodList.quality;
                      	this.GoodsLotBatchs = data.list_ceccGoodsLotBatch;
                      	this.products =data.list_ceccScanrecordForSuspectProduct;
                      	this.getComment();
                      	this.getComparePrices();
                      }else if(body.errorCode=='-1'){
                      	this.dataStatus = 1;
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
  			}
		}
	}
</script>
<style lang="sass">
	#richScan{
		#moreBtn{
			text-align: center;	
		}
		.mint-cell{
		    color: #ccc;
    		text-align: left;
		    padding: 0 20px;
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
			.mint-tab-container-wrap{

				margin-top: 50px;
			}
		}
		position:relative;
		.is-fixed{
			z-index: 3;
		}
		.bgIcon{
			img{
				position: absolute;
				z-index: 1;
				width:100%;
			}
		}
		.timeline{
			padding: 1rem;
			.timeline-item{
				position: relative;
			}
			li:nth-of-type(odd){
				.timeline-item-content{
				    margin-left: -60%;
    				margin-top: -10%;
    				span{
    					display: inline-block;
    					padding-top:5px;
    				}
				}
				.timeline-item-head{
					position:relative;
					&:before{
						content: '';
					    position: absolute;
					    top: 44%;
					    left: -36px;
					    background: #000;
					    width: 20px;
					    height: 1px;
					}
				}
			}
			li:nth-of-type(even){
				.timeline-item-content{
					margin-left: 58%;
    				margin-top: -10%;
    				span{
    					display: inline-block;
    					padding-top:5px;
    				}
				}
				.timeline-item-head{
					position:relative;
					&:before{
						content: '';
					    position: absolute;
					    top: 44%;
					    left: 16px;
					    background: #000;
					    width: 20px;
					    height: 1px;
					}
				}
			}
			.timeline-item-head{
			        position: absolute;
				    content: '';
				    border-radius: 10px;
				    width: 10px;
				    height: 10px;
				    left: 49%;
				    top: 4px;
				    background-color: #ec6941;
				}
			.timeline-item-tail {
		        position: absolute;
			    content: '';
			    height: 50%;
			    width: 2px;
			    left: 50%;
			    top: 18px;
			    margin-left: 1px;
			    background-color: #ec6941;
		     	&:nth-last-child(1){
		            border-bottom: 0px;
		          }
			    &:nth-last-child(1){
					background:#ec6941 url(../../../assets/users/icon/icon_triangle.png) no-repeat;
					background-size:100px auto;
			    }
			}
			.timeline-item-content{
				padding: 10px;
    			font-size: 0.9em;
			}
		}
		.mint-header{
			height:50px;
			h1{
				color: #fff;
				font-size: 16px;
			}
		}
		.mint-tab-item-label{
			font-size: 1.3em;
		}
		.mint-tab-container-wrap{
			margin: 10px 0;
		}
		.tableBox{
			div{
				margin-top: 10px;
			}
			span{
			    width: 30%;
    			display: inline-block;
			}
			.tableTd{
				border-top: 1px solid #e3e3e3;
				padding: 5px;

			}
		}
		.confirmStatus{
			word-wrap: break-word;
			text-align: center;
			 .prodLogistics{
				background: #FFFFFF;
				margin-bottom: 10px;
				padding: 10px;
				p{
					padding: 10px;
				}
			}
			.prodDetails{
				background: #FFFFFF;
				margin-bottom: 10px;
				padding: 10px;

				p{
					padding: 10px;
				    font-size: 0.8em;
    				text-align: left;
				}
			}
			.batchTitle{
				img{
					width: 70%;
					margin-top: -10px;
				}
			}
		}
		.noData{
		    margin-top: 50%;
		    text-align: center;
		    position: absolute;
		    z-index: 2;
		    color: #fdfdfd;
			p{
				line-height: initial;
				margin: 20px 15%;
				&:nth-of-type(2){
				    padding: 10px;
				    background: rgba(0, 0, 0, 0.5);
				    font-size: 0.7em;
				    border-radius: 10px;
				    width: 60%;
				    margin-left: 19%;
				}
			}
			a{
				color: #fdfdfd;
			}
		}
		
		.goods{
			text-align: left;
			border-top:1px solid #e6e6e6;
			background: #fff;
			margin-bottom: 10px;
		}
		.goodsIntroduce{
			font-size:0.8em;
			div{
				padding: 10px 20px;
			}
		}
		.prodStatusBox{
			height: auto;
			word-wrap: break-word;
			padding: 10px;
			background: #FFFFFF;
			text-align: center;
			margin-bottom: 10px;
			.prodBox{
			    border: 1px dashed #ed636f;
			    border-radius: 10px;
			    padding: 10px;
				div{
					padding-top: 10px;
				}
				span,p{
					font-size: 10px;
				}
				p{
				    width: 80%;
    				margin-left: 10%;
				}
				.prodTitle{
					font-size: 1.4em;
				}
				.collectionNum{
			    	text-align: center;
					position: relative;
					&:after,&:before{
						content: '';              
		            	position: absolute;       
			            top: 70%;
			            background: #e1e1e1;      
			            width: 13%;
			            height: 1px;
					}
					&:after{
						left: 20%;
					}
					&:before{
						right: 20%;
					}
			    }
			}
			img{
				width:18px;
				height: 18px;
			}
			.prodStatus{
				overflow: hidden;
				.statusImg{
					float: left;
					width: 37%;
					text-align: right;
				}
				.statusTest{
					padding: 10px;
				}
			}
			p{
			    padding-bottom: 10px;
    			line-height: initial;
			}
		}
	}
</style>