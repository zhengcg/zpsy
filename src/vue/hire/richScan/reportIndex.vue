<template>
	<div id="reportIndex">
		<mt-header fixed title="扫码结果">
			<router-link :to="{ name: 'richScan', query: {code:code1}}" slot="left">
         	 	<mt-button icon="back"></mt-button>
     	 	</router-link>
		</mt-header>
		<div class="breakbox"></div>
		<div class="reportBox" v-if="submitStatus">
			  <div class="goodsBox">
      			<div class="goodsBody">
      				<div style="height: 200px;">
						<mt-swipe :auto="4000">
						  <mt-swipe-item v-for="item in goodsImg"><img :src="item" style="width: 100%;height: 100%"></mt-swipe-item>
						</mt-swipe>
					</div>
      				<!-- <img :src="goodsList.goodsImg" v-if="goodsList.goodsImg">
					<img v-else src="../../../assets/users/icon/icon_news.png"> -->
				</div>
				<div class="goodsHead">
					<img :src="goodsList.thumbnail" v-if="goodsList.thumbnail">
					<img v-else src="../../../assets/hire/icon-empty.png">
					<div class="goodsTitle">
						<div class="goodsName" v-text="goodsList.name">
							
						</div>
						<div class="goodsNumber" v-text="goodsList.updateDateStr">
							2017-4-16
						</div>
					</div>
				</div>
			</div>
			<div class="textareaBox">
				<textarea placeholder="请留下您宝贵的建议......" v-model="question" maxlength="150">
				</textarea>
				<div class="cell">
	                <div class="cell_hd"><label class="label">手机号码</label></div>
	                <div class="cell_bd">

	                    <input v-model="mobile" oninput="if(value.length>18)value=value.slice(0,18)" type="number" placeholder="请留下方便联系您的手机号码">
	                </div>
	            </div>
			</div>
			<div class="clearFloat">
				<div class="textareaNum">
					<span v-text="question.length">0</span>/150
				</div>
			</div>
			<div  class="reportImgs">
			<div class="introImg fl pickfilesBox">
				<div id="pickfiles">
					<img src="../../../assets/users/icon/icon_addpic.png"/>
				</div>
				
			</div>
				
			</div>
			<mt-button @click="formClick" type="danger" class="btnClass">提交</mt-button>
		</div>
 		<div v-else class="prodStatusBox" >
       		<div class="prodStatus">
       			<div class="statusImg">
       				<img src="../../../assets/users/icon/icon_successSymbol.png" />
       			</div>
   				<div class="statusTest">
   					<span>举报成功!!</span>
   				</div>
       		</div>
       		<p>您的举报信息我们已经收到</p>
       		<p>我们将尽快核实该信息并与您取得联系！</p>
       	</div>
		<div class="breakbox"></div>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
 	import { MessageBox } from 'mint-ui';
	export default{
		name:'reportIndex',
		data(){
			return{
				code:'',
				id:'',
				goodsList:'',
				image:'',
				mobile:'',
				uploader:'',
				basePhone:'',
				question:'',
				submitStatus:'',
				typeCheck:1,
				dataList:'',
				qinniuToken:'',
				thisHtml:'',
				imgLink:'',
				api:{
					getQiniuToken:'/genuine/user/getUploadToken',
					submitFeedBack:'/genuine/report/addReport',
					findById:'/genuine/product/findById'
					
				},
				textareaText:'',
				directory:'',
				goodsImg:[]
			}
		},
		mounted(){
   		$(window).scrollTop(0);
	},
		created(){
			var _this = this;
			this.fetchData();
			this.submitStatus=true;
			this.getQiniuToken();
			this.findById();
			$(document).on('click','i',function(){
				$(this).parent().remove();
                var toremove = '';
                var id = $(this).attr("data-val");
                var uploader = _this.uploader;
                for (var i in uploader.files) {
                    if (uploader.files[i].id === id) {
                        toremove = i;
                    }
                }
                if($('.introImg').length < 4){
                	$('.moxie-shim').show()
                	$('.pickfilesBox').show();
                }
                if($('.introImg').length == 3){
                	$('.moxie-shim').css('margin-left','0');
                }
                if($('.introImg').length == 2){
                	$('.moxie-shim').css('margin-left','-33%');
                }
                if($('.introImg').length == 1){
                	$('.moxie-shim').css('margin-left','-66%');
                }
                 uploader.files.splice(toremove, 1);
			})
		},
	   	watch:{
	   		'$route':'fetchData',
	   	},
		methods:{
			fetchData:function(){
				var query1 = this.$route.query;
		      	this.id = query1.id;
		      	this.code = query1.code;
		      	this.code1=query1.code1;
		      
			},
			findById:function(){
				var _this =this;
				var params = {};
				params.id = _this.id;
		      	this.$http({
      				  method:'get',
			          url:this.api.findById,
			  		  params:params,
			  		  dataType:'json',
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					var data=res.data;
					if(data.errorCode=="0"){
							_this.goodsList = data.result;
							_this.goodsImg=_this.goodsList.goodsImg.split(",")
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
			getQiniuToken:function(){
				var params = {};
				params.bucket = "zpsy";
				var _this =this;
		      	this.$http({
      				  method:'POST',
			          url:this.api.getQiniuToken,
			  		  body:JSON.stringify(params),
			  		  headers:{source:'H5'},
			  		  dataType:'json',
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					var data=res.data;
					if(data.errorCode=="0"){
							_this.qinniuToken = data.result;
							_this.directory=data.result.directory;

							_this.init();
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
			//plupload中为我们提供了mOxie对象
			//有关mOxie的介绍和说明请看：https://github.com/moxiecode/moxie/wiki/API
			//如果你不想了解那么多的话，那就照抄本示例的代码来得到预览的图片吧
			previewImage:function (file,callback){
			//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
				if(!file || !/image\//.test(file.type)) return; //确保文件是图片
				if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
					var fr = new mOxie.FileReader();
					fr.onload = function(){
						callback(fr.result);
						fr.destroy();
						fr = null;
					}
					fr.readAsDataURL(file.getSource());
				}else{
					var preloader = new mOxie.Image();
					preloader.onload = function() {
						preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
						var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
						callback && callback(imgsrc); //callback传入的参数为预览图片的url
						preloader.destroy();
						preloader = null;
					};
					preloader.load( file.getSource() );
				}	
			},
			//初始化上传插件
			init:function(){
				var _this = this;
				_this.html = $('#container').html();
				_this.uploader = Qiniu.uploader({
				    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
				    browse_button: 'pickfiles',         // 上传选择的点选按钮，必需
				    // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
				    // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
				    // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
				    // uptoken : '<Your upload token>', // uptoken是上传凭证，由其他程序生成
				    // uptoken_url: '/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
				    // uptoken_func: function(file){    // 在需要获取uptoken时，该方法会被调用
				    //    // do something
				    //    return uptoken;
				    // },
				    uptoken:this.qinniuToken.token,
				    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
				    // downtoken_url: '/downtoken',
				    // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
				    unique_names: false,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
				    save_key: false,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
				    domain: this.qinniuToken.domain,     // bucket域名，下载资源时用到，必需
				    container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
				    max_file_size: '100mb',             // 最大文件体积限制
				    flash_swf_url: '../../../../dist/lib/plupload/js/Moxie.swf',  //引入flash，相对路径
				    max_retries: 3,                     // 上传失败最大重试次数
				    dragdrop: false,                     // 开启可拖曳上传
				    drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
				    chunk_size: '4mb',                  // 分块上传时，每块的体积
				    auto_start: false,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
				    //x_vars : {
				    //    查看自定义变量
				    //    'time' : function(up,file) {
				    //        var time = (new Date()).getTime();
				              // do something with 'time'
				    //        return time;
				    //    },
				    //    'size' : function(up,file) {
				    //        var size = file.size;
				              // do something with 'size'
				    //        return size;
				    //    }
				    //},
				    init: {
				        'FilesAdded': function(up, files) {
			                var msgFlg = 0;
			                for (var i = 0, len = files.length; i < len; i++) {
		                        !function (i) {
		                            _this.previewImage(files[i], function (imgsrc) {
		                                $('#container').prepend('<div class="introImg fl"><i data-value='+ files[i].id +'>x</i><img  src="'+ imgsrc +'" /></div>');
		                            })
		                            $('.moxie-shim').css('margin-left','34%');
		                            if($('.introImg').length >=3){
		                            	$('.moxie-shim').hide()
		                            	$('.pickfilesBox').hide();
		                            }
		                        }(i);
			                }
				        },
				        'BeforeUpload': function(up, file) {
				        	Indicator.open('图片上传中');
				               // 每个文件上传前，处理相关的事情
				        },
				        'UploadProgress': function(up, file) {
				               // 每个文件上传时，处理相关的事情
				        },
				        'FileUploaded': function(up, file, info) {
				        	// var progress = new FileProgress(file, 'fsUploadProgress');
                			// progress.setComplete(up, info);
				               // 每个文件上传成功后，处理相关的事情
				               // 其中info是文件上传成功后，服务端返回的json，形式如：
				               // {
				               //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
				               //    "key": "gogopher.jpg"
				               //  }
				               // 查看简单反馈
				               var domain = up.getOption('domain');
				               var res = JSON.parse(info);
				               //获取上传成功后的文件的Url
				               _this.image = _this.image + domain +"/"+ res.key+',';
				               // _this.image  = _this.image.substr(0,_this.image .length - 1); 
				        },
				        'Error': function(up, err, errTip) {
				               //上传出错时，处理相关的事情
				               Toast({
						            message: '上传失败,请刷新！',
						            position: 'middle',
						            duration: 1000
								});
				        },
				        'UploadComplete': function() {
				        	Indicator.close();
				               //队列文件处理完毕后，处理相关的事情
				               _this.image  = _this.image.substr(0,_this.image.length - 1); 
				               _this.formSubmit();
				        },
				        'Key': function(up, file) {
				            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
				            // 该配置必须要在unique_names: false，save_key: false时才生效
				            var key = Date.parse(new Date())+Math.ceil(Math.random()*1000);
				            // do something with key here
				            var nKey=_this.directory+key
				            return nKey
				        }
				    }
				});
			},
	      	gallery(event){
				var src = event.toElement.src;
				var st = $(window).scrollTop();
				$('.gallery span img').attr('src', src);
				$('.gallery').css({
					'visibility': 'visible',
					'top': st
				});
//				$('body').css({
//					' overflow-y':'hidden'
//				})
			},
			 //图片还原
		    galleryRes:function(){
		    	$('.gallery').css({
					'visibility': 'hidden'
				});
//				$('body').css({
//					' overflow-y':'auto'
//				})
		    },
		    formClick:function(){
		    	var _this = this;
		    	_this.uploader.start();
		    },
		    formSubmit:function(){
		    	var params = {};
				// 0 :产品问题1:扫码问题 2:意见建议 3:其他
				params.sn = this.code;
				params.report_contents = this.question;
				params.productid = this.id;
				params.image1 = this.image;
				params.mobile = this.mobile;
				var _this =this;
		      	this.$http({
      				  method:'POST',
			          url:this.api.submitFeedBack,
			  		  body:JSON.stringify(params),
			  		  dataType:'json',
					  before:function(){
						Indicator.open('加载中...');
					  }
		          }).then(function(res){
					Indicator.close();
					var data=res.data;
					if(data.errorCode=="0"){
						this.submitStatus = !this.submitStatus;
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
		}
	}
</script>
/* <style lang="sass">
	#reportIndex{
		.prodStatusBox{
			height: auto;
			word-wrap: break-word;
			padding: 30px;
			background: #FFFFFF;
			text-align: center;
			margin-top: 30%;
			img{
				width:30px;
				height: 30px;
			}
			.prodStatus{
				overflow: hidden;
			    margin: 20px;
				.statusImg{
				    float: left;
				    width: 40%;
				    text-align: right;
				}
				.statusTest{
				    padding: 10px;
				    margin-left: 42%;
				    text-align: left;
				}
			}
			p{
			    
    			line-height: initial;
			}
		}
		.btnClass{
		    width: 80%;
		    margin: 20px 10%;
		    background: #c12;
		    height: 50px;
		    font-size: 1.2em;
		}
		.clearFloat{
			overflow:hidden;
		}
		.reportImgs{
		    width: 97%;
		    height: 100px;
		    margin: 0 10px;
			.introImg{
				position:relative;
				width:33.33% ;
				display: block;
				padding-bottom: 10px;
				padding-top: 10px;
			    padding-right: 10px;
				min-height: 4rem;
				box-sizing: border-box;
				max-height: 8rem;
				i{
					position: absolute;
				    right: 10px;
				    top: 10px;
				    width: 12px;
				    height: 12px;
				    font-size: 12px;
				    z-index: 3;
				    border-radius: 100%;
				    background-color: #fb1245;
				    color: #fff;
				    text-align: center;
				    line-height: 12px;
				}
				img{
					height: auto;
					width: 100%;
				}
			}
		}
		.textareaNum{
			float: right;
			margin-right: 4%;
		}
		.textareaBox{
			width:92%;
			margin:5% 4%;
			border: 1px solid #e3e3e3;
		    line-height: 30px;
		    background: #fff;
			textarea{
				font-size: 1.1em;
				width: 100%;
				height: 200px;
				resize: none;
			    border: 0px;
    			border-bottom: 1px solid #e3e3e3;
			}
			.phoneBox{
				width: 100%;
				input:{
					width: 100%;
				}
			}
			.cell{
			    align-items: center;
			    line-height: normal;
			    position: relative;
			    display: flex;
			    padding: 0 15px;
			    line-height: 50px;
			    background: #fff;
			    .cell_hd{
			    	width: 25%;
				    font-size: 14px;
				    color: #666;
				    label{
			    	    padding-right: 8px;
    					border-right: 1px solid #e3e3e3;
				    }
			    }
			    .cell_bd{
				    flex: 1;
				    input{
			    	    width: 100%;
					    line-height: 1.8;
					    height: 50px;
					    font-size: 14px;
					    outline: 0;
					    border: 0;
				    }
			    }
			}
		}
		.mint-cell-wrapper{
			display: list-item;
		}
		.mint-cell-value{
			display:block;
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
</style> */