<template lang="jade">
h1.div1
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null,
      name:114
    }
  },
  mounted(){
      $(window).scrollTop(0);
  },
  created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.error = this.post = null
        this.loading = true
        //获取url的id参数
        console.log(this.$route.params.id)
        //获取data中的name属性
        console.log(this.name)
        //console.log(this.name)
        // replace getPost with your data fetching util / API wrapper
      }
    }
}
</script>
<style lang="sass">
  $blue:#fb1245;
  body{
    .div1{
      background:yellow;
      position:absolute;
      top:160px;
      left:0;
      color:$blue;
    }
  }
</style>

