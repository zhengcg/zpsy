<template>
<div class="homediv">
  <transition name="slide-fade">
    <router-view> </router-view>
  </transition>
  <nav-footer v-bind:selected-nav="myNav"></nav-footer>
</div>
</template>

<script>
import navFooter from '../../components/hire/nav.vue'
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'//提示
import { Indicator } from 'mint-ui'//加载
export default {
  name: 'home',
  data () {
    return {
      myNav:'nav1'
    }
  },
  mounted(){
      $(window).scrollTop(0);
  },
  created () {
      switch(this.$route.path) {
          case "/home/user":this.myNav="nav5"
            
            break;
          case "/home/findwork":this.myNav="nav1"
            
            break;
          case "/home/history":this.myNav="nav2"
          
          break;
          case "/home/news":this.myNav="nav4"
          
          break;
        }
    },
    components : {
       navFooter
    }
}
</script>
<style lang="sass">
  header.mint-header h1{height: 50px;line-height: 50px;}
</style>


