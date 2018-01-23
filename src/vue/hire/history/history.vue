<template lang="">
	<section id="history">
		<section id="certificateList">
			<mt-header fixed title="历史">
				<mt-button slot="right">
			  		<img src="../../../assets/users/icon/icon_trash.png" @click="deleteAll">
			  	</mt-button>
			</mt-header>
			<div class="breakbox"></div>
			<div class="content_bd" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<div v-infinite-scroll="loadMore"
		  		infinite-scroll-disabled="loading"
		  		infinite-scroll-distance="20">
		    <div id="cellSwipeBox">
		    	<mt-cell-swipe class="cell_swipe"
					v-for="historyList in historyLists"
					:right="cellSwipe"
					:data-goodsId = "historyList.goodsId" :data-countryType="historyList.countryType">
						<div class="goodsBox">
							<div class="goodsHead">
								<img v-if="historyList.thumbnail" :src="historyList.thumbnail">
								<img v-else src="../../../assets/users/icon/icon_wine.png">
								<div class="goodsTitle">
									<div class="goodsName" v-text="historyList.goodsName || '商品名称'">
									</div>
									<div class="goodsNumber" v-if="historyList.createDate" v-text="historyList.createDateStr">
										2017-4-16
									</div>
								</div>
							</div>
							<!-- <div class="goodsBody">
								<img v-if="historyList.goodsImg" :src="historyList.goodsImg">
								<img v-else src="../../../assets/users/icon/icon_news.png">
							</div> -->
						</div>
					<!--   <div class="userDefault">
					  	<img v-if="!historyList.thumbnail" src="../../../assets/users/icon/icon_placeHoldeImage.png">
					  	<img v-else src="historyList.thumbnail">
					  	<div class="userBox">
					  		<div class="userName">
					  			<span v-text="historyList.name"></span>
					  		</div>
					  		<div>
					  			<span v-text="historyList.time"></span>
					  		</div>
					  	</div>
					  </div> -->
			    </mt-cell-swipe>
		    </div>
		    <div class="base-empty-div"></div>
		    </div>
		    </div>
	    </section>
	</section>
