<template>
	<!-- 虚拟币页面 -->
	<view id="currency">
		<view class="accountBalance">账户余额
			<view class="totalMoney">100币</view>
		</view>
		<view class="recharge">
			请选择充值虚拟币
			<view class="textGray">1元人民币=1虚拟币</view>
		</view>
		<view class="currencyNumber" v-for="(item,index) of currencyList" :key="index">{{item}}</view>
		<button class="btn">立即充值</button>
	</view>
</template>
    
<script>
export default{
	data(){
		return{
			currencyList:["5币","10币","20币","30币","50币","100币"]
		}
	}
}
</script>

<style lang="scss">
#currency{
	margin:20upx 40upx;
	.accountBalance{
		display: flex;
		flex-wrap: wrap;
		border-bottom: #CCCCCC solid 2upx;
		.totalMoney{
			color:red;
		}
	}
	.recharge{
		display: flex;
		flex-wrap: wrap;
	}
}
</style>
