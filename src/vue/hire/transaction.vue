<template lang="jade">
div.transaction
  mt-header.title(title="授权交易")
    router-link.backprev(:to="{name:'user'}" slot="right")
  section.breakbox
  section.main
    div.transaction-money
      p.list-title 授权交易
      mt-switch.switch-btn(v-model="showSwitch")
      div.money-text
        span 交易定价
        input(type="text" placeholder="0" v-model="initData.integral" maxlength="10")
        span 元
      p.transaction-text 1.授权交易时，企业可以在后台搜索并购买到你的简历，不授权交易时，企业将无法搜索到你的简历；
      p.transaction-text 2.企业购买你的简历时将会支付交易定价的金额作为招聘的红利给到你。
  button.footer(type="button" v-on:click="onSubmit") 保 存
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      showSwitch: true,
      initData: {
        is_show: 0,
        integral: ''
      }
    }
  },
  mounted(){
      $(window).scrollTop(0);
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    Indicator.open('加载中...');
    this.init();
  },
  methods: {
    indicators(msg) {
      Indicator.open({
        text: msg,
        spinnerType: 'fading-circle'
      });
    },
    init() {
      this.$http.get('/hire/auth').then(function(response) {
        Indicator.close();
        if (response.data.respCode == 0) {
          this.initData = response.data.data;
          if (response.data.data.is_show != 0) {
            this.showSwitch = false;
          }
        }else {
          MessageBox(response.data.reason);
        }
      }, function(response) {
        Indicator.close();
        MessageBox('系统错误，请刷新');
      });
    },
    onSubmit(){
      var that = this;
      var part1 = /^[0-9]+([.][0-9]*)?$/;
      var part2 = /^[0-9]+(.[0-9]{1,2})?$/;
      if (this.initData.integral == '') {
        Indicator.close();
        Toast('请输入交易定价');
        return false;
      } else if (!part1.test(this.initData.integral)) {
        Indicator.close();
        Toast('请不要输入数字以外的交易定价');
        return false;
      } else if (!part2.test(this.initData.integral)) {
        Indicator.close();
        Toast('交易定价最多可输入两位小数');
        return false;
      } else {
        if (this.initData.integral < 0.01) {
          Indicator.close();
          Toast('交易定价不能小于0.01元');
          return false;
        } else if (this.initData.integral > 999999.99) {
          Indicator.close();
          Toast('交易定价不能大于999999.99元');
          return false;
        }
      }
      Indicator.open('上传中...');
      this.$http.post('/hire/auth/save', this.initData).then(function(response) {
        Indicator.close();
        if (response.data.respCode == 0) {
          this.$router.push('/home/user');
        }else {
          MessageBox(response.data.reason);
        }
      }, function(response) {
        Indicator.close();
        MessageBox('系统错误，请刷新');
      });
    }
  },
  watch: {
    'showSwitch': function() {
      if (this.showSwitch) {
        this.initData.is_show = 0;
      }else {
        this.initData.is_show = 1;
      }
    }
  }
}
</script>
<style lang="sass">
  $blue: #4ba5fb;
  $red: #fb1245;
  $color9: #999;
  .transaction {
    .transaction-money {
      position: relative;
      .money-text {
        line-height: 50px;
        color: $red;
        font-size: 1em;
        padding: 0 15px;
        background: #fff;
        span {
          font-size: .95em;
        }
        input {
          width: 90px;
          font-size: 1em;
          color: $red;
          padding-right: 3px;
          margin-left: 30px;
          border: none;
          text-align: left;
        }
      }
    }
    .transaction-text {
      color: $color9;
      font-size: .85em;
      padding: 15px 15px 0;
      line-height: 20px;
    }
    p.transaction-text:not(:first-of-type) {
      padding-top: 10px;
    }
    .switch-btn {
      position: absolute;
      top: 14px;
      right: 15px;
    }
    .mint-switch-input:checked + .mint-switch-core {
      border-color: $blue;
      background-color: $blue;
    }
  }
</style>