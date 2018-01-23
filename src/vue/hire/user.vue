<template>
<div class="user">
  <mt-header fixed title="我的">
  </mt-header>
  <div class="breakbox"></div>
  <div class="userDefault1">
    <img v-if="dataList.avatar" :src="dataList.avatar">
  	<img v-else src="../../assets/users/icon/icon_placeHoldeImage.png">
  	<div class="userBox">
  		<div class="userName">
  			<span v-text="dataList.nickName || ''"></span>
  		</div>
  		<div class="userNumBox">
  			<span>正品号:</span>
  			<span class="userNum" v-text="dataList.genuid"></span>
  		</div>
  	</div>
  </div>
  <div class="content_bd">
  	<ul>
  		<router-link tag="li" :to="{ name: 'integral', query: { name: dataList.nickName,avatar:dataList.avatar,score:dataList.score}}">
  			<p>积分</p>
        <div v-text="dataList.score || 0"></div>
  		</router-link>
  		<router-link tag="li" :to="{ name: 'collection'}">
  			<p>收藏</p>
  		</router-link>
  		<!-- <router-link tag="li":to="{ name: 'comments', query: { name: dataList.nickName,avatar:dataList.avatar}}">
  			<p>评论</p>
  		</router-link> -->
  		<router-link tag="li" :to="{ name: 'message', query: { name: dataList.nickName,avatar:dataList.avatar}}">
  			<p>消息</p>
  		</router-link>
  	</ul>
    <ul>
      <router-link tag="li" :to="{ name: 'report', query: { name: dataList.nickName,avatar:dataList.avatar}}">
        <p>举报</p>
      </router-link>
     <!--  <router-link tag="li" :to="{ name: 'feedback', query: { name: dataList.nickName,avatar:dataList.avatar}}">
        <p>反馈</p> -->
      </router-link>
    </ul>
  </div>
  <div class="base-empty-div"></div>
</div>
</template>
<script>

import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name:'user',
  data () {
    return {
      dataList:'',
      api: {
        getDataForloginH5ByWeixin: "/genuine/login/getDataForloginByH5"
      }
    }
  },
  mounted(){
      $(window).scrollTop(0);
  },
  created () {
    this.getDataForloginH5ByWeixin();
      // wx.onMenuShareAppMessage({
      //         title: 'Hi,朋友,!', // 分享标题
      //         desc: '玛娜花园', // 分享描述
      //         link: 'www.baidu.com', // 分享链接
      //         imgUrl: 'https://m.mana.com/static/images/mobile/shareicon.png', // 分享图标
      //         // success: function () { 
      //         //     _czc.push(['_trackEvent', '邀请好友', '分享', '分享微信好友']);
      //         // },
      //         // cancel: function () { 
      //         //     _czc.push(['_trackEvent', '邀请好友', '分享', '取消分享微信好友']);
      //         // }
      //     });
      },
  methods :{
    getDataForloginH5ByWeixin: function(){
      // var params = {};
      //     params.pageNo = 1;
          this.$http({
            method:'post',
            url:this.api.getDataForloginH5ByWeixin,
            // params:params,
            // headers: {"token": "14af3bb2ca6a42429648f347b89ea158"},
            emulateJSON: true,
            before:function(){
              Indicator.open('加载中...');
            }
          }).then(function(res){
            Indicator.close();
            console.log(res.data)
            var data=res.data;
            var _this =this;
            if(data.errorCode=="0"){
                _this.dataList = data.result;
            }else{
              Toast(data.reason)
            }
          },function(res){
            Indicator.close();
            Toast({
                    message: '系统错误,请刷新！',
                    position: 'middle',
                    duration: 1000
            });
          })
    }
  }
}
</script>
<style lang="sass">
$red: #ff7d85;
  .user {
  	.userDefault1{
  		padding: 10px;
  		background: #FFFFFF;
  		margin-bottom: 10px;
  		overflow: hidden;
  		height:auto;
  		img{
		    	float: left;
			    width: 50px;
			    height: 50px;
			    margin: 10px;
          border-radius: 50px;
  		}
  		.userBox{
  			margin: 20px 30px 10px 80px;
        .userNumBox {
            font-size: 0.8em;
            color: #999;
        }
  			div{
  				margin-top: 10px;
  			}
  		}
  	}
  	.content_bd{
  		position: relative;
  		ul{
        margin-bottom:10px;
        background: #fff;
  			li{
  				position: relative;
  				overflow: hidden;
  				font-size: .8em;
  				line-height: 50px;
  				border-bottom: 1px solid #e3e4e5;
          &:nth-last-child(1){
            border-bottom: 0px;
          }
  				color: #333333;
          padding: 0 20px;
  				p{
            float: left;
  					padding-left: 35px;
  					background:url(../../assets/users/icon/icon_minescroe.png) no-repeat center left 3px;
  					background-size: 20px auto;
  				}
          div{
            float : right;
            padding-right: 10px;
          }
  				.mint-badge{
  					line-height: normal;
  					position: absolute;
  					right: 30px;
  					top: 50px;
  					transform: translateY(-50%);
  					background-color: $red;
  				}
  				&:nth-of-type(2){
  					p{
  						background:url(../../assets/users/icon/icon_collect1.png) no-repeat center left 3px;
  						background-size:20px auto;
  					}
  				}
  				&:nth-of-type(3){
  					p{
  						background: url(../../assets/users/icon/icon_comments.png) no-repeat center left 3px;
  						background-size: 20px auto;
  					}
  				}
          &:nth-of-type(4){
            padding-bottom:10px;
            p{
              background: url(../../assets/users/icon/icon_message.png) no-repeat center left 3px;
              background-size: 20px auto;
            }
          }
  			}
        &:nth-last-child(1){
          li{
             &:nth-of-type(1){
            p{
                background: url(../../assets/users/icon/icon_report.png) no-repeat center left 3px;
                background-size: 20px auto;
              }
            }
            &:nth-of-type(2){
              margin-bottom:10px;
              p{
                background: url(../../assets/users/icon/icon_feedback.png) no-repeat center left 3px;
                background-size: 20px auto;
              }
            }
          }
        }
  		}
  	}
  }
</style>
