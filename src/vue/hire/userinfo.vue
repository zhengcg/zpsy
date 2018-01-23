<template>
<div class="userinfo">
  <mt-header fixed title="设置" >
    <router-link to="/home/findwork" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
  </mt-header>
  <section class="breakbox"></section>
    <div class="content_bd">
  	<ul>
  		<router-link tag="li" to="/opinion">
  			<p>意见反馈</p>
  		</router-link>
  		<router-link tag="li" to="/aboutUs">
  			<p>关于我们</p>
  		</router-link>
  		<router-link tag="li" to="/agreement">
  			<p>协议声明</p>  		
  		</router-link>
  		<router-link tag="li" to="/cooperation">
  			<p>商业合作</p>
  		</router-link>
      <li>
        <p>联系客服: 3558634820</p>
      </li>
  	</ul>
  </div>
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
$red: #ff7d85;
  .userinfo {
  	.content_bd{
  		position: relative;
      margin-top:10px;
  		ul{
  			li{
  				position: relative;
  				overflow: hidden;
  				font-size: 0.8em;
  				line-height: 50px;
  				// padding:0 20px;
  				background: #fff url(../../assets/users/icon/icon_nav_goto_black.png) no-repeat center right 10px;
  				background-size:30px auto ;
  				// color: #333333;
  				&:nth-of-type(2){
            p{
              border-top: 1px solid #e3e3e3;
              border-bottom: 1px solid #e3e3e3;
            }
          }
          &:nth-of-type(3){
              margin-bottom: 14px;
          }
           &:nth-of-type(4){
            p{
              border-bottom: 1px solid #e3e3e3;
            }
          }
           &:nth-of-type(5){
            p{
              background: #fff  ;
            }
          }
  			}
        p{
          padding: 0 20px;
        }
  		}
  	}
  }
</style>
