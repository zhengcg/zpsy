<template>
	<div id="richScan">
		<mt-header fixed title="扫码结果">
			<router-link to="/home/findwork" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
		</mt-header>
		<div class="breakbox"></div>
		<div v-if="prodStatus == '-1'" class="noData">
			<p>抱歉，正品溯源暂时未收录该商品的正品溯源信息</p>
			<p>厂商跨境正溯源信息展示合作</br>欢迎联系QQ:3558634820</p>
		</div>
		<div v-else>
		<router-link :to="{ name: 'goodsDetailsShow', query: { id:goodList.id}}">
		<div class="head">
			<div class="imgBox">
				<img v-if="goodList.thumbnail" :src="goodList.thumbnail">
			  	<img v-else src="../../../assets/users/icon/icon_placeHoldeImage.png">
			</div>
			<div class="con">
				<h1><span v-text="goodList.name || '商品名称'"></span></h1>
				<h2><span class="userNum" v-text="goodList.officeName || '正品溯源科技股份有限公司'"></span></h2>
				<h2>正品溯源码：<span v-text="code.toLocaleUpperCase()" style="word-break:break-all"></span></h2>
				<a href="javascript:;" @click.stop="showPicker" v-if="prodStatus != '-1'">比价</a>			
			</div>
		</div>
		</router-link>
		<!-- 正品 -->
		<div class="box2" v-if="prodStatus == '0'">
			<h1>正品溯源权威鉴定</h1>
			<a href="javascript:;" class="statusBtn">
			<i class="zp"></i>
			正品
			</a>				
		</div>
		<!-- 可疑品 -->
		<div class="box" v-if="prodStatus == '1'">
			<h1>正品溯源权威鉴定</h1>
			<a href="javascript:;" class="statusBtn">
			<i class="ky"></i>
			可疑品
			</a>
			<p>此正品码在不同的设备上已经被查询<span v-text="products.length||0"></span>次</p>
			<div>
				<a href="javascript:;" @click="getDetail">查看详情</a>
				<router-link :to="{ name: 'reportIndex', query: { id:goodList.id,code:this.code,code1:this.code1}}">
					    <a href="javascript:;">举报有奖</a>
				 </router-link>
			</div>			
		</div>
		<!-- 伪品 -->
		<div class="box1" v-if="prodStatus == '2'">
			<h1>正品溯源权威鉴定</h1>
			<a href="javascript:;" class="statusBtn">
			<i class="wp"></i>
			伪品
			</a>
			<p>欢迎举报此产品，告诉我们详细信息，经确认后可获得积分奖励</p>
			<div>
				<router-link :to="{ name: 'reportIndex', query: { id:goodList.id,code:this.code,code1:this.code1}}">
					    <a href="javascript:;">举报有奖</a>
				 </router-link>
				
			</div>			
		</div>
		<!-- 没查到 -->
		<div class="box2" v-if="prodStatus == '-1'">
			<h1>商品不存在</h1>					
		</div>
		
		<div id="shadeDiv" v-show="isShade"></div>
		<!-- 扫码详情弹框 -->
		<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">

		<div class="popBox" v-show="isDetail"  v-if="countryType=='kr'">
			<div class="popHead">扫码详情<a href="javascript:;" class="closeBtn" @click="closeDetail"></a></div>
			<div class="popBody">
				<div class="info">
					<p>本商品已进行<span v-text="products.length||0"></span>次正品认证扫码（参考下方）！请仔细核对以下扫码记录，如有确认不是您本人掌握的扫码记录，则此商品可能有疑问。</p>
				</div>
				<table>					
					<tbody>
						<tr>
							<td>显示最后一次扫码时间，目前是第一次</td>
							<td>机型</td>
							<td>扫码地点</td>
						</tr>
						<tr v-for="product in products">
							<td><span v-if="product.scanTime" v-text="product.scanTime.substr(0,10) || '时间'">2017-2-17</span></td>
							<td><span v-text="product.model || '设备'">iphone7</span></td>
							<td><span v-text="product.city || '地点'">北京</span></td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>


		<div class="popBox" v-show="isDetail" v-else>
			<div class="popHead">扫码详情<a href="javascript:;" class="closeBtn" @click="closeDetail"></a></div>
			<div class="popBody">
				<div class="info">
					<p>此正品溯源码已在不同设备、不同地点总共扫了 <span v-text="products.length||0"></span> 次！请仔细核对以下扫码记录，如有确认不是您本人掌握的扫码记录，则此商品可能有疑问。</p>
				</div>
				<table>					
					<tbody>
						<tr>
							<td>扫码时间</td>
							<td>机型</td>
							<td>扫码地点</td>
						</tr>
						<tr v-for="product in products">
							<td><span v-if="product.scanTime" v-text="product.scanTime.substr(0,10) || '时间'">2017-2-17</span></td>
							<td><span v-text="product.model || '设备'">iphone7</span></td>
							<td><span v-text="product.city || '地点'">北京</span></td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>


		
		</transition>
		<!-- 企业介绍弹框 -->
		<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
		<div class="popInt" v-show="intro" v-if="countryType=='kr'">
			<div class="popIntHead popIntHead1"><a href="javascript:;" class="closeBtn" @click="closeIntro"></a></div>
			<div class="popIntBody">
				<p>企业名称：<span v-text="goodList.officeName"></span></p>
				<p>营业执照注册号：<span v-text="goodList.regNo"></span></p>
				<div class="s">
					该企业已通过中国电子商会(CECC)和正品溯源公司认证
				</div>
			</div>
		</div>
		<div class="popInt" v-show="intro" v-else>
			<div class="popIntHead"><a href="javascript:;" class="closeBtn" @click="closeIntro"></a></div>
			<div class="popIntBody">
				<h1>企业介绍</h1>
				<p>企业名称：<span v-text="goodList.officeName"></span></p>
				<p>营业执照注册号：<span v-text="goodList.regNo"></span></p>
				<div>
					企业信息已认证
				</div>
			</div>
		</div>
		
		</transition>
		<div class="panel">
			<div class="panel-head">
				商品认证信息
				<img v-if='img1=="1"' src="../../../assets/users/icon/icon_nav_goto_top.png"  @click="showBot">
				<img v-if='img1=="0"' src="../../../assets/users/icon/icon_nav_goto_bottom.png"  @click="showTop">
			</div>
			<div class="panel-body">
				<div style="height: 6rem;">
					<mt-swipe :auto="4000">
					  <mt-swipe-item v-for="item in goodsImg"><img :src="item" style="width: 100%;height: 100%"></mt-swipe-item>
					</mt-swipe>
				</div>
				<div class="info">
					<!-- <ul>
						<li v-for="item in list_ceccGoodsField">
							<div v-if="item.fieldType=='6'">
								<label>{{item.fieldName}}：</label>
								<img :src="item.fieldValue">
							</div>
							<div v-else>
								<label>{{item.fieldName}}：</label>
								{{item.fieldValue}}
							</div>
							
						</li>
					</ul> -->
				
					<table>
							<tr v-for="item in list_ceccGoodsField">
								<td>{{item.fieldName}} &nbsp;&nbsp;</td>
								<td v-if="item.fieldType=='6'"><img :src="item.fieldValue" @click="previewImg(item.fieldValue,[item.fieldValue])"></td>
								<td v-else>{{item.fieldValue}}</td>
							</tr>
						
					</table>
				</div>
				
			</div>
		</div>
		<div class="bBox" v-if="prodStatus == '0'||prodStatus == '1'">
			<a href="javascript:;" @click="getIntro">
				<img src="../../../assets/users/icon/icon02.png">
				<p>企业介绍</p>
			</a>
			<a href="javascript:;" @click="showZH" v-show="countryType=='kr'">
				<img src="../../../assets/users/icon/icon11.png">
				<p>商标授权证书</p>
			</a>
			<router-link :to="{ name: 'reportDetail', query: { url:reportFile,title:'检测报告',code:code1}}" v-show="countryType!=='kr'">
				<img src="../../../assets/users/icon/icon01.png">
				<p>检测报告</p>
			</router-link>
			<router-link :to="{ name: 'reportDetail', query: { url:certificateFile,title:'认证信息',code:code1}}" v-show="countryType!=='kr'">
				<img src="../../../assets/users/icon/icon03.png">
				<p>认证信息</p>
			</router-link>
			<a href="javascript:;" @click="getNet" v-if="qualificate.length>0" v-show="countryType!=='kr'">
				<img src="../../../assets/users/icon/icon09.png">
				<p>网点资质</p>
			</a>
		</div>
		<div class="panel" v-if="prodStatus != '2'">
			<div class="panel-head" v-if="list_ceccGoodsLotBatch.length>0||GoodsLotBatchs.length>0">
				溯源信息
				<img v-if='img2=="1"' src="../../../assets/users/icon/icon_nav_goto_top.png" @click='showBot1'>
				<img v-if='img2=="0"' src="../../../assets/users/icon/icon_nav_goto_bottom.png" @click='showTop1'>
			</div>
			<div class="panel-body">				
				<div class="yet">
					<ul v-if="list_ceccGoodsLotBatch.length>0">
						<li v-for="item in list_ceccGoodsLotBatch">
							<h1><span></span>{{item.data}}</h1>
							<p>{{item.event}}</p>							
						</li>
					
					</ul>
					<ul v-if="GoodsLotBatchs.length>0&&!list_ceccGoodsLotBatch.length>0">
						<li v-for="item in GoodsLotBatchs">
							<h1><span></span>{{item.process}}</h1>
							<div v-for="items in item.list_batchField">
									
								<p><label>{{items.operationTime}}</label> &nbsp;&nbsp;{{items.contents}}</p>											
								<div class="listImg" v-if="items.file.length>0">

									<a href="javascript:;" v-if="itemss" v-for="(itemss,index) in items.file" :data-index="index" @click="previewImg(itemss,items.file)" ><img :src="itemss"></a>
									
								</div>
							</div>
							
							
						</li>
					</ul>
				</div>
			</div>
		</div>
		<mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
       			<div class="clocePopup">
       				<img @click="pickerClose" src="../../../assets/users/icon/icon_remove.png">
       			</div>
   				<div class="priceBox" v-if="pricesListsFive.length>0">
   					<mt-cell :href="pricesList.spurl" v-for="pricesList in pricesListsFive" :title="pricesList.siteName"  is-link :value="'￥'+pricesList.spprice"/>
   				</div>
   				<div v-else style="height: 4rem;line-height: 4rem;text-align: center;color: #999;">
   					暂无数据
   				</div>
		    </mt-popup>
		    </div>
	</div>
