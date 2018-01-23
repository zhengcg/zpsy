<template>
<div id="userinfo1">
  <mt-header fixed title="设置" >
    <router-link to="/home/findwork" slot="left">
        <mt-button icon="back"></mt-button>
      </routers-link>
  </mt-header>
  <section class="breakbox"></section>
  <section class="main">
    <div class="userinfo-content">
      <p class="userinfo-img"><span>头像</span><img :src="user_avatar=='' ? 'src/assets/hire/resume/no_avatar.png' : user_avatar"/>
        <input type="file" capture="camera" accept="image/*" class="file"/>
      </p>
      <p class="userinfo-name"><span>昵称</span>
        <input type="text" placeholder="请输入昵称" v-model="initData.nickname" maxlength="8"/>
      </p>
    </div>
    <div class="userinfo-speak">
      <p>一句话介绍<span>/30</span><span v-text="showLength"></span></p>
      <textarea v-model="initData.introduce" placeholder="请输入一句话" maxlength="30"></textarea>
    </div>
  </section>
  <button type="button" v-on:click="onSubmit" class="footer">保 存</button>
</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      showLength: 0,
      user_avatar: '',
      initData: {
        nickname: '',
        introduce: ''
      }
    }
  },
  mounted(){
      $(window).scrollTop(0);
  },
  created () {
    // Indicator.open('加载中...');
    // this.init();
    // this.uploadPreview(); // 监控文件上传
  },
  methods: {
    init() {
      this.$http.get('/hire/index').then(function(response) {
        Indicator.close();
        if (response.data.respCode == 0) {
          this.user_avatar = response.data.data.user_avatar;
          this.initData.nickname = response.data.data.nickname;
          this.initData.introduce = response.data.data.introduce;
        }else {
          MessageBox(response.data.reason);
        }
      }, function(response) {
        Indicator.close();
        Toast({
          message: '系统错误,请刷新！',
          position: 'middle',
          duration: 1000
        });
      });
    },
    uploadPreview: function() {
      var this_ = this;
      $(document).on('change', '.file', function() {
        this_.imgUpload(this);
      })
    },
    imgUpload: function(_this) { //上传照片
      var that = this;
      var ImgType = ['jpg', 'png', 'gif', 'jpeg', 'bmp'];
      if (!RegExp("\.(" + ImgType.join("|") + ")$", "i").test(_this.value.toLowerCase())) {
        Toast("请选择图片");
        _this.value = "";
        return false
      } else if (_this.files[0].size > 10000000) {
        Toast("图片尺寸不能大于10M");
        _this.value = "";
        return false
      } else {
        Indicator.open('正在上传...');
        this.$nextTick(function() {
          var form = $(_this).parent();
          var data = new FormData(form.get(0));
          data.append("avatar", _this.files[0]);
          $.ajax({
            url: '/hire/avatar',
            type: 'POST',
            processData: false,
            contentType: false,
            data: data,
            processData: false,
            success: function(result) {
              if (result.respCode == 0) {
                that.user_avatar = result.data.user_avatar;
                Toast('头像上传成功');
              }else {
                MessageBox(result.reason);
              }
            },
            complete: function() {
              Indicator.close();
            }
          })
        })
      }
    },
    onSubmit() {
      this.$http.post('/hire/store', this.initData, {
        before: function() {
          Indicator.open('提交中...');
        }
      }).then(function(response) {
        if (response.data.respCode == 0) {
          this.$router.push('/home/user');
        } else {
          Indicator.close();
          this.alertMsg(response.data.reason);
        }
      }, function(response) {
        Indicator.close();
        Toast({
          message: '系统错误,请刷新！',
          position: 'middle',
          duration: 1000
        });
      });
    }
  },
  watch: {
    'initData.introduce': function() {
      this.showLength = this.initData.introduce.length;
    }
  }
}
</script>
<style lang="sass">
 $blue: #4ba5fb;
  $color6: #666;
  .userinfo {
    font-size: .95em;
    input,textarea {
      border: 0;
    }
    p {
      color: $color6;
      padding: 0 15px;
      background-color: #fff;
      overflow: hidden;
    }
    .userinfo-content {
      margin-top: 10px;
      p {
        line-height: 50px;
      }
      p.userinfo-img {
        position: relative;
        line-height: 70px;
        margin-bottom: 1px;
        background: #fff url("../../assets/hire/arrleft.png") no-repeat center right 15px;
        background-size: 8px auto;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        img,input {
          position: absolute;
          right: 35px;
          top: 10px;
        }
        input {
          top: 0;
          right: 0;
          height: 60px;
          opacity: 0;
          font-size: .95em;
        }
      }
      p.userinfo-name {
        input {
          float: right;
          height: 50px;
          color: $blue;
          font-size: .95em;
          text-align: right;
        }
      }
    }
    .userinfo-speak {
      margin-top: 5px;
      background-color: #fff;
      p {
        padding-top: 15px;
        span {
          float: right;
        }
        span:last-of-type {
          color: $blue;
        }
      }
      textarea {
        width: 100%;
        resize: none;
        font-size: 1em;
        padding: 10px 15px;
      }
    }
  }
</style>