</template>
<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	 import { MessageBox } from 'mint-ui';
	export default{

		name:'history',
		data(){
			return{
				cur_id:'',
				historyLists:[],
				loading:false,
				wrapperHeight: 0,
				current_page:1,
				allPage:0,
				api:{
					//获取历史列表记录
					getList:'/genuine/scanRecord/getList',
					deleteList:'/genuine/scanRecord/deleteById',
					deleteAll:'/genuine/scanRecord/deleteAll'

				}
			}
		},
		mounted(){
			$(window).scrollTop(0);
		},
		created(){
			this.cellSwipe();
			this.getList();
		},
		watch:{
			'$route':'fetchData'
		},
		methods:{
			fetchData:function(){

			},
			gotoGoods:function(event){
				console.log(event);
				Toast({
		            message: event,
		            position: 'middle',
		            duration: 1000
	          	});
			},
			loadMore() {
		      	if (this.allPage>0) {
				  	this.loading=true;
				  	this.current_page++;
	        		this.getList(this.current_page);
			    }
			},
			deleteAll:function(){
				var _this = this;
				MessageBox.confirm('确定执行此操作?').then(action => {
				  this.$http({
			          method:'GET',
			          url:this.api.deleteAll,
			          emulateJSON: true,
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
						Indicator.close();
						Toast({
				            message: '所有历史已删除!!',
				            position: 'middle',
				            duration: 1000
			          	});
			          	_this.historyLists = [];
					},function(res){
						Indicator.close();
						Toast({
				            message: res.reason,
				            position: 'middle',
				            duration: 1000
			          });
					})
				});
			},
			//跳转页面
		    linkTo(url,id) {
		      if(id) {
		        this.$router.push(url+'/'+id);
		      } else {
		        this.$router.push(url);
		      }
		    },
	      	getList:function(pageNo){
	      		var _this = this;
	      		var params = {};
	      		params.pageNo = pageNo || 1;
		 		this.$http({
		          method:'GET',
		          url:this.api.getList,
		  		  params:params,
		//           headers: {"uuid": "244F015C-9745-4744-B7EB-72F4CFEAE1F4"},
		          emulateJSON: true,
				  before:function(){
					Indicator.open('加载中...');
				  }
	          }).then(function(res){
					Indicator.close();
					var body =res.data;
					if(body.errorCode=="0"){
						_this.allPage = body.result.length;
						_this.historyLists = _this.historyLists.concat(body.result);
					}else{
						this.allPage = 0;
						Toast(body.reason)
					}
				},function(res){
					this.allPage = 0;
					Indicator.close();
					Toast({
			            message: '系统错误,请刷新！',
			            position: 'middle',
			            duration: 1000
		          });
				})
	      	},
	      	//右侧删除按钮click
      	    cellSwipe() {
		      var that=this;
		      this.cellSwipe=[
		        {
		          content: '删除',
		          style: { background: 'red', color: '#fff', width:'100px','text-align':'center','line-height':"55px"},
		          handler: (e) => this.$messagebox.confirm('确定删除历史记录?').then(function(){

		            that.delItem();
		          },function() {
		            
		          }),
		        }
		      ];
		      $(document).on("touchstart",".cell_swipe",function(){
		        that.cur_id=$(this).attr("data-goodsId");
		        // console.log(that.cur_id)
		      }).on("click",".cell_swipe",function(){
		        var id =$(this).attr("data-goodsId");
		        var countryType=$(this).attr("data-countryType")
		        that.$router.push({name:'goodsDetailsShow',query:{id:id,countryType:countryType}});
		        // console.log(id)
		      });
		      // $(document).off("touchstart",".cell_swipe",function(){
		      //   that.cur_id=$(this).attr("data-goodsId")
		      // }).off("click",".cell_swipe",function(){
		      //   that.cur_id=$(this).parent("a").attr("data-goodsId");
	       //   	var id =$(this).parent("a").attr('data-goodsId');
		      //   that.$router.push({name:'goodsDetailsShow',query:{id:id}});
		      //   // that.linkTo('/certificate',that.cur_id);
		      // });
		    },
		        //删除历史记录
		    delItem: function(){
				var params = {
					goodsId:this.cur_id
				}
		      this.$http({
		          method:'GET',
		          url:this.api.deleteList,
		  		  params:params,
		  		  //  headers: {"uuid": "244F015C-9745-4744-B7EB-72F4CFEAE1F4"},
		//           headers: {"uuid": "14af3bb2ca6a42429648f347b89ea158"},
		          emulateJSON: true,
				  before:function(){
					Indicator.open('删除中...');
				  }
	          }).then(function(response){
					Indicator.close();
					  Toast({
		              message: '删除成功！',
		              position: 'middle',
		              duration: 1000
		            });
		            setTimeout(function() {
		              window.location.reload();
		            },1000);
					// var body =response.data;
					// _this.historyLists = body.result;
					// Toast({
			  //           message: response,
			  //           position: 'middle',
			  //           duration: 1000
		   //        });
				},function(response){
					Indicator.close();
					Toast({
			            message: '系统错误,请刷新！',
			            position: 'middle',
			            duration: 1000
		          });
				})
		      // this.$http.get(vm.api.deleteList,params,
		      // {
		      //   before: function() {
		      //     Indicator.open('删除中...');
		      //   }
		      // })
		      // .then((res) => {
		      //   Indicator.close();
		      //   if(res.body.respCode == '0'){
		      //       Toast({
		      //         message: '删除成功！',
		      //         position: 'middle',
		      //         duration: 1000
		      //       });
		      //       setTimeout(function() {
		      //         window.location.reload();
		      //       },1000);
		      //   }
		      // },(res) => {
		      //   Indicator.close();
		      //   Toast({
		      //     message: '删除失败！',
		      //     position: 'middle',
		      //     duration: 1000
		      //   });
		      // })
		    },
		}
	}
</script>
<style lang="sass">
	#history{
		.mint-cell-title{
			display:none;
		}
		.is-right{
			img{
				height: 20px;
				width: 20px;
				display:inline;
			}
		}
		.goodsBox{
			.goodsHead{
				img{
			        float: left;
				    height: 2rem;
				    width: 2rem;
				    margin: 0.2rem 0.4rem
				}
			}
			.goodsTitle{
				float: left;
				line-height: 30px;
				width: 8rem;
				div{
					padding: 5px 0;
				}
				.goodsNumber{
					font-size: 0.8em;
				}
			}
			.goodsBody{
				img{
					width:100%;
				}
			}

		}
		// .mint-cell-swipe{
		// 	margin-top: 10px;
		// }
		.mint-cell-wrapper{
			display:block;
			padding: 0;
		}
		.mint-cell-value{
			display:block;
			border-top: 1px solid #e3e3e3;
		}
		.userDefault{
		  		padding: 5px;
		  		background: #fff url(../../../assets/users/icon/icon_nav_goto_black.png) no-repeat right 10px top 10px;
		  		background-size: 50px auto;
		  		overflow: hidden;
		  		height:auto;
		  		img{
			    	float: left;
				    width: 50px;
				    height: 50px;
				    margin: 10px;
		  		}
		  		.userBox{
		  			margin: 10px 30px 10px 80px;
		  			div{
		  				margin-top: 10px;
		  			}
		  		}
		  	}
	}
</style>