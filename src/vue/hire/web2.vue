<template>
	<div id="web">
		<!-- <mt-header fixed title="正品溯源">
			<router-link to="/home/findwork" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
		</mt-header>
		<div class="breakbox"></div> -->
		<img src="../../assets/users/icon/web2.jpg">
	</div>
</template>
<script>	
	export default{
		data(){
			return{
		
			}
		},
		mounted(){
   		$(window).scrollTop(0);
   		optionTitle.pageTitle = '正品溯源';
		appHideTitle();
   }
		
	      	
	}
</script>
<style lang="sass">
#web{
	img{
		width: 100%;
		margin: 0 auto;
	}
}

.titBox:after{
	clear: both;
	content: '';
	display: block;
	height: 0;
}
	
</style>