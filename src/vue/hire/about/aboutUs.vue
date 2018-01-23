<template>
	<div id="aboutUs">
		<mt-header fixed title="关于我们" class="title1">
			<router-link to="/userinfo" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="breakbox"></div>
		<p>
			正品溯源是一家致力于为广大消费者和制造商提供专业正品认证服务的互联网科技公司。总部位于北京，在中国及世界拥有多家分支机构。
		</p>
		<p>
			目标:1、国家级混业正品溯源系统；2、以创新实现便捷与可靠；3、在互联网世界建立中国跨境正品溯源标准；<br/>
		</p>
		<p>
			定位: 公正、自律、创新<br/>
		</p>
		<p>
			战略:创造性建立规范化标准，连接厂商与消费者，实现经济与社会价值双赢<br/>
		</p>
		<p>
			愿景:看见真实的幸福
		</p>
		<p>使命: 改变市场假冒伪劣现象，重塑中国制造的国际形象</p>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui'
	export default {
		data(){
			return{

			}
		},
		mounted(){
			$(window).scrollTop(0);
			optionTitle.pageTitle = '关于我们';
			appHideTitle();			
		},
		methods:{
			

		}

	}
</script>
<style lang="sass">
	#aboutUs{
		img{
			width: 100%;
			display: block;
		}
		p{
			line-height: initial;
			padding: 10px;
			text-indent: 2em;
    		font-size: 0.85em;
		}
	}
</style>