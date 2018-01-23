<template>
<div class="bottomNav">
  <mt-tabbar v-model="selected" fixed="fixed">
    <mt-tab-item id="nav1" v-bind:class="{navActive:selected=='nav1'}">首页
      <router-link :to="{name:'findwork'}" tag="span" class="navlink"> </router-link><img v-if="selected=='nav1'" slot="icon" src="../../assets/users/icon/nav/icon_nav_index_active.png"/><img v-else="v-else" slot="icon" src="../../assets/users/icon/nav/icon_nav_index.png"/>
    </mt-tab-item>
    <mt-tab-item id="nav2" v-bind:class="{navActive:selected=='nav2'}">历史
      <router-link :to="{name:'history'}" tag="span" class="navlink"></router-link><img v-if="selected=='nav2'" slot="icon" src="../../assets/users/icon/nav/icon_nav_history_active.png"/><img v-else="v-else" slot="icon" src="../../assets/users/icon/nav/icon_nav_history.png"/>
    </mt-tab-item>
    <mt-tab-item class='navMsg' @click="scanQRCode">
      <img slot="icon" @click="scanQRCode"  src="../../assets/users/icon/nav/icon-nav-msg.png"/>
    </mt-tab-item>
     <mt-tab-item id="nav4" v-bind:class="[{navActive:selected=='nav4'},{unread:msg==1}]">发现
      <router-link :to="{name:'news'}" tag="span" class="navlink"> </router-link><img v-if="selected=='nav4'" slot="icon" src="../../assets/users/icon/nav/icon_nav_find_active.png"/><img v-else="v-else" slot="icon" src="../../assets/users/icon/nav/icon_nav_find.png"/>
    </mt-tab-item>
    <mt-tab-item id="nav5" v-bind:class="{navActive:selected=='nav5'}">我的
      <router-link :to="{name:'user'}" tag="span" class="navlink"> </router-link><img v-if="selected=='nav5'" slot="icon" src="../../assets/users/icon/nav/icon_nav_me_active.png"/><img v-else="v-else" slot="icon" src="../../assets/users/icon/nav/icon_nav_me.png"/>
    </mt-tab-item>
  </mt-tabbar>
</div> 
</template>

<script>
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
 import { MessageBox } from 'mint-ui';
export default {
  props: ['selectedNav'],
  data () {
    return {
      selected:this.selectedNav,
      msg:0,
      api : {
        signForH5:'genuine/user/signForH5',
        find:'genuine/scanRecord/find'
      },
    }
  },
  created(){
    this.getConfig();
    // this.$http.get('/hire/message').then(function(response){
    //   if(response.data.respCode=="0"){
    //     if(response.data.data.message1==1){
    //       this.msg=1;
    //     }
    //   }else{
    //     Toast(response.data.reason)
    //   }
    // },function(response){
    //   MessageBox('系统错误，请刷新');
    // })
  },
    watch:{
      '$route':'fetchData'
    },
    
    methods:{
      fetchData(){

      },
      getConfig:function(){
        var params = {};
        if(location.href.indexOf('?from=')>0){
            params.targetUrl = location.href.split("?")[0];
        }else{
          params.targetUrl = location.href.split("#")[0];
        }
        this.$http({
          params :params,
                method:'GET',
                url:this.api.signForH5,
            before:function(){
            Indicator.open('加载中...');
            }
              }).then(function(res){
          Indicator.close();
          var data=res.data;
          var _this =this;
          if(data.errorCode=="0"){
            wx.config(data.result);
              wx.ready(function(){
              //  wx.onMenuShareTimeline({
              //     title: '正品溯源', // 分享标题
              //     desc: '看见真实的幸福', // 分享描述
              //     link: 'http://app.izheng.org', // 分享链接
              //     imgUrl: 'http://7xocov.com1.z0.glb.clouddn.com/icon_head_portrait.png',
              //     success: function () { 
              //         _czc.push(['_trackEvent', '邀请好友', '分享', '分享朋友圈']);
              //     },
              //     cancel: function () { 
              //         _czc.push(['_trackEvent', '邀请好友', '分享', '取消分享朋友圈']);
              //     }
              // });
                // wx.onMenuShareAppMessage({
                //    title: '正品溯源', // 分享标题
                //   desc: '看见真实的幸福', // 分享描述
                //   link: 'http://app.izheng.org', // 分享链接
                //   imgUrl: 'http://7xocov.com1.z0.glb.clouddn.com/icon_head_portrait.png', // 分享图标
                //     // success: function () { 
                //     //     _czc.push(['_trackEvent', '邀请好友', '分享', '分享微信好友']);
                //     // },
                //     // cancel: function () { 
                //     //     _czc.push(['_trackEvent', '邀请好友', '分享', '取消分享微信好友']);
                //     // }
                // });
              });
              wx.error(function(res){
                Toast({
                    message: '微信设置错误!!',
                    position: 'middle',
                    duration: 1000
            });
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

            });
          }else{
            // Toast(data.reason)
          }
        },function(res){
          Indicator.close();
          Toast({
                  message: '系统错误,请刷新！',
                  position: 'middle',
                  duration: 1000
          });
        })
      },
    scanQRCode:function(){
            wx.scanQRCode({ 
                  needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，  
                  scanType : [ "qrCode", "barCode" ], // 可以指定扫二维码还是一维码，默认二者都有  
                  success : function(res) { 
                    var length1 = res.resultStr.split("/").length;
                    var aa = res.resultStr.split("/")[length1-1];
                    if(res.errMsg === "scanQRCode:ok"){
                      location.href = 'http://app.izheng.org/#/richScan?code='+res.resultStr;
                    }
                  },
                  error:function(res){ 
                    Toast({
                            message: '系统错误,请刷新！',
                            position: 'middle',
                            duration: 1000
                    });
                  }
              });
      }
      
  }
}
</script>
<style lang="sass">
  $red: #c12;
  .bottomNav{
    .navlink{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
    }
    .mint-tab-item{
      background:#fff;
      position:relative;
      padding:0px;
      padding-top: 7px;
      color: #333;
       &:nth-of-type(4){
        .mint-tab-item-icon{
          padding-top: 0px;
        }
        img{
          // margin-top: 5px;
        }
      }
    }
    .mint-tab-item{
      
    }
    .mint-tabbar{
      border-top:1px solid #f2f2f2;
    }
    .mint-tabbar > .mint-tab-item.is-selected{
      background:#fff;
      color:#d05b64;
    }
    .mint-tabbar > .mint-tab-item.navActive{
      color:#c3222c;
    }
    .mint-tab-item-icon{
      width: 20px;
      height: 20px;
      position:relative;
     
    }
    .unread {
      .mint-tab-item-icon:after{
        position: absolute;
        top: 20%;
        right: 0%;
        display: inline-block;
        content: "";
        background-color: #FF646E;
        width: 6px;
        height: 6px;
        border-radius: 50%
      } 
    }
    .navMsg{
	  	.mint-tab-item-icon{
	    	margin-top: -20px;
        width: 65px;
        height: 65px;
	  	}
	  }
  }
</style>


