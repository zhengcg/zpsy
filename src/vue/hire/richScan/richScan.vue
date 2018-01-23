<template>
	<div id="richScan">
		<mt-header fixed title="扫码结果">
			<router-link to="/home/findwork" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
		</mt-header>
		<div class="breakbox"></div>
		<div class="zhezhao" v-show="isFlag"></div>
		<div v-if="quality==-1" class="noData">
			<div>
				<p>抱歉，正品溯源暂时未收录该商品的正品溯源信息</p>
				<p>厂商跨境正溯源信息展示合作</br>欢迎联系QQ:3558634820</p>
			</div>			
		</div>
		<div v-if="error" class="noData">
			<div>
				<p>{{reason}}</p>
			</div>			
		</div>
		<!-- 正品 -->
		<div class="zBox" v-if="quality==0">
			<div class="statusBox"></div>
			<div class="codeBox"><img src="../../../assets/users/icon/dBox.png"><em>正品溯源码：{{codeShow}}</em></div>
			<p style="text-align: center;font-size: 0.45rem;color: #fff;line-height: 1rem;">该商品经过CECC和正品溯源公司鉴定为正品</p>
			<router-link :to="{ name: 'reportIndex', query: { id:id,code:this.code,code1:this.codeSend,countryType:this.countryType,codeShow:this.codeShow}}">
			<a href="javascript:;" class="btns btn-primary">举报有奖</a>
			</router-link>
		</div>

		<!-- 有风险 -->
		<div class="yBox" v-if="quality==1">
			<div class="statusBox"></div>
			<div class="codeBox"><img src="../../../assets/users/icon/dBox.png"><em>正品溯源码：{{codeShow}}</em></div>
			<p style="text-align: center;font-size: 0.45rem;color: #fff;line-height: 1rem;">此正品溯源已经被验证过<span v-text="products.length||0"></span>次</p>
			<p  style="text-align: center;font-size: 0.33rem;color: #fff;">如果不是本人操作，则此商品为非正品</p>
			<table>				
				<tr>
					<td style="border-left: none;"><a href="javascript:;" @click="getDetail">查看详情</a></td>
					<td style="border-right: none;">
					<router-link :to="{ name: 'reportIndex', query: { id:id,code:this.code,code1:this.codeSend,countryType:this.countryType,codeShow:this.codeShow}}">
						举报有奖
					</router-link>
					</td>
				</tr>
			</table>
		</div>
		<!-- 伪品 -->
		<div class="wBox" v-if="quality==2">
			<div class="statusBox"></div>
			<div class="codeBox"><img src="../../../assets/users/icon/dBox.png"><em>正品溯源码：{{codeShow}}</em></div>
			<p style="text-align: center;font-size: 0.45rem;color: #fff;line-height: 1rem;">此正品溯源已经被验证过<span v-text="products.length||0"></span>次</p>			
			<table>				
				<tr>
					<td style="border-left: none;"><a href="javascript:;" @click="getDetail">查看详情</a></td>
					<td style="border-right: none;">
						<router-link :to="{ name: 'reportIndex', query: { id:id,code:this.code,code1:this.codeSend,countryType:this.countryType,codeShow:this.codeShow}}">
							举报有奖
						</router-link>
					</td>
				</tr>
			</table>
		</div>
		<!-- 商品认证信息 -->
		<div class="goodsInfo clearfix">
			<div class="titleBox">商品认证信息</div>
			<div class="imgBox clearfix">
				<a href="javascript:;" v-for="item in goodsImg">
					<img :src="item" @click="previewImg(item,goodsImg)">
				</a>
				
			</div>
			<table>
				
				<tr v-for="item in list_ceccGoodsField">
								<td>{{item.fieldName}}： &nbsp;&nbsp;</td>
								<td v-if="item.fieldType=='6'"><img :src="item.fieldValue" @click="previewImg(item.fieldValue,[item.fieldValue])"></td>
								<td v-else>{{item.fieldValue}}</td>
							</tr>

			</table>
		</div>

		<div class="bBox" v-if="quality == '0'||quality == '1'">
			<a href="javascript:;" @click="getIntro">
				<img src="../../../assets/users/icon/icon02.png">
				<p>企业介绍</p>
			</a>
			<a href="javascript:;" @click="showZH" v-show="countryType=='kr'&&ownershipFile!==''">
				<img src="../../../assets/users/icon/icon11.png">
				<p>商标授权证书</p>
			</a>
			<router-link :to="{ name: 'reportDetail', query: { url:reportFile,title:'检测报告',code:codeSend}}" v-show="countryType!=='kr'&&reportFile!==''">
				<img src="../../../assets/users/icon/icon01.png">
				<p>检测报告</p>
			</router-link>
			<router-link :to="{ name: 'reportDetail', query: { url:certificateFile,title:'认证信息',code:codeSend}}" v-show="countryType!=='kr'&&certificateFile!==''">
				<img src="../../../assets/users/icon/icon03.png">
				<p>认证信息</p>
			</router-link>
			<a href="javascript:;" @click="getNet" v-if="qualificate.length>0" v-show="countryType!=='kr'">
				<img src="../../../assets/users/icon/icon09.png">
				<p>网点资质</p>
			</a>
		</div>

		<!-- 溯源信息 -->
		<div class="panel" v-if="countryType!=='kr'&&quality!==2">
			<div class="titleBox">溯源信息</div>
			<div class="panel-body">
				<div class="leftBorder">
					<div class="list" v-for="item in GoodsLotBatchs">
						<h1>{{item.process}}</h1>
						<div v-for="items in item.list_batchField">
							<p style="color: #00a0e9">
								<span>{{items.operationTime}}</span>
								<span>{{items.location}}</span>
								<span>{{items.operator}}</span>
							</p>
							<p>{{items.contents}}</p>
							<div style="padding-left: 30px;padding-top: 0.1rem;padding-bottom: 0.4rem;" v-if="items.file.length>0">
								<ul class="clearfix">
									<li v-if="itemss" v-for="(itemss,index) in items.file">
										<a href="javascript:;"  :data-index="index" @click="previewImg(itemss,items.file)">
											<img :src="itemss">
										</a>
									</li>
								</ul>
							</div>
						</div>
						
						
					</div>

					
				</div>
				
			</div>
		</div>

		<!-- 弹框 -->
		<div id="shadeDiv" v-show="isShade"></div>
		<!-- 扫码详情弹框 -->
		<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
		<!-- 韩国的 -->
		<div class="popBox xiang" v-show="isDetail"  v-if="countryType=='kr'">
			<div class="popHead"><a href="javascript:;" class="closeBtn" @click="closeDetail"></a></div>
			<div class="popBody">
				<div class="info">
					<p>本商品已进行<span v-text="products.length||0"></span>次正品认证扫码（参考下方）</p>
				</div>
				<table>					
					<tbody>
						<tr>
							<td>扫码时间</td>
							<td>机型</td>
							<td>扫码地点</td>
						</tr>


						<tr v-for="product in products">
							<td><span v-if="product.scanTime" v-text="product.scanTime"></span></td>
							<td><span v-text="product.model"></span></td>
							<td><span v-text="product.city"></span></td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>

		<!-- 中国的 -->
		<div class="popBox xiang" v-show="isDetail" v-else>
			<div class="popHead"><a href="javascript:;" class="closeBtn" @click="closeDetail"></a></div>
			<div class="popBody">
				<div class="info">
					<p>此正品溯源码已在不同设备、不同地点总共扫了<span v-text="products.length||0"></span>次！请仔细核对以下扫码记录，如有确认不是您本人掌握的扫码记录，则此商品可能有疑问。</p>
				</div>
				<table>					
					<tbody>
						<tr>
							<td>扫码时间</td>
							<td>机型</td>
							<td>扫码地点</td>
						</tr>
						<tr v-for="product in products">
							<td><span v-if="product.scanTime" v-text="product.scanTime"></span></td>
							<td><span v-text="product.model"></span></td>
							<td><span v-text="product.city"></span></td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>


		
		</transition>
		<!-- 企业介绍弹框 -->
		<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
		<!-- 韩国的 -->
		<div class="popInt" v-show="intro" v-if="countryType=='kr'">
			<div class="popIntHead popIntHead1"><a href="javascript:;" class="closeBtn" @click="closeIntro"></a></div>
			<div class="popIntBody">
				<p>企业名称：<span v-text="officeName"></span></p>
				<p>营业执照注册号：<span v-text="regNo"></span></p>
				<div class="s">
					该企业已通过中国电子商会(CECC)和正品溯源公司认证
				</div>
			</div>
		</div>
		<!-- 中国的 -->
		<div class="popInt" v-show="intro" v-else>
			<div class="popIntHead"><a href="javascript:;" class="closeBtn" @click="closeIntro"></a></div>
			<div class="popIntBody">
				<h1>企业介绍</h1>
				<p>企业名称：<span v-text="officeName"></span></p>
				<p>营业执照注册号：<span v-text="regNo"></span></p>
				<div>
					企业信息已认证
				</div>
			</div>
		</div>
		
		</transition>
	</div>
