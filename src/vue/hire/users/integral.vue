<template>
	<div id="integral">
		<mt-header fixed title="积分" id="opacity">
			<router-link to="/home/user" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <router-link to="/integralRules" slot="right">
        	<img src="../../../assets/users/icon/icon_why.png">
        </router-link>
		</mt-header>
		<div class="content_bd" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		<div 	v-infinite-scroll="loadMore"
		  		infinite-scroll-disabled="loading"
		  		infinite-scroll-distance="20">
		<div class="integralText">
			<img src="../../../assets/users/icon/icon_scoreBg.png">
			<div class="integralAll">
				<img :src="oldParams.avatar" v-if="oldParams.avatar">
				<img  v-else src="../../../assets/users/icon/icon_head_portrait.png">
				<div v-text="oldParams.niceName || '昵称'">
				</div>
				<div class="userBox">
					<div>积分</div>
					<div v-text="oldParams.score || 0"></div>
				</div>
				
			</div>
		</div>
		<div class="integralBox">
			<div class="integralItem" v-for="(dataList,index) in dataLists">
				<!-- <span v-text="dataList.time"></span> -->
				<span v-text="dataList.operation"></span>
				<span v-text="dataList.numbers" class="integralNum"></span>
			</div>
		</div>
		</div>
		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
				api:{
					getScoreList:'/genuine/user/getScoreList',
					getByToken:'/genuine/user/getByToken'
				},
				dataLists:[],
				loading:false,
				wrapperHeight: 0,
				current_page:1,
				allPage:0,
				oldParams:''
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
			this.getIntegral();
			this.monitorScroll();
		},
		methods:{
	      	fetchData(){
	      		console.log(this.$route.query)
			 	var query = this.$route.query;
				// this.oldParams = query;
				var locParams = JSON.parse(localStorage.getItem("locParams"));
				if(locParams){
					this.oldParams = locParams;
				}
				
			},
			monitorScroll() {
			    $(window).on('scroll',function(){
			        var srollTop = $(window).scrollTop();
		            if(srollTop <= 200) {
		                $("#opacity").css({
		                  'background' : 'rgba(193,44,18,'+ srollTop/150 +')',
		                })
		            }
		        });
		  	},
			loadMore() {
		      	if (this.allPage>0) {
				  	this.loading=true;
				  	this.current_page++;
	        		this.getIntegral(this.current_page);
			    }
			},
			// 获取历史积分记录
			getIntegral:function(pageNo){
				var params = {};
		          params.pageNo = pageNo || 1;
		          this.$http({
		            method:'get',
		            url:this.api.getScoreList,
		            params:params,
		            // headers: {"token": "c3b20d78eeac42848f7eb001bd6f8a6d"},
		            emulateJSON: true,
		            before:function(){
		              Indicator.open('加载中...');
		            }
		          }).then(function(res){
		            Indicator.close();
		            var data=res.data;
		            var _this =this;
		            if(data.errorCode=="0"){
		            	this.allPage = data.result.length;
						_this.dataLists = _this.dataLists.concat(data.result);
		            }else{
		            	this.allPage = 0;
		              Toast(data.reason)
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
			}
		}
	}
</script>
<style lang="sass">
	#integral{
		.userBox{
			overflow: hidden;
			line-height: 60px;
			div{
				float: left;
				width: 50%;
				&:nth-of-type(1){
					text-align: right;
					padding-right: 5%;
					border-right: 1px solid #fff;
				}
				&:nth-of-type(2){
					text-align: left;
					padding-left: 5%;
				}
			}
		}
		#opacity{
			background:none;
		}
		.is-right{
			img{
				height: 20px;
			}
		}
		.integralText{
			color: #fff;
  			height: auto;
			text-align: center;
			position: relative;
			img{
				width: 100%;
			}
			.integralAll{
		        position: absolute;
			    margin-left: 0%;
			    width: 100%;
			    margin-top: -50%;
			    img{
				    width: 13%;
				}
			}
			div{
				margin-top:5px;
			}
		}
		.integralBox{
			div{
				padding:10px;
				background: #fff;
				margin:10px 0;
				span {
					display: inline-block;
					padding-right: 10px;
				}
				.integralNum{
				    display: block;
				    float: right;
				    padding-right: 20px
				}
			}
		}
	}
</style>