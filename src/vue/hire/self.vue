<template>
<h1 class="self">我的</h1>
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
  methods: {
   
  }
}
</script>
<style lang="sass">
  $blue:#fb1245;
  body{
    .self {
      color: $blue;
    }
  }
</style>