</template>
<script>
import { Popup } from 'mint-ui';
	import { Picker } from 'mint-ui';
	import { MessageBox } from 'mint-ui'
	import { Toast } from 'mint-ui'//提示
	import { Indicator } from 'mint-ui'//加载
	
	export default{
		name:'richScan',
		data(){		
			return {	
				id:"",
				 // -1 没有此商品 0正品 1可疑品 2伪品
				quality:'',
				// kr为韩国
				countryType:'',	
				// 是否显示详情
				isDetail:false,
				// 是否显示遮罩
				isShade:false,
				// 是否显示企业介绍
				intro:false,
				// 明码
				codeShow:'',
				// 发送给后台的code
				codeSend:'',
				// 商品认证信息图片
				goodsImg:[],
				// 商品认证信息图片
				list_ceccGoodsField:[],
				// 商品授权证书
				ownershipFile:'',
				// 检测报告
				reportFile:'',
				// 认证信息
				certificateFile:'',
				// 网点资质
				qualificate:[],
				// 扫码次数
				products:[],
				// 企业名称
				officeName:"",
				// 营业注册执照号
				regNo:"",
				code:'',
				// 溯源信息
				GoodsLotBatchs:[],	
				isFlag:true,
				error:false,
				reason:'',	
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
	   	mounted(){
   		$(window).scrollTop(0);
		},
		created(){
			this.fetchData();
			// this.getScan();
		
		},
		methods:{
			
			fetchData(){
		      	var query = this.$route.query;
		      	this.codeSend = query.code || '';
		      	// this.codeShow=query.code.split("/")[query.code.split("/").length-1]
		      	this.sendData()

		    },
		    // 拼接准备发送给后端的数据
		    sendData(){
		    	var self = this
				wx.getLocation({
				    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				    success: function (res) {
				        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				        // alert(res.latitude)	;
				        self.gdApi(longitude,latitude)		   				        
				        
				    }
				});
				// self.gdApi(116.294674,39.823716)


				
			      
				
		      // console.log(adrees);
				
				
				

		    },
		    gdApi:function(longitude,latitude){
		    	var self=this;
		    	   $.ajax({
			            type: "get",
			            async: false,
			            url: "http://api.map.baidu.com/geocoder/v2/",
			            data:{
			    			ak:'kEQoccPmIWjptdwszsCgQieDVM3qOOmV',
			    			location:latitude+','+longitude,
			    			radius:1000,
			    			output:'json'
			    		},
			            dataType: "jsonp",
			            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
			            jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
			            success: function(res){
			                var params = {
									  "codeId": self.codeSend,
									  "scanMobile": "",
									  "scanLoc": res.result.formatted_address,
									  "longitude": longitude,
				  					  "latitude": latitude,
									  "model": "",
									  "country": res.result.addressComponent.country,
									  "province": res.result.addressComponent.province,
									  "city": res.result.addressComponent.city,
									  "district": res.result.addressComponent.district,
									  "address": res.result.formatted_address,
									  "street": res.result.addressComponent.street,
									  "number": res.result.addressComponent.street_number
									}
									console.log(params);

								 self.getScan(params);
			                
			            },
			            error: function(){
			                alert('fail');
			            }
			        });
		    	/*$.ajax({
		    		url:'http://api.map.baidu.com/geocoder/v2/',
		    		type:'get',
		    		data:{
		    			key:'kEQoccPmIWjptdwszsCgQieDVM3qOOmV',
		    			location:longitude+','+latitude,
		    			radius:1000,
		    			output:'json',
		    			batch:false,
		    			roadlevel:0

		    		},
		    		success:function(res){
		    			console.log(res)
		    			var params = {
									  "codeId": self.codeSend,
									  "scanMobile": "",
									  "scanLoc": res.regeocode.formatted_address,
									  "longitude": longitude,
				  					  "latitude": latitude,
									  "model": "",
									  "country": res.regeocode.addressComponent.country,
									  "province": res.regeocode.addressComponent.province,
									  "city": res.regeocode.addressComponent.city.toString()?res.regeocode.addressComponent.city.toString():res.regeocode.addressComponent.province,
									  "district": res.regeocode.addressComponent.district,
									  "address": res.regeocode.formatted_address,
									  "street": res.regeocode.addressComponent.streetNumber.street,
									  "number": res.regeocode.addressComponent.streetNumber.number
									}

								 self.getScan(params);
		    		}
		    	})
		    	*/
		    	
		    	    
		    },
		    // 调用扫码查询接口
		    getScan(params){
		    	var self=this;
		    	console.log(params)
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
                      		self.isFlag=false;
                      		var data=body.result.ceccGoods
                      		self.quality=data.quality;
                      		self.countryType=data.countryType;
                      		self.code=body.result.codeId;
                      		self.codeShow=data.code;
                      		self.goodsImg=data.goodsImg.split(',')
                      		self.list_ceccGoodsField=data.list_ceccGoodsField;
                      		self.id=data.id;
                      		self.products =body.result.list_ceccScanrecordForSuspectProduct?body.result.list_ceccScanrecordForSuspectProduct:[];
                      		self.regNo=data.regNo;
                      		self.officeName=data.officeName;
                      		if(self.countryType=='kr'){
                      			// 韩国
                      			self.ownershipFile=data.ownershipFile
                      		}else{
                      			// 中国
                      			self.reportFile=data.reportFile;
                      			self.certificateFile=data.certificateFile;
                      			for(var p1=0;p1<body.result.list_batch.length;p1++){
                      		for(var p2=0;p2<body.result.list_batch[p1].list_batchField.length;p2++){
                      			var arrays=body.result.list_batch[p1].list_batchField[p2].file.split(',');
                      			body.result.list_batch[p1].list_batchField[p2].file=arrays
                      			}
                      		}
                      			self.GoodsLotBatchs=body.result.list_batch;
                      			if(body.result.station.qualificate){
		                      		self.qualificate=body.result.station.qualificate.split(",");
		                      	}

                      		}


  
						

                      	}else{
                      		self.isFlag=true;
                      	self.error=true;
                      	self.reason=body.result.goodsStatus.describe;

                      		Toast(body.result.goodsStatus.describe)
                      	}                     	
                      
                      }else{
                      	self.isFlag=true;
                      	self.error=true;
                      	self.reason=body.reason;
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
		    getNet:function(){
	      	var self=this;
	      	self.previewImg(self.qualificate[0],self.qualificate);

	      },
		    showZH:function(){
		    	var self=this;
		      	var src=this.ownershipFile;
		      	var arr=[];
		      	arr.push(src);
		      	self.previewImg(src,arr)	      	
	      },
		    // 浏览图片
		    previewImg(src,arr){	      	
		      	wx.previewImage({
			      current: src,
			      urls:arr
			    });

	      	},
		    // 查看详情
		    getDetail(){
		      	this.isShade=true;
		      	this.isDetail=true;
	      	},
	      	//关闭详情
	      	closeDetail(){
		      	this.isShade=false;
		      	this.isDetail=false;
	      	},
	      	//查看企业信息
	      	getIntro(){
		      	this.isShade=true;
		      	this.intro=true;
	      	},
	      	//关闭企业信息
	      	closeIntro(){
		      	this.isShade=false;
		      	this.intro=false;
	      	}

		}
	}
</script>
<style lang="sass">
.btns{text-decoration: none;font-size: 0.45rem;color: #fff!important;display: block;border-radius: 3px;width: 2.2rem;height: 0.8rem;line-height: 0.8rem;text-align: center}
.btn-primary{margin: 0 auto;background: #2d8edd;margin-top: 0.1rem;}
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
	.clearfix:after{
		clear:both;
		content: '';
		display: block;
		height: 0;
	}
	.zhezhao{
		background: #fff;
		position: fixed;
		top: 50px;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 10;
	}
	.noData{
		background: #fff;
		position: fixed;
		top: 50px;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 10;
		text-align: center;
		div{
			position: absolute;
			width: 100%;
			left: 0;
			height: 1.6rem;
			top: 50%;
			margin-top: -0.8rem;
			p{
				line-height: 0.5rem;
				font-size: 0.36rem;
			}
		}

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
.zBox{
	background: #b1d165;
	height: 8.2rem;
	margin-bottom: 0.2rem;
	.statusBox{
		height: 5.1rem;
		background: url("../../../assets/users/icon/zIcon.png") no-repeat center;
		background-size: 3.65rem auto;
	}
	.codeBox{
		height: 0.74rem;line-height: 0.74rem;
		text-align: center;
		em{
			font-size: 0.45rem;
			color: #fff;
			font-style: normal;
			margin-left: 0.25rem;
		}
		img{
			height: 0.74rem;
			vertical-align: middle
		}
	}
}

.yBox{
	background: #f0de4f;
	height: 9rem;
	margin-bottom: 0.2rem;
	position: relative;
	.statusBox{
		height: 5.1rem;
		background: url("../../../assets/users/icon/yIcon.png") no-repeat center;
		background-size: 3.65rem auto;
	}
	.codeBox{
		height: 0.74rem;line-height: 0.74rem;
		text-align: center;
		em{
			font-size: 0.45rem;
			color: #fff;
			font-style: normal;
			margin-left: 0.25rem;
		}
		img{
			height: 0.74rem;
			vertical-align: middle
		}
	}
	table{
		position: absolute;
		width: 100%;
		bottom: 0;
		border: none;
		text-align: center;
		td{
			width: 50%;
			height: 1.28rem;
			line-height: 1.28rem;
			border: 1px solid #50a2e5;
			border-top: none;
			border-bottom: none;
			position: relative;
			overflow: hidden;
			a{
				display: block;
				color: #fff;
				background: #2d8edd;
				height: 1.28rem;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
			}
		}
	}
}

.wBox{
	background: #f57955;
	height: 8.4rem;
	margin-bottom: 0.2rem;
	position: relative;
	.statusBox{
		height: 5.1rem;
		background: url("../../../assets/users/icon/wIcon.png") no-repeat center;
		background-size: 3.65rem auto;
	}
	.codeBox{
		height: 0.74rem;line-height: 0.74rem;
		text-align: center;
		em{
			font-size: 0.45rem;
			color: #fff;
			font-style: normal;
			margin-left: 0.25rem;
		}
		img{
			height: 0.74rem;
			vertical-align: middle
		}
	}
	table{
		position: absolute;
		width: 100%;
		bottom: 0;
		border: none;
		text-align: center;
		td{
			width: 50%;
			height: 1.28rem;
			line-height: 1.28rem;
			border: 1px solid #50a2e5;
			border-top: none;
			border-bottom: none;
			position: relative;
			overflow: hidden;
			a{
				display: block;
				color: #fff;
				background: #2d8edd;
				height: 1.28rem;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
			}
		}
	}
}

.goodsInfo{
	background: #fff;
	padding: 0 0.5rem;
	padding-bottom: 0.3rem;
	margin-bottom: 0.2rem;
	.titleBox{
		height: 1.1rem;
		line-height: 1.1rem;
		color: #333;
		font-size: 0.42rem;
	}
	.imgBox{
		height: 3rem;
		overflow: hidden;
		a{margin-left: 0.15rem;display:block;float: left;}
		a:first-of-type{margin-left: 0}
		img{
			width: 3.15rem;
			height: 2.8rem;
		}
		
	}
	table{
		td{
			word-wrap:break-word!important; 
			word-break:break-all!important;
			line-height: 1.1rem!important;
			font-size: 0.36rem!important;
			color: #333!important;
			img{
				width: 2rem!important;
			}
			*{
				word-wrap:break-word!important; 
				word-break:break-all!important;
				line-height: 1.1rem!important;
				font-size: 0.36rem!important;
				color: #333!important;
				img{
				width: 2rem!important;
			}
			}
		}
		td:first-of-type{
			white-space: nowrap;
			vertical-align: top;
			text-align:justify;
			text-align-last:justify
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

	.panel{
		background: #fff;
		.titleBox{
			height: 1.3rem;
			line-height: 1.3rem;
			font-size: 0.45rem;
			color: #333;
			text-align: center;
			border-bottom: 1px solid #ddd;
		}
		.panel-body{
			padding: 0.3rem 0.5rem;
			.leftBorder{
				border-left: 1px solid #ddd;
				margin-left: 10px;
				position: relative;
				padding-top: 0.5rem;
				.list{
					position: relative;
					// padding-left: 0.6rem;
					padding-top: 40px;
					h1{
						font-size: 0.42rem;
						color: #333;
						font-weight: normal;
						height: 40px;
						line-height: 40px;
						position: absolute;
						left: -11px;
						top:0;
						background: url('../../../assets/users/icon/stepIcon.png') no-repeat left center;
						background-size: 21px auto;
						padding-left: 40px;

					}
					p{font-size: 0.33rem;color: #666;margin-bottom: 0.3rem;padding-left: 30px;}
					ul li{
						width: 33.33333%;
						float: left;
						img{width: 2.4rem;height: 2.4rem;}
					}


				}
			}
		}
	}
	.xiang{
		width: 9.8rem;
		height: 10rem;
		box-sizing: border-box;
		border-radius:0.1rem;
		background: #fff;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -4.9rem;
		margin-top: -5rem;
		padding: 0.12rem;
		.popHead{
			height: 3.17rem;
			position: relative;
			background: #01b8df url('../../../assets/users/icon/xiang.png') no-repeat center;
			background-size: 2.3rem;
			.closeBtn{top: 0.27rem;right: 0.24rem;}
		}
		.popBody{
			border:none; 
		}
	}
	
</style>