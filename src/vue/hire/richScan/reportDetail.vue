<template>
	<div id="reportDetail">
		<mt-header fixed :title="title">
			<router-link :to="{ name: 'richScan', query: {code:code}}" slot="left">
         	 	<mt-button icon="back"></mt-button>
     	 	</router-link>
		</mt-header>
		<div class="breakbox"></div>
		<a href="javascript:;" v-for="item in src" @click="previewImg(item,src)"><img :src="item"></a>
		
		
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui'
	export default{
		name:'reportIndex',
		data(){
			return{
				src:[],
				title:'',
				code:''
			}
		},
		mounted(){
   		$(window).scrollTop(0);
	},
		created(){
			var _this = this;
			this.fetchData();
			
		},
	   	watch:{
	   		'$route':'fetchData'
	   	},
		methods:{
			fetchData:function(){
				var query1 = this.$route.query;
		      	this.src = query1.url.split(",");
		      	this.title = query1.title;
		      	this.code=query1.code;
			},

		 previewImg:function(src,arr){
	      	console.log(arr)
	      	wx.previewImage({
		      current: src,
		      urls:arr
		    });

	      }
		}
	}
</script>
<style lang="sass">
	#reportDetail{
		img{
			width: 100%;
			display: block;
			margin: 0.3rem auto;
		}
		
	}
</style>