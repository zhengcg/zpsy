<template>
	<div id="indexPage">
		<img src="../../assets/users/icon/icon_guide.png">
	</div>
</template>
<script>
	export default{
		name:'index',
		mounted(){
			setTimeout(()=>{
				this.$router.push({
					name:'home'
				});
			},3000);
		}
	}
</script>
<style lang="sass">
	#indexPage{
		img{
			display: block;
			width: 100%;
		}
	}
	
</style>