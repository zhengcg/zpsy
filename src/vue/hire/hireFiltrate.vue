<template>
	<div id="hireFiltrate" class="transWrap">
	    <mt-header class="title" title="高级筛选">
      		<span class="backprev" @click="backPage" slot="right"></span>
		</mt-header>
		<div class="hireFiltrate">
			<section class="section-form">
				<div class="cell cell-select">
					<div class="cell-hd">
						工作地址
					</div>
					<div class="cell-bd">
						<div class="cell-bd" @click="showLivePicker()" :class="showData.base_live_place == '请选择'?'defaultOption':''">
				            <span v-text="spanName.cityName"></span>
				          </div>
					</div>
				</div>
				<div class="cell cell-select">
					<div class="cell-hd">
						岗位选择
					</div>
					<div class="cell-bd">
						<div class="cell-db">
							<div class="cell-bd"  @click="showPositionPicker()">
								<span v-text="spanName.positionName "></span>
							</div>	
						</div>
					</div>
				</div>
				<div class="cell cell-select">
					<div class="cell-hd">
						期望月薪
					</div>
					<div class="cell-bd">
						<div class="cell-db" >
							<div class="cell-bd" @click="showPayPicker()">
								<span v-text="spanName.payName"></span>
							</div>
						</div>
					</div>
				</div>
			</section>
			    <mt-popup v-model="pickerVisible" position="bottom" class="mint-popup">
			      <mt-picker id="livePicker" v-show="showLive" :slots="liveSlots" @change="onLiveChange" ref="lives" :visible-item-count="5" :show-toolbar="false"></mt-picker>
			      <mt-picker id="positionPicker" v-show="showPosition" :slots="positionSlots" @change="onPositionChange" ref="positions" :visible-item-count="5" :show-toolbar="false"></mt-picker>
			      <mt-picker id="payPicker" v-show="showPay" :slots="paySlots" @change="onPayChange" ref="pays" :visible-item-count="5" :show-toolbar="false"></mt-picker>
			      <p><button type="button" @click="pickerClose">取消</button><button type="button" @click="showEnd">完成</button></p>
			    </mt-popup>
			    
		    <section>
		    	<div class="comAttention">
					<mt-button type="default" id="felxBtn" @click="onReset()">
						重置
					</mt-button>
					<mt-button type="primary" id="posBtn" @click="onSubmit()">确定</mt-button>
				</div>
		    </section>
		</div>
	</div>