</template>
<script>
import { Popup } from 'mint-ui';
	import { Picker } from 'mint-ui';
	import { MessageBox } from 'mint-ui'
	import { Toast } from 'mint-ui'//提示
	import { Indicator } from 'mint-ui'//加载
	import { Swipe, SwipeItem } from 'mint-ui';
	
	export default{
		name:'richScan',
		data(){
			return {
				countryType:'',
				ownershipFile:'',
				code:"",
				code1:"",
				latitude:0,
				longitude:0,
				isShade:false,
				isDetail:false,
				intro:false,
				api:{
					find:'/genuine/scanRecord/find',
					getComparePrices:'/genuine/product/comparePrices'
				},
				goodList:{},
				prodStatus:'',
				products:'',
				goodsImg:[],
				popupVisible:false,
				list_ceccGoodsField:[],
				list_ceccGoodsField1:[],
				list_ceccGoodsField2:[],
				pricesListsFive:[],
				GoodsLotBatchs:[],
				GoodsLotBatchs1:[],
				GoodsLotBatchs2:[],
				list_ceccGoodsLotBatch:[],
				goodListsFive:[],
				BatchsListsFive:[],
				certificateFile:'',
				reportFile:'',
				img1:'1',
				img2:'1',
				qualificate:[]

				
			}
		},
	   	watch:{
	   		'$route':'fetchData',
	   	},
	   	mounted(){
   		$(window).scrollTop(0);
	},
		created(){	

			this.fetchData();
			this.getScan();

				
		},
		methods:{
			
		  fetchData(){
	      	var query1 = this.$route.query;
	      	this.code1 = query1.code || '';
	      	// this.code1="http://s.izheng.org/?/cn/00029010100100020001"
	      },
	      getNet:function(){
	      	var self=this;
	      	self.previewImg(self.qualificate[0],self.qualificate);

	      },
	      showZH:function(){
	      	var src=this.ownershipFile;
	      	var arr=[];
	      	arr.push(src);
	      	wx.previewImage({
		      current: src,
		      urls:arr
		    });

	      },
	      previewImg:function(src,arr){
	      	console.log(arr)
	      	wx.previewImage({
		      current: src,
		      urls:arr
		    });

	      },
	      showTop:function(){
	      	this.img1='1'
	      	this.list_ceccGoodsField=this.list_ceccGoodsField1


	      },
	       showBot:function(){
	      	this.img1='0'
	      	this.list_ceccGoodsField=this.list_ceccGoodsField2


	      },
	      showTop1:function(){
	      	this.img2='1';
	      	// this.GoodsLotBatchs=this.GoodsLotBatchs1


	      },
	       showBot1:function(){
	      	this.img2='0';
	      	// this.GoodsLotBatchs=this.GoodsLotBatchs2

	      },
	      getDetail(){
	      	this.isShade=true;
	      	this.isDetail=true;


	      },
	      closeDetail(){
	      	this.isShade=false;
	      	this.isDetail=false;
	      },
	      getIntro(){
	      	this.isShade=true;
	      	this.intro=true;
	      },
	      closeIntro(){
	      	this.isShade=false;
	      	this.intro=false;
	      },
	      pickerClose:function(){
				this.popupVisible = false;
			},
	      showPicker:function(){
				this.popupVisible = true;
			},
			getComparePrices:function(){
				var _this =this;

	    		var params = {}
    			// params.keyword = '电饭锅';
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
	      getScan:function(){
				var _this = this;
				var model = 'iPhone';
				if(navigator.userAgent.indexOf('Android')>0){
					model = 'Android';
				}else{
					model = "iPhone";
				}
				 _this.getScanData();
				
				/*wx.getLocation({
				    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				    success: function (res) {
				        _this.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				        _this.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				        _this.getScanData();
				        
				    }
				});*/


  			},
  			getScanData:function(){
  				var _this=this;
  				 var params = {
					  "codeId": this.code1,
					  "scanMobile": "",
					  "scanLoc": "",
					  "longitude": 116.294657,
  					  "latitude": 39.823698,
					  "model": "",


					  "country": "中国",
					  "province": "北京市",
					  "city": "北京市",
					  "district": "丰台区",
					  "address": "北京市丰台区九号路122号",
					  "street": "九号路",
					  "number": "122号"
					}

                      this.$http({
                      		// emulateHTTP:true,
                            method:'post',
                            url:this.api.find,
                            body:params,
      						emulateJSON:false,
                        before:function(){
                          Indicator.open('加载中...');
                          }
                      }).then(function(res){
                      Indicator.close();
                      var body=res.body;
                      if(body.errorCode=="0"){
                      	if(body.result.goodsStatus.status=="1"){

                      		var data = res.body.result;

                      	this.goodList =  res.body.result.ceccGoods;
                      	this.countryType=this.goodList.countryType;
                      	if(this.countryType=='kr'){
                      		this.ownershipFile=this.goodList.ownershipFile

                      	}
                      	
                      	this.id = this.goodList.id;
                      	this.code=this.goodList.code;
                      	this.prodStatus = this.goodList.quality;
                      	this.products =data.list_ceccScanrecordForSuspectProduct?data.list_ceccScanrecordForSuspectProduct:[];
                      	if(data.station.qualificate){
                      		_this.qualificate=data.station.qualificate.split(",");
                      	}
                      	
                      	if(this.goodList.goodsImg){
                      		this.goodsImg=this.goodList.goodsImg.split(",");
                      	}
                      	
                      	if(data.list_batch){
                      		for(var p1=0;p1<data.list_batch.length;p1++){
                      		for(var p2=0;p2<data.list_batch[p1].list_batchField.length;p2++){
                      			var arrays=data.list_batch[p1].list_batchField[p2].file.split(',');
                      			data.list_batch[p1].list_batchField[p2].file=arrays
                      			}
                      		}

                      		this.GoodsLotBatchs=data.list_batch;
                      	}
                      	
                      	
                      	if(data.list_ceccGoodsLotBatch){
                      		this.list_ceccGoodsLotBatch=data.list_ceccGoodsLotBatch

                      	}

                      	

                      	this.reportFile=this.goodList.reportFile;
                      	this.certificateFile=this.goodList.certificateFile;

                      this.list_ceccGoodsField1 = this.goodList.list_ceccGoodsField.slice(0, 5);
                      	this.list_ceccGoodsField2 = this.goodList.list_ceccGoodsField;
                      	this.list_ceccGoodsField=this.list_ceccGoodsField1;
                    
                      	

                      	if(this.goodList.name){
							this.getComparePrices();
                      	}
                      	if(body.result.ceccGoods.list_ceccGoodsField){
                      		$.each(body.result.ceccGoods.list_ceccGoodsField,function(i,item){
								if(i < 6 ){
									_this.goodListsFive.push(item);
								}else{
									return false;
								}
							});
                      	}
						if(data.list_ceccGoodsLotBatch){
							$.each(data.list_ceccGoodsLotBatch,function(i,item){
								if(i < 6 ){
									_this.BatchsListsFive.push(item);
								}else{
									return false;
								}
							});
						}
						
						_this.goodsFive = _this.goodListsFive;
						_this.GoodsBatchs = _this.BatchsListsFive;
						

                      	}else{
                      		Toast(body.result.goodsStatus.describe)
                      	}
                      	

                      }else if(body.errorCode=='-1'){
                      	this.dataStatus = 1;
                      	Toast(body.reason)
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
	width: 10.8rem;
	margin: 0 auto;
	background: #efefef;
	position: relative;
		.noData{
		    margin-top: 50%;
		    text-align: center;
		    position: absolute;
		    z-index: 2;
		    // color: #fdfdfd;
			p{
				line-height: initial;
				margin: 20px 15%;
				&:nth-of-type(2){
				    padding: 10px;
				    background: rgba(0, 0, 0, 0.3);
				    font-size: 0.7em;
				    border-radius: 10px;
				    width: 60%;
				    margin-left: 19%;
				    color:#fff;
				}
			}
			a{
				color: #fdfdfd;
			}
		}
		
	.bgIcon{
			img{
				position: absolute;
				z-index: 1;
				width:100%;
			}
		}
		.clocePopup{
			padding:10px;
			overflow:hidden;
			img{
			    float: right;
    			width: 13px;
			}
		}
		.mint-popup{
			width: 100%;
			max-height: 50%;
			overflow:auto;
		}
	#shadeDiv{
		background: #000;
		opacity: 0.3;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 10;
	}
	.popInt{
		width: 9.8rem;
		height: 9.5rem;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -4.9rem;
		margin-top: -4.75rem;
		background: #fff;
		padding: 0.1rem;
		border-radius: 0.2rem;
		z-index: 10;
		.popIntHead{
			background: #00b9de url("../../../assets/users/icon/icon10.png") no-repeat center;
			background-size: 2.75rem auto;
			height: 3.75rem;
			a{
				display: block;
				width: 0.36rem;
				height: 0.36rem;
				position: absolute;
				right: 0.4rem;
				top: 0.4rem;
				background: url("../../../assets/users/icon/closeBtn.png") no-repeat center;

			}
		}
		.popIntHead1{
			background: #00b9de url("../../../assets/users/icon/icon07.png") no-repeat center;
			background-size: 2.75rem auto;
			height: 3.75rem;

		}
		.popIntBody{
			text-align: center;
			h1{
				font-size: 0.48rem;
				color: #333;
				padding: 0.6rem 0 0.26rem 0;
				width: 5.9rem;
				border-bottom: 1px solid #ccc;
				margin:0 auto;
				font-weight: normal;
			}
			p{
				margin-top: 0.75rem;
				font-size: 0.39rem;
			}
			div{
				margin-top: 0.77rem;
				width:4.2rem;
				margin-left: auto;
				margin-right: auto;
				color: #af0808;
				font-size: 0.45rem;
				padding-left: 0.9rem;

				background: url("../../../assets/users/icon/icon08.png") no-repeat left center;
				background-size: 0.56rem 0.56rem;
				height: 0.56rem;
				line-height: 0.56rem;
			}
			div.s{
				margin-top: 0.77rem;
				width:8rem;
				margin-left: auto;
				margin-right: auto;
				color: #af0808;
				font-size: 0.45rem;
				padding-left: 0.9rem;

				background: url("../../../assets/users/icon/icon08.png") no-repeat left center;
				background-size: 0.56rem 0.56rem;
				height: 0.56rem;
				line-height: 0.56rem;
			}
		}
	}
	.popBox{
		width: 9.8rem;
		height: 7.96rem;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -4.9rem;
		margin-top: -3.98rem;
		background: #fff;
		z-index: 10;
		border-top: 0.05rem solid #a7a7a7;
		.popHead{
			height: 1.8rem;
			line-height: 1.8rem;
			border-bottom: 1px solid #a7a7a7;
			position: relative;
			background: #00b9de;
			text-align: center;
			font-size: 0.45rem;
			color: #fff;
			a{
				display: block;
				width: 0.36rem;
				height: 0.36rem;
				position: absolute;
				right: 0.5rem;
				top: 0.72rem;
				background: url("../../../assets/users/icon/closeBtn.png") no-repeat center;
				background-size: contain;
			}

		}
		.popBody{
			height: 6.16rem;
			overflow-y: auto;
			.info{
				padding: 0.3rem 0.85rem;
				p{
					color: #333;
					font-size: 0.39rem;
					line-height: 0.7rem;
				}
			},
			table{
				border: 1px solid #bababa;
				border-collapse: collapse;
				width: 100%;
				td{
					border: 1px solid #bababa;
					width: 33.33333333%;
					text-align: center;
					line-height: 1.1rem;
					font-size: 0.39rem;
					color: #333;
				}
			}
		}
	}
	.head{
		background: #fff;
		padding: 0.3rem 0.5rem;
		height: 3.34rem;
		.imgBox{
			width:2.74rem;
			height:2.74rem;
			float: left;
			img{
				width:100%;
				height:100%;
			}
		}
		.con{
			color: #333;
			height:2.74rem;
			margin-left: 3rem;
			position:relative;
			h1{
				font-size: 0.42rem;	
				font-weight: normal;
				margin-bottom: 0.15rem;		
			}
			h2{
				font-size: 0.33rem;
				font-weight: normal;
				line-height: 0.85rem;
			}
			a{
				display: block;
				position: absolute;
				bottom: 0;
				right: 0;
				width:1.76rem;
				height:0.65rem;
				line-height: 0.65rem;
				text-align: center;
				font-size: 0.39rem;
				color: #fff;
				background: #c3222c;
				border-radius: 0.05rem;
			}
		}
	}
	.head:after{
		clear: both;
		content: '';
		display: block;
		height:0;
	}
	.box{
		margin: 0.2rem 0;
		height:6.35rem;
		background: url("../../../assets/users/icon/ky.png") no-repeat center;
		background-size: contain;
		text-align: center;
		h1{
			font-size: 0.7rem;
			color: #fff;
			text-align:center;
			padding-top: 0.7rem;
			font-weight: bolder;
			margin-bottom: 0.54rem;
		}
		.statusBtn{
			display: inline-block;
			margin: 0 auto;
			padding: 0.15rem 0.38rem;
			color: #fff;
			font-size: 0.7rem;
			line-height: 0.8rem;
			background:linear-gradient(#9a918a, #97908a);
			opacity: 0.9;
			border-radius: 0.1rem;

			i{
				display: inline-block;
				width:0.8rem;

				height:0.8rem;
				margin-right: 0.1rem;
				vertical-align:middle;

			}
			i.ky{
				 background: url("../../../assets/users/icon/icon04.png") no-repeat center;
				background-size: contain;
			}
		}
		p{
			margin-top: 0.7rem;
			color: #fff;
			font-size: 0.4rem;
		}
		div{
			width: 6.9rem;
			margin:0.7rem auto;
			position: relative;
			a{
				display: inline-block;
				width: 2.56rem;
				height:0.85rem;
				line-height: 0.85rem;
				text-align: center;
				color: #fff;
				background: #c3222c;
				font-size: 0.4rem;
				float: left;
			} 
			a:last-of-type{float: right}
		}
		div:after{
			clear:both;
			content: '';
			display: block;
			height: 0;
		}
	}
	.box1{
		margin: 0.2rem 0;
		height:6.35rem;
		background: url("../../../assets/users/icon/ky.png") no-repeat center;
		background-size: contain;
		text-align: center;
		h1{
			font-size: 0.7rem;
			color: #fff;
			text-align:center;
			padding-top: 0.7rem;
			font-weight: bolder;
			margin-bottom: 0.54rem;
		}
		.statusBtn{
			display: inline-block;
			margin: 0 auto;
			padding: 0.15rem 0.38rem;
			color: #fff;
			font-size: 0.65rem;
			line-height: 0.7rem;
			background: #9b928b;
			border-radius: 0.1rem;
			i{
				display: inline-block;
				width:0.7rem;

				height:0.7rem;
				margin-right: 0.1rem;
				vertical-align:middle;

			}
			i.wp{
				 background: url("../../../assets/users/icon/icon05.png") no-repeat center;
				background-size: contain;
			}
		}
		p{
			margin: 0.4rem auto;
			width: 8rem;
			color: #fff;
			line-height: 1.5;
			font-size: 0.4rem;
		}
		div{
			width: 6.9rem;
			margin:0.7rem auto;
			position: relative;
			a{
				display: inline-block;
				width: 2.56rem;
				height:0.85rem;
				line-height: 0.85rem;
				text-align: center;
				color: #fff;
				background: #c3222c;
				font-size: 0.4rem;
				float: left;
			} 
			a:last-of-type{float: right}
		}
		div:after{
			clear:both;
			content: '';
			display: block;
			height: 0;
		}
	}
	.box2{
		margin: 0.2rem 0;
		height:3.9rem;
		background: url("../../../assets/users/icon/zp.png") no-repeat center;
		background-size: contain;
		text-align: center;
		h1{
			font-size: 0.7rem;
			color: #fff;
			text-align:center;
			padding-top: 0.7rem;
			font-weight: bolder;
			margin-bottom: 0.8rem;
		}
		.statusBtn{
			display: inline-block;
			margin: 0 auto;
			padding: 0.15rem 0.38rem;
			color: #fff;
			font-size: 0.7rem;
			line-height: 0.8rem;
			background: #9b928b;
			border-radius: 0.1rem;
			i{
				display: inline-block;
				width:0.8rem;

				height:0.8rem;
				margin-right: 0.1rem;
				vertical-align:middle;

			}
			i.zp{
				 background: url("../../../assets/users/icon/icon06.png") no-repeat center;
				background-size: contain;
			}
		}	
	}
	.panel{
		background: #fff;
		margin-bottom: 0.2rem;
		.panel-head{
			text-align:center;
			height: 1.2rem;
			line-height: 1.2rem;
			color: #333;
			font-size: 0.42rem;
			position: relative;
			margin-top: 0.2rem;
			img{
				position: absolute;
				width: 0.4rem;
				height: 0.326rem;
				top: 0.437rem;
				right: 0.5rem;
			}
		}
		.panel-body{
			div.info{
				padding: 0 0.5rem;
				ul{
					font-size: 0.33rem;
					color: #333;
					li{
						line-height: 1.5;
						padding: 0.2rem 0;
						position: relative;
						// padding-left: 1.8rem;
						img{
							width: 1.5rem;
						}
						label{
							display: inline-block;
							// width: 1.8rem;
							// position:absolute;
							// left: 0;
							line-height: 1.5;
							display: inline-block;
							min-width: 2rem;
						}
					}
				}
				table{
					font-size: 0.33rem;
					color: #333;
					tr{
						td{
						line-height: 1.5;
						padding: 0.2rem 0;
						img{
							width: 1.5rem;
							vertical-align: middle;
						}
					}
					td:first-of-type{
						min-width: 1.8rem;
						white-space: nowrap;
						
					}
					td:last-of-type{
						word-break: break-all;
					}


					}
					

				}
			}
			div.yet{
				position:relative;
				margin-left: 0.88rem;
				
				padding-bottom: 1rem;
				ul{
					padding: 0 0.5rem 0 0;
					position: relative;
					li{
						border-left: 0.01rem solid #000;
						h1{
							position: relative;
							height: 0.9rem;
							line-height: 0.9rem;
							font-size: 0.4rem;
							font-weight: normal;
							padding-left: 0.45rem;
							span{
								position: absolute;
								display: block;
								width: 0.21rem;
								height: 0.21rem;
								border-radius: 50%;
								border: 0.01rem solid #000;
								background:#eb6100;
								top: 0.35rem;
								left: -0.1rem; 
							}
						}
						div{
							a{
								img{width:3rem;}
							}
							p{
							font-size: 0.3rem;
							line-height: 1.5;
							padding-left: 0.6rem;
							.listImg{
							padding: 0.2rem 0 0.2rem 0.6rem;
							a{
								width: 33.3333333%;
								display: block;
								float: left;
								margin-bottom: 0.2rem;
								text-align: left;
								img{
									width: 2.4rem;
									height: 2.4rem;

								}

							}
							
						}
						.listImg:after{
							clear: both;
							content: '';
							display: block;
							height: 0;
						}

						}
						}
						p{
							font-size: 0.3rem;
							line-height: 1.5;
							padding-left: 0.6rem;

						}
						.listImg{
							padding: 0.2rem 0 0.2rem 0.6rem;
							a{
								width: 33.3333333%;
								display: block;
								float: left;
								margin-bottom: 0.2rem;
								text-align: left;
								img{
									width: 2.4rem;
									height: 2.4rem;

								}

							}
							
						}
						.listImg:after{
							clear: both;
							content: '';
							display: block;
							height: 0;
						}

					}
				}
			}
		}
	}
	.bBox{
		margin-bottom: 0.2rem;
		background: #fff;
		a{
			display: block;
			width: 33.333333%;
			text-align: center;
			float: left;
			padding: 0.3rem 0;
			img{
				display: block;
				margin: 0 auto;
				width: 1.8rem;
				height: 1.8rem;
				margin-bottom: 0.2rem;
			}
			p{
				font-size: 0.4rem;
			}
		}
	}
	.bBox:after{
		clear: both;
		content: '';
		display: block;
		height: 0;
	}

}

	
</style>