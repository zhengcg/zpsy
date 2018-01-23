<template>
<div class="downLoad" style="max-width: 720px;margin:0 auto;">
<!-- <div style="height: 50px;line-height: 50px;color:#fff;text-align: center;background: #c12;font-size: 0.5rem;font-weight: 400;">正品溯源——看见真实的幸福</div> -->
    <div>
      <img src="../../assets/users/icon/bg.png" style="width: 90%;display: block;margin:0 auto">
    </div>
    <div style="background: #f2f2f2">
      <a href="http://sj.qq.com/myapp/detail.htm?apkName=org.izheng.zpsy" class="downBtn">下载“正品溯源”App<p>Free Download App</p></a>
    </div>
    
</div>
</template>

<script>

export default {
  name: 'downLoad',
  data () {
    return {
      downLoad:''
    }
  },
  mounted(){
      $(window).scrollTop(0);
  },
  created () {

    }
 
}
</script>
<style lang="sass">
  .downBtn{
    -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          display: block;margin:0  auto;background:#00cc99;text-align: center;color: #fff;font-size: 0.5rem;text-decoration: none ;
          width: 90%;
          padding: 0.3rem 0;
          border-radius: 0.8rem;
          margin-top: 0.3rem;
          p{font-size: 0.4rem;margin-top: 0.3rem;}
  }
</style>