</template>
<script>
	function getNameDta(arr) { //获得数据中的name
	  var result = new Array();
	  for (var i in arr) {
	    if (arr[i].name != '') {
	      result.push(arr[i].name);
	    }
	  }
	  return result;
	}
	import findwork from './findWork'
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { Picker } from 'mint-ui';
	export default {
		name:'hireFiltrate',
		data(){
			return {
				id:222,
				value: null,
			 	pickerVisible: false, //双select
	     	 	showLive: false,      //live picker show
		      	showPay:false,
		      	showPosition:false,
		      	showpayend:false,
		      	showPositionend:false,
		      	showLiveend:false,
		      	LiveType:false,
		      	positionType:false,
		      	payType:false,
		      	firstType:false,
		      	oldParams:{
		      	},
		      	params:{
		      		province:'',
		      		city:'',
		      		job_second_rank:'',
		      		job_third_rank:'',
		      		pay:'',
		      		provinceName:'',
		      		cityName:'',
		      		job_second_rankName:'',
		      		job_third_rankName:'',
		      		payName:'',
		      	},
		      	spanName:{
		      		cityName:'请选择',
		      		positionName:'请选择',
		      		payName:'请选择'
		      	},
			      liveSlots: [
			        { //live picker select
			          flex: 1,
			          values: [],
			          className: 'slot1',
			          textAlign: 'right',
			          defaultIndex: 0
			        },
			        {
			          divider: true,
			          content: '-',
			          className: 'slot2'
			        },
			        {
			          flex: 1,
			          values: [],
			          className: 'slot3',
			          textAlign: 'left'
			        }
			      ],
			     positionSlots :[
			     	{
			     		flex: 1,
			          	values: [],
			          	className: 'slot1',
			          	textAlign: 'right',
			          	defaultIndex: 0
			     	},
			     	{
			     		divider:true,
			     		content:'-',
			     		className: 'slot2'
			     	},
			     	{
		     			flex: 1,
			          	values:[],
			          	className: 'slot3',
			          	textAlign: 'left'
			     	}
			     ],
			     paySlots:[
				     {
				     	flex:1,
				     	values:getNameDta(base_salary_range[1]),
			     	 	className: 'slot1'
				     }
			     ],
			     liveData:{
			     	cityName :'',
			     	cityIde:'',
			     	provinceName:'',
			     	provinceIde:''
			     },
			     payData:{
			     	base_pay_name:'',
			     	new_name:'',
			     	base_pay_ide:''
			     },
			      positionData:{
			      	base_position_first:'无',
			      	base_position_firstId:'无',
			      	base_position_second:'无',
			      	base_position_secondId:'无',
			      },
			      industry:'',
					showData: {
				        base_live_city: '',
				        base_live_place: '',
				        age_floor: '',
				        age_uuper: '',
				        heigh_floor: '',
				        heigh_uuper: '',
				      },
				      listData: {
				        base_live_city: '',
				        base_live_place: '',
				        age_floor: '',
				        age_uuper: '',
				        heigh_floor: '',
				        heigh_uuper: '',
				      },
				      basicData: {
				        age_floor: '',
				        age_uuper: '',
				        base_live_city: '',
				        base_live_place: '',
				        education: '',
				        heigh_floor: '',
				        heigh_uuper: '',
				        income: '',
				        marital_status: ''
				      },
			}
		},
		created(){
			this.fetchData();
			this.getPosition();
			this.initSel();
		},
		 mounted(){
   		$(window).scrollTop(0);
	},
		watch:{
			'$route':'fetchData',
		},
		methods:{
			initSel(){
				if(!this.params.firstType){
					if(this.oldParams.provinceName){
						this.spanName.cityName = this.oldParams.provinceName+'-'+this.oldParams.cityName;
					}
					if(this.oldParams.job_third_rankName){
						this.spanName.positionName = this.oldParams.job_second_rankName+"-"+this.oldParams.job_third_rankName;
					}
					if(this.oldParams.payName){
						this.spanName.payName = this.oldParams.payName;
					}
				}
			},
			fetchData(){
				 //获取url的id参数
			 	this.oldParams = this.$router.currentRoute.params;
				 if(this.oldParams.city){
				 	this.showLiveend=true;
				 }
				 if(this.oldParams.job_third_rank){
				 	this.showPositionend= true;
				 }
				 if(this.oldParams.pay){
				 	 this.showpayend=true;
				 }
			},
			backPage(){
				window.history.go(-1)
			},
			getPosition:function(){
				var ts =this ;
				this.$http.get('/hire/flilterLists',{
					before:function(){
						Indicator.open('加载中...');
					}
				}).then(function(response){
					Indicator.close();
					var response = response.data;
					var work_place =   response.data.work_place;
					var industry =  response.data.industry;
					this.industry = industry;
					ts.liveData.provinceName =  work_place[0].name;
					ts.liveData.provinceIde = work_place[0].id;
					ts.liveData.cityName =  work_place[1].name;
					ts.liveData.cityIde = work_place[1].id;
					if(industry.length > 0){
						var size =industry.length-1;
						this.params.job_second_rank = industry[size].id;
						this.params.job_second_rankName = industry[size].name;
						this.getOptId2(industry[size].id);
						for(var i=0;i<industry.length;i++){
							ts.positionSlots[0].values.unshift(industry[i].name);
						}
					}
					if(work_place[0].id == 'all'){
						this.liveSlots[0].values = getNameDta(base_live_place[1]);
						this.liveSlots[0].values.unshift('不限');
					}else{
						this.liveSlots[0].values.unshift(work_place[0].name);
						this.params.provinceName =work_place[0].name;
						this.params.cityName =work_place[1].name;
						if(work_place[1].id =='all'){
							this.getOptId(ts.liveData.provinceName)
						}else{
							this.liveSlots[2].values.unshift(work_place[1].name);
						}
					}
					if(work_place[1].id == 'all'){
						this.params.city = '' ;
					}else{
						this.params.city = work_place[1].id;
					}
					if(!this.oldParams.cityName){
						if(work_place[0].name == '不限'){
							this.params.provinceName = '不限'
						}else{
							this.params.provinceName = work_place[0].name;
						}
						this.params.province = work_place[0].id;
						this.params.cityName =work_place[1].name;
					}else{
						this.params.provinceName =this.oldParams.provinceName;
						this.params.province = this.oldParams.province;
						this.params.cityName =this.oldParams.cityName;
						this.params.city =this.oldParams.city;
					}
				},function(response){
					Indicator.close();
					Toast(response.data.reason);
				})
			},
			showLivePicker: function() { //显示隐藏 live picker
		        $('.mint-popup').css('opacity', 1)
		        this.pickerVisible = !this.pickerVisible;
		        this.showLive = true;
		        this.showPay = false;
		        this.showPosition= false;
		      },
	      	  getOptId: function(placeName) { //获得市
			      	var _this = this;
			        var place = base_live_place[1];
			        for (var i in place) {
			          if (place[i].name == placeName) {
			            var id = place[i].ide;
			            _this.params.province = id;
			            this.liveSlots[2].values = getNameDta(base_live_place[2][id]);
			            this.liveSlots[2].values.unshift('不限');
			          }
			        }
			      },
		       getOptId2: function(placeName) {
		        var place = base_work_type[3];
		        var _this =this;
		        $.each(place,function(i,item){
		        	if(placeName == i){
		        		_this.params.job_second_rank = i;
			            _this.positionSlots[2].values = getNameDta(item);
		        	}
		        })
		      },
		      //是否显示职位picker
		      showPositionPicker:function(){ 
		      	$('.mint-popup').css('opacity', 1);
  	 		 	this.pickerVisible = !this.pickerVisible;
		      	this.showPay = false;
		      	this.showLive = false;
		      	this.showPosition = true;
		      },
		      //是否显示月薪picker
		      showPayPicker:function(){
	      	 	$('.mint-popup').css('opacity', 1);
  	 		 	this.pickerVisible = !this.pickerVisible;
		      	this.showPay = true;
		      	this.showLive = false;
		      	this.showPosition = false;
		      },
		        onLiveChange: function(picker,values) { //live change 监控
		        	if(!this.liveType){
		        		if(this.oldParams.provinceName){
		        			picker.setSlotValue(0,this.oldParams.provinceName);
		        		}
		        		if(this.params.cityName){
		        			picker.setSlotValue(1,this.oldParams.cityName);
		        		}
	        			this.liveType = true;
		        	}
		        if (this.showLive) {
		          this.getOptId(values[0]);
	       			if(values[0] == '不限') { //省不限，默认市不限
			            this.liveSlots[2].values = [''];
			            this.params.province = '';
			        }
		          this.listData.base_live_place = values[0];
		          this.listData.base_live_city = values[1];
		          this.params.provinceName = values[0];
		          this.params.cityName = values[1];
		        }
		      },
		      onPositionChange:function(picker, values){
		      	if(!this.positionType){
		      		if(this.oldParams.job_second_rankName){
		      			picker.setSlotValue(0,this.oldParams.job_second_rankName);
		      		}
		      		if(this.oldParams.job_third_rankName){
		      			picker.setSlotValue(1,this.oldParams.job_third_rankName);
		      		}
        			this.positionType = true;
	        	}
				var industry = this.industry;
				var industryId = '';
		      	$.each(industry,function(i,item){
		      		if(values[0] == item.name){
		      			industryId = item.id;
		      		}
		      	});
		      	this.positionData.firstNew = values[0];
		      	this.positionData.secondNew = values[1];
		      	this.params.job_second_rank = industryId;
		      	this.params.job_second_rankName = values[0];
		      	this.params.job_third_rankName = values[1];
		      	
	      		this.getOptId2(industryId);
		      },
		      onPayChange:function(picker, values){
		      	if(!this.payType){
		      		if(this.oldParams.payName){
		      			picker.setSlotValue(0,this.oldParams.payName);
		      		}
        			this.payType = true;
		      	}
		      	this.params.payName = values[0];
		      	this.payData.new_name = values[0];
		      },
		      pickerClose: function() { //picker关闭
		        this.pickerVisible = false;
		      },
	          showEnd: function() { //age 完成
			      this.pickerVisible = false;
			      if (this.showLive) {
			      	this.showLiveend=true;
			      	if(this.params.provinceName == '不限'){
			      		this.spanName.cityName = '不限';
			      	}else{
			      		this.spanName.cityName = this.params.provinceName+'-'+this.params.cityName;
			      	}
			      }else if(this.showPay) {
			      	this.showpayend = true;
					if(!this.params.payName){
						this.params.payName = this.spanName.payName = base_salary_range[1][0].name;
						this.params.pay =base_salary_range[1][0].id; 
					}else{
						this.spanName.payName = this.params.payName;
					}
			      }else if(this.showPosition){
			      	this.showPositionend = true;
					this.spanName.positionName = this.params.job_second_rankName+'-'+ this.params.job_third_rankName;
			      }
			    },
			onReset:function(){
				this.spanName.cityName = '请选择';
				this.spanName.positionName = '请选择';
				this.spanName.payName = '请选择';
				this.params.province = '';
				this.params.city = '';
				this.params.job_third_rank = '';
				this.params.pay = '';
		      	this.params.provinceName='';
	      		this.params.cityName='';
	      		this.params.job_second_rankName='';
	      		this.params.job_third_rankName='';
	      		this.params.payName='';
			},
			onSubmit:function(){
								// 获取2级岗位ide
				var _this = this;
				var params = this.params;
				if(params.province){
					if(params.province != 'all'){
						$.each(base_live_place[2][params.province],function(i,item){
							if(item.name == params.cityName){
      			  				_this.params.city=item.ide;
		      			  		}
						});
					}
				}
				if(params.job_second_rank){
					$.each(base_work_type[3][params.job_second_rank],function(i,item){
						if(item.name == params.job_third_rankName){
							_this.params.job_third_rank = item.ide;
						}
					})
				}
				$.each(base_salary_range[1],function(i,item){
					if(item.name == params.payName){
  			  			_this.params.pay = item.ide;
					}
				})
				if(!_this.showPositionend){
						_this.params.job_third_rank = '';
						_this.params.job_second_rank ='';
						_this.params.job_third_rankName = '';
						_this.params.job_second_rankName ='';
					}
				if(!_this.showLiveend){
						_this.params.city = '';
			  			_this.params.cityName = '';
			  			_this.params.province = '';
			  			_this.params.provinceName = '';
					}
				if(!_this.showpayend){
						_this.params.pay = '';
			  			_this.params.payName = '';
					}
				if(_this.params.cityName == '不限'){
					_this.params.city = '';
				}
				if(_this.params.province == 'all' || _this.params.province == '不限'){
					_this.params.province = '';
				}
				if(!_this.showpayend && !_this.showLiveend && !_this.showPositionend){
					_this.params = [];
				}
				_this.$router.push({name:'findwork',params:_this.params});
			},
			handleChange(value) {
		        Toast({
		          message: '已选择 ' + value.toString(),
		          position: 'bottom'
		    	});
      		}
		}
	}
</script>
<style lang="sass">
	.hireFiltrate{
		margin-top: 60px;
	}
		#felxBtn{
	    text-align: center;
	    position: fixed;
	    bottom: 0;
	    width: 40%;
	    z-index: 100
		}
		#posBtn{
			text-align: center;
		    position: fixed;
		    bottom: 0;
		    width: 60%;
		    z-index: 100;
		    margin-left:40% ;
		}
		.comAttention {
			.mint-button{
				height: 50px;
			}
			#felxBtn{
				border-radius:0px ;
				img{
					position: absolute;
					left: 24px;
				}
			}
			#posBtn{
				border-radius:0px ;
			}
		}
</style>