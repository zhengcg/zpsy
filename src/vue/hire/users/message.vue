<template>
	<div id="message">

		<mt-header fixed title="我的消息">
			<router-link to="/home/user" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="breakbox"></div>
		<div class="content_bd" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		<div 	v-infinite-scroll="loadMore"
		  		infinite-scroll-disabled="loading"
		  		infinite-scroll-distance="20">
			<a :href="dataList.url" class="goodsBox" v-for="dataList in dataLists">
				<div class="goodsHead">
					<img :src="dataList.imagethum" v-if="dataList.imagethum">
					<img v-else src="../../../assets/users/icon/icon_wine.png">
					<div class="goodsTitle">
						<div class="goodsName" v-text="dataList.title">
						</div>
						<div class="goodsNumber" v-text="dataList.time">
						</div>
					</div>
				</div>
				<div class="goodsBody">
					<img v-if="dataList.field1" :src="dataList.field1">
					<img v-else src="../../../assets/users/icon/icon_news.png">
					<div class="goodsContent">
						<p v-text="dataList.contents || '无'">
						</p>
					</div>
				</div>
			</a>
		</div>
		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui'
	import { Toast } from 'mint-ui'//提示
	import { Indicator } from 'mint-ui'//加载
	export default {
		name:'message',
		data(){
			return{
				dataLists:[],
				loading:false,
				wrapperHeight: 0,
				current_page:1,
				allPage:0,
				api:{
					getMessage:'/genuine/message/getAllMessage'
				},
				list:''
			}
		},
		mounted(){
   		$(window).scrollTop(0);
	},
		created(){
			this.wrapperHeight = document.documentElement.clientHeight - 152;
			this.getMessage();
		},
		methods:{
			    getMessage:function(pageNo){
			    	this.loading = false;
					var params = {};
			      	params.pageNo = pageNo || 1;
			      	this.$http({
				          method:'GET',
				          url:this.api.getMessage,
				  		  params:params,
				//           headers: {"token": "14af3bb2ca6a42429648f347b89ea158"},
				          emulateJSON: true,
						  before:function(){
							Indicator.open('加载中...');
						  }
			          }).then(function(res){
						Indicator.close();
						console.log(res.data)
						var data=res.data;
						var _this =this;
						if(data.errorCode=="0"){
							this.allPage = data.result.length;
							_this.dataLists = _this.dataLists.concat(data.result);
							console.log(_this.dataLists)
						}else{
							Toast(data.reason)
							this.allPage = 0;
						}
					},function(res){
						this.allPage = 0;
						Indicator.close();
						this.loading = false;
						Toast({
				            message: '系统错误,请刷新！',
				            position: 'middle',
				            duration: 1000
						});
					})
		      },
	      	loadMore() {

			      	if (this.allPage>0) {
					  	this.loading=true;
					  	this.current_page++;
		        		this.getMessage(this.current_page);
				    }
			 
			}
		}

	}
</script>
<style lang="sass">
	#message{
		.goodsBox{
			margin:10px 0;
		}
	}
</style>