<template>
	<div id="integralRules">
		<mt-header fixed title="积分规则" class="title1">
			<router-link to="/integral" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="breakbox"></div>
		<!-- <img src="../../../assets/users/icon/icon_rules.png"> -->
		<table class="table1">
			<thead>
				<tr>
					<th style="width: 50%;text-align: left">操作行为</th>
					<th>积分奖励</th>
					<th>每日次数</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>登录</td>
					<td style="text-align: center">1</td>
					<td style="text-align: center">1</td>
				</tr>
				<tr>
					<td>发表评论</td>
					<td style="text-align: center">2</td>
					<td style="text-align: center">40</td>
				</tr>
				<tr>
					<td>扫正品溯源码</td>
					<td style="text-align: center">1</td>
					<td style="text-align: center">10</td>
				</tr>
				<tr>
					<td>每日分享</td>
					<td style="text-align: center">5</td>
					<td style="text-align: center">10</td>
				</tr>
				<tr>
					<td>发布话题</td>
					<td style="text-align: center">10</td>
					<td style="text-align: center">5</td>
				</tr>
				<tr>
					<td>确认举报可疑品</td>
					<td style="text-align: center">10</td>
					<td style="text-align: center">2</td>
				</tr>
			</tbody>
		</table>
		<table class="table2">
			<thead>
				<tr>
					<th style="width: 50%">等级</th>
					<th>积分</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>小白</td>
					<td>0-49</td>
				</tr>
				<tr>
					<td>码迷</td>
					<td>50-149</td>
				</tr>
				<tr>
					<td>码痴</td>
					<td>150-299</td>
				</tr>
				<tr>
					<td>码癫</td>
					<td>300-599</td>
				</tr>
				<tr>
					<td>码魔</td>
					<td>600-899</td>
				</tr>
				<tr>
					<td>码侠</td>
					<td>900-1499</td>
				</tr>
				<tr>
					<td>码仙</td>
					<td>1500-4999</td>
				</tr>
				<tr>
					<td>码咖</td>
					<td>5000-9999</td>
				</tr>
				<tr>
					<td>码博士</td>
					<td>10000-19999</td>
				</tr>
				<tr>
					<td>码大师</td>
					<td>20000以上</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui'
	export default {
		mounted(){
   		$(window).scrollTop(0);

			optionTitle.pageTitle = '积分规则';
			appHideTitle();
		},
		methods:{

		}

	}
</script>
<style lang="sass">
.table1{
	width: 100%;
	border-collapse: collapse;
	margin: 0.5rem 0;
	th{background: #aaa;color: #fff;font-weight: normal;border: 1px solid #f3f3f3;padding:0.2rem;font-size: 0.4rem;}
	td{background: #fff;border: 1px solid #f3f3f3;color:#333;padding: 0.2rem;font-size: 0.4rem;}

}
.table2{
	width: 100%;
	border-collapse: collapse;
	th{background: #aaa;color: #fff;font-weight: normal;border: 1px solid #f3f3f3;padding: 0.2rem;font-size: 0.4rem;}
	td{background: #fff;border: 1px solid #f3f3f3;color:#333;padding: 0.2rem;text-align: center;font-size: 0.4rem;}

}
	#integralRules{
		img{
			width: 100%;
			display: block;
		}
	}
</style>