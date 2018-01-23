<template lang="jade">
div.attention
  mt-header.title(title="我的关注")
    router-link.backprev(:to="{name:'user'}" slot="right")
  section.breakbox
  section.me-list
    ul.list-line(v-infinite-scroll="loadMore" infinite-scroll-disabled="loading")
      li(v-for="data in initData")
        router-link(:to="'/companyDetail/' + data.merchantId")
          div.collect-img
            img(:src="data.logo")
          p.diandian(v-text="data.name")
      p.page-infinite-loading(v-show="loading")
        <mt-spinner>(type="fading-circle")</mt-spinner> 加载中...
      p.list-end(v-show="listEnd") 已经到底了
  section.null-empty(v-show="showEmpty")
    img(src="../../assets/hire/icon-empty.png")
    p 暂无关注任何企业
    span 快去关注你心仪的企业吧
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Spinner } from 'mint-ui';
export default {
  data () {
    return {
      showEmpty: false, //无数据
      loading: false, //底部加载
      listEnd: false, //底部提示
      initData: [],
      lastPage: 1,
      currentPage: 0
    }
  },
  mounted(){
      $(window).scrollTop(0);
  },
  created () {
    Indicator.open('加载中...');
    this.get_page();
  },
  methods: {
    loadMore() {//下拉加载
      const that = this;
      if (this.lastPage > this.currentPage) {
        if (this.currentPage != 0) {//首次加载不显示loading
          this.loading = true;
          this.get_page();
        }
      }
    },
    get_page() {
      const that = this;
      this.$http.get('/hire/follow?page=' + (this.currentPage + 1)).then(function(response) {
        setTimeout(() => {
          Indicator.close();
          if (response.data.respCode == 0) {
            if (response.data.data.data.length > 0) {
              for(let i in response.data.data.data) {
                if (!isNaN(i)) {// index 数字
                  this.initData.push(response.data.data.data[i])
                }
              }
              this.lastPage = response.data.data.page.lastPage;
              this.currentPage = response.data.data.page.currentPage;
            }else {
              this.showEmpty = true;
            }
          }else {
            MessageBox(response.data.reason);
          }
          that.loading = false;
        }, 200);
      }, function(response) {
        Indicator.close();
        this.loading = false;
        MessageBox('系统错误，请刷新');
      });
    }
  },
  watch: {
    'currentPage': function() { //加载到最后一页监控
      if (this.lastPage == this.currentPage) {
        if (this.currentPage != 1 || this.initData.length > 8) {
          this.listEnd = true;
        }
      }
    }
  }
}
</script>
<style lang="sass">
	.attention {
		.diandian {
  		overflow: hidden;
  		text-overflow: ellipsis;
  		-o-text-overflow: ellipsis;
  		white-space: nowrap;
		}
    .me-list {
      padding-bottom: 0;
      li {
      	height: 80px;
        .collect-img {
          float: left;
          width: 80px;
          height: 80px;
          padding: 0 15px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      	p {
      		position: relative;
      		height: 80px;
      		line-height: 80px;
      		span {
      			padding-left: 60px;
      		}
      	}
      }
    }
    .page-infinite-loading {
      text-align: center;
      height: 50px;
      line-height: 50px;
      div {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
    .list-end {
      line-height: 40px;
      color: #999;
      font-size: .85em;
      text-align: center;
    }
  }
</style>