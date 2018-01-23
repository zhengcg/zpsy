<template lang="jade">
div.collect
	mt-header.title(title="我的收藏")
		router-link.backprev(:to="{name:'user'}" slot="right")
	section.breakbox
	ul.collect-list(v-infinite-scroll="loadMore" infinite-scroll-disabled="loading")
		li(v-for="data in initData")
			router-link(:to="'/positionDetail/' + data.recruit_id")
				div.collect-img
					img(:src="data.logo")
				div.collect-content
					h3(v-text="data.job_type")
					p(v-text="data.enterprise_name")
					span(v-text="data.work_place_province + '-' + data.work_place_city")
					span(v-text="data.edu")
					p 匹配度:
						span(v-text="data.points + '%'")
					span.collect-salary(v-text="'【' + data.pay + '】'")
					span.collect-date(v-text="data.created_at")
		p.page-infinite-loading(v-show="loading")
			<mt-spinner>(type="fading-circle")</mt-spinner> 加载中...
		p.list-end(v-show="listEnd") 已经到底了
	section.null-empty(v-show="showEmpty")
		img(src="../../assets/hire/icon-empty.png")
		p 暂无收藏任何职位
		span 快去收藏你心仪的职位吧
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
    loadMore() {
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
      this.$http.get('/hire/getUserCollection?page=' + (this.currentPage + 1)).then(function(response) {
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
	            this.currentPage = response.data.data.page.currentPage;8
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
        MessageBox('系统错误，请刷新');
        this.loading = false;
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
$reds: #ed6f72;
$color9: #999;
$colorD: #d7d7d7;
.collect {
	ul.collect-list {
		margin-top: 10px;
		li {
			position: relative;
			display: block;
			overflow: hidden;
			background-color: #fff;
		}
		li:not(:last-of-type) .collect-content {
			border-bottom: 1px solid $colorD;
		}
		img {
			width: 100%;
    	height: 100%;
      object-fit: contain;
		}
		.collect-img {
			float: left;
			width: 80px;
			height: 112px;
			padding: 0 15px;
			background-color: #fff;
		}
		.collect-content {
			padding: 15px;
			height: 112px;
		}
		h3 {
			font-size: 1em;
			font-weight: normal;
			+ p {
				font-size: .9em;
				padding: 10px 0 5px;
			}
		}
		span {
			color: $color9;
			font-size: .8em;
			+ p {
				font-size: .8em;
				color: $reds;
				padding-top: 8px;
				span {
					color: $reds;
				}
			}
			+ span {
				font-size: .85em;
				padding-left: 8px;
			}
		}
		span.collect-salary {
			position: absolute;
			right: 5px;
			top: 15px;
			font-size: 1.05em;
			color: $reds;
		}
		span.collect-date {
			position: absolute;
			right: 15px;
			bottom: 15px;
			font-size: .8em;
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