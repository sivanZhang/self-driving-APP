<template>
	<!-- 虚拟币页面 -->
	<view id="currency">
		<view class="accountBalance">账户余额
			<view class="totalMoney">{{coinNumber}}币</view>
		</view>
		<view class="recharge">
			请选择充值虚拟币
			<view class="textGray">1元人民币=1虚拟币</view>
		</view>
		<view class="currencyNumber-box">
			<view class="currencyNumber" v-for="(item,index) of currencyList" :key="index"
				:class="{colorChange:index==dynamic}" @click="getType(index)">
				{{item}}
			</view>
		</view>
		<button class="btn">立即充值</button>
		<uni-popup ref="popup" type="right" :custom="true" :show="true">
			<view class="uni-logout">
				<view @tap="target1('/pages/user-center/currency/expensesRecord')">消费记录</view>
			</view>
		</uni-popup>
	</view>
</template>
    
<script>
import { Look_Coin } from '@/api/currency.js'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default{
	data(){
		return{
			currencyList:["5币","10币","20币","30币","50币","100币"],
			dynamic:-1,
			coinNumber:''
		}
	},
    components: {
    	uniPopup
    },	
	methods:{
		getType: function (index) {
			this.dynamic = index;
			console.log(index)
		},
		lookCoin(){
			Look_Coin({mine:''}).then(({ data }) =>{
			    if(data.status == 0){
				    this.coinNumber = data.msg
			   }
			})
		},
		target(url) {
			uni.navigateTo({
				url
			});
		},
		target1(url) {
			this.target(url);
			this.$refs.popup.close();
		},
	},
	onLoad() {
		this.lookCoin();
	},
	onNavigationBarButtonTap(val) {
		// console.log(val.index);
		if (val.index == 0) { //查看消费记录
			// console.log("第一个按钮");
			this.$refs.popup.open()
		}
	}
}
</script>

<style lang="scss">
#currency{
	margin:20upx 40upx;
	.accountBalance{
		font-size: 30upx;
		display: flex;
		flex-wrap: wrap;
		padding-top: 10upx;
		padding-bottom:20upx;
		border-bottom: #CCCCCC solid 2upx;
		.totalMoney{
			color:red;
			font-size:28upx;
			padding-top: 6upx;
			padding-left:20upx;
		}
	}
	.recharge{
		font-size: 32upx;
		display: flex;
		flex-wrap: wrap;
		padding-top: 20upx;
		.textGray{
			color: #bfbfbf;
			font-size: 24upx;
			padding-top: 10upx;
			padding-left:8upx;
		}
	}
	.currencyNumber-box{
		display: flex;
		flex-wrap: wrap;
		.currencyNumber{
			text-align: center;
			padding: 20upx;
			margin:15upx 12upx;
			width:30%;
			border: 2.083upx solid #ececec;
			// box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
			font-size:32upx;
			border-radius: 20rpx;
		}
	}
	.colorChange {
		background: #fcedea !important;
		color: #e41f19;
		font-weight: bold;
		position: relative;
		border-radius: 20rpx;
		border: 1rpx solid #e41f19 !important;
	}
	.btn{
		margin-top: 20upx;
		background-color: #DF5000;
		color: #FFFFFF;
		border-radius: 30upx;
	}
	.uni-popup {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		z-index: 998;
		overflow: hidden;
	}
	
	.uni-logout {
		background: #FFFFFF;
		color:#000000;
		display: flex;
		width: 100%;
		&>view {
			padding: 20upx;
			margin-right: 10upx;
			height: 80upx;
			border: 2.083upx solid #c8c8cc;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32upx;
		}
	}
}
</style>
