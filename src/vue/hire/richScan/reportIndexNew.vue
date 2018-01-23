<template>
	<div id="reportIndex">
		<mt-header fixed title="疑似伪品举报">
			<router-link :to="{ name: 'richScan', query: {code:code1}}"  slot="left">
         	 	<mt-button icon="back"></mt-button>
     	 	</router-link>
		</mt-header>
		<div class="breakbox"></div>
		<div v-if="submitStatus">
			<div class="titBox">
				<div class="imgBox">
					<img :src="goodsList.thumbnail" v-if="goodsList.thumbnail">
					<img v-else src="../../../assets/hire/icon-empty.png">
				</div>
				<div class="con">
					<h1 v-text="goodsList.name"></h1>
					<h3 v-text="goodsList.officeName"></h3>
					<p>正品标签明码：<em v-text="codeShow"></em></p>
				</div>
			</div>
			<div class="reason">
				<h1>举报原因</h1>
				<table>
					<tr>
						<td style="border-top: none;border-left: none;padding: 0"><a href="javascript:;" :class="{cur:cause=='0'}" @click="cause0">感觉是假的</a></td>
						<td style="border-top: none;border-right: none;padding: 0"><a href="javascript:;" :class="{cur:cause=='1'}" @click="cause1">标签印刷粗糙</a></td>
					</tr>
					<tr>
						<td style="border-left: none;border-bottom: none;padding: 0"><a href="javascript:;" :class="{cur:cause=='2'}" @click="cause2">渠道有问题</a></td>
						<td style="border-right: none;border-bottom: none;padding: 0"><a href="javascript:;" :class="{cur:cause=='3'}" @click="cause3">其他</a></td>
					</tr>				
				</table>
			</div>
			<div class="formBox">
				<div class=textarea>
					<textarea placeholder="请您填写疑似伪品的原因，经我方确认您举报的商品时伪品，我们会抽取幸运者为您送上一份礼物" v-model="question" maxlength="150"></textarea>
				</div>
				<div style="border-bottom: 1px solid #d9d9d9">
					<label style="font-size: 0.45rem;color: #333;">姓&emsp;&emsp;名 |</label>
					<input type="text" placeholder="请您输入姓名" v-model="name">
				</div>
				<div>
					<label style="font-size: 0.45rem;color: #333;">手机号码 |</label>
					<input type="tel" placeholder="请输入您的手机号码" v-model="mobile" oninput="if(value.length>18)value=value.slice(0,18)">
				</div>
			</div>
			<p style="text-align: right;padding: 0 0.5rem;line-height: 0.9rem;color: #999;"><span v-text="question.length">0</span>/150</p>
			<div id="container" class="reportImgs">
				<div class="introImg fl pickfilesBox" style="margin-right: 0!important">
					<div id="pickfiles" style="margin-right: 0">
						<img src="../../../assets/users/icon/addImg.png"/>
					</div>
					
				</div>
			</div>
			<a href="javascript:;" class="btn submit" style="margin-top: 2rem;" @click="formClick">提交</a>
			<router-link :to="{ name: 'richScan', query: {code:code1}}">
         	 	<a href="javascript:;" class="btn reset" style="margin-top: 0.2rem;margin-bottom: 1rem;">取消</a>
     	 	</router-link>
			
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
				countryType:'',
				goodsList:'',
				image:'',
				name:'',
				cause:'0',
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
			cause0:function(){
				this.cause='0'
			},
			cause1:function(){
				this.cause='1'
			},
			cause2:function(){
				this.cause='2'
			},
			cause3:function(){
				this.cause='3'
			},
			fetchData:function(){
				var query1 = this.$route.query;
		      	this.id = query1.id;
		      	this.code = query1.code;
		      	this.code1=query1.code1;
		      	this.countryType=query1.countryType
		      	this.codeShow=query1.codeShow
		      
			},
			findById:function(){
				var _this =this;
				var params = {};
				params.id = _this.id;
				params.countryType=_this.countryType;
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
<style lang="sass">
.titBox{
	height: 3.05rem;
	box-sizing: border-box;
	background: #fff;
	padding: 0.3rem 0.5rem;
	.imgBox{
		height: 2.45rem;
		width: 2.45rem;
		float: left;
		img{display: block;margin: 0 auto;width: 100%;height: 100%}
	}
	.con{
		margin-left: 2.85rem;
		padding: 0.25rem 0;
		h1{
			font-size: 0.45rem;
			color: #333;
			height: 0.7rem;
			line-height: 0.7rem;
		}
		h3{
			font-size: 0.39rem;
			color: #666;
			height: 0.7rem;
			line-height: 0.7rem;

		}
		p{
			color: #666;
			font-size: 0.33rem;
			line-height: 0.6rem;
			em{
				font-style: normal;
			}
		}

	}
}
.reason{
	padding: 0 0.5rem;
	margin-bottom: 0.5rem;
	h1{
		height: 1rem;
		line-height: 1rem;
		color: #333;
		font-size: 0.45rem;
	}
	table{
		width: 9.8rem;
		margin: 0 auto;
		box-sizing: border-box;
		background: #fff;
		border-collapse: collapse;
		td{
			width: 50%;
			border-collapse: collapse;
			border: 1px solid #aaa;
			a{
				display: block;
				height: 1.16rem;
				text-align: center;
				line-height: 1.16rem;
				font-size: 0.36rem;
				color: #333;
			}
			a.cur{
				background: #aaa;
				color: #fff;
			}
		}
	}
}
.formBox{
	background: #fff;
	border: 1px solid #aaa;
	margin: 0 0.5rem;
	div{
		height: 1.08rem;
		line-height: 1.08rem;
		padding: 0 0.15rem;
		color: #333;
		input{
			width: 7.2rem;
			border:none;
		}
	}
	.textarea{
		height: 4.95rem;
		border: 1px solid #d9d9d9;
		box-sizing: border-box;
		textarea{
			border:none;
			width: 100%;
			height: 100%;
			line-height: 0.6rem;
			box-sizing: border-box;
			padding: 0.15rem;
		}
	}

}


.reportImgs{
    width: 9.8rem!important;
	height: 2.4rem!important;
	overflow: hidden!important;
	margin: 0.1rem auto!important;
	.introImg{
		position:relative;
		width:3rem!important ;
		display: block;
		height: 2.4rem!important;
		padding: 0!important;
		min-height: 2.4rem!important;
		max-height: 2.4rem!important;
		margin-right: 0.4rem!important;
		i{
			position: absolute;
		    right: 0.1rem;
		    top: 0.1rem;
		    width: 0.15rem;
		    height: 0.15rem;
		    font-size: 0.3rem;
		    z-index: 3;
		    border-radius: 50%;
		    background-color: #fb1245;
		    color: #fff;
		    text-align: center;
		    line-height: 0.15rem;
		}
		#pickfiles{
			width: 100%;
			height: 100!important;
		}
		img{
			height: 100%!important;
			width: 100%!important;
		}
	}
	.introImg:nth-child(3){
		margin-right: 0!important;
	}
}

#container:after{
	clear: both;
	display: block;
	content: '';
	height: 0;

}
a.btn{display: block;width: 6.6rem;height: 1rem;text-align:center;line-height: 1rem;border-radius: 0.05rem;color: #fff;font-size: 0.45rem;margin: 0 auto;}
a.submit{background: #c3222c}
a.reset{background: #d2d2d2}
.titBox:after{
	clear: both;
	content: '';
	display: block;
	height: 0;
}
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
	
</style>